# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.26/turn` R² 0.87) after cadence **#1410**;
  next @**#1415**.
- Mode: **map-driven** under fortress. Must-fix empty. Open 11
  after archive (no refill). Reviews **66** ACCEPT (D-1105),
  **67** ACCEPT-WITH-DEBT (D-1106), **68–69** ACCEPT
  (D-1107/D-1108).
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1089**…**D-1112**. Prior **62–65** ACCEPT
  / 63 ACCEPT-WITH-DEBT.
- **Next cluster:** Open `fountain.c` `dipsink` (named). Not
  wash_hands.
- **Hypothesis:** none live. D-1112 shipped: `mlevel_tele_trap`
  MAGIC_PORTAL stay (amulet || home-elemental || `rn2(7)`);
  LEVEL_TELEP `random_teleport_level`/`get_level`; NO_TRAP
  `onscary(0,0)` stay else same-level migrate; xport mconf
  iff `!control_teleport`. Hole dest unchanged.

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
  xport (D-1112).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite after cadence **#1410**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.26/turn` (R² 0.87). Next @**#1415**.
- **D-1112:** `mlevel_tele_trap` MAGIC_PORTAL/LEVEL_TELEP/NO_TRAP.
  Endgame amulet/home-elemental/`rn2(7)`; LEVEL_TELEP
  `random_teleport_level`; NO_TRAP `onscary(0,0)`; xport mconf
  iff `!control_teleport`. valley/botlevel-avoid/hero named.
- **D-1111:** `teleok` VIBRATING_SQUARE always ok; pit/hole iff
  Levitation||Flying. Hash `b0847b88`.
- **D-1110:** live-mon `onscary` when `m_id != 0`. Hash `fd738eab`.
- **D-1109:** `lspo_exclusion` populate. Hash `5bf81ca7`.
- **D-1108:** `wash_hands`. Hash `62b93acb`.
- **D-1107:** dipfountain Excalibur. Hash `0633a261`.
- **D-1106:** `dryup` S_cloud skip. Hash `127c045c`.
- **D-1102:** `goodpos_onscary` altar/scare/Elbereth. Hash `ebe1f041`.
