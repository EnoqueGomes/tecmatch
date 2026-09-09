export function formatCurrency(value?: string | number | null) {
  if (value === null || value === undefined) return null;
  const number = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(number)) return null;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}
