import type { User, UserSummary } from '@/types';
import { apiClient } from './client';

export interface UpdateMePayload {
  name?: string;
  phone?: string;
  city?: string;
  state?: string;
  avatarUrl?: string;
}

export async function updateMe(payload: UpdateMePayload) {
  const { data } = await apiClient.patch<User>('/users/me', payload);
  return data;
}

export async function getUser(id: string) {
  const { data } = await apiClient.get<UserSummary>(`/users/${id}`);
  return data;
}
