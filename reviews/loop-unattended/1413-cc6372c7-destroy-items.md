# Review 1413 — cc6372c7 — destroy_items whole-body port (D-2454)

Metadata: SHA `cc6372c7`, `js/zap.js` restart (+92/−38) plus a focused
`scripts/destroy-items-defer.test.mjs` (2/2, fails pre-fix). Coverage
THIN → bypass traversal + deferral second pass. D-log: D-2454.

## Intent vs deliverable

Promise: fix three C-wrong omissions in the thin body — no
bypass_objlist/nxt_unbypassed_obj traversal, no worn-levitation/
lycanthropy-water deferral, no o_id/where identity on the sweep.
Diff actually restarts `destroy_items` in C order with all three,
plus the focused test. No second subsystem.

## Inventory

- Restarted: `destroy_items` (`js/zap.js:1711`).
- New imports extend existing edges only (`worn.js` bypass pair —
  both live sync exports, `worn.js:1038/1063`; `const.js`
  LEVITATION/FLYING/NOBJ_STATES — same module already imported).
- In-file `destroyable`/`maybe_destroy_item` clones reused, not
  duplicated (pre-existing, named).

## C ↔ JS fidelity

Walked C `zap.c:5965–6097` call-for-call against the new JS:
limit + unconditional `rn2(DMG_DESTROY_SCALE)` gate (`:5997–5999`;
JS preserves the always-drawn condition shape); init loop
(`:5987–5991`, oid 0); bypass clear (`:6038`); unbypassed walk
(`:6040–6042`); reservoir sample with `rn2` only once full
(`:6045–6051` — JS ternary preserves the draw schedule); oid/otmp
capture + `where` single-chain `impossible` (`:6052–6057`,
awaited for async — fine); worn-LEVITATION/FLYING +
`POT_WATER && ismnum(ulycn) && (Upolyd?blessed:cursed)` deferral
(`:6063–6074` — gate shape exact); cap (`:6076–6078`); `defer 0..1`
sweep with o_id+where+deferred identity and entry nulling
(`:6079–6092`); final bypass clear (`:6093–6095`); `dmg_out` return.
`objchn()` getter re-reads the live head like C `*objchn` (`:5982`).
Gameover break = pre-existing JS rendering of losehp→done noreturn
(named). No RNG reorder, no dropped arm. Confirm.

## Hallucinations / overclaim

None. "Reservoir-sampled over a plain array/chain walk" accurately
describes the old body; the three omissions cite exact C ranges;
the test is committed alongside (not `/tmp`-only).

## Density

One C function restart, ~90 insertions + a 117-line focused test:
right-sized breadth iteration.

## Verification

- `hidden-proxy verify destroy_items --base cc6372c7~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); **reach 55/55
  PASS, 0 regressed → REACH-OK** — the strongest corpus signal in
  this batch (RNG-tagged reach, not smoke). Matches the D-log.
- `sym.mjs`: both bypass callees LIVE (`worn.js`). No STUB in a live
  arm. Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
