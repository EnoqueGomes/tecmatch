// Autodiagnóstico de segurança para unidades de beneficiamento e armazenamento
// de grãos (UBAG). Perguntas, pesos e regra de pontuação ficam aqui, em dados
// simples: para mudar uma pergunta ou o peso dela, é só editar este arquivo.
//
// Base: NR-1, NR-12, NR-33, NR-35, ABNT NBR IEC 60079-10-2, NPT 27 (Corpo de
// Bombeiros do Paraná) e as Orientações da SRTE-PR para UBAG.
//
// IMPORTANTE: é uma triagem baseada em respostas declaradas. Não é laudo,
// inspeção nem garantia de conformidade — o texto da página deixa isso claro.

export type Answer = 'sim' | 'parcial' | 'nao' | 'na';
export type BlockId = 'poeira' | 'nr12' | 'nr33' | 'nr35' | 'gestao';
export type LevelId = 'critico' | 'atencao' | 'adequacao' | 'bom';

export interface Question {
  id: string;
  block: BlockId;
  text: string;
  help?: string; // explicação curta, para quem não domina o termo
  weight: 1 | 2 | 3; // 3 = item que mais pesa na segurança
  critical?: boolean; // "não" aqui limita o nível final e acende um alerta
  naLabel?: string; // se existir, a pergunta aceita "não se aplica" com este texto
  warning?: string; // aviso mostrado quando a resposta é "não" (itens críticos)
  advice: string; // recomendação mostrada no resultado quando há lacuna
}

export const BLOCKS: { id: BlockId; title: string; subtitle: string }[] = [
  {
    id: 'poeira',
    title: 'Poeira combustível e atmosfera explosiva',
    subtitle: 'Classificação de áreas, limpeza, despoeiramento e fontes de ignição',
  },
  {
    id: 'nr12',
    title: 'Máquinas e transportadores (NR-12)',
    subtitle: 'Proteções, sensores, bloqueio de energia e rosca varredora',
  },
  {
    id: 'nr33',
    title: 'Espaços confinados (NR-33)',
    subtitle: 'Silos, moegas, túneis e poços: entrada, engolfamento e resgate',
  },
  {
    id: 'nr35',
    title: 'Trabalho em altura (NR-35)',
    subtitle: 'Análise de risco, capacitação, ancoragem permanente e EPIs',
  },
  {
    id: 'gestao',
    title: 'Gestão e documentação',
    subtitle: 'PGR, registros e auditorias internas',
  },
];

export const QUESTIONS: Question[] = [
  // ---------- Poeira combustível e atmosfera explosiva ----------
  {
    id: 'p1',
    block: 'poeira',
    text: 'A unidade tem Estudo de Classificação de Áreas (poeiras combustíveis), feito por profissional habilitado e com ART?',
    help: 'É o documento, previsto na ABNT NBR IEC 60079-10-2, que define as zonas 20, 21 e 22 e orienta equipamentos, limpeza e demais controles.',
    weight: 3,
    critical: true,
    warning:
      'Sem esse estudo, a unidade não consegue demonstrar quais áreas são de risco nem se os equipamentos instalados são adequados.',
    advice:
      'Contratar o Estudo de Classificação de Áreas com profissional habilitado e ART. Ele é a base para escolher equipamentos elétricos, definir a limpeza e as demais medidas de controle.',
  },
  {
    id: 'p2',
    block: 'poeira',
    text: 'Existe procedimento e cronograma de limpeza de poeira, com relatórios periódicos que registram a espessura das camadas antes da limpeza?',
    help: 'A SRTE-PR orienta que as medidas de limpeza constem no estudo de classificação e que os relatórios informem a espessura da poeira em pisos e equipamentos.',
    weight: 3,
    advice:
      'Formalizar procedimento, cronograma e relatórios periódicos de limpeza, registrando a espessura das camadas de poeira antes de cada limpeza.',
  },
  {
    id: 'p3',
    block: 'poeira',
    text: 'Motores, mancais e bandejas de cabos nas áreas de risco estão livres de camadas de poeira?',
    weight: 3,
    critical: true,
    warning:
      'Motor ou cabos sob camada de poeira em área classificada é situação que a fiscalização já tratou como de grave e iminente risco.',
    advice:
      'Limpar de imediato e incluir esses pontos no cronograma de limpeza. Camadas sobre superfícies aquecidas e cabos são caminho direto para a ignição.',
  },
  {
    id: 'p4',
    block: 'poeira',
    text: 'Há captação de pó nos pontos de maior geração (moegas, elevadores, transportadores) e supressores de poeira, como centralizadores de fluxo, nas bicas e descargas?',
    weight: 2,
    advice:
      'Avaliar despoeiramento nos pontos de maior geração, supressores de poeira nas bicas e descargas e a manutenção das vedações de elevadores e tubulações.',
  },
  {
    id: 'p5',
    block: 'poeira',
    text: 'Os equipamentos elétricos das áreas classificadas têm proteção compatível com a zona definida, e o trabalho a quente só ocorre com permissão e controle?',
    weight: 2,
    advice:
      'Verificar se os equipamentos são compatíveis com as zonas do estudo (ABNT NBR IEC 60079-14 e 60079-17) e exigir permissão de trabalho a quente.',
  },

  // ---------- Máquinas e transportadores (NR-12) ----------
  {
    id: 'm1',
    block: 'nr12',
    text: 'Elevadores de canecas, correias, redlers e roscas passaram por apreciação de riscos, com plano de adequação à NR-12?',
    help: 'Em áreas classificadas, a apreciação deve considerar também o risco de atmosfera explosiva, não só agarramento e cortes.',
    weight: 2,
    advice:
      'Realizar a apreciação de riscos dos equipamentos e montar plano de adequação priorizado, considerando o risco adicional de atmosfera explosiva nas áreas classificadas.',
  },
  {
    id: 'm2',
    block: 'nr12',
    text: 'Partes móveis e pontos de aprisionamento (tambores, polias, acoplamentos motor-redutor, roscas) têm proteções fixas ou móveis com intertravamento?',
    weight: 3,
    critical: true,
    warning:
      'Eixos e acoplamentos expostos, principalmente nas cabeças de elevador, estão entre os pontos de acidentes mais graves.',
    advice:
      'Instalar proteções fixas ou móveis com intertravamento nas partes móveis expostas, com atenção especial aos motores e acoplamentos das cabeças de elevador.',
  },
  {
    id: 'm3',
    block: 'nr12',
    text: 'Elevadores e transportadores têm sensores que desligam o equipamento sozinhos: temperatura nos mancais, desalinhamento e queda de velocidade ou escorregamento da correia?',
    help: 'A NPT 27 do Corpo de Bombeiros do Paraná e a SRTE-PR tratam esses sensores como medida contra fontes de ignição.',
    weight: 3,
    critical: true,
    warning:
      'Elevador sem esses sensores, principalmente em espaço confinado, já foi caracterizado pela fiscalização como situação de grave e iminente risco.',
    advice:
      'Instalar e calibrar sensores de temperatura nos mancais, de desalinhamento e de velocidade, com desligamento automático e teste funcional documentado.',
  },
  {
    id: 'm4',
    block: 'nr12',
    text: 'Existe bloqueio e etiquetagem de energia para manutenção, limpeza e desentupimento, com as chaves junto ao painel de comando?',
    weight: 2,
    advice:
      'Implantar procedimento de bloqueio e etiquetagem de simples execução, com chaves próximas ao painel de comando, conforme NR-12 e NR-33.',
  },
  {
    id: 'm5',
    block: 'nr12',
    text: 'Se há rosca varredora: nenhum trabalhador permanece dentro do silo com a rosca em movimento (por usar rosca autônoma ou por bloqueio e procedimento rigorosos)?',
    naLabel: 'Não temos rosca varredora',
    weight: 3,
    critical: true,
    warning:
      'A SRTE-PR alerta que pessoas dentro do silo com a rosca em movimento podem caracterizar grave e iminente risco, com interdição da operação.',
    advice:
      'Proibir a permanência de pessoas no silo com a rosca em movimento. Adotar rosca autônoma ou bloqueio rigoroso e procedimento detalhado (NR-12 e NR-33).',
  },

  // ---------- Espaços confinados (NR-33) ----------
  {
    id: 'e1',
    block: 'nr33',
    text: 'Toda entrada em silo, moega, túnel ou poço é feita com Permissão de Entrada e Trabalho (PET), supervisor de entrada, vigia e trabalhadores com capacitação em dia?',
    weight: 3,
    critical: true,
    warning: 'Entrada em espaço confinado sem PET, vigia e equipe capacitada é um dos cenários de maior letalidade.',
    advice:
      'Formalizar a PET e garantir supervisor de entrada, vigia e trabalhadores autorizados com capacitação periódica (anual) em dia.',
  },
  {
    id: 'e2',
    block: 'nr33',
    text: 'Para andar ou trabalhar sobre a massa de grãos, existe sistema que evita o engolfamento (ancoragem horizontal que mantém a linha de vida quase vertical e sem folga), e a entrada é proibida sem ele?',
    help: 'Engolfamento e soterramento estão entre as principais causas de morte em unidades de armazenagem.',
    naLabel: 'Ninguém entra sobre a massa de grãos',
    weight: 3,
    critical: true,
    warning:
      'A SRTE-PR registra que operar em moegas e silos sem garantia contra engolfamento pode caracterizar grave e iminente risco, com interdição.',
    advice:
      'Projetar, com profissional habilitado, ancoragem horizontal permanente (monotrilho ou cabo-guia) para silos, graneleiros e moegas e proibir a entrada sem ela. Trava-quedas retrátil sozinho não serve para o deslocamento sobre grãos.',
  },
  {
    id: 'e3',
    block: 'nr33',
    text: 'Há ventilação ou exaustão ativa e medição da atmosfera (oxigênio e gases) antes e durante a entrada em túneis, poços e silos?',
    weight: 2,
    advice: 'Instalar exaustão ou ventilação em túneis e poços e medir a atmosfera antes e durante cada entrada.',
  },
  {
    id: 'e4',
    block: 'nr33',
    text: 'Existe plano de resgate com tempo de resposta dimensionado, equipe e equipamentos disponíveis e simulados realizados?',
    help: 'No engolfamento, a asfixia pode ocorrer em poucos minutos.',
    weight: 3,
    advice:
      'Elaborar plano de resgate que considere o tempo de resposta do evento, definir equipe e equipamentos e realizar simulados, buscando integração com o Corpo de Bombeiros local.',
  },

  // ---------- Trabalho em altura (NR-35) ----------
  {
    id: 'a1',
    block: 'nr35',
    text: 'Atividades em altura (teto de silos, tulhas, torres, coberturas, elevadores) têm análise de risco e, quando não rotineiras, permissão de trabalho?',
    help: 'A NR-35 vale para atividades acima de 2 metros do nível inferior com risco de queda.',
    weight: 2,
    advice:
      'Instituir análise de risco para toda atividade em altura e permissão de trabalho nas atividades não rotineiras.',
  },
  {
    id: 'a2',
    block: 'nr35',
    text: 'Quem trabalha em altura tem capacitação NR-35 válida (inicial de no mínimo 8 horas e reciclagem a cada 2 anos) e aptidão registrada no ASO?',
    weight: 2,
    advice: 'Regularizar a capacitação inicial (mínimo de 8 horas), a periódica (a cada 2 anos) e a aptidão para trabalho em altura.',
  },
  {
    id: 'a3',
    block: 'nr35',
    text: 'Existem pontos de ancoragem e linhas de vida permanentes (inclusive monotrilho no teto dos silos e acessos a moegas e poços), projetados por profissional habilitado e inspecionados?',
    help: 'A NPT 27 do Corpo de Bombeiros do Paraná prevê viga contínua do tipo monotrilho no teto de silos com diâmetro a partir de 4,5 m.',
    weight: 3,
    critical: true,
    warning: 'Sem ancoragem permanente, o trabalho em altura e o resgate dependem de improviso.',
    advice:
      'Projetar e instalar ancoragens permanentes (monotrilho, cabo-guia, linhas de vida), certificá-las e inspecioná-las periodicamente.',
  },
  {
    id: 'a4',
    block: 'nr35',
    text: 'Cinturões, talabartes e demais EPIs de altura são inspecionados antes do uso e têm controle de validade e rastreabilidade?',
    weight: 2,
    advice: 'Implantar inspeção antes do uso e controle de validade e rastreabilidade dos EPIs de altura.',
  },

  // ---------- Gestão e documentação ----------
  {
    id: 'g1',
    block: 'gestao',
    text: 'O PGR (NR-1) contempla explosão por poeira, engolfamento, máquinas e trabalho em altura, com plano de ação e responsáveis definidos?',
    weight: 3,
    advice:
      'Atualizar o PGR para incluir atmosfera explosiva, engolfamento e soterramento, máquinas e altura, com plano de ação e responsáveis.',
  },
  {
    id: 'g2',
    block: 'gestao',
    text: 'Treinamentos, inspeções e limpezas ficam registrados, e existe rotina de auditoria interna para verificar se os procedimentos estão sendo cumpridos?',
    weight: 2,
    advice: 'Manter registros de treinamentos, inspeções e limpezas e fazer auditorias internas periódicas.',
  },
];

export const LEVELS: Record<
  LevelId,
  { label: string; summary: string; tone: string; bar: string }
> = {
  critico: {
    label: 'Crítico',
    summary:
      'As respostas indicam exposição elevada. Os itens críticos devem ser tratados com prioridade, e em alguns casos vale interromper a atividade até adotar a medida de controle.',
    tone: 'border-red-300 bg-red-50 text-red-800',
    bar: 'bg-red-600',
  },
  atencao: {
    label: 'Atenção',
    summary:
      'Há lacunas relevantes. Um plano de ação com prioridades, prazos e responsáveis reduz o risco e prepara a unidade para uma fiscalização.',
    tone: 'border-signal/50 bg-signal/10 text-signal-dark',
    bar: 'bg-signal',
  },
  adequacao: {
    label: 'Em adequação',
    summary:
      'A base está montada, com lacunas pontuais. O próximo passo é fechar esses pontos e reunir as evidências documentais.',
    tone: 'border-blueprint/40 bg-blueprint/10 text-blueprint',
    bar: 'bg-blueprint',
  },
  bom: {
    label: 'Bom nível aparente',
    summary:
      'As respostas indicam boa adequação. Lembre que a fiscalização avalia o que está comprovado: confirme se há laudos, ARTs e registros que sustentem cada resposta.',
    tone: 'border-moss/40 bg-moss/10 text-moss',
    bar: 'bg-moss',
  },
};

const ANSWER_VALUE: Record<Exclude<Answer, 'na'>, number> = { sim: 1, parcial: 0.5, nao: 0 };

export interface BlockResult {
  id: BlockId;
  title: string;
  score: number | null; // null = nenhuma pergunta aplicável neste bloco
}

export interface DiagnosticResult {
  score: number; // 0 a 100
  level: LevelId;
  cappedByCritical: boolean; // o nível foi limitado por haver item crítico não atendido
  blocks: BlockResult[];
  criticalGaps: Question[]; // itens críticos respondidos "não"
  gaps: Question[]; // todos os itens com "não" ou "em parte", mais graves primeiro
}

function levelForScore(score: number): LevelId {
  if (score >= 90) return 'bom';
  if (score >= 70) return 'adequacao';
  if (score >= 40) return 'atencao';
  return 'critico';
}

export function isComplete(answers: Partial<Record<string, Answer>>) {
  return QUESTIONS.every((question) => answers[question.id] !== undefined);
}

export function computeResult(answers: Partial<Record<string, Answer>>): DiagnosticResult {
  let earned = 0;
  let possible = 0;
  const perBlock = new Map<BlockId, { earned: number; possible: number }>();

  for (const question of QUESTIONS) {
    const answer = answers[question.id];
    if (answer === undefined || answer === 'na') continue; // "não se aplica" não entra na conta

    const value = ANSWER_VALUE[answer] * question.weight;
    earned += value;
    possible += question.weight;

    const current = perBlock.get(question.block) ?? { earned: 0, possible: 0 };
    current.earned += value;
    current.possible += question.weight;
    perBlock.set(question.block, current);
  }

  const score = possible === 0 ? 0 : Math.round((earned / possible) * 100);

  const criticalGaps = QUESTIONS.filter((question) => question.critical && answers[question.id] === 'nao');
  const gaps = QUESTIONS.filter((question) => answers[question.id] === 'nao' || answers[question.id] === 'parcial').sort(
    (a, b) => {
      const aNo = answers[a.id] === 'nao' ? 1 : 0;
      const bNo = answers[b.id] === 'nao' ? 1 : 0;
      return (
        Number(Boolean(b.critical)) - Number(Boolean(a.critical)) || b.weight - a.weight || bNo - aNo
      );
    },
  );

  // Regra de segurança: se há item crítico não atendido, o nível nunca passa de "Atenção",
  // por maior que seja a nota — um bom desempenho no restante não compensa o item crítico.
  let level = levelForScore(score);
  let cappedByCritical = false;
  if (criticalGaps.length > 0 && (level === 'bom' || level === 'adequacao')) {
    level = 'atencao';
    cappedByCritical = true;
  }

  const blocks: BlockResult[] = BLOCKS.map((block) => {
    const data = perBlock.get(block.id);
    return {
      id: block.id,
      title: block.title,
      score: data && data.possible > 0 ? Math.round((data.earned / data.possible) * 100) : null,
    };
  });

  return { score, level, cappedByCritical, blocks, criticalGaps, gaps };
}
