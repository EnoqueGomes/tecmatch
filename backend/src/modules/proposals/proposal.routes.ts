import { Router } from 'express';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  createController,
  listForRequestController,
  listMineController,
  updateStatusController,
} from './proposal.controller';
import { createProposalSchema, updateProposalSchema } from './proposal.schema';

// Aninhado em /api/service-requests/:serviceRequestId/proposals
export const proposalsForRequestRouter = Router({ mergeParams: true });
proposalsForRequestRouter.post(
  '/',
  requireAuth,
  requireRole('PROFESSIONAL'),
  validate(createProposalSchema),
  asyncHandler(createController),
);
proposalsForRequestRouter.get('/', requireAuth, asyncHandler(listForRequestController));

// Montado em /api/proposals — ações sobre uma proposta específica.
export const proposalsRouter = Router();
proposalsRouter.get('/mine', requireAuth, requireRole('PROFESSIONAL'), asyncHandler(listMineController));
proposalsRouter.patch(
  '/:id',
  requireAuth,
  validate(updateProposalSchema),
  asyncHandler(updateStatusController),
);

export default proposalsRouter;
