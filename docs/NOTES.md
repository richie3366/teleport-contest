# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress. Save-oracle required for tagged restore
  Open. Private B0: trap-same-floor 17/17; ledger 26/26; wait-save
  catchup 30/30; catchup-after-restore 26/30 red; trap-ledger 38/38;
  shop template 35/35 (no unpaid). **Next:** Open `objects.h`
  oc_merge extract (named). Not oc_charged. Do not skip
  D-1531…D-1711. Do not re-port D-1675…D-1711. Falsify: `oc_merge`
  must come from objects.h BITS (not SPELL/WAND class heuristic).
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; setworn oc_oprop; keepdogs/grow_up leash;
  light-scroll `initedog`; tip-spill/squeaky; hideunder;
  display_monster furniture lastseentyp; guardian remaps; Punished
  float_down; water/lava steed; uhitm `u.dx`; map_menu_cmd;
  `context.novel`; walk-key / PREFIXCMD overlay;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; array rn2
  / pauper_legacy / killed_nemesis; spell dull / zap rider eyecount;
  perm_invent can_set; polyself `uskin=`; steal/muse
  `unknow_object`; `oc_merge`; `observe_object` FIRST_OBJECT skip;
  Hallu `obj_to_glyph` query; invent.c `useupall` / `obfree`;
  `yn_function_menu` (`query_menu`); getdir yn_function;
  sokosolved/roguelevel/quest recalc flags; FullyUsedUp;
  `remote_burglary`; cant_go_back FREEING; `hhmmss`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1711.
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
  nhcore (D-1066). Do not skip D-1067…D-1711 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1711. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1711 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  D-1682…D-1711 (index). D-1711 lastseentyp is
  DRAWBRIDGE_UP `db_under_typ` + furniture `cmap_to_type`
  (not display_monster furniture glyph; not knox/drawbridge).
  D-1710 cemetery `when[]` is
  `yyyymmddhhmmss(endtime)` (not JSON date; overview still who/how).
  D-1709 `iter_mons` skip (not cant_go_back).
  D-1708 LS_MONSTER `mx > 0` (not timeout migrating/mydogs; keep
  timeout helpers for timers/LS_OBJECT). D-1707 Blind/oracle/valley/
  sanctum (not knox/drawbridge). D-1706 yn addcmdq (getobj/paranoid/
  askchain stay FALSE). D-1705 `bill_box_content` nested unpaid
  (dummy→billobjs named).

## Landmarks (≤15)

- D-1711: `dungeon.c` `update_lastseentyp` `:2926–2938` DRAWBRIDGE_UP
  `db_under_typ` then visible M_AP_FURNITURE `cmap_to_type`
  (`mkroom.c:910–1030`); `defsym.h` S_* `js/const.js`; live
  `js/dungeon.js`. Named: display_monster furniture lastseentyp;
  map_background caller; sokosolved flags.
- D-1710: `calendar.c` `yyyymmddhhmmss` `:94–117` + `yyyymmdd`
  `:55–77` `lt_for_date`; `bones.c` savebones `:586`; `end.c`
  really_done one `getnow()`. Live `js/calendar.js` + `js/end.js`.
  Named: `hhmmss`; lastseentyp is D-1711.
- D-1709: `dog.c` `update_mlstmv` `:293–298` via `iter_mons`
  `mon.c:4531–4535` skip `DEADMONSTER` (`mhp<1`) / `mon_offmap`;
  live `js/dog.js` + `mon_offmap` `js/monmove.js`. Named:
  cant_go_back FREEING.
- D-1708: `light.c` `save_light_sources` / `maybe_write_ls` LS_MONSTER
  `mx > 0` (`:373`); one `light_is_local` (`js/mkobj.js`) used by
  JSON snapshots. Timeout `mon_is_local` stays for timers/LS_OBJECT.
- D-1707: `dungeon.c` `recalc_mapseen` `:3115–3238` Blind retain /
  `forgot` wipe `flags.bigroom`; `oracle=0` then `orig_rtype==DELPHI`;
  valley/msanctum naltar stick; sanctum clears invoc
  `vibrating_square`; Invocation_lev tseen vs no-trap/`msanctum`.
  Named: sokosolved/roguelevel/quest flags; lastseentyp is D-1711.
- D-1706: `cmd.c` `yn_function` `:5470–5583` addcmdq pop KEY /
  CQ_REPEAT record; tty windowport; getobj/paranoid_ynq/askchain
  FALSE. Named: `yn_function_menu`; getdir yn_function.
- D-1705: `bill_box_content` `:3386–3407` + `addtobill` `:3526–3534`
  live `contained_cost` then nested unpaid; coin/SchroedingersBox
  skip; `record_price_quote`; list-price `the_contents_of`. Named:
  dummy→billobjs; FullyUsedUp; `remote_burglary`.
- D-1704: `dopay` `:1814–1856` seensk>1 getpos pay-whom. Named:
  FullyUsedUp; traditional itemize ynq; mute/Deaf nod.
- D-1703: `shk_names_obj` `:3412–3445` makeknown `!oc_magic`
  saleable gear; `highc`/`plur`. Named: FIRST_OBJECT skip.
- D-1702: `buy_container` Known/UndisclosedContainer; COST_CONTENTS
  → `contained_cost`. Named: FullyUsedUp; Traditional itemize.
- D-1701: wizmgender after-change glyph-reset subset (no
  `reset_glyphmap`). Named: remaining after-change; perm_invent
  can_set.
- D-1700: doset CompOpt `perminv_mode` + `wc_supported` skip.
- D-1699: getlev place/envelope/`run_timers` last; omoves restamp.
  Ledger 26/26; catchup-after-restore 26/30 red.
- D-1698: RANGE_GLOBAL relink. D-1697 other ledgers. D-1696
  `serLevel` current. D-1695 stash lights/billobjs. D-1694 traps.
  Audit **#2110** (reviews 654–668).
