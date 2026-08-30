# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2120** at `0c720b98`). Save-oracle
  required for tagged restore Open. Private B0: trap-same-floor 17/17;
  ledger 26/26; wait-save catchup 30/30; catchup-after-restore 26/30
  red; trap-ledger 38/38; shop template 35/35 (no unpaid). Reviews
  **669–677** ACCEPT-WITH-DEBT (no Must-fix). **Next:** Open `shk.c`
  Hallu currency ROLL_FROM (named). Not arti_cost.
  Do not skip D-1531…D-1719. Do not re-port D-1675…D-1719.
  Falsify: Hallu `currency()` ROLL_FROM, not arti_cost/getprice.
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
  `obfree`; `yn_function_menu` (`query_menu`); getdir yn_function;
  sokosolved/roguelevel/quest recalc flags; Hallu currency;
  cant_go_back FREEING; `hhmmss`;
  lspo_object non-merge quan repeat; `is_multigen`/`is_poisonable`;
  choose_stairs / `u_left_shop` leave verbalize; `end.c`
  `artifact_score`; gen_spe/gift_value.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1719.
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
  nhcore (D-1066). Do not skip D-1067…D-1719 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1719. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`.
  JSON `restore_artifacts` is D-1698. Default `spot_monsters` Off.
  Do not keep timeout.c `mon_is_local` for LS_MONSTER lights (D-1708).
  Do not stamp every `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1719 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1719 (index). D-1719 `arti_cost` is `artilist.cost` else
  `100*oc_cost`; getprice `/4` when shk_buying; get_cost shop `*4`
  stays; Hallu currency named. D-1718 glass `get_cost` is `ubirthday`
  `% otyp` then `FIRST_GLASS_GEM` color table (not tmp=5);
  identified still 5. D-1717 `remote_burglary`
  is `rob_shop` + `call_kops(FALSE)` after `pick_obj` addinv;
  choose_stairs named (`sx,sy` 0); do not `rob_shop` from
  `u_left_shop` without leave verbalize. D-1716 mute/Deaf nod is
  `hero_deaf`/`muteshk` else `Shknam` nods. D-1715 Traditional
  itemize is ynq + Pay? (`upstart(doname)`). D-1714 FullyUsedUp
  is dummy billobjs. D-1713 `observe_object` FIRST_OBJECT skip.
  D-1712 `oc_merge` BITS mrg. D-1711 lastseentyp DRAWBRIDGE_UP.
  D-1710 cemetery `yyyymmddhhmmss`. D-1709 `iter_mons` skip.
  D-1708 LS_MONSTER `mx > 0`.

## Landmarks (≤15)

- D-1719: `artifact.c` `arti_cost` `:2308–2317` + `getprice`
  `:4324–4327`; extractor A() cost. Live `js/artifact.js` +
  `js/shk.js`. Named: Hallu currency; `artifact_score`.
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
  Named: cant_go_back FREEING.
- D-1708: LS_MONSTER `mx > 0` (`light_is_local`); timeout
  `mon_is_local` stays for timers/LS_OBJECT.
- D-1707: `recalc_mapseen` Blind/oracle/valley/sanctum. Named:
  sokosolved/roguelevel/quest flags.
- D-1706: `yn_function` addcmdq KEY/CQ_REPEAT. Named:
  `yn_function_menu`; getdir yn_function.
- D-1705: `bill_box_content` nested unpaid. Steal is D-1717.
