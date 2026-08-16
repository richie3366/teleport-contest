# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.87) after cadence **#1385**;
  next @**#1390**.
- Mode: **map-driven** under fortress. Must-fix empty. Open 9
  after **D-1089** (≥8; no refill).
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1085**…**D-1089**. Reviews **46** ACCEPT,
  **47** ACCEPT-WITH-DEBT, **48** QUALITY-RISK (Antimagic
  uprops shipped D-1089), **49** ACCEPT.
- **Next cluster:** Open `dbridge.c` `is_pool` / `is_moat`
  DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`.
- **Hypothesis:** `hack.js` `is_pool`/`is_moat` still
  `IS_POOL`/`MOAT` only; C `dbridge.c` also DRAWBRIDGE_UP +
  `DB_MOAT`. Falsifier: DRAWBRIDGE_UP cell with `DB_MOAT`
  under → `is_pool`/`is_moat` true (same shape as D-1077 lava).

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
  restore sit Antimagic H||E-only (D-1089).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085 /
  D-1089). Do not rewrite other `Antimagic()` clones this peel.

## Landmarks (≤15)

- Suite after cadence **#1385**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.87). Next @**#1390**.
- **D-1089:** sit `rndcurse` `Antimagic()` ORs
  `uprops[ANTIMAGIC]`. Review **48** Must-fix. Hash next commit.
- **D-1088:** `m_initweap`/`m_initinv` MS_PRIEST/MS_GUARDIAN
  `ptr.msound`. Review **49** ACCEPT.
- **D-1087:** `shieldeff` body matches `display.c`. Review **48**
  QUALITY-RISK closed by D-1089.
- **D-1086:** steal.c `remove_worn_item` armor `*_off` /
  `unpunish` / `setnotworn`. Review **47** ACCEPT-WITH-DEBT
  (`Amulet_off` still setworn).
- **D-1085:** engrave `Flying()` ORs `uprops[FLYING]`. Review
  **46** ACCEPT (hash `3e1a74e8`).
- **D-1084:** wizard getlin. Review **45** ACCEPT.
- Filled D-1088 archive hash `049af16e` prior SHA.
