# Agent skills

My own skills for Codex and Claude Code.

- `ai-workflow`: which model and thinking level each kind of task gets, and the cross-model review before a medium or larger PR merges. Its routes come from `~/Documents/Custom-Skills/AI-Model-Guide/model-guide.md`; the first six rows also appear as `aiRecommendations` in `portfolio-next/src/content/portfolio.ts`. Keep all three in sync.
- `ai-slop-code-review`: audit student codebases for AI-slop and outdated-template signals.

`docs/how-to-write-skills.md` collects how both tools load and run skills.

`global/AGENTS.md` is my user-wide `~/.agents/AGENTS.md`.

## Install

Codex reads `~/.agents/skills`; Claude Code reads `~/.claude/skills`. Link each skill into both:

```sh
for skill in skills/*/; do
  name=$(basename "$skill")
  ln -sfn "$PWD/skills/$name" ~/.agents/skills/"$name"
  ln -sfn ../../.agents/skills/"$name" ~/.claude/skills/"$name"
done
```

Link the user-wide instructions back, and point Codex and Claude Code at them:

```sh
ln -sfn "$PWD/global/AGENTS.md" ~/.agents/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.codex/AGENTS.md
ln -sfn ~/.agents/AGENTS.md ~/.claude/CLAUDE.md
```
