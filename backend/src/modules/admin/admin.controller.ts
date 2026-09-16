import type { Request, Response } from 'express';
import * as adminService from './admin.service';

export async function listPendingController(_req: Request, res: Response) {
  const professionals = await adminService.listPendingProfessionals();
  res.status(200).json(professionals);
}

export async function verifyController(req: Request, res: Response) {
  await adminService.verifyProfessional(req.params.id);
  res.status(200).json({ success: true });
}
