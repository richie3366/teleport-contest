# Rotated from AGENT-LOOP-JOURNAL.md after cadence #1340

## 2026-08-16 01:47 — #1325 D-1053 cry_sound msound C monflag.h

**Objective:** Must-fix — `cry_sound` monster `msound` must be C
`monflag.h` numbers, not empty → always-chitter (D-1036 risk 3).
**C locus:** `sounds.c` `cry_sound` / `growl_sound`; `monsters.h`
`SIZ(wt,nut,sound,sz)`; `monflag.h` `enum ms_sounds`.
**Change:** extractor captures SIZ sound → `msounds[]`; `mons().msound`;
unify growl/cry MS_* to C numbers; `domonnoise` leader poly-safe is
C `msound > MS_ANIMAL` (dropped omitted-table `msound===0` shim).
`peace_minded`/`set_malign` still unread. Rule #2: no fs.
**Score:** cadence **#1325** **44**/44 Scr **11405**/11405 RNG **100%**
speed `32+0.26/turn` (R² 0.87). Next @**#1330**.
**Verified:** private cry stems match C (bee buzz / hiss / growl /
screech / grunt / chirp / mumble / eel gurgle / ant chitter).
green+strict PASS; quest/hatch cohort **7**/7 after leader shim
(seed0361/0367/0373/4500/0014). Path **unhit** by public traces.
**Next:** Must-fix `get_obj_location` flags `0` vs CONTAINED
(D-1036 risk 4).
**Blocked:** none.
