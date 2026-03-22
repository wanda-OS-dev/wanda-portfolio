import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const loaderPath = path.join(__dirname, 'loader.js');
fs.writeFileSync(loaderPath, `
export async function resolve(specifier, context, nextResolve) {
  if (specifier === 'next/server') {
    return {
      format: 'module',
      shortCircuit: true,
      url: 'data:text/javascript,export const NextRequest = class { constructor(i,init){this.url=i;this.method=init?.method||"GET";this.headers=init?.headers||new Map();this.body=init?.body;} async json(){return typeof this.body==="string"?JSON.parse(this.body):this.body;} }; export const NextResponse = class { static json(b,i){ return { json: async () => b, status:i?.status||200};} };',
    };
  }
  if (specifier === 'nodemailer') {
    return {
      format: 'module',
      shortCircuit: true,
      url: 'data:text/javascript,export function createTransport(){ return { sendMail: async () => { if (process.env.TEST_MOCK_NODEMAILER_ERROR === "1") throw new Error("Mock SMTP error"); return true; }}; }',
    };
  }
  return nextResolve(specifier, context);
}
export async function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
`);

function findTests(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory() && !file.startsWith('node_modules')) {
      findTests(filePath, fileList);
    } else if (file.endsWith('.test.ts') || file.endsWith('.spec.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const testFiles = findTests(path.join(rootDir, 'src'));

if (testFiles.length === 0) {
  console.log('No test files found.');
  process.exit(0);
}

// Run node --test with loader
const loaderUrl = url.pathToFileURL(loaderPath).href;
const importStr = `data:text/javascript,import { register } from 'node:module'; register('${loaderUrl}');`;
const nodeArgs = ['--experimental-strip-types', '--import', importStr, '--test', ...testFiles];
const child = spawn(process.execPath, nodeArgs, {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: '--experimental-strip-types' }
});

child.on('exit', (code) => {
  fs.unlinkSync(loaderPath);
  process.exit(code ?? 0);
});
