import { Prisma } from '@prisma/client';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { toUserSummary } from '../users/user.mapper';
import type { SendMessageInput } from './message.schema';

const INCLUDE = { sender: true } satisfies Prisma.MessageInclude;

type MessageWithRelations = Prisma.MessageGetPayload<{ include: typeof INCLUDE }>;

function serialize(message: MessageWithRelations) {
  const { sender, ...rest } = message;
  return { ...rest, sender: toUserSummary(sender) };
}

// Só o cliente dono do pedido e profissionais que já têm proposta nele
// participam da conversa.
async function assertParticipant(serviceRequestId: string, userId: string) {
  const request = await prisma.serviceRequest.findUnique({ where: { id: serviceRequestId } });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  if (request.clientId === userId) return;

  const hasProposal = await prisma.proposal.findFirst({
    where: { serviceRequestId, professionalId: userId },
  });
  if (!hasProposal) {
    throw AppError.forbidden('Você precisa ter uma proposta neste pedido para acessar a conversa');
  }
}

export async function list(serviceRequestId: string, userId: string) {
  await assertParticipant(serviceRequestId, userId);
  const messages = await prisma.message.findMany({
    where: { serviceRequestId },
    include: INCLUDE,
    orderBy: { createdAt: 'asc' },
  });
  return messages.map(serialize);
}

export async function send(serviceRequestId: string, senderId: string, input: SendMessageInput) {
  await assertParticipant(serviceRequestId, senderId);
  const message = await prisma.message.create({
    data: { serviceRequestId, senderId, content: input.content },
    include: INCLUDE,
  });
  return serialize(message);
}
