import type { Request, Response } from 'express';
import * as reviewService from '../reviews/review.service';
import * as userService from './user.service';

export async function getUserController(req: Request, res: Response) {
  const user = await userService.getUserSummary(req.params.id);
  res.status(200).json(user);
}

export async function updateMeController(req: Request, res: Response) {
  const user = await userService.updateMe(req.user!.sub, req.body);
  res.status(200).json(user);
}

export async function userReviewsController(req: Request, res: Response) {
  const reviews = await reviewService.listForUser(req.params.id);
  res.status(200).json(reviews);
}
