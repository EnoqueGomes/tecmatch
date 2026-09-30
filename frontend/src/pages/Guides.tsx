import { Link } from 'react-router-dom';
import { GUIDES } from '@/content/guides';
import { META } from '@/content/meta';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export function formatGuideDate(value: string) {
  const [year, month, day] = value.split('-');
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

export function Guides() {
  useDocumentMeta(META.guides);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Guias técnicos</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Conteúdo prático para quem contrata serviços técnicos e de engenharia: normas, registro profissional e o
        que conferir antes de fechar um serviço.
      </p>

      <div className="mt-12 flex flex-col">
        {GUIDES.map((guide) => (
          <article key={guide.slug} className="border-t-2 border-ink/10 py-8 first:border-ink">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/40">
              {guide.category} · {formatGuideDate(guide.updatedAt)}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              <Link to={`/blog/${guide.slug}`} className="hover:text-blueprint">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 text-ink/70">{guide.description}</p>
            <Link to={`/blog/${guide.slug}`} className="mt-3 inline-block text-sm font-medium text-signal-dark hover:underline">
              Ler o guia
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
