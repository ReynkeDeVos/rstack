---
name: modernize-web-project
description: Modernizes a JavaScript or TypeScript web project by auditing its dependencies, scripts, TypeScript setup, code and UI against the current Node LTS and the latest TypeScript release, then proposing evidence-backed changes. Use when asked to modernize, upgrade or clean up a web project, find packages a built-in Node or browser API replaces, prepare a project for a new TypeScript major, spot outdated tutorial or template patterns, or lint a project that has no linter.
---

# Modernize a web project

Find what the project no longer needs and what its runtime now does for free, prove each finding, and hand the user a ranked list of changes. Every finding is a **candidate**: it carries its evidence, the condition under which the current code should stay, and the check that proves the change safe.

**Target**: the active Node LTS and the latest stable TypeScript, looked up in step 1, unless the project pins an older floor in `engines.node`, `.nvmrc`, `.node-version`, `mise.toml`, the CI matrix or its deploy target. A pinned older floor wins; name it in the report and judge replacements against it.

The default is a report. Edit files only when the user asks for the changes; then follow [Apply](#apply).

## Ground rules

- **Audit copy.** Builds, tests, `tsc`, installs and migration tools write files (`dist/`, `*.tsbuildinfo`, `node_modules`, generated configs), often in places `git status` does not show. Run every command from step 2 on in a disposable copy, made like this:

  ```sh
  A="$(mktemp -d)/project" && cp -a --reflink=auto . "$A"
  find "$A" -name node_modules -prune -exec rm -rf {} +        # installs link back into the original
  [ -f "$A/.git" ] && rm "$A/.git"                             # a worktree's .git file points at the original repo
  find "$A" -type l -exec sh -c 'for l; do case "$(realpath -m "$l")" in "$1"/*) ;; *) echo "$l";; esac; done' _ "$A" {} +
  (cd "$A" && <pm> install --frozen-lockfile)
  ```

  The `find` before the install lists symlinks whose target lies outside the copy; a build writes through them into the original. Replace each with a real copy of its target inside `$A`, or skip the checks that write through it. Run that check before the install, because afterwards the package manager's links into its shared store are expected. Read and search the original freely; it must end exactly as it started.
- Temporary tools live in their own `mktemp -d` folder, outside both the project and the copy.
- Use the package manager the lockfile names, through the project's own scripts where they exist.
- Keep packages that guard a boundary: runtime validation (`zod`, `valibot`, `yup`, `joi`), auth, crypto, sanitizing, parsing, database and upload handling. Types do not validate input.
- Recommend updates, never downgrades.
- A check that cannot run is reported as skipped with the reason. Set up nothing permanent to make it run.

## Steps

### 1. Baseline

Look up the target versions. Offline, use the versions the references were written against (Node 26 LTS, TypeScript 7.0) and say so in the report.

```sh
node -e "fetch('https://nodejs.org/dist/index.json').then(r=>r.json()).then(d=>console.log(d.find(r=>r.lts).version))"
npm view typescript version
```

When a target is newer than Node 26 or TypeScript 7.0, read the release notes in between (Node's notable changes, TypeScript's breaking changes) and use what they add or remove the way you use the reference tables.

Read `README`, `package.json`, every `tsconfig*`, framework and bundler config, CI workflows and deployment config. Take the package manager from the lockfile's file name or the `packageManager` field; the lockfile itself needs no reading. Record the target versions, the runtime floor and where it comes from, the package manager, framework and TypeScript versions, the module type (`"type"`, `.cjs` / `.mjs`), which linter the project uses (ESLint, oxlint, Biome or none), whether it is a workspace with several packages, and the original's `git status --short`.

Done when the target Node and TypeScript versions are known, and the runtime floor is a concrete version with its source named, or the target Node LTS by default.

### 2. Checks

In the audit copy, run whichever exist:

1. The project's `typecheck`, `lint`, `build` and `test` scripts.
2. `<pm> outdated` and `<pm> audit`.
3. `npx --yes @e18e/cli analyze --json > e18e.json 2> e18e.err` for dependency replacements, duplicates and install size. Read stdout and stderr separately: exit 1 with messages in the JSON is a result, while an error in stderr (no recognized lockfile, a failed `publint` on a private package without `version`) makes the run partial or skipped. Record which.
4. The target TypeScript (`<ts>`, the version from step 1), for every `tsconfig*.json` except files used only as an `extends` base, and except configs an existing check already compiles with that version:
   - A config with `references` builds its graph: `npx --yes -p typescript@<ts> tsc -b <config>` (the copy absorbs the emitted files). Checking one referenced project with `-p` alone reports `TS6305` for declarations that were never built; that is not a finding.
   - Any other config: `npx --yes -p typescript@<ts> tsc --noEmit -p <config>`.
   - When a config fails, run the same command with the project's own TypeScript (`<pm> exec tsc ...` in the copy); a project without a `typescript` dependency has no baseline, so say so. An error the project's TypeScript reports identically is baseline. An error only the target TypeScript reports, or one about an option or value listed in [TypeScript 7](references/dependencies.md#typescript-7) or in the release notes from step 1, is a TypeScript upgrade finding.

Done when each check has a recorded result: passed, failed (with the first error), partial, or skipped (with the reason). A failure that exists before any change is baseline, not a reason for a finding, apart from the TypeScript upgrade findings check 4 separates out.

### 3. Dependencies

Read [references/dependencies.md](references/dependencies.md). Give every package in `dependencies` and `devDependencies` one verdict, with its evidence:

| Verdict | Evidence that earns it |
| --- | --- |
| keep | Imported or run, and its job has no adequate built-in at the runtime floor |
| remove | No import, script, config or framework convention uses it (`rg` the name and its sub-paths) |
| replace | A built-in covers the project's actual usage; name the API and the keep condition |
| update | A newer major, or a newer minor of a `0.x` package, with the breaking changes that matter here |
| consolidate | Two packages do one job (two HTTP clients, two date libraries, two validators) |

Done when every listed package has a verdict and its evidence. A package that only looks unnecessary keeps `keep` until a search proves otherwise.

### 4. Scripts and config

Compare each `package.json` script and tool config with what the target Node, the target TypeScript and the framework provide, using [Scripts](references/dependencies.md#scripts) and [TypeScript 7](references/dependencies.md#typescript-7). Look for watchers and loaders Node replaces, `dotenv` preloads, hard-coded `node_modules/.bin` paths, Babel or webpack config beside Vite, `tsconfig` options the target TypeScript removed, committed build output beside its source, and CommonJS in a project that could be ESM.

Done when every script and config file is either fine or a finding.

### 5. Code

Lint the audit copy with oxlint from a temporary toolbox, whatever linter the project has. The bundled script reads the package's dependencies and turns on every oxlint plugin and setting that fits: React and `jsx-a11y` for JSX, Next.js, Vue, Node, Vitest or Jest, type-aware rules for TypeScript, Tailwind v4 canonical classes, plus a set of modern-syntax rules.

```sh
T="$(mktemp -d)"
cd "$A"
node <skill-dir>/scripts/oxlint-setup.mjs . "$T"   # prints the plugins it chose, and notes
(cd "$T" && <pm> install)
"$T/node_modules/.bin/oxlint" -c "$T/oxlintrc.json" --ignore-pattern '**/*.gen.*'
```

- Act on every line in the script's `notes`. In a workspace, lint the root with one `--ignore-pattern` per entry in `rootIgnorePatterns`, then run the setup and oxlint in each child package folder with a fresh toolbox, so every file is linted once under its own package's settings. When Tailwind's entry CSS was not found or is the wrong one, pass it as the third argument and rerun the setup before installing.
- Add `--ignore-pattern` for generated or vendored folders `.gitignore` does not cover; patterns inside the external config cannot match project files.
- A project that uses ESLint also runs its own `lint` script. When that setup includes `typescript-eslint`, compare its `typescript` peer range with the target (in November 2026 it ended below 6.1, which blocks TypeScript 7); `npx --yes @oxlint/migrate`, run in the audit copy, drafts an equivalent `.oxlintrc.json` as the candidate change.
- A `tsconfig-error` in the output means oxlint could not use that config, so type-aware rules said nothing for its files. Report the type-aware check as partial, naming those configs, and keep the diagnostics from the others.
- oxlint reads only the `<script>` parts of `.vue`, `.svelte` and `.astro` files; their templates get the manual pass in step 6.

Then read for what a linter misses: helpers used once behind a generic name, abstractions with one implementation, dead files and branches, error handling that never reaches the user or the API response, comments that restate the code, and README claims the code does not back.

Done when oxlint ran for every package (or was skipped with a reason), every rule that fired is grouped into findings or marked keep with a reason, and each finding names a file and line.

### 6. UI

Only for projects with a frontend. Read [references/frontend.md](references/frontend.md) and review interaction semantics, Tailwind classes and template-default styling.

Done when every interactive element uses the native element its interaction calls for (`button`, `a href`, `details` / `summary`, form controls) or has a finding, composite widgets such as tabs have been checked for their roles and keyboard behavior, and the canonical-class results from step 5 plus the manual search are reported.

### 7. Report

Answer in chat unless the user asked for a file. Lead with up to three changes that pay off most; when nothing earns a place, say so. Then:

```md
## Baseline
Targets: Node 26.13 LTS, TypeScript 7.0 · Runtime floor: Node 26 (default) · pnpm 10 · Vite 8, React 19, Tailwind 4 · TypeScript 6.0 · ESM · no linter

## Checks
| Check | Result |
| --- | --- |

## Findings
| # | Area | Where | Finding | Change | Keep if | Verify with | Effort |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Probably fine
## Not checked
```

Rank findings by payoff against risk: TypeScript upgrade blockers, unused packages and broken patterns first, style last. Group lint hits by rule with a count and two or three locations rather than one row each. Write each finding as a fact plus a suggestion ("`node-fetch` is imported only in `src/api.ts:3`; Node 26 has global `fetch`"), and separate what you observed from what you judge.

## Apply

When the user asks for the changes:

1. Work one category at a time (one package, one script family, one rule), smallest diff first.
2. For a package e18e can migrate, preview with `npx --yes @e18e/cli migrate <package> --dry-run` and read the diff before running it without `--dry-run`.
3. After each category, rerun the checks from step 2 that cover it and smoke-test the affected path. If a check that passed before now fails, revert that category and record why the package or pattern stays.
4. Adding oxlint to the project for good is its own change: save the toolbox's `oxlintrc.json` as `.oxlintrc.json`, make the Tailwind `entryPoint` relative to the project, move `--ignore-pattern` values into `ignorePatterns`, and add the toolbox's `devDependencies` (`oxlint`, plus `oxlint-tsgolint` and `eslint-plugin-better-tailwindcss` when the config uses them) to the project.
5. Report what changed, what each check showed, and what you left alone.

For a deeper design critique of the UI, hand off to the `impeccable` skill rather than redesigning here.
