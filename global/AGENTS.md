# User-wide agent instructions

## JavaScript package management

- Prefer [`aube`](https://aube.jdx.dev/) over `npm`, `pnpm`, `deno`, `bun`, and other JavaScript package managers whenever it is convenient and supported by the surrounding tooling.
- When using `aube`, strongly prefer reusing a supported lockfile already present in the repository, such as `package-lock.json`, `pnpm-lock.yaml`, or `bun.lock`, and preserve its existing format. A separate `aube-lock.yaml` is not required.
- When `aube` is unavailable or awkward to use, such as in a Vite+ workflow without first-class `aube` support, use `pnpm` as the default fallback.

## Model routing

- Before spawning or delegating a subagent, handing off a review, or opening or merging a pull request, load the `ai-workflow` skill and follow it.
- When two attempts at the same problem have failed, you keep circling one decision, or finished work keeps collecting more fixes instead of shipping, load the `ai-workflow` skill and ask Fable.

## Scope and pushback

- Before building what was asked, judge the approach: if it is a good idea, do it; otherwise say why and suggest something better.
- Keep the change to what was asked. List further ideas and review nits as follow-ups for the user to pick.

## Pull requests

- A PR title or body follows the `pr` skill, with these rules winning where they differ. A repository's own PR template or `CONTRIBUTING.md` wins over both.
- Title: a conventional commit in plain language that names what the change does for the user, such as `perf(server): cut websocket frame size by 70%+ with gzipping`.
- Open the body with the problem in a sentence or two, taken from the user's original request, then how the change fixes it. The `pr` skill's sections follow only where they add something; a small change can stop after those two sentences.
- End the body with `Created with <model> in <harness>.`, naming every model that wrote part of the change, followed by the `ai-workflow` cross-review record on one line.
- Before submitting, check the title, body, quotes and attachments for secrets and private details.
