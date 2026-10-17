# Review 2895 — 0339be451 — test_move :1014 rock-phasing in travel + domove

- SHA: `0339be451` (cliff, writer port: 1 arm at 2 split-sites)
- D-entry: D-4054; Ledger: hack.c (`test_move partial`, 3 JS
  sites, omit rewritten to 3 named items)
- `js/` diff: `js/cmd.js` +14/−4 (travel arm + phaseRock + 3
  gates); new `scripts/travel-rock-phase-xorn.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): the :1014 `Passes_walls &&
may_passwall` first-branch in C order at both split-sites (travel
BFS edge + domove inline); probe extcmd-Samurai-51257046 moves
493→862. Delivers exactly that: reordered else-if chain, one
`phaseRock` const gating tunnels/autodig/bump, doc omits updated
(the shipped arm removed from both lists). Promise = diff.

## Inventory

- `travel_test_move` rock chain — cmd.js:3837: :1014 first,
  Underwater/IRONBARS/tunnels else-if. C: hack.c:1011–1048.
- `domove` `phaseRock` — cmd.js:6943 + 3 `!phaseRock` gates
  (tunnels, autodig, bump). C: same :1014 via domove_core :2843.
- `may_passwall` added to the existing mon.js import — LIVE
  export (mon.js:197), faithful to C :931–936 (STWALL +
  W_NONPASSWALL veto; wall_info|flags alias OR per D-0865).
  Correctly chosen over the teleport.js:297 D-1100 cycle-forced
  clone (untouched).

## C ↔ JS fidelity

C (hack.c:1011–1048, line-numbered read):

```c
if (IS_OBSTRUCTED(tmpr->typ) || tmpr->typ == IRONBARS) {  /* :1011 */
    if (Blind && mode == DO_MOVE)                         /* :1012 */
        feel_location(x, y);
    if (Passes_walls && may_passwall(x, y)) {             /* :1014 */
        ; /* do nothing */
    } else if (Underwater) {                              /* :1016 */
        if (mode == DO_MOVE)
            There("is an obstacle there.");
        return FALSE;                                     /* :1023 */
    } else if (tmpr->typ == IRONBARS) {                   /* :1024 */
        ... chew arm (DO_MOVE-only) ...                   /* :1025-1031 */
        if (!(Passes_walls || passes_bars(gy.youmonst.data))) {
            ...
            return FALSE;                                 /* :1035 */
        }
    } else if (tunnels(gy.youmonst.data)                  /* :1037 */
               && !needspick(gy.youmonst.data)) {
        /* Eat the rock. */                               /* :1039 */
        ...
    } else if (flags.autodig && ...) {                    /* :1042 */
```

Travel edge matches arm-for-arm: :1014 `;` pass-through (JS
falls through to squeeze/trap/doorway-out/boulder + `return
true`, like C past :1016 — verified in the full body) →
Underwater block (TEST_TRAV has no pline, JS bare `return false`)
→ IRONBARS `!(Passes_walls||passes_bars)` (the :1025–1031 chew
arm is DO_MOVE-only, correctly absent) → tunnels&&!needspick
pass (`still_chewing` DO_MOVE-only, correctly absent). The old
order (Underwater first) wrongly blocked phasing underwater
heroes; fixed.
Domove: `phaseRock` = (OBSTRUCTED||BARS) && Passes_walls_prop()
&& may_passwall — C's :1014 predicate; gates exactly the arms
C's first-branch skips (chew/tunnels :1037–1041, autodig
:1042–1047, bump :1048+). Blind `feel_location` (:1012–1013)
stays ungated, before phasing — C order. `Passes_walls_prop` is
the house H/E union (no B term — correct, Passes_walls has
none). No RNG in the span; none added. The Xorn-travel causation
(BFS detour → legitimate sighting → memorized gold) is measured,
not inferred (temp-C fobj+fmon dump, reverted; JS path quoted;
C's SW rock-phase path quoted).

## Hallucinations / overclaim

None — the D-log's candor is the story: it reports `VERIFY:
FAIL solely on hidden-attribution` (3 owned sessions unchanged)
rather than relabeling it, with movement carried by the rescore
and both precedents cited (D-3940 separate-cause unchanged,
D-4015 owner-null rescore). The 3 unchanged are genuinely other
arms (ooze-under-door ×2, Sokoban-resist ×1 — the Named (1)
closed-door set).

## Density

Cliff writer with rescore movement on the probe (owner-null, so
--fn attribution is definitionally vacuous for it). `test_move`
stays `partial` with all three split-sites listed and the omit
rewritten to the 3 named items — accurate ledger. No unreached
work: 493→862, RNG-full.

## Verification

Re-measure owned set:

```text
verify test_move: baseline 0339be451~1 — 3 session(s) blocked on it
  Rogue-51256003: still test_move at step 466 (ooze-door)
  Knight-610057: still test_move at step 452 (ooze-door)
  Samurai-620029: still test_move at step 651 (Sokoban)
verify test_move: 0 PASS, 0 moved past, 3 unchanged, 0 worse
```

Same 3 sessions at the same steps, including the quoted
toplines. Re-measure probe: `show scen-extcmd-Samurai-51257046`
→ FAIL@862 (owner null), rngM 5732/5732 FULL, scrM 1143/1144 —
the claimed movement, exact counts. No new module edge (name
added to existing mon.js import). No FORCE/DIAG/seed strings.
Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
