---
name: ai-workflow
description: Routes each task to its model and thinking level, and gates merging medium and larger pull requests on a cross-model review. Use when spawning or delegating a subagent, handing off a review, getting unstuck on a hard problem or on work that keeps circling before it ships, opening or merging a pull request, or when asked which model or thinking level to use.
---

# AI workflow

The user's model routing. Following it is the user's explicit request, so set the model and thinking level on every handoff, even where a tool says to inherit the parent's.

| Task | Covers | Model | Thinking |
| --- | --- | --- | --- |
| Investigate & debug | Root causes, regressions, repros and architecture | Opus 5.5 | High |
| Build & implement | Features, refactors, migrations and long ports | Opus 5.5 | High |
| Review code | Independent cross-family review | GPT-6.2 Astra | High |
| Explore visual design | Fresh visual directions, graphics and unique visualizers | Fable 5.2 | High |
| Get unstuck | Stuck runs, calls no check can settle, and whether circling work is good enough to ship | Fable 5.2 | High |
| Bulk analysis | Classify or pattern-match across many files or a large data set | Haiku 5.5 | Medium |
| Search & gather | Bounded lookups and side tasks for a lead | Opus 5.5 | Medium |
| Use a computer | Routine browser and computer tasks | GPT-6.2 Sol | Medium; High for difficult dependencies |
| Heavy computer use | Especially demanding computer tasks | GPT-6.2 Astra | High |

- **Opus**: Extra High for hairy work that needs many checks: Windows-specific code, replaying a large corpus of logs, exploratory work where every stone gets turned; no Low or Max.
- **Fable**: works best as the oracle: it finds the fix or the direction and directs, and Opus implements and grinds it out, including the large, check-heavy parts such as test environments and edge cases. It calls work done without running the checks, so when it makes a change itself, the checks must pass before anyone trusts the result. As a reviewer it is precise but misses important issues, so it never replaces the cross-family review. In Explore visual design it builds the visual itself with a design skill loaded, if one is installed, and the result must still show what it is meant to show. Extra High only for the hardest problems; no Max, which scores worse on code. It is lazy and spiky: it can miss details and state wrong claims with confidence, so check its claims against the sources. Use it sparingly: it drains usage limits far faster than Opus.
- **Astra**: only for review and heavy computer use; computer use needs a target with computer-use tools. It is the most thorough reviewer and rarely reports a wrong finding, but its reports are hard to read and it needs a very clear task: ask for each finding in plain English, and have Opus restate a report you cannot follow.
- **Sol**: Extra High only when High falls short; no Max.
- **Haiku**: reasoning on; reads and labels, never writes code or decides; Low only for simple, checked tasks; High for longer ones; never the final reviewer.

## Routing

1. Match each handoff to the row for its purpose. Collecting facts in a bounded area is Search & gather; diagnosing why is Investigate & debug; labelling hundreds of items is Bulk analysis.
2. When choosing between Opus and Fable, start on Opus. Work a check can settle (tests, a repro, a spec to hill-climb) stays there. Move to Fable when no check settles the work and Opus's result falls short or its options all look alike, or start on Fable when taste plainly decides it, as with fresh visuals.
3. Brief Opus with the scope and the out-of-scope list, and add: "If you think this is a good idea, do it. Otherwise, suggest something else." Opus follows the task and grows it; the brief is where you hold it small.
4. A Haiku task names the pattern, the output format and a check; the lead spot-checks a sample before relying on it.
5. Take the row's thinking level, adjust it by the model's note above, and pass it with the model using the settings below.
6. A run is stuck when two attempts at the same problem have failed, it keeps circling one decision, or finished work keeps collecting more fixes instead of shipping. Switch the work to the Get unstuck row's model with the problem, the evidence, the diff and what was tried, and ask what actually remains. It answers with a fix, a plan for the original row's model, or "ship it".

The session's own model and thinking level stay the user's choice: route the work you hand off.

## Cross-review before merge

A PR a Claude model opens, or is about to open, gets an independent review from Astra at High before it merges; one a GPT model opens gets one from Opus at High. The opener's family sets the reviewer, whoever edits the PR later. This overrides the Review code row.

Only medium and larger changes need it. A change is **small** when a reader takes in its whole effect at a glance: copy, a typo, a comment, a config value or a few-line fix in one place. New or changed logic, a refactor, a change across several areas, any security, permissions, auth, data-loss or concurrency risk, and any change you are unsure about count as medium or larger. A small PR is ready once the author reports high confidence on its head commit, backed by the evidence step 3 asks for, and its description says the cross-review was skipped as a small change.

1. Review the branch against its base before opening the PR, or the open PR if one exists. Hand the reviewer the diff range, its intent, what is out of scope and the checks to run; the reviewer works read-only and starts no subagents. Ask it to hold the change to its smallest form and to flag code, tests or guards the intent does not need. Ask for each finding in plain English, with its location, impact, evidence and severity: **blocker** (the intended case is wrong), **should** (a real bug callers will hit, within the intent) or **nit** (everything else, including other paths, rare cases, small costs and extra compatibility). Ask for a confidence that the change is ready to merge: high, medium or low.
2. Judge each finding and its severity yourself; a rare case or a small cost is a nit whatever its label, except that a security, permissions, auth, data-loss or concurrency bug is at least a should on any path. Fix agreed findings with the smallest change, preferring a deletion or a narrower check over a new lock, cache, helper or option. Answer disagreements with evidence. Decline nits and out-of-scope findings in one line each and list them as follow-ups. If review grew the diff, cut it back before the next round. Stop when both confidences are high or only nits remain; otherwise send a fresh round with the prior findings, your answers and what changed, and later rounds check the changed code and open findings. Count three rounds in total across all pushes, five for security, permissions, auth, data-loss or concurrency changes. A finding still disputed after two answers goes to the Get unstuck row's model for a read on whether it matters, then to the user with both sides and that read.
3. The PR is ready to merge only when the author, a model from the opener's family, and the reviewer each report high confidence on the current head commit. The author's confidence rests on evidence it observed this session that covers the final diff; missing proof blocks readiness. A new head commit needs a fresh round unless the commits since the reviewed head are small; then the author's evidence on the new head is enough. Running out of rounds is not approval.
4. Record the reviewer's model, the rounds and both confidences in the PR description.
5. Merge, enable auto-merge or queue the PR only when it is ready and the user asked you to merge it. Otherwise leave it open and report it ready or blocked, with what blocks it.

## Settings

Thinking levels map to effort values: Low `low`, Medium `medium`, High `high`, Extra High `xhigh`. Ultracode is a separate mode toggle, not an effort level.

Inside T3 Code (the `t3-code` MCP tools are present), hand off every row through `delegate_task`, since it applies the thinking level for every model. The IDs come from `orchestrator_capabilities`; recheck there if a call is rejected. If a listed model is missing or rejected, switch to the newest version of the same model not yet tried in this handoff (Sol to Sol, Opus to Opus, never Sol to Astra) that `orchestrator_capabilities` lists, and tell the user; if there is none, report the handoff as blocked. Outside T3 Code, the Claude aliases below already pick the newest version, and `~/.codex/models_cache.json` lists the GPT versions.

| Model | `target.providerInstanceId` | `target.model` | `target.options` |
| --- | --- | --- | --- |
| Opus 5.5 | `claudeAgent` | `claude-opus-5-5` | `{"effort":"high"}` |
| Fable 5.2 | `claudeAgent` | `claude-fable-5-2` | `{"effort":"high"}` |
| GPT-6.2 Astra | `codex` | `gpt-6.2-astra` | `{"reasoningEffort":"high"}` |
| GPT-6.2 Sol | `codex` | `gpt-6.2-sol` | `{"reasoningEffort":"high"}` |
| Haiku 5.5 | `claudeAgent` | `claude-haiku-5-5` | `{"effort":"medium"}` |

Elsewhere:

| Model | From Claude Code | From Codex |
| --- | --- | --- |
| Opus 5.5 | Agent tool, `model: "opus"`, `effort: "high"`, not a `fork` (forks ignore the model) | `claude -p --model opus --effort high "<prompt>"` |
| Fable 5.2 | Agent tool, `model: "fable"`, `effort: "high"`, not a `fork` | `claude -p --model fable --effort high "<prompt>"` |
| GPT-6.2 Astra | `codex exec -m gpt-6.2-astra -c model_reasoning_effort=high "<prompt>"` | `spawn_agent` with `model: "gpt-6.2-astra"`, `reasoning_effort: "high"` and `fork_turns: "none"` (full-history forks take no overrides); without those fields, the `codex exec` command |
| GPT-6.2 Sol | `codex exec -m gpt-6.2-sol -c model_reasoning_effort=high "<prompt>"` | as GPT-6.2 Astra, with `model: "gpt-6.2-sol"` |
| Haiku 5.5 | Agent tool, `model: "haiku"`, `effort: "medium"`, not a `fork` | `claude -p --model haiku --effort medium "<prompt>"` |
