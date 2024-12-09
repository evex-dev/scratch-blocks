import { Glob, $ } from 'bun'
import path from 'node:path'
import * as fs from 'node:fs/promises'

await $`rm -rf tmp && mkdir tmp`
await $`cp -R core tmp/core`
await $`cp -R msg tmp/msg`
await $`cp -R blocks_common tmp/blocks_common`
await $`cp -R blocks_vertical tmp/blocks_vertical`

const REQUIRE_REGEX = /(?<=goog\.require\(['"]).+?(?=['"]\))/g
const PROVIDE_REGEX = /(?<=goog\.provide\(['"]).+?(?=['"]\))/g

// key: id, value: file paths
const provideFiles = new Map<string, string[]>()
const fileData = new Map<string, {
  requires: string[]
  provides: string[]
  code: string
}>()
const allProvides: string[] = []

for await (const entry of new Glob('./tmp/**/*.js').scan()) {
  const code = await Bun.file(entry).text()
  const requires = code.match(REQUIRE_REGEX) ?? []
  const provides = code.match(PROVIDE_REGEX) ?? []

  for (const provide of provides) {
    !provideFiles.has(provide) && provideFiles.set(provide, [])
    provideFiles.get(provide)?.push(entry)
    allProvides.push(provide)
  }
  fileData.set(entry, {
    requires,
    provides,
    code
  })
}

for (const [filePath, { requires, code, provides }] of fileData) {
  let outputCode = `import { Blockly, goog } from '${path.relative(path.dirname(filePath), './src/global-patches.ts').replaceAll('\\', '/')}'\n\n` + code
  for (const required of requires) {
    const pathsToImport = (provideFiles.get(required) ?? []).map(i => `import "./${path.relative(path.dirname(filePath), i).replaceAll('\\', '/')}"`).join('\n')
    outputCode = outputCode.replace(`goog.require('${required}');`, pathsToImport)
  }
  for (const provided of provides) {
    outputCode = outputCode.replace(`goog.provide('${provided}');`, '')
  }
  await Bun.write(filePath, outputCode)
}

type DefaultBlocklyJSON = {
  [name: string]: DefaultBlocklyJSON
}
const defaultBlocklyJSON: DefaultBlocklyJSON = {}
for (const provided of allProvides) {
  let crr: DefaultBlocklyJSON = defaultBlocklyJSON
  const seqs = provided.split('.')
  for (const seq of seqs) {
    crr[seq] ??= {}
    crr = crr[seq]
  }
}
await Bun.write('./src/default-blockly.js', `// auto-generated\n\nexport default ${JSON.stringify(defaultBlocklyJSON.Blockly, null, 2)}\n`)
