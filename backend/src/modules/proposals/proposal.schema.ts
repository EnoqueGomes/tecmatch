import { z } from 'zod';

export const createProposalSchema = z.object({
  price: z.coerce.number().min(0),
  estimatedDays: z.coerce.number().int().min(0).max(365).optional(),
  message: z.string().min(10, 'Conte um pouco mais sobre a sua proposta').max(2000),
});

export const updateProposalSchema = z.object({
  status: z.enum(['ACCEPTED', 'REJECTED', 'WITHDRAWN']),
});

export type CreateProposalInput = z.infer<typeof createProposalSchema>;
export type UpdateProposalInput = z.infer<typeof updateProposalSchema>;
