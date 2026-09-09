import clsx from 'clsx';
import { forwardRef, type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full rounded border-2 border-line bg-white px-3 py-2 text-ink',
            'transition-colors focus:border-ink focus:outline-none',
            error && 'border-red-600',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>
    );
  },
);
Select.displayName = 'Select';
