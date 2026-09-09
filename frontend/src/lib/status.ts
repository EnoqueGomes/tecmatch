import type { ProposalStatus, RequestStatus } from '@/types';

type Tone = 'neutral' | 'success' | 'warning' | 'info';

export const REQUEST_STATUS_LABEL: Record<RequestStatus, string> = {
  OPEN: 'Em aberto',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
};

export const REQUEST_STATUS_TONE: Record<RequestStatus, Tone> = {
  OPEN: 'warning',
  IN_PROGRESS: 'info',
  COMPLETED: 'success',
  CANCELLED: 'neutral',
};

export const PROPOSAL_STATUS_LABEL: Record<ProposalStatus, string> = {
  PENDING: 'Pendente',
  ACCEPTED: 'Aceita',
  REJECTED: 'Rejeitada',
  WITHDRAWN: 'Retirada',
};

export const PROPOSAL_STATUS_TONE: Record<ProposalStatus, Tone> = {
  PENDING: 'warning',
  ACCEPTED: 'success',
  REJECTED: 'neutral',
  WITHDRAWN: 'neutral',
};
