# Agent skills

My setup for Codex and Claude Code.

## What's in here

- `global/AGENTS.md`: user-wide instructions for both tools
- `skills/ai-workflow`: which model and thinking level each task gets, plus the cross-review before merge
- `skills/ai-slop-code-review`: audit student codebases for AI slop

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
git clone git@github.com:ReynkeDeVos/agent-skills.git ~/Documents/Custom-Skills/agent-skills
cd ~/Documents/Custom-Skills/agent-skills
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

# find-skills
aubx skills add vercel-labs/skills --global --agent codex --skill find-skills
ln -sfn ../../.agents/skills/find-skills ~/.claude/skills/find-skills

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

`docs/how-to-write-skills.md` covers how both tools load skills. The `ai-workflow` routes come from `~/Documents/Custom-Skills/AI-Model-Guide/model-guide.md`, and the first six rows also appear in `portfolio-next/src/content/portfolio.ts`. Keep all three in sync.
