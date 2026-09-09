import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';

// Handler central de erros — toda rota async usa asyncHandler, então
// qualquer exceção (AppError ou não) acaba aqui em vez de derrubar o processo.
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  console.error('Erro não tratado:', err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
}
