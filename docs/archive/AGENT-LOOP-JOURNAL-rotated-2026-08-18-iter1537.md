# Rotated from AGENT-LOOP-JOURNAL.md after #1537 D-1210 zombie_maker xkilled zombify

## 2026-08-18 04:42 — #1522 D-1198 migrate_to_level W-tower xyflags bit 2

**Objective:** Open — `dog.c` `migrate_to_level` `In_W_tower`
xyflags bit 2 (named). Not mon_arrive.
**C locus:** `dog.c` `migrate_to_level` 913–915 after depth-up
before mtrack/`mx=my=0`. Callee `dungeon.c` `In_W_tower`.
**Change:** after existing up-bit, `In_W_tower(mx,my,u.uz)`
`xyflags |= 2` (pre-relmon coords, current `u.uz` not dest).
Did not pull `mon_arrive` `my=xyflags`. Filled D-1197 archive
hash `7deb2670`. Rotated #1507. Open 11 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1520** **44**/44; next
@**#1525**).
**Verified:** private canary **40**/40; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004.
**Next:** Open `dog.c` `mon_arrive` `my=xyflags` before rloc
(named). Not migrate bit.
**Blocked:** none.
