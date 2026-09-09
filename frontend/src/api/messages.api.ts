import type { Message } from '@/types';
import { apiClient } from './client';

export async function listMessages(serviceRequestId: string) {
  const { data } = await apiClient.get<Message[]>(`/service-requests/${serviceRequestId}/messages`);
  return data;
}

export async function sendMessage(serviceRequestId: string, content: string) {
  const { data } = await apiClient.post<Message>(`/service-requests/${serviceRequestId}/messages`, {
    content,
  });
  return data;
}
