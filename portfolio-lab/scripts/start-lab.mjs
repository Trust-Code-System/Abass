import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const apps = [['my-portfolio', 3000], ['references/dennis-recreation', 3001], ['references/rishi-portfolio', 3002]];
if (process.platform !== 'win32') {
  console.log('Open one terminal per app and run the following commands:');
  for (const [path, port] of apps) console.log(`cd '${join(root, path)}'\nnpm run dev -- --hostname 127.0.0.1 --port ${port}\n`);
} else {
  for (const [path, port] of apps) {
    const cwd = join(root, path);
    if (!existsSync(join(cwd, 'node_modules'))) throw new Error(`Install dependencies first: node scripts/install-lab.mjs (${path})`);
    const safePath = cwd.replaceAll("'", "''");
    const command = `$Host.UI.RawUI.WindowTitle = 'Portfolio ${port}'; Set-Location -LiteralPath '${safePath}'; $env:NEXT_TELEMETRY_DISABLED='1'; npm.cmd run dev -- --hostname 127.0.0.1 --port ${port}`;
    const child = spawn('powershell.exe', ['-NoExit', '-EncodedCommand', Buffer.from(command, 'utf16le').toString('base64')], { detached: true, stdio: 'ignore' });
    child.on('error', error => console.error(`Could not start port ${port}: ${error.message}`));
    child.unref();
  }
  console.log('Opened three PowerShell terminals. Wait for Ready in each terminal.');
  console.log('Then open Chrome: http://localhost:3000, http://localhost:3001, http://localhost:3002');
  console.log('Stop each server with Ctrl+C in its own terminal. Existing listeners are never killed.');
}
