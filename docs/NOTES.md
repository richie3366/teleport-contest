# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1684 (cadence **#2090** at `d2bcd227`).
  seed4500 still PASS. **Hypothesis:** `save_mapseen` cemetery JSON
  is still the named omit (not `print_mapseen` cemetery bones, D-1659).
  **Falsify:** `node scripts/csym.mjs save_mapseen` — cemetery
  bonesinfo JSON arm vs JS skip.
  **Next:** Open `dungeon.c` save_mapseen cemetery JSON. Not
  print_mapseen cemetery. Do not skip D-1531…D-1684. Do not restore
  `pay_take_canned_billed`. Do not re-port D-1675…D-1684.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; mO `perminv_mode` compound row; setworn
  oc_oprop; keepdogs/grow_up leash; light-scroll `initedog`;
  tip-spill/squeaky; hideunder; knox/drawbridge; cemetery JSON;
  guardian remaps; Punished float_down; water/lava steed; uhitm
  `u.dx`; map_menu_cmd; `context.novel`; JSON getlev; walk-key /
  PREFIXCMD overlay; `possibly_unwield` / `mon_break_armor`; sync
  `newcham`; array rn2 / pauper_legacy / killed_nemesis; spell dull /
  zap rider eyecount; perm_invent can_set; wizmgender glyph-reset;
  remaining pushkeys rub/swap/whatis; polyself `uskin=`; wield
  `restrict_name`; doengrave non-hands stylus; `undiscover_object` /
  `gem_learned`; steal/muse `unknow_object`; `oc_charged`/`oc_merge`;
  Traditional itemize yn; `cheapest_item` early return.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1684.
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
  nhcore (D-1066). Do not skip D-1067…D-1684 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1684. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1684 in the index. No yn ^P glue /
  `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap sticky Blind
  (D-1604). No `dat/tribute` indent=2. No static `files.js`←`spell.js`
  (TDZ). REST_LEVELS where getlev catchup reads it. Do not re-port
  `silly_thing` / sit grease spray / `make_glib` uarmg /
  add `strncmpi` #4. Do not restore `getobj_name`. Do not restore
  `pay_take_canned_billed` (D-1684).

## Landmarks (≤15)

- D-1684: `pay_billed_items` via_menu `menu_pick_pay_items`; deleted
  `pay_take_canned_billed` (review **637**). Leftover KEY is next
  `rhack`. Named: cheapest_item / Traditional / `buy_container`.
- Audit **#2090**: reviews **636–644** (D-1675…D-1683). Fortress 44/44.
- D-1683: case 6 grease spray `update_inventory` + `make_glib` uarmg.
  rndcurse redraw named. D-1682 silly_thing.
- D-1682: `silly_thing` Call Amulet / unknown fake; #if 0 out.
  D-1681 `'i'` getobj.
- D-1681: `docallcmd` `'i'` live `getobj("name", name_ok)`. D-1680.
- D-1680: `oname` via_naming literate/artifact livelog. D-1679.
- D-1679: `choose_tip_container_menu` PICK_ONE dummy invent. D-1678.
- D-1678: `offer_corpse` eval/consume/luck/same-race. D-1677.
- D-1677: IA_TWOWEAPON `'X'` MAYBETWOWEAPON. D-1676.
- D-1676: IA_BUY_OBJ unpaid `'p'` + invented canned billed consume
  (deleted D-1684).
- D-1675: IA_UNWIELD/NAME/EAT/ENGRAVE pushkeys. D-1674.
- D-1674: `oc_uses_known` extract + `unknow_object`. D-1673.
- D-1673: `distant_monnam` astral high-cleric conceal. D-1672.
- D-1672: `docall` sink-fluid `safe_qbuf`. D-1671.
- D-1671: `docallcmd` cmdq_pop canned KEY. D-1681 `'i'`.
