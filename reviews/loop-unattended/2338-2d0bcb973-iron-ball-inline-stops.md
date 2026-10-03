# Review 2338 — 2d0bcb973 — bhit iron-ball stops into throwit inline fly

**SHA:** `2d0bcb973` — "bhit iron-ball stops wired into throwit inline fly (review 2337 C-wrong 1) (D-3383)."
**Scope:** js/dothrow.js +38/−9 (three stops in the inline fly + 3 import names + splash-cite fix). Must-fix single.
**Prior reviews closed:** 2337 C-wrong 1 (stamped **Addressed:** D-3383 `2d0bcb9` in this commit).

## Intent vs deliverable

Promise: close 2337.1 by porting C zap.c:4095–4119's three stops (boulder msg, chained-uball test_move halt, Sokoban pit/hole) into the non-tethered inline fly in C order after the monster stop, with the 2337 splash-cite ride-along. Diff delivers exactly that: one guarded block at js/dothrow.js:2489–2512, `test_move`/`TEST_MOVE`/`distant_name` added to existing edges, comment `:1786–1794` → `:1793–1801` plus the D-3382 C-locus line. No drift.

## Inventory

| # | JS change | Kind | C locus |
|---|-----------|------|---------|
| 1 | inline stops js/dothrow.js:2489–2512 | unwired C caller now wired | zap.c:4095–4119 (guard :4096–4097), via dothrow.c:1674 non-tether site |
| 2 | splash cite fix :2482-comment/:2578 | docs-only ride-along | dothrow.c:1793–1801 |

No symbol deleted or re-pointed (additions only), so no re-point sym is owed. Added-import sym: `distant_name js/objnam.js:1174 sync`; `test_move js/hack.js:454 ASYNC` (awaited ✓); `TEST_MOVE js/const.js:634 export const`; `sobj_at js/mkobj.js:3321 sync` (pre-imported). `BOULDER`/`HEAVY_IRON_BALL` are the file's `objectNames.indexOf` consts (:150/:152, zap.js:456 pattern). All callees LIVE, no clones, no stubs.

## C ↔ JS fidelity

**Confirm, branch-by-branch against C zap.c:4096–4119 (read :4010–4125) and the 2337-verified bhit-home copy (js/zap.js:6469–6493).** Guard: C `weapon==THROWN_WEAPON && range>0 && otyp==HEAVY_IRON_BALL`; JS drops the weapon conjunct because the block sits in the `else` of `if (tethered_weapon)` (:2433/:2444) — the non-tethered path only, i.e. exactly C's `:1674` THROWN_WEAPON arm. `range` is C range: both loops are `while (range-- > 0)` (C :3871; JS :2446; bhit-home `while (r-- > 0)`), so `range>0` at block time is the same post-decrement value C tests. Boulder: `sobj_at(BOULDER,x,y)` → cansee-gated `"%s hits %s."` with `The(distant_name(obj,xname))/an(xname(bobj))` verbatim → `range=0`. uball: `obj===u.uball` (`const u = game.u` at throwit head :2309; bhit-home's `game.u?.uball` is the same object) → `!await test_move(x-dx,y-dy,dx,dy,TEST_MOVE)` → halt pline verbatim → `range=0`, else Sokoban short-circuit before `t_at` → pit/hole → silent `range=0`. Both plines and both C comments (`nb: it didn't hit…`, `hero falls into the trap…`) match C text. Body is line-identical to the bhit-home copy modulo `range`/`r`, `u.uball`/`game.u?.uball`, and the `!!` wrapper — the D-log "line-mirror" claim holds.

Order: monster break (:2478–2481) precedes the stops, matching C's `goto bhit_done` (:4028) skipping :4096–4119. `range=0` exits the loop and lands at the current x/y, as C's does via bhitpos. C's tethered rewrite (`weapon=THROWN_WEAPON` at :3866) is mirrored by JS bhit (:6203), so the tethered path already fired the bhit-home arm — this SHA closes the non-tethered half only, which is all 2337.1 asked. (Correction to my 2337 caller table: its "tether guard false — correctly, per C" row was wrong; the guard is true post-rewrite on both sides. No behavior gap either way.)

Pre-existing, out of scope: the inline loop breaks on `!ZAP_POS||closed` before the monster stop while C checks the monster first (:4021–4029 vs :4076) — D-0990-era context lines, unverified for reachability (monster on a closed-door cell), not queued from this review.

```c
/* zap.c:4095–4119 */ if (weapon == THROWN_WEAPON && range > 0
        && obj->otyp == HEAVY_IRON_BALL) {
        if ((bobj = sobj_at(BOULDER, x, y)) != 0) {
            if (cansee(x, y)) pline("%s hits %s.", The(distant_name(obj, xname)),
                an(xname(bobj))); range = 0;
        } else if (obj == uball) { ... test_move ... Sokoban ... } }
```

## Hallucinations / overclaim

None. The D-log's honesty note ("REACH cannot prove the arm fires — no corpus throw exercises it") is correct and the re-verify below shows exactly that shape (vacuous + REACH-OK). "Pre-existing inline-fly gaps (WEB/shade/mimic-object)" disclosure matches the js/zap.js:6158 doc.

## Density

Must-fix single, ships alone ✓ — exactly the 2337-prescribed small reading (three stops + cite ride-along, no Must-fix bundled, no second file). One `Ledger:` entry pair (throwit/bhit ported — the D-3382 flip 2337 called premature is now substantiated), one Verify bullet.

## Verification

Re-measured (`verify throwit,bhit --base 2d0bcb973~1 --reach-all`): 0 blocked + vacuous note for both, throwit reach 2/2 REACH-OK, bhit smoke 24/24 REACH-OK — matches the D-log line-for-line, 0 regressed. Verbatim:

```text
reach throwit: 2 baseline-PASS session(s) reach it (2 run, 1.4s): 2 PASS, 0 regressed → REACH-OK
smoke bhit: no RNG-tagged reach; fixed smoke spread (24 run, 10.8s): 24 PASS, 0 regressed → REACH-OK
``` Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits (sole FORCE-pattern hit is the `WT_TOOMUCH_DIAGONAL` const in context). Rule #2: `imports.mjs --rulecheck` → "Rule #2 clean" on scored `js/` (run once this iteration, cited by all eight reviews).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
