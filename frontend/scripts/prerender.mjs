// Gera um HTML estático, com conteúdo, título, descrição, endereço oficial e
// dados estruturados próprios, para cada página pública. Também escreve o
// sitemap.xml e o llms.txt a partir da mesma lista. Roda no final do build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, getSeoPages, COMPANY, SITE_URL } = await import(ssrEntry);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const pages = getSeoPages();

const escAttr = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const setMeta = (html, attr, name, value) => {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[\\s\\S]*?(")`);
  if (!pattern.test(html)) throw new Error(`meta ${name} não encontrada no template`);
  return html.replace(pattern, (_, before, after) => `${before}${escAttr(value)}${after}`);
};
const urlOf = (pagePath) => `${SITE_URL}${pagePath === '/' ? '/' : pagePath}`;

// 1) Monta tudo na memória primeiro: se qualquer página falhar, nada é escrito
//    e o site continua funcionando como aplicativo normal.
const output = pages.map((page) => {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(page.title)}</title>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'property', 'og:type', page.ogType);
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);

  const head = [
    `<link rel="canonical" href="${urlOf(page.path)}" />`,
    `<meta property="og:url" content="${urlOf(page.path)}" />`,
    ...page.jsonLd.map(
      (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`,
    ),
  ].join('\n    ');
  html = html.replace('</head>', () => `    ${head}\n  </head>`);

  const body = render(page.path);
  if (!body || body.length < 200) throw new Error(`página ${page.path} renderizou vazia`);
  if (!template.includes('<div id="root"></div>')) throw new Error('raiz do app não encontrada no template');
  html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

  return { page, html };
});

// 2) Escreve as páginas.
for (const { page, html } of output) {
  const target = path.join(dist, page.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  console.log(`  ✓ ${page.path}`);
}

// 3) sitemap.xml — só páginas que queremos no Google.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((page) => page.inSitemap)
  .map((page) => `  <url>\n    <loc>${urlOf(page.path)}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// 4) llms.txt — resumo do site escrito para assistentes de IA.
const line = (page) => `- [${page.title}](${urlOf(page.path)}): ${page.description}`;
const main = pages.filter((page) => page.inSitemap && !page.path.startsWith('/blog/'));
const guides = pages.filter((page) => page.path.startsWith('/blog/'));
const llms = `# TecMatch

> Marketplace que conecta empresas e pessoas a engenheiros e técnicos com registro profissional conferido (Crea ou CRT), em Curitiba e no Paraná, Brasil.

A TecMatch (${COMPANY.legalName}) atua em duas frentes:

1. Marketplace: o cliente publica gratuitamente um pedido de serviço, recebe propostas de profissionais e escolhe com quem fechar. Áreas: elétrica, hidráulica, construção civil, mecânica, refrigeração e climatização, automação industrial, TI e redes, topografia, segurança do trabalho, projetos estruturais e manutenção industrial.
2. TecMatch Gerenciado: a empresa contrata a TecMatch diretamente, e a TecMatch seleciona e acompanha o profissional técnico certo para o projeto, do início à entrega, com um único ponto de contato.

Verificação: cada profissional informa o número do registro no conselho da sua profissão (Crea, para engenheiros; CRT, para técnicos industriais). A equipe da TecMatch confere o número na consulta pública do conselho antes de liberar o selo de verificado. Perfis sem selo ainda não tiveram o registro conferido.

## Páginas principais

${main.map(line).join('\n')}

## Guias técnicos

${guides.map(line).join('\n')}

## Contato

WhatsApp: ${COMPANY.whatsappDisplay} (https://wa.me/${COMPANY.whatsapp}). Empresas interessadas no TecMatch Gerenciado também podem usar o formulário em ${SITE_URL}/servico-gerenciado#contato.
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Páginas geradas: ${pages.length} (sitemap e llms.txt atualizados)`);
