import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-signal text-ink hover:bg-signal-dark disabled:bg-signal/50',
  secondary: 'border-2 border-ink text-ink hover:bg-ink hover:text-paper disabled:opacity-50',
  ghost: 'text-ink hover:bg-ink/5 disabled:opacity-50',
  danger: 'border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-paper disabled:opacity-50',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? 'Enviando...' : children}
      </button>
    );
  },
);
Button.displayName = 'Button';
