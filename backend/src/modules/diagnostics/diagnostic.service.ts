import type { z } from 'zod';
import { prisma } from '../../config/database';
import type { createDiagnosticSchema } from './diagnostic.schema';

type CreateInput = z.infer<typeof createDiagnosticSchema>;

export async function createDiagnostic(input: CreateInput) {
  const { consent: _consent, website: _website, ...data } = input;
  return prisma.diagnosticSubmission.create({ data });
}

export async function listDiagnostics() {
  return prisma.diagnosticSubmission.findMany({ orderBy: { createdAt: 'desc' } });
}
