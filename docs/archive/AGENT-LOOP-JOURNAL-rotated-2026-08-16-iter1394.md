# Rotated from AGENT-LOOP-JOURNAL.md after #1394 D-1096 dryup wizard yn

## 2026-08-16 14:54 — #1379 D-1084 throne_sit_effect wizard getlin

**Objective:** Open queue — `sit.c` `throne_sit_effect` wizard getlin
"Throne sit effect (1..13)" (named). Not Analyze y_n.
**C locus:** `sit.c` `throne_sit_effect` (~48–61).
**Change:** after `rnd(13)`, `wizard && !iflags.debug_fuzzer`
getlin; ESC Never_mind return (turn still elapses); atoi 1..13
overrides; 0/empty/junk keep the roll. Did not retouch Analyze
`y_n` vanish. Filled D-1083 Addressed hash `e6167027`. Rotated
#1365 to archive. Refilled Open to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1375** **44**/44; next
@**#1380**).
**Verified:** private canary (non-wizard/fuzzer skip; ESC gold+throne
kept + Never_mind; atoi 5 take_gold; atoi 13 pretzel; 0/empty keep
rnd); green+strict seed8000/0900; cohort **12**/12 + strict
1800/4500/2200.
**Next:** Open `steal.c` `remove_worn_item` armor `*_off`.
**Blocked:** none.
