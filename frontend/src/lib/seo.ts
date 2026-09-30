import { SITE_URL } from '@/content/site';

// Título das abas e dos resultados do Google. Usado tanto no navegador quanto
// na geração das páginas estáticas, para os dois sempre coincidirem.
export function formatTitle(title: string) {
  return title.includes('TecMatch') ? title : `${title} | TecMatch`;
}

export function canonicalUrl(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return `${SITE_URL}${clean || '/'}`;
}
