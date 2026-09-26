# Review 1803 — a2fe5c1c5 — dumpit (D-2844)

- SHA: `a2fe5c1c5` (coverage; `dungeon.c` `dumpit` plus `files.c` `debugcore` / `nh_basename`)
- Files: `js/dungeon.js` (+80), `js/files.js` (+58), `js/cmd.js` (comment only)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `dumpit`: return unless `debugcore('dungeon.c', false)`, otherwise format every dungeon, every special level, and every branch the way `fprintf` does, and call it from `init_dungeons` after `fixup_level_locations` because `DEBUG` is on. It also promises `debugcore` and `nh_basename`, which were absent. The diff adds those three functions, a module array standing in for stderr, a no-op `getchar`, and the `init_dungeons` call. The `cmd.js` hunk is a comment that `debugcore` now exists.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `dumpit` | local `dungeon.js:1113` | `dungeon.c:91–144` (`csym` 90–144) |
| `dumpit_fprintf` | local sink `dungeon.js:1094` | `fprintf(stderr, …)` |
| `dumpit_getchar` | no-op `dungeon.js:1102` | `(void) getchar()` |
| `debugcore` | LIVE export `files.js:1294` | `files.c:3126–3166` |
| `nh_basename` | LIVE export `files.js:1267` | `files.c:199–229` |
| `pmatch` | LIVE, wildcards arm only | `strutil.c` via `files.c:3154` |
| `wizard_mode` | pre-existing local `files.js:52` | `flag.h:30` `wizard` ≡ `flags.debug` |

`sym.mjs` (nothing deleted or re-pointed; `dumpit` is C `staticfn`, so one local is the port):

```
dumpit           NOT EXPORTED — 1 LOCAL js/dungeon.js:1113
debugcore        js/files.js:1294   sync
nh_basename      js/files.js:1267   sync
dumpit_fprintf   NOT EXPORTED — local js/dungeon.js:1094
dumpit_getchar   NOT EXPORTED — local js/dungeon.js:1102
wizard_mode      NOT EXPORTED — 5 locals (files.js:52 is the one debugcore calls)
```

`imports.mjs --can js/dungeon.js js/files.js debugcore` → `ALREADY`. The `files.js` ↔ `dungeon.js` cycle is the existing `maxledgerno` edge. `dumpit` reads `debugcore` only when called, after both modules have finished evaluating.

## C ↔ JS fidelity

`csym --callers dumpit`: declaration at `dungeon.c:88` and the call at `:1317` inside `#ifdef DEBUG`. `patchlevel.h:36` defines `DEBUG`. JS `init_dungeons` calls `dumpit()` after `fixup_level_locations`. C also runs `nhl_done` and `free_proto_dungeon` between those two. Neither touches `dungeons`, `sp_levchn`, or `branches`. The map names both as omitted.

`explicitdebug(__FILE__)` is `debugcore(file, FALSE)` (`lint.h:27`). JS passes `'dungeon.c'` and `false`. `debugcore` then:

1. `wizard_mode()` — C is `!wizard`. The local ORs `flags.wizard`. The only assignment of `flags.wizard` in `js/` is `false` (`cmd.js:250`, next to `flags.debug = false`). The extra term does not open the gate.
2. Empty filename → false (`:3135–3136`).
3. Empty `sysopt.debugfiles` → false (`:3138–3141`). Contest play leaves this empty, so `dumpit` returns before any format.
4. `nh_basename(filename, true)` (`:3144`). Path strip is `lastIndexOf('/')`. The `!keep_suffix` suffix strip is not taken. WIN32 `'\\'` and VMS (`:207–210`, `:227`) are compiled out on this host. Named.
5. `wildcards && pmatch(debugfiles, base)` (`:3154`). `dumpit` passes false, so `pmatch` does not run. Argument order matches `pmatch(patrn, strng)`.
6. First `indexOf` plus the token test: start, space, or `/` before, and space or end after (`:3158–3163`).

`nh_basename` with `keep_suffix` false strips the last `.suffix` only when the name part is shorter than 80 (`:211–222`). A longer name is returned unsliced. JS returns a fresh string. C's static `basebuf` is not shared. Named. Callers `options.c:443` and `version.c:102` stay unwired. Named in the map.

Format walk, only if `debugcore` is true. Dungeon loop uses `game.n_dgns` and `game.dungeons[i]`. The three `fprintf`s and the flag words (`rogue_like`, `maze_like`, `hellish`) match `:102–110`. Those fields are booleans (`dungeon.js:614`), so the truth test matches the C bitfield. `getchar` after each dungeon is the no-op.

Special levels walk `game.sp_levchn`. `add_level` (`dungeon.c:544–563`) inserts by `(dnum, dlevel)`. JS `add_level` (`dungeon.js:372–385`) splices on the same test, so array order is the chain. Proto, `rndlevs`, `dnum`, `dlevel`, and the four flag words including `town` match `:115–121`.

Branches walk `game.branches`. `insert_branch` (`dungeon.c:462–508`) sorts by `branch_val`. JS `insert_branch` (`dungeon.js:245–271`) splices on the same comparison. Type names are the nested ternary at `:127–136`: `BR_STAIR` 0, `BR_NO_END1` 1, `BR_NO_END2` 2, `BR_PORTAL` 3 (`dungeon.h:91–96`, `const.js`). Then one `getchar`, `"\nDone\n"`, one `getchar` (`:140–142`). No `rn2`.

`dumpit_fprintf` pushes onto `dumpitStderr`. Nothing reads that array. The map names the sink. `dumpit_getchar` does not block. Named (no stdin under Rule #2).

## Hallucinations / overclaim

The subject says `init_dungeons` calls `dumpit` after `fixup_level_locations` because `DEBUG` is defined. Both are true. It says the usual case returns false on empty `debugfiles`. That is `files.c:3138–3141`. It says array order is the chain order. `add_level` and `insert_branch` both insert by the C key, not by push. The `(void) getchar()` and stderr-array notes match the helpers. No "Match C" on a stubbed callee: `debugcore` and `nh_basename` have their bodies.

## Density

The whole `dumpit` body, its one C caller, and the two callees that body needs. Other `showdebug` / `explicitdebug` sites stay named no-ops. `place_level`'s `DDEBUG` fprintf is not compiled. C is 55 + 42 + 32 lines. Under the 200-line density floor because the C is that small.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify dumpit --base a2fe5c1c5~1 --reach-all`.

```
verify dumpit: baseline a2fe5c1c5~1 (scoreboard at 9e67c4a79) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke dumpit: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. D-2844 says the same. No `REGRESSED` session. Green, strict, cohort, and the 44/44 claim were not re-run in this audit (the cadence `sessions` run is separate).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
