# Rotated from AGENT-LOOP-JOURNAL.md after #1491 D-1173 mnexto control_mon_tele

## 2026-08-17 14:52 — #1476 D-1161 rloc_to update_monster_region

**Objective:** Open — `teleport.c` `rloc_to` `update_monster_region`
(named). Not set_apparxy.
**C locus:** `teleport.c` `rloc_to_core` 1685; `region.c`
`update_monster_region` 598–611. Contrast `m_in_out_region`
533–576 (walk callbacks).
**Change:** export `update_monster_region`; `rloc_to` calls it
after place, before worm tail. Absolute membership from mx/my;
no enter/leave callbacks; no `attach_2_m` skip. Did not pull
vanish-msg / shk-home / shop bill / trapped `mintrap` / mhitm
displace / dbridge. Rotated #1461. Open 8 after archive (no
refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1475** **44**/44; next
@**#1480**).
**Verified:** private canary **24**/24 (empty; enter; leave;
stay in/out; two-region; attach_2_m; enter_f/leave_f unused;
swap-pop; mx,my; no m_id; rloc enter/leave/same-cell/oldx0/
within/no enter_f); green+strict seed8000/0900; cohort **41**/41
(CURRENT shared + 0014/0383/4500/2600) + strict 0101/0012/0360/
4500/2200/0014/0004/0367/0373/0002. Path public-unhit on rloc
into a live poisoncloud.
**Next:** Open `teleport.c` `rloc_to` shk `make_angry_shk`
(named). Not vanish-msg.
**Blocked:** none.
