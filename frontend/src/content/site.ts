// Dados fixos do site num só lugar. Para trocar o endereço oficial, o WhatsApp
// ou preencher CNPJ e e-mail (eles só aparecem no rodapé quando preenchidos),
// edite aqui.

// Endereço oficial (canônico). Hoje a Vercel redireciona tecmatch.com.br para
// www.tecmatch.com.br, então o "www" é o endereço que vale para o Google.
export const SITE_URL = 'https://www.tecmatch.com.br';

// Data da última mudança relevante de conteúdo (usada no sitemap).
export const LAST_UPDATE = '2026-09-30';

export const COMPANY = {
  brand: 'TecMatch',
  legalName: 'TecMatch Serviços de Engenharia', // confirme se é igual à razão social do CNPJ
  city: 'Curitiba',
  state: 'PR',
  whatsapp: '5541999892104',
  whatsappDisplay: '(41) 99989-2104',
  cnpj: '', // ex: '00.000.000/0001-00' — aparece no rodapé quando preenchido
  email: '', // ex: 'contato@tecmatch.com.br' — aparece no rodapé quando preenchido
};
