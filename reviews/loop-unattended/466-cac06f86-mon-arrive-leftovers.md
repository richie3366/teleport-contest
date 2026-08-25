# Review 466 — cac06f86 — dog.c mon_arrive MIGR_LEFTOVERS DF_ALL (D-1505)

## Metadata
- Full / short hash: `cac06f863520070e36a8d911a44ddbe89012f4d7` / `cac06f86`
- Parent: `eeb0e912` (D-1504). This file audits **this SHA only** (second of nine `js/` commits since review **464**). Archive **Addressed:** D-1505 `cac06f86`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:07:27 +0200
- D-id: **D-1505**
- Stats: 12 files, +225 / −150 — `js/dog.js` +25 / −15, `dokick.js` +1 / −1, `mklev.js` +1 / −1 (comments). Band 150–350.
- Claims to close: Open `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL (named from D-1492 / D-1199 / review **453**). Not stolen_booty producer. `reviews/loop-2026-08-15/` has no unpaid leftovers Must-fix.
- JS / map: `dog.js` `mon_arrive_after_you`; callee `dokick.js` `deliver_obj_to_mon`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **453** named leftovers; **451** named leftovers after minetn-1.

## Intent vs deliverable

Git subject promises: `MIGR_LEFTOVERS` migrants take remaining `MIGR_TO_SPECIES` cargo via `deliver_obj_to_mon` `DF_ALL` instead of leaving it on `migrating_objs`.

Pinned C `dog.c` `mon_arrive` `:576–580`, after the xyloc switch, before wander/`somexy` (`:582–604`) and before `mx=0` / `my=xyflags` (`:607–613`). Predicate: `(mtmp->migflags & MIGR_LEFTOVERS) != 0L` and `gm.migrating_objs` then `deliver_obj_to_mon(mtmp, 0, DF_ALL)`. C does **not** clear the flag. `when==With_you` returns at `:468–480` **before** this arm. `when==Wiz_arrive` sets `xyloc=MIGR_WITH_HERO` and **falls through** into leftovers. Callee `dokick.c` `:1853–1906`: `DF_ALL` → `maxobj=0` (no count break); match `migr_species` to `mflags2 & DELIVER_PM`; `add_to_minv`. Producer `mkmaze.c` `migrate_orc` ORC_LEADER `:725–734` ORs the flag (D-1363). `makemon` still calls `DF_NONE` once (`makemon.c:1470`).

Old JS: After_you went xyloc → `my=xyflags` → place. Leftovers named after D-1199.

The diff **does** import live `deliver_obj_to_mon` / `MIGR_LEFTOVERS` / `DF_ALL` and insert that `if` after the xyloc switch, before `mx`/`my`. It **does not** port wander/`somexy`. Named. It **does not** port `Wiz_arrive`. Named (`sym` NOT FOUND). It **does not** change `migrate_orc` or `stolen_booty`. Comment-only in `dokick.js` / `mklev.js`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mon_arrive_after_you` leftovers `if` | C `:576–580`, **LIVE this SHA** | |
| `mon_arrive_with_you` | C With_you return, **LIVE** | still returns first |
| `deliver_obj_to_mon` | C `:1853–1906`, **LIVE** import | D-1193; `DF_ALL` already in body |
| `MIGR_LEFTOVERS` | C `dungeon.h:163` 8192, **LIVE** | `const.js:937` |
| `DF_ALL` | C `hack.h:1225` 0x04, **LIVE** | `const.js:1670` |
| `migrate_orc` ORC_LEADER | C `:725–734`, **LIVE** pre-existing | sets the flag |
| `stolen_booty` | C mkmaze, **LIVE** D-1363 | producer |
| `add_to_minv` | C, **LIVE** D-1492 | callee of deliver |
| wander / `somexy` | C `:582–604`, **OMIT named** | dog.js has no call; `somexy` clones live in mklev/teleport |
| `Wiz_arrive` | C `:481–484`, **OMIT named** | **NOT FOUND** |

`node scripts/sym.mjs deliver_obj_to_mon mon_arrive_after_you mon_arrive_with_you MIGR_LEFTOVERS DF_ALL stolen_booty migrate_orc Wiz_arrive somexy`:

```
deliver_obj_to_mon js/dokick.js:2244   sync
mon_arrive_after_you NOT EXPORTED — 1 LOCAL js/dog.js:556
mon_arrive_with_you NOT EXPORTED — 1 LOCAL js/dog.js:451
MIGR_LEFTOVERS   js/const.js:937   export const
DF_ALL           js/const.js:1670   export const
stolen_booty     js/mklev.js:964   sync
migrate_orc      NOT EXPORTED — 1 LOCAL js/mklev.js:887
Wiz_arrive       NOT FOUND in js/**
somexy           NOT EXPORTED — 2 LOCAL js/mklev.js:18982  js/teleport.js:937
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. `dog.js` → `dokick.js` is a new import; `dokick.js` already imported `abuse_dog` from `dog.js`. Cycle is ESM live bindings; leftovers is not used at module top. Not a C-wrong.

**New gameplay RNG at the caller:** none. Callee `christen_orc` may `rn2(2)` when not `In_mines` (C `:1887`). Public-unhit until a minetn-1 captain arrives.

## C ↔ JS fidelity

With_you. C returns `:480` before leftovers. JS `mon_arrive_with_you` is a different function; pets never hit the new `if`. **Match.**

After_you order. C: xyloc switch → leftovers → wander → `mx=0`/`my=xyflags` → `mnearto`/`rloc`. JS: xyloc → leftovers → `mx=0`/`my=xyflags` → place. Wander is named omit (no `rn1` jitter). Leftovers sits in the C slot relative to xyloc and `my=xyflags`. **Match the cited arm.** Skipping wander does not skip leftovers RNG; leftovers has no dice of its own.

Predicate. C `(migflags & MIGR_LEFTOVERS) != 0L` then `if (gm.migrating_objs)`. JS `((mtmp.migflags|0) & MIGR_LEFTOVERS) !== 0` then `if (game.migrating_objs)`. Flag 8192 **Match `dungeon.h`.** `migrating_objs` is a `nobj` chain (not an array); empty is `null`, same as C NULL. **Match.** Flag is not cleared. **Match.**

Callee. `deliver_obj_to_mon(mtmp, 0, DF_ALL)`. `DF_ALL=0x04` **Match `hack.h`.** Body: `maxobj=0` so the `if (maxobj && cnt>=maxobj) break` never fires; remaining matching `MIGR_TO_SPECIES` objects go to `add_to_minv`. **LIVE, not a stub.** `makemon` `DF_NONE` still takes one at spawn; leftovers drains the rest. **Match C split.** This SHA does not re-port the christen/`corpsenm` slice inside the callee (pre-existing D-1193).

Producer. `migrate_orc` ORC_LEADER already ORs `MIGR_LEFTOVERS`; non-leader clears it. **Match `:725–741`.** Stolen booty still D-1363. Comment-only mklev/dokick are not a second port.

Wiz_arrive. C wizard resurrect falls through leftovers. JS has no `Wiz_arrive` (`sym` NOT FOUND). Named. Wizard is not ORC_LEADER, so the flag is not set on that path. Honest omit, not a silent leftovers skip on captains.

Callee closure (leftovers arm). LIVE: `deliver_obj_to_mon`, `add_to_minv`, `MIGR_LEFTOVERS`, `DF_ALL`. OMIT named: wander/`somexy`, `Wiz_arrive`, failed_arrivals. STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject leftovers take remaining cargo via DF_ALL instead of leaving it on `migrating_objs`: **true** on After_you when the flag and chain are set. D-log “same predicate and order” / “do not clear the flag” / “With_you skip”: **true**. Stamping **Addressed:** D-1505 for **`:576–580` + live callee** is fair. Do **not** stamp “Match C wander/`somexy`.” Do **not** stamp “Match C `Wiz_arrive` leftovers.” Do **not** stamp “Match C `obj_delivery` dest-level filter” (different function; leftovers has no dest filter). Do **not** treat fortress PASS as an orctown captain arrival.

This is **not** “dispatch ported, callee stubbed.” `deliver_obj_to_mon` is exported and already implemented DF_ALL.

## Density

C arm is five lines. +~18 real JS in `dog.js` plus comments. Playbook §2b “unless C is that small.” Did not glue gnome `begin_burn`. Acceptable.

## Branch-by-branch confirm

1. After_you xyloc then leftovers then `my=xyflags`. **Match `:576–580` vs `:607`.**
2. `migrating_objs` null → skip call. **Match.**
3. Flag set + chain → `deliver_obj_to_mon(..., DF_ALL)`. **Match.**
4. `maxobj=0` drains every matching species. **Match callee.**
5. Flag left on. **Match.**
6. With_you never hits leftovers. **Match `:480`.**
7. Wander/`somexy` still skipped. **Named omit.**
8. `Wiz_arrive` still absent. **Named omit.**
9. **Public-unhit** until minetn-1 captain arrives.

## Callers / RNG ledger

C callers: `losedogs` After_you (`:397`); also `Wiz_arrive` (named). JS `losedogs` → `mon_arrive_after_you`. New dice only inside callee christen when not in mines. Public sessions do not document that captain.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Bidirectional dog↔dokick import is not a Node builtin.

## Verification

D-log: private canary **15**/15 (order, With_you skip, DF_ALL both orc otyps, HUMAN cargo stays, no-flag skip, empty list, DF_NONE remainder, Rule #2). Green+strict seed8000/0900; cohort **7**/7 + strict + seed0060 lengths. **Public-unhit** until minetn-1 captain. Cohort is shared-startup, not orctown leftovers.

## Actionable C-wrongs

None that belong on Must-fix. The cited `if` is C-shaped and the callee is LIVE.

Remaining named (map / Open, already queued elsewhere): wander/`somexy` after catchup; `Wiz_arrive`; failed_arrivals/`m_into_limbo`; kops; `MIGR_EXACT_XY` Before_you; full `mnearto` yank. Do not Must-fix “should have awaited `deliver_obj_to_mon`” (callee is sync). Do not Must-fix “dog.js must not import dokick.js” (C `dog.c` calls `dokick.c`). Do not Must-fix stolen_booty producer (D-1363, already live).

Verdict: **ACCEPT-WITH-DEBT**
