# Rotated from AGENT-LOOP-JOURNAL.md after D-1225 energy/spelleffects teleport

## 2026-08-18 10:20 — #1541 D-1213 rot_corpse invent/minvent worn plines

**Objective:** Open — `dig.c` `rot_corpse` invent/minvent worn
plines (named). Not REVIVE.
**C locus:** `dig.c` `rot_corpse` 2146–2189.
**Change:** invent verbose `Your [wielded ]<corpse> rot(s)
away`; `owornmask` → `remove_worn_item(TRUE)` +
`stop_occupation`; minvent wielded `setmnotwielded`; migrating
`owornmask=0`; invent splice in `obj_extract_self`; invent
`update_inventory` after extract. Did not pull hideunder
expose, contents bury, unique CXN_NO_PFX, or artifact_light.
Rotated #1526. Open 11 after archive (no refill). Rule #2: no
fs.
**Score:** fortress unchanged (cadence **#1540** **44**/44; next
@**#1545**).
**Verified:** private canary **28**/28; green+strict
seed8000/0900; cohort **4**/4 + strict 1500/1800/0012/0004.
**Next:** Open `hack.c` `disturb_buried_zombies` (named). Not
zombify_mon.
**Blocked:** none.
