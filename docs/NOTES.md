# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2120** at `0c720b98`). Save-oracle
  required for tagged restore Open. Private B0: trap-same-floor 17/17;
  ledger 26/26; wait-save catchup 30/30; catchup-after-restore 26/30
  red; trap-ledger 38/38; shop template 35/35 (no unpaid). Reviews
  **669–677** ACCEPT-WITH-DEBT (no Must-fix). **Next:** Open `sp_lev.c`
  lspo_object non-merge quan repeat (named). Not oc_merge.
  Do not skip D-1531…D-1722. Do not re-port D-1675…D-1722.
  Falsify: `lspo_object` non-merge quan repeat, not `oc_merge`.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; setworn oc_oprop; keepdogs/grow_up leash;
  light-scroll `initedog`; tip-spill/squeaky; hideunder;
  display_monster furniture lastseentyp; guardian remaps; Punished
  float_down; water/lava steed; uhitm `u.dx`; map_menu_cmd;
  `context.novel`; walk-key / PREFIXCMD overlay;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; array rn2
  / pauper_legacy / killed_nemesis; spell dull / zap rider eyecount;
  perm_invent can_set; polyself `uskin=`; steal/muse
  `unknow_object`; Hallu `obj_to_glyph` query; invent.c `useupall` /
  `obfree`; `yn_function_menu` (`query_menu`); getdir CQ_REPEAT /
  mouse getpos / help_dir in shared / dxdy_moveok;
  sokosolved/roguelevel/quest recalc flags;
  `hhmmss`;
  lspo_object non-merge quan repeat; `is_multigen`/`is_poisonable`;
  choose_stairs / `u_left_shop` leave verbalize; `end.c`
  `artifact_score`; gen_spe/gift_value; doprgold `hidden_gold`;
  `costly_gold`; `free_luathemes`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1722.
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
  nhcore (D-1066). Do not skip D-1067…D-1722 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1722. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua `lspo_reset_level`.
  JSON `cant_go_back` analogue is D-1722. JSON `restore_artifacts` is
  D-1698. Default `spot_monsters` Off.
  Do not keep timeout.c `mon_is_local` for LS_MONSTER lights (D-1708).
  Do not stamp every `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1722 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1722 (index). D-1722 `cant_go_back` is FREEING vs
  WRITING|FREEING JSON analogue (`delete_levelfile` stash drop;
  `remdun_mapseen`; `discard_migrations`; not binary NHFILE). D-1721
  `getdir` is
  `yn_function(query, null, '\0', false)` then
  `clear_nhwindow_message` (lock.js + throw/zap/dig clones; no
  trailing confdir). D-1720 `currency` is Hallu
  `ROLL_FROM(currencies[])` else zorkmid; `xprname`/wallet/dokick
  clones retired; shk_names_obj fmt stays C `zorkmid%s`. D-1719
  `arti_cost` is `artilist.cost` else `100*oc_cost`; getprice `/4`
  when shk_buying; get_cost shop `*4` stays. D-1718 glass `get_cost`
  is `ubirthday` `% otyp` then `FIRST_GLASS_GEM` color table (not
  tmp=5); identified still 5. D-1717 `remote_burglary` is `rob_shop`
  + `call_kops(FALSE)` after `pick_obj` addinv; choose_stairs named
  (`sx,sy` 0). D-1716 mute/Deaf nod is `hero_deaf`/`muteshk` else
  `Shknam` nods.

## Landmarks (≤15)

- D-1722: `do.c` `goto_level` `:1640–1664` `cant_go_back` FREEING vs
  WRITING|FREEING. Live `js/do.js` + `js/files.js` `delete_levelfile` +
  `js/dungeon.js` `remdun_mapseen` + `js/dog.js` `discard_migrations`.
  Named: `free_luathemes`; full migrating `obfree`.
- D-1721: `cmd.c` `getdir` `:3987–4011` yn_function NULL/`'\0'`/FALSE
  then `clear_nhwindow(WIN_MESSAGE)`. Live `js/lock.js` +
  `getdir_cmdassist` / `getdir_zap` / `dig_getdir`. Named: CQ_REPEAT;
  mouse getpos; help_dir in shared; dxdy_moveok; `yn_function_menu`.
- D-1720: `invent.c` `currency` `:1545–1554` + `currencies[]`
  `:1521–1543` Hallu `ROLL_FROM`. Live `js/invent.js` + `xprname` +
  dokick/dig/lock/trap. Named: `artifact_score`; hidden_gold.
- D-1719: `artifact.c` `arti_cost` `:2308–2317` + `getprice`
  `:4324–4327`; extractor A() cost. Live `js/artifact.js` +
  `js/shk.js`. Named: `artifact_score`.
- D-1718: `shk.c` `get_cost` `:2897–2941` glass GEM+GLASS
  `ubirthday` color table. Live `js/shk.js`.
- D-1717: `shk.c` `remote_burglary` `:664–682` + `rob_shop` +
  `call_kops`/`makekops` + `addupbill`/`clear_unpaid`. Live
  `js/shk.js` + `js/pickup.js`. Named: choose_stairs.
- D-1716: `shk.c` `dopay` `:2011–2025` mute/Deaf nod + `paid`
  `update_inventory`. Live `js/shk.js` `hero_deaf`/`muteshk`.
  Named: SetVoice.
- D-1715: `shk.c` `pay_billed_items` `:2082–2109` Traditional ynq
  + `menu_requested` toggle; `dopayobj` `:2259–2275` y_n Pay?
  `upstart(doname)`. Live `js/shk.js`.
- D-1714: `shk.c` FullyUsedUp/PartlyUsedUp `make_itemized_bill`
  `:1543–1663` + `add_to_billobjs` `:3365–3383`; dummy/residual
  `OBJ_ONBILL`. Live `js/shk.js` + `js/mkobj.js`.
- D-1713: `o_init.c` `observe_object` `:441–451` FIRST_OBJECT +
  `!Hallucination()`; live `js/invent.js`. Named: useupall/obfree.
- D-1712: objects.h BITS `oc_merge`; extractor + `oc_merge_of`;
  `clear_dknown` / wish quan / create_object. Named: lspo_object
  non-merge repeat; `is_multigen`/`is_poisonable`.
- D-1711: `update_lastseentyp` DRAWBRIDGE_UP `db_under_typ` +
  furniture-mimic `cmap_to_type`. Named: display_monster lastseentyp.
- D-1710: `yyyymmddhhmmss` cemetery `when[]`. Named: `hhmmss`.
- D-1709: `update_mlstmv` `iter_mons` skip DEADMONSTER/`mon_offmap`.
  cant_go_back FREEING is D-1722.
- D-1708: LS_MONSTER `mx > 0` (`light_is_local`); timeout
  `mon_is_local` stays for timers/LS_OBJECT.
