import type { Request, Response } from 'express';
import * as reviewService from './review.service';

export async function createController(req: Request, res: Response) {
  const review = await reviewService.create(req.params.serviceRequestId, req.user!.sub, req.body);
  res.status(201).json(review);
}
