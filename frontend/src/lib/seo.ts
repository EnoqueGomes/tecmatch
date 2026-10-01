import { SITE_URL } from '@/content/site';

// Título das abas e dos resultados do Google. Usado tanto no navegador quanto
// na geração das páginas estáticas, para os dois sempre coincidirem.
export function formatTitle(title: string) {
  if (title.includes('TecMatch')) return title;
  // O Google corta títulos longos (perto de 60 caracteres): se o sufixo da marca
  // fizesse o título passar de 65, ele é omitido.
  const withBrand = `${title} | TecMatch`;
  return withBrand.length <= 65 ? withBrand : title;
}

export function canonicalUrl(path: string) {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return `${SITE_URL}${clean || '/'}`;
}
