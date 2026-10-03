# Review 2337 — 355829ea2 — throwit landing arms + bhit iron-ball range limit

**SHA:** `355829ea2` — "throw-landing closure: throwit pick-snatch + landing arms, bhit iron-ball range limit (D-3382)."
**Scope:** js/dothrow.js +30/−9, js/zap.js +37/−3. Cluster of 2 functions — per-function Inventory + fidelity below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: throwit's four landing gaps (splash sound, shk pick-snatch, !mon ship gate, vision tail) + bhit's THROWN HEAVY_IRON_BALL range limit, closing both ledger rows to ported. Delivered: the throwit half is exact and reachable on both flight paths; the bhit arm is exact code in C-home but **dead on every JS path** (see Actionable 1) while the Symptom sells the behavior fix and the ledger flips to ported, burying the gap.

## Inventory (per function)

| # | JS change | Kind | C locus |
|---|-----------|------|---------|
| T1 | splash Soundeffect js/dothrow.js:2558 | missing line of live fn | dothrow.c:1793–1801 (Soundeffect :1799; D-log cites :1786–1794 — drift, see fidelity) |
| T2 | shk pick-snatch js/dothrow.js:2582–2593 | missing arm of live fn | dothrow.c:1809–1817 |
| T3 | ship !hitmon gate js/dothrow.js:2606 | missing predicate of live fn | dothrow.c:1819–1822 |
| T4 | vision tail js/dothrow.js:2639–2640 | missing tail of live fn | dothrow.c:1843–1844 |
| B1 | iron-ball range limit js/zap.js:6464–6493 | missing arm of live fn | zap.c:4095–4119 (guard :4096–4097) |

`sym.mjs`: `throwit` async; `bhit` local (C-home static shape); `test_move` async awaited ✓; `sobj_at`/`t_at`/`The`/`an`/`distant_name`/`xname`/`Monnam`/`mpickobj`/`check_shop_obj`/`snuff_candle`/`ship_object`/`obj_no_longer_held`/`obj_sheds_light` all LIVE; `is_pit`/`is_hole` canonical const.js imports (mklev clones not used); `se_splash` generated const 164; `Soundeffect` sync void; `is_pick` added to the objects edge. `let r = range|0` (zap.js:6169) is the loop var C `range`.

## C ↔ JS fidelity

**throwit — all four arms Confirm.** Splash: `!Deaf && !Underwater` + pool/(lava&&!flammable) gate with `Soundeffect(se_splash,50)` before the Splash!/Plop! pline — C order exact (dynamic sndprocs/seffects imports; no static edge, no TDZ). Snatch: `hitmon && isshk && is_pick` → cansee pline `"%s snatches up %s."` verbatim → `(ushops||unpaid)` check_shop_obj → mpickobj → return — C :1809–1816 exact; `u.ushops` is a string ('' when not shopping, shk.js:674/687), so bare-truthiness ≡ the `[0]` idiom — no divergence, and it matches the nearest sibling (the :1836 post-place site, D-0994). The crux — **hitmon ≡ C mon incl. the miss case** — verified: JS keeps hitmon set after `throwit_mon_hit` returns false (:2500–2508, x/y moved onto it), exactly like C keeping `mon` past the miss; bhit/inline/ustuck/boomhit sources mirror C :1574/:1604/:1674. Ship gate `!hitmon && await ship_object(...)` short-circuits like C :1819. Vision tail `obj_sheds_light → vision_full_recalc=1` matches :1843–1844 (apply.js:3437 precedent for the flag write). All four execute on both flight paths (landing code is shared past :2495). Citations: snatch/ship/vision ranges exact; the splash cite (:1786–1794 in D-log + JS comment) ends before the Soundeffect line (:1799; block is :1793–1801) — docs-only drift, ride-along in Actionable 1.

**bhit B1 — code exact, reachability broken (QUALITY-RISK, see Actionable 1).** The arm itself is C-faithful: gate `THROWN_WEAPON && r>0 && otyp==HEAVY_IRON_BALL` (+null guard); boulder `sobj_at` → `"%s hits %s."` with `The(distant_name(obj,xname))`/`an(xname)` → r=0; uball `test_move(x-ddx,y-ddy,…)` (async, awaited) → `"jerks to an abrupt halt."` → r=0; Sokoban short-circuit before `t_at` (trap.js:582 idiom) → pit/hole → r=0, no message; placed between the sink break and `point_blank=false` outside the non-wand if, like C. **But**: C fires this arm for NON-tethered balls via dothrow.c:1674 (`tethered ? THROWN_TETHERED : THROWN_WEAPON`), and JS never routes a non-tethered throw through bhit — the inline fly (:2444–2482) has no boulder/uball/Sokoban checks. Exhaustive JS caller audit: throwit-tether passes THROWN_TETHERED (guard false — correctly, per C), throw_gold passes THROWN_WEAPON but obj is gold (guard false), KICKED/ZAPPED excluded, apply FLASHED/INVIS beams unwired. **The arm executes on no reachable path; non-tethered iron balls still fly through boulders** — the exact listed symptom. The D-log names the inline-fly ("pre-existing"), but the ledger flips bhit partial→ported deleting the only record of the stops, so the picker will never revisit. Exact body + unwired C caller + symptom claimed fixed = the D-2393/D-2395 shape.

Callers (`--callers`): throwit artifact.c:2029/dothrow.c:270/polyself.c:1475 all match the D-log (no signature change; fuller landing executes). bhit's 6 real sites (apply.c:63/:1096, dokick.c:736, dothrow.c:1674/:2706, zap.c:3448) match; :1674-non-tether is the miss above.

Quoted C (the landing sequence + the iron-ball block + the fateful call):

```c
/* dothrow.c:1793–1801 */ if (!Deaf && !Underwater) {
        if (is_pool(...) || (is_lava(...) && !is_flammable(obj))) {
            Soundeffect(se_splash, 50);
            pline((weight(obj) > WT_SPLASH_THRESHOLD) ? "Splash!" : "Plop!"); } }
/* dothrow.c:1808–1822 */ obj_no_longer_held(obj);
    if (mon && mon->isshk && is_pick(obj)) {
        if (cansee(...)) pline("%s snatches up %s.", Monnam(mon), the(xname(obj)));
        if (*u.ushops || obj->unpaid) check_shop_obj(obj, ..., FALSE);
        (void) mpickobj(mon, obj); throwit_return(TRUE); return; }
    (void) snuff_candle(obj);
    if (!mon && ship_object(obj, ..., FALSE)) { throwit_return(TRUE); return; }
/* dothrow.c:1843–1844 */ if (obj_sheds_light(obj)) gv.vision_full_recalc = 1;
/* dothrow.c:1674–1677 */ mon = bhit(u.dx, u.dy, range,
        tethered_weapon ? THROWN_TETHERED_WEAPON : THROWN_WEAPON, 0, 0, &obj);
/* zap.c:4095–4119 */    /* limit range of ball so hero won't make an invalid move */
    if (weapon == THROWN_WEAPON && range > 0 && obj->otyp == HEAVY_IRON_BALL) {
        if ((bobj = sobj_at(BOULDER, x, y)) != 0) {
            if (cansee(x, y)) pline("%s hits %s.", The(distant_name(obj, xname)),
                an(xname(bobj))); range = 0;
        } else if (obj == uball) {
            if (!test_move(x - ddx, y - ddy, ddx, ddy, TEST_MOVE)) {
                if (cansee(x, y)) pline("%s jerks to an abrupt halt.",
                    The(distant_name(obj, xname))); range = 0;
            } else if (Sokoban && (t = t_at(x, y)) != 0
                       && (is_pit(t->ttyp) || is_hole(t->ttyp))) { range = 0; } } }
```

Exhaustive JS bhit-caller audit (why B1 is dead):

| JS site | weapon arg | guard result |
|---|---|---|
| dothrow.js:2436 throwit tether | THROWN_TETHERED_WEAPON | false (correct per C) |
| dothrow.js:965 throw_gold | THROWN_WEAPON, obj=gold | false (otyp) |
| dokick.js:1482 | KICKED_WEAPON | false |
| zap.js:7173 | ZAPPED_WAND | false |
| apply FLASHED/INVIS beams | — (unwired, comment-only) | n/a |
| dothrow.js:2444 inline fly (non-tether) | never calls bhit | **arm missed where C fires** |

## Hallucinations / overclaim

Yes — one, material: the Symptom ("a thrown iron ball flew through boulders and past the hero's follow range") is presented as fixed, but no reachable throw exercises the new arm. The D-log's "pre-existing named omit" disclosure is honest prose, yet paired with a ported-flip it buries rather than queues the gap. Saying so explicitly per the Method.

## Density

Breadth phase, §2b: 2 functions, two C files but one caller/callee closure (throwit→bhit flight/landing; the CURRENT Next-cluster row named exactly this closure). Each function has own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry; ≤10 fns, no Must-fix bundled. Per-function verdicts: throwit whole ✓; bhit arm-exact-but-unreached ✗. **SHA verdict is the worst: QUALITY-RISK.**

## Verification

Re-measured (`verify throwit,bhit --base 355829ea2~1 --reach-all`): throwit 0 blocked + reach 2/2 REACH-OK; bhit 0 blocked + smoke 24/24 REACH-OK — both match the D-log. (REACH cannot catch dead code: nothing reaches the arm because nothing can.) Verbatim:

```text
reach throwit: 2 baseline-PASS session(s) reach it (2 run, 1.4s): 2 PASS, 0 regressed → REACH-OK
smoke bhit: no RNG-tagged reach; fixed smoke spread (24 run, 11.1s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward hits. `imports.mjs --rulecheck` for scored `js/` runs once at iteration end — see the audit overlay note in the journal; this SHA adds no static scored-edge risk (dynamic sndprocs/seffects/light/dokick imports + const/hack/objects edge extensions).

## Actionable C-wrongs

1. **bhit iron-ball stops unreachable on all paths (unwired C caller dothrow.c:1674 non-tethered case).** C zap.c:4095–4119 fires for THROWN_WEAPON (non-tethered) balls; JS routes non-tethered throws through the inline fly (js/dothrow.js:2444–2482), which has no boulder/uball/Sokoban stops, while bhit's only THROWN_WEAPON caller is throw_gold (gold otyp — guard always false). Fix in one iter (small reading): port the three stops (boulder-hit msg + r=0; chained-uball test_move halt; Sokoban pit/hole stop) into the inline loop in C order, reusing the live zap.js arm's callees; or route non-tether through bhit if its THROWN gaps are closable in the same iter. Ride-along: correct the splash cites (`:1786–1794` → `:1793–1801`) in the D-3382 D-log + js/dothrow.js:2546 comment. Do NOT reflip the ledger until a thrown ball observably stops. Source: reviews/loop-unattended/2337-355829ea2-… (Must-fix — prepended).

Verdict: **QUALITY-RISK**
