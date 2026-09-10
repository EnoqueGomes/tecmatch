import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { listCategories } from '@/api/categories.api';
import { getApiErrorMessage } from '@/api/client';
import { getProfessional, upsertProfile } from '@/api/professionals.api';
import { listMyProposals } from '@/api/proposals.api';
import { listServiceRequests } from '@/api/serviceRequests.api';
import { ProposalCard } from '@/components/features/ProposalCard';
import { ServiceRequestCard } from '@/components/features/ServiceRequestCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { TextArea } from '@/components/ui/TextArea';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export function Dashboard() {
  useDocumentMeta({ title: 'Painel' });
  const { user } = useAuth();
  if (!user) return null;
  return user.role === 'PROFESSIONAL' ? <ProfessionalDashboard userId={user.id} /> : <ClientDashboard />;
}

function ClientDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-service-requests'],
    queryFn: () => listServiceRequests({}),
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink">Meus pedidos</h1>
        <Link to="/pedidos/novo">
          <Button>Novo pedido</Button>
        </Link>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((request) => (
              <ServiceRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center text-ink/50">
            Você ainda não publicou nenhum pedido de serviço.
          </Card>
        )}
      </div>
    </div>
  );
}

function ProfessionalDashboard({ userId }: { userId: string }) {
  const [tab, setTab] = useState<'open' | 'mine'>('open');

  const { data: profile } = useQuery({
    queryKey: ['professional', userId],
    queryFn: () => getProfessional(userId),
  });
  const { data: openRequests, isLoading: isLoadingOpen } = useQuery({
    queryKey: ['open-service-requests'],
    queryFn: () => listServiceRequests({}),
    enabled: tab === 'open',
  });
  const { data: myProposals, isLoading: isLoadingProposals } = useQuery({
    queryKey: ['my-proposals'],
    queryFn: listMyProposals,
    enabled: tab === 'mine',
  });

  const needsProfile = profile && profile.categories.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Painel do profissional</h1>

      {needsProfile && <ProfileSetupCard userId={userId} />}

      <div className="mt-8 flex gap-2 border-b-2 border-ink/10">
        <TabButton active={tab === 'open'} onClick={() => setTab('open')}>
          Pedidos disponíveis
        </TabButton>
        <TabButton active={tab === 'mine'} onClick={() => setTab('mine')}>
          Minhas propostas
        </TabButton>
      </div>

      <div className="mt-6">
        {tab === 'open' &&
          (isLoadingOpen ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : openRequests && openRequests.items.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {openRequests.items.map((request) => (
                <ServiceRequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center text-ink/50">Nenhum pedido em aberto no momento.</Card>
          ))}

        {tab === 'mine' &&
          (isLoadingProposals ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : myProposals && myProposals.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {myProposals.map((proposal) => (
                <Link key={proposal.id} to={`/pedidos/${proposal.serviceRequestId}`}>
                  <ProposalCard proposal={proposal} />
                </Link>
              ))}
            </div>
          ) : (
            <Card className="py-12 text-center text-ink/50">Você ainda não enviou nenhuma proposta.</Card>
          ))}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
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

function ProfileSetupCard({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: listCategories });
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: upsertProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professional', userId] });
    },
    onError: (err) => setError(getApiErrorMessage(err, 'Não foi possível salvar o perfil.')),
  });

  function toggleCategory(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  function handleSubmit() {
    setError(null);
    if (selected.length === 0) {
      setError('Escolha ao menos uma área de atuação.');
      return;
    }
    mutation.mutate({
      bio: bio || undefined,
      hourlyRate: hourlyRate ? Number(hourlyRate) : undefined,
      categoryIds: selected,
    });
  }

  return (
    <Card className="mt-6 border-signal/40 bg-signal/5">
      <h2 className="font-display text-lg font-semibold text-ink">Complete seu perfil</h2>
      <p className="mt-1 text-sm text-ink/70">
        Escolha suas áreas de atuação para começar a aparecer nas buscas e nos pedidos em aberto.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => toggleCategory(category.id)}
            className={`rounded border-2 px-3 py-1.5 text-sm transition-colors ${
              selected.includes(category.id) ? 'border-ink bg-ink text-paper' : 'border-line text-ink'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Input
          label="Valor por hora (R$, opcional)"
          type="number"
          min="0"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <TextArea label="Sobre você (opcional)" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <Button className="mt-4" onClick={handleSubmit} isLoading={mutation.isPending}>
        Salvar perfil
      </Button>
    </Card>
  );
}
