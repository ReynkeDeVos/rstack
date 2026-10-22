---
name: ai-slop-code-review
description: Audit student codebases for AI-slop and outdated-template signals. Use when the user wants to review a submitted repo, check whether packages are really necessary, identify generated/old-tutorial patterns, suggest modern runtime/platform replacements, and create targeted questions for a student code review without accusing the student of AI use.
---

# AI Slop Code Review

## Purpose

Review a codebase for signs of generated, copied, outdated, or poorly understood code. The goal is not to prove AI usage. The goal is to:

- Check whether every dependency, script, config file, and abstraction is justified.
- Prefer modern runtime/platform features when they fit.
- Find outdated tutorial patterns and generated boilerplate.
- Create precise questions that test whether the student understands the submitted code.
- Produce an instructor-friendly Markdown review report next to the reviewed project folder, one directory above the project root.

Never present findings as proof that code was AI-generated. Present them as review signals, modernization candidates, and student discussion prompts.

## Workflow

1. Inspect before judging:
   - Find the real project root with `pwd`, `ls -la`, `git status --short`, `rg --files`, and package/config files.
   - Read `README`, assignment instructions if present, `package.json`, lockfiles, `tsconfig*`, framework configs, and deployment config.
   - Identify runtime assumptions:
     - `node -v`
     - `package.json#engines`
     - lockfile package manager
     - deployment target
     - framework versions
   - Do not assume a package is unnecessary until usage and behavior are checked.
   - If the repository is dirty, do not revert user/student changes. Work with the existing state and report it.

2. Establish the course/project baseline:
   - Infer what the student was expected to know from README, assignment text, scripts, and nearby lesson conventions.
   - If the user supplied a teaching baseline, use that as the authority.
   - For JavaScript/TypeScript projects, prefer the configured supported runtime over generic old tutorial defaults.
   - Treat modern Node LTS projects as candidates for built-in runtime features such as native `fetch`, `node --watch`, native `.env` loading, `node:test`, `util.parseArgs`, `util.styleText`, `crypto.randomUUID`, and native TypeScript type stripping when applicable.
   - Do not replace packages if the project documents older runtime support, browser support, or compatibility constraints.

3. Run non-destructive checks first:
   - Prefer existing project scripts over direct commands.
   - Do not install new permanent tooling unless the user explicitly asks.
   - Use read-only or non-mutating checks first:
     - `npm ls --depth=0`
     - `npm outdated`
     - `npm audit --audit-level=moderate`
     - `npm run typecheck` or `tsc --noEmit`
     - `npm run lint`
     - `npm run build`
     - `npm test` or `npm run test`
     - `npx @e18e/cli analyze`
   - Use `npx @e18e/cli analyze` as a non-mutating optimization/dependency-modernization signal when JavaScript/TypeScript dependencies are present.
   - Treat e18e findings as suggestions to review, not automatic changes.
   - Do not run `npx @e18e/cli migrate --interactive` or any mutating e18e migration unless the user explicitly asks for migrations/refactoring.
   - For JavaScript/TypeScript projects, check modern language-style signals:
     - Prefer the project's existing ESLint/lint script first.
     - If no lint script/config exists, consider a temporary ESLint dry-run using current ESLint core rules such as `no-var`, `prefer-const`, `no-unused-vars`, and `eqeqeq`.
     - Keep this temporary: do not add permanent dependencies, package scripts, lockfile changes, or committed config unless the user explicitly asks. Run without `--fix`.
     - If ESLint is unavailable or would require too much setup, use `rg` fallback searches such as `rg -n "\bvar\s+"`.
     - Treat `var` and similar style issues as modernization/student-understanding signals, not proof of AI use.
   - For Tailwind projects, prefer existing project linting first:
     - Run the project's existing Tailwind, ESLint, framework, or editor-equivalent checks if they are already configured.
     - If no Tailwind-aware linting exists and Tailwind v4 is detected, consider a temporary ESLint dry-run for canonical class warnings before recommending changes.
     - Prefer `eslint-plugin-better-tailwindcss` with `better-tailwindcss/enforce-canonical-classes` for Tailwind v4 canonical suggestions such as `max-h-[360px]` -> `max-h-90`.
     - Keep this temporary: do not add permanent dependencies, package scripts, lockfile changes, or committed config unless the user explicitly asks. Remove temporary config after the check.
     - Treat canonical-class findings as maintainability/style modernization signals, not proof of AI use.
   - If a check is missing or unavailable, report it as skipped instead of inventing a new setup.
   - For package managers other than npm, use equivalent commands.

4. Audit dependencies:
   - Read [Package Necessity Audit](references/package-necessity-audit.md).
   - Read [e18e CLI](references/e18e-cli.md) when using `npx @e18e/cli analyze`.
   - For every manifest package, decide one of:
     - `keep`
     - `remove candidate`
     - `replace with platform/runtime feature`
     - `update candidate`
     - `needs student explanation`
   - Prove usage with `rg`, package-manager output, config files, scripts, framework conventions, and imports.
   - Check whether the package is imported but unused, installed but never imported, used only in scripts, used only in generated files, or used only for simple behavior now covered by the runtime/platform.
   - Never remove validation, security, auth, database, upload, crypto, or parsing libraries merely because TypeScript exists.
   - Treat built-in alternatives as candidates, not automatic replacements.
   - Do not downgrade packages. For outdated packages, prefer removal or update, but document compatibility blockers.
   - For old pinned packages such as `chalk@4`, identify whether the blocker is CommonJS, old tutorial code, or a real compatibility need.
   - Compare e18e recommendations with the project baseline. If e18e suggests a replacement, verify usage, behavior, runtime support, and assignment expectations before recommending it.

5. Audit scripts and tooling:
   - Look for old-template script patterns:
     - `nodemon`
     - `ts-node`
     - `ts-node-dev`
     - `tsx`
     - `babel-node`
     - hard-coded `node_modules/...` binary paths
     - unnecessary `dotenv` preload commands
   - Compare each script with modern runtime alternatives:
     - `node --watch`
     - `node --env-file=.env`
     - `node --test`
     - direct `node ./file.ts` when native TypeScript type stripping applies
     - package binaries by command name in npm scripts
   - Keep tool runners when the project needs TSX, transforms, decorators, path aliases, custom loaders, non-erasable TypeScript syntax, older runtime support, or framework-specific behavior.
   - Mark scripts as suspicious when they appear copied from an older tutorial and the project does not need them.

6. Audit code patterns:
   - Read [AI Slop Signals](references/ai-slop-signals.md).
   - Look for:
     - code that solves a slightly different problem than the assignment
     - advanced abstractions not used elsewhere
     - generic helper functions with no clear purpose
     - verbose comments explaining obvious syntax but not hard logic
     - inconsistent style or mixed paradigms
     - mixed CommonJS and ESM without reason
     - unhandled edge cases around real user input
     - fake error handling that does not connect to UI or API responses
     - unused files, duplicate functions, dead branches, and unreachable code
     - dependency usage that is decorative rather than functional
     - legacy JavaScript style in modern submissions, especially `var` where `let` or `const` is appropriate
     - mutable variables that could be `const`, loose equality (`==`/`!=`) without a documented coercion reason, and debug `console.log` left in final UI code
   - Separate quality findings from AI-slop signals. Bad code is not necessarily AI code.

7. Audit frontend/Tailwind UI when present:
   - Read [Frontend AI Slop and Tailwind Signals](references/frontend-ai-slop-tailwind.md).
   - Apply this step for React, Vite, Next.js, Tailwind, DaisyUI, shadcn/ui, Radix, or component-library-heavy submissions.
   - Look for generic AI frontend defaults: purple/indigo gradients, Inter/system fonts everywhere, rounded cards, subtle shadows, pill badges, three-feature-card grids, generic hero sections, uniform spacing, and default component styling without customization.
   - Check hover effects carefully:
     - Static informational cards should usually not lift, scale, glow, or imply clickability.
     - Interactive cards need actual click behavior, semantic structure, keyboard access, and clear focus-visible styling.
     - Use `cursor-pointer` only where custom clickable UI remains necessary; prefer real `<button>` or `<a>` elements for CTAs.
   - Treat overused boxes, nested cards, and decorative pills as hierarchy problems and student-question candidates.
   - Check Tailwind canonical-class warnings when Tailwind v4 is present:
     - Arbitrary values that exactly match Tailwind's scale, such as `max-h-[360px]`, should be reviewed as possible canonical classes, such as `max-h-90`.
     - Prefer existing project Tailwind linting before introducing a temporary check.
     - If a temporary ESLint check is used, run it in dry-run/no-fix mode first and remove the temporary config afterward.
     - Do not rewrite arbitrary values that encode deliberate design tokens, one-off measurements, external API values, or values not actually equivalent under the project's Tailwind/root font configuration.
   - Do not call Tailwind itself suspicious. The signal is unintentional default styling or inaccessible interaction design.

8. Generate student questions and teacher answer keys:
   - Read [Student Review Questions](references/student-review-questions.md).
   - Read [Teacher Answer Keys](references/teacher-answer-keys.md).
   - For each suspicious package, script, config, abstraction, or code block, create one concrete student-facing question.
   - For each question, also create a short teacher-only answer key so the instructor can judge the answer quickly.
   - Prefer questions that require the student to explain, modify, debug, or remove code.
   - Avoid accusatory wording.
   - Include at least one small live-coding task when appropriate:
     - remove one unnecessary dependency
     - replace package usage with a built-in API
     - add a test
     - change behavior
     - explain a hook dependency array
     - trace one request through the backend
     - simplify an overengineered helper
   - Questions and answer keys should be specific to the codebase, not generic.
   - Keep answer keys concise. They should state what a good answer should mention, red flags, and an optional follow-up.
   - Treat this as the most important part of the report. Do not leave it only in the chat response.
   - Put the questions and teacher answer keys together in one table so the instructor can review them quickly.

9. Optional improvement pass:
   - Only edit files if the user explicitly asked to improve or refactor the codebase.
   - If editing, prefer small, verifiable diffs.
   - Remove one dependency category at a time and rerun relevant checks.
   - If the user explicitly asks for package migrations, e18e migrations may be previewed with `npx @e18e/cli migrate <package> --dry-run`.
   - Run `npx @e18e/cli migrate --interactive` only when the user explicitly wants interactive migrations; review each suggested change before keeping it.
   - Do not stage, commit, push, or modify the Git index unless explicitly asked.
   - Do not rewrite the student’s whole project. Preserve review value.

10. Write the Markdown report file:

- Always create or update a Markdown report one directory above the reviewed project root unless the user explicitly gives a different destination.
- Think of the destination as running `cd ..` from the reviewed project root and writing the report there.
- Default filename: `AI_SLOP_REVIEW_[foldername of the project].md`, where `[foldername of the project]` is the basename of the reviewed project root.
- Example: if the reviewed project root is `/submissions/student-a`, write `/submissions/AI_SLOP_REVIEW_student-a.md`.
- The report file must contain all findings, including baseline, checks, dependency review, scripts/config review, code-understanding signals, modern JavaScript style findings, frontend/Tailwind findings, e18e findings when run, skipped checks, uncertainty, and verification results.
- The report file must include a required `Student Questions & Teacher Answer Key` section with one row per question and its expected answer.
- Include file paths and line numbers for findings when practical.
- If a section has no findings, include the section and write `No findings.` instead of omitting it.
- Do not create the report inside the reviewed project root unless the user explicitly asks for that.
- Do not overwrite an existing instructor report with unrelated content. If `AI_SLOP_REVIEW_[foldername of the project].md` already exists, update it for the current review or choose a clearly named variant such as `AI_SLOP_REVIEW_[foldername of the project]-2.md` and tell the user which file was written.

11. Final chat response:

- Keep the report instructor-friendly and evidence-based.
- Point to the Markdown report file that was written.
- Summarize only the highest-signal findings in chat; keep the full details in the report file.
- Include:
  - Project/runtime baseline discovered.
  - Checks run and results.
  - Dependency findings.
  - e18e optimization/replacement findings when run.
  - Outdated-template findings.
  - AI-slop/code-understanding signals.
  - Modern JavaScript style findings such as `var`, loose equality, unused variables, and final-code debug logs.
  - Tailwind canonical-class findings when Tailwind v4 checks were run.
  - Suggested modernization candidates.
  - Student questions.
  - Teacher answer keys for those questions.
  - Any skipped checks or uncertainty.
- Do not claim “this is AI-generated.”
- Use wording like:
  - “This looks like an outdated tutorial pattern.”
  - “This dependency needs justification.”
  - “This package may be replaceable with a built-in runtime feature.”
  - “This is a good candidate for a student explanation question.”
  - “I would not treat this as proof of AI use.”

## Tool Commands

Prefer project scripts. Use direct commands only when appropriate:

```bash
pwd
ls -la
git status --short
rg --files

node -v
npm -v
npm ls --depth=0
npm outdated
# Interpret npm outdated in bootcamp reviews:
# - current major == latest major: usually acceptable unless there is a known issue
# - current major < latest major: modernization/question candidate
# - pinned old major with no explanation: old-template/AI-slop signal
npm audit --audit-level=moderate

# Optional non-mutating dependency/performance modernization signal:
npx @e18e/cli analyze

# Optional migration previews only when the user explicitly asks for migrations:
npx @e18e/cli migrate chalk --dry-run
npx @e18e/cli migrate lodash --dry-run
npx @e18e/cli analyze

npm run typecheck
npm run lint
npm run build
npm test

# Optional temporary modern-JS ESLint dry-run when no project lint exists:
# Use current ESLint core rules. Run without --fix and do not keep generated config,
# dependencies, scripts, or lockfile changes unless explicitly asked.
npx --yes eslint@latest "**/*.{js,mjs,cjs}" --no-config-lookup --no-error-on-unmatched-pattern --rule "no-var: warn" --rule "prefer-const: warn" --rule "no-unused-vars: warn" --rule "eqeqeq: warn"

# Tailwind v4 canonical-class checks:
# 1. Prefer an existing project lint script or configured Tailwind-aware ESLint rule.
# 2. If none exists, use a temporary ESLint config and run without --fix first.
# 3. Remove temporary config and do not keep dependency/lockfile changes unless explicitly asked.
```

Useful searches:

```bash
rg "require\("
rg "module\.exports|exports\."
rg -n "\bvar\s+"
rg -n "==|!="
rg -n "console\.log"
rg "dotenv|node-fetch|cross-fetch|axios|ts-node|tsx|nodemon|chalk|moment|uuid|body-parser|request|rimraf|mkdirp|clsx|classnames|tailwind-merge"
rg "from ['\"](dotenv|node-fetch|cross-fetch|axios|chalk|moment|uuid|body-parser|clsx|classnames|tailwind-merge)['\"]"
rg "process\.env|fetch\(|crypto\.randomUUID|util\.parseArgs|util\.styleText|node:test|node:assert"
rg "hover:.*(scale|shadow|translate|border|bg|ring)"
rg "transition|duration-|ease-|cursor-pointer|focus-visible"
rg "rounded-(lg|xl|2xl|3xl)|shadow-(sm|md|lg|xl)|backdrop-blur|bg-gradient|from-indigo|to-purple|text-indigo"
rg "\[[0-9.]+(px|rem|em|%)\]"
rg "(h|w|min-h|min-w|max-h|max-w|m|p|gap|space|inset|top|right|bottom|left|translate|rounded|text)-\[[^]]+\]"
```

Package-manager equivalents are acceptable. Do not install new global tools silently.

## Reporting Template

```md
# AI-Slop / Modernization Review

## Baseline

- Runtime:
- Package manager:
- Framework:
- Assignment/course expectation:
- Checks run:

## Summary

- Strongest modernization candidates:
- Strongest student-understanding questions:
- Things that are probably fine:
- Things I would not treat as proof:

## Student Questions & Teacher Answer Key

This is the primary instructor section. Each question should point to specific code, config, or package evidence.

| #   | Evidence | Student question | Good answer should mention | Red flags | Follow-up / live task |
| --- | -------- | ---------------- | -------------------------- | --------- | --------------------- |

## Dependency Review

| Package | Current use | Installed major | Latest major | Finding | Candidate alternative | Student question |
| ------- | ----------- | --------------- | ------------ | ------- | --------------------- | ---------------- |

## Scripts & Config Review

| File/script | Finding | Why it matters | Suggested question |
| ----------- | ------- | -------------- | ------------------ |

## Code Understanding Signals

| Location | Signal | Suggested student task |
| -------- | ------ | ---------------------- |

## Modern JavaScript Style Findings

| Location | Finding | Check used | Suggested student task |
| -------- | ------- | ---------- | ---------------------- |

## Frontend / Tailwind Review

| Location | UI signal | Why it matters | Suggested student task |
| -------- | --------- | -------------- | ---------------------- |

## Tailwind Canonical Class Findings

| Location | Current class | Suggested canonical class | Check used | Student question |
| -------- | ------------- | ------------------------- | ---------- | ---------------- |

## e18e Findings

| Package/finding | e18e suggestion | Review status | Student question | Verification needed |
| --------------- | --------------- | ------------- | ---------------- | ------------------- |

## Verification

- Passed:
- Failed:
- Skipped:
- Uncertainty:
```

## Guardrails

- Do not accuse students of cheating.
- Do not use AI-detector style certainty.
- Do not punish dependency choices without checking assignment context.
- Do not remove packages that protect runtime boundaries, validate untrusted input, implement security, or support required compatibility.
- Treat `zod` as expected in this course when it is used for runtime validation and inferred types; question it only when unused, duplicated, or misapplied.
- Do not mistake beginner code, tutorial code, or copied documentation style for AI proof.
- Do not make large refactors unless explicitly asked.
- When uncertain, create a question for the student instead of making a claim.
