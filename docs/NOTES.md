# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1626 (green+cohort; cadence #2020 still
  D-1620). seed4500 still PASS. Reviews **573–581** ACCEPT-WITH-DEBT.
  **Hypothesis:** Open `steed.c` `dismount_steed` DISMOUNT_THROWN
  (named) is the next map cluster. Not dog_move Conflict.
  **Falsify:** `node scripts/csym.mjs dismount_steed`;
  `node scripts/map.mjs steed.c`.
  **Next:** Open DISMOUNT_THROWN. Do not skip D-1531…D-1626. No FORCE
  / `wildmiss` wrap / trailing `confdir` in shared `getdir`. Do not
  glue onto MS_BOAST (D-1626) or `doextlist` (D-1625).
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  clone auto-open yn; `restore_cham` / `rescham`; `restore_gamelog`;
  `menu_remarm`; ggetobj drop; tty WIN_INVEN / `#perminv` /
  `optfn_perminv_mode`; BIND= `seeall` / M('?'); ACH_ASTR;
  dismount_steed DISMOUNT_THROWN / setworn oc_oprop; newcham mleashed /
  keepdogs / grow_up leash; `free_edog` / restore `newedog`; pickup
  tip-spill / squeaky / use_grease; hideunder / `safe_qbuf`;
  wonky-gold / `invlet_constant`; convert_line `%Xh` / common fallback /
  array rn2; kill_char / `tty_nhbell` / `cw->cury` / `intr`;
  do_mgivenname `'m'`; overview PICK_ONE; guardian/isshk/gecko remaps.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1626.
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
  nhcore (D-1066). Do not skip D-1067…D-1626 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1626. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1626 live in the index. Do not glue
  yn ^P onto getline. No `ing_suffix` clone #3. Do not poke
  `beyond_savefile_load` to “prove” InvInUse (D-1603). Do not restore
  zap `bhit` sticky `u.Blind||u.ublind` (D-1604). Do not re-port
  D-1605…D-1626 (index; MS_BOAST is D-1626; remaps named).

## Landmarks (≤15)

- D-1626: MS_BOAST hostile `rn2(4)` gem/`mhis` / mutton / Fee-Fie
  `wake_nearto(7*7)`; peaceful FALLTHROUGH HUMANOID. Remaps named.
- D-1625: `doextlist` NHW_MENU + `doc_extcmd_flagstr`; `#?` runner;
  `doextcmd` loop; help `k`. BIND= `seeall` named. #seeall D-1605.
- D-1624: EDIT_GETLIN off (`config.h:655`); `name_from_player`;
  `query_annotation` replace + `describe_level`. kill_char named.
- D-1623: yn clean_up `gt.toplines=prompt+key2txt` + dumplogmsg.
  `tty_nhbell` / `cw->cury` named. yn ^P is D-1612.
- D-1622: `com_pager_core` synthesize `[text]` then `convert_line`+
  `putmsghistory`. pronoun / common fallback named.
- D-1621: `adjust_split` getobj `"split"` + `get_count`
  GC_ECHOFIRST|CONDHIST. wonky-gold named. get_count is D-1613.
- D-1620: floor TRADITIONAL `query_classes` + yn/`pickup_object`.
  hideunder/`safe_qbuf` named. traditional_loot is D-1581.
- D-1619: `take_off` occupation + `do_takeoff` + `Amulet_off` ESP/
  RESTFUL/GUARDING. `menu_remarm` named. ggetobj takeoff D-1602.
- D-1618: MS_HUMANOID peaceful + `"threatens you."` + MS_ORC remap.
  Gnome `rn2(4)`. mplayer_talk D-1606. MS_BOAST is D-1626.
- D-1617: `dog_move` Conflict `!edog` `lose_guardian_angel` then
  `MMOVE_DIED`. Body D-1608. dismount_steed named.
- D-1616: `reset_hostility` isminion emin vs ualign → hostile
  `set_malign`/`newsym`. `final_level` `iter_mons`. ACH_ASTR named.
- D-1615: `consume_obj_charge` known `update_inventory` after `spe--`.
  Pickup tip-spill / trap squeaky / use_grease named.
- D-1614: `restore_msghistory` JSON Sfi until `-1`; `save_msghistory`
  skip-empty. `restore_gamelog` named.
- D-1613: `get_count` GC_SAVEHIST/CONDHIST putmsghistory Count+key2txt.
  `adjust_split` is D-1621.
- D-1612: yn `tty_yn_function` ^P `tty_doprev_message`; `'s'` two
  calls then discard. Not getline. Command ^P is D-1601.
