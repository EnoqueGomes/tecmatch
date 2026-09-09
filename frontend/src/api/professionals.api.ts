import type { Paginated, ProfessionalSummary } from '@/types';
import { apiClient } from './client';

export interface SearchProfessionalsParams {
  category?: string;
  city?: string;
  state?: string;
  page?: number;
  pageSize?: number;
}

export async function searchProfessionals(params: SearchProfessionalsParams) {
  const { data } = await apiClient.get<Paginated<ProfessionalSummary>>('/professionals', { params });
  return data;
}

export async function getProfessional(id: string) {
  const { data } = await apiClient.get<ProfessionalSummary>(`/professionals/${id}`);
  return data;
}

export interface UpsertProfilePayload {
  bio?: string;
  yearsExperience?: number;
  hourlyRate?: number;
  serviceRadiusKm?: number;
  categoryIds?: string[];
}

export async function upsertProfile(payload: UpsertProfilePayload) {
  const { data } = await apiClient.post<ProfessionalSummary>('/professionals/profile', payload);
  return data;
}
