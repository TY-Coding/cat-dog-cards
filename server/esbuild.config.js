require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  tsconfig: 'tsconfig.json',
  outdir: './lib/'
}).catch(() => process.exit(1));