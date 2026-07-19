# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-19 17:20 — #892 getpos seenv stairs (D-0779)
- Objective: seed0360 @100738 bat Y drift / wrong travel dest.
- C locus: `getpos.c` terrain feature `seenv`; `cmd.c` `C('j')` rush.
- Change: `js/getpos.js` `terrain_feature_matches` requires `seenv`
  (blank `disp_ch` is not known). Falsified: C hero@(9,1) at first
  siege movemon; quitchars-before-`\n` (C binds rush first).
- Verification: green+strict PASS; cohort 10/10 PASS; seed0360 prefix
  **100738→101022**, Scr **293→294**, RNG matched **101517→101695**.
- Next: @101022 C `m_move:1871` `rn2(3)` vs JS `rn2(5)`.

## 2026-07-19 17:04 — #891 getdir SELF + Wiz-strt hero lane (D-0779/D-0780)
- Objective: seed0360 @100738 bat Y drift after FlipY.
- C locus: `cmd.c` `getdir` NHKF_GETDIR_SELF; `monmove.c` first siege moves.
- Change: `js/lock.js` `getdir` — `'.'` is SELF (dx=dy=0), not cancel
  (D-0780). Falsified post-EOT forced `movemon` / umov=0 while-continue
  (breaks green). Diagnosed: after Wiz-strt `'.'` EOT, JS `#chat`/`y`
  moves hero (9,1)→(8,0) before first siege `movemon`; C still @ (9,1)
  so quasit/bat approach lanes differ (JS bat y=2 vs C y=1).
- Verification: green+strict PASS; cohort 1500/1800/0361/5002 PASS;
  seed0360 prefix still @100738, Scr **292→293**, RNG 101517.
- Next: why C first siege movemon sees hero@(9,1) (turn order after
  EOT vs `#chat`/`y`) — not mfndpos wall admit (D-0779).

## 2026-07-19 16:42 — #890 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Reflects #889 Wiz-strt throne `\\` (CLOUD match; seed0360 RNG
  matched 104024→101517; peel still @100738).
- Verification: green+strict PASS; full suite **37/44**, Scr **8297**/11405,
  RNG **632144**/792838 (79.73%), speed `37+0.23/turn`. Δ vs #885:
  Scr 0, RNG **−2507**, PASS 0.
- Next: first bat move separating Y after FlipY (D-0779).

## 2026-07-19 16:39 — #889 Wiz-strt throne template escape (D-0779)
- Objective: seed0360 CLOUD(37,*) off-by-one / bat Y drift @100738.
- C locus: `dat/Wiz-strt.lua` throne `\`; JS `load_wiz_strt` map string.
- Change: `WIZ_STRT_MAP` `\.` ate a char (row5 len 75); use `\\`.
  Post-flip CLOUD(37,1)/(37,4) now match C. Peel still @100738 bat Y.
- Verification: green+strict PASS; cohort seed1500/1800/0361/0367/5002
  PASS; seed0360 prefix @100738, RNG matched 101517/120639 Scr 292.
- Next: first move separating bat Y after FlipY (D-0779).

## 2026-07-19 16:28 — #888 seed0360 C typ dump falsifies HWALL (D-0779)
- Objective: seed0360 @100738 C `levl` typ / bat mfndpos cnt.
- C locus: `mon.c` `mfndpos`; `sp_lev.c` `flip_level`; Wiz-strt.
- Change or falsified theory: C@100733 bat@(34,1) cnt=7 all ROOM
  typ=25 (not HWALL admit). Post-flip spawn matches JS; CLOUD(37,*)
  off-by-one then movement Y drift to peel. No production patch.
- Verification: green+strict PASS; seed0360 still @100738; DIAG gone.
- Next: cloud/row (37,*) pre-flip or first separating bat move (D-0779).

## 2026-07-19 16:10 — #887 seed0360 bat mfndpos DIAG confirm (D-0779)
- Objective: seed0360 @100738 C vs JS vampire bat mfndpos cnt / terrain.
- C locus: `monmove.c:1871/:1970` `m_move`; `mon.c` `mfndpos`; Wiz-strt.
- Change or falsified theory: no production patch. Live JS DIAG @100733
  confirms cnt=4, HWALL typ=2 @(33–35,3), quasit@(34,1); C chcnt through
  rn2(7); FORCE→100804. Recorder rebuild for C typ incomplete.
- Verification: green+strict PASS; seed0360 still @100738; DIAG/FORCE gone.
- Next: C `levl[33..35][3].typ` via working recorder (D-0779).

## 2026-07-19 15:55 — #886 seed0360 @100738 bat HWALL diagnose (D-0779)
- Objective: seed0360 @100738 vampire bat mfndpos cnt vs C chcnt.
- C locus: `monmove.c:1970` / `mon.c` `mfndpos`; `sp_lev.c` load_special;
  `dat/Wiz-strt.lua` FlipY.
- Change or falsified theory: refined — cnt=4 = quasit@(34,1)+3×HWALL
  @(33–35,3); FORCE→100804; post-FlipY dump confirms HWALL from map `-`.
  Aligned Wiz-strt epilogue (link/remove/cleanup); no prefix Δ.
- Verification: green+strict PASS; cohort 5/5; seed0360 still @100738.
- Next: C runtime typ at post-FlipY (33–35,3) (D-0779).

## 2026-07-19 15:38 — #885 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Reflects D-0776…D-0778 gains since #880.
- Verification: green+strict PASS; full suite **37/44**, Scr **8297**/11405,
  RNG **634651**/792838 (80.05%), speed `35+0.21/turn`. Δ vs #880:
  Scr +17, RNG +5496, PASS 0. seed0360 still @100738 (D-0779).
- Next: Wiz-strt post-FlipY terrain @(33–35,3) vs C (D-0779).

## 2026-07-19 15:35 — #884 seed0360 @100738 bat mfndpos HWALL (D-0779)
- Objective: @100738 C rn2(6) vs JS rn2(5) m_move chcnt.
- C locus: `monmove.c:1970` / `mon.c` `mfndpos`; Wiz-strt post-FlipY.
- Change or falsified theory: Not a generic chcnt off-by-one. Vampire
  bat@(34,2) JS cnt=4 vs C≥7; rejects HWALL@(33–35,3)+quasit@(34,1).
  Matched `rn2(5)` was JS distfleeck vs C still in chcnt. FORCE-open
  those 3 walls → prefix **100738→100804**. No production patch;
  next is why C sees walkable terrain there.
- Verification: green+strict PASS; focused FAIL @100738; experiment only.
- Next: Wiz-strt terrain at post-FlipY (33–35,3) vs C (D-0779).

## 2026-07-19 15:22 — #883 m_move Tengu teleport (D-0778); @100397→100738
- Objective: seed0360 @100397 C distfleeck vs JS rn2(3).
- C locus: `monmove.c` `m_move` Tengu `!rn2(5)` before not_special.
- Change or falsified theory: JS omitted Tengu nature teleport; matched
  `rn2(5)` strings hid the missing call until next mon’s fleeck vs
  stalker `rn2(3)`. Ported Tengu rloc/mnexto + uswallow early-out.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100397→100738**, RNG **100887→104024**, Scr **292**/833.
- Next: @100738 mfndpos chcnt rn2(6) vs rn2(5) (m_move appr==0).

## 2026-07-19 15:17 — #882 maketrap AIR/CLOUD (D-0777); @100104→100397
- Objective: seed0360 @100104 C get_location vs JS rnd(4) mid Wiz-strt traps.
- C locus: `trap.c` `maketrap` (`IS_AIR && typ != MAGIC_PORTAL`).
- Change or falsified theory: CLOUD is SPACE_POS so DRY get_location can
  pick it; C rejects non-portal traps → no victim rnd(4). Ported terrain
  gates + `splev_create_trap` stairs/`get_location_coord` parity.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **100104→100397**, RNG **100408→100887**, Scr **292**/833.
- Next: @100397 distfleeck vs rn2(3) (m_move).

## 2026-07-19 15:00 — #881 Wiz-strt (D-0776); @98505→100104
- Objective: seed0360 @98505 nhlib shuffle vs rn2(79) after getbones.
- C locus: `dat/Wiz-strt.lua` via `load_special`.
- Change or falsified theory: falsified wizard3/earth; proto log at
  rngLen 98505 is Wiz-strt. Ported `load_wiz_strt` (+ spare wizard3/earth
  loaders). Prefix **98505→100104**, Scr **275→292**.
- Verification: green+strict PASS; cohort 6/6; seed0360 **100104**/100408
  Scr **292**.
- Next: @100104 Wiz-strt traps get_location vs rnd(4).

## 2026-07-19 14:47 — #880 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change or falsified theory: documented suite aggregates in CURRENT.md.
  Confirmed seed0360 still @98505: C nhlib shuffle rn2(3) vs JS rn2(79).
- Verification: green+strict PASS; full suite **37/44**, Scr **8280**/11405,
  RNG **629155**/792838 (79.35%), speed `36+0.20/turn`. Δ vs #875:
  Scr 0, RNG **+21** (D-0775), PASS 0.
- Next: wizard3 load_special @98505 (nhlib shuffle after getbones).

## 2026-07-19 14:45 — #879 minliquid (D-0775); @98492→98505
- Objective: seed0360 @98492 why C skips linedup rn2(3).
- C locus: `mon.c` `minliquid` / `movemon_singlemon`.
- Change or falsified theory: ported `minliquid` (lava+pool+eel).
  Recorder: C has mumak@(55,9) on LAVAPOOL, same row9 map as JS;
  C spends movement then dies in minliquid (no dochug). Falsified
  couldsee/missing-boulder/DEC-lava@61. Do not FORCE linedup.
- Verification: green+strict PASS; cohort 35/35; seed0360
  **98505**/98528 Scr **275**.
- Next: wizard3 @98505 nhlib shuffle after getbones; then hellfill.

