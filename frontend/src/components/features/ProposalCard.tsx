import type { ReactNode } from 'react';
import { formatCurrency, formatDate } from '@/lib/format';
import { PROPOSAL_STATUS_LABEL, PROPOSAL_STATUS_TONE } from '@/lib/status';
import type { Proposal } from '@/types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface ProposalCardProps {
  proposal: Proposal;
  actions?: ReactNode;
}

export function ProposalCard({ proposal, actions }: ProposalCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-display text-base font-semibold text-ink">{proposal.professional.name}</h4>
          {(proposal.professional.city || proposal.professional.state) && (
            <p className="text-sm text-ink/50">
              {[proposal.professional.city, proposal.professional.state].filter(Boolean).join(' - ')}
            </p>
          )}
        </div>
        <Badge tone={PROPOSAL_STATUS_TONE[proposal.status]}>{PROPOSAL_STATUS_LABEL[proposal.status]}</Badge>
      </div>
      <p className="text-sm text-ink/80">{proposal.message}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-base font-medium text-ink">{formatCurrency(proposal.price)}</span>
        {typeof proposal.estimatedDays === 'number' && (
          <span className="text-ink/60">
            ~{proposal.estimatedDays} dia{proposal.estimatedDays === 1 ? '' : 's'}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink/40">{formatDate(proposal.createdAt)}</span>
        {actions}
      </div>
    </Card>
  );
}
