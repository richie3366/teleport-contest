# Rotated from AGENT-LOOP-JOURNAL @#1182

## 2026-07-21 15:20 — #1168 nh_timeout generic uprops TIMEOUT

- Objective: seed4500 @1092 `#wizintrinsic` invulnerable `[30]` vs C bare.
- C locus: `timeout.c` `nh_timeout` — for all `u.uprops` TIMEOUT `--`.
- Change: `timeout.js` decrement remaining uprops TIMEOUT after
  dedicated arms; sync TIMEOUT_FLAT; expiry switch deferred (D-0928 #1168).
- Verification: green+strict PASS; cohort 38/38; Scr **1417→1419**;
  prefix **@1092→@1098**.
- Next: @**1098** Blind feel-floor map C altar `_` vs JS floor `·`.

## 2026-07-21 15:10 — #1167 flags.pushweapon setuswapwep

- Objective: seed4500 @1053 carrots alt weapons vs JS bites.
- C locus: `wield.c` `dowield`/`wield_tool` — `flags.pushweapon` →
  `setuswapwep(oldwep)` after successful ready (no second prinv).
- Change: `wield.js` implement pushweapon in `dowield`+`wield_tool`
  (D-0928 #1167). Prior carrot wield then sword hit `doswapweapon`.
- Verification: green+strict PASS; cohort 19/19; Scr **1413→1417**;
  prefix **@1053→@1092**.
- Next: @**1092** `#wizintrinsic` invulnerable `[30]` TIMEOUT vs C bare.
