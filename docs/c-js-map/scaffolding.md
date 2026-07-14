# C→JS map — Scaffolding retirement

Parent index: `docs/C-JS-MAP.md`. Do not load other map sections
unless this subsystem is in scope.

## Scaffolding retirement

`js/fastforward.js` contains only empty exported hooks. No RNG replay entries
remain. Next cleanup is to remove callers/imports and then delete the empty
module when that can be done without changing behavior.

Live scores, green anchors, objectives, and commands belong only in
`PROGRESS.md`.
