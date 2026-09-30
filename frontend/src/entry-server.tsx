// Usado só no build: transforma as páginas públicas em HTML pronto, para que o
// Google e os assistentes de IA leiam o conteúdo sem precisar executar JavaScript.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { AuthProvider } from './context/AuthContext';

export { getSeoPages } from './seo-pages';
export { COMPANY, SITE_URL } from './content/site';

export function render(url: string) {
  const queryClient = new QueryClient();
  return renderToString(
    <StaticRouter location={url}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </StaticRouter>,
  );
}
