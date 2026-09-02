# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Suite 44/44** fortress (cadence **#2140** at `4bc17535`, R² 0.863).
  Save-oracle for tagged restore Open. Private B0 unchanged (catchup
  26/30 red; shop 35/35 no unpaid). **Next:** Open `display.c`
  cmap_to_glyph trap/zap/expl. Not furniture lastseentyp. Falsify:
  trap/zap/expl cmap ids, not lastseentyp furniture. Do not skip
  D-1531…D-1737. Do not re-port D-1675…D-1737.
- Named still: Palantir `#if 0`; pit/underwater; clone auto-open yn;
  `rescham`; setworn oc_oprop; keepdogs leash; `initedog`; tip-spill;
  hideunder; newsym !cansee DETECTED; mimic `map_object`; Punished
  float_down; water/lava steed; interned `'yn'`; shopper_financial_report;
  dokick `hidden_gold_kick`; `dealloc_obj`; get_valuables; mthrowu/uhitm
  poison; SetVoice; heaven `u_left_shop`; STRAT_HEAL; `swallow_cell`
  sticky Hallu; eat.js useup+useupf hybrid.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown (D-1186). PREFIXCMD inner parse is D-1582.
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1737.
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
  nhcore (D-1066). Do not skip D-1067…D-1737 (index).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop`. Do not re-port `eyecount`. Do not skip
  D-1520…D-1737. Do not delete emin (**487**). Do not stub
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
  `vision_reset`. No yn ^P glue / `ing_suffix` clone #3 / InvInUse
  poke (D-1603) / zap sticky Blind (D-1604). No `dat/tribute` indent=2.
  No static `files.js`←`spell.js` (TDZ). REST_LEVELS where getlev
  catchup reads it. Do not re-port D-1682…D-1737. D-1737 is newsym
  Detect_monsters cansee (not !cansee `display_monster`). D-1736 is
  Protection sensed (not Detect_monsters cansee). D-1735 is write.c
  `useup` (not Protection). D-1734 is `what_mon` (not Protection).
  D-1733 is `u_left_shop`/`choose_stairs` (not remote_burglary).
  D-1727 is useupall/obfree. Do not add trailing `confdir` in shared
  `getdir`.

## Landmarks (≤15)

- D-1737: `newsym` `:1013–1029` Detect_monsters cansee. Live
  `display.js`. Named: !cansee DETECTED; pet/detected glyphs.
- D-1736: `display_monster` `:518–519` Protection || sensemon. Live
  `display.js`. Named: map_object observe.
- D-1735: `useup` `:1320–1333`. Live `invent.js`; write.js import.
  Named: eat.js hybrid; detect/potion/read/spell clones; `dealloc_obj`.
- D-1734: `display_monster` `:579–584` `what_mon`. Live `display.js`.
  Named: pet/detected glyphs.
- D-1733: `u_left_shop` `:578–625` + `choose_stairs` `:330–364`.
  Named: SetVoice; heaven caller; STRAT_HEAL.
- D-1732: `obj.h` `:260–268` + `permapoisoned`. Named: mthrowu/uhitm.
- D-1731: `doprgold` + `hidden_gold(FALSE)`. Named: shopper report.
- D-1730: `artifact_score` count+list. Named: get_valuables.
- D-1729: `getdir` CQ_REPEAT. Named: mouse; no trailing `confdir`.
- D-1728: `yn_function_menu`. Named: interned `'yn'`.
- D-1727: `useupall`/`obfree`. Named: `dealloc_obj`.
- D-1726: furniture lastseentyp. Named: !cansee DETECTED.
- D-1725: `hhmmss`. Named: dump_fmtstr / paniclog / `getyear`.
- D-1724: `recalc_mapseen` sokoban/rogue/quest flags.
- D-1723: `lspo_object` non-merge quan. Named: other `des.object`.
