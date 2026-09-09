import { useQuery } from '@tanstack/react-query';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getProfessional } from '@/api/professionals.api';
import { listUserReviews } from '@/api/reviews.api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatDate } from '@/lib/format';

export function ProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: professional, isLoading } = useQuery({
    queryKey: ['professional', id],
    queryFn: () => getProfessional(id!),
    enabled: Boolean(id),
  });
  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => listUserReviews(id!),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!professional) {
    return <p className="mx-auto max-w-2xl px-6 py-16 text-center text-ink/60">Profissional não encontrado.</p>;
  }

  const hourlyRate = formatCurrency(professional.hourlyRate);
  const canRequestService = !user || user.role !== 'PROFESSIONAL';

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl font-semibold text-ink">{professional.name}</h1>
            {professional.verified && <ShieldCheck size={22} className="text-moss" />}
          </div>
          {(professional.city || professional.state) && (
            <div className="mt-2 flex items-center gap-1.5 text-ink/60">
              <MapPin size={16} />
              {[professional.city, professional.state].filter(Boolean).join(' - ')}
            </div>
          )}
          <div className="mt-3">
            <Rating value={Number(professional.avgRating)} count={professional.totalReviews} size={18} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {professional.categories.map((category) => (
              <Badge key={category.id} tone="info">
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          {hourlyRate && <span className="font-mono text-xl text-ink">{hourlyRate}/h</span>}
          {canRequestService && (
            <Link to="/pedidos/novo">
              <Button>Publicar um serviço</Button>
            </Link>
          )}
        </div>
      </div>

      {professional.bio && <p className="mt-8 max-w-2xl text-ink/80">{professional.bio}</p>}

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-ink">Avaliações</h2>
        {reviews && reviews.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">{review.reviewer.name}</span>
                  <Rating value={review.rating} size={14} />
                </div>
                {review.comment && <p className="mt-2 text-sm text-ink/70">{review.comment}</p>}
                <p className="mt-2 text-xs text-ink/40">{formatDate(review.createdAt)}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink/50">Ainda sem avaliações.</p>
        )}
      </section>
    </div>
  );
}
