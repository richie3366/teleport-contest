# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `32+0.27/turn` R² 0.87) after cadence **#1390**;
  next @**#1395**.
- Mode: **map-driven** under fortress. Must-fix empty. Open 8
  after **D-1095** (no refill; still ≥8). Reviews **50–53**
  **ACCEPT** (D-1089…D-1092); no new Must-fix.
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1089**…**D-1095**. Prior **46** ACCEPT,
  **47** ACCEPT-WITH-DEBT, **48** QUALITY-RISK closed by
  D-1089, **49** ACCEPT.
- **Next cluster:** Open `fountain.c` `dryup` wizard yn (named).
  Not angry_guards.
- **Hypothesis:** none live. D-1095 shipped: rust/`minliquid`/
  uhitm AD_COLD call `split_mon`; `healmon` monster arm.

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
  uhitm AD_COLD `split_mon` (D-1095).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite after cadence **#1390**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `32+0.27/turn` (R² 0.87). Next @**#1395**.
- **D-1095:** rust/`minliquid`/uhitm AD_COLD `split_mon` callers.
  `healmon` monster arm. Drown/mhitu/mhitm/cmd still named.
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
- **D-1088:** `m_initweap`/`m_initinv` MS_PRIEST/MS_GUARDIAN
  `ptr.msound`. Hash `049af16e`.
