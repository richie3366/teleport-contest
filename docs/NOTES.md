# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1644 (cadence **#2040** at `f9bed6be`).
  seed4500 still PASS. **Hypothesis:** C `mon.c` `newcham` mleashed
  (named). Not `restore_cham` (D-1637).
  **Falsify:** `node scripts/map.mjs mon.c` + `csym.mjs newcham`
  / mleashed.
  **Next:** Open newcham mleashed. Do not skip D-1531…D-1644.
  Do not glue mleashed onto restore_cham. Do not re-port D-1621…D-1644.
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  clone auto-open yn; `rescham` wiz_intrinsic;
  `optfn_perminv_mode` / `handler_perminv_mode`; setworn
  oc_oprop; newcham mleashed / keepdogs / grow_up leash; read.c
  light-scroll `initedog`; pickup tip-spill / squeaky / use_grease;
  hideunder / `safe_qbuf`; `invlet_constant` truncate; convert_arg
  `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z` / common fallback / array
  rn2; `lookup_novel`; `rename_disco` / docallcmd `'o'`; overview
  PICK_ONE; guardian/isshk/gecko remaps; Punished/ustuck float_down;
  water/lava steed death; uhitm DISMOUNT_KNOCKED `u.dx`; wintty
  MENU_SEARCH / `tty_wait_synch` `intr++`; sounds.c Death_quote /
  `u_have_novel`; save/rest `context.novel`; JSON dorecover getlev;
  getlev ghostly peace / hideunder place; astral high-cleric
  `distant_monnam`; overlay BIND= on if/else keys (inventory-only
  D-0897); default meta without EXT_CMDS runner.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1644.
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
  nhcore (D-1066). Do not skip D-1067…D-1644 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1644. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`. D-1576…D-1644 live in the index. Do not glue yn ^P
  onto getline. No `ing_suffix` clone #3. Do not poke
  `beyond_savefile_load` to “prove” InvInUse (D-1603). Do not restore
  zap `bhit` sticky `u.Blind||u.ublind` (D-1604).   Do not re-port
  D-1605…D-1644 (`goto_level` ACH_ASTR/ENDG/BGRM is D-1644;
  BIND= M('?') is D-1643; `doperminv` / tty WIN_INVEN `assesstty` is D-1642;
  `check_invent_gold` is D-1641; landing_spot KNOCKED is D-1640;
  ESC-nonempty D-1639; do_mgivenname D-1638). Do not dump
  `dat/tribute` into `dat_text.js` indent=2. Do not static-import
  `files.js` from `spell.js` (TDZ).
  Do not re-port putmsghistory body (D-1588). REST_LEVELS must be
  imported where getlev catchup reads it.

## Landmarks (≤15)

- D-1644: `goto_level` ACH_ENDG `newdungeon`, ACH_ASTR after
  `final_level`, Knox alarm (Croesus died), ACH_BGRM, `new`
  `livelog_printf("entered %s")`; `record_achievement` `achieve_msg`.
  SoundAchievement named. reset_hostility D-1616.
- D-1643: BIND= M('?') `cmdbind_get` → `"?"` `doextlist`; rhack tlist
  for if/else-miss keys with EXT_CMDS runner. Overlay if/else keys
  still inventory (D-0897). doextlist body D-1625. #seeall D-1605.
- D-1642: `doperminv` `#perminv`/`|` IFBURIED|GENERALCMD|NOFUZZERCMD;
  `assesstty` minrow 28/mincol 79 (need 52x79) too_small RESIZABLE;
  ttyinv InvSparse empty letters + `setCell`. 24x80 refuses.
  `optfn_perminv_mode` / `cmap_D0walls_to_glyph` / `tty_wait_synch`
  named. check_invent_gold D-1641.
- D-1641: `check_invent_gold` goldstacks/wrongslot `impossible`;
  `adjust_gold_ok` vs `adjust_ok`; itemactions gold `i` + IA_ADJUST_OBJ
  `doorganize`; dest `$`. `invlet_constant` named. adjust_split D-1621.
- D-1640: `landing_spot` KNOCKED `u.dx,u.dy` then `rn2(2)` DIR_RIGHT/LEFT
  trio + remaining dirs + early break + `throws_rocks` + `enexto`.
  C NODIAG `(j%1)!=0` as written. uhitm `u.dx` named. THROWN HP D-1627.
- D-1639: nonempty ESC `hooked_tty_getlin` falls through to `intr` /
  `doprev` / else `tty_nhbell` (review **593**). kill_char is D-1632.
- D-1638: `do_mgivenname` / `alreadynamed`; `'m'`/`'C'`; `fuzzymatch`;
  swallow `disp_kind`. `'o'`/`rename_disco` / `lookup_novel` named.
- D-1637: `restore_cham` getlev catchup + With_you; PfSC H||E+flats.
  JSON dorecover getlev named. normal_shape D-1594.
- D-1636: `restore_luadata`/`save_luadata` JSON lua source; `!luacore`
  `l_nhcore_init`. `nhl_variable` / Lua NHCB named.
- D-1635: `doddrop`/`menu_drop`; TRADITIONAL `ggetobj("drop")`; FULL
  query_category; COMBINATION; `'D'`/`#droptype`. convert_line D-1634.
- D-1634: `convert_line` pronoun `%Xh` + `qtext_pronoun`; `genders[]`;
  `role_init` `godgend`/`ldrgend`. convert_arg named.
- D-1633: `read_tribute`/`choose_passage`/`Death_quote`; SPE_NOVEL
  `ACH_NOVL`; Rule #2 embed tribute. `lookup_novel` named.
- D-1632: `kill_char` POSIX DEL + C('U'); empty erase + invalid
  `tty_nhbell`; getline `intr--`. MENU_SEARCH named. ESC is D-1639.
- D-1631: `tty_nhbell` silent On; yn invalid + digit abort; wrap
  `cw->cury` leftover not `gt.toplines`. kill_char is D-1632.
- D-1630: `menu_remarm` MENU_FULL `query_category` then invent
  `query_objlist` PICK_ANY. `obj_to_glyph` named. take_off D-1619.
