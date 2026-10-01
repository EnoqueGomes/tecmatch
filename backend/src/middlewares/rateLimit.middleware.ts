import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

// Limite simples por IP, guardado na memória do servidor (basta para um servidor
// só). Serve para ninguém encher o banco de contatos falsos.
export function createRateLimiter({ windowMs, max, message }: { windowMs: number; max: number; message: string }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return (req: Request, _res: Response, next: NextFunction) => {
    const key = req.ip ?? 'desconhecido';
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || entry.resetAt < now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (entry.count >= max) {
      throw new AppError(message, 429);
    }
    entry.count += 1;
    next();
  };
}
