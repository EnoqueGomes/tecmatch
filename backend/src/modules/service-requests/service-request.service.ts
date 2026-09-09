import { Prisma, RequestStatus } from '@prisma/client';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/AppError';
import type { JwtPayload } from '../../utils/jwt';
import type {
  CreateServiceRequestInput,
  ListServiceRequestsQuery,
  UpdateStatusInput,
} from './service-request.schema';

const INCLUDE = {
  client: true,
  category: true,
  _count: { select: { proposals: true } },
} satisfies Prisma.ServiceRequestInclude;

type RequestWithRelations = Prisma.ServiceRequestGetPayload<{ include: typeof INCLUDE }>;

function serialize(request: RequestWithRelations) {
  const { client, _count, ...rest } = request;
  return {
    ...rest,
    client: { id: client.id, name: client.name, city: client.city, state: client.state },
    proposalCount: _count.proposals,
  };
}

export async function create(clientId: string, input: CreateServiceRequestInput) {
  const request = await prisma.serviceRequest.create({
    data: { ...input, clientId },
    include: INCLUDE,
  });
  return serialize(request);
}

// Clientes só veem os próprios pedidos; profissionais veem os pedidos
// em aberto (é o "quadro de oportunidades" deles).
export async function list(requester: JwtPayload, query: ListServiceRequestsQuery) {
  const { status, category, city, page, pageSize } = query;

  const where: Prisma.ServiceRequestWhereInput = {
    ...(status ? { status } : {}),
    ...(category ? { category: { slug: category } } : {}),
    ...(city ? { city: { equals: city, mode: 'insensitive' } } : {}),
  };

  if (requester.role === 'CLIENT') {
    where.clientId = requester.sub;
  } else if (requester.role === 'PROFESSIONAL') {
    where.status = where.status ?? RequestStatus.OPEN;
  }

  const [items, total] = await Promise.all([
    prisma.serviceRequest.findMany({
      where,
      include: INCLUDE,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.serviceRequest.count({ where }),
  ]);

  return { items: items.map(serialize), total, page, pageSize };
}

export async function getById(id: string) {
  const request = await prisma.serviceRequest.findUnique({ where: { id }, include: INCLUDE });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  return serialize(request);
}

const ALLOWED_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  OPEN: [RequestStatus.IN_PROGRESS, RequestStatus.CANCELLED],
  IN_PROGRESS: [RequestStatus.COMPLETED, RequestStatus.CANCELLED],
  COMPLETED: [],
  CANCELLED: [],
};

export async function updateStatus(id: string, requesterId: string, input: UpdateStatusInput) {
  const request = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!request) {
    throw AppError.notFound('Pedido de serviço não encontrado');
  }
  if (request.clientId !== requesterId) {
    throw AppError.forbidden('Só o cliente que criou o pedido pode alterar o status');
  }
  if (!ALLOWED_TRANSITIONS[request.status].includes(input.status)) {
    throw AppError.conflict(`Não é possível mudar de ${request.status} para ${input.status}`);
  }

  const updated = await prisma.serviceRequest.update({
    where: { id },
    data: { status: input.status },
    include: INCLUDE,
  });
  return serialize(updated);
}
