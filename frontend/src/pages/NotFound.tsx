import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
      <span className="font-mono text-sm text-ink/40">Erro 404</span>
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Página não encontrada</h1>
      <p className="mt-2 text-ink/60">O endereço que você tentou acessar não existe ou foi movido.</p>
      <Link to="/" className="mt-6">
        <Button variant="secondary">Voltar para o início</Button>
      </Link>
    </div>
  );
}
