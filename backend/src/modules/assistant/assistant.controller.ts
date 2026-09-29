import type { Request, Response } from 'express';
import * as assistantService from './assistant.service';

export async function chatController(req: Request, res: Response) {
  const result = await assistantService.chat(req.body);
  res.status(200).json(result);
}
