import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

const PUBLIC_LINKS = [
  { to: '/buscar', label: 'Buscar profissionais' },
  { to: '/servico-gerenciado', label: 'TecMatch Gerenciado' },
  { to: '/blog', label: 'Guias' },
  { to: '/diagnostico-seguranca-silos', label: 'Diagnóstico grátis' },
];

const LINK = 'whitespace-nowrap text-sm font-medium text-ink hover:text-blueprint';

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
        <nav className="flex items-center gap-4 md:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {PUBLIC_LINKS.map((item) => (
              <Link key={item.to} to={item.to} className={LINK}>
                {item.label}
              </Link>
            ))}
          </div>
          {user ? (
            <>
              <Link to="/dashboard" className={LINK}>
                Painel
              </Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className={LINK}>
                  Verificações
                </Link>
              )}
              <span className="hidden text-sm text-ink/60 lg:inline">Olá, {user.name.split(' ')[0]}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className={LINK}>
                Entrar
              </Link>
              <Link to="/registro">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      {/* No celular os links públicos ficam numa segunda linha, pra não estourar a largura. */}
      <nav
        aria-label="Seções do site"
        className="flex gap-5 overflow-x-auto border-t border-ink/10 px-6 py-2.5 md:hidden"
      >
        {PUBLIC_LINKS.map((item) => (
          <Link key={item.to} to={item.to} className={LINK}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
