# Package Necessity Audit

Use this reference to decide whether a package is really necessary or whether modern runtime/platform features can replace it.

The goal is not aggressive deletion. The goal is to prove whether each dependency earns its cost in this project.

## Process

1. Identify the real requirement:
   - Which runtime is supported?
   - Is this app Node-only, browser-only, full-stack, SSR, CLI, library, or teaching exercise?
   - Is older Node/browser support required?
   - Is the package used in source, scripts, tests, config, generated files, or not at all?

2. Prove usage:
   - Search imports and requires.
   - Search package names in scripts and configs.
   - Check dynamic imports and framework conventions.
   - Check whether the dependency is only present because an AI or tutorial installed it.

3. Compare behavior:
   - Replace only when behavior stays equivalent for the project.
   - Prefer platform/runtime APIs for simple cases.
   - Keep packages that provide meaningful features: retries, validation, parsing, theming, adapters, framework integration, compatibility, transforms, plugins, or clearer maintainability.

4. Verify:
   - Remove or replace one category at a time.
   - Rerun typecheck, lint, build, tests, and a smoke test.
   - If verification fails, keep the package and document why.


## Version Freshness in Bootcamp Projects

In bootcamp submissions, dependencies are usually newly installed during the project. That means they should generally be on the latest stable major version.

Use `npm outdated` or the equivalent package-manager command to compare `Current`, `Wanted`, and `Latest`.

Interpretation:

- If `Current` and `Latest` have the same major version, this is usually fine.
- If `Current` is behind by patch or minor only, do not treat that as AI slop by itself.
- If `Current` is behind by one or more major versions, treat it as a modernization candidate and student question.
- If an old major is pinned intentionally, require a concrete reason: runtime compatibility, CommonJS/ESM compatibility, framework constraints, migration blocker, assignment requirement, or failed verification.
- If a dependency was installed during the project and is already several majors behind, this often indicates an old tutorial, copied starter, or generated answer.

Student questions:

- Why is this package installed on an older major version?
- Did you install this yourself, copy it from a tutorial, or inherit it from a starter?
- What changes in the latest major?
- Is this old major required by CommonJS/ESM compatibility?
- Can we update to the latest major and make the project pass typecheck, lint, build, and tests?

Example:

`chalk@4` in a modern ESM project is a strong question candidate because newer Chalk majors are ESM-oriented and old tutorials often pin v4 for CommonJS compatibility. That may be valid, but the student should be able to explain it.

## Common Candidates

Treat each as a question, not an automatic removal.

| Package pattern | Modern alternative for simple cases | Keep when |
| --- | --- | --- |
| `axios`, `node-fetch`, `cross-fetch`, `request`, basic `got`/`ky` usage | Native `fetch`, `Headers`, `Request`, `Response`, `FormData` | Interceptors, retries, progress hooks, custom agents/dispatchers, old runtime/browser support, shared client behavior |
| `uuid` | `crypto.randomUUID()` for UUID v4 | Need v1/v3/v5/v7, namespace UUIDs, parsing, validation helpers, old runtime support |
| `dotenv`, `dotenv-flow` | `node --env-file`, `node --env-file-if-exists`, `process.loadEnvFile()` | Need variable expansion, layered env files, encrypted vaults, framework env loading, old Node support |
| `chalk`, `kleur`, `colorette`, `picocolors`, `ansi-colors` | `util.styleText()` for simple styling | Need themes, template/tag APIs, library support, older runtimes, complex terminal output |
| `commander`, `yargs`, `minimist`, `arg` | `util.parseArgs()` for simple CLIs | Need subcommands, generated help, shell completion, validation, config/env integration |
| `nodemon`, `ts-node-dev` | `node --watch` | Need custom watch graphs, non-Node commands, exec maps, special signal behavior |
| `ts-node`, `tsx`, `jiti`, `esbuild-register` | Native Node TypeScript type stripping for erasable `.ts` files | Need TSX, decorators, enums, parameter properties, path aliases, custom loaders, transforms, typechecking during execution, old Node support |
| `jest`, `mocha`, `sinon` for tiny libraries | `node:test`, `node:assert`, built-in mocks | Need jsdom, snapshots, fake timers beyond built-ins, transforms, existing test ecosystem |
| `rimraf`, `mkdirp`, `cpy`, `ncp`, simple `glob` usage | `fs.rm`, `fs.mkdir({ recursive: true })`, `fs.cp`, `fsPromises.glob` | Need advanced glob semantics, CLI portability, old Node support |
| `ws` as a client only | Native `WebSocket` | Need WebSocket server support, advanced Node APIs, old Node support |
| `lodash`, `underscore`, tiny utility packages | Native Array/Object methods, `structuredClone`, `Object.groupBy` where supported | Heavy existing use, exact deep utility semantics, performance-tested hot paths, compatibility |
| `moment`, simple date formatting packages | `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` | Date math, parsing, time zones, durations, locale plugins, complex calendars |
| `clsx`, `classnames` | Template literals or arrays with `filter(Boolean).join(" ")` for tiny cases | Many conditional classes, shared component libraries, component variants, readability |
| `tailwind-merge` | No dependency when classes are static or conflicts cannot occur | Dynamic Tailwind class composition with predictable conflict resolution |
| `yup`, `joi`, `valibot` | No compile-time replacement for untrusted input | Runtime validation at network, file, form, CLI, API, and database boundaries |
| `zod` | Course-recommended default: keep when used for runtime validation and inferred TypeScript types | Question only when unused, duplicated by another validation library, or used incorrectly |

## Questions to Ask per Dependency

- Where is it imported or executed?
- What breaks if it is removed?
- Is it solving a real project problem or only decorating output?
- Does the runtime already provide this feature?
- Is the package needed for browser compatibility?
- Is it needed for framework integration?
- Is it needed only because another old package or old script requires it?
- Can the student explain why this package was chosen?
- Can the student replace it with a built-in API in a small live task?

## Special Cases

### `chalk@4`

`chalk@4` often appears when code uses CommonJS `require("chalk")`. In modern ESM projects, this may indicate an old tutorial or generated compatibility workaround.

Ask:

- Why version 4 instead of current Chalk?
- Is the project CommonJS or ESM?
- Is terminal styling needed at all?
- Could simple styling use `util.styleText()`?

### `dotenv`

Do not remove blindly. Ask:

- Is the project using native Node env-file loading already?
- Does it need env expansion or multiple layered files?
- Is the deployment platform injecting environment variables?
- Is `dotenv.config()` imported in exactly one place?

### `tsx` / `ts-node`

Do not remove blindly. Ask:

- Does the project use erasable TypeScript only?
- Does it use TSX, decorators, enums, parameter properties, path aliases, or custom loaders?
- Does direct `node ./file.ts` work in the supported runtime?
- Does `tsc --noEmit` still typecheck the project?

### `zod`

In this course context, `zod` is expected and should usually be kept. It is useful because it provides runtime validation and can infer TypeScript types from schemas.

Do not mark `zod` as AI slop merely because TypeScript types exist. TypeScript does not validate runtime input.

Ask only when needed:

- Where is the schema used at the runtime boundary?
- Which type is inferred from this schema?
- Is the schema duplicated with a manual TypeScript type?
- Is the project using multiple validation libraries for the same job?
- Is the schema validating actual untrusted input, or is it dead/unused?

### `clsx` / `classnames`

In small exercises, these may be unnecessary. In real React component libraries, they can be justified.

Ask:

- Are there many conditional classes?
- Would an array join be clearer?
- Is this used in reusable components or only once?

## Output Format

For each package, produce:

```md
### package-name

- Current usage:
- Finding:
- Installed version:
- Latest version:
- Major-version status:
- Suggested action:
- Built-in/platform candidate:
- Keep condition:
- Student question:
- Verification needed:
```
