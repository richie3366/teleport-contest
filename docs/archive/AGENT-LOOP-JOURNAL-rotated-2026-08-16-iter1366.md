# Rotated from AGENT-LOOP-JOURNAL.md after #1366 D-1075 dosit lay_an_egg

## 2026-08-16 09:18 — refill LOOP-QUEUE when below 8 open items

**Objective:** empty-queue halt at #1351 was the supervisor blocking
the agent from refilling; keep 8–12 Open rows from the map.
**C locus:** n/a (queue hygiene). Next port: `sit.c` `dosit` hider.
**Change:** filled 12 Open items (hider / `can_reach_floor` / ustuck /
uteeter / hoard / `lay_an_egg` / VIASITTING pit / `is_lava` DB_LAVA /
`clone_mon` / `msound` malign / shop doorway / rider `revive_corpse`).
Supervisor no longer halts *before* a port when empty; injects refill
when count < 8; halts *after* a port that is still empty.
**Score:** unchanged (cadence still **#1350**).
**Verified:** `bash -n` loop script; 12 `- [ ]` in LOOP-QUEUE.
**Next:** `dosit` hider.
**Blocked:** none.
