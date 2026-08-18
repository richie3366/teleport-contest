# Rotated from AGENT-LOOP-JOURNAL.md after #1529 D-1204 eatspecial SCR_MAIL

## 2026-08-18 00:55 — #1514 D-1192 newgame wizkit obj_delivery(FALSE)

**Objective:** Open — `allmain.c` `newgame` wizkit
`obj_delivery(FALSE)` (named). Not goto_level.
**C locus:** `allmain.c` `newgame` 826–829 after skills before
legacy; `files.c` `read_wizkit` 2584–2601 / `wizkit_addinv`
2537–2559 / `proc_wizkit_line` 2562–2581; `cfgfiles.c`
`cnf_line_WIZKIT`; callee `dokick.c` `obj_delivery` FALSE
(D-1177).
**Change:** VFS `read_wizkit` + `WIZKIT=` parse; wire wizard
`read_wizkit` then `obj_delivery(FALSE)` so overflow kit items
land at the hero. Did not pull `deliver_obj_to_mon`, getenv/
HOME, `wish_history`, `config_error` UI, `option_help` WIZKIT,
`init_artifacts`, or newgame `notice_mon_off`. Filled D-1191
archive hash `cc7d0ef5`. Rotated #1499. Open 7 after archive
→ refill to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1510** **44**/44; next
@**#1515**).
**Verified:** private canary **18**/18; green+strict
seed8000/0900; cohort **23**/23 (incl. wizard debug
0006/0108/0116/0360/0373/0398/2200/4500/5002/5006) + strict
lengths. Public-unhit unless a wizard session has WIZKIT= in
VFS.
**Next:** Open `dokick.c` `deliver_obj_to_mon` (named). Not
obj_delivery.
**Blocked:** none.
