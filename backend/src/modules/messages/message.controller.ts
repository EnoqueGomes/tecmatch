import type { Request, Response } from 'express';
import * as messageService from './message.service';

export async function listController(req: Request, res: Response) {
  const messages = await messageService.list(req.params.serviceRequestId, req.user!.sub);
  res.status(200).json(messages);
}

export async function sendController(req: Request, res: Response) {
  const message = await messageService.send(req.params.serviceRequestId, req.user!.sub, req.body);
  res.status(201).json(message);
}
