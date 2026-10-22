# Teacher Answer Keys

Use this reference to generate short teacher-only answer keys for student review questions.

The answer key is not meant to be a full solution. It should help the instructor quickly judge whether the student understands the code.

For each question or live-coding task, include:

- What a good answer should mention.
- Red flags in the student's answer.
- Optional follow-up if the answer is vague.

Keep answer keys concise, concrete, and tied to the submitted code.

## Format

```md
### Question

Student-facing question:

> ...

Teacher answer key:

- Good answer should mention:
  - ...
- Red flags:
  - ...
- Follow-up:
  - ...
```

For live-coding tasks:

```md
### Live-coding task

Task:

> ...

Teacher check:

- Accept if:
  - ...
- Red flags:
  - ...
- Follow-up:
  - ...
```

## Dependency Answer Keys

### Why is this package installed?

Good answer should mention:

- Where the package is imported or executed.
- What problem it solves.
- Why a built-in API is not enough.
- Whether it is required by assignment, framework, runtime, or compatibility constraints.

Red flags:

- “It is needed for the project” without pointing to usage.
- The student cannot find the import or script.
- The package is unused.
- The answer repeats package README marketing text.
- The student does not know whether it runs in browser, Node, build time, or runtime.

Follow-up:

- “Show me the exact file and line where this package is needed.”
- “Remove it temporarily. What breaks?”

### Why is this package on an older major version?

Good answer should mention:

- The installed version and latest version.
- Whether the old major is required for CommonJS/ESM compatibility, runtime support, framework support, or migration constraints.
- Whether updating was tried.
- Which check would prove the update is safe.

Red flags:

- No reason for the old major.
- “ChatGPT told me to install it” without understanding.
- Old major copied from an old tutorial.
- The student does not know what major versions imply.

Follow-up:

- “Run/update mentally: what files would need to change if we update?”
- “Which checks should pass after updating?”

### Could this package be replaced by a built-in API?

Good answer should mention:

- Which built-in API could replace it.
- Whether behavior would stay equivalent.
- Any missing features in the built-in alternative.
- Which tests or smoke checks should run after replacement.

Red flags:

- Assumes built-ins are always better.
- Does not know what behavior the package currently provides.
- Ignores browser/runtime compatibility.
- Removes runtime validation/security behavior.

Follow-up:

- “Show me the smallest replacement in this codebase.”
- “What behavior might change?”

## Script / Tooling Answer Keys

### Why are both `.ts` and `.js` files present?

Good answer should mention:

- Whether `.ts` files are source and `.js` files are compiled output.
- Whether the `.js` files are intentionally committed.
- Whether `dist/` is the build output.
- Which file is actually executed by package scripts.
- Whether source-adjacent `.js` files are stale generated artifacts.

Red flags:

- Student says both are source of truth.
- `.js` files do not match `.ts` files and student cannot explain why.
- Package scripts execute stale files.
- Build output is mixed with source without documentation.

Follow-up:

- “Which file should I edit to change behavior?”
- “If we delete the source-adjacent `.js`, what breaks?”

### Why does package.json call a `.js` file directly?

Good answer should mention:

- Whether this is compiled output, a handwritten entry file, or stale artifact.
- Why direct Node execution is used.
- Whether TypeScript is compiled before running.
- Whether package scripts should run source, compiled output, or a CLI bin.

Red flags:

- Student cannot identify the entry point.
- Script points to stale output.
- TypeScript changes do not affect runtime.
- There is no build step but generated JS is used.

Follow-up:

- “Change the TypeScript file and show which command reflects that change.”

### What is `export {};` doing in a TypeScript file?

Good answer should mention:

- It makes the file a module.
- It can avoid global-scope script behavior.
- It may be used to satisfy isolated module/module detection rules.
- It does not export any real value.

Red flags:

- Student says it exports all functions.
- Student says it is required for Node to run.
- Student cannot explain module vs script scope.

Follow-up:

- “What changes if we remove it?”
- “Which variables would become global script declarations?”

### Is `ts-node` / `tsx` / direct `node file.ts` needed?

Good answer should mention:

- Whether the runtime supports native TypeScript type stripping.
- Whether the file uses erasable TypeScript only.
- Whether it uses TSX, enums, decorators, parameter properties, path aliases, or custom loaders.
- Whether typechecking is still done separately with `tsc --noEmit`.

Red flags:

- Student thinks running TypeScript means it is typechecked automatically.
- Student cannot distinguish type stripping from typechecking.
- Tool is installed but scripts do not use it.
- Tool is used only because a generated answer suggested it.

Follow-up:

- “What TypeScript syntax would make native execution fail?”
- “Which command typechecks the project?”

## Frontend / Tailwind Answer Keys

### Why does every card have hover effects?

Good answer should mention:

- Hover effects should communicate interaction or meaningful emphasis.
- Static informational cards usually should not imply clickability.
- Touch devices do not have the same hover behavior.
- Important CTAs should stand out more than generic cards.

Red flags:

- “It looks modern” as the only reason.
- Every card uses identical `hover:scale`, `hover:shadow`, or `transition-all`.
- Student cannot say which elements are interactive.
- Hover makes static content look clickable.

Follow-up:

- “Remove hover from non-interactive cards. Which hover states remain?”

### Why does this CTA need `cursor-pointer`, button, or link semantics?

Good answer should mention:

- A CTA should usually be a semantic `<button>` or `<a>`.
- `cursor-pointer` can help custom clickable UI but does not replace semantics.
- Keyboard access and focus-visible styles matter.
- Clickable `div`s need strong justification.

Red flags:

- Click handler on a `div` with no keyboard support.
- No focus state.
- Student thinks `cursor-pointer` alone makes it accessible.
- CTA is visually weaker than surrounding decoration.

Follow-up:

- “Navigate to it with keyboard only.”
- “Should this be a link or a button?”

### Why are there many boxes, cards, and pills?

Good answer should mention:

- Cards should group related/comparable content.
- Pills should represent real metadata, status, filters, or categories.
- Visual hierarchy can often be created with typography and spacing instead.
- Too many containers reduce clarity.

Red flags:

- Student cannot explain what each pill means.
- Cards are nested without purpose.
- Every piece of text is boxed.
- Layout looks generic and unrelated to the domain.

Follow-up:

- “Remove three boxes/pills and preserve meaning.”

## Code Understanding Answer Keys

### Explain how an algorithm updates internal state

Good answer should mention:

- Where state is initialized.
- Where it is updated.
- How the next output depends on the updated state.
- What happens on the first run or unknown input.
- Edge cases and invalid input behavior.

Red flags:

- Student describes the feature at a high level but not the actual data flow.
- Student cannot point to the update line.
- Student confuses current move, previous move, and predicted move.
- Student cannot explain what changes after one round.

Follow-up:

- “Walk through two concrete inputs step by step.”

### Why does README usage differ from actual CLI behavior?

Good answer should mention:

- Whether README is stale, copied, or describes intended behavior not implemented.
- Actual command behavior.
- Whether the CLI is one-shot or interactive.
- How README or code should be changed to match.

Red flags:

- Student has not run the command.
- Student says both are correct when they conflict.
- README contains generic generated instructions.

Follow-up:

- “Run the documented command mentally. What should the user see?”

### How should invalid CLI input be handled?

Good answer should mention:

- Validate and parse input explicitly.
- Reject `NaN`, unsupported ranges, or invalid values.
- Give a clear user-facing error.
- Exit with an appropriate status code for CLI errors when relevant.
- Keep behavior documented.

Red flags:

- `parseInt` accepted without checking leftovers.
- `3abc` silently becomes `3`.
- `0` or negative values are not intentionally handled.
- Program crashes or produces confusing output.

Follow-up:

- “What should happen for `3abc`, `0`, and `-2`?”

### Live-coding task: preserve uppercase letters in a cipher

Accept if:

- Uppercase letters remain uppercase.
- Lowercase letters remain lowercase.
- Non-letters are preserved.
- Wraparound still works.
- Encryption and decryption both work.
- The implementation is understandable at the student's level.

Red flags:

- Converts the whole string to lowercase.
- Breaks punctuation/spaces.
- Handles only encryption, not decryption.
- Magic numbers with no explanation.
- Student cannot test `A`, `Z`, `a`, `z`.

Follow-up:

- “Test `Abc XYZ!` with shift 3.”

### Live-coding task: export a testable helper

Accept if:

- A pure function is exported.
- The CLI/prompt side effect is separated from core logic.
- Function can be called with input and returns output.
- Existing CLI behavior still works.
- A minimal test/manual check covers at least one normal and one edge case.

Red flags:

- Exported function still reads from prompt/stdin.
- Test depends on interactive input.
- CLI breaks after refactor.
- Student cannot identify pure logic vs side effect.

Follow-up:

- “Which part can be tested without starting the CLI?”

## Answer Key Style

Keep answer keys short enough to scan during a live review.

Prefer:

- “Good answer should mention...”
- “Accept if...”
- “Red flags...”
- “Follow-up...”

Avoid:

- Full model solutions unless the user asks.
- Accusatory language.
- Overly broad theoretical explanations.
