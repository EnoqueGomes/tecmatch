import type { Category } from '@/types';
import { apiClient } from './client';

export async function listCategories() {
  const { data } = await apiClient.get<Category[]>('/categories');
  return data;
}
