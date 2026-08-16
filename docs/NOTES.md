# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.87) after cadence **#1395**;
  next @**#1400**.
- Mode: **map-driven** under fortress. Must-fix empty. Open 9.
  Reviews **54** ACCEPT-WITH-DEBT (D-1093 `score_targ` wrap
  named), **55–57** ACCEPT (D-1094…D-1096); no new Must-fix.
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1089**…**D-1099**. Prior **50–53** ACCEPT.
- **Next cluster:** Open `teleport.c` `goodpos` `passes_walls` +
  `may_passwall` early-out (named). Not youmonst swim.
- **Hypothesis:** none live. D-1099 shipped: youmonst pool/lava
  uses youprop Swimming/Amphibious/Levitation/Flying/Wwalking
  (and lava Fire+Wwalk+oerodeproof / Upolyd likes_lava).

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
  add `debug_fuzzer` skip there (D-1096) / skip `kill_eggs` or
  port TIN/CORPSE `#if 0` (D-1097) / skip `seffects` SCR_GENOCIDE
  or `do_class_genocide` / `name_to_monclass` (D-1098) / restore
  youmonst `goodpos` pool/lava to monster `is_swimmer`/`m_in_air`
  (D-1099).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite after cadence **#1395**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.87). Next @**#1400**.
- **D-1099:** `goodpos` youmonst swim/lev/fly/wwalk pool+lava.
  Hash next SHA. `passes_walls`/`may_passwall` still named.
- **D-1098:** `seffects` SCR_GENOCIDE / `do_class_genocide` /
  `name_to_monclass`. Hash `cdb72162`. livelog / Hallu / POLY_REVERT
  / cham `newcham` / `update_inventory` still named.
- **D-1097:** `kill_eggs` after genocide. Hash `d1e7ae23`.
  TIN/CORPSE `#if 0`; cham `newcham`; goto_level caller named.
- **D-1096:** `dryup` wizard `y_n("Dry up fountain?")` after town
  warn. Hash `bd16c130`. `'n'` abort. `angry_guards` still named.
- **D-1095:** rust/`minliquid`/uhitm AD_COLD `split_mon` callers.
  Hash `a86a7111`. Drown/mhitu/mhitm/cmd still named.
- **D-1094:** `role_init` quest-pm overlay + makemon mitem
  `ptr.msound == MS_NEMESIS`. Hash `46775b20`.
- **D-1093:** `dogmove` pal/target `ptr.msound` numeric
  MS_LEADER=36 / MS_GUARDIAN=38. Hash `e0b68f1d`.
- **D-1092:** `makemon` S_ORC `Race_if(PM_ELF)` hostile;
  `is_unicorn` co-align always peaceful. Hash `c3f28bfd`.
- **D-1091:** `goodpos` `is_pool()`/`is_lava()` not typ macros.
  Hash `278521f1`.
- **D-1090:** `is_pool`/`is_moat` DRAWBRIDGE_UP+`DB_MOAT`.
  Hash `43caa8ff`.
- **D-1089:** sit `rndcurse` `Antimagic()` ORs
  `uprops[ANTIMAGIC]`. Hash `f91650c0`.
