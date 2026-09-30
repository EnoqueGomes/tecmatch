import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { createLead } from '@/api/leads.api';
import { getApiErrorMessage } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { MANAGED_FAQ as FAQ_ITEMS } from '@/content/faq';
import { META } from '@/content/meta';
import { COMPANY } from '@/content/site';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';


export function ManagedService() {
  useDocumentMeta(META.managed);


  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    description: '',
  });
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createLead,
    onError: (err) => setError(getApiErrorMessage(err, 'Não foi possível enviar seu contato.')),
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    mutation.mutate({
      companyName: form.companyName,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone || undefined,
      description: form.description,
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <PageBadge />
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink">
        Contrate a TecMatch diretamente — nós cuidamos da equipe técnica
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink/70">
        Para empresas que preferem ter um único ponto de contato, em vez de comparar propostas por conta
        própria, a TecMatch oferece um serviço gerenciado: sua empresa contrata a TecMatch, e a TecMatch
        seleciona, contrata e acompanha o profissional técnico certo para o projeto.
      </p>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Como funciona</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: 'Envie os detalhes do projeto',
              description: 'Preencha o formulário no final desta página com o que sua empresa precisa.',
            },
            {
              title: 'A TecMatch seleciona o profissional',
              description:
                'Nossa equipe analisa a necessidade e escolhe um profissional com registro profissional conferido (Crea ou CRT) dentro da rede.',
            },
            {
              title: 'Acompanhamento até a entrega',
              description: 'A TecMatch acompanha a execução do serviço, com um único ponto de contato para sua empresa.',
            },
          ].map((step, index) => (
            <div key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-mono text-sm text-ink/40">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Por que escolher o serviço gerenciado</h2>
        <ul className="mt-6 flex flex-col gap-3 text-ink/80">
          <li>• Um único fornecedor e um único ponto de contato, sem precisar comparar propostas de vários profissionais.</li>
          <li>• Acompanhamento da TecMatch durante todo o projeto, do início à entrega.</li>
          <li>• Indicado para empresas que preferem terceirizar a gestão do serviço técnico, não só encontrar quem executa.</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">Perguntas frequentes</h2>
        <div className="mt-6 flex flex-col gap-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question}>
              <h3 className="font-display text-lg font-semibold text-ink">{item.question}</h3>
              <p className="mt-1 text-ink/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" id="contato">
        <h2 className="font-display text-2xl font-semibold text-ink">Fale com a TecMatch</h2>
        <p className="mt-2 text-ink/60">Conte um pouco sobre o projeto — nossa equipe entra em contato em seguida.</p>
        <a
          href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Olá! Tenho interesse no TecMatch Gerenciado.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded border-2 border-moss px-4 py-2 text-sm font-medium text-moss transition-colors hover:bg-moss hover:text-paper"
        >
          Prefere falar agora? Chame no WhatsApp
        </a>

        {mutation.isSuccess ? (
          <Card className="mt-6 border-moss/30 bg-moss/5">
            <p className="text-sm text-ink">
              Recebemos seu contato. Nossa equipe vai analisar e retornar em breve pelo e-mail informado.
            </p>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nome da empresa"
                value={form.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                required
              />
              <Input
                label="Seu nome"
                value={form.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
              />
              <Input
                label="Telefone (opcional)"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
            <TextArea
              label="O que sua empresa precisa?"
              rows={4}
              placeholder="Descreva o serviço técnico, o prazo esperado e qualquer detalhe importante."
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              minLength={10}
              required
            />
            {error && <p className="text-sm text-red-700">{error}</p>}
            <Button type="submit" isLoading={mutation.isPending} className="w-fit">
              Enviar
            </Button>
          </form>
        )}
      </section>
    </div>
  );
}

function PageBadge() {
  return (
    <span className="inline-flex items-center rounded border-2 border-signal/40 bg-signal/5 px-3 py-1 text-sm font-medium text-signal-dark">
      TecMatch Gerenciado
    </span>
  );
}
