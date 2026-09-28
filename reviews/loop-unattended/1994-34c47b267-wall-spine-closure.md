# Review 1994 — 34c47b267 — mkmaze.c wall-spine closure (D-3034)

Metadata: SHA `34c47b267` (D-3034). Five-function closure of
one C file: `fix_wall_spines` restart + C-name renames
(`isWallTile`→`iswall`, `isWallOrStone`→`iswall_or_stone`)
+ `okay`/`check_ransacked` split-name documentation
(bodies pre-existing). (Follow-up `953aea809` touches only
docs/ledger — not reviewed per the js-only rule.) Subject
promises the panic arm with C-name helpers.

## Intent vs deliverable

Promise: restarted `fix_wall_spines` (js/mklev.js:32463)
with per-arm cites — panic first, JS-only `!map` guard
marked, loc_f/extend_spine arms via the renamed helpers;
`extend_spine` untouched (D-3014). Diff adds exactly that
(67-line hunk). Promise kept.

## Inventory

- `fix_wall_spines` (js/mklev.js:32463, exported):
  restarted whole.
- `iswall` (js/mklev.js:32426, file-local): pure rename,
  body identical.
- `iswall_or_stone` (js/mklev.js:32420, file-local): pure
  rename, body identical.
- `maze_okay` (split name for `okay`, js/mklev.js:20650):
  comment-only cite this commit; body pre-existing.
- `check_ransacked` (no JS symbol — inline ASSIGN in
  `makemaz`, js/mklev.js:2926): pre-existing; covered by
  the verify list.
- Deleted symbols `isWallTile`/`isWallOrStone`: zero
  stragglers repo-wide (grep) — rename complete.

## C ↔ JS fidelity

### fix_wall_spines — verdict: exact-C, ACCEPT

C (`mkmaze.c:228–287`, csym range) walked whole.
Spine table identical (16 entries, VWALL/HWALL/corners in
order). Panic arm `:252–253` first, before any state read
≡ C order; `throw new Error('wall_extends: ...')` keeps
the message text and values (NORETURN→throw is the house
deltrap idiom; bounds are C-impossible — all four call
sites clamp). `if (!map) return` honestly marked JS-only.
Loop `:256–285`: `map.at` ≡ `&levl[x][y]`, `?? STONE`
read guard, `IS_WALL && !== DBWALL` gate, loc_f ternary on
`within_bounded_area` (baalz inarea) choosing `iswall`
inside / `iswall_or_stone` outside, 3×3 locale with unread
center (C leaves `locale[1][1]` unset stack garbage that
`extend_spine` never reads — JS `0` is outcome-equivalent),
NSEW bits always via `iswall`, `if (bits)` write so a
free-standing wall keeps its typ (`spine_array[0]` VWALL
never written). No RNG.

### iswall — verdict: exact-C, ACCEPT

C (`:44–55`): `!isok→0`, then `IS_WALL||IS_DOOR||
LAVAWALL||WATER||SDOOR||IRONBARS`. JS identical
predicate, `? 1 : 0` ≡ C int return. Pure rename of a
byte-identical body.

### iswall_or_stone — verdict: exact-C, ACCEPT

C (`:58–66`): out-of-bounds = stone (`return 1`), else
`typ == STONE || iswall`. JS identical. Pure rename.

### okay (as maze_okay) — verdict: exact-C, ACCEPT

C (`:296–305`): two `mz_move` steps, then `x<3||y<3||
>x_maze_max||>y_maze_max||typ!=STONE → FALSE`. `mz_move`
macro order (0=N ‑‑Y, 1=E ++X, 2=S ++Y, 3=W ‑‑X) ≡ the JS
`step` closure; two `step(dir)` calls ≡ the double macro;
bounds + STONE test identical (`?.typ === STONE` returns
boolean). Both C callers (`:1259`, `:1300`) are walkfrom's
direction loop — wired via `maze_okay` at js/mklev.js:20680
(pre-existing). (C's `default: panic` on bad dir has no JS
arm — dir comes from a 0..3 loop; unreachable, pre-existing.)

### check_ransacked — verdict: exact-C (inline), ACCEPT

C (`:706–711`): `gr.ransacked = (uz.dnum == mines_dnum
&& !strcmp(s, "mineten-1"))`. JS makemaz line 2926 assigns
the identical predicate on the pre-`.lua` stem. No JS
symbol is correct — it is a one-line kludge, and the
verify list covers it by name.

### Callee closure — verdict: ACCEPT

Per arm: `extend_spine` LIVE (untouched), `iswall` /
`iswall_or_stone` LIVE locals, `within_bounded_area` LIVE,
`panic` → throw (idiom). No stub, no clone, no omit —
"D-3034 Named: none" holds.

### Caller — verdict: wired, ACCEPT

All four C call sites wired: `:293` wallification →
js/mklev.js:32509; `sp_lev.c:915` → :19349; `objnam.c:3833`
→ js/readobjnam.js:720; `zap.c:5271` → js/zap.js:1156.

## Hallucinations / overclaim

None. "Named: none" verified true arm-by-arm above.

## Density

Five-function single-file closure + renames. Right-sized.

## Verification

Re-measured (all five in one call, `--base 34c47b267~1
--reach-all`): 0 blocked (honest vacuous) per function +
smoke 24 PASS, 0 regressed per function → REACH-OK all
five. Zero REGRESSED. Matches the pasted tail.

## Actionable C-wrongs

None.

Ledger: all five ported, REACH-OK via smoke. Verify
lines: hidden vacuous (honest) + smoke, per function.

Verdict: **ACCEPT**
