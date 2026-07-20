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
## 2026-07-20 07:20 — #963 seed0383 wizintrinsic hallu (D-0835)
- Objective: seed0383 @10843 C exercise rn2(2) vs JS wipe rn2(82).
- C locus: wizcmds.c wiz_intrinsic; potion.c make_hallucinated;
  attrib.c exerper Hallucination → exercise(A_WIS,FALSE).
- Change: port make_hallucinated + #wizintrinsic menu (HALLUC arm);
  wire EXT_CMDS. Site-shift/fog hyp falsified — missing timed Hallu.
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **10843→11372** (RNG matched 11054→11423; Scr 142→144).
- Next: seed0383 @11372 C abuse_dog rn2(9) vs JS rn2(6).

## 2026-07-20 07:05 — #962 seed0383 fog vapor TTL (D-0834)
- Objective: seed0383 @10646 C fleeck rn2(5) vs JS rn2(3).
- C locus: region.c inside_gas_cloud / run_regions / add_region;
  monmove.c m_everyturn_effect.
- Change: track mons in gas regions; fog ttl+=5 in run_regions; wire
  m_in_out_region (want_move/minvis hyp falsified — was expired vapor recreate).
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **10646→10843** (Scr 142; cursors 172→181).
- Next: seed0383 @10843 C exercise rn2(2) vs JS wipe_engr rn2(82).

## 2026-07-20 06:48 — #961 seed0383 swallowed melee (D-0833)
- Objective: seed0383 @10608 C overexertion vs JS rn2(5).
- C locus: hack.c domove_core uswallow; uhitm.c attack_checks engulfing_u.
- Change: port swallowed `domove` + `engulfing_u` early-out (Confusion hyp
  falsified — was walk-while-swallowed → fleeck).
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **10608→10646** (RNG matched 10821→11398; Scr 141→142).
- Next: seed0383 @10646 C distfleeck rn2(5) vs JS rn2(3).

## 2026-07-20 04:40 — #960 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs); focused peek seed0383 @10608.
- Change: refreshed CURRENT Score; refined @10608 hyp — C
  `overexertion`/`gethungry` after wipe_engr vs JS `rn2(5)`.
- Verification: green+strict PASS; suite **38/44** Scr **8937**/11405
  RNG **660490**/792838 (83.31%); speed `37+0.22/turn`. Δ vs #955:
  Scr −1 / RNG +59 (= D-0832 seed0383).
- Next: seed0383 @10608 — dump Confusion/Stunned vs C melee path.

## 2026-07-20 04:35 — #959 D-0832 m_dowear / check_gear / I_SPECIAL
- Objective: seed0383 @10374 — port missing monster equip cluster.
- C locus: `worn.c` m_dowear; `makemon.c` m_dowear(TRUE); `mon.c`
  check_gear_next_turn + movemon_singlemon I_SPECIAL.
- Change: new `js/worn.js`; wire makemon / mpickstuff / movemon_singlemon.
- Verification: green+strict PASS; cohort 22/22; prefix **10374→10608**
  (RNG matched 10762→10821; Scr 142→141).
- Next: seed0383 @10608 C gethungry rn2(20) vs JS rn2(5).

## 2026-07-20 04:35 — #956 D-0831 falsify JS mcanmove/sleep/I_SPECIAL
- Objective: seed0383 @10374 — why C skips gnome before vortex mattacku.
- C locus: `mon.c` movemon_singlemon; `monmove.c` dochug; `worn.c` m_dowear.
- Change: none (DIAG removed). Falsified JS-visible freeze/sleep/WAITMASK/
  I_SPECIAL: at EE act uswallow ustuck=108; gnome mov=12 can=1 clear flags;
  invent unworn LEVITATION_BOOTS+dagger; fleeck 10371–72=EE 10373–74=gnome.
- Verification: green+strict PASS; seed0383 still @10374 Scr 142.
- Next: port makemon m_dowear(TRUE) + mpickstuff check_gear + I_SPECIAL arm.

## 2026-07-20 04:24 — #955 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score+docs; no peel).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
  **38/44** PASS; Scr **8938**/11405 (**+0** vs #950); RNG
  **660431**/792838 (83.30%, **+38** = D-0827 soak); speed
  `36+0.21/turn` R² 0.769. seed0383 still @10374 Scr 142.
- Verification: green+strict PASS; full suite exit 38/44.
- Next: seed0383 C-state `mcanmove`/`msleeping`/DEAD for gnome@46,2.

## 2026-07-20 04:22 — #954 D-0830 falsify mcalcmove/MSLOW/minliquid
- Objective: seed0383 @10374 — why C skips gnome before vortex mattacku.
- C locus: `mon.c` movemon_singlemon / `allmain.c` mcalcmove; `monmove.c` dochug.
- Change: none (DIAG removed). Falsified post-swallow allotment:
  same 35×rn2(12); gnome +12 spd=0 typ=ROOM; 10373 match coincidental
  (JS gnome fleeck vs C vortex fleeck). Refined: C pre-fleeck state gate.
- Verification: green+strict PASS; seed0383 still @10374 Scr 142.
- Next: C-state mcanmove/msleeping/DEAD for gnome@46,2 after EE.

## 2026-07-20 04:11 — #953 falsify makemon 165/108 order
- Objective: seed0383 @10374 — EE→gnome vs EE→vortex fleeck order.
- C locus: `makemon.c` fmon head-insert; `mon.c` movemon_singlemon.
- Change: none (DIAG only, removed). Falsified creation/reorder desync:
  same spawn RNG + EOT mcalcmove gnome +12; hp 3/3. Refined: C skips
  gnome dochug with no RNG before vortex mattacku.
- Verification: green+strict PASS; seed0383 still @10374 Scr 142.
- Next: pre-dochug skip gate for gnome@46,2 (or C-state dump).

## 2026-07-20 04:05 — #952 D-0828 dmonsfree / mondead keep-fmon
- Objective: seed0383 @10374 — mid-pass gnome skip vs fleeck order.
- C locus: `mon.c` `m_detach` + `dmonsfree`.
- Change: dead stay on `fmon` until `dmonsfree` in `movemon`. Falsified
  waitmask skip and dead-between-EE-vortex as @10374 cause. Refined:
  C vortex before gnome@46,2 (JS reverse). Prefix still **10374**.
- Verification: green+strict PASS; cohort 7/7.
- Next: earlier makemon/reorder for 165 vs 108.

## 2026-07-20 03:36 — #951 D-0827 mattacku uswallow only-ustuck
- Objective: seed0383 @10374 — C skips gnome dochug / fmon order.
- C locus: `mhitu.c` `mattacku` uswallow→only `u.ustuck`.
- Change: port that early-out. Falsified EOT fmon-order hyp (both
  `156,165,108` + matching mcalcmove). Prefix still **10374**; RNG
  matched **10724→10762**.
- Verification: green+strict PASS; cohort 7/7.
- Next: mid-pass gnome skip gate (not EOT order).

## 2026-07-20 03:16 — #950 public score cadence
- Objective: mandatory full `sessions` score (iteration % 5 == 0).
- C locus: n/a (score-only; no port patch).
- Change: refresh CURRENT Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; suite **38/44**; Scr **8938**/11405;
  RNG **660393**/792838 (83.29%); speed `36+0.22/turn`. Δ vs #945:
  Scr +1, RNG +627, PASS 0. seed0383 Scr 142, RNG 10724 (−159).
- Next: seed0383 @10374 — C gnome skip / fmon order (NOTES hyp).
