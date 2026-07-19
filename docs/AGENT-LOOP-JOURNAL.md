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

## 2026-07-19 18:45 — #898 D-0784 dotravel seenv||couldsee
- Objective: seed0360 @104904 C set_apparxy rn2(5) vs JS rn2(4).
- C locus: `hack.c` `findtravelpath` seenv||couldsee; `cmd.c` `dotravel_target`.
- Change: C-state u 3,5 vs JS 4,5 — D-0702 couldsee-only prefer stepped SE
  on Quest CLOUD; use C seenv||couldsee + worsen quiet-rest. Prefix
  **104904→108368**, RNG **109279**; seed0014 **→50259**.
- Verification: green+strict PASS; cohort PASS (incl. 0004/0007/5002).
- Next: @108368 C moveloop_core rn2(76) vs JS rn2(79).

## 2026-07-19 18:30 — #897 D-0783 Gloves POWER + Cloak DISPLACEMENT
- Objective: seed0360 @101930 C exercise vs JS distfleeck (site-shift).
- C locus: `do_wear.c` `Gloves_on` GAUNTLETS_OF_POWER; `Cloak_on`
  `toggle_displacement` CLOAK_OF_DISPLACEMENT.
- Change: C-state — `multi=-1` dressing `afternmv=Gloves_on` then cloak
  wear; not EOT exerper. Port makeknown arms. Prefix **101930→104904**,
  Scr **389→391**, RNG **107246**.
- Verification: green+strict PASS; cohort 15/15 PASS.
- Next: @104904 C set_apparxy rn2(5) vs JS rn2(4).

## 2026-07-19 18:18 — #896 D-0782 Wiz-strt portal FlipY + migrate
- Objective: seed0360 @101022 quasit CLOUD skip 2nd fleeck (misdiagnosis).
- C locus: `sp_lev` flip lregion; `trap.c` `trapeffect_magic_portal`;
  `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL.
- Change: C-state falsifier — wraith @(66,13) trap=17 vs JS none/wrong Y.
  Store LR_BRANCH pre-flip; MAGIC_PORTAL → MIGR_PORTAL. Prefix
  **101022→101930**, Scr **294→389**, RNG **105212**.
- Verification: green+strict PASS; cohort 15/15 PASS.
- Next: @101930 C exercise vs JS distfleeck (site-shift).

## 2026-07-19 18:10 — #895 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs only).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **37/44** PASS; Scr **8300**/11405 (+3 vs #890); RNG **632321**/792838
  (79.75%, +177); speed `36+0.21/turn`. seed0014 49501/578; seed0360
  still @101022 / 101695 / 294; seed4500 3031.
- Verification: green+strict PASS; full suite exit 37/44.
- Next: D-0779 C-state after quasit CLOUD (`m_in_out_region` / offmap
  setter) — do not implement without falsifier.

## 2026-07-19 18:05 — #894 D-0779/D-0781 quasit CLOUD skip fleeck
- Objective: seed0360 @101022 quasit 2nd fleeck vs bat `!rn2(3)`.
- C locus: `monmove.c` `dochug`/`postmov` `mon_offmap`; CLOUD step.
- Change: D-0781 `mon_offmap` in `dochug`/`postmov`. Falsified:
  df-only/`want_move` false (FORCE →101025 only). FORCE DIED-after-
  CLOUD → **101228**/Scr387 — C moves then skips 2nd fleeck; no
  trap/gas at dest; offmap setter still missing.
- Verification: green+strict PASS; cohort 6/6 PASS; peel still @101022.
- Next: C-state postmov after CLOUD (`m_in_out_region` omitted).

## 2026-07-19 17:45 — human pause: strategy reflection (post-#893)
- Objective: explain stuck feel; decide if peel strategy needs change.
- C locus: n/a (meta). See `archive/REFLECTION-2026-07-19-seed0360-peel.md`.
- Change or falsified theory: strategy **keep**; tactics adjust — after
  2 falsifications require C-state / site-shift checklist; PASS flat at
  37 is lagging (seed0360 still FAIL). Diagnose burn @98492 and @100738
  was real; loader peels #743–#881 were healthy. #893 open: C quasit
  df-only vs JS 2nd fleeck (not bat gate).
- Verification: docs only; human paused loop then cleared stop latch.
- Next: #894+ peel packet in reflection file (C quasit df-only).

## 2026-07-19 17:35 — #893 D-0779 quasit 2nd fleeck site-shift
- Objective: seed0360 @101022 C `m_move:1871` `rn2(3)` vs JS `rn2(5)`.
- C locus: `monmove.c` `dochug`/`distfleeck` (2nd fleeck after `m_move`).
- Change: none. DIAG showed JS **quasit** @(33,2) silent move→CLOUD
  + 2nd fleeck @101021 while C expects bat `!rn2(3)`. FORCE skip
  quasit `want_move` → prefix **101025** (bat gate matches). Falsified:
  bat-gate `rn2(3)` itself wrong.
- Verification: green+strict PASS; focused still @101022.
- Next: C-faithful df-only quasit path (`MMOVE_DIED`/`mon_offmap`?).

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

