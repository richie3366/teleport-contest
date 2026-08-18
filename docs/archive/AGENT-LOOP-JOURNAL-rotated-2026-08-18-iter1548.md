# Rotated from AGENT-LOOP-JOURNAL.md after #1548 D-1219 show_glyph_change

## 2026-08-18 07:11 — #1533 D-1207 vpline accessiblemsg consume

**Objective:** Open — `pline.c` `vpline` accessiblemsg consume
(named). Not set_msg_xy.
**C locus:** `pline.c` `vpline` 162–189; `getpos.c` `coord_desc`
/`dxdy_to_dist_descr`; `cmd.c` `directionname`.
**Change:** snapshot+reset `a11y.msg_loc` on every `pline`/`Norep`
(empty and suppress included). On+`isok` prefix `coord_desc: `
(NONE→COMFULL; unit `directionname`). Did not pull `pline_xy` /
`set_msg_dir` / `opt_accessiblemsg` wire / `dolookaround`. Filled
D-1206 archive hash `319bf51c`. Rotated #1518. Open 7 after
archive; refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1530** **44**/44; next
@**#1535**).
**Verified:** private canary **36**/36; green+strict
seed8000/0900; cohort **7**/7 + strict 1500/0012/0360/4500/
2200/0014/0004. Public-unhit unless `accessiblemsg` On.
**Next:** Open `teleport.c` `dotele` trap-at-feet teledest
(named). Not vault_tele.
**Blocked:** none.
