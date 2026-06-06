# Caveman (local agent tooling)

[Caveman](https://github.com/JuliusBrussee/caveman) compresses agent chat (~65–75% fewer output tokens) while keeping technical detail exact. This fork installs it locally under `.agents/skills/`; those paths are **gitignored** (not part of the contest submission).

## Default in this repo

Always-on rule [`.cursor/rules/caveman.mdc`](../rules/caveman.mdc): agents reply in **full** caveman unless you say **stop caveman** or **normal mode**. Switch intensity with `/caveman lite|full|ultra`.

| Skill | Trigger | Use |
|-------|---------|-----|
| caveman | `/caveman` | Terse replies (default here) |
| caveman-commit | `/caveman-commit` | Conventional Commits, ≤50 char subject |
| caveman-review | `/caveman-review` | One-line PR comments |
| caveman-compress | `/caveman-compress <file>` | Shrink memory `.md` files |
| cavecrew | delegate | Subagents with compressed tool results |
| caveman-help | `/caveman-help` | Cheat sheet |

Code, commits, and PR bodies stay normal prose per skill boundaries.

## Reinstall

After clone, install Caveman into the repo (exact command depends on your Caveman installer; upstream docs: [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)). Expect `.agents/skills/caveman*` and `skills-lock.json` to appear locally and stay untracked.
