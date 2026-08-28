# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress after audit **#1960** (Scr **11,405**
  RNG **792,838**/792,838 = 100%; `38+0.31/turn`). seed0367 FULL.
  **Hypothesis:** Open `newcham` Protection_from_shape_changers
  cancel is still named (hatch timeout is D-1572). Not
  set_mimic_sym early-out.
  **Falsify:** `node scripts/csym.mjs newcham` vs `js/mon.js`.
  **Next:** Open `newcham` Protection cancel. Not set_mimic_sym
  early-out. Do not skip D-1531…D-1572. No FORCE / `wildmiss`
  wrap / trailing `confdir` in shared `getdir`.
- Named still: `mk_mplayer`; FULL_MOON S_DOG / ustuck /
  `redraw_worm`; sit/pray `eyecount`; PREFIXCMD / `cmdq_shift`;
  Palantir `#if 0`; `newcham` Protection cancel;
  `ndemon` mkclass; `unblock_point`/`dig_point`; nv_range circle;
  traditional_loot; more_containers `n`; force_invmenu redo;
  mime_action; gacc.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1572.
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
  nhcore (D-1066). Do not skip D-1067…D-1572 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1572. Do not delete emin
  (**487**). Do not stub `make_happy_shk` pacify-only (D-1540).
  Do not import bones→options for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not import `makemon.js`→`hack.js`/`artifact.js`/`minion.js`.
  No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557) or
  `recalc` there. Do not glue `redraw_worm` / force_invmenu redo.
  D-1558…D-1572 live in the index (hatch timeout is D-1572).
  Do not re-port `attach_egg_hatch_timeout` / `obj_split_timers`
  (splitobj wire + poly hero-egg live).

## Landmarks (≤15)

- D-1572: `attach_egg_hatch_timeout` + `obj_split_timers`;
  poly_obj hero-egg `kill_egg`/`set_corpsenm` `rn2(NUMMONS)`;
  hatch `is_pool(mon)` + `learn_egg_type` `update_inventory` +
  impossible. SetVoice / migrating #if 0 named. D-0533 attach
  body. D-1036 hatch body.
- D-1571: `vision_recalc` xray IN_SIGHT `circle_ptr` + seenv SVALL
  before lights; not rogue/Blind. nv_range / pit named.
  howmonseen D-1562. Eyes conferral D-1558.
- D-1570: `cutworm` + `place_wsegs`; known_hitum slice_or_chop
  after Vorpal oldhp; thitmonst chopper. redraw_worm named.
  worm_known D-1548. Hands/xtra D-1569.
- D-1569: pickinv usextra hands/xtra_choice; `getobj_hands_txt`;
  n==1 `message_menu` HANDS_SYM; sortpack Miscellaneous `'-'`.
  force_invmenu redo / mime_action / gacc named. `&ctmp` D-1559.
- D-1568: `getobj` eat/read/zap/tin NOFLAGS; read PROMPT
  DOWNPLAY; eat_ok/`getobj_else`; tinopen. Stash D-1561. `'r'` D-1567.
- D-1567: `'r'` `loot_in_first` put-in then take-out;
  TRADITIONAL yn `rs` + help. traditional_loot / mbag named.
- D-1566: `rndmonst_adj` rogue `monsym_isupper` + elem
  `wrong_elem_type`. newmonhp ×3 / ndemon mkclass named.
- D-1565: `clone_mon` `place_monster` 2D grid. cutworm is D-1570.
- D-1564: Protection early-out + `made_fruit` + Plan-B.
  `newcham` cancel named. Hatch timeout is D-1572.
- D-1563: `do_repeat` / getobj CQ_REPEAT. PREFIXCMD named.
- D-1562: `howmonseen` bitmask. xray IN_SIGHT is D-1571.
- D-1561: stash getobj ALLOWCNT. traditional_loot / mbag named.
- D-1560: `finish_splitting` / `unsplitobj`. `Shk_Your` named.
- D-1559: pickinv `&ctmp`. Hands/xtra is D-1569.
- D-1558: SEARCH/REGEN/XRAY conferral. xray circle is D-1571.
