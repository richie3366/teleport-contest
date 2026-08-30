# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress. Save-oracle required for tagged restore
  Open. Private B0: trap-same-floor 17/17; ledger 26/26; wait-save
  catchup 30/30; catchup-after-restore 26/30 red; trap-ledger 38/38;
  shop template 35/35 (no unpaid). **Next:** Open `shk.c`
  `remote_burglary` (named). Not bill_box_content.
  Do not skip D-1531…D-1716. Do not re-port D-1675…D-1716.
  Falsify: `remote_burglary` unpaid steal path, not getpos/nod.
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
  sokosolved/roguelevel/quest recalc flags; `remote_burglary`;
  gem glass pseudo-ID; `arti_cost`; Hallu currency; cant_go_back
  FREEING; `hhmmss`; lspo_object non-merge quan repeat;
  `is_multigen`/`is_poisonable`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1716.
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
  nhcore (D-1066). Do not skip D-1067…D-1716 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1716. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1716 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1716 (index). D-1716 mute/Deaf nod is `hero_deaf`/
  `muteshk` else `Shknam` nods (surcharge period; `paid`
  `update_inventory`); hearing still verbalize; SetVoice named.
  D-1715 Traditional itemize is
  `yn_function("Itemized billing?", "ynq m", 'q')` + `menu_requested`
  toggle + `dopayobj` y_n Pay? (`upstart(doname)`; not Doname2
  clone #4; unset `menu_style` is MENU_FULL). D-1714 FullyUsedUp is
  dummy `add_to_billobjs` + `make_itemized_bill` quan/OBJ_ONBILL split.
  D-1713 `observe_object` is
  `otyp >= FIRST_OBJECT && !Hallucination()` (not sticky
  `u.Hallucination`; not undiscover). D-1712 `oc_merge` is objects.h BITS mrg
  (not SPELL/WAND class heuristic; not `is_multigen`). D-1711
  lastseentyp is DRAWBRIDGE_UP `db_under_typ` + furniture
  `cmap_to_type` (not display_monster furniture glyph). D-1710
  cemetery `when[]` is `yyyymmddhhmmss(endtime)`. D-1709 `iter_mons`
  skip (not cant_go_back). D-1708 LS_MONSTER `mx > 0`. D-1707
  Blind/oracle/valley/sanctum. D-1706 yn addcmdq. D-1705
  `bill_box_content` nested unpaid.

## Landmarks (≤15)

- D-1716: `shk.c` `dopay` `:2011–2025` mute/Deaf nod + `paid`
  `update_inventory`. Live `js/shk.js` `hero_deaf`/`muteshk`.
  Named: SetVoice; `remote_burglary`.
- D-1715: `shk.c` `pay_billed_items` `:2082–2109` Traditional ynq
  + `menu_requested` toggle; `dopayobj` `:2259–2275` y_n Pay?
  `upstart(doname)`. Live `js/shk.js`. Named: `remote_burglary`.
- D-1714: `shk.c` FullyUsedUp/PartlyUsedUp `make_itemized_bill`
  `:1543–1663` + `add_to_billobjs` `:3365–3383`; dummy/residual
  `OBJ_ONBILL`. Live `js/shk.js` + `js/mkobj.js`. Named:
  `remote_burglary`.
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
- D-1705: `bill_box_content` nested unpaid. Named: `remote_burglary`.
- D-1704: `dopay` seensk>1 getpos. Mute nod is D-1716.
- D-1703: `shk_names_obj` makeknown `!oc_magic`; `highc`/`plur`.
- D-1702: `buy_container` Known/UndisclosedContainer.
