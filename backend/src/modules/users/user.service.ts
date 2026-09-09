import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { toPublicUser, toUserSummary } from './user.mapper';
import type { UpdateMeInput } from './user.schema';

export async function getUserSummary(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw AppError.notFound('Usuário não encontrado');
  }
  return toUserSummary(user);
}

export async function updateMe(id: string, input: UpdateMeInput) {
  const user = await prisma.user.update({ where: { id }, data: input });
  return toPublicUser(user);
}
