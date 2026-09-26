# Review 1799 — dcaae0c59 — placebc_core (D-2840)

- SHA: `dcaae0c59` (coverage; `ball.c` `placebc_core`)
- Files: `js/ball.js` the core; `await placebc()` at the existing call sites in `do.js`, `mhitu.js`, `read.js`, `shk.js`, `teleport.js`, `trap.js`, `wizcmds.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `placebc_core`: floor the chain, floor the ball when it is not carried, place the chain on top, snapshot both under-glyphs, clear `bcrestriction`. `placebc` and `lift_covet_and_placebc` call it after their guards. The diff is that split, the `flooreffects` import, and `await` on the callers that already called `placebc`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `placebc_core` | local async `ball.js:388` | `ball.c:119–144` (`static`) |
| `flooreffects` | LIVE async `do.js:757` | `do.c:162` |
| `place_object` / `newsym` / `impossible` | LIVE | `:135`, `:141`, `:123` |
| `placebc` | async export | `ball.c:191–209` (`BREADCRUMBS` off) |
| `lift_covet_and_placebc` | calls the core, not `placebc` | `ball.c:236–254` |
| `carried` | `(where == OBJ_INVENT)` inline | `obj.h` |

`sym.mjs`:

```
flooreffects     js/do.js:757   ASYNC — await required
placebc          js/ball.js:425   ASYNC — await required
placebc_core     NOT EXPORTED — local js/ball.js:388
```

`imports.mjs --can ball.js do.js flooreffects`: `ALREADY`. No top-level read of `flooreffects` before its init.

## C ↔ JS fidelity

`csym` `placebc_core` is `ball.c:119–144`. Callers: declaration `:13`; `placebc` `:208`; `lift_covet_and_placebc` `:253`; `:283` and `:345` are the `BREADCRUMBS` wrappers. `config.h` leaves `#define BREADCRUMBS` commented out, so those two are not compiled. `NH_DEVEL_STATUS != NH_STATUS_RELEASED` is false, so the `paniclog` arms in `placebc` and `lift_covet` are compiled out.

Missing chain or ball: `impossible("Where are your ball and chain?")` and return. JS awaits that. Then `flooreffects(uchain, u.ux, u.uy, "")`. The return is ignored. If the ball's `where` is `OBJ_INVENT`, `bc_order` is `BCPOS_DIFFER` and the ball is not floored. Otherwise `flooreffects` on the ball, `place_object`, `BCPOS_CHAIN`. Then `place_object` on the chain, so the chain is above the ball. `u.ux` / `u.uy` are read again after the first await, which is each C call's argument evaluation. Both glyphs are `levl_glyph_at` of that cell (C assigns `levl[ux][uy].glyph` to both). A missing cell returns null. Named. Then `newsym` and `bcrestriction = 0`. No `rn2`.

`placebc` (`:191–209`): `check_restriction(0)` or return; chain not `OBJ_FREE` is `impossible("bc already placed?")`; else the core. `lift_covet_and_placebc` uses the same already-placed test, then the core directly, because `placebc` would refuse a live pin. The clear of `bcrestriction` is inside the core, not a second store. Every JS `placebc()` is `await`ed (`do.js:1967`, `mhitu.js:1650` and `:1890`, `read.js:1982`, `shk.js:1414`, `teleport.js:1540`, `trap.js:2218` and `:6341`, `wizcmds.js:627`).

`unplacebc` still does not `impossible` when `bcrestriction` is set (`ball.c:214–216`). Named. `cmd.c:1055–1057` (level entry), `mon.c:3452–3453` (swallowed exit), and `sp_lev.c:910` (flip) call `placebc` in C and do not in JS. Those sites were already not calling it; this diff only adds `await` where the call existed. `maybe_unhide_at` stays deferred. Named.

## Hallucinations / overclaim

The subject says the chain is offered to the floor, then the ball when it is not in inventory, then the chain is placed on top. That is the body. It says `BREADCRUMBS` stays out. The define is commented out. It says every existing caller awaits `placebc`. The JS call sites do.

## Density

`placebc_core` and the two compiled callers. The other files are the `await` that the new Promise requires.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify placebc_core --base dcaae0c59~1 --reach-all`.

```
verify placebc_core: baseline dcaae0c59~1 (scoreboard at 2c9559331) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke placebc_core: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2840's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
