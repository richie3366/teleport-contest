# Agent loop journal archive

## 2026-07-19 — #814 mfndpos onscary/garlic/bars/gas (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); port deferred mfndpos arms.
- C locus: `mon.c` `mfndpos`; `monmove.c` `onscary`.
- Change: mconf/`!mcansee` flags; IRONBARS; poison-gas; onscary (scare/
  Elbereth/altar-vamp); garlic. Falsified: these arms drop cnt in JS
  state @miss (still 7); j=2 mtrack → same 10217 arity-only.
- Verification: green+strict PASS; cohort 6/6; seed0399 still @10157
  (positional 10389); seed0014 @49039 held.
- Next: C-state omit of 2 cells; temple/`worm_cross`; or D-0708.

## 2026-07-19 — #813 seed0399 mfndpos pair sharpen (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); identify C’s 2 omits.
- C locus: `mon.c` `mfndpos` (deferred onscary/gas/worm_cross/bars).
- Change: none (DIAG/PROBE only; reverted). Falsified: WEB required in
  the omit pair; pair ID via max-prefix (all keep-track pairs →10217).
  Track cell (59,13) must stay for arity rn2. Omit ∈6 non-track.
- Verification: green+strict PASS; seed0399 still @10157; no js/ diff.
- Next: C-state / deferred mfndpos arms; or D-0708 @49039.

## 2026-07-19 — #812 unicorn NOTONL + fail-tele (D-0731)
- Objective: seed0399 @10157 m_move track rn2(20) vs rn2(28).
- C locus: `mon.c` `mon_allowflags` NOTONL; `monmove.c` unicorn
  fail-move `rn2(2)`+`rloc`; `teleport.c` `rloc_to` `mon_track_clear`.
- Change: port those three. Falsified: NOTONL fixes this miss (mux=47,9
  no online neigh). DIAG: black unicorn cnt=7 vs C need 5; FORCE_EXCL
  any 2 of 7 → prefix 10217.
- Verification: green+strict PASS; cohort prior PASS held; seed0399
  still @10157; seed0014 @49039 held.
- Next: which 2 mfndpos cells C drops (WEB+?); or D-0708.

## 2026-07-19 — #811 max_passive_dmg AD_ACID (D-0730)
- Objective: CURRENT primary; pivoted seed0399 after D-0708 cell stall.
- C locus: `mondata.c` `max_passive_dmg`; `dogmove.c` ALLOW_M balk.
- Change: elemental AD_ACID/FIRE/COLD/ELEC + HUGS/ENGL/TENT multi2;
  fix AD_ACID=8 (was wrongly AD_DRDX). Falsified D-0708: kickedloc this
  turn; (22,10) is ROOM on C DEC screen.
- Verification: green+strict PASS; seed0399 **10145→10157** RNG
  **10359**/11409; cohort 6/6 prior PASS held; seed0014 unchanged.
- Next: seed0399 @10157 m_move rn2(20) vs rn2(28); or D-0708.
## 2026-07-19 — #814 mfndpos onscary/garlic/bars/gas (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); port deferred mfndpos arms.
- C locus: `mon.c` `mfndpos`; `monmove.c` `onscary`.
- Change: mconf/`!mcansee` flags; IRONBARS; poison-gas; onscary (scare/
  Elbereth/altar-vamp); garlic. Falsified: these arms drop cnt in JS
  state @miss (still 7); j=2 mtrack → same 10217 arity-only.
- Verification: green+strict PASS; cohort 6/6; seed0399 still @10157
  (positional 10389); seed0014 @49039 held.
- Next: C-state omit of 2 cells; temple/`worm_cross`; or D-0708.

## 2026-07-19 — #813 seed0399 mfndpos pair sharpen (D-0731)
- Objective: seed0399 @10157 rn2(20) vs rn2(28); identify C’s 2 omits.
- C locus: `mon.c` `mfndpos` (deferred onscary/gas/worm_cross/bars).
- Change: none (DIAG/PROBE only; reverted). Falsified: WEB required in
  the omit pair; pair ID via max-prefix (all keep-track pairs →10217).
  Track cell (59,13) must stay for arity rn2. Omit ∈6 non-track.
- Verification: green+strict PASS; seed0399 still @10157; no js/ diff.
- Next: C-state / deferred mfndpos arms; or D-0708 @49039.

## 2026-07-19 — #812 unicorn NOTONL + fail-tele (D-0731)
- Objective: seed0399 @10157 m_move track rn2(20) vs rn2(28).
- C locus: `mon.c` `mon_allowflags` NOTONL; `monmove.c` unicorn
  fail-move `rn2(2)`+`rloc`; `teleport.c` `rloc_to` `mon_track_clear`.
- Change: port those three. Falsified: NOTONL fixes this miss (mux=47,9
  no online neigh). DIAG: black unicorn cnt=7 vs C need 5; FORCE_EXCL
  any 2 of 7 → prefix 10217.
- Verification: green+strict PASS; cohort prior PASS held; seed0399
  still @10157; seed0014 @49039 held.
- Next: which 2 mfndpos cells C drops (WEB+?); or D-0708.

## 2026-07-19 — #811 max_passive_dmg AD_ACID (D-0730)
- Objective: CURRENT primary; pivoted seed0399 after D-0708 cell stall.
- C locus: `mondata.c` `max_passive_dmg`; `dogmove.c` ALLOW_M balk.
- Change: elemental AD_ACID/FIRE/COLD/ELEC + HUGS/ENGL/TENT multi2;
  fix AD_ACID=8 (was wrongly AD_DRDX). Falsified D-0708: kickedloc this
  turn; (22,10) is ROOM on C DEC screen.
- Verification: green+strict PASS; seed0399 **10145→10157** RNG
  **10359**/11409; cohort 6/6 prior PASS held; seed0014 unchanged.
- Next: seed0399 @10157 m_move rn2(20) vs rn2(28); or D-0708.

- C locus: `steal.c` `mdrop_obj` `distant_name` before extract; `objnam.c`.
- Change: `relobj_on_death` calls `distant_name(otmp, doname)` while still
  MINVENT so disco follows minvent order (not reverse pile look_here).
- Verification: Scr **363→364**/366; @358 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @360/@361 attrs pages (Hallu/Search/Reflect/lifesaved).


## 2026-07-17 13:36 — #702 D-0631 ini_inv weptool + doname charged
- Objective: seed0361 @354 invent — uncursed pick-axe / tinning vs
  `+0` swapwep / `(0:72)` charges.
- C locus: `u_init.c` `ini_inv_use_obj` `is_weptool`; `objnam.c`
  `doname_base` weptool→WEAPON + TOOL `oc_charged`.
- Change: u_init `is_weptool` (+ bimanual/shield gate); objnam
  donameClass remap + charged-tool/WEPTOOL name list.
- Verification: Scr **362→363**/366; @354 MATCH; green+strict PASS;
  cohort 31/31 PASS.
- Next: seed0361 @358 disco order; @360/@361 attrs pages.


# Agent loop journal archive

## 2026-07-17 10:41 — #673 D-0603 MS_PRIEST m_initweap/m_initinv
## 2026-07-17 11:32 — #681 D-0611 hitval spec_abon
- Objective: seed0361 @22084 C `rnd(5)` @ `spec_abon` vs JS `rnd(20)`.
- C locus: `artifact.c` `spec_abon`/`spec_applies`; `weapon.c` `hitval`.
- Change: extract attk+mtype; port `spec_applies`+`spec_abon`; wire
  `hitval` oartifact path.
- Verification: prefix **22084→22140** Scr **225** RNG **22478**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @22140 `m_move` rn2(12) vs rn2(16); or Pri-strt.

## 2026-07-17 11:28 — #680 score + D-0610 tryescape defense
- Objective: mandatory full `sessions` score (#680÷5); seed0361 @22042.
- Score: **33/44** Scr **6616**/11405 RNG **377869**/792838 (47.66%)
  `33+0.16/turn`. Δ vs #675: Scr +9, RNG +3380.
- C locus: `monmove.c` m_move cnt==0; `muse.c` find/use_defensive + precheck.
- Change: tryescape defense when no moves; healing invent + milky precheck.
- Verification: prefix **22042→22084** Scr **225** RNG **22261**;
  green+strict PASS; cohort 20/20 PASS.
- Next: seed0361 @22084 `spec_abon`/`hitum`; or Pri-strt.
- Objective: seed0361 @12294 C `next_ident` vs JS `rn2(75)`.
- C locus: `makemon.c` `m_initweap`/`m_initinv` MS_PRIEST (ALIGNED/HIGH
  CLERIC); `monsters.h` msound.
- Change: port mace (`mksobj`+spe/curse) + robe/cloak/shield/gold;
  gate by mndx (tables omit msound). Leave quest_role + NINJA deferred.
- Verification: prefix **12294→13719** Scr **215** RNG **13837**;
  green+strict PASS; cohort **33/33** PASS.
- Next: seed0361 @13719 `pri_move` vs ordinary monmove.

## 2026-07-17 10:11 — #670 formal score refresh
- Objective: mandatory #670 full `sessions` score (÷5 cadence).
- C locus: n/a (score-only; no port patch).
- Change: refreshed `CURRENT.md` Score from `__RESULTS_JSON__`.
- Verification: green+strict PASS; full suite **33/44**, Scr
  **6597**/11405, RNG **368089**/792838 (46.43%), `33+0.15/turn`
  (R² 0.778). Δ vs #665: Scr **+10**, RNG **+4165** (D-0597…D-0600),
  PASS unchanged. Confirmed seed0361 still @12288 doorct.
- Next: seed0361 @12288 extra door / doorct; or Pri-strt seed0367.

## 2026-07-17 10:15 — #669 D-0600 mktemple (@12287)
- Objective: seed0361 @12287 C `rn2(5) @ pick_room` vs JS `rn2(3)`.
- C locus: `mkroom.c` `mktemple`/`shrine_pos`; `priest.c` `priestini`;
  `makemon` `MM_EPRI`/`newepri`.
- Change: ported `mktemple`+`shrine_pos`+`priestini`; wired TEMPLE in
  `do_mkroom`; `newepri`+`MM_EPRI` in makemon. Stub was burning later
  `rn2(3)` instead of `pick_room(TRUE)`.
- Verification: prefix **12287→12288** Scr **205**; green+strict PASS;
  cohort **31/31** PASS. Next miss: JS no doorct==1 (room2 doorct=2).
- Next: seed0361 @12288 extra door / doorct; or Pri-strt.
## 2026-07-17 01:09 — #654 D-0587 ^X armor + Teleport_control
- Objective: seed0116 Scr 126/127 @122 ^X enlightenment residual.
- C locus: insight.c status_enlightenment nudity;
  attributes_enlightenment Teleport_control; attrib.c from_what;
  artifact.c what_gives.
- Change: invent.js doattributes armor nudity + Teleport_control;
  attrib.js from_what→what_gives; artifact.js what_gives wornmask.
- Verification: seed0116 Scr **126→127**/127 RNG FULL **PASS** +
  strict; green+strict PASS; cohort **31**/31 PASS.
- Next: leaderboard cron; earliest remaining suite FAIL (quest).

## 2026-07-17 01:03 — #653 D-0586 dospellmenu wizard turns
- Objective: seed0116 Scr 125/127 @117 spells menu centering.
- C locus: spell.c dospellmenu wizard turns / spellknow(i);
  flag.h wizard≡flags.debug.
- Change: spell.js dospellmenu appends heading `turns` (%6s) and
  per-line spellknow when flags.wizard||flags.debug.
- Verification: seed0116 Scr **125→126**/127 RNG FULL; green+strict
  PASS; cohort **30**/30 (seed0106 + wizard seeds). Residual @122.
- Next: seed0116 @122 ^X armor nudity + Teleport_control from_what.

## 2026-07-15 12:42 — #410 public score
- Objective: mandatory full `sessions` (#410 divisible by 5).
- C locus: n/a (score cadence); primary remains seed0012 @58 Options.
- Change: documented suite aggregates; sharpened Options hypothesis to
  C `doset_simple_menu` vs JS stub (no port this iteration).
- Verification: green+strict PASS; full suite **24/44** Scr **3854**/11405
  (33.79%) RNG **255075**/792838 (32.17%) `21+0.12/turn` (R² 0.80).
  vs #405: same PASS set; Scr +8, RNG +678 (seed0002 47→50 / 4520→5198).
- Next: port `doset_simple_menu` from `options.c` for seed0012 @screen58.

## 2026-07-15 11:47 — D-0383/84 ice-box stacks + pickup INVORDER_SORT
- Objective: seed0012 screens @31 Contents / @43 Pick up what?
- C locus: mkobj.c add_to_container/mksobj spe; end.c container_contents;
  invent.c sortloot; pickup.c query_objlist INVORDER_SORT + let_to_name.
- Change: merge+corpse gender+sortloot doname (D-0383); pack-order class
  headings + prompt ATR_INVERSE (D-0384).
- Verification: Scr **184→187**/308; green+strict; cohort 22/22 PASS.
- Next: seed0012 @screen58 `O` Options menu geometry / missing rows.

## 2026-07-15 11:30 — D-0382 in_or_out_menu prompt/SELECTED (seed0012 Scr)
- Objective: seed0012 @screen30 ice-box `Do what with…` menu.
- C locus: pickup.c in_or_out_menu; wintty.c tty_end_menu /
  process_menu_window SELECTED `*`; menu_headings ATR_INVERSE.
- Change: `js/pickup.js` — prompt ATR_INVERSE; default `q * done|do nothing`.
- Verification: Scr **182→184**/308; green+strict; cohort 22/22 PASS.
- Next: seed0012 @screen31 ice-box `container_contents` sortloot stacks.

## 2026-07-15 10:48 — D-0378 restfakecorr/clear_fcorr (seed0012 @13700)
- Objective: seed0012 @13700 C move_special rn2(1) vs JS fleeck rn2(5).
- C locus: vault.c clear_fcorr/restfakecorr; gd_move um_dist + post-dig.
- Change: symptom was shk !onlineu mill skip — root hero walked onto
  unrestored vault door (71,13). Ported clear_fcorr+restfakecorr; wire
  um_dist branch and after dig step (D-0378). Not priest pri_move.
- Verification: RNG 13754→13878/13878 (full C log); cursors 279→291/308;
  green+strict PASS; cohort 24/24. Screens still 14/308.
- Next: seed0012 screen/vision after clear_fcorr, or seed0004/0002.

## 2026-07-15 10:28 — D-0377 gd_move dig while-loop (seed0012 @13576)
- Objective: seed0012 @13576 C dog_move rn2(1) vs JS rn2(4).
- C locus: vault.c gd_move nextpos while-loop; find_guard_dest incr_radius;
  um_dist !rn2(10).
- Change: JS gd_move dug only primary step; C redirects wall/corner onto
  west STONE→CORR so hero can follow. Ported while-loop + incr_radius +
  rn2(10) gate (D-0377).
- Verification: mismatch 13576→13700; RNG 13635→13754/13878 cursors
  270→279/308; green+strict PASS; cohort 22/22.
- Next: seed0012 @13700 C move_special rn2(1) vs JS rn2(5).

## 2026-07-15 10:05 — D-0376 bag put-in (seed0012 @13517)
- Objective: seed0012 @13517 C move_special rn2(1) vs JS fleeck rn2(5).
- C locus: pickup.c use_container/in_container/menu_loot/query_category;
  jsmain CR→LF; cmd C('j') rush; symptom shk_move onlineu.
- Change: port put-in coins path (query_putin_category + menu_loot_putin +
  in_container). Root: stubbed 'i' left $\r$\r → LF rush-south → uy+1 →
  missed earlier onlineu home return (D-0376).
- Verification: prefix 13517→13576; RNG 13591→13635 cursors 259→270;
  green+strict PASS; cohort 22/22.
- Next: seed0012 @13576 C dog_move rn2(1) vs JS rn2(4).

## 2026-07-15 01:20 — #363 D-0339 `)` doprwep

- Objective: seed0013-restore @62 `)` bare handed (CURRENT primary).
- C locus: `invent.c` `doprwep` / `wield.c` `empty_handed`.
- Change: `doprwep` !uwep pline + wielded `xprname`; bind `)` (D-0339).
- Verification: Scr **68→69**/99; first miss `@64` `[`; RNG full;
  green+strict; 21 PASS cohort incl. seed0013-rogue.
- Next: `@64` `[` / `doprarm` worn-armor display.

## 2026-07-15 01:13 — #362 D-0335…0338 save/restore + showgold

- Objective: seed0013-restore Scr 47/99 (CURRENT primary).
- C locus: `save.c` dosave; `restore.c` dorecover; `allmain` welcome/
  preamble; `invent` doprgold; `wintty` dmore quitchars.
- Change: JSON VFS save/restore + `S` (D-0335); welcome-back align gate
  (D-0336); attributes quitchars (D-0337); `$`/`doprgold` (D-0338).
- Verification: RNG **full 4804**; Scr **47→68**/99; first miss `@62` `)`;
  green+strict; 8 PASS cohort incl. seed0013-rogue.
- Next: `@62` `)` bare-handed / `doprwep`.

## 2026-07-14 23:25 — #355 score + D-0327 xkilled destroy

- Objective: mandatory full `sessions` (#355 %5) + seed0030 @1684.
- C locus: `mondata.h` `nonliving`; `mon.c` `xkilled` destroy/kill.
- Change: port `is_golem`/`weirdnonliving`/`nonliving`; `xkilled` verb
  (D-0327).
- Verification: full suite **19/44**, Scr **3258/11405** (28.57%), RNG
  **240657/792838**, speed `17+0.12/turn`; @1684 `destroy`; Scr
  **1820→1821**; first miss **@1821** blank C map; green+strict; 17 PASS
  cohort.
- Next: @1821 map clear/`docrt` on level transition.

## 2026-07-14 23:04 — #354 D-0326 newsym canspotself

- Objective: seed0030 @1606 Invis map `@` vs underfoot `%` (CURRENT).
- C locus: `display.h` `canspotself`; `display.c` `newsym` u_at.
- Change: port Blind/Invis/Invisible + `canspotself`; `map_location(show)`
  when `!see_self`; `display_self` only when spottable (D-0326).
- Verification: @1606 match; Scr **1606→1820**; first miss **@1684**
  destroy vs kill; RNG full; green+strict; 17 PASS cohort.
- Next: @1684 `xkilled` `nonliving` → `"destroy"`.

## 2026-07-14 22:58 — #353 D-0325 ARMOR xname OBJ_DESCR

- Objective: seed0030 @1601 `iron skull cap` vs `orcish helm` (CURRENT).
- C locus: `objnam.c` `xname_flags` ARMOR_CLASS — `!nn` → `dn`.
- Change: port ARMOR nn/un/dn + pair/set/shield !dknown arms (D-0325);
  `armor_simple_name` for called deferred (uses dn).
- Verification: @1601 match; Scr **1605→1606**; first miss **@1606**
  Invis map `@` vs `%`; RNG full; green+strict; 17 PASS cohort.
- Next: @1606 `newsym` `canspotself` — show under-hero glyph when Invisible.
## 2026-07-14 18:56 — D-0295/96 Monnam do_it + map_invisible

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @129.
- C locus: `do_name.c` `x_monnam` do_it; `mhitm.c` `pre_mm_attack` →
  `display.c` `map_invisible`.
- Change: `!canspotmon` → `It` in `Monnam` (D-0295); shared
  `canspotmon`; `map_invisible` `I` + `missmm`/`hitmm` pre_mm (D-0296).
- Verification: prefix **129→163**; Scr **843→853**; RNG full;
  green+strict; 19-session PASS cohort + strict.
- Next: prefix@163 C `(` vs JS `m` (mimic object appearance).

## 2026-07-14 18:51 — D-0294 mhitm noises You_hear

- Objective: seed0030 Scr peel (CURRENT primary); prefix first-miss @126.
- C locus: `mhitm.c` `noises` + `missmm`/`hitmm` `!gv.vis` (not `dosounds`).
- Change: port `noises`/`You_hear` + `far_noise`/`noisetime` rate limit;
  call from out-of-sight miss/hit (D-0294). Falsified dosounds hypothesis.
- Verification: prefix **126→129**; Scr **840→843**; RNG full; green+strict;
  17-session PASS cohort + strict.
- Next: prefix@129 C `It misses…` vs JS `The kitten misses…` (`Monnam`).


- Next: `uhitm.c` `hitum` secondary `uswapwep` swing.

## 2026-07-15 01:40 — #365 score + D-0342/0343 restore PASS

- Objective: #365 public score + seed0013-restore `@71` reveal_terrain.
- C locus: `detect.c` reveal_terrain_getglyph; `getpos.c` tip/quitchars.
- Change: TER_MAP getglyph/show (D-0342); tip skip-docrt under
  terrainmode + space → Done (D-0343).
- Verification: restore **99**/99 PASS; suite **22/44** Scr **3499**/11405
  RNG **239942**/792838 `18+0.12/turn`; green+strict+cohort.
- Next: seed0107 `#twoweapon` unbound @15.

## 2026-07-15 06:56 — D-0366 doup + in-memory getlev (seed0012 @6924)
- Objective: seed0012 @6924 C getlev rnd(10) vs JS fleeck.
- C locus: do.c doup; dungeon.c prev_level; restore.c getlev hide rnd(10).
- Change: `<`→doup/prev_level; stash VISITED|LFILE_EXISTS+omoves; restore
  + mon_catchup + hide_monst gate; climb-up pline (D-0366).
- Verification: prefix 6924→6952; RNG 7052→7202; green+strict; cohort 24/24.
- Next: seed0012 @6952 C dog_move rn2(12) vs JS rn2(1).

## 2026-07-15 06:50 — D-0365 multi `,` query_objlist (seed0012 @3483)
- Objective: seed0012 @3483 C dog_goal obj_resists vs JS dog_move rn2(3).
- C locus: pickup.c pickup/query_objlist PICK_ANY; hack.c dopickup.
- Change: multi-object `,` menu (letter toggle + Enter); was stub that
  leaked b/\\n/n as movement → hero desync → skipped invent resists.
- Verification: prefix 3483→6924; RNG 3638→7052; green+strict; cohort 24/24.
- Next: seed0012 @6924 C getlev rnd(10) vs JS fleeck.

## 2026-07-15 14:32 — #421 doname containing + cknown (D-0395)
- Objective: seed0012 @278 bag `containing 1 item`.
- C locus: objnam.c doname_base containing; invent.c count_contents;
  pickup.c use_container containerdone cknown when used.
- Change: doname suffix; invent count_contents (shoppy deferred);
  use_container sets cknown after successful put-in/loot.
- Verification: seed0012 Scr **283→284**/308; @278 match; green+strict
  PASS; cohort PASS. Next fail @294 `"Move along!"`.
- Next: vault guard escort pline after gold drop.

## 2026-07-15 14:58 — #424 trapeffect_bear_trap (D-0398)
- Objective: seed0004 first RNG miss @4013 bear trap.
- C locus: trap.c trapeffect_bear_trap / floor_trigger / set_utrap;
  do.c set_wounded_legs.
- Change: ported hero+monster bear trap; wired selector; aligned
  floor_trigger (BEAR/LANDMINE/SLP/RUST/FIRE); set_utrap +
  set_wounded_legs helpers.
- Verification: seed0004 RNG **4025→4087**/12084; Scr 28/409 (first
  miss @26 yellow gem); green+strict PASS; cohort 6/6 PASS; full
  suite still **25/44**.
- Next: seed0004 @26 `a yellow gem` vs `a gem`; or RNG @4039 dochug.

## 2026-07-15 14:52 — #423 gd_move_cleanup Suddenly (D-0397)
- Objective: seed0012 @307 Suddenly, the guard disappears.--More--.
- C locus: vault.c gd_move_cleanup/parkguard; gd_move !u_in_vault
  look-around; do_name.c noit_mon_nam.
- Change: parkguard + gd_move_cleanup; look-around → gddone cleanup;
  early/begone → cleanup; flush_topl_more after Suddenly pline.
- Verification: seed0012 Scr **307→308**/308 PASS; green+strict PASS;
  cohort **25/25** PASS. Score **25/44**.
- Next: seed0004 / seed0002 shared blockers.

## 2026-07-16 07:04 — #506 D-0468 dobuzz DISP_BEAM
- Objective: seed0002 @538 C DEC hbeam `q` vs JS `@` during
  sleep-ray bounce/hit `--More--`.
- C locus: `zap.c` `dobuzz` `tmp_at(DISP_BEAM)`/`zapdir_to_glyph`;
  `display.c` `tmp_at`/`zapdir_to_glyph`.
- Change: `zapdir_to_glyph` (DEC h/vbeam + zapcolors); `dobuzz`
  paints BEAM before hit, CHANGE after bounce, END in finally.
- Verification: @538 matches; first miss @538→@587; Scr 568→593;
  RNG full; green+strict; cohort 24/24.
- Next: D-0469 discoveries menu class order / `{buy}` @587.

## 2026-07-16 14:55 — D-0495 dowatersnakes rn1(5,2)
- Objective: primary D-0495 — seed0007 @15983 dryup rn2(3) vs snakes.
- C locus: `fountain.c` `dowatersnakes` — `rn1(5,2)` then makemon
  water moccasins; drink case 22 / dip case 23.
- Change: port `dowatersnakes` in `js/fountain.js`; wire drink 22 + dip 23.
  Hallucination `rndmonnam` deferred.
- Verification: rng-diff **15983→16339**; RNG 16344/16373 Scr 60;
  green+strict PASS; cohort 28/28 PASS.
- Next: @16339 distfleeck rn2(5) vs rnd(20) (D-0496).

## 2026-07-16 16:52 — D-0534 mktrap WEB giant spider
- Objective: seed0373 @9875 C `next_ident`/`newmonhp` vs JS `rnd(4)`.
- C locus: `mklev.c` `mktrap` WEB→`makemon(PM_GIANT_SPIDER)`;
  `sp_lev.c` `create_trap`.
- Change: `mktrap_seen_victim` creates spider unless `nospider`;
  wire `splev_create_trap`/`mktrap_room`; tut-1 WEB keeps nospider.
- Verification: rng-diff **9875→11957**; RNG **12021**/35386;
  green+strict PASS; cohort **28**/28 PASS.
- Next: @11957 `mksobj_init` `rn2(5)` vs `rn2(4)`; or seed5006.

## 2026-07-16 22:44 — D-0570 mon_pmname / M2_PNAME article
- Objective: seed0373 @101 Wizard appear capitalization (CURRENT primary).
- C locus: do_name.c mon_pmname/pmname/x_monnam name_at_start; mondata.h
  type_is_pname; wizard.c resurrect Norep(Monnam).
- Change: js/do_name.js mon_pmname from pmnames + M2_PNAME article skip.
- Verification: seed0373 Scr 110→111 RNG full; @101 match; green+strict;
  cohort 30/30 PASS.
- Next: @110 Air gravity map clouds; or seed5006 dosounds @8468.

## 2026-07-17 11:40 — #682 D-0612 mfndpos diagonal squeeze
- Objective: seed0361 @22140 C `rn2(12)` @ `m_move` vs JS `rn2(16)`.
- C locus: `mon.c` `mfndpos`; `hack.c` `bad_rock`/`cant_squeeze_thru`.
- Change: port diagonal squeeze gate — giant spider cnt 4→3.
- Verification: prefix **22140→22362** Scr **225** RNG **22664**;
  green+strict PASS; cohort **31/31** PASS.
- Next: seed0361 @22362 `xkilled` rn2(6) vs rn2(3); or Pri-strt.

## 2026-07-17 18:56 — #735 public score cadence
- Objective: mandatory full `sessions` score (#735÷5).
- C locus: n/a (score refresh; primary still seed0367 @148).
- Change or falsified theory: none — docs only. Noted JS already
  `await pline(dfr_post_msg)` in goto_level; @148 still needs path
  falsify (post_msg set? NEED_MORE after docrt? onquest order).
- Verification: green+strict PASS; suite **34/44**; Scr **6959**/11405;
  RNG **465040**/792838 (58.66%); speed `34+0.16/turn` (R² 0.78).
  Δ vs #730: Scr +30, RNG +14553 (D-0658…61 absorbed).
- Next: @148 materialize --More-- / quest on_start key ownership.

## 2026-07-18 19:33 — #758 D-0681 cursed_book + aggravate
- Objective: seed0014 @9354 C `cursed_book` `rn2(3)` vs JS `rn2(5)`.
- C locus: `spell.c` `cursed_book`/`study_book`; `wizard.c` `aggravate`.
- Change: D-0681 — port `cursed_book` (`rn2(oc_level)`); wire too_hard
  nomul + `!rn2(3)` crumble; `aggravate` wake/unfreeze.
- Verification: prefix **9354→14566**, Scr **221→298**/714; green+strict
  PASS; cohort **33**/33.
- Next: @14566 C `zhitm` `d(6,6)` vs JS `rn2(10)`.

## 2026-07-18 22:47 — D-0700 travel stop before n-dopush (diagnosed)
- Objective: seed0014 @36031 C `exercise` `rn2(19)` vs JS `rn2(5)`.
- C locus: `hack.c` lookaround/findtravelpath/dopush; `cmd.c` dotravel_target.
- Falsified: AVAL/`exercise` skip; forced end_running after first travel step.
- Evidence: after `_/>/.` JS `continue_run` (multi=80 travel=1); C `rhack(n)`
  dopush; no adjacent boulder in JS (60,8/60,10/68,5 only).
- Verification: green+strict PASS; prefix still 36031; no js/ change.
- Next: C-cited travel-stop before `n` (lookaround trap/TEST_TRAV/boulder).

## 2026-07-19 00:22 — #785 score + D-0706 monster kick
- Objective: mandatory full `sessions` score (#785÷5); seed0014 @43341 kick.
- Score: **35/44** Scr **7638**/11405 RNG **507306**/792838 (63.99%)
  `38+0.17/turn` R² 0.783. Δ vs #780: Scr +19, RNG +8245.
- C locus: dokick.c maybe_kick_monster / kick_monster / kickdmg.
- Change: port monster-kick path; export attack_checks/passive; martial().
- Verification: green+strict PASS; prefix 43341→43553 RNG 43636 Scr 575;
  cohort 13/13; full suite 35/44.
- Next: seed0014 @43553 next_ident / rndmonst_adj.
## 2026-07-19 00:30 — #786 D-0707 corpse_chance always-TRUE
- Objective: seed0014 @43553 C `next_ident`/`rndmonst_adj` vs JS `rn2(3)`.
- C locus: `mon.c` `corpse_chance` bigmonst/lizard/golem/mplayer/rider/isshk.
- Change: port always-TRUE arms in `uhitm`/`mhitm`/`trap` `corpse_chance`.
- Verification: green+strict PASS; prefix **43553→49039** RNG **49495**;
  cohort 33/33 PASS. Scr still 575.
- Next: seed0014 @49039 C `distfleeck` `rn2(5)` vs JS `rn2(6)`.

## 2026-07-19 — #818 zhitu non-sleep + destroy_items AD_FIRE (D-0734)
- Objective: coverage seed5002 @5886 (pivoted from D-0731 C-state stall).
- C locus: `zap.c` `zhitu`/`destroy_items`/`maybe_destroy_item`; `dobuzz`.
- Change: port `zhitu` FIRE/COLD/MISSILE/LIGHTNING; hero invent
  `destroy_items` AD_FIRE; burnarmor stub; ignite gate (empty body).
- Verification: green+strict PASS; cohort 6/6; seed5002 RNG
  **5980→6172** (seg0 FULL); seed0399/0014 held.
- Next: seed5002 @6172 themerms; or D-0731/D-0708 C-state.
