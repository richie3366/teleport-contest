# Rotated from AGENT-LOOP-JOURNAL.md after #1466 D-1153 vault_tele tele() fallback

## 2026-08-17 06:31 — #1451 D-1141 teleds invocation_message

**Objective:** Open queue — `teleport.c` `teleds`
`invocation_message` (named). Not vault_guard.
**C locus:** `teleport.c` `teleds` 569; `hack.c`
`invocation_message` 3064–3085 / `invocation_pos` 982–986;
`dungeon.c` `Invocation_lev` 2017–2021; `stairs.c` `On_stairs`
148–151; `invent.c` `carrying` 1495–1504.
**Change:** port `invocation_pos`/`invocation_message` in
`hack.js`. `teleds` awaits it after `spoteffects`. Gate
`invocation_pos` && !`On_stairs`; nomul; You_feel vibration;
`uvibrated`; lit spe==7 candelabrum throb/glow. Unset inv_pos
is not (0,0). Did not pull `notice_mon_*`, walk `hack.c:2973`,
or `mkmaze.c` `inv_pos`. Filled no prior hash gap. Rotated
#1437. Open 7 after archive → refill to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1450** **44**/44; next
@**#1455**).
**Verified:** private canary **26**/26; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/
0002/0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105)
+ strict 8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002.
Path public-unhit on Invocation_lev.
**Next:** Open `teleport.c` `teleds` `notice_mon_off` /
`notice_all_mons`. Not invocation.
**Blocked:** none.
