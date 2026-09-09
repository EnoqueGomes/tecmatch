import { Prisma, type ProfessionalProfile, type User } from '@prisma/client';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { toUserSummary } from '../users/user.mapper';
import type { SearchProfessionalsQuery, UpsertProfileInput } from './professional.schema';

type ProfileWithRelations = ProfessionalProfile & {
  user: User;
  categories: { category: { id: string; name: string; slug: string } }[];
};

// O id "público" do profissional é sempre o User.id (o mesmo usado em
// Proposal.professionalId), nunca o id interno de ProfessionalProfile —
// assim o front-end lida com um único conceito de "id do profissional".
function toPublicProfessional(profile: ProfileWithRelations) {
  return {
    // toUserSummary já inclui `id` (o User.id, usado como id público do profissional)
    ...toUserSummary(profile.user),
    bio: profile.bio,
    yearsExperience: profile.yearsExperience,
    hourlyRate: profile.hourlyRate,
    serviceRadiusKm: profile.serviceRadiusKm,
    verified: profile.verified,
    avgRating: profile.avgRating,
    totalReviews: profile.totalReviews,
    categories: profile.categories.map((pc) => pc.category),
  };
}

export async function search(query: SearchProfessionalsQuery) {
  const { category, city, state, page, pageSize } = query;

  const where: Prisma.ProfessionalProfileWhereInput = {
    ...(city ? { user: { city: { equals: city, mode: 'insensitive' } } } : {}),
    ...(state ? { user: { state: { equals: state, mode: 'insensitive' } } } : {}),
    ...(category ? { categories: { some: { category: { slug: category } } } } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.professionalProfile.findMany({
      where,
      include: { user: true, categories: { include: { category: true } } },
      orderBy: { avgRating: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.professionalProfile.count({ where }),
  ]);

  return {
    items: items.map(toPublicProfessional),
    total,
    page,
    pageSize,
  };
}

export async function getByUserId(userId: string) {
  const profile = await prisma.professionalProfile.findUnique({
    where: { userId },
    include: { user: true, categories: { include: { category: true } } },
  });
  if (!profile) {
    throw AppError.notFound('Profissional não encontrado');
  }
  return toPublicProfessional(profile);
}

export async function upsertProfile(userId: string, input: UpsertProfileInput) {
  const { categoryIds, ...rest } = input;

  const profile = await prisma.professionalProfile.upsert({
    where: { userId },
    update: rest,
    create: { userId, ...rest },
  });

  if (categoryIds) {
    await prisma.$transaction([
      prisma.professionalCategory.deleteMany({ where: { professionalId: profile.id } }),
      prisma.professionalCategory.createMany({
        data: categoryIds.map((categoryId) => ({ professionalId: profile.id, categoryId })),
        skipDuplicates: true,
      }),
    ]);
  }

  return getByUserId(userId);
}
