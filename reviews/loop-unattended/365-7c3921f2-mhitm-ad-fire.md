# Review 365 — 7c3921f2 — uhitm.c mhitm_ad_fire leftover (D-1405)

## Metadata
- Full / short hash: `7c3921f25161c0a7d4f8c64d8f9413d09d21a0db` / `7c3921f2`
- Parent: `9ea9e5c1` (docs-only review D-1396–D-1404). This file audits **this SHA only** (first of nine `js/` commits since review **364**). Archive **Addressed:** D-1405 `7c3921f2` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 02:31:46 +0200
- D-id: **D-1405**
- Stats: 10 files, +206 / −36 — `js/mhitm.js` +126 / −10 (`mhitm_ad_fire` + `magic_negation_mon` + `mdamagem` AD_FIRE envelope).
- Claims to close: Open `uhitm.c` `mhitm_ad_fire` leftover (named from D-1385 / reviews **345** / **356**). Not STUN. `reviews/loop-2026-08-15/` has no unpaid AD_FIRE Must-fix.
- JS / map: `mhitm.js` `mdamagem` / `mhitm_ad_fire` / `magic_negation_mon`. Callees `on_fire`, `destroy_items`, `ignite_items`, `shieldeff`. `c-js-map/turns.md` + `debt.md`. uhitm/mhitu arms / `defended(AD_FIRE)` / COLD leftover still named.
- Prior reviews this SHA claims to close: **345** named FIRE leftover after CONF; **356** kept it Open after STUN.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_fire so a monster's fire hit burns or is resisted, instead of leftover dice only.”

C `uhitm.c` `mhitm_ad_fire` mhitm arm `:2588–2621` via `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping` `:4792`:

```
        if (mhitm_mgc_atk_negated(magr, mdef, TRUE)) {
            mhm->damage = 0;
            return;
        }
        if (gv.vis && canseemon(mdef))
            pline_mon(mdef, "%s is %s!", Monnam(mdef), on_fire(pd, mattk));
        if (completelyburns(pd)) { /* paper golem or straw golem */
            ...
            monkilled(mdef, (char *) 0, AD_FIRE);
            if (!DEADMONSTER(mdef)) { M_ATTK_MISS; done; return; }
            mhm->hitflags = (M_ATTK_DEF_DIED
                             | (grow_up(magr, mdef) ? 0 : M_ATTK_AGR_DIED));
            mhm->done = TRUE;
            return;
        }
        if (resists_fire(mdef) || defended(mdef, AD_FIRE)) {
            ... shieldeff; golemeffects; mhm->damage = 0;
        }
        mhm->damage += destroy_items(mdef, AD_FIRE, orig_dmg);
        ignite_items(mdef->minvent);
```

`orig_dmg` is snapshotted **before** MC (`:2526`). MC zeros leftover and **returns** (unlike STUN, which keeps `d()`). Completelyburns does **not** reach destroy/ignite. Resist zeros **current** leftover then destroy still uses **orig**. uhitm you-as-agr (`!Blind`, `xkilled`) and mhitu you-as-def (`hitmsg` + `Fire_resistance` / `rn2(20)` destroy / `burn_away_slime`) are other arms. `AD_FIRE` is `monattk.h` **2**.

Old JS: AD_FIRE fell through generic `mdamagem` HP. `gazemm` already returned leftover `mdamagem`. `explmm` FIRE/COLD/ELEC still skip `mdamagem` (`mon_explodes`).

The diff **does** add `mhitm_ad_fire` (mhitm arm only), wire `mdamagem` AD_FIRE leftover, extend `mhitm_mgc_atk_negated` with `magic_negation_mon` + vis “avoids harm”, and import live `on_fire` / `shieldeff`. It does **not** port uhitm/mhitu. Named. It does **not** OR `defended(mdef, AD_FIRE)`. Named. It does **not** glue COLD. Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_fire` mhitm | C `:2588–2621`, **wired** | MC zeros; vis on_fire; paper/straw done; resist then destroy(orig)+ignite |
| `mdamagem` AD_FIRE | C `:1059` leftover, **wired** | knockback stub then leftover HP / monkilled |
| `mhitm_mgc_atk_negated` | C `:75–99`, **already live** | this SHA: mon MC + vis pline |
| `magic_negation_mon` | C `mhitu.c:1089–1136`, **clone** | worn W_ARMOR `a_can` via `oc_level`; guarding / `protects()` / cleric·minion named |
| `on_fire` | C `mondata.c:1411–1445`, **imported live** | mondata.js |
| `completelyburns_mm` | C `mondata.h:223–224`, **clone matching** | paper/straw `mndx` |
| `mlifesaver` | C `mon.c`, **same-file live** | hypothetical golem path |
| `monkilled` / `grow_up` | C `mon.c` / `makemon.c`, **same-file live** | FIRE completelyburns → no corpse |
| `resists_fire` | C `monst.h` → `Resists_Elem`, **local bits clone** | mresists\|mextrinsics\|mintrinsics; artifact/worn-oprop named with defended |
| `defended(AD_FIRE)` | C `mondata.c:91–124`, **named omit** | artifact wep + adult-dragon scales |
| `shieldeff` | C `display.c`, **imported live** | |
| `golemeffects_mm` | C `mon.c:5680–5707`, **clone** | iron FIRE heal live; flesh FIRE slow named |
| `destroy_items` | C `zap.c:5965+`, **imported live** | dynamic zap.js; orig leftover |
| `ignite_items` | C `trap.c:7161–7172`, **imported live** | dynamic trap.js; `catch_lit` |
| `mhitm_knockback` | C, **already live stub** | burns `rn2(3)`+`rn2(6)` |
| uhitm you-as-agr | C `:2529–2560`, **named omit** | `!Blind`; `xkilled` |
| mhitu you-as-def | C `:2561–2586`, **named omit** | hitmsg + `rn2(20)` + slime |
| COLD leftover | C `:2626+`, **named omit** | already Open-adjacent |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** MC `rn2(10)` now can cancel m-vs-m when `a_can>0` (previously `armpro` was 0 so `rn2(10)>=0` never negated). `destroy_items` still burns `rn2(DMG_DESTROY_SCALE)` from orig leftover. Public fortress never needs the new cancel.

## C ↔ JS fidelity

MC: `mcan` true, no roll, leftover 0, return. Match `:2589–2591`. Else `rn2(10) >= 3*armpro`; verbosely vis+canseemon “avoids harm.” Match `:86–94` for a monster defender. Worn `a_can` is `objects[].oc_level` packed as C `a_can` (`generated/objects_data.js`); same packing as `magic_negation_you` / `invent.js`. Guarding amulet +2, `protects()` bump, high-cleric innate, aligned-cleric/minion mc=1 stay named — **not** a silent “armpro always 0” lie anymore.

vis+canseemon `on_fire` verbs match `mondata.c:1411–1445` (already on fire / boiling / melting / heating up / hugs roasted / on fire). `pline_mon` vs C same.

Paper/straw: vis “burns completely” vs lifesaver “totally engulfed”; `monkilled(..., AD_FIRE)` (empty fltxt ≡ C NULL); `!deadmonster` → MISS+done; else `DEF_DIED | (grow_up?0:AGR_DIED)`+done. Match `:2595–2611`. Does **not** call destroy/ignite. Match. `completelyburns_mm` is paper/straw `mndx` ≡ C pointer compare.

Resist: vis `pline("The fire doesn't seem to burn …!")` matches C `pline_The("fire doesn't seem to burn %s!")`. Order **shieldeff then golemeffects** then leftover 0. Match `:2613–2618` (uhitm you-as-agr swaps those two; this arm does not). Iron golem FIRE heal is live in `golemeffects_mm`. Flesh golem FIRE `mon_adjust_speed(-1)` stays named. `|| defended(...)` commented — named.

Then **always** `damage += destroy_items(mdef, AD_FIRE, orig_dmg)` even after resist zeros current leftover, then `ignite_items(minvent)`. Match `:2620–2621`. Callees are imported C functions, not stubs. `destroy_items` named bypass_objlist / levitation-were is pre-existing zap debt, not this arm inventing a fake destroy.

`mdamagem` envelope copies CONF/STUN: knockback RNG, `mhm.done` return, `!damage` return, else HP then `mdamagem_monkilled`. C `:1061–1092` is the same leftover wrap. Completelyburns already set `done` so the envelope does not double-kill.

Hallucination check: “Match C `mhitm_ad_fire`” while **`destroy_items` / `ignite_items` / `on_fire` / `shieldeff` are live imports** is not a dispatch-stub lie. Local `golemeffects_mm` is a clone; iron heal is the FIRE keep-path, flesh slow is named. `magic_negation_mon` is a clone of the worn-`a_can` max, not a `return 0`. Do **not** stamp “Match C uhitm `xkilled` fire.” Do **not** stamp “Match C mhitu `Fire_resistance` / `rn2(20)`.” Do **not** stamp “Match C `defended(AD_FIRE)`.” Do **not** stamp “Match C `Resists_Elem` worn-oprop / artifact `defends`.” Do **not** stamp “Match C flesh-golem FIRE slow.”

## Hallucinations / overclaim

Subject says a monster's fire hit burns or is resisted instead of leftover dice only. **True on the mhitm keep-path** for vis on_fire, MC miss, paper/straw instakill, innate `MR_FIRE` zero leftover, destroy(orig)+ignite. **False until named for you-as-agr / you-as-def / `defended` / flesh golem slow.** D-log “gaze leftover HP + pline; cancelled gaze miss; resist zeros leftover + burn pline; bite leftover HP; mcan bite zeros leftover; paper golem DEF_DIED” are the right falsifiers. Stamping **Addressed:** D-1405 for `:2588–2621` is fair. Do **not** treat fortress PASS as a vis pyrolisk gaze or a fire-ant vs paper golem.

## Density

One leftover `case` plus the MC monster-defender that this arm newly needs. ~120 lines of JS. Playbook §2b sibling of D-1396 STUN / D-1385 CONF (same envelope), not glued into COLD or uhitm. Right size.

## Branch-by-branch confirm

1. `mcan`: leftover 0; no `rn2(10)`; no on_fire; return. Match.
2. MC `rn2(10)` fail, vis: “avoids harm”; leftover 0. Match. Previously `armpro` was hardcoded 0 so this never fired for m-vs-m — that was the omit this SHA closes for worn `a_can`.
3. MC pass, vis+canseemon: `on_fire` pline then leftover HP unless resist/burn. Match.
4. Paper/straw: monkilled+grow_up done; no destroy RNG. Match.
5. Innate `resists_fire` (mresists bit): shield, golemeffects, leftover 0, **then** destroy(orig)+ignite. Match bits path.
6. No resist: leftover `d()` plus destroy extra, then ignite. Match.
7. `defended` red-dragon / artifact: JS still takes leftover HP. Named omit.
8. Flesh golem FIRE: no `mon_adjust_speed`. Named omit.
9. STUN/CONF/PHYS envelopes unchanged. Match D-1396/D-1385/D-1403.
10. `explmm` FIRE still `mon_explodes`, not this arm. Match C skip.
11. **Public-unhit** until a session shows vis mon-vs-mon AD_FIRE leftover.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Duration/damage is `d()` leftover plus `destroy_items` orig, not a recorded HP. Plain ESM. Dynamic `import('./zap.js')` / `trap.js` is cycle avoidance, not Node `fs`.

## Verification

Journal: private canary **22**/22 (C/JS shape; on_fire verbs; gaze leftover HP + pline; cancelled gaze miss; resist zeros leftover + burn pline; bite leftover HP; mcan bite zeros leftover; paper golem DEF_DIED; STUN/CONF regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` runs at HEAD this audit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The mhitm arm matches `:2588–2621` call-for-call on MC, vis on_fire, completelyburns done, bits resist + destroy(orig)+ignite. Remaining gaps are named omits.

Named omits (map / Open, not Must-fix):

1. `uhitm.c` `mhitm_ad_fire` you-as-agr (`!Blind` / `xkilled`)
2. `uhitm.c` `mhitm_ad_fire` you-as-def (`hitmsg` / `Fire_resistance` / `rn2(20)` / `burn_away_slime`)
3. `mondata.c` `defended(AD_FIRE)` + `Resists_Elem` artifact/worn-oprop beyond bits
4. `mon.c` `golemeffects` flesh FIRE `mon_adjust_speed`
5. `mhitu.c` `magic_negation` guarding / `protects()` / cleric·minion
6. `uhitm.c` `mhitm_ad_cold` leftover (next elemental sibling)

Do not Must-fix “learnwand-style discover on gaze” (C has no such). Do not Must-fix “skip destroy after resist” (C uses orig). Do not Must-fix “explmm FIRE should hit this arm” (C `mon_explodes`). Do not Must-fix “MC should keep leftover like STUN” (C zeros).

## Callers / RNG ledger

C this arm: `rn2(10)` unless `mcan`; `destroy_items` `rn2(DMG_DESTROY_SCALE)` from orig (and maybe more inside `maybe_destroy_item`); knockback two `rn2` in the envelope. Completelyburns: no destroy die. JS same. Public fortress never needs these dice. `gazemm` leftover now enters this arm (C `mdamagem`); that is the intended caller, not a stub.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: mon-vs-mon AD_FIRE now zeros leftover on MC, prints `on_fire`, instakills paper/straw, and resist-then-destroy(orig)+ignite; uhitm/mhitu/`defended` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1405 `7c3921f2` already has the short hash.
