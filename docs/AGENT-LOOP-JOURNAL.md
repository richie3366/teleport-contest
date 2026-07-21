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
## YYYY-MM-DD HH:MM — #NNNN short title
- Objective: ...
- C locus: ...
- Change: ...
- Verification: ...
- Next: ...
```

## 2026-07-21 12:14 — #1141 BALL very/chained + check_here uchain
- Objective: seed4500 @517/@518 iron ball/chain look + doname.
- C locus: `objnam.c` xname BALL / doname_base BALL|CHAIN;
  `pickup.c` `check_here` skip `uchain`.
- Change: `pretty_base` `very ` when `owt>oc_weight`; doname
  `(chained|attached to you)`; `check_here` skips `uchain`.
- Verification: green+strict; cohort 8/8; Scr **970→995**; prefix
  **@517→@521**.
- Next: @**521** C discoveries polearm menu `--More--` vs JS map.

## 2026-07-21 12:08 — #1140 score + makeplural singplur_compound
- Objective: cadence full `sessions` @#1140; seed4500 @372 scroll plural.
- C locus: `objnam.c` `singplur_compound` / `makeplural` / `makesingular`.
- Change: JS `singplur_compound` (`labeled`/`called`/`named`/…); score
  docs **42/44** Scr **10560**/11405 RNG **100%** `31+0.26/turn`.
- Verification: green+strict; cohort 6/6; seed4500 Scr **969→970**.
- Next: @**517**/@**518** BALL `very ` + `(chained to you)` / chain look.

## 2026-07-21 12:05 — #1139 hideunder You_see + statue simpleonames
- Objective: seed4500 @292 shimmering --More-- vs finish-prayer append.
- C locus: `mon.c` hideunder You_see; `objnam.c` minimal_xname corpsenm=NON_PM;
  `mondata.c` locomotion.
- Change: hideunder You_see + locomotion/y_monnam/ansimpleoname; simpleonames
  statue/figurine bare type (not "of a …").
- Verification: green+strict PASS; cohort 6/6; Scr **966→969**.
- Next: @**372** `scrolls labeled KIRJE` vs `scroll labeled KIRJEs`.

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

## 2026-07-21 11:24 — #1136 getpos look_at_object auto_describe
- Objective: seed4500 @231 statue vs floor `(invalid target)`.
- C locus: `pager.c` `lookat`/`look_at_object`; `getpos.c` `auto_describe`.
- Change: `auto_describe_text` deferred objects → ROOM cmap. Port shown
  floor via `look_shown_at` + `distant_name`/`doname` (`TER_OBJ`).
- Verification: green+strict PASS; cohort 6/6; Scr **949→950**; @231 match.
- Next: @**195** jump cursor (cells OK); @**237** `Set fruit to what?`.

## 2026-07-21 11:16 — #1135 score + getpos S_ss1 '0'; screen peel
- Objective: cadence full `sessions`; seed4500 @136 feature `'0'`.
- C locus: `getpos.c` matching[] / `defsym.h` `S_ss1` `'0'`.
- Change: suite RNG closed 100% after #1134; `feature_match_tags('0')`
  → ss1 so Can't find… (was Unknown direction). Scr **947→949**.
- Verification: green+strict PASS; suite **42/44** Scr **10539**/11405
  RNG **792838**/792838 (100%) `29+0.25/turn`.
- Next: @**231** statue vs floor `(invalid target)`; cadence @#1140.

## 2026-07-21 11:10 — #1134 Kni-goal load_special; RNG complete
- Objective: seed4500 @107646 C nhlib shuffle rn2(3) vs JS rn2(79).
- C locus: `dat/Kni-goal.lua`; `sp_lev.c` `load_special`; `mkmaze.c` `makemaz`.
- Change: no Kni-goal loader → empty maze → ordinary `rn2(79)`. Port
  `load_kni_goal` (map + Mirror + stock + Ixoth/quasits/jellies) + dispatch.
- Verification: green+strict PASS; cohort 12/12; rng-diff **108275**/108275;
  runner Scr **941→947**.
- Next: seed4500 screen peel (RNG done); cadence @#1135.

## 2026-07-21 11:01 — #1133 You-die notdied short-circuit; @107646
- Objective: seed4500 @107645 C getbones missing (keystream).
- C locus: `topl.c` `update_topl` notdied short-circuit; yn Die?.
- Change: C dump @107446 — WIN_STOP+no room never assigns notdied from
  "You die"; #1132 always-clear made yn more() eat Die? key. Match C
  short-circuit in `pline`.
- Verification: green+strict PASS; cohort 6/6; prefix **107645→107646**
  (RNG **107651** Scr **941**).
- Next: @**107646** nhlib.lua shuffle rn2(3) vs rn2(79); cadence @#1135.

## YYYY-MM-DD HH:MM — <objective>
- Objective: …
- C locus: …
- Change or falsified theory: …
- Verification: …
- Next: …
```

## 2026-07-21 10:52 — process: C dump for keystream/more too
- Objective: extend §7 C-dump guidance beyond geometry.
- C locus: n/a (docs); live peel still @107645 NEED_MORE/unmul.
- Change: playbook §7 table + §9; runbook §C.5; agent-notes;
  CURRENT/NOTES next-falsify = C dump at hitmsg@107426 vs unmul.
- Verification: n/a (docs-only).
- Next: loop peels dump C more-state before another WIN_STOP shim.

## 2026-07-21 10:47 — #1132 unmul more ate ^V; @107645
- Objective: seed4500 @107645 C getbones rn2(3) vs JS missing.
- C locus: `topl.c` update_topl You-die/WIN_STOP; `tty_yn_function`;
  symptom `unmul`→pline→more.
- Change: diagnosed keystream — NEED_MORE `"xan pricks…"` makes
  survived pline call more() eating `^V ? \n`. Ported C You-die
  `skip=FALSE` after clear WIN_STOP + yn clear WIN_STOP after flush.
  Prefix unchanged (still @107645).
- Verification: green+strict PASS; cohort 6/6.
- Next: Die?/hitmsg more@107426 vs C ESC→yn; clear NEED_MORE before
  unmul; cadence @#1135.

## 2026-07-21 10:24 — #1131 mhitm_ad_legs mhitu; @107645 getbones
- Objective: seed4500 @107470 C `mhitm_ad_legs` rn2(2) vs JS rn2(3).
- C locus: `uhitm.c` `mhitm_ad_legs` (mhitu arm); `mhitm_adtyping`.
- Change: ported `mhitm_ad_legs_u` + wired `AD_LEGS` in
  `mhitm_adtyping_u` (was default-zero → later rn2(3)).
- Verification: green+strict PASS; cohort 6/6; prefix
  **107470→107645** (runner RNG **107645** Scr **939**).
- Next: @**107645** C `getbones` rn2(3) vs JS missing; cadence @#1135.

## 2026-07-21 10:14 — #1130 score + vamp dochng mndx; @107470 legs
- Objective: cadence full `sessions`; seed4500 @107304 mcalcmove vs d(4,8).
- C locus: `mon.c` `decide_to_shapeshift`/`newcham` (`ptr != mon->data`).
- Change: `mons()` fresh-object made fog→fog always `dochng`; compare
  `mndx` in `decide_to_shapeshift` + `newcham`. Suite **42/44** Scr
  **10531**/11405 RNG **792061**/792838 (99.90%) `30+0.25/turn`.
- Verification: green+strict PASS; cohort 7/7; prefix **107304→107470**
  (runner RNG **107498** Scr **941**).
- Next: @**107470** C `mhitm_ad_legs` rn2(2) vs JS rn2(3); cadence @#1135.
