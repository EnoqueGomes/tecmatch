import { z } from 'zod';

export const createLeadSchema = z.object({
  companyName: z.string().min(2).max(160),
  contactName: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  description: z.string().min(10).max(2000),
});
