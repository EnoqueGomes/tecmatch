import { apiClient } from './client';
import type { Answer, LevelId } from '@/content/diagnostic';

export type UnitType = 'COOPERATIVA' | 'ARMAZEM_CEREALISTA' | 'INDUSTRIA' | 'TERMINAL' | 'PRODUTOR' | 'OUTRO';

export const UNIT_TYPE_LABELS: Record<UnitType, string> = {
  COOPERATIVA: 'Cooperativa',
  ARMAZEM_CEREALISTA: 'Armazém ou cerealista',
  INDUSTRIA: 'Indústria (ração, processamento, moinho)',
  TERMINAL: 'Terminal ou porto',
  PRODUTOR: 'Produtor rural',
  OUTRO: 'Outro',
};

export interface DiagnosticPayload {
  companyName: string;
  contactName: string;
  role?: string;
  email: string;
  phone: string;
  city: string;
  unitType: UnitType;
  score: number;
  level: LevelId;
  criticalGaps: number;
  answers: Record<string, Answer>;
  consent: true;
  website?: string; // campo-armadilha contra robôs
}

export interface DiagnosticSubmission {
  id: string;
  companyName: string;
  contactName: string;
  role: string | null;
  email: string;
  phone: string;
  city: string;
  unitType: UnitType;
  score: number;
  level: LevelId;
  criticalGaps: number;
  answers: Record<string, Answer>;
  status: string;
  createdAt: string;
}

// O servidor gratuito pode levar quase 1 minuto para "acordar": damos tempo de sobra.
export async function submitDiagnostic(payload: DiagnosticPayload) {
  await apiClient.post('/diagnostics', payload, { timeout: 75_000 });
}

export async function listDiagnostics() {
  const { data } = await apiClient.get<DiagnosticSubmission[]>('/diagnostics');
  return data;
}
