import { z } from 'zod';

export const UNIT_TYPES = [
  'COOPERATIVA',
  'ARMAZEM_CEREALISTA',
  'INDUSTRIA',
  'TERMINAL',
  'PRODUTOR',
  'OUTRO',
] as const;

export const createDiagnosticSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  contactName: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(8).max(30),
  city: z.string().trim().min(2).max(120),
  unitType: z.enum(UNIT_TYPES),
  score: z.number().int().min(0).max(100),
  level: z.enum(['critico', 'atencao', 'adequacao', 'bom']),
  criticalGaps: z.number().int().min(0).max(40),
  answers: z.record(z.string().max(40), z.enum(['sim', 'parcial', 'nao', 'na'])),
  // Consentimento é obrigatório: sem ele o contato não é gravado.
  consent: z.literal(true),
  // Campo-armadilha: pessoas não veem nem preenchem; robôs costumam preencher tudo.
  website: z.string().max(200).optional(),
});
