# Review 916 — d5311a1e — vault.c move_gold vault gold-move singleton (D-1946)

## Metadata

- SHA: `d5311a1e` (D-1946). JS: `js/vault.js` +30/−1 (new sync export `move_gold` at vault.js:271).
- Subject promises: `move_gold` in C order, ox/oy saved pre-extract, one new mkobj.js edge `--can` SAFE, probe abandoned over a probe-order TDZ, `wallify_vault` still stub (map-named).
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. 13-line C static function → 15-line JS export + header comment update + one import line. No DIAG/FORCE/seed gates.

## Inventory

| Symbol | Class |
|---|---|
| `move_gold(gold, vroom)` | new export; ports C `vault.c:631–643` (tool range; D-log cites :632–643, same body) |
| `place_object`/`stackobj`/`obj_extract_self` (mkobj.js), `newsym` (display.js) | all LIVE (`sym.mjs`), sync, call-time use |

## C ↔ JS fidelity

Line-for-line confirm against `vault.c:631–643`: `remove_object` → `obj_extract_self` floor arm (established equivalence, cited in the JSDoc with the ball.js note); `newsym(gold->ox, gold->oy)` post-extract → JS saves `ox`/`oy` first then `newsym(ox, oy)` — identical values (C relies on remove_object preserving ox/oy; JS does not depend on that); `rooms[vroom].lx + rn2(2)` / `ly + rn2(2)` → `(rm.lx\|0) + rn2(2)` via `game.level?.rooms` per the paygd idiom; `place_object` → `stackobj` → `newsym(nx, ny)` in order. RNG call-for-call: exactly two `rn2(2)`, same positions. `!gold` early return guards foreign callers (C takes non-null; harmless widening, no behavior change on C-reachable inputs). C `staticfn` → JS export is the standard live-for-wiring shape; caller (`wallify_vault`) honestly left stub and map-named — "dispatch ported, callee stubbed" does not apply (callee is live, caller deferred and named).
- `sym.mjs` callee table (this audit): `move_gold` vault.js:271 sync; `place_object` mkobj.js:1863 / `stackobj` mkobj.js:2003 / `obj_extract_self` mkobj.js:2462 / `newsym` display.js:4559 — all sync LIVE, matching the sync JS body (no awaits, correctly none needed).
- `remove_object` ≡ `obj_extract_self` floor arm: the JSDoc cites the mkobj.c equivalence and the ball.js note rather than re-arguing it — acceptable since the equivalence is established and unchanged by this commit; this port adds no new claim about it.
- The D-log's abandoned-probe note was checked, not just quoted: the `vault.js`-first standalone import TDZ (`objnam↔polyself _body_part`) is a probe-order artifact — the scored entry order boots (cohort 7/7 green per the D-log verify block), and no production code was altered to satisfy the probe. Correct handling.

## Hallucinations / overclaim

None. The abandoned-probe note is honest (probe-order TDZ, file deleted, no code changed to satisfy the probe). No corpus claim beyond the disclosed vacuous note.

## Cited ranges (tool-pinned)

- C: `vault.c:631–643` (13-line body, walked line-for-line above).
- JS: `move_gold` vault.js:271–285; import line vault.js:34;
  header comment vault.js (branch-envelope block).
- Call order ledger, C vs JS:
  `remove_object` → `obj_extract_self`; `newsym(ox, oy)` → same;
  `rn2(2)` ×2 → same; `place_object` → same; `stackobj` → same;
  `newsym(nx, ny)` → same. Seven steps, zero reorderings.
- `wallify_vault` stub (vault.js, below `move_gold`) explicitly notes
  "`move_gold` above is live; the body that calls it is stub" —
  the honest live-callee/stub-caller shape, map-named.

## Density

Right-sized §2b: one 13-line C function, 30 insertions, code + map + verify in one handoff.

## Verification

- `hidden-proxy verify move_gold --base d5311a1e~1`: 0 blocked at baseline and now — matches D-log; no PASS overclaim.
- `--can vault.js mkobj.js place_object`: ALREADY (edge now static) — consistent with the pre-commit SAFE check.
- Callee closure: every callee LIVE. No stub in a live arm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
