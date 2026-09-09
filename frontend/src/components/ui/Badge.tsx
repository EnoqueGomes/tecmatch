import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type Tone = 'neutral' | 'success' | 'warning' | 'info';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-ink/5 text-ink',
  success: 'bg-moss/10 text-moss',
  warning: 'bg-signal/10 text-signal-dark',
  info: 'bg-blueprint/10 text-blueprint',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
