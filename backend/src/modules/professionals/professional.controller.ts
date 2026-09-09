import type { Request, Response } from 'express';
import * as professionalService from './professional.service';
import type { SearchProfessionalsQuery } from './professional.schema';

export async function searchController(req: Request, res: Response) {
  const result = await professionalService.search(req.query as unknown as SearchProfessionalsQuery);
  res.status(200).json(result);
}

export async function getByIdController(req: Request, res: Response) {
  const profile = await professionalService.getByUserId(req.params.id);
  res.status(200).json(profile);
}

export async function upsertProfileController(req: Request, res: Response) {
  const profile = await professionalService.upsertProfile(req.user!.sub, req.body);
  res.status(200).json(profile);
}
