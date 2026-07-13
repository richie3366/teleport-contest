# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry before exiting.
Keep entries tight; detailed hypothesis lives in `NOTES.md`.

The next agent does **not** read this whole file by default. Progress and Notes
must contain anything needed immediately; the journal is an audit trail.

Use this shape:

```text
## YYYY-MM-DD HH:MM — <objective>
- C locus: <file:function>
- Result: <verified change | falsified hypothesis | prerequisite>
- Verification: <commands and compact result>
- Next: <one exact first action>
```

---

---

## 2026-07-13 03:30 — seed0102 help_dir + Book offx (D-0071)
- C locus: `cmd.c` `getdir`/`help_dir`/`show_direction_keys`;
  `wintty.c` `tty_putstr`/`process_text_window` (NHW_MENU);
  `quest.lua` legacy menu
- Result: **verified faithful change** — invalid getdir shows
  NHW_TEXT direction grid then cancels (no retry); legacy Book
  uses `maxcol=strlen+1` + leading pad at `offx+1`. seed0102
  **PASS**; public **6/44**.
- Verification: seed0102 4485/4485 Scr 25/25 + strict; green +
  seed1500/1800/0060 PASS; full screens **320**/11405, RNG
  **90863**/792838.
- Next: `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
  (prefix @ 2775) or seed0700 screen peel after Scr 2.

## 2026-07-13 01:53 — mfndpos BOULDER + NODIAG (D-0060)
- C locus: `mon.c` `mfndpos`/`mon_allowflags`; `hack.h` `NODIAG`;
  `mondata.h` `throws_rocks`/`passes_walls`
- Result: **verified faithful change** — skip boulder cells without
  `ALLOW_ROCK`; reject diagonal neighbors for grid bugs. Cleared
  seed0700 `rn2(16)` vs `rn2(20)` track arity (newt+boulder) and
  seed0017 `rn2(16)` vs `rn2(32)` (grid bug diagonals). seed0700
  RNG **3230**/3230; Scr still **2**/51.
- Verification: green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **295**/11405, RNG **86026**/792838; seed0017
  prefix **2711→2775**; seed0030 **7021**/105529.
- Next: prefer `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  (`newhp` @ 2924) or seed0017 @ 2775; seed0700 is a screen peel.

## 2026-07-13 01:48 — rnl + autoopen doopen_indir (D-0059)
- C locus: `rnd.c` rnl; `lock.c` doopen_indir; `hack.c` test_move
  autoopen; `attrib.c` acurrstr/exercise
- Result: **verified faithful change** — ported `rnl` and CLOSED-door
  autoopen; resist path exercises STR without consuming a turn.
  seed0700 **3141→3207** (`m_move`); positional **3229**/3230;
  seed0030 Scr **35→39**.
- Verification: green + seed1500/1800/0060 PASS + strict; full
  **5/44**, screens **295**/11405, RNG **85803**/792838.
- Next: peel seed0700 `m_move` @ 3207 (`rn2(16)` vs `rn2(20)`) via
  `node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`.

## 2026-07-13 01:28 — maketrap notes/holes + SPBOOK_no_NOVEL (D-0054/55)
- C locus: `trap.c` choose_trapnote/hole_destination/dng_bottom/maketrap;
  `mkobj.c` SPBOOK_no_NOVEL; `objnam.c` rnd_class; `objclass.h`
- Result: **verified faithful change** — wired SQKY_BOARD `tnote` and
  HOLE/TRAPDOOR `dst` RNG; fixed `mkobj(-SPBOOK_CLASS)` to
  `rnd_class`…`SPE_BLANK_PAPER` (999). Misread “GEM 999” was novel
  exclusion. seed2200 **1283→2724**; seed1150 **1118→2301**;
  seed0030 **5127→6305**.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **290**/11405, RNG **85043**/792838.
- Next: peel seed0700 `rndmonst_adj` @ 1888 or seed2200 `exercise` @
  2724 (`node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`).

## 2026-07-13 01:22 — mkclass_aligned + Wizard A_NONE extractor (D-0053)
- C locus: `makemon.c` mkclass/mkclass_aligned/mk_gen_ok/init_mongen_order;
  `mklev.c` makeniche; `mondata.h` is_placeholder; extractor LVL A_NONE
- Result: **verified faithful change** — replaced `rn2(398)` stub with
  real `mkclass(S_HUMAN)`; fixed WoY difficulty 0 fallback so
  `mongen_order` matches C. seed0700 **1718→1888**; seed0103
  **1185→2337**.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **279**/11405, RNG **82967**/792838; seed0700 positional
  **2769**/3230; seed0103 **2344**/2640.
- Next: peel `rndmonst_adj` via
  `node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`
  or pony invent via seed0103; GEM sum still @ seed1150 1118.

## 2026-07-13 01:16 — Caveman u_init_role (D-0052)
- C locus: `u_init.c` Cave_man[]/`Skill_C`/`u_init_role` PM_CAVE_DWELLER
  + `ini_inv_use_obj` FLINT/ROCK quiver + `ini_inv_adjust_obj` graystone
  quan; `role.c` Caveman attrs
- Result: **verified faithful change** — last public role kit. Role
  throws **1→0**/44. seed1150 reaches mklev; next GEM `rnd_class`
  sum 999 vs 1000 @ 1118.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **278**/11405, RNG **81711**/792838; seed1150 prefix **1118**,
  positional **2937**/3137 Scr **22**/51.
- Next: peel shared `mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text` / `lspo_map`, or diagnose GEM
  `oclass_prob_totals` off-by-one via
  `node scripts/rng-diff.mjs sessions/seed1150-caveman-explore-move.session.json`.

## 2026-07-13 01:15 — Barbarian u_init_role (D-0051)
- C locus: `u_init.c` Barbarian_0/1/`Skill_B`/`u_init_role` PM_BARBARIAN
  (`rn2(100)>=50` kit + Lamp/`!rn2(6)` + weapon/armor `knows_class`
  excl. polearms); `role.c` Barbarian attrs
- Result: **verified faithful change** — Barbarian kits + Lamp +
  attrs/`hpadv` + `knows_class` enable. Role throws **2→1**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **256**/11405, RNG **78774**/792838; seed0373 prefix **1327**
  (`choose_trapnote`); seed0373 positional **2277**/35386.
- Next: port Caveman `u_init_role` (last role throw), or peel shared
  `choose_trapnote` / `hole_destination` / `mkclass_aligned` /
  `lspo_map` / `wipeout_text`.

## 2026-07-13 01:10 — Archeologist u_init_role (D-0050)
- C locus: `u_init.c` Archeologist/`Skill_A`/`u_init_role` PM_ARCHEOLOGIST
  (Tinopener/`!rn2(10)` else Lamp/`!rn2(4)` else Magicmarker/`!rn2(5)` +
  SACK/TOUCHSTONE knows); `role.c` Archeologist attrs
- Result: **verified faithful change** — Archeologist kit + optional
  tool chain + attrs/`hpadv`. Role throws **3→2**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **256**/11405, RNG **76497**/792838; seed0361 prefix **1280**
  (`hole_destination`); seed0361 positional **2478**/53865.
- Next: port Barbarian (or Caveman) `u_init_role`, or peel shared
  `hole_destination` / `mkclass_aligned` / `choose_trapnote` /
  `lspo_map` / `wipeout_text`.

## 2026-07-13 01:05 — Monk u_init_role (D-0049)
- C locus: `u_init.c` Monk/`M_spell`/`Skill_Mon`/`u_init_role` PM_MONK /
  `knows_class(ARMOR)` + `knows_object(SHURIKEN)`; `role.c` Monk attrs
- Result: **verified faithful change** — Monk kit + `rn2(90)/30`
  spellbook + Magicmarker/`!rn2(4)` else Lamp/`!rn2(10)` + armor
  `knows_class` + attrs/`hpadv`. Role throws **4→3**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **256**/11405, RNG **74019**/792838; seed0200 prefix **377**
  (`lspo_map`); seed0200 positional **1545**/3822.
- Next: port Archeologist (or Barbarian/Caveman) `u_init_role`, or peel
  shared `lspo_map` / `mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text`.

## 2026-07-13 01:00 — Ranger u_init_role (D-0048)
- C locus: `u_init.c` Ranger/`Skill_Ran`/`u_init_role` PM_RANGER /
  `knows_class` (launcher/ammo/spear); `obj.h` is_launcher/is_ammo/
  is_spear; `role.c` Ranger attrs
- Result: **verified faithful change** — Ranger kit + weapon
  `knows_class` filtered to launchers/ammo/spears + attrs/`hpadv`.
  Role throws **6→4**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **256**/11405, RNG **72474**/792838; seed0101 prefix **2293**
  (`next_ident`); seed0102 **1281** (`rndmonst_adj`).
- Next: port Monk (or Archeologist/Barbarian/Caveman) `u_init_role`,
  or peel shared `mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text` / `lspo_map`.

## 2026-07-13 00:56 — Valkyrie u_init_role (D-0047)
- C locus: `u_init.c` Valkyrie/`Skill_V`/`u_init_role` PM_VALKYRIE /
  `knows_class`; `role.c` Valkyrie attrs
- Result: **verified faithful change** — Valkyrie kit + optional Lamp
  `!rn2(6)` + weapon/armor `knows_class` (excludes polearms) +
  attrs/`hpadv`. Role throws **8→6**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **252**/11405, RNG **68885**/792838; seed0015 prefix **337**
  (`lspo_map`); seed0105 **974** (`wipeout_text`).
- Next: Ranger `u_init_role` (2 throws), or remaining 1-throw roles, or
  peel shared `mkclass_aligned` / `choose_trapnote` / `hole_destination`
  / `wipeout_text` / `lspo_map`.

## 2026-07-13 00:53 — Healer u_init_role (D-0046)
- C locus: `u_init.c` Healer/`Skill_H`/`u_init_role` PM_HEALER;
  `role.c` Healer attrs
- Result: **verified faithful change** — Healer kit + `umoney0=rn1(1000,1001)`
  + optional Lamp + `knows_object(POT_FULL_HEALING)` + attrs/`hpadv`.
  Role throws **10→8**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **251**/11405, RNG **67533**/792838; seed0016 prefix
  **1341** (`hole_destination`); seed0030 **5127** (`choose_trapnote`).
- Next: Valkyrie/Ranger `u_init_role` (2 throws each), or remaining
  1-throw roles, or peel shared `mkclass_aligned` / `choose_trapnote` /
  `hole_destination` / `wipeout_text`.

## 2026-07-13 00:55 — Samurai u_init_role (D-0045)
- C locus: `u_init.c` Samurai/`Skill_S`/`knows_class`/`ini_inv_use_obj`
  ammo; `objnam.c` `Japanese_item_name`; `role.c` Samurai attrs
- Result: **verified faithful change** — Samurai kit + Blindfold +
  weapon/armor `knows_class` + Japanese pre-discovery + `is_ammo`
  quiver for YA. Role throws **13→10**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **245**/11405, RNG **65208**/792838; seed0700 prefix
  **1718** (`mkclass_aligned`); seed0017 **2672** / seed0107 **2652**
  (`u_calc_moveamt`).
- Next: Valkyrie/Healer/Ranger `u_init_role` (2 throws each; Healer
  also seed0030), or peel shared `mkclass_aligned` / seed2200
  `choose_trapnote` / seed0501 `wipeout_text`.

## 2026-07-13 00:50 — Knight u_init_role (D-0044)
- C locus: `u_init.c` Knight/`Skill_K`/`knows_class`/`ini_inv_use_obj`
  helm/gloves; `role.c` Knight attrs; `youprop.h` `HJumping`
- Result: **verified faithful change** — Knight kit + full
  weapon/armor `knows_class` + helm/gloves/boots wear +
  `HJumping|=FROMOUTSIDE`. Role throws **17→13**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **243**/11405, RNG **58004**/792838; seed0103 prefix
  **1185** (`mkclass_aligned`); seed0104 RNG **2401**/3223.
- Next: Samurai `u_init_role` (4 throws), or peel seed0103
  `mkclass_aligned` / seed2200 `choose_trapnote` / seed0501
  `wipeout_text`.

## 2026-07-13 00:40 — Priest u_init_role + pantheon (D-0043)
- C locus: `u_init.c` Priest/`Lamp`/`Skill_P`/`ini_inv_use_obj` shield;
  `role.c` pantheon `randrole` + SPE_LIGHT + roles[] order
- Result: **verified faithful change** — Priest kit + pantheon gods on
  all roles + C Rogue-before-Ranger order + shield wear. Role throws
  **20→17**/44.
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **240**/11405, RNG **50470**/792838; seed0501 prefix
  **1153** (`wipeout_text`); seed0106 **2566** (`dog_move`); seed2200
  still **1283**.
- Next: Knight `u_init_role` (5 throws), or peel seed2200
  `choose_trapnote` / seed0501 `wipeout_text`.

## 2026-07-13 00:45 — Wizard u_init_role (D-0042)
- C locus: `u_init.c` Wizard/`ini_inv_mkobj_filter`/`Skill_W`;
  `role.c` Wizard + `role_init` nemesis gender; `objclass.h`
  `oc_level`/`a_ac`
- Result: **verified faithful change** — Wizard kit + filter + cloak
  AC + Dark One `rn2(100)` gender. Role throws **29→20**/44. seed2200
  no longer throws; rng-diff prefix **1283** (`choose_trapnote` next).
- Verification: green + seed1500/1800/0060 PASS + strict; full **5/44**,
  screens **239**/11405 (+19), RNG **44848**/792838; seed2200 RNG
  **2756**/3018 Scr **1**/230.
- Next: `node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `choose_trapnote`, or port Priest/Knight `u_init_role`.

## 2026-07-13 00:30 — seed0060 idx 35–36 ^X enlightenment (D-0041)
- C locus: `insight.c` autopickup/`one_characteristic`/`weapon_insight`;
  `weapon.c` `weapon_descr`/`weapon_type`/`skill_name`; objects
  `oc_skill`
- Result: **verified faithful change** — Autopickup from
  `flags.pickup`/`pickup_types` (+ thrown); race `ATTRMAX` limit
  paren; skill-category weapon naming. Extracted `oc_skill`.
  seed0060 session **PASS**.
- Verification: seed0060 Scr **41**/41, RNG **3626**/3626; green +
  seed1500/1800 PASS + strict; full **5/44**, screens **220**/11405
  (+2), RNG **28511**/792838.
- Next: survey `role not ported` throwers and port next `u_init_role`
  (or peel seed0013 Lua/`sp_lev`).

## 2026-07-13 00:25 — seed0060 idx 33 disco OBJ_DESCR / obj_typename (D-0040)
- C locus: `objclass.h:OBJ_DESCR`/`OBJ_NAME`; `objects.c` DESCR_INIT;
  `o_init.c:interesting_to_discover`/`dodiscovered`; `objnam.c:obj_typename`
- Result: **verified faithful change** — orc `knows_object` entries were
  present but filtered by incomplete appearance map. Extracted
  `objectDescrs`/`objectNameStrs`; disco uses `obj_typename`.
- Verification: seed0060 Scr **39**/41 (idx 33 OK; 35–36 ^X remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **218**/11405 (+1), RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 35 (^X autopickup / attr limits / weapon naming).

## 2026-07-13 00:20 — seed0060 idx 22 orc infravision newsym (D-0039)
- C locus: `display.h:_see_with_infrared`/`_mon_visible`; `display.c:newsym`
  (!cansee); `monmove.c:postmov`; `monflag.h` M3_INFRA*; race via
  `mons[urace.mnum]`
- Result: **verified faithful change** — pet was at correct (22,12) with
  `couldsee` true but `cansee` false in dark corridor; JS drew terrain
  only. Ported infrared monster display + `mflags3` extract +
  `postmov` final newsym.
- Verification: seed0060 Scr **38**/41 (idx 22 OK; 33/35/36 remain),
  RNG **3626**/3626; green + seed1500/1800 PASS + strict; full
  **4/44**, screens **217**/11405 (+1), RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 33 (disco class layout).

## 2026-07-13 00:10 — seed0060 cansee pline + wall_angle + `>` color (D-0038)
- C locus: `steal.c:mdrop_obj`; `dogmove.c:dog_invent`;
  `display.c:set_wall_state`/`wall_angle`/`back_to_glyph`
- Result: **verified faithful change** — idx 6 extra pickup pline was
  out-of-sight invent (C silent); premature `┌` was unfinished
  WM_C_OUTER corner without `wall_angle`; downstairs `>` is NO_COLOR
  in recordings (keep `<` yellow).
- Verification: seed0060 Scr **37**/41, RNG **3626**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, screens **216**/11405
  (+31), RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 22 (pet `f` vs corridor `#`).

## 2026-07-13 00:01 — seed0060 gold doname + mondied newsym (D-0037)
- C locus: `objnam.c:doname_base` (COIN article); `mon.c:mondied`/
  `mondead`/`mon_leaving_level` (`newsym`)
- Result: **verified faithful change** — idx 5 was `"1 gold piece"` vs
  `"a gold piece"` plus stale newt `:` (no `newsym` after kill). Ported
  coin `doname` article path + `mondead` refresh. Incomplete
  `make_corpse`/`mkcorpstat` A/B cut aggregate RNG ~900 — reverted;
  keep as named omission.
- Verification: seed0060 Scr **6**/41 (idx 0–5), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **185**/11405, RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 6 (drop re-pickup pline / premature wall `┌`).

## 2026-07-13 00:00 — seed0060 orc hpadv + mon_glyph mcolor (D-0036)
- C locus: `role.c` races[] orc/elf/dwarf/gnome `hpadv`/`enadv`;
  `attrib.c:newhp`; `display.c` / `mon_color(monsndx)`
- Result: **verified faithful change** — orc missing `hpadv` fell back
  to human infix 2 → botl `HP:12` vs C `HP:11`; newt used mlet green
  not `mcolors[PM_NEWT]` yellow. Ported race advances + `mon_glyph`
  mcolors.
- Verification: seed0060 Scr **5**/41 (idx 0–4), RNG **3626**/3626;
  green + seed1500/1800 PASS + strict; full **4/44**, screens
  **184**/11405, RNG **28511**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 5 cells (invent letter / map wall).

## 2026-07-12 23:58 — seed0060 losehp + regen_hp (D-0035)
- C locus: `dokick.c:kick_ouch` → `hack.c:losehp`; `allmain.c:regen_hp`
  (once-per-turn before `dosounds`)
- Result: **verified faithful change** — wall kick burned damage RNG but
  never subtracted HP, so `regen_hp` never ran; also missing the EOT call.
  Ported `js/hack.js` `losehp`/`maybe_half_phys`, wired `kick_ouch`, and
  `regen_hp` when `uhp < uhpmax`.
- Verification: rng-diff **RNG OK 3626**; seed0060 **3626**/3626 RNG,
  Scr **0**/41; green + seed1500/1800 PASS + strict; full **4/44**,
  RNG **28511**/792838, screens **179**/11405.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose screen idx 0 cells (legacy/botl; cursors already 41/41).

## 2026-07-12 23:55 — seed0060 makemon(NULL,0,0) (D-0034)
- C locus: `allmain.c:maybe_generate_rnd_mon`; `makemon.c:makemon` /
  `makemon_rnd_goodpos` / `m_initgrp`; `teleport.c:enexto_gpflags`
- Result: **verified faithful change** — JS stubbed spawn body after
  `rn2(70)`; C runs placement (`rn1(77)`/`rn2(21)`), `rndmonst`, group.
  Ported placement-before-select, `makemon_rnd_goodpos`, `m_initgrp`,
  `enexto_gpflags`; fixed `MM_NOGRP` to C `0x2000`.
- Verification: rng-diff **3105→3536**; seed0060 **3562**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **28497**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — port `regen_hp` (`allmain.c`) before `dosounds` (C @ 3536).

## 2026-07-12 23:45 — seed0060 donull / `.` wait (D-0033)
- C locus: `do.c:donull`; `cmd.c` (`.` → wait; clear `kickedloc` when
  timed && `func != dokick`)
- Result: **verified faithful change** — falsified post-kick pet/`mtrack`
  as the 3016 cause. JS treated `.` as unknown (`move=0`), so wait turns
  never ran; next kick’s `exercise` `rn2(2)` sat where C had `distfleeck`
  `rn2(5)`. Ported `js/do.js` `donull` + `cmd.js` `.` branch.
- Verification: rng-diff **3016→3105**; seed0060 **3151**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **27922**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — port `maybe_generate_rnd_mon` → `makemon(NULL,0,0)` /
  `makemon_rnd_goodpos` (C @ 3105).

## 2026-07-12 23:35 — seed0060 m_avoid_kicked_loc (D-0032)
- C locus: `dokick.c` (`kickedloc`); `monmove.c:m_avoid_kicked_loc`;
  `dogmove.c` candidate loop; clear in `hack.c:domove` / non-kick timed cmds
- Result: **verified faithful change** — falsified mklev/`#`=wall theory
  (both sides `CORR` at `(22,12)`). Missing pet skip of kicked cell
  `(24,13)` made `appr=0` chcnt 4 vs C 3. Ported `game.kickedloc` + avoid
  helper; Sokoban push-avoid stubbed false.
- Verification: rng-diff **2997→3016**; seed0060 **3086**/3626; green +
  seed1500/1800 PASS + strict; full **4/44**, RNG **27787**/792838,
  screens **179**/11405.
- Next: `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`
  — diagnose @ 3016 (pet cell after kick turn vs C `(23,13)`; `.`/
  `kickedloc` clear; `mtrack` continue-vs-nxti).

## 2026-07-12 23:20 — seed0060 @ 2997 distfleeck vs rn2(4) diagnosis
- C locus: symptom `monmove.c:distfleeck` / `dogmove.c:dog_move`; root
  `mklev.c` corridor/`join`/`dig_corridor`
- Result: falsified “post-kick fleeck/ALLOW_*”; prerequisite identified
  (D-0032). Adjacent pet `appr=0` → chcnt per mfndpos slot; JS cnt=4
  includes `(22,12)` CORR; C screen `######f@` → wall there → cnt=3 →
  C `rn2(5)` is post-move distfleeck. No production change; DIAG removed.
- Verification: rng-diff still 2997; green seed8000+seed0900 PASS +
  strict; dogmove.js DIAG-free.
- Next: audit `js/mklev.js` `dig_corridor`/`join`/`makecorridors` for
  why y=12 x=18..22 is CORR; compare to C after levelgen (focused
  seed0060).

## 2026-07-12 23:03 — dokick kick_dumb empty-space exercise
- C locus: `dokick.c:dokick` / `kick_dumb`; `cmd.c` `C('d')`
- Result: verified fix (D-0031). Ctrl-D+`j` was unknown-command + move;
  C path is getdir → `kick_dumb` → `exercise(A_DEX,FALSE)` →
  "You kick at empty space." (Dx 18 skips strain `rn2(3)`).
- Verification: rng-diff 2979→2997; seed0060 3064/3626 cursors 41/41;
  green + seed1500 + seed1800 PASS + strict; full suite 4/44, RNG
  27765/792838, Scr 179/11405.
- Next: diagnose C `distfleeck` `rn2(5)` @ 2997 vs JS `rn2(4)`; falsify
  with `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:58 — dog_goal in_masters_sight / couldsee
- C locus: `dogmove.c:dog_goal`; `vision.h:couldsee`
- Result: verified fix (D-0030). Replaced stub `in_masters_sight=true`
  with real `couldsee(omx,omy)`. DIAG: pet out of COULD_SEE so C skipped
  APPORT `rn2(8)` after `obj_resists`; JS had forced the roll.
- Verification: rng-diff 2663→2979; seed0060 3039/3626; green + seed1500
  + seed1800 PASS + strict; full suite 4/44, RNG 27859/792838, Scr
  179/11405.
- Next: diagnose C `exercise` `-rn2(2)` @ 2979 vs JS `distfleeck`
  (dokick vs exerper); falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:56 — dog_invent relobj / mdrop_obj
- C locus: `steal.c:relobj` / `mdrop_obj`; `mkobj.c:obj_extract_self`
  (OBJ_MINVENT); `dogmove.c:dog_invent`
- Result: verified fix (D-0029). Pet drop extracts minvent → `place_object`;
  `add_to_minv` uses numeric `OBJ_MINVENT`. Cleared seed0060 mismatch @ 2643
  (`dog_has_minvent` / APPORT `rn2(8)`).
- Verification: rng-diff 2643→2663; seed0060 2771/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27445/792838, Scr 179/11405.
- Next: diagnose why C skips APPORT `rn2(8)` at 2663 after `obj_resists`
  (lit / `m_cansee` / `couldsee`); falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:55 — dog_invent splitobj / next_ident
- C locus: `mkobj.c:splitobj` / `nextoid` / `next_ident`;
  `dogmove.c:dog_invent`
- Result: verified fix (D-0028). Exported `splitobj` from `js/mkobj.js`
  (quan/owt, floor `nobj`/`nexthere`, `next_ident`); wired `dog_invent`;
  `dothrow.js` reuses it. Cleared seed0060 mismatch @ 2476.
- Verification: rng-diff 2476→2643; seed0060 2761/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27433/792838, Scr 179/11405.
- Next: port `relobj` for pet drop so `dog_has_minvent` clears before
  `dog_goal` APPORT `rn2(8)`; falsify with
  `node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`.

## 2026-07-12 22:50 — orc u_init_race / Xtra_food + inv_subs
- C locus: `u_init.c:u_init_race` (`PM_ORC`), `Xtra_food[]`, `inv_subs[]`,
  `ini_inv_obj_substitution`, `ini_inv`
- Result: verified fix (D-0027). Ported race switch (orc/elf/dwarf/gnome) +
  `Xtra_food` + full `inv_subs` wired into `ini_inv`. Cleared seed0060
  mismatch @ 2341 (`trquan` before attrs).
- Verification: rng-diff 2341→2476; seed0060 2584/3626; green + seed1500 +
  seed1800 PASS + strict; full suite 4/44, RNG 27256/792838, Scr 179/11405.
- Next: port `splitobj` for `dog_invent` when `carryamt != quan`
  (`node scripts/rng-diff.mjs sessions/seed0060-orc-rogue-kick-search.session.json`).

<!-- entries below -->

## 2026-07-12 22:45 — seed1800 screens 24→26 PASS (legacy + look)
- C locus: `wintty.c:process_text_window` corner NHW_MENU; `invent.c:
  dfeature_at`/`look_here`; `stairs.c:stairs_description`; `mklev.c`
  Dlvl1 `u_traversed`
- Result: verified faithful change (D-0026) — legacy corner keeps map
  under Book; look `:` prints staircase-up-out-of-dungeon via real
  dfeature path.
- Verification: seed1800 **PASS** 2458/2458 Scr **26/26** + strict; green
  + seed1500 PASS + strict; full suite **4/44**, RNG 27161/792838, Scr
  **179**/11405.
- Next: diagnose seed0060 orc `u_init_race` / `trquan` @ RNG 2341
  (`rng-diff` + C `u_init.c` race cases).

## 2026-07-12 22:38 — getobj throw/apply (seed1800 Scr 12→24)
- C locus: `dothrow.c:throw_ok`/`dothrow`; `invent.c:getobj` missing-letter
  `continue`; `cmd.c:getdir` prompt clear
- Result: verified faithful change (D-0025) — COIN_CLASS `$` in throw
  suggest (invent order); getobj_throw/apply loop + `flush_topl_more`;
  clear direction prompt after answer; `throw_gold` body deferred.
- Verification: seed1800 2458/2458 Scr **24/26** + strict; green +
  seed1500 PASS + strict; full suite **3/44**, RNG 27161/792838, Scr
  **177**/11405.
- Next: peel seed1800 idx 0 (legacy map under Book) or idx 25 look `:`
  staircase message; alternate seed0060 orc `trquan` @ 2341.

## 2026-07-12 22:35 — invent/doname/disco (seed1500 Scr 36→40 PASS)
- C locus: `invent.c:display_inventory`; `objnam.c:doname`;
  `u_init.c:ini_inv_adjust_obj` cknown; `o_init.c:discover_object`/
  `dodiscovered`/`interesting_to_discover`; `insight.c:weapon_insight`
- Result: verified faithful change (D-0024) — corner invent NHW_MENU;
  doname empty/wield/swapwep/potion/implicit-uncursed; disco classes +
  `*`/encounter; ^X plname capitalize + wield/skill starter lines.
- Verification: seed1500 **PASS** 2768/2768 Scr 40/40 + strict; green PASS
  + strict; seed1800 Scr 12/26 (held); full suite **3/44**, Scr 165/11405.
- Next: dump first failing seed1800 screen and port its C display/UI cause
  (not D-0006 pet movement). Alternate: seed0060 orc `trquan` @ 2341.

## 2026-07-12 22:30 — tutorial NHW_MENU offx (seed1500 Scr 34→36)
- C locus: `options.c:ask_do_tutorial`; `wintty.c:tty_end_menu` /
  `tty_display_nhwindow` / `process_menu_window`; `menu_headings` inverse
- Result: **verified faithful change** — D-0023. JS centered the title
  only; C corner menu offx=20 from OPTIONS footer maxcol=59, full y/n
  lines, cursor `[27,6]`, `docrt` on dismiss.
- Verification: seed1500 2768/2768 Scr **36/40**; seed1800 Scr **12/26**;
  green PASS + strict; full suite 2/44 RNG 26980/792838 screens **160**/11405.
- Next: peel invent `i` (idx 28) corner + `xprname`, or discoveries (32) /
  enlightenment plname/wield (34–35); falsify with focused seed1500 runner.

## 2026-07-12 22:22 — newsym floor objects + SDOOR (seed1500 Scr 1→34)
- C locus: `display.c:newsym`/`_map_location`/`map_object`/`back_to_glyph`;
  `display.h:vobj_at`/`covers_objects`; corpse `mon_color(corpsenm)`
- Result: **verified faithful change** — D-0022. Welcome map missed `%`/`$`
  because JS never drew floor objects; SDOOR fell through to `?`. CORPSE
  color needs monster table `mcolor` (orc=CLR_RED), not oc_color brown.
- Verification: seed1500 2768/2768 Scr **34/40**; seed1800 Scr **10/26**;
  green PASS + strict; full suite 2/44 RNG 26980/792838 screens **156**/11405;
  seed0060 unchanged 2489/3626.
- Next: peel seed1500 tutorial/`NHW_MENU` centering (screen idx 2) or
  discoveries/enlightenment (idx 32/34); falsify with focused seed1500 runner.

## 2026-07-12 22:14 — doapply/pick_lock no-door turn (seed1500 @ 2702)
- C locus: `apply.c:doapply` LOCK_PICK; `lock.c:pick_lock` non-door;
  `cmd.c:get_adjacent_loc`/`getdir`
- Result: **verified faithful change** — D-0021. Falsified umovement/
  encumbrance theory (DIAG `umove_after=12`). Cause was missing apply:
  C `a`→lock pick `e`→dir `l`→"You see no door there." takes a turn;
  JS treated keys as unknown/eat/move and deferred movemon.
- Verification: rng-diff seed1500 RNG OK 2768; runner 2768/2768 Scr 1/40;
  seed0060 2489/3626; green PASS + strict; full suite 2/44 RNG
  26980/792838 screens 109/11405. seed1800 rng-diff also RNG OK 2458.
- Next: diagnose seed1500 first screen mismatch (Scr 1/40), or peel
  seed0060 orc `trquan` @ 2341 if display is too broad.

## 2026-07-12 22:06 — mon_allowflags OPENDOOR / nohands (track N)
- C locus: `mon.c:mon_allowflags` `can_open`; `mfndpos` closed-door skip;
  `mondata.h:nohands`/`verysmall`
- Result: **verified faithful change** — D-0020. seed1500 idx 2618 was a
  newt whose `mfndpos` included `D_CLOSED` (70,8) because JS always set
  `OPENDOOR`. Extracted `mflags1`; gated `OPENDOOR` on
  `!(nohands||verysmall)`.
- Verification: rng-diff first mismatch 2618→2702; seed1500 2702/2768;
  seed0060 2489/3626; green PASS + strict; full suite 2/44 RNG
  26889/792838 screens 109/11405.
- Next: diagnose JS stop after wipe_engr while C `distfleeck` @ 2702
  (post-EOT extra `movemon` / `umovement` leftover).

## 2026-07-12 21:55 — cursemsg/--More-- + dog_invent pickup (udist)
- C locus: `dogmove.c:dog_move` cursemsg pline; `trap.c:thitm` miss pline;
  `dog_invent` `mpickobj`/droppables; `mfndpos` ALLOW_TRAPS + `seetrap`/
  `tseen` `rn2(40)`
- Result: **verified faithful change** — D-0019. Missing reluctantly +
  almost-hit plines left `--More--` unarmed, so keys `l,l,j,j,h,h,.` walked
  the hero (udist 10 vs 4). Real pickup + drop RNG + seen-trap skip followed.
- Verification: rng-diff first mismatch 2563→2618; seed1500 2700/2768;
  seed0060 2493/3626; green PASS + strict; full suite 2/44 RNG 26858/792838.
- Next: diagnose wild `m_move` track `rn2(20)` vs `rn2(24)` @ idx 2618
  (pet destination / occupancy after trap-avoid).

## 2026-07-12 21:35 — postmov dart trap + m_cansee clear_path
- C locus: `monmove.c:postmov`→`mintrap`; `trap.c:trapeffect_dart_trap`/
  `t_missile`; `vision.h:m_cansee`=`clear_path`; `dogmove.c:find_targ`
- Result: **verified faithful change** — D-0018: idx 2522 weapon create was
  dart-trap ammo after pet step, not `mongets`. Wired pet `postmov`/`mintrap`
  dart path; exported `clear_path`/`m_cansee` so ranged scoring does not
  see through walls (`rnd(5)`). Stay-put `dog_move` returns `MMOVE_MOVED`.
- Verification: green PASS + strict; seed1500 first mismatch **2522→2563**;
  runner seed1500 2598/2768, seed0060 2494/3626; full suite 2/44, RNG
  26687/792838, screens 109/11405, role throws 29/44.
- Next: diagnose `dog_invent` `rn2(udist)` C=4 vs JS=10 @ idx 2563
  (pet/hero positions after dart-trap turn); `rng-diff` seed1500.

## 2026-07-12 21:30 — dog_move uncursedcnt / cursemsg cursed skip
- C locus: `dogmove.c:dog_move` (~1069–1078, ~1212–1239)
- Result: **verified faithful change** — D-0017: JS counted every `mfndpos`
  slot and never set `cursemsg` / `rn2(13*uncursedcnt)` continue. Ported
  uncursed count (skip blocked MON_AT + `cursed_object_at`), cursed pile
  flag, and probabilistic skip.
- Verification: green PASS + strict; seed1500 first mismatch **2517→2522**;
  runner seed1500 2526/2768, seed0060 2494/3626; full suite 2/44, RNG
  26664/792838, screens 109/11405, role throws 29/44.
- Next: diagnose C `next_ident`+WEAPON `mksobj_init` @ idx 2522 (caller of
  weapon create after this `dog_move`); `rng-diff` seed1500.

## 2026-07-12 21:25 — mktrap_victim place_object (3 missing obj_resists)
- C locus: `mklev.c:mktrap_victim` (ammo + cursed possessions + candle)
- Result: **verified faithful change** — D-0016: JS created dart/food/gem for
  DART_TRAP victims but never `place_object`, so `dog_goal` skipped 3
  `obj_resists` after APPORT. Also ported PIT `breaktest` discard path.
- Verification: green PASS + strict; seed1500 first mismatch **2300→2517**;
  runner seed1500 2518/2768, seed0060 2494/3626; full suite 2/44, RNG
  26624/792838, screens 109/11405, role throws 29/44.
- Next: port `dog_move` `uncursedcnt` + `rn2(13*uncursedcnt)` cursed-square
  skip (`dogmove.c` ~1069–1078 / ~1235–1239); `rng-diff` seed1500 @ 2517.

## 2026-07-12 21:15 — mineralize bury + CORPSE age POISON (dog_goal 2298)
- C locus: `mklev.c:mineralize` / `mkobj.c:add_to_buried`; `dog.c:dogfood`
  CORPSE age; `dogmove.c:cursed_object_at` + `dog_goal`
- Result: **verified faithful change** — D-0014: mineralize `!rn2(3)` buries
  off `fobj` (was always `place_object`, so unreachable stone gold stole the
  first APPORT `rn2(8)`). D-0015: tainted CORPSE `age+50<=moves` → POISON so
  APPORT is not overwritten by CADAVER.
- Verification: green PASS + strict; seed1500 first mismatch **2298→2300**;
  runner seed1500 2343/2768, seed0060 2494/3626; full suite 2/44, RNG
  26445/792838, screens 109/11405, role throws 29/44.
- Next: find the **3** C `obj_resists` JS skips after APPORT+corpse @ idx 2300
  (`rng-diff` seed1500); compare in-bbox `fobj` / candidate-loop `dogfood`.

## 2026-07-12 21:05 — Rogue invent: is_poisonable + starting sack mkbox_cnts
- C locus: `obj.h:is_poisonable`; `mkobj.c:mksobj_init` / `mkbox_cnts`
- Result: **verified faithful change** — falsified “m_initinv @ 2223” theory.
  D-0012: poison roll only for missiles (`is_multigen`), not dagger. D-0013:
  starting SACK still runs `mkbox_cnts` → `rn2(1)` even when empty.
- Verification: green PASS + strict; seed1500 prefix 2223→**2298** (`dog_goal`);
  runner 2348/2768; seed0060 2478/3626; full suite 2/44, RNG 26409/792838,
  screens 109/11405, role throws 29/44.
- Next: `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`
  — diagnose C `dog_goal` rn2(8) vs JS rn2(100) at idx 2298 (call order /
  missing branch); do not implement D-0006.

## 2026-07-12 21:00 — `start_corpse_timeout` + `mkcorpstat` special restart (D-0011)
- C locus: `mkobj.c:start_corpse_timeout` / `special_corpse` / `mkcorpstat`;
  `mklev.c:mktrap_victim`
- Result: **verified faithful change** — random lichen corpse no-ops first
  timer; `mkcorpstat` victim override now restarts timeout like C. Ported
  `rnz(rot_adjust)` envelope + rider/troll branches.
- Verification: green PASS + strict; seed1500 prefix → 2223 (`m_initinv`);
  2255/2768 + 1 screen; seed0060 2464/3626; full 2/44, RNG 26314/792838,
  screens 109/11405.
- Next: port `makemon.c:m_initinv` body (seed1500 idx 2223); falsify with
  `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:55 — ordinary `m_initweap` / `is_armed` (D-0010)
- C locus: `mondata.h:is_armed`; `makemon.c:m_initweap`/`m_initthrow`/`mongets`
- Result: **verified faithful change** — extractor `has_at_weaps`; wired
  `is_armed` → `m_initweap` ordinary envelope before `m_initinv_tail`.
  Cleared seed1500 idx 1112 (`rn2(4)` kobold darts).
- Verification: green PASS + strict; seed1500 prefix → 1194
  (`start_corpse_timeout`); 1275/2768; seed0060 2464/3626; full 2/44,
  RNG 25334/792838, screens 108/11405.
- Next: port `mkobj.c:start_corpse_timeout` (seed1500 idx 1194); falsify with
  `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:50 — Rogue startup UI + calendar (verify D-0007/8 + D-0009)
- C locus: `questpgr`/`pray` align_gname+gtitle; `wintty` menu offx; `botl`
  showexp/time + plname capitalize; `calendar` moon/friday; `allmain` preamble
- Result: **verified faithful change** — legacy Kos+offx; botl flags; welcome
  `--More--` flush before tutorial; `js/calendar.js` + moon/friday plines.
  Confirmed D-0007/D-0008 live. Next peel identified: `m_initweap` @ seed1500
  idx 1112 (JS skips to `rn2(50)`).
- Verification: green PASS + strict; Rogue no `role not ported`; seed1500
  legacy/welcome text+cursor match; seed0013 moon/friday lines match; full
  suite 2/44, RNG 23908/792838, role throws 29/44.
- Next: port `makemon.c:m_initweap` (+ `mongets`/`m_initthrow`/`is_armed`);
  falsify with `node scripts/rng-diff.mjs sessions/seed1500-rogue-explore-move.session.json`.

## 2026-07-12 20:35 — Rogue welcome/HP/align (after u_init_role)
- C locus: `role.c:Hello`; `allmain.c:welcome`; `attrib.c:newhp`;
  `exper.c:newpw`; `u_init.c` align init; `insight.c` pantheon/wallet
- Result: removed Tourist literals — `Hello(mnum)`, role/race `hpadv`/`enadv`,
  `newhp`/`newpw`, rc `align` → `ualign`, `welcome()`, invent pantheon + empty
  wallet. Builds on D-0007 Rogue `u_init_role`. Shell still rejected every
  command; `STOP_AGENT_LOOP.md` is `1` (human).
- Verification: **blocked** — no live green/cohort this iteration. Prior loop
  post-iter-1 green was PASS on pre-welcome-edit tree only.
- Next: with shell approved, run D-0007/D-0008 four commands; if Rogue clears
  init+welcome, peel first post-welcome divergence; if green `^X` regresses,
  bisect invent pantheon/wallet.

## 2026-07-12 20:20 — Rogue/human u_init foundation
- C locus: `role.c` Rogue/human entries; `u_init.c:u_init_role` (`PM_ROGUE`),
  `knows_object`/`knows_class`, `ini_inv_use_obj` wield/wear
- Result: ported PM_* `mnum` identity + Rogue inventory/knowledge path
  (`js/roles.js`, `js/u_init.js`, role PM exports in `monsters_data.js`).
  Shell tool rejected all commands this iteration — green/cohort **not**
  re-run after the edit (preflight green was PASS earlier today from a prior
  terminal capture on the pre-edit tree).
- Verification: **blocked** — next agent must run green + strict + Rogue cohort
  before further feature work or score updates.
- Next: run the four commands listed in D-0007; if Rogue clears the throw,
  peel first post-init divergence; if green regresses, bisect `mnum`/wield
  changes against Tourist.

## 2026-07-13 01:32 — roles initrecord → peace_minded (D-0056)
- C locus: `role.c` roles[] `initrecord`; `makemon.c:peace_minded`;
  `u_init.c` ualign.record init
- Result: Caveman/Valkyrie initrecord 10→0, Rogue 0→10 to match C.
  Cleared seed1150 `rn2(16)` vs `rn2(26)` at peace_minded (was wrong
  `ualign.record`, not formula).
- Verification: green + seed1500/1800/0060 PASS + strict; seed1150
  prefix 2301→2915 (`dog_move`); full 5/44 screens 290 RNG 85042.
- Next: `node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`
  — port `align_shift` (or diagnose first weight rn2(3) vs rn2(2)).

## 2026-07-13 01:38 — CORPSE G_NOCORPSE retry (D-0057)
- C locus: `mkobj.c` `mksobj_init` FOOD/CORPSE; `mon.c` `undead_to_corpse`;
  `allmain.c` mvitals init
- Result: falsified NOTES `align_shift` theory for seed0700 (DoD AM_NONE).
  Ported `undead_to_corpse`, mvitals `G_NOCORPSE` init, and CORPSE retry
  loop so a grid-bug `rndmonnum` burns a second `rndmonst_adj` like C.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 290 RNG 85090; seed0700 prefix 1888→2733 (`u_calc_moveamt`);
  seed0361 1432→2924 (`newhp`). seed0102 @ 1281 remains egg
  `can_be_hatched` (not this peel).
- Next: `node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`
  — peel `u_calc_moveamt` @ 2733 (or egg `can_be_hatched` on seed0102).

## 2026-07-13 01:45 — adjabil L1 Fast + u_calc_moveamt (D-0058)
- C locus: `attrib.c` `adjabil`/`role_abil`/`sam_abil`; `u_init.c`
  `u_init_misc`; `allmain.c` `u_calc_moveamt`; `youprop.h` Fast
- Result: ported role/race innate tables + `adjabil(0,1)` and
  Fast/Very_fast `rn2(3)` in `u_calc_moveamt`. Cleared seed0700
  `rn2(3)` vs `rn2(200)` at first post-spawn EOT.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 291 RNG 85494; seed0700 prefix 2733→3141 (`rnl`/
  `doopen_indir`).
- Next: `node scripts/rng-diff.mjs sessions/seed0700-samurai-explore-descend.session.json`
  — peel `rnl`/`doopen_indir` @ 3141 (or egg `can_be_hatched` on
  seed0102 / `newhp` on seed0361).

## 2026-07-13 02:00 — newhp/pluslvl/#levelchange (D-0061)
- C locus: `attrib.c` `newhp`; `exper.c` `newpw`/`pluslvl`; `wizcmds.c`
  `wiz_level_change`; `getline.c` `tty_get_ext_cmd`; `role.c` `xlev`
- Result: wizard tours were stuck at post-preamble because JS lacked
  level-up `newhp`/`newpw` and `#levelchange`. Ported those plus
  NEWAUTOCOMP-style extcmd entry and `roles[].xlev` on `game.urole`.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 86020; seed0361 prefix 2924→2975 (`dosearch0`);
  seed0373 2512→2549 (`getbones`).
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel `dosearch0`/`rnl` @ 2975 (or seed0700 screen / egg hatch).

## 2026-07-13 02:10 — dosearch0 + Searching EOT (D-0062)
- C locus: `detect.c` `dosearch0`/`find_trap`/`cvt_sdoor_to_door`;
  `allmain.c` Searching EOT; `youprop.h` Searching
- Result: Archeologist L1 `HSearching` never ran `dosearch0`; ported
  trap/SDOOR/SCORR find + EOT/`s` callers. Cleared C `rnl(8)` @ 2975.
  Follow-on @ 2979 looked like wish-text leak; actual next peel was
  missing `T` takeoff (D-0063).
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 86037; seed0361 prefix 2975→2979; seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel @ 2979 (takeoff, then wish).

## 2026-07-13 02:20 — T/dotakeoff delay-0 armor (D-0063)
- C locus: `do_wear.c` `dotakeoff`/`count_worn_stuff`/`armoroff`/
  `Helmet_off`/`Armor_off`/`off_msg`; `cmd.c` `'T'`
- Result: seed0361 @ 2979 was not wish yet — keys `TcTd\e` strip
  fedora then jacket; JS unknown-`T` let `blessed…` leak into rhack.
  Ported delay-0 takeoff + fedora Archeologist luck.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 86053; seed0361 prefix 2979→3011 (`next_ident`
  wish); seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — port `^W`/`wiz_wish`/`makewish`/`readobjnam` @ 3011.

## 2026-07-13 02:30 — ^W makewish/readobjnam (D-0064)
- C locus: `wizcmds.c` `wiz_wish`; `zap.c` `makewish`; `objnam.c`
  `readobjnam`/`rnd_otyp_by_namedesc`; `mondata.c` `name_to_monplus`;
  `artifact.c` `artifact_name`/`touch_artifact`; `do_name.c` `oname`;
  `invent.c` `hold_another_object`; `cmd.c` `C('w')`
- Result: seed0361 @ 3011 needed wizard wish. Ported artifact table
  extractor + wish subset covering Grayswandir / SDSM (mon-strip +
  `scale mail` `rn2(67)` + remap) / ALS. Cleared wish trio; next is
  `w` wield @ 3035.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 85938; seed0361 prefix 3011→3035 positional 3087;
  seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel `w`/`dowield` @ 3035 (or getbones/egg/seed0700 screen).

## 2026-07-13 02:35 — w/dowield Grayswandir (D-0065)
- C locus: `wield.c` `dowield`/`ready_weapon`/`setuwep`/`welded`;
  `artifact.c` `retouch_object`/`touch_artifact`; `cmd.c` `'w'`
- Result: seed0361 @ 3035 was missing wield. Neutral + Grayswandir
  `SPFX_RESTR` rolls `rn2(4)` again on retouch (wish already touched
  @ 3017). Ported getobj/`ready_weapon`/`setuwep`/`retouch_object`.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 85896; seed0361 prefix 3035→3073 (`W` wear)
  positional 3103; seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel `W`/`dowear` SDSM @ 3073 (or getbones/egg/seed0700 screen).

## 2026-07-13 02:45 — W/dowear SDSM nomul (D-0066)
- C locus: `do_wear.c` `dowear`/`canwearobj`/`accessory_or_armor_on`/
  `Armor_on`; `worn.c` `setworn`; `hack.c` `nomul`/`unmul`;
  `allmain.c` `multi < 0`; `objects.h` `oc_delay`; `cmd.c` `'W'`
- Result: seed0361 @ 3073 was missing wear. SDSM `oc_delay=5` needs
  `nomul(-5)` + moveloop occupation (no keys during dress). Extracted
  `oc_delay`; ported wear + setworn + unmul/afternmv.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 85752; seed0361 prefix 3073→3259 (`P` puton)
  positional 3262; seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel `P`/`doputon` ALS @ 3259 (or getbones/egg/seed0700 screen).

## 2026-07-13 02:55 — P/doputon ALS (D-0067)
- C locus: `do_wear.c` `doputon`/`accessory_or_armor_on`/`Amulet_on`/`on_msg`;
  `worn.c` `setworn`; `invent.c` `prinv`; `objnam.c` worn amulet; `cmd.c` `'P'`
- Result: seed0361 @ 3259 was missing puton. Session keys `Pk` after wear;
  ALS is setworn + prinv (no puton RNG). Ported doputon + amulet/ring-hand
  accessory path + doname worn suffixes.
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 295 RNG 85792; seed0361 prefix 3259→3292 (`getbones`)
  positional 3295; seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0361-archeologist-tour.session.json`
  — peel `getbones` @ 3292 (also seed0373 @ 2549) or egg/seed0700 screen.

## 2026-07-13 03:00 — EGG can_be_hatched (D-0068)
- Objective: primary peel — Notes said getbones; diagnosed getbones
  blocked on unbound `^V`/Quest `makemaz`; pivoted to seed0102 egg.
- C locus: `mkobj.c` EGG `mksobj_init`; `mon.c` `can_be_hatched`/
  `dead_species`/`BREEDER_EGG`; `mondata.c` `little_to_big`
- Result: real hatch retry + growth helpers + `lays_eggs`. seed0102
  prefix 1281→4451 (`dog_goal`). getbones remains blocked (documented).
- Verification: green + seed1500/1800/0060 PASS + strict; full 5/44
  screens 296 RNG 90837; seed0102 positional 4459/4485 Scr 2/25;
  seed0700 RNG full.
- Next: `node scripts/rng-diff.mjs sessions/seed0102-ranger-name-cancel.session.json`
  — peel `dog_goal` @ 4451 (or seed0017/seed0700 screen/`exercise`).

## 2026-07-13 — seed0102 dog_goal udist / #name (D-0069)
- Objective: seed0102 `dog_goal` @ 4451 (PROGRESS primary).
- C locus: `dogmove.c` `dog_goal` `udist>1`→`rn2(4)`; input
  `do_name.c` `docallcmd` / `dothrow.c` `dofire` (session `fli`).
- Result: gap is geometry — JS `udist==1` after leaked `l` move; C
  keeps diagonal start. FORCE `udist>1` matched through `rn2(4)`+
  `rn2(1)`. Ported `#name`/`docallcmd` menu stubs + `dofire` helper
  (not bound to `'f'` yet). Auto-submit unique `#` rejected (broke
  seed0361). dog_goal prefix unchanged at 4451.
- Verification: green + seed1500/1800/0060 PASS + strict; seed0361
  positional 3295 restored.
- Next: consume `fli` inside naming/fire/getobj/getpos so hero stays
  put; `node scripts/rng-diff.mjs sessions/seed0102-ranger-name-cancel.session.json`
  — expect `rn2(4)` @ dog_goal once `udist>1`.

## 2026-07-13 — fireassist `f` / doswapweapon (D-0069 fixed)
- Objective: seed0102 `dog_goal` @ 4451 via key ownership (PROGRESS).
- C locus: `dothrow.c` `dofire` fireassist; `wield.c` `doswapweapon`/
  `ready_weapon` prinv `--More--`; `cmd.c` CQ_CANNED.
- Result: **verified** — `'f'` queues swap+retry; More eats `l`/`i`;
  Esc → EOT → getdir cancel; hero stays diagonal → `dog_goal` `rn2(4)`.
  seed0102 RNG **4485/4485** (Scr 0/25).
- Verification: green + cohort PASS + strict; full **5/44**,
  RNG **90863**/792838, Scr **294**/11405.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0102-ranger-name-cancel.session.json`
  — screen peel, or seed0017 @ 2775 / seed0700 screens.

## 2026-07-13 — display MLET_CH + furniture + xprname dot (D-0070)
- Objective: seed0102 screen peel Scr 0/25 (PROGRESS primary).
- C locus: `defsym.h` MONSYM / PCHAR furniture; `invent.c`
  `prinv`→`xprname(..., TRUE)`.
- Result: **verified** — kobold/`S_KOBOLD`→`k`, sink→`{`
  CLR_WHITE, full MLET_CH + altar/grave/throne/fountain;
  prinv trailing period. seed0102 Scr **0→17**/25 (RNG full).
  Remaining: Book overlay Scr 0; cmdassist help Scr 15+.
- Verification: green + seed1500/1800/0060 PASS + strict; full
  **5/44**, RNG **90863**/792838, Scr **311**/11405.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0102-ranger-name-cancel.session.json`
  — cmdassist getdir help UI (Scr 15) or Book overlay blanking.

## 2026-07-13 — lookaround run==1 corridor-turn (D-0072)
- Objective: seed0017 @ 2775 (PROGRESS primary after D-0071).
- C locus: `hack.c` `lookaround` — IS_OBSTRUCTED uninteresting;
  run==1/3/8 corridor-follow updates `u.dx`/`u.dy`.
- Result: **verified** — JS aborted capital-`L` rush on ahead STONE
  (`blocksMove`); C turns into adjacent CORR. Premature getch bumped
  pet (`do_attack` `rn2(7)`) while C still in `distfleeck`. Ported
  lookaround monster stops + corridor-turn.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91263**/792838, Scr **320**/11405; seed0017 prefix
  **2775→3132** positional **3169**/3465; seed0700 RNG full Scr 2/51.
- Next: `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
  — peel `dog_move` @ 3132 (or seed0700 screen / seed2200 `exercise`).

## 2026-07-13 — dodrink / peffect_oil (D-0073)
- Objective: seed2200 @ 2724 (PROGRESS preferred after D-0072; NOTES
  said exercise — falsified as moveloop/exerper).
- C locus: `potion.c` `dodrink`/`dopotion`/`peffect_oil` —
  `"That was smooth!"` + `exercise(A_WIS,FALSE)` → `rn2(2)`.
- Result: **verified** — keys `q`+`h` quaff oil; JS unbound `q` so
  `h` was a west move. Ported drink getobj + oil peffect; wired `'q'`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91220**/792838, Scr **320**/11405; seed2200 prefix
  **2724→2733** positional **2790**/3018; seed0700 RNG full Scr 2/51.
- Diagnosis parked: seed0017 @ 3132 needs walkable `(30,4)` (JS VWALL
  vs C floor) for third `rn2(12)` — join/wallification, not mtrack.
- Next: `node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `z`/`dozap` @ 2733.

## 2026-07-13 — dozap NODIR secret-door / findit (D-0074)
- Objective: seed2200 @ 2733 (PROGRESS preferred after D-0073).
- C locus: `zap.c` `dozap`/`weffects`/`zapnodir` + `detect.c` `findit`
  — `z`+`c` WAN_SECRET_DOOR_DETECTION; `exercise(A_WIS,TRUE)` then
  empty `"You don't find anything."`.
- Result: **verified** — JS unbound `z` so `c` was a SE move. Ported
  zap getobj + zappable + NODIR weffects/zapnodir + findit clear-area;
  wired `'z'`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91222**/792838, Scr **320**/11405; seed2200 prefix
  **2733→2772** positional **2794**/3018; seed0700 RNG full Scr 2/51.
- Next: `node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `r`/`doread` @ 2772 (SCR_MAGIC_MAPPING dual exercise).

## 2026-07-13 — doread SCR_MAGIC_MAPPING / do_mapping (D-0075)
- Objective: seed2200 @ 2772 (PROGRESS preferred after D-0074).
- C locus: `read.c` `doread`/`seffects`/`seffect_magic_mapping` +
  `detect.c` `do_mapping`/`show_map_spot` — `r`+`j` SCR_MAGIC_MAPPING;
  dual `exercise(A_WIS,TRUE)` then `"A map coalesces in your mind!"`.
- Result: **verified** — JS unbound `r` so `j` was a south move.
  Ported read getobj (invent-order + missing-letter continue) +
  SCR_MAGIC_MAPPING seffect + do_mapping hero_memory path +
  magic_map_background; wired `'r'`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91390**/792838, Scr **320**/11405; seed2200 prefix
  **2772→2925** positional **2940**/3018; seed0700 RNG full Scr 2/51.
- Next: `node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `E`/`doengrave` @ 2925.

## 2026-07-13 — doengrave fingertip Elbereth (D-0076)
- Objective: seed2200 @ 2925 (PROGRESS preferred after D-0075).
- C locus: `engrave.c` `doengrave`/`make_engr_at` + `allmain.c`
  occupation — `E`+`-`+Elbereth; DUST mix-up `rn2(25)` then
  occupation Elbereth `exercise(A_WIS,TRUE)`.
- Result: **verified** — JS unbound `E`. Ported fingertip DUST
  getobj/getlin/mix-up + `set_occupation`/`make_engr_at`; wired
  `'E'` and occupation tick before `rhack`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91443**/792838, Scr **318**/11405; seed2200 prefix
  **2925→2979** positional **2993**/3018; seed0700 RNG full Scr 2/51.
- Next: `node scripts/rng-diff.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel post-Elbereth 0-RNG `/` UI (JS emits RNG @ 2979; C waits
  until step 109 Lua shuffle).

## 2026-07-13 — dowhatis/dohelp/get_lua_version (D-0077)
- Objective: seed2200 @ 2979 (PROGRESS preferred after D-0076).
- C locus: `pager.c` `dowhatis`/`do_look`/`dohelp`/`checkfile`;
  `getpos.c` `getpos` + TIP_GETPOS; `version.c` `doextversion` →
  `nhlua.c` `get_lua_version` → nhlib `shuffle(align)`.
- Result: **verified** — unbound `/`/`?` let `.`/`hjkl` take turns
  before C's 0-RNG UI; About's first `get_lua_version` is the Lua
  shuffle at step 109. Ported whatis/getpos/help + data.base/`dat/*`
  paging; wired `'/'`/`'?'`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, RNG **91280**/792838, Scr **318**/11405; seed2200 RNG
  **3018**/3018 Scr **1**/230; seed0700 RNG full Scr 2/51.
- Next: seed2200 screen peel / seed0017 @ 3132 terrain / seed0700
  screens — `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`.

## 2026-07-13 — H2344 offx + get_strength_str (D-0078)
- Objective: seed0700 screen peel (PROGRESS preferred after D-0077).
- C locus: `wintty.c` `#define H2344_BROKEN` NHW_MENU offx;
  `botl.c` `get_strength_str`.
- Result: **verified** — long Amaterasu Book forced stock
  fullscreen (`offx==10`); C keeps corner offx=7 via H2344
  `min(cols/2, cols-maxcol-1)`. Also raw Str 19 → `18/01`.
- Verification: green + seed1500/1800/0060/0102 PASS + strict; full
  **6/44**, screens **318→361**/11405, RNG **91280**/792838;
  seed0700 Scr **2→44**/51; seed2200 Scr still 1/230.
- Next: seed0700 pet `Hachi` / invent offx / Japanese disco —
  `node frozen/ps_test_runner.mjs sessions/seed0700-samurai-explore-descend.session.json`
  — or seed2200 map `` ` `` vs `x` / seed0017 terrain.

## 2026-07-13 — Samurai Hachi + Japanese invent/disco (D-0079)
- Objective: seed0700 remaining screens (PROGRESS primary).
- C locus: `dog.c` `makedog` + `do_name.c` `christen_monst`/
  `x_monnam`; `hack.c` swap pline; `objnam.c` Japanese/ya/
  quiver/rustproof; `mkobj.c` lacquer `SPLINT_MAIL`; `o_init.c`
  disco Samurai + `observe_object`.
- Result: **verified** — christen `Hachi`; Japanese doname/
  disco brackets; lacquer rustproof; invent `observe_object`
  marks wakizashi encountered. Invent offx was maxcol side-effect.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **361→370**/11405, RNG
  **91280→91380**/792838; seed0700 **PASS** 51/51.
- Next: seed2200 map `` ` `` vs `x` —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — or seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 — STATUE obj_glyph mons[corpsenm].mlet (D-0080)
- Objective: seed2200 Scr 1/230 map `` ` `` vs ASCII `x`
  (PROGRESS primary after D-0079).
- C locus: `display.h` `obj_to_glyph`/`statue_to_glyph`;
  `display.c` mapglyph statue → `mons[].mlet` + `obj_color(STATUE)`.
- Result: **verified** — floor STATUE of grid bug was ROCK_CLASS
  `` ` ``; C shows monster letter `x` in white. Coords (16,11).
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **370→380**/11405, RNG
  **91380**/792838; seed2200 Scr **1→11**/230.
- Next: seed2200 whatis/overlay @ screen 10 (room `·` vs gray
  blank) — same focused runner — or seed0017 @ 3132 terrain /
  seed1150 `dog_move`.
