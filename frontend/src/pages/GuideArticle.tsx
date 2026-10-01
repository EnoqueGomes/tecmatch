import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { LinkedInCallout } from '@/components/ui/LinkedInCallout';
import { RichText } from '@/components/ui/RichText';
import { findGuide, GUIDES } from '@/content/guides';
import { COMPANY } from '@/content/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { formatGuideDate } from './Guides';
import { NotFound } from './NotFound';

// "Como verificar o registro" -> "como-verificar-o-registro" (âncoras do sumário)
export function anchorId(heading: string) {
  return heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function GuideArticle() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? findGuide(slug) : undefined;

  useDocumentMeta({
    title: guide?.title ?? 'Guia não encontrado',
    description: guide?.description,
    noindex: !guide,
  });

  if (!guide) return <NotFound />;

  // "Leia também": até 4 guias, dando preferência aos do mesmo setor.
  const others = GUIDES.filter((item) => item.slug !== guide.slug)
    .sort((a, b) => Number(b.sector === guide.sector) - Number(a.sector === guide.sector))
    .slice(0, 4);
  const reviewer = COMPANY.reviewer;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <nav aria-label="Você está em" className="text-sm text-ink/50">
        <Link to="/" className="hover:text-ink">
          Início
        </Link>
        {' › '}
        <Link to="/blog" className="hover:text-ink">
          Guias técnicos
        </Link>
      </nav>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink/40">{guide.category}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink">{guide.title}</h1>
      <p className="mt-4 text-lg text-ink/70">{guide.description}</p>
      <p className="mt-4 text-sm text-ink/50">
        Por Equipe TecMatch · Publicado em {formatGuideDate(guide.publishedAt)}
        {guide.updatedAt !== guide.publishedAt && ` · Atualizado em ${formatGuideDate(guide.updatedAt)}`}
        {reviewer.name &&
          ` · Revisão técnica: ${reviewer.name}${reviewer.role ? `, ${reviewer.role}` : ''}${
            reviewer.registration ? ` (${reviewer.registration})` : ''
          }`}
      </p>

      {guide.sections.length > 3 && (
        <nav aria-label="Neste guia" className="mt-8 rounded border-2 border-ink/10 bg-white p-5">
          <p className="font-display text-sm font-semibold text-ink">Neste guia</p>
          <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-sm text-blueprint">
            {guide.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${anchorId(section.heading)}`} className="hover:underline">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {guide.sections.map((section) => {
        const ListTag = section.ordered ? 'ol' : 'ul';
        return (
          <section key={section.heading} id={anchorId(section.heading)} className="mt-10 scroll-mt-6">
            <h2 className="font-display text-2xl font-semibold text-ink">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ink/80">
                <RichText text={paragraph} />
              </p>
            ))}
            {section.list && (
              <ListTag
                className={`mt-3 flex flex-col gap-2 pl-5 leading-relaxed text-ink/80 ${
                  section.ordered ? 'list-decimal' : 'list-disc'
                }`}
              >
                {section.list.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ListTag>
            )}
          </section>
        );
      })}

      {guide.sources && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-ink">Base normativa e fontes</h2>
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-ink/70">
            {guide.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10 border-t-2 border-ink/10 pt-6 text-sm text-ink/50">
        Este guia tem caráter informativo e não substitui a orientação de um profissional habilitado, nem a consulta à
        legislação vigente.
      </p>

      <div className="mt-10 rounded border-2 border-signal/40 bg-signal/5 p-6">
        <p className="text-ink">{guide.cta.text}</p>
        <Link to={guide.cta.to} className="mt-4 inline-block">
          <Button>{guide.cta.label}</Button>
        </Link>
      </div>

      <LinkedInCallout className="mt-6" />

      {others.length > 0 && (
        <aside className="mt-14">
          <h2 className="font-display text-xl font-semibold text-ink">Leia também</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link to={`/blog/${item.slug}`} className="text-blueprint hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
