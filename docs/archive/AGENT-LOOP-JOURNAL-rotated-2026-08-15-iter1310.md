# Rotated from AGENT-LOOP-JOURNAL.md (#1299 D-1030, iter #1310)

## 2026-08-15 16:41 — #1299 D-1030 use_unicorn_horn

**Objective:** map-driven apply cluster — C `use_unicorn_horn`
(CURRENT UNICORN_HORN).
**C locus:** `apply.c` use_unicorn_horn/doapply UNICORN_HORN;
`cmd.c` domonability unicorn; `rnd.c` shuffle_int_array;
`potion.c` make_*; `do.c` make_blinded.
**Change:** doapply dispatch (res TIME); cursed rn1(90,10)+rn2(13)/2
afflict; TimedTrouble collect/shuffle/rn2(d(2,blessed?4:2)) cure;
poly #monster null obj. Rule #2: no fs.
**Score:** last full `sessions` still **#1295** 44/44 (cadence @#1300).
**Verified:** green+strict PASS; apply/shared cohort **37**/37
(seed0105 Scr **30**/30; seed0361 Scr **366**/366; seed0009 Scr
**73**/73). Private node (no-trouble no RNG; cursed rn2(90)+rn2(13);
blessed d(2,4); two-trouble shuffle; I_SPECIAL skip; cream-only
blind skip). Path **unhit** by public traces.
**Next:** apply.js hornoplenty (HORN_OF_PLENTY).
**Blocked:** none.
