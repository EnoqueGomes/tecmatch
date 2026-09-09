import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { verifyToken, type JwtPayload } from '../utils/jwt';

// Exige um JWT válido no header Authorization e popula req.user.
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw AppError.unauthorized('Token de autenticação ausente');
  }

  const token = header.replace('Bearer ', '');
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    throw AppError.unauthorized('Token inválido ou expirado');
  }
}

// Restringe o acesso a determinados papéis (usar depois de requireAuth).
export function requireRole(...roles: JwtPayload['role'][]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw AppError.forbidden('Seu tipo de conta não tem acesso a este recurso');
    }
    next();
  };
}
