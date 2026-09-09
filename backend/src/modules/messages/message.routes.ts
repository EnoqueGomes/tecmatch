import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { listController, sendController } from './message.controller';
import { sendMessageSchema } from './message.schema';

// Aninhado em /api/service-requests/:serviceRequestId/messages
const router = Router({ mergeParams: true });

router.get('/', requireAuth, asyncHandler(listController));
router.post('/', requireAuth, validate(sendMessageSchema), asyncHandler(sendController));

export default router;
