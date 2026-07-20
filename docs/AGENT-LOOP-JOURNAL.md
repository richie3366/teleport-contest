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
## 2026-07-20 08:20 — #967 seed0383 Monnam hallu / swallowed (D-0838)
- Objective: seed0383 @11524 C getbones vs JS combat (More/key from hallu).
- C locus: do_name.c rndmonnam; display.c swallowed/swallow_to_glyph;
  potion.c make_hallucinated; allmain.c Hallu see_*/swallowed(0).
- Change: display ISAAC + bogusmon/rndmonnam/Monnam; mon/obj_glyph hallu;
  swallowed+docrt/newsym; allmain Hallu refresh. First 3 names match.
- Verification: green+strict PASS; cohort 5/5 PASS; still @11524 Scr 144.
- Next: post-expel Hallu see_* burns → 4th name black pudding; then getbones.
## 2026-07-20 07:42 — #966 seed0383 getmattk mspec + cold (D-0837)
- Objective: seed0383 @11400 C mattacku rnd(20) vs JS fleeck.
- C locus: mhitu.c getmattk mspec_used subst; uhitm.c mhitm_ad_cold;
  zap.c destroy_items.
- Change: ice vortex mspec_used kept AT_ENGL in JS; port getmattk→TUCH,
  mhitm_ad_cold_u, export/call destroy_items (D-0837).
- Verification: green+strict PASS; cohort 36/36 PASS; prefix
  **11400→11524** (RNG matched 11437→11527; Scr 144).
- Next: seed0383 @11524 C getbones rn2(3) vs JS rn2(20).

## 2026-07-20 07:34 — #965 public score cadence
- Objective: mandatory full `sessions` score (iter % 5 == 0).
- C locus: n/a (score+docs); diagnosed seed0383 @11400 only.
- Change: no JS patch. Documented suite **38/44** Scr **8946**/11405
  RNG **661122**/792838 (83.39%); Δ vs #960 Scr +9 RNG +632.
  @11400: C `AC_VALUE`→`rnd(2)` (hack.h neg AC) then `rnd(20)` hit;
  JS matches AC roll then fleeck `rn2(5)` — left mattacku w/o hit.
- Verification: green+strict PASS; full `sessions` 38/44.
- Next: seed0383 @11400 dump range2/aatyp/find_offensive after AC_VALUE.

## 2026-07-20 07:30 — #964 seed0383 abuse_dog / xkilled luck (D-0836)
- Objective: seed0383 @11372 C abuse_dog rn2(9) vs JS rn2(6).
- C locus: dog.c abuse_dog; sounds.c yelp/growl; uhitm.c hmon_hitmon_pet;
  mon.c xkilled cleanup change_luck.
- Change: port abuse_dog + yelp/growl (Hallu h_sounds); wire hmon pet
  path; xkilled peaceful/tame luck rn2(2) + tame adjalign(-15).
  mtame-intimacy hyp falsified — missing hmon_hitmon_pet.
- Verification: green+strict PASS; cohort 36/36 PASS; seed0383 prefix
  **11372→11400** (RNG matched 11423→11437; Scr 144).
- Next: seed0383 @11400 C mattacku rnd(20) vs JS rn2(5).

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
