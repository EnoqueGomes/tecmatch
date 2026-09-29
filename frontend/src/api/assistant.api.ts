import { apiClient } from './client';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  handoff: { summary: string } | null;
}

export async function sendChat(messages: ChatMessage[]) {
  const { data } = await apiClient.post<ChatResponse>('/assistant/chat', { messages });
  return data;
}
