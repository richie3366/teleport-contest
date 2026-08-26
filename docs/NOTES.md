# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).
Objective/score live in `CURRENT.md`.

## Active

- **Fortress 44/44** after audit **#1900** HEAD `79744185`
  (Scr **11,405** RNG 100%, `37+0.30/turn` R² 0.85).
  **Next:** Open `makemon.c` `set_mimic_sym`
  maze/sokoban/`in_town` (named). Not shop arm.
  D-1516 S_LIZARD skip + PM_NINJA kit shipped.
  Do not skip D-1516…D-1229. No FORCE / `wildmiss` wrap /
  trailing `confdir` in shared `getdir`. pickup
  `body_part` is latebound (polyself→do cycle);
  do not import pickup→polyself.
- Do not revert D-1217–D-1516. Named still:
  `see_monsters` worm segs; timeout
  `visible_region_summary`; display `show_region`;
  GETOBJ_ALLOWCNT; tamedog is_covetous /
  is-demon-vs-hero; INTERNALCMD `#altdip`; options
  fruitadd walker; doname fake_arti / bones
  `goodfruit` / `reorder_fruit`; wander/`somexy` /
  Wiz_arrive; mktrap_victim floor candle;
  `set_mimic_sym` maze; dprince/raven;
  `mcast_blind_you` EYE; `observe_quantum_cat` FOOT;
  cspfx W_ART WARN; invent W_ART conferral.

## Don't re-check (≤15)

- Stamp `D-NNNN` in the fix; next commit fills `%h`. Same-commit archive.
- Do not revert D-0078 H2344 or hardcode offx 72 (D-1185).
- Do not treat `g` as Unknown or inner-`parse` after it (D-1186).
  Do not skip ParanoidTrap portal yn (D-1187) / `domagicportal` /
  `undestroyable_trap` / `mktrap` dst / `goto_level` uz0 (D-1188).
- Do not restore rhack raw-ETX (D-1189). Do not skip D-1190…D-1516.
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
  nhcore (D-1066). Do not skip D-1067…D-1516 (index).
- Named still: worm-shrieker; GETOBJ_ALLOWCNT / tamedog is_covetous;
  options fruitadd walker; `ensure_way_out`. Do not re-add a
  fourth town gnome in `load_minetn_7` (D-1513).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` / other `Antimagic()` clones (D-1060 / D-1085 /
  D-1089).
- Do not pull `reset_glyphmap` / `notice_all_mons` /
  `makemap_remove_mons` / savelev-freeing / lua `lspo_reset_level`
  / `restore_artifacts`. Default `spot_monsters` Off.
- Do not import `wield.js`/`pickup.js`→`polyself.js` for
  `body_part` (use `objnam.js` `body_part_latebound`).
- Do not call JS `fruitadd` at init after objects exist
  (candifies `"slime mold"`). `init_fruit_chain` only.

## Landmarks (≤15)

- D-1516: S_LIZARD non-salamander `!is_armed` skip
  (C `if (mm==PM_SALAMANDER)` else break; D-0556 kit kept).
  Same function PM_NINJA `rn2(4)` SHURIKEN|DART then
  SHORT_SWORD|AXE. Live `mongets`. G_NOGEN until quest.
  `set_mimic_sym` maze / dprince/raven named.
- D-1515: S_KOP `m_initweap` `!rn2(4)` cream pies
  (`m_initthrow` quan 3–4) then `!rn2(3)` CLUB or
  RUBBER_HOSE. Live callees. G_NOGEN until `makekops`.
- D-1514: SPFX_WARN conferral `spec_m2` → EWarn_of_mon +
  warntype.obj + see_monsters; else EWarning. MATCH_WARN
  in sensemon / newsym see_it / display_warning
  mon_to_glyph. cspfx W_ART / worm segs named.
- D-1513: minetn-7 town floor three `gnome` then gnome
  lord + two monkeys (lua `:155–165`). Extra fourth
  `splev_room_monster` deleted (review **465**). Nested
  / stair gnomes unchanged. `ensure_way_out` named.
- D-1512: `any_visible_region` first `visible && ttl != -2`;
  allmain once-per-input else-if OR after Warn_of_mon.
  C is `region.c` not display.c. Hallu arm unchanged.
  timeout `visible_region_summary` / display `show_region`
  named.
- D-1511: `fruit_from_indx` by fid; xname/doname SLIME_MOLD
  `fname` / `"fruit"` / quan ick; `init_fruit_chain` fid 1
  before mksobj. killer_xname still deadly slime mold.
  options fruitadd walker / fake_arti / goodfruit named.
- D-1510: `poly_obj` invent worn remap — W_WEAPONS keep
  slot else `wearslot&old`; `remove_worn_item` then
  `setuwep`/`setuswapwep`/`setuqwep` or `setworn`+
  `set_wear`+`wearmask_to_obj`. `poly_obj` async.
  addinv_core / sokoban_guilt / egg/leash named.
- D-1509: `potion_dip` lichen CORPSE + POT_ACID wrinkle /
  `hcolor` (Blind/diluted) no-poof + `trycall`; else
  `erode_obj` ERODE_CORRODE EF_GREASE poof unless
  ER_NOTHING. Worn `set_wear` is D-1510. H2O is D-1501.
- D-1508: `body_part` aliases — mcastu `HEAD` via
  `polyself.js`; pickup `HAND` via latebound
  (`u_handsy` / `able_to_loot` / Sokoban boulder).
  `mcast_blind_you` EYE / quantum-cat FOOT named.
- D-1507: `makemon` random loop Sokoban first-try
  `throws_rocks` (`tryct==1` reject before `goodpos`).
  Later tries fair game. Explicit ptr skips. S_KOP is
  D-1515; S_LIZARD/ninja is D-1516.
- D-1506: `m_initinv` S_GNOME `!mpickobj && !levl.lit` →
  live `begin_burn`. Merge-freed skip. mktrap_victim floor
  candle named.
- D-1505: `mon_arrive` After_you `MIGR_LEFTOVERS` →
  `deliver_obj_to_mon` DF_ALL after xyloc, before
  `my=xyflags`/place. With_you returns first.
  wander/`somexy` named. stolen_booty D-1363.
- D-1504: minetn-7 Bazaar Town `load_special`; nested 30×15
  `des.room` + percent(75) nests + chance shops + pos=0 door
  + sink + temple. Town gnome count is D-1513.
  `ensure_way_out` named.
- D-1503: minetn-6 Bustling Town `load_special`; solidfill then
  mines lit=1 bg HWALL; top-aligned `'x'` skip map; shops/temple.
  `ensure_way_out` named.
- D-1502: `arti_invoke` TAMING/CHARGE_OBJ/CREATE_PORTAL/BANISH;
  `seffect_taming`/`charge_ok`/`recharge`; `tamedog` MANFOOD.
  GETOBJ_ALLOWCNT named. Palantir `#if 0`. H2O dip D-1501.
