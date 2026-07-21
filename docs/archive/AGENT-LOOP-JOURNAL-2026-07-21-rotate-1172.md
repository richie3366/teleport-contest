# Rotated from AGENT-LOOP-JOURNAL.md (#1187 handoff)

## 2026-07-21 15:50 — #1172 overview dismiss dismiss_nhw_menu

- Objective: seed4500 @1252 map `"` vs `s` (misread DEC-vs-Primary).
- C locus: `wintty.c` `erase_menu_or_text` corner → `docorner`;
  `dungeon.c` `show_overview` → `destroy_nhwindow`.
- Change: `show_overview` uses `dismiss_nhw_menu` (no forced corner
  `docrt`/`see_monsters`) (D-0928 #1172).
- Verification: green+strict PASS; cohort 14/14; Scr **1525→1529**;
  prefix **@1252→@1291**.
- Next: @**1291** look_here map bleed under corner menu.
