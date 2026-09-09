import { z } from 'zod';

export const createServiceRequestSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(5, 'Título muito curto').max(150),
  description: z.string().min(20, 'Descreva o serviço com mais detalhes').max(4000),
  city: z.string().min(2).max(120),
  state: z.string().length(2, 'Use a sigla do estado (ex: PR)'),
  budgetMin: z.coerce.number().min(0).optional(),
  budgetMax: z.coerce.number().min(0).optional(),
});

export const listServiceRequestsSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  category: z.string().optional(),
  city: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

export const updateStatusSchema = z.object({
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
});

export type CreateServiceRequestInput = z.infer<typeof createServiceRequestSchema>;
export type ListServiceRequestsQuery = z.infer<typeof listServiceRequestsSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
