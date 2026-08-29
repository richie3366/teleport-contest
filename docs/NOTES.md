# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1693 (cadence **#2100** at `ac1199da`).
  seed4500 still PASS. **Hypothesis:** `options.c` mO `perminv_mode`
  compound row is still a named omit (not `optfn_perminv_mode` D-1661).
  **Falsify:** `node scripts/csym.mjs optfn_perminv_mode` — mO/doset
  compound letter row vs JS `js/options.js`.
  **Next:** Open `options.c` mO perminv_mode compound row. Not
  optfn_perminv_mode.
  Do not skip D-1531…D-1693. Do not re-port D-1675…D-1693.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; mO `perminv_mode` compound row; setworn
  oc_oprop; keepdogs/grow_up leash; light-scroll `initedog`;
  tip-spill/squeaky; hideunder; yyyymmddhhmmss when[]; Blind
  bigroom/oracle/valley/sanctum; DRAWBRIDGE_UP/mimic lastseentyp;
  guardian remaps; Punished float_down; water/lava steed; uhitm
  `u.dx`; map_menu_cmd; `context.novel`; JSON getlev; walk-key /
  PREFIXCMD overlay; `possibly_unwield` / `mon_break_armor`; sync
  `newcham`; array rn2 / pauper_legacy / killed_nemesis; spell dull /
  zap rider eyecount; perm_invent can_set; wizmgender glyph-reset;
  polyself `uskin=`; steal/muse `unknow_object`; `oc_merge`;
  `observe_object` FIRST_OBJECT skip; `buy_container`;
  `shk_names_obj` makeknown; dopay getpos; `bill_box_content`; yn
  addcmdq; Hallu `obj_to_glyph` query; invent.c `useupall` / `obfree`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1693.
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
  nhcore (D-1066). Do not skip D-1067…D-1693 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1693. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1693 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  `silly_thing` / sit grease spray / `make_glib` uarmg /
  add `strncmpi` #4. Do not restore `getobj_name`. Do not restore
  `pay_take_canned_billed` (D-1684). Do not re-port `save_mapseen`
  cemetery JSON (D-1685). Do not add `serCemetery` #2. Do not re-port
  remaining pushkeys rub/swap/whatis (D-1686). Do not re-port
  Traditional itemize yn / `dotypeinv` (D-1687). Do not re-port
  `cheapest_item` early return (D-1688). Do not re-port doengrave
  non-hands stylus sfx (D-1689). Do not re-port `oc_charged` extract
  (D-1690). Do not re-port `undiscover_object` / `gem_learned` /
  `o_on` / `find_oid` (D-1691). Do not re-port wield `chwepon`
  `restrict_name` / Magicbane / `alter_cost` / `costly_alteration`
  (D-1692). Do not re-port `count_feat_lastseentyp` knox/drawbridge
  (D-1693).

## Landmarks (≤15)

- D-1693: `dungeon.c` `count_feat_lastseentyp` Knox door+throne
  `flags.ludios`; stronghold DOOR-wall/DBWALL/DRAWBRIDGE_DOWN
  `flags.castle`+`castletune`; recalc zeros tune. Named: DRAWBRIDGE_UP
  / mimic lastseentyp; Blind bigroom/oracle/valley/sanctum; when[].
  print_mapseen named-place is D-1650. D-1692 chwepon.
- D-1692: `wield.c` `chwepon` named restricted artifact faint-glow
  no spe; Magicbane `is_art`; unpaid `alter_cost`; `costly_alteration`
  COST_DEGRD/DECHNT; weld `update_inventory`. Named: invent.c
  `useupall` / `obfree`. do_oname slip is D-1670. D-1691 disco.
- D-1691: `o_init.c` `undiscover_object` disco shift + `shk.c`
  `gem_learned` unpaid gem `get_cost`; `invent.c` `o_on`; `find_oid`;
  `discover_object` moveloop reprice; `docall` empty uname. Named:
  `observe_object` FIRST_OBJECT skip. D-1690 `oc_charged`.
- D-1690: `objects.h` BITS `oc_charged` extract; `otyp_is_charged`
  table read; RING `mksobj_init` / `ini_inv_adjust_obj`; `readobjnam`
  non-wizard spe clamp. Named: `oc_merge`. D-1689 doengrave.
- D-1689: `doengrave` live getobj write-with + non-hands
  `doengrave_sfx_item`/`_WAN` (wand/weapon/marker/towel/`oc_tough`/
  boots). Named: yn add-to / dulling / altar. D-1688 cheapest_item.
- D-1688: `cheapest_item` min `ibill[].cost` + `pay_billed_items`
  cash+credit early return (stashed / paid left / `more_than_one`).
  Named: `buy_container` / `shk_names_obj`. D-1687 Traditional.
- D-1687: `dotypeinv` Traditional itemize yn + `this_type_only` /
  `tally_BUCX` / `doinvbill`; `query_objlist` this_title / PICK_ONE;
  `'I'` / #inventtype. cheapest_item is D-1688.
- D-1686: IA_RUB_OBJ / IA_SWAPWEAPON / IA_WHATIS_OBJ pushkeys;
  `do_look` cmdq_pop KEY; `display_inventory` canned KEY. Traditional
  itemize is D-1687. D-1685 cemetery JSON.
- D-1685: `save_mapseen`/`load_mapseen` cemetery JSON +
  `savecemetery`/`restcemetery`; dosave0 mapseenchn + savelev
  bonesinfo. when[] named. knox/drawbridge is D-1693. D-1684 pay
  via_menu.
- D-1684: `pay_billed_items` via_menu `menu_pick_pay_items`; deleted
  `pay_take_canned_billed` (review **637**). Leftover KEY is next
  `rhack`. cheapest_item is D-1688. Named: `buy_container`.
- Audit **#2100**: reviews **645–653** (D-1684…D-1692). Fortress 44/44.
- D-1683: case 6 grease spray `update_inventory` + `make_glib` uarmg.
  rndcurse redraw named. D-1682 silly_thing.
- D-1682: `silly_thing` Call Amulet / unknown fake; #if 0 out.
  D-1681 `'i'` getobj.
- D-1681: `docallcmd` `'i'` live `getobj("name", name_ok)`. D-1680.
- D-1680: `oname` via_naming literate/artifact livelog. D-1679.
