# Review 2874 — 6aed804b1 — hells[4] iron-bar replace wired to lspo_replace_terrain

## Metadata

- SHA: `6aed804b11644617f1d624f7e21f9ceb1dcc2d19` (D-4033)
- Cliff: `sp_lev.c` lspo_replace_terrain row, 2 sessions
  (sweep-Ranger-50556011 s605, worldtour-Valkyrie-50056020
  s275; parent-block row 10, first live row)
- js/ diff: `js/mklev.js` +7/-3 (gate arm + comment);
  `scripts/hellfill-ironbar.test.mjs` (new)
- Method: full per-function (cliff commit, 1 wiring)

## Intent vs deliverable

Promise: the hells[4] `cwid==1` iron-bars arm burned its
gate RNG then dropped it (`void chance`, D-4019 named
omission 1) while C runs `des.replace_terrain` with the
`".\nF\n."` mapfragment. Call the live whole same-module
`lspo_replace_terrain` with the chance burned before the
call (lua table-constructor order). Ranger PASS, Valkyrie
275 → mcast_weaken_you@493.

Diff actually: the call + the comment close-out.
Promise == diff.

## Inventory

- `hellfill_style_maze_wall_replace` (`js/mklev.js:28329`;
  lua `hellfill.lua:355-370`): the `:366` arm now calls
  `lspo_replace_terrain({ mapfragment: '.\nF\n.',
  toterrain: '.', chance })`.

## C ↔ JS fidelity

- Lua `:363-369` (read): `cwid==1` → `wallterrain[1]=="F"
  and percent(80)` → `replace_terrain({mapfragment =
  ".\nF\n.", toterrain = ".", chance = 25*math.random(4)})`
  `elseif percent(25)` → prefab. JS mirrors it: `[0]`
  (0-indexed first) `=== IRONBARS && percent(80)` with
  C-identical short-circuit (percent burns only under F),
  `chance = 25 * lua_random2(1, 4)` before the call,
  `elseif percent(25)` untouched. Mapfragment bytes
  identical; `wallterrain` shuffle shape is D-4019's
  (reviewed in 2861).
- Owner line: C `sp_lev.c:5127` (read) is
  `mapfrag_match(mf,x,y) && rn2(100) < chance` — the
  divergence's exact draw. The JS callee's arm
  (`mklev.js:2060`, read) is that expression verbatim,
  short-circuit order included.
- Callee whole: `lspo_replace_terrain` (`:1991-2079`,
  read in full) tracks C `:5051-5143` cite-by-cite
  (param/mapchr validation, mf parse+error, chance/lit/
  region/selection opts with C defaults, selection build,
  clamped x-outer/y-inner loops, freesel, return 0).
  Single live `lspo_replace_terrain({` caller: this arm
  (`grep`); the sel/region twins keep theirs. No symbol
  deleted or re-pointed (N/A paste); same-file edge.
- Grep of the hunk: clean. Rule #2 clean (HEAD).

## Hallucinations / overclaim

None. The bundled questtour-50250094 stale→PASS flip is
real (board row PASS, owner null — re-checked on the
working board). The Valkyrie residual is named as its own
future row, not smuggled as movement.

## Density

Legitimate head work: parent-block row 10 with rows 1–9
unattributed (8 dupe-rc kin re-verified + the 95340 park,
per the in-commit forensics). One arm of one cause;
D-4019's standing omits (hellobjects, hells[6] ice)
carried, not re-solved. `Ledger:` load_special partial
re-stamped (D-4033).

## Verification

Re-measured `--base 6aed804b1~1 --no-reach`: `verify
lspo_replace_terrain: 1 PASS, 1 moved past, 0 unchanged, 0
worse → PROGRESS` (Ranger PASS; Valkyrie 275 →
mcast_weaken_you@493) — exact match. Focused test 1/1.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
