# Dependencies, scripts and TypeScript

How to judge each package, script and `tsconfig` option against Node 26 and TypeScript 7. Every built-in below is stable in Node 26. When the project pins an older Node, check the API's history in the Node docs before suggesting it.

## e18e

`@e18e/cli` checks the dependency tree against the [module-replacements](https://github.com/e18e/module-replacements) data and reports native, preferred and micro-utility replacements, duplicate versions and install size. It only reads.

```sh
npx --yes @e18e/cli analyze                         # human-readable report
npx --yes @e18e/cli analyze --json                  # {stats, messages}, for parsing
npx --yes @e18e/cli analyze --categories native     # only built-in replacements
```

- Exit code 1 means it found at least one suggestion, not that it broke. `--log-level warn` or `error` raises that threshold.
- It needs an npm, pnpm, yarn or bun lockfile in the folder it analyzes; with only another lockfile it stops with `No lockfile found`. Its `publint` check fails on a private package without a `version`; the rest of the report still counts.
- `--categories` filters only the replacement suggestions; duplicates and size warnings still print.
- Each replacement suggestion is a lead for step 3: confirm the package is used the way the replacement covers.
- Duplicate versions of a transitive package are one low-ranked finding (`<pm> dedupe` or updating the parents), not one row per package.
- `npx --yes @e18e/cli migrate <package> --dry-run` shows the codemod a fix would apply, without writing. It only touches `**/*.{ts,js}` unless `--include` says otherwise, so `.tsx`, `.vue` and `.svelte` files need a manual pass. Run it without `--dry-run`, or with `--interactive` or `--all`, only during Apply.

## Versions

`<pm> outdated` lists `Current`, `Wanted` and `Latest`.

- Same major as latest: fine, except for `0.x` packages, where a new minor (`0.2` to `0.3`) is a breaking release.
- One or more majors behind: an `update` finding. Read the changelog for the breaking changes that touch this project's usage, and name them.
- An old major held on purpose needs a stated reason in the code or README: a CommonJS consumer (`chalk@4`, `node-fetch@2` and `nanoid@3` are the common ones), a framework peer range, or a runtime floor. Without one, the pin is a finding.
- `<pm> audit`: report advisories in packages the app ships or runs at build time, with the fixed version. Advisories in dev-only tooling that never sees untrusted input rank low.

## Replacements

Each row is a candidate. Confirm the project's usage stays within the built-in's behavior.

| Package | Built-in | Keep the package when |
| --- | --- | --- |
| `axios`, `node-fetch`, `cross-fetch`, `isomorphic-fetch`, `request`, simple `got` / `ky` | global `fetch`, `Headers`, `Request`, `Response`, `FormData` | interceptors, retries, upload progress, custom agents, a shared client used widely, callers that rely on a rejected promise for HTTP errors (`fetch` resolves on a 404; check `response.ok`) |
| `uuid` | `crypto.randomUUID()`; `randomUUIDv7()` from `node:crypto` on Node 26.1 and later (not on `globalThis.crypto`) | v1, v5 or namespace UUIDs, parsing, validation, v7 in browser code or on a floor below 26.1 |
| `dotenv` | `node --env-file=.env`, `--env-file-if-exists`, `process.loadEnvFile()` | variable expansion (`dotenv-expand`), layered env files, a framework that loads `.env` itself. `--env-file` exits when the file is missing; use `--env-file-if-exists` for an optional file |
| `chalk`, `kleur`, `colorette`, `picocolors` | `util.styleText()` (respects `NO_COLOR` and TTY, hex colors from 26.1) | a library that must run on older Node, chained styling used heavily |
| `commander`, `yargs`, `minimist`, `arg` | `util.parseArgs()` | subcommands, generated help, completions |
| `nodemon`, `ts-node-dev` | `node --watch` | watching non-Node commands, custom restart logic |
| `ts-node`, `tsx`, `esbuild-register`, `jiti` | `node file.ts` | the syntax in [Type stripping](#type-stripping); `ts-node` cannot run on TypeScript 7 at all |
| `jest`, `mocha`, `sinon` in a small Node package | `node --test`, `node:assert`, `mock` from `node:test` | DOM tests, existing snapshot files or custom serializers (`t.assert.snapshot()` covers basic snapshots), module mocking (`mock.module()` is still experimental), an established suite |
| `rimraf`, `mkdirp`, `cpy`, `ncp`, simple `glob` / `fast-glob` | `fs.rm({ recursive, force })`, `fs.mkdir({ recursive })`, `fs.cp`, `fs.glob` | glob features `fs.glob` lacks |
| `ws` as a client only | global `WebSocket` | a WebSocket server |
| `lodash`, `underscore`, one-function packages | `structuredClone`, `Object.groupBy`, `Array.prototype.at` / `findLast` / `toSorted` | many call sites relying on exact lodash semantics (`merge`, `debounce`) |
| `moment`, simple `date-fns` / `dayjs` formatting | `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Temporal` | time zone math in browsers that lack `Temporal` |
| `body-parser` | `express.json()`, `express.urlencoded()` | none for these two parsers |
| `clsx`, `classnames` | template literal or `[...].filter(Boolean).join(" ")` | many conditional classes or shared components |
| `tailwind-merge` | nothing, when classes never conflict | components that accept a `className` override |
| `@typescript/native-preview` (`tsgo`) | `typescript` 7 (`tsc`) | nothing; the preview is frozen |

Browser code follows the browser target instead of Node: check the API's Baseline status on MDN against the project's `browserslist` or build target.

### Validation stays

`zod`, `valibot`, `yup` and `joi` validate input at runtime, which types cannot. Keep them where untrusted data enters (requests, forms, files, env, external APIs). A finding is two libraries doing the same job, a schema that nothing calls, or a hand-written type that duplicates a schema's inferred type.

## TypeScript 7

`typescript@7` is the native compiler; its binary is still `tsc`. It errors on options TypeScript 6 deprecated, and `"ignoreDeprecations"` no longer silences them:

| In `tsconfig` | Change |
| --- | --- |
| `baseUrl` | remove it; write `paths` relative to the tsconfig (`"@/*": ["./src/*"]`) |
| `moduleResolution`: `node`, `node10` or `classic` | `bundler` for Vite, Next.js and other bundlers; `nodenext` for code Node runs |
| `target`: `es3` or `es5` | `es2025` (the default) |
| `module`: `amd`, `umd`, `system` or `none` | `esnext`, `preserve` or `nodenext` |
| `outFile`, `out` | a bundler |
| `downlevelIteration` | remove it |
| `esModuleInterop`, `allowSyntheticDefaultImports` or `alwaysStrict` set to `false` | remove them; they are always on |
| `importsNotUsedAsValues`, `preserveValueImports` | `verbatimModuleSyntax: true` |
| `suppressImplicitAnyIndexErrors`, `keyofStringsOnly`, `charset`, `noImplicitUseStrict`, `noStrictGenericChecks`, `suppressExcessPropertyErrors` | remove them and fix what they hid |

Source changes it enforces: `module Foo {}` becomes `namespace Foo {}`, `import ... assert {}` becomes `with {}`, and `/// <reference no-default-lib="true"/>` is ignored.

New defaults to make explicit when the project relied on the old ones: `strict` is on, `types` is `[]` (add `["node"]` or the test runner's types), and `rootDir` is the tsconfig's folder (set `"./src"` when sources live there).

TypeScript 7.0 does not ship the legacy JS compiler API (`createProgram`, the language service); its new API is experimental. Tools built on the legacy API stay on TypeScript 6: `typescript-eslint` (peer `<6.1`), `ts-node`, and `vue-tsc`. Check each installed tool's `typescript` peer range rather than assuming: `ts-morph` bundles its own TypeScript and is unaffected, and `svelte-check` has a `--tsgo` mode that takes TypeScript 7 installed as `@typescript/native`. Keep a legacy tool working through the alias `"typescript": "npm:@typescript/typescript6@^6"` (binary `tsc6`) with TypeScript 7 under a second name for type checks. Each such tool is a finding: a TypeScript 7 blocker, with oxlint or Node type stripping as the replacement where one exists.

For a Node 26 project, `@tsconfig/node26` is the base: `target` `es2025`, `lib` `["es2025", "esnext.collection", "esnext.temporal"]`, `module` `nodenext`, `types` `["node"]`.

### Type stripping

Node 26 runs `.ts` files directly by stripping types; it never typechecks, so `tsc --noEmit` stays. It fails on:

- enums, runtime namespaces, parameter properties and `import x = require()` (`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`)
- decorators, `.tsx` files, and `tsconfig` `paths` (use `#` subpath imports in `package.json` instead)
- type-only imports written without `type`
- `.ts` files inside `node_modules`

`--experimental-transform-types` is gone in Node 26. A project with that syntax keeps `tsx` or a build step, or moves to erasable syntax. The `tsconfig` for code Node runs directly:

```json
{
  "extends": "@tsconfig/node26/tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true
  }
}
```

A project that emits JavaScript swaps `noEmit` and `allowImportingTsExtensions` for `outDir` and `rewriteRelativeImportExtensions: true`. Bundled frontend code (Vite, Next.js) compiles TypeScript itself; it only needs the [TypeScript 7](#typescript-7) changes.

## Scripts

| In a script | On Node 26 | Keep when |
| --- | --- | --- |
| `nodemon src/index.js` | `node --watch src/index.js` | non-Node commands, custom restart rules |
| `ts-node src/index.ts`, `tsx src/index.ts` | `node src/index.ts` | the syntax in [Type stripping](#type-stripping) |
| `node -r dotenv/config ...` | `node --env-file=.env ...`, or `--env-file-if-exists=.env` when the file is optional (CI, production) | variable expansion |
| `tsgo` | `tsc` from `typescript` 7 | never |
| `./node_modules/.bin/vite` | `vite` | never; scripts already resolve local binaries |
| `rimraf dist` | the bundler's `emptyOutDir`, or `node -e "fs.rmSync('dist',{recursive:true,force:true})"` | Windows shells that break the `node -e` quoting |
| `cross-env NODE_ENV=production ...` | the framework's mode flag (`vite build --mode production`) | code or tools that read `NODE_ENV`, which a mode flag does not set; scripts that must set env vars on Windows |
| `babel-node`, a `.babelrc` beside Vite | nothing | a Babel plugin Vite or the framework does not cover |

Config to compare as well: a webpack config nothing calls, compiled `.js` committed next to its `.ts` source, and `"module": "commonjs"` in a package that could be `"type": "module"`.
