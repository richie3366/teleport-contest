# Rotated from AGENT-LOOP-JOURNAL.md @#1072

## 2026-07-20 22:20 — #1057 D-0907 study learn + makeknown
- Objective: seed4500 @49776 C `mcalcmove` `rn2(12)` vs JS `rnd(20)`
  after matched study_book.
- C locus: `spell.c` `study_book`/`learn`; `o_init.c` `makeknown`.
- Change: `set_occupation(learn)` so Very_fast leftover umovement
  cannot start a second `doread` before EOT; learn finish uses
  `makeknown` (credit_hero WIS exercise). Named omit: lenses /
  confused_book / deadbook / novel / dull / check_unpaid.
- Verification: seed4500 prefix **49776→49915** Scr **459→481**
  RNG **49921→50071**; green+strict PASS; cohort 4/4 PASS.
- Next: @49915 C `mkobj` `rnd(1000)` vs JS `rn2(19)`; leaderboard
  cron; cadence @#1060.
