import { PrismaClient } from '@prisma/client';

// Uma única instância do Prisma Client reaproveitada em toda a aplicação —
// evitar `new PrismaClient()` espalhado pelo código, que esgota conexões.
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});
