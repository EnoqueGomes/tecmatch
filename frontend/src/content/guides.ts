// Guias técnicos do blog. Cada guia vira uma página própria, gerada como HTML
// estático no build — é isso que o Google e os assistentes de IA conseguem ler.
//
// Para publicar um guia novo: copie um bloco abaixo, mude o "slug" (o endereço),
// o texto e as datas, e envie ao GitHub como de costume. Nos parágrafos, use
// [texto](/endereço) para links e **texto** para negrito.

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
  ordered?: boolean; // true = lista numerada
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // AAAA-MM-DD
  updatedAt: string; // AAAA-MM-DD — atualize quando revisar o texto
  category: string;
  sections: GuideSection[];
  sources?: string[];
  cta: { text: string; label: string; to: string };
}

export const GUIDES: Guide[] = [
  {
    slug: 'como-contratar-engenheiro-ou-tecnico-checklist',
    title: 'Como contratar um engenheiro ou técnico: checklist antes de fechar',
    description:
      'Passo a passo para contratar serviços técnicos e de engenharia com segurança: registro, ART ou TRT, escopo, contrato, prazos e forma de pagamento.',
    publishedAt: '2026-09-30',
    updatedAt: '2026-09-30',
    category: 'Contratação',
    sections: [
      {
        heading: 'Antes de pedir propostas',
        paragraphs: [
          'Descreva o serviço com o máximo de clareza: o que precisa ser feito, onde, em que prazo e com qual finalidade. Propostas só são comparáveis quando o pedido é claro — quanto mais vago o pedido, mais difícil comparar preços.',
        ],
      },
      {
        heading: 'Confira o profissional ou a empresa',
        paragraphs: ['Antes de aceitar qualquer proposta, verifique:'],
        list: [
          'Registro ativo no conselho da profissão (Crea ou CRT). Veja [como consultar o registro](/blog/como-verificar-registro-crea-crt).',
          'Registro da empresa no conselho, se a contratação for de uma empresa e não de uma pessoa.',
          'Atribuição profissional compatível com o serviço.',
          'Referências e trabalhos anteriores semelhantes ao que você precisa.',
        ],
      },
      {
        heading: 'Exija a responsabilidade técnica',
        paragraphs: [
          'Peça a [ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica) do serviço e confira se a descrição da atividade corresponde ao que foi contratado. É esse documento que indica quem responde tecnicamente pelo trabalho.',
        ],
      },
      {
        heading: 'Compare propostas pelo conteúdo, não só pelo preço',
        paragraphs: ['Ao colocar propostas lado a lado, compare:'],
        list: [
          'Escopo detalhado, com o que está e o que não está incluído.',
          'Prazo de execução e de entrega de documentos.',
          'Materiais: quem fornece e com quais especificações.',
          'Condições de pagamento e o que acontece em caso de atraso ou retrabalho.',
          'Garantia oferecida sobre o serviço.',
        ],
      },
      {
        heading: 'Desconfie de propostas muito abaixo das demais',
        paragraphs: [
          'Um preço muito inferior aos outros merece perguntas. Pode indicar escopo incompleto, materiais diferentes do especificado ou ausência de responsabilidade técnica. Peça que o profissional explique a diferença antes de decidir.',
        ],
      },
      {
        heading: 'Formalize tudo por escrito',
        paragraphs: [
          'Registre escopo, prazo, valor, forma de pagamento e responsabilidades em contrato ou em ordem de serviço escrita. Sempre que possível, combine pagamentos por etapas, ligados a entregas verificáveis, em vez de pagar tudo adiantado.',
        ],
      },
      {
        heading: 'Acompanhe e só então encerre o pagamento',
        paragraphs: [
          'Acompanhe a execução, peça registros do que foi feito e só faça o pagamento final depois de conferir a entrega e receber a documentação prometida, como laudos, projetos, manuais e a ART ou TRT.',
        ],
      },
      {
        heading: 'Prefere delegar a gestão?',
        paragraphs: [
          'Empresas que não querem comparar propostas nem acompanhar a execução podem contratar a TecMatch diretamente pelo [TecMatch Gerenciado](/servico-gerenciado): a equipe seleciona o profissional e acompanha o serviço até a entrega.',
        ],
      },
    ],
    cta: {
      text: 'Publique seu pedido e receba propostas de profissionais com registro conferido pela equipe da TecMatch.',
      label: 'Publicar um serviço',
      to: '/registro',
    },
  },
  {
    slug: 'como-verificar-registro-crea-crt',
    title: 'Como verificar o registro de um engenheiro ou técnico (Crea e CRT)',
    description:
      'Engenheiros se registram no Crea e técnicos industriais no CRT. Veja como consultar o registro de um profissional e o que observar antes de fechar o serviço.',
    publishedAt: '2026-09-30',
    updatedAt: '2026-09-30',
    category: 'Contratação',
    sections: [
      {
        heading: 'Cada profissional, um conselho',
        paragraphs: [
          'Um erro comum é procurar todo profissional técnico no Crea. Desde a Lei nº 13.639/2018, a divisão é esta:',
        ],
        list: [
          'Engenheiros, agrônomos e geocientistas: registro no Crea do estado (no Paraná, o Crea-PR), dentro do sistema Confea/Crea.',
          'Técnicos industriais, como técnicos em eletrotécnica, mecânica e edificações: registro no CRT, dentro do sistema CFT/CRT.',
        ],
      },
      {
        heading: 'E os profissionais sem conselho?',
        paragraphs: [
          'Eletricistas, encanadores e outros profissionais com qualificação profissional, sem formação de nível técnico ou superior, não têm conselho de classe. Nesses casos, peça comprovantes dos cursos exigidos para a função (como o treinamento da NR-10, para trabalho com eletricidade) e referências de trabalhos anteriores.',
        ],
      },
      {
        heading: 'Como consultar',
        paragraphs: ['Os dois sistemas mantêm consultas públicas gratuitas em seus sites. O caminho é este:'],
        list: [
          'Engenheiros: acesse a [consulta pública do Confea](https://consultaprofissional.confea.org.br/) ou o site do Crea do seu estado.',
          'Técnicos industriais: acesse o site do [CFT](https://www.cft.org.br/) ou do CRT do seu estado e procure a consulta de profissionais.',
          'Pesquise pelo nome, pelo número de registro ou pelo CPF, conforme as opções que o site oferecer.',
          'Compare o resultado com o que o profissional informou: nome, título e número de registro.',
        ],
        ordered: true,
      },
      {
        heading: 'Pesquise no conselho certo',
        paragraphs: [
          'Um técnico industrial não aparece na consulta do Crea, e isso não significa que ele esteja irregular. Da mesma forma, um engenheiro não será encontrado no CRT. Se a busca não retornar nada, confirme se está no conselho correspondente à formação da pessoa.',
        ],
      },
      {
        heading: 'O que observar no resultado',
        paragraphs: ['Mais do que a existência do registro, confira:'],
        list: [
          'Se o registro está ativo.',
          'O título profissional, e se ele é compatível com o serviço que você vai contratar.',
          'Se há restrições ou observações no cadastro.',
        ],
      },
      {
        heading: 'Empresas também precisam de registro',
        paragraphs: [
          'A exigência vale também para empresas que prestam serviços técnicos: elas devem ter registro no conselho correspondente à sua atividade, com um responsável técnico habilitado. Ao contratar uma empresa, consulte o registro dela, além do registro do profissional que assinará a [ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica).',
        ],
      },
      {
        heading: 'Registro não é tudo',
        paragraphs: [
          'O registro confirma que a pessoa pode exercer a profissão. Para avaliar se ela é a pessoa certa para o seu serviço, combine essa verificação com referências, avaliações de outros clientes e uma proposta clara, com escopo, prazo e emissão da ART ou TRT. O [checklist de contratação](/blog/como-contratar-engenheiro-ou-tecnico-checklist) reúne esses cuidados.',
        ],
      },
    ],
    sources: [
      'Lei nº 13.639/2018 (criação do CFT e dos CRTs).',
      'Lei nº 6.839/1980 (registro de empresas e profissionais nos conselhos).',
    ],
    cta: {
      text: 'Quer pular essa etapa? Na TecMatch, o registro é conferido pela nossa equipe antes do selo de verificado.',
      label: 'Buscar profissionais',
      to: '/buscar',
    },
  },
  {
    slug: 'art-e-trt-responsabilidade-tecnica',
    title: 'ART e TRT: o documento que você deve exigir antes de contratar',
    description:
      'Saiba o que são a ART e a TRT, qual profissional emite cada uma e por que exigir esse documento protege quem contrata serviços de engenharia e técnicos.',
    publishedAt: '2026-09-30',
    updatedAt: '2026-09-30',
    category: 'Contratação',
    sections: [
      {
        heading: 'Por que isso importa',
        paragraphs: [
          'Quem contrata uma instalação elétrica, um projeto estrutural ou a manutenção de um equipamento quer ter certeza de que existe um profissional respondendo tecnicamente pelo serviço. É exatamente para isso que existem a ART e a TRT.',
        ],
      },
      {
        heading: 'O que é a ART',
        paragraphs: [
          'A ART (Anotação de Responsabilidade Técnica) foi instituída pela Lei nº 6.496/1977 e é registrada no Crea. Ela identifica o profissional e a empresa responsáveis por uma obra ou serviço de engenharia, agronomia ou geociências e define os limites dessa responsabilidade.',
          'A lei determina que contratos, escritos ou verbais, para execução de obras ou prestação de serviços de engenharia ficam sujeitos à ART. Ela é emitida por profissionais registrados no sistema Confea/Crea, como engenheiros. Arquitetos e urbanistas têm um documento equivalente, o RRT, registrado no CAU.',
        ],
      },
      {
        heading: 'O que é a TRT',
        paragraphs: [
          'A TRT (Termo de Responsabilidade Técnica) cumpre papel equivalente para os técnicos industriais. Desde a Lei nº 13.639/2018, esses profissionais deixaram o sistema Confea/Crea e passaram a ter conselho próprio: o Conselho Federal dos Técnicos Industriais (CFT) e os Conselhos Regionais (CRT). A TRT é registrada no CRT.',
        ],
      },
      {
        heading: 'O que conferir no documento',
        paragraphs: ['Antes do início do serviço, peça uma cópia do documento e confira:'],
        list: [
          'Nome e número de registro do profissional responsável.',
          'Descrição da atividade, compatível com o que foi contratado.',
          'Endereço da obra ou do serviço.',
          'Autenticidade, pela consulta disponível no site do conselho que registrou o documento.',
        ],
      },
      {
        heading: 'Como exigir na prática',
        paragraphs: [
          'Cada documento tem uma taxa definida pelo conselho, e vale combinar no contrato quem arca com ela. Inclua a apresentação da ART ou TRT como condição no contrato ou no pedido de compra: um profissional sério não vê problema nessa exigência, porque ela faz parte do trabalho regularizado.',
          'Para os demais cuidados antes de fechar, veja o [checklist de contratação](/blog/como-contratar-engenheiro-ou-tecnico-checklist).',
        ],
      },
    ],
    sources: [
      'Lei nº 6.496/1977 (institui a ART).',
      'Lei nº 13.639/2018 (cria o CFT e os CRTs e a TRT).',
      'Lei nº 12.378/2010 (RRT, arquitetos e urbanistas).',
    ],
    cta: {
      text: 'Na TecMatch, o registro profissional é conferido pela nossa equipe antes do selo de verificado.',
      label: 'Buscar profissionais verificados',
      to: '/buscar',
    },
  },
  {
    slug: 'nr-12-adequacao-de-maquinas',
    title: 'NR-12: o que é e quando sua empresa precisa adequar máquinas',
    description:
      'Entenda o que a NR-12 exige de máquinas e equipamentos, quando a adequação é necessária e como organizar o processo com um profissional habilitado.',
    publishedAt: '2026-09-30',
    updatedAt: '2026-09-30',
    category: 'Segurança do Trabalho',
    sections: [
      {
        heading: 'O que é a NR-12',
        paragraphs: [
          'A NR-12 é a Norma Regulamentadora, do Ministério do Trabalho e Emprego, que trata da segurança no trabalho em máquinas e equipamentos. Ela define medidas de proteção para prevenir acidentes e doenças ocupacionais nas fases de projeto e de uso das máquinas, incluindo instalação, operação, manutenção e limpeza.',
          'Na prática, a norma alcança empresas de praticamente todos os setores que utilizam máquinas: de metalúrgicas e indústrias de alimentos a gráficas, padarias e armazéns de grãos.',
        ],
      },
      {
        heading: 'O que a norma costuma exigir',
        paragraphs: ['Os pontos mais comuns de uma adequação envolvem:'],
        list: [
          'Proteções fixas e móveis que impeçam o acesso às zonas de perigo da máquina.',
          'Dispositivos de intertravamento, que param a máquina quando uma proteção é aberta.',
          'Dispositivos de parada de emergência acessíveis ao operador.',
          'Sistemas de comando e partida seguros, que evitem acionamentos acidentais.',
          'Sinalização, manuais e procedimentos de trabalho.',
          'Capacitação dos trabalhadores que operam e fazem manutenção nas máquinas.',
        ],
      },
      {
        heading: 'Quando a adequação é necessária',
        paragraphs: [
          'A adequação é necessária sempre que uma máquina não atende aos requisitos da norma — situação comum em equipamentos mais antigos, importados sem adaptação ou modificados ao longo do tempo. Muitas empresas só percebem o problema após uma fiscalização, uma auditoria de cliente ou um acidente.',
          'Não é preciso esperar por nenhum desses eventos. Um levantamento preventivo permite planejar os investimentos por etapas, em vez de agir sob pressão.',
        ],
      },
      {
        heading: 'Como organizar o processo',
        paragraphs: ['Um caminho usual para a adequação é:'],
        list: [
          'Fazer o inventário das máquinas da empresa.',
          'Contratar a apreciação de riscos de cada máquina, feita por profissional legalmente habilitado, com o registro de responsabilidade técnica correspondente.',
          'Elaborar o plano de adequação, priorizando os riscos mais graves.',
          'Implementar as proteções e sistemas de segurança definidos no plano.',
          'Capacitar os trabalhadores e manter a documentação atualizada.',
        ],
        ordered: true,
      },
      {
        heading: 'Como escolher quem vai fazer',
        paragraphs: [
          'Confirme que o profissional tem registro ativo no conselho da sua profissão (Crea, para engenheiros; CRT, para técnicos industriais) e atribuição compatível com o serviço. Exija também o documento de responsabilidade técnica do trabalho, a [ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica). Esses cuidados protegem sua empresa e garantem que alguém responda tecnicamente pela adequação.',
          'Para saber como conferir o registro, veja [como verificar o registro de um engenheiro ou técnico](/blog/como-verificar-registro-crea-crt).',
        ],
      },
    ],
    sources: [
      'NR-12: Segurança no Trabalho em Máquinas e Equipamentos (Ministério do Trabalho e Emprego). A norma é atualizada periodicamente: confira sempre a versão vigente.',
    ],
    cta: {
      text: 'Precisa adequar máquinas à NR-12? A TecMatch encontra o profissional habilitado para o seu projeto.',
      label: 'Falar com a TecMatch',
      to: '/servico-gerenciado',
    },
  },
  {
    slug: 'pmoc-plano-manutencao-ar-condicionado',
    title: 'PMOC do ar-condicionado: quem precisa ter e como contratar',
    description:
      'Entenda o que é o PMOC, quais edifícios devem ter o plano de manutenção do ar-condicionado segundo a Lei 13.589/2018 e quem pode elaborá-lo.',
    publishedAt: '2026-09-30',
    updatedAt: '2026-09-30',
    category: 'Refrigeração e Climatização',
    sections: [
      {
        heading: 'O que é o PMOC',
        paragraphs: [
          'PMOC significa Plano de Manutenção, Operação e Controle. É o documento técnico que organiza como os sistemas de climatização de um edifício serão mantidos, operados e monitorados, com o objetivo de eliminar ou reduzir riscos à saúde de quem ocupa os ambientes.',
        ],
      },
      {
        heading: 'Quem precisa ter',
        paragraphs: [
          'A Lei nº 13.589/2018 determina que todos os edifícios de uso público e coletivo com ambientes de ar interior climatizado artificialmente devem dispor de um PMOC. Isso inclui, por exemplo, escritórios, clínicas, escolas, lojas e órgãos públicos.',
          'Os parâmetros técnicos seguem a Portaria nº 3.523/1998, do Ministério da Saúde, e a Resolução RE nº 9/2003, da Anvisa. Se houver dúvida sobre o enquadramento do seu imóvel, consulte a vigilância sanitária do município ou um profissional habilitado.',
        ],
      },
      {
        heading: 'O que o plano costuma conter',
        paragraphs: ['Embora o conteúdo dependa do edifício, um PMOC costuma incluir:'],
        list: [
          'Identificação do edifício e do responsável pelo sistema de climatização.',
          'Inventário dos equipamentos de climatização.',
          'Rotinas de manutenção preventiva e de limpeza, com periodicidade definida.',
          'Procedimentos de operação e de controle da qualidade do ar interior.',
          'Registro das manutenções realizadas e identificação do responsável técnico.',
        ],
      },
      {
        heading: 'Quem pode elaborar e assinar',
        paragraphs: [
          'O plano deve ser elaborado por profissional legalmente habilitado, que assume a responsabilidade técnica por meio da [ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica). A lei chegou a prever que essa responsabilidade seria exclusiva de engenheiros mecânicos, mas esse trecho foi vetado. Na prática, o que vale é a atribuição profissional para o serviço, comprovada pelo registro no conselho e pelo documento de responsabilidade técnica.',
        ],
      },
      {
        heading: 'Riscos de não ter o plano',
        paragraphs: [
          'A ausência do PMOC pode configurar infração sanitária e sujeitar o responsável pelo imóvel a fiscalização e penalidades, além de expor os ocupantes a riscos à saúde e a empresa a problemas de manutenção dos equipamentos.',
        ],
      },
      {
        heading: 'Como contratar',
        paragraphs: [
          'Peça ao profissional o registro ativo no conselho, o documento de responsabilidade técnica e um cronograma de manutenção claro. Guarde os registros de cada visita: eles fazem parte da comprovação do plano. Veja também o [checklist de contratação](/blog/como-contratar-engenheiro-ou-tecnico-checklist).',
        ],
      },
    ],
    sources: [
      'Lei nº 13.589/2018 (manutenção de sistemas de climatização de ambientes).',
      'Portaria nº 3.523/1998 (Ministério da Saúde).',
      'Resolução RE nº 9/2003 (Anvisa).',
    ],
    cta: {
      text: 'Precisa de um PMOC para o seu imóvel? A TecMatch encontra o profissional habilitado.',
      label: 'Falar com a TecMatch',
      to: '/servico-gerenciado',
    },
  },
];

export function findGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
