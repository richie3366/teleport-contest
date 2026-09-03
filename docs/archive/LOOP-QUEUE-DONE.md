# Loop queue done

Append-only archive of checked `LOOP-QUEUE.md` items. Newest date
first. Do not pop work from here. Live queue is unchecked-only.

## 2026-09-03

- [x] `mon.c` peacefuls_respond / MS_ARREST Halt (named). Not beg. **Addressed:** D-1772


- [x] `eat.c` useup+useupf hybrid (named). Not delete_contents. **Addressed:** D-1771 `dd090eaf`


- [x] `zap.c` delete_contents clone (named). Not delobj extract. **Addressed:** D-1770 `1fbbe0c0`


- [x] `ball.c` Punished set_bc (named). Not Unaware talk. **Addressed:** D-1769 `3baada67`


- [x] `potion.c` make_blinded Unaware talk=FALSE (named). Not Sting(-1). **Addressed:** D-1768 `566ab3d4`


- [x] `display.c` `show_glyph` always overwrites `gbuf.glyph`; JS `show_glyph_cell` leaves stale `loc.disp_glyph` on tty-only paints, so `see_traps` / `glyph_is_invisible` / `do_vicinity_map` extra-or-skip `newsym` (`tseen`/`erevealed`/I-keep). Not usteed. Source: reviews/loop-unattended/726-3b34b789-glyph-offsets.md **Addressed:** D-1767 `148dc4da`


- [x] `do_wear.c` cancel_doff (named). Not setworn oc_oprop. **Addressed:** D-1766 `bb71f9ff`


- [x] `display.h` integer GLYPH_*_OFF / map_monst (named). Not pet_to_glyph. **Addressed:** D-1765 `3b34b789`


- [x] `teleport.c` heaven u_left_shop caller (named). Not SetVoice. **Addressed:** D-1764 `8f3f4280`


- [x] `sounds.c` beg (named). Not maybe_gasp. **Addressed:** D-1763 `70493bec`


- [x] `sounds.c` maybe_gasp (named). Not sound_speak. **Addressed:** D-1762 `ac94ec34`


- [x] `sounds.c` sound_speak (named). Not set_voice. **Addressed:** D-1761 `45bb8ff3`


- [x] `explode.c` map_invisible !canspotmon (named). Not explosion_to_glyph. **Addressed:** D-1760 `a23a8ec8`


- [x] `display.h` random_trap_to_glyph (named). Not cmap_to_glyph trap. **Addressed:** D-1759 `01499c3f`


- [x] `mhitu.c` doseduce/mayberem `hero_Deaf` drops `EDeaf` and `uroleplay.deaf` (C `youprop.h:125`), so Cha `rn2`/`y_n` fire on C’s Deaf arms. Source: reviews/loop-unattended/711-b6c42dd0-doseduce.md. **Addressed:** D-1758 `0b5f451a`


- [x] `worn.c` setworn oc_oprop (named). Not possibly_unwield. **Addressed:** D-1757 `2d66f69e`


- [x] `mkobj.c` delobj extract (named). Not dealloc_obj. **Addressed:** D-1756 `d07fc56a`


- [x] `potion.c` make_blinded Sting_effects(-1) (named). Not see_monsters MON_STILL_ARRIVING. **Addressed:** D-1755 `5455d0cb`


- [x] `end.c` companion pet HP score (named). Not get_valuables. **Addressed:** D-1754 `7d76ad12`


- [x] `detect.c` sense_trap (named). Not monster_detect. **Addressed:** D-1753 `088de957`


- [x] `sounds.c` set_voice / SetVoice (named). Not doseduce. **Addressed:** D-1752 `1e18143c`


- [x] `dokick.c` hidden_gold(TRUE) kick (named). Not vault hidden_gold. **Addressed:** D-1751 `97f49d11`

## 2026-09-02

- [x] `mhitu.c` doseduce (named). Not getyear. **Addressed:** D-1750 `b6c42dd0`


- [x] `display.c` feel_location is_worm_tail (named). Not Blind levitate-arm. **Addressed:** D-1749 `d17e4f35`


- [x] `display.c` display_monster pet_to_glyph / detected_mon_to_glyph (named). Not Protection sensed. **Addressed:** D-1748 `1f6d5487`


- [x] `display.c` show_mon_or_warn I-glyph unmap_object (named). Not map_object observe. **Addressed:** D-1747 `a85a8aac`


- [x] `display.c` see_monsters MON_STILL_ARRIVING skip (named). Not newsym Detect_monsters. **Addressed:** D-1746 `df2bec69`


- [x] `display.c` newsym !cansee display_monster DETECTED (named). Not cansee Detect_monsters. **Addressed:** D-1745 `20426583`


- [x] `worn.c` possibly_unwield (named). Not setworn oc_oprop. **Addressed:** D-1744 `a2be8560`


- [x] `invent.c` dealloc_obj (named). Not useupall. **Addressed:** D-1743 `5a8392de`


- [x] `calendar.c` getyear (named). Not hhmmss. **Addressed:** D-1742 `3f9a8e48`


- [x] `end.c` get_valuables (named). Not artifact_score. **Addressed:** D-1741 `522aeec1`


- [x] `shk.c` shopper_financial_report / shop_debt (named). Not hidden_gold. **Addressed:** D-1740 `b712f3b6`


- [x] `display.c` mimic map_object observe (named). Not M_AP_OBJECT glyph. **Addressed:** D-1739 `3c4dafe8`


- [x] `display.c` cmap_to_glyph trap/zap/expl (named). Not furniture lastseentyp. **Addressed:** D-1738 `8a58906e`


- [x] `display.c` newsym Detect_monsters cansee arm (named). Not display_monster furniture. **Addressed:** D-1737 `5d1f9fb6`


- [x] `display.c` display_monster Protection_from_shape_changers sensed (named). Not M_AP_FURNITURE. **Addressed:** D-1736 `3afed6b0`

## 2026-08-30

- [x] `write.c` dowrite `useup(paper)` still invent-splice; C invent.c `useup` `:1320–1333` → `useupall`. Not full `dealloc_obj`. Source: reviews/loop-unattended/688-a6d468cc-useupall-obfree.md. **Addressed:** D-1735 `8b2be954`


- [x] `display.c` display_monster M_AP_MONSTER what_mon (named). Not M_AP_FURNITURE lastseentyp. **Addressed:** D-1734 `4bc17535`


- [x] `shk.c` choose_stairs / u_left_shop leave verbalize (named). Not remote_burglary. **Addressed:** D-1733 `9f6de017`


- [x] `objects.h` is_multigen / is_poisonable (named). Not oc_merge. **Addressed:** D-1732 `438c0380`


- [x] `invent.c` doprgold hidden_gold (named). Not currency. **Addressed:** D-1731 `fbce2b1c`


- [x] `end.c` artifact_score (named). Not hidden_gold. **Addressed:** D-1730 `02c2d6e0`


- [x] `cmd.c` getdir CQ_REPEAT (named). Not yn_function_menu. **Addressed:** D-1729 `578b7088`


- [x] `cmd.c` yn_function_menu query_menu (named). Not yn_function addcmdq. **Addressed:** D-1728 `aad60753`


- [x] `invent.c` useupall / obfree (named). Not observe_object FIRST_OBJECT skip. **Addressed:** D-1727 `a6d468cc`


- [x] `display.c` display_monster M_AP_FURNITURE cmap_to_glyph lastseentyp (named). Not update_lastseentyp. **Addressed:** D-1726 `a0c81cc6`


- [x] `calendar.c` hhmmss (named). Not yyyymmddhhmmss. **Addressed:** D-1725 `32c02560`


- [x] `dungeon.c` recalc_mapseen sokosolved / roguelevel / quest flags (named). Not DRAWBRIDGE_UP lastseentyp. **Addressed:** D-1724 `7ee8ad1d`


- [x] `sp_lev.c` lspo_object non-merge quan repeat (named). Not oc_merge. **Addressed:** D-1723 `a9697aa8`


- [x] `dog.c` cant_go_back FREEING (named). Not update_mlstmv. **Addressed:** D-1722 `55932af9`


- [x] `cmd.c` getdir yn_function (named). Not yn_function_menu. **Addressed:** D-1721 `48ddbfc8`


- [x] `shk.c` Hallu currency ROLL_FROM (named). Not arti_cost. **Addressed:** D-1720 `7381e463`


- [x] `shk.c` arti_cost (named). Not gem glass pseudo-ID. **Addressed:** D-1719 `7466d184`


- [x] `shk.c` get_cost gem glass pseudo-ID (named). Not remote_burglary. **Addressed:** D-1718 `ee797b68`


- [x] `shk.c` remote_burglary (named). Not bill_box_content. **Addressed:** D-1717 `ed4800ed`


- [x] `shk.c` dopay mute/Deaf thank-you nod (named). Not getpos. **Addressed:** D-1716 `0c720b98`


- [x] `shk.c` pay_billed_items traditional itemize ynq (named). Not FullyUsedUp. **Addressed:** D-1715 `a197ef44`


- [x] `shk.c` FullyUsedUp/PartlyUsedUp (named). Not bill_box_content. **Addressed:** D-1714 `33cc30c0`


- [x] `invent.c` observe_object FIRST_OBJECT skip (named). Not undiscover_object. **Addressed:** D-1713 `4f0957ff`


- [x] `objects.h` oc_merge extract (named). Not oc_charged. **Addressed:** D-1712 `00f70d3d`


- [x] `dungeon.c` update_lastseentyp DRAWBRIDGE_UP / furniture-mimic (named). Not knox/drawbridge. **Addressed:** D-1711 `f187612b`


- [x] `dungeon.c` cemetery yyyymmddhhmmss when[] (named). Not cemetery JSON. **Addressed:** D-1710 `b5cb56e6`


- [x] `dog.c` `update_mlstmv`: skip `DEADMONSTER` / `mon_offmap` like `iter_mons` (`mon.c:4531–4535`). Not cant_go_back FREEING. Source: `reviews/loop-unattended/656-c33608ff-savelev-stash-lights-billobjs.md` **Addressed:** D-1709 `2353e6fb`


- [x] `light.c` `save_light_sources` LS_MONSTER: `light_is_local` must be `mx > 0` (`light.c:373` / `:453` / `maybe_write_ls` `:586`), not timeout.c `mon_is_local` migrating/mydogs. Same predicate in `js/lev_json.js` `snapshotLocalLights` / `snapshotGlobalLights` (D-1696/D-1698). Keep timeout.c helpers for timers and LS_OBJECT. Do not restore `clear_light_sources` on `goto_level`. Source: `reviews/loop-unattended/656-c33608ff-savelev-stash-lights-billobjs.md` **Addressed:** D-1708 `0c0f29fe`


- [x] `dungeon.c` recalc_mapseen Blind bigroom / oracle / valley / sanctum (named). Not knox/drawbridge. **Addressed:** D-1707 `7b26f699`


- [x] `getline.c` yn_function addcmdq (named). Not Traditional itemize. **Addressed:** D-1706 `1567e9bf`


- [x] `shk.c` bill_box_content (named). Not contained_cost. **Addressed:** D-1705 `7d0a0ddc`


- [x] `shk.c` dopay multi-shk getpos (named). Not shk_names_obj. **Addressed:** D-1704 `68f8585b`


- [x] `shk.c` shk_names_obj makeknown (named). Not buy_container. **Addressed:** D-1703 `3d728adf`


- [x] `shk.c` buy_container (named). Not cheapest_item. **Addressed:** D-1702 `c7648ccf`


- [x] `options.c` wizmgender glyph-reset (named). Not wizweight. **Addressed:** D-1701 `f7a10b6f`


- [x] `options.c` mO perminv_mode compound row (named). Not optfn_perminv_mode. **Addressed:** D-1700 `3ab2697c`

## 2026-08-29

- [x] `dungeon.c` print_mapseen knox/drawbridge (named). Not cemetery JSON. **Addressed:** D-1693 `605f0f2e`


- [x] `artifact.c` wield restrict_name (named). Not do_oname slip. **Addressed:** D-1692 `ac1199da`


- [x] `o_init.c` undiscover_object / gem_learned (named). Not oc_uses_known. **Addressed:** D-1691 `93fcd877`


- [x] `objects.h` oc_charged extract (named). Not oc_merge. **Addressed:** D-1690 `0458e7cc`


- [x] `engrave.c` doengrave non-hands stylus (named). Not IA_ENGRAVE pushkeys. **Addressed:** D-1689 `658cd53c`


- [x] `shk.c` cheapest_item early return (named). Not Traditional itemize. **Addressed:** D-1688 `ac894764`


- [x] `invent.c` Traditional itemize yn (named). Not cheapest_item. **Addressed:** D-1687 `bad8cbd6`


- [x] `iactions.c` remaining pushkeys rub/swap/whatis (named). Not two-weapon. **Addressed:** D-1686 `300d7098`


- [x] `dungeon.c` save_mapseen cemetery JSON (named). Not print_mapseen cemetery. **Addressed:** D-1685 `69a1451f`


- [x] `pay_billed_items` (`shk.c:2042–2097`): delete `pay_take_canned_billed`. After IA_BUY_OBJ, take the C `via_menu` arm into `menu_pick_pay_items`; do not skip that menu because a canned KEY equals `obj.invlet`. Leftover `CMDQ_KEY` after `dopay` is C `rhack` `:3642–3651`. Do not port `cheapest_item` / Traditional itemize / `buy_container`. Source: `reviews/loop-unattended/637-6441842f-ia-buy-obj.md` **Addressed:** D-1684 `01f25fda`


- [x] `sit.c` special_throne_effect grease spray (named). Not use_grease. **Addressed:** D-1683 `d2bcd227`


- [x] `do_name.c` docallcmd #if 0 EXCLUDE (named). Not `'i'` getobj_name. **Addressed:** D-1682 `3a2c9f83`


- [x] `do_name.c` `'i'` getobj_name clone (named). Not #if 0 EXCLUDE. **Addressed:** D-1681 `86cefef1`


- [x] `do_name.c` oname via_naming livelog (named). Not wield restrict_name. **Addressed:** D-1680 `c8309c01`


- [x] `pickup.c` choose_tip_container_menu (named). Not tip getobj. **Addressed:** D-1679 `1b08a2d9`


- [x] `pray.c` offer_corpse (named). Not floorfood sacrifice getobj. **Addressed:** D-1678 `8a8124d1`


- [x] `iactions.c` IA_TWOWEAPON (named). Not offer/tip/invoke. **Addressed:** D-1677 `478f2710`


- [x] `iactions.c` IA_BUY_OBJ shop pay (named). Not offer/tip/invoke. **Addressed:** D-1676 `6441842f`


- [x] `iactions.c` remaining pushkeys unwield/name/eat/engrave (named). Not offer/tip/invoke. **Addressed:** D-1675 `9613be3b`


- [x] `o_init.c` oc_uses_known extract (named). Not rename_disco. **Addressed:** D-1674 `115570e2`


- [x] `do_name.c` distant_monnam astral high-cleric (named). Not do_mgivenname. **Addressed:** D-1673 `39af0ea7`


- [x] `do_name.c` docall sink-fluid / safe_qbuf (named). Not `'o'` getobj. **Addressed:** D-1672 `1e88c3d3`


- [x] `do_name.c` docallcmd cmdq_pop canned (named). Not `'o'` getobj. **Addressed:** D-1671 `16fd4cbc`


- [x] `do_name.c` do_oname artifact_name slip / restrict_name / wipeout_text (named). Not `'o'` getobj. **Addressed:** D-1670 `6453e043`


- [x] `options.c` wizweight optfn_boolean after-change (named). Not fixinv. **Addressed:** D-1669 `1de9cec2`


- [x] `invent.c` `noarmor` uskin (named). Not doprarm. **Addressed:** D-1668 `81f571d0`


- [x] `dosacrifice` (`pray.c:1874–1892`) after a successful `floorfood` pick of `CORPSE` / `AMULET_OF_YENDOR` / `FAKE_AMULET_OF_YENDOR` must `return ECMD_TIME`, not `ECMD_OK`. Do not port `offer_corpse` in that iter. Source: `reviews/loop-unattended/626-784e3060-iactions-pushkeys.md` **Addressed:** D-1667 `0cc9e178`


- [x] `can_set_perm_invent` (`options.c:5507–5508`) must import `InvOptOn` from `const.js`. Do not rewrite can_set, add `strncmpi` #4, or insert the mO row. Source: `reviews/loop-unattended/622-536904b4-optfn-perminv-mode.md` **Addressed:** D-1666 `3c77e49a`


- [x] `iactions.c` remaining pushkeys offer/tip/invoke (named). Not use_grease. **Addressed:** D-1665 `784e3060`


- [x] `wizcmds.c` `sanity_check` gold/invlet (named). Not check_invent_gold. **Addressed:** D-1664 `88a989f0`


- [x] `invent.c` `dounpaid` (named). Not invlet_constant. **Addressed:** D-1663 `c1e99a17`


- [x] `questpgr.c` qt_pager common fallback (named). Not convert_arg. **Addressed:** D-1662 `101d9d0b`


- [x] `options.c` `optfn_perminv_mode` (named). Not doperminv. **Addressed:** D-1661 `536904b4`


- [x] `do_name.c` docallcmd `'o'` getobj call (named). Not lookup_novel. **Addressed:** D-1660 `7504982e`


- [x] `dungeon.c` cemetery bones list (named). Not dooverview. **Addressed:** D-1659 `f88e0665`


- [x] `dungeon.c` print_mapseen altar-god coalign (named). Not dooverview PICK_ONE. **Addressed:** D-1658 `2ec50652`


- [x] `cmd.c` overlay BIND= on if/else keys (named). Not cmdbind_get default. **Addressed:** D-1657 `ee4f922a`


- [x] `apply.c` `use_grease` (named). Not consume_obj_charge. **Addressed:** D-1656 `9ac19d6f`


- [x] `invent.c` `invlet_constant` (named). Not check_invent_gold. **Addressed:** D-1655 `d34f23ee`


- [x] `pickup.c` `safe_qbuf` (named). Not floor query_classes. **Addressed:** D-1654 `e53a5df9`


- [x] `sounds.c` Death_quote / `u_have_novel` (named). Not read_tribute. **Addressed:** D-1653 `7e407046`


- [x] `sit.c` `eyecount` (named). Not confer_oc_oprop. **Addressed:** D-1652 `105c91aa`


- [x] `do_name.c` `lookup_novel` (named). Not do_mgivenname. **Addressed:** D-1651 `41ac42ac`


- [x] `dungeon.c` `dooverview` PICK_ONE (named). Not doextlist. **Addressed:** D-1650 `f92f0d66`


- [x] `questpgr.c` `convert_arg` (named). Not convert_line %Xh. **Addressed:** D-1649 `90077834`


- [x] Await `newcham` at remaining sync `NO_NC_FLAGS` sites when mleashed `m_unleash` or Elbereth `monflee` returns a Promise (C `mon.c` `newcham` `:5386–5398` / `:5517–5532` finishes before `return 1`). Not `m_unleash` body. Source: reviews/loop-unattended/606-cc8a839c-newcham-mleashed.md **Addressed:** D-1648 `979dd522`


- [x] `o_init.c` `rename_disco` (named). Not do_mgivenname. **Addressed:** D-1647 `69534fd4`


- [x] `win/tty/wintty.c` MENU_SEARCH / `tty_wait_synch` (named). Not kill_char. **Addressed:** D-1646 `48758020`


- [x] `mon.c` newcham mleashed (named). Not restore_cham. **Addressed:** D-1645 `cc8a839c`


- [x] `do.c` ACH_ASTR (named). Not reset_hostility. **Addressed:** D-1644 `d48909a2`


- [x] `cmd.c` BIND= M('?') (named). Not doextlist. **Addressed:** D-1643 `e1171a1a`


- [x] `invent.c` tty WIN_INVEN / `#perminv` (named). Not consume_obj_charge. **Addressed:** D-1642 `a95b0aa6`


- [x] `invent.c` `check_invent_gold` (named). Not adjust_split. **Addressed:** D-1641 `429ab7b7`


- [x] `steed.c` `landing_spot` KNOCKED preferred-dir (named). Not DISMOUNT_THROWN. **Addressed:** D-1640 `78fc5011`


- [x] `getline.c` `hooked_tty_getlin` ESC-nonempty must fall through to else `tty_nhbell` (and `intr`/`doprev`), not `continue` after clear. Same in `get_ext_cmd`. Source: reviews/loop-unattended/593-20fa20b3-kill-char.md **Addressed:** D-1639 `d5474f87`


- [x] `do_name.c` `do_mgivenname` (named). Not kill_char. **Addressed:** D-1638 `f9bed6be`


- [x] `mon.c` `restore_cham` (named). Not normal_shape. **Addressed:** D-1637 `f4cae40b`


- [x] `nhlua.c` `restore_luadata` (named). Not restore_gamelog. **Addressed:** D-1636 `7f506ccd`


- [x] `invent.c` ggetobj drop (named). Not takeoff/identify. **Addressed:** D-1635 `9eb563b8`


- [x] `questpgr.c` `convert_line` pronoun `%Xh` (named). Not com_pager_core. **Addressed:** D-1634 `b111beb6`


- [x] `files.c` tribute (named). Not putmsghistory. **Addressed:** D-1633 `e476fe74`


- [x] `getline.c` `kill_char` (named). Not EDIT_GETLIN. **Addressed:** D-1632 `20fa20b3`


- [x] `topl.c` `tty_yn_function` `tty_nhbell` (named). Not post-answer toplines. **Addressed:** D-1631 `4b50b2e9`


- [x] `do_wear.c` `menu_remarm` (named). Not take_off occupation. **Addressed:** D-1630 `a2992805`


- [x] `dog.c` `free_edog` (named). Not initedog ogoal. **Addressed:** D-1629 `54c89bcc`


- [x] `restore.c` `restore_gamelog` (named). Not restore_msghistory. **Addressed:** D-1628 `7af8fe5b`


- [x] `steed.c` `dismount_steed` DISMOUNT_THROWN (named). Not dog_move Conflict. **Addressed:** D-1627 `15041ea2`


- [x] `sounds.c` MS_BOAST hostile giants (named). Not MS_HUMANOID. **Addressed:** D-1626 `c020e463`


- [x] `cmd.c` `doextlist` (named). Not #seeall EXT_CMDS. **Addressed:** D-1625 `1d6a8b20`


- [x] `getline.c` EDIT_GETLIN (named). Not getline ^P. **Addressed:** D-1624 `3e6bf20d`


- [x] `topl.c` `tty_yn_function` post-answer `toplines=prompt+key` (named). Not yn ^P. **Addressed:** D-1623 `935c8220`


- [x] `questpgr.c` `com_pager_core` synopsis (named). Not restore_msghistory. **Addressed:** D-1622 `fdb4ed5d`


- [x] `invent.c` `adjust_split` GC_ECHOFIRST|GC_CONDHIST caller (named). Not get_count. **Addressed:** D-1621 `5f2c5f4d`


- [x] `pickup.c` floor `query_classes` (named). Not traditional_loot. **Addressed:** D-1620 `cb4d8a91`


- [x] `do_wear.c` `take_off` occupation (named). Not ggetobj. **Addressed:** D-1619 `597fd9ba`


- [x] `sounds.c` peaceful MS_HUMANOID (named). Not mplayer_talk. **Addressed:** D-1618 `c98a5fab`


- [x] `dogmove.c` Conflict `lose_guardian_angel` caller (named). Not gain_guardian_angel. **Addressed:** D-1617 `5c66e2ab`


- [x] `mon.c` `reset_hostility` (named). Not gain_guardian_angel. **Addressed:** D-1616 `6d7584b0`


- [x] `apply.c` `consume_obj_charge` `update_inventory` (named). Not perm_invent InvInUse. **Addressed:** D-1615 `6a08939b`


- [x] `restore.c` `restore_msghistory` (named). Not putmsghistory. **Addressed:** D-1614 `68c0f298`


- [x] `cmd.c` `get_count` historicmsg (named). Not putmsghistory. **Addressed:** D-1613 `587c52ad`


- [x] `topl.c` `tty_yn_function` ^P (named). Not command ^P. **Addressed:** D-1612 `7012e194`

## 2026-08-28

- [x] `getline.c` getlin ^P `tty_doprev_message` (named). Not command ^P. **Addressed:** D-1611 `21441f2e`


- [x] `dog.c` `initedog` ogoal `-1` (named). Not has_edog. **Addressed:** D-1610 `35d8e512`


- [x] `mon.c` `m_unleash` (named). Not newcham. **Addressed:** D-1609 `c3d43f93`


- [x] `minion.c` `gain_guardian_angel` (named). Not create_mplayers. **Addressed:** D-1608 `43209cfb`


- [x] `makemon.c` mongets mplayer-sword spe (named). Not show_transient_light. **Addressed:** D-1607 `233abaea`


- [x] `mplayer.c` `mplayer_talk` (named). Not create_mplayers. **Addressed:** D-1606 `f9d27e3f`


- [x] `cmd.c` `#seeall` EXT_CMDS (named). Not doprinuse. **Addressed:** D-1605 `44151244`


- [x] `zap.c` `bhit` `show_transient_light` `!Blind` must use youprop `(HBlinded||EBlinded)&&!BBlinded` (`youprop.h:103`), not `zap.js` sticky `u.Blind||u.ublind`. Source: reviews/loop-unattended/558-9244ce75-show-transient-light.md **Addressed:** D-1604 `49933ea8`


- [x] `allmain.c` new-game `program_state.beyond_savefile_load = 1` (`:71`, “for TTY_PERM_INVENT”) and `restore.c` `:942` after load. JS `sync_perminvent` gates `pickinv_build_perm` on that field but never sets it, so D-1600 InvInUse filter is dead. Source: reviews/loop-unattended/561-fb87326a-perm-invent-inv-inuse.md **Addressed:** D-1603 `d1a832a1`


- [x] `pickup.c` ggetobj takeoff/identify askchain (named). Not traditional_loot. **Addressed:** D-1602 `b9710bcf`


- [x] `topl.c` `tty_doprev_message` (named). Not putmsghistory. **Addressed:** D-1601 `fd0ada3f`


- [x] `invent.c` perm_invent InvInUse (named). Not inuse_only. **Addressed:** D-1600 `fb87326a`


- [x] `invent.c` SORTLOOT_PETRIFY (named). Not inuse_only. **Addressed:** D-1599 `95ad0f11`


- [x] `makemon.c` `has_mcorpsenm` (named). Not set_mimic_sym. **Addressed:** D-1598 `9a4cbd04`


- [x] `makemon.c` `show_transient_light` (named). Not ndemon. **Addressed:** D-1597 `9244ce75`


- [x] `mplayer.c` `create_mplayers` (named). Not mk_mplayer. **Addressed:** D-1596 `fa152acc`


- [x] `dog.c` tamedog `initedog` has_edog vs `!mtame` (named). Not FULL_MOON. **Addressed:** D-1595 `ab70af21`


- [x] `mon.c` `normal_shape` must await `newcham(..., NC_SHOW_MSG)` (C `:4438`) so PfSC `rescham`/`restore_cham`/zap cancel print the shapeshift pline before `cham=NON_PM`/`newsym`/clay-golem, not as a dropped Promise. Source: reviews/loop-unattended/547-9cdc66f5-newcham-nc-show-msg.md **Addressed:** D-1594 `dc1d6d94`


- [x] `dog.c` tamedog ustuck expels/unstuck (named). Not FULL_MOON. **Addressed:** D-1593 `4b34b340`


- [x] `pickup.c` more_containers `n` (named). Not traditional_loot. **Addressed:** D-1592 `c4be5135`


- [x] `invent.c` `display_used_invlets` (named). Not gacc. **Addressed:** D-1591 `92bbf63b`


- [x] `invent.c` wizid unid_cnt>0 PICK_ANY (named). Not gacc. **Addressed:** D-1590 `094af60d`


- [x] `invent.c` sortloot inuse_only (named). Not gacc. **Addressed:** D-1589 `7415056f`


- [x] `invent.c` putmsghistory (named). Not gacc. **Addressed:** D-1588 `a3325fe0`


- [x] `display.c` `mimic_light_blocking` See_invisible block/unblock (named). Not seemimic. **Addressed:** D-1587 `5e46f730`


- [x] `mon.c` `newcham` NC_SHOW_MSG `pline_mon` (named). Not Protection cancel. **Addressed:** D-1586 `9cdc66f5`


- [x] `dog.c` FULL_MOON S_DOG `rn2(6)` (named). Not wake_nearto. **Addressed:** D-1585 `d5c9430a`


- [x] `makemon.c` `mk_mplayer` (named). Not ndemon. **Addressed:** D-1584 `05c69d9b`


- [x] `vision.c` `nv_range` circle (named). Not unblock_point. **Addressed:** D-1583 `7843458b`


- [x] `cmd.c` PREFIXCMD / `cmdq_shift` (named). Not do_repeat. **Addressed:** D-1582 `6c996e15`


- [x] `pickup.c` traditional_loot askchain (named). Not `'r'` reversed. **Addressed:** D-1581 `fd458754`


- [x] `invent.c` gacc / `'0'` ball class (named). Not mime_action. **Addressed:** D-1580 `d7879b7c`


- [x] `invent.c` mime_action (named). Not force_invmenu. **Addressed:** D-1579 `51d877a8`


- [x] `invent.c` force_invmenu `*`/`?` redo (named). Not hands/xtra. **Addressed:** D-1578 `c4019a30`


- [x] `worm.c` `redraw_worm` (named). Not cutworm. **Addressed:** D-1577 `38c61b34`


- [x] `region.c` `add_region` / `remove_region` / `expire_gas_cloud` per-cell `block_point`/`unblock_point` (C `:326–328` / `:375–376` / `:1071–1072`). D-1574 made `recalc_block_point` incremental; JS still one-corner `recalc` (expire pass 1 empty). First public FAIL: seed4500 at `1ba35e31` (RNG 88490/108275). Source: reviews/loop-unattended/535-1ba35e31-unblock-point.md **Addressed:** D-1576 `7131dc25`


- [x] `makemon.c` `ndemon` aligned `mkclass` (named). Not rndmonst_adj. **Addressed:** D-1575 `d13bf416`


- [x] `vision.c` `unblock_point`/`dig_point` (named). Not block_point. **Addressed:** D-1574 `1ba35e31`


- [x] `mon.c` `newcham` Protection_from_shape_changers cancel (named). Not set_mimic_sym early-out. **Addressed:** D-1573 `423b6b29`


- [x] `timeout.c` `attach_egg_hatch_timeout` (named). Not Plan-B. **Addressed:** D-1572 `6d7adcc6`


- [x] `vision.c` `vision_recalc` xray IN_SIGHT (named). Not howmonseen. **Addressed:** D-1571 `9772b028`


- [x] `worm.c` `cutworm` (named). Not worm_known. **Addressed:** D-1570 `3ace1611`


- [x] `invent.c` pickinv hands/xtra_choice (named). Not `&ctmp`. **Addressed:** D-1569 `934f168b`


- [x] `invent.c` getobj eat/read/zap/tin NOFLAGS (named). Not ALLOWCNT. **Addressed:** D-1568 `413df120`


- [x] `pickup.c` `'r'` reversed put-in then take-out (named). Not stash. **Addressed:** D-1567 `b2827fe2`


- [x] `makemon.c` `rndmonst_adj` rogue/elem filters (named). Not mkclass. **Addressed:** D-1566 `72735008`


- [x] `makemon.c` `clone_mon` `place_monster` 2D grid (named). Not HP split. **Addressed:** D-1565 `224bd3a6`


- [x] `makemon.c` `set_mimic_sym` Protection_from_shape_changers early-out (named). Not DELPHI. Not block_point. **Addressed:** D-1564 `e8cc4c96`
- [x] `makemon.c` `set_mimic_sym` slime-mold `flags.made_fruit` (named). Not DELPHI. **Addressed:** D-1564 `e8cc4c96`
- [x] `makemon.c` `set_mimic_sym` nocorpse/hatch/tin Plan-B (named). Not DELPHI. **Addressed:** D-1564 `e8cc4c96`


- [x] `cmd.c` getobj CQ_REPEAT / `in_doagain` (named). Not canned CMDQ_INT. **Addressed:** D-1563 `1504ead1`


- [x] `vision.c` `howmonseen` (named). Not worm_known. **Addressed:** D-1562 `a54cb31b`


- [x] `pickup.c` stash getobj ALLOWCNT (named). Not CMDQ_INT. **Addressed:** D-1561 `c60475f1`


- [x] `wield.c` `finish_splitting` / `unsplitobj` (named). Not CMDQ_INT. **Addressed:** D-1560 `67d0c50c`


- [x] `invent.c` `display_pickinv` `&ctmp` menu count (named). Not CMDQ_INT. **Addressed:** D-1559 `30c83eb9`


- [x] `artifact.c` SEARCH/REGEN/XRAY conferral (named). Not cspfx. **Addressed:** D-1558 `599494b3`

## 2026-08-26

- [x] `makemon.c` `set_mimic_sym` `block_point` (named). Not DELPHI. **Addressed:** D-1557 `0f5e4df5`


- [x] `makemon.c` `set_mimic_sym` DELPHI `S_fountain` (named). Not furnsyms. **Addressed:** D-1556 `f8a7cea2`


- [x] `do_name.c` `namefloorobj` (named). Not that_is_a_mimic. **Addressed:** D-1555 `1c43e64c`


- [x] `pager.c` `mhidden_description` (named). Not that_is_a_mimic. **Addressed:** D-1554 `1918ea61`


- [x] `sp_lev.c` `splev_create_monster` RANDOM-only (named). Not mk_roamer. **Addressed:** D-1553 `9ed46432`


- [x] `cmd.c` INTERNALCMD Eyes `is_plural` (named). Not #altdip. **Addressed:** D-1552 `4383ae0a`


- [x] `invent.c` canned CMDQ_INT (named). Not ALLOWCNT. **Addressed:** D-1551 `73321d0c`


- [x] `mon.c` `monkilled`: `js/trap.js` clone still `cansee(head)`; use `wormno ? worm_known : cansee(head)` like `mhitm.js`. Source: reviews/loop-unattended/509-9b53440e-worm-known.md **Addressed:** D-1550 `27feb511`


- [x] `detect.c` `map_monst` / `monster_detect`: compare long-worm by `mndx`/`mnum`, not `mtmp.data === mons(PM_LONG_WORM)` (`mons()` allocates a new ptr so `detect_wsegs` never runs). Source: reviews/loop-unattended/506-adfba7fc-detect-wsegs.md **Addressed:** D-1549 `34013957`


- [x] `worm.c` `worm_known` (named). Not detect_wsegs. **Addressed:** D-1548 `9b53440e`


- [x] `pager.c` getpos fakeobj (named). Not that_is_a_mimic. **Addressed:** D-1547 `0461e305`


- [x] `dog.c` `tamedog` `wake_nearto` (named). Not is_covetous. **Addressed:** D-1546 `da06ac60`


- [x] `worm.c` `detect_wsegs` (named). Not see_wsegs. **Addressed:** D-1545 `adfba7fc`


- [x] `pager.c` `that_is_a_mimic` (named). Not object_from_map. **Addressed:** D-1544 `c9f09e97`


- [x] `makemon.c` `set_mimic_sym` furnsyms real S_* (named). Not door S_hcdoor. **Addressed:** D-1543 `caae0b20`


- [x] `themerms.lua` Light source fill oil lamp (named). Not create_object o->lit. **Addressed:** D-1542 `e5188ba2`


- [x] `restore.c` `ghostfruit` (named). Not goodfruit. **Addressed:** D-1541 `21ccdfde`


- [x] `shk.c` `make_happy_shk` (`:1395–1435`): port `adjalign` (non-Rogue), `!inhishop` `home_shk` / `mdrop_special_objs`+`migrate_to_level`+`dismiss_kops`, and `make_happy_shoppers` (`kops_gone`/`pacify_guards`) so `tamedog` `:1235–1238` matches C, not pacify+“calms down” only. Source: reviews/loop-unattended/493-81e04089-tamedog-covetous.md **Addressed:** D-1540 `53f71db1`


- [x] `artifact.c` cspfx W_ART (named). Not SPFX_WARN. **Addressed:** D-1539 `719506a4`


- [x] `dog.c` wander/`somexy` (named). Not is_covetous. **Addressed:** D-1538 `e7574dc9`


- [x] `cmd.c` INTERNALCMD `#altdip` (named). Not dip_into. **Addressed:** D-1537 `4508a3cb`


- [x] `makemon.c` `set_mimic_sym` door `S_hcdoor` (named). Not furnsyms. **Addressed:** D-1536 `2778c077`


- [x] `pickup.c` `observe_quantum_cat` FOOT (named). Not HEAD. **Addressed:** D-1535 `455020ed`


- [x] `mcastu.c` `mcast_blind_you` EYE (named). Not PSI_BOLT HEAD. **Addressed:** D-1534 `289573bc`


- [x] `sp_lev.c` `create_object` `o->lit` (named). Not mktrap_victim. **Addressed:** D-1533 `9d2ba80e`


- [x] `dog.c` `tamedog` is_covetous (named). Not leftovers. **Addressed:** D-1532 `81e04089`


- [x] `sp_lev.c` `create_monster` / `load_pri_strt`: `align!=RANDOM` aligned cleric must `mk_roamer` (`MM_EMIN`, `min_align=A_NONE`) like C `:1983–1984` + `priest.c:738–746`, not `makemon(..., 0)`, so D-1526 emin `rn2(3)` does not fire on Pri-strt. Source: reviews/loop-unattended/487-4e78ca90-emin-roaming.md **Addressed:** D-1531 `3c112783`


- [x] `invent.c` `getobj` GETOBJ_ALLOWCNT count prefix (named). Not Palantir. **Addressed:** D-1530 `a5d779b7`


- [x] `worm.c` `see_wsegs` (named). Not worm_move. **Addressed:** D-1529 `72c1fcdd`


- [x] `display.c` `show_region` (named). Not Hallu/Warn_of_mon. **Addressed:** D-1528 `aa4d11f5`


- [x] `timeout.c` `visible_region_summary` (named). Not any_visible_region. **Addressed:** D-1527 `d53c5cd1`


- [x] `makemon.c` emin roaming (named). Not dprince. **Addressed:** D-1526 `4e78ca90`


- [x] `makemon.c` `set_mimic_sym` altar Align2amask MCORPSENM (named). Not maze/shop. **Addressed:** D-1525 `e234a41b`


- [x] `pager.c` look SLIME_MOLD `spe = current_fruit` (named). Not xname. **Addressed:** D-1524 `2c688c98`


- [x] `bones.c` `goodfruit` (named). Not fruit_from_indx. **Addressed:** D-1523 `e13f38ae`


- [x] `objnam.c` `reorder_fruit` (named). Not fruit_from_indx. **Addressed:** D-1522 `aac21a74`


- [x] `objnam.c` doname_base slime-mold fake_arti (named). Not fruit_from_indx. **Addressed:** D-1521 `6a42c40e`


- [x] `options.c` fruitadd should call objnam `fruit_from_name` (not the exact-only walker). Not fruit_from_indx. **Addressed:** D-1520 `5dd0ba20`


- [x] `mklev.c` `mktrap_victim` gnome candle `begin_burn` (named). Not `m_initinv`. **Addressed:** D-1519 `d5799f73`


- [x] `makemon.c` dprince MS_BRIBE / raven BEC_DE_CORBIN (named). Not emin. **Addressed:** D-1518 `527815fb`


- [x] `makemon.c` `set_mimic_sym` maze/sokoban/`in_town` (named). Not shop arm. **Addressed:** D-1517 `8bfe0bc8`


- [x] `makemon.c` non-salamander S_LIZARD `m_initweap` (named). Not S_KOP. **Addressed:** D-1516 `cf3c5701`


- [x] `makemon.c` S_KOP `m_initweap` specials (named). Not throws_rocks. **Addressed:** D-1515 `3a5f062e`

## 2026-08-25

- [x] `artifact.c` SPFX_WARN conferral / MATCH_WARN (named). Not Sting_effects. **Addressed:** D-1514 `9a50ef27`


- [x] `mklev.js` `load_minetn_7` town-room gnomes: C `dat/minetn-7.lua` has three `des.monster("gnome")` then gnome lord + two monkeys; JS calls `splev_room_monster('gnome')` four times (extra `induced_align(80)`+`makemon`). Source: reviews/loop-unattended/465-eeb0e912-minetn-7-bazaar-town.md **Addressed:** D-1513 `2f5f7fd1`


- [x] `display.c` `any_visible_region` (named). Not Hallu/Warn_of_mon. **Addressed:** D-1512 `79744185`


- [x] `objnam.c` `fruit_from_indx` (named). Not the(). **Addressed:** D-1511 `85c341a7`


- [x] `zap.c` `poly_obj` worn `set_wear` (named). Not potion_dip. **Addressed:** D-1510 `57d22857`


- [x] `potion.c` `potion_dip` lichen corpse / acid-erode (named). Not H2O useeit. **Addressed:** D-1509 `7092fab7`


- [x] `polyself.c` `body_part` aliases: `body_part_head` (mcastu.js), `body_part_hand` (pickup.js). Deferred for scope. zap.js is D-1496. **Addressed:** D-1508 `be542317`


- [x] `makemon.c` `throws_rocks` Sokoban first-try (named). Not gnome candle. **Addressed:** D-1507 `a4a370f4`


- [x] `makemon.c` gnome candle `begin_burn` after `!mpickobj` (named). Not add_to_minv. **Addressed:** D-1506 `1e1d1864`


- [x] `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL (named). Not stolen_booty. **Addressed:** D-1505 `cac06f86`


- [x] `mklev.c` minetn-7 load_special (named). Not minetn-6. **Addressed:** D-1504 `eeb0e912`


- [x] `mklev.c` minetn-6 load_special (named). Not minetn-1. **Addressed:** D-1503 `1f64431d`


- [x] `artifact.c` `doinvoke` TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH (named). Not HEALING/storm. **Addressed:** D-1502 `89b85fcc`


- [x] `potion.c` `H2Opotion_dip` useeit `ublindf && Blindfolded_only` (named). Not mix. **Addressed:** D-1501 `83b29455`


- [x] `potion.c` `dip_into` (named). Not dodip. **Addressed:** D-1500 `b96ac27f`


- [x] `potion.c` `potion_dip` `poly_obj`/`obj_unpolyable` (named). Not mixtype. **Addressed:** D-1499 `089a9829`


- [x] `potion.c` `potion_dip` oil/lamp (named). Not poison-coat. **Addressed:** D-1498 `51ea77da`


- [x] `potion.c` `potion_dip` poison-coat / healing unpoison (named). Not unicorn mix. **Addressed:** D-1497 `377302b9`


- [x] `artifact.c` `invoke_untrap` is on the live cost+switch list while `trap.js` `untrap` always returns 0 (`void force`; door/floor disarm deferred). Either port C `untrap(TRUE,0,0,NULL)` success (`:1838–1845`) or keep UNTRAP named (no cost) until the callee can return true. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md **Addressed:** D-1495 `4722df06`


- [x] `artifact.c` `invoke_healing` first `You_feel("better.")` gate must use C `Blinded` as 0/1 (`HBlinded && !BBlinded`, `youprop.h:92`) vs `ucreamed`, not the full `HBlinded` word (`artifact.c :1787`). Keep the second `BlindedTimeout` gate. Not ENERGY. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md **Addressed:** D-1494 `27a1f4b6`


- [x] `allmain.c` `see_monsters` Hallu / Warn_of_mon (named). Not DETECT_MONSTERS timeout. **Addressed:** D-1493 `8669b5b8`


- [x] `makemon.c` `add_to_minv` merge (named). Not stolen_booty. **Addressed:** D-1492 `b303c111`


- [x] `worm.c` `worm_move` (named). Not initworm. **Addressed:** D-1491 `f26e11aa`


- [x] `mklev.c` `minetn-1` load_special (named). Not minetn-5. **Addressed:** D-1490 `69080895`


- [x] `zap.c` `zap_map` lateral drawbridge / bhit (named). Not engraving. **Addressed:** D-1489 `83fa138f`


- [x] `artifact.c` `doinvoke` remaining `inv_prop` (named). Not BLINDING_RAY. **Addressed:** D-1488 `00d5d4d6`


- [x] `objnam.c` `the()` fruit_from_name + artifact_name (named). Not CapitalMon. **Addressed:** D-1487 `8d41bd04`


- [x] `potion.c` `potion_dip` unicorn/amethyst mix (named). Not mixtype. **Addressed:** D-1486 `9f784a5c`


- [x] `zap.c` `zap_updown` `default` must `break` into shared down `bhitpile`+`zap_map` (C `:3378–3389`) so unmounted down POLY/cancel/invis/tele hit D-1476’s arms. Not probing. Not lateral `bhit`. Source: reviews/loop-unattended/437-747e6616-zap-map-engraving-cancel-trap.md **Addressed:** D-1485 `e98c0be8`


- [x] `muse.c` `mbhit` doorlock (named). Not hero `bhit`. **Addressed:** D-1484 `dba2c79a`


- [x] `zap.c` `bhito` poly-arm boxlock `reset_pick` (named). Not uchain. **Addressed:** D-1483 `49826707`


- [x] `zap.c` `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT (named). Not LOCKING. **Addressed:** D-1482 `f0cb5942`


- [x] `zap.c` `bhito` uchain unpunish WAN_OPENING (named). Not boxlock. **Addressed:** D-1481 `4642b8b1`


- [x] `zap.c` `zap_steed` SPE_CURE_SICKNESS via bhitm (named). Not SPEED. **Addressed:** D-1480 `a65834a1`


- [x] `zap.c` `zap_steed` WAN_SPEED_MONSTER via bhitm (named). Not SLOW. **Addressed:** D-1479 `7c918806`


- [x] `zap.c` `zap_steed` WAN_SLOW_MONSTER/SPE_SLOW_MONSTER via bhitm (named). Not STRIKING. **Addressed:** D-1478 `713e0441`


- [x] `potion.c` `potionbreathe` remaining otyps (named). Not potionhit. **Addressed:** D-1477 `c3f67016`


- [x] `zap.c` `zap_map` engraving/cancel trap (named). Not probing. **Addressed:** D-1476 `747e6616`


- [x] `zap.c` `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK (named). Not OPENING. **Addressed:** D-1475 `a3a2d65a`


- [x] `zap.c` `zap_steed` WAN_STRIKING/SPE_FORCE_BOLT via bhitm (named). Not INVIS. **Addressed:** D-1474 `dfd88d1b`


- [x] `zap.c` `zap_steed` WAN_MAKE_INVISIBLE via bhitm (named). Not POLY. **Addressed:** D-1473 `e6a44782`


- [x] `potion.c` `potionhit` (named from D-1457). Not mixtype. **Addressed:** D-1472 `71a0a3d5`


- [x] `zap.c` `zap_steed` WAN_POLYMORPH/SPE_POLYMORPH via bhitm (named). Not CANCEL. **Addressed:** D-1471 `36a4e811`


- [x] `zap.c` `zap_steed` WAN_CANCELLATION/SPE_CANCELLATION via bhitm (named). Not OPENING. **Addressed:** D-1470 `444e2080`


- [x] `spell.c` `spelleffects` SPE_HEALING/SPE_EXTRA_HEALING directional weffects (named). Not TELE. **Addressed:** D-1469 `245c783d`


- [x] `spell.c` `spelleffects` SPE_TELEPORT_AWAY IMMEDIATE wand-duplicate weffects (named). Not STONE. **Addressed:** D-1468 `3b4c39e2`


- [x] `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING (named). Not doorlock. **Addressed:** D-1467 `1003ab88`


- [x] `zap.c` `zap_updown` WAN_STONE_TO_FLESH (named). Not LOCKING. **Addressed:** D-1466 `3605a281`


- [x] `zap.c` `zap_updown` WAN_LOCKING/SPE_WIZARD_LOCK (named). Not STRIKING. **Addressed:** D-1465 `a52401a6`


- [x] `zap.c` `zap_steed` SPE_DRAIN_LIFE via bhitm (named). Not OPENING. **Addressed:** D-1464 `89aab16d`


- [x] `zap.c` `zap_steed` WAN_OPENING/SPE_KNOCK via bhitm (named). Not teleport. **Addressed:** D-1463 `99a31c84`


- [x] `zap.c` `bhit` doorlock WAN_OPENING/SPE_KNOCK (named). Not boxlock. **Addressed:** D-1462 `2173fc2d`


- [x] `zap.c` `weffects` SPE_STONE_TO_FLESH IMMEDIATE wand-duplicate (named). Not mix. **Addressed:** D-1461 `e4d98eb1`


- [x] `zap.c` `weffects` SPE_CANCELLATION IMMEDIATE wand-duplicate (named). Not STONE. **Addressed:** D-1460 `f071b0ad`


- [x] `zap.c` `weffects` SPE_POLYMORPH IMMEDIATE wand-duplicate (named). Not CANCELLATION. **Addressed:** D-1459 `7634fd61`


- [x] `zap.c` `weffects` SPE_TURN_UNDEAD IMMEDIATE wand-duplicate (named). Not POLYMORPH. **Addressed:** D-1458 `01edf8b9`


- [x] `potion.c` remaining mix alchemy (named from D-1439). Not peffects. **Addressed:** D-1457 `c2736f3e`


- [x] `zap.c` `zap_updown` WAN_STRIKING/SPE_FORCE_BOLT (named). Not OPENING. **Addressed:** D-1456 `91e3e8a8`


- [x] `zap.c` `zap_steed` WAN_TELEPORTATION (named). Not probing. **Addressed:** D-1455 `ad3eca95`


- [x] `zap.c` `zap_updown` WAN_OPENING/SPE_KNOCK (named). Not probing. **Addressed:** D-1454 `68635edb`


- [x] `zap.c` `bhito` SPE_DRAIN_LIFE `drain_item` (named). Not probing. **Addressed:** D-1453 `291aea0a`


- [x] `zap.c` `weffects` SPE_WIZARD_LOCK IMMEDIATE wand-duplicate (named). Not POLYMORPH. **Addressed:** D-1452 `41c16bfe`


- [x] `zap.c` `weffects` SPE_SLOW_MONSTER IMMEDIATE wand-duplicate (named). Not LOCK. **Addressed:** D-1451 `5c8b73c5`


- [x] `zap.c` `weffects` SPE_KNOCK IMMEDIATE wand-duplicate (named from D-1427). Not SLOW. **Addressed:** D-1450 `de69d3f9`


- [x] `spell.c` SPE_FINGER_OF_DEATH wand-duplicate RAY (named from D-1440). Not MAGIC_MISSILE. **Addressed:** D-1449 `70c2b8e6`


- [x] `spell.c` SPE_MAGIC_MISSILE wand-duplicate RAY (named from D-1440). Not FINGER. **Addressed:** D-1448 `20f59004`


- [x] `uhitm.c` `mhitm_ad_phys` poison leftover (named from D-1415). Not rustm. **Addressed:** D-1447 `4dde6eeb`


- [x] `zap.c` `zapyourself` SPE_DRAIN_LIFE (named). Not bhitm drain. **Addressed:** D-1446 `ed218e86`


- [x] `zap.c` `bhito` WAN_PROBING (named). Not updown. **Addressed:** D-1445 `7628b03e`


- [x] `zap.c` `zap_updown` WAN_PROBING (named). Not steed. **Addressed:** D-1444 `ae0cf7f4`


- [x] `zap.c` `zap_steed` WAN_PROBING (named). Not zapyourself. **Addressed:** D-1443 `4a0aa5cc`


- [x] `uhitm.c` `mhitm_ad_phys` rustm leftover (named from D-1415). Not poison. **Addressed:** D-1442 `892be171`


- [x] `zap.c` `weffects` SPE_DIG wand-duplicate (named from D-1427). Not IMMEDIATE. **Addressed:** D-1441 `b8ef02c3`


- [x] `zap.c` `weffects` SPE_SLEEP wand-duplicate (named from D-1427). Not DIG. **Addressed:** D-1440 `530eaa3c`


- [x] `potion.c` `peffect_hallucination` (named). Not remaining mix. **Addressed:** D-1439 `f6dd492b`


- [x] `potion.c` `peffect_gain_ability` (named). Not hallucination. **Addressed:** D-1438 `abdbcad6`


- [x] `potion.c` `peffect_sleeping` (named). Not remaining peffects. **Addressed:** D-1437 `af184f1e`


- [x] `zap.c` `bhitm` SPE_DRAIN_LIFE (named). Not zapyourself slow. **Addressed:** D-1436 `e413754d`


- [x] `zap.c` `zapyourself` WAN_PROBING (named). Not drain. **Addressed:** D-1435 `ebe912e0`


- [x] `zap.c` `zapyourself` WAN_LOCKING (named). Not probing self. **Addressed:** D-1434 `4488f535`


- [x] `zap.c` `zapyourself` WAN_SLOW_MONSTER (named from D-1424). Not locking self. **Addressed:** D-1433 `07c5ee30`


- [x] `potion.c` `peffect_blindness` (named). Not sleeping. **Addressed:** D-1432 `b19bcf7a`

## 2026-08-24

- [x] `potion.c` `peffect_gain_level` (named). Not blindness. **Addressed:** D-1431 `66254727`


- [x] `potion.c` `peffect_acid` (named). Not gain level. **Addressed:** D-1430 `3e742468`


- [x] `potion.c` `peffect_gain_energy` (named). Not acid. **Addressed:** D-1429 `4a16af4e`


- [x] `potion.c` `peffect_polymorph` (named). Not gain energy. **Addressed:** D-1428 `19c24f62`


- [x] `zap.c` `zapnodir` remaining SPE_LIGHT wand-duplicate (named from D-1412). Not detect unseen. **Addressed:** D-1427 `91c11733`


- [x] `zap.c` `bhitm` WAN_PROBING (named from D-1369). Not locking. **Addressed:** D-1426 `e50968db`


- [x] `zap.c` `bhitm` WAN_LOCKING (named from D-1369). Not probing. **Addressed:** D-1425 `8f334efb`


- [x] `zap.c` `bhitm` WAN_SLOW_MONSTER (named). Not speed. **Addressed:** D-1424 `faa5f3f3`


- [x] `zap.c` `bhitm` WAN_MAKE_INVISIBLE `knowninvisible` must use C `See_invisible`/`Detect_monsters` (`H||E` ≡ `uprops[SEE_INVIS]`/`DETECT_MONSTERS`) so a conferral ring-of-see-invisible still takes the transparent+learnwand arm, not vanish. Source: reviews/loop-unattended/374-f968904d-bhitm-wan-make-invisible.md **Addressed:** D-1423 `1200fdb0`


- [x] `zap.c` `bhitm` WAN_SPEED_MONSTER (named from D-1410). Not slow. **Addressed:** D-1422 `9f2a3a08`


- [x] `spell.c` `spelleffects` SPE_INVISIBILITY peffects (named from D-1408). Not amulet drain. **Addressed:** D-1421 `d6d910c2`


- [x] `spell.c` `spelleffects` SPE_RESTORE_ABILITY peffects (named from D-1408). Not INVISIBILITY. **Addressed:** D-1420 `9ab114b4`


- [x] `spell.c` `spelleffects` SPE_LEVITATION peffects (named from D-1408). Not RESTORE_ABILITY. **Addressed:** D-1419 `89f05e45`

## 2026-08-22

- [x] `spell.c` `spelleffects` SPE_DETECT_MONSTERS peffects (named from D-1408). Not LEVITATION. **Addressed:** D-1418 `e611ef84`


- [x] `spell.c` `spelleffects` SPE_DETECT_TREASURE peffects (named from D-1408). Not DETECT_MONSTERS. **Addressed:** D-1417 `e78d7780`


- [x] `zap.c` `backfire` (named). Not zapyourself. **Addressed:** D-1416 `22e87b3b`


- [x] `uhitm.c` `mhitm_ad_phys` artifact_hit leftover (named from D-1403). Not rustm. **Addressed:** D-1415 `081c5c6a`


- [x] `zap.c` `bhitm` WAN_MAKE_INVISIBLE (named from D-1369). Not zapyourself speed. **Addressed:** D-1414 `f968904d`


- [x] `potion.c` `peffect_enlightenment` (named from D-1395). Not full healing. **Addressed:** D-1413 `285218b2`


- [x] `zap.c` `zapnodir` SPE_DETECT_UNSEEN (named from D-1404). Not stasis. **Addressed:** D-1412 `fb872749`


- [x] `potion.c` `peffect_full_healing` (named). Not haste. **Addressed:** D-1411 `71ee9186`


- [x] `zap.c` `zapyourself` WAN_SPEED_MONSTER (named from D-1369). Not make invisible. **Addressed:** D-1410 `55259f2b`


- [x] `spell.c` `spell_backfire` (named). Not peffects. **Addressed:** D-1409 `fa039634`


- [x] `spell.c` `spelleffects` SPE_HASTE_SELF peffects (named). Not mapping. **Addressed:** D-1408 `5c71fc34`


- [x] `spell.c` `spelleffects` SPE_MAGIC_MAPPING seffects (named). Not create monster. **Addressed:** D-1407 `6ec1c72d`


- [x] `mhitm.c` `mhitm_ad_wrap` brush (named from D-1348). Not uhitm wrap. **Addressed:** D-1406 `61936a70`


- [x] `uhitm.c` `mhitm_ad_fire` leftover (named from D-1385). Not STUN. **Addressed:** D-1405 `7c3921f2`

## 2026-08-21

- [x] `zap.c` `zapnodir` WAN_STASIS (named from D-1380). Not enlightenment. **Addressed:** D-1404 `cc7284d4`


- [x] `uhitm.c` `mhitm_ad_phys` AT_KICK thick_skinned (named). Not mwep. **Addressed:** D-1403 `d9134735`


- [x] `uhitm.c` `mhitm_ad_phys` mwep dmgval (named). Not shade_miss. **Addressed:** D-1402 `2a3da9b9`


- [x] `spell.c` `spelleffects` SPE_CREATE_MONSTER seffects (named). Not chain. **Addressed:** D-1401 `88587b68`


- [x] `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING (named). Not cure. **Addressed:** D-1400 `dce9ac86`


- [x] `spell.c` `spelleffects` SPE_CURE_BLINDNESS (named). Not sickness. **Addressed:** D-1399 `64d4d089`


- [x] `spell.c` `spelleffects` SPE_CURE_SICKNESS (named). Not jumping. **Addressed:** D-1398 `a938a5b9`


- [x] `spell.c` `spelleffects` SPE_JUMPING (named). Not clairvoyance. **Addressed:** D-1397 `f5e00af7`


- [x] `mhitm.c` `mdamagem` AD_STUN leftover (named from D-1352). Not CONF. **Addressed:** D-1396 `66018a5a`


- [x] `zap.c` `zapnodir` WAN_ENLIGHTENMENT (named from D-1380). Not stasis. **Addressed:** D-1395 `05f8c1a1`


- [x] `uhitm.c` `mhitm_ad_phys` shade_miss (named from D-1341). Not hmon. **Addressed:** D-1394 `91827af6`


- [x] `zap.c` `bhit` WEB stick (named from D-1383). Not M_AP_OBJECT. **Addressed:** D-1393 `7863ae2a`


- [x] `zap.c` `bhit` M_AP_OBJECT skip (named from D-1383). Not WEB. **Addressed:** D-1392 `adfd4533`


- [x] `spell.c` `spelleffects` SPE_CLAIRVOYANCE (named). Not protection. **Addressed:** D-1391 `a4923869`


- [x] `spell.c` `cast_protection` SPE_PROTECTION (named). Not familiar. **Addressed:** D-1390 `b5b5eb34`


- [x] `spell.c` `spelleffects` SPE_CREATE_FAMILIAR (named). Not force bolt. **Addressed:** D-1389 `5e8d1fbd`


- [x] `spell.c` `spelleffects` SPE_FORCE_BOLT (named). Not fireball. **Addressed:** D-1388 `c6af8407`


- [x] `spell.c` unskilled SPE_FIREBALL/CONE `getdir` cancel must leave previous `u.dx/u.dy/u.dz` like C `getdir((char*)0)` (`cmd.c` `:4095–4111`); `getdir_spell` zeros then always self-zaps. Use live `lock.js` `getdir` or stop zeroing. Do not add trailing `confdir` to shared `getdir`. Source: reviews/loop-unattended/346-1f94d5e3-unskilled-fireball-weffects.md. **Addressed:** D-1387 `c3d768d1`


- [x] `spell.c` unskilled SPE_FIREBALL/CONE FALLTHROUGH weffects (named from D-1378). Not skilled scatter. **Addressed:** D-1386 `1f94d5e3`


- [x] `mhitm.c` `mdamagem` AD_CONF leftover (named from D-1352). Not STON. **Addressed:** D-1385 `5be02746`


- [x] `uhitm.c` `hmon` `shade_miss` caller (named from D-1354). Not zap. **Addressed:** D-1384 `ec703f48`


- [x] `zap.c` `shade_miss` caller (named from D-1354). Not mthrowu. **Addressed:** D-1383 `970c6097`


- [x] `mthrowu.c` `shade_miss` caller (named from D-1354). Not uhitm hmon. **Addressed:** D-1382 `6077050a`


- [x] `uhitm.c` `do_attack` leprechaun evade (named from D-1373). Not wipe. **Addressed:** D-1381 `e0594454`


- [x] `zap.c` `zapnodir` WAN_WISHING (named). Not create. **Addressed:** D-1380 `ef8a60b0`


- [x] `zap.c` `zapnodir` WAN_CREATE_MONSTER (named). Not light. **Addressed:** D-1379 `ad7b89c7`


- [x] `spell.c` skilled SPE_FIREBALL scatter (named from D-1365). Not zapyourself explode. **Addressed:** D-1378 `12953730`


- [x] `artifact.c` `invoke_blinding_ray` (named from D-1366). Not camera. **Addressed:** D-1377 `e785f5bb`


- [x] `muse.c` MUSE_CAMERA `lightdamage` (named from D-1366). Not zapnodir. **Addressed:** D-1376 `61c15769`


- [x] `dig.c` `u_wipe_engr` caller (named from D-1360). Not dothrow. **Addressed:** D-1375 `8a2a32bd`


- [x] `dothrow.c` `u_wipe_engr` caller (named from D-1360). Not uhitm. **Addressed:** D-1374 `08007958`


- [x] `uhitm.c` `u_wipe_engr` attacker caller (named from D-1360). Not allmain. **Addressed:** D-1373 `d5614c8a`


- [x] `allmain.c` `u_wipe_engr` DEX timeout caller (named from D-1360). Not dokick. **Addressed:** D-1372 `b3fe3015`


- [x] zap.js maybe_destroy_item AD_ELEC Shock_resistance() must use youprop.h uprops[SHOCK_RES] (invent hero_Shock_resistance / D-1089), not zap.js sticky-only clone — worn ring of shock resistance still takes exploding-wand rnd(10) HP instead of "You aren't hurt!". Same helper already gates WAN_LIGHTNING. Do not rewrite confer_oc_oprop. Source: reviews/loop-unattended/328-9df30ee3-maybe-destroy-item-elec.md **Addressed:** D-1371 `211485a0`


- [x] `dokick.c` kick_ouch/kick_dumb airlevel/Levitation `hurtle` (named from D-1361). Not no_kick. **Addressed:** D-1370 `90eca343`


- [x] `zap.c` `zapyourself` WAN_MAKE_INVISIBLE (named). Not lightning. **Addressed:** D-1369 `46c4e1b0`


- [x] `zap.c` `maybe_destroy_item` AD_ELEC (named). Not zapyourself lightning. **Addressed:** D-1368 `9df30ee3`


- [x] zap.c zapyourself WAN/SPE_MAGIC_MISSILE Antimagic() must use youprop.h uprops[ANTIMAGIC] (D-1089 / invent hero_Antimagic), not zap.js sticky-only clone — cloak-of-MR / gray DSM still take d(4,6). Source: reviews/loop-unattended/324-17a0937c-zapyourself-magic-missile.md **Addressed:** D-1367 `463e151d`


- [x] `zap.c` `lightdamage` (named; WAN_LIGHT/camera). Not flashburn lightning. **Addressed:** D-1366 `9a144895`


- [x] `zap.c` `zapyourself` SPE_FIREBALL (named). Not lightning. **Addressed:** D-1365 `d8f4fba6`


- [x] `zap.c` `zapyourself` WAN_MAGIC_MISSILE (named). Not WAN_LIGHTNING. **Addressed:** D-1364 `17a0937c`


- [x] `dokick.c` `obj_delivery` stolen_booty / `mksobj_migr_to_species` (named from D-1177). **Addressed:** D-1363 `c10f4246`


- [x] `dokick.c` no_kick poly/steed/lizard/uinwater/boulder (named from D-0786). Not Wounded_legs. **Addressed:** D-1362 `a979a9ac`


- [x] `dokick.c` kick_ouch drawbridge `find_drawbridge` remap (named from D-1343). **Addressed:** D-1361 `a895ac7e`


- [x] `dokick.c` `u_wipe_engr` caller (C `:1384`; body D-1051). Not knockback. **Addressed:** D-1360 `bdf4c27e`


- [x] `fountain.c` `drinkfountain` fate<10 `uhunger += rnd(10)` + `newuhs(FALSE)` (C `:279–282`; "don't choke on water"). Not eat.c lesshungry. Source: reviews/loop-unattended/318-6fd45ec4-lesshungry-bite-choke.md **Addressed:** D-1359 `0ff8d15e`


- [x] `dokick.c` `wake_nearby` caller (C `:1383` after maybe_kick; callee live). Not knockback. **Addressed:** D-1358 `fbfc72d9`


- [x] `objnam.c` `the()` CapitalMon (named from D-1335). Not warn_obj. **Addressed:** D-1357 `0be5135b`


- [x] `eat.c` lesshungry/bite choke callers (named from D-1344). Not zap. **Addressed:** D-1356 `6fd45ec4`


- [x] `zap.c` `zapyourself` WAN_LIGHTNING (named). Not killer_xname. **Addressed:** D-1355 `0be6d98e`


- [x] `weapon.c` `dmgval` shade/`shade_glare` (named from D-1341). Not hitmm shade_miss. **Addressed:** D-1354 `6570ddba`


- [x] `zap.c` `ureflects` W_AMUL/W_ARM/dragon (named from D-1342). Not W_WEP. **Addressed:** D-1353 `03e578b1`


- [x] `mhitm.c` `mdamagem` AD_STON leftover (named from D-1338). Not shade_miss. **Addressed:** D-1352 `160de986`


- [x] `mhitm.c` hitmm silver sear (named from D-0887). Not shade_miss. **Addressed:** D-1351 `48f2f0a2`


- [x] `dokick.c` martial knockback (named from D-1332). Not abuse_dog. **Addressed:** D-1350 `d3f2a9e5`


- [x] `dokick.c` `abuse_dog` (named from D-1332). Not kickstr. **Addressed:** D-1349 `533e732f`


- [x] `uhitm.c` `m_slips_free` AD_WRAP (uhitm you-as-agr; named from D-1331). Not mhitu wrap. **Addressed:** D-1348 `dde5f91b`


- [x] `objnam.c` warn_obj glow (named from D-1322). Not killer_xname. **Addressed:** D-1347 `1651816e`


- [x] `dothrow.c` throwit `losehp` `killer_xname` (C `:1747`). Not zap. **Addressed:** D-1346 `15b20ab4`


- [x] `zap.c` zapyourself `killer_xname` (remaining). Not eat choke. **Addressed:** D-1345 `2a5e72e0`


- [x] `eat.c` choke `killer_xname` (remaining caller). Not dokick kickobjnam. **Addressed:** D-1344 `5195acee`


- [x] `dokick.c` `kickstr` (named; kick_ouch still raw kickobjnam). Not maybe_mnexto. **Addressed:** D-1343 `946d719d`


- [x] `artifact.c` `arti_reflects` W_WEP (named from D-1328). Not gazemu. **Addressed:** D-1342 `34de9f33`


- [x] `mhitm.c` hitmm `shade_miss` (named from D-0887). Not AT_HUGS. **Addressed:** D-1341 `e3a30202`


- [x] `mhitm.c` AT_HUGS (named from D-1327). Not explmm. **Addressed:** D-1340 `85eee14d`


- [x] `mhitm.c` explmm (named from D-1326). Not gazemm. **Addressed:** D-1339 `fdb30435`


- [x] `mhitm.c` gazemm (named from D-1328). Not AD_WRAP. **Addressed:** D-1338 `2368dc58`


- [x] `apply.c` `splash_lit` (named from D-1242). Not snuff_candle. **Addressed:** D-1337 `2bd70a77`


- [x] `dokick.c` `maybe_mnexto` evade (named from D-1310). Not kickstr. **Addressed:** D-1336 `a7ac5e52`


- [x] `dokick.c` `killer_xname` (kickobjnam still xname). Not special_dmgval. **Addressed:** D-1335 `31d32cad`


- [x] `mthrowu.c` `snuff_candle` (C `:942` notcaught land). Not throwit land. **Addressed:** D-1334 `487daa2f`


- [x] `dothrow.c` throwit land `snuff_candle` (C `:1818`). Not mthrowu. **Addressed:** D-1333 `b82375a7`


- [x] `dokick.c` kickdmg `special_dmgval` (named from D-1310). Not snuff_candle. **Addressed:** D-1332 `e430e099`


- [x] `mhitu.c` `u_slip_free` AD_WRAP (named from D-1307). Not AD_DRIN. **Addressed:** D-1331 `ea5df558`


- [x] `mhitm.c` AD_DRIN (named from D-1307). Not mhitu AD_DRIN. **Addressed:** D-1330 `cfc95500`


- [x] `mhitu.c` AD_DRIN (named from D-1309). Not gazemu. **Addressed:** D-1329 `a7a5a835`


- [x] `mhitu.c` gazemu (named from D-1314). Not explmu. **Addressed:** D-1328 `b21765a2`

## 2026-08-20

- [x] `mhitu.c` AT_HUGS (named). Not explmu. **Addressed:** D-1327 `2c9dff6a`


- [x] `mhitu.c` explmu (named). Not AT_HUGS. **Addressed:** D-1326 `9570f32a`


- [x] `dokick.c` snuff_candle (named from D-1242). Not throwit_mon_hit. **Addressed:** D-1325 `2cdf2b1f`


- [x] `dothrow.c` thitmonst vanish pline (named from D-1312). Not leader catch. **Addressed:** D-1324 `1d5b0b66`


- [x] `zap.c` bhit THROWN_TETHERED_WEAPON / isqrt (named from D-1311). Not throwit tether. **Addressed:** D-1323 `b50daaea`


- [x] `objnam.c` doname W_WEP `!mrg_to_wielded` + AKLYS `"tethered to"` (C `:1561–1595`; this SHA rewrote the if). Source: reviews/loop-unattended/283-b7a0c3c7-doname-wep-body-part.md. Not warn_obj. **Addressed:** D-1322 `843343cc`


- [x] `objnam.c` doname W_WEP `body_part(HAND)` poly (named from D-1295). Not MEAT_RING. **Addressed:** D-1321 `b7a0c3c7`


- [x] `objnam.c` doname POTION POT_OIL (lit) (named from D-1308). Not candle. **Addressed:** D-1320 `cf309315`


- [x] `objnam.c` doname LEASH attached (named from D-1308). Not candle. **Addressed:** D-1319 `cd867647`


- [x] `objnam.c` doname TOOL W_TOOL|W_SADDLE worn (named from D-1308). Not candle. **Addressed:** D-1318 `ccdc8670`


- [x] `objnam.c` doname CANDELABRUM (n of 7) (named from D-1308). Not candle. **Addressed:** D-1317 `9b1b4ba4`


- [x] `dothrow.c` throwit ACURRSTR urange (named). Not tether. **Addressed:** D-1316 `75c08164`


- [x] `dothrow.c` throwit must call `throwit_mon_hit` (not `thitmonst`) after bhit/swallow so `snuff_candle` and shk `hot_pursuit` fire. Source: reviews/loop-unattended/275-27751021-throwit-mon-hit-snuff.md **Addressed:** D-1315 `44a786aa`


- [x] `mon.c` m_respond (named from D-1301). Not snuff_candle. **Addressed:** D-1314 `a1d48196`


- [x] `dothrow.c` throwit_mon_hit snuff_candle / hot_pursuit (named from D-1301). Not m_respond. **Addressed:** D-1313 `27751021`


- [x] `dothrow.c` thitmonst leader catch / finish_quest (named). Not vanish pline. **Addressed:** D-1312 `77606a78`


- [x] `dothrow.c` throwit tethered DISP_TETHER / BACKTRACK (named from D-1303). Not leader catch. **Addressed:** D-1311 `3633eb61`


- [x] `dokick.c` poly AT_KICK loop (named). Not hmonas pit kick. **Addressed:** D-1310 `734449dc`


- [x] `mhitu.c` AT_TENT melee (named from D-1261). Not mswings. **Addressed:** D-1309 `07ac10e0`


- [x] `objnam.c` candle `partly used` (named from D-1295). Not MEAT_RING. **Addressed:** D-1308 `2b9c2c6a`


- [x] `uhitm.c` mhitm_ad_drin helmet / m_slips_free (named from D-1298). Not eat_brains. **Addressed:** D-1307 `b97b1fc6`


- [x] `eat.c` eat_brains (named from D-1298). Not helmet. **Addressed:** D-1306 `49dab44b`


- [x] `mhitu.c` mswings `pline_mon` (named from D-1291). Not wildmiss. **Addressed:** D-1305 `b82b15a8`


- [x] `objnam.c` wizterrainwish secret corridor (named from D-1290). Not door/wall. **Addressed:** D-1304 `909ef3dc`


- [x] `dothrow.c` sho_obj_return_to_u (named from D-1282). Not boomhit. **Addressed:** D-1303 `2b1a575c`


- [x] `dothrow.c` throw_gold swallow (named from D-1283). Not boomhit. **Addressed:** D-1302 `1a7839f7`


- [x] `dothrow.c` boomhit (named from D-1282). Not steed. **Addressed:** D-1301 `18fa6c89`


- [x] `trap.c` maketrap shop add_damage (named from D-1280). Not DRAWBRIDGE_UP ice. **Addressed:** D-1300 `376a5a0d`


- [x] `hack.c` swap-with-pet `seemimic` (named from D-1275). Not display_self. **Addressed:** D-1299 `eca3330c`


- [x] `uhitm.c` skipdrin / pit kick (named from D-1266). Not altwep. **Addressed:** D-1298 `086eb03d`


- [x] `dothrow.c` throwit steed potion (named from D-1283). Not slip. **Addressed:** D-1297 `6dfb7d2c`


- [x] `trap.c` maketrap DRAWBRIDGE_UP ice (named from D-1280). Not shop add_damage. **Addressed:** D-1296 `993e17ea`


- [x] `objnam.c` doname MEAT_RING (named from D-1276). Not candle. **Addressed:** D-1295 `dd02dc1b`


- [x] `hack.c` moverock next_boulder (named from D-1281). Not Blind feel. **Addressed:** D-1294 `c37bd683`


- [x] `dothrow.c` throwit stamina (named from D-1283). Not slip. **Addressed:** D-1293 `31e55930`


- [x] `dothrow.c` throwit slip (named from D-1283). Not stamina. **Addressed:** D-1292 `2e893032`


- [x] `mhitu.c` wildmiss `set_msg_xy` then `pline` (named from D-1286 / D-1261). Not `pline_mon`. Not missmu. **Addressed:** D-1291 `c6fa1420`


- [x] `objnam.c` wizterrainwish door/wall (named from D-1279). Not traps. **Addressed:** D-1290 `67c863ad`


- [x] `objnam.c` wizterrainwish traps (named from D-1279). Not door/wall. **Addressed:** D-1289 `44b22432`


- [x] `cmd.c` wiz-level `u_on_rndspot` (named from D-1278). Not sstairs. **Addressed:** D-1288 `b741fb93`


- [x] `stairs.c` `u_on_sstairs` → `u_on_rndspot` (named from D-1278). Not cmd wiz. **Addressed:** D-1287 `04b325fd`


- [x] `mhitu.c` `missmu` `pline_mon` (named from D-1261). Not wildmiss. **Addressed:** D-1286 `9486280d`


- [x] `mon.c` `meatcorpse` (named from D-1271). Not meatobj. **Addressed:** D-1285 `965d2beb`


- [x] `mon.c` `meatobj` (named from D-1271). Not meatcorpse. **Addressed:** D-1284 `433ad843`


- [x] `dothrow.c` throwit swallowit (named from D-1274). Not returning_missile. **Addressed:** D-1283 `5b4788e1`


- [x] `dothrow.c` throwit returning_missile (named from D-1274). Not swallowit. **Addressed:** D-1282 `7d61ee8b`


- [x] `hack.c` Blind unseen boulder feel (named from D-1262). Not next_boulder. **Addressed:** D-1281 `7a783c86`


- [x] `trap.c` `maketrap` PIT/HOLE `set_levltyp` (named from D-1269). Not liquid_flow. **Addressed:** D-1280 `5f8a620a`


- [x] `objnam.c` wish `switch_terrain` (named from D-1129). Not doname EGG. **Addressed:** D-1279 `12d815ca`


- [x] `dungeon.c` `u_on_rndspot` `switch_terrain` (named from D-1129). Not dothrow hurtle. **Addressed:** D-1278 `851d3e08`


- [x] `dothrow.c` `hurtle_step` `switch_terrain` (named from D-1129). Not u_on_rndspot. **Addressed:** D-1277 `20c69ccf`


- [x] `objnam.c` doname EGG (named from D-1255). Not MEAT_RING. **Addressed:** D-1276 `2860794e`


- [x] `display.c` `display_self` U_AP_TYPE glyphs (named from D-1260). Not seemimic. **Addressed:** D-1275 `18bec04d`


- [x] `dothrow.c` `toss_up` (named from D-1263). Not hold_another_object. **Addressed:** D-1274 `b166de10`


- [x] `pickup.c` highdrop `hitfloor` (named from D-1263). Not toss_up. **Addressed:** D-1273 `2a6bf680`


- [x] `invent.c` `hold_another_object` `hitfloor(FALSE)` (named from D-1263). Not pickup highdrop. **Addressed:** D-1272 `175707ca`


- [x] `monmove.c` `meatmetal` (named from D-1247). Not switch_terrain. **Addressed:** D-1271 `3925f2b3`


- [x] `hack.c` hero `test_move` `passes_bars` (named from D-1258). Not ALLOW_BARS. **Addressed:** D-1270 `a4aa34d3`


- [x] `dig.c` `digactualhole` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1269 `76f7018d`


- [x] `hack.c` `spoteffects` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1268 `26fb4aa0`


- [x] `hack.c` `set_uinwater` `switch_terrain` (named from D-1129). Not dissolve_bars. **Addressed:** D-1267 `f7676db6`


- [x] `uhitm.c` altwep / `uswapwep` (named from D-1252). Not AT_ENGL. **Addressed:** D-1266 `42d50a53`


- [x] `uhitm.c` fight_empty `explum` (named from D-1251). Not AT_ENGL. **Addressed:** D-1265 `9859426c`


- [x] `uhitm.c` AT_ENGL `gulpum` (named from D-1251). Not fight_empty. **Addressed:** D-1264 `d86fe2fe`


- [x] `do.c` hitfloor `dropz(TRUE)` (named from D-1249). Not container_impact. **Addressed:** D-1263 `6a950d81`

## 2026-08-19

- [x] `hack.c` nopick `m<dir>` over/against (named from D-1253). Not giant pickup. **Addressed:** D-1262 `72757d4c`


- [x] `mhitu.c` `hitmsg` (named from D-1240). Not remaining uhitm `pline_mon`. **Addressed:** D-1261 `8e2808ad`


- [x] `hack.c` mimic unhide (named from D-1245). Not hideunder. **Addressed:** D-1260 `8729fa24`


- [x] `hack.c` `switch_terrain` from `dissolve_bars` (named from D-1247). Not ALLOW_BARS. **Addressed:** D-1259 `78707282`


- [x] `monmove.c` ALLOW_BARS rust/corr/metallivore (named from D-1247). Not gelcube. **Addressed:** D-1258 `c63ac778`


- [x] `monmove.c` `gelcube_digests` (named from D-1246). Not `mon_yells`. **Addressed:** D-1257 `466adf3e`


- [x] `trap.c` landmine·pit mid-roll (named from D-1237). Not rolling-boulder TELEP. **Addressed:** D-1256 `03e8b10c`


- [x] `objnam.c` glob / doname CXN_ARTICLE|CXN_NOCORPSE (named from D-1234). Not unique/pname adjective. **Addressed:** D-1255 `25a81ff1`


- [x] `weapon.c` `special_dmgval` `mon_hates_silver` must match C `mondata.c` `hates_silver` (shade, S_VAMPIRE, imp except tengu, were, demon) + `is_vampshifter`, not the local M2_WERE|M2_DEMON clone. Source: reviews/loop-unattended/212-87b4705a-hmonas-at-hugs.md **Addressed:** D-1254 `fd5ebd92`


- [x] `hack.c` giant pickup/maneuver (named from D-1239). Not cannot_push. **Addressed:** D-1253 `d384e339`


- [x] `makemon.c` `demonpet` spawn (named from D-1233). Not AT_EXPL. **Addressed:** D-1252 `f7714f94`


- [x] `uhitm.c` AT_EXPL (named from D-1233). Not AT_HUGS. **Addressed:** D-1251 `e097a5df`


- [x] `uhitm.c` AT_HUGS (named from D-1233). Not remaining `pline_mon`. **Addressed:** D-1250 `87b4705a`


- [x] `hack.c` `container_impact_dmg` (named from D-1229). Not hideunder. **Addressed:** D-1249 `7f54b762`


- [x] `monmove.c` `mon_yells` (named). Not iron bars. **Addressed:** D-1248 `6e18c402`


- [x] `monmove.c` postmov iron bars (named). Not bee_eat. **Addressed:** D-1247 `4dfec66a`


- [x] `monmove.c` `bee_eat_jelly` (named). Not mind_blast. **Addressed:** D-1246 `2cce0dc8`

## 2026-08-18

- [x] `hack.c` hideunder after impact (named from D-1229). Not container_impact. **Addressed:** D-1245 `6115dc58`


- [x] `mhitm.c` gulpmm AD_DGST eat (named). Not passivemm. **Addressed:** D-1244 `293059d0`


- [x] `mhitm.c` gulpmm `!goodpos` return-home (named). Not snuff_lit. **Addressed:** D-1243 `729b03dc`


- [x] `mhitm.c` gulpmm `snuff_lit` minvent (named). Not `m_at` swap. **Addressed:** D-1242 `509b1355`


- [x] `mhitm.c` `passivemm` AD_RBRE shock `monkilled` (named). Not troll_baned. **Addressed:** D-1241 `9b5bd39d`


- [x] `uhitm.c` remaining `pline_mon` (named). Not troll_baned. **Addressed:** D-1240 `d8f28958`


- [x] `hack.c` cannot_push squeeze (named from D-1226). Not run>=2 boulder. **Addressed:** D-1239 `51a337e7`


- [x] `monmove.c` `mind_blast` (named). Not msg_mon_movement. **Addressed:** D-1238 `6d2735b0`


- [x] `teleport.c` rolling-boulder TELEP `pline_xy` (named). Not `#teleport`. **Addressed:** D-1237 `d81367e2`


- [x] `options.c` `optlist` `&a11y.mon_movement` (named). Not spot_monsters. **Addressed:** D-1236 `5c860b0e`


- [x] `options.c` `optlist` `&a11y.spot_monsters` (named). Not glyph_updates. **Addressed:** D-1235 `f631610d`


- [x] `do.c` `revive_corpse` unique/pname `corpse_xname` adjective (named). Not Soundeffect. **Addressed:** D-1234 `e0ea385e`


- [x] `uhitm.c` `hmonas` `troll_baned` `mkcorpstat_norevive` (named). Not hmon_hitmon. **Addressed:** D-1233 `976094e5`


- [x] `uhitm.c` `hmon_hitmon` `troll_baned` around `killed` (named). Not hmonas. **Addressed:** D-1232 `83624a46`


- [x] `mhitm.c` gulpmm `m_at` swap (named). Not passivemm. **Addressed:** D-1231 `5cd4ab5c`


- [x] `teleport.c` `#teleport` `doextcmd` (named from D-1209). Not energy-spellcast. **Addressed:** D-1230 `a3c04dd7`


- [x] `hack.c` `impact_disturbs_zombies` (named from D-1214). Not hideunder. **Addressed:** D-1229 `0ddfb189`


- [x] `hack.c` `msg_mon_movement` (named). Not pline_mon. **Addressed:** D-1228 `23f3f19e`


- [x] remaining `pline.c` `pline_mon` callers (named). Not msg_mon_movement. **Addressed:** D-1227 `1da251ee`


- [x] `hack.c` run>=2 boulder `pline_dir` (named). Not mention_walls. **Addressed:** D-1226 `7998cb1e`


- [x] `spell.c` energy/`spelleffects` teleport (named from D-1209). Not `#teleport` doextcmd. **Addressed:** D-1225 `89588300`


- [x] `teleport.c` LEVEL_TELEP `y_n` (named from D-1209). Not energy-spellcast. **Addressed:** D-1224 `790ca8b7`


- [x] `mhitm.c` `troll_baned` `mkcorpstat_norevive` (named). Not gulpmm. **Addressed:** D-1223 `d4f9b432`


- [x] `do.c` `revive_corpse` `Soundeffect` se_scratching (named). Not BURIED pit. **Addressed:** D-1222 `7b0f9da7`


- [x] `display.c` `show_glyph` / JS `gbuf_show_kind`: do not re-call `mon_glyph`/`obj_glyph` (Hallu `rn2_on_display_rng`) on every `show_glyph_cell`. C classifies the already-chosen glyph. Keep mention_map addr. seed0383. Source: reviews/loop-unattended/181-925e5b77-show-glyph-glyph-updates.md **Addressed:** D-1221 `c7071a4a`


- [x] `do.c` `revive_corpse` BURIED `!is_zomb` FALLTHROUGH `impossible` (named). Not Soundeffect. **Addressed:** D-1220 `b09b013d`


- [x] `display.c` `show_glyph_change` glyph_updates (named). Not opt_accessiblemsg. **Addressed:** D-1219 `925e5b77`


- [x] `options.c` `opt_accessiblemsg` wire `a11y.accessiblemsg` (named). Not dolookaround. **Addressed:** D-1218 `b59f294b`


- [x] `cmd.c` `dolookaround` (named). Not glyph_updates. **Addressed:** D-1217 `dc34d705`


- [x] `pline.c` `set_msg_dir` (named). Not pline_xy. **Addressed:** D-1216 `517cb217`


- [x] `pline.c` `pline_xy`/`pline_mon` (named). Not set_msg_dir. **Addressed:** D-1215 `eaf10f2d`


- [x] `hack.c` `disturb_buried_zombies` (named). Not zombify_mon. **Addressed:** D-1214 `b44c4847`


- [x] `dig.c` `rot_corpse` invent/minvent worn plines (named). Not REVIVE. **Addressed:** D-1213 `c85424f4`


- [x] `do.c` `revive_corpse` OBJ_MINVENT / OBJ_CONTAINED (named). Not BURIED. **Addressed:** D-1212 `fc314871`


- [x] `mhitm.c` `gz.zombify` at monkilled (named). Not make_corpse. **Addressed:** D-1211 `481e005b`


- [x] `mon.c` `zombie_maker` + `gz.zombify` at `make_corpse` (named). Not mhitm. **Addressed:** D-1210 `f1a3518a`


- [x] `teleport.c` `dotelecmd` m-prefix mode menu (named). Not energy gate. **Addressed:** D-1209 `b3c0d228`


- [x] `teleport.c` `dotele` trap-at-feet teledest (named). Not vault_tele. **Addressed:** D-1208 `bd8c2161`


- [x] `pline.c` `vpline` accessiblemsg consume (named). Not set_msg_xy. **Addressed:** D-1207 `08d2e6b0`


- [x] `teleport.c` `scrolltele` steed whobuf (named). Not unconscious. **Addressed:** D-1206 `319bf51c`


- [x] `teleport.c` `scrolltele` unconscious (named). Not Override yn. **Addressed:** D-1205 `f389c2b4`


- [x] `eat.c` `eatspecial` (named). Not doeat_nonfood. **Addressed:** D-1204 `dbd3a08b`


- [x] `cmd.c` `wiz_level_change` (named). Not notice_mon_off. **Addressed:** D-1203 `a16884ab`


- [x] `timeout.c` REVIVE/ZOMBIFY (named). Not run_timers. **Addressed:** D-1202 `dfed1743`


- [x] `artifact.c` `init_artifacts` (named). Not wizkit. **Addressed:** D-1201 `4ffc2264`


- [x] `allmain.c` `newgame` `notice_mon_off` (named). Not wizkit. **Addressed:** D-1200 `15cb4a37`


- [x] `dog.c` `mon_arrive` `my=xyflags` before rloc (named). Not migrate bit. **Addressed:** D-1199 `4dc76022`


- [x] `dog.c` `migrate_to_level` `In_W_tower` xyflags bit 2 (named). Not mon_arrive. **Addressed:** D-1198 `2f8f7d9f`


- [x] `teleport.c` `scrolltele` W-tower Override yn (named). Not make_blinded. **Addressed:** D-1197 `7deb2670`

## 2026-08-17

- [x] `teleport.c` `rloc_to_core` `set_msg_xy` (named). Not makeknown. **Addressed:** D-1196 `d0cbc6e3`


- [x] `teleport.c` `rloc_to_core` wand `makeknown` (named). Not ustuck-together. **Addressed:** D-1195 `143f9a46`


- [x] `do.c` `goto_level` `notice_mon_off` (named). Not docrt. **Addressed:** D-1194 `c4c57ac1`


- [x] `dokick.c` `deliver_obj_to_mon` (named). Not obj_delivery. **Addressed:** D-1193 `2d2e68c7`


- [x] `allmain.c` `newgame` wizkit `obj_delivery(FALSE)` (named). Not goto_level. **Addressed:** D-1192 `cf9eb066`


- [x] `do.c` `goto_level` `run_timers` (named). Not kill_genocided. **Addressed:** D-1191 `cc7d0ef5`


- [x] `do.c` `goto_level` `kill_genocided_monsters` (named). Not run_timers. **Addressed:** D-1190 `9a2cbc27`


- [x] Human canary seed8243: `cmd.c` rhack `Unknown command` `visctrl(key)` so Ctrl-C is `^C` not raw ETX. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1189 `15dddffe`


- [x] Human canary seed8243: `teleport.c` `domagicportal` `"You activated a magic portal!"` / tutorial ATSTAIRS stunmsg. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1188 `c58efd08`


- [x] Human canary seed8243: `hack.c` `avoid_trap_andor_region` ParanoidTrap `"Really step into that magic portal?"` yn. Not maybe_smudge_engr. Not kill_genocided. **Addressed:** D-1187 `77ead396`


- [x] Human canary seed8243: `cmd.c` `g` rush prefix (until something interesting) vs JS Unknown command. Not maybe_smudge_engr. Not offx. **Addressed:** D-1186 `4dd396cc`


- [x] Human canary (no review stamp): `private-sessions/seed8243-samurai-tutorial.session.json`. Chargen `\e[72C` was truncated capture; local C H2344 `\e[40C` already matched JS (do not revert D-0078). First real miss: `do_wear.c` `doddoremarm` `A` empty-worn. **Addressed:** D-1185 `4750946a`


- [x] `teleport.c` `scrolltele` make_blinded (named). Not W-tower amulet. **Addressed:** D-1184 `1b94d8d3`


- [x] `teleport.c` `rloc_to_core` ustuck-together pline (named). Not telemsg. **Addressed:** D-1183 `d2512b22`


- [x] `teleport.c` `rloc_pos_ok` mx==0 updest/dndest (named). Not room lock. **Addressed:** D-1182 `01c8c41f`


- [x] `teleport.c` `rloc` `RLOC_ERR` impossible() (named). Not vanish-msg. **Addressed:** D-1181 `0b488053`


- [x] `teleport.c` `rloc_to_core` telemsg vanishes-and-reappears (named). Not RLOC_ERR. **Addressed:** D-1180 `665bbe09`


- [x] `do.c` `goto_level` `do_fall_dmg` (named). Not fix_shop_damage. **Addressed:** D-1179 `5f08f9e5`


- [x] `do.c` `goto_level` `fix_shop_damage` (named). Not obj_delivery. **Addressed:** D-1178 `4a700d08`


- [x] `do.c` `goto_level` `obj_delivery` (named). Not in_out_region. **Addressed:** D-1177 `36e0ce72`


- [x] `dothrow.c` `mhurtle_step` `m_in_out_region` (named). Not hurtle_step. **Addressed:** D-1176 `b652fbf3`


- [x] `allmain.c` `m_everyturn_effect` youmonst (named). Not m_postmove_effect. **Addressed:** D-1175 `7188da5b`


- [x] `mhitm.c` `mdisplacem` `update_monster_region` (named). Not rloc_to. **Addressed:** D-1174 `e5ec6685`


- [x] `mon.c` `mnexto` `control_mon_tele` (named). Not rloc. **Addressed:** D-1173 `e07eeae7`


- [x] `teleport.c` `rloc` steed `tele()` (named). Not Wizard stair. **Addressed:** D-1172 `e7c5c8ac`


- [x] `teleport.c` `rloc_pos_ok` isshk/ispriest room lock (named). Not make_angry_shk. **Addressed:** D-1171 `822498d3`


- [x] `teleport.c` `rloc_to` occupation `dochugw` (named). Not mintrap. **Addressed:** D-1170 `5a6be1fe`


- [x] `region.c` `run_regions` `hero_inside` bit (named). Not walk caller. **Addressed:** D-1169 `0f1ce7c6`


- [x] `allmain.c` `moveloop` `fumaroles` (named). Not mklev. **Addressed:** D-1168 `0ff54fb4`


- [x] `hack.c` `m_postmove_effect` youmonst (named). Not in_out_region. **Addressed:** D-1167 `d6ba6ede`


- [x] `do.c` `goto_level` `in_out_region` (named). Not walk. **Addressed:** D-1166 `0cb3acbe`


- [x] `dothrow.c` `hurtle_step` `in_out_region` (named). Not walk. **Addressed:** D-1165 `6d44ab7f`


- [x] `teleport.c` `rloc_to` trapped `mintrap` (named). Not occupation. **Addressed:** D-1164 `6f7e188b`


- [x] `teleport.c` `rloc_to` minvent shop bill (named). Not shk-home. **Addressed:** D-1163 `d24ff150`


- [x] `teleport.c` `rloc_to` shk `make_angry_shk` (named). Not vanish-msg. **Addressed:** D-1162 `38353d8a`


- [x] `teleport.c` `rloc_to` `update_monster_region` (named). Not set_apparxy. **Addressed:** D-1161 `4dfadf3a`


- [x] `teleport.c` `rloc_to` `set_apparxy` (named). Not vanish-msg. **Addressed:** D-1160 `8efa62e9`


- [x] `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath (named). Not inside_f. **Addressed:** D-1159 `e42ace32`


- [x] `region.c` `create_gas_cloud_selection` (named). Not BFS create. **Addressed:** D-1158 `7cc347fc`


- [x] `hack.c` walk `in_out_region` (named). Not teleds. **Addressed:** D-1157 `ed28eef1`


- [x] `mklev.c` `fumaroles` `clear_heros_fault` / Norep whoosh (named). Not expire dissipation. **Addressed:** D-1156 `16e8d88b`


- [x] `region.c` `expire_gas_cloud` dissipation plines (named). Not inside_gas HP. **Addressed:** D-1155 `df99ab32`


- [x] `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from invocation_pos). Not teleds. **Addressed:** D-1154 `10904562`


- [x] `teleport.c` `vault_tele` `tele()` fallback (named). Not teleds. **Addressed:** D-1153 `b332516f`


- [x] `teleport.c` `rloc_to` `maybe_unhide_at` (named). Not vanish-msg. **Addressed:** D-1152 `9b5ce7b3`


- [x] `hack.c` `classify_terrain` (named from switch_terrain). Not invocation. **Addressed:** D-1151 `6bdf4d49`


- [x] `hack.c` `domove` `invocation_message` (named). Not teleds. **Addressed:** D-1150 `505df513`


- [x] `mon.c` `mongone` `mdrop_special_objs` then discard (elemental_clog victim). Not worn extract. Source: reviews/loop-unattended/109-27274b3b-overcrowding.md **Addressed:** D-1149 `cdaccd3a`


- [x] `fountain.c` `gush` `deal_with_overcrowding` (named). Not lava xkilled. **Addressed:** D-1148 `27274b3b`


- [x] `do_name.c` `rndcolor` (named from hcolor). Not sit/apply identity stubs. **Addressed:** D-1147 `5c43dbc9`


- [x] `region.c` `inside_gas_cloud` damage (named). Not enveloped pline. **Addressed:** D-1146 `fe5cefad`


- [x] `fountain.c` Excalibur `:441` `update_inventory` (named). Not artidisco save. **Addressed:** D-1145 `623bc861`


- [x] `potion.c` `djinni_from_bottle` `mongrantswish` (named). Not bottle chance RNG. **Addressed:** D-1144 `1c1f7ccb`


- [x] `region.c` `in_out_region` enter_msg / leave_msg (named). Not update_player_regions. **Addressed:** D-1143 `bb8585ec`


- [x] `teleport.c` `teleds` `notice_mon_off` / `notice_all_mons` (named). Not invocation. **Addressed:** D-1142 `52194cc9`


- [x] `teleport.c` `teleds` `invocation_message` (named). Not vault_guard. **Addressed:** D-1141 `4d71520e`


- [x] `teleport.c` `teleds` `vault_guard` `uleftvault` (named). Not swallow docrt. **Addressed:** D-1140 `36fb8797`


- [x] `teleport.c` `teleds` swallow `docrt` (named). Not hideunder. **Addressed:** D-1139 `4071a74d`


- [x] `fountain.c` `gush` lava `fire_damage_chain` / `xkilled` (named). Not minliquid. **Addressed:** D-1138 `068e78df`


- [x] `region.c` `make_gas_cloud` enveloped pline (named). Not create_gas_cloud size-1. **Addressed:** D-1137 `50136436`


- [x] `fountain.c` `mongrantswish` `tmp_at` glyph hide (named). Not dowaterdemon makemon. **Addressed:** D-1136 `52aea3d1`


- [x] `do_name.c` `hcolor` Hallucination drinksink synonyms (named). Not hliquid. **Addressed:** D-1135 `b166bda5`


- [x] `fountain.c` `dipfountain` `update_inventory` after switch (named). Not Excalibur gift. **Addressed:** D-1134 `5f55ceba`


- [x] `teleport.c` `tele()` / trap teledest (named). Not tele_trap wrenching. **Addressed:** D-1133 `a956e990`


- [x] `teleport.c` `teleds` `buried_ball_to_punishment` (named). Not Punished ball. **Addressed:** D-1132 `a8d04dd2`


- [x] `teleport.c` `teleds` `hideunder` / mimic (named). Not swallow docrt. **Addressed:** D-1131 `00956ae8`


- [x] `teleport.c` `teleds` `update_player_regions` (named). Not teleok in_out_region. **Addressed:** D-1130 `6dd7a794`


- [x] `teleport.c` `teleds` `switch_terrain` (named). Not fill_pit. **Addressed:** D-1129 `410f22a2`


- [x] `potion.c` pool dip yn (named from dipsink). Not drinkfountain. **Addressed:** D-1128 `5b3923d7`


- [x] `eat.c` `vomit` cantvomit/Sick/acid poly arms (named from drinkfountain). Not dryup. **Addressed:** D-1127 `b4954c6f`


- [x] `fountain.c` `drinkfountain` case 24 `update_inventory` (named). Not enlightenment. **Addressed:** D-1126 `6497347e`


- [x] `fountain.c` `dowatersnakes` Hallucination `rndmonnam` (named). Not gush. **Addressed:** D-1125 `2fc408c0`

## 2026-08-16

- [x] `fountain.c` `drinksink` case 13 `create_gas_cloud` (named). Not polyself. **Addressed:** D-1124 `3b7606b3`


- [x] `teleport.c` `rloc_to` worm / ustuck-swallow `docrt` (named). Not newsym. **Addressed:** D-1123 `a55c4b24`


- [x] `teleport.c` `rloc` Wizard stair / `mon_telecontrol` (named). Not RLOC_MSG. **Addressed:** D-1122 `5a2f96ca`


- [x] `teleport.c` `teleds` `fill_pit` (named). Not Punished ball. **Addressed:** D-1121 `803a7f5c`


- [x] `teleport.c` `tele_trap` Antimagic wrenching pline (named). Not vault_tele. **Addressed:** D-1120 `acfb0167`


- [x] `teleport.c` `teleok` `tele_jump_ok` / `in_out_region` (named). Not vibrating. **Addressed:** D-1119 `26560ccf`


- [x] `fountain.c` `drinksink` case 10 `polyself` (named). Not dipsink. **Addressed:** D-1118 `8a01c200`


- [x] `fountain.c` `gush` `minliquid` body (named). Not dogushforth. **Addressed:** D-1117 `afb86487`


- [x] `fountain.c` `drinkfountain` enlightenment body (named). Not dryup. **Addressed:** D-1116 `19e4be31`


- [x] `fountain.c` `dipfountain` case 29 `mkgold` coins (named). Not wash_hands. **Addressed:** D-1115 `79438232`


- [x] `fountain.c` `dipfountain` cases 17–20 uncurse (named). Not Excalibur. **Addressed:** D-1114 `e30a51f2`


- [x] `fountain.c` `dipsink` (named). Not wash_hands. **Addressed:** D-1113 `c67f09d1`


- [x] `teleport.c` `mlevel_tele_trap` MAGIC_PORTAL / LEVEL_TELEP / NO_TRAP arms (named). Not hole path. **Addressed:** D-1112 `bb552fba`


- [x] `teleport.c` `teleok` vibrating / pit-fly (named). Not `rloc`. **Addressed:** D-1111 `b0847b88`


- [x] `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (named). Not `goodpos_onscary`. **Addressed:** D-1110 `fd738eab`


- [x] `sp_lev.c` `lspo_exclusion` populate `exclusion_zones` from `des.exclusion` (named). Not `goodpos`. **Addressed:** D-1109 `5bf81ca7`


- [x] `fountain.c` `wash_hands` (named). Not Excalibur. **Addressed:** D-1108 `62b93acb`


- [x] `fountain.c` `dipfountain` Excalibur LONG_SWORD body (named). Not wash_hands. **Addressed:** D-1107 `0633a261`


- [x] `fountain.c` `dryup` cansee cloud-glyph skip of dryup pline (named). Not angry_guards. **Addressed:** D-1106 `127c045c`


- [x] `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Not dryup yn. **Addressed:** D-1105 `b4930cb9`


- [x] `fountain.c` `dryup` `angry_guards` after real dryup (named). Not wizard yn. **Addressed:** D-1104 `7458a5b8`


- [x] `dbridge.c` `db_under_typ` / `hack.c` `waterbody_name` SURFACE_AT (named from D-1077 review 38). Not `goodpos`. **Addressed:** D-1103 `130e7e21`


- [x] `teleport.c` `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`. **Addressed:** D-1102 `ebe1f041`


- [x] `teleport.c` `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone` (named). Not `onscary`. **Addressed:** D-1101 `a7302142`


- [x] `teleport.c` `goodpos` `passes_walls` + `may_passwall` early-out (named). Not youmonst swim. **Addressed:** D-1100 `305ad188`


- [x] `teleport.c` `goodpos` youmonst Swimming/Amphibious/Levitation/Flying/Wwalking pool and lava arms (named). Not `passes_walls`. **Addressed:** D-1099 `a6934a3d`


- [x] `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs. **Addressed:** D-1098 `cdb72162`


- [x] `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE. **Addressed:** D-1097 `d1e7ae23`


- [x] `fountain.c` `dryup` wizard yn (named). Not angry_guards. **Addressed:** D-1096 `bd16c130`


- [x] `potion.c` `split_mon` trap rust / `minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit clone_mon. **Addressed:** D-1095 `a86a7111`


- [x] `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace. **Addressed:** D-1094 `46775b20`


- [x] `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (named from D-1053 review 14). **Addressed:** D-1093 `e0b68f1d`


- [x] `makemon.c` S_ORC / S_ELF / unicorn mlet peace override after `m_initweap` (named omit on makemon row). **Addressed:** D-1092 `c3f28bfd`


- [x] `teleport.c` `goodpos` must call `is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros (named from D-1077 review 38). **Addressed:** D-1091 `278521f1`


- [x] `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`. **Addressed:** D-1090 `43caa8ff`


- [x] `sit.c` `rndcurse` `Antimagic()` must be C `youprop.h` Antimagic ≡ `uprops[ANTIMAGIC]` intrinsic||extrinsic (invent.js `hero_Antimagic` shape), not `HAntimagic`/`EAntimagic` flats that `confer_oc_oprop` never writes. Worn `CLOAK_OF_MAGIC_RESISTANCE` / gray DSM must `shieldeff` and use the reduced `rnd(6/(Antimagic+Half+1))` count. Do not rewrite `confer_oc_oprop`. Not `update_inventory` / hcolor. Not `is_pool`. Source: reviews/loop-unattended/48-d5038ac7-rndcurse-shieldeff.md **Addressed:** D-1089 `f91650c0`


- [x] `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not peace_minded. **Addressed:** D-1088 `049af16e`


- [x] `sit.c` `rndcurse` `shieldeff` (named omit). Not update_inventory / hcolor. **Addressed:** D-1087 `d5038ac7`


- [x] `steal.c` `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit take_gold D-1049). **Addressed:** D-1086 `89a97acc`


- [x] `engrave.c` `can_reach_floor` `Flying()` must be C `youprop.h` Flying via `uprops[FLYING]` (intrinsic||extrinsic||steed `is_flyer`)&&!blocked, not `HFlying`/`EFlying` flats that `confer_oc_oprop` never writes. Worn `AMULET_OF_FLYING` must skip `check_pit`. Copy `eat.js` `Flying()` shape. Do not rewrite `confer_oc_oprop`. Not steal.c `remove_worn_item`. Source: reviews/loop-unattended/43-453e759c-can-reach-floor-ceiling-hider.md **Addressed:** D-1085 `3e1a74e8`


- [x] `sit.c` `throne_sit_effect` wizard getlin "Throne sit effect (1..13)" (named). Not Analyze y_n. **Addressed:** D-1084 `83a3ada5`


- [x] `engrave.c` `can_reach_floor(check_pit)` teeter/shaft (named from D-1073). Not ceiling_hider. **Addressed:** D-1083 `e6167027`


- [x] `engrave.c` `can_reach_floor` ceiling_hider / MZ_HUGE (named from D-1069/D-1071). Not check_pit. **Addressed:** D-1082 `453e759c`


- [x] `eat.c` `cprefx` `revive_corpse` after rider lifesave (debt.md). **Addressed:** D-1081 `cd5af20a`


- [x] `shk.c` `u_entered_shop` deserted / angry / Invis / pickaxe doorway (named D-0307). **Addressed:** D-1080 `0a4a5df3`


- [x] `makemon.c` `peace_minded` / `set_malign` read `ptr.msound` (`msounds[]` exists, D-1053). **Addressed:** D-1079 `d7d679c1`


- [x] `sit.c` `split_mon` monster `clone_mon` arm (JS named omit). **Addressed:** D-1078 `c7dcd80a`


- [x] `hack.c` `is_lava` includes DRAWBRIDGE_UP + `DB_LAVA` (named from D-1060). **Addressed:** D-1077 `a9e819a4`


- [x] `trap.c` hero pit/hole bodies under `dotrap` `VIASITTING` (named omit from D-1039). **Addressed:** D-1076 `87b4b7cb`


- [x] `sit.c` `dosit` `lay_an_egg` at end of function. Not hider / reach / ustuck. **Addressed:** D-1075 `f21410e1`


- [x] `sit.c` `dosit` dragon coin hoard: `money_cnt(invent)` meager vs `ulevel * 1000` (JS always bare “hoard”). **Addressed:** D-1074 `962e07a9`


- [x] `sit.c` `dosit` OBJ_AT gate: skip picnic when `uteetering_at_seen_pit` or `uescaped_shaft` like C. **Addressed:** D-1073 `1f21183f`


- [x] `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`). Not swallow combat. **Addressed:** D-1072 `55906000`


- [x] `engrave.c` `can_reach_floor` ustuck AT_HUGS + `!sticks` (`mondata.c` `sticks`). Makes dosit sit-on-air reachable; ship before ustuck lap. Not ceiling_hider / MZ_HUGE. **Addressed:** D-1071 `aa96e08c`


- [x] `engrave.c` `can_reach_floor` Levitation + `sit.js` `dosit` message `Levitation()` must be C `youprop.h` `(HLevitation||ELevitation)&&!BLevitation`, not sticky `u.Levitation` only. Worn boots / potion `#sit` must tumble. Do not pull hugs / ceiling_hider / MZ_HUGE. Source: reviews/loop-unattended/30-872d1d93-dosit-can-reach-floor.md **Addressed:** D-1070 `9d3545c9`


- [x] `sit.c` `dosit` `can_reach_floor(FALSE)`: swallow “no seats” / Levitation tumble / sitting on air. Replace JS Levitation-only early return. **Addressed:** D-1069 `872d1d93`


- [x] `sit.c` `dosit` hider: `u.uundetected && is_hider` except trapper clears ceiling hide. Not `can_reach_floor` / ustuck. **Addressed:** D-1068 `990b06a8`


- [x] `dosit` steed message: C `mon_nam(usteed)`, not `"your steed"`. Source: D-1033 risk 4 (named, not a Must-fix). **Addressed:** D-1067 `2e50b318`


- [x] tut-1 nhcore callback disable on enter/leave. **Addressed:** D-1066 `7e330128`


- [x] tut-1 `tut_key` / eckey only. **Addressed:** D-1065 `296bc792`


- [x] tut-1 `place_lregion` only. **Addressed:** D-1064 `dc354c44`


- [x] tut-1 food objects only. **Addressed:** D-1063 `3f376b74`


- [x] tut-1 large-box contents only. **Addressed:** D-1062 `3ca1b544`


- [x] tut-1 stairs only. **Addressed:** D-1061 `05915d9b`


- [x] `dosit` lava/ice sit Fire_resistance/Cold_resistance must read C `youprop.h` (`u.uprops[FIRE_RES]`/`[COLD_RES]` intrinsic||extrinsic). `sit.js` clones H||E flats; `confer_oc_oprop` writes FIRE_RES/COLD_RES only to uprops (`EFire`/`ECold` unmirrored). Worn fire-resistance ring must take `d(2,10)` not `d(10,10)`. Do not rewrite `confer_oc_oprop` this iter; do not pull DRAWBRIDGE_UP+DB_LAVA `is_lava`. Source: reviews/loop-unattended/19-27f0a233-dosit-lava-ice.md **Addressed:** D-1060 `ecd37108`


- [x] tut-1 `des` kelp only. Not stairs / box / key / `place_lregion`. **Addressed:** D-1059 `c0d5279a`


- [x] `sit.c` `dosit` lava / ice / drawbridge sit (terrain, not trap-lava already in D-1039). **Addressed:** D-1058 `27f0a233`


- [x] `sit.c` `dosit` sink / altar / grave / stairs / ladder sit messages only. **Addressed:** D-1057 `e1852e71`


- [x] `dosit` water predicates must use C `Underwater` (`u.uinwater`, `youprop.h:279`), not the unset `u.Underwater` alias. Early pool `goto in_water` and muddy/cushions both read the dead field. Source: reviews/loop-unattended/16-e13735f8-dosit-in-water.md **Addressed:** D-1056 `2e79451d`


- [x] `sit.c` `dosit` water / pool / gremlin sit (after trap, before sink). Not the furniture list. **Addressed:** D-1055 `e13735f8`


- [x] `get_obj_location` flags: JS `0` must not accept CONTAINED when C hatch passes `0`. Source: D-1036 risk 4. **Addressed:** D-1054 `3f8469fe`


- [x] `cry_sound`: monster `msound` must be C `monflag.h` numbers, not empty → always-chitter. Source: `reviews/loop-2026-08-15/D-1036-2ae43a8b-hatch-egg.md` risk 3. **Addressed:** D-1053 `178d60f2`
- [x] Cursed-lamp `make_glib`: JS `(u.Glib|0)&TIMEOUT` must match C `HGlib|EGlib` timeout. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` `use_lamp` gap. **Addressed:** D-1052 `1710bd41`
- [x] `u_wipe_engr` / `tmp_at` no-ops in apply: wire or stop calling them as if they were C. Source: D-1022 risk 7. **Addressed:** D-1051 `7e389050`
- [x] `pickup_object` honors `telekinesis` like C (whip/grapple pull-in). Source: D-1022 risk 6. **Addressed:** D-1050 `4e55ff2f`

## 2026-08-15

- [x] `take_gold` must `remove_worn_item` like C `sit.c`. Source: `reviews/loop-2026-08-15/D-1034-63e86f5a-ordinary-throne.md` risk 3. **Addressed:** D-1049 `9e24f61a`


- [x] Vlad special case 10: C sets `HConfusion` only; JS must not also force flat `u.Confusion`. Source: `reviews/loop-2026-08-15/D-1033-a59caac8-vlad-throne.md` risk 2. **Addressed:** D-1048 `e395bb74`


- [x] `consume_obj_charge` unpaid/shop path (not `spe--` only). Source: D-1023 risk 3. **Addressed:** D-1047 `2ca2ccd7`


- [x] `light_cocktail` must take/update `struct obj **` like C `apply.c` `light_cocktail`. Source: `reviews/loop-2026-08-15/D-1023-aaac3f9d-lamp-trap-bot.md` risk 4. **Addressed:** D-1046 `3371ddf0`


- [x] Whip/pole/grapple names: real `yname` / `Amonnam` / `mbodypart` (not local apply clones). Source: D-1022 risk 5. **Addressed:** D-1045 `e8884a53`.


- [x] `special_obj_hits_leader` must use C `is_quest_artifact` (`urole.questarti`), not `u.questarti`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1044 `d9febc3c`.

- [x] `find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding like C `worn.c` (thitmonst tmp). Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1042 `19e907f5`.
- [x] `should_mulch_missile` hero blessed save must be `rnl(4)` not `rn2(4)` like C `dothrow.c`. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`. **Addressed:** D-1043 `d3fac215`.
- [x] Pole targeting: `glyph_is_poleable_at` / `find_poleable_mon` must follow C `apply.c` `use_pole` (live `m_at` / map, not a glyph-only stand-in). Source: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` risk 3. **Addressed:** D-1040 `12458fe9`.
- [x] Pole `thitmonst` hit-vs-miss envelope for `use_pole` (combat RNG). Source: D-1022 risk 4. **Addressed:** D-1041 `eb3469ae`.
