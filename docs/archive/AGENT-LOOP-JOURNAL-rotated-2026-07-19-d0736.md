# Rotated from AGENT-LOOP-JOURNAL.md (#822 D-0736)

## 2026-07-19 — #810 score + Sokoban wall DEC gate (D-0729)
- Objective: mandatory full `sessions` (#810÷5) + seed0108 wall color after ^V.
- C locus: `display.c` `wallcolors[]` / `wall_color` / Sokoban cmap walls.
- Change: `wall_glyph` Sokoban `CLR_BLUE` only when `use_decgraphics()`;
  ASCII ^V→soko1 stays GRAY→NO_COLOR (D-0729).
- Verification: green+strict PASS; seed0108 **PASS** 303/303; seed0373
  PASS; cohort 34/34; full suite **36**/44 Scr **7926** RNG **527314**.
- Next: D-0708 seed0014 @49039; or hallu/coverage.

## 2026-07-19 — #809 #herecmdmenu self menu (D-0728)
- Objective: seed0108 @280 `#herecmdmenu` "What do you want to do?".
- C locus: `cmd.c` `doherecmdmenu` / `here_cmd_menu` / `there_cmd_menu_self`.
- Change: EXT_CMDS → self NHW_MENU + CQ_CANNED act_on_act; treat JS `'\0'`
  as ECMD_OK like C NUL (D-0728).
- Verification: green+strict PASS; seed0108 Scr **292→293** RNG FULL;
  cursors FULL; cohort green+0106+0116+0398+quest PASS.
- Next: wall color after ^V; remaining 10 seed0108 screens.

## 2026-07-19 — #808 doopen + doforce ynq q + xname named (D-0727)
- Objective: seed0108 @216 open dir / #force ynq / Mjollnir bash More.
- C locus: `lock.c` `doopen`/`doopen_indir`; `ynq` def `q`; `objnam.c` xname.
- Change: wire `o`→doopen getdir; doforce ynq `'q'`; xname ` named ONAME`
  (D-0727).
- Verification: green+strict PASS; seed0108 Scr **287→292** RNG FULL;
  prefix **216→280**; cohort 33/33 PASS.
- Next: @280 `#herecmdmenu` "What do you want to do?".
