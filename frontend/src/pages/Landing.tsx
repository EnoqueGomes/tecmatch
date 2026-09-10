import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listCategories } from '@/api/categories.api';
import { Button } from '@/components/ui/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const STEPS = [
  {
    title: 'Descreva o serviço',
    description: 'Conte o que precisa, onde e qual o orçamento esperado. Leva menos de dois minutos.',
  },
  {
    title: 'Receba propostas',
    description: 'Profissionais da sua região enviam preço, prazo e como resolveriam o problema.',
  },
  {
    title: 'Escolha e contrate',
    description: 'Compare avaliações e propostas, converse pelo chat e feche com quem fizer mais sentido.',
  },
];

export function Landing() {
  useDocumentMeta({
    title: 'Profissionais técnicos e engenharia sob medida',
    description:
      'Encontre técnicos e engenheiros verificados para o seu projeto, ou receba pedidos de clientes perto de você.',
  });
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: listCategories });

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              O profissional técnico certo para o seu projeto, sem depender de indicação.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Publique o serviço que você precisa e receba propostas de eletricistas, engenheiros e
              técnicos verificados perto de você.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/registro">
                <Button size="md">
                  Publicar um serviço
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/buscar">
                <Button variant="secondary" size="md">
                  Buscar profissionais
                </Button>
              </Link>
            </div>
          </div>
          <BlueprintMark />
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className="border-y-2 border-ink/10 bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-2xl font-semibold text-ink">Áreas atendidas</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/buscar?category=${category.slug}`}
                  className="rounded border-2 border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Como funciona</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-mono text-sm text-ink/40">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-paper">É profissional técnico?</h2>
            <p className="mt-2 max-w-md text-paper/70">
              Monte seu perfil, escolha suas áreas de atuação e comece a receber pedidos de serviço.
            </p>
          </div>
          <Link to="/registro">
            <Button size="md">Cadastrar como profissional</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function BlueprintMark() {
  return (
    <svg viewBox="0 0 400 320" className="hidden w-full max-w-md text-ink/15 md:block" aria-hidden="true">
      <rect x="20" y="20" width="360" height="280" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="20" y1="90" x2="380" y2="90" stroke="currentColor" strokeWidth="1" />
      <line x1="140" y1="90" x2="140" y2="300" stroke="currentColor" strokeWidth="1" />
      <line x1="260" y1="20" x2="260" y2="90" stroke="currentColor" strokeWidth="1" />
      <circle cx="80" cy="180" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M200 260 L230 200 L260 260" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="30" y="40" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="currentColor">
        420 x 280
      </text>
    </svg>
  );
}
