# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2130** at `32c02560`). Save-oracle
  required for tagged restore Open. Private B0: trap-same-floor 17/17;
  ledger 26/26; wait-save catchup 30/30; catchup-after-restore 26/30
  red; trap-ledger 38/38; shop template 35/35 (no unpaid). Reviews
  **678–686** ACCEPT-WITH-DEBT (no Must-fix). **Next:** Open
  `display.c` display_monster M_AP_MONSTER what_mon (named). Not
  M_AP_FURNITURE lastseentyp. Do not skip D-1531…D-1733. Do not re-port
  D-1675…D-1733. Falsify: display_monster M_AP_MONSTER what_mon, not
  choose_stairs / u_left_shop (D-1733) or furniture lastseentyp.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; setworn oc_oprop; keepdogs/grow_up leash;
  light-scroll `initedog`; tip-spill/squeaky; hideunder;
  display_monster M_AP_MONSTER / Protection sensed; Detect_monsters
  cansee; mimic map_object observe; guardian remaps; Punished
  float_down; water/lava steed; uhitm `u.dx`; map_menu_cmd;
  `context.novel`; walk-key / PREFIXCMD overlay;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; array rn2
  / pauper_legacy / killed_nemesis; spell dull / zap rider eyecount;
  perm_invent can_set; polyself `uskin=`; steal/muse
  `unknow_object`; Hallu `obj_to_glyph` query;
  interned `'yn'` yn_function sites; hide+web `hidespinchars`;
  mouse getpos; shopper_financial_report / `shop_debt`; dokick
  `hidden_gold_kick`; `free_luathemes`; other load_* `des.object`;
  dump_fmtstr / paniclog / `getyear`; full `dealloc_obj`; `delobj`
  extract; get_valuables / pet HP / DUMPLOG `artifact_score` list;
  mthrowu/uhitm poison combat; SetVoice; heaven `u_left_shop`;
  STRAT_HEAL rloc/healmon.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1733.
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
  nhcore (D-1066). Do not skip D-1067…D-1733 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1733. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1733 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1733 (index). D-1733 is `u_left_shop` leave verbalize +
  `choose_stairs` (not remote_burglary / furniture lastseentyp).
  D-1732 is `is_multigen`/`is_poisonable` oc_skill window + Grimtooth
  (not oc_merge / mthrowu poison / hidden_gold). D-1731 is doprgold
  `hidden_gold(FALSE)` (not shopper_financial_report / currency /
  get_valuables). D-1730 is artifact_score (not hidden_gold). D-1729
  is getdir CQ_REPEAT (not trailing confdir / yn_function_menu).
  D-1728 is yn_function_menu query_menu (not interned `'yn'` /
  addcmdq). D-1727 is useupall/obfree (not FIRST_OBJECT skip /
  furniture lastseentyp). D-1726 is display_monster furniture
  lastseentyp (not `update_lastseentyp` DRAWBRIDGE_UP).

## Landmarks (≤15)

- D-1733: `u_left_shop` `:578–625` + `choose_stairs` `:330–364` +
  `stairway_find_type_dir` `:88–96`. Live `js/shk.js` + `js/wizard.js`
  + `js/mklev.js`. Named: SetVoice; heaven caller; STRAT_HEAL.
- D-1732: `obj.h` `:260–268` + `permapoisoned` `:2836–2840`. Live
  `js/objects.js` + `js/artifact.js`. Named: mthrowu/uhitm poison;
  nhlobj lua.
- D-1731: `doprgold` `:4502–4546` + `hidden_gold` `:1256–1268`.
  Live `js/invent.js` + export `js/vault.js`. Named: shopper
  report / shop_debt; dokick clone; botl/detect/insight callers.
- D-1730: `artifact_score` `:906–940` count+list. Live `js/end.js`.
  Named: get_valuables / pet HP / DUMPLOG list.
- D-1729: `getdir` `:3962–4019` `cmdq_pop` + REPEAT record.
  Live `js/lock.js` `getdir_read_dirsym`. Named: mouse getpos;
  help_dir in shared; dxdy_moveok.
- D-1728: `yn_function_menu` `:5416–5463` + identity tables.
  Live `js/getline.js` + `js/const.js`. Named: interned `'yn'`
  callers; hide+web `hidespinchars`.
- D-1727: `useupall` `:1311–1317` + `obfree` `:1186–1275`. Live
  `js/invent.js` + `js/shk.js`. Named: full `dealloc_obj` / `delobj`.
- D-1726: `display_monster` `:545–562` M_AP_FURNITURE cmap + lastseentyp.
  Live `js/display.js`. Named: M_AP_MONSTER / Protection sensed.
- D-1725: `hhmmss` `:79–92` hour*10000+min*100+sec. Live
  `js/calendar.js`. Named: dump_fmtstr / paniclog / `getyear`.
- D-1724: `recalc_mapseen` `:3099–3134` sokosolved / roguelevel /
  quest_summons / questing / notreachable. Live `js/dungeon.js`.
- D-1723: `lspo_object` `:3725–3740` non-merge quan do-while. Live
  `js/mklev.js`. Named: other load_* `des.object`.
- D-1722: `goto_level` `:1640–1664` `cant_go_back` FREEING. Live
  `js/do.js` + `delete_levelfile` / `remdun_mapseen` /
  `discard_migrations`. Named: `free_luathemes`.
- D-1721: `getdir` `:3987–4011` yn_function then clear. Live
  `js/lock.js`. CQ_REPEAT is D-1729.
- D-1720: `currency` Hallu `ROLL_FROM`. Live `js/invent.js`.
- D-1719: `arti_cost` + `artilist.cost`. Live `js/artifact.js`.
