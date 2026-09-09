import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(120),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha precisa ter ao menos 8 caracteres'),
  role: z.enum(['CLIENT', 'PROFESSIONAL']),
  phone: z.string().min(8).max(20).optional(),
  city: z.string().max(120).optional(),
  state: z.string().length(2, 'Use a sigla do estado (ex: PR)').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
