import { execFileSync } from 'node:child_process';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const installEnv = { ...process.env, npm_config_cache: process.env.npm_config_cache || join(root, '.npm-cache'), npm_config_store_dir: process.env.npm_config_store_dir || join(root, '.pnpm-store') };
const run = (command, args, cwd, env = installEnv) => {
  if (process.platform === 'win32') {
    // All command arguments below are fixed literals; working directories are passed separately.
    execFileSync('cmd.exe', ['/d', '/s', '/c', `${command}.cmd ${args.join(' ')}`], { cwd, stdio: 'inherit', env });
  } else execFileSync(command, args, { cwd, stdio: 'inherit', env });
};
run('npm', ['ci', '--no-audit', '--no-fund'], join(root, 'my-portfolio'));
execFileSync(process.execPath, [join(root, 'scripts', 'setup-references.mjs')], { cwd: root, stdio: 'inherit' });
run('npm', ['ci', '--no-audit', '--no-fund'], join(root, 'references', 'rishi-portfolio'));
run('npx', ['--yes', 'pnpm@8.15.9', 'install', '--frozen-lockfile'], join(root, 'references', 'dennis-recreation'), { ...installEnv, HUSKY: '0' });
console.log('All three applications installed. Windows: node scripts/start-lab.mjs');
