# Review 402 — 892be171 — uhitm.c mhitm_ad_phys rustm leftover (D-1442)

## Metadata
- Full / short hash: `892be1718f2dfce0693fe6b61fbcd307e2c749ca` / `892be171`
- Parent: `b8ef02c3` (D-1441). This file audits **this SHA only** (second of nine `js/` commits since review **400**). Archive **Addressed:** D-1442 `892be171` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 04:14:20 +0200
- D-id: **D-1442**
- Stats: 9 files, +134 / −30 — `js/mhitm.js` +55 / −6. Docs-only besides that file.
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` rustm leftover (named from D-1415 / review **375**). Not poison. `reviews/loop-2026-08-15/` has no unpaid rustm Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_phys` / `rustm`; callee `trap.js` `erode_obj`. `c-js-map/turns.md`. Poison leftover / mhitu `rustm(&youmonst)` / purple-worm still named at this SHA.
- Prior reviews this SHA claims to close: **375** named rustm as first Open omit after artifact_hit.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys rustm leftover so a damaging monster weapon hit can rust, corrode, or burn the weapon against AD_RUST/AD_CORR/AD_FIRE defenders, instead of skipping rustm.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4182–4183` after D-1415 artifact `DEADMONSTER` return, still inside `else if (mwep)`:

```
            if (mhm->damage)
                rustm(mdef, mwep);
            if ((mwep->opoisoned || permapoisoned(mwep)) && !rn2(4)) {
                mhitm_really_poison(magr, mattk, mdef, mhm);
            }
```

Callee `mhitm.c` `rustm` `:1260–1280`:

```
    if (dmgtype(mdef->data, AD_CORR)) dmgtyp = ERODE_CORRODE;
    else if (dmgtype(mdef->data, AD_RUST)) dmgtyp = ERODE_RUST;
    else if (dmgtype(mdef->data, AD_FIRE)
             && mdef->data != &mons[PM_STEAM_VORTEX]) {
        dmgtyp = ERODE_BURN; chance = 6;
    }
    if (dmgtyp != ERODE_NONE && !rn2(chance))
        (void) erode_obj(obj, (char *) 0, dmgtyp, EF_GREASE | EF_VERBOSE);
```

`monattk.h`: `AD_FIRE=2`, `AD_RUST=24`, `AD_CORR=42`. `chance` defaults 1 (`!rn2(1)` always true, still burns the draw). AD_ACID / AD_ENCH stay in `passivemm`. Caller `mhitm.c` `mdamagem` `:1059` `mhitm_adtyping` AD_PHYS. mhitu you-poly arm is a **different** site (`:4106` `rustm(&youmonst, otmp)`).

Old JS: artifact_hit live; leftover skipped `rustm` so iron vs rust monster / pudding / fire never eroded the hitting wep.

The diff **does** add `export async function rustm` (C callee, not a stand-in) and `if (mhm.damage | 0) await rustm(mdef, mwep)` after artifact_hit. It **does** import `ERODE_NONE`/`ERODE_BURN`/`ERODE_RUST` and define `AD_RUST`/`AD_CORR`/`PM_STEAM_VORTEX`. It **does not** port `mhitm_really_poison` / purple-worm cap / mhitu `:4106`. Named. It **does not** finish `erode_obj` monster/floor vis plines / `grease_protect` wear-off RNG (already named on `trap.js`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_phys` rustm leftover | C `:4182–4183`, **wired this SHA** | iff leftover damage, after artifact |
| `rustm` | C `mhitm.c:1260–1280`, **C callee ported here** | CORR / RUST / FIRE-except-steam |
| `dmgtype` | C `mondata.h`, **local clone matching slots** | pre-existing in this file |
| `erode_obj` | C `trap.c`, **imported live subset** | oeroded++ keep-path; vis/grease named |
| `rn2(chance)` | C `:1278`, **live** | chance 1 rust/corr; 6 fire |
| `PM_STEAM_VORTEX` skip | C `:1271–1273`, **wired** | fire resist, no burn type |
| `mhitm_really_poison` | C `:4184–4189`, **named omit** | later SHA in this window |
| mhitu `rustm(&youmonst)` | C `:4106`, **named omit** | other arm |
| purple worm vs shrieker | C `:4191+`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** rust/corr always `rn2(1)`; fire `rn2(6)`; then `erode_obj` may `rnl(4)` on blessed. Public fortress does not need mon-vs-mon wep vs rust/pudding/fire.

## C ↔ JS fidelity

Order matches `:4130–4183`: `MON_WEP` then null unless AT_WEAP/AT_CLAW → shade_miss zeros leftover → AT_KICK thick zeros leftover → `else if (mwep)` corpse stone / `dmgval` / GOP / min-1 / artifact_hit / DEADMONSTER return / **`if (damage) rustm`**. Bite never rusts the held wep (`mwep` already 0). Artifact that zeros leftover skips rustm. Artifact that kills (`done`) returns before rustm. Match D-1415 keep-path plus this leftover.

`rustm` is a line-for-line port of `:1260–1280`. Null mdef/obj return. `else if` chain: CORR wins over RUST over FIRE (a pudding with both would corrode — C same). Steam vortex has AD_FIRE but is excluded so `dmgtyp` stays `ERODE_NONE` and **no** `rn2`. Fire elemental: `chance=6`, `!rn2(6)`. Rust/corr: `chance=1`, `!rn2(1)` always succeeds and still consumes one ISAAC draw like C. Dynamic `import('./trap.js')` is cycle-break, not a clone of `erode_obj`.

`erode_obj(obj, null, type, EF_GREASE|EF_VERBOSE)`: C `ostr==0` then `xname`. JS same (`if (!ostr) ostr = xname(otmp)`). Vulnerable: rust `is_rustprone` (iron), corr `is_corrodeable` (`oeroded2`), burn `is_flammable`. Keep-path long sword vs rust monster: `oeroded++`. Wood club vs rust: `!vulnerable` → `ER_NOTHING`. Pudding: `oeroded2++`. **Callee is not a stub.**

Named on the callee, not this leftover: (1) `uvictim` is hero-invent only so m-vs-m wep gets erosion **without** C’s monster/floor vis plines; (2) greased short-circuit returns `ER_GREASED` without `grease_protect` wear-off `rn2`; (3) `inventory_resistance_check` AD_FIRE/ACID. Do **not** stamp “Match C grease wear.” Do **not** stamp “Match C `Your long sword rusts!` on a monster’s wep.”

mhitu `:4106` is the you-as-pudding / you-as-rust-monster path (`rustm(&youmonst, otmp)`). This SHA does not call `rustm` from `mhitm_ad_phys_u`. Named. Not a keep-path lie on **m-vs-m**.

Hallucination check: “Match C leftover `rustm`” while **`rustm` is the real C function and `erode_obj` increments `oeroded`** is **not** a dispatch-stub lie. “Match C mhitu `rustm(&youmonst)`” **would** be. “Match C `mhitm_really_poison`” **would** be (still skipped at this SHA).

## Hallucinations / overclaim

Subject says a damaging monster weapon hit can rust, corrode, or burn the wep against AD_RUST/AD_CORR/AD_FIRE defenders instead of skipping rustm. **True** on the keep-path: leftover damage after artifact → CORR then RUST then FIRE-except-steam → `!rn2(chance)` → `erode_obj`; bite nulls mwep; steam vortex skip; wood vs rust no-op; fire ~1/6. **False until named** for poison leftover, mhitu youmonst rustm, purple-worm cap, monster vis plines, grease wear-off. Stamping **Addressed:** D-1442 for `:4182–4183` + `:1260–1280` is fair. Do **not** stamp “Match C `poisoned()`.” Do **not** treat fortress PASS as mon-vs-mon rust combat.

## Density

One leftover plus its C callee. ~40 lines of JS. Playbook §2b right size. Did not glue poison. Acceptable.

## Branch-by-branch confirm

1. Iron long sword vs rust monster, leftover >0: `rn2(1)` then `oeroded++`. Match `:1267–1279`.
2. Wooden club vs rust monster: `!is_rustprone` → nothing. Match `erode_obj` vulnerable gate.
3. Iron vs black pudding: AD_CORR first; `oeroded2++`. Match `:1267–1268`.
4. Fire elemental: `chance=6`; `!rn2(6)` may burn flammable. Match `:1271–1275`.
5. Steam vortex: skip burn; no `rn2`. Match `:1272–1273`.
6. AT_BITE while holding a wep: `mwep` nulled; no rustm. Match `:4133–4134`.
7. Artifact zeros leftover: skip rustm. Match `:4182`.
8. DEADMONSTER after artifact: return before rustm. Match `:4174–4180`.
9. Poison `!rn2(4)` still absent. Named at this SHA.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rn2(1)` is C’s always-true rust/corr draw, not an ALIGN shim. Dynamic import is the existing trap↔mhitm cycle, not a filesystem read.

## Verification

Journal: private canary **15**/15 (C/JS grep; club vs gnome no rust; long sword vs rust monster `oeroded++`; club vs rust wood skip; pudding `oeroded2`; bite nulls mwep; steam vortex skip; fire elemental ~1/6 burn; null no-op; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not a rust-monster m-vs-m hit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Leftover reaches live `rustm` → live `erode_obj` oerode increment. Callees are not stubs.

Named omits (map / Open, not Must-fix):

1. `mhitm_really_poison` `!rn2(4)` (`:4184–4189`) — later SHA in this window
2. mhitu `mhitm_ad_phys_u` `rustm(&youmonst, otmp)` (`:4106`)
3. purple worm vs shrieker cap (`:4191+`)
4. `erode_obj` monster/floor vis plines; `grease_protect` wear-off RNG; `inventory_resistance_check`

Do not Must-fix “rust/corr should skip `rn2`” (C burns `rn2(1)`). Do not Must-fix “steam vortex should burn.” Do not Must-fix “bite should rust the wielded wep.” Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `mhitm.c` `hitmm` → `mdamagem` → `mhitm_adtyping` AD_PHYS. New RNG: `rn2(1)` or `rn2(6)` then possible `rnl(4)`. Public fortress does not need this path.

Verdict: **ACCEPT-WITH-DEBT**
