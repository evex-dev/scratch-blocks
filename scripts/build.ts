import { build, $ } from 'bun'

await $`rm -rf dist`

const built = await build({
  entrypoints: ['./src/index.ts'],
  sourcemap: 'inline',
  minify: true,
  banner: `// @ts-self-types="./types/index.d.ts"`
})

if (!built.success) {
  throw built.logs[0]
}

const code = await built.outputs[0].text()

await Bun.write('dist/index.js', code, { createPath: true })
await $`cp -R src/types dist/types`
