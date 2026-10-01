import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { createRateLimiter } from '../../middlewares/rateLimit.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { createDiagnosticController, listDiagnosticsController } from './diagnostic.controller';
import { createDiagnosticSchema } from './diagnostic.schema';

const router = Router();

// Pública (quem faz o diagnóstico não precisa de conta), com limite por IP:
// no máximo 8 envios por hora.
router.post(
  '/',
  createRateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 8,
    message: 'Muitos envios em pouco tempo. Tente novamente mais tarde ou fale conosco pelo WhatsApp.',
  }),
  validate(createDiagnosticSchema),
  asyncHandler(createDiagnosticController),
);

// Só o admin vê a lista.
router.get('/', requireAuth, requireRole('ADMIN'), asyncHandler(listDiagnosticsController));

export default router;
