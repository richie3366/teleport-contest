# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1602 (`ggetobj` takeoff/identify askchain).
  seed4500 still PASS.
  **Hypothesis:** Open `cmd.c` `#seeall` EXT_CMDS (named). Not
  doprinuse. Not ggetobj takeoff (D-1602).
  **Falsify:** port C `#seeall` EXT_CMDS so the wizard command is
  live, then a canary that `#seeall` is not doprinuse.
  **Next:** Open `#seeall`. Not `mplayer_talk`.
  Do not skip D-1531…D-1602. No FORCE / `wildmiss` wrap / trailing
  `confdir` in shared `getdir`.
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  `m_unleash`; clone auto-open yn; floor `query_classes`;
  `mplayer_talk`; getline/yn ^P; restore_msghistory; `#seeall`;
  `restore_cham` / `rescham`; initedog ogoal `-1`;
  `gain_guardian_angel`; mplayer-sword spe; `take_off` /
  `menu_remarm`; ggetobj drop; `consume_obj_charge`
  `update_inventory`; get_count historicmsg.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1602.
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
  nhcore (D-1066). Do not skip D-1067…D-1602 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1602. Do not delete emin
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
  `vision_reset`. D-1576…D-1602 live in the index. Do not glue
  `#seeall` / `m_unleash` / getline ^P. No `ing_suffix` clone #3.

## Landmarks (≤15)

- D-1602: `ggetobj` Traditional getlin then `askchain` for takeoff
  (`is_worn`/`select_off`) and identify. ident `'q'` `-1`; skip
  takeoff `"That was all."` `take_off`/`menu_remarm`/drop named.
- D-1601: `tty_doprev_message` WIN_MESSAGE + `gt.toplines`; `'s'`
  `redotoplin` NEED_MORE/`more` iff cury; `'f'`/`'c'`/`'r'` menu.
  cmd ^P / `#prevmsg`. getline/yn `inread` named.
- D-1600: perm_invent InvInUse is WIN_INVEN `invmode` (`inuse_only
  = invmode&InvInUse`; `"In use"`; default Off no-op). tty paint /
  `#perminv` named.
- D-1599: SORTLOOT_PETRIFY keeps `touch_petrifies` CORPSE when
  filter rejects FOOD; Blind `look_here`/`pickup` feel. eat/doloot
  named.
- D-1598: `has_mcorpsenm` `mextra && MCORPSENM != NON_PM`.
  object_detect / `altarmask_at` named.
- D-1597: `show_transient_light` camera range 0 + thrown lamplit
  `mtemplit`. Worm tails named.
- D-1596: `create_mplayers` class `rn1` + `goodpos` + `mk_mplayer`.
  `mplayer_talk` / `gain_guardian_angel` named.
- D-1595: `tamedog` `!has_edog` `newedog`+`initedog(TRUE)`.
  livelog / ogoal `-1` named.
- D-1594: `normal_shape` awaits `newcham(..., NC_SHOW_MSG)`
  (review **547**). `restore_cham` / `rescham` named.
- D-1593: `tamedog` ustuck swallow `expels` else `unstuck`.
- D-1592: `in_or_out_menu` more_containers `'n'` loot-next SELECTED.
  ggetobj drop / mbag named.
- D-1591: `display_used_invlets` `#adjust` `?`/`*`.
- D-1590: wizid unid_cnt>0 PICK_ANY `'_'`/`^I` SKIPINVERT.
- D-1589: SORTLOOT_INUSE `inuse_classify` + `doprinuse` `*`.
- D-1588: getobj `putmsghistory(qbuf,FALSE)`. `tty_doprev_message`
  is D-1601.
