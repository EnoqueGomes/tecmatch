import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Texto com dois recursos simples: [texto](endereço) vira link e **texto** vira negrito.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_CLASS = 'text-blueprint underline underline-offset-2 hover:text-ink';

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, url] = link;
          return url.startsWith('/') ? (
            <Link key={index} to={url} className={LINK_CLASS}>
              {label}
            </Link>
          ) : (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {label}
            </a>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) {
          return (
            <strong key={index} className="font-semibold text-ink">
              {bold[1]}
            </strong>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
