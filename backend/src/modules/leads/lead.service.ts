import { prisma } from '../../config/database';
import type { createLeadSchema } from './lead.schema';
import type { z } from 'zod';

export async function createLead(data: z.infer<typeof createLeadSchema>) {
  return prisma.managedServiceLead.create({ data });
}

export async function listLeads() {
  return prisma.managedServiceLead.findMany({ orderBy: { createdAt: 'desc' } });
}
