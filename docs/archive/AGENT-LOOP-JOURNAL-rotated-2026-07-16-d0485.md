# Rotated from AGENT-LOOP-JOURNAL.md (#541 D-0485)

## 2026-07-16 08:15 — #515 score + D-0478 hilite_pet
- Objective: #515 %5 full score; seed0006 @71 hilite_pet primary.
- C locus: `wintty.c` `tty_print_glyph` MG_PET; `options.c` opt_hilite_pet.
- Change: `mon_map_attr` + `newsym` attr; enable sets `wc2_petattr`.
- Verification: seed0006 Scr **89→95**/123 @71→@77; green+strict;
  pet cohort PASS; suite **27/44** Scr **4986**/11405 RNG **289819**.
- Next: seed0006 @77 `I` vs `#` (or seed0007).

## 2026-07-16 08:10 — docs: Rule #2 hard-ban in loop entrypoints
- Objective: document Contest Rule #2 where loop agents always read it.
- C locus: n/a (process); contest README Rule #2; D-0477.
- Change: CONSTITUTION §1.5 + §3/§7; GROK-PLAYBOOK callout + Bad table;
  CURRENT header; Cursor rules; agent-port-loop.prompt.md.
- Verification: check-hot-docs; D-0477 already green.
- Next: seed0006 @71 hilite_pet (or seed0007).

## 2026-07-16 08:05 — D-0477 Rule #2 pager dat embed
- Objective: Contest Rule #2 — no filesystem; pager used Node fs.
- C locus: `pager.c` display_file/checkfile; README Rule #2.
- Change: `extract-dat-text.py` → `dat_text.js`; `pager.readDat`
  in-process only (drop fs/path/url).
- Verification: green+strict; seed0030/0002/0012 PASS; js/ clean
  of Node builtins.
- Next: seed0006 @71 hilite_pet (or seed0007).
