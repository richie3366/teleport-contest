# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress after audit **#1950** (Scr **11,405**
  RNG **792,838**/792,838 = 100%; `36+0.31/turn`). seed0367 FULL.
  **Hypothesis:** Open `makemon.c` `set_mimic_sym`
  Protection_from_shape_changers early-out is still named
  (`do_repeat` / getobj CQ_REPEAT is D-1563). Not DELPHI. Not
  block_point.
  **Falsify:** `node scripts/csym.mjs set_mimic_sym` vs
  `js/makemon.js` Protection_from_shape_changers.
  **Next:** Open Protection. Not `made_fruit`. Not Plan-B.
  Do not skip D-1531…D-1563. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`.
- Named still: cutworm; Protection; `made_fruit`; Plan-B;
  Palantir `#if 0`; `'r'` reversed; eat/read/zap/tin
  NOFLAGS; pickinv hands/xtra; `mk_mplayer`; FULL_MOON S_DOG /
  ustuck / `redraw_worm`; other mcast; sit/pray `eyecount`; muse
  loot; escape cat HP; other INTERNALCMD; defn/cary resist;
  PROTECT; inv_prop drop; `artitouch`; shk mnearto; ghostfruit
  age; Ice/Boulder fills; `rndmonst_adj`; `place_monster` 2D;
  map_monst head glyphs; `unblock_point`/`dig_point`;
  `vision_recalc` xray IN_SIGHT; `Shk_Your`; dothrow/apply
  unsplitobj callers; PREFIXCMD / movement / doextcmd
  `cmdq_shift` REPEAT.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1563.
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
  nhcore (D-1066). Do not skip D-1067…D-1563 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not skip D-1520…D-1563. Do not delete emin
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
  use `recalc_block_point` there. `namefloorobj` D-1555;
  mhidden D-1554. Do not skip SEARCH/REGEN/XRAY (D-1558) or leave
  Eyes `setworn` without it. Do not skip pickinv `&ctmp`
  (D-1559) or `finish_splitting` (D-1560) or stash getobj
  (D-1561) or `howmonseen` (D-1562) or `do_repeat` (D-1563). Do not glue cutworm /
  `'r'` reversed.

## Landmarks (≤15)

- D-1563: `do_repeat` / getobj CQ_REPEAT. `!in_doagain` INT+KEY
  record; `cmdq_pop` REPEAT; Ctrl-A / `#repeat` copy-restore.
  PREFIXCMD / movement / doextcmd `cmdq_shift` / eat/read/zap/tin
  NOFLAGS named. howmonseen is D-1562. canned INT is D-1551.
- D-1562: `howmonseen` bitmask. NORMAL `cansee&&couldsee` or
  `worm_known`; SEEINVIS/INFRAVIS/TELEPAT/XRAYVIS/DETECT/WARNMON.
  use_mirror SEENMON vs INFRAVIS-only; look `[seen:]` (look_all
  NULL). mdistu inlined. cutworm / xray IN_SIGHT named.
  stash is D-1561. worm_known is D-1548.
- D-1561: stash getobj ALLOWCNT. `stash_ok`/`ck_bag`; prompt
  `|ALLOWCNT`; `in_container` worn/quest/loadstone/uwep +
  `unsplitobj` on refuse. `'r'` reversed / traditional_loot /
  mbag / icebox / snuff_lit named. `finish_splitting` is D-1560.
- D-1560: `finish_splitting` / `unsplitobj` / `clear_splitobjs`.
  getobj child own invlet; welded/already/gold unsplit; ynq
  split-one/rest. `Shk_Your` / dothrow/apply unsplit callers
  named. pickinv is D-1559.
- D-1559: pickinv `&ctmp` menu count. n==1 `-1`; PICK_ONE digits
  `selected[0].count`; ALLOWCNT throw/drop/wield/ready/charge/
  adjust/stash. hands/xtra / force_invmenu redo / gacc named.
  canned CMDQ_INT is D-1551.
- D-1558: SEARCH/REGEN/XRAY conferral. Excalibur ESearching;
  Trollsbane/Staff ERegeneration; Eyes `xray_range` 3/-1 +
  `setworn` W_TOOL. Not Protection. vision_recalc xray circle
  named. cspfx is D-1539.
- D-1557: `set_mimic_sym` `does_block` then `block_point` /
  `fill_point`. Export `does_block` (0/1/2; fmon). Not
  `recalc` (would unblock). Protection / Plan-B / `made_fruit`
  / `unblock_point` named. DELPHI is D-1556.
- D-1556: DELPHI `S_fountain=37` not stub 0. `rn2(2)` STATUE
  else cmap. Not furnsyms. Door first. `block_point` is D-1557.
- D-1555: `namefloorobj` getpos + vobj_at / object_from_map +
  Hallu unames + `call_ok` at C home. docallcmd m/o/d named.
- D-1554: `mhidden_description` PREFIX/ARTICLE/ALTMON/REGION.
  look/appear/probe/flash. Memory otyp vs glyph_at.
- D-1553: `splev_create_monster` amask + non-RANDOM `mk_roamer`.
  `mk_mplayer` / appear_as named.
- D-1552: Eyes `is_plural` + `undiscovered_artifact`. `otense` /
  `obj_is_pname` / `discover_artifact`.
- D-1551: canned CMDQ_INT then KEY + `split_otmp`. eat/read/zap
  / tin NOFLAGS named. `in_doagain` REPEAT is D-1563.
- D-1550: trap `monkilled` `wormno ? worm_known : cansee(head)`
  (**509**). `howmonseen` is D-1562.
- D-1548: `worm_known` any wseg `cansee`; `_canseemon` skips
  infrared when `wormno`.
