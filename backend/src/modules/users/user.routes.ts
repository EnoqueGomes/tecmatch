import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getUserController,
  updateMeController,
  userReviewsController,
} from './user.controller';
import { updateMeSchema } from './user.schema';

const router = Router();

router.patch('/me', requireAuth, validate(updateMeSchema), asyncHandler(updateMeController));
router.get('/:id/reviews', asyncHandler(userReviewsController));
router.get('/:id', asyncHandler(getUserController));

export default router;
