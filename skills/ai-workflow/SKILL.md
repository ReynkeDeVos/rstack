---
name: ai-workflow
description: Routes each task to its model and thinking level, and gates pull-request merges on a cross-model review. Use when spawning or delegating a subagent, handing off a review, opening or merging a pull request, or when asked which model or thinking level to use.
---

# AI workflow

The user's model routing, updated 9 October 2026. Following it is the user's explicit request, so set the model and thinking level on every handoff, even where a tool says to inherit the parent's.

| Task | Covers | Model | Thinking |
| --- | --- | --- | --- |
| Investigate & debug | Root causes, regressions and architecture | GPT-6.1 Sol | High |
| Search & gather | Bounded subagent tasks with a clear check | Haiku 5.5 | Medium |
| Build & implement | Features, refactoring and long ports | Opus 5.5 | Extra High |
| Review code | Independent review | GPT-6.1 Sol | High |
| Explore visual design | Layout, UX refinements and animations | Opus 5.5 | Extra High |
| Use a computer | Routine browser and computer tasks | GPT-6.1 Sol | Medium; High for difficult dependencies |
| Heavy computer use | Especially demanding computer tasks | GPT-6 Astra | High |

- **GPT-6.1 Sol**: Medium for scoped edits and everyday questions; Extra High only when High falls short; no Max.
- **Opus 5.5**: no Low or Max.
- **GPT-6 Astra**: only for heavy computer use; the target needs computer-use tools.
- **Haiku 5.5**: reasoning on; Low only for simple, checked tasks; High for longer ones; never the final reviewer.

## Routing

1. Match each handoff to the row for its purpose. Collecting facts in a bounded area is Search & gather; diagnosing why is Investigate & debug. A substantial or ambiguous feature gets a Sol investigation first, and Opus builds from its evidence.
2. A Haiku task gets a clear check in its prompt, the condition that tells it the task is done.
3. Take the row's thinking level, adjust it by the model's note above, and pass it with the model using the settings below. The tables show the row defaults.

The session's own model and thinking level stay the user's choice: route the work you hand off.

## Cross-review before merge

A PR a Claude model opens, or is about to open, gets an independent review from GPT-6.1 Sol at High before it merges; one a GPT model opens gets one from Opus 5.5 at High. The opener's family sets the reviewer, whoever edits the PR later. This overrides the Review code row, and Opus's effort here is `high`.

1. Review the branch against its base before opening the PR, or the open PR if one exists. Hand the reviewer the diff range, its purpose and the checks to run; the reviewer works read-only and starts no subagents. Ask for each finding with its location, impact, evidence and severity (blocker, should or nit), and for a confidence that the change is ready to merge: high, medium or low.
2. Fix valid findings with the smallest change inside the task's intent, or answer them with evidence. Stop when both confidences are high or only nits remain; otherwise send a fresh round with the prior findings, your answers and what changed, and later rounds check the changed code and open findings. Count three rounds in total across all pushes, five for security, permissions, auth, data-loss or concurrency changes. A finding still disputed after two answers goes to the user.
3. The PR is ready to merge only when the author, a model from the opener's family, and the reviewer each report high confidence on the current head commit. The author's confidence rests on evidence it observed this session that covers the final diff; missing proof blocks readiness. A new head commit needs a fresh round, and running out of rounds is not approval.
4. Record the reviewer's model, the rounds and both confidences in the PR description.
5. Merge, enable auto-merge or queue the PR only when it is ready and the user asked you to merge it. Otherwise leave it open and report it ready or blocked, with what blocks it.

## Settings

Thinking levels map to effort values: Low `low`, Medium `medium`, High `high`, Extra High `xhigh`.

Inside T3 Code (the `t3-code` MCP tools are present), hand off every row through `delegate_task`, since it applies the thinking level for every model. The IDs come from `orchestrator_capabilities`; recheck there if a call is rejected.

| Model | `target.providerInstanceId` | `target.model` | `target.options` |
| --- | --- | --- | --- |
| GPT-6.1 Sol | `codex` | `gpt-6.1-sol` | `{"reasoningEffort":"high"}` |
| Opus 5.5 | `claudeAgent` | `claude-opus-5-5` | `{"effort":"xhigh"}` |
| Haiku 5.5 | `claudeAgent` | `claude-haiku-5-5` | `{"effort":"medium"}` |
| GPT-6 Astra | `codex` | `gpt-6-astra` | `{"reasoningEffort":"high"}` |

Elsewhere:

| Model | From Claude Code | From Codex |
| --- | --- | --- |
| GPT-6.1 Sol | `codex exec -m gpt-6.1-sol -c model_reasoning_effort=high "<prompt>"` | `spawn_agent` with `model: "gpt-6.1-sol"`, `reasoning_effort: "high"` and `fork_turns: "none"` (full-history forks take no overrides); without those fields, the `codex exec` command |
| Opus 5.5 | Agent tool, `model: "opus"`, `effort: "xhigh"`, not a `fork` (forks ignore the model) | `claude -p --model opus --effort xhigh "<prompt>"` |
| Haiku 5.5 | Agent tool, `model: "haiku"`, `effort: "medium"`, not a `fork` | `claude -p --model haiku --effort medium "<prompt>"` |
| GPT-6 Astra | `codex exec -m gpt-6-astra -c model_reasoning_effort=high "<prompt>"` | as GPT-6.1 Sol, with `model: "gpt-6-astra"` |
