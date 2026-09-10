import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiErrorMessage } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import type { UserRole } from '@/types';

const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

type Role = Extract<UserRole, 'CLIENT' | 'PROFESSIONAL'>;

export function Register() {
  useDocumentMeta({ title: 'Criar conta' });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CLIENT' as Role,
    phone: '',
    city: '',
    state: '',
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
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível criar a conta.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="font-display text-2xl font-semibold text-ink">Criar conta</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateField('role', 'CLIENT')}
            className={`rounded border-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              form.role === 'CLIENT' ? 'border-ink bg-ink text-paper' : 'border-line text-ink'
            }`}
          >
            Quero contratar
          </button>
          <button
            type="button"
            onClick={() => updateField('role', 'PROFESSIONAL')}
            className={`rounded border-2 px-3 py-2.5 text-sm font-medium transition-colors ${
              form.role === 'PROFESSIONAL' ? 'border-ink bg-ink text-paper' : 'border-line text-ink'
            }`}
          >
            Sou profissional
          </button>
        </div>
        <Input label="Nome completo" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
        <Input
          label="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          hint="Mínimo de 8 caracteres"
          value={form.password}
          onChange={(e) => updateField('password', e.target.value)}
          minLength={8}
          required
        />
        <Input label="Telefone (opcional)" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Cidade" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
          <Select label="Estado" value={form.state} onChange={(e) => updateField('state', e.target.value)}>
            <option value="">--</option>
            {BRAZIL_STATES.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </Select>
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <Button type="submit" isLoading={isSubmitting} className="mt-2">
          Criar conta
        </Button>
      </form>
      <p className="mt-6 text-sm text-ink/60">
        Já tem conta?{' '}
        <Link to="/login" className="font-medium text-ink underline underline-offset-2">
          Entrar
        </Link>
      </p>
    </div>
  );
}
