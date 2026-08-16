# Rotated from AGENT-LOOP-JOURNAL.md after #1385 review D-1085–D-1088

## 2026-08-16 12:30 — audit = review + cadence on n%5==0; gitignore STOP

**Objective:** user: same iteration for review and public score when
`n % 5 == 0`; `STOP_AGENT_LOOP.md` gitignored so `git reset --hard`
cannot restore a tracked 0.
**C locus:** n/a (supervisor).
**Change:** `iter_mode` audit-only on cadence; drop review-every-3 and
Must-fix cadence deferral. STOP untracked. Agents must not reset --hard.
**Score:** unchanged (last cadence **#1370**; next audit **#1375**).
**Verified:** `bash -n` loop script.
**Next:** Open `split_mon` `clone_mon`; audit @#1375.
**Blocked:** none.

## 2026-08-16 12:21 — #1371 review D-1077 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`a9e819a4` D-1077) against pinned C, not
the journal. `9903fb6c` is docs-only cadence #1370.
**C locus:** `dbridge.c` `is_lava` 62–74; `rm.h` `DB_LAVA`/`DB_UNDER`;
`sit.c` 539; `mon.c` `mfndpos` 2258 / `minliquid` 971.
**Change:** review **38** ACCEPT (shared `hack.js` `is_lava` DRAWBRIDGE_UP
+`DB_LAVA`; `mfndpos` uses it, clone deleted). `is_pool`/`is_moat` and
`goodpos` macros named, not Must-fix. No `js/` edits. Rule #2: no fs.
Rotated #1356 to archive.
**Score:** fortress unchanged (cadence **#1370** **44**/44; next
@**#1375**).
**Verified:** C read of `dbridge.c:46–113`, `rm.h:75`/`217`/`291–295`,
`sit.c:539–555`, `mon.c:971–972`/`2256–2259`, `teleport.c:134–175`;
JS hunks grepped FORCE/fs/seed.
**Next:** Open `sit.c` `split_mon` monster `clone_mon` arm.
**Blocked:** none.
