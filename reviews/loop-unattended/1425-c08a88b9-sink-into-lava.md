# Review 1425 — c08a88b9 — sink_into_lava whole-body port (D-2466)

Metadata: SHA `c08a88b9`, `js/trap.js` (new export) + `js/allmain.js`
moveloop wire. Coverage MISSING → live. D-log: D-2466.

## Intent vs deliverable

Promise: whole `sink_into_lava` body in C order + the moveloop call-site
wire. Diff ships both. No second subsystem.

## Inventory

- Added: `export async function sink_into_lava` (exported, correct — C
  is global; placed after `lava_effects` in C file order).
- Wired: moveloop `if (utrap && utraptype==TT_LAVA) await
  sink_into_lava()` (= C `allmain.c:424–425`, verified). The C `else if
  (!umoved) pooleffects(FALSE)` stays absent and named with D-1000 —
  a caller-site deferral belonging to the pooleffects row, not a stub
  in this body.
- Edges: `burn_away_slime` joins the existing trap.js→timeout.js static
  edge; allmain.js→trap.js is ALREADY (`--can`); `TT_LAVA` joins the
  allmain const.js edge. All other callees on existing edges.
- No deleted/re-pointed clones for `sym.mjs`.

## C ↔ JS fidelity

C `trap.c:6990–7034` vs JS:

- Guard chain (`:6996–7002`): no-op / `reset_utrap(FALSE)` /
  `!uinvulnerable` — exact, C comments verbatim.
- Burn-down (`:7007–7008`): `!Fire_resistance()` (file-local,
  `js/trap.js:4615`) → `Math.trunc((uhp+2)/3)` = C int division —
  exact. `utrap -= 1<<8`, `< 1<<8` terminal test — exact.
- Death (`:7011–7021`): `KILLED_BY`/`molten lava` killer (with the
  file's killer-object guard), `urgent_pline`, `burn_away_slime`,
  `done(DISSOLVED)`, life-save `reset_utrap(TRUE)`, `safe_teleds(DRAG|
  TELEPORT)` unless `hero_Levitation()/hero_Flying()` (file-local
  D-1070 helpers) — exact, all four async callees awaited per
  `sym.mjs` (all ASYNC).
- Sink-deeper (`:7022–7032`): `!umoved` gate, `Slimed` flat with
  `rnd(10-1) >= (Slimed&TIMEOUT)` (C's literal `10 - 1` spelling kept),
  `pline` + burn vs `Norep`, `utrap += rnd(4)` — exact. RNG in C
  order; nothing added.

## Hallucinations / overclaim

None. "Every callee live, every arm ported" is accurate for the
function; the moveloop `else` deferral is named at the wire site, not
hidden.

## Density

One 45-line C function + one-line wire, 2 files: right-sized.

## Verification

- `hidden-proxy verify sink_into_lava --base c08a88b9~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); smoke 24/24
  PASS, 0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Whole body ports C in order.

Verdict: **ACCEPT**
