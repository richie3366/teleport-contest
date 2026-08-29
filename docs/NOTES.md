# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1661 (cadence **#2060** at `9ac19d6f`
  still last full suite). seed4500 still PASS. **Hypothesis:**
  `questpgr.c` qt_pager common fallback still omitted (not
  `optfn_perminv_mode` D-1661 / convert_arg D-1649).
  **Falsify:** `node scripts/csym.mjs qt_pager`.
  **Next:** Open qt_pager common fallback. Not convert_arg.
  Do not skip D-1531…D-1661. Not `optfn_perminv_mode`.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; mO `perminv_mode` compound row; setworn oc_oprop;
  keepdogs/grow_up leash; light-scroll `initedog`; tip-spill /
  squeaky; hideunder; dounpaid / wizcmds sanity_check;
  artifact_name slip / cmdq_pop canned / docall sink-fluid;
  knox/drawbridge castle; save_mapseen cemetery JSON; guardian
  remaps; Punished float_down; water/lava steed; uhitm `u.dx`;
  map_menu_cmd; `context.novel`; JSON getlev; astral
  `distant_monnam`; walk-key / PREFIXCMD overlay BIND=;
  `possibly_unwield` / `mon_break_armor`; sync `newcham`; qt_pager
  fallback / array rn2; spell dull / zap rider eyecount callers;
  sit.c `special_throne_effect` grease spray; dig/music/pager
  `altarmask_at`; `oc_uses_known` extract; optfn_boolean perm_invent
  can_set / wizweight after-change.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1661.
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
  nhcore (D-1066). Do not skip D-1067…D-1661 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1661. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1661 in the index (`optfn_perminv_mode` D-1661;
  `'o'` getobj D-1660; cemetery D-1659; altar-god D-1658). No yn
  ^P glue / `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap
  sticky Blind (D-1604). No `dat/tribute` indent=2. No static
  `files.js`←`spell.js` (TDZ). REST_LEVELS where getlev catchup
  reads it.

## Landmarks (≤15)

- D-1661: `optfn_perminv_mode` do_set table/digit/`!` + get_val Off
  suffix + `handler_perminv_mode` PICK_ONE + `can_set_perm_invent`.
  mO compound row / optfn_boolean perm_invent gate named.
  doperminv is D-1642; `'o'` getobj is D-1660.
- D-1660: `docallcmd` `'o'` live `getobj("call", call_ok,
  GETOBJ_NOFLAGS)` + `xname`/`dknown`/`docall`. cmdq_pop canned /
  lootabc / invent-gated i/o / artifact_name slip named.
  lookup_novel is D-1651.
- D-1659: `print_mapseen` cemetery bones list; `recalc_mapseen`
  clone `bonesinfo` + lastseentyp bonesknown; kncnt `,`/`.`;
  savebones formatkiller how. knox-drawbridge / save_mapseen JSON
  / when[] named. altar-god is D-1658; dooverview PICK_ONE D-1650.
- D-1658: `print_mapseen` altar-god coalign; `count_feat` `msalign`
  + `altarmask_at`; `align_gname` A_NONE Moloch.
- D-1657: overlay BIND= on if/else keys; `rhack_user_overlay_key` +
  EXT_CMDS runners; nothing unbinds. Walk/PREFIXCMD overlay named.
  cmdbind_get default M('?') is D-1643.
- D-1656: `use_grease` trailing `update_inventory` `:2652` + live
  getobj; grease_ok COIN EXCLUDE 0; `gloves_simple_name` gauntlets.
  sit.c grease spray named. consume_obj_charge is D-1615.
- D-1655: `reassign`/`obj_to_let` + `fixinv`→`invlet_constant` On;
  getobj/display_pickinv/doorganize/prinv/#see*; xprname use_invlet.
  dounpaid / wizcmds / wizweight named.
- D-1654: `safe_qbuf` QBUFSZ-1 + `short_oname` lastR; pickup
  Pick up / Continue? / Do what with / empty Yname2 / tip.
  Other-file callers named.
- D-1653: `domonnoise` MS_RIDER Death tribute; `u_have_novel` +
  `Death_quote` + `ucase` pline. save/rest `context.novel` named.
- D-1652: sit/pray/potionbreathe import `monsters.js` `eyecount`
  (0/1/2). Spell dull / zap rider / dothrow / mthrowu named.
- D-1651: `lookup_novel` aliases + table/`The` + IndexOk miss; wish
  SPE_NOVEL; `create_object` named `oname`. `'o'` getobj is D-1660.
- D-1650: `dooverview` why==-1 PICK_ONE + `query_annotation`; two-pass
  traverse; named-place / `builds_up` / `endgamelevelname`.
- D-1649: `convert_arg` `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`;
  `homebase`/`intermed`/`neminame`; `%o` `artiname`. qt_pager named.
- D-1648: await `newcham` remaining NO_NC_FLAGS (review **606**).
  Sync makemon/`load_tower1` named. mleashed D-1645.
- D-1647: `rename_disco` inv_order PICK_ONE + dummy `docall`.
  `'o'` getobj is D-1660. do_mgivenname D-1638.
