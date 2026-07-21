
## 2026-07-21 15:30 — #1169 Blind feel_location iron chain

- Objective: seed4500 @1098 Blind feel map `_` vs floor (misread altar).
- C locus: `display.c` `feel_location` / Blind `newsym` u_at.
- Change: `display.js` `feel_location`+`feel_newsym`+`set_seenv`;
  Blind newsym calls feel then display_self. `_` color 6 = chain
  (D-0928 #1169).
- Verification: green+strict PASS; cohort 5/5; Scr **1419→1521**;
  prefix **@1098→@1151**.
- Next: @**1151** `#wizintrinsic` Blind TIMEOUT JS `[23]` vs C `[119]`.

