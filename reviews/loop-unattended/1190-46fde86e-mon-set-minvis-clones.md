# Review 1190 — 46fde86e — mon_set_minvis clones retired (D-2224)

Metadata: SHA `46fde86e`, `js/mon.js` + `js/muse.js` +
`js/worn.js` (docs only), D-2224. Queue row
`worn.c` mon_set_minvis (named data.md:606-607, 0
blocked) — retire the two local clones, import the
canonical export.

Intent vs deliverable: subject promises clone
retirement. Diff deletes both locals, re-points the
two callers, updates the worn.js doc comment. Nothing
else.

Inventory: two local functions deleted
(`mon_set_minvis` in muse.js, `mon_set_minvis_eat` in
mon.js); two import lists extended within
pre-existing static `worn.js` edges
(`imports.mjs --can` → ALREADY on both). Required
`sym.mjs` output: `mon_set_minvis js/worn.js:612
sync`; `mon_set_minvis_eat NOT FOUND in js/** (no
export, no local function/const)` — removal
complete, zero remaining references (grep confirms:
only the canonical import/call sites in zap.js,
muse.js, mcastu.js remain).

**C ↔ JS fidelity**: checked against pinned
`worn.c:473–485` (csym range). Canonical export
`worn.js:612–620` is arm-for-arm: `perminvis =
!cursed`, `invis_blkd` gate, `newsym(mx, my)`,
wormno `see_wsegs` ✓. The deleted clones were
divergent subsets — both dropped the newsym +
see_wsegs tail — so re-pointing the muse use_misc
(`:3041`) and mon_givit stalker callers ADDS the C
repaint at those sites: a convergence, not a
regression (C callers reach the same full body).
Draw-free both sides; no RNG surface. No STUB, no
new clone, no OMIT left in this family (map lines
updated).

Hallucinations / overclaim: none. D-log claims no
corpus PASS.

Density: §2b right-size — one clone-retirement
cluster; Must-fix-style single item alone.

Verification: re-measured —
`verify mon_set_minvis --base 46fde86e~1` → 0
blocked at baseline and working scoreboard +
vacuous warning. Row cited 0 blocks; honest. Rule
#2 clean; no banned patterns. Green/strict/cohort
claimed; HEAD re-confirmation with the cadence run.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
