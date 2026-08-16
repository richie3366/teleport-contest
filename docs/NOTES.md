# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.26/turn` R² 0.86) after cadence **#1405**;
  next @**#1410**.
- Mode: **map-driven** under fortress. Must-fix empty. Open 11
  after D-1107 archive (no refill). Reviews **62** ACCEPT
  (D-1101), **63** ACCEPT-WITH-DEBT (D-1102 live-mon `onscary`
  still named Open), **64–65** ACCEPT (D-1103/D-1104).
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1089**…**D-1107**. Prior **58–61** ACCEPT.
- **Next cluster:** Open `fountain.c` `wash_hands` (named). Not
  Excalibur.
- **Hypothesis:** none live. D-1107 shipped: `dipfountain`
  Excalibur LONG_SWORD body (`exist_artifact`+`artiname`; lawful
  `oname`/`bless`; unaligned curse; ROOM not `dryup`).

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
  `exist_artifact`/`oname` (D-1107).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite after cadence **#1405**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.26/turn` (R² 0.86). Next @**#1410**.
- **D-1107:** `dipfountain` Excalibur LONG_SWORD body. Lawful
  `oname`/`discover_artifact`/`bless`; unaligned curse+`spe--`;
  ROOM+`angry_guards` not `dryup`.
- **D-1106:** `dryup` skips dries-up pline when gbuf cmap is
  `S_cloud` (fog/steam). Poison / shown mon / I still pline.
  Hash `127c045c`.
- **D-1105:** `watchman_warn_fountain` Deaf shake/wave
  (`nolimbs` HEAD else `makeplural(ARM)` + `mhis`). Hash
  `b4930cb9`.
- **D-1104:** `dryup` `angry_guards(FALSE)` after real dryup
  (`isyou && in_town`). Hash `7458a5b8`.
- **D-1103:** `db_under_typ` + `waterbody_name`/`describe_decor`
  `SURFACE_AT`. Hash `130e7e21`.
- **D-1102:** `goodpos_onscary` altar S_VAMPIRE / scare /
  strict Elbereth. Hash `ebe1f041`. Live-mon `onscary` still
  named (Open).
- **D-1101:** `goodpos` `GP_AVOID_MONPOS` `is_exclusion_zone(LR_MONGEN)`
  after boulder. Hash `a7302142`.
- **D-1100:** `goodpos` `passes_walls` + `may_passwall` early-out.
  Hash `305ad188`.
- **D-1099:** `goodpos` youmonst swim/lev/fly/wwalk pool+lava.
  Hash `a6934a3d`.
- **D-1098:** `seffects` SCR_GENOCIDE / `do_class_genocide` /
  `name_to_monclass`. Hash `cdb72162`.
