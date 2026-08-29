# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1672 (cadence **#2070** at `784e3060`).
  seed4500 still PASS. **Hypothesis:** `do_name.c` `distant_monnam`
  astral high-cleric is the first Open (Must-fix empty).
  **Falsify:** `node scripts/csym.mjs` distant_monnam.
  **Next:** Open `distant_monnam` astral high-cleric. Not do_mgivenname.
  Do not skip D-1531…D-1672.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; mO `perminv_mode` compound row; setworn
  oc_oprop; keepdogs/grow_up leash; light-scroll `initedog`;
  tip-spill/squeaky; hideunder; knox/drawbridge;
  save_mapseen cemetery JSON; guardian remaps; Punished float_down;
  water/lava steed; uhitm `u.dx`; map_menu_cmd; `context.novel`;
  JSON getlev; astral `distant_monnam`; walk-key / PREFIXCMD overlay;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; array rn2 /
  pauper_legacy / killed_nemesis; spell dull / zap rider eyecount;
  sit.c grease spray; `oc_uses_known`; perm_invent can_set;
  wizmgender glyph-reset; remaining pushkeys unwield/name/eat/engrave/
  buy/two-weapon; `offer_corpse`; `choose_tip_container_menu`;
  polyself `uskin=`; wield `restrict_name`; `oname` via_naming
  livelog; `'i'` `getobj_name` clone; `undiscover_object` /
  `gem_learned`; #if 0 EXCLUDE.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1672.
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
  nhcore (D-1066). Do not skip D-1067…D-1672 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1672. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1672 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  `noarmor` uskin / wizweight after-change / do_oname slip /
  cmdq_pop canned / `docall` sink-fluid `safe_qbuf` / add `strncmpi` #4.

## Landmarks (≤15)

- D-1672: `docall` sink-fluid `OBJ_DESCR` + `safe_qbuf` Call
  `docall_xname`/`simpleonames`/`"thing"`; class/otyp xname fixups;
  `update_inventory` OBJ_INVENT/carrying-walk. `undiscover_object`
  named. cmdq_pop canned is D-1671; `'o'` getobj is D-1660.
- D-1671: `docallcmd` cmdq_pop KEY skip-menu else `cmdq_clear`;
  lootabc gacc; `!invent` omits i/o; `ECMD_OK`. iactions Call /
  `'i'` `getobj_name` clone / #if 0 named. `'o'` getobj is D-1660.
- D-1670: `do_oname` artifact_name slip + `restrict_name` +
  `wipeout_text`/`rnd_on_display_rng`; Sting/Orcrist canonical.
  wield restrict / oname livelog named.
- D-1669: wizweight after-change `:5353–5361` + set_wizonly mO;
  doname `aum` / with_price merge; paydoname save. wizmgender named.
- D-1668: `noarmor` uskin `simpleonames` + `" dragon "` `p.slice(8)`
  embedded pline. doprarm D-0340/D-1589. ECMD_TIME D-1667.
- D-1667: `dosacrifice` floorfood CORPSE/Yendor/fake `ECMD_TIME`.
  `offer_*` named. InvOptOn D-1666; pushkeys D-1665.
- D-1666: `can_set_perm_invent` `InvOptOn` import. mO / can_set
  gate named. optfn_perminv_mode D-1661.
- D-1665: IA_SACRIFICE/TIP/INVOKE pushkeys + live getobj. offer_corpse
  / remaining pushkeys / tip menu named.
- D-1664: `sanity_check` gold/invlet `check_invent_gold`. Wornmask
  named. D-1641 / dounpaid D-1663.
- D-1663: `dounpaid` Iu pline / NHW_MENU Total / floor+buried.
  Hallu currency named. invlet_constant D-1655.
- D-1662: `qt_pager` role miss → `com_pager_core("common", TRUE)`.
  array rn2 / pauper named. convert_arg D-1649.
- D-1661: `optfn_perminv_mode` do_set + handler PICK_ONE. mO
  compound named. doperminv D-1642.
- D-1660: `docallcmd` `'o'` live getobj `"call"`. cmdq_pop canned
  is D-1671; artifact_name slip is D-1670.
- D-1659: cemetery bones list + `recalc_mapseen` clone. knox /
  save_mapseen JSON named.
- D-1658: `print_mapseen` altar-god coalign; `altarmask_at`.
