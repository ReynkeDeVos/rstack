# Claude Code, Codex CLI, and T3 Code: cross-harness delegation

Researched **3 October 2026** against current official documentation, provider-owned source, and locally installed CLI help. Follow-up verification on the same date confirmed plugin-free delegation on the installed runtime; see the final section. No plugins or bridges were installed and no model-guide files were edited. No deliberate harness setup/configuration changes were made; the existing CLI wrappers invoked `mise use -g` during the initial inspection, so their configuration side effects were not ruled out.

## Recommendation

Use your existing model guide to choose the role and effort; give the harness an actual way to start the other harness. The practical pairing remains **Opus 5.5 builds; GPT-6.1 Sol investigates/reviews**, based on the maintained guide and Theo’s newer video at [21:34](https://www.youtube.com/watch?v=vu8X3YroB-w&t=1294s) and [27:51](https://www.youtube.com/watch?v=vu8X3YroB-w&t=1671s). Medium/High by task are the guide’s inferred starting settings, not effort levels established by those timestamps. [Maintained guide](~/.agents/skills/model-guide/references/model-guide.md)

**Your installed CLIs and T3 Code v0.0.44 already support plugin-free delegation by launching the other CLI through the shell.** A Claude-led T3 session was observed running a Codex worker, and a Claude Opus 5.5 worker launched by this Codex session completed successfully. Updating T3 is needed for its newer app-owned cross-provider child-task interface, not for executing a worker through the shell. The official Claude → Codex plugin and a shared MCP adapter are optional conveniences. [T3 app-owned orchestration design](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/docs/orchestration-v2/orchestrator-mcp-server.md)

The most useful setup is:

| Direction | Available route | What it provides |
| --- | --- | --- |
| Claude Code → Codex | Start **`codex exec`** from the shell; optional official plugin | A real Codex worker without a plugin; the optional plugin adds job-management commands. |
| Codex CLI → Claude Code | Start **`claude -p`** from the shell | A real Claude Code agent run; the lead supplies a task and consumes its result. |
| Either lead → either worker through named tools | Build a small shared MCP worker server | A uniform delegation interface; this adapter is additional software, not a built-in feature. |
| T3 Code v0.0.44 | Either lead invokes the other CLI through its shell tool | Cross-provider work executes; the external worker is represented as a command rather than an app-owned child thread. |
| Newer T3 Code | App-owned orchestration: `delegate_task` across provider instances | T3-owned cross-provider child threads; this API is absent from installed v0.0.44. |

The first two routes use existing documented tools. The shared MCP route is a design proposal. [Official Codex plugin](https://github.com/openai/codex-plugin-cc), [Claude programmatic execution](https://code.claude.com/docs/en/headless)

## What “subagent” means here

Native subagents are children managed by the parent harness, with its context, permission, and lifecycle rules. Claude’s native subagent configuration accepts Claude aliases/full model IDs; Codex documents its own model and reasoning configuration for child agents. Neither source documents a native “start the other vendor’s CLI” selector. A third-party model served through a compatible gateway would still be a different integration from starting that vendor’s own coding harness. [Claude subagents](https://code.claude.com/docs/en/sub-agents), [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

A shell-launched or MCP-launched worker can behave as a delegated specialist, but does not automatically become a native child thread in the parent UI. This distinction matters for transcript sharing, browser access, follow-up messages, cancellation, and results. It is an architectural inference from the separate harness processes and documented interfaces.

The `$model-guide` prompt chooses roles; instructions cannot create an unavailable tool. Claude uses `/model-guide` for an installed skill’s explicit invocation, whereas this Codex session uses `$model-guide`. Claude’s programmatic mode also supports `/skill-name` expansion. [Claude programmatic commands](https://code.claude.com/docs/en/headless#use-commands)

## Claude Code → Codex: use the official plugin

Run these **inside Claude Code**, after resolving the local executable issue described below:

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

The plugin wraps the installed Codex app server, using the same local Codex authentication and configuration. It offers `/codex:rescue` for delegation, `/codex:review`, and background management. Model and effort can be passed explicitly. [Official plugin README](https://github.com/openai/codex-plugin-cc#install)

Example for your guide:

```text
/codex:rescue --model gpt-6.1-sol --effort high --background Investigate the login regression in this repository. Read AGENTS.md and the maintained model guide. Do not edit files. Trace the failing path, compare relevant changes against main, and return the root cause with file:line evidence, a minimal proposed fix, and checks the builder should run. Do not delegate further.
```

Then:

```text
/codex:status
/codex:result
```

Role: root-cause investigation or independent review. Harness: Codex CLI through the official Claude Code plugin. Model: GPT-6.1 Sol. Thinking: High. Reason: your guide assigns difficult investigation/review to Sol; the plugin supplies the missing cross-harness capability. Continue implementation in Claude Code with Opus 5.5 at Medium for routine work or High for complex changes.

The command syntax is documented; this research did not confirm account access to `gpt-6.1-sol` or execute the plugin. If the account lacks the guide’s requested model, report that limitation and use the guide’s recorded fallback rather than silently changing models.

## Codex CLI → Claude Code: run a real Claude agent

Claude’s `mcp serve` exposes its tools, not a Claude model-agent loop. To have Claude perform a task, invoke `claude -p`, which supports structured output and resumable sessions. [Claude MCP server](https://code.claude.com/docs/en/mcp#use-claude-code-as-an-mcp-server), [Claude programmatic execution](https://code.claude.com/docs/en/headless)

The login-task examples below are illustrative assignments, not a login issue reported by the user. Replace their paths, scope, and checks with the actual task. A bounded read-only invocation, using the installed executable rather than the recursive wrapper:

```bash
cd /absolute/path/to/repository
~/.local/share/mise/installs/claude/2.1.288/claude -p \
  --model claude-opus-5-5 \
  --effort medium \
  --permission-mode dontAsk \
  --tools 'Read,Glob,Grep' \
  --output-format json \
  'Read AGENTS.md and CLAUDE.md if present. Examine the existing login implementation and recommend the smallest change that satisfies the acceptance criteria in docs/login-task.md. Do not edit files or delegate further. Return file:line evidence, the proposed implementation, relevant tests, and unresolved questions.' \
  > /tmp/claude-login-assessment.json
```

Role: implementation planning against the actual project. Harness: Claude Code print mode, launched by Codex’s shell tool. Model: Opus 5.5. Thinking: Medium, or High for a substantial plan. Reason: your maintained guide prefers Opus for implementation and its supporting plans. The task/document names are examples to replace with actual inputs.

For an implementation worker, give it an isolated worktree and explicit write/test permissions. For a project that actually uses `pnpm test:unit`, the corresponding invocation could be:

```bash
cd /absolute/path/to/isolated/worktree
~/.local/share/mise/installs/claude/2.1.288/claude -p \
  --model claude-opus-5-5 \
  --effort high \
  --permission-mode dontAsk \
  --tools 'Read,Glob,Grep,Edit,Write,Bash' \
  --allowedTools 'Read' 'Glob' 'Grep' 'Edit' 'Write' 'Bash(pnpm test:unit)' \
  --output-format json \
  'Read AGENTS.md, CLAUDE.md, and docs/login-task.md. Implement its acceptance criteria. Own only src/auth/ and its tests. Run pnpm test:unit. Do not change unrelated files, commit, push, or delegate further. Return changed files, test results, and remaining blockers.' \
  > /tmp/claude-login-implementation.json
```

`--tools` restricts available built-in tools; `--allowedTools` controls approval for matching calls. `dontAsk` denies calls that would otherwise need a prompt, so missing test/build permissions produce a blocker rather than an interactive hang. Existing deny/ask rules and managed policies can still override allow rules. [Claude CLI reference](https://code.claude.com/docs/en/cli-reference), [Claude permissions](https://code.claude.com/docs/en/permissions)

These examples validate flag presence/syntax against installed help and current docs. They are not authenticated end-to-end tests. Worktrees isolate files, not the entire operating system; Claude file permissions are not a universal child-process sandbox. [Claude permissions and sandboxing](https://code.claude.com/docs/en/permissions#how-permissions-interact-with-sandboxing)

## Claude → Codex without a plugin

A shell worker is also a supported building block. This example runs Sol High as a read-only investigator in a real Git repository:

```bash
~/.local/share/mise/installs/codex/0.160.0/bin/codex \
  --ask-for-approval never \
  exec \
  --cd /absolute/path/to/repository \
  --model gpt-6.1-sol \
  -c 'model_reasoning_effort="high"' \
  --sandbox read-only \
  --output-last-message /tmp/codex-login-investigation.md \
  'Read AGENTS.md. Investigate the login regression without editing files. Return the root cause with file:line evidence, a minimal proposed fix, and verification commands. Do not delegate further.'
```

Codex documents `exec` for scripts/CI, read-only or workspace-write execution, JSONL events, and final output capture. For the current guide’s investigation role, keep it read-only; a separate implementation worker can use workspace-write. [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)

## Why the often-suggested MCP registrations do not solve both directions

This old Claude → Codex registration is **obsolete on current Codex**:

```bash
# Historical syntax only; do not use with current Codex.
claude mcp add --transport stdio codex -- codex mcp-server
```

OpenAI explicitly says `codex mcp-server` and the standalone MCP-server binary have been removed, and the old tool reference/Agents SDK examples are unsupported. The replacement app server uses its own JSON-RPC protocol; it is not an MCP server or a drop-in MCP replacement. Codex still consumes external MCP servers. [Official removal notice](https://learn.chatgpt.com/docs/mcp-server)

This reverse registration is valid MCP-client/server plumbing:

```bash
codex mcp add claude-code-tools -- claude mcp serve
```

However, it supplies Claude Code’s tools to Codex; it does **not** make Opus think or execute an autonomous task. Claude’s documentation explicitly describes its server as tools-only and places tool-call confirmation responsibility on the client. [Claude server behavior](https://code.claude.com/docs/en/mcp#use-claude-code-as-an-mcp-server), [Codex external MCP configuration](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

## Uniform bidirectional delegation: a shared MCP adapter

This is a proposed implementation, not software installed by this research. Expose:

```text
start_worker(harness, model, effort, cwd, prompt, permission_profile)
worker_status(job_id)
worker_result(job_id)
cancel_worker(job_id)
```

Back `harness=codex` with `codex exec` for simple jobs or the app-server protocol for persistent streamed sessions. Back `harness=claude` with `claude -p` or the Claude Agent SDK. Keep stdout for MCP protocol messages and send subprocess diagnostics to stderr. Use subprocess argument arrays, validated directories/models, per-job output files, captured exit status, timeouts, and process-group cancellation. Those are suggested adapter requirements, not claimed built-in features. [Codex app server](https://learn.chatgpt.com/docs/app-server), [Claude programmatic execution](https://code.claude.com/docs/en/headless)

Once such a server actually exists, these registration shapes are supported:

```bash
# Future helper file; it must be implemented first.
claude mcp add --scope user --transport stdio harness-workers \
  -- node /absolute/path/to/harness-workers.mjs
codex mcp add harness-workers -- node /absolute/path/to/harness-workers.mjs
```

The adapter must run on the machine that has the repositories, CLI binaries, and authentication. Registering an MCP connection does not confer account access or copy tools from the lead harness into the worker. [Claude stdio registration](https://code.claude.com/docs/en/mcp#option-3-add-a-local-stdio-server), [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

For reliable work, the lead should pass a precise task, absolute checkout/worktree path, applicable instruction files, expected outputs, and completion checks. It should gather artifacts and verify the result before integrating. Run separate editing workers in separate worktrees; include uncommitted changes explicitly when a review needs them. Define a one-hop delegation limit and ensure the worker cannot recursively start the opposite harness. A prompt saying “do not delegate further” is useful guidance, but an adapter should enforce depth and tool restrictions. These are orchestration recommendations inferred from independent worker sessions.

## Reusable instruction for model-guide-based work

Suggested policy to add only when implementing the setup, in a shared skill reference and the relevant harness entrypoints:

```text
Use the maintained model-guide to select the role, model, and effort.
When the selected model requires the other harness, use the installed
cross-harness worker integration rather than substituting a native child.
Claude leads use the Codex plugin or the shared worker adapter.
Codex leads use a Claude print-mode worker or the shared worker adapter.
Pass task, checkout/worktree, allowed scope, instruction files, output path,
and required checks. Workers may not delegate across harnesses again.
The lead collects and verifies results and owns integration.
If the required launch capability or exact model is unavailable, report
which capability/model is missing and provide a precise manual handoff.
```

This modifies delegation behavior without embedding a second model ranking. Keep the existing maintained guide as the single source of model preferences. No skill or instruction files were changed by this report.

## T3 Code: current installation versus the newer orchestration runtime

**Your installed T3 Code v0.0.44 does not expose the cross-provider orchestration tools. A newer nightly does.** The lead inspected the installed desktop package, CLI version, actual tool catalog, and bundled server code; `orchestrator_capabilities` and `delegate_task` are absent from that installation. Its existing Codex subagent tools should not be mistaken for T3’s newer provider-aware orchestration.

Current upstream implements app-owned child threads through `orchestrator_capabilities`, `delegate_task`, `task_status`, and `task_cancel`. The implementation is present in **v0.0.46-nightly.20261003.2632**, whose source was inspected; the installed v0.0.44 was not upgraded or tested against this API. [Tag-pinned orchestration design](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/docs/orchestration-v2/orchestrator-mcp-server.md), [Tool implementation](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/apps/server/src/mcp/toolkits/orchestrator/tools.ts)

The feature landed in [commit de343914](https://github.com/pingdotgg/t3code/commit/de343914273eceb852a1d1d739cd1d38df7796ee) on 2 October 2026 at 19:22 UTC, after stable v0.0.45 was published at 18:17 UTC. The inspected nightly release was published 3 October at 14:08 UTC. Upgrading only to stable v0.0.45 would therefore miss this feature. Use the inspected nightly or a later release whose source/tool catalog confirms the orchestration tools. [Stable release](https://github.com/pingdotgg/t3code/releases/tag/v0.0.45), [Inspected nightly](https://github.com/pingdotgg/t3code/releases/tag/v0.0.46-nightly.20261003.2632)

No custom T3 fork is necessary for this route. On a build that exposes the tools:

1. Configure and authenticate both Codex and Claude providers in T3’s settings.
2. Update the desktop client and any separately running server together, reconnect, and start a fresh thread to check the new capability.
3. Have the lead call `orchestrator_capabilities` and use the returned provider-instance IDs, model IDs, option IDs, and accepted values.
4. Have it call `delegate_task` for the other provider, then collect the task result and verify it.

T3’s update documentation requires compatible client/server protocols. Follow the installed package’s update channel instead of assuming `t3 update` is the correct desktop upgrade command. [Updating guide](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/docs/user/updating.md)

The request schema supports a target containing `providerInstanceId`, `driverKind`, `model`, and `options`. Options may be an object keyed by advertised option IDs or an array of `{id,value}` pairs. Discover these at runtime; do not invent a key such as `reasoningEffort`. Cross-provider/model jobs need explicit model options: inheritance applies only when provider and model match. [Orchestrator contract](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/packages/contracts/src/orchestratorMcp.ts)

Illustrative tool arguments, **after substituting discovered capability values**:

```json
{
  "target": {
    "providerInstanceId": "<Codex provider ID from orchestrator_capabilities>",
    "driverKind": "codex",
    "model": "gpt-6.1-sol",
    "options": {
      "<advertised effort option ID>": "high"
    }
  },
  "role": "research",
  "mode": "async",
  "task": "Read ~/.agents/skills/model-guide/references/model-guide.md and the repository AGENTS.md. Investigate the login regression in this repository without editing files. Trace the failing path and return the root cause with file:line evidence, a minimal proposed fix, and checks the builder should run. Do not delegate further.",
  "clientRequestId": "login-root-cause-01"
}
```

The inspected manifest includes `gpt-6.1-sol` for Codex and `claude-opus-5-5` for Claude. That is source-level advertised support, not confirmation that both authenticated accounts can use those models. Query runtime capabilities before launching. [Provider model manifest](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/apps/server/src/provider/model-manifest.json)

Role: bounded investigation or independent review. Harness: T3 Code orchestration on a verified compatible newer build. Model: GPT-6.1 Sol. Thinking: High through the advertised effort option. Reason: use the guide’s investigator preference while T3 supplies native cross-provider child threads. For the reverse direction, target the discovered Claude provider with `claude-opus-5-5`, Medium for routine implementation or High for complex implementation, and an actual task/scope/checks.

Prompt for the lead, ready to adapt to the task:

```text
Use $model-guide and the maintained guide for role selection.
Prefer T3’s orchestrator_capabilities and delegate_task tools for
cross-provider delegation. Use Opus 5.5 to implement and GPT-6.1 Sol
at High to investigate/review difficult work. Resolve provider IDs,
exact model IDs, and effort option IDs/values from runtime capabilities.
Put the complete bounded assignment, repository/worktree context,
applicable instruction paths, allowed scope, deliverable, and checks
in each task prompt; the child does not receive the parent transcript.
Do not allow reciprocal worker delegation. Collect results with
T3’s task tools, verify them, and own integration. If the required
orchestration tool or model is unavailable, report the exact limitation.
Task: investigate and fix the login regression, preserving existing
behavior outside authentication and validating the relevant tests.
```

In a Claude provider thread, invoke the skill as `/model-guide` if using Claude’s explicit skill syntax. The local skill is already shared: both `~/.claude/skills/model-guide` and `~/.codex/skills/model-guide` point at `~/.agents/skills/model-guide`; no second guide copy is needed. This is local filesystem evidence from the lead’s inspection.

T3 supplies child-thread ownership, async task state, and result transfer. The child receives the explicit task prompt rather than a copy of parent history. These semantics come from the inspected orchestration source; no newer-build live session was run. On the installed older build, a shell-launched CLI worker remains a separate CLI process and does not automatically appear as a T3-owned child thread. [Orchestration design](https://github.com/pingdotgg/t3code/blob/v0.0.46-nightly.20261003.2632/docs/orchestration-v2/orchestrator-mcp-server.md)

## Local verification and limits

Local evidence on 3 October 2026:

- Installed actual binaries report **Claude Code 2.1.288** and **Codex CLI 0.160.0**.
- Their help confirms the principal example flags above, current MCP registration syntax, and `claude mcp serve`.
- Codex’s command list no longer contains `mcp-server`, matching the official removal notice.
- Both `~/.local/bin/claude` and `~/.local/bin/codex` are `mise` wrappers. Calling the wrapper caused repeated `mise` dispatch instead of reaching CLI help in this environment. The absolute versioned binary paths worked. The wrappers need investigation before a plugin/adapter relying on PATH can be considered ready; this report does not repair them.
- No authenticated Claude/Codex generation, plugin/bridge installation, deliberate harness setup/configuration edit, model-guide edit, or cross-harness end-to-end test was performed. The existing wrappers ran `mise use -g`; an unchanged global mise configuration was not independently verified. Exact guide model access is unverified for these local CLI accounts.

These initial verification limits were superseded by the following plugin-free runtime check. The newer app-owned T3 API still requires a newer build; ordinary shell-worker delegation does not.

## Follow-up: plugin-free delegation confirmed on the installed versions

The user supplied a screenshot of a Claude Opus 5.5 T3 conversation reporting that it launched GPT-6.1 Sol through Codex, collected its architecture report, and launched another research worker. The live process tree independently confirmed this ancestry, without printing process prompts or credentials:

```text
T3 Code v0.0.44
  -> Claude Code 2.1.288 (claude-opus-5-5[1m])
     -> Bash
        -> Codex CLI 0.160.0 exec (gpt-6.1-sol)
```

The reverse direction was tested from this Codex-led T3 session by invoking the installed Claude binary with `-p`, `--model claude-opus-5-5`, `--effort medium`, `--safe-mode`, an empty strict MCP configuration, no tools, and no session persistence. It returned exit code 0, `is_error: false`, and the requested result `CLAUDE_WORKER_OK`; result metadata confirmed the main model as `claude-opus-5-5`. This verifies an authenticated Claude worker launch and result return without installing a bridge or custom plugin. It does not test a Claude implementation worker's file editing or tests.

Both installed versions were rechecked directly: Claude Code **2.1.288**, Codex CLI **0.160.0**, T3 Code **0.0.44**. The installed server still lacks `delegate_task` and `orchestrator_capabilities`. The screenshot and process evidence show why that absence does not prevent cross-provider delegation: a shell tool can invoke the other CLI as a separate process. T3 observes the parent command, while the external worker's internal lifecycle is not automatically registered as a T3-owned child task.

Correction to the initial recommendation: a plugin, bridge, or T3 upgrade is **not required for the user's existing shell-based workflow**. These add structured tool access, lifecycle management, or UI integration. The built-in headless CLI primitives are sufficient when the parent has shell access, usable binary paths, authentication, and appropriate permissions. [Claude programmatic mode](https://code.claude.com/docs/en/headless), [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
