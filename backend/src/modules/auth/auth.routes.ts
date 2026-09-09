import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import { loginController, meController, registerController } from './auth.controller';
import { loginSchema, registerSchema } from './auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(registerController));
router.post('/login', validate(loginSchema), asyncHandler(loginController));
router.get('/me', requireAuth, asyncHandler(meController));

export default router;
