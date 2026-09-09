import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  getByIdController,
  searchController,
  upsertProfileController,
} from './professional.controller';
import { searchProfessionalsSchema, upsertProfileSchema } from './professional.schema';

const router = Router();

router.get('/', validate(searchProfessionalsSchema, 'query'), asyncHandler(searchController));
router.post(
  '/profile',
  requireAuth,
  requireRole('PROFESSIONAL'),
  validate(upsertProfileSchema),
  asyncHandler(upsertProfileController),
);
router.get('/:id', asyncHandler(getByIdController));

export default router;
