import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded border-2 border-line bg-white px-3 py-2 text-ink placeholder:text-ink/40',
            'transition-colors focus:border-ink focus:outline-none',
            error && 'border-red-600',
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
        {!error && hint && <p className="text-sm text-ink/50">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
