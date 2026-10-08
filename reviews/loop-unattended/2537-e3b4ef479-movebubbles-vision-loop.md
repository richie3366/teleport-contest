# Review 2537 — e3b4ef479 — movebubbles vision-off loop via helper

Metadata: SHA `e3b4ef479f6f81a7910d746dc78ddbd4af5e1263`, D-3658, cliff-head
`makemon.c` makemon via writer `mkmaze.c` movebubbles. js diff +11/−1 in
`js/mklev.js` (one helper call + comment, +1 import name; + focused test
`scripts/movebubbles-vacated-cell.test.mjs`).

## Intent vs deliverable

Promise: (60,7) was bubble#13's only empty vacated cell leaving sight —
C repaints it via the `vision_recalc(2)` main loop at movebubbles entry;
JS `vision_recalc` skips that loop for control 2 (D-0852), so run it via
the existing helper immediately before `vision_recalc(2)`. Diff adds
exactly that call. Matches; nothing bundled.

## Inventory

- `movebubbles` (`js/mklev.js:18569`, async, exported) — the only changed
  JS function. C: `nethack-c/upstream/src/mkmaze.c:1537–1685` (149 lines,
  per `csym.mjs`); `vision_recalc(2)` at entry, then cons pickup/fill
  (`levl=water_pos` + `block_point`), air arm (RNG), drift loop (RNG),
  `vision_full_recalc=1`.
- Helper used (not added): `vision_off_newsym_gbuf` (`js/vision.js:1370`,
  sync, live D-0852/D-0583 export). No new edge (`--can`: ALREADY,
  mklev→vision pre-exists).

## C ↔ JS fidelity

C `vision_recalc(2)` semantics verified by direct read (`vision.c:511–857`):
control==2 leaves `next_array` nulled (`:531–534`), `do_light_sources`
paints TEMP_LIT only, then swap + the main update loop runs. With empty
next, the IN_SIGHT / COULD_SEE+lit / COULD_SEE+waslit arms cannot fire, so
every cell lands in `not_in_sight`: `old IN_SIGHT || (next^old COULD_SEE)`
≡ `old IN_SIGHT || old COULD_SEE` → `newsym` (col 0 skipped), then hero
newsym, range adoption, `notice_all_mons`.

The helper (`js/vision.js:1370–1413`) is that loop verbatim: in_mklev /
vision_inited gate (C `:527–528`), live viz as old, inactive buffer
zeroed, `viz_array` swapped to it (≡ C's swap — newsym paints memory),
row-major loop over old rmin/rmax firing `newsym` iff `old IN_SIGHT ||
old COULD_SEE`, col-0 skip, hero newsym, restore. Ordering matches C: the
call sits before JS `vision_recalc(2)`, which sits before the cons
pickup/fill — C's (2) is likewise at entry before pickup/fill, so levl
state is identical at loop time. TEMP_LIT concern: with empty next, C's
loop arms never consult TEMP_LIT (all gated on COULD_SEE/IN_SIGHT), and
newsym itself reads no TEMP_LIT in either tree — the zeroed-temp-buffer
equivalence holds. RNG order: same newsym set in the same row-major order.
`sym.mjs`: both single live definitions; nothing deleted or re-pointed.

Rest of `movebubbles` (unchanged, spot-checked): `newsym` after monster
removal ✓, fill arm sets glyph/typ/lit/seenv + `block_point` ✓ but leaves
`waslit`/`flags`/`roomno`/`edge`/`candig` where C's struct copy zeroes
them — exactly the Named gap, pre-existing, with the probe-specific
harmlessness argument (waslit arm needs COULD_SEE; the cell had nv 0).
Air/drift RNG arms untouched.

## Hallucinations / overclaim

None. "Same newsym set, paints and RNG order as C's swap-then-loop" is
substantiated by the arm-by-arm equivalence above (and the helper predates
this SHA with other call sites). The vacuous `movebubbles` verify is
disclosed as a note. "0/1 with js/mklev.js stashed" pins the test to the fix.

## Density

Cliff-phase §2b: one cliff (head `makemon` is the region heuristic on a
terrain cell; the writer is correctly the bubble mover — C only noticed
there). Whole-function discipline via reuse of the canonical helper rather
than a local loop (D-1849). Ledger entry updated. No bundling.
Per-function: `movebubbles` whole modulo the named fill gap, ACCEPT.

## Verification

- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward` in `js/`.
  Rule #2: existing edge only.
- D-log Verify: makemon 1 PASS (Tourist-92100) + reach 80/80 + movebubbles
  smoke REACH-OK + green/strict/cohort + full 44/44.
- Re-measure: `verify makemon,movebubbles --base e3b4ef479~1 --reach-all` →
  makemon `1 PASS … → PROGRESS` (Tourist-92100: PASS, as claimed) +
  **reach 900/900 REACH-OK** (full spread, stronger than the D-log's 80);
  movebubbles vacuous (disclosed) + smoke 24/24 REACH-OK. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
