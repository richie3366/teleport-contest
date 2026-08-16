# Rotated from AGENT-LOOP-JOURNAL.md after #1359

## 2026-08-16 06:15 — #1344 review D-1063/D-1064 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`3f376b74` D-1063, `dc354c44` D-1064)
against pinned C, not the journal.
**C locus:** `sp_lev.c` `create_object` / `lspo_object` /
`get_table_buc` / `levregion_add` / `lspo_teleport_region` /
`get_location`; `mkmaze.c` `fixup_special` leftover TELE;
`dungeon.c` `u_on_rndspot`; `dat/tut-1.lua` food + teleport_region.
**Change:** reviews 24 ACCEPT (buc 4 `uncurse`, pmnames lichen not
`find_montype`, CORPSTAT spe then `set_corpsenm`) and 25 ACCEPT
(ANY_LOC origin add, omit-exclude `-1` `del_islev`, leftover dest
copy; `place_lregion` already ran from `u_on_rndspot`). Must-fix
empty. Filled Addressed hash `dc354c44`. No `js/` edits. Rule #2:
no fs.
**Score:** fortress unchanged (cadence **#1340** **44**/44; next
@**#1345**).
**Verified:** C read of `sp_lev.c:2193–2264`/`3442–3451`/`3667–3720`/
`1202–1269`/`5371–5459`, `mkobj.c:1318–1367`/`1822–1838`,
`mkmaze.c:341–410`/`570–704`, `dungeon.c:1605–1634`,
`dungeon.h:35–44`/`144–145`, `dat/tut-1.lua:59`/`258–261`; grep
FORCE/DIAG/fs on the `js/mklev.js` hunks.
**Next:** Open tut-1 `tut_key` / eckey only.
**Blocked:** none.
