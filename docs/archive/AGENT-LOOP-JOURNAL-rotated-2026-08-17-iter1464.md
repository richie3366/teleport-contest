# Rotated from AGENT-LOOP-JOURNAL.md after #1464 D-1152 rloc_to maybe_unhide_at

## 2026-08-17 06:10 — #1449 D-1140 teleds vault_guard uleftvault

**Objective:** Open queue — `teleport.c` `teleds` `vault_guard`
`uleftvault` (named). Not swallow docrt.
**C locus:** `teleport.c` `teleds` 454, 553–566; `vault.c`
`uleftvault` 254–278.
**Change:** capture origin `vault_occupied`?`findgd`; after dest-typ
`switch_terrain`, fake dest `in_rooms(...,VAULT)`, `uleftvault` if
left, restore `u.urooms` before `spoteffects` (D-0639). Gold +
`um_dist` → irate/`mpeaceful=0`; `!in_fcorridor` → `gd_move`. Did
not pull hostile `gd_move` rloc/`gd_letknow`/`wallify`, invocation,
or `notice_mon_*`. Filled D-1139 archive hash `4071a74d`. Open 8
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **23**/23; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0367 Pri ^T temple + 0004 scroll +
0007 snake + 0009 swim + 0360/0373/4500/2200/1500/1800/0030/0002/
0116/0060/0102/0700/0017/0361/0108/0383/5002/0006/0105) + strict
8000/0900/0012/0367/0004/0360/4500/2200/0030/0009/0002. Path
public-unhit on gold vault teleport.
**Next:** Open `teleport.c` `teleds` `invocation_message`. Not
vault_guard.
**Blocked:** none.

## 2026-08-17 05:55 — #1448 D-1139 teleds swallow set_ustuck + docrt

**Objective:** Open queue — `teleport.c` `teleds` swallow `docrt`
(named). Not hideunder.
**C locus:** `teleport.c` `teleds` 487–504; `mon.c` `set_ustuck`
3421–3435.
**Change:** after `reset_utrap`, snapshot `uswallow`,
`set_ustuck(null)` (not `unstuck`), then hideunder. If swallowed:
Punished force `ball_active`/no-drag and `await docrt()` at the
origin (gulp→map). Did not pull vault_guard / invocation /
`notice_mon_*`. Filled D-1138 archive hash `068e78df`. Open 9
after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1445** **44**/44; next
@**#1450**).
**Verified:** private canary **21**/21; green+strict seed8000/0900;
cohort **24**/24 (0012 vault + 0004 scroll + 0007 snake + 0009
swim + 0360/0367/0373/4500/2200/1500/1800/0030/0002/0116/0060/
0102/0700/0017/0361/0108/0383/5002/0006/0105) + strict 8000/0900/
0012/0360/4500/0004/2200/0367/0373/0030/0009/0002. Path
public-unhit on swallowed teleds.
**Blocked:** none.
