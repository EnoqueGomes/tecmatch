import Stripe from 'stripe';
import { env } from './env';

// `stripe` fica `null` até STRIPE_SECRET_KEY ser configurada — os serviços que
// o usam checam isso e respondem com um erro claro em vez de derrubar o servidor.
export const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;
