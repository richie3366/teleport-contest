# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1620. seed4500 still PASS.
  **Hypothesis:** Open `invent.c` `adjust_split`
  GC_ECHOFIRST|GC_CONDHIST caller (named) is the next map
  cluster. Not get_count.
  **Falsify:** `node scripts/csym.mjs --callers adjust_split`;
  `node scripts/map.mjs invent.c`.
  **Next:** Open `adjust_split`. D-1620 shipped floor
  TRADITIONAL `query_classes` + yn/`pickup_object`. Do not skip
  D-1531…D-1620. No FORCE / `wildmiss` wrap / trailing `confdir`
  in shared `getdir`. Do not glue onto traditional_loot
  (D-1581) or `take_off` (D-1619).
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  clone auto-open yn;
  `restore_cham` / `rescham`; `restore_gamelog`;
  MS_BOAST fallthrough; `menu_remarm`; ggetobj drop;
  tty WIN_INVEN create (`allmain.c:726`); `#perminv`;
  `optfn_perminv_mode`; `doextlist` / BIND= `seeall`;
  ACH_ASTR;
  dog_move dismount_steed DISMOUNT_THROWN / setworn oc_oprop;
  newcham mleashed / keepdogs stay-behind / grow_up leash;
  `free_edog` / restore `newedog` / read.c light-scroll `initedog`;
  `adjust_split`; EDIT_GETLIN; post-answer `toplines=prompt+key`;
  pickup tip-spill / trap `disarm_squeaky_board` `consume_obj_charge`
  callers; use_grease trailing `update_inventory`; hideunder /
  `safe_qbuf` / engulfer minvent traditional.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1620.
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
  nhcore (D-1066). Do not skip D-1067…D-1620 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1620. Do not delete emin
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
  `vision_reset`. D-1576…D-1620 live in the index. Do not glue
  yn ^P onto getline. No `ing_suffix` clone #3. Do not poke
  `beyond_savefile_load` to “prove” InvInUse (D-1603 writers are
  preamble `:71` / `try_restore_save` `:942`). Do not restore zap
  `bhit` sticky `u.Blind||u.ublind` (D-1604). Do not re-port
  `doprinuse` `#seeall` (D-1605), `mplayer_talk` (D-1606), `mongets`
  sword spe (D-1607), `gain_guardian_angel` (D-1608), `m_unleash`
  (D-1609), `initedog` ogoal (D-1610), getline ^P (D-1611), yn ^P
  (D-1612), `get_count` historicmsg (D-1613), `restore_msghistory`
  (D-1614), `consume_obj_charge` known `update_inventory` (D-1615),
  `reset_hostility` (D-1616), dog_move Conflict
  `lose_guardian_angel` (D-1617), peaceful MS_HUMANOID /
  `"threatens you."` / MS_ORC remap (D-1618; MS_BOAST named),
  `take_off` occupation / `do_takeoff` / `Amulet_off` ESP/RESTFUL
  (D-1619; `menu_remarm` named), floor TRADITIONAL `query_classes`
  (D-1620; hideunder/`safe_qbuf`/engulfer named).

## Landmarks (≤15)

- D-1620: floor TRADITIONAL `query_classes` + yn/`pickup_object`
  (ynaq default `'y'`); `'m'` query_objlist; `count_unpaid` nobj.
  traditional_loot is D-1581. hideunder/`safe_qbuf` named.
- D-1619: `take_off` occupation + `do_takeoff` + `takeoff_order`
  `oc_delay`; `Amulet_off` ESP/`RESTFUL_SLEEP`/`GUARDING`.
  ggetobj takeoff is D-1602. `menu_remarm` named.
- D-1618: `domonnoise` MS_HUMANOID peaceful + hostile
  `"threatens you."` + MS_ORC `same_race`/Hallu remap. Gnome
  `rn2(4)` short-circuit. mplayer_talk is D-1606. MS_BOAST named.
- D-1617: `dog_move` Conflict `!edog` `lose_guardian_angel(mtmp)`
  then `MMOVE_DIED`. Body D-1608. dismount_steed named.
- D-1616: `reset_hostility` isminion cleric/angel emin vs ualign
  → hostile `set_malign`/`newsym`. `final_level` `iter_mons`.
  ACH_ASTR named.
- D-1615: `consume_obj_charge` known `update_inventory` after
  `spe--`. Pickup tip-spill / trap squeaky / use_grease named.
- D-1614: `restore_msghistory` JSON Sfi until `-1`;
  `save_msghistory` skip-empty. `restore_gamelog` named.
- D-1613: `get_count` GC_SAVEHIST/CONDHIST putmsghistory Count+key2txt.
  `adjust_split` named.
- D-1612: yn `tty_yn_function` ^P `tty_doprev_message`; `'s'` two
  calls then discard. Not getline. Command ^P is D-1601.
- D-1611: getline `hooked_tty_getlin` ^P zeros `inread` around
  `tty_doprev_message`. yn ^P is D-1612.
- D-1610: `initedog` ogoal `-1,-1` + first-pet livelog. `free_edog`
  / restore `newedog` named.
- D-1609: `m_unleash` `pline_mon` + `update_inventory`; `m_detach`
  FALSE. newcham mleashed named.
- D-1608: `gain_guardian_angel` Conflict hostiles else fervent
  `mk_roamer`; pets conduct; no tamedog. dog_move caller is D-1617.
- D-1607: `mongets` mplayer-sword `spe=3+rn2(4)` plus demon/lminion
  / invocation. One obj.h `is_sword`.
- D-1606: `mplayer_talk` hostile endgame `is_mplayer` `#chat`.
  Peaceful MS_HUMANOID is D-1618.
