# e18e CLI

Use the e18e CLI as an optional JavaScript/TypeScript dependency and performance modernization signal.

## Safe Default

Run analysis only:

```bash
npx @e18e/cli analyze
```

This analyzes the current project and reports optimization or dependency replacement opportunities.

Treat findings as review signals, not automatic instructions.

## Useful Analyze Variants

```bash
npx @e18e/cli analyze --log-level debug
npx @e18e/cli analyze --pack npm
npx @e18e/cli analyze --pack pnpm
npx @e18e/cli analyze --pack yarn
npx @e18e/cli analyze --pack bun
```

The optional path argument can point to a project directory or tarball:

```bash
npx @e18e/cli analyze .
npx @e18e/cli analyze ./some-project
```

## Migration Guardrails

Do not run mutating migrations unless the user explicitly asks.

Preview specific migrations first:

```bash
npx @e18e/cli migrate chalk --dry-run
npx @e18e/cli migrate lodash --dry-run
```

Interactive migration is allowed only when the user explicitly wants migrations:

```bash
npx @e18e/cli migrate --interactive
```

Review every migration before keeping it. e18e suggestions are optimization candidates; they still need project-specific verification.

## How to Interpret e18e Findings

For each finding, ask:

- Which package is being replaced or optimized?
- Is the package actually used?
- Does the suggested replacement preserve behavior?
- Is the suggested replacement compatible with the course/runtime/framework?
- Does this improve the project or just change style?
- Can the student explain the current package and the suggested replacement?
- Which checks must pass after the change?

## Student Questions

- e18e suggests replacing this package. Where is the package used?
- What behavior does the current package provide?
- What behavior would the replacement provide?
- Would this change affect browser support, Node support, or ESM/CommonJS?
- Can you apply the replacement manually in one file and explain it?
- Which tests or smoke checks would prove the migration is safe?

## Teacher Answer Key

Good answer should mention:

- Current package usage.
- Suggested replacement and why it may be better.
- Compatibility and behavior differences.
- Verification plan.

Red flags:

- Student accepts the tool recommendation without understanding it.
- Student cannot find where the package is used.
- Migration changes behavior without tests.
- Migration removes needed runtime validation, compatibility, or framework behavior.

## Reporting

Report e18e results separately from confirmed cleanup findings:

```md
## e18e Findings

| Package/finding | e18e suggestion | Review status | Student question | Verification needed |
| --- | --- | --- | --- | --- |
```
