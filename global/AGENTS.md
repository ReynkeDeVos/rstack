# User-wide agent instructions

## Privilege escalation

- Never use `sudo`.
- When a command requires elevated privileges, use `run0` instead.
- Keep each `run0` invocation narrowly scoped to the command that needs elevation.

## JavaScript package management

- Prefer [`aube`](https://aube.jdx.dev/) over `npm`, `pnpm`, `deno`, `bun`, and other JavaScript package managers whenever it is convenient and supported by the surrounding tooling.
- When using `aube`, strongly prefer reusing a supported lockfile already present in the repository, such as `package-lock.json`, `pnpm-lock.yaml`, or `bun.lock`, and preserve its existing format. A separate `aube-lock.yaml` is not required.
- When `aube` is unavailable or awkward to use, such as in a Vite+ workflow without first-class `aube` support, use `pnpm` as the default fallback.

## Model routing

- Before spawning or delegating a subagent, handing off a review, or opening or merging a pull request, load the `ai-workflow` skill and follow it.
- When two attempts at the same problem have failed, or you keep circling one decision, load the `ai-workflow` skill and ask its advisor.
