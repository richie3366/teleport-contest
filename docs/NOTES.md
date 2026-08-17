# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.87) after cadence **#1440**;
  next @**#1445**. Mode: **map-driven** fortress. Must-fix empty.
  Open refill to 12 after D-1136 archive. Reviews **90–93** ACCEPT /
  **92** ACCEPT-WITH-DEBT (eel `Underwater` sticky named).
- Public LB / cron / hub CDN: **out of scope** (human).
- **Next cluster:** Open `region.c` `make_gas_cloud` enveloped
  pline. Not create_gas_cloud size-1.
- **Hypothesis:** none live. Cadence #1440 fortress held. D-1136 shipped.

## Don't re-check (≤15)

- Do not predict / amend **Addressed** HASH (chicken-egg). Stamp
  `D-NNNN` in the fix; next real commit fills `%h`. Live queue is
  unchecked-only — `archive-loop-queue-done.mjs` in the same commit.
- Don't re-apply D-0480 **glyph** `tty_map_color` (D-0483).
- Don't skip painting `disp_ch===' '` in flush (D-0931).
- Don't emit mid-row space runs >4 as literal spaces (D-0931).
- Do not FORCE shk satdoor/`onlineu` (D-0376) or linedup/FlipX (#1092).
- Do not blanket-restore overlay `_pending_message` (D-0929).
- Do not HEAVY_IRON_BALL `owt!=0` (#1194). Judge does **not** elide
  RC (D-0933); do not extend §1.2. Do not chase public LB in-loop.
- Do not push shared `maketrap` PIT morph (D-0972).
- Do not memcpy gi worn/ball pointers (D-1035) / `setnotworn` from
  `owornmask` (D-1020) / `delobj` tutorial loot / off-level timers
  (D-1037) / omit `msounds[]` (D-1053).
- Do not restore tut-1 hardcoded keys (D-1065) / skip `tutorial()`
  nhcore (D-1066) / dosit `"your steed"` (D-1067) / skip hider clear
  (D-1068) / Levitation-only `dosit` (D-1069) / sticky `u.Levitation`
  in `can_reach_floor` (D-1070).
- Do not skip hugs (D-1071) … priest/guardian mndx (D-1088) /
  restore sit Antimagic H||E-only (D-1089) / restore `is_pool`
  POOL/MOAT/WATER-only (D-1090) / restore `goodpos` `IS_POOL`/
  `IS_LAVA` macros (D-1091) / invent `S_ELF` mlet (D-1092) /
  restore dogmove string `'MS_LEADER'` (D-1093) / restore
  MS_NEMESIS mitem `urole.neminum` (D-1094) / skip rust/`minliquid`/
  uhitm AD_COLD `split_mon` (D-1095) / skip `dryup` wizard `y_n` or
  add `debug_fuzzer` skip there (D-1096) / skip `dryup`
  `angry_guards` after real dryup (D-1104) / skip Deaf shake/wave
  in `watchman_warn_fountain` (D-1105) / always-pline `dryup` when
  cansee or skip poison/`!cmap` (D-1106) / skip `kill_eggs` or
  port TIN/CORPSE `#if 0` (D-1097) / skip `seffects` SCR_GENOCIDE
  or `do_class_genocide` / `name_to_monclass` (D-1098) / restore
  youmonst `goodpos` pool/lava to monster `is_swimmer`/`m_in_air`
  (D-1099) / skip `goodpos` `passes_walls`/`may_passwall` or use
  youprop Passes_walls there (D-1100) / skip `goodpos`
  `is_exclusion_zone(LR_MONGEN)` or run it before wallwalk/pool
  (D-1101) / restore `goodpos_onscary` human/angel-only stub or
  pull live-mon `onscary` into it (D-1102) / restore
  `waterbody_name` raw DRAWBRIDGE_UP typ or skip `db_under_typ`
  (D-1103) / restore Excalibur `dryup` stub or skip
  `exist_artifact`/`oname` (D-1107) / restore `wash_hands`
  ER_NOTHING stub or skip Glib `ER_GREASED` (D-1108) / restore
  vault raw `exclusion_zones` or skip `lspo_exclusion` (D-1109) /
  restore `goodpos` always-`goodpos_onscary` (D-1110) /
  restore teleok any-trap reject (D-1111) / restore
  `mlevel_tele_trap` LEVEL_TELEP/NO_TRAP early-return, skip
  amulet/`is_home_elemental` before `rn2(7)`, or always-mconf
  xport (D-1112) / restore dipsink cancel or skip
  `wash_hands`/`polymorph_sink` from it (D-1113) / restore
  dipfountain uncurse 17–20 no-op (D-1114) / restore
  dipfountain case 29 empty break or skip looted gate
  (D-1115) / skip `drinkfountain` case 19 enlightenment or route
  MAGIC-only through `doattributes` BASIC ^X (D-1116) / restore
  gush `void mtmp` newsym-only or skip iron-golem rust /
  `xkilled` drown when `!mon_moving` (D-1117) / skip drinksink
  case 10 `polyself` or Unchanging-only H (D-1118) /
  skip teleok `tele_jump_ok`/`in_out_region` after goodpos
  (D-1119) / restore tele_trap silent AM or deltrap-before-wrenching
  (D-1120) / skip `teleds` `fill_pit` after `u_on_newpos` or
  restore that call deferred (D-1121) / skip Wizard stair
  `goodpos` or `control_mon_tele` (D-1122) / skip `rloc_to`
  `remove_worm`/tail re-place or ustuck-swallow `docrt` /
  grab `!m_next2u` `unstuck` (D-1123) / skip drinksink case 13
  `create_gas_cloud` (D-1124) / restore always-snakes skip of
  Hallucination `rndmonnam` (D-1125) / skip drinkfountain case 24
  `update_inventory` or restore `void buc_changed` (D-1126) / skip
  `eat.c` `vomit` cantvomit/Sick/FAINTING/acid `ubreatheu` or restore
  void spewed (D-1127) / skip `dodip` pool yn or restore `IS_POOL`
  for `at_pool` / skip `can_reach_floor` / skip hands `wash_hands`
  or `water_damage` (D-1128) /   skip `teleds` dest-typ `switch_terrain`
  (D-1129) / skip `teleds` `update_player_regions` (D-1130) / skip
  `teleds` `hideunder`/mimic (D-1131) / skip `teleds` TT_BURIEDBALL `buried_ball_to_punishment` (D-1132) / skip `tele_trap` teledest/`tele()` or nest `next_to_u` inside `once` (D-1133) / skip dipfountain post-switch `update_inventory` or restore Excalibur `:441` as this peel (D-1134) / restore drinksink identity `hcolor` or treat pref as last choice / skip Hallu at gameover (D-1135) / skip mongrantswish tmp_at hide (D-1136).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite **#1440** **44**/44 Scr **11405**/11405 RNG **100%**. Next @**#1445**. **D-1135:** `b166bda5`. **D-1134:** `5f55ceba`. **D-1133:** `a956e990`. **D-1132:** `a8d04dd2`. **D-1131:** `00956ae8`. **D-1130:** `6dd7a794`. **D-1129:** `410f22a2`.
