# Review 1861 — ba089151c — u_collide_m (D-2902)

- SHA: `ba089151c` (coverage; `do.c` `u_collide_m`)
- Files: `js/do.js` (body and the `goto_level` call)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". No new import. No symbol deleted.
- `sym.mjs` on the callees the body now uses:

```
distu            NOT EXPORTED — but 6 LOCAL CLONE(S) in 6 file(s):
               js/dbridge.js:85  js/display.js:2210  js/do.js:543  js/mail.js:68  js/region.js:334  js/steed.js:162
enexto           js/teleport.js:657   sync
mnexto           js/mon.js:2042   ASYNC — await required
rloc             js/teleport.js:1250   ASYNC — await required
m_into_limbo     js/mon.js:1938   ASYNC — await required
```

`u_collide_m` calls the `do.js:543` `distu`. That one is `dist2` (`hacklib.js:23–25`). The other five locals are not this function.

## Intent vs deliverable

Subject promises the three `impossible` reasons, `youmonst.data` only, `distu <= 2`, the `flags.debug` pline, and the `rloc` short-circuit before limbo. `goto_level` calls it whenever `m_at` is set. The diff does that. It does not add a second `u_collide_m`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `u_collide_m` | export `do.js:2293` | `do.c:1410–1445` |
| `distu` | local `do.js:543` | `hack.h:1531` `dist2`, then `you.h:558` `next2u` is `<= 2` |
| `enexto` / `mnexto` / `rloc` / `m_into_limbo` | live imports | the move and the limbo |
| `impossible` / `pline` | live imports | the bad-arrival and debug lines |
| `goto_level` call | caller | `do.c:1827–1828` |
| `wizcmds.js:623` | caller, not in this diff | `cmd.c:1052–1053` |

## C ↔ JS fidelity

`csym` body is `do.c:1410–1445`. No call other than the two sites. `rn2(2)` is the only RNG in this function. `enexto` may draw more, and only when `rn2(2)` is 0, because `!rn2(2) && enexto && next2u` short-circuits.

The guard is `!mtmp || mtmp == u.usteed || mtmp != m_at(u.ux, u.uy)`. The `impossible` reason is the same nested test: `"no monster"`, `"steed is on map"`, `"monster not co-located"`. Then return. The old body returned on those three without a message, and `goto_level` skipped the steed before the call. C `goto_level` (`do.c:1827–1828`) calls whenever `m_at` is set. JS now does that (`do.js:2004–2005`). A steed left on the arrival square hits the second reason inside the function. `makemap_prepost` already called on any `m_at` (`wizcmds.js:622–623`).

The move is `!rn2(2) && enexto(cc, u.ux, u.uy, youmonst.data) && distu(cc) <= 2`, then `u_on_newpos`. Otherwise `mnexto(mtmp, RLOC_NOMSG)`. `youmonst.data` is not replaced with `mtmp.data` when it is missing. `distu` is squared Euclidean. Orthogonal distance is 1 and diagonal is 2, so `<= 2` is the adjacent square. `dist2`'s argument order is swapped versus `hack.h:1531` and the sum of squares is the same.

After that, `mtmp = m_at(u.ux, u.uy)`. If set and `wizard` (`flags.debug` only; the old `flags.wizard` / `game.wizard` or is gone), `pline("(monster in hero's way)")`. Then `if (!rloc(mtmp, RLOC_NOMSG) || (mtmp = m_at(u.ux, u.uy))) m_into_limbo(mtmp)`. A failed `rloc` does not reassign `mtmp`. A success that still leaves a monster limbos that monster, which may be a different one. Both calls are awaited.

The comment above the C body names `mon_arrive`. It is not a call. The commit says so.

## Hallucinations / overclaim

The subject says a bad arrival reports and limbos whoever still blocks the hero. The three reasons are the `impossible` strings, and the limbo is the `rloc` expression above. "No arm omitted" matches the 36-line body. The debug pline is `flags.debug` only. `next2u` is not a new helper; it is `distu <= 2`.

## Density

One function and the `goto_level` caller that was skipping the steed. The wiz-map caller was already the C test. Small C function. The whole body is in the diff.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify u_collide_m --base ba089151c~1 --reach-all`.

```
verify u_collide_m: baseline ba089151c~1 (scoreboard at 795c5410f, 2026-09-26T21:58:06.992Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify u_collide_m: no corpus session is blocked on it at ba089151c~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke u_collide_m: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line. Reach does not enter a level-arrival collision.

## Actionable C-wrongs

None. The guard, the `rn2(2)` / `enexto` / `distu` test, the debug pline, and the `rloc` limbo match `do.c:1416–1444`.

Verdict: **ACCEPT**
