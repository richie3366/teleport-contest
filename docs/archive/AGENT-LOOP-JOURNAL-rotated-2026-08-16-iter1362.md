# Rotated from AGENT-LOOP-JOURNAL.md after #1362 review D-1072

## 2026-08-16 07:05 — #1347 review D-1065 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`296bc792` D-1065) against pinned C,
not the journal. Docs-only `b3daacc3` cadence #1345 noted, not a
port claim.
**C locus:** `cmd.c` `cmd_from_ecname` / `cmd_from_func` /
`commands_init` / `reset_commands`; `nhlua.c` `nhl_get_cmd_key`;
`hacklib.c` `visctrl`; `dat/tut-1.lua` `tut_key` / `tut_key_help`.
**Change:** review 26 ACCEPT (default `!num_pad` eckey strings +
Lua Ctrl-/Alt- rewrite; loot `M-l` / tip `Alt-T` / untrap `M-u` /
twoweapon `X`; `cmd_from_func` list-order and `ef_funct` sharing
named, unhit by tut-1). Must-fix empty. Filled Addressed hash
`296bc792`. No `js/` edits. Rule #2: no fs. Rotated #1332 to
archive.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** C read of `cmd.c:2135–2154`/`2750–2782`/`3036–3088`/
`3343–3476`, `nhlua.c:1644–1657`, `hacklib.c:469–493`,
`hack.h:655`, `dat/tut-1.lua:5–27`/`70–107`/`230–267`/`294`; grep
FORCE/DIAG/fs on the `js/dokeylist.js` + `js/mklev.js` hunks.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.
