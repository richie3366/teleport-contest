# Rotated from AGENT-LOOP-JOURNAL.md after #1524 D-1200 newgame notice_mon_off

## 2026-08-18 00:16 — #1509 D-1188 teleport.c domagicportal

**Objective:** Must-fix human canary seed8243 `teleport.c`
`domagicportal` activate / tutorial ATSTAIRS stunmsg. Not
maybe_smudge. Not kill_genocided.
**C locus:** `teleport.c` `domagicportal` 1444–1488 /
`trap.c` `trapeffect_magic_portal` 2710–2722; `dotrap`
`!undestroyable_trap` 3035; `mklev.c` `mktrap` dst 2108–2110;
`do.c` `goto_level` reset uz0 1967.
**Change:** hero MAGIC_PORTAL `feeltrap`+`domagicportal`.
Activate pline; tutorial leave ATSTAIRS + "Resuming regular
play."; else PORTAL + stunmsg + `make_stunned`. Seen-escape
skips `rn2(5)` on undestroyable traps. `mktrap` dst from
`ucamefrom`. `goto_level` resets uz0 so later steps fire.
Did not pull `level_tele_trap` / `UTOTYPE_RMPORTAL` / rhack
`visctrl`. Filled D-1187 archive hash `77ead396`. Rotated
#1494. Open 10 + Must-fix visctrl = 11 (no refill). Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**). Cohort this iter was the full public 44.
**Verified:** canary Scr **108→128**/129 RNG **2570→2768**/2768
(leftover @117 `Unknown command '^C'`); green+strict
seed8000/0900; cohort **44**/44 + strict
1500/0700/0009/0361/0015/0012/2200.
**Next:** Must-fix seed8243 `cmd.c` rhack `visctrl` `^C`.
Not maybe_smudge_engr.
**Blocked:** none.

