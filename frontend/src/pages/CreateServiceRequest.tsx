import { useQuery } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { listCategories } from '@/api/categories.api';
import { getApiErrorMessage } from '@/api/client';
import { createServiceRequest } from '@/api/serviceRequests.api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';

const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export function CreateServiceRequest() {
  const navigate = useNavigate();
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: listCategories });
  const [form, setForm] = useState({
    categoryId: '',
    title: '',
    description: '',
    city: '',
    state: '',
    budgetMin: '',
    budgetMax: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const request = await createServiceRequest({
        categoryId: form.categoryId,
        title: form.title,
        description: form.description,
        city: form.city,
        state: form.state,
        budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
        budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined,
      });
      navigate(`/pedidos/${request.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível publicar o pedido.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Publicar um serviço</h1>
      <p className="mt-2 text-ink/60">Quanto mais detalhes, melhores as propostas que você recebe.</p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Select
          label="Categoria"
          value={form.categoryId}
          onChange={(e) => updateField('categoryId', e.target.value)}
          required
        >
          <option value="">Selecione</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          label="Título"
          placeholder="Ex: Instalação de quadro elétrico residencial"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          required
        />
        <TextArea
          label="Descrição"
          rows={5}
          placeholder="Descreva o que precisa ser feito, prazos e qualquer detalhe importante."
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          minLength={20}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Cidade" value={form.city} onChange={(e) => updateField('city', e.target.value)} required />
          <Select label="Estado" value={form.state} onChange={(e) => updateField('state', e.target.value)} required>
            <option value="">--</option>
            {BRAZIL_STATES.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Orçamento mínimo (opcional)"
            type="number"
            min="0"
            value={form.budgetMin}
            onChange={(e) => updateField('budgetMin', e.target.value)}
          />
          <Input
            label="Orçamento máximo (opcional)"
            type="number"
            min="0"
            value={form.budgetMax}
            onChange={(e) => updateField('budgetMax', e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <Button type="submit" isLoading={isSubmitting} className="mt-2">
          Publicar pedido
        </Button>
      </form>
    </div>
  );
}
