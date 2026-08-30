# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress. Save-oracle required for tagged restore
  Open. Private B0: trap-same-floor 17/17; ledger 26/26; wait-save
  catchup 30/30; catchup-after-restore 26/30 red; trap-ledger 38/38;
  shop template 35/35 (no unpaid). **Next:** Open `shk.c`
  dopay multi-shk getpos. Do not skip D-1531…D-1703. Do not re-port D-1675…D-1703.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; setworn
  oc_oprop; keepdogs/grow_up leash; light-scroll `initedog`;
  tip-spill/squeaky; hideunder; yyyymmddhhmmss when[]; Blind
  bigroom/oracle/valley/sanctum; DRAWBRIDGE_UP/mimic lastseentyp;
  guardian remaps; Punished float_down; water/lava steed; uhitm
  `u.dx`; map_menu_cmd; `context.novel`; walk-key /
  PREFIXCMD overlay; `possibly_unwield` / `mon_break_armor`; sync
  `newcham`; array rn2 / pauper_legacy / killed_nemesis; spell dull /
  zap rider eyecount; perm_invent can_set; polyself `uskin=`; steal/muse `unknow_object`; `oc_merge`;
  `observe_object` FIRST_OBJECT skip;
  dopay getpos; `bill_box_content`; yn
  addcmdq; Hallu `obj_to_glyph` query; invent.c `useupall` / `obfree`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1703.
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
  nhcore (D-1066). Do not skip D-1067…D-1703 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1703. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`.
  JSON `restore_artifacts` is D-1698. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1703 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1703 (index): silly_thing / sit grease / `make_glib` /
  `getobj_name` / canned pay / cemetery JSON / pushkeys / Traditional
  itemize / cheapest / doengrave / `oc_charged` / disco / chwepon /
  knox / traps / `goto_level` stash / `serLevel` / other ledgers /
  RANGE_GLOBAL / dorecover envelope / ungated mO `perminv_mode`
  (C `wc_supported` skip when contest tty lacks `WC_PERM_INVENT`) /
  wizmgender glyph-reset (`reset_needed_visuals` subset; no full
  `reset_glyphmap`) / buy_container (KnownContainer coalesce;
  paydoname no_charge rewrite; no FullyUsedUp / `bill_box_content`) /
  `shk_names_obj` makeknown (`highc`/`plur`; FIRST_OBJECT skip named).

## Landmarks (≤15)

- D-1703: `shk_names_obj` `:3412–3445` live `objects()[otyp]`
  before `oc_magic`; makeknown blank/mail + ordinary saleable
  WEAPON/ARMOR/SCROLL/SPBOOK/MIRROR; `highc` + `plur(amt)`.
  Named: FIRST_OBJECT skip; dopay getpos; `bill_box_content`.
- D-1702: `buy_container` `:2307–2411` + `insufficient_funds` /
  `reject_purchase` / `update_bill`; `make_itemized_bill` Known /
  UndisclosedContainer coalesce; `unpaid_cost` COST_CONTENTS →
  `contained_cost`; `paydoname` Has_contents / no_charge rewrite.
  Named: FullyUsedUp/PartlyUsedUp; `bill_box_content`; Traditional
  itemize; SetVoice; OBJ_ONBILL dealloc. Shop template still 35/35.
- D-1701: `optfn_boolean` wizmgender after-change `:5376–5385`
  (`opt_need_redraw` + `opt_need_glyph_reset`); set_wizonly mO
  before wizweight; OPTIONS= `iflags.wizmgender`;
  `reset_needed_visuals` subset `check_gold_symbol`+`docrt` (no
  full `reset_glyphmap` / `reglyph_darkroom`); tty MG_FEMALE
  inverse; doname statue/corpse/figurine gender suffix. Named:
  remaining after-change; perm_invent can_set.
- D-1700: `doset` CompOpt `perminv_mode` in C allopt order +
  `doset_add_menu` get_val/handler; `wc_options`/`wc_supported` skip
  when !`WC_PERM_INVENT`. Contest tty `!TTY_PERM_INVENT` hides the
  row (seed0007 letters). Named: wc2 skip; perm_invent can_set.
  optfn_perminv_mode is D-1661.
- D-1699: getlev place/residency/hideunder/steed-ustuck; M6 one
  `restore_cham` per current fmon; `run_timers` last; restlevelfile
  omoves restamp (`svm.moves`). Ledger 26/26; wait-save catchup 30/30;
  catchup-after-restore 26/30 red. Named: worms/`reglyph_darkroom`.
- D-1698: JSON `savegamestate` drop `worn`/`iflags`; `owornmask`+
  `setworn`+`setuwep`; RANGE_GLOBAL timers/lights/`timer_id`;
  migrating/fruit/quest/`artidisco`; restgamestate relink. Pack lamp.
  D-1697 other ledgers.
- D-1696: JSON `payload.current = serLevel(...)`; `deserLevel`
  GameMap + per-blob relink (no `billobjs`). Bones `write_bonesfile`
  calls `serLevel`. Missing `current` = old scattered keys. Named:
  other ledgers Cluster 3; RANGE_GLOBAL Cluster 4. D-1695 stash.
- D-1695: `goto_level` stash RANGE_LEVEL lights + `billobjs`;
  `update_mlstmv`; `forget_temple_entry` ordinary leave. Named:
  cant_go_back FREEING. D-1694 traps.
- D-1694: `save.c` `savetrapchn` JSON from `level.traps` (not empty
  `game.ftrap`). Restore `payload.traps`. `dst.dlevel` absolute.
  Named: multi-level ledger / binary NHFILE. Private trap-same-floor
  14/17 → 17/17. D-1693 knox/drawbridge.
- D-1693: `dungeon.c` `count_feat_lastseentyp` Knox door+throne
  `flags.ludios`; stronghold DOOR-wall/DBWALL/DRAWBRIDGE_DOWN
  `flags.castle`+`castletune`; recalc zeros tune. Named: DRAWBRIDGE_UP
  / mimic lastseentyp; Blind bigroom/oracle/valley/sanctum; when[].
  D-1692 chwepon; D-1691 disco; D-1690 `oc_charged`; D-1689 doengrave;
  D-1688 cheapest_item. Traditional itemize is D-1687. Audit **#2100**.

