## 2026-07-20 19:35 — #1034 D-0881 short_oname dip yn
- Objective: seed0014 @388 C `Dip a -4 orcish helm` vs JS cursed thoroughly rusty.
- C locus: `objnam.c` `short_oname`; `potion.c` `dodip` formats via
  `short_oname(doname, thesimpleoname, QBUFSZ-sizeof getobj dip)`.
- Change: port `short_oname` (+simpleonames/thesimpleoname); `dodip`
  uses it. Thoroughly rusty tips past lenlimit→strip BUC/erosion for
  display only. Named omit: other short_oname callers; pair_of them;
  pool/sink dip prompts.
- Verification: green+strict PASS; cohort 11/12 (seed0007 pre-existing
  FAIL); seed0014 Scr **624→633** (RNG FULL); @388/@393 fixed.
- Next: @415 botl AC:10 vs AC:14 after take-off shield; nymph steal
  wording @416–417.

## 2026-07-20 19:22 — #1033 D-0880 yn_function hard-wrap
- Objective: seed0014 screen@383 yn cursor `[1,1]` vs JS `[80,0]`.
- C locus: `topl.c` `tty_yn_function` → `show_topl`/`topl_putsym`
  hard-wrap at CO-1 (SUPPRESS_HISTORY path).
- Change: `yn_function` paints via `topl_wrap_echo`; cursor at wrap
  end; restore unwrapped prompt on toplines after flush.
- Verification: green+strict PASS; cohort 12/12 PASS; seed0014 Scr
  **623→624** (RNG FULL); @383 fixed; first miss @388 post-rust xname.
- Next: seed0014 @388 C short helm name vs JS still rusty/cursed.

## 2026-07-20 19:13 — #1032 D-0879 addinv compare-learn
- Objective: seed0014 screen@212 compare-items More vs invent line.
- C locus: `invent.c` `merged`/`addinv` known/bknown/rknown + invent pline.
- Change: async `addinv` via `mkobj.mergable`; port ID-dim reconcile +
  `You learn more about your items by comparing them.` Named omit:
  quiver-prefer; worn-slot; oname; globby; `#adjust` invent_merged msg.
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **621→623** (RNG FULL); @212 fixed; first miss @383 yn cursor.
- Next: seed0014 @383 yn prompt cursor `[1,1]` vs JS `[80,0]`.

## 2026-07-20 19:06 — #1031 D-0878 chest_shatter_msg
- Objective: seed0014 first screen miss (Scr 620/714; miss was @47 not prefix).
- C locus: `lock.c` `chest_shatter_msg` Blind+`singular` + material switch.
- Change: Blind save/restore for `singular(xname)`; fix PAPER=5/GLASS=19/
  WOOD=8 (were 1/11/13). Named omit potionbreathe / Blind hear-see.
- Verification: green+strict PASS; cohort 38/38 PASS; seed0014 Scr
  **620→621** (RNG FULL).
- Next: seed0014 screen@212 compare-items More vs invent line.

## 2026-07-20 19:01 — #1030 public score cadence
- Objective: mandatory full `sessions` score refresh (iter % 5 == 0).
- C locus: n/a (docs-only cadence).
- Change or falsified theory: no port change; suite stable post D-0877.
- Verification: green+strict PASS; full suite **40/44** Scr **9480**/11405
  RNG **676373**/792838 (85.31%); speed `31+0.23/turn` (R² 0.834).
  Non-PASS: seed0014 Scr 620/714 (RNG FULL); seed2200 229/230;
  seed2600; seed4500.
- Next: seed0014 first screen miss @620; next cadence @#1035.


