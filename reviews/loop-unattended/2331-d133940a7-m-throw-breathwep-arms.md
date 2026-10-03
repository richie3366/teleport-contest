# Review 2331 — d133940a7 — m_throw misfire pline + dknown arms, breathwep_name Hallucination arm

**SHA:** `d133940a7` — "`mthrowu.c` m_throw misfire pline + dknown arms, breathwep_name Hallucination arm (D-3376)."
**Scope:** js/mthrowu.js +23/−5 (2 import names + 2 arms + doc). No clone deleted — no re-point sym required; sym below classifies the arm callees.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: the two ledger-listed `m_throw` gaps (clear_dknown :619–620, misfire pline :622–631) plus the `breathwep_name` Hallucination arm, closing both ledger partials. Diff delivers exactly that, with `Ledger:` flipping both rows partial→ported and the omit strings removed. No drift.

## Inventory

| # | JS change | Kind | C locus |
|---|-----------|------|---------|
| 1 | m_throw `!canseemon→clear_dknown` js/mthrowu.js:1176 | missing arm of live fn | mthrowu.c:619–620 (verified via sed; csym range for m_throw is the whole 572–845 body) |
| 2 | m_throw misfire pline js/mthrowu.js:1181–1185 | missing arm of live fn | mthrowu.c:622–631 |
| 3 | breathwep_name Hallucination arm js/mthrowu.js:385 | missing arm of live fn | mthrowu.c:1082–1089 (csym) |

`sym.mjs`: `clear_dknown js/mkobj.js:2716 sync` (LIVE import, new), `is_ammo js/wield.js:129 sync` (LIVE import, new; a u_init clone exists but the import used is canonical), `Monnam`/`mon_nam` do_name.js LIVE (pre-existing imports), `canseemon` canonical display.js:1080 + 5 clones incl. mthrowu.js:269, `Tobjnam` canonical objnam.js:1833 + 6 clones incl. mthrowu.js:205, `rnd_hallublast` mthrowu.js:167 in-file export at C-home.

## C ↔ JS fidelity

**Arm 1** — C `:618–620`: `singleobj->owornmask = 0L; if (!canseemon(mon)) clear_dknown(singleobj);`. JS places `if (!canseemon(mon)) clear_dknown(singleobj);` immediately after `owornmask = 0` — exact position and predicate. The `canseemon` clone body (mthrowu.js:269) is line-identical in logic to the canonical display.js:1081 (`wormno ? worm_known : (cansee||see_with_infrared)`, `&& mon_visible`) and matches C `_canseemon` — verified CLONE, no dropped predicate (not a D-1849). **Confirm.**

**Arm 2** — C `:622–631`: gate `(cursed||greased) && (dx||dy) && !rn2(7)`, then `if (canseemon && flags.verbose)` → is_ammo `"%s misfires!"` / else `"%s as %s throws it!"` with `Tobjnam(obj,"slip")`, then `dx=rn2(3)-1; dy=rn2(3)-1`, then the `(0,0)` drop. JS matches gate, verbose idiom (`game.flags?.verbose !== false`, precedented in allmain/apply/artifact), both message strings verbatim, and RNG order call-for-call (rn2(7) → plines (no draws) → rn2(3)×2); the re-roll and (0,0) drop below are untouched pre-existing lines. `Tobjnam` clone: `The(xname)+otense` shape matches C objnam.c:2289–2299; its `otense_mtoss` simplification (quan-gate instead of `is_plural`) is behaviorally identical on this path because singleobj is always quan 1 (splitobj(·,1)/fresh mksobj) → `vtense(null,"slip")` both sides. Verified CLONE for this arm's use. **Confirm.**

**Arm 3** — C `:1085–1086`: `if (Hallucination) return rnd_hallublast();`. JS: `if (game.u?.Hallucination) return rnd_hallublast();` — exact (idiom matches mhis_mtoss :214 and :1405). `rnd_hallublast` body `HALLUBLASTS[rn2(len)]` matches C `ROLL_FROM(hallublasts)`; I diffed the full table: 96/96 identical, same order. The kept `|| 'strange breath'` fallback is pre-existing (C UB territory, unreachable for valid breath types), not added here. **Confirm.**

Callers (`--callers`): m_throw mthrowu.c:300/:1055 + muse.c:2020, breathwep_name :1121 — all match the D-log; both functions were already live with callers wired (D-2399 etc.), so no wiring delta. Callee closure per arm: all LIVE or verified CLONE; no stubs.

Quoted C arms (the exact text under review):

```c
/* mthrowu.c:618–620 */  singleobj->owornmask = 0L;
    if (!canseemon(mon))
        clear_dknown(singleobj); /* singleobj->dknown = 0; */
/* mthrowu.c:622–631 */  if ((singleobj->cursed || singleobj->greased) && (dx || dy) && !rn2(7)) {
        if (canseemon(mon) && flags.verbose) {
            if (is_ammo(singleobj))
                pline("%s misfires!", Monnam(mon));
            else
                pline("%s as %s throws it!", Tobjnam(singleobj, "slip"), mon_nam(mon)); }
        dx = rn2(3) - 1; dy = rn2(3) - 1;
        if (!dx && !dy) { (void) drop_throw(...); return; } }
/* mthrowu.c:1085–1088 */ if (Hallucination) return rnd_hallublast();
    return breathwep[BZ_OFS_AD(typ)];
```

Clone-vs-canonical (canseemon): the mthrowu.js:269 clone reads `mtmp.wormno ? worm_known(mtmp) : (cansee(mx,my) || see_with_infrared(mtmp))`, `return loc_seen && mon_visible(mtmp)` — token-identical in logic to canonical display.js:1081–1086 and to C `_canseemon`. The Tobjnam clone's `otense_mtoss` (quan-gate instead of `is_plural`) agrees with C otense (objnam.c:2530–2546, `!is_plural → vtense`) on this arm's only input shape (singleobj, always quan 1). Full HALLUBLASTS diff: 96 C entries vs 96 JS entries, identical strings in identical order (compared programmatically, not by eye).

| Callee | Status | Evidence |
|---|---|---|
| clear_dknown | LIVE | mkobj.js:2716, newly imported |
| is_ammo | LIVE | wield.js:129 canonical (u_init clone not used) |
| Monnam / mon_nam | LIVE | do_name.js, pre-imported |
| canseemon (mthrowu:269) | verified CLONE | logic-identical to display.js:1081 |
| Tobjnam (mthrowu:205) | verified CLONE | identical on quan-1 path |
| rnd_hallublast | LIVE | mthrowu.js:167 in-file export, table 96/96 |

## Hallucinations / overclaim

None. The subject sells arms, and the "none remaining" ledger flip matches the omit strings this SHA deletes (verified in the ledger hunk). The residual-session paragraph is honest: it reports 0-blocked + "owner moved" rather than claiming PASS.

## Density

Breadth phase, §2b: 2 same-file (mthrowu.c) functions' last ledger-listed arms, each with own C-locus/Callers/Verify/Named sub-bullets and own `Ledger:` entry. ~25 js/ insertions, below bar; D-log states the exception (file holds nothing more Open, all callees already live). Whole-function verdicts: m_throw whole (per the bbe63333a audit + this close), breathwep_name whole — SHA unanimous.

## Verification

Re-measured (`verify m_throw,breathwep_name --base d133940a7~1 --reach-all`): m_throw 0 blocked + reach 45/45 PASS REACH-OK; breathwep_name 0 blocked + smoke 24/24 REACH-OK — both match the D-log. Verbatim reach lines:

```text
reach m_throw: 45 baseline-PASS session(s) reach it (45 run, 53.8s): 45 PASS, 0 regressed → REACH-OK
smoke breathwep_name: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
``` Residual check: scen-impaired-Rogue-94110's working-board row is still step 89 kind=rng but owner is now `rnd_hallublast` (mthrowu.c:54), i.e. the owner did move off breathwep_name onto the newly-live callee — same step, lateral, not REGRESSED. With the table verified identical and the draw C-positioned, the remaining index difference is upstream RNG state (phase-2 matter), and the D-log claims no PASS. Diff grep: no FORCE/DIAG/RNG-log/fastforward hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
