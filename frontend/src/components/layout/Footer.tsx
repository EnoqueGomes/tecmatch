import { Link } from 'react-router-dom';
import { GUIDES } from '@/content/guides';
import { COMPANY } from '@/content/site';

const LINK = 'text-ink/60 hover:text-ink';

export function Footer() {
  return (
    <footer className="border-t-2 border-ink/10 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 text-sm md:grid-cols-3">
        <div>
          <p className="font-display font-semibold text-ink">TecMatch</p>
          <p className="mt-2 text-ink/60">
            Engenheiros e técnicos com registro profissional conferido, em Curitiba e no Paraná.
          </p>
          <address className="mt-4 flex flex-col gap-1 not-italic text-ink/60">
            <span>{COMPANY.legalName}</span>
            {COMPANY.cnpj && <span>CNPJ {COMPANY.cnpj}</span>}
            <span>
              {COMPANY.city}/{COMPANY.state}
            </span>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              WhatsApp {COMPANY.whatsappDisplay}
            </a>
            {COMPANY.email && (
              <a href={`mailto:${COMPANY.email}`} className="hover:text-ink">
                {COMPANY.email}
              </a>
            )}
          </address>
        </div>
        <nav aria-label="Serviços" className="flex flex-col gap-2">
          <p className="font-medium text-ink">Serviços</p>
          <Link to="/buscar" className={LINK}>
            Buscar profissionais
          </Link>
          <Link to="/servico-gerenciado" className={LINK}>
            TecMatch Gerenciado
          </Link>
          <Link to="/registro" className={LINK}>
            Cadastro de profissionais
          </Link>
        </nav>
        <nav aria-label="Guias técnicos" className="flex flex-col gap-2">
          <Link to="/blog" className="font-medium text-ink hover:text-blueprint">
            Guias técnicos
          </Link>
          {GUIDES.map((guide) => (
            <Link key={guide.slug} to={`/blog/${guide.slug}`} className={LINK}>
              {guide.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-6 pt-6 text-xs text-ink/50">
        <span>© 2026 {COMPANY.legalName}</span>
        <Link to="/privacidade" className="hover:text-ink">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  );
}
