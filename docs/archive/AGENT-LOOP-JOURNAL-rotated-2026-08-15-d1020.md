# Rotated from AGENT-LOOP-JOURNAL.md after D-1020

## 2026-07-22 05:45 — #1276 D-1005 leash cluster

**Objective:** map-driven — `next_to_u`/`check_leash` + `use_leash`
envelope (CURRENT next cluster).
**C locus:** `apply.c` leash helpers/`use_leash`/`next_to_u`/
`check_leash`; `wizard.c` `mon_has_amulet`; `sounds.c` `whimper`;
callers allmain/hack/do/dig/trap/teleport/dog.
**Change:** port leash attach/detach + stretch/choke/snap; wire
doapply LEASH + domove/stairs/tele/dig/fall_through/`teleport_pet`/
wary_dog/abuse_dog — D-1005.
**Verified:** green+strict PASS; apply/move/pet cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or mon_poly mon arm;
or saddle/whistle.
**Blocked:** none.
