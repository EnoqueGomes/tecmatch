import { Prisma, ProposalStatus, RequestStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { toUserSummary } from '../users/user.mapper';
import type { CreateReviewInput } from './review.schema';

const INCLUDE = { reviewer: true, reviewee: true } satisfies Prisma.ReviewInclude;

type ReviewWithRelations = Prisma.ReviewGetPayload<{ include: typeof INCLUDE }>;

function serialize(review: ReviewWithRelations) {
  const { reviewer, reviewee, ...rest } = review;
  return { ...rest, reviewer: toUserSummary(reviewer), reviewee: toUserSummary(reviewee) };
}

// MVP: só o cliente avalia o profissional (uma nota por pedido concluído).
// Avaliação bidirecional é um passo natural de evolução, sem mudar o schema.
export async function create(serviceRequestId: string, reviewerId: string, input: CreateReviewInput) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id: serviceRequestId },
    include: { proposals: { where: { status: ProposalStatus.ACCEPTED } } },
  });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  if (request.clientId !== reviewerId) {
    throw AppError.forbidden('Só o cliente que contratou pode avaliar o profissional');
  }
  if (request.status !== RequestStatus.COMPLETED) {
    throw AppError.conflict('Só é possível avaliar pedidos concluídos');
  }

  const acceptedProposal = request.proposals[0];
  if (!acceptedProposal) {
    throw AppError.conflict('Este pedido não teve uma proposta aceita');
  }
  const revieweeId = acceptedProposal.professionalId;

  const existing = await prisma.review.findUnique({ where: { serviceRequestId } });
  if (existing) {
    throw AppError.conflict('Este pedido já foi avaliado');
  }

  const review = await prisma.$transaction(async (tx) => {
    const created = await tx.review.create({
      data: { serviceRequestId, reviewerId, revieweeId, rating: input.rating, comment: input.comment },
      include: INCLUDE,
    });

    // Recalcula a média e o total de avaliações do perfil profissional.
    const stats = await tx.review.aggregate({
      where: { revieweeId },
      _avg: { rating: true },
      _count: true,
    });
    await tx.professionalProfile.updateMany({
      where: { userId: revieweeId },
      data: { avgRating: stats._avg.rating ?? 0, totalReviews: stats._count },
    });

    return created;
  });

  return serialize(review);
}

export async function listForUser(userId: string) {
  const reviews = await prisma.review.findMany({
    where: { revieweeId: userId },
    include: INCLUDE,
    orderBy: { createdAt: 'desc' },
  });
  return reviews.map(serialize);
}
