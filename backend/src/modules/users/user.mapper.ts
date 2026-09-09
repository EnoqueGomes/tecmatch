import type { User } from '@prisma/client';

// Remove o hash de senha antes de qualquer resposta HTTP.
export function toPublicUser(user: User) {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

// Recorte público de outro usuário (sem e-mail/telefone) — usado em perfis,
// remetentes de mensagem e qualquer lugar que exiba dados de terceiros.
export function toUserSummary(user: User) {
  return {
    id: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    city: user.city,
    state: user.state,
    role: user.role,
    createdAt: user.createdAt,
  };
}
