# Rotated from AGENT-LOOP-JOURNAL.md after D-1047 / #1316

## 2026-08-15 20:30 — reviews bind + in-iter commit/push

**Objective:** user: reviews are not theater; catch up unpaid
`loop-2026-08-15` C-wrongs; restore agent `git commit` + `git push`
inside each loop iteration.
**C locus:** n/a (supervisor / prompts / queue / reviews).
**Change:** `LOOP-QUEUE.md` **Must-fix** (12 unpaid Keep’d C-wrongs;
pole targeting first). Disposition stamps on D-1022/1023/1033/1034/1036
(D-1037/1038/1039 **Addressed**). Review prompt: thorough + Actionable
→ Must-fix or supervisor halt. Cadence defers while Must-fix is open.
Agents commit+push; supervisor fail-closes and pushes if forgotten.
**Score:** unchanged (fortress after D-1039; cadence still #1305).
**Verified:** `bash -n` loop script.
**Next:** launch `AGENT_FORCE=1 ./scripts/agent-port-loop.sh` (#1306
review, then #1307 Must-fix pole targeting).
**Blocked:** none.

## 2026-08-15 20:20 — fail-closed unattended loop + LOOP-QUEUE

**Objective:** make the CLI loop safe to leave running (user request).
**C locus:** n/a (supervisor / prompts / queue).
**Change:** parse `__RESULTS_JSON__` (runner exits 0 on FAIL); revert+halt
on green/suite/density/protected/banned/empty-port; agents commit only,
supervisor pushes; review every 3; cadence every 5 score-only; work
picker is `docs/LOOP-QUEUE.md` (one item). First iter after launch is
**#1306 review**.
**Score:** unchanged (fortress after D-1039; cadence still #1305).
**Verified:** `bash -n` loop script; require-pass helper 2/2 and 1-fail.
**Next:** launch with `AGENT_FORCE=1 ./scripts/agent-port-loop.sh`.
**Blocked:** none.

## 2026-08-15 20:01 — D-1039 dosit trap-before-throne

**Objective:** Keep’d D-1033 C-wrong — `dosit` must test trap before
`IS_THRONE` so a trapped throne cell does not spend throne RNG.
**C locus:** `sit.c` `dosit` trap ~466 / `dotrap` VIASITTING ~503 /
`IS_THRONE` ~556; `trap.c` `dotrap`.
**Change:** `js/sit.js` already-trapped sit (beartrap/pit/web/lava/
infloor/buriedball) else sit-down/land + `dotrap(VIASITTING)` after
OBJ_AT, before throne. Water/sink/altar/… still named omit. Do not
re-stub D-1033/D-1034 throne switches.
**Score:** cadence still **#1305** **44**/44 Scr **11405**/11405 RNG
**100%** after D-1038; this iter green+cohort only (next full @**#1310**).
**Verified:** green+strict PASS; seed0106/0107/4500/0014/0360/2200 PASS.
**Next:** remaining tut-1 des (large-box / food / stairs / kelp /
`place_lregion` / tut_key) + nhcore callback disable.
**Blocked:** none.
