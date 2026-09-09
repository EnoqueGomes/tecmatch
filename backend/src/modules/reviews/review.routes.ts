import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { createController } from './review.controller';
import { createReviewSchema } from './review.schema';

// Aninhado em /api/service-requests/:serviceRequestId/review
const router = Router({ mergeParams: true });

router.post(
  '/',
  requireAuth,
  requireRole('CLIENT'),
  validate(createReviewSchema),
  asyncHandler(createController),
);

export default router;
