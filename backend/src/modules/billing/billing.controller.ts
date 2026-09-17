import type { Request, Response } from 'express';
import type Stripe from 'stripe';
import { env } from '../../config/env';
import { stripe } from '../../config/stripe';
import * as billingService from './billing.service';

export async function checkoutController(req: Request, res: Response) {
  const { url } = await billingService.createCheckoutSession(req.user!.sub);
  res.status(200).json({ url });
}

export async function portalController(req: Request, res: Response) {
  const { url } = await billingService.createPortalSession(req.user!.sub);
  res.status(200).json({ url });
}

// Rota separada, montada antes do express.json() global — o Stripe exige o
// corpo bruto da requisição pra verificar a assinatura do webhook.
export async function webhookController(req: Request, res: Response) {
  if (!stripe || !env.stripeWebhookSecret) {
    res.status(503).send('Webhook de cobrança não configurado.');
    return;
  }

  const signature = req.headers['stripe-signature'];
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature as string, env.stripeWebhookSecret);
  } catch (err) {
    res.status(400).send(`Assinatura do webhook inválida: ${(err as Error).message}`);
    return;
  }

  try {
    await billingService.handleWebhookEvent(event);
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Erro ao processar webhook do Stripe:', err);
    res.status(500).send('Erro ao processar o evento.');
  }
}
