# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2160** at `1f6d5487`, R² 0.859).
  Save-oracle for tagged restore Open. Private B0 unchanged (catchup
  26/30 red; shop 35/35 no unpaid). **Next:** Open `mhitu.c`
  `doseduce`. Not getyear. Falsify: C `doseduce` vs D-1742 `getyear` /
  D-1749 feel_location tails. Do not skip D-1531…D-1749. Do not
  re-port D-1675…D-1749.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham`; setworn oc_oprop; keepdogs leash; `initedog`; tip-spill;
  hideunder; Punished float_down; water/lava
  steed; interned `'yn'`; dokick `hidden_gold_kick`; `delobj` extract;
  mthrowu/uhitm poison; SetVoice; heaven `u_left_shop`;
  STRAT_HEAL; `swallow_cell` sticky Hallu; eat.js useup+useupf hybrid;
  `doseduce`/`ld()`; make_blinded Sting(-1);
  `random_trap_to_glyph`;
  integer `GLYPH_*_OFF` / `map_monst` / ridden glyphs.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1749.
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
  nhcore (D-1066). Do not skip D-1067…D-1749 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`.   Do not skip
  D-1520…D-1749. Do not delete emin (**487**). Do not stub
  `make_happy_shk` pacify-only (D-1540). Do not import bones→options
  for fruitadd (D-1541).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / binary savelev-freeing / lua `lspo_reset_level`.
  JSON `cant_go_back` analogue is D-1722. JSON `restore_artifacts` is
  D-1698. Default `spot_monsters` Off.
  Do not keep timeout.c `mon_is_local` for LS_MONSTER lights (D-1708).
  Do not stamp every `fmon` in `update_mlstmv` (D-1709).
- Do not import `wield.js`/`pickup.js`→`polyself.js` for `body_part`
  (`objnam.js` `body_part_latebound`). No makemon→hack/`artifact`/
  `minion`. No fourth town gnome. Do not stub door/furnsyms/DELPHI
  (D-1536/D-1543/D-1556). Do not skip `block_point` (D-1557). Do not
  revert D-1574 `dig_point`/`seemimic` or global `recalc` as
  `vision_reset`.   No yn ^P glue / `ing_suffix` clone #3 / InvInUse
  poke (D-1603) / zap sticky Blind (D-1604).   No `dat/tribute` indent=2.
  No static `files.js`←`spell.js` (TDZ). REST_LEVELS where getlev
  catchup reads it. Do not re-port D-1682…D-1749. D-1749 is
  feel_location `is_worm_tail` + Blind dopush (not levitate-arm /
  `doseduce` / Sting(-1)). D-1748 pet/detected glyphs (not
  `GLYPH_*_OFF` / `map_monst` / `doseduce`). D-1747 I-glyph unmap.
  D-1746 MON_STILL_ARRIVING. D-1745 !cansee DETECTED. D-1744
  `possibly_unwield`. D-1743 `dealloc_obj`. D-1742 `getyear` (not
  `doseduce`). D-1741 get_valuables. D-1740 shop_debt. No trailing
  `confdir` in shared `getdir`.

## Landmarks (≤15)

- D-1749: `feel_location` `:901–908` is_worm_tail overlay
  (`_suppress_map_output`; `engr_can_be_felt`; cmap S_room/S_litcorr
  darken; Blind `dopush` dest+source). Live `display.js` + `hack.js`.
  Named: levitate-arm do_room_glyph/litcorr; Levitation Blind feel;
  `doseduce`; make_blinded Sting(-1).
- D-1748: `display_monster` `:587–618` pet_to_glyph /
  detected_mon_to_glyph / petnum (no what_mon on tame tails). tty
  MG_PET then MG_DETECT inverse. Live `display.js`. Named: integer
  `GLYPH_*_OFF`; `map_monst`; ridden.
- D-1747: `show_mon_or_warn` `:481–496` unmap I then cansee
  `vobj_at` `map_object(o, FALSE)`. Callers `display_monster` /
  `display_warning`. Live `display.js`. Named: make_blinded
  Sting(-1).
- D-1746: `see_monsters` `:1508–1509` MON_STILL_ARRIVING
  continue. `monst.h` 0x100; `mon_arrive` set/clear. Live
  `display.js` + `const.js` + `dog.js`. Named: make_blinded Sting(-1).
- D-1745: `newsym` `:1046–1054` !cansee
  `display_monster(..., see_it ? 0 : DETECTED)`. Live `display.js`.
  Pet/detected glyphs are D-1748.
- D-1744: `possibly_unwield` `:746–795` + `setmnotwielded`
  `:1813–1828` + `mwepgone`. Live `weapon.js` + newcham/were.
  Named: steal_it / mhitm_ad_sitm; m_throw setmnotwielded;
  mon_break_armor; extract mwepgone inline.
- D-1743: `dealloc_obj` `:2744–2811` + `dobjsfree` `:2830–2843`.
  Live `mkobj.js`/`light.js`. Named: `delobj` extract; zap
  `delete_contents` clone; nhl leftover; makemap_prepost.
- D-1742: `getyear` `:48–52` `1900+getlt()->tm_year`. Live
  `calendar.js`. Named: `doseduce`/`ld()`; dump_fmtstr / paniclog.
- D-1741: `get_valuables` `:762–791` + `sort_valuables` `:797–818`
  + ESCAPED/ASCENDED score/list. Live `end.js`. Named: pet HP;
  Schroedinger score; DUMPLOG.
- D-1740: `shop_debt` `:989–999` + `shopper_financial_report`
  `:1002–1035`. Live `shk.js` + `doprgold`. Named: dokick
  `hidden_gold_kick`; `costly_gold`.
- D-1739: `display_monster` `:564–575` fake obj → `map_object(&obj,
  !sensed)`. Live `display.js`. Pet/detected glyphs are D-1748.
- D-1738: `cmap_to_glyph` trap/zap/cmap-C + `explosion_to_glyph`.
  Live `display.js`/`explode.js`/`const.js` S_* 49–87/96–104.
  Named: drawbridge 42–45; You_hear vs Boom!.
- D-1737: `newsym` `:1013–1029` Detect_monsters cansee. Live
  `display.js`. Pet/detected glyphs are D-1748 (!cansee DETECTED is
  D-1745).
- D-1736: `display_monster` `:518–519` Protection || sensemon. Live
  `display.js`. Pet/detected glyphs are D-1748.
- D-1735: `useup` `:1320–1333`. Live `invent.js`; write.js import.
  Named: eat.js hybrid; detect/potion/read/spell clones. dealloc_obj
  is D-1743.
