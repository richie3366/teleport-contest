# Review 2190 — b4ca336ef — is_ok_location override + set_ok_location_func

SHA `b4ca336ef`, D-3229; 2026-10-01; js/mklev.js (+107/−67).
Three-function cluster (sp_lev.c, one file). Closes no prior
review.

## Metadata

- Subject: "`sp_lev.c` is_ok_location override arm +
  set_ok_location_func (ok_fn emulation retired) (D-3229)."
- Promises: module-state override (`:1271–1277`) consulted after
  the waterlevel head (`:1287–1288`); l_create_stairway set/clear
  window (`:4180`/`:4186`); ok_fn params deleted from 3 getters
  (39 sed de-prefixes, same values); every set paired with a
  clear in a sync window.

## Intent vs deliverable

Kept. The diff adds the state + setter, the one-line override
check, converts the 3 stair windows, deletes the 3 ok_fn params,
and mechanically de-prefixes every `get_location_random(null[,
…])` site. No other behavior moves.

## Inventory — is_ok_location, set_ok_location_func, good_stair_loc

Changed: `is_ok_location` (+1 override line), `good_stair_loc`
(comment-only), `get_location_random` / `get_location_in_room` /
`get_location_coord_in_room` (ok_fn params deleted),
`l_create_stairway` / `splev_create_stair` / `splev_room_stair`
(set/clear windows). Added: `is_ok_location_func` state +
`set_ok_location_func` (file-local, like C's statics). No new
imports; no deleted/re-pointed symbols in the clone→import sense
(ok_fn was a parameter, not a symbol):

```text
set_ok_location_func NOT EXPORTED — 1 LOCAL in js/mklev.js:21572
is_ok_location   NOT EXPORTED — 1 LOCAL in js/mklev.js:21612
```

Single homes, matching C's staticfn placement in one file.

## C ↔ JS fidelity — is_ok_location

C `sp_lev.c:1279–1308` (csym): waterlevel `:1284–1285` → func
`:1287–1288` → ANY_LOC `:1291` → SOLID `:1293` → DRY|SPACELOC
`:1297–1302` → WET `:1303` → HOT `:1305`. JS order now identical
(the JS-only isok OOB guard sits after the func check, preserving
C order — C has no isok). The two diagnosed C-wrongs are real:
replacement-predicate (skipped waterlevel accept-any) and AND
instead of replace (boulder reject) — both retired by routing the
override through the body. Callers: C `:1236`/`:1247` (get_location
paths → get_location_random ✓), `:1313` (pm_good_location →
priestini inline, pre-existing), `:2913` (maze1xy, pre-existing).
No RNG in the body; acceptance changes alter downstream try-loop
counts exactly as C's would.

## C ↔ JS fidelity — set_ok_location_func + good_stair_loc

C `:1271` NULL init + `:1273–1277` setter (read in pinned C) ≡
JS `let … = null` + one-line setter ✓. C `:4139–4144`
good_stair_loc (ROOM/CORR/ICE) ≡ JS ✓. The `:4179–4186` window
(read in pinned C): set only in the x=y=-1 branch, lookup,
unconditional clear, then deltrap — JS l_create_stairway matches
line-for-line, including clear-before-deltrap. All three windows
re-read in the current tree: no return/await between set and
clear (splev_room_stair's `pos.x < 0` return sits after its
clear) ✓ — no leak. sed audit: 0 `ok_fn` refs remain in js/;
every de-prefixed site passes the same humidity as second-arg-
now-first (spot-read :21673/:21675/:22142); all getters single-
file ✓.

Diff grep: 1 hit, commit message only, 0 in code. Rule #2 clean
(no new imports).

## Hallucinations / overclaim

None. Both latent C-wrongs match the removed code (replace vs
AND), and the C line citations check out against pinned C.

## Density

Three whole C functions of one C file + mechanical call-site
fallout, one js file, no Must-fix bundled ✓. Inside caps.

- Ledger: is_ok_location ported — ACCEPT.
- Ledger: set_ok_location_func ported — ACCEPT.
- Ledger: good_stair_loc ported — ACCEPT.

## Verification

Re-measured (current tree, one call):

```text
verify is_ok_location: 0 blocked → smoke 24 PASS, 0 regressed → REACH-OK
verify set_ok_location_func: 0 blocked → smoke 24 PASS, 0 regressed → REACH-OK
verify good_stair_loc: 0 blocked → smoke 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (3× vacuous note + REACH-OK, green/strict/
cohort/full 44/44). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
