import { AlertTriangle, CheckCircle2, ClipboardCheck, MessageCircle, ShieldAlert } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { submitDiagnostic, UNIT_TYPE_LABELS, type UnitType } from '@/api/diagnostics.api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LinkedInCallout } from '@/components/ui/LinkedInCallout';
import {
  BLOCKS,
  LEVELS,
  QUESTIONS,
  computeResult,
  isComplete,
  type Answer,
  type DiagnosticResult,
  type Question,
} from '@/content/diagnostic';
import { DIAGNOSTIC_FAQ } from '@/content/faq';
import { META } from '@/content/meta';
import { COMPANY } from '@/content/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

type Step = 'intro' | 'quiz' | 'contact' | 'result';
type SaveState = 'ok' | 'failed' | null;

const EMPTY_FORM = {
  companyName: '',
  contactName: '',
  role: '',
  email: '',
  phone: '',
  city: '',
  unitType: '' as UnitType | '',
  consent: false,
  website: '', // campo-armadilha: pessoas nunca preenchem
};

export function Diagnostic() {
  useDocumentMeta(META.diagnostic);

  const [step, setStep] = useState<Step>('intro');
  const [blockIndex, setBlockIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Answer>>>({});
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState<SaveState>(null);

  // Ao trocar de etapa ou de bloco, volta ao topo (a tela é longa no celular).
  useEffect(() => {
    if (step !== 'intro') window.scrollTo({ top: 0 });
  }, [step, blockIndex]);

  const result = useMemo(() => computeResult(answers), [answers]);
  const answeredCount = QUESTIONS.filter((question) => answers[question.id] !== undefined).length;

  function restart() {
    setAnswers({});
    setForm(EMPTY_FORM);
    setSaved(null);
    setBlockIndex(0);
    setStep('intro');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isComplete(answers) || !form.unitType || !form.consent) return;

    setSubmitting(true);
    try {
      await submitDiagnostic({
        companyName: form.companyName,
        contactName: form.contactName,
        role: form.role || undefined,
        email: form.email,
        phone: form.phone,
        city: form.city,
        unitType: form.unitType,
        score: result.score,
        level: result.level,
        criticalGaps: result.criticalGaps.length,
        answers: answers as Record<string, Answer>,
        consent: true,
        website: form.website,
      });
      setSaved('ok');
    } catch {
      // Servidor fora do ar ou "dormindo": a pessoa não perde o resultado e
      // ainda pode falar com a equipe pelo WhatsApp com tudo preenchido.
      setSaved('failed');
    } finally {
      setSubmitting(false);
      setStep('result');
    }
  }

  if (step === 'intro') return <Intro onStart={() => setStep('quiz')} />;

  if (step === 'quiz') {
    const block = BLOCKS[blockIndex];
    const questions = QUESTIONS.filter((question) => question.block === block.id);
    const blockDone = questions.every((question) => answers[question.id] !== undefined);
    const isLast = blockIndex === BLOCKS.length - 1;

    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between text-sm text-ink/60">
          <span>
            Bloco {blockIndex + 1} de {BLOCKS.length}
          </span>
          <span>
            {answeredCount} de {QUESTIONS.length} respondidas
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded bg-ink/10" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={answeredCount}>
          <div className="h-full bg-signal transition-all" style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }} />
        </div>

        <h1 className="mt-8 font-display text-3xl font-semibold text-ink">{block.title}</h1>
        <p className="mt-1 text-ink/60">{block.subtitle}</p>

        <div className="mt-8 flex flex-col gap-5">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={(value) => setAnswers((previous) => ({ ...previous, [question.id]: value }))}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={() => (blockIndex === 0 ? setStep('intro') : setBlockIndex(blockIndex - 1))}
          >
            Voltar
          </Button>
          <Button
            disabled={!blockDone}
            onClick={() => (isLast ? setStep('contact') : setBlockIndex(blockIndex + 1))}
          >
            {isLast ? 'Ver meu resultado' : 'Próximo bloco'}
          </Button>
        </div>
        {!blockDone && <p className="mt-3 text-right text-sm text-ink/50">Responda todas as perguntas para continuar.</p>}
      </div>
    );
  }

  if (step === 'contact') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="flex items-center gap-2 text-moss">
          <CheckCircle2 size={20} aria-hidden="true" />
          <span className="font-medium">Respostas concluídas</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">Para ver seu resultado, informe seus dados</h1>
        <p className="mt-3 text-ink/70">
          A equipe da TecMatch usa estes dados para retornar com os pontos de atenção do seu resultado e, se fizer
          sentido, indicar profissionais habilitados.
        </p>

        <form onSubmit={handleSubmit} className="relative mt-8 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="contactName"
              label="Seu nome"
              required
              minLength={2}
              autoComplete="name"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            />
            <Input
              name="role"
              label="Cargo (opcional)"
              autoComplete="organization-title"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <Input
            name="companyName"
            label="Empresa ou unidade"
            required
            minLength={2}
            autoComplete="organization"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="email"
              type="email"
              label="E-mail"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              name="phone"
              type="tel"
              label="WhatsApp ou telefone"
              required
              minLength={8}
              autoComplete="tel"
              placeholder="(41) 99999-9999"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="city"
              label="Cidade e estado"
              required
              minLength={2}
              placeholder="Ex: Ponta Grossa/PR"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="unitType" className="text-sm font-medium text-ink">
                Tipo de unidade
              </label>
              <select
                id="unitType"
                name="unitType"
                required
                value={form.unitType}
                onChange={(e) => setForm({ ...form, unitType: e.target.value as UnitType })}
                className="w-full rounded border-2 border-line bg-white px-3 py-2 text-ink transition-colors focus:border-ink focus:outline-none"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {(Object.keys(UNIT_TYPE_LABELS) as UnitType[]).map((type) => (
                  <option key={type} value={type}>
                    {UNIT_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo-armadilha: escondido de pessoas, mas robôs costumam preenchê-lo. */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="website">Não preencha este campo</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <label className="mt-2 flex items-start gap-3 text-sm text-ink/80">
            <input
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-1 h-4 w-4 shrink-0 accent-ink"
            />
            <span>
              Autorizo a TecMatch a entrar em contato comigo sobre este diagnóstico e declaro ter lido a{' '}
              <Link to="/privacidade" target="_blank" className="text-blueprint underline underline-offset-2">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Button variant="secondary" type="button" onClick={() => setStep('quiz')}>
              Voltar
            </Button>
            <Button type="submit" isLoading={submitting}>
              Ver meu resultado
            </Button>
          </div>
          {submitting && (
            <p className="text-sm text-ink/50">Enviando… na primeira vez do dia isso pode levar até um minuto. Não feche a página.</p>
          )}
        </form>
      </div>
    );
  }

  return <ResultView result={result} saved={saved} companyName={form.companyName} contactName={form.contactName} onRestart={restart} />;
}

/* ------------------------------ Introdução ------------------------------ */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <span className="inline-flex items-center rounded border-2 border-signal/40 bg-signal/5 px-3 py-1 text-sm font-medium text-signal-dark">
        Agroindústria · gratuito
      </span>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
        Autodiagnóstico de segurança para unidades de grãos
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink/70">
        Responda 20 perguntas objetivas e veja seu nível de adequação em poeira combustível, NR-12, NR-33 e NR-35, com os
        pontos de atenção mais importantes para a sua unidade de beneficiamento e armazenamento de grãos.
      </p>
      <div className="mt-8">
        <Button size="md" onClick={onStart}>
          <ClipboardCheck size={18} aria-hidden="true" />
          Começar o diagnóstico
        </Button>
        <p className="mt-3 text-sm text-ink/50">Leva cerca de 5 minutos. Ao final, você informa seus dados de contato para ver o resultado.</p>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">O que o diagnóstico avalia</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {BLOCKS.map((block, index) => (
            <li key={block.id} className="border-t-2 border-ink pt-3">
              <span className="font-mono text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-lg font-semibold text-ink">{block.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{block.subtitle}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded border-2 border-ink/10 bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-ink">Como funciona e o que ele não é</h2>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-ink/80">
          <li>
            A nota considera o peso de cada item. Se houver item crítico não atendido, o nível nunca passa de “Atenção”,
            por melhor que seja o restante.
          </li>
          <li>
            É uma triagem baseada nas suas respostas. <strong>Não é laudo, inspeção, certificação nem garantia de conformidade
            legal</strong> e não substitui a avaliação de profissional habilitado.
          </li>
          <li>
            As perguntas se baseiam na NR-1, NR-12, NR-33, NR-35, na ABNT NBR IEC 60079-10-2, na NPT 27 do Corpo de
            Bombeiros do Paraná e nas orientações da SRTE-PR para unidades de grãos.
          </li>
        </ul>
        <p className="mt-4 text-sm text-ink/60">
          Quer entender os temas antes? Leia o guia{' '}
          <Link to="/blog/seguranca-em-unidades-armazenadoras-de-graos" className="text-blueprint underline underline-offset-2">
            segurança em unidades de grãos: normas e riscos prioritários
          </Link>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Perguntas frequentes</h2>
        <div className="mt-6 flex flex-col gap-6">
          {DIAGNOSTIC_FAQ.map((item) => (
            <div key={item.question}>
              <h3 className="font-display text-lg font-semibold text-ink">{item.question}</h3>
              <p className="mt-1 text-ink/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------ Pergunta ------------------------------ */

function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: Answer | undefined;
  onChange: (value: Answer) => void;
}) {
  const options: { value: Answer; label: string }[] = [
    { value: 'sim', label: 'Sim' },
    { value: 'parcial', label: 'Em parte' },
    { value: 'nao', label: 'Não' },
  ];
  if (question.naLabel) options.push({ value: 'na', label: question.naLabel });

  return (
    <fieldset className="rounded border-2 border-ink/10 bg-white p-5">
      <legend className="sr-only">{question.text}</legend>
      <p className="font-medium leading-snug text-ink">{question.text}</p>
      {question.help && <p className="mt-1.5 text-sm text-ink/60">{question.help}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="inline-block rounded border-2 border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-signal">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {value === 'nao' && question.warning && (
        <p role="alert" className="mt-4 flex gap-2 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            <strong>Atenção:</strong> {question.warning}
          </span>
        </p>
      )}
    </fieldset>
  );
}

/* ------------------------------ Resultado ------------------------------ */

function digits(value: string) {
  return value.replace(/\D/g, '');
}

function ResultView({
  result,
  saved,
  companyName,
  contactName,
  onRestart,
}: {
  result: DiagnosticResult;
  saved: SaveState;
  companyName: string;
  contactName: string;
  onRestart: () => void;
}) {
  const level = LEVELS[result.level];
  const topGaps = result.gaps.slice(0, 6);

  const message =
    `Olá! Fiz o autodiagnóstico de segurança no site da TecMatch.\n\n` +
    `Empresa: ${companyName}\nContato: ${contactName}\n` +
    `Resultado: ${level.label} (${result.score}%)\n` +
    `Itens críticos não atendidos: ${result.criticalGaps.length}\n\n` +
    `Gostaria de conversar sobre os pontos de atenção.`;
  const whatsappHref = `https://wa.me/${digits(COMPANY.whatsapp)}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Seu resultado</h1>

      {saved === 'ok' && (
        <p className="mt-3 flex items-start gap-2 text-sm text-moss">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          Recebemos seus dados. Nossa equipe vai entrar em contato com os pontos de atenção do seu resultado.
        </p>
      )}
      {saved === 'failed' && (
        <p role="alert" className="mt-3 rounded border border-signal/50 bg-signal/10 px-3 py-2 text-sm text-ink">
          Não conseguimos registrar seu contato agora, mas o seu resultado está aqui. Para falar com a equipe, use o botão
          do WhatsApp abaixo: a mensagem já vai com o seu resultado.
        </p>
      )}

      <div className={`mt-6 rounded border-2 p-6 ${level.tone}`}>
        <p className="font-mono text-xs uppercase tracking-wide opacity-70">Nível de adequação</p>
        <p className="mt-1 font-display text-4xl font-semibold">
          {level.label} <span className="text-2xl font-normal opacity-80">· {result.score}%</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed">{level.summary}</p>
        {result.cappedByCritical && (
          <p className="mt-3 text-sm font-medium">
            A nota seria maior, mas o nível foi limitado a “Atenção” porque há item crítico não atendido.
          </p>
        )}
      </div>

      {result.criticalGaps.length > 0 && (
        <section className="mt-8 rounded border-2 border-red-300 bg-red-50 p-6">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-red-800">
            <ShieldAlert size={22} aria-hidden="true" />
            Itens críticos não atendidos ({result.criticalGaps.length})
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {result.criticalGaps.map((question) => (
              <li key={question.id} className="text-sm text-red-900">
                <span className="block text-xs font-medium uppercase tracking-wide text-red-700/80">Você respondeu “Não”</span>
                <strong className="mt-0.5 block">{question.text}</strong>
                <span className="mt-1 block">{question.advice}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-ink">Resultado por área</h2>
        <ul className="mt-4 flex flex-col gap-4">
          {result.blocks.map((block) => (
            <li key={block.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-ink">{block.title}</span>
                <span className="font-mono text-ink/60">{block.score === null ? 'não se aplica' : `${block.score}%`}</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded bg-ink/10">
                {block.score !== null && (
                  <div
                    className={`h-full ${block.score >= 70 ? 'bg-moss' : block.score >= 40 ? 'bg-signal' : 'bg-red-600'}`}
                    style={{ width: `${block.score}%` }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {topGaps.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-ink">Principais pontos de atenção</h2>
          <ol className="mt-4 flex list-decimal flex-col gap-4 pl-5 text-ink/80">
            {topGaps.map((question) => (
              <li key={question.id}>
                <strong className="text-ink">{question.advice}</strong>
              </li>
            ))}
          </ol>
          {result.gaps.length > topGaps.length && (
            <p className="mt-3 text-sm text-ink/60">
              Há mais {result.gaps.length - topGaps.length} ponto(s) de atenção. A equipe da TecMatch detalha todos no contato.
            </p>
          )}
        </section>
      )}

      <div className="mt-10 rounded border-2 border-moss/40 bg-moss/5 p-6">
        <p className="font-display text-lg font-semibold text-ink">Quer transformar isso em plano de ação?</p>
        <p className="mt-1 text-sm text-ink/70">
          A TecMatch conecta sua unidade a profissionais habilitados para estudo de classificação de áreas, adequação à
          NR-12, NR-33 e NR-35, e acompanha o projeto do início à entrega.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-moss px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Falar com a equipe no WhatsApp
          </a>
          <Link to="/servico-gerenciado">
            <Button variant="secondary">Conhecer o TecMatch Gerenciado</Button>
          </Link>
        </div>
      </div>

      <LinkedInCallout className="mt-6" />

      <p className="mt-8 border-t-2 border-ink/10 pt-6 text-sm text-ink/50">
        Este resultado é uma triagem orientativa baseada em respostas declaradas. Não é laudo, inspeção, certificação nem
        garantia de conformidade legal, e não substitui a avaliação de profissional habilitado.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={onRestart}>
          Refazer o diagnóstico
        </Button>
        <Link to="/blog/seguranca-em-unidades-armazenadoras-de-graos">
          <Button variant="ghost">Ler o guia de segurança em unidades de grãos</Button>
        </Link>
      </div>
    </div>
  );
}
