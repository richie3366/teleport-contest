# Review 2664 — a885aeb77 — scroll create-monster appear msg (D-3800)

Metadata. SHA `a885aeb77` (2026-10-11), D-3800, parent
`1adc2a3cf`. js diff: `js/muse.js` +5/−0 — `if (mon)
await makemon_appear_msg(...)` in the
MUSE_SCR_CREATE_MONSTER arm. Works cliffs row-2
awaken_soldiers (95211 328→600).

## Intent vs deliverable

Promise: 95211@328 — JS slice 328 equals C-328..332
concatenated draw-for-draw (134+134+1721+3443+13859);
JS skipped the four «suddenly appears» More-pages
and bundled five C-steps into one, showing created
glyphs a step early; the −4 shift snowballs into the
step-704 RNG fork. The scroll arm called sync
makemon but never the appear message (the wand-arm
sibling 5 lines up has it). Diff adds exactly the
one line. Promise and diff match.

## Inventory

Changed JS (1 writer call):

- use_defensive MUSE_SCR_CREATE_MONSTER —
  `js/muse.js:2685`. C: `muse.c:998–1034` (arm
  read in full) + `makemon.c:1471–1500` (appear
  tail read in full).

## C ↔ JS fidelity

**C-exact wiring.** C's scroll arm calls
`makemon(pm, cc, NO_MM_FLAGS)` `:1020`, and C's
makemon prints the appear Norep in-body `:1472–
1500` (!in_mklev, !MM_NOMSG, gated by
`(canseemon && AP-nothing/monster) || sensemon`).
JS makemon is sync, so callers wire
`makemon_appear_msg` (LIVE async export,
`js/makemon.js:3838`) — the established D-0559
pattern, already imported here. The gate was
verified TRUE pre-ship for the sensed summons
(temp diag, reverted) with one later unsensed
summon correctly silent. No signature change; all
C callers inherit. One D-log inaccuracy (prose,
not code): the "pre-existing" note claims the
scroll known-check reads `(canseemon||sensemon)`
"where C reads canspotmon" — but `canspotmon` IS
`#define canspotmon(mon) (canseemon(mon) ||
sensemon(mon))` (`display.h:129`, verified), so
the line is already C-exact and no gap exists.
No symbol deleted or re-pointed, so no sym.mjs
paste is owed.

## Hallucinations / overclaim

None in the code claim. The bundled-steps diagnosis
(slice-concatenation census + turn-aligned glyphs +
temp stack-trace naming the scroll arm, wand arm
provably silent) is measured. The canspotmon note
above under-claims; it defers nothing real.

## Density

Cliff-phase §2b: one row-2 writer line. Row-1
randomize falsifier re-verified unfired live.

## Verification

D-log Verify: focused 0/1 → 1/1; awaken_soldiers
1 moved (328 → toss_up@600, +272); reach 24/24 +
22/22; gates PASS.

Re-measured by this audit (`verify
awaken_soldiers,use_defensive --base a885aeb77~1
--reach-all`, re-run on HEAD code):

```text
verify awaken_soldiers: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Caveman-95211: PASS
reach use_defensive: 22 PASS, 0 regressed → REACH-OK (writer, vacuous as logged)
```

95211 reads PASS (not "moved") because D-3801 later
in this window carried it to PASS — the monotonic
scoreboard chain (1045 → 1045 here, 0 lost; +95211
lands in 3b2e6a541) confirms this SHA moved it and
regressed nothing.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
