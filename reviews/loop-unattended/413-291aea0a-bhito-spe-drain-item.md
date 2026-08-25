# Review 413 — 291aea0a — zap.c bhito SPE_DRAIN_LIFE drain_item (D-1453)

## Metadata
- Full / short hash: `291aea0a1220d21f5ec842d89fee2d5fcd1752d9` / `291aea0a`
- Parent: `41c16bfe` (D-1452). This file audits **this SHA only** (fourth of nine `js/` commits since review **409**). Archive **Addressed:** D-1453 `291aea0a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 06:36:18 +0200
- D-id: **D-1453**
- Stats: 13 files, +407 / −75 — `js/zap.js` +132 / −8; `js/artifact.js` +106; `js/generated/artifacts_data.js` rewrite; `scripts/extract-artifacts.py` +58. Docs the rest.
- Claims to close: Open `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item` (named from D-1452 / D-1445). Not probing. `reviews/loop-2026-08-15/` has no unpaid drain_item Must-fix.
- JS / map: `zap.js` `drain_item` / `bhito`; `artifact.js` `defends` / `defends_when_carried`; extractor `defn`/`cary`. `c-js-map/turns.md` + `data.md`. uhitm/mhitu/mhitm AD_ENCH still named.
- Prior reviews this SHA claims to close: **412** D-log follow-up was this Open row; **396** named `bhito` drain_item after `bhitm` SPE_DRAIN; **406** named it after self-dir drain.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhito SPE_DRAIN_LIFE drain_item so a drain-life spell hitting a floor object strips enchantment/charges instead of doing nothing.”

C `bhito` `:2318–2320` is `(void) drain_item(obj, TRUE)` so `res` stays 1 and `learn_it` is not set. `drain_item` `:1382–1455`:

```
    if (!obj
        || (!objects[obj->otyp].oc_charged && obj->oclass != WEAPON_CLASS
            && obj->oclass != ARMOR_CLASS && !is_weptool(obj))
        || obj->spe <= 0)
        return FALSE;
    if (defends(AD_DRLI, obj) || defends_when_carried(AD_DRLI, obj)
        || obj_resists(obj, 10, 90))
        return FALSE;
    if (by_you) costly_alteration(obj, COST_DRAIN);
    obj->spe--;
    /* worn ring/helm ABON / uhitinc / udaminc; RIN_PROTECTION u_ring only */
    if (disp.botl) bot();
    if (carried(obj)) update_inventory();
    return TRUE;
```

`COST_DRAIN` is `hack.h:285` enum 1. `carried` is `where == OBJ_INVENT`. `obj_resists(10,90)` always burns `rn2(100)` unless invocation/rider. `defends` `:636–683` artifact `defn.adtyp` else dragon mail→scales (AD_DRLI = black). `defends_when_carried` `:687–694` artifact `cary.adtyp` only; no artilist row is `CARY(AD_DRLI)`.

Old JS: `bhito` default `res = 0`. No `drain_item`. `defends`/`cary` absent; extractor omitted `defn`/`cary`.

The diff **does** extract `defn`/`cary`, port `defends` (artifact + dragon mail→scales switch) and `defends_when_carried`, port `drain_item` (gate, short-circuit defends, `obj_resists(10,90)`, COST_DRAIN, `spe--`, worn ABON, `bot`, invent), and add `bhito` SPE_DRAIN_LIFE. It **does not** rewrite `confer_oc_oprop`. It **does not** wire uhitm `:3641` / `:6181`, mhitu `:2512`, or mhitm `:1352`. Named. It **does not** add `defended()` worn walk (still named on `resists_drli`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhito` SPE_DRAIN_LIFE | C `:2318–2320`, **wired this SHA** | `(void)` so `res` stays 1 |
| `drain_item` | C `:1382–1455`, **C callee ported** | |
| `defends` | C `artifact.c:636–683`, **C callee ported** | |
| `defends_when_carried` | C `:687–694`, **C callee ported** | |
| `Is_dragon_mail` / `Is_dragon_armor` | C `obj.h:347–352`, **clone matching C** | gray..yellow ranges |
| `obj_resists` | C `:1458–1473`, **imported live** (D-0864, `dogmove.js`) | |
| `costly_alteration` | C `shk.c`, **imported live** | `COST_DRAIN = 1` |
| `bot` | C `botl`, **imported live** (`display.js`) | |
| extractor `defn`/`cary` | `artilist.h` A() args 6–7, **wired** | `DRLI(0,0)` / `DFNS(AD_*)` |
| uhitm/mhitu/mhitm AD_ENCH | C callers, **named omit** | still local deferrals |
| `defended(AD_DRLI)` | C `mondata.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Extractor uses clang at **build** time; scored `js/` does not import `fs`. Rule #2 clean. **New gameplay RNG:** `obj_resists` `rn2(100)` when defends miss. Public fortress does not drain a floor object with SPE_DRAIN.

## C ↔ JS fidelity

`bhito` arm: `await drain_item(obj, true)` then `break`. `res` starts 1; drain false (spe<=0 / defends / resist) still returns 1 and does not `learnwand`. Match `:2318–2320`. `bhitpile` still decrements range. Same as C `(void)`.

`drain_item` gate: `!obj` / not charged-class / `spe<=0`. JS `charged = oc.oc_charged || otyp_is_charged(otyp)` then the same oclass/`is_weptool` disjunct. The `|| otyp_is_charged` is a **table-omit clone** (generated objects often drop `oc_charged`); the named ring/wand/tool list is the C `objects.h` `spec`/`chg` set, and weapons/armor already pass C's oclass tests. Not a Must-fix unless a non-charged otyp drains. `is_weptool` in `zap.js` is TOOL + `oc_skill` not P_NONE. Match keep-path.

Defends short-circuit **before** `obj_resists`: Excalibur / Stormbringer / Staff of Aesculapius `defn.adtyp == AD_DRLI` (15) from extracted `DRLI(0,0)` / `DFNS`. Black dragon scales/mail: mail `otyp += GRAY_DRAGON_SCALES - GRAY_DRAGON_SCALE_MAIL` then `AD_DRLI` → black. **No `rn2`.** Match `:1392–1394` and `:668–670`. Gold/red/white do not defend DRLI. Match.

`defends_when_carried`: `get_artifact` then `cary.adtyp`. No dragon walk. No row is CARY(AD_DRLI) (Orb of Detection is CARY(AD_MAGM)=1). Dead arm for this otyp; still a real C function. Match.

`obj_resists(10,90)`: live D-0864. Invocation/rider TRUE with no dice; else `rn2(100) < (oartifact ? 90 : 10)`. Ordinary +spe burns one `rn2`. Artifact non-DRLI defends (Mjollnir) still rolls 90%. Match.

`by_you` → `costly_alteration(obj, COST_DRAIN)` with enum 1. Floor unpaid shop path is the existing shk port. Match.

`spe--` then `u_ring = obj === uleft || uright`. Worn ABON: STR/CON/CHA rings need `owornmask & W_RING && u_ring`; accuracy/damage same without botl; **RIN_PROTECTION `u_ring` only, no owornmask** (JS comment cites `:1430–1432`); helm `W_ARMH && uarmh` INT+WIS; gauntlets `W_ARMG && uarmg` DEX. Then `if (disp.botl) bot()`; invent `update_inventory`. JS also sets `flags.botl` (existing bot convention). `carried` ≡ `OBJ_INVENT`. Match keep-path.

Hallucination check: “Match C `bhito` `drain_item`” while **`drain_item` / `defends` / `obj_resists` are live** is **not** a dispatch-stub lie. “Match C uhitm AD_ENCH `drain_item`” **would** be. “Match C `defended()` worn walk” **would** be. “Match C `confer_oc_oprop`” **would** be (and is banned).

## Hallucinations / overclaim

Subject says a drain-life spell hitting a floor object strips enchantment/charges. **True** on the keep-path: charged/`spe>0`, not DRLI-defending, fail `obj_resists(10,90)`, then `spe--` (+ ABON if worn). `bhito` does not learn the spellbook type. **False until named** for uhitm/mhitu/mhitm AD_ENCH, `defended()` on monsters, zap_steed drain→bhitm. Stamping **Addressed:** D-1453 for `:2318–2320` + `:1382–1455` + `defends` is fair. Do **not** stamp “Match C mhitm `drain_item`.” Do **not** treat fortress PASS as a floor drain.

Extractor: Excalibur `defnAdtyp` 15, Stormbringer 15, Aesculapius 15, Magicbane `DFNS(AD_MAGM)` 1, Mitre `CARY(AD_FIRE)` 2. Matches `artilist.h`. `scripts/extract-artifacts.py` is not scored `js/`.

## Density

One C function (`drain_item`) plus the two artifact predicates it calls, plus the one `bhito` arm. ~230 lines of JS + generated table. Playbook §2b right-side of the band; did not glue AD_ENCH combat callers. Acceptable. Did not rewrite `confer_oc_oprop`.

## Branch-by-branch confirm

1. `spe<=0` / potion: return false; `bhito` still res 1; no `rn2`. Match.
2. Black DSM / Excalibur: `defends` true; no `rn2`; spe unchanged. Match.
3. Ordinary +spe weapon: `rn2(100)`; <10 resist else `spe--`. Match.
4. Artifact without DRLI defn (Mjollnir): `rn2(100) < 90`. Match.
5. Worn left `RIN_GAIN_STRENGTH`: `ABON(A_STR)--` + bot. Match `:1404–1408`.
6. `RIN_PROTECTION` u_ring: botl only, no owornmask. Match `:1430–1432`.
7. Unworn +spe weapon: `spe--`; no ABON; no invent update (floor). Match.
8. `bhito` no `learn_it`. Match.
9. uhitm/mhitm still not calling this export. Named.
10. Locking `bhito` still default. Named (boxlock).
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Extractor clang is offline codegen, not a runtime `fs` import.

## Verification

Journal: private canary **19**/19 (C/JS grep; Rule #2; spe<=0 / potion skip; black DSM + Excalibur defends no RNG; ordinary +spe `rn2(100)`; worn left ring ABON; bhito res=1 no learnwand; self-hit 0; probing sibling D-1445; locking still default); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `01edf8b9`. Fortress PASS is not a floor drain.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `drain_item` / `defends` / `bhito` match the cited C. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. uhitm AD_ENCH `drain_item(obj, FALSE/TRUE)` (`:3641`, `:6181`)
2. mhitu `drain_item(mon_currwep, TRUE)` (`:2512`)
3. mhitm `drain_item(mwep, FALSE)` (`:1352`)
4. `defended(AD_DRLI)` worn-item walk
5. `zap_steed` SPE_DRAIN → `bhitm` (Open already)
6. `bhito` boxlock / opening chain (Open already)

Do not Must-fix “`obj_resists` is a stub” (D-0864 live). Do not Must-fix “AD_ENCH combat should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “rewrite `confer_oc_oprop`.”

## Callers / RNG ledger

C callers this SHA reaches: `bhit` → `bhitpile` → `bhito` from IMMEDIATE `weffects` (SPE_DRAIN already D-1436). New dice: `rn2(100)` per eligible object when defends miss. `defends` true skips the dice. Public fortress does not hit this.

Verdict: **ACCEPT-WITH-DEBT**
