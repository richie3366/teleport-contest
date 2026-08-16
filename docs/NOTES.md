# Working notes (scratchpad)

Not a progress log. Keep ≤100 lines. See `.cursor/rules/agent-notes.mdc`.
Objective/score live in `CURRENT.md`.

---

## Active

- Local suite **44**/44 (Scr **11405**/11405 RNG **100%**
  speed `31+0.27/turn` R² 0.88) after cadence **#1380**;
  next @**#1385**.
- Mode: **map-driven** under fortress. Must-fix empty. Open
  10 after **D-1087** (≥8; no refill).
- Density: one semantic cluster (~50–300 LOC). Review + full
  `sessions` together every 5.
- Public LB / cron / hub CDN: **out of scope** (human).
- Latest ports: **D-1081**…**D-1087**. Reviews **42** ACCEPT,
  **43** QUALITY-RISK (Flying Must-fix shipped D-1085), **44**
  ACCEPT, **45** ACCEPT.
- **Next cluster:** Open `makemon.c` `m_initweap` `ptr.msound`
  for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not
  peace_minded.
- **Hypothesis:** `m_initweap` still gates guardian/priest kits
  on `mndx` not `ptr.msound`. Falsifier: a monster with
  `msound` MS_GUARDIAN/MS_PRIEST but a non-kit `mndx` must take
  the C `ptr.msound` weapon arm like `makemon.c`.

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
- Do not skip hugs (D-1071) / lap (D-1072) / picnic teeter (D-1073) /
  meager (D-1074) / having-fun egg (D-1075) / pit `dotrap` stub
  (D-1076) / `is_lava` LAVAPOOL-only (D-1077) / `split_mon` null
  (D-1078) / unread `ptr.msound` peace (D-1079) / silent shop
  welcome (D-1080) / `cprefx` without revive (D-1081) / skip
  ceiling_hider (D-1082) / no-op `check_pit` (D-1083) / always
  `rnd(13)` wizard (D-1084) / `Flying()` H/E flats without
  `uprops[FLYING]` (D-1085) / steal `remove_worn_item` setworn-only
  armor / skip `unpunish` / `owornmask=0` vs `setnotworn` (D-1086) /
  skip rndcurse Antimagic `shieldeff` (D-1087).
- Do not import `monmove.js` `sticks` for sit. Do not rewrite
  `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085).

## Landmarks (≤15)

- Suite after cadence **#1380**: **44**/44 Scr **11405**/11405
  RNG **100%** speed `31+0.27/turn` (R² 0.88). Next @**#1385**.
- **D-1087:** display.c `shieldeff` + sit `rndcurse` Antimagic
  call. `update_inventory` / hcolor / other callers still named.
- **D-1086:** steal.c `remove_worn_item` armor `*_off` /
  `unpunish` / `setnotworn`. sit `take_gold` dynamic-imports it.
- **D-1085:** `Flying()` ORs `uprops[FLYING]`. Review **43**
  Must-fix shipped (hash `3e1a74e8` filled this SHA).
- **D-1084:** wizard getlin 1..13. Review **45** ACCEPT.
- **D-1083:** `check_pit` teeter/shaft. Review **44** ACCEPT.
- **D-1082:** ceiling_hider + MZ_HUGE. Review **43** QUALITY-RISK
  (Flying clone; closed by D-1085).
- **D-1081:** `cprefx` rider `revive_corpse`. Review **42** ACCEPT.
- **D-1080:** `u_entered_shop`. Review **41** ACCEPT-WITH-DEBT.
