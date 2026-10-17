# Review 2884 — e0eb7a411 — adj_pit_checks clears wall_info half (D-4043)

- SHA: `e0eb7a411` (cliff, 1 C function: `adj_pit_checks`)
- D-entry: D-4043; Ledger: dig.c (adj_pit_checks)
- `js/` diff: `js/dig.js` +6/−3 (one line `lev.wall_info = 0` +
  comment); test `scripts/adj-pit-checks-wallinfo.test.mjs` (new)

## Intent vs deliverable

Promise: owner-null probe s828 (map cell (45,15) C `·` vs JS `─`,
RNG matched, geom-probe exactly 1 differing cell) is the
flags/wall_info union alias — C clears one field, JS cleared only
`lev.flags`, so the stale NONDIGGABLE bit blocked the E2 maze dig.
Diff adds the one line plus cites. No helpers, clones, or imports.
Promise = diff.

## Inventory

- `adj_pit_checks` (js/dig.js:1227–1234): changed — clear added.
  C: `dig.c:1762–1838` adj_pit_checks (range per `csym.mjs`),
  `rm.h:215` wall_info alias — both verified in pinned source.

## C ↔ JS fidelity

C `dig.c:1776` (verified): `ltyp = room->typ, room->flags = 0;`.
C `rm.h:215` (verified): `#define wall_info flags` — one field, so
the clear zeroes wall_info (incl. W_NONDIGGABLE 0x08) too. C's
STONE/SCORR arm then reads `room->wall_info & W_NONDIGGABLE` —
always false after the clear. JS splits the union (D-0865) and
reads the OR (`rm_wall_info`, js/dig.js:175–176, verified); pre-fix
`lev.flags = 0` left `wall_info = 26` stale (test's pre-fix
observation), so JS took «The rock glows then fades» FALSE where C
returns TRUE — exactly the claimed blocked-dig mechanism. The rest
of the JS body is arm-for-arm C (pool/lava, door/SDOOR, WALL, TREE,
STONE/SCORR, IRONBARS, SINK, ladder, supporting-chain, TRUE tail —
verified against the csym body above, incl. the `#if 0` lava/ice
gap and message literals). No RNG either side. No symbol deleted
or re-pointed.

Named omission (1) audit: the six zap_dig `room.flags = 0` writes
exist (C `:1691/:1698/:1705/:1721/:1727/:1730`; JS
`:1518/:1527/:1536/:1555/:1564/:1568` — the D-log's
`:1513/…` numbers are the JS lines mislabeled as C; cite-side slip,
not a C-wrong). The safety claim spot-checks true: every dig.js
wall_info reader is type-gated (may_dig STWALL/TREE :184–185,
:360/:2106 IS_OBSTRUCTED, :1160 early-out) so a dug ROOM/CORR
never consults the stale half. Named as future-row-if-bites —
honest.

## Hallucinations / overclaim

None. Mechanism is measured (geom-probe 1 cell, RNG equal both
sides, focused test fail→pass with quoted pre-fix state), not
inferred. Rows 1–9 re-verified first-hand as D-4016/D-4028 parks
(falsifier states named), per D-4041/D-4042 precedent.

## Density

Cliff-phase: unattributed-row writer, probe session FULL PASS via
`score --ids` (the owner-null shape; D-4042 precedent). One-line
fix + test + FULL PASS — dense, not a no-op. `Ledger` updated.

## Verification

- Re-measure (this review, one call):
  `hidden-proxy.mjs verify adj_pit_checks --base e0eb7a411~1
  --no-reach` → 0 blocked (vacuous, as the D-log openly states —
  owner-null probe, movement via `score --ids`, not via this
  verify). Non-vacuous evidence instead: `hidden-proxy.mjs show
  scen-sweep-Barbarian-50750065` on HEAD's code → FULL PASS
  (1568/1568 screens, 25326/25326 RNG), and no later SHA in the
  window touches dig.js, so the PASS stands on this SHA's line.
- D-log Verify bullet: `score --ids` FULL PASS at commit time,
  syntax, rule2, REACH smoke 24/24, green + strict ×2, cohort 7/7,
  forced full 44/44, focused test 1/1 fail→pass — shipped; final
  rescore below is the regression check.
- `imports.mjs --rulecheck` → clean (this iteration); no
  FORCE/DIAG/seed/coordinate gates in the diff.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
