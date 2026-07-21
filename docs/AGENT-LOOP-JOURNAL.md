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

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-07-21 16:50 — #1180 score + prop Blind doname

- Objective: cadence full `sessions` @#1180; seed4500 @1501 wish
  `a ring` vs `engagement ring` (Blind mold).
- C locus: `objnam.c` `xname_flags`/`doname` `!Blind`→`observe_object`;
  `youprop.h` Blind ≡ props (not sticky `u.Blind`).
- Change: `objnam.js` prop Blind for `xname`/`doname` observe
  (D-0928 #1180). Suite score: **42**/44 Scr **11312**/11405 RNG
  **100%** speed `30+0.25/turn`.
- Verification: green+strict PASS; cohort 6/6; Scr **1720→1722**;
  first miss **@1501→@1573**.
- Next: @**1573** Voluntary challenges leftover `--More--`.

## 2026-07-21 16:45 — #1179 timebot / time_botl

- Objective: seed4500 @1464 footsteps More botl C T:231 vs JS T:229.
- C locus: `allmain.c` `disp.time_botl` on `moves++`; `botl.c`
  `timebot`; `display.c` `flush_screen`→`timebot`.
- Change: `allmain.js` set `time_botl`; `display.js` `timebot()`
  (tty→`bot`) from flush (D-0928 #1179).
- Verification: green+strict PASS; cohort 6/6; Scr **1716→1720**;
  prefix **@1464→@1501**.
- Next: @**1501** wish `r - a ring.` vs `r - an engagement ring.`

## 2026-07-21 16:37 — #1178 polymon vision_full_recalc

- Objective: seed4500 @1441 map C DEC `~` vs JS floating-eye `e`.
- C locus: `polyself.c` `polymon` `gv.vision_full_recalc=1` before
  `see_monsters` (FROMFORM Blind).
- Change: `polyself.js` `polymon` set `vision_full_recalc` (D-0928
  #1178).
- Verification: green+strict PASS; cohort 6/6; Scr **1586→1716**;
  prefix **@1441→@1464**.
- Next: @**1464** botl T:**229** vs C T:**231**.

## 2026-07-21 16:28 — #1177 float_vs_flight + dropz encumber

- Objective: seed4500 @1438 poly More botl Knight vs C Brown Mold;
  @1439 gloves vs load More.
- C locus: `polyself.c` `set_uasmon`→`float_vs_flight` botl;
  `do.c` `dropz`→`encumber_msg` mid-`break_armor`.
- Change: `polyself.js` `float_vs_flight`; `do.js` await
  `encumber_msg` in `dropz` (D-0928 #1177).
- Verification: green+strict PASS; cohort 6/6; Scr **1583→1586**;
  prefix **@1438→@1441**.
- Next: @**1441** map C DEC `~` vs JS `e`.

## 2026-07-21 16:20 — #1176 getpos SHOWVALID `$`

- Objective: seed4500 @1347 getpos `$` Unknown direction vs C stay.
- C locus: `getpos.c` `NHKF_GETPOS_SHOWVALID`; `cmd.c` bind `'$'`.
- Change: `getpos.js` SHOWVALID before matching + hilite toggle
  stub; NOTES `feature_match_tags`/`S_goodpos` theory rejected
  (D-0928 #1176).
- Verification: green+strict PASS; cohort 6/6; Scr **1580→1583**;
  prefix **@1347→@1438**.
- Next: @**1438** poly More botl C `Brown Mold` vs JS `Knight`.

## 2026-07-21 16:15 — #1175 untrap getdir + score cadence

- Objective: cadence full `sessions` @#1175; seed4500 @1344 `#untrap`
  blank vs C `In what direction?`.
- C locus: `trap.c` `dountrap`→`untrap`→`getdir((char*)0)`.
- Change: `trap.js` `untrap` usual getdir + `dountrap` wiring;
  floor/box/door disarm deferred (D-0928 #1175).
- Verification: green+strict PASS; cohort 3/3; Scr **1579→1580**;
  prefix **@1344→@1347**. Full suite **42**/44 Scr **11170**/11405
  RNG **100%** speed `30+0.26/turn`.
- Next: @**1347** getpos `$` → `S_goodpos` `feature_match_tags`.

## 2026-07-21 16:09 — #1174 getpos cmap furniture fountain

- Objective: seed4500 @1322 getpos C `fountain` vs JS `unexplored area`.
- C locus: `pager.c` `lookat` cmap default → `defsyms[S_fountain].explanation`.
- Change: `getpos.js` `cmap_defsym_explanation` fountain/sink/opulent
  throne/grave/iron bars; S_altar align/high deferred (D-0928 #1174).
- Verification: green+strict PASS; cohort 6/6; Scr **1576→1579**;
  prefix **@1322→@1344**.
- Next: @**1344** `#untrap` C `In what direction?` vs JS blank
  (`dountrap` omits `untrap`→`getdir`).

## 2026-07-21 16:05 — #1173 sanctum lspo_map lit=FALSE clear

- Objective: seed4500 @1291 look_here map C blank/3×3 vs JS walls.
- C locus: `sp_lev.c` `lspo_map` default lit=FALSE → `set_levltyp_lit`;
  `dat/sanctum.lua` solidfill then map.
- Change: `load_sanctum` clears SpLev_Map lit after map (lava stays);
  global `sel_set_ter(false)`→unlit deferred (tut-1) (D-0928 #1173).
- Verification: green+strict PASS; seed0009 PASS; cohort 14/14;
  Scr **1529→1576**; prefix **@1291→@1322**.
- Next: @**1322** getpos `fountain` vs JS `unexplored area`.

## 2026-07-21 15:50 — #1172 overview dismiss dismiss_nhw_menu

- Objective: seed4500 @1252 map `"` vs `s` (misread DEC-vs-Primary).
- C locus: `wintty.c` `erase_menu_or_text` corner → `docorner`;
  `dungeon.c` `show_overview` → `destroy_nhwindow`.
- Change: `show_overview` uses `dismiss_nhw_menu` (no forced corner
  `docrt`/`see_monsters`) (D-0928 #1172).
- Verification: green+strict PASS; cohort 14/14; Scr **1525→1529**;
  prefix **@1252→@1291**.
- Next: @**1291** look_here map bleed under corner menu.

## 2026-07-21 15:42 — #1171 wiz Blind make_blinded + uinvulnerable

- Objective: seed4500 @1151 `#wizintrinsic` Blind TIMEOUT `[23]` vs `[119]`.
- C locus: `wizcmds.c` `wiz_intrinsic` BLINDED → `make_blinded`;
  `timeout.c` `nh_timeout` `u.uinvulnerable` early return.
- Change: Blind branch calls `make_blinded(newtimeout)` (not stale
  uprops incr); sync HBlinded↔uprops; freeze TIMEOUT while praying
  (D-0928 #1171).
- Verification: green+strict PASS; cohort 12/12; Scr **1521→1525**;
  prefix **@1151→@1252**.
- Next: @**1252** map glyph DEC vs Primary.

## 2026-07-21 15:32 — #1170 public score cadence

- Objective: mandatory full `sessions` score @#1170 (÷5).
- C locus: n/a — docs/score only; primary remains @1151 Blind TIMEOUT.
- Change: Score refresh — **42**/44 Scr **11111**/11405 RNG
  **792838**/792838 (100%); speed `30+0.25/turn` (R² 0.86).
  Scr +87 vs @#1165 reflects #1166–#1169 seed4500 peels (1521/1814).
- Verification: green+strict PASS; full `sessions` 42/44.
- Next: seed4500 @**1151** `#wizintrinsic` Blind TIMEOUT JS `[23]`
  vs C `[119]` (D-0928).

## 2026-07-21 15:30 — #1169 Blind feel_location iron chain

- Objective: seed4500 @1098 Blind feel map `_` vs floor (misread altar).
- C locus: `display.c` `feel_location` / Blind `newsym` u_at.
- Change: `display.js` `feel_location`+`feel_newsym`+`set_seenv`;
  Blind newsym calls feel then display_self. `_` color 6 = chain
  (D-0928 #1169).
- Verification: green+strict PASS; cohort 5/5; Scr **1419→1521**;
  prefix **@1098→@1151**.
- Next: @**1151** `#wizintrinsic` Blind TIMEOUT JS `[23]` vs C `[119]`.

## 2026-07-21 15:20 — #1168 nh_timeout generic uprops TIMEOUT

- Objective: seed4500 @1092 `#wizintrinsic` invulnerable `[30]` vs C bare.
- C locus: `timeout.c` `nh_timeout` — for all `u.uprops` TIMEOUT `--`.
- Change: `timeout.js` decrement remaining uprops TIMEOUT after
  dedicated arms; sync TIMEOUT_FLAT; expiry switch deferred (D-0928 #1168).
- Verification: green+strict PASS; cohort 38/38; Scr **1417→1419**;
  prefix **@1092→@1098**.
- Next: @**1098** Blind feel-floor map C altar `_` vs JS floor `·`.

## 2026-07-21 15:10 — #1167 flags.pushweapon setuswapwep

- Objective: seed4500 @1053 carrots alt weapons vs JS bites.
- C locus: `wield.c` `dowield`/`wield_tool` — `flags.pushweapon` →
  `setuswapwep(oldwep)` after successful ready (no second prinv).
- Change: `wield.js` implement pushweapon in `dowield`+`wield_tool`
  (D-0928 #1167). Prior carrot wield then sword hit `doswapweapon`.
- Verification: green+strict PASS; cohort 19/19; Scr **1413→1417**;
  prefix **@1053→@1092**.
- Next: @**1092** `#wizintrinsic` invulnerable `[30]` TIMEOUT vs C bare.
