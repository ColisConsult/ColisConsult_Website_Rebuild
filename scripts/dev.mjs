// Lance l'API (NestJS) et le site (Next.js) en parallèle : `npm run dev`
import { spawn } from 'node:child_process';

const apps = [
  { name: 'api', color: '\x1b[36m', args: ['run', 'start:dev', '--workspace', 'api'] },
  { name: 'web', color: '\x1b[35m', args: ['run', 'dev', '--workspace', 'web'] },
];
const reset = '\x1b[0m';
const children = [];

for (const app of apps) {
  const child = spawn('npm', app.args, { shell: process.platform === 'win32', env: process.env });
  const prefix = `${app.color}[${app.name}]${reset} `;
  const pipe = (stream, out) => {
    let buffer = '';
    stream.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? '';
      for (const line of lines) out.write(prefix + line + '\n');
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on('exit', (code) => {
    console.log(`${prefix}arrêté (code ${code})`);
    for (const c of children) if (c !== child) c.kill();
    process.exit(code ?? 0);
  });
  children.push(child);
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    for (const c of children) c.kill(signal);
  });
}
