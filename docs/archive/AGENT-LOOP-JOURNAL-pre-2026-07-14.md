## 2026-07-14 16:42 — D-0272 find_roll_to_hit Luck bonus

- Objective: seed0030 seg9 @12411 (CURRENT primary D-0272).
- C locus: `uhitm.c` `find_roll_to_hit` Luck term; full-moon
  `change_luck(1)` already in `moveloop_preamble`.
- Change: DIAG showed Healer/scalpel vs gas spore `tmp=15==dieroll`;
  ported Luck bonus in `js/uhitm.js`. Falsified: missing post-hit
  exercise / gas-spore path — miss before damage.
- Verification: seg9 **12411→12414**; green+strict PASS; 17-session PASS
  cohort; seed0030 flat **48141**/105529 Scr **85**/1953.
- Next: D-0273 — `corpse_chance` AT_BOOM / `mon_explodes` @12414.

## 2026-07-14 16:45 — D-0271 make_corpse undead before G_NOCORPSE

- Objective: seed0030 seg9 @10811 (CURRENT primary D-0271).
- C locus: `mon.c` `make_corpse` zombie/mummy/vampire arms before
  `default_1` `G_NOCORPSE`; `undead_to_corpse` + `mkcorpstat` +
  `TAINT_AGE+1`.
- Change: DIAG showed `PM_KOBOLD_ZOMBIE` early-return on geno
  `G_NOCORPSE`; ported undead specials in `js/mhitm.js` `make_corpse`;
  `trap.js` shares export. Named omit: dragon/unicorn/worm/golem arms.
- Verification: seg9 **10811→12411**; green+strict PASS; 17-session PASS
  cohort; seed0030 flat **48092**/105529 Scr **85**/1953.
- Next: D-0272 — diagnose seg9 @12411 C `exercise` vs JS `rn2(3)`.
# Agent loop journal (archived)

Living tail: `docs/AGENT-LOOP-JOURNAL.md` (latest ~10 entries).
Do **not** read this archive by default.

---

## 2026-07-14 16:15 — D-0267 m_move set_apparxy before shk

- Objective: seed0030 seg9 @8943 (PROGRESS primary; NOTES post-Invis
  set_apparxy).
- C locus: `monmove.c` `m_move` — `set_apparxy` after meating, before
  mtame / shk|gd|priest.
- Change: reorder `js/monmove.js` `m_move` to call `set_apparxy` before
  specials. Falsified mux/perceives theory — actor was peaceful
  shopkeeper returning from `shk_move` before apparxy.
- Verification: seg9 **8943→10461**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182691**.
- Next: D-0268 — port `m_move` Invis `rn2(11)` should_see → `appr=0`
  @10461.

## 2026-07-14 15:35 — D-0265 hitval oc_hitbon

- Objective: seed0030 seg9 @8352 (PROGRESS primary; NOTES hitum/exercise).
- C locus: `weapon.c` `hitval` — weapon/weptool `spe` + always
  `objects[otyp].oc_hitbon`; `uhitm.c` `find_roll_to_hit`.
- Change: `js/uhitm.js` `hitval` adds extracted `a_ac` as `oc_hitbon`
  (dagger family +2). Blessed/spear/trident/pick/artifact deferred.
- Falsified: incomplete post-hit `hmon`/`dmgval` — matched `rnd(20)=13`;
  JS missed solely from missing +2 to-hit.
- Verification: seg9 **8352→8918**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182547**; seed0030
  **47960**/105529.
- Next: diagnose seg9 @8918 hero `trapeffect_magic_trap`/`domagictrap`
  (D-0266).


- Objective: seed0030 seg9 @8281 (PROGRESS primary; NOTES post-gem fleeck).
- C locus: `monmove.c` `dochug` HTH wield when `dist2(mux,muy)<=8` +
  `weapon_check==NEED_WEAPON`; `weapon.c` `select_hwep`/`mon_wield_item`.
- Change: `js/weapon.js` `select_hwep` + NEED_HTH arm; `js/monmove.js`
  pre-move wield gate + `Conflict` in `want_move`.
- Falsified: goblin nearby / track-arity-only (goblin `dist2=8`,
  `wc=NEED_WEAPON`, unwielded ORCISH_DAGGER — C spends turn wielding).
- Verification: seg9 **8281→8352**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182533**; seed0030
  **47946**/105529.
- Next: diagnose seg9 @8352 `exercise` vs `rn2(3)` after `hitum` (D-0265).

## 2026-07-14 10:50 — D-0263 drinkfountain dofindgem

- Objective: seed0030 seg9 @8138 (PROGRESS primary; NOTES fountain gem).
- C locus: `fountain.c` `drinkfountain` case 27 → `dofindgem` →
  `mksobj_at(rnd_class(DILITHIUM_CRYSTAL, LUCKSTONE-1), …, FALSE, FALSE)`.
- Change: `js/fountain.js` port `dofindgem` + FOUNTAIN_LOOTED; drink
  case 27 + dip case 24; export `rnd_class` from `js/mkobj.js`.
- Falsified: none — C fate=27 matched hypothesis (JS hit dryup early).
- Verification: seg9 **8138→8281**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182518**; seed0030
  **47931**/105529.
- Next: diagnose seg9 @8281 `distfleeck` vs `rn2(16)` (D-0264).

## 2026-07-14 10:45 — D-0262 set_mimic_sym shop get_shop_item

- Objective: seed0030 seg9 @7196 (PROGRESS primary; NOTES shop stock).
- C locus: `makemon.c` `set_mimic_sym` `rt >= SHOPBASE` → `get_shop_item`
  after `rn2(10) >= depth(&u.uz)` (not stock_room mkshobj_at alone).
- Change: `js/makemon.js` port shop arm — `get_shop_item`, FODDERSHOP
  jelly/mold, RANDOM_CLASS remap, assign_sym/`mkobj`; use `depth()`.
- Falsified: stock_room eligibility as root (matched through mimic
  `rn2(10)=1`; peel was deferred shop appearance body).
- Verification: seg9 **7196→8138**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182545**; seed0030
  **47958**/105529.
- Next: diagnose seg9 @8138 `drinkfountain`/`rnd_class` (D-0263).

## 2026-07-14 10:32 — D-0261 Ctrl-rush run=3 + await muse pline
- Objective: seed0030 seg8 @3310 (PROGRESS primary; prior peel thought more()/dodrop).
- C locus: `cmd.c` `do_rush_*`→`set_move_cmd(dir,3)`; `hack.c` `lookaround`
  (`run!=1` stops any non-safemon); `muse.c` `mzapwand`/`mbhitm` blocking pline.
- Change: `js/cmd.js` Ctrl-rush `run=3` (capital `run=1`); `js/muse.js` await
  wand/hurl plines; `js/monmove.js` await `use_misc`. Prior `dodrop` kept.
- Falsified: fleeck/mfndpos @3068; more()-only without run-mode; DIAG await-in-more.
- Verification: seg8 RNG FULL; green+strict PASS; 17-session PASS cohort;
  full **19/44** Scr **1563** RNG **182531**; seed0013 RNG full Scr **57**/59.
- Next: diagnose seed0030 seg9 @7196 `get_shop_item` (D-0262).
- C locus: <file:function>
- Result: <verified change | falsified hypothesis | prerequisite>
- Verification: <commands and compact result>
- Next: <one exact first action>
```

---

## 2026-07-14 10:05 — dodrop + D-0261 more desync (seg8 @3310)
- Objective: seed0030 seg8 peel (PROGRESS primary; NOTES @3068 was stale).
- C locus: `do.c` `dodrop`/`drop`/`dropx`/`dropy`/`canletgo`; `topl.c`
  `more`/`xwaitforspace`; `dogmove.c` `dog_goal` APPORT scan.
- Result: **partial** — @3068 fleeck/mfndpos squeeze **falsified** (match
  through 3309). Live @3310 is missing floor katana after C `d`/`a` drop.
  Ported `dodrop`/`dropx` + rhack `'d'`. Peel still open: post-rush
  `more()` discards `d`/`a` (only space/CR dismiss); inject spaces →
  katana on floor but drop must precede dog_goal @3309.
- Verification: green+strict PASS; 17-session PASS cohort; full **19/44**
  Scr **1465** RNG **181571**; seed0030 **47901**/105529.
- Next: compare C vs JS `more()` call sites during seg8 rush (`\r`→`\n`)
  so `d` reaches `dodrop` before dog_goal @3309.



## 2026-07-14 09:45 — diagnose seg8 @3068 dog_move rn2(1) (D-0261)
- Objective: seed0030 seg8 peel after D-0260 (PROGRESS primary).
- C locus: `dogmove.c` `dog_move`/`dog_goal`; `mon.c` `mfndpos` diagonal
  squeeze; possible `couldsee`/`gettrack`.
- Result: **falsified** stale “@3310 obj_resists vs rn2(4)”. Live first
  mismatch @**3068**: C `distfleeck` vs JS `!rn2(++chcnt)` on equal-dist
  cand `(65,15)`. Matched through `dog_goal` `rn2(4)=2`. Prior turn
  APPORT onto gold `(66,16)` matched. JS `couldsee` true / `gg=hero` /
  cnt=8 / mtrack[0]=(65,15). Hypothesis: C omits that cand or different
  `gg`/`nidist`. No production change (DIAG removed).
- Verification: green+strict preflight PASS; seg8 first=3068; no JS edit.
- Next: falsify C `mfndpos` set / `couldsee(66,16)` / `gettrack` at peel;
  port `bad_rock`/`cant_squeeze_thru` + `m_in_out_region` if confirmed.
## 2026-07-14 09:25 — newmonhp level-0 min HP (D-0260)
- Objective: seed0030 seg8 @3263 passivemm arity (PROGRESS primary).
- C locus: `makemon.c` `newmonhp` — level-0 `basehp=1` + `rnd(4)` then
  boost when `mhpmax==basehp` (min HP 2).
- Result: **verified** — passivemm/`rn2(3)` theories **falsified** as
  root; little dog bite vs jackal with JS `mhpmax=1` died into
  `corpse_chance` `rn2(2)` while C boosted HP to 2 and reached live
  `passivemm`. Prefix **3263→3310**.
- Verification: green+strict PASS; 17-session PASS cohort; full **19/44**
  Scr **1463** RNG **181294**; seed0030 **47955**/105529.
- Next: diagnose seg8 @3310 C `obj_resists(100)` vs JS `rn2(4)` (D-0261).
## 2026-07-14 08:55 — armoroff delay + ICRNL C(j) rush (D-0259)
- Objective: seed0030 seg8 @3088 dog_goal (PROGRESS primary; NOTES hero-stairs).
- C locus: `do_wear.c` `armoroff`/`suit_simple_name`; `cmd.c` `C(j)` rush;
  session ICRNL (`\r`→`\n`).
- Result: **verified** — dog_goal/hero-stairs theories **falsified** as
  root; real cause was immediate takeoff (no `oc_delay`/`nomul`) so later
  keys ran early, plus raw `\r` not mapped to rush-south. Prefix
  **3088→3263**; next peel `passivemm` (D-0260).
- Verification: green+strict PASS; 17-session PASS cohort; full **19/44**
  Scr **1463** RNG **181305**; seed0030 **47966**/105529; seed0013
  **4367**/4838.
- Next: `node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json`
  (seg8; expect first mismatch @3263 `passivemm`) — compare C
  `mhitm.c:1363` vs JS passive path.


- Objective: seed0103 Scr residual after D-0213 (PROGRESS primary).
- C locus: `display.c` `pet_color`/`ridden_mon_to_glyph`; `do_name.c`
  `x_monnam` saddle; `botl.c` `bl_ride`; `mon.c` `monkilled`.
- Result: **verified** — JS forced white for all tame; C uses species
  mcolor (pony brown). Riding shows steed glyph; `"saddled "` + botl
  `Ride`; undead `"destroyed"`. Scr **2→57**/60.
- Verification: green+strict+cohort PASS; full **17/44** Scr **1399**
  RNG **148875**.
- Next: seed0103 tutorial menu @ screen 3, or death disclosure @58, or
  `node scripts/rng-diff.mjs sessions/seed0104-knight-ride-combat.session.json`

## 2026-07-13 23:05 — empty_handed + weapon_insight (D-0194)
- Objective: seed0200 Scr residual (PROGRESS primary).
- C locus: `wield.c` `empty_handed`; `insight.c` `weapon_insight`;
  `weapon.c` `P_NAME`/`martial_bonus`/`skill_level_name`.
- Result: **verified** — NOTES guilty+taste join **falsified**; real
  cause was hardcoded ^X bare-handed/unskilled vs gloves→empty + Monk
  martial `P_BASIC`. seed0200 **PASS**.
- Verification: green+strict+cohort PASS; full **16/44** Scr **1306**
  RNG **138545**.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0030-ten-diverse-deaths.session.json`

## 2026-07-13 22:45 — mdamageu done_in_by / can_make_bones (D-0190)
- Objective: seed0030 @14299 (C `can_make_bones` vs JS `rn2(5)`).
- C locus: `mhitu.c` `mdamageu` → `end.c` `done_in_by`/`done`/`really_done`
  → `bones.c` `can_make_bones`.
- Result: **verified** — `mdamageu` no longer routes fatal blows through
  `losehp`; new `js/end.js` burns bones rn2; `runSegment`/`movemon`
  stop on `gameover`. seed0030 seg0 RNG complete (prefix **14300**).
- Verification: green+strict PASS; cohort PASS; full **15/44** Scr
  **1281** RNG **137291**; seed0030 positional **15844**/105529 Scr
  **44** (Scr drop = lost post-death accidental matches).
- Next: `node scripts/rng-diff.mjs sessions/seed0200-monk-north-search.session.json`

## 2026-07-13 18:45 — dog_eat after edible newdogpos (D-0168)
- Objective: seed0030 `obj_resists` @10608 (PROGRESS primary).
- C locus: `dogmove.c` edible candidate → `goto newdogpos` → `dog_eat`
  → `dogfood` + `m_consume_obj`/`delobj`.
- Result: **verified** — stop early-returning on edible food; call
  `dog_eat` after move (second `obj_resists` + `delobj` roll).
  Prefix **10608→10620**.
- Verification: green+strict PASS; cohort PASS; full **15/44**
  Scr **1357** RNG **132086**; seed0030 **11005**/105529 Scr **120**.
- Next: `node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json`
  (expect past 10620) or seed0101 Scr residual.

## 2026-07-13 18:30 — Teleportation hub themeroom_fill (D-0166)
- Objective: seed0030 themerms `contents` @6889 (PROGRESS primary).
- C locus: `themerms.lua` Teleportation hub / `make_a_trap` /
  `post_level_generate`; `mklev.c` `mktrap` victim `rnd(4)`.
- Result: **verified** — hub fill + postprocess teledest TELEP +
  `mktrap` `rnd(4)` burn (body rejected by `kind < HOLE`).
  Prefix **6889→10584** (next `next_ident`).
- Verification: green+strict PASS; cohort PASS; full **15/44**
  Scr **1348** RNG **131946**; seed0030 **10867**/105529 Scr **111**.
- Next: `node scripts/rng-diff.mjs sessions/seed0030-ten-diverse-deaths.session.json`
  (expect past `next_ident` @10584) or seed0101 Scr residual.

## 2026-07-13 18:20 — maybe_smudge_engr after walk (D-0165)
- Objective: seed0030 `maybe_smudge_engr` @6732 (PROGRESS primary).
- C locus: `hack.c` `domove`/`maybe_smudge_engr`; `engrave.c`
  `can_reach_floor`/`wipe_engr_at`.
- Result: **verified** — port `can_reach_floor` subset +
  `maybe_smudge_engr`; call after `spoteffects` on successful walk.
  Prefix **6732→6889** (next themerms `contents`).
- Verification: green+strict PASS; cohort PASS; full **15/44**
  Scr **1348** RNG **128294**; seed0030 **7215**/105529 Scr **111**/1953.
- Next: seed0030 themerms `contents` @6889, or seed0101 Scr residual.

## 2026-07-13 18:15 — SQKY You_hear + ^X gender/depth (D-0163/64)
- Objective: seed0015 Scr @22 distant F-note squeak + @38 ^X attributes
  (PROGRESS primary).
- C locus: `trap.c` `trapeffect_sqky_board`/`trapnote`; `pline.c`
  `You_hear`; `objnam.c` `just_an` letter-space; `insight.c`
  `background_enlightenment` gender + dungeon depth.
- Result: **verified** — port monster SQKY out-of-sight hear + real
  `canseemon`; `just_an("F note")`→`an`; ^X same gender gate as welcome;
  dungeon line uses `depth(u.uz)`. seed0015 **PASS**.
- Verification: green+strict PASS; cohort 12 PASS; full **15/44**
  Scr **1347** RNG **128105**.
- Next: seed0030 `maybe_smudge_engr` @6732, or seed0101 Scr residual.

## 2026-07-13 18:06 — ordinary vs known-branch stair colors (D-0162)
- Objective: seed0015 Scr @21 upstairs `<` yellow vs C NO_COLOR
  (PROGRESS primary).
- C locus: `display.c` `back_to_glyph` STAIRS; `stairs.c`
  `known_branch_stairs`; `defsym.h` S_*stair CLR_GRAY / S_br* CLR_YELLOW.
- Result: **verified** — D-0038 hardcoding upstairs=yellow matched
  Dlvl1 traversed branch only. Port `known_branch_stairs` + ladder
  direction; ordinary same-dungeon stairs CLR_GRAY→NO_COLOR.
  Scr **24→42**/44.
- Verification: green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1345** RNG **128105**.
- Next: seed0015 distant SQKY “F note” @22, or ^X genderPart @38
  (`female human` vs C `human`), or seed0030 `maybe_smudge_engr` @6732.

## 2026-07-13 18:05 — clear _objects_at on level rebuild (D-0161)
- Objective: seed0015 Scr @20 gold `$` on wall vs C DEC wall
  (PROGRESS primary).
- C locus: `mklev.c` `clear_level_structures` zeroes
  `level.objects[][]`; `savelev` clears `head_engr`.
- Result: **verified** — dlvl1 `mkgold` left ghost entry in
  `game._objects_at`; dlvl2 HWALL at same coords painted `$`.
  Clear `_objects_at` + `head_engr` with `fobj` in clear/goto_level.
  Scr **23→24**/44; screen 20 match.
- Verification: green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1327** RNG **128105**.
- Next: seed0015 upstairs `<` color @21, or seed0030
  `maybe_smudge_engr` @6732, or seed0101 Scr residual.

## 2026-07-13 17:55 — goto_level descend --More-- (D-0160)
- Objective: seed0015 Scr @19 descend without More / early Dlvl:2
  (PROGRESS primary).
- C locus: `display.c` `flush_screen(-1)` / `cls` / `docrt`;
  `do.c` `goto_level` arrival plines.
- Result: **verified** — NEED_MORE never flushed before redraw.
  Ported postpone + `docrt`→`cls`→`more` on stale map; reset topline
  state per `runSegment`. Scr **22→23**/44; screen 19 match.
- Verification: green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1326** RNG **128111**.
- Next: seed0015 Dlvl:2 gold `$` vs wall @20, or seed0030
  `maybe_smudge_engr` @6732, or seed0101 Scr residual.

## 2026-07-13 17:40 — postmov monster door open (D-0159)
- Objective: seed0015 Scr @13 blank vs `You hear a door open.`
  (PROGRESS primary).
- C locus: `monmove.c` `postmov` door block; `monhaskey`/`mb_trapped`;
  `m_move` can_open/can_unlock.
- Result: **verified** — JS deferred door after OPENDOOR step. Ported
  open/unlock/smash + UnblockDoor vision. Scr **21→22**/44.
- Verification: green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1324** RNG **128111**.
- Next: seed0015 descend `--More--` @19, or seed0030
  `maybe_smudge_engr` @6732, or seed0101 Scr residual.

## 2026-07-13 16:45 — armor pair of + ^X new moon (D-0158)
- Objective: seed0016 invent @24 / disco / ^X (PROGRESS primary).
- C locus: `objnam.c` `obj_typename`/`xname`; `insight.c` moon + paging.
- Result: **verified** — `pair of`/`set of` in typename/xname; ^X
  moon/friday13 before XP; continuous 23-row pages. seed0016 **PASS**.
- Verification: green+strict PASS; cohort 12 PASS; full **14/44**
  Scr **1323** RNG **128139**.
- Next: seed0015 Scr @21, or seed0030 `maybe_smudge_engr` @6732, or
  seed0101 Scr residual.

## 2026-07-13 16:35 — apply_ok SUGGEST wand/spbook (D-0157)
- Objective: seed0016 Scr @3 apply letters `[c]` vs C `[cfghi]`
  (PROGRESS primary).
- C locus: `apply.c` `apply_ok` / `doapply` getobj.
- Result: **verified** — JS only SUGGEST TOOL_CLASS; C also SUGGEST
  WAND/SPBOOK. Ported apply_ok ranks; letters = SUGGEST only.
- Verification: seed0016 Scr **31→32**/36; green+strict PASS; cohort
  11 PASS; full **13/44** Scr **1318** RNG **128139**.
- Next: seed0016 invent @24 (H2344 offx + `pair of` gloves), or
  seed0015 Scr @21 / seed0030 `maybe_smudge_engr` / seed0101 Scr.

## 2026-07-13 16:25 — WAN_SLEEP zapyourself (D-0156)
- Objective: seed0016 @2551 C `rnd(50)` @ `zapyourself` vs JS
  `rn2(5)` (PROGRESS primary).
- C locus: `zap.c` `dozap`/`zapyourself` WAN_SLEEP; `timeout.c`
  `fall_asleep`; `eat.c` `gethungry` Unaware `rn2(10)`.
- Result: **verified** — directional zap was stubbed; Healer `z`/`.`
  is self sleep ray. Ported getdir self, WAN_SLEEP/SPE_SLEEP
  zapyourself, fall_asleep, Unaware gethungry rn2(10).
- Verification: seed0016 RNG **3656**/3656 Scr **15→31**/36;
  green+strict PASS; cohort 1500/1800/0060/0105/0501 PASS; full
  **13/44** Scr **1318** RNG **128139**/792838.
- Next: seed0016 Scr residual @31, or seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` @6732 / seed0101 Scr residual.

## 2026-07-13 16:08 — set_apparxy Displacement (D-0154)
- Objective: seed0101 @2309 C `set_apparxy` `rn2(4)` vs JS `rn2(5)`
  (PROGRESS primary).
- C locus: `monmove.c` `set_apparxy`; Displaced via cloak of
  displacement; helpers `accessible`/`closed_door`/`couldsee`.
- Result: **verified** — stub skipped Displacement `!rn2(4)` so next
  call was `distfleeck` `rn2(5)`. Ported full set_apparxy envelope
  (pet/know early-exit, Invis/Displaced/Underwater, gotu, displace
  loop). Cloak otyp stands in for EDisplaced.
- Verification: seed0101 RNG **2371**/2371 Scr **21**/27; green+strict
  PASS; cohort 11 PASS; full **13/44** Scr **1293** RNG
  **127004**/792838.
- Next: seed0016 eat `next_ident` @2493, or seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` @6732 / seed0101 Scr residual.

## 2026-07-13 15:55 — `_` / dotravel (D-0153)
- Objective: seed0101 `_` travel unbound @2302 (PROGRESS primary).
- C locus: `cmd.c` `dotravel`/`dotravel_target`; `getpos.c` tip
  PICK_NONE + force unknown-dir; `hack.c` `findtravelpath` adjacent/
  continue.
- Result: **verified** — unbound `_` desynced tip/`E`/`-`/getpos cancel;
  searches never aligned. Ported dotravel + tip loop + force unknown
  pline + adjacent/greedy travel step.
- Verification: seed0101 prefix **2302→2309** Scr **10→21**/27;
  green+strict PASS; cohort PASS; full **13/44** Scr **1293** RNG
  **126947**/792838.
- Next: seed0101 `set_apparxy` rn2(4) vs rn2(5) @2309, or seed0016
  eat `next_ident` @2493 / seed0015 Scr @21.

## 2026-07-13 15:52 — Q / doquiver_core (D-0152)
- Objective: seed0101 @2293 `next_ident` (PROGRESS prefer shared).
- C locus: `wield.c` `dowieldquiver`/`doquiver_core`; `dothrow.c`
  `throw_ok`/`throwit` hand-throw; cmd `Q`.
- Result: **verified** — unbound `Q` desynced `Qbytdl`; C readies
  uswapwep bow then hand-throws arrows (`next_ident`+`obj_resists`).
  Ported doquiver_core + throw_ok DOWNPLAY + hand-throw pline.
- Verification: seed0101 prefix **2293→2302** Scr **4→10**/27;
  green+strict PASS; cohort PASS; full **13/44** Scr **1282** RNG
  **126936**/792838.
- Next: seed0101 `_` travel @2302, or seed0016 eat `next_ident` @2493 /
  seed0015 Scr @21.

## 2026-07-13 15:45 — hostile postmov / mon_learns_traps (D-0151)
- Objective: seed0015 @8518 newt `m_move` track vs second `distfleeck`.
- C locus: `monmove.c` `m_move`/`postmov`; `trap.c` `mintrap`
  `mon_learns_traps`; `mon.c` `mfndpos` known-trap skip;
  `mondata.c` `mon_knows_traps`/`mon_learns_traps`.
- Result: **verified** — hostile `m_move` skipped `postmov`, so never
  learned SQKY_BOARD; C `mfndpos` dropped that cell (no track RNG).
  Wired postmov + trap memory + known-trap skip.
- Verification: seed0015 RNG **8563**/8563 Scr **21**/44; green+strict
  PASS; cohort 11 PASS; full **13/44** Scr **1276** RNG
  **126818**/792838.
- Next: seed0015 Scr @21, or seed0101 `next_ident` @2293 /
  seed0030 `maybe_smudge_engr` @6732.

## 2026-07-13 15:35 — monster trapeffect_pit / make_corpse (D-0150)
- Objective: seed0015 @8499 `trapeffect_pit` (PROGRESS primary).
- C locus: `trap.c` `trapeffect_pit` (monster) / `thitm`;
  `mon.c` `monkilled`/`make_corpse`; `mkobj.c` `mkcorpstat`.
- Result: **verified** — Notes said hero pit; C provenance is pet
  `thitm(rnd(6))`. Ported monster PIT + death→`make_corpse`.
- Verification: seed0015 8499→8518; Scr 21/44; green+strict PASS;
  cohort 11 PASS; full **13/44** Scr **1276** RNG **126779**/792838.
- Next: seed0015 @8518 newt `m_move` track vs second `distfleeck`, or
  seed0101 `next_ident` / seed0030 `maybe_smudge_engr`.

## 2026-07-13 15:20 — ordinary > dodown/goto_level/getbones (D-0149)
- Objective: seed0015 ordinary `getbones` @2918 (PROGRESS primary).
- C locus: `do.c` `dodown`/`goto_level`; `dungeon.c` `next_level`;
  `bones.c` `getbones`; `dog.c` `keepdogs`/`losedogs`/`mon_arrive`;
  `mklev.c` special-room `rn2(u_depth)`.
- Result: **verified** — Notes said getbones arity; actual peel was
  unbound `>`. Ported stairs descent + pet migrate + dlvl2 shop chance
  roll. getbones stub already correct when reached.
- Verification: seed0015 2918→8499 (`trapeffect_pit`); Scr 20/44;
  green+strict PASS; cohort 1500/1800/0060 PASS; full **13/44** Scr
  **1275** RNG **126755**/792838.
- Next: seed0015 `dotrap`/`trapeffect_pit` @8499, or seed0101
  `next_ident` @2293 / seed0030 `maybe_smudge_engr` @6732.

## 2026-07-13 15:05 — random_engraving get_rnd_text ENGRAVEFILE (D-0148)
- Objective: seed0200 @1768 (PROGRESS primary `get_rnd_text`).
- C locus: `engrave.c` `random_engraving`; `rumors.c` `get_rnd_text`/
  `get_rnd_line`; `makedefs.c` `do_rnd_access_file`.
- Result: **verified** — `!rn2(4)` short-circuits past getrumor into
  ENGRAVEFILE chunk draw `rn2(2894)`; JS stub had re-called getrumor.
  Added `scripts/extract-engrave.py` (MAIL=1) + `get_rnd_text` export.
- Verification: seed0200 1768→3382; Scr 9→14/40; green+strict PASS;
  cohort 11/11 PASS; full **13/44** Scr **1275** RNG **121154**/792838.
- Next: seed0015 `getbones` @2918 (`rn2(3)` then makelevel) — prefer
  over seed0200 combat @3382 / seed0101 `next_ident` @2293 /
  seed0030 `maybe_smudge_engr` @6732.

## 2026-07-13 14:55 — occupied t_at + irregular somexy (D-0147)
- Objective: seed0200 @1672 (PROGRESS primary; NOTES said irregular
  somexy).
- C locus: `mklev.c` `occupied`; `mkroom.c` `somexy`/`inside_room`;
  caller `fill_ordinary_room` → `somexyspace` → `mkgold`.
- Result: **verified** — peel was missing `t_at` in `occupied` (gold
  landed on trap; C retried). Irregular-only theory falsified
  (`irreg=false` on that room). Also ported irregular `somexy`/
  `inside_room` for flood-fill rooms.
- Verification: seed0200 1672→1768; Scr 0→9/40; green+strict PASS;
  cohort 11/11 PASS; full **13/44** Scr **1268** RNG **118314**/792838.
- Next: seed0200 `random_engraving`/`get_rnd_text(ENGRAVEFILE)` @1768
  (C `rn2(2894)` vs JS stub `getrumor`/`rn2(2)`), or seed0015
  `getbones` @2918.

## 2026-07-13 14:50 — mksobj_init OIL_LAMP / TOOL lamps (D-0146)
- Objective: seed0015 `mksobj_init` @2513 (PROGRESS primary).
- C locus: `mkobj.c` `mksobj_init` TOOL_CLASS BRASS_LANTERN/OIL_LAMP;
  caller `u_init.c` `ini_inv(Lamp)`.
- Result: **verified** — port lamp age `rn1(500,1000)` +
  `blessorcurse(5)` and sibling charged TOOL cases (grease/crystal/
  horn/bag/bell/instruments). Candle `oc_cost` age + FIGURINE deferred.
- Verification: seed0015 2513→2918; Scr 1→20/44; green+strict PASS;
  cohort 11/11 PASS; full **13/44** Scr **1259** RNG **115572**/792838.
- Next: seed0200 irregular `somexy` @1672 (C retries edge/roomno;
  JS accepts first bbox cell), or seed0015 `getbones` @2918
  (C `rn2(3)` vs JS already in `makelevel`).

## 2026-07-13 14:42 — finddpos_shift irregular walk (D-0145)
- Objective: seed0015/0200 `dig_corridor` (PROGRESS primary).
- C locus: `mklev.c` `finddpos_shift` / `finddpos` / `join`;
  `sp_lev.c` `dig_corridor` (already ported).
- Result: **verified** — irregular rooms walk inward through
  STONE/CORR to a real wall doorpos; dig joins match C.
- Verification: seed0015 1284→2513; seed0200 1447→1672;
  green+strict PASS; cohort 11/11 PASS; full **13/44** Scr **1239**
  RNG **115097**/792838.
- Next: seed0015 `mksobj_init` @2513, or seed0200
  `fill_ordinary_room` @1672, or `next_ident` / `maybe_smudge_engr`.

## 2026-07-13 14:36 — Ghost themeroom_fill (D-0144)
- Objective: seed0015 Ghost `selection_rndcoord` / fill body (PROGRESS).
- C locus: `themerms.lua` Ghost; `selvar.c` `selection_from_mkroom`/
  `selection_rndcoord`; `sp_lev.c` `create_monster`/`create_object`/
  `find_montype`/`induced_align`; `makemon.c` `rndghostname`.
- Result: **verified** — Ghost fill places asleep/waiting ghost +
  percent not-blessed loot; `makemon` names ghosts.
- Verification: seed0015 357→1284; green+strict PASS; cohort PASS;
  full **13/44** Scr **1239** RNG **112442**/792838.
- Next: `dig_corridor` (seed0015 @1284 / seed0200 @1447), or
  `next_ident` / `maybe_smudge_engr`.

## 2026-07-13 14:28 — lspo_map themerms map rooms (D-0143)
- Objective: seed0015/0200 `lspo_map` (PROGRESS primary).
- C locus: `sp_lev.c` `lspo_map`/`mapfrag_*`/`lspo_region`;
  `mkmap.c` `flood_fill_rm`; `themerms.lua` map rooms +
  `filler_region` + `themeroom_fill` reservoir.
- Result: **verified** — map-shaped themerms call real `lspo_map`
  placement/load + `filler_region` irregular room; fill reservoir
  (bodies deferred). seed0015 337→357; seed0200 377→1447.
- Verification: green+strict PASS; cohort PASS sessions held; full
  **13/44** Scr **1240** RNG **111362**/792838.
- Next: Ghost `themeroom_fill`/`selection_rndcoord` (seed0015) or
  `dig_corridor` (seed0200); else `next_ident` / `maybe_smudge_engr`.

## 2026-07-13 14:16 — dochat wall + apply/eat getobj (D-0140/41/42)
- Objective: seed0105 Scr after D-0139 (PROGRESS primary).
- C locus: `sounds.c` `dochat`; `invent.c` `getobj`; `apply.c`
  `doapply`; `topl.c` `tty_yn_function`/`more`.
- Result: **verified** — wall/SDOOR talk pline; empty apply SUGGEST
  early-return; eat getobj missing-letter `continue` + NEED_MORE
  `--More--`. seed0105 **PASS**.
- Verification: seed0105 RNG 2499/2499 Scr 30/30; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017/0077/0106/0501/0105 PASS;
  full **13/44** Scr **1239** RNG **106907**/792838.
- Next: `lspo_map` (seed0015/0200) or `next_ident` (seed0101/0103);
  else `maybe_smudge_engr` / `getbones` prerequisite.

## 2026-07-13 14:10 — newsym S_engroom/S_engrcorr (D-0139)
- Objective: seed0105 bright-blue ASCII `` ` `` (PROGRESS primary).
- C locus: `display.c` `newsym`/`map_engraving`/`_map_location`;
  `engrave.h` `engraving_to_defsym`/`spot_shows_engravings`;
  `defsym.h` `S_engroom` (`` ` `` + CLR_BRIGHT_BLUE).
- Result: **verified** — vault niche engraving at (26,17); JS deferred
  glyphs and never set `erevealed` on cansee.
- Verification: seed0105 Scr **0→22**/30 (RNG full); remaining chat/eat;
  green+strict PASS; cohort PASS; full **12/44** Scr **1231** RNG
  **107134**.
- Next: seed0105 `#chat` `"It's like talking to a wall."` or eat/apply
  getobj desync; else `lspo_map` / `next_ident`.

## 2026-07-13 11:35 — skill_init + #enhance add_skills_to_menu (D-0122)
- Objective: seed0106 `#enhance` Scr @133 (PROGRESS primary; not offx).
- C locus: `weapon.c` `skill_init`/`add_skills_to_menu`/`enhance_weapon_skill`;
  `wintty.c` `tty_end_menu`/`process_menu_window` PICK_NONE; `u_init.c`
  `u_init_skills_discoveries`.
- Result: **verified** — stub corner menu was missing `skill_init` + real
  skill list; C fullscreen page `(1 of 2)` after invent→Basic / Skill_P.
- Verification: seed0106 Scr **253→254**/267; seed0107 Scr **35→36**;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS;
  full **10/44** Scr **1123→1125** RNG **104575**/792838.
- Next: seed0106 `#overview` features @165, or seed2200 `dokeylist` @184.

---

## 2026-07-13 11:25 — yn leave prompt + cleric doname (D-0121)
- Objective: seed0106 `#dip` yn @110 / garlic doname @116 (PROGRESS primary).
- C locus: `win/tty/topl.c` `tty_yn_function`; `objnam.c` `doname` + `!Role_if(PM_CLERIC)`.
- Result: **verified** — silent dipfountain case 16 left C yn prompt on
  topline; JS cleared `_pending_message` on answer. Garlic `"uncursed "`
  was priest BUC-always-known, not short_oname.
- Verification: seed0106 Scr **250→253**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **1120→1123** RNG **104575**/792838.
- Next: seed0106 `#enhance` menu offx @133, or seed2200 `dokeylist` @184.

---

## 2026-07-13 11:20 — newsym _map_location under visible monster (D-0120)
- Objective: seed0106 Scr @44 floor `)` vs `#` (PROGRESS primary).
- C locus: `display.c` `newsym` / `_map_location` (show=0 under mon).
- Result: **verified** — dart was on floor; pet stood on it while cansee
  then cell left dark-corridor sight; JS remembered terrain under
  monster instead of C object memory. Added `map_location_memory` on
  cansee+visible-monster arm only (hero/infrared arms regress seed0060).
- Verification: seed0106 Scr **49→250**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **919→1120** RNG **104575**/792838.
- Next: seed0106 `#dip` yn @110 / garlic doname @116, or seed2200
  `dokeylist` @184.

---

## 2026-07-13 11:05 — mthrowu canseemon/thitu + melee skip hit (D-0119)
- Objective: seed0106 Scr @46 dart combat topline (PROGRESS primary).
- C locus: `display.h` `_canseemon`; `mthrowu.c` `monshoot`/`thitu`;
  `zap.c` `exclam`; `uhitm.c` `hmon_hitmon_msg_hit`.
- Result: **verified** — JS `canseemon` used `couldsee` so printed
  throw while kobold off-screen; `thitu` lacked `an`/`exclam`/miss;
  melee always printed `You hit` before kill. Ported real canseemon,
  thitu messaging, skip hit-on-destroyed.
- Verification: seed0106 Scr **46→49**/267; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **916→919** RNG **104575**/792838.
- Next: seed0106 death-drop floor `)` glyph @44, or seed2200
  `dokeylist` @184 —
  `node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json`

---

## 2026-07-13 10:55 — obj_is_generic potion glyph (D-0118)
- Objective: seed0106 Scr @34 potion `!` yellow vs NO_COLOR (PROGRESS).
- C locus: `display.h` `obj_is_generic` / `obj_to_glyph`; contest
  nomux CLR_GRAY/BLACK → decoded NO_COLOR.
- Result: **verified** — falsified use_color-off; `!dknown` potions
  use GENERIC_POTION color; `tty_map_color` maps gray/black→NO_COLOR.
- Verification: seed0106 Scr **38→46**/267; green+strict PASS; cohort
  PASS; full **10/44** Scr **857→916** RNG **104575**; seed0030
  Scr **46→97**.
- Next: seed0106 dart hit pline @46, or seed2200 `dokeylist` @184 —
  `node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json`

---

## 2026-07-13 10:20 — extcmd AUTOCOMPLETE uniqueness (D-0117)
- Objective: seed0106 Scr @16 progressive `# c` paint (PROGRESS primary).
- C locus: `win/tty/getline.c` `ext_cmd_getlin_hook`; `cmd.c`
  `extcmds_match(ECM_NOFLAGS)` / `extcmdlist` AUTOCOMPLETE names.
- Result: **verified** — AC uniqueness uses full C AUTOCOMPLETE set
  (`EXT_CMD_AC`); runnable bodies stay in `EXT_CMDS`. `"c"`/`"ch"` no
  longer expand to `chat` (chat/chronicle/conduct).
- Verification: seed0106 Scr **34→38**/267; next @34 potion `!`
  color 11 vs NO_COLOR 8; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **853→857** RNG **104575**/792838.
- Next: seed0106 `iflags.use_color` / mapglyph color gate @34, or
  seed2200 `dokeylist` @184 —
  `node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json`

---

## 2026-07-13 09:35 — msg_window extract + ASCII/DEC symset (D-0114/15)
- Objective: seed2200/seed0106 Scr peels (PROGRESS primary).
- C locus: `optlist.h` `#if PREV_MSGS /*…*/`; `scripts/extract-optlist.py`
  `eval_expr`; `options.c`/`symbols.c` Primary vs DECgraphics;
  `display.c` `back_to_glyph` door `horizontal`.
- Result: **verified** — strip C comments in `#if` (msg_window descr);
  default ASCII walls/floors/open doors; DEC only when
  `symset:DECgraphics` / boolean DECgraphics.
- Verification: seed2200 Scr **200**/230; seed0106 Scr **32**/267;
  green+strict PASS; cohort PASS; full **10/44** Scr **851** RNG
  **104575**.
- Next: seed0106 screen 13 angrygods quote/`--More--` split, or
  seed2200 help `j` → `dokeylist` (after parked RC path @158).

## 2026-07-13 10:15 — angrygods verbalize + adjattrib You_feel (D-0116)
- Objective: seed0106 Scr @13 angrygods quote/`--More--` (PROGRESS).
- C locus: `pray.c` `angrygods` case 2/3; `pline.c` `verbalize`;
  `attrib.c` `adjattrib` msgflg≤0 → `You_feel`.
- Result: **verified** — bare `pline` for relearn + silent `adjattrib`
  skipped quotes and the `more()` forced by `You feel foolish!`.
  Ported `verbalize`/`You_feel`; async `adjattrib` messaging.
- Verification: seed0106 Scr **32→34**/267 (screens 13–15 match);
  next @16 progressive `# c`; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017/0077 PASS; full **10/44** Scr
  **853** RNG **104575**.
- Next: seed0106 progressive `# c` extcmd getline paint, or
  seed2200 `dokeylist` @184 —
  `node frozen/ps_test_runner.mjs sessions/seed0106-priest-extcmd-sweep.session.json`

## 2026-07-13 07:55 — askname + ParanoidPray (D-0102)
- Objective: seed0017 Scr peel (PROGRESS primary).
- C locus: `wintty.c` `tty_askname`/`tty_init_nhwindows`; `role.c`
  `plnamesuffix`; `pray.c` `dopray`; `topl.c` `tty_yn_function`;
  `options.c` default `paranoia_bits`.
- Result: **verified** — no-name sessions need copyright +
  `Who are you?` (do not `flush_screen`); default ParanoidPray yn.
  seed0017 **PASS**.
- Verification: seed0017 RNG **3465**/3465 Scr **67**/67 + strict;
  green+cohort PASS; full **9/44** Scr **718** RNG **91965**.
- Next: `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  or rng-diff seed0106 @ 2639.

## 2026-07-13 07:45 — #pray / prayer_done / angrygods (D-0101)
- Objective: seed0017 @ 3327 `prayer_done` (PROGRESS primary).
- C locus: `pray.c` `dopray`/`can_pray`/`prayer_done`/`gods_upset`/
  `angrygods`/`godvoice`; `cmd.c` `doextcmd` ECMD return.
- Result: **verified** — unbound `#pray`; `ublesscnt=300` → p_type 0
  → `rnz(250)`+`gods_upset`. Ported `js/pray.js` + `#pray` +
  `doextcmd` TIME; angrygods cases 0–3 (seed0106 case 2 godvoice).
- Verification: seed0017 RNG **3465**/3465 Scr **2**/67; seed0106
  **→2639**; green+strict PASS; cohort 1500/1800/0060/0102/0700/1150
  PASS; full **8/44** Scr **599** RNG **91965**.
- Next: seed0017 Scr peel or
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  @ 2639 `do_attack` / seed2200 Scr 199.

## 2026-07-13 07:40 — dog_goal gettrack (D-0099)
- Objective: seed0017 @ 3132 (PROGRESS primary); C typ dump first.
- C locus: `dogmove.c:dog_goal` gettrack; `track.c`; recorder dump
  `levl[30][4]=VWALL` (terrain hypothesis falsified).
- Result: **verified faithful change** — `js/track.js` + `settrack` in
  `allmain` + `dog_goal` gettrack/ogoal when `!couldsee`. Wantdoor
  `view_from` omitted (hero fallback).
- Verification: seed0017 **3132→3327**; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150 PASS; full **8/44** Scr **598** RNG
  **91540**.
- Next: `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
  — port `#pray`/`prayer_done` @ 3327.
- Note: Darwin recorder needs CRLF strip + minimal `sysconf` (no
  missing GDBPATH) before rerecord.

## 2026-07-13 07:30 — post-fill wallification + D-0099 refine
- Objective: seed0017 @ 3132 missing (30,4) (PROGRESS primary).
- C locus: `mklev.c` `themerooms_post_level_generate` / `do_room`;
  symptom `dog_move`/`mfndpos` cnt.
- Result: **verified faithful change** (D-0100) — `makelevel` calls
  full-map `wallification` after fill like C. **Also falsified**
  wallification / irregular themerms as (30,4) writer: themerms all
  `default`; prefix still **3132**; probe CORR@(30,4)→3142 only.
- Verification: green+strict PASS; cohort 1500/1800/0060/0102/0700/
  1150 PASS; full **8/44** Scr **598** RNG **91410**.
- Next: C `levl[30][4].typ` dump after mklev via
  `nethack-c/build-recorder.sh` — do not ship probes.

## 2026-07-13 07:15 — seed0017 (30,4) writer diagnosis (D-0099)
- Objective: seed0017 @ 3132 missing mfndpos neighbour (PROGRESS primary).
- C locus: `mklev.c` `do_room`/`dosdoor`/`dig_corridor`; symptom
  `dog_move`/`mfndpos` cnt at (30,5).
- Result: **falsified / refined** — no production change. Confirmed
  pet/goal/whappr; JS `(30,4)` only STONE→VWALL once; only
  `dosdoor(30,5)` on west wall; probe matrix (30,4)/(31,6)→3142 with
  (31,6) false positive (C HWALL `q`); (30,6) solid on C screen;
  RNG match through mklev rules out extra door/dig `rn2`.
- Verification: green+strict preflight PASS; focused rng-diff still
  **3132**; DIAG removed (checkout).
- Next: C typ dump of `levl[30][4]` after mklev, or compare JS stub
  vs C `themerooms_post_level_generate` / theme map side effects —
  `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`

## 2026-07-13 06:58 — dog_move mtrack nxti + seed0017 (30,4) diag
- C locus: `dogmove.c` `dog_move` mtrack → `goto nxti`; symptom
  seed0017 @ 3132 `mfndpos` cnt
- Result: **verified faithful change** (D-0098) — labeled `candloop`
  so mtrack skip continues the candidate loop like C. **Also**
  diagnosed D-0099: missing walkable map (30,4); room lx=31 matches
  C create_room; probe-only (30,4) → prefix 3142 (do not ship).
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/
  0700/1150 PASS; full **8/44** Scr **598** RNG **91410**; seed0017
  still **3132**.
- Next: `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
  — find C writer of map (30,4) typ (dig/join path vs JS).

## 2026-07-13 06:40 — seed1150 out-of-sight lit corridor (D-0096)
- Objective: seed1150 Scr 27/51 corridor `#` color (PROGRESS primary).
- C locus: `display.c:newsym` waslit + `S_litcorr`→`S_corr`;
  `reset_glyphmap` litcorr CLR_WHITE / S_corr CLR_GRAY→tty NO_COLOR.
- Result: **verified faithful change** — JS kept remembered white
  lit-corr when leaving sight; never set `waslit`. Visible
  `lit_corridor` stays white (seed0900). Rejected: blind always
  NO_COLOR under lit_corridor.
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/
  0700 PASS; seed1150 Scr 27→46/51 RNG full; full 7/44 Scr 593
  RNG 91471.
- Next: seed1150 invent/UI @38 —
  `node frozen/ps_test_runner.mjs sessions/seed1150-caveman-explore-move.session.json`

## 2026-07-13 06:50 — GemStone xname + volley + ^X (D-0097)
- Objective: seed1150 Scr 46/51 invent/UI @ screen 38 (PROGRESS).
- C locus: `objnam.c` GemStone/`xname_flags` GEM_CLASS;
  `dothrow.c` `throw_obj` xname/singular; `insight.c` gender omit
  + `magic_negation` Attributes; `mhitu.c` `magic_negation`.
- Result: **verified faithful change** — volley used doname; missing
  `" stone"`; ^X always printed gender; MC line absent. Ported
  GemStone/`xname`/`singular`, volley pline, distinct-`name.f`
  gender omit, Attributes warded via worn `a_can` (`oc_level`).
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/
  0700+1150 PASS; seed1150 PASS; full **8/44** Scr **598** RNG
  **91471**.
- Next: seed0017 @ 3132 mfndpos —
  `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
- Next: decode seed1150 screen 38 invent/UI, or
  `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`

## 2026-07-13 06:30 — seed1150 look_here + Monnam (D-0095)
- Objective: seed1150 Scr 22/51 first miss (PROGRESS primary).
- C locus: `hack.c:spoteffects` → `pickup.c:pickup`/`check_here` →
  `invent.c:look_here`; `do_name.c:Monnam`/`MGIVENNAME`.
- Result: **verified faithful change** — `domove` never called
  `spoteffects`; `!autopickup` needs `check_here`→`look_here`.
  Pet already `Slasher`; dogmove `Monnam` ignored given name.
  Rejected: corridor `#`→`NO_COLOR` (breaks seed0900).
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/
  0700 PASS; seed1150 Scr 22→27/51 RNG full; full 7/44 Scr 574
  RNG 91471.
- Next: seed1150 corridor `#` color without regressing seed0900,
  or `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`

## 2026-07-13 06:26 — seed1150 stackobj after throw (D-0094)
- C locus: `invent.c:stackobj`/`merged`/`mergable`; `dothrow.c:throwit`
- Result: **verified faithful change** — multishot flints merge on
  landing; `dog_goal` no longer double-`dogfood`s the pile.
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/0700
  PASS; seed1150 rng-diff OK 3137/3137 Scr 22/51; full 7/44 Scr 568
  RNG 91465
- Next: decode seed1150 first Scr miss, or
  `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`

## 2026-07-13 06:25 — seed1150 getdir more + multishot (D-0093)
- C locus: `cmd.c`/`topl.c` yn_function more-before-prompt;
  `dothrow.c` `throw_obj` / `multishot_class_bonus`
- Result: **verified faithful change** — `flush_topl_more` before
  getdir; Caveman sling volley `rnd(multishot)`. seed0017 room-shift
  theory falsified (display x−1).
- Verification: green+strict PASS; cohort seed1500/1800/0060/0102/0700
  PASS; seed1150 prefix 3032→3042 / pos 3070; full 7/44 Scr 568 RNG
  91398
- Next: `node scripts/rng-diff.mjs sessions/seed1150-caveman-explore-move.session.json`
  (extra obj_resists @ 3042)

## 2026-07-13 06:05 — seed0017 terrain + in_mk_themerooms (D-0092)
- C locus: `mklev.c` `makerooms` / `sp_lev.c` `check_room`
  (`gi.in_mk_themerooms`); symptom `dogmove.c` `dog_move` @ 3132
- Result: **verified faithful change** — set `game.in_mk_themerooms`
  during themerms generate so `check_room` aborts like C. seed0017
  peel **unchanged** (3132): JS room hx=35/east door 36 vs C east
  door 35 / walkable (30,4); DEC `~` is floor not pool.
- Verification: green + cohort PASS + strict; full **7/44**,
  Scr **568**/11405, RNG **91371**/792838.
- Next: `node scripts/rng-diff.mjs sessions/seed0017-samurai-altar-pray.session.json`
  — compare first-room `dx`/`xabs`/`split_rects` vs C east-door x
  (or seed1150 @ 3032 `throw_obj`).

## 2026-07-13 05:52 — seed2200 option_help (D-0091)
- C locus: `options.c` `option_help`/`next_opt`; `optlist.h`
  `allopt[]`; `cfgfiles.c` `get_configfile`
- Result: **verified faithful change** — help `g` lists
  booleans/compounds/others from extracted contest optlist;
  Scr **199**/230 (was 176). Screen 158 still differs only on
  recording `$HOME` RC path (do not hardcode).
- Verification: seed2200 3018/3018 Scr 199/230; green + cohort
  PASS + strict; full **7/44**, screens **568**/11405, RNG
  **91371**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed0017-samurai-altar-pray.session.json`
  — peel `dog_move` terrain @ 3132 (or seed1150).

## 2026-07-13 05:40 — seed2200 doextversion + quitchars + dowhatdoes (D-0088–90)
- C locus: `version.c` `doextversion` / `mdlib.c` `build_options`;
  `wintty.c` `dmore` → `xwaitforspace(quitchars)`; `pager.c`
  `dowhatdoes`/`dowhatdoes_core`/`whatdoes_help`; `cmd.c`
  `key2extcmddesc`/`key2txt`
- Result: **verified faithful change** — About options+Lua license
  pages; NHW_TEXT ignores non-quitchars; help `f` tip+prompt+
  inventory desc. seed2200 Scr **176**/230 (was 167).
- Verification: seed2200 3018/3018 Scr 176/230; green + cohort
  PASS + strict; full **7/44**, screens **545**/11405, RNG
  **91371**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `option_help` @ screen 158.

## 2026-07-13 05:25 — seed2200 look_all/look_engrs NHW_TEXT (D-0087)
- C locus: `pager.c` `look_all`/`look_engrs`/`self_lookat`/
  `look_at_monster`; `wintty.c` NHW_TEXT `process_text_window`;
  `objnam.c` STATUE xname; `display.c` newsym/`glyph_at`
- Result: **verified faithful change** — NHW_TEXT `--More--` on
  row 23; look_all MAP coords+glyph+shown-filter; statue `of a
  <pm>`; look_engrs remembered/obscured. seed2200 Scr **167**/230.
- Verification: seed2200 3018/3018 Scr 167/230; green + cohort
  PASS + strict; full **7/44**, screens **536**/11405, RNG
  **91379**/792838.
- Next: `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — peel `display_file`/license @ screen 110.

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

## 2026-07-13 — magic_map dark_room floors (D-0081)
- Objective: seed2200 Scr 11/230 screen 10 room · vs gray blank
  (PROGRESS primary after D-0080).
- C locus: `display.c` `magic_map_background` + `reglyph_darkroom`;
  `detect.c` `show_map_spot`/`do_mapping`.
- Result: **verified** — JS blanked `!waslit` ROOM floors as
  GLYPH_NOTHING; C `dark_room`+color keeps DARKROOMSYM≡S_room
  floor. Falsified whatis/overlay-clear theory for screen 10.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **380→458**/11405, RNG
  **91380**/792838; seed2200 Scr **11→89**/230.
- Next: seed2200 getpos tip @ screen 36 —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — or seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 — getpos tip nhl_text NHW_MENU corner (D-0082)
- Objective: seed2200 Scr 89/230 screen 36 tip geometry
  (PROGRESS primary after D-0081).
- C locus: `nhcore.lua` `show_getpos_tip` → `nhlua.c` `nhl_text`
  → NHW_MENU + `select_menu` PICK_NONE; `wintty.c` H2344 corner.
- Result: **verified** — JS blanked map + col-0 paint; C corner
  offx=9 / cursor [16,8] via same path as invent. Reused
  `paint_corner_nhw_menu`.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **458→459**/11405, RNG
  **91380**/792838; seed2200 Scr **89→90**/230.
- Next: seed2200 farlook stairs @ screen 46 —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — cite `lookat` cmap `S_brupstair` vs `stairs_description`;
  or seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 — farlook lookat stairs + getpos cursor (D-0083)
- Objective: seed2200 Scr 90/230 screen 46 farlook stairs
  (PROGRESS primary after D-0082).
- C locus: `pager.c` `lookat` cmap/`do_screen_description`;
  `display.c` `back_to_glyph` STAIRS + `known_branch_stairs`;
  `getpos.c` `auto_describe` firstmatch + curs-after-pline;
  `defsym.h` `S_brupstair`.
- Result: **verified** — tip used `stairs_description` Dlvl1
  path; flush reset getpos cursor to hero. Ported lookat
  stairs/wall/floor/self subset + DECgraphics floor/corridor
  describe; getpos sets cursor after flush.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **459→478**/11405, RNG
  **91380**/792838; seed2200 Scr **90→109**/230.
- Next: seed2200 getpos continue @ screen 65 —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — or seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 — getpos HJKLYUBN rush + truncate_to_map (D-0084)
- Objective: seed2200 Scr 109/230 screen 65 getpos continue
  (PROGRESS primary after D-0083).
- C locus: `getpos.c` `getpos` `movecmd(MV_RUN)`/`MV_RUSH` →
  `dx=8*u.dx` + `truncate_to_map`; `cmd.c` `highc`/`C(dirchars)`.
- Result: **verified** — capital `H` ignored by lowercase-only
  DIR map; C rushes 8 west (25,13)→(17,13). Ported rush/run +
  truncate. Falsified “ccp/tip drift after corridor look”.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **478→482**/11405, RNG
  **91380**/792838; seed2200 Scr **109→113**/230.
- Next: seed2200 checkfile pager @ screen 80 —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — or seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 05:18 — checkfile NHW_MENU + doname xname (D-0085/D-0086)
- Objective: seed2200 Scr 113/230 screen 80 checkfile pager
  (PROGRESS primary after D-0084).
- C locus: `pager.c` `checkfile` → NHW_MENU `putstr` /
  `wintty.c` `process_text_window` + `hacklib.c` `tabexpand`;
  `objnam.c` `xname` SCR/SPE/RIN/WAN + `doname` W_WEP
  `bimanual`/`oc_big`; extractor `oc_big`.
- Result: **verified** — checkfile used fullscreen TEXT; `\r` in
  data.base shifted offx. Invent pick used enum-token bases and
  ignored bimanual. Ported NHW_MENU text window + class `… of`
  names + `(weapon in hands)`.
- Verification: green + seed1500/1800/0060/0102/0700 PASS +
  strict; full **7/44**, screens **482→486**/11405, RNG
  **91380**/792838; seed2200 Scr **113→117**/230.
- Next: seed2200 look_all `m` @ screen 87 —
  `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — cite look_all morestr/cursor vs `show_text_pages`; or
  seed0017 @ 3132 terrain / seed1150 `dog_move`.

## 2026-07-13 — `#chat` / dochat / domonnoise MS_BARK (D-0103)
- Objective: seed0106 @ 2639 apparent `do_attack` (PROGRESS primary).
- C locus: `sounds.c` `dotalk`/`dochat`/`domonnoise` MS_BARK;
  extcmdlist `"chat"`.
- Result: **verified** — unbound `#chat` made getdir `l` a real
  east move → `distfleeck` `rn2(5)`; C chats empty then `h` into
  pet → `do_attack` `rn2(7)`. Ported empty-chat + dog bark.
  Falsified “incomplete do_attack” as the peel cause.
- Verification: seed0106 prefix **2639→2713**; green+strict PASS;
  cohort 1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44**
  Scr **718** RNG **91887**/792838.
- Next: seed0106 @ 2713 `kick_door`/`exercise` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — kick_door CLOSED/LOCKED bust (D-0104)
- Objective: seed0106 @ 2713 kick_door/exercise (PROGRESS primary).
- C locus: `dokick.c` `kick_door`; `attrib.c` `exercise`; `rnd.c` `rnl`.
- Result: **verified** — JS closed-door path used `kick_ouch`
  (`exercise(FALSE)` → `rn2(2)`); C `exercise(A_DEX,TRUE)` +
  `rnl(35)` bust / crash / Thwack. Ported CLOSED/LOCKED envelope.
- Verification: seed0106 prefix **2713→2912**; positional
  **2784→3159**/4194; green+strict PASS; cohort 1500/1800/0060/
  0102/0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **92262**/792838.
- Next: seed0106 @ 2912 `monmulti`/`mthrowu` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — thrwmu / monmulti move-then-shoot (D-0105)
- Objective: seed0106 @ 2912 monmulti/m_throw (PROGRESS primary).
- C locus: `monmove.c` `dochug`; `mhitu.c` `mattacku`; `mthrowu.c`
  `thrwmu`/`monmulti`/`m_throw`/`thitu`; `weapon.c` `select_rwep`/
  `dmgval`; `dothrow.c` `should_mulch_missile`; `invent.c` `delobj`.
- Result: **verified** — JS returned early on `MMOVE_MOVED` and gated
  attacks on `nearby`; C move-then-shoots when `!nearby && AT_WEAP`.
  Ported ranged `mattacku`→`thrwmu` envelope.
- Verification: seed0106 prefix **2912→2962**; positional
  **3159→3217**/4194; green+strict PASS; cohort 1500/1800/0060/
  0102/0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **92304**/792838.
- Next: seed0106 @ 2962 melee `mattacku`/`hitmu` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — mattacku melee / hitmu (D-0106)
- Objective: seed0106 @ 2962 mattacku melee (PROGRESS primary).
- C locus: `mhitu.c` `mattacku` AT_WEAP `!range2` / `hitmu` /
  `hitmsg` / `mdamageu`; `uhitm.c` `mhitm_ad_phys` (mhitu);
  `uhitm.c` `mhitm_knockback`.
- Result: **verified** — JS only did `thrwmu` when `range2`;
  adjacent kobold (dart spent) needs melee `rnd(20)` → bare
  `hitmu` `d(1,4)` + knockback RNG. Ported HTH + AT_WEAP melee
  envelope and `hitmu` subset.
- Verification: seed0106 prefix **2962→2982**; positional
  **3188**/4194; green+strict PASS; cohort 1500/1800/0060/
  0102/0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **92375**/792838.
- Next: seed0106 @ 2982 `hitum` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — hitum / hero melee / xkilled (D-0107)
- Objective: seed0106 @ 2982 hitum hero melee (PROGRESS primary).
- C locus: `hack.c` `overexertion` → `eat.c` `gethungry`; `uhitm.c`
  `do_attack` / `hitum` / `known_hitum` / `find_roll_to_hit` / `hmon`;
  `weapon.c` `dmgval`/`abon`; `mon.c` `killed`/`xkilled`/`corpse_chance`.
- Result: **verified** — hostile `do_attack` stubbed `return true` with
  no combat RNG so monsters still `distfleeck`'d; C
  `overexertion`→`gethungry`→`exercise(STR)`→`hitum` `rnd(20)`→
  `dmgval`→`xkilled`. Ported that envelope + melee OC_WSDAM.
- Verification: seed0106 prefix **2982→2993**; positional
  **3201**/4194; green+strict PASS; cohort 1500/1800/0060/
  0102/0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **92300**/792838.
- Next: seed0106 @ 2993 post-kill `dog_goal` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — mondead/relobj death minvent (D-0108)
- Objective: seed0106 @ 2993 post-kill dog_goal (PROGRESS primary).
- C locus: `mon.c` `mondead` → `m_detach(due_to_death)` →
  `steal.c` `relobj(mtmp, 1, FALSE)`; `dogmove.c` `dog_goal` `fobj`.
- Result: **verified** — kill created no treasure/corpse
  (`rn2(6)=2`/`rn2(3)=2`); C still dropped kobold minvent onto
  `fobj`, yielding a second APPORT `rn2(8)`. JS `mondead` omitted
  `relobj`. Added `relobj_on_death` and wired both hero/pet
  `mondead` paths.
- Verification: seed0106 prefix **2993→4097** (`dipfountain`);
  positional **4114**/4194; green+strict PASS; cohort
  1500/1800/0060/0102/0700/1150/0017 PASS; full **9/44** Scr
  **718** RNG **93214**/792838.
- Next: seed0106 @ 4097 `dipfountain` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — #sit + #dip / dipfountain (D-0109)
- Objective: seed0106 @ 4097 `dipfountain` (PROGRESS primary).
- C locus: `sit.c` `dosit`; `potion.c` `dodip`; `fountain.c`
  `dipfountain`/`dryup`; `trap.c` `water_damage`; `objnam.c`
  holy-water naming.
- Result: **verified** — unbound `#dip` let `y` move; also needed
  `#sit` one turn earlier (`Having fun sitting on the fountain?` +
  ECMD_TIME). Fountain dip of holy water: `water_damage` force →
  ER_NOTHING → `rnd(30)` → `dryup`. Ported sit/dip/fountain +
  water_damage subset + holy-water doname.
- Verification: seed0106 prefix **4097→4141**; positional
  **4145**/4194; green+strict PASS; cohort 1500/1800/0060/
  0102/0700/1150/0017 PASS; full **9/44** Scr **718** RNG
  **93267**/792838.
- Next: seed0106 @ 4141 `#offer`/`#enhance`/`#annotate` —
  `node scripts/rng-diff.mjs sessions/seed0106-priest-extcmd-sweep.session.json`
  — or seed2200 Scr 199 / seed0077 `player_selection`.

## 2026-07-13 — #offer/#enhance/#annotate/#overview/#version (D-0110)
- Objective: seed0106 @ 4141 extcmd key ownership through `#version`
  (PROGRESS primary).
- C locus: `pray.c` `dosacrifice`; `weapon.c` `enhance_weapon_skill`;
  `dungeon.c` `donamelevel`/`query_annotation`/`dooverview`;
  `version.c` `doextversion` / `nhlua.c` `get_lua_version`.
- Result: **verified** — unbound `#enhance` ESC / `#annotate` getlin /
  `#overview` ESC leaked as moves (`rn2(5)`) while C reached
  `#version` nhlib `rn2(3)`+`rn2(2)`. Ported not-on-altar offer,
  enhance PICK_NONE ESC, annotate getlin + lazy mapseen, overview
  PICK_NONE, and wired `#version`→exported `doextversion`.
- Verification: seed0106 RNG **4194**/4194 Scr **5**/267; strict
  lengths PASS; green+strict PASS; cohort 1500/1800/0060/0102/
  0700/1150/0017 PASS; full **9/44** Scr **722** RNG
  **93316**/792838.
- Next: seed0106 Scr residual / seed2200 Scr 199 /
  seed0077 `player_selection`.

## 2026-07-13 — player_selection / genl_player_setup (D-0111)
- Objective: seed0077 after askname needs interactive chargen
  (PROGRESS primary preference).
- C locus: `role.c` `genl_player_setup` / `rigid_role_checks` /
  `pick_align` / `ok_*` / `plsel_startmenu`; `wintty.c`
  `tty_player_selection`; H2344 fullscreen menus.
- Result: **verified** — missing `player_selection` skipped
  `pick_align` `rn2(1)` before `o_init`. Ported Shall I pick +
  role/race/gender/align menus + confirm; roles/races allow masks;
  invent fullscreen NHW_MENU + no botl during `in_role_selection`.
- Verification: seed0077 prefix **100→1475** Scr **6→11**/33;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017
  PASS; full **9/44** Scr **746** RNG **101108**/792838.
- Next: seed0077 @ 1465 themerms/`rnd_rect` —
  `node scripts/rng-diff.mjs sessions/seed0077-rogue-chargen.session.json`
  — or seed2200 Scr 199 / seed0106 Scr.

## 2026-07-13 09:12 — do_vault create_vault fallback (D-0112)
- Objective: seed0077 @ 1465 `rnd_rect` (PROGRESS primary).
- C locus: `mklev.c` `makelevel` vault `do_vault` /
  `create_vault`; `sp_lev.c` `create_room` vault trycnt.
- Result: **verified** — after niches, vault `check_room` fails then
  C runs `rnd_rect() && create_vault()` (102× `rnd_rect` with
  `rect_cnt=1`). JS stubbed a single `rnd_rect()` burn and skipped
  the trycnt loop. Ported real fallback + re-check / `hx=-1`.
- Verification: seed0077 RNG **3242**/3242 Scr **19**/33 + strict;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017
  PASS; full **9/44** Scr **759** RNG **104563**/792838.
- Next: seed0077 Scr residual (first mismatch after chargen) /
  seed2200 Scr 199 / seed0106 Scr.

## 2026-07-13 — door recalc_block_point + pick_lock + DEC open-door (D-0113)
- Objective: seed0077 Scr residual after D-0112 (PROGRESS primary).
- C locus: `vision.c` `recalc_block_point`; `lock.c` `doopen_indir` /
  `pick_lock` doormask switch; `dat/symbols` DECgraphics
  `S_hodoor`/`S_vodoor` meta-a; tty Shall-I-pick NO_COLOR.
- Result: **verified** — open door left `viz_clear` blocked
  (`vision_recalc` alone); `pick_lock` stubbed every door as
  "no door"; open-door glyph was ASCII `|` vs DEC `a`; Shall-I-pick
  used color 0. Ported `recalc_block_point`→`vision_reset`, ISOPEN
  pline, DEC open-door, NO_COLOR prompt.
- Verification: seed0077 **PASS** 3242/3242 Scr 33/33 + strict;
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017 PASS;
  full **10/44** Scr **788** RNG **104575**/792838.
- Next: seed2200 Scr 199 (RC path @158) / seed0106 Scr 5.

## 2026-07-13 — overview lastseentyp / print_mapseen features (D-0123)
- Objective: seed0106 Scr @165 `#overview` feature lines (PROGRESS primary).
- C locus: `dungeon.c` `update_lastseentyp`/`recalc_mapseen`/`print_mapseen`
  (TAB vs PREFIX); `display.c` `_map_location`/`magic_map_background`.
- Result: **verified** — overview omitted OF_INTEREST (`A fountain.`)
  because lastseentyp was never filled; Level used PREFIX(6) not TAB(3)
  so H2344 offx drifted once the feature line existed. Ported
  lastseentyp update on cansee map + recalc feat counts + overview
  feature sentence.
- Verification: seed0106 Scr **254→255**/267 (next `#chronicle` @188);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **1126** RNG **104575**/792838.
- Next: seed0106 `#chronicle` @188 — or seed2200 `dokeylist` @184.

## 2026-07-13 — #chronicle do_gamelog / show_gamelog (D-0124)
- Objective: seed0106 Scr @188 `#chronicle` Logged events (PROGRESS primary).
- C locus: `insight.c` `do_gamelog`/`show_gamelog`; `pline.c` `gamelog_add`/`livelog_printf`;
  welcome/pray/losexp/`first_weapon_hit`/`xkilled` writers.
- Result: **verified** — `#chronicle` was AC-only; no gamelog list. Ported
  append + NHW_TEXT show + five seed0106 events (enter dungeon, atheism,
  lost xp, first weapon hit before kill).
- Verification: seed0106 Scr **255→257**/267 (next `#conduct` @199);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **1128** RNG **104575**/792838.
- Next: seed0106 `#conduct` @199 — or seed2200 `dokeylist` @184.

## 2026-07-13 — #conduct doconduct / show_conduct (D-0125)
- Objective: seed0106 Scr @199 `#conduct` Voluntary challenges (PROGRESS primary).
- C locus: `insight.c` `doconduct`/`show_conduct`/`enlght_line`/`num_genocides`/
  `sokoban_in_play`; `dog.c` `initedog` `u.uconduct.pets++`.
- Result: **verified** — `#conduct` was AC-only; no runner. Ported NHW_MENU
  conduct list (present-tense enl_msg + contractions) and pets++ so petless
  is correctly omitted after starting pet.
- Verification: seed0106 Scr **257→259**/267 (next `#vanquished` @213);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS;
  full **10/44** Scr **1130** RNG **104575**/792838.
- Next: seed0106 `#vanquished` @213 — or seed2200 `dokeylist` @184.

## 2026-07-13 — #vanquished list_vanquished + mvitals.died + empty #genocided (D-0126)
- Objective: seed0106 Scr @213 `#vanquished` Vanquished creatures (PROGRESS primary).
- C locus: `insight.c` `dovanquished`/`list_vanquished`/`vanqsort_cmp`/
  `dogenocided`/`list_genocided`; `mon.c` `mondead` `mvitals[].died++`.
- Result: **verified** — `#vanquished`/`#genocided` were AC-only; `mondead`
  never bumped `mvitals.died`. Ported census + traditional-sort NHW_MENU
  (an()/pfx + total) and empty genocided pline.
- Verification: seed0106 Scr **259→262**/267 (next `#adjust` @235);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS;
  full **10/44** Scr **1133** RNG **104575**/792838.
- Next: seed0106 `#adjust` @235 — or seed2200 `dokeylist` @184.

## 2026-07-13 — #adjust doorganize (D-0127)
- Objective: seed0106 Scr @235 `#adjust` (PROGRESS primary).
- C locus: `invent.c` `doorganize`/`doorganize_core`/`adjust_ok`/`compactify`;
  `cmd.c` extcmd `#adjust`.
- Result: **verified** — `#adjust` was AC-only; no runner. Ported
  getobj suggest non-gold, destination letter list (blank used
  non-mergable + compactify), Esc Never mind, and move/collect/
  swap/merge without count-split.
- Verification: seed0106 Scr **262→264**/267 (next `#terrain` @253);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **1135** RNG **104575**/792838.
- Next: seed0106 `#terrain` @253 — or seed2200 `dokeylist` @184.

## 2026-07-13 — #terrain doterrain View which? (D-0128)
- Objective: seed0106 Scr @253 `#terrain` (PROGRESS primary).
- C locus: `cmd.c` `doterrain`; `detect.c` `reveal_terrain`/`browse_map`;
  contest nomux selected → `*`.
- Result: **verified** — `#terrain` was AC-only; no runner. Ported
  View which? PICK_ONE (a/b/c + explore/wizard extras), Esc cancel,
  and partial `reveal_terrain` (impairment + Showing pline + browse_map
  + docrt; getglyph rewrite deferred).
- Verification: seed0106 Scr **264→265**/267 (next `+` spells @257);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **1136** RNG **104575**/792838.
- Next: seed0106 Priest `initialspell`/`dovspell` @257 — or seed2200
  `dokeylist` @184.

## 2026-07-13 — initialspell + dovspell VIEW + age_spells (D-0129)
- Objective: seed0106 Scr @257 `+` spells menu (PROGRESS primary).
- C locus: `spell.c` `initialspell`/`dovspell`/`dospellmenu`/
  `percent_success`/`spellretention`/`age_spells`; `u_init.c`
  `ini_inv_use_obj`; `role.c` Role `spel*`; `allmain.c` moveloop.
- Result: **verified** — SPBOOK kit never called `initialspell`; stub
  `dovspell`. Ported spl_book + roles `spel*` + Fail%/Retention VIEW
  menu + per-turn `age_spells`; capture `serialize_for_scoring` keeps
  leading inverse spaces; fullscreen leading pad attr 0.
- Verification: seed0106 Scr **265→266**/267 (next `^X` @261);
  green+strict PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077
  PASS; full **10/44** Scr **1139** RNG **104575**/792838;
  seed2200 Scr **201**/230.
- Next: seed0106 `doattributes` article/uexp/Pw @261 — or seed2200
  `dokeylist` @184.

## 2026-07-13 — kill XP + doattributes an/Pw (D-0130)
- Objective: seed0106 Scr @261 `^X`/`doattributes` (PROGRESS primary).
- C locus: `exper.c` `experience`/`more_experienced`/`newuexp`/
  `newexplevel`; `mon.c` `xkilled` cleanup; `insight.c`
  `background_enlightenment`/`basics_enlightenment`; `objnam.c` `an`;
  `monsters.h` mattk extract.
- Result: **verified** — `xkilled` never awarded XP (`uexp` stayed 0;
  kobold kill = 6). Attributes hardcoded `a` + `both energy`. Ported
  full mattk extract + experience path + C article/HP/Pw phrasing.
- Verification: seed0106 **PASS** (4194/4194 Scr 267/267); green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077 PASS; full
  **11/44** Scr **1141** RNG **104575**/792838; seed2200 Scr **202**/230.
- Next: seed2200 `dokeylist` @184.

## 2026-07-13 — dokeylist + show_menu_controls + usagehlp blank (D-0131)
- Objective: seed2200 Scr @184 help `j` Full Current Key Bindings
  (PROGRESS primary).
- C locus: `cmd.c` `dokeylist`/`keylist_putcmds`/`show_direction_keys`/
  `commands_init`+`reset_commands` (N_DIRS=8); `options.c`
  `show_menu_controls`; `pager.c` `domenucontrols`/`docontact`;
  `display_file` trailing blank.
- Result: **verified** — help `j`/`l`/`o` were stubs. Extracted
  extcmdlist; ported dokeylist + menu controls + contact; fixed
  `display_file` over-stripping so usagehlp keeps empty final page.
- Verification: seed2200 Scr **202→227**/230 (RNG full); remaining
  @158 RC path, @222 disco `*` books, @229 Elbereth `:`; green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077/0106 PASS;
  full **11/44** Scr **1166** RNG **104575**/792838.
- Next: seed2200 disco @222 / Elbereth `:` @229.

## 2026-07-13 — skill_based_spellbook_id + read_engr_at (D-0132/33)
- Objective: seed2200 disco `*` spellbooks @222 + Elbereth `:` @229
  (PROGRESS primary after D-0131).
- C locus: `spell.c` `skill_based_spellbook_id`; `weapon.c` `skill_init`
  (spelspec unrestrict); `engrave.c` `read_engr_at`; `invent.c`
  `look_here`; `pickup.c` `check_here`.
- Result: **verified** — Wizard skill-ID books (`discover_object` known,
  not encountered → `*`); `:` look reads DUST Elbereth via `read_engr_at`.
- Verification: seed2200 Scr **227→229**/230 (cursors full; sole miss
  parked RC @158); green+strict PASS; cohort 1500/1800/0060/0102/0700/
  1150/0017/0077/0106 PASS; full **11/44** Scr **1169** RNG
  **104575**/792838.
- Next: seed0501/0105 `wipeout_text` / seed0015/0200 `lspo_map` /
  seed0101 `next_ident` / `getbones` (blocked on `^V`/`makemaz`).

## 2026-07-13 — makeniche wipe_engr_at / wipeout_text (D-0134)
- Objective: seed0501/0105 `wipeout_text` mklev peel (PROGRESS primary).
- C locus: `mklev.c` `makeniche`/`makevtele` trap_engravings;
  `engrave.c` `wipe_engr_at`/`wipeout_text`/`make_engr_at`.
- Result: **verified** — vault TELEP_TRAP niche omitted
  `make_engr_at("ad aerarium", DUST)` + `wipe_engr_at(5)`; ported
  wipeout/wipe_engr and wired trap_engravings in makeniche.
- Verification: seed0501 prefix **1153→2205** (`spelleffects_check`);
  seed0105 RNG **2499**/2499 Scr **0**/30; green+strict PASS; cohort
  1500/1800/0060/0106 PASS; full **11/44** Scr **1176** RNG
  **107102**/792838.
- Next: seed0501 `spelleffects_check` @ 2205 / seed0105 Scr /
  seed0015 `lspo_map` / seed0101 `next_ident`.

## 2026-07-13 — Z / docast / SPE_HEALING self-zap (D-0135)
- Objective: seed0501 `spelleffects_check` @ 2205 (PROGRESS primary).
- C locus: `spell.c` `docast`/`getspell`/`spelleffects_check`/`spelleffects`;
  `zap.c` `zapyourself`; `potion.c` `healup`; `eat.c` `morehungry`.
- Result: **verified** — `Z` was unbound; ported CAST menu + check +
  SPE_HEALING self-zap (`.` = getdir self); energy/`rnd(100)`/`mksobj`/
  `healup(d(6,4))` match C.
- Verification: seed0501 prefix **2205→2217** (`dog_move`); Scr
  **6→10**/28; green+strict PASS; cohort 1500/1800/0060/0106 PASS;
  full **11/44** Scr **1180** RNG **107116**/792838.
- Next: seed0501 `dog_move` @ 2217 / seed0105 Scr / `lspo_map` /
  `next_ident`.

## 2026-07-13 — study_book known-refresh + ^X Priestess (D-0136/37)
- Objective: seed0501 @ 2217 looked like `dog_move` (PROGRESS primary).
- C locus: `spell.c` `study_book`; `read.c` `doread`; `insight.c`
  attributes title/role_titl.
- Result: **verified** — stubbed SPBOOK `doread` leaked `y#turn\rn` as
  movement (false dog_move peel). Ported known-refresh `--More--`/yn;
  ^X uses female `name.f`/`rank.f`.
- Verification: seed0501 **PASS** (RNG 2238/2238 Scr 28/28); green+strict
  PASS; cohort 1500/1800/0060/0102/0700/1150/0017/0077/0106/0501 PASS;
  full **12/44** Scr **1198** RNG **107134**/792838.
- Next: seed0105 Scr / seed0015 `lspo_map` / seed0101 `next_ident`.

## 2026-07-13 — roles name.f=null + welcome gender gate (D-0138)
- Objective: seed0105 Scr (PROGRESS primary; RNG already full).
- C locus: `role.c` roles[] `name.f`; `allmain.c` `welcome`.
- Result: **verified** — JS had `name.f='Valkyrie'` (C has 0) and
  treated `f===m` as add-gender; C adds gender only for `!name.f` +
  both-genders allow. Fixed null `name.f`, C welcome gate, `urole.allow`
  copy. seed0105 welcome matches; Scr still **0**/30 on bright-blue
  ASCII `` ` `` at ~(26,17) with no JS object/pool there.
- Verification: green+strict PASS; cohort PASS; seed0501 PASS; full
  **12/44** Scr **1198** RNG **107134**/792838.
- Next: seed0105 `` ` `` glyph / seed0015 `lspo_map` /
  seed0101 `next_ident`.

## 2026-07-13 — STETHOSCOPE + eat touchfood split (D-0155)
- Objective: seed0016 eat `next_ident` @2493 (PROGRESS primary).
- C locus: `apply.c` `use_stethoscope`; `insight.c` `ustatusline`/
  `piousness`; `eat.c` `touchfood`/`doeat`/`fprefx`/`lesshungry`.
- Result: **verified** — rng-diff looked like missing eat split, but JS
  rejected STETHOSCOPE so `.` became `donull` and burned `mcalcmove`
  before `e`/`j`. Ported free first-use stethoscope self→`ustatusline`
  plus reqtime-1 `touchfood`→`splitobj`→`next_ident` (Macintosh APPLE).
- Verification: seed0016 prefix **2493→2551** (`zapyourself`); Scr
  **6→15**/36; green+strict PASS; cohort 1500/1800/0060/0105 PASS;
  full **13/44** Scr **1302** RNG **127080**/792838.
- Next: seed0016 `zapyourself` @2551 / seed0015 Scr @21 /
  seed0030 `maybe_smudge_engr` / seed0101 Scr residual.

## 2026-07-13 — mhitm mondied make_corpse (D-0167)
- Objective: seed0030 `next_ident` @10584 (PROGRESS primary).
- C locus: `mon.c` `mondied`/`make_corpse`; `mkobj.c` `mkcorpstat`/
  `next_ident`; `mhitm.c` death after knockback.
- Result: **verified** — JS mhitm burned `corpse_chance` only; on
  success C `make_corpse`→`next_ident` `rnd(2)`, JS hit `grow_up`
  `rnd(m_lev+1)`=`rnd(1)`. Ported ordinary default_1 `make_corpse`
  into mhitm `mondied` (trap path already had it).
- Verification: seed0030 prefix **10584→10608** (`obj_resists`);
  positional **10939**/105529 Scr **110**/1953; green+strict PASS;
  cohort 1500/1800/0060/0015/0106 PASS; full **15/44** Scr **1347**
  RNG **131959**/792838.
- Next: seed0030 `obj_resists` @10608 / seed0101 Scr residual /
  seed0200 combat @3382.

## 2026-07-13 — m_move meating before dog_move (D-0169)
- Objective: seed0030 @10620 distfleeck vs `rn2(4)` (PROGRESS primary).
- C locus: `monmove.c` `m_move` meating countdown; `dogmove.c`
  `finish_meating`.
- Result: **verified** — after `dog_eat` set `meating`, C returns
  `MMOVE_DONE` before `dog_move` (two `distfleeck` only). JS skipped
  the gate and hit `dog_goal` follow `!rn2(4)`. Ported meating + moved
  `mtrapped` before pet path.
- Verification: seed0030 prefix **10620→10803**; positional
  **11133**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **132144**/792838.
- Next: seed0030 @10803 (`hmon_hitmon_stagger`) / seed0101 Scr residual /
  seed0200 combat @3382.

## 2026-07-13 — unarmed hmon_hitmon_stagger rnd(100) (D-0170)
- Objective: seed0030 @10803 `hmon_hitmon_stagger` (PROGRESS primary).
- C locus: `uhitm.c` `hmon_hitmon` / `hmon_hitmon_stagger`;
  `mondata.h` `bigmonst`/`thick_skinned`.
- Result: **verified** — after barehands `rnd(2)=2` (`dmg > 1`), C
  burns `rnd(100)` in stagger before damage/`xkilled`. JS skipped to
  `rn2(6)`. Ported unarmed gate + stagger `rnd(100)` + skill/size/hide
  checks; stun pline/`mhurtle_to_doom` deferred.
- Verification: seed0030 prefix **10803→10861**; positional
  **11206**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **132236**/792838.
- Next: seed0030 @10861 (`nhlib.lua` shuffle after `getbones`) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — Mines fill_lvl / makemaz(minefill) (D-0171)
- Objective: seed0030 @10861 nhlib shuffle after getbones (PROGRESS primary).
- C locus: `mklev.c` `makelevel` fill_lvl → `makemaz` → `minefill.lua`
  / `splev_initlev` / `mkmap.c`; `dungeon.c` `flags.align` 3-bit.
- Result: **verified** — JS entered Mines (`dnum=2`) but ignored
  `fill_lvl`, burning ordinary Medusa `rn2(5)`. Ported makelevel
  dispatch + JS minefill (`mkmap` + stairs/objects/monsters/traps) and
  `flags.align = dgn_align & 7` (C truncates `D_ALIGN_LAWFUL=0x40`→0).
- Verification: seed0030 prefix **10861→12757**; positional
  **13100**/105529 Scr **168**/1953; green+strict PASS; cohort
  1500/1800/0060/0015 PASS; full **15/44** Scr **1405** RNG
  **134130**/792838.
- Next: seed0030 @12757 (`m_initweap` gnome) / seed0101 Scr residual /
  seed0200 combat @3382.

## 2026-07-13 — race hatemask / M2 bits + S_GNOME m_initinv (D-0172)
- Objective: seed0030 @12757 C `rnd(14) @ m_initweap` vs JS `rn2(16)`
  (PROGRESS primary).
- C locus: `role.c` races[] hatemask/lovemask; `mondata.h`
  `race_hostile`; `makemon.c` `peace_minded` / `m_initinv` S_GNOME;
  `scripts/extract-monsters.py` M2_FLAGS.
- Result: **verified** — not a weapon-envelope bug. Human hates gnome
  so C skips co-align `rn2(16)`; JS lacked hatemask and extractor
  zeroed `M2_GNOME`. Ported race masks + `peace_minded` race_* +
  regenerated mflags2 race bits + S_GNOME candle `rn2(20)`.
- Verification: seed0030 prefix **12757→12907**; positional
  **13718**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135175**/792838.
- Next: seed0030 @12907 (`induced_align` rn2(3) vs rn2(2)) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — NAMS pmnames / name_to_monplus gender (D-0173)
- Objective: seed0030 @12907 C `rn2(3) @ induced_align` vs JS `rn2(2)`
  (PROGRESS primary).
- C locus: `monst.c` NAM/NAMS → `pmnames[]`; `mondata.c`
  `name_to_monplus`; `sp_lev.c` `find_montype`; extractor
  `scripts/extract-monsters.py`.
- Result: **verified** — not an induced_align bug. `"gnome lord"`
  lacked NAMS male pmname so matched `"gnome"` and burned
  `find_montype` `rn2(2)`. Extracted pmnames + gender-aware
  `name_to_monplus`/`find_montype`.
- Verification: seed0030 prefix **12907→12968**; positional
  **13313**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134770**/792838.
- Next: seed0030 @12968 (`likes_gold`/`mkmonmoney` rn2(5)) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — likes_gold / mkmonmoney m_initinv (D-0174)
- Objective: seed0030 @12968 C `rn2(5) @ m_initinv` vs JS `rn2(100)`
  (PROGRESS primary).
- C locus: `mondata.h` likes_gold; `steal.c` findgold; `makemon.c`
  mkmonmoney / m_initinv trailing gold; `monflag.h` M2_GREEDY.
- Result: **verified** — not peace_minded. GREEDY dwarves need
  `!rn2(5)` after defensive/misc; JS deferred likes_gold. Ported
  likes_gold + findgold + mkmonmoney.
- Verification: seed0030 prefix **12968→13007**; positional
  **13339**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **134796**/792838.
- Next: seed0030 @13007 (`induced_align` rn2(3) vs rn2(9)) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — minefill create_monster/create_trap (D-0175/D-0176)
- Objective: seed0030 @13007 C `rn2(3) @ induced_align` vs JS `rn2(9)`
  (PROGRESS primary).
- C locus: `sp_lev.c` `create_monster`/`create_trap` → `mktrap`
  (`mklev.c` traptype retry + victim).
- Result: **verified** — not induced_align itself. Class-letter minefill
  called `mkclass` before amask; then `splev_create_trap` skipped
  NO_TRAP retry and victim `rnd(4)`. Reordered amask→mkclass; ported
  trap retry+victim.
- Verification: seed0030 prefix **13007→13226**; positional
  **14148**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135605**/792838.
- Next: seed0030 @13226 (`place_lregion` vs rn2(1000)) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — minefill fixup_special / place_lregion + Mines mineralize (D-0177)
- Objective: seed0030 @13226 C `place_lregion` rn2(79) vs JS rn2(1000)
  (PROGRESS primary).
- C locus: `sp_lev.c` `load_special` → `fixup_special` / `place_lregion`
  (`mkmaze.c`); `mineralize` Mines boost (`mklev.c`).
- Result: **verified** — not mineralize-first. Missing post-minefill
  `fixup_special` (nroom==0 → full-map LR_BRANCH rn1); then Mines
  gold×2/gem×3. Ported place_lregion/put_lregion_here/fixup_special +
  place_branch(x,y) + mineralize Mines multipliers.
- Verification: seed0030 prefix **13226→13906**; positional
  **14344**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135801**/792838.
- Next: seed0030 @13906 (`mdig_tunnel` vs distfleeck) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — mdig_tunnel / tunnels / ALLOW_DIG (D-0178)
- Objective: seed0030 @13906 C `mdig_tunnel` rnd(12) vs JS distfleeck
  rn2(5) (PROGRESS primary).
- C locus: `mondata.h` tunnels/needspick; `mon.c` mon_allowflags/
  mfndpos ALLOW_DIG; `monmove.c` can_tunnel + postmov; `dig.c`
  mdig_tunnel; `hack.c` may_dig.
- Result: **verified** — JS forced can_tunnel=false so diggers never
  burned post-move dig RNG (even on open floor). Ported tunnels/
  needspick, ALLOW_DIG rockok/treeok/thrudoor, real can_tunnel,
  js/dig.js may_dig/mdig_tunnel.
- Verification: seed0030 prefix **13906→13921**; positional
  **14256**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135713**/792838.
- Next: seed0030 @13921 (`mattacku` vs rn2(12)) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 — get_mattk mattk[] + m_digweapon_check (D-0179/D-0180)
- Objective: seed0030 @13921 C mattacku rnd(20) vs JS rn2(12) (PROGRESS primary).
- C locus: monattk.h AT_WEAP=254; mhitu.c getmattk/mattacku; monmove.c
  m_digweapon_check; weapon.c mon_wield_item NEED_PICK_*.
- Result: **verified** — get_mattk ignored extracted mattks (AT_WEAP
  wrongly 10=AT_SPIT) so Mines dwarves/gnomes skipped hit roll; then
  missing digweapon let needspick diggers dig instead of wielding.
  Wired get_mattk→data.mattk, AT_WEAP=254, m_digweapon_check +
  pick/axe mon_wield; hero-square → MMOVE_NOTHING.
- Verification: seed0030 prefix **13921→13987**; positional
  **14343**/105529 Scr **168**/1953; green+strict PASS; cohort PASS;
  full **15/44** Scr **1405** RNG **135799**/792838.
- Next: seed0030 @13987 (`next_ident` vs dig) /
  seed0101 Scr residual / seed0200 combat @3382.

## 2026-07-13 20:10 — trapeffect_rocktrap + gettrack prerequisite (D-0181)
- Objective: seed0030 @13987 C `next_ident` rocktrap vs JS dig.
- C locus: `trap.c:trapeffect_rocktrap`; `monmove.c` should_see/gettrack;
  `mondata.c:can_track`.
- Result: **partial** — monster `trapeffect_rocktrap` ported
  (`t_missile(ROCK)`+`thitm(d(2,6))`); `haseyes`/`can_track` helpers.
  Hostile gettrack **not** wired: `tooFar && gettrack` first diverges
  newt @10676 (track (56,5) vs mux (56,6)) → @10701 rn2(24) vs C rn2(20).
  Prefix still **13987** (dwarf mux nearer (28,6) dig vs ROCKTRAP (27,6)).
- Verification: green+strict PASS; cohort PASS (8000/0900/1500/1800/0060
  +0102/0700/1150/0017/0015/0016); seed0030 still 13987.
- Next: diagnose C vs JS gettrack at newt @10676 before wiring hostile
  gettrack; or peel seed0101 Scr residual.

## 2026-07-13 20:20 — hostile gettrack + goto_level initrack (D-0181)
- Objective: seed0030 gettrack diagnosis @10676 / dwarf rocktrap @13987
  (PROGRESS primary).
- C locus: `monmove.c` `should_see`+`gettrack`; `do.c`/`save.c`/`track.c`
  `savelev`→`save_track`→`initrack`.
- Result: **verified partial** — wired hostile `should_see`+`gettrack`
  and `goto_level` `initrack` (C leave-level clear). Without initrack,
  stale prior-level tracks redirected newt @10676→@10701. With both,
  newt holds; dwarf @13987 gettrack redirect **falsified** (ring has no
  adjacent cell to (27,7) — only (30,8)/(31,7)/(32,6); full stale ring
  also none). Prefix still **13987** (pick (28,6) dig vs ROCKTRAP (27,6)).
- Verification: green+strict PASS; cohort 8000/0900/1500/1800/0060/0015
  PASS; full **15/44** Scr **1405** RNG **135795**.
- Next: why C steps on ROCKTRAP without adjacent track (mfndpos exclude
  (28,6)/(28,7), actor order, or other gg); or peel seed0101 Scr.

## 2026-07-13 20:30 — m_search_items loot gg (D-0182)
- Objective: seed0030 dwarf rocktrap @13987 (PROGRESS primary; gettrack
  falsified).
- C locus: `monmove.c` `m_move` getitems + `m_search_items` /
  `mon_would_take_item`.
- Result: **verified fix** — DIAG showed ROCKTRAP (27,6) pile
  (CORPSE/SLIME_MOLD/glass); dwarf `M2_JEWELS|M2_COLLECT` redirects gg
  so rocktrap beats mux-nearer dig (28,6). Ported getitems +
  `m_search_items` + take/carry helpers + likes_gems/objs/magic.
- Verification: seed0030 prefix **13987→14026**; green+strict PASS;
  full PASS cohort held; full **15/44** Scr **1405** RNG **135801**.
- Next: seed0030 @14026 (C `rn2(28)` mtrack vs JS `rn2(5)` distfleeck);
  or seed0101 Scr residual.

## 2026-07-13 20:45 — underfoot m_search_items (D-0183)
- Objective: seed0030 @14026 C rn2(28) mtrack vs JS rn2(5) distfleeck
  (PROGRESS primary).
- C locus: `monmove.c` `m_search_items` underfoot MMOVE_DONE → postmov
  → mpickstuff; `mon.c` `can_carry` peaceful gate.
- Result: **verified partial** — DIAG: PM_GNOME @(57,11) on
  WORTHLESS_BLUE_GLASS returned underfoot TRUE; JS postmov ignored DONE
  (no approach). Skip underfoot claim until mpickstuff; peaceful
  can_carry. Actor-order theory falsified.
- Verification: seed0030 prefix **14026→14056**; positional **14375**/105529;
  full **15/44** Scr **1405** RNG **135825**; green+strict PASS; cohort held.
- Next: seed0030 @14056 (`u_catch_thrown_obj` rn2(88)); or seed0101 Scr.

## 2026-07-13 21:00 — muse potion throw + potionhit (D-0184)
- Objective: seed0030 @14056 C `u_catch_thrown_obj` rn2(88) vs JS rn2(32)
  (PROGRESS primary).
- C locus: `mhitu.c` `mattacku` → `muse.c` `find_offensive`/`use_offensive`
  (MUSE_POT_SLEEPING); `mthrowu.c` potion → `potion.c` `potionhit`/
  `potionbreathe`; flight `observe_object` → `makeknown` →
  `exercise(A_WIS,TRUE)`.
- Result: **verified partial** — stacks showed C mid-`m_throw` while JS
  `thrwmu` ARROW + URETREATING; not a catch_chance bug. Ported muse potion
  offense, hero `potionhit`/`bottlename`/`potionbreathe`, flight observe,
  `discover_object` credit_hero/`makeknown`; `losehp` no longer forces
  `multi=0`.
- Verification: seed0030 prefix **14056→14118**; positional **14487**/105529;
  full **15/44** Scr **1405** RNG **135937**; green+strict PASS; cohort held.
- Next: seed0030 @14118 (C `rn2(32)` vs JS `rn2(24)` `m_move`); or seed0101 Scr.

## 2026-07-13 21:15 — seed0030 @14118 cnt diagnosis (D-0185)
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` `m_move`
  (PROGRESS primary).
- C locus: `monmove.c` `m_move` mtrack `rn2(4*(cnt-j))`; `mon.c`
  `mfndpos`; mines `mkmap`/`join_map`/`wallify_map`.
- Result: **falsified** sleep/allowflags theory — no production change.
  DIAG: PM_GNOME @`(57,10)` `cnt=6` missing wall neigh `(56,9)`/
  `(56,10)` (STONE→wallify; join never carved; no dig). C needs
  `cnt=8`. Next step is C map vs actor-identity falsifier.
- Verification: green+strict PASS (preflight); DIAG removed; tree clean.
- Next: resolve D-0185 (C typ at those cells or drifted actor); or
  seed0101 Scr.

## 2026-07-13 21:25 — seed0030 @14118 path/map diagnosis (D-0185)
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `monmove.c` `m_move` mtrack; `mkmap.c` `pass_two`/`wallify`.
- Result: **falsified** dig-open + unrelated-actor + mkmap iter/pass_two
  formula theories — no production change. JS gnome continuous path to
  `(57,10)`; walls from `pass_two` count==5; only 2 C digs before
  mismatch. Next: @14074 dest split (gg/mtrack/occupancy) vs C ROOM.
- Verification: green+strict PASS; DIAG removed; tree clean.
- Next: resolve D-0185 @14074 decision / C typ; or seed0101 Scr.

## 2026-07-13 21:35 — seed0030 @14118 walls confirmed (D-0185)
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `monmove.c` `m_move` mtrack; `mkmap.c` `pass_one`/`pass_two`/`join`.
- Result: **falsified** @14074 dest/gg-split — loot gg=`(57,11)` glass;
  amulet `(58,10)` not taken (`!M2_MAGIC`); nearer→`(57,10)`. FORCE-open
  pass_two walls `(56,9)`/`(56,10)` advances prefix **14118→14153**.
  Next: why C keeps those cells ROOM (pass_one west neighbor or dig).
- Verification: green+strict PASS; DIAG/FORCE removed; no production edit.
- Next: resolve D-0185 pass_one/`dig_corridor` map; or seed0101 Scr.

## 2026-07-13 19:43 — D-0185 pass_one west-ROOM falsified
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `mkmap.c` `pass_one`/`pass_two`/`join_map`; `monmove.c` `m_move`.
- Result: **falsified** pass_one west-ROOM theory — no production change.
  Replayed C session `init_fill` RNG through pass_one/two/three → same
  STONE at `(56,9)`/`(56,10)` (count==5). Mines join dig endpoints match
  C (`16,14→19,3`…`50,11→74,16`); only `(55,11)` carved nearby. Gnome
  `!M1_TUNNEL`. FORCE-open still advances to 14153. Opener unknown.
- Verification: green+strict PASS; DIAG removed; tree clean of js edits.
- Next: full mines `dig_corridor` carved-cell dump vs C dig RNG blocks;
  or seed0101 Scr.

## 2026-07-13 21:50 — D-0185 dig-path opener falsified
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `sp_lev.c` `dig_corridor`; `mkmap.c` `join_map`; `dig.c`
  `mdig_tunnel`; `monmove.c` `m_move` mtrack.
- Result: **falsified** mines dig-path opener — no production change.
  Dig RNG 12495–12635 matches C; last join dig `50,11→74,16` full visit
  list stays on `y=11` near x=56 (never `(56,9)`/`(56,10)`). At mismatch
  PM_GNOME @`(57,10)` `cnt=6` neigh TRCORNER/BRCORNER. Pre-14118
  `mdig_tunnel` only dwarf @`(22,7)`/`(23,6)`. Next: post-wallify
  typ-write hook or C `levl` dump.
- Verification: green+strict PASS (preflight); DIAG removed; no js edit.
- Next: D-0185 typ-mutation hook / C map dump; or seed0101 Scr.

## 2026-07-13 22:00 — D-0185 post-wallify typ writes falsified
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `monmove.c` `m_move` mtrack; `mkmap.c` wallify/`join_map`.
- Result: **falsified** post-wallify typ-mutation — no production change.
  Property-hook on `(56,9)`/`(56,10)` from mines wallify (rng 13226) through
  14118: **0** writes; still TRCORNER/BRCORNER. @14115 matching `rn2(32)`
  is different gnome @(48,17) cnt=8. FORCE-open still implies C needs those
  cells walkable. Next: non-RNG join_map/flood vs C, or C levl dump.
- Verification: green+strict PASS; DIAG removed; tree clean of js edits.
- Next: D-0185 join_map/flood non-RNG peel / C dump; or seed0101 Scr.

## 2026-07-13 22:09 — D-0185 join_map/flood falsified
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `mkmap.c` `join_map`/`flood_fill_rm`; `monmove.c` `m_move`.
- Result: **falsified** non-RNG join flood/erase — no production change.
  Mines join keep=7 erase=0; room bounds match C somex widths; six dig
  endpoints match C; init_fill+join dig RNG windows 0 mismatches;
  pass_two STONE→wallify corners unchanged. FORCE-open still →14153.
  Next: C `levl` typ dump at rn2(32).
- Verification: green+strict PASS; DIAG removed; js tree clean.
- Next: D-0185 C levl dump / unknown opener; or seed0101 Scr.

## 2026-07-13 22:20 — D-0185 postmov `mpickstuff` fixed
- Objective: seed0030 @14118 C `rn2(32)` vs JS `rn2(24)` (PROGRESS primary).
- C locus: `mon.c` `mpickstuff`; `monmove.c` `postmov` MOVED|DONE pickup;
  `m_search_items` gg.
- Result: **fixed** — C recorder dump at `(59,8)`: same gettrack/mux/poss;
  C `gg=(59,12)` vs JS `gg=(57,11)` because JS never picked up floor glass
  (`postmov` omitted `mpickstuff`). Wall theories falsified (C also cnt=6
  at `(57,10)`). Ported `mpickstuff` + wired into `postmov`.
- Verification: seed0030 prefix **14118→14151**; positional **14489**/105529;
  full **15/44** Scr **1405** RNG **135939**; green+cohort+strict PASS.
- Next: seed0030 @14151 (`distfleeck` `rn2(5)` vs `rnd(2)`); or seed0101 Scr.

## 2026-07-13 22:25 — D-0186 can_carry quan>1 / M1_NOHANDS fixed
- Objective: seed0030 @14151 C `distfleeck` `rn2(5)` vs JS `rnd(2)`.
- C locus: `mon.c` `can_carry` (quan>1 → 1 only for `M1_NOHANDS` non-glomper).
- Result: **fixed** — DIAG: PM_GNOME hands @(49,19) on WORTHLESS_VIOLET_GLASS
  quan=2; JS always `return 1` for stacks → `splitobj`/`next_ident`. C takes
  full `iquan`. Ported C quan/nohands/glomper/peaceful/boulder/nymph/weight
  order; export `M1_NOTAKE`.
- Verification: seed0030 prefix **14151→14231**; positional **14536**/105529;
  full **15/44** Scr **1405** RNG **135986**; green+cohort+strict PASS.
- Next: seed0030 @14231 (`hitum`/`exercise` `rn2(19)` vs JS `rn2(5)`); or
  seed0101 Scr / seed0200 @3382.

## 2026-07-13 22:26 — D-0187 weapon_hit_bonus + martial barehands fixed
- Objective: seed0030 @14231 C `exercise` `rn2(19)` vs JS `rn2(5)` after
  `hitum` `rnd(20)=13` (PROGRESS primary).
- C locus: `weapon.c` `weapon_hit_bonus`/`weapon_type`/`martial_bonus`;
  `uhitm.c` `find_roll_to_hit` / `hmon_hitmon_barehands`.
- Result: **fixed** — JS stubbed `weapon_hit_bonus`→0 so Tourist bare-hand
  `tmp` missed (`tmp<=13`) while C unskilled b.h. **+1** hit→`exercise`/
  `hmon`. Ported full `weapon_hit_bonus`; barehands
  `rnd(martial_bonus() ? 4 : 2)` (seed0200 Monk).
- Verification: seed0030 prefix **14231→14235** (`passive`); positional
  **14586**/105529; seed0200 **3382→3387**; full **15/44** Scr **1405**
  RNG **136046**; green+cohort+strict PASS.
- Next: seed0030 @14235 `passive` `rn2(3)`; or seed0200 @3387
  `xkilled`/`next_ident`; or seed0101 Scr.

## 2026-07-13 22:30 — D-0188 hitum `passive` live rn2(3) fixed
- Objective: seed0030 @14235 C `passive` `rn2(3)` vs JS `distfleeck`
  `rn2(5)` (PROGRESS primary).
- C locus: `uhitm.c` `hitum` / `passive` / `passive_obj`.
- Result: **fixed** — JS `hitum` skipped `passive`; C always calls it
  after `known_hitum`, and live `malive && !mcan && rn2(3)` burns even
  for NO_ATTK AT_NONE fillers. Ported `passive`+`passive_obj` and wired
  into `hitum`.
- Verification: seed0030 prefix **14235→14296** (`dmgval`); positional
  **14565**/105529; full **15/44** Scr **1405** RNG **136012**;
  green+cohort+strict PASS; seed0200 still @3387.
- Next: seed0030 @14296 `dmgval` `rnd(2)` vs `rnd(1)`; or seed0200
  @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## 2026-07-13 22:35 — D-0189 extract oc_wsdam / dmgval fixed
- Objective: seed0030 @14296 C `dmgval` `rnd(2)` vs JS `rnd(1)`
  (PROGRESS primary).
- C locus: `objects.h` WEAPON sdam/ldam; `weapon.c` `dmgval`;
  `scripts/extract-objects.py`.
- Result: **fixed** — extractor already read `oc_wsdam`/`oc_wldam` but
  never emitted them; JS stand-in map defaulted missing otyps
  (BULLWHIP/WORM_TOOTH/…) to 1. Emit fields, regenerate table, rewrite
  `dmgval` small-monster path from C (drop stand-in).
- Verification: seed0030 prefix **14296→14299** (`can_make_bones` vs JS
  survival `rn2(5)`); positional **14572**/105529; full **15/44** Scr
  **1405** RNG **136019**; green+cohort+strict PASS; seed0200 still
  @3387.
- Next: seed0030 @14299 hero death/`mdamageu`/`done` after matched kill
  blow; or seed0200 @3387 `xkilled`/`next_ident`; or seed0101 Scr.

## 2026-07-13 22:45 — D-0191 xkilled make_corpse fixed
- Objective: seed0200 @3387 C `next_ident` vs JS `rn2(12)` after matched
  `corpse_chance` (PROGRESS primary).
- C locus: `mon.c` `xkilled` → `corpse_chance` → `make_corpse` →
  `mkcorpstat`/`mksobj` `next_ident`.
- Result: **fixed** — JS burned `corpse_chance` without calling
  `make_corpse`. Wired existing `make_corpse` (exported from mhitm)
  into `xkilled` when chance succeeds. Treasure `mkobj` still deferred.
- Verification: seed0200 prefix **3387→3547** (`distfleeck`); positional
  **3574**/3822 Scr **22**/40; full **15/44** Scr **1288** RNG
  **137724**; green+cohort+strict PASS.
- Next: seed0200 @3547 `distfleeck`; or seed0030 disclosure·seg1; or
  seed0101 Scr residual.

## 2026-07-13 22:55 — D-0192 `,`/dopickup fixed
- Objective: seed0200 @3547 C `distfleeck` vs JS `rn2(2)` (PROGRESS primary).
- C locus: `cmd.c` `,`→`dopickup`; `hack.c` `dopickup`/`pickup_checks`;
  `pickup.c` `pickup`/`pickup_object`/`pick_obj` AUTOSELECT_SINGLE.
- Result: **fixed** — `,` was Unknown (move=0); JS raced to Ctrl-D
  `dokick`→`exercise` while C timed pickup then monsters. Wired
  one-object AUTOSELECT `dopickup`.
- Verification: seed0200 prefix **3547→3565** (`eatcorpse`); positional
  **3578**/3822 Scr **24**/40; full **15/44** Scr **1290** RNG
  **138575**; green+cohort+strict PASS.
- Next: seed0200 @3565 `eatcorpse`; or seed0030 disclosure·seg1; or
  seed0101 Scr residual.


## 2026-07-13 23:00 — D-0193 eatcorpse fixed
- Objective: seed0200 @3565 C `eatcorpse` vs JS `rn2(2)` (PROGRESS primary).
- C locus: `eat.c` `doeat`/`eatcorpse`/`start_eating`/`eatfood`; `mondata.h`
  vegan/vegetarian/carnivorous; SIZ `cwt`/`cnutrit` via extractor.
- Result: **fixed** — JS refused CORPSE after getobj; C ate invent goblin
  corpse (rotting `rn2(20)`, palatable path, multi-turn occupation).
  Monk form not carnivorous → no `rn2(10)`. Await occupation in allmain.
- Verification: seed0200 RNG **3822**/3822 Scr **39**/40; full **15/44**
  Scr **1305** RNG **138545**; green+cohort+strict PASS.
- Next: seed0200 Scr residual (guilty+taste topline); or seed0030
  disclosure·seg1; or seed0101 Scr residual.

## 2026-07-13 23:28 — D-0195 NHW_MENU NEED_MORE flush fixed
- Objective: seed0101 Scr residual 21/27 (PROGRESS primary; RNG already full).
- C locus: `win/tty/wintty.c` `tty_display_nhwindow(NHW_MENU)` NEED_MORE
  flush; `tty_nhgetch` NEED_MORE→NON_EMPTY.
- Result: **fixed** — tip menu painted without flushing travel pline
  `--More--`; `mark_topline_seen` cleared to EMPTY. Wired
  `flush_topl_more` into corner/pick_none menu paint; NON_EMPTY mark.
- Verification: seed0101 **PASS**; green+strict+cohort PASS; full
  **17/44** Scr **1312**/11405 RNG **138545**/792838.
- Next: seed0030 seg1 @1238 `assign_candy_wrapper`; or seed0103
  `next_ident`/`trquan`.


## 2026-07-13 23:32 — D-0196 CANDY_BAR assign_candy_wrapper fixed
- Objective: seed0030 seg1 @1238 C `assign_candy_wrapper` vs JS quan `rn2(6)` (PROGRESS primary).
- C locus: `read.c` `assign_candy_wrapper`; `mkobj.c` `mksobj_init` FOOD `CANDY_BAR`.
- Result: **fixed** — JS skipped candy wrapper `rn2(12)` before quan `rn2(6)`.
  Wired `assign_candy_wrapper` + `CANDY_BAR` in `mksobj_init`; SLIME_MOLD spe
  from `current_fruit` when present (fruit chain still deferred).
- Verification: seg1 prefix **1238→3347**; seed0030 positional **17994**/105529;
  full **17/44** Scr **1312** RNG **140933**; green+strict+cohort PASS.
- Next: seed0030 seg1 @3347 C `dog_goal` vs JS `obj_resists`; or seed0103
  `next_ident`/`trquan`.

## 2026-07-13 23:40 — D-0197 dogfood CORPSE vegan/lichen fixed
- Objective: seed0030 seg1 @3347 C `dog_goal` rn2(8) vs JS `obj_resists` (PROGRESS primary).
- C locus: `dog.c` `dogfood` CORPSE vegan(fptr); `dogmove.c` `dog_goal` APPORT.
- Result: **fixed** — lichen CORPSE returned CADAVER in JS; C vegan→MANFOOD
  enters APPORT `rn2(8)`. Wired vegan/age-exception/acid/poison + mflags1 carni/herbi.
- Verification: seg1 **3347→3466**; seed0030 positional **18139**/105529;
  full **17/44** Scr **1312** RNG **140894**; green+strict+cohort PASS.
- Next: seed0030 seg1 @3466 `mhitm_mgc_atk_negated`; or seed0103 `next_ident`/`trquan`.

## 2026-07-13 23:45 — D-0198 mhitm_mgc_atk_negated + AD_ELEC hitmu fixed
- Objective: seed0030 seg1 @3466 C `rn2(10) @ mhitm_mgc_atk_negated` vs JS
  `rn2(3)` (PROGRESS primary).
- C locus: `uhitm.c` `mhitm_mgc_atk_negated` / `mhitm_ad_elec`; `mhitu.c` `hitmu`
  → `mhitm_adtyping`.
- Result: **fixed** — grid bug AD_ELEC: JS `hitmu` only ran PHYS; C burns
  `rn2(10)` MC gate then destroy_items `rn2(20)`. Wired
  `mhitm_mgc_atk_negated`, `mhitm_adtyping_u` (PHYS+ELEC), `mhitm_ad_elec_u`.
- Verification: seg1 **3466→3497**; seed0030 positional **18080**/105529;
  full **17/44** Scr **1312** RNG **141570**; green+strict+cohort PASS.
- Next: seed0030 seg1 @3497 C `m_move` vs JS `mattacku`; or seed0103
  `next_ident`/`trquan`.

## 2026-07-14 00:00 — D-0199 monnear NODIAG diagonal fixed
- Objective: seed0030 seg1 @3497 C `rn2(12) @ m_move` vs JS `rnd(20) @ mattacku` (PROGRESS primary).
- C locus: `mon.c` `monnear` (`dist2==2 && NODIAG` → 0).
- Result: **fixed** — grid bug diagonal to hero: JS `monnear` used `distmin<=1`
  so nearby→attack; C rejects NODIAG diagonals so want_move→`m_move`.
- Verification: seg1 **3497→3870**; seed0030 positional **18437**/105529;
  full **17/44** Scr **1312** RNG **141923**; green+strict+cohort PASS.
- Next: seed0030 seg1 @3870 themerms.lua `room`/`nh.rn2`; or seed0103
  `next_ident`/`trquan`.

## 2026-07-13 23:55 — D-0200 Default themed-fill + Storeroom fixed
- Objective: seed0030 seg1 @3870 C `themeroom_fill` vs JS `rn2(3)` (PROGRESS primary).
- C locus: `themerms.lua` Default room with themed fill / `themeroom_fill` /
  Storeroom; `makemon.c` `set_mimic_sym`; `selvar.c` `selection_filter_percent`.
- Result: **fixed** — JS skipped `themeroom_fill` after `create_room` for
  rectangular themed-fill rooms. Wired THEMEROOM + fill dispatch, Storeroom
  percentage/chest/mimic, and `set_mimic_sym` on S_MIMIC.
- Verification: seg1 **3870→5220**; seed0030 positional **19786**/105529;
  full **17/44** Scr **1313** RNG **142362**; green+strict+cohort PASS.
- Next: seed0030 seg1 @5220 `mkshop`; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:05 — D-0201 mkshop eligibility + shtypes rnd(100)
- Objective: seed0030 seg1 @5220 C `rnd(100) @ mkshop` vs JS `rn2(7)` (PROGRESS primary).
- C locus: `mkroom.c` `mkshop`/`invalid_shop_shape`/`isbig`; `shknam.c` `shtypes[]`.
- Result: **fixed** — JS skipped eligible shop rooms without type RNG or
  `rtype`/`needfill`, so fillable countdown stayed `rn2(7)` vs C `rn2(6)`.
  Ported non-wizard `mkshop` + `js/shknam.js` shtypes probs; `stock_room`
  deferred.
- Verification: seg1 **5220→5255** (`find_random_launch_coord`); seed0030
  positional **19751**/105529 Scr **44**/1953; green+strict+cohort PASS;
  full **17/44** Scr **1312** RNG **142327**.
- Next: `node -e` seg1 mismatch @5255 / port `find_random_launch_coord`
  or `mktrap` launch; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:10 — D-0202 maketrap ROLLING_BOULDER mkroll_launch
- Objective: seed0030 seg1 @5255 C `rn2(5) @ find_random_launch_coord` vs JS
  `rnd(4)` (PROGRESS primary).
- C locus: `trap.c` `maketrap`/`mkroll_launch`/`find_random_launch_coord`/
  `isclearpath`.
- Result: **fixed** — JS `maketrap` skipped rolling-boulder launch setup;
  C burned `rn1(5,4)`/`rn2(8)` before victim gate. Ported launch helpers
  and `mkroll_launch(BOULDER,1)` from the ROLLING_BOULDER case.
- Verification: seg1 **5255→5381** (`shkinit`/`makemon` shopkeeper);
  seed0030 positional **19890**/105529 Scr **45**/1953; green+strict+
  cohort PASS; full **17/44** Scr **1313** RNG **142466**.
- Next: seed0030 seg1 @5381 `shkinit`/`stock_room`/`mkshobj_at`; or
  seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:15 — D-0203 stock_room / shkinit / mkshobj_at
- Objective: seed0030 seg1 @5381 C `next_ident` @ makemon(PM_SHOPKEEPER)
  vs JS `rn2(200)` mineralize (PROGRESS primary).
- C locus: `shknam.c` `stock_room`/`shkinit`/`mkshobj_at`/`get_shop_item`;
  `makemon.c` shopkeeper `m_initinv`; `muse.c` `rnd_misc_item`;
  `mkobj.c`/`do_name.c` SPE_NOVEL `noveltitle`; `allmain.c` tribute.enabled.
- Result: **fixed** — `fill_special_room` skipped shop stocking after
  mkshop set rtype. Ported stock_room cluster + shopkeeper invent +
  tribute novel + SPE_NOVEL noveltitle.
- Verification: seg1 **5381→6561** (`dosounds`); seed0030 positional
  **21235**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1313** RNG **143811**.
- Next: seed0030 seg1 @6561 `dosounds`; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:20 — D-0204 dosounds has_shop feature gates
- Objective: seed0030 seg1 @6561 C `rn2(200) @ dosounds(sounds.c:313)` vs
  JS `rn2(20)` gethungry (PROGRESS primary).
- C locus: `sounds.c` `dosounds` / shop `search_special`/`tended_shop`;
  `mkroom.c` `search_special`; `shk.c` `tended_shop`/`noisy_shop`.
- Result: **fixed** — JS `dosounds` stopped after vault; after D-0203
  `has_shop`, C rolls shop `rn2(200)`. Ported remaining feature gates +
  shop envelope into `js/sounds.js`; `allmain` imports it.
- Verification: seg1 **6561→6565** (`distfleeck`); seed0030 positional
  **21192**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1313** RNG **143768**.
- Next: seed0030 seg1 @6565 C `distfleeck` `rn2(5)` vs JS `rn2(10)`; or
  seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:30 — D-0205 shk_move before getitems
- Objective: seed0030 seg1 @6565 C `distfleeck` `rn2(5)` vs JS `rn2(10)`
  (PROGRESS primary).
- C locus: `monmove.c` `m_move` isshk/`shk_move`; `shk.c` `shk_move`;
  `priest.c` `move_special`.
- Result: **fixed** — peaceful shopkeeper fell through to getitems
  `rn2(10)`; C routes isshk through `shk_move` (near-home return 0, no
  RNG) then second fleeck. Added `js/shk.js` + `m_move` dispatch;
  `online2` in hacklib; gd/pri stubs return 0.
- Verification: seg1 **6565→6568** (`mcalcmove`); seed0030 positional
  **21198**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1313** RNG **143774**.
- Next: seed0030 seg1 @6568 C `mcalcmove` vs JS extra ant fleeck
  (movement rations); or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:45 — D-0206 movemon hider skip dochug
- Objective: seed0030 seg1 @6568 C `mcalcmove` vs JS extra fleeck (PROGRESS primary).
- C locus: `mon.c` `movemon_singlemon` is_hider / M_AP_OBJECT|FURNITURE / mundetected.
- Result: **fixed** — disguised Storeroom mimics deducted movement but still `dochug`d in JS; C skips dochug so only shopkeeper (mmove=16 → +24) acts twice (4 fleecks) then EOT. Added `M1_HIDE`/`is_hider` + hider gate in `movemon_singlemon`.
- Verification: seg1 **6568→7007** (`next_ident`); seed0030 positional **21693**/105529 Scr **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313** RNG **144269**.
- Next: seed0030 seg1 @7007 C `next_ident` vs JS `rn2(20)`; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:55 — D-0207 stumble_onto_mimic object next_ident
- Objective: seed0030 seg1 @7007 C `next_ident` vs JS `rn2(20)`
  (PROGRESS primary).
- C locus: `uhitm.c` `attack_checks`/`stumble_onto_mimic`/
  `that_is_a_mimic`; `pager.c` `object_from_map`; `mon.c`
  `seemimic`/`wakeup`; `mkobj.c` `mksobj(FALSE)`.
- Result: **fixed** — walking into a chest-mimic skipped C's
  mimic stumble (fake `mksobj`→`next_ident` before overexertion);
  JS burned `gethungry` instead. Ported seemimic/wakeup + object-
  appearance that_is_a_mimic into do_attack ahead of overexertion.
- Verification: seg1 **7007→7189** (vault `gd_sound` `rn2(2)`);
  seed0030 positional **21760**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1313** RNG
  **144336**.
- Next: seed0030 seg1 @7189 vault `gd_sound`→`rn2(2)`; or seed0103
  `next_ident`/`trquan`.

## 2026-07-14 00:40 — D-0208 vault gd_sound rn2(2)
- Objective: seed0030 seg1 @7189 C `rn2(2) @ dosounds` vault body (PROGRESS primary).
- C locus: `sounds.c` `dosounds` vault gate; `vault.c` `gd_sound`/`findgd`/`vault_occupied`.
- Result: **fixed** — vault `!rn2(200)` early-returned without `gd_sound`→`rn2(2)+hallu`; ported search_special(VAULT)+gd_sound message roll (You_hear deferred).
- Verification: seg1 **7189→7640/7640 FULL**; seg2 cont **1272**/6221 (`somey`); seed0030 positional **24164**/105529 Scr **45**/1953; green+strict+cohort PASS; full **17/44** Scr **1313** RNG **146740**.
- Next: seed0030 seg2 @1272 `somey`/`create_room`; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 00:50 — D-0209 make_grave EPITAPHFILE get_rnd_text
- Objective: seed0030 seg2 @1272 C `rn2(24075)` mis-attributed to `somey`
  (PROGRESS primary after D-0208).
- C locus: `engrave.c` `make_grave`; `rumors.c` `get_rnd_text`;
  `makedefs.c` `do_rnd_access_file(EPITAPHFILE)`.
- Result: **fixed** — JS `make_grave` stub skipped null-str epitaph draw;
  C burns `rn2(chunk=24075)` via `rn2` function pointer. Added
  `extract-epitaph.py` + `make_grave` + `mkgrave_room` bury/
  `level_difficulty` parity.
- Verification: seg2 **1272→2217** (`u_init_race` elf); seg1 FULL;
  seed0030 positional **24701**/105529 Scr **45**/1953;
  green+strict+cohort PASS; full **17/44** Scr **1315** RNG **147856**.
- Next: seed0030 seg2 @2217 Wizard-elf `u_init_race` Instrument
  `ROLL_FROM`/`rn2(6)`; or seed0103 `next_ident`/`trquan`.

## 2026-07-14 01:00 — D-0210 elf Instrument eager ROLL_FROM
- Objective: seed0030 seg2 @2217 C `rn2(6) @ u_init_race` vs JS `rn2(1)`
  (PROGRESS primary after D-0209).
- C locus: `u_init.c:810` `ROLL_FROM(trotyp)` in Instrument[];
  `ini_inv`→`trquan` after construction.
- Result: **fixed** — not Xtra_food; JS deferred instrument `rn2(6)`
  inside lazy `trotyp()` after `trquan`. Eager pick matches C order.
- Verification: seg2 **2217→2408** (`distfleeck`); positional
  **24703**/105529 Scr **45**/1953; green+strict+cohort PASS; full
  **17/44** Scr **1315** RNG **147858**.
- Next: seed0030 seg2 @2408 C `distfleeck` vs JS `dog_move`; or
  seed0103 `next_ident`/`trquan`.

## 2026-07-14 01:10 — D-0211 dog_move extra mfndpos candidate
- Objective: seed0030 seg2 @2408 C `distfleeck` vs JS `dog_move`
  (PROGRESS primary after D-0210).
- C locus: `dogmove.c:dog_move` selection `rn2(12)`; `mon.c:mfndpos`.
- Result: **falsified** actor-order/extra-dochug — same kitten
  `dog_move`, JS cnt=8 burns 7×`rn2(12)`, C 6× then fleeck. C skips
  SW diagonal (here `(72,8)`): diagnostic omit → accept `(73,6)` →
  prefix **2457**. Open ROOM in JS; squeeze N/A for kitten; no gas
  provenance. No production change.
- Verification: seg2 still **2408**; green+strict PASS; DIAG removed.
- Next: C `mfndpos` poss/typ/region dump at this call, or port
  `visible_region_at` poison-gas skip; or seed0103 `next_ident`.

## 2026-07-14 01:20 — D-0212 Knight pony put_saddle_on_mon
- Objective: PROGRESS primary — D-0211 blocked (gas falsified); pivot
  seed0103 @2337 `next_ident` vs `trquan`.
- C locus: `dog.c:makedog`; `steed.c:put_saddle_on_mon`/`can_saddle`;
  `makemon.c` domestic `!rn2(100)`.
- Result: **verified** — missing pony `mksobj(SADDLE)` after
  `NO_MINVENT` makedog. New `js/steed.js`; wired makedog + makemon.
  D-0211: reconfirmed empty ROOM `(72,8)`; **no gas RNG in seg2** —
  poison-gas theory falsified for this peel.
- Verification: seed0103 **2337→2440** (`mount_steed`); green+strict+
  cohort PASS; full **17/44** Scr **1315** RNG **148366**.
- Next: seed0103 @2440 `mount_steed` (`rnd(20)`/`rn2(5)`); or D-0211
  C typ dump for `(72,8)`.

## 2026-07-14 01:25 — D-0213 Knight #ride / mount_steed
- Objective: PROGRESS primary — seed0103 @2440 `mount_steed`.
- C locus: `steed.c:doride`/`mount_steed`/`landing_spot`/
  `dismount_steed`; `allmain.c` `u.umoved=FALSE`; `dogmove.c` steed
  `dog_goal` -2; `hack.c` `losehp`→`done`.
- Result: **verified** — wired `#ride`; ported mount slip/success +
  BYCHOICE dismount; clear `umoved` before rhack; steed `dog_goal`
  early exit; fatal slip → `done`/`can_make_bones`.
- Verification: seed0103 RNG **2640**/2640 Scr **2**/60; seed0104
  **2968**/3223; green+strict+cohort PASS; full **17/44** Scr **1316**
  RNG **148875**.
- Next: seed0103 Scr (riding display) / seed0104 @2841 `mattacku` /
  D-0211 C typ dump.

## 2026-07-14 01:40 — D-0217 mounted mattacku steed redirect
- Objective: PROGRESS primary — seed0104 @2841 C `rn2(2) @ mattacku` vs JS `rn2(12)` while mounted.
- C locus: `mhitu.c:mattacku` usteed arm (~528–547); `mondata.h:is_orc`; `you.h:m_next2u`; `mhitm.c:mattackm`.
- Result: **verified** — JS lacked the mounted steed branch (`rn2(is_orc?2:4)` → `mattackm` steed + retaliation; steed never attacks rider). Also `m_at` skipped `u.usteed` like C `remove_monster` on mount.
- Verification: seed0104 prefix **2841→3031** positional **3034**/3223 Scr **15**/43; seed0103 PASS; green+strict+cohort PASS; full **18/44** Scr **1405** RNG **148941**.
- Next: seed0104 @3031 C `gethungry` `rn2(20)` vs JS `rn2(5)`; or D-0211 C typ dump.

## 2026-07-14 01:43 — D-0218 seed0104 @3031 upstairs geometry
- Objective: PROGRESS primary — seed0104 @3031 C `gethungry` vs JS `rn2(5)`.
- C locus: `mklev.c` `place_branch`/`find_branch_room`; `mkroom.c` `somex`/`somey`; `stairs.c` `u_on_upstairs` (symptom: `hack.c` `overexertion`).
- Result: **falsified** allotment/gethungry theories. After matched EOT, JS reaches rhack; `l` is free move because goblin is north (C: east). Initial upstairs attribution later **rejected** (see D-0219): create_room rects matched.
- Verification: green+strict preflight PASS; focused still 3034/3223; DIAG removed; no production change.
- Next: dump post-`sort_rooms` rects vs C; peel first diverging `create_room`; or D-0211 typ dump.

## 2026-07-14 02:10 — D-0219 test_move diagonal intact doorway
- Objective: PROGRESS primary — seed0104 @3031 (D-0218 upstairs theory).
- C locus: `hack.c` `test_move`/`doorless_door` testdiag; `steed.c` `landing_spot` via `test_move(TEST_MOVE)`.
- Result: **verified** — D-0218 upstairs/create_room origin **falsified** (matched makerooms/place_branch; early screens match). Real split: capital-`L` lookaround turned diagonally into an **open** door; C forbids diagonal into intact doorways. Ported ban in `domove` + steed `test_move_ok` (landing_spot arity).
- Verification: seed0104 RNG **3223**/3223 Scr **39**/43; rng-diff OK; green+strict+cohort PASS; full **18/44** Scr **1429** RNG **149118**.
- Next: seed0104 Scr residual (39/43); or D-0211 C typ dump; or seed0030 seg2 @2408.


## 2026-07-14 02:14 — D-0220 dismount look_here + float_down pickup
- Objective: PROGRESS primary — seed0104 Scr residual 39/43 after D-0219.
- C locus: `steed.c` `dismount_steed`/`float_down`; `hack.c` `spoteffects`
  `in_steed_dismounting`; `invent.c` `look_here` multi NHW_MENU.
- Result: **verified** — JS omitted float_down→pickup after dismount and
  stubbed multi look_here as pline; C shows WIN_MESSAGE `--More--` then
  "Things that are here:" menu. Ported pickup after teleds + NHW_MENU path.
- Verification: seed0104 **PASS** 43/43; green+strict+cohort PASS; full
  **19/44** Scr **1433** RNG **149124**.
- Next: D-0211 C typ dump / seed0030 seg2 @2408; or quest `getbones`
  `^V`/`makemaz`.

## 2026-07-14 02:25 — D-0211 dog_goal wantdoor / do_clear_area
- Objective: seed0030 seg2 @2408 (PROGRESS primary after D-0220).
- C locus: `dogmove.c:dog_goal`/`wantdoor`; `vision.c:do_clear_area`/
  `view_from` vis_func.
- Result: **verified** — C recorder falsified mfndpos SW-skip (cnt=8
  includes `(72,8)`). Peel was `!couldsee`→failed gettrack→`ogoal`/
  wantdoor `gg=(69,5)` vs JS hero fallback. Ported off-hero
  `do_clear_area` + wantdoor; store `edog.ogoal`.
- Verification: seg2 **2408→2930** (`eatcorpse`); positional
  **25256**/105529 Scr **48**/1953; green+strict+cohort PASS; full
  **19/44** Scr **1433** RNG **149674**.
- Next: seed0030 seg2 @2930 `eatcorpse`; or quest `getbones`
  `^V`/`makemaz`.

## 2026-07-14 02:30 — D-0221 floorfood + poison_strdmg
- Objective: seed0030 seg2 @2930 C `eatcorpse` rn2(20) vs JS rn2(3)
  (PROGRESS primary).
- C locus: `eat.c` `doeat`/`floorfood`/`eatcorpse`; `attrib.c`
  `poison_strdmg`/`losestr`.
- Result: **verified** — peel was missing `floorfood` yn on floor
  kobold corpse (`e`/`y`); invent-only getobj never reached eatcorpse.
  Also ported poison_strdmg(rnd(4),rnd(15)) stubbed after Ecch.
- Verification: seg2 **2930→3207** (`obj_resists`); positional
  **25538**/105529 Scr **48**/1953; green+strict+cohort PASS; full
  **19/44** Scr **1433** RNG **149541**.
- Next: seed0030 seg2 @3207 pet `obj_resists` after meal; or quest
  `getbones` `^V`/`makemaz`.

## 2026-07-14 02:35 — D-0222 useupf→delobj floor meal
- Objective: seed0030 seg2 @3207 C `obj_resists` vs JS `distfleeck`
  (PROGRESS primary after D-0221).
- C locus: `invent.c` `useupf`/`delobj_core`; `eat.c` `done_eating`.
- Result: **verified** — peel was floor meal finish missing
  `useupf`→`delobj`→`obj_resists(0,0)`. Invent path must not call
  `delobj` (`addinv` often omits `where=OBJ_INVENT`; invent-split
  children not in `game.invent` — gate floor via OBJ_FLOOR/pile).
- Verification: seg2 **3207→5939** (`distfleeck` vs `rn2(20)`);
  positional **28231**/105529 Scr **48**/1953; green+strict+cohort
  PASS; full **19/44** Scr **1433** RNG **152565**.
- Next: seed0030 seg2 @5939; or quest `getbones` `^V`/`makemaz`.

## 2026-07-14 02:45 — D-0223 m_search_items underfoot MMOVE_DONE
- Objective: seed0030 seg2 @5939 C `distfleeck` vs JS `rn2(20)`
  (PROGRESS primary after D-0222).
- C locus: `monmove.c` `m_search_items` underfoot → `MMOVE_DONE` →
  `postmov` → `mpickstuff`.
- Result: **verified** — leftover WORTHLESS_BLACK_GLASS redirected goblin
  `gg` after JS skipped underfoot claim (D-0183 deferral; `mpickstuff`
  already wired by D-0185). Restored underfoot `return true`. Also ported
  `dog_invent` underfoot eat before APPORT (not the peel writer).
- Rejected: APPORT/invent-eat/gettrack/meating/want_move at the index.
- Verification: seg2 **5939→6060** (`mattacku`); positional
  **28318**/105529 Scr **48**/1953; full **19/44** Scr **1433** RNG
  **152652**; green+strict+cohort PASS.
- Next: seed0030 seg2 @6060 `mattacku`; or quest `getbones` `^V`/`makemaz`.

## 2026-07-14 02:50 — D-0224 goto_level stairway_find_from (partial)
- Objective: seed0030 seg2 @6060 C mattacku vs JS rn2(8) (PROGRESS primary).
- C locus: `do.c`/`stairs.c` `stairway_find_from`; `mklev.c` `generate_stairs`
  (coords still wrong).
- Result: **diagnosed + partial** — peel is hero path drift from post-`>`
  landing upstairs JS @(66,2) vs C @(65,3), not dochug/mattacku. Ported
  `stairway_find_from` + goto_level use (marks u_traversed). Same wrong
  stair selected. Mklev RNG matches through mineralize.
- Rejected: fleeck/want_move; dog APPORT rn2(8) (was mtrack).
- Also: JS `F` unbound (Unknown command) — secondary.
- Verification: seg2 still **6060**; green+strict PASS; seed0015 cohort.
- Next: dlvl2 `generate_stairs` room bounds / somexy vs C @(65,3); then `F`.

## 2026-07-14 03:01 — D-0224 create_room absolute vs C screen
- Objective: PROGRESS primary — dlvl2 upstairs @(66,2) vs C @(65,3).
- C locus: `sp_lev.c` `create_room` @3360–3365; `mklev.c` `generate_stairs`;
  C session corners/`<` glyph.
- Result: **falsified/narrowed** — not somexy-with-matched-lx. JS+C
  create_room RNG+formula both yield room **(64,2)–(75,4)** → stairs
  **(66,2)** (`rn2(12)=2`/`rn2(3)=0`). C screen corners (62,2)/(75,6)
  ⇒ interior **(63,3)** and `<` @**(65,3)**. Theme for that room is
  `default` (no fill). No production change this iteration.
- Rejected: find_from as writer; somexy offset alone; themed-fill mutation.
- Verification: green+strict PASS; seed0015/seed1500 PASS; seg2 still 6060.
- Next: reconcile create_room math (64,2) vs C terrain (63,3) — earlier
  split_rects/room0–1, or C add_room dump; then `F`.

## 2026-07-14 03:16 — D-0225 F/do_fight (seg2 FULL); D-0224 rejected
- Objective: PROGRESS primary — seed0030 seg2 @6060 (D-0224 upstairs theory).
- C locus: `cmd.c` `do_fight`; `hack.c` `domove_fight_empty`; tty `setCell(x-1,y+1)`.
- Result: **verified** — D-0224 upstairs geometry **rejected** (screen≠map;
  C map stairs (66,2) matched JS). Real peel: unbound `F`. Ported forcefight
  prefix + thin-air/solid `domove_fight_empty`. seg2 RNG **6221/6221** FULL.
- Verification: full **19/44** Scr **1433** RNG **157355**; green+strict PASS;
  17-session PASS cohort held; positional seed0030 **33021**/105529.
- Next: seed0030 seg3 @4527 themerms `contents`/`rn2(4)`.

## 2026-07-14 03:22 — D-0226 Nesting rooms + positioned create_room
- Objective: PROGRESS primary — seed0030 seg3 @4527 themerms contents rn2(4) vs rn2(100).
- C locus: themerms.lua:346 Nesting rooms; sp_lev.c build_room/create_room positioned @1580.
- Result: **verified** — Nesting evaluates nh.rn2(4) w/h before build_room rn2(100);
  JS fell through as blind rn2(100)+fully-random create_room. Ported Nesting size
  rolls + create_room positioned branch (rnd(5)/rnd(3)+get_rect); themeroom_failed
  on fail. Nested create_subroom/door deferred (outer fails after 100 tries here).
- Verification: seg3 **4527→7617** (mhitm_knockback); positional **36316**/105529;
  full **19/44** Scr **1433** RNG **160650**; green+strict PASS; cohort held.
- Next: seed0030 seg3 @7617 knockback vs rn2(25); or quest getbones ^V/makemaz.

## 2026-07-14 03:24 — D-0227 hmon weapon mhitm_knockback
- Objective: PROGRESS primary — seed0030 seg3 @7617 C mhitm_knockback vs JS rn2(25).
- C locus: uhitm.c hmon_hitmon maybe_knockback @1829–1932; mhitm_knockback @5258–5269.
- Result: **verified** — after matched dmgval, C burns knockback rn2(3)+rn2(6)
  before known_hitum flee rn2(25). JS hmon skipped the call. Wired maybe_knockback
  → existing mhitm_knockback stub (hurtle still deferred).
- Verification: seg3 **7617→7935**; positional **36491**/105529; full **19/44**
  Scr **1433** RNG **160825**; green+strict PASS; 19-session PASS cohort held.
- Next: seed0030 seg3 @7935 C gethungry/hitum vs JS distfleeck (hero turn vs
  monster move after matched moveloop rn2(79)).

## 2026-07-14 03:45 — D-0228 cmd_safety_prevention s/.
- Objective: PROGRESS primary — seed0030 seg3 @7935 C gethungry/hitum vs JS distfleeck.
- C locus: do.c cmd_safety_prevention/donull; detect.c dosearch; hack.c monster_nearby.
- Result: **verified** — at matched EOT, C safety-rejected s/. (0 RNG) then h melee;
  JS ran real dosearch → monster turns (key desync). Ported monster_nearby +
  cmd_safety_prevention; dosearch/donull return gates context.move.
- Verification: seg3 **7935→8561** (xkilled treasure mkobj); positional
  **37147**/105529 Scr **56**/1953; full **19/44** Scr **1441** RNG **161481**;
  green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg3 @8561 xkilled treasure mkobj; or quest getbones ^V/makemaz.

## 2026-07-14 03:48 — D-0229 xkilled treasure mkobj
- Objective: PROGRESS primary — seed0030 seg3 @8561 C mkobj treasure vs JS rn2(3).
- C locus: mon.c xkilled @3586–3615 (mkobj RANDOM_CLASS after !rn2(6)).
- Result: **verified** — JS burned !rn2(6) then skipped the body. Ported
  xkilled_treasure_drop: G_NOCORPSE/hero-tile/S_KOP/mcloned gates; mkobj;
  FOOD non-COLLECT or small-mon oversized → delobj; else place+stack.
  flooreffects non-floor arms + artifact un-create deferred.
- Verification: seg3 **8561→9166**; positional **37565**/105529 Scr **56**/1953;
  full **19/44** Scr **1441** RNG **161899**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg3 @9166 after matched EOT — C gethungry/hitum vs JS
  distfleeck (key/command desync class); or quest getbones ^V/makemaz.

## 2026-07-14 03:58 — CORPSE weight mons[corpsenm].cwt (D-0230)
- Objective: seed0030 seg3 @9166 C gethungry/hitum vs JS distfleeck.
- C locus: mkobj.c weight CORPSE branch.
- Result: **verified** — JS weight used oc_weight/fallback (owt=1) so can_carry
  let m_search_items divert goblin gg to gnome corpse; C uses mons[cwt] (too
  heavy) so goblin stayed on gettrack→(26,6) for hero melee. Falsified key-desync.
- Verification: seg3 **9166→9299**; positional **38048**/105529 Scr **56**/1953;
  full **19/44** Scr **1441** RNG **162377**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg3 @9299 C rnl(7) dosearch0 vs JS distfleeck; or quest getbones.

## 2026-07-14 04:05 — blocksMove IS_OBSTRUCTED/SDOOR (D-0231)
- Objective: seed0030 seg3 @9299 C rnl(7) dosearch0 vs JS distfleeck.
- C locus: hack.c test_move IS_OBSTRUCTED(typ)||IRONBARS (rm.h typ<POOL).
- Result: **verified** — JS blocksMove allowed walk onto SDOOR (typ=14);
  C blocked j into SDOOR (0 RNG) then s→rnl. Fixed blocksMove to
  IS_OBSTRUCTED+IRONBARS+closed DOOR. Rejected dosearch/safety/key theories.
- Verification: seg3 **9299→9778**; positional **38253**/105529 Scr **48**/1953;
  full **19/44** Scr **1433** RNG **162593**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg3 @9778 C m_move rn2(8) vs JS distfleeck; or quest getbones.

## 2026-07-14 04:20 — find_misc WAN_SPEED shopkeeper (D-0232)
- Objective: seed0030 seg3 @9778 C m_move rn2(8) vs JS distfleeck.
- C locus: monmove.c dochug find_defensive/find_misc; muse.c
  find_misc/use_misc/mzapwand; worn.c mon_adjust_speed.
- Result: **verified** — shopkeeper with charged WAN_SPEED_MONSTER
  within dist≤36: C use_misc spends turn (no post fleeck); JS fell
  through to shk_move+post fleeck. Ported find_misc/use_misc speed
  + mon_adjust_speed + mcalcmove MFAST + dochug wire.
- Verification: seg3 **9778→9850**; positional **38260**/105529 Scr
  **48**/1953; full **19/44** Scr **1433** RNG **162600**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg3 @9850 C distfleeck vs JS rn2(2) after
  move_special; or quest getbones.

## 2026-07-14 04:45 — mfndpos NOTONL (D-0233)
- Objective: seed0030 seg3 @9850 C distfleeck vs JS rn2(2) after move_special rn2(1).
- C locus: mon.c mfndpos monseeu/monlineu → NOTONL; priest.c move_special avoid skip.
- Result: **verified** — shk home (10,9), hero on door (11,9), avoid+uondoor+appr=0: C marked online cells NOTONL so only one rn2(1); JS never set NOTONL and burned rn2(1..4). Rejected invent-walk/inhishop/IS_ROOM theories.
- Verification: seg3 **9850→9881**; positional **38265**/105529 Scr **48**/1953; full **19/44** Scr **1433** RNG **162605**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg3 @9881 C use_offensive vs JS distfleeck; or quest getbones.

## 2026-07-14 05:30 — setmangry + WAN_STRIKING mbhit (D-0234)
- Objective: seed0030 seg3 @9881 C use_offensive rn2(8) vs JS distfleeck.
- C locus: uhitm.c missum/hmon→wakeup; mon.c setmangry/wakeup; muse.c
  find_offensive/use_offensive/mbhit/mbhitm WAN_STRIKING.
- Result: **verified** — Maganasipi stayed peaceful after miss (no
  setmangry); once angry, WAN_STRIKING mbhit+Antimagic Boing needs
  worn MR cloak as Antimagic while oc_oprop deferred. Screen confirmed
  “zaps a long wand! Boing!”.
- Verification: seg3 **9881→9887**; positional **38305**/105529 Scr
  **48**/1953; full **19/44** Scr **1433** RNG **162645**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg3 @9887 C mattacku vs JS rn2(8); or quest getbones.

## 2026-07-14 04:35 — monstseesu M_SEEN_MAGR (D-0235)
- Objective: seed0030 seg3 @9887 C mattacku rnd(20) vs JS rn2(8).
- C locus: muse.c mbhitm/find_offensive; mondata.c monstseesu;
  monst.h seen_resistance; vision.h m_canseeu.
- Result: **verified** — Antimagic Boing must monstseesu(M_SEEN_MAGR);
  find_offensive WAN_STRIKING needs !m_seenres. Without it Maganasipi
  MFAST second dochug re-zapped instead of melee.
- Verification: seg3 **FULL**; positional **40677**/105529 Scr
  **48**/1953; full **19/44** Scr **1433** RNG **165017**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg4 @2369 ini_inv_adjust_obj; or quest getbones.

## 2026-07-14 04:45 — ini_inv_adjust_obj UNDEF_SPE ring rne (D-0236)
- Objective: seed0030 seg4 @2369 C rn2(3) ini_inv_adjust_obj vs JS rn2(1).
- C locus: u_init.c ini_inv_adjust_obj UNDEF_SPE charged-ring arm; rnd.c rne.
- Result: **verified** — Wizard kit UNDEF_SPE charged ring with spe≤0
  after cursed=0 must rne(3); JS omitted the else branch and jumped to
  next trquan. Rejected quan/second-ring/MAGIC_MARKER theories.
- Verification: segs 0–3 FULL; seg4 **2369→6630** (drinkfountain);
  positional **45217**/105529 Scr **59**/1953; full **19/44** Scr
  **1444** RNG **169732**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg4 @6630 drinkfountain; or quest getbones.

## 2026-07-14 04:50 — drinkfountain / dodrink fountain yn (D-0237)
- Objective: seed0030 seg4 @6630 C rnd(30) drinkfountain vs JS rn2(5).
- C locus: potion.c dodrink fountain yn; fountain.c drinkfountain/dryup.
- Result: **verified** — JS skipped fountain prompt so `y` cancelled
  getobj; C drank with fate=rnd(30) (this seed default tasteless + dryup).
  Ported dodrink fountain arm + drinkfountain branch envelope.
- Verification: segs 0–3 FULL; seg4 **6630→7554** (exercise vs
  distfleeck on `k`); positional **45960**/105529 Scr **59**/1953;
  full **19/44** Scr **1444** RNG **170543**; green+strict PASS;
  17-session PASS cohort held.
- Next: seed0030 seg4 @7554 exercise after move; or quest getbones.

## 2026-07-14 04:58 — moverock/dopush boulder push (D-0238)
- Objective: seed0030 seg4 @7554 C rn2(19) exercise vs JS rn2(5) distfleeck.
- C locus: hack.c moverock/dopush/movobj; test_move boulder arm; attrib.c exercise.
- Result: **verified** — steps[96].key is "k" (moves[95]); C pushes adjacent
  boulder with great-effort STR exercise; JS walked onto the boulder.
  Rejected walk/exerchk/"h" theories. Landmark: session steps[i].key = moves[i-1].
- Verification: segs 0–3 FULL; seg4 **FULL**; positional **46654**/105529 Scr
  **69**/1953; full **19/44** Scr **1454** RNG **171238**; green+strict PASS;
  PASS cohort held.
- Next: seed0030 seg5 @3076 dart next_ident; or quest getbones.

## 2026-07-14 05:05 — hero dotrap dart (D-0239)
- Objective: seed0030 seg5 @3076 C rnd(2) next_ident vs JS rn2(12).
- C locus: hack.c spoteffects; trap.c dotrap/trapeffect_dart_trap/t_missile;
  mthrowu.c thitu.
- Result: **verified** — JS spoteffects never called dotrap; C always
  t_missile(DART) before thitu (miss places dart). Screen confirmed
  “A little dart shoots out at you!  A little dart misses you.”
  Rejected mineralize/rn2(12) and allocate-only-on-hit theories.
- Verification: segs 0–4 FULL; seg5 **3076→3096**; positional
  **46375**/105529 Scr **69**/1953; full **19/44** Scr **1454** RNG
  **171026**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg5 @3096 C distfleeck vs JS rnd(2) (pet glass wand);
  or quest getbones.

## 2026-07-14 05:20 — NHW_MENU dmore quitchars (D-0240)
- Objective: seed0030 seg5 @3096 C distfleeck rn2(5) vs JS rnd(2).
- C locus: wintty.c process_text_window/dmore; getline.c xwaitforspace(quitchars);
  invent.c look_here.
- Result: **verified** — look_here NHW_MENU dismissed on any key in JS; C
  ignores l/k so space closes pile then b moves SW. JS second l walked east
  onto adjacent second dart trap → extra t_missile/next_ident. Rejected
  pet APPORT/glass-wand and leave-retrigger theories.
- Verification: seg5 **3096→4174**; positional **46399**/105529 Scr
  **69**/1953; full **19/44** Scr **1441** RNG **169781**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg5 @4174 C dog_move rn2(12) vs JS fleeck; or quest getbones.

## 2026-07-14 05:37 — mhitm gv.vis / dark pet combat (D-0241)
- Objective: seed0030 seg5 @4174 C dog_move rn2(12) vs JS fleeck rn2(5).
- C locus: mhitm.c mattackm gv.vis; hitmm/missmm; mon.c monkilled cansee.
- Result: **verified** — JS always plined pet bites; dark fight forced
  topline more() which discarded west h until space → key desync →
  distmin=5 vs C >5 mtrack peel. Rejected shipping distmin >=5.
  Lesson: late dog_move arity peels after matched RNG → check more()/vis.
- Verification: seg5 **4174→4372** (C linedup rn2(3) vs JS m_move rn2(16));
  positional **46404**/105529 Scr **70**/1953; full **19/44** Scr **1442**
  RNG **169786**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg5 @4372 C linedup vs JS m_move; or quest getbones.

## 2026-07-14 05:43 — linedup boulder + vision BOULDER does_block (D-0242)
- Objective: seed0030 seg5 @4372 C linedup rn2(3) vs JS m_move rn2(16).
- C locus: vision.c does_block BOULDER; mthrowu.c linedup/m_lined_up;
  monmove.c m_move getitems lined_up.
- Result: **verified** — JS couldsee stayed true because vision _blocks
  ignored BOULDER, so linedup never reached rn2(2+spots). Ported does_block
  boulder opacity + full linedup boulder walk + lined_up mux/muy; movobj
  recalc_block_point on boulder push. Rejected thrwmu-only theory.
- Verification: segs 0–5 C-prefix FULL (seg5 **4372→8397**); next seg6
  @339 lspo_map rn2(68) vs rn2(100); positional **46537**/105529 Scr
  **70**/1953; full **19/44** Scr **1442** RNG **169919**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @339 lspo_map; or quest getbones.

## 2026-07-14 05:50 — Blocked center themerms map + replace_terrain (D-0243)
- Objective: seed0030 seg6 @339 C lspo_map rn2(68) vs JS rn2(100).
- C locus: themerms.lua Blocked center; sp_lev.c lspo_map /
  lspo_replace_terrain; nhlib.lua shuffle/percent.
- Result: **verified** — reservoir pick was Blocked center; JS lacked
  the map entry and fell through to build_room. Ported 11×11 map +
  percent/shuffle/region replace_terrain (L→wall|pool) + filler_region.
  Rejected generic map-fill chance theory without identifying the pick.
- Verification: seg5 still C-prefix FULL; seg6 **339→2638**
  (rndmonst_adj); positional **46679**/105529 Scr **71**/1953; full
  **19/44** Scr **1446** RNG **172878**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg6 @2638 rndmonst_adj; or quest getbones.

## 2026-07-14 05:55 — FIGURINE rndmonnum_adj(5,10) (D-0244)
- Objective: seed0030 seg6 @2638 C rn2(2) rndmonst_adj vs JS rn2(3).
- C locus: mkobj.c mksobj_init TOOL/FIGURINE; rndmonnum_adj/rndmonst_adj;
  mondata.h is_human.
- Result: **verified** — fill mkobj picked FIGURINE; C uses
  rndmonnum_adj(5,10) (minmlev+5/maxmlev+10 → weight seq 2,4,5,8,…)
  + is_human retry + blessorcurse(4). JS omitted the arm so post-init
  fell through to plain rndmonnum() → jackal rn2(3). Rejected
  align_shift/maxmlev as the arity gap (earlier same-mklev rndmonst
  still used the short pool).
- Verification: seg6 **2638→4080** (m_move vs distfleeck); positional
  **46708**/105529 Scr **71**/1953; full **19/44** Scr **1446** RNG
  **172907**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @4080 m_move/distfleeck; or quest getbones.

## 2026-07-14 06:05 — m_harmless_trap BEAR_TRAP size (D-0245)
- Objective: seed0030 seg6 @4080 C rn2(12) m_move vs JS rn2(5) fleeck.
- C locus: trap.c m_harmless_trap BEAR_TRAP (msize<=MZ_SMALL);
  mon.c mfndpos known-trap skip; monmove.c mtrack rn2(4*(cnt-j)).
- Result: **verified** — newt kept mtrack backtrack cell when C treats
  bear trap as harmless; JS stub marked all bear traps harmful so
  known-trap skip dropped cnt and skipped the burn. Ported BEAR/WEB/
  RUST/VIBRATING/PIT-clinger arms + amorphous/unsolid/is_whirly.
- Verification: seg6 **4080→10280**; positional **47171**/105529 Scr
  **70**/1953; full **19/44** Scr **1445** RNG **173370**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @10280 obj_resists vs rn2(4); or quest getbones.

## 2026-07-14 06:15 — goodpos accessible closed door (D-0246)
- Objective: seed0030 seg6 @10280 C obj_resists vs JS rn2(4).
- C locus: teleport.c goodpos → monmove.c accessible/closed_door;
  dog.c mon_arrive/mnexto/enexto.
- Result: **verified** — after descend, JS enexto placed kitten on
  closed door (34,7) because goodpos used bare ACCESSIBLE(DOOR);
  C rejects closed doors and placed elsewhere so dog_goal saw gold
  and burned obj_resists. Ported accessible+occupied+boulder+amorph
  door gates in js/teleport.js goodpos.
- Verification: seg6 **10280→10815**; positional **47132**/105529 Scr
  **70**/1953; full **19/44** Scr **1445** RNG **173331**; green+strict
  PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @10815 themerms/nhlib shuffle; or quest getbones.

## 2026-07-14 06:20 — Buried zombies themerms fill (D-0247)
- Objective: seed0030 seg6 @10815 C rn2(4) nhlib shuffle vs JS rn2(1).
- C locus: themerms.lua Buried zombies; nhlib.lua shuffle; sp_lev.c
  create_object buried CORPSE/set_corpsenm; dig.c bury_an_obj;
  nhlobj.c object timers.
- Result: **verified** — fill reservoir matched; pick was Buried
  zombies; JS lacked THEMEROOM_FILL_BODIES entry so next room
  reservoir started early. Ported shuffle + (w*h)/2 buried CORPSE
  path (mksobj→set_corpsenm→obj_resists bury→zombify 990+rn2(21)).
  Rejected region/selection list-length as the arity gap.
- Verification: seg6 **10815→11830** (positioned create_room);
  positional **47186**/105529 Scr **71**/1953; full **19/44** Scr
  **1456** RNG **180270**; green+strict PASS; 17-session PASS cohort
  held.
- Next: seed0030 seg6 @11830 positioned create_room; or quest getbones.

## 2026-07-14 04:21 — sized rectangular themerms outer (D-0248)
- Objective: seed0030 seg6 @11830 C `rnd(5)` positioned create_room vs JS `rn2(6)`.
- C locus: themerms.lua Fake Delphi w=11,h=9; sp_lev.c create_room positioned @1585.
- Result: **verified** — reservoir pick was Fake Delphi (`rn2(1001)=0`);
  JS fell through as fully-random create_room. Ported outer sizes for
  Fake Delphi / Huge / Pillars / Mausoleum / Random feature / Twin
  businesses (size RNG before build_room rn2(100)). Nested bodies deferred.
- Verification: seg6 **11830→13801** (`rnd_defensive_item`); positional
  **47366**/105529 Scr **70**/1953; full **19/44** Scr **1455** RNG
  **180450**; seed0013 **560→4004** Scr **1→6**; green+strict PASS;
  17-session PASS cohort held.
- Next: seed0030 seg6 @13801 m_initinv→rnd_defensive_item; or quest getbones.

## 2026-07-14 06:26 — m_initinv rnd_defensive_item (D-0249)
- Objective: seed0030 seg6 @13801 C `rn2(11)` rnd_defensive_item vs JS `rn2(100)`.
- C locus: makemon.c m_initinv @826; muse.c rnd_defensive_item @1222.
- Result: **verified** — JS burned rn2(50) then skipped defensive body.
  Ported rnd_defensive_item + mongets wire + PM_SOLDIER rn2(13) early
  return; attacktype(AT_EXPL) shared with rnd_misc_item.
- Verification: seg6 **13801→15369** (mcalcmove vs distfleeck); positional
  **47351**/105529 Scr **79**/1953; full **19/44** Scr **1464** RNG
  **180435**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @15369 moveloop actor drift (fmon dump at matched
  m_move rn2(12)=8); or quest getbones.

## 2026-07-14 06:33 — trapeffect_hole TRAPDOOR migrate (D-0250)
- Objective: seed0030 seg6 @15369 C `mcalcmove` vs JS `distfleeck` after matched m_move.
- C locus: trap.c trapeffect_hole; teleport.c mlevel_tele_trap/teleport_pet; dog.c migrate_to_level; dungeon.c Can_fall_thru.
- Result: **verified** — mon stepped onto TRAPDOOR; C migrated (Trap_Moved_Mon, no post-fleeck); JS selector no-op. Ported trapeffect_hole + mlevel_tele_trap hole path + migrate_to_level + Can_fall_thru.
- Verification: seg6 **15369→17712** (peace_minded rn2(21) vs rn2(16)); positional **47653**/105529 Scr **79**/1953; full **19/44** Scr **1464** RNG **180734**; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg6 @17712 peace_minded arity; or quest getbones.

## 2026-07-14 06:37 — set_malign + xkilled adjalign (D-0251)
- Objective: seed0030 seg6 @17712 C `rn2(21)` peace_minded vs JS `rn2(16)`.
- C locus: makemon.c set_malign; mon.c xkilled adjalign(malign); attrib.c adjalign/ALIGNLIM.
- Result: **verified** — arity was ualign.record 5 vs 0 after one hostile
  kill. Ported set_malign (makemon + m_initgrp), adjalign/ALIGNLIM, and
  xkilled peaceful−5 + adjalign(malign). Rejected formula/initrecord/
  hatemask theories.
- Verification: seg6 **17712→18683** (dmgval vs rn2(5) after dart thitm);
  peace_minded rn2(21) matched; full **19/44** Scr **1464** RNG
  **180734**; green+strict PASS; 19-session PASS cohort held.
- Next: seed0030 seg6 @18683 dart/dmgval; or quest getbones.

## 2026-07-14 06:45 — thitm hit dmgval (D-0252)
- Objective: seed0030 seg6 @18683 C `rnd(3) @ dmgval` vs JS `rn2(5)` after dart thitm.
- C locus: trap.c thitm — dam = dmgval(obj, mon); clamp >= 1.
- Result: **verified** — matched rnd(20)=17 was a hit; JS stubbed dam=1
  without dmgval RNG. Wired real dmgval. Not a miss.
- Verification: seg6 **18683→18840** (m_move rn2(24) vs rn2(16)); full
  **19/44** Scr **1464** RNG **180765**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg6 @18840 m_move track arity; or quest getbones.

## 2026-07-14 06:55 — seg6 @18840 map drift diagnosis (D-0253)

- Objective: seed0030 seg6 @18840 C `rn2(24) @ m_move` vs JS `rn2(16)`.
- C locus: symptom in `monmove.c` m_move track; real gap Mines
  `dig_corridor`/`join`/`wallification` / `set_wall_state`.
- Result: **falsified track-arity theory** — same fleeck then JS
  bow-gnome `(27,12)` cnt=4 vs C screen gnome~(26,10) / kobold~(28,13)
  walkable; JS `(28,13)` STONE→TRCORNER never corridor. No production
  change.
- Verification: green+strict preflight PASS; seg6 still @18840.
- Next: falsify/post Mines mklev typ at (28,13); port corridor dig/join
  — not m_move track; or quest getbones.

## 2026-07-14 07:15 — D-0253 Mines mkmap typ refined

- Objective: primary D-0253 — why JS `(28,13)` is wall vs C walkable.
- C locus: `mkmap.c` pass/join + `sp_lev.c` `dig_corridor` / wallify;
  peel is Mines depth 4 (not first DoD descend).
- Result: **falsified mdig-opener + refined map theory** — stage snaps
  show (28,13) STONE through init_fill→join; wallify→TRCORNER; join dig
  `(28,3)→(29,18)` carved x=29 only; cavern room hy=12; RNG matches
  through Mines mklev (18225); C kobold on (28,13) by step 142. No
  production change (DIAG removed).
- Verification: green+strict preflight PASS; seg6 still @18840.
- Next: C typ after minefill join at (28,13); find pass/join reason
  cavern stops at y=12; or quest getbones.

## 2026-07-14 07:35 — D-0253 map theory rejected (DEC misread)

- Objective: primary D-0253 — Mines `(28,13)` wall vs C “kobold”.
- C locus: symptom `monmove.c` m_move track; rejected `mkmap.c` join;
  real gap hostile gnome path after step ~170.
- Result: **falsified mkmap/(28,13) theory** — SO/SI-aware parse: DEC
  `k` is `┐` TRCORNER, not kobold; JS+C both wall there; join dig
  `(28,3)→(29,18)` + cavern hy=12 + room `somex` widths match; mklev
  RNG 18225/18225. Peel: step 170 both G@(26,11); step 174 C
  G@(26,10) vs JS @(28,12); @18840 JS `#165` cnt=4 vs C cnt=6. No
  production change (DIAG removed).
- Verification: green+strict preflight PASS; seg6 still @18840.
- Next: gnome `(26,11)` `m_move` poss/track/gg 170→174; or quest
  getbones.

## 2026-07-14 07:55 — m_balks_at_approaching (D-0253)

- Objective: seed0030 seg6 @18840 C `rn2(24) @ m_move` vs JS `rn2(16)` (gnome cnt).
- C locus: monmove.c m_balks_at_approaching; mthrowu.c m_has_launcher_and_ammo.
- Result: **verified** — gnome #240@(26,11) had bow+arrows but appr=1;
  C launcher balks → appr=-1 (flee). Ported m_has_launcher_and_ammo,
  m_balks (launcher/pole/aklys/ranged_attk), appr==-2 selection;
  exported is_pole/m_canseeu. Map/(28,13) already rejected.
- Verification: seg6 **18840→18913** (trapeffect_magic_trap); full
  **19/44** Scr **1464** RNG **180712**; green+strict PASS; 17-session
  PASS cohort held.
- Next: seed0030 seg6 @18913 trapeffect_magic_trap; or quest getbones.

## 2026-07-14 07:30 — trapeffect_magic_trap (D-0254)

- Objective: seed0030 seg6 @18913 C `rn2(21) @ trapeffect_magic_trap`
  vs JS fleeck `rn2(5)`.
- C locus: trap.c trapeffect_magic_trap / trapeffect_fire_trap; selector
  MAGIC_TRAP/FIRE_TRAP.
- Result: **verified** — JS selector no-op’d MAGIC_TRAP; C burned
  immunity `rn2(21)` (both seg6 hits nonzero → no fire). Ported mon
  magic_trap + fire_trap envelope (d(2,4)/thitm/burnarmor naked) and
  wired selector. Hero domagictrap deferred.
- Verification: seg6 **18913→19831** (`next_ident`); full **19/44**
  Scr **1463** RNG **180519**; green+strict PASS; 17-session PASS
  cohort held.
- Next: seed0030 seg6 @19831 `next_ident` vs `rn2(2)`; or quest getbones.

## 2026-07-14 — losehp→done + bones (D-0255)

- Objective: seed0030 seg6 @19831 C `rnd(2) @ next_ident` vs JS `rn2(2)`.
- C locus: hack.c losehp; end.c really_done; bones.c drop_upon_death /
  savebones ghost.
- Result: **verified** — value-matched rn2(2) was JS exercise after
  fatal thitu/losehp that returned; C done(DIED) noreturn. Ported
  finish_losehp_done, skip exercise/mulch, bones_ok mk_named CORPSE +
  drop_upon_death + PM_GHOST MM_NONAME; can_make_bones before flush.
- Verification: seg6 **FULL** 19884/19884; next seg7 @9290
  trapeffect_slp_gas_trap; full **19/44** Scr **1463** RNG **180984**;
  seed0030 **47905**/105529; green+strict PASS; 17-session PASS cohort
  held.
- Next: seed0030 seg7 @9290 trapeffect_slp_gas_trap; or quest getbones.

## 2026-07-14 07:36 — trapeffect_slp_gas_trap (D-0256)

- Objective: seed0030 seg7 @9290 C `rnd(25) @ trapeffect_slp_gas_trap`
  vs JS fleeck `rn2(5)` (PROGRESS primary).
- C locus: trap.c trapeffect_slp_gas_trap / selector; mhitm.c sleep_monst;
  mondata.h breathless; prop.h mr_bit.
- Result: **verified** — selector no-op’d SLP_GAS so fleeck occupied the
  slot. Ported monster sleep-gas (`sleep_monst(rnd(25),-1)`),
  resists_sleep/mr_bit, M1_BREATHLESS/breathless; wired selector.
- Verification: seg7 **9290→9811** (`m_move` track rn2(32)); full
  **19/44** Scr **1463** RNG **180932**; seed0030 **47853**/105529;
  green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg7 @9811 diagnose m_move track/cnt (or actor drift);
  or quest getbones.

## 2026-07-14 07:45 — mcalcdistress mfrozen thaw (D-0257)

- Objective: seed0030 seg7 @9811 C `rn2(32) @ m_move` track vs JS
  `rn2(3)` dog_move (PROGRESS primary).
- C locus: mon.c mcalcdistress/m_calcdistress; allmain.c EOT before
  movement reallocation; monmove.c mon_regen.
- Result: **verified** — sleep-gas set mfrozen but JS never thawed;
  C hostile moved while JS pet dog_moved. Ported mcalcdistress
  (mblinded/mfrozen/mfleetim + mon_regen); wired moveloop_core;
  M1_REGEN/regenerates.
- Verification: seg7 **9811→10404** (`use_offensive`); full **19/44**
  Scr **1463** RNG **181210**; seed0030 **48131**/105529;
  green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg7 @10404 use_offensive/mbhitm; or quest getbones.

## 2026-07-14 08:05 — find_offensive nomore (D-0258)

- Objective: seed0030 seg7 @10404 C `rn2(8) @ use_offensive` vs JS
  `rn2(92)` (PROGRESS primary).
- C locus: muse.c find_offensive invent loop / `#define nomore`;
  use_offensive WAN_STRIKING→mbhit(rn1(8,6)).
- Result: **verified** — Swidnica invent GOLD→WAN→KEY→POT (matched
  create RNG); C nomore keeps WAN once selected so later POT skipped;
  JS overwrote with potion throw→catch rn2(92). Screen “zaps a short
  wand!”. Ported nomore continue for striking + pot_* subset.
- Verification: seg7 **FULL** 10584/10584; next seg8 @3088 dog_goal;
  full **19/44** Scr **1463** RNG **180985**; seed0030
  **47906**/105529; green+strict PASS; 17-session PASS cohort held.
- Next: seed0030 seg8 @3088 dog_goal; or quest getbones.

## 2026-07-14 08:25 — D-0259 hero xy vs pet pathing

- Objective: seed0030 seg8 @3088 C `rn2(4) @ dog_goal` vs JS `rn2(1)`
  (PROGRESS primary).
- C locus: dogmove.c dog_goal/dog_move; suspected earlier hero `k`
  off stairs (hack.c domove), not mfndpos squeeze.
- Result: **diagnosis only** — APPORT matched; JS selects (65,15)
  toward hero-on-stairs (64,15); C same-step screen has hero (64,14)
  stairs (64,15). Place-abort stay-(66,16) falsified (worse @3087).
  Candidate exclude-(65,15)→(65,16) advances 3088→3106 only (symptom
  mask). No production change.
- Verification: green gate not re-scored (docs-only); dogmove restored
  clean.
- Next: falsify JS `u.uy` at dog_goal @3067; find why `k` did not
  leave stairs (extra `--More--` / blocked north / restore).

## 2026-07-14 — D-0266 hero MAGIC_TRAP / domagictrap

- **Objective:** seed0030 seg9 @8918 — C `rn2(30) @ trapeffect_magic_trap`
  vs JS `rn2(5)` (PROGRESS primary after D-0265).
- **C locus:** `trap.c` `trapeffect_magic_trap` hero + `domagictrap`;
  `dofiretrap`; `potion.c` `self_invis_message`/`make_blinded`/
  `incr_itimeout`; `dog.c` `tamedog` (fate 19).
- **Change:** ported hero MAGIC_TRAP (`seetrap`/`rn2(30)` explosion or
  `domagictrap`); full `domagictrap` fate envelope (this seed fate=11
  HInvis); `dofiretrap` null-box floor path; hero FIRE_TRAP→`dofiretrap`;
  minimal `tamedog` export. Named omissions: fate-20 seffects remove-curse;
  destroy_items/ignite/burn_floor; minuhpmax/losexp; steedintrap body.
- **Verification:** seg9 **8918→8943**; green+strict PASS; 17-session PASS
  cohort; full **19/44** Scr **1563** RNG **182691**; seed0030
  **48104**/105529.
- **Next:** D-0267 — post-Invis `set_apparxy` vs fleeck @8943 (mux/
  perceives dump).

## 2026-07-14 01:40 — tutorial stay-open + death disclose (D-0215/16)
- Objective: seed0103 Scr residual after D-0214 (PROGRESS primary).
- C locus: `options.c` `ask_do_tutorial` + `wintty.c` `process_menu_window`;
  `end.c` `really_done`/`disclose`.
- Result: **verified** — invalid tutorial letter stays open (no premature
  Please choose); `really_done` flushes `You die...` then possessions yn.
  seed0103 **PASS**.
- Verification: green+strict+cohort PASS; full **18/44** Scr **1405**
  RNG **148875**.
- Next: `node scripts/rng-diff.mjs sessions/seed0104-knight-ride-combat.session.json`
  (first mismatch @2841) or D-0211 typ dump.

## 2026-07-14 16:35 — D-0268/69/70 Invis rn2(11) + SCORR vision

- Objective: seed0030 seg9 @10461 (CURRENT primary D-0268).
- C locus: `monmove.c` `m_move` Invis `rn2(11)`; `detect.c` SCORR
  `unblock_point`; `mkobj.c` boulder `place_object`/`remove_object`.
- Change: ported Invis appr gate (D-0268); SCORR/SDOOR uncover →
  `recalc_block_point` not `vision_recalc(1)` (D-0269); boulder
  place/extract vision (D-0270). Falsified: Invis gate alone —
  `couldsee` false from stale `viz_clear` after SCORR→CORR.
- Verification: seg9 **10461→10811**; green+strict PASS; 19-session PASS
  cohort; full **19/44** Scr **1563** RNG **182673**.
- Next: D-0271 — diagnose seg9 @10811 C `next_ident` vs JS `rn2(5)`.

## 2026-07-14 16:25 — docs hot-pack restructure (CURRENT.md)

- Objective: cut per-iteration doc tokens (human-approved Sol plan).
- Change: add `CURRENT.md`; archive PROGRESS/journal bulk; split
  `DIVERGENCE-INDEX.md` + `c-js-map/*.md`; slim NOTES; update playbook/
  prompt/rules/runbook; add `scripts/check-hot-docs.mjs`.
- Verification: `node scripts/check-hot-docs.mjs` PASS (~4.7k tok hot sum).
- Next: loop agents follow `CURRENT.md` primary (D-0268); do not re-expand
  archive into the hot pack.
