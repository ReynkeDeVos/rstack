# rstack

My setup for Codex and Claude Code.

## What's in here

- `global/AGENTS.md`: user-wide instructions for both tools
- `skills/ai-workflow`: which model and thinking level each task gets, plus the cross-review before merge
- `skills/modernize-web-project`: audit a JS/TS web project against Node 26 and TypeScript 7 (e18e, oxlint, Tailwind canonical classes) and propose changes
- `docs/model-guide.md`: the evidence behind the `ai-workflow` routes, source by source, with timestamps
- `docs/cross-harness-subagents-research.md`: how Claude Code, Codex and T3 Code hand work to each other

## What I install

| Plugin | Marketplace | Claude Code | Codex |
| --- | --- | --- | --- |
| `mattpocock-skills` | `mattpocock/skills` | ✓ | ✓ |
| `ponytail` | `DietrichGebert/ponytail` | ✓ | ✓ |
| `impeccable` | `pbakaus/impeccable` | ✓ | ✓ |

Skills outside plugins: the two above, `find-skills` (skills.sh), and `omarchy`, `omarchy-app`, `diagnose-crash`, `superwhisper`, which Omarchy and Superwhisper link in themselves. Codex also has OpenAI's own plugins from the app.

Skill packs go in as plugins, never also via `skills add`, so nothing loads twice.

## Setup on a new machine

```sh
git clone git@github.com:ReynkeDeVos/rstack.git ~/Documents/Custom-Skills/rstack
cd ~/Documents/Custom-Skills/rstack
mkdir -p ~/.agents/skills ~/.claude/skills ~/.codex

# Instructions: one file for both tools
ln -sfn "$PWD/global/AGENTS.md" ~/.agents/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.codex/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.claude/CLAUDE.md

# My skills (Codex reads ~/.agents/skills, Claude Code ~/.claude/skills)
for name in $(ls skills); do
  ln -sfn "$PWD/skills/$name" ~/.agents/skills/"$name"
  ln -sfn ../../.agents/skills/"$name" ~/.claude/skills/"$name"
done

# find-skills (pick global and the agents in the menu)
aubx skills add https://github.com/vercel-labs/skills --skill find-skills

# Plugins
for repo in mattpocock/skills DietrichGebert/ponytail pbakaus/impeccable; do
  claude plugin marketplace add "$repo"
  codex plugin marketplace add "$repo"
done
for plugin in mattpocock-skills@mattpocock ponytail@ponytail impeccable@impeccable; do
  claude plugin install "$plugin"
  codex plugin add "$plugin"
done
```

## Update

```sh
claude plugin marketplace update && claude plugin update <plugin>
codex plugin marketplace upgrade
```

`docs/how-to-write-skills.md` covers how both tools load skills. The `ai-workflow` routes come from `docs/model-guide.md`, and the first six rows also appear in `portfolio-next/src/content/portfolio.ts`. Keep all three in sync. The skill carries only the rules; the guide keeps the sources. Every update names the newest version of each model (Sol, Astra, Opus, Fable, Haiku, Sonnet), even one no video has tested; a version never jumps to a different model name.
