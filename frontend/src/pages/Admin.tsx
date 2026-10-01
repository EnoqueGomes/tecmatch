import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { listPendingProfessionals, verifyProfessional } from '@/api/admin.api';
import { listDiagnostics, UNIT_TYPE_LABELS } from '@/api/diagnostics.api';
import { listLeads } from '@/api/leads.api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { LEVELS } from '@/content/diagnostic';
import { formatDate } from '@/lib/format';

export function Admin() {
  useDocumentMeta({ title: 'Administração' });
  const [tab, setTab] = useState<'verificacoes' | 'contatos' | 'diagnosticos'>('verificacoes');

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
        <TabButton active={tab === 'diagnosticos'} onClick={() => setTab('diagnosticos')}>
          Diagnósticos (grãos)
        </TabButton>
      </div>

      <div className="mt-8">
        {tab === 'verificacoes' && <VerificationsPanel />}
        {tab === 'contatos' && <LeadsPanel />}
        {tab === 'diagnosticos' && <DiagnosticsPanel />}
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
        Profissionais que informaram o número de registro e aguardam confirmação. Confira no conselho
        certo antes de aprovar: engenheiros no Crea/Confea, técnicos industriais no CFT/CRT.
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
                  <p className="mt-1 font-mono text-sm text-ink">Registro: {professional.creaNumber}</p>
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
                      Consultar no Confea
                    </Button>
                  </a>
                  <a href="https://www.cft.org.br/" target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm">
                      Consultar no CFT/CRT
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

// Telefone brasileiro -> número do WhatsApp com DDI (55).
function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length <= 11 ? `55${digits}` : digits;
}

function DiagnosticsPanel() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['admin-diagnostics'],
    queryFn: listDiagnostics,
  });

  return (
    <>
      <p className="text-ink/60">
        Pessoas que concluíram o autodiagnóstico de segurança para unidades de grãos e autorizaram o contato. Os mais
        recentes aparecem primeiro.
      </p>

      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : items && items.length > 0 ? (
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const level = LEVELS[item.level];
              const message = `Olá, ${item.contactName.split(' ')[0]}! Aqui é da TecMatch. Vi que você fez o autodiagnóstico de segurança da ${item.companyName} (resultado: ${level.label}, ${item.score}%). Posso te apresentar os pontos de atenção?`;
              return (
                <Card key={item.id}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink">{item.companyName}</h3>
                    <span className={`rounded border px-2 py-0.5 text-xs font-medium ${level.tone}`}>
                      {level.label} · {item.score}%
                    </span>
                  </div>
                  <p className="text-sm text-ink/70">
                    {item.contactName}
                    {item.role && ` (${item.role})`} · {item.email} · {item.phone}
                  </p>
                  <p className="text-sm text-ink/60">
                    {item.city} · {UNIT_TYPE_LABELS[item.unitType] ?? item.unitType}
                  </p>
                  {item.criticalGaps > 0 && (
                    <p className="mt-1 text-sm font-medium text-red-700">
                      {item.criticalGaps} item(ns) crítico(s) não atendido(s)
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/${whatsappNumber(item.phone)}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">Chamar no WhatsApp</Button>
                    </a>
                    <a href={`mailto:${item.email}`}>
                      <Button size="sm" variant="secondary">
                        Enviar e-mail
                      </Button>
                    </a>
                    <span className="text-xs text-ink/40">Recebido em {formatDate(item.createdAt)}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="py-12 text-center text-ink/50">Nenhum diagnóstico recebido ainda.</Card>
        )}
      </div>
    </>
  );
}
