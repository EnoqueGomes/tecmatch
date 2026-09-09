import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { AppError } from '../utils/AppError';

type Source = 'body' | 'query' | 'params';

// Valida req[source] contra um schema Zod e substitui pelos dados parseados
// (com defaults e coerções já aplicados) antes de seguir para o controller.
export function validate(schema: ZodTypeAny, source: Source = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      throw new AppError('Dados inválidos', 422, result.error.flatten());
    }
    req[source] = result.data;
    next();
  };
}
