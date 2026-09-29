import { useEffect } from 'react';

/**
 * Injeta um bloco de dados estruturados (JSON-LD) no <head> da página
 * enquanto o componente estiver montado. Usado pra marcar conteúdo de FAQ
 * e outros dados que ajudam buscadores e assistentes de IA a entender
 * exatamente do que a página trata.
 */
export function useJsonLd(data: object) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = json;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [json]);
}
