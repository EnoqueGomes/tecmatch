import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { listPendingProfessionals, verifyProfessional } from '@/api/admin.api';
import { listLeads } from '@/api/leads.api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { formatDate } from '@/lib/format';

export function Admin() {
  useDocumentMeta({ title: 'Administração' });
  const [tab, setTab] = useState<'verificacoes' | 'contatos'>('verificacoes');

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Administração</h1>

      <div className="mt-6 flex gap-2 border-b-2 border-ink/10">
        <TabButton active={tab === 'verificacoes'} onClick={() => setTab('verificacoes')}>
          Verificações
        </TabButton>
        <TabButton active={tab === 'contatos'} onClick={() => setTab('contatos')}>
          Contatos (Gerenciado)
        </TabButton>
      </div>

      <div className="mt-8">
        {tab === 'verificacoes' ? <VerificationsPanel /> : <LeadsPanel />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-0.5 border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
        active ? 'border-ink text-ink' : 'border-transparent text-ink/50 hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}

function VerificationsPanel() {
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
    <>
      <p className="text-ink/60">
        Profissionais que informaram o número de registro no Crea e aguardam confirmação. Confira o
        registro na consulta pública do Confea antes de aprovar.
      </p>

      <div className="mt-6">
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
    </>
  );
}

function LeadsPanel() {
  const { data: leads, isLoading } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: listLeads,
  });

  return (
    <>
      <p className="text-ink/60">Empresas que pediram contato pela página do TecMatch Gerenciado.</p>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : leads && leads.length > 0 ? (
          <div className="flex flex-col gap-4">
            {leads.map((lead) => (
              <Card key={lead.id}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">{lead.companyName}</h3>
                  <Badge tone="warning">{lead.status}</Badge>
                </div>
                <p className="text-sm text-ink/70">
                  {lead.contactName} · {lead.email}
                  {lead.phone && ` · ${lead.phone}`}
                </p>
                <p className="mt-2 text-sm text-ink/80">{lead.description}</p>
                <p className="mt-2 text-xs text-ink/40">Recebido em {formatDate(lead.createdAt)}</p>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center text-ink/50">Nenhum contato recebido ainda.</Card>
        )}
      </div>
    </>
  );
}
