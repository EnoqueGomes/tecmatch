import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="border-b-2 border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/buscar" className="text-sm font-medium text-ink hover:text-blueprint">
            Buscar profissionais
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-ink hover:text-blueprint">
                Painel
              </Link>
              <span className="hidden text-sm text-ink/60 sm:inline">Olá, {user.name.split(' ')[0]}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink hover:text-blueprint">
                Entrar
              </Link>
              <Link to="/registro">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
