interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ variant = 'full', className }: LogoProps) {
  const icon = (
    <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#14213D" />
      <path
        d="M16 40 L32 17 L48 40"
        fill="none"
        stroke="#EEF1EC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="48" x2="52" y2="48" stroke="#EEF1EC" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="32" cy="17" r="3.5" fill="#D9822B" />
    </svg>
  );

  if (variant === 'icon') {
    return <span className={className}>{icon}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      {icon}
      <span className="font-display text-xl font-semibold tracking-tight">
        <span className="text-ink">Tec</span>
        <span className="text-signal">Match</span>
      </span>
    </span>
  );
}