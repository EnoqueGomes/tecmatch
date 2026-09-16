import type { Category } from '@/types';
import { apiClient } from './client';

export interface PendingProfessional {
  id: string;
  name: string;
  email: string;
  city: string | null;
  state: string | null;
  creaNumber: string | null;
  categories: Category[];
  createdAt: string;
}

export async function listPendingProfessionals() {
  const { data } = await apiClient.get<PendingProfessional[]>('/admin/professionals/pending');
  return data;
}

export async function verifyProfessional(id: string) {
  const { data } = await apiClient.patch<{ success: boolean }>(`/admin/professionals/${id}/verify`);
  return data;
}
