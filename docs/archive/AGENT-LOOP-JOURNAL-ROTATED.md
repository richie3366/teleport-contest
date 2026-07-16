## 2026-07-17 00:15 — #644 D-0579 equip SUGGEST + Blindf_on / Blind vision
- Objective: seed5006 Scr residual 217/249 (CURRENT primary).
- C locus: do_wear.c equip_ok/cursed/Blindf_on; vision.c Blind vision_recalc;
  mhitu.c hitmu map_invisible; youprop.h EBlinded.
- Change: SUGGEST-only P/W/T prompts; cursed boots/gloves plural;
  Blindf_on/off + EBlinded mirror; Blind vision_recalc; hitmu map_invisible.
- Verification: seed5006 Scr **217→228**/249 RNG FULL; seed0116 **114→115**;
  green+strict PASS; cohort PASS held (0373/0398/0030/…).
- Next: seed5006 @162 confused mispronounce; or seed0116 Scr 115/127.

