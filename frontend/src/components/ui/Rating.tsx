import clsx from 'clsx';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
}

export function Rating({ value, count, size = 16 }: RatingProps) {
  const rounded = Math.round(value);
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={size}
            className={clsx(index < rounded ? 'fill-signal text-signal' : 'text-line')}
          />
        ))}
      </div>
      <span className="font-mono text-sm text-ink/70">
        {value.toFixed(1)}
        {typeof count === 'number' && ` (${count})`}
      </span>
    </div>
  );
}
