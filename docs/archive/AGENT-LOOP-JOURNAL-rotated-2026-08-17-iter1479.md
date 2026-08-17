# Rotated from AGENT-LOOP-JOURNAL.md after #1479 D-1164 rloc_to trapped mintrap

## 2026-08-17 10:18 — #1464 D-1152 rloc_to maybe_unhide_at dest

**Objective:** Open — `teleport.c` `rloc_to` `maybe_unhide_at`
(named). Not vanish-msg.
**C locus:** `teleport.c` `rloc_to_core` 1700–1701; `mon.c`
`maybe_unhide_at` 4698–4719.
**Change:** export `maybe_unhide_at`; `rloc_to` calls it at dest
after ustuck, before `newsym` (dynamic import; monmove↔teleport
cycle). Did not pull vanish-msg / `set_apparxy` /
`update_monster_region` / shk-home / shop bill / trapped
`mintrap` / youmonst arm. Filled D-1151 archive hash
`6bdf4d49`. Rotated #1448–#1449. Open 7 after archive → refill
to 12. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1460** **44**/44; next
@**#1465**).
**Verified:** private canary **22**/22 (bare dest unhide; cover
stays; visible; non-hider; same-cell; trapped; coins; eel
dry/pool; empty; null; track); green+strict seed8000/0900;
cohort **25**/25 (0012 vault + 0360/4500/0373/0367 +
2200/0014/0004/0009/1500/1800/0060/0102/0700/0017/0030/0116/
0383/0007/0361/0108/0002/5002/2600/0006) + strict
0012/0360/4500/0014/2200/0004/0002/0009/0367/0373/0030. Path
public-unhit on hidden-hider rloc.
**Next:** Open `teleport.c` `vault_tele` `tele()` fallback
(named). Not teleds. Audit @**#1465**.
**Blocked:** none.
