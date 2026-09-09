import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import { signToken } from '../../utils/jwt';
import { comparePassword, hashPassword } from '../../utils/password';
import { toPublicUser } from '../users/user.mapper';
import type { LoginInput, RegisterInput } from './auth.schema';

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw AppError.conflict('Já existe uma conta com este e-mail');
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
      phone: input.phone,
      city: input.city,
      state: input.state,
      // Profissionais já saem do cadastro com um perfil (vazio) para completar depois.
      ...(input.role === 'PROFESSIONAL' ? { professionalProfile: { create: {} } } : {}),
    },
  });

  const token = signToken({ sub: user.id, role: user.role });
  return { user: toPublicUser(user), token };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  // Mensagem genérica de propósito: não revelar se o e-mail existe ou não.
  if (!user) {
    throw AppError.unauthorized('E-mail ou senha incorretos');
  }

  const valid = await comparePassword(input.password, user.passwordHash);
  if (!valid) {
    throw AppError.unauthorized('E-mail ou senha incorretos');
  }

  const token = signToken({ sub: user.id, role: user.role });
  return { user: toPublicUser(user), token };
}

export async function me(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw AppError.notFound('Usuário não encontrado');
  }
  return toPublicUser(user);
}
