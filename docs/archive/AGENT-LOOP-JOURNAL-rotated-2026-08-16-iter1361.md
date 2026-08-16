# Rotated from AGENT-LOOP-JOURNAL.md after #1361 D-1072

## 2026-08-16 06:40 — #1346 D-1065 tut-1 tut_key / eckey

**Objective:** Open queue — tut-1 `tut_key` / eckey only (not
nhcore disable / Knight jump).
**C locus:** `cmd.c` `cmd_from_ecname`/`cmd_from_func`;
`nhlua.c` `nhl_get_cmd_key`; `dat/tut-1.lua` `tut_key` /
`tut_key_help`; `hacklib.c` `visctrl`.
**Change:** `cmd_from_ecname` on default binds + BIND overlay.
`load_tut1` Lua Ctrl-/Alt- rewrite + `tut_key_help`. Loot
`M-l`, tip `Alt-T`, untrap `M-u`, twoweapon `X`. Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1345** **44**/44; next
@**#1350**).
**Verified:** private node eckey table; green+strict PASS;
seed0009 **73**/73; cohort **12**/12.
**Next:** Open tut-1 nhcore callback disable on enter/leave.
**Blocked:** none.
