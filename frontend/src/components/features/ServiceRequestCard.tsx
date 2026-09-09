import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '@/lib/format';
import { REQUEST_STATUS_LABEL, REQUEST_STATUS_TONE } from '@/lib/status';
import type { ServiceRequest } from '@/types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function ServiceRequestCard({ request }: { request: ServiceRequest }) {
  const budgetMin = formatCurrency(request.budgetMin);
  const budgetMax = formatCurrency(request.budgetMax);

  return (
    <Link to={`/pedidos/${request.id}`}>
      <Card className="flex h-full flex-col gap-3 transition-colors hover:border-ink/30">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">{request.title}</h3>
          <Badge tone={REQUEST_STATUS_TONE[request.status]}>{REQUEST_STATUS_LABEL[request.status]}</Badge>
        </div>
        <Badge tone="info" className="w-fit">
          {request.category.name}
        </Badge>
        <p className="line-clamp-2 text-sm text-ink/70">{request.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm text-ink/60">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            {request.city} - {request.state}
          </div>
          <span className="font-mono">
            {budgetMin && budgetMax ? `${budgetMin} – ${budgetMax}` : (budgetMin ?? budgetMax ?? 'A combinar')}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-ink/40">
          <span>{formatDate(request.createdAt)}</span>
          <span>
            {request.proposalCount} proposta{request.proposalCount === 1 ? '' : 's'}
          </span>
        </div>
      </Card>
    </Link>
  );
}
