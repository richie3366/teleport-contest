# Reviews — loop 2026-08-15 (D-1016 … D-1036)

Scope: commits **after** the
`reviews/since-second-attempt-with-perfect-public-score/` series
(`8bba5965` … HEAD `2ae43a8b`).

Not one file per SHA (the 86-review bar). Full reviews only when the
commit dumps RNG / timers / getlin. Everything else is triage.

Same grid as `../since-second-attempt-with-perfect-public-score/00-RUBRIQUE.md`:
diff vs `nethack-c/upstream`, not vs the loop journal.

## Verdicts (full reviews)

| File | Commit | D-id | Verdict |
|------|--------|------|---------|
| [D-1022-7f952620-whip-grapple-pole.md](./D-1022-7f952620-whip-grapple-pole.md) | `7f952620` | D-1022 whip/grapple/pole +1041 | **QUALITY-RISK** 5/10 |
| [D-1023-aaac3f9d-lamp-trap-bot.md](./D-1023-aaac3f9d-lamp-trap-bot.md) | `aaac3f9d` | D-1023 lamp+cocktail+trap+BoT | **QUALITY-RISK** 4.5/10 |
| [D-1033-a59caac8-vlad-throne.md](./D-1033-a59caac8-vlad-throne.md) | `a59caac8` | D-1033 Vlad special + dosit | **ACCEPT-WITH-DEBT** 6.5/10 |
| [D-1034-63e86f5a-ordinary-throne.md](./D-1034-63e86f5a-ordinary-throne.md) | `63e86f5a` | D-1034 ordinary 1–13 + genocide | **QUALITY-RISK** 5.5/10 |
| [D-1036-2ae43a8b-hatch-egg.md](./D-1036-2ae43a8b-hatch-egg.md) | `2ae43a8b` | D-1036 hatch_egg **without** wire | **ACCEPT-WITH-DEBT** 7.5/10 |

## Cross-cutting

- Fortress **44/44** held (cadence #1290 / #1295 / #1300 / #1305).
- Git subjects that say “Match C” mean **`doapply`/`dosit` dispatch**,
  not the callee (`thitmonst`, `makemon(NULL)`, `begin_burn`, `dotrap`).
- Public suite is **unhit** on apply/sit/hatch. Green/cohort ≠ proof of
  the body.
- Density: D-1022/1023 too large; 1296–1301 wiser (one C function);
  D-1034 glues sit+read.
- **Do not relaunch the loop** to “finish” HATCH_EGG: D-1037 did that
  off-loop (`save_timers` + dispatch). D-1036’s 42/44 was off-level
  timers, not a wrong hatch body.

## Triage (no 180-line file)

| SHA | D-id | Note |
|-----|------|------|
| `24ce754a` | D-1016 shopdig | Peel C-wrong `um_dist`; human session |
| `afd40c3d` | — | Docs: loop model Extra High |
| `18d9bb17` | — | 86 reviews |
| `708cf948`…`2423fafc` | D-1017…1020 | Targeted peels: cancel/cmdq/sellobj/setnotworn |
| `68e513ca` | D-1021 jelly + cadence | C `obfree` vs JS `quan=0`; mixed PROCESS-SMELL |
| `060cbf77` | D-1024 flip book/coin | Small; oclass dispatch; unhit |
| `a525cb29` | D-1025 candle/candelabrum | 2 C functions; `use_lamp` callee |
| `d1765108` | D-1026 grease + #1295 | Mixed cadence; `grease_ok` COIN |
| `bba90455` | D-1027 tinning kit | 1 C + eat.js floorfood |
| `8ea8dbcb` | D-1028 bell | 1 C + detect `openit` |
| `6f1f4ad5` | D-1029 figurine | 1 C + `make_familiar` |
| `1942e9ac` | D-1030 unicorn horn | Right size; `shuffle_int_array`; `#monster` |
| `8f0aef90` | D-1031 horn + #1300 | Mixed cadence |
| `31c0489f` | D-1032 fig_transform | Timer, 15 files; cousin of D-1036 |
| `7b1251f3` | D-1035 nhl_gamestate | Snapshot `you` skips worn ptrs; leave unhit |

## After this bundle (order)

1. **D-1037 (done, off-loop):** dump JS `HATCH_DROP` = off-level
   `where=FLOOR` `on_fobj=0`; C `save_timers(RANGE_LEVEL)`; hatch
   **dispatched**; suite 44/44.
2. Remaining useful code: D-1022 real `getdir` (not `getdir_whip`);
   `hurtle` via already-imported `walk_path`; `dosit` `else if (trap)`
   before throne. (D-1038 ports getdir + hurtle.)
3. Next review bundle: by ~8–10 iters, or as soon as a SHA is ≥2 C
   functions / ≳300 LOC JS.
