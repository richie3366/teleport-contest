## 2026-07-22 01:58 — #1248 D-0978 ignite/burn/slime

**Objective:** map-driven — retire ignite_items / burn_away_slime
(+ catch_lit / begin_burn) from CURRENT next cluster / debt.
**Changed:** port `timeout.c` burn_away_slime/begin_burn/end_burn/
burn_object + helpers; `apply.c` catch_lit; `trap.c` ignite_items;
LS_OBJECT lights; BURN_OBJECT run_timers/cleanup; wire zap/explode/
fire-trap (D-0978). Docs: CURRENT/NOTES/debt/turns/divergence/journal.
**Verified:** green+strict PASS; zap/trap/lamp cohort **25**/26
(seed0009 Scr FAIL pre-existing). Rule #2: no fs.
**Next:** release_hold WAN_OPENING / flash_hits.
**Blocked:** none.
