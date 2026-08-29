# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1654 (cadence **#2050** at `69534fd4`).
  seed4500 still PASS. **Hypothesis:** invent.c `invlet_constant`
  still omitted (C `invent.c`).
  **Falsify:** `node scripts/csym.mjs invlet_constant` vs `js/invent.js`.
  **Next:** Open `invlet_constant`. Not check_invent_gold.
  Do not skip D-1531…D-1654. Not `safe_qbuf`.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham` wiz_intrinsic; `optfn_perminv_mode`; setworn oc_oprop;
  keepdogs/grow_up leash; light-scroll `initedog`; tip-spill /
  squeaky / `use_grease`; hideunder; `invlet_constant`;
  `'o'` getobj call; altar-god; cemetery bones; guardian remaps;
  Punished float_down; water/lava steed; uhitm `u.dx`; map_menu_cmd;
  `context.novel`; JSON getlev; astral `distant_monnam`; overlay
  BIND= (D-0897); `possibly_unwield` / `mon_break_armor`; sync
  `newcham`; qt_pager fallback / array rn2; spell dull / zap rider
  eyecount callers.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1654.
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
  nhcore (D-1066). Do not skip D-1067…D-1654 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1654. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. D-1576…D-1654 in the index (`safe_qbuf` D-1654;
  `u_have_novel` D-1653; `eyecount` D-1652). No yn
  ^P glue / `ing_suffix` clone #3 / InvInUse poke (D-1603) / zap
  sticky Blind (D-1604). No `dat/tribute` indent=2. No static
  `files.js`←`spell.js` (TDZ). REST_LEVELS where getlev catchup
  reads it.

## Landmarks (≤15)

- D-1654: `safe_qbuf` QBUFSZ-1 + `short_oname` lastR; pickup
  Pick up / Continue? / Do what with / empty Yname2 / tip.
  Other-file callers named.
- D-1653: `domonnoise` MS_RIDER Death tribute; `u_have_novel` +
  `Death_quote` + `ucase` pline. save/rest `context.novel` named.
- D-1652: sit/pray/potionbreathe import `monsters.js` `eyecount`
  (0/1/2). Spell dull / zap rider / dothrow / mthrowu named.
- D-1651: `lookup_novel` aliases + table/`The` + IndexOk miss; wish
  SPE_NOVEL; `create_object` named `oname`. `'o'` getobj named.
- D-1650: `dooverview` why==-1 PICK_ONE + `query_annotation`; two-pass
  traverse; named-place / `builds_up` / `endgamelevelname`.
- D-1649: `convert_arg` `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z`;
  `homebase`/`intermed`/`neminame`; `%o` `artiname`. qt_pager named.
- D-1648: await `newcham` remaining NO_NC_FLAGS (review **606**).
  Sync makemon/`load_tower1` named. mleashed D-1645.
- D-1647: `rename_disco` inv_order PICK_ONE + dummy `docall`.
  `'o'` getobj named. do_mgivenname D-1638.
- D-1646: MENU_SEARCH `:` pmatchi+toggle; `tty_wait_synch` getret /
  inmore / inread. map_menu_cmd named.
- D-1645: `newcham` mleashed `m_unleash` / Elbereth `monflee`.
  keepdogs/`grow_up` named. restore_cham D-1637.
- D-1644: `goto_level` ACH_ENDG/ASTR/BGRM + Knox + entered livelog.
- D-1643: BIND= M('?') `cmdbind_get` → `"?"`. Overlay if/else D-0897.
- D-1642: `doperminv` / tty WIN_INVEN `assesstty` min 52x79.
  `optfn_perminv_mode` named.
- D-1641: `check_invent_gold` + gold `i` adjust. `invlet_constant` named.
- D-1640: `landing_spot` KNOCKED preferred-dir + `enexto`.
