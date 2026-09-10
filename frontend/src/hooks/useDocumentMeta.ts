import { useEffect } from 'react';

interface DocumentMetaOptions {
  title: string;
  description?: string;
}

export function useDocumentMeta({ title, description }: DocumentMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} — TecMatch`;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? null;
    if (description && meta) {
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (description && meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
