# Journal archive (rotated 2026-08-15, D-1017)

Older crumbs moved out of `docs/AGENT-LOOP-JOURNAL.md` to keep the
live file near 15 entries.

## 2026-07-22 05:17 — #1273 D-1002 allmain Tele/Poly/ulycn

**Objective:** map-driven — allmain Teleportation/Polymorph/ulycn
once-per-turn (CURRENT next after D-1001).
**C locus:** `allmain.c` moveloop after `regen_pw` (!uinvulnerable).
**Change:** `maybe_tele_poly_were` + static `mvl_change`; tele /
polyself(POLY_NOFLAGS) / you_were; prop helpers — D-1002.
**Verified:** green+strict PASS; allmain cohort **36**/37
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (potion/scroll/vault); or warnreveal /
overexert_hp / Upolyd eel; or potion/mhitm you_were wires.
**Blocked:** none.

## 2026-07-22 05:10 — #1272 D-1001 ParanoidWerechange/Hit

**Objective:** map-driven — ParanoidWerechange + ParanoidHit getlin
(CURRENT next after D-1000).
**C locus:** `were.c` you_were/you_unwere; `uhitm.c` attack_checks;
`timeout.c` mtimedone; `eat.c` fpostfx wolfsbane; `flag.h` confirm.
**Change:** you_were/you_unwere + ParanoidWerechange; peaceful
confirm ParanoidHit + Stormbringer override; mtimedone wire;
wolfsbane purify; confirm default On — D-1001.
**Verified:** green+strict PASS; combat/timeout cohort **11**/12
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (potion/scroll/vault); or allmain
Teleportation/Polymorph/ulycn once-per-turn.
**Blocked:** none.
