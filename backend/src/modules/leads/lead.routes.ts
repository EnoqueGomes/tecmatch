import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middlewares/validate.middleware';
import { createLeadController, listLeadsController } from './lead.controller';
import { createLeadSchema } from './lead.schema';

const router = Router();

// Pública: empresas interessadas no serviço gerenciado não precisam de conta.
router.post('/', validate(createLeadSchema), asyncHandler(createLeadController));

// Só o admin vê a lista de interessados.
router.get('/', requireAuth, requireRole('ADMIN'), asyncHandler(listLeadsController));

export default router;
