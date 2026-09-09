import { prisma } from '../../config/database';

export function listCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } });
}
