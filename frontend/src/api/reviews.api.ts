import type { Review } from '@/types';
import { apiClient } from './client';

export async function createReview(serviceRequestId: string, rating: number, comment?: string) {
  const { data } = await apiClient.post<Review>(`/service-requests/${serviceRequestId}/review`, {
    rating,
    comment,
  });
  return data;
}

export async function listUserReviews(userId: string) {
  const { data } = await apiClient.get<Review[]>(`/users/${userId}/reviews`);
  return data;
}
