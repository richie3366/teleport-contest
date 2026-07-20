## 2026-07-20 20:50 — #1044 D-0893 setgemprobs ledger_no
- Objective: seed0014 @631 black vs orange gem in look_here pile.
- C locus: `o_init.c` `setgemprobs` via `ledger_no`/`maxledgerno`.
- Change: stop forcing lev=0; Mines minefill gem weights match C.
- Verification: green+strict PASS; cohort 17/17; seed0014 Scr **678→712**.
- Next: @712 watchman yell vs fountain dries up.

## 2026-07-20 20:45 — #1043 D-0892 do_attack unweapon bash
- Objective: seed0014 @624 bare-hands begin-bashing topline.
- C locus: `uhitm.c` `do_attack` `gu.unweapon` verbose pline.
- Change: clear `game.gu.unweapon` + emit bash/strike bare|gloved msg.
- Verification: green+strict PASS; cohort 17/17; seed0014 Scr **676→678**.
- Next: @631 C `a black gem` vs JS `an orange gem`.

