# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1584 audit `05c69d9b` (Scr **11,405**/11,405
  RNG **792,838**/792,838 = 100%; `38+0.30/turn`). seed0367 FULL.
  seed4500 still PASS (D-1574 `1ba35e31` was FAIL).
  **Hypothesis:** Open `invent.c` wizid unid_cnt>0 PICK_ANY is the next
  named omit (not gacc D-1580; not sortloot inuse_only D-1589).
  **Falsify:** port wizid unid_cnt>0 PICK_ANY then green + cohort; no
  FAIL peel.
  **Next:** Open wizid unid_cnt>0. Not `display_used_invlets`.
  Do not skip D-1531…D-1589. No FORCE / `wildmiss` wrap / trailing
  `confdir` in shared `getdir`.
- Named still: ustuck expels/unstuck; `initedog` `has_edog`; sit/pray
  `eyecount`; Palantir `#if 0`; pit/underwater vision;
  more_containers `n`; wizid unid_cnt>0; `display_used_invlets`.
  `m_unleash` / ustuck / break-armor / Elbereth `monflee`.
  `has_mcorpsenm`. show_transient_light. clone auto-open yn.
  ggetobj takeoff/identify askchain. floor pickup `query_classes`.
  `create_mplayers`. potion/timeout/polyself `set_mimic_blocking`.
  `tty_doprev_message` / restore_msghistory / get_count historicmsg.
  SORTLOOT_PETRIFY; perm_invent InvInUse; `#seeall` EXT_CMDS.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is
  D-1582. Do not skip ParanoidTrap portal yn (D-1187) /
  `domagicportal` / `undestroyable_trap` / `mktrap` dst /
  `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1589.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting spaces or emit mid-row space runs >4 (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066). Do not skip D-1067…D-1589 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1589. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js`/`artifact.js`/`minion.js`.
  No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557).
  Do not revert D-1574 `dig_point`/`seemimic` bodies; do not
  restore **global** `recalc_block_point` as `vision_reset`.
  Region per-cell is D-1576. `redraw_worm` is D-1577. force_invmenu
  redo is D-1578. mime_action is D-1579. gacc / `'0'` ball is
  D-1580. traditional_loot is D-1581. PREFIXCMD / `cmdq_shift` is
  D-1582. nv_range circle is D-1583. `mk_mplayer` is D-1584
  (`create_mplayers` named; `mimic_light_blocking` is D-1587).
  putmsghistory is D-1588; do not glue `tty_doprev_message` /
  restore_msghistory / get_count historicmsg. sortloot inuse_only
  is D-1589; do not glue wizid unid_cnt>0 / `display_used_invlets`
  / SORTLOOT_PETRIFY. D-1558…D-1589 live in the index. Do not
  re-port `dig_point` leftover-`i` or `newcham` Protection cancel.
  Do not skip MAIL `mk_gen_ok`. Do not add `ing_suffix` clone #3
  (hacklib export is the C home). FULL_MOON S_DOG is D-1585; do not
  glue ustuck / has_edog. `Tobjnam` lives in `objnam.js` (do not
  write clone #8). NC_SHOW_MSG is D-1586; do not add `upstart`
  clone #9 (hacklib export). Do not glue `m_unleash` / ustuck /
  break-armor / Elbereth `monflee`. `mimic_light_blocking` is
  D-1587; potion/timeout/polyself callers still named.

## Landmarks (≤15)

- D-1589: `invent.c` sortloot SORTLOOT_INUSE `inuse_classify` +
  `display_pickinv` `is_inuse` filter / fake HANDS_SYM W_WEP /
  inuse_headers; `dispinv_with_action` `sortloot='i'`; `doprinuse`
  `*`; CMD_M_PREFIX `)`/`[`/`=`/`"`/`(`/`*`. wizid unid_cnt>0 /
  `display_used_invlets` / SORTLOOT_PETRIFY named. putmsghistory
  is D-1588.
- D-1588: `invent.c` getobj `putmsghistory(qbuf,FALSE)` once
  (`msggiven`) under force_invmenu; `topl.c` `tty_putmsghistory`
  NEED_MORE→NON_EMPTY + `remember_topl` + dumplogmsg. getobj_adjust
  clone. `tty_doprev_message` / restore_msghistory / get_count
  historicmsg named. gacc is D-1580. `mimic_light_blocking` is D-1587.
- D-1587: `display.c` `mimic_light_blocking` See_invisible
  `block_point`/`unblock_point` (not `recalc`/`does_block`).
  potion/timeout/polyself callers + `mon_offmap` named. seemimic
  is D-1574. NC_SHOW_MSG is D-1586.
- D-1586: `mon.c` `newcham` NC_SHOW_MSG `pline_mon` disappears/appears/
  turns-into + `usmellmon`; `noname_monnam`/`upstart` exports.
  `NO_NC_FLAGS` stays boolean. `m_unleash` / ustuck / break-armor /
  Elbereth named. Protection cancel is D-1573. FULL_MOON is D-1585.
- D-1585: `dog.c` `tamedog` FULL_MOON night S_DOG `rn2(6)` + catch
  `pline_mon`/big_corpse/`Tobjnam` stop. Left-to-right `night()` then
  `rn2(6)` even if `obj` is null / not a dog. ustuck / has_edog named.
  `mk_mplayer` is D-1584.
- D-1584: `mplayer.c` `mk_mplayer` + `dev_name`/`get_mplname`/
  `mk_mplayer_armor`; `splev_create_monster` RANDOM role-id;
  `monmightthrowwep`; `rnd_*_item` export. `create_mplayers` named.
  nv_range is D-1583.
- D-1583: `vision.c` `nv_range` circle `apply_nv_range_in_sight`
  after xray; `circle_ptr`; `next_row[col]` gate; 3×3 lighting
  stand-in retired. Pit/underwater named. xray is D-1571.
- D-1582: `cmd.c` PREFIXCMD `got_prefix_input` + `cmdq_shift`;
  doextcmd ext_tlist; `do_rush`/`do_run`/`do_fight`/`do_reqmenu`;
  `set_move_cmd`/`do_move_*` REPEAT. Keyboard hjkl DIR_DX named.
  traditional_loot is D-1581.
- D-1581: `pickup.c` traditional_loot + `invent.c` askchain;
  MENU_TRADITIONAL `query_classes`/`askchain`; `sortloot` INVLET;
  yn `#`. more_containers `n` / ggetobj takeoff named. gacc is D-1580.
- D-1580: `invent.c` display_pickinv gacc / BALL `'0'`; `def_oc_syms`;
  `let_to_name` showsym; tty `!counting && strchr(gacc,'0')`. Getobj
  want_reply gacc 0. mime_action is D-1579.
- D-1579: `invent.c` mime_action typed `'-'` when `!allownone`;
  `" on the "` / rub-the / dip / `" or "` `rn2(2)`; `ing_suffix` in
  `hacklib.js`. Pickinv `'-'` still no mime. Hands is D-1569.
- D-1578: `invent.c` getobj force_invmenu skip yn auto `?`/`*` oneloop;
  display_pickinv Special `*`/`?` + end_menu query. Hands is D-1569.
- D-1577: `worm.c` `redraw_worm` `newsym` every wseg including dummy
  (unlike `see_wsegs`); `tamedog`/`abuse_dog`. cutworm is D-1570.
- D-1576: `region.c` `add_region` per-cell `block_point` +
  `remove_region`/`expire_gas_cloud` `unblock_point`. seed4500 recovered.
- D-1575: `mk_gen_ok` MAIL_DAEMON + `ndemon` `mkclass_aligned`;
  `msummon` is_lminion/`llord`/PM_ANGEL `ndemon`.
