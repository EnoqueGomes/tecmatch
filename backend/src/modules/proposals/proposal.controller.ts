import type { Request, Response } from 'express';
import * as proposalService from './proposal.service';

export async function createController(req: Request, res: Response) {
  const proposal = await proposalService.create(req.params.serviceRequestId, req.user!.sub, req.body);
  res.status(201).json(proposal);
}

export async function listForRequestController(req: Request, res: Response) {
  const proposals = await proposalService.listForRequest(req.params.serviceRequestId, req.user!.sub);
  res.status(200).json(proposals);
}

export async function listMineController(req: Request, res: Response) {
  const proposals = await proposalService.listMine(req.user!.sub);
  res.status(200).json(proposals);
}

export async function updateStatusController(req: Request, res: Response) {
  const proposal = await proposalService.updateStatus(req.params.id, req.user!.sub, req.body);
  res.status(200).json(proposal);
}
