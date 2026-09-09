import type { Paginated, RequestStatus, ServiceRequest } from '@/types';
import { apiClient } from './client';

export interface CreateServiceRequestPayload {
  categoryId: string;
  title: string;
  description: string;
  city: string;
  state: string;
  budgetMin?: number;
  budgetMax?: number;
}

export interface ListServiceRequestsParams {
  status?: RequestStatus;
  category?: string;
  city?: string;
  page?: number;
  pageSize?: number;
}

export async function createServiceRequest(payload: CreateServiceRequestPayload) {
  const { data } = await apiClient.post<ServiceRequest>('/service-requests', payload);
  return data;
}

export async function listServiceRequests(params: ListServiceRequestsParams) {
  const { data } = await apiClient.get<Paginated<ServiceRequest>>('/service-requests', { params });
  return data;
}

export async function getServiceRequest(id: string) {
  const { data } = await apiClient.get<ServiceRequest>(`/service-requests/${id}`);
  return data;
}

export async function updateServiceRequestStatus(id: string, status: RequestStatus) {
  const { data } = await apiClient.patch<ServiceRequest>(`/service-requests/${id}/status`, { status });
  return data;
}
