import {
  ArrowRight,
  ArrowUpFromLine,
  BadgeCheck,
  CheckCircle2,
  Cog,
  FileText,
  Flame,
  MapPin,
  Search,
  ShieldCheck,
  Warehouse,
  Wheat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { LinkedInCallout } from '@/components/ui/LinkedInCallout';
import { CATEGORIES } from '@/content/categories';
import { HOME_FAQ } from '@/content/faq';
import { GUIDES } from '@/content/guides';
import { META } from '@/content/meta';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const STEPS = [
  {
    title: 'Descreva o serviço',
    description: 'Conte o que precisa, onde e qual o orçamento esperado. Leva menos de dois minutos.',
  },
  {
    title: 'Receba propostas',
    description: 'Profissionais da sua região enviam preço, prazo e como resolveriam o problema.',
  },
  {
    title: 'Escolha e contrate',
    description: 'Compare avaliações e propostas, converse pelo chat e feche com quem fizer mais sentido.',
  },
];

const TRUST = [
  { icon: ShieldCheck, text: 'Registro profissional conferido pela nossa equipe' },
  { icon: CheckCircle2, text: 'Publicar um pedido é gratuito' },
  { icon: MapPin, text: 'Curitiba e todo o Paraná' },
];

const AGRO_TOPICS = [
  {
    slug: 'atmosfera-explosiva-poeira-combustivel-graos',
    icon: Flame,
    title: 'Poeira combustível',
    description: 'Classificação de áreas (zonas 20, 21 e 22), limpeza e controle de ignição.',
  },
  {
    slug: 'nr-12-elevadores-transportadores-rosca-varredora',
    icon: Cog,
    title: 'NR-12 em máquinas de grãos',
    description: 'Sensores em elevadores, proteção de partes móveis e rosca varredora.',
  },
  {
    slug: 'nr-33-silos-moegas-engolfamento-soterramento',
    icon: Warehouse,
    title: 'NR-33: silos e moegas',
    description: 'Engolfamento, soterramento, PET e plano de resgate.',
  },
  {
    slug: 'nr-35-trabalho-em-altura-silos-torres-moegas',
    icon: ArrowUpFromLine,
    title: 'NR-35: trabalho em altura',
    description: 'Ancoragem permanente, monotrilho e resgate.',
  },
];

const VERIFICATION_STEPS = [
  { icon: FileText, text: 'O profissional informa o número do registro no Crea (engenheiros) ou no CRT (técnicos).' },
  { icon: Search, text: 'Nossa equipe confere o número na consulta pública do conselho.' },
  { icon: BadgeCheck, text: 'Só então o perfil recebe o selo de verificado.' },
];

export function Landing() {
  useDocumentMeta(META.home);
  const featuredGuides = GUIDES.filter((guide) => guide.sector !== 'agro').slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
              O profissional técnico certo para o seu projeto, sem depender de indicação.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Publique o serviço que você precisa e receba propostas de engenheiros e técnicos com registro
              profissional conferido, em Curitiba e em todo o Paraná.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/registro">
                <Button size="md">
                  Publicar um serviço
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/buscar">
                <Button variant="secondary" size="md">
                  Buscar profissionais
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-2.5">
              {TRUST.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-ink/70">
                  <Icon size={16} className="shrink-0 text-moss" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <aside aria-label="Como funciona a verificação" className="rounded border-2 border-ink/15 bg-white p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-ink/40">Como o selo é concedido</p>
            <ol className="mt-5 flex flex-col gap-5">
              {VERIFICATION_STEPS.map(({ icon: Icon, text }, index) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-ink text-paper">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-mono text-xs text-ink/40">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-sm text-ink">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t-2 border-ink/10 pt-4 text-xs text-ink/50">
              Perfis sem selo ainda não tiveram o registro conferido.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-ink py-16" aria-labelledby="agro-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="inline-flex items-center gap-2 rounded border-2 border-signal/50 px-3 py-1 text-sm font-medium text-signal">
              <Wheat size={16} aria-hidden="true" />
              Agroindústria
            </span>
            <h2 id="agro-title" className="mt-4 font-display text-3xl font-semibold leading-tight text-paper">
              Segurança em unidades de grãos, do silo à expedição
            </h2>
            <p className="mt-4 text-paper/70">
              Poeira combustível, máquinas, espaços confinados e trabalho em altura concentram os riscos mais graves da
              armazenagem. A TecMatch conecta cooperativas, cerealistas, indústrias e terminais a profissionais habilitados.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/diagnostico-seguranca-silos">
                <Button>Autodiagnóstico gratuito</Button>
              </Link>
              <Link
                to="/blog/seguranca-em-unidades-armazenadoras-de-graos"
                className="inline-flex items-center rounded border-2 border-paper/40 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Ler o guia completo
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 md:col-span-3">
            {AGRO_TOPICS.map(({ slug, icon: Icon, title, description }) => (
              <li key={slug}>
                <Link
                  to={`/blog/${slug}`}
                  className="block h-full rounded border-2 border-paper/15 bg-paper/5 p-5 transition-colors hover:border-signal"
                >
                  <Icon size={22} className="text-signal" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-paper">{title}</h3>
                  <p className="mt-1 text-sm text-paper/70">{description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y-2 border-ink/10 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Áreas atendidas</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/buscar?category=${category.slug}`}
                className="rounded border-2 border-line px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-ink">Como funciona</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-mono text-sm text-ink/40">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-ink/10 bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded border-2 border-signal/40 bg-signal/5 px-3 py-1 text-sm font-medium text-signal-dark">
              TecMatch Gerenciado
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
              Prefere não comparar propostas? Contrate a TecMatch diretamente.
            </h2>
            <p className="mt-3 max-w-lg text-ink/70">
              A TecMatch seleciona e acompanha o profissional técnico certo para o seu projeto, do início à
              entrega — um único ponto de contato para sua empresa.
            </p>
          </div>
          <div className="md:text-right">
            <Link to="/servico-gerenciado">
              <Button variant="secondary" size="md">
                Conhecer o TecMatch Gerenciado
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Guias para quem contrata serviço técnico</h2>
            <p className="mt-2 max-w-xl text-ink/70">
              Normas, registro profissional e o que conferir antes de fechar negócio.
            </p>
          </div>
          <Link to="/blog" className="text-sm font-medium text-signal-dark hover:underline">
            Ver todos os guias
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredGuides.map((guide) => (
            <article key={guide.slug} className="border-t-2 border-ink pt-4">
              <p className="font-mono text-xs uppercase tracking-wide text-ink/40">{guide.category}</p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
                <Link to={`/blog/${guide.slug}`} className="hover:text-blueprint">
                  {guide.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-ink/70">{guide.description}</p>
            </article>
          ))}
        </div>
        <LinkedInCallout className="mt-10" />
      </section>

      <section className="border-t-2 border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {HOME_FAQ.map((item) => (
              <div key={item.question}>
                <h3 className="font-display text-lg font-semibold text-ink">{item.question}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-paper">É profissional técnico?</h2>
            <p className="mt-2 max-w-md text-paper/70">
              Monte seu perfil, escolha suas áreas de atuação e comece a receber pedidos de serviço.
            </p>
          </div>
          <Link to="/registro">
            <Button size="md">Cadastrar como profissional</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
