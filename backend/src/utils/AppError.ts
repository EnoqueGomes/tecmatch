// Erro de aplicação com status HTTP — lançado em qualquer camada e
// capturado de forma centralizada pelo error.middleware.
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }

  static notFound(message = 'Recurso não encontrado') {
    return new AppError(message, 404);
  }

  static unauthorized(message = 'Não autenticado') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Sem permissão para essa ação') {
    return new AppError(message, 403);
  }

  static conflict(message = 'Conflito com o estado atual do recurso') {
    return new AppError(message, 409);
  }
}
