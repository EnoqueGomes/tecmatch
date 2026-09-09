import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { listCategoriesController } from './category.controller';

const router = Router();

router.get('/', asyncHandler(listCategoriesController));

export default router;
