import { MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { sendChat, type ChatMessage } from '@/api/assistant.api';

// Número no formato internacional, só dígitos: 55 + DDD + número (ex: 5541999999999).
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    'Olá! Sou o assistente virtual da TecMatch. Posso tirar dúvidas e já encaminhar você pra nossa equipe. Você procura um profissional, quer contratar a TecMatch pra sua empresa, ou é profissional e quer se cadastrar?',
};

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [handoffSummary, setHandoffSummary] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending, handoffSummary]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setIsSending(true);
    try {
      // A saudação inicial é só visual — não vai pra IA.
      const { reply, handoff } = await sendChat(next.filter((m) => m !== GREETING));
      setMessages([...next, { role: 'assistant', content: reply }]);
      if (handoff) setHandoffSummary(handoff.summary);
    } catch {
      setUnavailable(true);
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: 'Não consegui responder agora. Mas nossa equipe te atende direto pelo WhatsApp, no botão abaixo.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  const fallbackText = `Olá! Vim pelo site da TecMatch.${
    messages.length > 1
      ? `\n\n${messages
          .filter((m) => m.role === 'user')
          .map((m) => m.content)
          .join('\n')}`
      : ''
  }`;
  const showWhatsapp = Boolean(WHATSAPP_NUMBER) && (handoffSummary !== null || unavailable);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded border-2 border-ink/15 bg-paper shadow-xl">
          <div className="flex items-center justify-between bg-ink px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-paper">Fale com a TecMatch</p>
              <p className="text-xs text-paper/60">Atendimento inicial por assistente de IA</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar conversa" className="text-paper/70 hover:text-paper">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`max-w-[85%] whitespace-pre-line rounded px-3 py-2 text-sm ${
                  message.role === 'user' ? 'self-end bg-ink text-paper' : 'self-start border border-line bg-white text-ink'
                }`}
              >
                {message.content}
              </p>
            ))}
            {isSending && <p className="self-start text-xs text-ink/50">Digitando...</p>}

            {showWhatsapp && (
              <a
                href={whatsappLink(
                  handoffSummary ? `Olá! Vim pelo site da TecMatch.\n\n${handoffSummary}` : fallbackText,
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 self-stretch rounded bg-moss px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} />
                Continuar no WhatsApp
              </a>
            )}
          </div>

          {!handoffSummary && (
            <form onSubmit={handleSubmit} className="flex gap-2 border-t-2 border-ink/10 bg-white p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={1000}
                placeholder="Escreva sua mensagem..."
                aria-label="Mensagem"
                className="flex-1 rounded border-2 border-line px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                aria-label="Enviar"
                className="rounded bg-signal px-3 text-ink transition-colors hover:bg-signal-dark disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          )}

          {WHATSAPP_NUMBER && !showWhatsapp && (
            <a
              href={whatsappLink('Olá! Vim pelo site da TecMatch.')}
              target="_blank"
              rel="noreferrer"
              className="bg-white pb-3 text-center text-xs text-ink/50 underline underline-offset-2 hover:text-ink"
            >
              Prefere falar direto com a equipe? Abrir WhatsApp
            </a>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Fechar atendimento' : 'Abrir atendimento'}
        className="flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        {!open && 'Fale conosco'}
      </button>
    </div>
  );
}
