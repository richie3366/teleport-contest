# Review 1809 — e6d1ac649 — get_unused_cs (D-2850)

- SHA: `e6d1ac649` (coverage; `vision.c` `get_unused_cs`)
- Files: `js/vision.js` (+53/− some of the old inline clear)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `get_unused_cs`: pick the could-see buffer `viz_array` is not, zero every cell, and set each row's min to `COLNO - 1` and max to `1`. `vision_recalc` calls it once, after the `in_mklev` return and before the swallow, blind, and rogue arms, and sets `active_buf` from which buffer was installed. The diff replaces the `active_buf` toggle and the `COLNO` / `0` clear with that function, in both places `vision_recalc` installs the new buffer.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `get_unused_cs` | sync export `vision.js:953` | `vision.c:274–299` (C `staticfn`) |
| `vision_recalc` | caller `vision.js:987` | `vision.c:542` |
| `cs_buf0` / `cs_buf1` | module arrays | `cs_rows0` / `cs_rows1` |
| `cs_rmin*` / `cs_rmax*` | module arrays | the row bound vectors |

`sym.mjs`: `get_unused_cs` is `js/vision.js:953 sync`. Nothing was deleted. C is `staticfn`; the export is the JS call from the same module. No second clone.

## C ↔ JS fidelity

`csym` body is `vision.c:273–299`. Callers the tool prints: the forward declaration `:96`, the header comment `:268`, and the call `:542`. The comment at `:546` is not a call. There is no second call from a light routine in this tree. `do_light_sources` is handed the buffer `vision_recalc` already has. Named.

Selection: `viz_array == cs_rows0` takes buffer 1, anything else takes buffer 0 (`:279–287`). JS compares `game.viz_array === cs_buf0`. `init_vision_globals` sets `viz_array` to that array (`vision.js:1225`), and both install sites assign `game.viz_array = next` where `next` is `unused.rows`. The identity test matches the pointer test. `active_buf` is then `next === cs_buf0 ? 0 : 1`, so the flag follows the buffer that was just installed. The old code flipped `active_buf` and could disagree with `viz_array`.

Clear: each row `fill(0)`. C `memset(**rows, 0, ROWNO * COLNO * sizeof(seenV))` (`:293–294`) is one block; the JS rows are separate `Uint8Array`s, so the per-row fill is the same write. Then `rmin[row] = COLNO - 1` and `rmax[row] = 1` (`:296–297`). `set_min` updates when `*row_min > z` (`:1169–1173`). `set_max` updates when `*row_max < z` (`:1175–1179`). A fresh row therefore has min greater than max, and a sighting on a map column (x starts at 1) moves those edges. The previous JS clear used `COLNO` and `0`. That is what this commit replaces.

`vision_recalc` (`:532–548`): clear `vision_full_recalc`, return if `in_mklev || in_getlev || !vision_inited`, then `get_unused_cs`, then the swallow / `control == 2` empty arm, then `Blind`. JS returns early when `u` or `level` is missing, then on `in_mklev`, then calls `get_unused_cs`, then `control === 2 || uswallow`, then blind. The `in_getlev` and `vision_inited` gates were already absent; this commit did not add them and does not claim them. The call sits where `:542` sits relative to the arms the subject names. No `rn2`.

`vision_off_newsym_gbuf` still picks the other buffer with `active_buf` and `fill(0)` only (`vision.js:1251–1252`). It does not use this sentinel. Named. `vision_reset` still nulls `_viz_rmin` instead of pointing it at `cs_rmin0`. Named. The module `cs_rmin*` arrays still start filled with `COLNO` and the max arrays with `0` (`:89–92`) until `get_unused_cs` overwrites the unused side. C static storage starts at 0. Named. The public 44/44 run on this tree did not regress, so that initial fill is not a fortress miss.

## Hallucinations / overclaim

The subject says the empty sentinel is `COLNO - 1` and `1`, and that `set_min` / `set_max` treat that as already at the edge. The macros are strict `>` and `<`, so an empty row stays empty and a real column moves the bound. It says the buffer is the one `viz_array` is not. The `=== cs_buf0` test is that. It says the header's light routine is not a call here. `--callers` agrees. It does not claim `vision_off_newsym_gbuf` or `vision_reset` were switched over.

## Density

The whole static function and its one call. C is 27 lines. The two install sites in `vision_recalc` both take the returned triple.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify get_unused_cs --base e6d1ac649~1 --reach-all`.

```
verify get_unused_cs: baseline e6d1ac649~1 (scoreboard at 53c5b4ebc, 2026-09-26T07:43:50.172Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke get_unused_cs: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. This audit's `sessions` run is 44/44 on the same tree (see the cadence section of the journal). The D-log's own full 44 was not re-derived from that log line alone.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
