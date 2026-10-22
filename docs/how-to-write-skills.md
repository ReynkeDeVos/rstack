# How to write a SKILL.md that works in Codex CLI and Claude Code (as of 2026-10-22)

Sources were read on 2026-10-22. Source-code links are pinned:

- openai/codex at [94350a9](https://github.com/openai/codex/tree/94350a910143c406013683ae634708320f93f1f6) (2026-10-22)
- anthropics/skills at [dbd4588](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44) (2026-10-09)

A second pass on 2026-10-22 checked all 141 claims against their cited sources and corrected the 26 that were imprecise. Docs pages were read as their `.md` variants. Claims marked "source only" are not stated on any docs page. Claims marked "inference" are my synthesis, not vendor statements.

## 1. File layout and frontmatter

**Common base (Agent Skills spec).** A skill is a directory with a required `SKILL.md`, plus optional `scripts/`, `references/`, `assets/`, and any other files. Source: [agentskills.io/specification](https://agentskills.io/specification).

- `name`: required. 1-64 characters, lowercase letters, digits and hyphens only. No leading, trailing or consecutive hyphens. Must match the parent directory name. Source: [spec, name field](https://agentskills.io/specification).
- `description`: required. 1-1024 characters. Should say what the skill does and when to use it. Source: [spec, description field](https://agentskills.io/specification).
- Optional: `license`, `compatibility` (max 500 characters), `metadata` (string-to-string map), `allowed-tools` (space-separated, marked experimental). Source: [spec, frontmatter table](https://agentskills.io/specification).
- Keep `SKILL.md` under 500 lines. Keep references one level deep from `SKILL.md`. Source: [spec, progressive disclosure and file references](https://agentskills.io/specification).

**Codex CLI.**

- Layout: `SKILL.md` (required), `scripts/`, `references/`, `assets/`, and `agents/openai.yaml` (optional, for UI metadata, invocation policy and tool dependencies). Source: [developers.openai.com/codex/skills, file tree and "Optional metadata"](https://developers.openai.com/codex/skills).
- Frontmatter: the docs require `name` and `description`. Source: [codex skills, "Build skills" intro](https://developers.openai.com/codex/skills).
- Parser limits (source): `name` is capped at 64 characters ([parser.rs:4](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L4), checked at [parser.rs:82](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L82)). A missing `name` falls back to the directory name ([parser.rs:64-69](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L64-L69)). `description` must be non-empty ([parser.rs:83](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L83)) and has no parser-side length cap. Whitespace in `name` and `description` is collapsed to single spaces (`sanitize_single_line`, same file). Source only, for the length caps and whitespace collapse.
- Catalog truncation (source only): descriptions in the skills listing are cut at 1,024 characters ([render.rs:24](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/render.rs#L24)).
- Frontmatter keys understood by the parser (source only): `name`, `description`, `metadata.short-description`. The struct has no `deny_unknown_fields`, so other keys are ignored ([parser.rs:6-20](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L6-L20)).
- `agents/openai.yaml` keys (docs): `interface` (`display_name`, `short_description`, `icon_small`, `icon_large`, `brand_color`, `default_prompt`), `policy.allow_implicit_invocation`, `dependencies.tools`. Source: [codex skills, "Optional metadata"](https://developers.openai.com/codex/skills). The parser also accepts `policy.products` (source only; [model.rs:64-67](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/model.rs#L64-L67)). Dependency `type` and `transport` are capped at 64 characters, and `value`, `description`, `command` and `url` at 1,024 ([metadata.rs:11-16](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/metadata.rs#L11-L16), source only).

**Claude Code.**

- Layout: `SKILL.md` plus any supporting files. The docs show `reference.md`, `examples.md` and `scripts/helper.py`, and say to reference them from `SKILL.md`. Source: [code.claude.com/docs/en/skills, "Add supporting files"](https://code.claude.com/docs/en/skills#add-supporting-files). There is no `agents/openai.yaml` in the Claude docs.
- Frontmatter: all fields are optional, and `description` is recommended. The full table is at [code.claude.com/docs/en/skills, "Frontmatter reference"](https://code.claude.com/docs/en/skills#frontmatter-reference). Field names must match exactly. Unknown fields are ignored without an error.
- Frontmatter is read only if the opening `---` is the first line of the file. Invalid YAML loads the skill with no fields set. Source: [skills, "Frontmatter reference"](https://code.claude.com/docs/en/skills#frontmatter-reference).
- `description` plus `when_to_use` is truncated at 1,536 characters in the skill listing by default. `skillListingMaxDescChars` changes the cap. Source: [skills, frontmatter table](https://code.claude.com/docs/en/skills#frontmatter-reference).
- `name` defaults to the directory name. The Claude Code docs don't state a length limit. The Claude best-practices page gives 64 characters for `name` and 1,024 for `description`, and says `name` cannot contain XML tags and cannot contain the words "anthropic" or "claude". Source: [platform.claude.com best practices, "Skill structure"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#skill-structure).
- The Anthropic validator enforces the same name and description limits, rejects `<` and `>` in the description, and rejects any frontmatter key outside `name, description, license, allowed-tools, metadata, compatibility`. Source: [anthropics/skills quick_validate.py:42](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/skill-creator/scripts/quick_validate.py#L42), with the limits at [lines 70-83](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/skill-creator/scripts/quick_validate.py#L70-L83).

## 2. Where each tool discovers skills

**Codex CLI.**

| Scope | Documented location | Source |
|---|---|---|
| Repo | `$CWD/.agents/skills`, each parent up to the repo root, and `$REPO_ROOT/.agents/skills` | Docs: [codex skills, "Where Codex loads local skills"](https://developers.openai.com/codex/skills#where-to-save-skills). Source: [host_roots.rs:137-160](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/host_roots.rs#L137-L160) |
| Repo (project config) | Not in the docs table. Source: `<project>/.codex/skills` | Source only: [host_roots.rs:86-92](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/host_roots.rs#L86-L92), where the project layer's folder is `.codex` ([config/src/loader/mod.rs:1867](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/config/src/loader/mod.rs#L1867)) |
| User | `$HOME/.agents/skills` | Docs as above. Source: [host_roots.rs:104-106](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/host_roots.rs#L104-L106) |
| User (deprecated) | `$CODEX_HOME/skills`, where `CODEX_HOME` defaults to `~/.codex`. Source calls it deprecated and keeps it for compatibility | Source only: [host_roots.rs:96-101](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/host_roots.rs#L96-L101), [utils/home-dir/src/lib.rs:53-59](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/utils/home-dir/src/lib.rs#L53-L59) |
| Admin | `/etc/codex/skills` | Docs as above. Source: [host_roots.rs:116-117](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/host_roots.rs#L116-L117) |
| System | Bundled with Codex, installed under `$CODEX_HOME/skills/.system` | Docs as above. Source: [skills/src/lib.rs:66-69](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/lib.rs#L66-L69) |

- Scan depth (source only): host roots are walked recursively up to depth 6, with at most 2,000 directories per root and 20,000 entries. Hidden directories are skipped. Source: [loader/mod.rs:24-25](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/loader/mod.rs#L24-L25), [discovery.rs:17](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/loader/discovery.rs#L17), [host.rs](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/loader/host.rs).
- The file must be named exactly `SKILL.md` for discovery (source only, [discovery.rs:144](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/loader/discovery.rs#L144)).
- Two skills with the same `name` are not merged. Both can appear in skill selectors. Source: [docs, "Where Codex loads local skills"](https://developers.openai.com/codex/skills#where-to-save-skills).
- Changes are detected automatically. Restart if an update doesn't show. Source: [docs, "Create a skill"](https://developers.openai.com/codex/skills#create-a-skill).
- Symlinks: followed. The docs say "Codex supports symlinked skill folders and follows the symlink target". Source: [docs](https://developers.openai.com/codex/skills#where-to-save-skills), and in source, directory symlinks are followed for User, Repo and Admin roots and ignored for System ([host.rs:164-166](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/loader/host.rs#L164-L166)).

**Claude Code.**

| Scope | Path | Source |
|---|---|---|
| Enterprise | Managed settings directory, `.claude/skills/<name>/SKILL.md` | [skills, "Choose where skills load"](https://code.claude.com/docs/en/skills#choose-where-skills-load) |
| Personal | `~/.claude/skills/<name>/SKILL.md` | Same |
| Project | `.claude/skills/<name>/SKILL.md`, found from the start directory up to the repo root | Same, plus [skills, "Load skills in monorepos and subdirectories"](https://code.claude.com/docs/en/skills#load-skills-in-monorepos-and-subdirectories) |
| Nested | `<subdir>/.claude/skills/`, loaded the first time Claude reads or edits a file there | Same as the monorepo link |
| Added directory | `.claude/skills/` in a directory passed with `--add-dir` | [skills, "Load skills from a directory outside the project"](https://code.claude.com/docs/en/skills#load-skills-from-a-directory-outside-the-project) |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | [skills, "Choose where skills load"](https://code.claude.com/docs/en/skills#choose-where-skills-load) |
| claude.ai account | Terminal sessions download the account's skills to `~/.claude/skills/synced/` (v2.1.273 and later) | Same, plus [skills, "Where synced skills load"](https://code.claude.com/docs/en/skills) |

- Claude Code does not document reading `.agents/skills` or `.codex/skills`. A search of the skills page finds no mention of `.agents`.
- Symlinks: followed. A `<skill-name>` entry in the enterprise, personal or project location can be a symlink to a directory elsewhere. Claude Code reads `SKILL.md` from the target and loads the skill once even when several locations point at the same target. Plugin skills handle symlinks differently. Source: [skills, "Choose where skills load"](https://code.claude.com/docs/en/skills#choose-where-skills-load).
- Reserved names: do not name a skill folder `synced`. Outside a plugin, a name of `anthropic-skills` or starting with `anthropic-skills:` does not load. Source: [skills, "Choose where skills load"](https://code.claude.com/docs/en/skills#choose-where-skills-load).
- Name clashes: `/deploy` runs the root skill and `/apps/web:deploy` runs a nested one. Source: [skills, "Load skills in monorepos and subdirectories"](https://code.claude.com/docs/en/skills#load-skills-in-monorepos-and-subdirectories).

## 3. Implicit and explicit invocation

**Codex CLI.**

- Implicit: Codex chooses a skill when the task matches its `description`. Source: [docs, "How ChatGPT and Codex use skills"](https://developers.openai.com/codex/skills#how-codex-uses-skills).
- Explicit: in the CLI or IDE extension, run `/skills` or type `$` to mention a skill (for example `$skill-installer`). Source: [docs, "How ChatGPT and Codex use skills"](https://developers.openai.com/codex/skills#how-codex-uses-skills).
- Explicit-only: set `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. Explicit `$skill` invocation still works. Source: [docs, "Optional metadata"](https://developers.openai.com/codex/skills#optional-metadata). Source code: the default is `true` ([model.rs:23-28](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/model.rs#L23-L28)), and a skill with `false` gets its catalog entry flagged `hidden_from_prompt` ([provider/host.rs:166-168](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/provider/host.rs#L166-L168)).
- Disabling without deleting: `[[skills.config]]` with `path` and `enabled = false` in `~/.codex/config.toml`. Source: [docs, "Enable or disable local Codex skills"](https://developers.openai.com/codex/skills#enable-or-disable-local-codex-skills).

**Claude Code.**

- Implicit: Claude loads a skill when its description matches the task. Source: [skills, "Control who invokes a skill"](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).
- Explicit: `/skill-name`, typed at the start of the message. Source: [skills, "Where you write the skill's name"](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).
- Explicit-only: `disable-model-invocation: true` in `SKILL.md`. Claude can't invoke the skill on its own. Source: [skills, "Control who invokes a skill"](https://code.claude.com/docs/en/skills#control-who-invokes-a-skill).
- Claude-only: `user-invocable: false` for a skill only Claude invokes. Source: same section.
- Settings override: `skillOverrides` in settings can set `"on"`, `"name-only"`, `"user-invocable-only"` or `"off"` for skills you don't want to edit. Plugin skills are not affected. Source: [skills, "Override skill visibility from settings"](https://code.claude.com/docs/en/skills#override-skill-visibility-from-settings).

## 4. Claude Code-only frontmatter and how Codex treats unknown fields

**Claude Code-only fields.** These fields are read by Claude Code and not part of the Agent Skills spec. (`allowed-tools` is a spec field that Claude Code also reads: it pre-approves tools for the turn.) Source: [skills, "Frontmatter reference"](https://code.claude.com/docs/en/skills#frontmatter-reference) and [skills, "Using skill frontmatter outside Claude Code"](https://code.claude.com/docs/en/skills#using-skill-frontmatter-outside-claude-code):

- Invocation: `disable-model-invocation`, `user-invocable`.
- Tools: `disallowed-tools`.
- Model and effort: `model`, `effort`.
- Subagent: `context: fork`, `agent`, `background`.
- Arguments and display: `argument-hint`, `arguments`, `when_to_use`, `paths`, `shell`.
- Hooks: `hooks`.

Claude Code also extends the standard outside frontmatter, with body placeholders and command injection: `$ARGUMENTS`, `$N`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}` and `` !`command` `` injection. Source: [skills, "Available string substitutions"](https://code.claude.com/docs/en/skills#available-string-substitutions) and [skills, "Inject dynamic context"](https://code.claude.com/docs/en/skills#inject-dynamic-context).

- Claude Code accepts every field in the table and ignores unrecognized field names without an error. Source: [skills, "Frontmatter reference"](https://code.claude.com/docs/en/skills#frontmatter-reference).
- Packaging and upload to claude.ai, the Skills API, or `package_skill.py` accept only `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. Any other key is a hard error. Source: [skills, "Using skill frontmatter outside Claude Code"](https://code.claude.com/docs/en/skills#using-skill-frontmatter-outside-claude-code). The Anthropic validator enforces the same allowlist ([quick_validate.py:42](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/skill-creator/scripts/quick_validate.py#L42)).

**Codex CLI.** The Codex docs don't say what happens to unknown keys. Source: the parser has no `deny_unknown_fields`, so unknown `SKILL.md` keys are ignored, not rejected ([parser.rs:6-20](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L6-L20)). The parser reads only `name`, `description` and `metadata.short-description` (source only). Consequences (source only, inferred from the parser):

- `disable-model-invocation`, `user-invocable`, `allowed-tools`, `model`, `effort` and `context` have no effect in Codex.
- A skill with `disable-model-invocation: true` in `SKILL.md` is still implicit in Codex. Use `agents/openai.yaml` instead.
- Codex tool declarations go in `agents/openai.yaml` under `dependencies.tools` (docs, [Optional metadata](https://developers.openai.com/codex/skills#optional-metadata)).

## 5. Model and reasoning effort for subagents

**Codex CLI.**

- Global defaults under `[agents]` in `config.toml`: `enabled`, `max_concurrent_threads_per_session`, `default_subagent_model`, `default_subagent_reasoning_effort`, `interrupt_message`. Source: [subagents, "Global settings"](https://developers.openai.com/codex/subagents#custom-agents) and [config reference, `agents.*`](https://developers.openai.com/codex/config-reference).
- Custom agent files: standalone TOML under `~/.codex/agents/` or `.codex/agents/`. Required keys: `name`, `description`, `developer_instructions`. Optional `model`, `model_reasoning_effort`, `model_reasoning_summary`, `model_verbosity`. Source: [subagents, "Custom agents"](https://developers.openai.com/codex/subagents#custom-agents).
- Precedence: the docs say the value in the agent file wins. Otherwise Codex resolves each setting from an explicit spawn value, then the matching `[agents]` default, then the parent. Source: [subagents, "Custom agents"](https://developers.openai.com/codex/subagents#custom-agents).
- Roles in config: `agents.<name>.description` and `agents.<name>.config_file`. Source: [config reference, `agents.<name>.*`](https://developers.openai.com/codex/config-reference).
- Spawn tool: `spawn_agent` accepts `model` and `reasoning_effort` (source only). In the v2 schema they are removed unless `multi_agent_v2.expose_spawn_agent_model_overrides` is set ([multi_agents_spec.rs:129-131](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/core/src/tools/handlers/multi_agents_spec.rs#L129-L131), [spec_plan.rs:1469](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/core/src/tools/spec_plan.rs#L1469)).
- Observed live in Codex 0.163.0 on 2026-10-22: `spawn_agent` exposed `model`, `reasoning_effort` and `fork_turns` (`"all"` or `"none"`). Its instructions say full-history forks take no overrides, so set `fork_turns: "none"` with them, and that sub-agents inherit the parent's model unless the user asks for a different one.
- Effort values: the subagents page names `ultra`, `max`, `xhigh`, `high`, `medium`, `low`. The config reference gives `low`, `medium`, `high`, `xhigh`, `max`, or `ultra` as examples ("such as"), and says available levels depend on the model and client. Source enum (source only): `none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra`, `persistent`, plus a `Custom` variant ([protocol/src/openai_models.rs:62-74](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/protocol/src/openai_models.rs#L62-L74)). Per-model support is not enumerated in the docs.
- Model names used in the docs: `gpt-6.1-sol` (for demanding agents) and `gpt-6-luna` (for fast, narrow ones). Source: [subagents, "Choosing models and reasoning"](https://developers.openai.com/codex/subagents#choosing-models-and-reasoning).
- Subagents inherit the parent's sandbox and approval settings. A custom agent file cannot override them. Source: [subagents, "Approvals and sandbox controls"](https://developers.openai.com/codex/subagents).

**Claude Code.**

- Subagent file (`.claude/agents/*.md`): `model` accepts `sonnet`, `opus`, `haiku`, `fable`, a full model ID, or `inherit`. If omitted, the order below applies. Source: [sub-agents, "Choose a model"](https://code.claude.com/docs/en/sub-agents#choose-a-model) and [sub-agents, "Frontmatter reference"](https://code.claude.com/docs/en/sub-agents#frontmatter-reference).
- Subagent `effort`: `low`, `medium`, `high`, `xhigh`, `max`. Available levels depend on the model. It overrides the session effort but not `CLAUDE_CODE_EFFORT_LEVEL`. Source: [sub-agents, "Frontmatter reference"](https://code.claude.com/docs/en/sub-agents#frontmatter-reference) and [sub-agents, "Choose an effort level"](https://code.claude.com/docs/en/sub-agents#choose-an-effort-level).
- Model resolution order: (1) the per-invocation `model` parameter Claude passes, (2) the subagent's `model` frontmatter, where `inherit` means the main conversation's model, (3) `CLAUDE_CODE_SUBAGENT_MODEL`, (4) the main conversation's model. Source: [sub-agents, "Choose a model"](https://code.claude.com/docs/en/sub-agents#choose-a-model).
- Per-invocation `effort` parameter: available in Claude Code v2.1.292 and later. It overrides the `effort` field but not `CLAUDE_CODE_EFFORT_LEVEL`. Forks do not take it. Source: [sub-agents, "Choose an effort level"](https://code.claude.com/docs/en/sub-agents#choose-an-effort-level).
- Force one model for every subagent: set `CLAUDE_CODE_SUBAGENT_MODEL` and `CLAUDE_CODE_SUBAGENT_MODEL_FORCE=1`. Source: [sub-agents, "Run every subagent on one model"](https://code.claude.com/docs/en/sub-agents#run-every-subagent-on-one-model).
- Extended thinking: subagents inherit the main conversation's setting. There is no per-subagent thinking setting. Source: [sub-agents, "Choose a model"](https://code.claude.com/docs/en/sub-agents#choose-a-model).
- Skill-level model: a skill can set `model` and `effort` for its turn. With `context: fork`, `model` sets the forked subagent's model. Source: [skills, "Frontmatter reference"](https://code.claude.com/docs/en/skills#frontmatter-reference).
- Run a skill in a subagent: `context: fork` plus `agent: <type>`. The skill body becomes the subagent's task. The subagent does not see the conversation history. Source: [skills, "Run skills in a subagent"](https://code.claude.com/docs/en/skills#run-skills-in-a-subagent).
- Built-in `Explore` runs on the main conversation's model by default. When that model is Fable, Explore runs on Opus with a subscription, Console account or LLM gateway, and stays on Fable on Bedrock, Google Cloud and Microsoft Foundry. A user or project subagent named `Explore` with `model: haiku` overrides it. Source: [sub-agents, "Built-in subagents"](https://code.claude.com/docs/en/sub-agents#built-in-subagents).

## 6. Authoring guidance from the vendors

**Codex CLI** ([skills, "Best practices" and "How ChatGPT and Codex use skills"](https://developers.openai.com/codex/skills#best-practices)):

- Keep each skill focused on one job.
- Prefer instructions over scripts, unless you need deterministic behavior or external tooling.
- Write imperative steps with explicit inputs and outputs.
- Test prompts against the description to confirm the right trigger behavior.
- Because implicit matching depends on `description`, write concise descriptions with clear scope and boundaries. Front-load the key use case and trigger words, so the host can still match the skill if descriptions are shortened.
- The manual example's `description` line reads "Explain exactly when this skill should and should not trigger." Source: [skills, "Create a skill"](https://developers.openai.com/codex/skills#create-a-skill).
- Progressive disclosure: the name, description and file path are listed up front. The full `SKILL.md` loads only when Codex selects the skill. The listing defaults to at most 2% of the context window, or 8,000 characters when the window is unknown. `skills.max_context_tokens` sets a different budget, capped at 10,000 tokens. Source: [skills, "Build skills" intro](https://developers.openai.com/codex/skills) and [config reference, `skills.max_context_tokens`](https://developers.openai.com/codex/config-reference).

**Claude Code and Anthropic** ([best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), [skills docs](https://code.claude.com/docs/en/skills)):

- Concise is key. Only add context Claude doesn't already have. Claude reads `SKILL.md` only when the skill becomes relevant. Source: [best practices, "Concise is key"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#concise-is-key).
- Keep the body under 500 lines, and split longer content into separate files. Source: [best practices, "Progressive disclosure patterns"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#progressive-disclosure-patterns).
- Avoid deeply nested references. Give long reference files a table of contents. Source: [best practices, "Progressive disclosure patterns"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#progressive-disclosure-patterns).
- Descriptions: write in the third person, say what the skill does and when to use it, include trigger terms, and avoid vague ones such as "Helps with documents". Source: [best practices, "Writing effective descriptions"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#writing-effective-descriptions).
- Names: consider gerund form (`processing-pdfs`); noun phrases and action-oriented names are acceptable alternatives. Avoid vague names such as `helper`, `utils` or `tools`. Source: [best practices, "Naming conventions"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#naming-conventions).
- Avoid time-sensitive information. Use consistent terminology. Source: [best practices, "Content guidelines"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#content-guidelines).
- Build evaluations first, then iterate. Source: [best practices, "Evaluation and iteration"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#evaluation-and-iteration). Test with every model you plan to use. Source: [best practices, "Core principles"](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#test-with-all-models-you-plan-to-use).
- Claude Code docs: write the body as standing instructions, since the rendered content stays in context across turns. Keep it concise. Source: [skills, "Skill content lifecycle"](https://code.claude.com/docs/en/skills#skill-content-lifecycle) and [skills, "Types of skill content"](https://code.claude.com/docs/en/skills#types-of-skill-content).

## Gaps and conflicts

- **Description limit:** the spec, best practices and Anthropic validator say 1,024 characters. Claude Code truncates each skill's description plus `when_to_use` at 1,536 characters by default (configurable with `skillListingMaxDescChars`). Codex truncates each description to 1,024 characters in its catalog, though its docs state only an overall listing budget ([render.rs:24](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/ext/skills/src/render.rs#L24)). Stay under 1,024 for portability.
- **Name must match the directory:** the spec requires it ([spec](https://agentskills.io/specification)). Claude Code allows a mismatch, since `name` overrides the directory name for the command ([skills, command name table](https://code.claude.com/docs/en/skills#how-a-skill-gets-its-command-name)). Codex does not enforce it (source only, [parser.rs:64-69](https://github.com/openai/codex/blob/94350a910143c406013683ae634708320f93f1f6/codex-rs/skills/src/parser.rs#L64-L69)). Keep them equal.
- **Reserved words:** best practices reserve "anthropic" and "claude" in `name`. The Claude Code docs reserve `anthropic-skills` and `synced`. The Codex docs and source reserve nothing. Source: [best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#skill-structure), [skills docs](https://code.claude.com/docs/en/skills#choose-where-skills-load).
- **Angle brackets:** the Anthropic validator rejects `<` and `>` in descriptions ([quick_validate.py:79-81](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/skill-creator/scripts/quick_validate.py#L79-L81)). Claude Code refuses them in names. Codex's parser allows them (source only).
- **Portable frontmatter:** only the six spec fields pass the Anthropic validator and the claude.ai upload. Claude Code-only fields degrade silently in Codex, and `disable-model-invocation` does not exist in Codex. Codex-only policy goes in `agents/openai.yaml`. Use only the six fields in `SKILL.md`, and put Codex extras in `agents/openai.yaml` (inference from the sources above).
- **Undocumented Codex behavior (source only):** the `.codex/skills` project root, the deprecated `$CODEX_HOME/skills` location, the depth-6 recursive scan, the exact-`SKILL.md` match, ignoring of unknown keys, `policy.products`, and the `multi_agent_v2` gate on spawn model overrides. Do not rely on these for portability.
- **Missing in Codex docs:** no documented equivalent of Claude's `$ARGUMENTS`, `` !`command` `` injection, `${CLAUDE_SKILL_DIR}`, or `context: fork`. The text would be read literally in Codex (inference from the absence in the docs).
- **Missing in Claude docs:** no documented reading of `agents/openai.yaml` or `.agents/skills`. Claude Code treats the `agents/` folder as an ordinary supporting file (inference).
- **Shared layout:** neither tool documents reading the other's directory. A symlink works in both directions, because both tools follow symlinked skill folders (documented in both). That combination has not been tested here. Example: keep the canonical skill in `.agents/skills/<name>/` and link `.claude/skills/<name>` to it (inference).
- **Effort values per model:** the Claude Code docs and the Codex config reference say availability depends on the model. Neither skills page has a per-model table; the wider model docs were not searched. Locally, `~/.codex/models_cache.json` lists each Codex model's `supported_reasoning_levels`, and T3 Code's `orchestrator_capabilities` lists the effort options per model.
- **Claude runtime limits:** the 64-character `name` cap comes from the best-practices page and the validator, not from a Claude Code runtime check. Claude Code's source is not public. Not verified at runtime.
- **Per-invocation Claude effort parameter:** the sub-agents docs describe it (see section 5). In Claude Code 2.1.308 the Agent tool's schema has `model` (`sonnet`, `opus`, `haiku`, `fable`) and `effort` (`low`, `medium`, `high`, `xhigh`, `max`), observed in a live session on 2026-10-22.
