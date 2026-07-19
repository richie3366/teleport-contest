# Agent loop journal archive

## 2026-07-19 09:10 — #834 oracle load_special (D-0745)
- Objective: seed0360 @3037 nhlib shuffle vs rn2(79) (CURRENT primary).
- C locus: `dat/oracle.lua` / `sp_lev.c` `load_special` / `mkmaze.c` `makemaz`.
- Change: `load_oracle` + DELPHI roomtype + statue montype helpers.
  Was missing special → place_lregion; not minend.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **3037→8708**; RNG **3186→8728**; Scr **187→200**.
- Next: @8708 C castle.lua vs JS rn2(79) after getbones.

## 2026-07-19 08:55 — #833 Boots_on SPEED_BOOTS (D-0744)
- Objective: seed0360 @3006 exercise rn2(19) vs rn2(5) (CURRENT primary).
- C locus: `do_wear.c` `Boots_on` SPEED_BOOTS → `makeknown` → `exercise`.
- Change: port SPEED_BOOTS makeknown + You_feel; was deferred (only
  FUMBLE_BOOTS). Not EOT exerchk — dressing finish after --More--.
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **3006→3037**; RNG **3120→3186**; Scr **181→187**.
- Next: @3037 C nhlib.lua shuffle vs JS rn2(79) after ^V/getbones.

