import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  createController,
  getByIdController,
  listController,
  updateStatusController,
} from './service-request.controller';
import {
  createServiceRequestSchema,
  listServiceRequestsSchema,
  updateStatusSchema,
} from './service-request.schema';

const router = Router();

router.post(
  '/',
  requireAuth,
  requireRole('CLIENT'),
  validate(createServiceRequestSchema),
  asyncHandler(createController),
);
router.get('/', requireAuth, validate(listServiceRequestsSchema, 'query'), asyncHandler(listController));
router.get('/:id', requireAuth, asyncHandler(getByIdController));
router.patch('/:id/status', requireAuth, validate(updateStatusSchema), asyncHandler(updateStatusController));

export default router;
