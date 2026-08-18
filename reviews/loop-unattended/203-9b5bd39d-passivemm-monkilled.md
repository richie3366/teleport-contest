# Review 203 — 9b5bd39d — mhitm.c `passivemm` assess_dmg `monkilled(magr)` (D-1241)

## Metadata
- Full / short hash: `9b5bd39dd613a241dcb3f1b6620b2734aa342616` / `9b5bd39d`
- Parent: `d8f28958` (D-1240). This file audits **this SHA only**. Archive row **Addressed:** D-1241 lacked the short hash; this review commit fills `9b5bd39d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 00:23:00 +0200
- D-id: **D-1241**
- Stats: 10 files, +451 / −44 — `js/mhitm.js` +374 / −10.
- Claims to close: Open `mhitm.c` `passivemm` AD_RBRE shock `monkilled` (queue wording; C death is `monkilled(magr,"",adtyp)` with no `gz.zombify`; `mon_poly` AD_RBRE already D-1006). Not troll_baned. `reviews/loop-2026-08-15/` has no unpaid passivemm Must-fix.
- JS / map: `mhitm.js` `passivemm` / `paralyze_monst`; `c-js-map/data.md`. gulpmm snuff_lit / `!goodpos` / AD_DGST eat still named.
- Prior reviews this SHA claims to close: **193** named omit passivemm; Open row after D-1240.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c passivemm so a monster that dies on an AT_NONE acid/cold/fire/elec passive is monkilled, instead of only burning rn2(3) and walking away.”

C `passivemm` (`mhitm.c:1304–1457`): first `mattk[i].aatyp==AT_NONE` (raw `mddat->mattk`, not `getmattk`); dice `d(damn,damd)` or `d(mlevel+1,damd)`; AD_ACID splash/`resists_acid` even if defender already dead, `erode_armor` `!rn2(30)`, `acid_damage(MON_WEP)` `!rn2(6)`, **`goto assess_dmg`** (skips `mdead||mcan` return and `rn2(3)`); AD_ENCH `drain_item(mwep,FALSE)` then break; else if `mdead||mcan` return; `rn2(3)` live COLD/FIRE/ELEC/PLYS/STUN else `tmp=0`; assess `magr->mhp -= tmp` then `monkilled(magr,"",(int)adtyp)` + `M_ATTK_AGR_DIED`. Caller `mattackm` (`:572–575`) after each attack if still adjacent.

Old JS: `get_mattk` AT_NONE, early-return if dead, burn `rn2(3)`, never subtract HP, never `monkilled` magr.

The diff **does** raw mattk, dice, AD_ACID goto-via-flag, thin AD_ENCH, live `rn2(3)` switch, assess `monkilled(magr)` without setting `game.zombify`. It does **not** pull gulpmm snuff_lit / `!goodpos` / AD_DGST eat. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `passivemm` | C `:1304–1457`, **rewritten** | was rn2(3)-only |
| `paralyze_monst` | C `:1209–1219`, **new, faithful** | clamp 127; clear meating / WAITFORU |
| `monkilled` | C via same file, **already live** | D-0167; `_how` unused; `mondied` live; no zombify here |
| `erode_armor_mm` | C `uhitm.c:126–185`, **clone, faithful** | `rn2(5)` loop; case 1 always breaks; `erode_obj` live via dynamic import |
| `golemeffects_mm` | C `mon.c:5680–5707`, **clone** | flesh/iron **heal** arms; MSLOW `mon_adjust_speed` named |
| `mon_reflects_mm` | C `muse.c:2797–2833`, **clone** | shield/amulet/silver DSM/dragon; `arti_reflects(MON_WEP)` + `makeknown` named |
| `acid_damage_mm` | C `trap.c:4618–4654`, **clone** | else-arm `erode_obj` CORRODE; grease_protect / scroll fade named |
| AD_ENCH `spe--` | C `zap.c drain_item:1382–1454`, **clone** | `spe<=0` then `rn2(100)` 10/90 like `obj_resists`; defends/ABON/invocation short-circuit named |
| `healmon` / `which_armor` / `MON_WEP` / `hliquid` / `split_mon` | C callees, **imported live** | `split_mon` from `sit.js` (D-1078) |
| `get_mattk` | **not used** on this path | raw `mddat.mattk` like C |
| gulpmm snuff_lit / `!goodpos` / AD_DGST | **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. New RNG: AT_NONE `d()`; AD_ACID `rn2(2)` / `rn2(30)` / `rn2(6)` + `erode_armor` `rn2(5)` loop; AD_ENCH `rn2(100)` if `spe>0`; live `rn2(3)` then maybe `rn2(4)` eye; COLD `split_mon` may roll. Constants `AD_ACID=8` / `AD_ENCH=41` / `AT_NONE=0` match `monattk.h` (comment notes a prior AD_DRDX mix-up; this SHA uses 8).

## C ↔ JS fidelity

Pinned C assess + AD_ACID goto (`mhitm.c:1332–1456`):

```
    case AD_ACID:
        if (mhitb && !rn2(2)) { ... resists_acid → tmp=0; }
        else tmp = 0;
        if (!rn2(30)) erode_armor(magr, ERODE_CORRODE);
        if (!rn2(6)) acid_damage(MON_WEP(magr));
        goto assess_dmg;
    ...
    if (mdead || mdef->mcan) return (mdead | mhit);
    if (rn2(3)) switch ... else tmp = 0;
 assess_dmg:
    if ((magr->mhp -= tmp) <= 0) {
        monkilled(magr, "", (int) mddat->mattk[i].adtyp);
        return (mdead | mhit | M_ATTK_AGR_DIED);
    }
```

JS `skip_live` for AD_ACID is the goto: still runs assess, **does not** `rn2(3)`, **does not** return on `mdead||mcan`. A dead jelly still splashes/erodes and may `monkilled(magr)`. That is the claimed bug. `monkilled` does not set `game.zombify` (C `gz.zombify` untouched). `mdamagem` still sets/resets zombify around **defender** death only. Match the no-zombify claim.

C AD_ACID calls `Monnam(magr)` into `buf` **before** `canseemon`. JS only `Monnam` inside `canseemon`. Under Hallucination + `!canseemon(magr)` C burns a name `rn2` JS skips. Real call-order gap on the splash line, not on assess/`monkilled`. Same class as unused `Monnam` in other ports. Do **not** Must-fix “call `Monnam` when unseen” as this SHA’s wrap; do **not** stamp the splash as Hallu-identical.

`paralyze_monst`: amt>127 clamp; `mcanmove=0`; `mfrozen=amt`; `meating=0`; `strategy &= ~WAITFORU`. Match.

AD_PLYS: eye `rn2(4)` 127; `mcansee && haseyes && mdef.mcansee && (perceives||!minvis)` then `mon_reflects` else freeze; cube freeze without gaze; fail-lock `return 1` (`M_ATTK_HIT===0x1`). Match C’s quirky `return 1`. Reflect clone skips `arti_reflects(MON_WEP)` — a reflecting artifact weapon would freeze in JS and reflect in C. **Named omit of that slot**, not a no-op `mon_reflects` (shield/amulet/DSM/dragon still return true).

COLD/FIRE/ELEC: resist → `pline_mon` mildly + `golemeffects_mm` then `tmp=0`; else sudden pline; COLD `healmon(tmp/2,tmp/2)` + `split_mon` if `mhpmax > (m_lev+1)*8`. Golem **heal** matches C `(dam+5)/6` / `dam`. MSLOW named (no `mon_adjust_speed` RNG). STUN: `makeplural("stagger")` not `stagger(data,"stagger")`. Named locomotion table.

AD_ENCH: C `drain_item` returns FALSE before `obj_resists` when `spe<=0` — JS `spe>0` then `rn2(100) >= (artifact?90:10)` then `spe--` matches that 10/90 for ordinary weapons. Invocation always-resist-without-`rn2` and ring/helm ABON named.

`erode_armor_mm` matches C’s `while(1)/rn2(5)` including case 1 always `break`. Faithful clone (cycle with `uhitm.js`).

`mattackm` already called `passivemm`; this SHA fills the callee. JS still omits C’s post-passive `AGR_DONE` / `helpless` / `mon_offmap` early returns — **pre-existing** mattackm thinness, not this wrap.

## Hallucinations / overclaim

Subject + D-1241 say an AT_NONE acid/cold/fire/elec passive that drops magr HP to ≤0 `monkilled`s instead of walking away after `rn2(3)`. **Raw AT_NONE + AD_ACID goto + live `monkilled(magr)` without zombify are the hunk.** Stamping **Addressed:** D-1241 is fair. This is **not** “Match C dispatch, callee is a stub”: `monkilled` → `mondied` is live. Do **not** stamp “Match C `drain_item` ABON” or “Match C `arti_reflects`” or “Match C gulpmm `snuff_lit`” or “Match C `mon_poly` AD_RBRE” (already D-1006).

Queue filename “AD_RBRE shock `monkilled`” was the Open row; C this function uses `mattk[i].adtyp` (acid blob is AD_ACID). D-log already said so.

## Density

One C function plus the callees that function actually calls (`paralyze_monst`, `erode_armor`, thin golem/reflect/acid). +374 JS lines is over the 300-line comfort line because the clones are verbose, not because an unrelated subsystem landed. Not “finish potions.” Related deferrals (MSLOW, `arti_reflects`, grease/scroll, stagger) stayed named.

## Branch-by-branch confirm

1. No AT_NONE: return `mdead|mhit`. Match.
2. AD_ACID + defender already dead: no `rn2(3)`; assess may kill magr. Match goto.
3. AD_ACID + `mhitb && !rn2(2)` + `resists_acid`: tmp=0; still erode rolls. Match.
4. AD_ENCH: no goto; `mdead||mcan` can still return before `rn2(3)`. Match.
5. Live `!rn2(3)`: tmp=0, assess 0 dmg. Match.
6. COLD resist golem heal; COLD split when over max. Match heal; slow named.
7. Eye reflect shield: no freeze. Match (weapon-arti named).
8. Eye/cube freeze: `paralyze_monst`; no assess dmg. Match.
9. FIRE/ELEC kill magr: `monkilled` + `M_ATTK_AGR_DIED`. Match.
10. `game.zombify` not set. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `trap.js` / `sit.js` / (none of `node:`). Plain ESM.

## Verification

Journal: private canary **20**/20 (C assess; no zombify; AD_ACID goto; runtime acid `monkilled(magr)`; eye paralyze; cancelled jelly skip; live jelly cold; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless m-vs-m hits a live AT_NONE acid/jelly/eye. Cadence this audit: full `sessions`.

## Actionable C-wrongs

None for Must-fix. Assess through live `monkilled`/`mondied`. Partial clones (MSLOW, `arti_reflects`, grease/scroll, stagger, Hallu unseen `Monnam`) are named callee omits, not a stub death path.

Named omits (map, not Must-fix):

1. gulpmm `snuff_lit` minvent / `!goodpos` return-home / AD_DGST eat
2. `drain_item` `defends(AD_DRLI)` / ring-helm ABON / invocation `obj_resists` short-circuit
3. `golemeffects` MSLOW `mon_adjust_speed`
4. `mon_reflects` `arti_reflects(MON_WEP)` + `makeknown`
5. `acid_damage` grease_protect / scroll fade (C greased never reaches `erode_obj`)
6. `stagger()` locomotion table
7. AD_ACID `Monnam(magr)` before `canseemon` (Hallu)

Do not Must-fix “burn `rn2(3)` on AD_ACID.” Do not wrap assess as zombify. Do not skip `monkilled(magr)`.

## Callers / RNG ledger

C: `mattackm` after each `attk` while `distmin<=1` and agr not already dead. JS same. Public fortress is not evidence a jelly killed its attacker.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: AT_NONE acid/cold/fire/elec now assess through live `monkilled(magr)` including AD_ACID’s goto (no `rn2(3)`); gulpmm snuff/`!goodpos`/digest stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1241 `9b5bd39d`.
