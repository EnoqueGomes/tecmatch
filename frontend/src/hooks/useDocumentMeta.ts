import { useEffect } from 'react';
import { canonicalUrl, formatTitle } from '@/lib/seo';

interface DocumentMetaOptions {
  title: string;
  description?: string;
  /** Páginas que não devem aparecer no Google (ex.: página não encontrada). */
  noindex?: boolean;
}

export function useDocumentMeta({ title, description, noindex }: DocumentMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = formatTitle(title);

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? null;
    if (description && meta) {
      meta.setAttribute('content', description);
    }

    // Endereço oficial de cada página. Sem isso, todas as páginas herdariam o
    // endereço da página inicial e o Google as trataria como cópias dela.
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute('href');
    canonical.setAttribute('href', canonicalUrl(window.location.pathname));

    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      if (description && meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
      if (createdCanonical) canonical?.remove();
      else if (previousCanonical !== null) canonical?.setAttribute('href', previousCanonical);
      robots?.remove();
    };
  }, [title, description, noindex]);
}
