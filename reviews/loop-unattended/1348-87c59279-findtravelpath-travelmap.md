# Review 1348 — 87c59279 — findtravelpath travelmap visited set + VALID mark-only + Underwater rock gate

- SHA: `87c59279`, D-2382. JS files: `js/cmd.js` (+151/−55 across the
  travel envelope), `js/hack.js` (end_running clear), `js/mklev.js`
  (3 export keywords).
- Prior reviews closed: none (Open queue row `findtravelpath`; 0 blocks).

## Intent vs deliverable

Subject promises three arms: (a) the travel-session visited set
(`travelmap_ensure`, revisit "unsure" stop, `selection_setpoint` marks),
(b) TRAVP_VALID mark-only success, (c) the TEST_TRAV obstructed-arm
Underwater gate (D-1971 review-941 debt). Diff actually adds:
`travelmap_ensure()` + `TRAVEL_NOPATH/STEP/STEP_UNSURE` tri-state, a
`mode` param on `findtravelpath_bfs`, UNSURE handling in `continue_run`
and `dotravel_target`, VALID plumbed through `is_valid_travelpt`, the
no-guess mark, `reset_cmd_vars` + `end_running` travelmap clears, the
uinwater gate, and the `selection_*` exports. Promise matches diff; no
scope creep.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `travelmap_ensure` (cmd.js:1764) | new (C `:1268–1269` alloc) | LIVE |
| `TRAVEL_NOPATH/STEP/STEP_UNSURE` | new consts (async-You adaptation) | documented in-code |
| `findtravelpath_bfs` (+`mode`) | changed, C `:1400–1418` arm | LIVE |
| `findtravelpath_travel/guess` | changed (returns only + no-guess mark `:1484–1487`) | LIVE |
| `is_valid_travelpt` | changed (passes TRAVP_VALID) | LIVE |
| `continue_run` / `dotravel_target` | changed (UNSURE → `You(...)`) | LIVE |
| `travel_test_move` | changed (uinwater gate, C `:1016–1023`) | LIVE |
| `end_running` / `reset_cmd_vars` | changed (travelmap clear) | LIVE, verified below |
| `selection_new/getpoint/setpoint` (mklev.js:25611+) | C selvar fns, newly exported | LIVE, re-point targets |

Required `sym.mjs` output (re-pointed symbols — nothing deleted):
`selection_new → js/mklev.js:25611 sync`;
`selection_setpoint → js/mklev.js:25622 sync`;
`TRAVP_TRAVEL → js/const.js:636 export const`;
`You → js/zap.js:859 ASYNC — await required` (forces the UNSURE shape).
`imports.mjs --can cmd.js mklev.js selection_new` → ALREADY;
`--can cmd.js zap.js You` → ALREADY (name-only, no new edges).
`imports.mjs --rulecheck` → Rule #2 clean.

## C ↔ JS fidelity

C loci opened with bodies: `findtravelpath` `hack.c:1265–1523`
(259 lines), `test_move` `:989–1255` head, `end_running` `:4129–4158`
(full 30 lines), `reset_cmd_vars` `cmd.c:3606–3624` (full 19 lines).

- Success arm C `:1400–1418` vs JS `cmd.js:1824–1845`: visited read off
  the CURRENT cell `(x,y)` ✓; dx/dy set either way ✓; TRAVEL-only stop
  on dest-or-visited with nomul + run=8 ✓; travelcc cleared on fresh
  dest only (`if (!visited)` ≡ C `if (visited) You else travelcc=0`) ✓;
  `selection_setpoint(u.ux,u.uy)` + return on all three shapes ✓.
  Branch-for-branch confirm.
- `You("stop, unsure which way to go.")`: C prints synchronously inside
  the BFS; JS returns UNSURE and the two async TRAVEL wrappers print it
  before stepping. Forced adaptation (`You` is async-only), order
  (message-then-step) preserved, VALID never reports it. Acceptable.
- GUESS `mode=TRAVP_TRAVEL; goto noguess` ≡ JS
  `findtravelpath_bfs(px,py,u.ux,u.uy,false)` (default TRAVEL) ✓. The
  GUESS first-phase dest-skip (`continue` vs C enqueue) is dead in
  practice (GUESS-reachable ⊆ TRAVEL-reachable, and TRAVEL runs first)
  and pre-existing — not this SHA.
- Underwater gate: C `:1016–1023` (`Passes_walls && may_passwall` pass,
  else `Underwater → FALSE` on every mode, only the `There()` pline
  DO_MOVE-gated). JS gates before IRONBARS/tunnels. `may_passwall` is a
  named omit that cannot return true in JS, so the residual
  passwall+underwater sliver is unreachable; the gate fixes the live
  bars case. Correct given the named omit.
- Lifecycle: C `end_running` frees travelmap in `if (gt.travelmap)`
  OUTSIDE the `if (run)` block (re-read the full body after a misleading
  first window) ≡ JS unconditional `game.travelmap = null` ✓;
  `reset_cmd_vars` travel/travel1 + travelmap free ✓ exact.
- Adjacent fast path keeps its pre-existing approximation
  (blocksMove/boulder stand-ins, `end_running(true)` vs C TEST_MOVE +
  crawl_destination + `end_running(FALSE)`) — named, untouched here.
- Callee closure: every reached name LIVE or pre-existing local; no STUB
  in a live arm. Named omits (TEST_MOVE modes, may_passwall, worm_cross,
  block_entry, Known_*walking, `#retravel`) stay in the map section.

## Hallucinations / overclaim

None. Every C citation (`:1268–1269`, `:1400–1418`, `:1484–1487`,
`:4151–4153`, `cmd.c:3616`) re-opened on pinned source. No corpus PASS
claimed; the vacuous note is labeled vacuous.

## Density

One C locus family + its two lifecycle call sites, ~150 js lines.
Right-sized §2b.

## Verification

- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed gate` → clean.
- Re-measured: `hidden-proxy verify findtravelpath --base 87c59279~1`
  → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)". Row cited 0 blocks → vacuous correctly labeled; no
  WORSE/relocation.
- Green/cohort/full per D-log accepted (travel-loop arms are
  suite-unreached by construction, same as C; callees live elsewhere).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
