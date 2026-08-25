# Review 424 — 99a31c84 — zap.c zap_steed WAN_OPENING/SPE_KNOCK via bhitm (D-1463)

## Metadata
- Full / short hash: `99a31c8477dafd089b654b9cb5e1d4675aec47f5` / `99a31c84`
- Parent: `849d7532` (comment heal). This file audits **this SHA only** (sixth of nine `js/` commits since review **418**). Archive **Addressed:** D-1463 `99a31c84` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 11:06:23 +0200
- D-id: **D-1463**
- Stats: 10 files, +109 / −29 — `js/zap.js` +26 / −7.
- Claims to close: Open `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm (named from D-1462 / review **422**). Not drain. `reviews/loop-2026-08-15/` has no unpaid steed-opening Must-fix.
- JS / map: `zap.js` `zap_steed` / existing `bhitm` OPENING/KNOCK (D-0981). Caller `weffects` `:3437–3439`. `c-js-map/turns.md` + `debt.md`. Remaining bhitm-routed steed otyps named.
- Prior reviews this SHA claims to close: **415** named remaining `zap_steed` after TELE; **422** named `zap_steed` OPENING after doorlock.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_steed WAN_OPENING/SPE_KNOCK via bhitm so a downward opening wand or knock spell while riding hits the steed instead of skipping zap_steed.”

C `zap_steed` `:3087–3140`: set `bhitpos` to steed, `notonhead=FALSE`. PROBING and TELEPORT have special arms. Then `:3115–3134` “Default processing via bhitm()” lists CURE_SICKNESS / INVIS / CANCEL / POLY / STRIKING / SLOW / SPEED / HEAL / DRAIN / **OPENING / KNOCK**: `(void) bhitm(u.usteed, obj); steedhit = TRUE`. Default `FALSE`. Caller `weffects` `:3437–3439`: if mounted, `!dx && !dy`, `dz>0`, and `zap_steed` true → `disclose=TRUE` and **skip** IMMEDIATE `bhit`/`zap_updown`. So a riding-down knock must **not** run D-1454 `zap_updown` OPENING (portcullis). `learnwand` still fires from `disclose` even when `bhitm` leaves `learn_it` false (bare unsaddled hit).

C `bhitm` `:382–432` (already D-0981): box_or_door mimic `that_is_a_mimic`; `wake=FALSE`; ustuck `release_hold`; else `openholdingtrap` / `openfallingtrap`; else SPE_KNOCK `mhurtle(rnd(2))` or “doesn't budge” + `wakeup`/`abuse_dog`; else WAN_OPENING saddle `mdrop_obj`.

Old JS: `zap_steed` defaulted OPENING/KNOCK (`steedhit=false`) so `weffects` fell through to `zap_updown` (D-1454) — C-wrong vs `:3437–3439`. `bhitm` OPENING/KNOCK already live for lateral zaps.

The diff **does** add `case WAN_OPENING: case SPE_KNOCK: await bhitm(steed, obj); steedhit = true`. It **does not** change `bhitm` bodies (comments only). It **does not** add drain/cancel/poly/invis/striking/slow/speed/heal steed arms. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_steed` OPENING/KNOCK arm | C `:3130–3133`, **wired this SHA** | |
| `weffects` steed-down gate | C `:3437–3439`, **pre-existing** | disclose if `zap_steed` true |
| `bhitm` WAN_OPENING/SPE_KNOCK | C `:382–432`, **imported live** (D-0981) | |
| `mhurtle` / `which_armor(W_SADDLE)` | C, **imported live** | |
| saddle drop | C `mdrop_obj`, **pre-existing clone** | extract+`place_object` |
| `that_is_a_mimic` box_or_door | C `:384–385`, **named omit** | JS `seemimic` any disguise |
| remaining `zap_steed` bhitm otyps | C `:3116–3129`, **named omit** | drain next at this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** riding-down SPE_KNOCK now reaches `rnd(2)` in `mhurtle` (already in `bhitm`). Public fortress does not zap opening while mounted.

## C ↔ JS fidelity

`zap_steed` already set `bhitpos` to steed mx,my and `notonhead=false` (C `:3091–3092`). OPENING/KNOCK now `bhitm` then `steedhit=true` then `return steedhit`. Match `:3130–3134` / `:3140`. **Callee is not a stub.** Hallucination check: “Match C via bhitm” while **`bhitm` OPENING/KNOCK is live** (saddle / `mhurtle` / traps) is **not** a dispatch-stub lie.

`weffects`: `usteed && oc_dir!=NODIR && !dx && !dy && dz>0 && zap_steed`. JS uses `!(dx|0) && !(dy|0) && (dz|0)>0`. Match. True steedhit skips `zap_updown`. That is the C order this SHA restores.

`bhitm` `:382–432` at this SHA (unchanged bodies):

1. Disguised mimic: C `box_or_door` then `that_is_a_mimic(MIM_REVEAL)`. JS `seemimic` for any `disguised_mimic`. Named omit (D-0981). Steed is not a mimic in normal play.
2. `wake=false`. Match.
3. `mtmp == ustuck` → `release_hold`. Riding hero is not ustuck-as-steed typically.
4. `openholdingtrap` / `openfallingtrap` then break. JS `{happened,noticed}` wrapper; `noticed` → `learn_it`. `openholdingtrap` treats `mon===usteed` as ishero (pre-existing). C comment says steed zap prefers traps over saddle — JS still tries traps first.
5. SPE_KNOCK: `wake=true`; C `ret=1` ignored by `zap_steed` `(void)`. Size `< MZ_HUMAN && !steadfast` → pline + `mhurtle(..., rnd(2))` else “doesn't budge”; if alive `wakeup`/`abuse_dog`. Match dice and order.
6. Else WAN_OPENING saddle: messages then `mdrop_obj`. JS inlines extract/wornmask/`place_object`/`stackobj`/`newsym`. Clone vs `mdrop_obj` (no `update_mon_extrinsics` polish). Pre-existing; D-log of D-1463 does not re-name it. Typical saddle drop still happens.

Disclose: `weffects` `learnwand` on `disclose` from `zap_steed` true, plus `more_experienced` if was unknown. Bare saddle-less OPENING still identifies the wand. Match D-log.

## Hallucinations / overclaim

Subject says downward opening/knock while riding hits the steed instead of skipping `zap_steed`. **True:** `steedhit=true` → no `zap_updown` portcullis path; `bhitm` saddle or knock-back. **False until named** for remaining bhitm-routed steed otyps, `that_is_a_mimic` box_or_door, `mdrop_obj` vs inline. Stamping **Addressed:** D-1463 for the **steed switch arm** is fair. Do **not** stamp “Match C zap_steed SPE_DRAIN_LIFE.” Do **not** treat fortress PASS as a riding-down knock.

## Density

One `zap_steed` otyp pair through existing `bhitm`. ~10 lines of real JS plus comments. Playbook §2b. Did not glue drain. Acceptable.

## Branch-by-branch confirm

1. Riding, `dz>0`, WAN_OPENING: `bhitm(steed)` then disclose. Match `:3130–3133` / `:3437–3439`.
2. Saddle present, no holding/falling trap: saddle falls. Match `:417–430`.
3. No saddle: `bhitm` no-op besides wake=false; still disclose. Match.
4. SPE_KNOCK small steed: `rnd(2)` `mhurtle`. Match `:401–408`.
5. SPE_KNOCK large/steadfast: “doesn't budge.” Match `:409–411`.
6. SPE_KNOCK SPBOOK skip makeknown inside `learnwand`; `disclose` still IDs if wand. Spellbook: `learnwand` no-ops; `was_unkn` XP still if disclose. Match.
7. Drain/cancel/poly still default `zap_steed` false → `zap_updown`. Named.
8. No steed / dx / dz<0: `zap_steed` not taken. Unchanged.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. `rnd(2)` is C `:408`, not a recorded index.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; riding-down wand drops saddle + disclose learn+XP; bare steed still disclose; SPE knock-back/stun + SPBOOK skip makeknown; teleport/probing siblings; drain/cancel/locking still default; no-steed / dx / dz<0 skip); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps opening/knock while riding down. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch reaches live `bhitm`. `steedhit` restores C `weffects` skip of `zap_updown`.

Named omits (map / Open, not Must-fix):

1. remaining `zap_steed` bhitm-routed — drain first at this SHA (later D-1464)
2. `bhitm` OPENING `that_is_a_mimic` box_or_door (JS blanket `seemimic`)
3. saddle `mdrop_obj` vs inline extract
4. `bhito` boxlock / doorlock LOCKING

Do not Must-fix “drain should have shipped in this SHA.” Do not Must-fix “dispatch is a stub.” Do not Must-fix “zap_updown OPENING should still run while mounted” — C skips it.

## Callers / RNG ledger

C callers: `weffects` only. Dice: SPE_KNOCK `rnd(2)` plus `mhurtle` internals; WAN_OPENING saddle path has no extra `rn2` at this locus. Public fortress does not hit the new arm.

`zap_steed` PROBING/TELEPORT arms unchanged. `bhitpos` / `notonhead` still set before `bhitm` so `notonhead` is false (C `:3092`) — steed is the head.

Verdict: **ACCEPT-WITH-DEBT**
