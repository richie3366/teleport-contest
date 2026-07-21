## 2026-07-21 11:55 — #1138 doset fruit getlin + menu page keys
- Objective: seed4500 @237 `Set fruit to what?` vs Options.
- C locus: `options.c` doset_simple_menu Comp getlin/`optfn_fruit`;
  `wintty.c` MENU_NEXT_PAGE `>` (space finishes last; `>` does not).
- Change: `doset_compound_via_getlin` + fruitadd subset; pick_one
  `>`/`<`/`^`/`|`; `give_opt_msg=false` in doset_simple.
- Verification: green+strict PASS; cohort 6/6; Scr **954→966**.
- Next: seed4500 screen peel (Scr **966**/1814).

## 2026-07-21 11:40 — #1137 getpos flush_screen(0) last-glyph curs
- Objective: seed4500 @195 jump cursor (cells OK).
- C locus: `getpos.c` curs+`flush_screen(0)`; `getpos_sethilite`
  force-newsyms; `wintty.c` print_glyph advances past map_x.
- Change: force-newsyms on getvalid change; `flush_screen_getpos_dirty`;
  clear `gnew` on full rebuild; pre-loop dirty flush (later iters full).
- Verification: green+strict PASS; cohort 6/6; Scr **950→954**; @195 match.
- Next: @**237** `Set fruit to what?` vs Options.


## 2026-07-20 19:45 — #1036 D-0883…D-0885 take-off AC + nymph flee
- Objective: seed0014 @415 botl AC after shield take-off; @416–417 steal.
- C locus: `do_wear.c` `armoroff` (no find_ac); `steal.c`
  `worn_item_removal`/`steal` named++; `teleport.c` RLOC_MSG vanish;
  `uhitm.c` `mhitm_ad_sedu` `rloc(..., RLOC_MSG)`.
- Change: drop delay-0 armoroff find_ac; on→from + She stole; async
  rloc vanish + mhitu/monmove await RLOC_MSG.
- Verification: green+strict PASS; cohort 8/8 PASS; seed0014 Scr
  **633→636**/714 (RNG FULL).
- Next: @424 fountain “dries up!” missing `--More--`.
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

## 2026-07-20 19:40 — #1035 score + D-0882 merged coin bknown
- Objective: mandatory public score @#1035; restore seed0007 regression.
- C locus: `invent.c` `merged` — coin `bknown=0` before ID reconcile.
- Change: reorder `addinv` merge to match C (D-0882). First cadence
  measure was 39/44 (D-0879 order bug); after fix **40/44**.
- Verification: green+strict PASS; seed0007 PASS; seed0014 Scr 633/714;
  full suite Scr **9493**/11405 RNG **676373**/792838 (85.31%);
  speed `32+0.23/turn`.
- Next: seed0014 @415 take-off botl AC:10 vs AC:14; nymph @416–417.

## 2026-07-21 11:16 — #1135 score + getpos S_ss1 '0'; screen peel
- Objective: cadence full `sessions`; seed4500 @136 feature `'0'`.
- C locus: `getpos.c` matching[] / `defsym.h` `S_ss1` `'0'`.
- Change: suite RNG closed 100% after #1134; `feature_match_tags('0')`
  → ss1 so Can't find… (was Unknown direction). Scr **947→949**.
- Verification: green+strict PASS; suite **42/44** Scr **10539**/11405
  RNG **792838**/792838 (100%) `29+0.25/turn`.
- Next: @**231** statue vs floor `(invalid target)`; cadence @#1140.

## 2026-07-21 11:24 — #1136 getpos look_at_object auto_describe
- Objective: seed4500 @231 statue vs floor `(invalid target)`.
- C locus: `pager.c` `lookat`/`look_at_object`; `getpos.c` `auto_describe`.
- Change: `auto_describe_text` deferred objects → ROOM cmap. Port shown
  floor via `look_shown_at` + `distant_name`/`doname` (`TER_OBJ`).
- Verification: green+strict PASS; cohort 6/6; Scr **949→950**; @231 match.
- Next: @**195** jump cursor (cells OK); @**237** `Set fruit to what?`.

