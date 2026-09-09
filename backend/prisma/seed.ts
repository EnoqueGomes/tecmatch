import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: 'Elétrica', slug: 'eletrica' },
  { name: 'Hidráulica', slug: 'hidraulica' },
  { name: 'Civil e Construção', slug: 'civil-construcao' },
  { name: 'Mecânica', slug: 'mecanica' },
  { name: 'Refrigeração e Climatização', slug: 'refrigeracao-climatizacao' },
  { name: 'Automação Industrial', slug: 'automacao-industrial' },
  { name: 'TI e Redes', slug: 'ti-redes' },
  { name: 'Topografia', slug: 'topografia' },
  { name: 'Segurança do Trabalho', slug: 'seguranca-trabalho' },
  { name: 'Projetos Estruturais', slug: 'projetos-estruturais' },
  { name: 'Manutenção Industrial', slug: 'manutencao-industrial' },
];

async function main() {
  console.log('Populando categorias...');
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }
  console.log(`${CATEGORIES.length} categorias prontas.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
