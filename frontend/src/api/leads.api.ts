import { apiClient } from './client';

export interface CreateLeadPayload {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  description: string;
}

export interface ManagedServiceLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  description: string;
  status: string;
  createdAt: string;
}

export async function createLead(payload: CreateLeadPayload) {
  const { data } = await apiClient.post<ManagedServiceLead>('/leads', payload);
  return data;
}

export async function listLeads() {
  const { data } = await apiClient.get<ManagedServiceLead[]>('/leads');
  return data;
}
