import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';

export async function listPendingProfessionals() {
  const profiles = await prisma.professionalProfile.findMany({
    where: { verified: false, creaNumber: { not: null } },
    include: { user: true, categories: { include: { category: true } } },
    orderBy: { createdAt: 'asc' },
  });

  return profiles.map((profile) => ({
    id: profile.user.id,
    name: profile.user.name,
    email: profile.user.email,
    city: profile.user.city,
    state: profile.user.state,
    creaNumber: profile.creaNumber,
    categories: profile.categories.map((pc) => pc.category),
    createdAt: profile.createdAt,
  }));
}

export async function verifyProfessional(userId: string) {
  const profile = await prisma.professionalProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw AppError.notFound('Perfil de profissional não encontrado');
  }

  await prisma.professionalProfile.update({
    where: { userId },
    data: { verified: true },
  });
}
