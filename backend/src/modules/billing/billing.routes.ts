import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { checkoutController, portalController } from './billing.controller';

const router = Router();

// O webhook (sem autenticação, corpo bruto) é montado direto em app.ts,
// antes do express.json() global — não faz parte deste router.
router.use(requireAuth, requireRole('PROFESSIONAL'));
router.post('/checkout', asyncHandler(checkoutController));
router.post('/portal', asyncHandler(portalController));

export default router;
