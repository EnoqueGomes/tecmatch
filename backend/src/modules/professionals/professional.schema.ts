import { z } from 'zod';

export const searchProfessionalsSchema = z.object({
  category: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(12),
});

export const upsertProfileSchema = z.object({
  bio: z.string().max(2000).optional(),
  yearsExperience: z.coerce.number().int().min(0).max(60).optional(),
  hourlyRate: z.coerce.number().min(0).optional(),
  serviceRadiusKm: z.coerce.number().int().min(0).max(500).optional(),
  categoryIds: z.array(z.string().uuid()).min(1).max(10).optional(),
});

export type SearchProfessionalsQuery = z.infer<typeof searchProfessionalsSchema>;
export type UpsertProfileInput = z.infer<typeof upsertProfileSchema>;
