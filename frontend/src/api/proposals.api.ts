import type { Proposal, ProposalStatus } from '@/types';
import { apiClient } from './client';

export interface CreateProposalPayload {
  price: number;
  estimatedDays?: number;
  message: string;
}

export async function createProposal(serviceRequestId: string, payload: CreateProposalPayload) {
  const { data } = await apiClient.post<Proposal>(
    `/service-requests/${serviceRequestId}/proposals`,
    payload,
  );
  return data;
}

export async function listProposalsForRequest(serviceRequestId: string) {
  const { data } = await apiClient.get<Proposal[]>(`/service-requests/${serviceRequestId}/proposals`);
  return data;
}

export async function listMyProposals() {
  const { data } = await apiClient.get<Proposal[]>('/proposals/mine');
  return data;
}

export async function updateProposalStatus(id: string, status: ProposalStatus) {
  const { data } = await apiClient.patch<Proposal>(`/proposals/${id}`, { status });
  return data;
}
