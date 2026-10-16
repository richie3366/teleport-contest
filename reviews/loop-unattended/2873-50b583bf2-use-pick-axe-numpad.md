# Review 2873 — 50b583bf2 — use_pick_axe dirsyms through the live binds

## Metadata

- SHA: `50b583bf2f7673e0ce6aa6fb87895b12bad55774` (D-4032)
- Cliff: `dig.c` use_pick_axe row, 6 sessions (parent-block
  row 9, first live row; RNG full in all 6)
- js/ diff: `js/dig.js` +27/-42 (loop rewrite, imports,
  DIG_DIR_CHARS deletion), `js/dokeylist.js` +8/-5
  (cmd_from_dir rows 8,9); focused test (new)
- Method: full per-function (cliff commit, 2 functions)

## Intent vs deliverable

Promise: C shows numpad digits in the dig prompt, JS fixed
vi letters (D-2166's named omission: the cmd_from_dir
binding table unported). Run the loop in C order through
the live `cmd_from_dir`/`movecmd` exports; extend
cmd_from_dir to rows 8,9 via down/up; delete the fixed
table. 5 PASS, Monk 27 → getpos@612.

Diff actually: the loop + the 8,9 arm + the deletion.
Promise == diff.

## Inventory

- `use_pick_axe` (`js/dig.js:2589`; C `dig.c:1091-1156`
  per `csym.mjs`): dir loop now `cmd_from_dir(dir,
  MV_WALK)` per index 0..9 with uswallow/movecmd-filter/
  up-down arms and NUL-truncate before display.
- `cmd_from_dir` (`js/dokeylist.js:672`): `dir >= 8 →
  cmd_from_func_ecname('down'/'up')`.
- Deleted: `DIG_DIR_CHARS` (sole user was this loop).

## C ↔ JS fidelity

- Loop: C `:1123-1149` (read) is `cmd_from_dir(:1126)` →
  `uswallow ? keep : movecmd(:1129) ? dxdy_moveok + isok +
  dig_typ filter : (u.dz>0)^downok gate` → append; then
  `Sprintf %s`. JS is that shape with the final
  else-if (`else { if (gate) continue }` ≡ `else if (gate)
  continue` — equivalent). The XOR is C-exact (`!!`
  normalized both sides); all 10 iterations run so
  u.dx/dy/dz leftovers match C; NUL-truncate via
  `indexOf(0)` = `%s` semantics.
- `movecmd`: C `:3868-3898` (read) vs JS `:449-475`
  (read): bind lookup, high-to-low reverse scan of the
  mode column, dx/dy/dz set + `!u.dz`, else `u.dz=0`
  alone — all match, including the untouched-dx/dy
  failure path.
- Rows 8,9: C `move_funcs` `:2078-2080` is
  {dodown×3},{doup×3} — mode-independence verified; C
  extcmd "down"→dodown / "up"→doup (`cmd.c:1703/1917` +
  funct lines) makes `cmd_from_func_ecname('down'/'up')`
  ≡ `cmd_from_func(move_funcs[8..9][mode])`. The
  first-bind-wins + digit-skip shape of C `:3035-3066`
  matches the pre-existing JS walk. Invalid-mode UB is
  disclosed as Named (2), unreachable.
- number_pad:4 = phone+MSDOS per C `options.c:2608-2616`
  — the Rogue "set difference" resolution is C-grounded.
- Callers: C `apply.c:4292` + `:4413` → JS
  `js/apply.js:2609` merged `is_pick||is_axe` site
  (pre-existing D-0951 shape); fuzzer `randomkey` passes
  dirs < 8 only, unaffected by the 8,9 arm.
- Required deletion paste — `sym.mjs DIG_DIR_CHARS`:
  `NOT FOUND in js/** (no export, no local
  function/const)`; zero remaining refs. `imports.mjs
  --can dig.js dokeylist.js cmd_from_dir`: ALREADY (no
  new edge — better than the claimed IN-SCC).
- Grep: the only `DIAG` hits are C's own `NODIAG` term in
  a cite comment. Rule #2 clean (HEAD).

## Hallucinations / overclaim

None. "D-2166's omit CLOSED for this loop" is scoped to
the loop (not the whole key-remap space); the Monk@612
getpos residual is named with its full C-vs-JS text; the
`/tmp` probe claim is corroborated by 5 corpus PASSes.

## Density

Legitimate head work: parent-block row 9 with rows 1–8
unattributed (7 dupe-rc kin + the 95340 park, all
dispositioned first-hand in-commit). `Ledger:` both
functions re-stamped `ported`.

## Verification

Re-measured `--base 50b583bf2~1 --no-reach`: `verify
use_pick_axe: 5 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Monk 27 → getpos@612) — exact match to the
D-log. Focused test 1/1 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
