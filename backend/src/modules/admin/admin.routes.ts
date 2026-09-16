import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { listPendingController, verifyController } from './admin.controller';

const router = Router();

// Todo esse módulo é restrito a administradores.
router.use(requireAuth, requireRole('ADMIN'));

router.get('/professionals/pending', asyncHandler(listPendingController));
router.patch('/professionals/:id/verify', asyncHandler(verifyController));

export default router;
