// Tabela das páginas públicas que viram HTML estático no build. Cada uma leva
// título, descrição, endereço oficial e dados estruturados próprios.
import { HOME_FAQ, MANAGED_FAQ } from './content/faq';
import { GUIDES } from './content/guides';
import { META } from './content/meta';
import { COMPANY, LAST_UPDATE, SITE_URL } from './content/site';
import { canonicalUrl, formatTitle } from './lib/seo';

export interface SeoPage {
  path: string; // endereço no site
  file: string; // arquivo gerado dentro de dist/
  title: string;
  description: string;
  ogType: 'website' | 'article';
  lastmod: string; // AAAA-MM-DD
  inSitemap: boolean;
  jsonLd: object[];
}

const faqPage = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.path),
  })),
});

export function getSeoPages(): SeoPage[] {
  return [
    {
      path: '/',
      file: 'index.html',
      title: formatTitle(META.home.title),
      description: META.home.description,
      ogType: 'website',
      lastmod: LAST_UPDATE,
      inSitemap: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: COMPANY.brand,
          alternateName: COMPANY.legalName,
          url: `${SITE_URL}/`,
          inLanguage: 'pt-BR',
        },
        faqPage(HOME_FAQ),
      ],
    },
    {
      path: '/servico-gerenciado',
      file: 'servico-gerenciado.html',
      title: formatTitle(META.managed.title),
      description: META.managed.description,
      ogType: 'website',
      lastmod: LAST_UPDATE,
      inSitemap: true,
      jsonLd: [
        faqPage(MANAGED_FAQ),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'TecMatch Gerenciado',
          serviceType: 'Gestão de serviços técnicos e de engenharia',
          provider: { '@type': 'Organization', name: COMPANY.brand, url: `${SITE_URL}/` },
          areaServed: { '@type': 'State', name: 'Paraná' },
          url: canonicalUrl('/servico-gerenciado'),
        },
        breadcrumbs([
          { name: 'Início', path: '/' },
          { name: 'TecMatch Gerenciado', path: '/servico-gerenciado' },
        ]),
      ],
    },
    {
      path: '/blog',
      file: 'blog.html',
      title: formatTitle(META.guides.title),
      description: META.guides.description,
      ogType: 'website',
      lastmod: GUIDES.reduce((latest, guide) => (guide.updatedAt > latest ? guide.updatedAt : latest), LAST_UPDATE),
      inSitemap: true,
      jsonLd: [
        breadcrumbs([
          { name: 'Início', path: '/' },
          { name: 'Guias técnicos', path: '/blog' },
        ]),
      ],
    },
    ...GUIDES.map(
      (guide): SeoPage => ({
        path: `/blog/${guide.slug}`,
        file: `blog/${guide.slug}.html`,
        title: formatTitle(guide.title),
        description: guide.description,
        ogType: 'article',
        lastmod: guide.updatedAt,
        inSitemap: true,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.description,
            datePublished: guide.publishedAt,
            dateModified: guide.updatedAt,
            inLanguage: 'pt-BR',
            mainEntityOfPage: canonicalUrl(`/blog/${guide.slug}`),
            author: { '@type': 'Organization', name: COMPANY.brand, url: `${SITE_URL}/` },
            publisher: { '@type': 'Organization', name: COMPANY.brand, url: `${SITE_URL}/` },
          },
          breadcrumbs([
            { name: 'Início', path: '/' },
            { name: 'Guias técnicos', path: '/blog' },
            { name: guide.title, path: `/blog/${guide.slug}` },
          ]),
        ],
      }),
    ),
    {
      path: '/privacidade',
      file: 'privacidade.html',
      title: formatTitle(META.privacy.title),
      description: META.privacy.description,
      ogType: 'website',
      lastmod: LAST_UPDATE,
      inSitemap: false,
      jsonLd: [],
    },
  ];
}
