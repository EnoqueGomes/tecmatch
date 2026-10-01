import type { Request, Response } from 'express';
import * as diagnosticService from './diagnostic.service';

export async function createDiagnosticController(req: Request, res: Response) {
  // Campo-armadilha preenchido = robô. Responde "ok" sem gravar nada,
  // para o robô não perceber que foi barrado.
  if (req.body.website) {
    return res.status(201).json({ ok: true });
  }
  await diagnosticService.createDiagnostic(req.body);
  res.status(201).json({ ok: true });
}

export async function listDiagnosticsController(_req: Request, res: Response) {
  const items = await diagnosticService.listDiagnostics();
  res.status(200).json(items);
}
