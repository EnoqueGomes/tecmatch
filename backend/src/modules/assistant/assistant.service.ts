import type { z } from 'zod';
import { env } from '../../config/env';
import { AppError } from '../../utils/AppError';
import { SYSTEM_PROMPT } from './assistant.prompt';
import type { chatSchema } from './assistant.schema';

const MODEL = 'claude-haiku-4-5-20251001';

const HANDOFF_TOOL = {
  name: 'encaminhar_whatsapp',
  description:
    'Encaminha a conversa para a equipe humana da TecMatch pelo WhatsApp, com um resumo do atendimento. Use assim que tiver as informações principais ou quando a pessoa pedir para falar com alguém.',
  input_schema: {
    type: 'object',
    properties: {
      resumo: {
        type: 'string',
        description:
          'Resumo em primeira pessoa, como se a própria pessoa estivesse escrevendo para a equipe. Ex: "Sou João, da empresa X, em Curitiba. Preciso de um eletricista para..."',
      },
    },
    required: ['resumo'],
  },
};

interface AnthropicContentBlock {
  type: string;
  text?: string;
  name?: string;
  input?: { resumo?: string };
}

export async function chat({ messages }: z.infer<typeof chatSchema>) {
  if (!env.anthropicApiKey) {
    throw new AppError('Assistente indisponível no momento.', 503);
  }

  // A API exige que a conversa comece por uma mensagem do usuário.
  const firstUser = messages.findIndex((m) => m.role === 'user');
  const conversation = messages.slice(firstUser);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.anthropicApiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      tools: [HANDOFF_TOOL],
      messages: conversation,
    }),
  });

  if (!response.ok) {
    console.error('Erro da API da Anthropic:', response.status, await response.text());
    throw new AppError('Assistente indisponível no momento.', 503);
  }

  const data = (await response.json()) as { content: AnthropicContentBlock[] };
  const reply = data.content
    .filter((block) => block.type === 'text' && block.text)
    .map((block) => block.text)
    .join('\n')
    .trim();
  const handoffBlock = data.content.find(
    (block) => block.type === 'tool_use' && block.name === HANDOFF_TOOL.name,
  );

  return {
    reply: reply || 'Vou te passar para a nossa equipe — é só continuar pelo WhatsApp no botão abaixo.',
    handoff: handoffBlock?.input?.resumo ? { summary: handoffBlock.input.resumo } : null,
  };
}
