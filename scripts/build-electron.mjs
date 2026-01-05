import { build } from 'esbuild'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const outdir = path.join(root, 'dist-electron')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const dependencyNames = Object.keys(pkg.dependencies ?? {})

/** @type {import('esbuild').BuildOptions} */
const shared = {
  bundle: true,
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  target: 'node20',
  outdir,
  // Native deps (e.g. ssh2 -> *.node) must NOT be bundled by esbuild.
  // We keep them as runtime requires from node_modules.
  external: ['electron', ...dependencyNames]
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


