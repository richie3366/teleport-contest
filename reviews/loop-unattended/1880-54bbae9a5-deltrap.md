# Review 1880 — 54bbae9a5 — deltrap (D-2921)

- SHA: `54bbae9a5` (coverage; `trap.c` `deltrap`)
- Files: `js/trap.js` (body, `dealloc_trap`, `unlink_trap_node`), `js/do.js`, `js/quest.js`, `js/readobjnam.js`, `js/mklev.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
deltrap          js/trap.js:1351   sync
dealloc_trap     NOT EXPORTED — 1 local js/trap.js:1319
clear_conjoined_pits NOT EXPORTED — 1 local js/trap.js:1294
maybe_finish_sokoban NOT EXPORTED — 1 local js/trap.js:1628
```

`dealloc_trap` is the `trap.h:42` `free` macro. `clear_conjoined_pits` and `maybe_finish_sokoban` are `staticfn`. One local each is that function. `imports.mjs --can` for `quest.js` → `deltrap` and `readobjnam.js` → `deltrap`: ALREADY.

## Intent vs deliverable

Subject promises unlink, panic when the trap is on no chain, Sokoban pit/hole `maybe_finish_sokoban`, and `dealloc_trap`. The diff does that. `deferred_goto` removes the arrival trap on `UTOTYPE_RMPORTAL`. `expulsion(seal)` deletes the near magic portal. Stair loaders and `wizterrainwish` call this function instead of splicing by hand.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `deltrap` | export `trap.js:1351` | `trap.c:6530–6549` |
| `clear_conjoined_pits` | local `trap.js:1294` | `trap.c:6579–6601` |
| `dealloc_trap` | local `trap.js:1319` | `trap.h:42` `free` |
| `unlink_trap_node` | local `trap.js:1328` | the `gf.ftrap` predecessor walk |
| `Sokoban_rules` | local `trap.js:1618` | `rm.h:538` `level.flags.sokoban_rules` |
| `maybe_finish_sokoban` | local `trap.js:1628` | `trap.c:7059–7095` |

## C ↔ JS fidelity

No RNG inside `deltrap`. Order: `clear_conjoined_pits(trap)` first. Then unlink. C: if `trap == gf.ftrap`, advance the head; else walk `ntrap` for the predecessor and `panic("deltrap: no preceding trap!")` when there is none; then `ttmp->ntrap = trap->ntrap`. Then if `Sokoban` and type is `PIT` or `HOLE`, `maybe_finish_sokoban()`. Then `dealloc_trap` (`free`).

JS keeps the one C list as `level.traps` (the array `maketrap` fills; `ntrap` stays null) and, when it is a different object, `game.ftrap`. Head of the array is `shift`. A later index is the predecessor; `splice` removes it and, if that neighbor's `ntrap` is this trap, rewrites it. A real `game.ftrap` node chain uses `unlink_trap_node`. Missing from both throws `deltrap: no preceding trap!`. `dealloc_trap` sets `ntrap` null (no heap free).

`Sokoban_rules()` is `level.flags.sokoban_rules` or the `flags.sokoban` / `game.Sokoban` aliases level gen sets with that bit (`mklev.js` sokoban flag, `do.js:1837` on restore). `maybe_finish_sokoban` clears all three. The pit/hole test is `ttyp === PIT || ttyp === HOLE`.

Callers this diff wires: `do.c:2092` after `goto_level` when `UTOTYPE_RMPORTAL` → `js/do.js:2277` (`t_at` then `newsym`). `quest.c:212` first `MAGIC_PORTAL` on the chain when `seal` → `js/quest.js:303`, else `impossible` if not already expelled. `objnam.c:3859` room floor, not a magic portal → `js/readobjnam.js` `deltrap`. `sp_lev.c:4188` and the stair loaders `l_create_stairway` / `splev_create_stair` / `splev_room_stair` call `deltrap` before the stair. `mkmaze.c:435` `put_lregion_here` already called `deltrap`; the hand unlink is gone.

`csym` lists 59 references. The ones inside `trap.c` (statue, web, arrow, dart, rock, landmine, launch, mintrap, and the disarm/floor/ice helpers) were already on this export. `nhlua.c:489` has no JS binding. `restore.c:1294` `getlev` is unported. `extern.h:3336` only declares it. `dig.c:1872` and `nhlua.c:469` are comments.

## Hallucinations / overclaim

The subject says no arm of `deltrap` is omitted. Conjoined pits, both unlink shapes, the panic, the Sokoban test, and the free are present. `nhl_deltrap`, the `getlev` portal, and the save-stream `free`s are named. `do_pit` (`music.js`) and `fill_pit` (`dig.js`) still call `deltrap`; C `do_pit` calls `flooreffects` and C `fill_pit` (`trap.c:4010`) does not. Those calls predate this commit and are named, not claimed as C sites.

## Density

One 18-line C function plus the free and the two callers that were still splicing. No stub in the panic or Sokoban arm. `clear_conjoined_pits` and `maybe_finish_sokoban` are the live locals.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify deltrap --base 54bbae9a5~1 --reach-all`.

```
verify deltrap: baseline 54bbae9a5~1 (scoreboard at 0a6f86d9b, 2026-09-27T01:43:12.994Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify deltrap: no corpus session is blocked on it at 54bbae9a5~1 — a vacuous verify is NOT a corpus PASS. …
smoke deltrap: no RNG-tagged reach; fixed smoke spread (12 run, 3.7s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`--reach-all` was in that command; the smoke spread is what a no-RNG-tag function runs).

## Actionable C-wrongs

None. A trap on the array or the node chain is unlinked before the Sokoban test and the free, matching `trap.c:6535–6548`.

Verdict: **ACCEPT**
