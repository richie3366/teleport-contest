## 2026-07-20 14:45 — #1000 public score cadence
- Objective: mandatory 5-iter full `sessions` score refresh.
- C locus: n/a (docs only; no JS peel).
- Change: measured **38/44** PASS; Scr **9011**/11405 (+13 vs #995 =
  seed0383 196→209 from D-0852…D-0855); RNG **666643**/792838 (flat);
  speed `32+0.23/turn`. seed0383 still 209/219 RNG FULL; first miss
  past @199. Rotated journal #985–#990 → archive.
- Verification: green+strict PASS; full suite `__RESULTS_JSON__`.
- Next: seed0383 Scr @209+ (Hallu map / deferred wear plines).

## 2026-07-17 00:15 — #644 D-0579 equip SUGGEST + Blindf_on / Blind vision
- Objective: seed5006 Scr residual 217/249 (CURRENT primary).
- C locus: do_wear.c equip_ok/cursed/Blindf_on; vision.c Blind vision_recalc;
  mhitu.c hitmu map_invisible; youprop.h EBlinded.
- Change: SUGGEST-only P/W/T prompts; cursed boots/gloves plural;
  Blindf_on/off + EBlinded mirror; Blind vision_recalc; hitmu map_invisible.
- Verification: seed5006 Scr **217→228**/249 RNG FULL; seed0116 **114→115**;
  green+strict PASS; cohort PASS held (0373/0398/0030/…).
- Next: seed5006 @162 confused mispronounce; or seed0116 Scr 115/127.

## 2026-07-19 01:30 — #790 score + D-0710 diagnose
- Objective: mandatory full `sessions` score (#790 % 5); peel seed0108.
- C locus: `monmove.c` `dochug` want_move / `monnear`.
- Change: no code fix. Score **35/44**, Scr **7654**/11405,
  RNG **513214**/792838 (64.73%), speed `36+0.19/turn`.
  D-0710: tame feline @2778 JS `nearby=false` (dist2=8) skips
  wanderer `rn2(4)`; C has `nearby=true` ⇒ earlier geometry.
- Verification: green+strict PASS; DIAG removed; suite documented.
- Next: pre-@2778 pet/hero adjacency; or seed0014 D-0708.

## 2026-07-19 01:24 — #789 D-0709 #wizwish + D-0708 sharpen
- Objective: CURRENT primary; pivoted seed0108 after D-0708 cell-ID stall.
- C locus: `cmd.c` extcmdlist `wizwish` → `wiz_wish`/`makewish`.
- Change: `EXT_CMDS` register `wizwish` (no AUTOCOMPLETE, ≡C).
  Also sharpened D-0708: C dest~(24,12); omit suspect `(22,10)`.
- Verification: green+strict PASS; seed0108 **2772→2778**; cohort 10/10.
- Next: seed0108 @2778 dochug rn2(4); or seed0014 D-0708.

## 2026-07-19 01:10 — #788 D-0708 mfndpos cnt (diagnose)
- Objective: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.
- C locus: `monmove.c` `m_move`/`mfndpos` (peaceful gnome).
- Falsified: squeeze/gas already out; also hero one-step travel onto
  gnome neighbor (impossible from `(23,8)`). Mapped: same gnome
  `@48985` cnt=8 @`(24,11)` matched →`(23,11)`; JS 6 ROOM poss;
  `u=(24,9)`; hero-on-any-poss → cnt=5. No JS trap/mon on poss.
- Verification: green+strict PASS; DIAG removed; no code change.
- Next: which of 6 C omits (C-only trap/mon / earlier geometry /
  missing mfndpos arm); or seed0108.

## 2026-07-19 10:00 — #849 maybe_generate stronghold rate (D-0753)
- Objective: seed0360 @41768 C maybe_generate_rnd_mon rn2(50) vs JS rn2(70).
- C locus: `allmain.c` `maybe_generate_rnd_mon` udemigod?25 :
  depth>stronghold?50 : 70.
- Change: `js/allmain.js` port full rate ternary via `depth()` +
  `game.stronghold_level` + `uevent.udemigod` (was always 70).
- Verification: green+strict PASS; cohort 35/35; seed0360 prefix
  **41768→41777**; RNG **41793→41794**; Scr 207.
- Next: @41777 C nhlib.lua shuffle rn2(3) vs JS rn2(79)
  (post getbones/makemaz; C splev_initlev).
