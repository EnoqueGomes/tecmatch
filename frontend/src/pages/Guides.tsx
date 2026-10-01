import { Link } from 'react-router-dom';
import { GUIDES, type Guide } from '@/content/guides';
import { META } from '@/content/meta';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export function formatGuideDate(value: string) {
  const [year, month, day] = value.split('-');
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <div className="mt-6 flex flex-col">
      {guides.map((guide) => (
        <article key={guide.slug} className="border-t-2 border-ink/10 py-8 first:border-ink">
          <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
            {guide.category} · {formatGuideDate(guide.updatedAt)}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
            <Link to={`/blog/${guide.slug}`} className="hover:text-blueprint">
              {guide.title}
            </Link>
          </h3>
          <p className="mt-2 text-ink/70">{guide.description}</p>
          <Link to={`/blog/${guide.slug}`} className="mt-3 inline-block text-sm font-medium text-signal-dark hover:underline">
            Ler o guia
          </Link>
        </article>
      ))}
    </div>
  );
}

export function Guides() {
  useDocumentMeta(META.guides);
  const agro = GUIDES.filter((guide) => guide.sector === 'agro');
  const general = GUIDES.filter((guide) => guide.sector !== 'agro');

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Guias técnicos</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Conteúdo prático para quem contrata serviços técnicos e de engenharia: normas, registro profissional e o
        que conferir antes de fechar um serviço.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Agroindústria e armazenagem de grãos</h2>
        <p className="mt-2 max-w-2xl text-ink/70">
          Poeira combustível, NR-12, NR-33 e NR-35 em silos, moegas, elevadores e armazéns.{' '}
          <Link to="/diagnostico-seguranca-silos" className="font-medium text-blueprint underline underline-offset-2">
            Faça o autodiagnóstico gratuito
          </Link>
          .
        </p>
        <GuideList guides={agro} />
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Contratação e normas gerais</h2>
        <GuideList guides={general} />
      </section>
    </div>
  );
}
