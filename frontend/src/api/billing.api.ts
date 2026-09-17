import { apiClient } from './client';

export async function createCheckoutSession() {
  const { data } = await apiClient.post<{ url: string }>('/billing/checkout');
  return data;
}

export async function createPortalSession() {
  const { data } = await apiClient.post<{ url: string }>('/billing/portal');
  return data;
}
