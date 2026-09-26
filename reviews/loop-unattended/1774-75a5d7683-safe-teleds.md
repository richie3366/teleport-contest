# Review 1774 — 75a5d7683 — safe_teleds (D-2815)

- SHA: `75a5d7683` (coverage; uncontrolled teleport)
- Files: `js/teleport.js` `safe_teleds` (`:1652`), `teleok` (`:1391`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can teleport.js hack.js Passes_walls_prop`: `ALREADY`. `--can teleport.js trap.js t_at`: `ALREADY`.

## Intent vs deliverable

Subject promises one `safe_teleds`: forty `rnd`/`rn2` tries, then a ring-pair list, `Passes_walls` from the youprop macro (flat or `uprops`), and `t_at` before `teleok(TRUE)` so a null trap does not accept the cell. `teleok` uses that same `t_at`. The diff is those two call sites plus the `Passes_walls_prop` call. The forty-try loop and `teleds` returns were already there.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `safe_teleds` | C body, async | `teleport.c:716–770` |
| `teleok` | same file, awaited | `teleport.c:419–445` |
| `Passes_walls_prop` | imported `hack.js:237` | `youprop.h:284–286` |
| `t_at` | imported `trap.js:1063` | `trap.c:6501–6512` |
| `trap_at` | leftover local `teleport.js:898` | not used by these two functions |
| `teleds` | same file, awaited | success placement |
| `collect_coords` | same file | `teleport.c` ring list |

`csym --callers safe_teleds`: `pray.c:399` → `pray.js:670`; `pray.c:463` → `pray.js:734`; `region.c:1387` → `region.js:1237`; `teleport.c:914` → `teleport.js:1796`; `trap.c:5189` → `trap.js:6404`; `trap.c:6936` → `trap.js:6618`; `trap.c:7021` → `trap.js:6720`. `cmd.c:1043` and `timeout.c:522` are comments. `do.c:1566` is the named Gehennom arm.

`sym.mjs` (the re-point off the local walker):

```
t_at             js/trap.js:1063   sync
                 ALSO 1 LOCAL CLONE js/steed.js:167
Passes_walls_prop js/hack.js:237   sync
trap_at          NOT EXPORTED — local js/teleport.js:898
safe_teleds      js/teleport.js:1652   ASYNC
teleok           js/teleport.js:1391   ASYNC
```

The steed `t_at` is the other file’s ftrap walk (D-2813 named it). This commit does not add a second `t_at`.

## C ↔ JS fidelity

Forty tries (`teleport.c:736–743`): `nux = rnd(COLNO - 1)`, `nuy = rn2(ROWNO)`, `teleok(..., FALSE)`, then `teleds` and return. JS awaits `teleok` and `teleds`. The `rnd` stays before `rn2`, and both stay before `teleok`.

Ring list (`:747–751`): `CC_RING_PAIRS | CC_SKIP_MONS`, and `CC_SKIP_INACCS` unless `Passes_walls`. C is `HPasses_walls || EPasses_walls`, and those are `uprops[PASSES_WALLS].intrinsic` / `.extrinsic` (`youprop.h:284–286`). `Passes_walls_prop` is `_uprop_he_st`: flat `u.HPasses_walls` / `u.EPasses_walls` or the `uprops` slot (`hack.js:3062–3065`). The old gate also accepted sticky `u.Passes_walls` and never read the slot. `collect_coords(candy, u.ux, u.uy, 0, cc_flags, null)` matches the null predicate. `debugpline4` inside `collect_coords` (`teleport.c:711`) is still omitted. Named.

Backup (`:755–763`): `teleok(FALSE)` wins immediately. Otherwise `!backupspot.x && t_at && teleok(TRUE)`. JS uses `&&`, so `teleok(true)` runs only when `t_at` returned a trap. `backupspot` starts at `{0,0}`; a hit at x 0 would not stick. C initializes both coordinates to 0 and tests `!backupspot.x`, so the same column is skipped. Then `teleds` on the remembered trap (`:765–768`) or false.

`teleok` (`:421–444`): when `trapok` is false, `t_at`; no trap, vibrating square, or pit/hole while levitating or flying sets `trapok`; otherwise return false. Then `goodpos`, `tele_jump_ok`, `in_out_region`. The hunk replaces local `trap_at` with `t_at`. `t_at` walks `level.traps`, which is where `maketrap` pushes. C walks `gf.ftrap`. Local `trap_at` (`:898`) still scans `game.ftrap` and then `level.traps`, and `occupied` still calls it. Named.

## Hallucinations / overclaim

`do.c:1566` is inside `Inhell && up && u.uhave.amulet` (`do.c:1541–1568`): same-level result calls `safe_teleds(TELEDS_NO_FLAGS)` then `next_to_u`. `do.js:1544` still names that arm as deferred. The subject does not claim it was wired. The other seven call sites pass the same flags as C.

## Density

The whole `safe_teleds` body is in this commit’s function. `teleok`’s trap source changed with it. `collect_coords` was not rewritten.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify safe_teleds --base 75a5d7683~1 --reach-all`.

```
verify safe_teleds: baseline 75a5d7683~1 (scoreboard at 686ccd9e7) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke safe_teleds: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2815’s green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
