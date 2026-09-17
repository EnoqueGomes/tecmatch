import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorMiddleware, notFoundMiddleware } from './middlewares/error.middleware';
import adminRoutes from './modules/admin/admin.routes';
import authRoutes from './modules/auth/auth.routes';
import billingRoutes from './modules/billing/billing.routes';
import { webhookController } from './modules/billing/billing.controller';
import categoryRoutes from './modules/categories/category.routes';
import messageRoutes from './modules/messages/message.routes';
import professionalRoutes from './modules/professionals/professional.routes';
import proposalRoutes, { proposalsForRequestRouter } from './modules/proposals/proposal.routes';
import reviewRoutes from './modules/reviews/review.routes';
import serviceRequestRoutes from './modules/service-requests/service-request.routes';
import userRoutes from './modules/users/user.routes';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigins, credentials: true }));

// Precisa vir ANTES do express.json() global: o Stripe exige o corpo bruto
// (não convertido em JSON) pra conseguir verificar a assinatura do webhook.
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), webhookController);

app.use(express.json());
if (!env.isProduction) {
  app.use(morgan('dev'));
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/billing', billingRoutes);

// Rotas aninhadas sob um pedido de serviço específico — montadas antes da
// rota geral para deixar explícito que são mais específicas.
app.use('/api/service-requests/:serviceRequestId/proposals', proposalsForRequestRouter);
app.use('/api/service-requests/:serviceRequestId/messages', messageRoutes);
app.use('/api/service-requests/:serviceRequestId/review', reviewRoutes);
app.use('/api/service-requests', serviceRequestRoutes);

app.use('/api/proposals', proposalRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
