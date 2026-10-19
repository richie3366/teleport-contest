# Review 2906 — 00c3dc399 — litroom: vision_recalc(2) update-loop burn under Hallu

- SHA: `00c3dc399` (cliff, writer port: one call before `vision_recalc(2)`)
- D-entry: D-4065; Ledger: read.c (`litroom`, D-4065)
- `js/` diff: `js/read.js` +7/−1 (import + Hallu-gated call)

## Intent vs deliverable

Promise: C `vision_recalc(2)`'s update loop newsyms every previously
IN_SIGHT spot. Under Hallucination, `display_warning` / random-monster
glyphs draw from the display RNG there. JS `vision_recalc(2)` skips that
loop, so a scroll of light shifted the hallucinated glyphs (doread ×3).
The diff calls `vision_off_newsym_gbuf({ useLiveViz: true })` right
before `vision_recalc(2)`, but only when `Hallucination()`. Promise =
diff. The Hallu gate is the existing D-0852 convention (docrt), not new
here.

## Inventory

- `litroom` `!Blind` arm — read.js:539. C: read.c litroom
  :2490–2635 (`vision_recalc(2)` at :2612).
- `vision_off_newsym_gbuf` — vision.js:1371 (pre-existing; "C
  vision_recalc(2) main update loop only").
- `Hallucination` — display.js:1374 (youprop.h:120 reader; read.js
  imports this one, not do_name.js's).

## C ↔ JS fidelity

C (csym read.c litroom, the forced-redraw tail):

```c
    if (!Blind) {
        vision_recalc(2);           /* :2612 */
        /* replace ball&chain */
        if (Punished) ...
    }
    gv.vision_full_recalc = 1; /* delayed vision recalculation */
```

JS vision.js:1101–1138: `control === 2` clears the live viz, newsyms
only the hero, and then **skips** the main update loop
(`old_array && control !== 2`, :1230). The comment at :1223–1228 says
the loop is replayed at call sites via `vision_off_newsym_gbuf`. So
this commit adds one more call-site replay:

| C `vision_recalc(2)` site | JS compensation |
|---|---|
| do.c:1631 (goto_level leave) | do.js:1845 ✔ |
| display.c:1740 (docrt) | display.js:7236 ✔ (Hallu) |
| mhitu.c:1376 (engulf) | mhitu.js:1788 ✔ |
| mkmaze.c:1557 | mklev.js:18691 ✔ |
| read.c:2612 (litroom) | read.js:539 ✔ **this SHA** (Hallu) |
| trap.c:5121 (unsee old position) | trap.js:6735 ✘ |
| options.c:5371 | options.js:11030/11201 ✘ |
| save.c:138 | (save path) ✘ |

The new call is the same shape as the docrt one. The non-Hallu gate is
not C: C always runs the loop. But without Hallucination the loop draws
no RNG, and the D-0852 note says the JS `!cansee` memory arms regress
PASS screens when the loop runs unconditionally. So the gate keeps RNG
right while hiding a separate JS memory-arm divergence. That is debt,
not this commit's C-wrong.

## Hallucinations / overclaim

None. The D-log names "other JS vision_recalc(2) sites without the
burn were not audited" (named (2)), and the table above confirms 3
uncompensated sites. The verify "js-throw at step 522" mislabel is
called out honestly (owner-null screen row).

## Density

A cliff writer with movement. One `Ledger:` entry. The structural debt
is that the update loop lives at the call sites, not in `vision_recalc`.
It predates this SHA.

## Verification

Re-measure (`--base 00c3dc399~1 --no-reach`, HEAD code):

```text
verify doread: 5 blocked
  scen-hallu-Valkyrie-51255008: PASS
  scen-hallu-Wizard-51450068: moved → auto_describe at step 845 (was 565)
  scen-sweep-Wizard-587219: PASS          (D-4065 → s522, D-4068 → PASS)
  scen-sweep-Caveman-50055067 / Rogue-620093: still doread (confuse-monster, named)
verify doread: 2 PASS, 1 moved past, 2 unchanged, 0 worse → PROGRESS
verify litroom: vacuous (no litroom-owned row)
```

This matches the D-log (1 PASS + 2 moved). The later D-4068 finished
Wizard-587219 at HEAD. There were no FORCE/DIAG/seed strings, and the
rulecheck is clean.

## Actionable C-wrongs

1. (debt, no session cited) trap.c:5121 / options.c:5371 `vision_recalc(2)`
   sites have no update-loop replay in JS (trap.js:6735,
   options.js:11030/11201). The Hallu RNG burn is missing there too.
   Queue only when a session names it (§10.19).

Verdict: **ACCEPT-WITH-DEBT**
