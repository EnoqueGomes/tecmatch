import type { Request, Response } from 'express';
import * as categoryService from './category.service';

export async function listCategoriesController(_req: Request, res: Response) {
  const categories = await categoryService.listCategories();
  res.status(200).json(categories);
}
