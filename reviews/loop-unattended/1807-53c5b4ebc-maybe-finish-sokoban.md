# Review 1807 — 53c5b4ebc — maybe_finish_sokoban (D-2848)

- SHA: `53c5b4ebc` (coverage; `trap.c` `maybe_finish_sokoban`)
- Files: `js/trap.js` (+97/− a few comments)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `maybe_finish_sokoban`: while Sokoban rules are on and `in_mklev` is clear, scan traps, skip `madeby_u`, stop on the first `PIT` or `HOLE`, and if none remains clear the rules bit and `livelog_printf` the completion line. `maketrap` calls it on overwrite after the new type is stored. `deltrap` calls it after the unlink, only for a pit or hole. The diff is that function, those two calls, and a local `Sokoban_rules` that also reads the JS aliases of the bit.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `maybe_finish_sokoban` | local `trap.js:1567` | `trap.c:7059–7095` (C `staticfn`) |
| `Sokoban_rules` | local alias `trap.js:1557` | `rm.h` `Sokoban` ≡ `sokoban_rules` |
| `ordin` | LIVE `hacklib.js:481` | `hacklib.c:624–631` |
| `livelog_printf` | LIVE `pline.js:23` | the chronicle write |
| `maketrap` oldplace arm | caller `trap.js:1060` | `trap.c:580–585` |
| `deltrap` | caller `trap.js:1334` | `trap.c:6546–6547` |

`sym.mjs` (nothing deleted or re-pointed):

```
maybe_finish_sokoban NOT EXPORTED — local js/trap.js:1567
ordin                js/hacklib.js:481   sync
                     (pre-existing dothrow.js:848 clone; this commit imports the export)
livelog_printf       js/pline.js:23   sync
Sokoban_rules        NOT EXPORTED — local js/trap.js:1557
```

## C ↔ JS fidelity

`csym --callers`: declaration `trap.c:75`, `maketrap` at `:585`, `deltrap` at `:6547`. Both are wired.

Gate: `Sokoban && !gi.in_mklev` (`:7063`). `game.in_mklev` is the flag `mklev.js` sets around level build. `Sokoban_rules` is `level.flags.sokoban_rules || level.flags.sokoban || game.Sokoban`. C's macro is only `sokoban_rules`. Level gen writes the same bit to the two JS aliases (`mklev.js:14250–14251`), and `getlev` copies them back onto `game.Sokoban` (`do.js:1820`). The finish arm clears all three, so a reader that ORs an alias sees the rules end. C's `Sokoban = 0` is that one bit.

Scan: walk `level.traps` (the `ftrap` list). `madeby_u` continues. `PIT` (11) or `HOLE` (13) breaks (`trap.h:70–72`). Spiked pit is not in the C test. If the walk ends without a break, including a final `madeby_u` trap, `t` is null and the finish arm runs. Existence does not depend on list order. C prepends; JS pushes. Same result.

Finish: `sokonum = dungeons[uz.dnum].entry_lev - uz.dlevel + 1` (`:7076`). `entry_lev` is stored on the dungeon (`dungeon.js:534–540`). Then clear the flag. The congratulations text is a C comment (`:7085–7088`), not a call. Then `livelog_printf(LL_MINORAC|LL_DUMP, "completed %d%s Sokoban level", sokonum, ordin(sokonum))`. Flags are `0x1000` and `0x4000` (`global.h:506–509`, `const.js`). `ordin` matches the teen rule (`:624–631`). `livelog_printf` substitutes `%d` / `%s` and pushes the chronicle entry. The file write stays the existing deferral. Named. No `rn2`.

`maketrap`: `ttyp = typ` is stored at `trap.js:985`, before the link test. `if (!oldplace)` pushes; the `else if (Sokoban_rules())` is C's `else { if (Sokoban) maybe_finish_sokoban(); }` (`:577–585`). The scan sees the replacement type.

`deltrap`: `clear_conjoined_pits`, unlink, then the pit/hole call (`:6546–6547`). A trap that is not in the list returns before the call. C panics in that case (`:6542–6543`) and also does not finish. `dealloc_trap` (`:6548`) still has no body. Named. The trap is already off the list, which is what the scan reads.

`objnam.c:3859` `deltrap(t)` is the wish-terrain site. JS `deltrap_local` (`readobjnam.js:201`, call `:643`) still splices without `clear_conjoined_pits` or this finish. Named in the commit. It is a pre-existing clone of `deltrap`, not a second `maybe_finish_sokoban`. The two direct C callers of the new function are the ones in `trap.js`.

## Hallucinations / overclaim

The subject says the last pit or hole clears the rules and records the level. That is the `!t` arm. It says `madeby_u` is skipped and the first pit or hole stops the scan. That is the loop. It says the aliases are cleared with the bit. The three stores are there. It does not claim `deltrap_local` or `dealloc_trap` were ported.

## Density

The whole static function and both C call sites. C is 38 lines. The wish-path clone stays a named gap on `deltrap`, not an arm left stubbed inside `maybe_finish_sokoban`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify maybe_finish_sokoban --base 53c5b4ebc~1 --reach-all`.

```
verify maybe_finish_sokoban: baseline 53c5b4ebc~1 (scoreboard at 8b1fae943) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke maybe_finish_sokoban: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
