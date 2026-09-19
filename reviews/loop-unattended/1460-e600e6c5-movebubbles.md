# Review 1460 — e600e6c5 — `mkmaze.c` movebubbles whole-body port (D-2501)

Metadata: SHA `e600e6c5`, `js/mklev.js` +88/−42, `js/ball.js` +52/−0.
C `mkmaze.c:1537–1685` (`movebubbles`, 149 lines) + `ball.c:181–189`
(`check_restriction`), `:222–254` (covet pair), `placebc_core :120–143`.
D-log: D-2501.

## Intent vs deliverable

Promise: full C-order restart — portal setup, vision recalc, water cons
pickup + fill, air repaint + edge clouds, alternate-direction drift,
ball&chain covet lift, full-recalc flag — plus the `ball.c` covet pair.
Diff delivers all of it. Promise = deliverable.

## Inventory

- Changed mklev.js: `vision_recalc(2)`, `bcpin`, Punished covet call,
  pre-toggle scan direction, cons/impossible arms, per-cell
  `recalc_block_point`, edge-cloud arm, toggle + drift, lift,
  `vision_full_recalc`.
- New ball.js: module-local `check_restriction` (correct shape for C
  `staticfn`; `sym.mjs` flags it "NOT EXPORTED + 1 local" — single port,
  not drift), `unplacebc_and_covet_placebc`, `lift_covet_and_placebc`.
- `sym.mjs` (required): both covet functions exported ASYNC and awaited
  at the call sites ✓. Nothing deleted or re-pointed.

## C ↔ JS fidelity

`movebubbles` ≡ `:1537–1685`: portal-first-then-`vision_recalc(2)` ✓;
`hero_bubble = NULL` before the scan (last-overlap-wins preserved) ✓;
water gate `Is_waterlevel` ✓; `Punished ≡ uball != 0` (`youprop.h:77`)
✓; scan uses the **pre-toggle** direction (`upOld` captured; C scans
with `up` at `:1569` then flips at `:1673`) and drift uses the new ✓;
`cons != null → panic` rendered as `impossible` (no live JS panic
export — named) ✓; bitmask cell walk with `isok → impossible+continue`
✓; obj/mon/hero/trap cons arms in C order (mon: worm segs →
`remove_worm` else `remove_monster`, `newsym`, park at 0,0,
`MON_BUBBLEMOVE` ✓; trap stored not removed ✓); fill `water_pos` +
`block_point` ✓. Air arm: `air_pos` + **per-cell**
`recalc_block_point` (was missing) + `xedge/yedge` perimeter with
`rn2(xedge ? 3 : 5)` → CLOUD + `block_point` ✓. Drift:
`up = !up`, `rx = rn2(3)` then `ry = rn2(3)` per bubble (order ✓),
`mv_bubble(b, dx+1-(!dx?rx:(rx?1:0)), dy+1-(!dy?ry:(ry?1:0)), FALSE)` ✓.
Lift gated water+Punished ✓; `vision_full_recalc = 1` tail ✓.

Covet pair: `rnd(400)` pin, `override_restriction = -1`
(`hack.h:110`) ✓. The `bcrestriction = 0` placement differs textually
(JS clears in `lift_covet_and_placebc` after `placebc()`; C clears at
the end of `placebc_core :143`) —observably identical: neither core
reads the flag mid-call, same sequence point ✓. JS `unplacebc()`
standing in for `unplacebc_core()` is covered by its pre-existing
"bcrestriction impossible()" named omission (the check it lacks is what
lets it run post-pin like the core) — disclosed in the comment.

Callee closure: LIVE (`set_wportal`, `vision_recalc`, `block_point`,
`recalc_block_point`, `remove_worm`, `remove_monster`, `newsym`,
`mv_bubble`, `impossible`) or C-matched locals; named: panic→impossible,
BREADCRUMBS variants, `end.c:894` override caller. No STUB in a live arm.
Pre-existing (untouched here): object pickup via `obj_extract_self`
rather than `remove_object` — out of this commit's scope, noted only.

## Hallucinations / overclaim

None. The D-log's "`bcrestriction` holds the C static, init 0" verified
against `ball.c:17`.

## Density

One 149-line C function + two small helpers, two files, +140/−42.
Right-sized.

## Verification

Re-ran here (`--base e600e6c5~1 --reach-all`):

```text
verify movebubbles: baseline e600e6c5~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke movebubbles: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
