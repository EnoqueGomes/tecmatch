import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { getApiErrorMessage } from '@/api/client';
import { listMessages, sendMessage } from '@/api/messages.api';
import {
  createProposal,
  listMyProposals,
  listProposalsForRequest,
  updateProposalStatus,
} from '@/api/proposals.api';
import { createReview } from '@/api/reviews.api';
import { getServiceRequest, updateServiceRequestStatus } from '@/api/serviceRequests.api';
import { ProposalCard } from '@/components/features/ProposalCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { TextArea } from '@/components/ui/TextArea';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatDate } from '@/lib/format';
import { REQUEST_STATUS_LABEL, REQUEST_STATUS_TONE } from '@/lib/status';
import type { Message } from '@/types';

export function ServiceRequestDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: request, isLoading } = useQuery({
    queryKey: ['service-request', id],
    queryFn: () => getServiceRequest(id!),
    enabled: Boolean(id),
  });

  const isOwner = Boolean(user && request && user.id === request.clientId);
  const isProfessional = user?.role === 'PROFESSIONAL';

  const { data: proposals } = useQuery({
    queryKey: ['proposals', id],
    queryFn: () => listProposalsForRequest(id!),
    enabled: Boolean(id) && isOwner,
  });

  const { data: myProposals } = useQuery({
    queryKey: ['my-proposals'],
    queryFn: listMyProposals,
    enabled: isProfessional && !isOwner,
  });
  const myProposal = myProposals?.find((p) => p.serviceRequestId === id);

  const canSeeMessages = isOwner || Boolean(myProposal);
  const { data: messages } = useQuery({
    queryKey: ['messages', id],
    queryFn: () => listMessages(id!),
    enabled: Boolean(id) && canSeeMessages,
  });

  const proposalMutation = useMutation({
    mutationFn: (payload: { price: number; estimatedDays?: number; message: string }) =>
      createProposal(id!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] });
    },
  });

  const respondMutation = useMutation({
    mutationFn: ({ proposalId, status }: { proposalId: string; status: 'ACCEPTED' | 'REJECTED' }) =>
      updateProposalStatus(proposalId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals', id] });
      queryClient.invalidateQueries({ queryKey: ['service-request', id] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: (status: 'COMPLETED' | 'CANCELLED') => updateServiceRequestStatus(id!, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-request', id] });
    },
  });

  const messageMutation = useMutation({
    mutationFn: (content: string) => sendMessage(id!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', id] });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: ({ rating, comment }: { rating: number; comment?: string }) => createReview(id!, rating, comment),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!request) {
    return <p className="mx-auto max-w-2xl px-6 py-16 text-center text-ink/60">Pedido não encontrado.</p>;
  }

  const budgetMin = formatCurrency(request.budgetMin);
  const budgetMax = formatCurrency(request.budgetMax);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge tone="info">{request.category.name}</Badge>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink">{request.title}</h1>
          <p className="mt-1 text-sm text-ink/60">
            {request.city} - {request.state} · publicado em {formatDate(request.createdAt)}
          </p>
        </div>
        <Badge tone={REQUEST_STATUS_TONE[request.status]}>{REQUEST_STATUS_LABEL[request.status]}</Badge>
      </div>

      <p className="mt-6 whitespace-pre-line text-ink/80">{request.description}</p>

      <div className="mt-4 flex flex-wrap gap-6 text-sm text-ink/60">
        <span>
          Orçamento:{' '}
          <span className="font-mono text-ink">
            {budgetMin && budgetMax ? `${budgetMin} – ${budgetMax}` : (budgetMin ?? budgetMax ?? 'A combinar')}
          </span>
        </span>
        <span>
          Cliente: <span className="text-ink">{request.client.name}</span>
        </span>
      </div>

      {isOwner && request.status === 'OPEN' && (
        <div className="mt-4">
          <Button variant="danger" size="sm" onClick={() => statusMutation.mutate('CANCELLED')} isLoading={statusMutation.isPending}>
            Cancelar pedido
          </Button>
        </div>
      )}

      {isOwner && request.status === 'IN_PROGRESS' && (
        <div className="mt-4 flex gap-3">
          <Button size="sm" onClick={() => statusMutation.mutate('COMPLETED')} isLoading={statusMutation.isPending}>
            Marcar como concluído
          </Button>
          <Button variant="danger" size="sm" onClick={() => statusMutation.mutate('CANCELLED')} isLoading={statusMutation.isPending}>
            Cancelar
          </Button>
        </div>
      )}

      {isOwner && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-ink">
            Propostas recebidas {proposals ? `(${proposals.length})` : ''}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {proposals?.length ? (
              proposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  actions={
                    proposal.status === 'PENDING' ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => respondMutation.mutate({ proposalId: proposal.id, status: 'ACCEPTED' })}
                          isLoading={respondMutation.isPending}
                        >
                          Aceitar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => respondMutation.mutate({ proposalId: proposal.id, status: 'REJECTED' })}
                          isLoading={respondMutation.isPending}
                        >
                          Rejeitar
                        </Button>
                      </div>
                    ) : undefined
                  }
                />
              ))
            ) : (
              <p className="text-sm text-ink/50">Ainda não há propostas para este pedido.</p>
            )}
          </div>
        </section>
      )}

      {isOwner && request.status === 'COMPLETED' && (
        <ReviewSection
          onSubmit={(payload) => reviewMutation.mutate(payload)}
          isSubmitting={reviewMutation.isPending}
          isDone={reviewMutation.isSuccess}
          error={reviewMutation.error ? getApiErrorMessage(reviewMutation.error) : null}
        />
      )}

      {isProfessional && !isOwner && request.status === 'OPEN' && !myProposal && (
        <ProposalForm
          onSubmit={(payload) => proposalMutation.mutate(payload)}
          isSubmitting={proposalMutation.isPending}
          error={proposalMutation.error ? getApiErrorMessage(proposalMutation.error) : null}
        />
      )}

      {myProposal && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-ink">Sua proposta</h2>
          <div className="mt-4">
            <ProposalCard proposal={myProposal} />
          </div>
        </section>
      )}

      {canSeeMessages && user && (
        <MessageThread
          messages={messages ?? []}
          currentUserId={user.id}
          onSend={(content) => messageMutation.mutate(content)}
          isSending={messageMutation.isPending}
        />
      )}
    </div>
  );
}

function ProposalForm({
  onSubmit,
  isSubmitting,
  error,
}: {
  onSubmit: (payload: { price: number; estimatedDays?: number; message: string }) => void;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [price, setPrice] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit({
      price: Number(price),
      estimatedDays: estimatedDays ? Number(estimatedDays) : undefined,
      message,
    });
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold text-ink">Enviar proposta</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Valor (R$)" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Input
            label="Prazo estimado (dias, opcional)"
            type="number"
            min="0"
            value={estimatedDays}
            onChange={(e) => setEstimatedDays(e.target.value)}
          />
        </div>
        <TextArea
          label="Mensagem"
          rows={4}
          placeholder="Como você resolveria esse serviço?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={10}
          required
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <Button type="submit" isLoading={isSubmitting} className="w-fit">
          Enviar proposta
        </Button>
      </form>
    </section>
  );
}

function ReviewSection({
  onSubmit,
  isSubmitting,
  isDone,
  error,
}: {
  onSubmit: (payload: { rating: number; comment?: string }) => void;
  isSubmitting: boolean;
  isDone: boolean;
  error: string | null;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (isDone) {
    return (
      <Card className="mt-12 border-moss/30 bg-moss/5">
        <p className="text-sm text-ink">Obrigado! Sua avaliação foi registrada.</p>
      </Card>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold text-ink">Avaliar profissional</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} estrelas`}>
              <Star size={24} className={value <= rating ? 'fill-signal text-signal' : 'text-line'} />
            </button>
          ))}
        </div>
        <TextArea label="Comentário (opcional)" rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <Button onClick={() => onSubmit({ rating, comment: comment || undefined })} isLoading={isSubmitting} className="w-fit">
          Enviar avaliação
        </Button>
      </div>
    </section>
  );
}

function MessageThread({
  messages,
  currentUserId,
  onSend,
  isSending,
}: {
  messages: Message[];
  currentUserId: string;
  onSend: (content: string) => void;
  isSending: boolean;
}) {
  const [content, setContent] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!content.trim()) return;
    onSend(content);
    setContent('');
  }

  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold text-ink">Conversa</h2>
      <div className="mt-4 flex max-h-96 flex-col gap-3 overflow-y-auto rounded border-2 border-ink/10 bg-white p-4">
        {messages.length === 0 && <p className="text-sm text-ink/40">Nenhuma mensagem ainda.</p>}
        {messages.map((message) => {
          const isMine = message.senderId === currentUserId;
          return (
            <div key={message.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-ink/40">{message.sender.name}</span>
              <p className={`mt-1 max-w-sm rounded px-3 py-2 text-sm ${isMine ? 'bg-ink text-paper' : 'bg-ink/5 text-ink'}`}>
                {message.content}
              </p>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-1 rounded border-2 border-line bg-white px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
        />
        <Button type="submit" size="sm" isLoading={isSending}>
          Enviar
        </Button>
      </form>
    </section>
  );
}
