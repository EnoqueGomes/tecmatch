import { useQuery } from '@tanstack/react-query';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getAssistantStatus, sendChat, type ChatMessage } from '@/api/assistant.api';
import { listCategories } from '@/api/categories.api';

// Número no formato internacional, só dígitos: 55 + DDD + número (ex: 5541999999999).
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ---------------------------------------------------------------------------
// Casca do balão (botão flutuante + painel), compartilhada pelos dois modos
// ---------------------------------------------------------------------------

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { data: status } = useQuery({
    queryKey: ['assistant-status'],
    queryFn: getAssistantStatus,
    staleTime: Infinity,
    retry: false,
  });

  // Sem número de WhatsApp configurado, não há para onde encaminhar: o balão não aparece.
  if (!WHATSAPP_NUMBER) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded border-2 border-ink/15 bg-paper shadow-xl">
          <div className="flex items-center justify-between bg-ink px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold text-paper">Fale com a TecMatch</p>
              <p className="text-xs text-paper/60">
                {status?.aiEnabled ? 'Atendimento inicial por assistente de IA' : 'Responda e continue no WhatsApp'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Fechar conversa" className="text-paper/70 hover:text-paper">
              <X size={18} />
            </button>
          </div>
          {status?.aiEnabled ? <AiChat /> : <GuidedChat onNavigate={() => setOpen(false)} />}
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

function Bubble({ from, children }: { from: 'bot' | 'user'; children: ReactNode }) {
  return (
    <p
      className={`max-w-[85%] whitespace-pre-line rounded px-3 py-2 text-sm ${
        from === 'user' ? 'self-end bg-ink text-paper' : 'self-start border border-line bg-white text-ink'
      }`}
    >
      {children}
    </p>
  );
}

function WhatsappButton({ text }: { text: string }) {
  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noreferrer"
      className="mt-1 inline-flex items-center justify-center gap-2 self-stretch rounded bg-moss px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
    >
      <MessageCircle size={16} />
      Continuar no WhatsApp
    </a>
  );
}

function TextInput({ placeholder, onSubmit, onSkip }: { placeholder: string; onSubmit: (value: string) => void; onSkip?: () => void }) {
  const [value, setValue] = useState('');
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue('');
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t-2 border-ink/10 bg-white p-3">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={500}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 rounded border-2 border-line px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
      />
      {onSkip && (
        <button type="button" onClick={onSkip} className="px-1 text-xs text-ink/50 hover:text-ink">
          Pular
        </button>
      )}
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Enviar"
        className="rounded bg-signal px-3 text-ink transition-colors hover:bg-signal-dark disabled:opacity-40"
      >
        <Send size={16} />
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Modo guiado (gratuito): perguntas em sequência, com botões e campos curtos
// ---------------------------------------------------------------------------

type Profile = 'cliente' | 'empresa' | 'profissional';
type Step = 'perfil' | 'area' | 'cidade' | 'nome' | 'descricao' | 'fim';

interface Answers {
  perfil?: Profile;
  area?: string;
  cidade?: string;
  nome?: string;
  descricao?: string;
}

const PROFILE_OPTIONS: { value: Profile; label: string }[] = [
  { value: 'cliente', label: 'Preciso de um profissional técnico' },
  { value: 'empresa', label: 'Quero contratar a TecMatch para minha empresa' },
  { value: 'profissional', label: 'Sou profissional e quero me cadastrar' },
];

const QUESTIONS: Record<Exclude<Step, 'fim'>, string> = {
  perfil: 'Olá! Sou o atendimento da TecMatch. Como podemos ajudar?',
  area: 'Qual a área do serviço?',
  cidade: 'Em qual cidade?',
  nome: 'Qual o seu nome? (e o da empresa, se houver)',
  descricao: 'Descreva rapidamente o que você precisa — ou pule, se preferir explicar no WhatsApp.',
};

function buildSummary(a: Answers) {
  const perfilTexto =
    a.perfil === 'empresa'
      ? 'Tenho interesse no TecMatch Gerenciado'
      : a.perfil === 'profissional'
        ? 'Sou profissional e tenho dúvidas sobre o cadastro'
        : 'Procuro um profissional técnico';
  const linhas: (string | undefined)[] = [
    'Olá! Vim pelo site da TecMatch.',
    '',
    a.nome ? `Nome: ${a.nome}` : undefined,
    perfilTexto,
    a.area ? `Área: ${a.area}` : undefined,
    a.cidade ? `Cidade: ${a.cidade}` : undefined,
    a.descricao ? `Detalhes: ${a.descricao}` : undefined,
  ];
  return linhas.filter((l) => l !== undefined).join('\n');
}

function GuidedChat({ onNavigate }: { onNavigate: () => void }) {
  const [step, setStep] = useState<Step>('perfil');
  const [answers, setAnswers] = useState<Answers>({});
  const [history, setHistory] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: QUESTIONS.perfil },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: listCategories });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, step]);

  function answer(field: keyof Answers, value: string, shown: string, next: Step) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setHistory((prev) => [
      ...prev,
      { from: 'user', text: shown },
      ...(next === 'fim' ? [] : [{ from: 'bot' as const, text: QUESTIONS[next] }]),
    ]);
    setStep(next);
  }

  function choosePerfil(option: (typeof PROFILE_OPTIONS)[number]) {
    if (option.value === 'profissional') {
      setAnswers({ perfil: 'profissional' });
      setHistory((prev) => [
        ...prev,
        { from: 'user', text: option.label },
        {
          from: 'bot',
          text: 'Que ótimo! O cadastro é gratuito: crie sua conta como profissional, escolha suas áreas e informe seu registro no Crea para receber o selo de verificado. Se tiver alguma dúvida, fale com a equipe pelo WhatsApp.',
        },
      ]);
      setStep('fim');
      return;
    }
    answer('perfil', option.value, option.label, 'area');
  }

  function restart() {
    setAnswers({});
    setHistory([{ from: 'bot', text: QUESTIONS.perfil }]);
    setStep('perfil');
  }

  const summary = buildSummary(answers);

  return (
    <>
      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {history.map((item, index) => (
          <Bubble key={index} from={item.from}>
            {item.text}
          </Bubble>
        ))}

        {step === 'perfil' && (
          <div className="flex flex-col gap-2">
            {PROFILE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => choosePerfil(option)}
                className="rounded border-2 border-ink/20 bg-white px-3 py-2 text-left text-sm text-ink transition-colors hover:border-ink"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {step === 'area' && (
          <div className="flex flex-wrap gap-2">
            {[...(categories?.map((c) => c.name) ?? []), 'Outra / não sei'].map((name) => (
              <button
                key={name}
                onClick={() => answer('area', name, name, 'cidade')}
                className="rounded border-2 border-line bg-white px-2.5 py-1.5 text-xs text-ink transition-colors hover:border-ink"
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {step === 'fim' && (
          <>
            {answers.perfil !== 'profissional' && (
              <Bubble from="bot">
                Obrigado! Toque no botão abaixo para enviar esse resumo à nossa equipe pelo WhatsApp:{'\n\n'}
                {summary.split('\n').slice(2).join('\n')}
              </Bubble>
            )}
            {answers.perfil === 'profissional' && (
              <Link
                to="/registro"
                onClick={onNavigate}
                className="inline-flex items-center justify-center self-stretch rounded bg-signal px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-signal-dark"
              >
                Criar meu cadastro gratuito
              </Link>
            )}
            <WhatsappButton text={summary} />
            <button onClick={restart} className="inline-flex items-center gap-1.5 self-center text-xs text-ink/50 hover:text-ink">
              <RotateCcw size={12} />
              Recomeçar
            </button>
          </>
        )}
      </div>

      {step === 'cidade' && (
        <TextInput placeholder="Ex: Curitiba" onSubmit={(v) => answer('cidade', v, v, 'nome')} />
      )}
      {step === 'nome' && (
        <TextInput placeholder="Seu nome" onSubmit={(v) => answer('nome', v, v, 'descricao')} />
      )}
      {step === 'descricao' && (
        <TextInput
          placeholder="O que você precisa?"
          onSubmit={(v) => answer('descricao', v, v, 'fim')}
          onSkip={() => answer('descricao', '', 'Prefiro explicar no WhatsApp', 'fim')}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Modo IA: só é usado quando ANTHROPIC_API_KEY está configurada no Render
// ---------------------------------------------------------------------------

const AI_GREETING: ChatMessage = {
  role: 'assistant',
  content:
    'Olá! Sou o assistente virtual da TecMatch. Posso tirar dúvidas e já encaminhar você pra nossa equipe. Você procura um profissional, quer contratar a TecMatch pra sua empresa, ou é profissional e quer se cadastrar?',
};

function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([AI_GREETING]);
  const [isSending, setIsSending] = useState(false);
  const [handoffSummary, setHandoffSummary] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending, handoffSummary]);

  async function send(text: string) {
    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setIsSending(true);
    try {
      const { reply, handoff } = await sendChat(next.filter((m) => m !== AI_GREETING));
      setMessages([...next, { role: 'assistant', content: reply }]);
      if (handoff) setHandoffSummary(handoff.summary);
    } catch {
      setUnavailable(true);
      setMessages([
        ...next,
        { role: 'assistant', content: 'Não consegui responder agora. Mas nossa equipe te atende direto pelo WhatsApp, no botão abaixo.' },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  const userText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join('\n');
  const whatsappText = handoffSummary
    ? `Olá! Vim pelo site da TecMatch.\n\n${handoffSummary}`
    : `Olá! Vim pelo site da TecMatch.${userText ? `\n\n${userText}` : ''}`;

  return (
    <>
      <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Bubble key={index} from={message.role === 'user' ? 'user' : 'bot'}>
            {message.content}
          </Bubble>
        ))}
        {isSending && <p className="self-start text-xs text-ink/50">Digitando...</p>}
        {(handoffSummary || unavailable) && <WhatsappButton text={whatsappText} />}
      </div>
      {!handoffSummary && !isSending && <TextInput placeholder="Escreva sua mensagem..." onSubmit={send} />}
    </>
  );
}
