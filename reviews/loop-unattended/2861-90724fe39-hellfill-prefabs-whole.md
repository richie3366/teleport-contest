# Review 2861 — 90724fe39 — hellfill rnd_hell_prefab whole (10 prefabs + 3 gates)

## Metadata

- SHA: `90724fe39f1c17aba2b41dadfb2b4c02d0ac6e4a` (D-4019)
- Cliff writer: Open — cliffs row 4 @8595ef25e (unattributed
  worldtour-Samurai-50358004 s150; rows 1–3 skipped as D-4016
  dupe-rc kin with same-iteration re-verify)
- js/ diff: `js/mklev.js` +265/-8 (prefab table + picker + 3
  gate lines + roomtype sync); `scripts/hellfill-prefab.test.mjs`
- Method: full per-function (cliff commit)

## Intent vs deliverable

Promise: port `dat/hellfill.lua` `rnd_hell_prefab` (:300-317)
whole — 10 prefabs in lua order with byte-exact maps, 3 style
gates, plus making `get_table_roomtype_opt` sync so prefab 6's
table-form region lands before `lspo_map`'s origin reset and
the altar's `percent(75)`. One cause heals 6 sessions (4 PASS +
2 RNG-full).

Diff actually: `hellfill_rnd_halign/valign`,
`HELLFILL_PREFABS` (10 entries), `hellfill_rnd_hell_prefab`,
3 gate wirings, roomtype sync + await drop, omit-comment
close-outs. Promise == diff.

## Inventory

- `hellfill_rnd_halign/valign` (`js/mklev.js:28469-28477`,
  lua `:85-93`): first-match roll over 3 aligns. Exact.
- `HELLFILL_PREFABS` (`:28491-28721`, lua `:99-298`): 10
  entries, tables at 1/2/4/5/10 (repeatable), bare functions
  else — lua order preserved (pick distribution is
  order-sensitive).
- `hellfill_rnd_hell_prefab` (`js/mklev.js:28727`, lua
  `:300-317`): do/while + `:314` short-circuit
  (`!(repeatable && lua_random2(0,nloops*2)===0)` draws the
  re-roll only for tables) + `nloops>5` cap. Exact.
- `get_table_roomtype_opt` (`:24377`, C `:4004-4020`):
  async→sync, error arm `void impossible`.
- 3 gate edits in hells[2]/[4]/[6] styles.

## C ↔ JS fidelity

- **Maps, byte-compared here** (lua `[[` bodies vs JS
  literals): P1/P4/P5/P6/P7/P10 exact; P9 both variants
  exact; P2/P3/P8 differ by one trailing `\n` only. Null:
  C `mapfrag_fromstr` (`sp_lev.c:227-252`) and JS
  (`js/mklev.js:30498`) both ignore a trailing newline for
  `hei`, and `mapfrag_get` (`:265-271`, stride `wid+1`,
  `y<hei`) never reads it. All rows rectangular, so the
  stride reads identically.
- **Contents RNG order:** P3 shuffle→count-roll→shuffle→
  `3+lua_random2(1,5)` creates; P6 region-then-`percent(75)`
  altar; P7 `mons[rn2(4)]`; P8 `"L"` at 4,4 (`04`==4); P9
  `percent(30)` then per-patch `lua_random2(3,15)`; P10
  per-strip `lua_random2(3,75)` — all mirror lua evaluation
  order, and `des.map` arg rolls precede contents on both
  sides.
- **P3 coldhell replace** (`:163-165`, no chance arg → C
  default 100, `lspo_replace_terrain` `:5088`): C draws
  `rn2(100)<chance` per matched cell even at 100
  (`:5129-5133`); JS `lspo_replace_terrain_region`
  (`:32884`) does the same `match && rn2(100)<ch`. RNG-identical.
- **Gates:** hells[2] `percent(25)→(false)` (`:341-343`);
  hells[4] `cwid==1`, F+`percent(80)` short-circuit kept with
  the `25*math.random(4)` burn in the named-omit envelope,
  `elseif percent(25)→(false)` (`:363-369`); hells[6]
  `cwid==1 and percent(25)→(true)` (`:408-410`). All match.
- **Sync change:** `lspo_region`'s only await is the contents
  call (`:2157`), so no-contents prefab calls run fully sync
  through the async entry; contents await kept. Other
  roomtype callers (`:1819`, `:24592`) keep `await` on the
  plain value — safe. `void impossible` matches the
  `get_location` `:22104` precedent.
- Callees (`lspo_map/region/drawbridge/altar/exclusion`,
  `splev_create_monster` rx/ry via `get_location_coord`,
  `selection_fillrect_rel`, `nhlib_shuffle`): all LIVE
  same-module, no new edges. `sym.mjs`: roomtype sync,
  lspo_map sync, lspo_region async-with-sync-no-contents
  path; picker local-only (lua has one function — no drift).

No FORCE/DIAG/seed/coordinate artifacts in the diff (grep 0).

## Hallucinations / overclaim

None. "11/11 incl. both prefab-9 variants" reproduces here
(10 literals + P9 join pair, modulo the 3 null trailing
newlines the D-log does not mention — behaviorally void, see
above). The D-4016-kin skip documents its own re-verify
(reserve/step-0/recipes still duped/falsifier unfired).

## Density

Cliff commit on the live head (rows 1–3 parked TOOLING-ENV,
re-verified, not re-ported); writer ported whole with every
caller wired (only hellfill calls it — 3 gates). `Ledger:`
load_special partial + lspo_region/get_table_roomtype_opt
ported with accurate notes. Omits named in-commit (iron-bar
replace, hellobjects/monsters, ice fidelity, 2 residuals).

## Verification

Re-measured on HEAD code (`show`, exact match to the D-log):
probe Samurai-50358004 RNG-full 81348/81348, screen @1074;
Archeologist-49956066 PASS; Caveman-50255525 PASS
(113625/113625, 651/651); Ranger-50050090 RNG-full
101994/101994, screen @1023; Ranger-578209 PASS
(79199/79199, 1654/1654); Wizard-50650000 PASS. 4 PASS + 2
moved, 0 no-movement, 0 worse — claim holds, no later-SHA
regression. Unattributed owners make `verify <fn>` vacuous
(D-4015 precedent applies).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
