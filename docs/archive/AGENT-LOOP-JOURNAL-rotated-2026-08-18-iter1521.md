# Rotated from AGENT-LOOP-JOURNAL.md after #1521 D-1197 scrolltele Override yn

## 2026-08-17 23:35 — #1506 D-1185 doddoremarm A empty-worn

**Objective:** Must-fix human canary seed8243. Queued as chargen
`offx`; dump first.
**C locus:** `wintty.c` H2344 `tty_display_nhwindow` NHW_MENU offx
(confirm already matched); first real miss `do_wear.c`
`doddoremarm` 3022–3034 / `cmd.c` `'A'` takeoffall.
**Change:** local C re-record replaces truncated `\e[72C` capture
(H2344 `\e[40C` already matched JS; do not revert D-0078).
`doddoremarm` empty-worn You are not wearing anything. Did not
pull `ggetobj`/`menu_remarm`/`take_off`. Did not port `g` rush.
Rotated #1491. Open 10 + Must-fix `g` prefix = 11 (no refill).
Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1505** **44**/44; next
@**#1510**).
**Verified:** canary Scr **102→106**/129 (four `A`); remaining @22
`g`; green+strict seed8000/0900; cohort **8**/8
(1500/1800/0700/0361/0014/2200/0009/0012) + strict
1500/0700/0009/0361.
**Next:** Must-fix seed8243 `cmd.c` `g` rush prefix. Not
maybe_smudge_engr.
**Blocked:** none.
