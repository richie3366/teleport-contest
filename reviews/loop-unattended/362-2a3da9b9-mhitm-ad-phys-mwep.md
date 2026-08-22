# Review 362 — 2a3da9b9 — uhitm.c mhitm_ad_phys mwep dmgval (D-1402)

## Metadata
- Full / short hash: `2a3da9b9e663fc58866732a54066da24cdbf1b82` / `2a3da9b9`
- Parent: `88587b68` (D-1401). This file audits **this SHA only** (seventh of nine `js/` commits since review **355**). Archive **Addressed:** D-1402 `2a3da9b9` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 23:36:27 +0200
- D-id: **D-1402**
- Stats: 10 files, +220 / −136 — `js/mhitm.js` +33 / −8 (`mhitm_ad_phys` else-if mwep).
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` mwep dmgval (named from D-1394 / review **354**). Not shade_miss. `reviews/loop-2026-08-15/` has no unpaid mwep Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_phys`. Callees `weapon.js` `dmgval` (D-1354), `worn.js` `which_armor`, `do_stone_mon`. `c-js-map/turns.md`. Kick thick / artifact_hit / rustm / poison still named.
- Prior reviews this SHA claims to close: **354** named mwep after shade.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys mwep dmgval so monster weapon hits add dmgval (plus gauntlets/min-1), instead of leftover dice only.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4142–4157` after shade (`:4136–4137`) and the still-unported kick-thick (`:4138–4141`):

```
        } else if (mwep) { /* non-Null implies AT_WEAP || AT_CLAW */
            if (mwep->otyp == CORPSE && touch_petrifies(&mons[mwep->corpsenm])) {
                do_stone_mon(...); if (mhm->done) return;
            }
            mhm->damage += dmgval(mwep, mdef);
            if (which_armor(magr, W_ARMG) && GOP)
                mhm->damage += rn1(4, 3); /* 3..6 */
            if (mhm->damage < 1)
                mhm->damage = 1;
```

`mwep` was already nulled unless AT_WEAP/AT_CLAW (`:4133–4134`), so kicks never enter. `dmgval` (`weapon.c:216`) is live (cream pie 0, shade glare D-1354). `rn1(x,y)` is `rn2(x)+y`. artifact_hit / rustm / poison follow (`:4158–4190`). Named.

Old JS: shade_miss zeroed leftover; non-shade weapon hits kept `d()` only.

The diff **does** add `else if (mwep)` corpse → `do_stone_mon` → `dmgval` → GOP `rn1(4,3)` → min 1. It does **not** port kick thick (next SHA) or artifact_hit. Named. It does **not** insert the kick arm between shade and mwep; for AT_KICK `mwep` is already null so leftover `d()` still applies vs thick hide until D-1403. Honest.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| mwep arm | C `:4142–4157`, **wired** | |
| `dmgval` | C `weapon.c:216`, **imported live** | D-1354 |
| `which_armor(W_ARMG)` | C `worn.c`, **imported live** | |
| `do_stone_mon` | C `:3944–3978`, **same-file live** | D-1352 |
| `touch_petrifies` | C, **imported live** | |
| `rn1(4,3)` | C, **imported live** | rng.js |
| `GAUNTLETS_OF_POWER` | C otyp, **wired** | objectNames |
| AT_KICK thick_skinned | C `:4138–4141`, **named omit** | next SHA |
| artifact_hit / rustm / poison | C `:4158–4190`, **named omit** | |
| purple worm vs shrieker | C `:4191–4197`, **named omit** | |
| youmonst / mhitu phys | C other arms, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `dmgval`’s `rnd`/`d` (weapon tables); GOP `rn1(4,3)` = `rn2(4)+3`. Poison `rn2(4)` not this SHA. Shade miss still no extra die.

## C ↔ JS fidelity

Shade first: zeros leftover, skip mwep. Match `:4136–4137`. Non-WEAP/CLAW `mwep=null` (bite holding a club does not add dmgval). Match `:4133–4134`.

Cockatrice corpse: `do_stone_mon`; if `mhm.done` return before dmgval. Match `:4145–4150`. Else `damage += dmgval` (not replace leftover). Cream pie `dmgval==0` then min 1 → 1 if leftover 0. Club leftover 0 → exactly `dmgval`. Match `:4152–4157`.

GOP gloves: `which_armor(magr, W_ARMG)` then `rn1(4,3)`. Match `:4153–4155`. Clamp `<1` to 1 after GOP. Match.

Kick vs thick hide at **this** SHA: mwep already null, no zeroing yet. C would have zeroed. Named D-1403.

Hallucination check: “Match C `dmgval`” while **`dmgval` is the live weapon.js function** is not a dispatch-stub lie. Do **not** stamp “Match C `artifact_hit`.” Do **not** stamp “Match C AT_KICK thick_skinned.” Do **not** stamp “Match C rustm.”

## Hallucinations / overclaim

Subject says monster weapon hits add dmgval (plus gauntlets/min-1) instead of leftover dice only. **True on the keep-path** for AT_WEAP/AT_CLAW after shade. **True that bites do not add the held wep.** **False until named for artifact/rust/poison/kick thick.** D-log “leftover 0 no wep unchanged; cream pie min-1; club leftover 0 == dmgval; AT_BITE nulls mwep; GOP + rn1(4,3); leftover 4d6 + second dmgval; shade explmm + silver AT_WEAP” are the right falsifiers. Stamping **Addressed:** D-1402 for `:4142–4157` is fair. Do **not** treat fortress PASS as a weaponed orc vs orc.

## Density

One `else if` on the existing `mhitm_ad_phys` arm. ~33 lines of JS. Playbook §2b right size. Did not glue kick thick. Did not glue artifact_hit.

## Branch-by-branch confirm

1. No wep: leftover `d()` only. Match.
2. Cream pie: dmgval 0 → min 1. Match.
3. Club leftover 0: damage = dmgval. Match.
4. AT_BITE + held wep: mwep nulled; no dmgval. Match.
5. GOP: + `rn1(4,3)`. Match.
6. Leftover 4d6 + dmgval stacked. Match `+=`.
7. Shade: still zeros; skip mwep. Match D-1394.
8. Kick thick: leftover still applies. Named next SHA.
9. **Public-unhit** unless a session has mon-vs-mon AT_WEAP/AT_CLAW AD_PHYS.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rn1(4,3)` is C, not a recorded 3–6 table. Plain ESM.

## Verification

Journal: private canary **13**/13 (C/JS grep; leftover 0 no wep; cream pie min-1; club leftover 0 == dmgval; AT_BITE nulls mwep; GOP + rn1(4,3); leftover 4d6 + second dmgval; D-1394 shade explmm + silver AT_WEAP; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not a monster weapon hit.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The mwep arm matches `:4142–4157`; `dmgval`/`which_armor`/`do_stone_mon` are live.

Named omits (map / already-Open, not Must-fix):

1. AT_KICK `thick_skinned` (next SHA)
2. `artifact_hit` / `rustm` / `mhitm_really_poison` (`:4158–4190`)
3. purple worm vs shrieker cap
4. youmonst `damageum_ad_phys` / mhitu `mhitm_ad_phys_u`

Do not Must-fix “replace leftover with dmgval” (C `+=`). Do not Must-fix “add dmgval on AT_BITE” (C nulls mwep). Do not Must-fix “skip min-1 on cream pie” (C clamps). Do not Must-fix “zero kick vs hide in this SHA” (named next).

## Callers / RNG ledger

C: `dmgval` dice then maybe `rn1(4,3)`. JS same. Public fortress rarely hits this leftover. explmm AD_PHYS still uses this arm (D-1394).

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: AT_WEAP/AT_CLAW `mdamagem` now adds live `dmgval` plus GOP/min-1 after shade; kick thick and artifact_hit stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1402 `2a3da9b9` already stamped.
