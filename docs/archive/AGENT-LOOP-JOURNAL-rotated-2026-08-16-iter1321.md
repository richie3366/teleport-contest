# Rotated from AGENT-LOOP-JOURNAL.md after #1321 D-1050

## 2026-08-15 21:20 — #1308 review D-1040 / D-1041

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`12458fe9` D-1040, `eb3469ae` D-1041)
against pinned C, not the journal.
**C locus:** `apply.c` `find_poleable_mon` / `glyph_at`; `dothrow.c`
`thitmonst`; `worn.c` `find_mac`; `uhitm.c` `hmon_hitmon_msg_hit`.
**Change:** reviews 01 ACCEPT-WITH-DEBT (glyph predicates match; gbuf
still a named omit) and 02 QUALITY-RISK (tmp stub `find_mac`; mulch
`rn2` not `rnl`; leader clone `u.questarti`). Must-fix prepended.
No `js/` edits. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** C read of `apply.c:3279–3563`, `dothrow.c:1969–2304`,
`worn.c:717–735`, `zap.c:3556–3567`; JS hunks grepped FORCE/fs/seed.
**Next:** Must-fix `find_mac` minvent `ARM_BONUS`.
**Blocked:** none.
