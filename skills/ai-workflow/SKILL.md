---
name: ai-workflow
description: Routes each task to its model and thinking level. Use when spawning or delegating a subagent, handing off a review, or when asked which model or thinking level to use.
---

# AI workflow

The user's model routing, updated 9 October 2026. Following it is the user's explicit request, so set the model and thinking level on every handoff, even where a tool says to inherit the parent's.

| Task | Covers | Model | Thinking |
| --- | --- | --- | --- |
| Investigate & debug | Root causes, regressions and architecture | GPT-6.1 Sol | High |
| Search & gather | Bounded subagent tasks with a clear check | Haiku 5.5 | Medium |
| Build & implement | Features, refactoring and long ports | Opus 5.5 | Extra High |
| Review code | Independent review | GPT-6.1 Sol | High |
| Explore visual design | Layout and UX refinements | Opus 5.5 | Extra High |

- **GPT-6.1 Sol**: Medium for scoped edits and everyday questions; Extra High only when High falls short; no Max.
- **Opus 5.5**: no Low or Max.
- **Haiku 5.5**: reasoning on; Low only for simple, checked tasks; High for longer ones.

## Routing

1. Match each handoff to the row for its purpose. Gathering evidence for an investigation stays Investigate & debug.
2. A Haiku task gets a clear check in its prompt, the condition that tells it the task is done.
3. Take the row's thinking level, adjust it by the model's note above, and pass it with the model using the settings below. The tables show the row defaults.

The session's own model and thinking level stay the user's choice: route the work you hand off.

## Settings

Thinking levels map to effort values: Low `low`, Medium `medium`, High `high`, Extra High `xhigh`.

Inside T3 Code (the `t3-code` MCP tools are present), hand off every row through `delegate_task`, since it applies the thinking level for every model. The IDs come from `orchestrator_capabilities`; recheck there if a call is rejected.

| Model | `target.providerInstanceId` | `target.model` | `target.options` |
| --- | --- | --- | --- |
| GPT-6.1 Sol | `codex` | `gpt-6.1-sol` | `{"reasoningEffort":"high"}` |
| Opus 5.5 | `claudeAgent` | `claude-opus-5-5` | `{"effort":"xhigh"}` |
| Haiku 5.5 | `claudeAgent` | `claude-haiku-5-5` | `{"effort":"medium"}` |

Elsewhere:

| Model | From Claude Code | From Codex |
| --- | --- | --- |
| GPT-6.1 Sol | `codex exec -m gpt-6.1-sol -c model_reasoning_effort=high "<prompt>"` | `spawn_agent` with `model: "gpt-6.1-sol"`, `reasoning_effort: "high"` and `fork_turns: "none"` (full-history forks take no overrides); without those fields, the `codex exec` command |
| Opus 5.5 | Agent tool, `model: "opus"`, `effort: "xhigh"` | `claude -p --model opus --effort xhigh "<prompt>"` |
| Haiku 5.5 | Agent tool, `model: "haiku"`, `effort: "medium"` | `claude -p --model haiku --effort medium "<prompt>"` |
