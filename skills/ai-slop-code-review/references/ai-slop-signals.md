# AI Slop Signals

Use these as review signals, not proof.

## Stronger Signals

- Student cannot explain code they submitted.
- Student cannot make a tiny change without breaking unrelated code.
- Code uses advanced concepts not taught or not used elsewhere in the project.
- Dependencies are installed but unused.
- Multiple packages solve the same problem.
- Code solves a slightly different problem than the assignment asked for.
- Error handling exists but is not connected to user-visible behavior.
- README claims features that do not exist.
- Comments explain obvious syntax but skip the real logic.
- Legacy JavaScript style appears in a modern browser/Node submission, such as `var` where `const` or `let` is appropriate.
- Loose equality (`==`/`!=`) appears without a clear coercion reason.
- Debug `console.log` statements are left in final user-facing code.
- Functions are generic, reusable-looking, but used only once.
- Architecture is much larger than the app needs.
- Mixed CommonJS and ESM without a clear reason.
- File names, comments, or examples refer to different apps or domains.
- Generated code contains placeholders, fake edge cases, or invented requirements.
- There are suspiciously polished abstractions next to very basic mistakes.

## Outdated Template Signals

- Packages installed on old major versions when `npm outdated` shows a newer current major and the project has no compatibility reason.
- `chalk@4` in a modern ESM project.
- `dotenv` installed for a simple Node app without checking native env-file support.
- `node-fetch` or `cross-fetch` in a modern Node-only app.
- `ts-node`, `tsx`, or `nodemon` installed automatically for simple scripts.
- `moment` in a new project for basic formatting.
- `body-parser` for basic Express JSON parsing.
- `request` in any new project.
- Babel/Webpack config in a simple modern Vite or Node project without a reason.
- Hard-coded `node_modules` binary paths in scripts.
- Very old TypeScript targets without documented deployment constraints.
- CommonJS boilerplate in a course/project that teaches ESM.
- A dependency set that looks frozen in an older tutorial era, especially when packages are multiple majors behind but were supposedly newly installed for the project.

## Modern JavaScript Style Signals

Use ESLint when the project already has it configured. If no linter exists, a temporary dry-run with current ESLint core rules such as `no-var`, `prefer-const`, `no-unused-vars`, and `eqeqeq` is appropriate. Do not keep temporary config, dependencies, scripts, or lockfile changes unless explicitly asked.

Treat these as modernization and understanding prompts:

- `var` in modern code where block-scoped `let` or immutable `const` would be clearer.
- `let` where ESLint can prove `const` is enough.
- Loose equality without an intentional coercion explanation.
- Unused variables, imports, or helper functions.
- Debug logs left in submitted UI code.

Student questions:

- Why is this variable declared with `var` instead of `let` or `const`?
- Which declarations can be changed to `const`, and how do you know?
- Is this loose equality relying on type coercion? If so, what exact coercion?
- Which logs are useful diagnostics, and which should be removed before submission?

## Frontend / Tailwind Signals

For frontend submissions, also read [Frontend AI Slop and Tailwind Signals](frontend-ai-slop-tailwind.md).

Common UI-specific signals include:

- Purple/indigo gradients used as the default brand style.
- Inter/system fonts everywhere with no typography decisions.
- Rounded cards and subtle shadows on almost every element.
- Hover lift/scale/shadow effects on static informational cards.
- CTA elements that look clickable but are not semantic buttons/links.
- Missing `cursor-pointer` or focus-visible styling on custom clickable UI.
- Too many boxes, nested cards, and decorative pills.
- Generic centered hero plus three feature cards regardless of assignment needs.
- Uniform Tailwind spacing with little visual hierarchy.
- Default shadcn/ui or component-library styling with no project-specific design choices.

Do not treat these as proof of AI use. Treat them as intentionality and accessibility review prompts.

## Weak Signals

These should not be over-weighted:

- Polished variable names.
- Good formatting.
- Complete README.
- Correct code.
- Use of comments.
- Use of a package you personally dislike.
- Code copied from official docs.
- Similarity to lecture examples.
- Beginner mistakes.

## Instructor-Friendly Wording

Prefer:

- “This needs explanation.”
- “This looks like an old tutorial pattern.”
- “This package may not be necessary for the configured runtime.”
- “This is a good live-review question.”
- “This is a modernization candidate.”
- “This is not proof of AI use.”

Avoid:

- “This is obviously AI.”
- “You cheated.”
- “AI detector says…”
- “No human would write this.”
- “This package proves it.”

## Evidence Levels

Use these categories:

### Low confidence

Surface-level style signal. Use only as a question.

### Medium confidence

Dependency, script, or config choice looks outdated or unused. Verify with searches and checks.

### High confidence

Code or package is unused, duplicated, unreachable, broken, inconsistent with assignment, or impossible for the student to explain during review.

Even high-confidence findings are quality/understanding findings, not proof of AI use.
