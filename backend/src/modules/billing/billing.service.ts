import type Stripe from 'stripe';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { stripe } from '../../config/stripe';
import { AppError } from '../../utils/AppError';

function ensureStripeConfigured() {
  if (!stripe || !env.stripePriceId) {
    throw new AppError('Cobrança por assinatura ainda não está configurada.', 503);
  }
}

export async function createCheckoutSession(userId: string) {
  ensureStripeConfigured();

  const profile = await prisma.professionalProfile.findUnique({
    where: { userId },
    include: { user: true },
  });
  if (!profile) {
    throw AppError.notFound('Perfil de profissional não encontrado');
  }

  const session = await stripe!.checkout.sessions.create({
    mode: 'subscription',
    customer: profile.stripeCustomerId ?? undefined,
    customer_email: profile.stripeCustomerId ? undefined : profile.user.email,
    line_items: [{ price: env.stripePriceId!, quantity: 1 }],
    success_url: `${env.frontendUrl}/dashboard?assinatura=sucesso`,
    cancel_url: `${env.frontendUrl}/dashboard?assinatura=cancelada`,
    client_reference_id: userId,
    metadata: { userId },
  });

  return { url: session.url };
}

export async function createPortalSession(userId: string) {
  ensureStripeConfigured();

  const profile = await prisma.professionalProfile.findUnique({ where: { userId } });
  if (!profile?.stripeCustomerId) {
    throw new AppError('Você ainda não tem uma assinatura ativa.', 400);
  }

  const session = await stripe!.billingPortal.sessions.create({
    customer: profile.stripeCustomerId,
    return_url: `${env.frontendUrl}/dashboard`,
  });

  return { url: session.url };
}

export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id ?? session.metadata?.userId;
      if (!userId || typeof session.customer !== 'string' || typeof session.subscription !== 'string') {
        break;
      }

      await prisma.professionalProfile.update({
        where: { userId },
        data: {
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
          subscriptionStatus: 'ACTIVE',
          isFeatured: true,
        },
      });
      break;
    }
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const isActive = subscription.status === 'active' || subscription.status === 'trialing';

      const profile = await prisma.professionalProfile.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      });
      if (!profile) break;

      await prisma.professionalProfile.update({
        where: { id: profile.id },
        data: {
          subscriptionStatus: isActive ? 'ACTIVE' : subscription.status === 'past_due' ? 'PAST_DUE' : 'CANCELED',
          isFeatured: isActive,
          subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
      break;
    }
    default:
      break;
  }
}
