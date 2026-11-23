# rstack

My setup for Codex, Claude Code, and Antigravity.

## What's in here

- `global/AGENTS.md`: user-wide instructions for all three tools
- `skills/ai-workflow`: which model and thinking level each task gets, plus the cross-review before merge
- `skills/modernize-web-project`: audit a JS/TS web project against the current Node LTS and the latest TypeScript (e18e, oxlint, Tailwind canonical classes) and propose changes
- `docs/model-guide.md`: the evidence behind the `ai-workflow` routes, source by source, with timestamps
- `docs/cross-harness-subagents-research.md`: how Claude Code, Codex and T3 Code hand work to each other

## What I install

| Plugin | Marketplace | Claude Code | Codex | Antigravity |
| --- | --- | --- | --- | --- |
| `mattpocock-skills` | `mattpocock/skills` | ✓ | ✓ | ✓ |
| `ponytail` | `DietrichGebert/ponytail` | ✓ | ✓ | ✓ |

Skills outside plugins: the two above, `impeccable` (`pbakaus/impeccable`, installed globally via the `impeccable` CLI), `find-skills` (skills.sh), and `omarchy`, `omarchy-app`, `diagnose-crash`, `superwhisper`, which Omarchy and Superwhisper link in themselves. Codex also has OpenAI's own plugins from the app, and Antigravity has Google's `modern-web-guidance-plugin`.

Skill packs go in as plugins, never also via `skills add`, so nothing loads twice.

## Setup on a new machine

```sh
git clone git@github.com:ReynkeDeVos/rstack.git ~/Documents/Custom-Skills/rstack
cd ~/Documents/Custom-Skills/rstack
mkdir -p ~/.agents/skills ~/.claude/skills ~/.codex ~/.gemini/config/skills ~/.gemini/config/rules

# Instructions: one file for all three tools
ln -sfn "$PWD/global/AGENTS.md" ~/.agents/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.codex/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.claude/CLAUDE.md
ln -sfn ~/.agents/AGENTS.md ~/.gemini/config/AGENTS.md

# My skills (Codex reads ~/.agents/skills, Claude Code ~/.claude/skills, Antigravity ~/.gemini/config/skills)
for name in $(ls skills); do
  ln -sfn "$PWD/skills/$name" ~/.agents/skills/"$name"
  ln -sfn ../../.agents/skills/"$name" ~/.claude/skills/"$name"
  ln -sfn ~/.agents/skills/"$name" ~/.gemini/config/skills/"$name"
done

# find-skills (pick global and the agents in the menu; symlink into ~/.gemini/config/skills if needed)
aubx skills add https://github.com/vercel-labs/skills --skill find-skills
ln -sfn ~/.agents/skills/find-skills ~/.gemini/config/skills/find-skills

# Plugins (Claude Code, Codex & Antigravity; `agy plugin install` converts Claude Code plugins into plugin.json)
for repo in mattpocock/skills DietrichGebert/ponytail; do
  claude plugin marketplace add "$repo"
  codex plugin marketplace add "$repo"
  agy plugin install "https://github.com/$repo"
done
for plugin in mattpocock-skills@mattpocock ponytail@ponytail; do
  claude plugin install "$plugin"
  codex plugin add "$plugin"
done

# Impeccable (global skill + hooks for all three tools)
aubx impeccable install --providers=claude,codex,antigravity --scope=global

# Ponytail always-on rule for Antigravity (no lifecycle hooks in agy)
cat <<'EOF' > ~/.gemini/config/rules/ponytail.md
---
trigger: always_on
description: "Ponytail lazy senior dev mode (full level)"
---

@[Ponytail](~/.gemini/config/plugins/ponytail/AGENTS.md)
EOF
```

In T3 Code, symlink `AGENTS.md`, `plugins`, `rules`, and `skills` inside `~/.t3/userdata/providers/antigravity/<hash>/config/` to `~/.gemini/config/` so T3 Code shares the same Antigravity setup.

## Update

```sh
claude plugin marketplace update && claude plugin update <plugin>
codex plugin marketplace upgrade
agy plugin install https://github.com/mattpocock/skills
agy plugin install https://github.com/DietrichGebert/ponytail
aubx --package impeccable@latest impeccable update --scope=global --yes
```

`docs/how-to-write-skills.md` covers how Codex and Claude Code load skills. The `ai-workflow` routes come from `docs/model-guide.md`, and the first seven rows also appear in `portfolio-next/src/content/portfolio.ts`. Keep all three in sync. The skill carries only the rules; the guide keeps the sources. Every update names the newest version of each model (Sol, Astra, Opus, Fable, Haiku, Sonnet, Neon), even one no video has tested; a version never jumps to a different model name.
