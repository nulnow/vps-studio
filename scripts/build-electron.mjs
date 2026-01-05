import { build } from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const outdir = path.join(root, 'dist-electron')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

/** @type {import('esbuild').BuildOptions} */
const shared = {
  bundle: true,
  platform: 'node',
  format: 'cjs',
  sourcemap: false, // Отключаем sourcemap для production
  target: 'node20',
  outdir,
  minify: true, // Минификация для уменьшения размера
  // Бандлим все зависимости, кроме нативных модулей и electron
  // Нативные модули (ssh2) должны оставаться в node_modules
  external: ['electron', 'ssh2']
}

await build({
  ...shared,
  entryPoints: [path.join(root, 'src/main/main.ts')],
  outExtension: { '.js': '.cjs' }
})

await build({
  ...shared,
  entryPoints: [path.join(root, 'src/preload/preload.ts')],
  outExtension: { '.js': '.cjs' }
})


