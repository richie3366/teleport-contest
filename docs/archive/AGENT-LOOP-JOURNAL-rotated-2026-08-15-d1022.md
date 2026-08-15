# Rotated from AGENT-LOOP-JOURNAL.md after D-1022 / #1291

## 2026-07-22 05:57 — #1278 D-1007 apply whistle

**Objective:** map-driven — TIN/MAGIC whistle + eucalyptus (CURRENT
next cluster saddle/whistle).
**C locus:** `apply.c` use_whistle/use_magic_whistle/magic_whistled;
`mondata.c` can_blow; `mon.c` wake_nearby petcall; `vault.c`
vault_summon_gd; `teleport.c` tele_to_rnd_pet.
**Change:** port whistle apply envelope + helpers; wire doapply —
D-1007.
**Verified:** green+strict PASS; apply/pet cohort **15**/16
(seed0009 Scr 72/73 pre-existing). Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or in_trouble majors;
or use_saddle.
**Blocked:** none.
