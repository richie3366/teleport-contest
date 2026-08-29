# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1636 (cadence **#2030** at `54c89bcc`).
  seed4500 still PASS. Reviews **582–590** ACCEPT-WITH-DEBT (no
  Must-fix). **Hypothesis:** Open `mon.c` `restore_cham` is the
  next map cluster. Not normal_shape.
  **Falsify:** `node scripts/csym.mjs restore_cham`;
  `node scripts/map.mjs mon.c`.
  **Next:** Open restore_cham. Do not skip D-1531…D-1636.
  No FORCE / `wildmiss` wrap / trailing `confdir` in shared
  `getdir`. Do not glue onto restore_luadata (D-1636) or doddrop
  (D-1635). Do not re-port D-1621…D-1636.
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  clone auto-open yn; `restore_cham` / `rescham`;
  tty WIN_INVEN / `#perminv` /
  `optfn_perminv_mode`; BIND= `seeall` / M('?'); ACH_ASTR;
  setworn oc_oprop; newcham mleashed / keepdogs / grow_up leash;
  read.c light-scroll `initedog`; pickup tip-spill / squeaky /
  use_grease; hideunder / `safe_qbuf`; wonky-gold / `invlet_constant`;
  convert_arg `%c`/`%G`/`%A`/`%D`/`%C`/`%N`/`%L`/`%Z` / common fallback /
  array rn2;
  do_mgivenname `'m'`;
  overview PICK_ONE; guardian/isshk/gecko remaps; Punished/ustuck
  float_down; water/lava steed death; `landing_spot` KNOCKED
  preferred-dir; wintty MENU_SEARCH / `tty_wait_synch` `intr++`;
  sounds.c Death_quote / `u_have_novel`; `lookup_novel`;
  save/rest `context.novel`.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1636.
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
  nhcore (D-1066). Do not skip D-1067…D-1636 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1636. Do not delete emin
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
  `vision_reset`. D-1576…D-1636 live in the index. Do not glue
  yn ^P onto getline. No `ing_suffix` clone #3. Do not poke
  `beyond_savefile_load` to “prove” InvInUse (D-1603). Do not restore
  zap `bhit` sticky `u.Blind||u.ublind` (D-1604). Do not re-port
  D-1605…D-1636 (index; restore_luadata is D-1636; doddrop is D-1635;
  convert_line %Xh is D-1634; tribute is D-1633; kill_char is D-1632;
  tty_nhbell is D-1631; menu_remarm is D-1630).
  Do not dump `dat/tribute` into `dat_text.js` indent=2. Do not
  static-import `files.js` from `spell.js` (TDZ). Do not re-port
  putmsghistory body (D-1588).

## Landmarks (≤15)

- D-1636: `restore_luadata`/`save_luadata` JSON lua source
  (`get_variables_string`/`table_stringify`); `!luacore`
  `l_nhcore_init` then loadstring; unixmain no second init.
  `nhl_variable` / Lua NHCB named. doddrop is D-1635.
- D-1635: `doddrop`/`menu_drop`/`menudrop_split`; TRADITIONAL
  `ggetobj("drop")`; FULL query_category+autopick; COMBINATION
  combo ALL_FINISHED; `'D'`/`#droptype`; `bypass_objlist`.
  `better_not_try` / ParanoidAutoAll named. convert_line is D-1634.
- D-1634: `convert_line` pronoun `%Xh` + `qtext_pronoun`; `%Xt`;
  `genders[]` neuter/group; `role_init` `godgend`/`ldrgend`.
  convert_arg `%c`/`%G`/… named. com_pager_core is D-1622.
- D-1633: `read_tribute`/`choose_passage`/`Death_quote`; SPE_NOVEL
  literate/`ACH_NOVL`; Rule #2 embed `dat/tribute`; reservoir
  MAXPASSAGES=30. sounds.c Death_quote / `lookup_novel` /
  save `context.novel` named. putmsghistory is D-1588.
- D-1632: `kill_char` POSIX VERASE=DEL / VKILL=C('U'); empty erase
  + invalid `tty_nhbell`; getline `intr--` `*bufp=0`. MENU_SEARCH /
  `tty_wait_synch` named. EDIT_GETLIN is D-1624.
- D-1631: `tty_nhbell` silent default On; yn invalid + digit abort;
  wrap `cw->cury` clear leftover not `gt.toplines`; `intr--`;
  `AppendLongDigit`. kill_char is D-1632. yn post-answer is D-1623.
- D-1630: `menu_remarm` MENU_FULL `query_category` then invent
  `query_objlist` PICK_ANY `is_worn`/`is_worn_by_type`; COMBINATION
  `ggetobj` combo ALL_FINISHED; TRADITIONAL `'m'` retry.
  `obj_to_glyph` / INCLUDE_HERO / ParanoidAutoAll named. take_off
  occupation is D-1619.
- D-1629: `free_edog` drop EDOG then `mtame=0`; restmon `newedog` +
  apport≤0→1; savemon fills mextra.edog. JSON absolute times.
  read.c light-scroll `initedog` named. initedog ogoal is D-1610.
- D-1628: `restore_gamelog` JSON Sfi length+chars+turn/flags until
  `-1` then `gamelog_add`; `save_gamelog` walk no skip-empty.
  `restore_luadata` is D-1636. restore_msghistory is D-1614.
- D-1627: `dismount_steed` DISMOUNT_THROWN `"are thrown"` FALLTHROUGH
  KNOCKED/FELL HP + wounded-legs; usteed-clear Flying/Lev;
  `heal_legs(1)` mounted; `dog_move` Conflict steed + `wary_dog`.
  Punished/ustuck / water-lava / KNOCKED dir named.
- D-1626: MS_BOAST hostile `rn2(4)` gem/`mhis` / mutton / Fee-Fie
  `wake_nearto(7*7)`; peaceful FALLTHROUGH HUMANOID. Remaps named.
- D-1625: `doextlist` NHW_MENU + `doc_extcmd_flagstr`; `#?` runner;
  `doextcmd` loop; help `k`. BIND= `seeall` named. #seeall D-1605.
- D-1624: EDIT_GETLIN off (`config.h:655`); `name_from_player`;
  `query_annotation` replace + `describe_level`. kill_char is D-1632.
- D-1623: yn clean_up `gt.toplines=prompt+key` + dumplogmsg.
  tty_nhbell is D-1631. yn ^P is D-1612.
- D-1622: `com_pager_core` synthesize `[text]` then `convert_line`+
  `putmsghistory`. pronoun `%Xh` is D-1634; common fallback named.
