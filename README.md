# Evex Scratch-Blocks

[![JSR](https://jsr.io/badges/@evex/scratch-blocks)](https://jsr.io/@evex/scratch-blocks)

Scratch Blocks is a library for building creative computing interfaces.


![An image of Scratch Blocks running on a tablet](https://cloud.githubusercontent.com/assets/747641/15227351/c37c09da-1854-11e6-8dc7-9a298f2b1f01.jpg)

## What is this

[scratch-blocks](https://github.com/scratchfoundation/scratch-blocks) is a library to create visual programming environment. It's used in block editor on [Scratch](https://scratch.mit.edu). It's also fork of [Blockly](https://developers.google.com/blockly).

However, Scratch Team forked Blockly in 2016[^when_fork]. Currently, there are ESM and most of developers use it. ESM is released 2015, so Blockly which was in 2016 hadn't used ESM, used Google Closure Library. After that, Blockly migrated to ESM, but Scratch Team didn't migrate to ESM.
Google Closure Library is a very old architecture. It changes global namespace. And it's difficult to use it with Vite. So we needed to get Scratch Blocks which uses ESM, but Scratch Team is conservative and we think Scratch Team won't migrate and accept PR.

Then we forked Scratch Blocks. It is patched to migrate to ESM. Scratch Blocks can't work with Vite, in contrast it works with Vite!

[^when_fork]: https://github.com/scratchfoundation/scratch-blocks/commit/b66a514a196ffc9be45bc346e3812d3fe8239c8f

## Usage

The package is published in [JSR](https://jsr.io/@evex/scratch-blocks). You can install this with npm, yarn, pnpm, Deno, Bun, and others.
```shell
npx jsr add @evex/scratch-blocks # npm
yarn dlx jsr add @evex/scratch-blocks # yarn
pnpm dlx jsr add @evex/scratch-blocks # pnpm
deno add jsr:@evex/scratch-blocks # Deno
bunx jsr add @evex/scratch-blocks # Bun
```
Or, you can directly use in browser with [esm.sh](https://esm.sh): `https://esm.sh/jsr/@evex/scratch-blocks`.

To import API,
```ts
import Blockly from '@evex/scratch-blocks'

// Or, with esm.sh
import Blockly from 'https://esm.sh/jsr/@evex/scratch-blocks'
```
