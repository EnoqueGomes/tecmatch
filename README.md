# TecMatch

Marketplace de profissionais técnicos e engenharia — conecta clientes que
precisam de um serviço a técnicos e engenheiros que o executam. MVP
funcional, pensado para evoluir sem reescrita.

> "TecMatch" é um nome de trabalho — troque pela marca que você escolher
> (aparece no `package.json`, no `index.html` e no `Navbar.tsx`).

## Stack

- **Backend**: Node.js + Express + TypeScript, organizado em módulos por
  domínio (`auth`, `users`, `professionals`, `categories`, `service-requests`,
  `proposals`, `reviews`, `messages`).
- **Banco**: PostgreSQL + Prisma ORM.
- **Frontend**: React + TypeScript + Vite + TailwindCSS + React Query.
- **Autenticação**: JWT (Bearer token).

## Rodando localmente

### 1. Banco de dados

Com Docker:

```bash
docker run --name tecmatch-db -e POSTGRES_USER=tecmatch -e POSTGRES_PASSWORD=tecmatch \
  -e POSTGRES_DB=tecmatch -p 5432:5432 -d postgres:16
```

Ou use qualquer Postgres já instalado — só ajuste `DATABASE_URL`.

### 2. Backend

```bash
cd backend
cp .env.example .env      # ajuste DATABASE_URL e JWT_SECRET se precisar
npm install
npm run prisma:migrate    # cria as tabelas
npm run prisma:seed       # popula as categorias
npm run dev               # http://localhost:3333
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

Crie uma conta como cliente e outra como profissional (em outra aba/navegador
anônimo) para testar o fluxo completo: publicar pedido → enviar proposta →
aceitar → conversar → concluir → avaliar.

## Scripts úteis

| Onde | Comando | O que faz |
|---|---|---|
| backend | `npm run dev` | Sobe a API com reload automático |
| backend | `npm run build` | Compila para `dist/` |
| backend | `npm run prisma:studio` | Interface visual do banco |
| backend | `npm run prisma:migrate` | Aplica migrations em dev |
| frontend | `npm run dev` | Sobe o frontend com hot reload |
| frontend | `npm run build` | Type-check + build de produção |

## Deploy sugerido para validar o MVP

- **Frontend**: Vercel (grátis, deploy automático a cada push).
- **Backend**: Railway ou Render (free tier cobre o tráfego inicial).
- **Banco**: Railway Postgres, Supabase ou Neon.

Configure `CORS_ORIGIN` no backend com a URL do frontend em produção, e
`VITE_API_URL` no frontend com a URL da API.

## Roteiro de evolução

O MVP resolve o ciclo essencial (publicar → propor → contratar → avaliar).
Alguns próximos passos, na ordem que mais destrava crescimento:

1. **Modo sob demanda**: hoje o profissional envia proposta; o modelo híbrido
   descrito no pitch (plataforma aloca o profissional diretamente) é um novo
   caminho de criação de `Proposal` — não exige mudar o schema.
2. **Pagamento**: integrar Stripe ou Mercado Pago no aceite da proposta,
   com repasse ao profissional após conclusão (comissão da plataforma).
3. **Upload de imagens**: portfólio do profissional e fotos do problema no
   pedido — via S3/Cloudflare R2 + presigned URLs.
4. **Mensagens em tempo real**: trocar o polling do chat por WebSockets
   (Socket.io) quando o volume justificar.
5. **Busca**: se o catálogo de profissionais crescer muito, mover a busca
   para Postgres full-text ou Algolia/Meilisearch.
6. **Notificações**: e-mail/SMS em eventos-chave (nova proposta, proposta
   aceita) via fila (BullMQ + Redis).
7. **Testes automatizados e CI**: o módulo por domínio facilita testes de
   integração por módulo; ainda não incluídos neste MVP para manter o
   escopo enxuto.
8. **Avaliação bidirecional**: hoje só o cliente avalia; abrir para o
   profissional avaliar o cliente é uma mudança pequena no `review.service`.
