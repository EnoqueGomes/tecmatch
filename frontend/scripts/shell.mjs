// Guarda uma cópia "genérica" do site (sem conteúdo de página) para as telas
// que não são pré-geradas: login, painel, admin, perfis, busca...
// A Vercel usa este arquivo como reserva (veja vercel.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, 'app-shell.html'));
console.log('app-shell.html criado');
