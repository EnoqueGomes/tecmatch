import { COMPANY } from '@/content/site';
import { META } from '@/content/meta';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

// Atualizada em 01/10/2026. Se o atendimento do site passar a usar IA
// (ANTHROPIC_API_KEY no Render), revise a seção "Atendimento pelo site".
const UPDATED = '1º de outubro de 2026';

const SECTIONS: { heading: string; paragraphs?: string[]; list?: string[] }[] = [
  {
    heading: '1. Quem é o responsável pelos dados',
    paragraphs: [
      `${COMPANY.legalName}, com sede em ${COMPANY.city}/${COMPANY.state}, é a responsável (controladora) pelo tratamento dos dados pessoais coletados neste site, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).`,
    ],
  },
  {
    heading: '2. Quais dados coletamos',
    list: [
      'Cadastro: nome, e-mail, senha (guardada de forma criptografada, nunca em texto aberto) e, quando informados, telefone, cidade e estado.',
      'Profissionais: áreas de atuação, descrição do perfil, valor por hora e número do registro profissional (Crea ou CRT), usado para a verificação.',
      'Uso da plataforma: pedidos de serviço, propostas, mensagens trocadas entre cliente e profissional e avaliações.',
      'Formulário do TecMatch Gerenciado: nome da empresa, nome do contato, e-mail, telefone e descrição do que a empresa precisa.',
      'Autodiagnóstico de segurança para unidades de grãos: nome, cargo (opcional), empresa, e-mail, telefone, cidade, tipo de unidade e as respostas ao questionário, com o resultado calculado.',
      'Dados técnicos de acesso, como endereço IP e data e hora, registrados pelos servidores que hospedam o site.',
    ],
  },
  {
    heading: '3. Atendimento pelo site e WhatsApp',
    paragraphs: [
      'O atendimento inicial do botão “Fale conosco” é guiado: suas respostas ficam apenas no seu navegador e não são enviadas aos nossos servidores. Elas só saem dele se você tocar em “Continuar no WhatsApp”, quando a conversa passa a seguir os termos e a política de privacidade do WhatsApp.',
    ],
  },
  {
    heading: '4. Para que usamos os dados',
    list: [
      'Criar e manter sua conta e permitir o uso da plataforma.',
      'Conferir o registro profissional e exibir o selo de verificado.',
      'Conectar clientes e profissionais e permitir a troca de propostas e mensagens.',
      'Atender contatos feitos pelo formulário, pelo chat ou pelo WhatsApp.',
      'Retornar o contato sobre o resultado do autodiagnóstico, com base no consentimento que você dá antes de enviá-lo.',
      'Garantir a segurança da plataforma e prevenir fraudes.',
      'Cumprir obrigações legais e regulatórias.',
    ],
  },
  {
    heading: '5. Com quem compartilhamos',
    paragraphs: [
      'Dados de perfil de profissionais (nome, cidade, áreas, descrição, valor por hora, selo de verificado e avaliações) são públicos no site. Quando há uma proposta ou conversa, cliente e profissional veem os dados necessários para o contato.',
      'Usamos provedores de infraestrutura para hospedar o site, o servidor e o banco de dados, e um provedor de pagamentos (Stripe) para eventuais assinaturas, que processa os dados do cartão sem que a TecMatch os armazene. Alguns desses provedores podem manter dados em servidores fora do Brasil, o que fazemos de acordo com a LGPD. Também podemos compartilhar dados quando a lei ou uma autoridade exigir.',
    ],
  },
  {
    heading: '6. Cookies e armazenamento no navegador',
    paragraphs: [
      'Guardamos no seu navegador apenas o necessário para manter você conectado à sua conta. Não usamos cookies de publicidade nem ferramentas de rastreamento de terceiros neste momento.',
    ],
  },
  {
    heading: '7. Por quanto tempo guardamos',
    paragraphs: [
      'Mantemos os dados enquanto sua conta estiver ativa e pelo tempo necessário para cumprir obrigações legais e resolver eventuais disputas. Depois disso, os dados são eliminados ou anonimizados.',
    ],
  },
  {
    heading: '8. Seus direitos',
    paragraphs: ['Pela LGPD, você pode solicitar a qualquer momento:'],
    list: [
      'Confirmação de que tratamos seus dados e acesso a eles.',
      'Correção de dados incompletos, inexatos ou desatualizados.',
      'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei.',
      'Portabilidade dos dados.',
      'Informações sobre com quem compartilhamos seus dados.',
      'Revogação de consentimento, quando o tratamento se basear nele.',
    ],
  },
  {
    heading: '9. Como falar com a gente',
    paragraphs: [
      `Para exercer seus direitos ou tirar dúvidas sobre esta política, fale com a equipe pelo WhatsApp ${COMPANY.whatsappDisplay}${COMPANY.email ? ` ou pelo e-mail ${COMPANY.email}` : ''}.`,
    ],
  },
  {
    heading: '10. Mudanças nesta política',
    paragraphs: ['Podemos atualizar esta política. A data da última atualização fica sempre indicada no topo da página.'],
  },
];

export function Privacy() {
  useDocumentMeta(META.privacy);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink">Política de Privacidade</h1>
      <p className="mt-3 text-sm text-ink/50">Última atualização: {UPDATED}</p>

      {SECTIONS.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-relaxed text-ink/80">
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-ink/80">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
