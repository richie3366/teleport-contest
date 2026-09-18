# Review 1439 — 1d36d74a — randomkey whole-body port (D-2480)

Metadata: SHA `1d36d74a`, `js/cmd.js` (+131) + `js/dokeylist.js`
(+61/−refactor) + committed `scripts/randomkey.test.mjs` (109 L,
6 tests). C `cmd.c:3515–3597` + `pgetchar :445–453` +
`cmd_from_dir :3029–3032`. D-log: D-2480.

## Intent vs deliverable

Promise: whole fuzzer key source + `pgetchar`/`random_response`/
`cmd_from_dir`, C order, plus a pinning test. Diff delivers that;
the dokeylist table hoist is a behavior-identical refactor (same
strings, same use). C callers `readchar_core :5218` / `wintty
:4068` named (unported); `pgetchar :450` wired.

## Inventory

- Added: `pgetchar` (async, fuzzer arm), `randomkey` (full
  15-arm switch), `random_response`, `reset_randomkey` (test
  support), `cmd_from_dir` + hoisted MOVE_*_ECNAMES tables.
- Callee closure (all LIVE): `rn2`/`rn1`/`rnd`, `EXTCMDLIST`
  (generated), `N_DIRS`/`MV_*`/`commandInp`, `nhgetch`,
  `cmdbinds_live` via `cmd_from_func_ecname` (pre-existing
  sibling). No deleted symbols; no clones.

## C ↔ JS fidelity

- `randomkey`: `^A/^P` gate (`C('a')=1`, `C('p')=16` per
  global.h:487; `rn2(5)` truthy = repeat; latch gated on
  commandInp), all 15 switch arms incl. `rn1(95,32)`/`rn1(26,97)`/
  `rn1(26,65)`/`rn1(10,48)` arithmetic, `rn2(2)?tab:space`,
  case-8 `i++ % SIZE` with unbounded counter, `#`, `rn2(N_DIRS)`
  then `rn2(7) ? WALK : (!rn2(3) ? RUSH : RUN)` draw order,
  `rnd(255/127)` — verbatim against `:3517–3578`.
- `random_response`: ESC discards (`out=''` = `count=0`),
  `≤ sz-1` bound, string-for-buf — verbatim.
- `cmd_from_dir`: MV_WALK/RUN/RUSH = 0/1/2 (const.js:1699–1702)
  match C `move_funcs` column order `:2070–2083`; ecname tables
  match C `:2008+` names; `cmd_from_func_ecname` replicates
  `cmd_from_func` (space/digit/`-` skips, printable-first) keyed
  on text. Test pins `h/H/^H` and both guards.
- Observation (not queued): case-8 cycles 167 slots (166
  generated + sentinel-equivalent) vs C SIZE 171. Measured
  alignment: JS is C-order minus exactly the 4 NH_DEVEL-only wiz
  entries (`wizbury`, `wizdispmacros`, `wizobjprobs`,
  `wizmondiff`) skipped by extractor policy
  (`extract-extcmdlist.py:24`); no other gap. Unreachable in
  scored runs (`debug_fuzzer` never set; the other two caller
  arms named unported), and forking the shared list would be
  worse — recommend one map line, not a port row.

## Hallucinations / overclaim

The "C SIZE counts the donull sentinel" comment is accurate but
incomplete (omits the 4 devel skips above) — measurement, not a
ship-blocker. No other overclaim.

## Density

Right-sized: one C function + two small callers + test.

## Verification

- `hidden-proxy verify randomkey --base 1d36d74a~1 --reach-all`
  (re-run): 0 blocked (vacuous, as stated); smoke 24/24 →
  REACH-OK. Matches.
- `scripts/randomkey.test.mjs` 6/6 per D-log (self-pinning
  stream; the C-order draw sequence is independently confirmed
  above against `:3521–3578`).
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords
  in `js/` additions (`getRngLog` appears only in the test
  file's RNG log assertions — harness, not production).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
