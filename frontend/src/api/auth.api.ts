import type { User, UserRole } from '@/types';
import { apiClient } from './client';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: Extract<UserRole, 'CLIENT' | 'PROFESSIONAL'>;
  phone?: string;
  city?: string;
  state?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
  return data;
}

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function me() {
  const { data } = await apiClient.get<User>('/auth/me');
  return data;
}
