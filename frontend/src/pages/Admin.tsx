import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { listPendingProfessionals, verifyProfessional } from '@/api/admin.api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { formatDate } from '@/lib/format';

export function Admin() {
  useDocumentMeta({ title: 'Verificação de profissionais' });
  const queryClient = useQueryClient();

  const { data: pending, isLoading } = useQuery({
    queryKey: ['admin-pending-professionals'],
    queryFn: listPendingProfessionals,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyProfessional,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-professionals'] });
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Verificação de profissionais</h1>
      <p className="mt-2 text-ink/60">
        Profissionais que informaram o número de registro no Crea e aguardam confirmação. Confira o
        registro na consulta pública do Confea antes de aprovar.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : pending && pending.length > 0 ? (
          <div className="flex flex-col gap-4">
            {pending.map((professional) => (
              <Card key={professional.id} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{professional.name}</h3>
                  <p className="text-sm text-ink/60">{professional.email}</p>
                  {(professional.city || professional.state) && (
                    <p className="text-sm text-ink/50">
                      {[professional.city, professional.state].filter(Boolean).join(' - ')}
                    </p>
                  )}
                  <p className="mt-1 font-mono text-sm text-ink">Crea: {professional.creaNumber}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {professional.categories.map((category) => (
                      <Badge key={category.id} tone="info">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-ink/40">Cadastrado em {formatDate(professional.createdAt)}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a href="https://consultaprofissional.confea.org.br/" target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm">
                      Verificar no Confea
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    onClick={() => verifyMutation.mutate(professional.id)}
                    isLoading={verifyMutation.isPending}
                  >
                    Aprovar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center text-ink/50">Nenhum profissional aguardando verificação.</Card>
        )}
      </div>
    </div>
  );
}
