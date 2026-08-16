# Rotated from AGENT-LOOP-JOURNAL.md after D-1062 / #1339

## 2026-08-16 01:32 — #1324 D-1052 cursed-lamp make_glib Glib TIMEOUT

**Objective:** Must-fix — cursed-lamp `make_glib` remaining timeout
must match C `(Glib&TIMEOUT)` / review `HGlib|EGlib`.
**C locus:** `apply.c` `use_lamp` (~1673); `potion.c` `make_glib`
`set_itimeout(&Glib)`; `youprop.h` Glib ≡ `uprops[GLIB].intrinsic`.
**Change:** export `Glib()` as HGlib|EGlib; `make_glib` writes
intrinsic + HGlib/Glib mirrors; `use_lamp`/`use_towel`/`use_grease`
use `(Glib()&TIMEOUT)`; `nh_timeout` TIMEOUT_FLAT GLIB. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1320**; next @**#1325**).
**Verified:** green+strict PASS; apply/timeout cohort **8**/8;
private node remainder 20→27 and `nh_timeout` 5→2. Path unhit.
**Next:** Must-fix `cry_sound` C `monflag.h` numbers (D-1036 risk 3).
**Blocked:** none.
