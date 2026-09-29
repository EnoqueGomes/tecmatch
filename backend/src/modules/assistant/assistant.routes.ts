import { Router, type NextFunction, type Request, type Response } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { AppError } from '../../utils/AppError';
import { asyncHandler } from '../../utils/asyncHandler';
import { chatController } from './assistant.controller';
import { chatSchema } from './assistant.schema';

// Limite simples por IP pra ninguém gerar custo abusando do assistente:
// no máximo 30 mensagens a cada 10 minutos.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(req: Request, _res: Response, next: NextFunction) {
  const key = req.ip ?? 'desconhecido';
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }
  if (entry.count >= MAX_REQUESTS) {
    throw new AppError('Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.', 429);
  }
  entry.count += 1;
  next();
}

const router = Router();
router.post('/chat', rateLimit, validate(chatSchema), asyncHandler(chatController));

export default router;
