import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listCategories } from '@/api/categories.api';
import { searchProfessionals } from '@/api/professionals.api';
import { ProfessionalCard } from '@/components/features/ProfessionalCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export function SearchProfessionals() {
  useDocumentMeta({
    title: 'Buscar profissionais',
    description: 'Encontre técnicos e engenheiros verificados perto de você, por categoria e cidade.',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? '';
  const city = searchParams.get('city') ?? '';
  const [cityInput, setCityInput] = useState(city);

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: listCategories });
  const { data, isLoading } = useQuery({
    queryKey: ['professionals', { category, city }],
    queryFn: () => searchProfessionals({ category: category || undefined, city: city || undefined }),
  });

  function updateParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold text-ink">Buscar profissionais</h1>
      <form
        className="mt-6 flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          updateParams({ city: cityInput });
        }}
      >
        <div className="w-52">
          <Select label="Categoria" value={category} onChange={(e) => updateParams({ category: e.target.value })}>
            <option value="">Todas</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-52">
          <Input label="Cidade" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
        </div>
        <Button type="submit" variant="secondary">
          Filtrar
        </Button>
      </form>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-ink/50">Nenhum profissional encontrado com esses filtros ainda.</p>
        )}
      </div>
    </div>
  );
}
