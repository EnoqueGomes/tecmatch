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
  sector?: 'agro'; // guias do setor agroindustrial ganham destaque no site
  sections: GuideSection[];
  sources?: string[];
  cta: { text: string; label: string; to: string };
}

export const GUIDES: Guide[] = [
  // ======================= AGROINDÚSTRIA / UNIDADES DE GRÃOS =======================
  {
    slug: 'seguranca-em-unidades-armazenadoras-de-graos',
    title: 'Segurança em unidades de grãos: normas e riscos prioritários',
    description:
      'Poeira combustível, máquinas, espaços confinados e altura: veja como NR-1, NR-12, NR-33, NR-35 e a NPT 27 se conectam em silos, moegas e armazéns de grãos.',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    category: 'Agroindústria',
    sector: 'agro',
    sections: [
      {
        heading: 'Por que as unidades de grãos concentram riscos graves',
        paragraphs: [
          'As unidades de beneficiamento e armazenamento de grãos (UBAG) reúnem no mesmo lugar poeira combustível, máquinas em movimento, espaços confinados e trabalho em altura. Em cada uma dessas frentes, um erro de projeto, de manutenção ou de procedimento pode terminar em explosão, esmagamento, soterramento ou queda.',
          'Por isso a Superintendência Regional do Trabalho no Paraná (SRTE-PR) conduziu um projeto setorial sobre espaços confinados e publicou orientações específicas para as UBAG. Elas tratam de poeiras combustíveis, transportadores, engolfamento e soterramento, rosca varredora e moegas, e indicam o que as empresas devem providenciar.',
        ],
      },
      {
        heading: 'As quatro frentes de risco',
        paragraphs: ['Cada frente tem seu próprio guia, com o que a norma pede e o que a fiscalização observa:'],
        list: [
          '**Poeira combustível e atmosfera explosiva:** como a poeira de grãos vira risco de explosão e o que é a classificação de áreas. Veja [atmosfera explosiva por poeira combustível em unidades de grãos](/blog/atmosfera-explosiva-poeira-combustivel-graos).',
          '**Máquinas e transportadores (NR-12):** sensores em elevadores de canecas, proteção de partes móveis e rosca varredora. Veja [NR-12 em unidades de grãos](/blog/nr-12-elevadores-transportadores-rosca-varredora).',
          '**Espaços confinados (NR-33):** engolfamento e soterramento em silos, graneleiros e moegas. Veja [NR-33 em silos e moegas](/blog/nr-33-silos-moegas-engolfamento-soterramento).',
          '**Trabalho em altura (NR-35):** ancoragem permanente, monotrilho e resgate. Veja [NR-35 em silos, torres e moegas](/blog/nr-35-trabalho-em-altura-silos-torres-moegas).',
        ],
      },
      {
        heading: 'Como as normas se conectam',
        paragraphs: [
          'A NR-1 é a base: ela exige o gerenciamento dos riscos ocupacionais, que na prática aparece no PGR. É nele que a unidade deve mostrar que identificou os riscos de explosão, engolfamento, máquinas e altura e que definiu as medidas de controle. As NR-12, NR-33 e NR-35 detalham as exigências de cada frente.',
          'No Paraná, a NPT 27 do Corpo de Bombeiros, que trata de unidades de armazenamento e beneficiamento de produtos agrícolas e insumos, acrescenta requisitos de projeto e operação, como sensores em transportadores e viga monotrilho no teto de silos. Normas da ABNT completam o conjunto, entre elas a NBR IEC 60079-10-2, sobre classificação de áreas com poeiras combustíveis.',
        ],
      },
      {
        heading: 'Situações que podem caracterizar grave e iminente risco',
        paragraphs: [
          'Nas orientações da SRTE-PR, alguns cenários aparecem como situações que podem caracterizar grave e iminente risco, com consequente interdição da operação:',
        ],
        list: [
          'Motor elétrico ou bandeja de cabos sob camada de poeira em área classificada.',
          'Elevador de canecas em espaço confinado sem sensores de temperatura, de velocidade e de desalinhamento.',
          'Trabalhadores dentro do silo com a rosca varredora em movimento.',
          'Operação em moegas sem acesso seguro e sem garantia contra engolfamento.',
        ],
      },
      {
        heading: 'Por onde começar',
        paragraphs: ['Uma sequência prática para uma unidade que quer sair do improviso:'],
        list: [
          'Atualizar o PGR para incluir explosão por poeira, engolfamento, máquinas e altura.',
          'Contratar o estudo de classificação de áreas, com profissional habilitado e ART.',
          'Fazer a apreciação de riscos de elevadores, transportadores e roscas e instalar os sensores de segurança.',
          'Rever o método de ingresso em silos e moegas, instalar ancoragem horizontal permanente e ter plano de resgate.',
          'Regularizar capacitações (NR-33 e NR-35), PET, permissões de trabalho e bloqueio de energia.',
          'Registrar tudo: limpezas, inspeções, treinamentos e auditorias internas.',
        ],
        ordered: true,
      },
      {
        heading: 'Quem pode assinar estudos e projetos',
        paragraphs: [
          'Estudos, projetos e laudos desta área devem ser assinados por profissional legalmente habilitado, com registro no conselho e emissão de [ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica). Segundo a SRTE-PR, o projeto e a instalação dos equipamentos de segurança em moegas, por exemplo, devem estar sob responsabilidade de profissional legalmente habilitado.',
          'Para ter uma ideia de onde sua unidade está hoje, use o [autodiagnóstico gratuito](/diagnostico-seguranca-silos).',
        ],
      },
    ],
    sources: [
      'NR-1, NR-12, NR-33 e NR-35 (Ministério do Trabalho e Emprego). As normas são atualizadas periodicamente: confira sempre a versão vigente.',
      'NPT 27: Unidades de armazenamento e/ou beneficiamento de produtos agrícolas e insumos (Corpo de Bombeiros do Paraná).',
      'ABNT NBR IEC 60079-10-2 (classificação de áreas com poeiras combustíveis) e ABNT NBR 16577, conforme citadas pela SRTE-PR.',
      'Orientações 01 a 06 da SRTE-PR para unidades de beneficiamento e armazenamento de grãos (Projeto Setorial Espaços Confinados).',
    ],
    cta: {
      text: 'Descubra em 5 minutos como está a sua unidade em poeira combustível, NR-12, NR-33 e NR-35.',
      label: 'Fazer o autodiagnóstico gratuito',
      to: '/diagnostico-seguranca-silos',
    },
  },
  {
    slug: 'atmosfera-explosiva-poeira-combustivel-graos',
    title: 'Atmosfera explosiva por poeira combustível em unidades de grãos',
    description:
      'Entenda como a poeira de grãos vira risco de explosão, o que é a classificação de áreas (zonas 20, 21 e 22) e o que a fiscalização orienta sobre limpeza e controle.',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    category: 'Agroindústria',
    sector: 'agro',
    sections: [
      {
        heading: 'Como a poeira de grãos pode explodir',
        paragraphs: [
          'Uma explosão de poeira precisa de cinco elementos, conhecidos como pentágono da explosão: combustível (a própria poeira), fonte de ignição, oxigênio, dispersão da poeira em nuvem e confinamento. Em unidades de grãos, três deles estão quase sempre presentes: a poeira, o oxigênio do ar e a dispersão causada ao movimentar o produto.',
          'Por isso o controle se concentra no que a unidade consegue evitar: reduzir a poeira em suspensão e em camadas, eliminar fontes de ignição e impedir o confinamento da nuvem.',
        ],
      },
      {
        heading: 'Poeira em suspensão e poeira em camadas',
        paragraphs: [
          'A poeira combustível em suspensão forma, com o ar, misturas que podem deflagrar na presença de uma fonte de ignição. É a explosão primária.',
          'A poeira em camadas é a que se deposita sobre pisos, estruturas, motores e bandejas de cabos. O problema é que a pressão da explosão primária pode levantar essas camadas e criar novas nuvens, provocando explosões secundárias, em geral mais destrutivas. Segundo a SRTE-PR, citando a ABNT NBR IEC 60079-10-2, até uma camada fina pode virar nuvem, ser inflamada e causar explosão.',
          'O histórico do setor mostra o efeito em cadeia. Em 1998, uma explosão em uma unidade de grãos no Kansas (EUA) matou sete pessoas; a apuração apontou a falta de limpeza de poeira e de manutenção dos transportadores, e a ignição foi atribuída ao atrito de um rolete travado em uma correia. A SRTE-PR também cita uma explosão de poeira de milho em Palotina (PR), em 2023.',
        ],
      },
      {
        heading: 'Classificação de áreas: zonas 20, 21 e 22',
        paragraphs: [
          'A ABNT NBR IEC 60079-10-2 organiza as áreas com poeira combustível em zonas, conforme a frequência e a duração da atmosfera explosiva:',
        ],
        list: [
          '**Zona 20:** a atmosfera explosiva de poeira está presente de forma contínua, por longos períodos ou com frequência.',
          '**Zona 21:** a atmosfera explosiva pode ocorrer ocasionalmente, em condições normais de operação.',
          '**Zona 22:** a atmosfera explosiva não é provável em operação normal e, se ocorrer, dura pouco.',
        ],
      },
      {
        heading: 'Por que a zona importa para os equipamentos',
        paragraphs: [
          'A zona define o nível de proteção exigido dos equipamentos elétricos: EPL Da para a Zona 20, Db para a Zona 21 e Dc para a Zona 22. Em geral, o interior de elevadores, filtros e roscas tende a receber classificações mais severas do que o entorno, mas cada caso depende do estudo.',
          'A NPT 27 do Corpo de Bombeiros do Paraná também pede que as luminárias das áreas com formação de poeira, inclusive as de emergência, sejam adequadas a áreas classificadas. As instalações elétricas seguem as normas ABNT NBR 5410 e NBR IEC 60079-14, e a inspeção e a manutenção seguem a NBR IEC 60079-17.',
        ],
      },
      {
        heading: 'O que é o estudo de classificação de áreas',
        paragraphs: ['É o documento técnico que delimita as zonas da unidade. Um estudo consistente costuma reunir:'],
        list: [
          'Propriedades da poeira de cada grão processado: tamanho de partícula, concentração mínima de explosão, energia mínima de ignição, temperaturas de ignição, pressão máxima de explosão e classe de explosividade.',
          'Levantamento das fontes de liberação de poeira: moegas, tombadores, elevadores, transportadores, máquinas de limpeza, filtros e silos.',
          'Avaliação das medidas de controle existentes: ventilação, captação de pó, limpeza, aterramento e controle de fontes de ignição.',
          'Definição das zonas, com planta ou layout, e recomendações para equipamentos e procedimentos.',
        ],
      },
      {
        heading: 'O que a fiscalização orienta',
        paragraphs: ['A Orientação 01 da SRTE-PR organiza as medidas em quatro objetivos:'],
        list: [
          'Reduzir a geração primária de poeira: manter as vedações de elevadores e tubulações e instalar supressores de poeira, como centralizadores de fluxo de grãos, em bicas, tulhas de expedição e dutos sobre moegas.',
          'Reduzir a poeira em suspensão: sistemas de despoeiramento nos pontos de maior geração, inclusive com filtros pontuais.',
          'Reduzir a concentração da poeira: exaustão e ventilação geral em túneis e poços de elevador, que devem estar ativas quando houver pessoas nesses espaços.',
          'Manter a limpeza das áreas classificadas, evitando a formação de camadas, com relatórios periódicos, cronograma e procedimentos.',
        ],
      },
      {
        heading: 'Limpeza: quanto de poeira é demais',
        paragraphs: [
          'A NBR IEC 60079-10-2 descreve três níveis de limpeza. No nível bom, as camadas são desprezíveis ou inexistentes. No regular, elas não são desprezíveis, mas duram pouco, em geral menos que uma troca de turno. No pobre, persistem por longos períodos e o risco de explosão secundária pode ser significativo.',
          'A SRTE-PR cita, com base na ABNT NBR 16385:2015 e na NPT 27, que as camadas de poeira combustível não podem exceder 0,8 mm de espessura; ao atingir esse limite, a limpeza deve ser imediata. Por isso os relatórios de limpeza precisam registrar a espessura medida antes de cada limpeza.',
        ],
      },
      {
        heading: 'Fontes de ignição que mais aparecem',
        paragraphs: ['O controle da ignição exige olhar para os equipamentos e para as pessoas:'],
        list: [
          'Superfícies quentes: mancais e rolamentos que superaquecem, motores cobertos de poeira.',
          'Faíscas e atrito mecânico: correia desalinhada roçando na carcaça do elevador, rolete ou eixo travado.',
          'Eletricidade estática: falta de aterramento e equipotencialização de estruturas e equipamentos.',
          'Chama: solda e corte sem permissão de trabalho a quente.',
          'Equipamentos elétricos sem proteção compatível com a zona.',
        ],
      },
      {
        heading: 'Outras proteções que o estudo pode recomendar',
        paragraphs: [
          'Conforme o caso, a análise de riscos pode apontar medidas adicionais, como correias resistentes a fogo e óleo (a NBR 16385 pede isso para elevadores de canecas), detectores lineares de temperatura em correias transportadoras e dispositivos de alívio de explosão. Esses itens exigem projeto de profissional habilitado. Os sensores dos elevadores estão detalhados em [NR-12 em unidades de grãos](/blog/nr-12-elevadores-transportadores-rosca-varredora).',
        ],
      },
      {
        heading: 'Documentos que a unidade deve manter',
        paragraphs: ['Segundo a SRTE-PR, a unidade deve elaborar e manter, no mínimo:'],
        list: [
          'Descrição do sistema de ventilação e exaustão de túneis e poços.',
          'Relatórios periódicos sobre poeira em camadas nas áreas classificadas, com a situação imediatamente anterior à limpeza e a espessura medida.',
          'Descrição dos procedimentos, equipamentos e cronograma de limpeza.',
          'Estudo de Classificação de Áreas, com as medidas de mitigação, controle e limpeza informadas nele. Esse estudo deve ser assinado por [profissional habilitado, com ART ou TRT](/blog/art-e-trt-responsabilidade-tecnica).',
        ],
      },
    ],
    sources: [
      'ABNT NBR IEC 60079-10-2 (classificação de áreas, poeiras combustíveis); NBR IEC 60079-14 e 60079-17 (instalações elétricas); ABNT NBR 16385:2015.',
      'NPT 27: Unidades de armazenamento e/ou beneficiamento de produtos agrícolas e insumos (Corpo de Bombeiros do Paraná).',
      'Orientação 01 (Poeiras Combustíveis) e Orientação 02 da SRTE-PR para unidades de beneficiamento e armazenamento de grãos.',
    ],
    cta: {
      text: 'Descubra em 5 minutos como está a sua unidade em poeira combustível, NR-12, NR-33 e NR-35.',
      label: 'Fazer o autodiagnóstico gratuito',
      to: '/diagnostico-seguranca-silos',
    },
  },
  {
    slug: 'nr-12-elevadores-transportadores-rosca-varredora',
    title: 'NR-12 em unidades de grãos: elevadores, correias e rosca varredora',
    description:
      'O que a SRTE-PR orienta sobre sensores em elevadores de canecas e transportadores, proteção de partes móveis e o risco da rosca varredora em silos.',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    category: 'Agroindústria',
    sector: 'agro',
    sections: [
      {
        heading: 'Máquinas de grãos pedem mais do que a NR-12 básica',
        paragraphs: [
          'Elevadores de canecas, correias, redlers e roscas têm os riscos clássicos de qualquer máquina, como agarramento, corte e choque elétrico. Quando ficam em áreas classificadas, ou em espaços confinados, entra um risco adicional: o de operar em atmosfera explosiva.',
          'A Orientação 02 da SRTE-PR lembra que a NR-12 manda considerar o risco de combustíveis e inflamáveis e recomenda que a apreciação de riscos inclua também a análise específica para poeiras combustíveis, conforme o item 5.5 da ABNT NBR 17135:2024.',
        ],
      },
      {
        heading: 'Elevadores de canecas e transportadores: sensores que desligam sozinhos',
        paragraphs: ['A orientação indica, no mínimo, estas medidas para elevadores de canecas e transportadores:'],
        list: [
          'Apreciação de riscos específica para elevadores, transportadores e equipamentos similares.',
          'Sensores de desalinhamento da correia.',
          'Sensores de temperatura nos mancais.',
          'Sensor de velocidade no tambor movido, para interromper o movimento se a velocidade cair abaixo de 80%, ou conforme a apreciação de riscos.',
          'Plano e cronograma de inspeção e manutenção periódicas, sob responsabilidade de profissional habilitado.',
        ],
      },
      {
        heading: 'O que torna os sensores obrigatórios na prática',
        paragraphs: [
          'A NPT 27 do Corpo de Bombeiros do Paraná pede sensores de temperatura nos mancais e sensores de movimento para detectar escorregamento da correia ou corrente, com desligamento automático dos motores. A NR-12 trata o desalinhamento anormal da correia, e a ABNT NBR 16385:2015 trata a queda de velocidade nos elevadores de canecas.',
          'Os sensores precisam acionar o desligamento automático diante da anormalidade, e o monitoramento do intertravamento segue a NR-12. Quando os sensores ficam em área classificada, a avaliação deles deve constar no relatório de inspeção conforme a NBR IEC 60079-17.',
        ],
      },
      {
        heading: 'Por que esses pontos são tão críticos',
        paragraphs: [
          'Cada sensor cobre uma fonte de ignição conhecida. Mancal sobreaquecido, correia desalinhada roçando na carcaça, eixo movido travado ou rolete preso podem gerar calor e faíscas suficientes para inflamar a poeira dentro do elevador ou do túnel. No acidente de 1998 nos EUA, a apuração atribuiu a ignição a um rolete travado.',
          'A SRTE-PR registra em suas orientações uma explosão na perna de um elevador de grãos no Paraná, em 2019, e classifica como situação de grave e iminente risco o elevador instalado em espaço confinado sem sensores de mancais, de velocidade e de desalinhamento.',
        ],
      },
      {
        heading: 'Manutenção: quem inspeciona e como',
        paragraphs: [
          'Os sensores só protegem se funcionam. A orientação pede plano e cronograma de inspeção e manutenção sob responsabilidade de profissional habilitado, para garantir o funcionamento seguro de roletes e demais componentes móveis. A SRTE-PR observou que muitas unidades dividem o trabalho: um serviço centralizado cuida das intervenções mais complexas e a equipe local faz as simples. Em qualquer modelo, quem intervém precisa de treinamento e de plano ou cronograma.',
        ],
      },
      {
        heading: 'Proteção de partes móveis',
        paragraphs: [
          'As partes móveis devem ter proteção conforme a NR-12. A SRTE-PR chama atenção para os motores nas cabeças dos elevadores, onde eixos, correias e polias de transmissão costumam ficar expostos. Entre as ocorrências registradas, há o caso de um trabalhador que, durante uma inspeção, teve o cinturão e parte do talabarte enrolados no eixo de acoplamento entre o motor e o redutor, que estava sem proteção fixa.',
        ],
      },
      {
        heading: 'Rosca varredora: o risco que mais mata',
        paragraphs: [
          'Na descarga final do silo, trabalhadores entram com a rosca em movimento para empurrá-la, puxar e varrer grãos e quebrar blocos. A proximidade da rosca, somada à superfície irregular da massa de grãos, cria alto risco de contato dos membros inferiores com o equipamento, o que provavelmente causa a morte do trabalhador.',
          'A orientação distingue dois tipos. Na rosca de operação manual, o trabalhador empurra o eixo helicoidal. Na rosca autônoma (também chamada automática ou autopropelida), motores de avanço movimentam o eixo, e a operação pode ser acompanhada de fora do silo.',
          'A NR-12 estabelece a ordem de prioridade das medidas: proteção coletiva, depois medidas administrativas ou de organização do trabalho e, por último, proteção individual. Na rosca varredora, as proteções coletivas se aplicam só em parte, porque a rosca sempre terá algum grau de exposição, e não existe EPI capaz de prevenir o esmagamento.',
        ],
      },
      {
        heading: 'O que as unidades devem fazer, no mínimo',
        paragraphs: ['Para a rosca varredora, a SRTE-PR indica:'],
        list: [
          'Proibir a permanência de trabalhadores dentro do silo com a rosca em operação, o que é possível adotando ou adaptando roscas autônomas.',
          'Adotar bloqueio de energia durante o ingresso, de execução simples, com chaves junto ao painel de comando da rosca, conforme NR-12 e NR-33.',
          'Elaborar procedimentos de segurança detalhados, com passo a passo claro e compatível com o pessoal disponível na unidade.',
        ],
      },
      {
        heading: 'Quando vira interdição',
        paragraphs: [
          'A operação de roscas varredoras com trabalhadores dentro do silo ao mesmo tempo pode caracterizar grave e iminente risco, com interdição da operação. Para os demais cuidados de entrada em silos, veja [NR-33 em silos e moegas](/blog/nr-33-silos-moegas-engolfamento-soterramento). Para os conceitos gerais da norma, veja [NR-12: o que é e quando adequar máquinas](/blog/nr-12-adequacao-de-maquinas).',
        ],
      },
    ],
    sources: [
      'NR-12: Segurança no Trabalho em Máquinas e Equipamentos (Ministério do Trabalho e Emprego). Confira sempre a versão vigente.',
      'NPT 27, item 6.4.5 (Corpo de Bombeiros do Paraná); ABNT NBR 16385:2015; ABNT NBR 17135:2024 (item 5.5), conforme citadas pela SRTE-PR.',
      'Orientação 02 (Transportadores) e Orientação 05 (Rosca varredora) da SRTE-PR para unidades de beneficiamento e armazenamento de grãos.',
    ],
    cta: {
      text: 'Veja em 5 minutos se os pontos críticos de máquinas e transportadores da sua unidade estão cobertos.',
      label: 'Fazer o autodiagnóstico gratuito',
      to: '/diagnostico-seguranca-silos',
    },
  },
  {
    slug: 'nr-33-silos-moegas-engolfamento-soterramento',
    title: 'NR-33 em silos e moegas: engolfamento, soterramento e resgate',
    description:
      'Como prevenir engolfamento e soterramento em silos, graneleiros e moegas: ancoragem horizontal, PET, bloqueio, plano de resgate e documentação mínima.',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    category: 'Agroindústria',
    sector: 'agro',
    sections: [
      {
        heading: 'O risco: engolfamento e soterramento',
        paragraphs: [
          'Segundo a SRTE-PR, as atividades que envolvem o deslocamento sobre a massa de grãos estão entre as que causam a maior parte dos acidentes fatais em espaços confinados de unidades de armazenamento. O trabalhador é engolfado na massa de grãos ou soterrado, e morre por asfixia.',
          'Há três cenários típicos: o trabalhador é sugado quando o sistema de descarga está em operação; ele cai ao caminhar sobre uma ponte de grãos formada sobre um vazio que colapsa; ou é soterrado pela parede de grãos que cai quando ele está abaixo dela. A asfixia pode ocorrer em poucos minutos.',
          'A orientação lembra ainda que, com grãos na altura dos joelhos, a pessoa pode perder a capacidade de se salvar sozinha e, na altura da cintura, o risco à vida se torna crítico.',
        ],
      },
      {
        heading: 'A regra geral',
        paragraphs: [
          'Conforme a ABNT NBR 16577, citada pela SRTE-PR, as operações sobre a superfície dos grãos são extremamente perigosas, e a entrada e a movimentação de trabalhadores sobre a massa de grãos são proibidas, salvo quando a segurança for garantida por análise de riscos e por medidas coletivas ou individuais comprovadamente eficazes.',
          'Na prática, o ingresso em silos com carga deve ser proibido por princípio. Quando for inevitável, para resolver um problema de manejo, só pode acontecer com a segurança demonstrada na documentação.',
        ],
      },
      {
        heading: 'Prevenção primária: não chegar ao ponto de precisar entrar',
        paragraphs: [
          'Pontes, blocos, crostas, paredes e pontos quentes devem ser tratados como inconformidades. A prevenção está no manejo: controle de umidade e temperatura, preenchimento adequado do silo, aeração, limpeza e tempo de armazenamento adequado. A SRTE-PR orienta que esses parâmetros operacionais e de manutenção sejam tratados como medidas de segurança e constem na documentação do SESMT, como o PGR e as ordens de serviço.',
        ],
      },
      {
        heading: 'O problema da linha de vida com folga',
        paragraphs: [
          'O método mais usado no Paraná, segundo a orientação, é a corda ancorada na janela de inspeção do teto, sob controle do vigia. O problema é que, com a massa de grãos entre o meio e a parte alta do silo, a corda fica quase horizontal e com folga, e isso não garante que o trabalhador não seja engolfado se uma ponte colapsar ou a descarga puxar a massa. Esse método pode ser seguro apenas em silos de pequeno diâmetro, com nível de carga baixo.',
        ],
      },
      {
        heading: 'Métodos de ingresso e o que a orientação observa de cada um',
        paragraphs: ['A SRTE-PR analisa, em um silo de referência, os principais métodos:'],
        list: [
          '**Corda ancorada na janela de inspeção:** o mais comum, com a limitação descrita acima.',
          '**Sistema de polias no centro do teto:** eficaz em silos pequenos, com eficácia restrita em silos de média e grande dimensão.',
          '**Monovia no contorno superior do costado:** ainda permite movimento pendular parcial e engolfamento.',
          '**Monovia no costado combinada com polia central (linha de vida dupla):** se bem ajustada, pode evitar o movimento pendular.',
          '**Monovia no teto do silo:** mantém o talabarte na posição vertical na maior parte da área de trabalho; em silos grandes, recomenda-se conexão dupla.',
        ],
      },
      {
        heading: 'Um método por silo, não um método para todos',
        paragraphs: [
          'A orientação não define um método único. O método deve ser específico para cada silo, considerando o diâmetro, a altura da massa de grãos, a localização das bicas de descarga, o comprimento das linhas de vida durante o trabalho, o campo de visão do vigia e o resgate. Alterações e instalações devem ser projetadas por equipe multidisciplinar de segurança do trabalho e engenharia, sempre que possível consultando os fabricantes. Sem a segurança demonstrada, o ingresso deve ser proibido.',
        ],
      },
      {
        heading: 'Detalhes que fazem diferença',
        paragraphs: ['Alguns cuidados aparecem repetidamente nas orientações:'],
        list: [
          'Trava-quedas retrátil sozinho não serve na fase de deslocamento sobre a massa de grãos, porque a submersão do trabalhador não é abrupta o suficiente para acioná-lo. O absorvedor de energia, se acionado, ainda permite maior engolfamento.',
          'Bloqueio mecânico das bicas e registros de descarga, conforme a NR-33. O desentupimento de bicas a partir do interior do silo não pode ser feito com bicas ou registros abertos.',
          'Quebra de blocos e de paredes de grãos com o trabalhador abaixo da linha da massa não tem condição de segurança.',
          'Ingresso para conectar o cabo da rosca varredora, com a massa residual estabilizada em ângulo de repouso seguro, tem condição de segurança, mas a equipe não pode permanecer dentro do silo durante o movimento da rosca.',
        ],
      },
      {
        heading: 'Moegas: acesso e deslocamento seguros',
        paragraphs: [
          'Nas moegas, entra-se para limpeza ou para solucionar embuchamento, com risco de queda e de engolfamento. A SRTE-PR observou que boa parte das moegas no Paraná não tem dispositivos para acesso vertical seguro nem sistema horizontal permanente para se deslocar sobre os grãos.',
          'A proteção deve ser um sistema horizontal instalado abaixo das grelhas, tipo cabo-guia ou monotrilho, de forma que o trabalhador percorra toda a moega sem risco de engolfamento acima da linha da cintura em qualquer hipótese. Ele deve permitir o acoplamento a partir da escada de acesso, para que a pessoa esteja sempre conectada, e atender também à limpeza das laterais e ao resgate.',
          'Na avaliação do cabo de aço, deve-se considerar a flecha dinâmica: quanto menor a amplitude, maior a segurança. A operação em moegas sem acesso seguro ou sem garantia contra engolfamento pode caracterizar grave e iminente risco, com interdição. O projeto e a instalação devem estar sob responsabilidade de profissional legalmente habilitado, em conformidade com NR-33, NR-35 e NPT 27.',
        ],
      },
      {
        heading: 'Equipe, PET e resgate',
        paragraphs: [
          'A NR-33 exige equipe formada por supervisor de entrada, vigia e trabalhadores autorizados, com capacitação inicial e periódica (anual) específica para cada função. A carga horária e o conteúdo estão no anexo da norma, que vale conferir na versão vigente. A Permissão de Entrada e Trabalho (PET) deve incluir o risco de engolfamento e soterramento, o bloqueio mecânico das bicas e as condições que impedem o ingresso, como a altura e o ângulo das paredes de grãos, de preferência sinalizadas junto às janelas de acesso.',
          'O plano de resgate deve considerar o tempo de resposta do evento e indicar técnicas, equipamentos e sistema de resgate disponíveis. Como o engolfamento pode levar à morte em poucos minutos, a SRTE-PR orienta que, quando não for possível o sistema coletivo, o sistema individual seja de ancoragem permanente: instalar um sistema temporário depois do acidente é inviável. Também recomenda interlocução com as unidades locais de resgate, como o Corpo de Bombeiros e a defesa civil.',
        ],
      },
      {
        heading: 'Documentação mínima',
        paragraphs: ['A SRTE-PR lista, entre outros, estes documentos:'],
        list: [
          'PGR e cadastro de espaços confinados, considerando engolfamento e soterramento.',
          'Procedimentos de manejo de grãos e de manutenção para prevenir pontes, blocos, crostas e entupimentos.',
          'Descrição dos cenários de ingresso e do método de prevenção, com evidências da eficácia em planta baixa, cortes e relatórios.',
          'Procedimento de segurança para o trabalho sobre a massa de grãos, com passo a passo ilustrado e considerando o diâmetro real do silo e a altura dos grãos.',
          'PET com as condições impeditivas de ingresso e o bloqueio das bicas.',
          'Atas da CIPA e avaliação do SESMT quando houver formação de blocos, crostas, paredes ou pontes.',
          'Treinamento comprovado, restrito às equipes com permissão de ingresso, conforme o modelo de silo.',
        ],
      },
    ],
    sources: [
      'NR-33: Segurança e Saúde nos Trabalhos em Espaços Confinados; NR-35: Trabalho em Altura; NR-1 (Ministério do Trabalho e Emprego). Confira sempre a versão vigente.',
      'ABNT NBR 16577, conforme citada pela SRTE-PR; NPT 27 (Corpo de Bombeiros do Paraná).',
      'Orientações 03 (Engolfamento e soterramento), 04 (Silos verticais), 05 (Rosca varredora) e 06 (Moegas) da SRTE-PR para unidades de beneficiamento e armazenamento de grãos.',
    ],
    cta: {
      text: 'Descubra em 5 minutos como está a sua unidade em espaços confinados, engolfamento e resgate.',
      label: 'Fazer o autodiagnóstico gratuito',
      to: '/diagnostico-seguranca-silos',
    },
  },
  {
    slug: 'nr-35-trabalho-em-altura-silos-torres-moegas',
    title: 'NR-35 em silos, torres e moegas: trabalho em altura na armazenagem',
    description:
      'O que a NR-35 exige nas atividades em altura das unidades de grãos: análise de risco, capacitação, ancoragem permanente, monotrilho em silos e resgate.',
    publishedAt: '2026-10-01',
    updatedAt: '2026-10-01',
    category: 'Agroindústria',
    sector: 'agro',
    sections: [
      {
        heading: 'Quando a NR-35 se aplica',
        paragraphs: [
          'A NR-35 trata de toda atividade executada acima de 2,00 m do nível inferior em que haja risco de queda. Em uma unidade de grãos, isso inclui o teto de silos e graneleiros, tulhas, torres de elevadores, passarelas elevadas e galerias. E também os acessos que descem para dentro de moegas e poços, onde o risco de queda se soma ao de engolfamento.',
        ],
      },
      {
        heading: 'Os requisitos essenciais',
        paragraphs: ['A norma, na redação dada pela Portaria MTP nº 4.218/2022, exige, entre outros pontos:'],
        list: [
          'Planejamento e organização: todo trabalho em altura deve ser precedido de análise de risco.',
          'Permissão de trabalho nas atividades que a norma indica, como as não rotineiras.',
          'Capacitação: treinamento inicial de, no mínimo, 8 horas antes de o trabalhador começar, e treinamento periódico a cada dois anos, também com no mínimo 8 horas.',
          'Aptidão para trabalho em altura, avaliada conforme o PCMSO e registrada no ASO.',
          'Medidas de prevenção definidas e adotadas antes de iniciar a atividade, com prioridade para medidas que evitem o trabalho em altura e, quando isso não for possível, para a proteção contra quedas.',
        ],
      },
      {
        heading: 'Ancoragem permanente nos silos: o monotrilho',
        paragraphs: [
          'A NPT 27 do Corpo de Bombeiros do Paraná prevê que, no teto de silos com diâmetro igual ou maior que 4,5 m, seja instalada viga contínua do tipo monotrilho. Ela deve permitir o acoplamento de dispositivo de deslocamento horizontal que cubra toda a circunferência interna da estrutura, servindo para fixar o cabo-guia nas atividades de rotina e como ancoragem nas atividades de resgate.',
          'A SRTE-PR ressalta que a monovia no teto mantém o talabarte na posição vertical na maior parte da área de trabalho, o que é essencial para quem se desloca sobre os grãos. Em silos de grandes dimensões, recomenda conexão dupla.',
        ],
      },
      {
        heading: 'Graneleiros e moegas',
        paragraphs: [
          'Nos graneleiros, a lógica é a mesma: sistema horizontal tipo cabo-guia na estrutura das coberturas, para acoplar as linhas de vida individuais e manter a linha na posição vertical. Esse sistema deve atender também a limpeza das laterais (fundo em V ou W), a fixação de cabos de termometria e o resgate.',
          'Nas moegas, o sistema horizontal fica abaixo das grelhas e deve permitir o acoplamento a partir da escada de acesso ou das plataformas, para que o trabalhador esteja sempre conectado. O acesso vertical seguro, com projeção dos montantes da escada e linha de vida vertical, aparece nas orientações como exemplo de conformidade.',
        ],
      },
      {
        heading: 'Cuidados com o sistema de proteção',
        paragraphs: ['Alguns pontos costumam ser negligenciados:'],
        list: [
          'Inspeção dos EPIs antes do uso, com controle de validade e rastreabilidade.',
          'Para o deslocamento sobre a massa de grãos, não basta trava-quedas retrátil nem absorvedor de energia: a pessoa afunda devagar e o travamento pode não acionar.',
          'EPIs de altura perto de partes móveis desprotegidas viram risco. A SRTE-PR registra o caso de um cinturão e parte do talabarte enrolados em um eixo de acoplamento sem proteção.',
          'Ancoragens permanentes projetadas e instaladas sob responsabilidade de profissional legalmente habilitado, com ART ou TRT.',
        ],
      },
      {
        heading: 'Resgate em altura',
        paragraphs: [
          'O plano de resgate precisa ser compatível com o tempo de resposta real e com os equipamentos disponíveis. Por isso as ancoragens permanentes servem também ao resgate: montar um sistema provisório depois de um acidente leva tempo que a vítima muitas vezes não tem. Vale integrar o plano às unidades locais de resgate.',
        ],
      },
      {
        heading: 'Checklist rápido',
        paragraphs: ['Antes da próxima atividade em altura, confira:'],
        list: [
          'Há análise de risco e, quando aplicável, permissão de trabalho?',
          'Quem vai executar tem capacitação e aptidão válidas?',
          'Existe ancoragem permanente adequada, projetada e inspecionada?',
          'Os EPIs foram inspecionados e estão dentro da validade?',
          'Há plano de resgate com equipe e equipamentos prontos?',
        ],
      },
      {
        heading: 'Onde esse tema encontra os outros',
        paragraphs: [
          'Altura, espaço confinado e engolfamento se encontram no teto dos silos e nas moegas. Por isso vale ler este guia junto com [NR-33 em silos e moegas](/blog/nr-33-silos-moegas-engolfamento-soterramento) e com o [mapa geral de segurança em unidades de grãos](/blog/seguranca-em-unidades-armazenadoras-de-graos).',
        ],
      },
    ],
    sources: [
      'NR-35: Trabalho em Altura, redação dada pela Portaria MTP nº 4.218/2022 (Ministério do Trabalho e Emprego). Confira sempre a versão vigente.',
      'NPT 27, item 5.2.3.3 (Corpo de Bombeiros do Paraná).',
      'Orientações 02, 03, 04 e 06 da SRTE-PR para unidades de beneficiamento e armazenamento de grãos.',
    ],
    cta: {
      text: 'Veja em 5 minutos se a sua unidade tem o básico de NR-35 coberto.',
      label: 'Fazer o autodiagnóstico gratuito',
      to: '/diagnostico-seguranca-silos',
    },
  },
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
    updatedAt: '2026-10-01',
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
          'Atua no setor agroindustrial? Veja o guia específico: [NR-12 em unidades de grãos: elevadores, correias e rosca varredora](/blog/nr-12-elevadores-transportadores-rosca-varredora).',
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
