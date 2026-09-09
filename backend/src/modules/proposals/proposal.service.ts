import { Prisma, ProposalStatus, RequestStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { toUserSummary } from '../users/user.mapper';
import type { CreateProposalInput, UpdateProposalInput } from './proposal.schema';

const INCLUDE = {
  professional: true,
  serviceRequest: { select: { id: true, clientId: true, status: true, title: true } },
} satisfies Prisma.ProposalInclude;

type ProposalWithRelations = Prisma.ProposalGetPayload<{ include: typeof INCLUDE }>;

function serialize(proposal: ProposalWithRelations) {
  const { professional, serviceRequest, ...rest } = proposal;
  return { ...rest, professional: toUserSummary(professional), serviceRequest };
}

export async function create(
  serviceRequestId: string,
  professionalId: string,
  input: CreateProposalInput,
) {
  const request = await prisma.serviceRequest.findUnique({ where: { id: serviceRequestId } });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  if (request.status !== RequestStatus.OPEN) {
    throw AppError.conflict('Esse pedido não está mais aberto para propostas');
  }
  if (request.clientId === professionalId) {
    throw AppError.forbidden('Você não pode enviar proposta para o próprio pedido');
  }

  try {
    const proposal = await prisma.proposal.create({
      data: { serviceRequestId, professionalId, ...input },
      include: INCLUDE,
    });
    return serialize(proposal);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw AppError.conflict('Você já enviou uma proposta para este pedido');
    }
    throw error;
  }
}

export async function listForRequest(serviceRequestId: string, requesterId: string) {
  const request = await prisma.serviceRequest.findUnique({ where: { id: serviceRequestId } });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  if (request.clientId !== requesterId) {
    throw AppError.forbidden('Só o dono do pedido pode ver as propostas recebidas');
  }

  const proposals = await prisma.proposal.findMany({
    where: { serviceRequestId },
    include: INCLUDE,
    orderBy: { createdAt: 'asc' },
  });
  return proposals.map(serialize);
}

export async function listMine(professionalId: string) {
  const proposals = await prisma.proposal.findMany({
    where: { professionalId },
    include: INCLUDE,
    orderBy: { createdAt: 'desc' },
  });
  return proposals.map(serialize);
}

export async function updateStatus(
  proposalId: string,
  requesterId: string,
  input: UpdateProposalInput,
) {
  const proposal = await prisma.proposal.findUnique({
    where: { id: proposalId },
    include: { serviceRequest: true },
  });
  if (!proposal) {
    throw AppError.notFound('Proposta não encontrada');
  }

  const isOwner = proposal.serviceRequest.clientId === requesterId;
  const isAuthor = proposal.professionalId === requesterId;

  if (input.status === ProposalStatus.WITHDRAWN) {
    if (!isAuthor) {
      throw AppError.forbidden('Só quem enviou a proposta pode retirá-la');
    }
  } else if (!isOwner) {
    throw AppError.forbidden('Só o dono do pedido pode aceitar ou rejeitar propostas');
  }

  if (proposal.status !== ProposalStatus.PENDING) {
    throw AppError.conflict('Essa proposta já foi respondida');
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.proposal.update({
      where: { id: proposalId },
      data: { status: input.status },
      include: INCLUDE,
    });

    // Aceitar uma proposta move o pedido para "em andamento" e rejeita
    // automaticamente as demais propostas pendentes do mesmo pedido.
    if (input.status === ProposalStatus.ACCEPTED) {
      await tx.serviceRequest.update({
        where: { id: proposal.serviceRequestId },
        data: { status: RequestStatus.IN_PROGRESS },
      });
      await tx.proposal.updateMany({
        where: {
          serviceRequestId: proposal.serviceRequestId,
          id: { not: proposalId },
          status: ProposalStatus.PENDING,
        },
        data: { status: ProposalStatus.REJECTED },
      });
    }

    return result;
  });

  return serialize(updated);
}
