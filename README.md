# Agent skills

My own skills for Codex and Claude Code.

- `ai-workflow`: which model and thinking level each kind of task gets. Keep it in sync with `aiRecommendations` in `portfolio-next/src/content/portfolio.ts`.
- `ai-slop-code-review`: audit student codebases for AI-slop and outdated-template signals.

`docs/how-to-write-skills.md` collects how both tools load and run skills.

## Install

Codex reads `~/.agents/skills`; Claude Code reads `~/.claude/skills`. Link each skill into both:

```sh
for skill in skills/*/; do
  name=$(basename "$skill")
  ln -sfn "$PWD/skills/$name" ~/.agents/skills/"$name"
  ln -sfn ../../.agents/skills/"$name" ~/.claude/skills/"$name"
done
```
