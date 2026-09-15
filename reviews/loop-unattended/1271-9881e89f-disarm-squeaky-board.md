# Review 1271 — 9881e89f — trap.c disarm_squeaky_board + unsqueak_ok; try_disarm sobj_at; untrap door unblock_point (D-2305)

Metadata: SHA `9881e89f`, D-2305, C-fidelity residual (no corpus owner). Method: `git show` stat + full `js/trap.js` diff; C `trap.c:5440–5527` (`try_disarm`), `:5606–5626` (`unsqueak_ok`), `:5629–5660` (`disarm_squeaky_board`), `:6065–6085` (door set-off) via `csym.mjs` + direct read; `sym.mjs` on all 10 touched symbols (past output below for the two re-pointed); C `hack.h:511–539` vs `js/const.js:2204–2212` GETOBJ values; `imports.mjs --rulecheck`; `hidden-proxy verify disarm_squeaky_board --base 9881e89f~1` re-run; added-lines-only grep for banned patterns.

## Intent vs deliverable

Subject promises: new `unsqueak_ok` + `disarm_squeaky_board` verbatim, `try_disarm` boulder loop → live `sobj_at`, door set-off → `unblock_point`.
Diff actually adds (`git show 9881e89f -- js/trap.js`, +66/−25): both functions, the `SQKY_BOARD` case in the `untrap` switch (retiring the cannot-disable default for it), the one-line boulder substitution, the one-line door substitution, and four import-name joins. Promise kept.

## Inventory

- `unsqueak_ok` (js/trap.js, new, file-local; C is `staticfn`).
- `disarm_squeaky_board` (js/trap.js, new, file-local; C is `staticfn`).
- `try_disarm` boulder arm — hand-rolled `objects_at` loop → `sobj_at(BOULDER, …)` (−8/+1).
- `untrap` door set-off — `recalc_block_point(x, y)` → `unblock_point(x, y)`.
- `untrap` switch — `case SQKY_BOARD: return disarm_squeaky_board(ttmp)`.

## C ↔ JS fidelity

`unsqueak_ok` is verbatim against C `:5606–5626`: null→EXCLUDE, grease→SUGGEST, known-oil (`dknown` + `oc_name_known` via the `game.objects` table)→SUGGEST, other potions→DOWNPLAY, else EXCLUDE. GETOBJ return values verified identical (C `hack.h:511–539`: EXCLUDE −3, DOWNPLAY 1, SUGGEST 2; `js/const.js:2204–2209`: same).

`disarm_squeaky_board` is verbatim against C `:5629–5660`: `getobj("untrap with", …)` → null→0; `bad_tool = cursed || ((not-oil || lamplit) && (not-grease || !spe))` (JS `| 0` idiom, same predicate); `try_disarm` → `fails < 2` early return; grease→`consume_obj_charge(obj, TRUE)` else `useup` + `makeknown(POT_OIL)`; repair pline; `deltrap`; `newsym(ux+dx, uy+dy)`; `more_experienced(1, 5)`; `newexplevel`; return 1. Await discipline matches the exports (`sym.mjs`: `getobj` ASYNC awaited, `consume_obj_charge` ASYNC awaited, `newexplevel` ASYNC awaited, `useup` sync bare, `deltrap`/`newsym`/`more_experienced` sync). No RNG/message/control-flow delta beyond C order.

`try_disarm` boulder arm now cites C `:5456–5460` exactly (`sobj_at(BOULDER, tx, ty) && !Passes_walls && !under_u`); the retired loop was semantically identical, so behavior-preserving plus one clone retired toward the D-2281 canonical.

Door set-off now cites C `:6074–6079` exactly (`b_trapped("door", FINGER)` → `D_NODOOR` → `unblock_point` → `newsym` → shop `add_damage`); `recalc_block_point` remains imported and used elsewhere in the file, so no dead import.
Callee closure, all LIVE or same-module (`sym.mjs`, required output for both re-pointed symbols pasted):

```text
unblock_point    js/vision.js:413   sync
recalc_block_point js/vision.js:423   sync
getobj           js/invent.js:8036   ASYNC — await required
consume_obj_charge js/invent.js:4160   ASYNC — await required
sobj_at          js/mkobj.js:2201   sync
useup            js/invent.js:4115   sync
more_experienced js/exper.js:256   sync
newexplevel      js/exper.js:279   ASYNC — await required
deltrap          js/trap.js:1274   sync
newsym           js/display.js:4849   sync
```

(`useup`'s four clones in detect/potion/read/spell are pre-existing drift, untouched here.) No STUB in a live arm; `move_into_trap` / `stumble_on_door_mimic` stay named in the map.

## Hallucinations / overclaim

None. No dispatch-with-stubbed-callee: the newly dispatched `disarm_squeaky_board` body is fully live (its only Dice-adjacent call, `try_disarm`, was already live). The /tmp hand probe is honestly labeled PROBE-PASS with its `--More--` preamble caveat, kept out of tree.

## Density

+66/−25 for two small C functions + two one-line corrections + switch wiring — one C locus family, one module. In-band.

## Verification

D-log: preflight clean-tree PASS, `verify --fn disarm_squeaky_board` full matrix PASS with the hidden note explicitly vacuous (NOT a corpus PASS), cohort 7/7, full skipped (trap.js not shared-gated — acceptable). Re-measured by this review:

```text
verify disarm_squeaky_board: baseline 9881e89f~1 (scoreboard at 775e5959) —
0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Row cited 0 blocks — vacuous-honest, no `--base` debt. `imports.mjs --rulecheck` → clean. Added-lines-only grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward` reads. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
