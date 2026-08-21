# Review 330 — 90eca343 — dokick.c kick_ouch/kick_dumb air/Lev hurtle (D-1370)

## Metadata
- Full / short hash: `90eca343b8959c214b5fac067c305559e5a99fa7` / `90eca343`
- Parent: `46c4e1b0` (D-1369). This file audits **this SHA only** (last of four `js/` commits since review **326**). Archive **Addressed:** D-1370 lacked the short hash; this review commit fills `90eca343`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 14:53:32 +0200
- D-id: **D-1370**
- Stats: 9 files, +118 / −39 — `js/dokick.js` +35 / −6 (`Levitation` helper + two hurtle calls).
- Claims to close: Open `dokick.c` kick_ouch/kick_dumb airlevel/Levitation `hurtle` (named from D-1361 / review **321**). Not no_kick. `reviews/loop-2026-08-15/` has no unpaid kick-hurtle Must-fix.
- JS / map: `dokick.js` `kick_dumb` / `kick_ouch`; callee `dothrow.js` `hurtle` (D-1038 / D-1165 / D-1277). `c-js-map/turns.md`. Monster-kick recoil / `kick_object` air still named.
- Prior reviews this SHA claims to close: **321** named `:904–905` hurtle as remaining after drawbridge remap. **322** named swallow/pit-brace/Lev **after getdir** — a different locus; not this SHA.

## Intent vs deliverable

Git subject promises: “Match C dokick.c kick_ouch/kick_dumb so an air-level or levitating kick actually recoils via hurtle, instead of staying put.”

C `kick_dumb` (`dokick.c:876–877`): `(Is_airlevel(&u.uz) || Levitation) && rn2(2)` then `hurtle(-u.dx, -u.dy, 1, TRUE)`. C `kick_ouch` (`:903–905`): after `losehp` (noreturn on death), `if (Is_airlevel || Levitation) hurtle(-u.dx, -u.dy, rn1(2, 4), TRUE)`. Macro `youprop.h:235–240` Levitation `((H||E)&&!B)`. `confer_oc_oprop` **does** mirror `ELevitation` (`do_wear.js:285–288`, D-0976 / D-1070). Callee `dothrow.c` `hurtle`.

Old JS: `// Airlevel / Levitation hurtle deferred` after strain / after `losehp`.

The diff **does** a local youprop helper (not sticky `u.Levitation`), dumb short-circuit then range-1 `hurtle`, ouch skip when `_losehp_needs_done` / gameover else `rn1(2,4)`. It does **not** port monster-kick recoil `:1427–1439` or `kick_object` air `:1456–1458`. Named. `hurtle` is a **live** import (`dothrow.js:2765–2811`), not a stub.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `kick_dumb` air/Lev | C `:876–877`, **wired** | short-circuit then range 1 |
| `kick_ouch` air/Lev | C `:904–905`, **wired** | after losehp; `rn1(2,4)` |
| `Levitation()` | C `youprop.h:240`, **clone matching D-1070** | `(H\|\|E)&&!B` flats; confer mirrors E |
| `hurtle` | C `dothrow.c`, **imported live** | D-1038; Punished/utrap/nomul |
| `Is_airlevel` | C `dungeon.h` Lcheck, **imported live** | `const.js` vs `game.air_level` |
| `rn2(2)` / `rn1(2,4)` | C, **imported live** | dumb maybe; ouch always when if |
| `losehp` noreturn skip | C implicit, **wired** | `_losehp_needs_done` / gameover |
| `u.dx` / `u.dy` | C kick dir, **pre-existing** | dokick getdir already writes these |
| monster recoil / `kick_object` air | C `:1427–1458`, **named omit** | other callers |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** dumb `rn2(2)` only when air\|\|Lev (grounded short-circuits **before** `rn2`); ouch `rn1(2,4)` = `rn2(2)+4` → 4..5 only when air\|\|Lev **and** survive `losehp`. Grounded ouch burns **zero** hurtle dice.

## C ↔ JS fidelity

`Levitation()` matches review **31** / D-1070 `engrave.js` clone: H/E flats and `!BLevitation`. confer writes boots/ring to `uprops[LEVITATION].extrinsic` **and** `u.ELevitation`. Sticky `u.Levitation` is still never assigned in scored `js/` (D-1070). This is **not** the D-1367 Antimagic miss — ANTIMAGIC flats are unmirrored; LEVITATION flats **are** mirrored. Do not Must-fix “OR uprops[LEVITATION] instead of H/E” (review **30** forbade that substitute).

`kick_dumb`: exercise/strain envelope unchanged; then `(Is_airlevel(uz) || Levitation()) && rn2(2)` → `hurtle(-dx,-dy,1,true)`. C short-circuit: grounded skips `rn2(2)`. JS `&&` same. Range 1 is C “light.” `hurtle` verbose true → `"You float in the opposite direction."` when range==1 (`dothrow.js:2792–2794`). Match.

`kick_ouch`: `rnd(CON)` `losehp` then return if fatal (`hack.js` sets `_losehp_needs_done` + gameover — C `done` is noreturn). Else `Is_airlevel || Levitation` (no extra `rn2`) then `hurtle(..., rn1(2,4), true)`. `rn1` is an argument so it burns only when the `if` is true — clang/JS left-to-right. Range 4..5 is C “heavy.” Match `:903–905`.

`Is_airlevel` compares `u.uz` to `game.air_level` (`const.js:2998`) ≡ C `Lcheck`. Airlevel recoils **even if** `BLevitation` (C `Is_airlevel || Levitation` — air first). JS same. `u.dx` is how `dokick` already stores getdir (pre-existing `kick_monster` / `kick_object`).

Hallucination check: “Match C `kick_ouch`/`kick_dumb` hurtle” while **`hurtle` is live** is not a dispatch-stub lie. Do **not** stamp “Match C monster-kick recoil.” Do **not** stamp “Match C `kick_object` air.” Do **not** stamp “Match C swallow/pit-brace Lev after getdir” (**322** named omit, different locus).

## Hallucinations / overclaim

Subject says an air-level or levitating kick recoils via hurtle instead of staying put. **True for `kick_dumb` empty space and `kick_ouch` solid** when air or (H\|\|E)&&!B. **False for kicking a monster / object** until those later `hurtle` calls. D-log “Not this iter” is honest. Stamping **Addressed:** D-1370 for `:876–877` + `:904–905` is fair. Do **not** treat fortress PASS — including seed0060 kick — as `"You float in the opposite direction."` unless that session was air/lev.

## Density

Two `if`s inside functions this module already owns, plus an already-live callee. ~35 lines. Playbook §2b “one deferred `if` alone” is **thin**, but this was the queued Open row after D-1361 (review **321** told the next iter to ship hurtle inside `kick_ouch`, not stack another remap). Did not glue `u_wipe_engr` allmain (next Open). Acceptable fortress map pop. Did not combine with D-1368’s Shock C-wrong.

## Branch-by-branch confirm

1. Grounded `kick_dumb`: no `rn2(2)`; no hurtle. Match `:876` short-circuit.
2. Levitation H or E, `!B`: `rn2(2)` then maybe range-1 hurtle. Match.
3. `BLevitation` grounded: helper false; no `rn2`. Match.
4. Airlevel + `BLevitation`: air first; still `rn2(2)`. Match.
5. Grounded `kick_ouch`: `losehp`; no `rn1`; no hurtle. Match `:904` false.
6. Levitation `kick_ouch` survive: `rn1(2,4)` range 4..5; `"You hurtle…"`. Match.
7. Fatal `losehp`: skip hurtle (C noreturn). Match JS done flag.
8. `hurtle` Punished uncarried ball: tug + return (callee). Pre-existing live.
9. `hurtle` `utrap`: anchored pline (callee). Pre-existing live.
10. Monster recoil / `kick_object` air: not called. Named.
11. **Public-unhit** unless a session kicks while air/lev.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `Is_airlevel` is dungeon identity, not a recorded coordinate. `rn1(2,4)` is the C expansion, not a seed-shaped range. Plain ESM. `await hurtle` is in-process.

## Verification

Journal: private canary **18**/18 (C/JS grep; grounded no recoil; H/E hurtle range>1 + recede; BLev blocks; airlevel despite B; fatal losehp noreturn; live dokick `kick_dumb` float-or-skip never hurtle; grounded skips `rn2(2)`; Rule #2); green+strict seed8000/0900; focused seed0060; cohort **8**/8 + strict 1500/1800/0012/0004/0007/2200/0383 + seed0060. **Public-unhit** on air/lev kick. This audit cadence: full `sessions` at HEAD `90eca343` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS including seed0060 is not Plane-of-Air recoil.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The two `if`s match `:876–877` and `:904–905` branch order and RNG; `hurtle` is the real function; Levitation flats match D-1070 because confer mirrors `ELevitation`. Monster/`kick_object` air are named omits of **other** call sites. D-1368 Shock is **328**, not this file.

Named omits (map / already-Open, not Must-fix):

1. dokick monster-kick recoil `:1427–1439`
2. `kick_object` air `hurtle` `:1456–1458`
3. swallow / pit-brace / Lev after getdir (**322**)
4. shop-town watchman

Do not Must-fix “always `rn2(2)` on grounded dumb” (C short-circuits). Do not Must-fix “ouch also `rn2(2)`” (C does not). Do not Must-fix “sticky `u.Levitation`” (never written; D-1070). Do not Must-fix “OR uprops[LEVITATION] and skip H/E.”

## Callers / RNG ledger

C dumb: `rn2(2)` only if air\|\|Lev, then hurtle internals. C ouch: `rn1(2,4)` only if air\|\|Lev after survive. JS same. Public fortress never enters those `if`s.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: empty-space and solid kicks now recoil through live `hurtle` when air or levitating; monster/object air stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1370 `90eca343`.
