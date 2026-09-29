import type { Request, Response } from 'express';
import * as leadService from './lead.service';

export async function createLeadController(req: Request, res: Response) {
  const lead = await leadService.createLead(req.body);
  res.status(201).json(lead);
}

export async function listLeadsController(_req: Request, res: Response) {
  const leads = await leadService.listLeads();
  res.status(200).json(leads);
}
