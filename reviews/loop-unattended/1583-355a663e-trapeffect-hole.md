# Review 1583 — 355a663e — trap.c trapeffect_hole whole-body restart (D-2624)

**Metadata:** SHA `355a663e`, `trap.c` `trapeffect_hole`, D-2624.
JS: `js/trap.js` only (+41/−13).

## Intent vs deliverable

Subject promises: the five missing arms — both `impossible()` bad-level
arms, both monster `pline_mon` messages, the `count_wsegs` long-worm
arm, and the `trapeffect_level_telep` tail. Diff delivers all five with
no new imports. Promise matches deliverable.

## Inventory

- `trapeffect_hole(mtmp, trap, trflags)` — restarted file-local body.
- No import changes, no deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `trap.c:2012–2067` (56 L, via `csym.mjs trapeffect_hole`;
caller `:2964`; `:1857` in uhitm.c is a comment). Full C body read
here. Arm-by-arm confirm (full restarted body read at this SHA):

- Hero: `!Can_fall_thru` → seetrap + `impossible('dotrap: %ss…',
  trapname)` + Finished (`:2018–2024`); else `fall_through(true,
  trflags & TOOKPLUNGE)` then falls to the final Finished return
  exactly like C — exact.
- Monster locals `tt/mptr/in_sight/forcetrap/Sokoban/inescapable`
  (`:2026–2031`) — exact.
- Bad-level `impossible('mintrap: %ss…')` + Finished (`:2033–2036`) —
  exact; the `%s` substitution is the live `display.js:8055`
  impossible envelope (body verified: `/%[%sd]/g` replace).
- Big/floater arm (`:2037–2061`): `!grounded(mptr) || (wormno &&
  count_wsegs(mtmp) > 5)` — fixes the old `(wormno|0)>5` C-wrong —
  `|| msize >= MZ_HUGE` — exact.
- forcetrap pair seetrap-then-`pline_mon` with TRAPDOOR→`mon_nam` /
  HOLE→`Monnam` in C message order (`:2042–2055`) — exact.
- Inescapable yank `pline_mon`-then-seetrap with `else return Finished`
  restored (`:2056–2061`) — exact.
- Tail `return trapeffect_level_telep(mtmp, trap, trflags)` (`:2062`) —
  routes through the pre-existing verified file-local (D-1224/D-0782)
  instead of the old direct `mlevel_tele_trap` bypass — exact.

RNG: none in C, none in JS. Async shape correct throughout
(`fall_through` / `impossible` / `pline_mon` awaited; returning the
async tail's promise from the async fn adopts it).

Callee closure (`sym.mjs`): `trapeffect_level_telep` file-local
(trap.js:3893, pre-existing verified), `count_wsegs js/worm.js:126
sync`, `fall_through js/trap.js:3922 ASYNC` — all LIVE or verified
file-local (`seetrap`/`impossible`/`pline_mon` display.js, `trapname`
file-local, `grounded` monsters.js, `Monnam`/`mon_nam` do_name.js).
No stub, no silent omit; "Named: none new" accurate.

## Hallucinations / overclaim

None. The five claimed arms map 1:1 onto the hunks.

## Density

56-line C function, one module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads (`forcetrap` identifier matches only).
- Re-measured: `hidden-proxy.mjs verify trapeffect_hole --base
  355a663e~1 --reach-all` → `0 session(s) blocked` at baseline and
  working tree (vacuous-note path, honestly labeled) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  green/strict/cohort per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
