import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, copyFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const refs = [
  { path: 'dennis-recreation', url: 'https://github.com/AliBagheri2079/dennis-snellenberg-portfolio.git', commit: '6ece2301f32d955f98657f34c3b41e4660c3435c' },
  { path: 'rishi-portfolio', url: 'https://github.com/rishilahoti/portfolio_new.git', commit: '85b778cefd3cf76d5c9fc4bc46c8d86adde38b87' },
];
const git = (args, cwd) => execFileSync('git', args, { cwd, stdio: 'inherit' });
mkdirSync(join(root, 'references'), { recursive: true });
for (const ref of refs) {
  const dest = join(root, 'references', ref.path);
  if (!existsSync(dest)) { git(['clone', ref.url, dest], root); git(['checkout', '--detach', ref.commit], dest); }
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: dest, encoding: 'utf8' }).trim();
  if (commit !== ref.commit) throw new Error(`${dest}: different revision found. Existing files were preserved. Use a separate empty lab folder.`);
  console.log(`Verified ${ref.path} at ${commit}`);
}
const dennis = join(root, 'references', 'dennis-recreation');
const patch = join(root, 'research', 'dennis-local-media.patch');
const forward = spawnSync('git', ['apply', '--check', patch], { cwd: dennis, stdio: 'pipe' });
if (forward.status === 0) git(['apply', patch], dennis);
else if (spawnSync('git', ['apply', '--reverse', '--check', patch], { cwd: dennis, stdio: 'pipe' }).status !== 0) throw new Error('Dennis media patch conflicts with existing work. No reset was performed.');
const dest = join(dennis, 'public', 'local-media');
mkdirSync(dest, { recursive: true });
const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
for (const name of readdirSync(join(root, 'research', 'reference-media'))) {
  const from = join(root, 'research', 'reference-media', name), to = join(dest, name);
  if (existsSync(to) && hash(from) !== hash(to)) throw new Error(`Preserving changed media: ${to}`);
  if (!existsSync(to)) copyFileSync(from, to);
}
console.log('References prepared with local Dennis media. No Cloudinary account is needed.');
