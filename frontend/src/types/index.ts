export type UserRole = 'CLIENT' | 'PROFESSIONAL' | 'ADMIN';
export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ProposalStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  city?: string | null;
  state?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface UserSummary {
  id: string;
  name: string;
  avatarUrl?: string | null;
  city?: string | null;
  state?: string | null;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProfessionalSummary extends UserSummary {
  bio?: string | null;
  yearsExperience?: number | null;
  hourlyRate?: string | null;
  serviceRadiusKm?: number | null;
  verified: boolean;
  avgRating: string;
  totalReviews: number;
  categories: Category[];
}

export interface ServiceRequestClient {
  id: string;
  name: string;
  city?: string | null;
  state?: string | null;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  client: ServiceRequestClient;
  categoryId: string;
  category: Category;
  title: string;
  description: string;
  city: string;
  state: string;
  budgetMin?: string | null;
  budgetMax?: string | null;
  status: RequestStatus;
  proposalCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  serviceRequestId: string;
  serviceRequest: { id: string; clientId: string; status: RequestStatus; title: string };
  professionalId: string;
  professional: UserSummary;
  price: string;
  estimatedDays?: number | null;
  message: string;
  status: ProposalStatus;
  createdAt: string;
}

export interface Message {
  id: string;
  serviceRequestId: string;
  senderId: string;
  sender: UserSummary;
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  serviceRequestId: string;
  reviewerId: string;
  reviewer: UserSummary;
  revieweeId: string;
  reviewee: UserSummary;
  rating: number;
  comment?: string | null;
  createdAt: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
