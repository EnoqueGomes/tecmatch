import { Linkedin } from 'lucide-react';
import { COMPANY } from '@/content/site';

// Chamada para seguir a TecMatch no LinkedIn. Só aparece quando o endereço da
// página estiver preenchido em content/site.ts.
export function LinkedInCallout({ className = '' }: { className?: string }) {
  if (!COMPANY.linkedin) return null;
  return (
    <a
      href={COMPANY.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 rounded border-2 border-blueprint/30 bg-blueprint/5 p-4 text-sm text-ink transition-colors hover:border-blueprint ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-blueprint text-paper">
        <Linkedin size={18} aria-hidden="true" />
      </span>
      <span>
        <strong className="block font-display text-ink">Acompanhe a TecMatch no LinkedIn</strong>
        Conteúdo sobre segurança em unidades de grãos, normas e novidades da plataforma.
      </span>
    </a>
  );
}
