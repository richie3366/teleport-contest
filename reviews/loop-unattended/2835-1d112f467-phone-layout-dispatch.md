# Review 2835 — 1d112f467 — phone-layout digit dispatch beyond the bind path

- SHA: `1d112f467` (D-3990)
- Files: `js/cmd.js` (+15/−7, 6 sites), `js/lock.js` (+30/−12, 4
  sites), focused test `scripts/phone-layout-digit-walk.test.mjs`
  (new, 52 lines)
- Method: cliff writer (1 C table × 10 read sites); whole Method.
- Cites: C `cmd.c:3347–3350` (ndir_phone_layout),
  `:3432–3435` (dirchars select) — read directly.

## Intent vs deliverable

Promise: both rc carry `number_pad:3` (phone); the bind path
(`cmd.dirchars`) was already phone-aware but 6 digit→direction reads
+ getdir used PC-only tables — key "2" bump-attacked the S dog where
C walks N, key "1" lashed where C walks NW. Fix: phone tables +
selectors at all 10 sites. Diff: exactly the two tables, two
selectors, and 10 re-routed reads. Promise and diff agree.

## Inventory

- `numpad_walk_dir` — `js/cmd.js:3676` (new) vs C `:3432–3434`.
  Status: 6 sites routed (repeat_command ×2, repeat_txt ×2, metaRun,
  walk).
- `getdir_dirchars` — `js/lock.js:146` (new) vs C `:3432–3434`.
  Status: 4 sites routed (apply_dirsym fallback, dirsym round-trip,
  2 fuzzer reads).

## C ↔ JS fidelity

C, verified line by line:

- `ndir_phone_layout[] = "41236987><"` (`:3347–3350`, static in
  reset_commands) ✓; selected by `:3432–3434` `!num_pad ? (!swap_yz ?
  sdir : sdir_swap_yz) : (!phone_layout ? ndir : ndir_phone_layout)` ✓.
- Index alignment phone-vs-sdir (`hykulnjb`): 4↔h W, 1↔y NW, 2↔k N,
  3↔u NE, 6↔l E, 9↔n SE, 8↔j S, 7↔b SW — `NUMPAD_WALK_PHONE`
  matches letter for letter ✓; `NUMPAD_DIR_PHONE` dx/dy matches all 8
  ✓; `GETDIR_NDIR_PHONE='41236987><'` matches C's literal ✓.
- Session story checks against the tables: "2"→N (2,6)→(2,5) ✓;
  "1"→NW (4,2)→(3,1) ✓.
- Membership unchanged: both tables key {1,2,3,4,6,7,8,9}, '5'
  undefined in both (run prefix per `:2770`) ✓ — no dispatch-shape
  change, only direction values under phone_layout.
- `game.Cmd.phone_layout` is live (set at cmd.js:2411–2412 per
  `:3417–3418`, already selects NDIR_PHONE at :2427) ✓ — the flag the
  selectors read is the same one the bind path uses.
- swap_yz in getdir char paths correctly NAMED, not shipped (live bind
  path already swaps; no corpus -1 recipe; falsifier given) ✓.
- No RNG touched (fuzzer reads keep their draws, only the table
  changes). No symbol deleted or re-pointed → `sym.mjs` N/A. Diff
  grep clean.

## Hallucinations / overclaim

None. The knockback falsification (rn2(6)=3 FALSE) and the Monk
getpos@307 hand-off (another C file, left for the block) are both
properly scoped.

## Density

Cliff head of its parent (`distfleeck`, Must-fix empty) ✓. One table,
whole read family (10/10 sites), `Ledger:` entry touched
(`cmd.c.jsonl`), focused test with stash-verified pre-fix FAIL → PASS,
full 44/44 ✓.

## Verification

Ship-time: `verify distfleeck: 1 PASS (Arch-50255043 full 587), 1
moved (Monk 97→getpos@307), 3 unchanged, 0 worse` + reach 80/80.
Re-measure (`verify distfleeck --base 1d112f467~1 --no-reach` on HEAD):
`1 PASS, 1 moved past, 3 unchanged, 0 worse → PROGRESS` — identical
sessions and landings. Exact match. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
