import clsx from 'clsx';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const areaId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={areaId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          className={clsx(
            'w-full resize-y rounded border-2 border-line bg-white px-3 py-2 text-ink placeholder:text-ink/40',
            'transition-colors focus:border-ink focus:outline-none',
            error && 'border-red-600',
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>
    );
  },
);
TextArea.displayName = 'TextArea';
