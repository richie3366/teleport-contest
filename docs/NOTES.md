# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** after D-1601 (`tty_doprev_message` live). seed4500
  still PASS.
  **Hypothesis:** Open `pickup.c` ggetobj takeoff/identify askchain
  (named). Not traditional_loot (D-1581). Not `tty_doprev_message`
  (D-1601).
  **Falsify:** port C `ggetobj` takeoff/identify `askchain` so those
  verbs walk the pack like traditional_loot, then a canary that
  takeoff/identify use askchain not only the menu path.
  **Next:** Open ggetobj takeoff. Not `#seeall`.
  Do not skip D-1531…D-1601. No FORCE / `wildmiss` wrap / trailing
  `confdir` in shared `getdir`.
- Named still: sit/pray `eyecount`; Palantir `#if 0`; pit/underwater;
  `m_unleash` / break-armor / Elbereth; clone auto-open yn;
  ggetobj takeoff; floor `query_classes`; `mplayer_talk`;
  potion/timeout/polyself `set_mimic_blocking`;
  getline/yn ^P `inread`; restore_msghistory;
  `#seeall` EXT_CMDS; getlev `restore_cham`; wiz_intrinsic
  `rescham`; livelog first pet; initedog ogoal `-1`;
  `gain_guardian_angel`; mplayer-sword spe; object_detect
  cursed-mimic; `altarmask_at`; worn `clear_bypasses`; worm tails
  on show_transient_light; eat.c / doloot / pray feel_cockatrice;
  engulfer stomach minvent feel; tty WIN_INVEN paint / InvSparse /
  `#perminv` scroll; `consume_obj_charge` `update_inventory`;
  get_count historicmsg.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1601.
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
  nhcore (D-1066). Do not skip D-1067…D-1601 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1601. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level` /
  `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` bodies or global `recalc` as
  `vision_reset`. D-1576…D-1601 live in the index (gacc D-1580;
  inuse_only D-1589; wizid PICK_ANY D-1590; used-invlets D-1591;
  more_containers `n` D-1592; ustuck expels D-1593;
  `normal_shape` await D-1594; has_edog D-1595;
  create_mplayers D-1596; show_transient_light D-1597;
  has_mcorpsenm D-1598; SORTLOOT_PETRIFY D-1599;
  perm_invent InvInUse D-1600; `tty_doprev_message` D-1601).
  Do not glue ggetobj takeoff / `m_unleash` / getline ^P.
  Do not add `ing_suffix` clone #3 or `Tobjnam` #8 or `upstart` #9.

## Landmarks (≤15)

- D-1601: `tty_doprev_message` walks WIN_MESSAGE + `gt.toplines`
  (`redotoplin` NEED_MORE / `more` iff cury; `'s'` single
  `C('p')` dismiss_more; `'f'`/`'c'`/`'r'` NHW_MENU). cmd ^P /
  `#prevmsg`. `msg_window` first-char; TTY default `'s'`.
  getline/yn `inread` / restore_msghistory named. putmsghistory
  is D-1588.
- D-1600: perm_invent InvInUse is WIN_INVEN invmode
  (`prepare_perminvent` copies `perminv_mode`; `inuse_only =
  invmode&InvInUse`; header `"In use"`; default Off still no-op).
  tty paint / InvSparse / `#perminv` / `consume_obj_charge`
  named. inuse_only is D-1589. SORTLOOT_PETRIFY is D-1599.
- D-1599: SORTLOOT_PETRIFY is a filter override (not a sort
  class): keep `touch_petrifies` CORPSE when filterfunc rejects
  FOOD; `will_feel_cockatrice` / `feel_cockatrice`; `look_here`
  skip/single/multi feel; pickup FEEL abort `look_here(0)`.
  eat/doloot/pray/engulfer named. inuse_only is D-1589.
- D-1598: `has_mcorpsenm` `mextra && MCORPSENM != NON_PM` +
  `newmcorpsenm`/`freemcorpsenm`; `seemimic` free; zap long-worm
  skip+flag; `copy_mextra`; display `PM_TENGU`; pager clone
  retired. object_detect / `altarmask_at` / `clear_bypasses`
  named. show_transient_light is D-1597.
- D-1597: `show_transient_light` camera range 0 + thrown lamplit
  `mtemplit` + `transient_light_cleanup` `discard_flashes`. Callers
  zap `bhit` / apply `do_blinding_ray` / minion S_ANGEL. Worm tails
  named. create_mplayers is D-1596.
- D-1596: `create_mplayers` class `rn1` + `goodpos` tryct +
  `mk_mplayer`; Astral `goto_level` `rn1(4,3), TRUE`. `mplayer_talk`
  / `gain_guardian_angel` / mplayer-sword spe named. mk_mplayer is
  D-1584.
- D-1595: `tamedog` `!has_edog` `newedog`+`initedog(TRUE)` else
  FALSE; MM_EDOG; `initedog` `EDOG`. livelog / ogoal `-1` named.
  ustuck is D-1593.
- D-1594: `normal_shape` awaits `newcham(..., NC_SHOW_MSG)` before
  `cham=NON_PM` / clay-golem (review **547**).
  getlev `restore_cham` / wiz_intrinsic `rescham` named. NC_SHOW_MSG
  is D-1586.
- D-1593: `tamedog` ustuck swallow `expels` else `!(Upolyd && sticks)`
  `unstuck` (mhitu + engrave sticks). FULL_MOON is D-1585.
- D-1592: `in_or_out_menu` more_containers `'n'` loot-next SELECTED
  default + Space/Return; `'q'` abort vs `'n'` continue; `do_loot_cont`
  cindex<ccount; `doloot` num_conts>1 PICK_ANY. ggetobj / mbag /
  loot_mon named. used-invlets is D-1591.
- D-1591: `display_used_invlets` sortpack `let_to_name` + doname +
  obj_glyph PICK_ONE; `#adjust` `?`/`*` (ESC vs empty). nobj-split
  avoidlet / gold adjust named. wizid is D-1590.
- D-1590: wizid unid_cnt>0 PICK_ANY `'_'`/`^I` SKIPINVERT + skip
  fully ID'd; empty pline; `identify_pack` `update_inventory`.
  inuse_only is D-1589.
- D-1589: SORTLOOT_INUSE `inuse_classify` + `is_inuse` / fake HANDS
  / inuse_headers; `dispinv` `sortloot='i'`; `doprinuse` `*`.
- D-1588: getobj `putmsghistory(qbuf,FALSE)` + `tty_putmsghistory`
  NEED_MORE→NON_EMPTY. `tty_doprev_message` is D-1601.
- D-1587: `mimic_light_blocking` See_invisible block/unblock (not
  `recalc`). potion/timeout/polyself named.
