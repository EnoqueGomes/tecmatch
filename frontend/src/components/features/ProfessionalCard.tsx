import { MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/format';
import type { ProfessionalSummary } from '@/types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Rating } from '../ui/Rating';

export function ProfessionalCard({ professional }: { professional: ProfessionalSummary }) {
  const hourlyRate = formatCurrency(professional.hourlyRate);
  return (
    <Link to={`/profissionais/${professional.id}`}>
      <Card className="flex h-full flex-col gap-3 transition-colors hover:border-ink/30">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">{professional.name}</h3>
          {professional.verified && (
            <span title="Perfil verificado">
              <ShieldCheck size={18} className="text-moss" />
            </span>
          )}
        </div>
        {(professional.city || professional.state) && (
          <div className="flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin size={14} />
            {[professional.city, professional.state].filter(Boolean).join(' - ')}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {professional.categories.slice(0, 3).map((category) => (
            <Badge key={category.id} tone="info">
              {category.name}
            </Badge>
          ))}
        </div>
        {professional.bio && <p className="line-clamp-2 text-sm text-ink/70">{professional.bio}</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <Rating value={Number(professional.avgRating)} count={professional.totalReviews} />
          {hourlyRate && <span className="font-mono text-sm text-ink/70">{hourlyRate}/h</span>}
        </div>
      </Card>
    </Link>
  );
}
