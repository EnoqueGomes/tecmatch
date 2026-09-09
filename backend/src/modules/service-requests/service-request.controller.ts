import type { Request, Response } from 'express';
import * as serviceRequestService from './service-request.service';
import type { ListServiceRequestsQuery } from './service-request.schema';

export async function createController(req: Request, res: Response) {
  const request = await serviceRequestService.create(req.user!.sub, req.body);
  res.status(201).json(request);
}

export async function listController(req: Request, res: Response) {
  const result = await serviceRequestService.list(
    req.user!,
    req.query as unknown as ListServiceRequestsQuery,
  );
  res.status(200).json(result);
}

export async function getByIdController(req: Request, res: Response) {
  const request = await serviceRequestService.getById(req.params.id);
  res.status(200).json(request);
}

export async function updateStatusController(req: Request, res: Response) {
  const request = await serviceRequestService.updateStatus(req.params.id, req.user!.sub, req.body);
  res.status(200).json(request);
}
