// Dados fixos do site num só lugar. Para trocar o endereço oficial, o WhatsApp,
// o e-mail ou o LinkedIn, edite aqui. Campos vazios ('') simplesmente não
// aparecem no site.

// Endereço oficial (canônico). Hoje a Vercel redireciona tecmatch.com.br para
// www.tecmatch.com.br, então o "www" é o endereço que vale para o Google.
export const SITE_URL = 'https://www.tecmatch.com.br';

// Data da última mudança relevante de conteúdo (usada no sitemap).
export const LAST_UPDATE = '2026-10-01';

export const COMPANY = {
  brand: 'TecMatch',
  // Conforme o cartão CNPJ emitido em 30/09/2026.
  legalName: 'TecMatch Serviços de Engenharia Ltda',
  cnpj: '69.396.373/0001-20',
  city: 'Curitiba',
  state: 'PR',
  whatsapp: '5541999892104',
  whatsappDisplay: '(41) 99989-2104',
  email: '', // ex: 'contato@tecmatch.com.br'
  // Endereço da página da empresa no LinkedIn, ex: 'https://www.linkedin.com/company/tecmatch'
  linkedin: 'https://www.linkedin.com/company/tecmatch-br',
  // Revisão técnica dos guias (sinal de confiança para quem lê e para o Google).
  // Se preencher, aparece "Revisão técnica: nome, cargo, registro" em cada guia.
  reviewer: { name: '', role: '', registration: '' },
};
