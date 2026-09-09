import type { Request, Response } from 'express';
import * as authService from './auth.service';

export async function registerController(req: Request, res: Response) {
  const result = await authService.register(req.body);
  res.status(201).json(result);
}

export async function loginController(req: Request, res: Response) {
  const result = await authService.login(req.body);
  res.status(200).json(result);
}

export async function meController(req: Request, res: Response) {
  const user = await authService.me(req.user!.sub);
  res.status(200).json(user);
}
