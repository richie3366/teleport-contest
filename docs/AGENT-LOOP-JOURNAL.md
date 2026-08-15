# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.

The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. When this file exceeds ~15 entries,
move older ones into `docs/archive/`.

Use this shape:

```text
## YYYY-MM-DD HH:MM — #NNNN short title

- Objective: …
- C locus: …
- Change: …
- Verification: …
- Next: …
```

## 2026-08-15 22:16 — #1313 D-1045 whip yname/Amonnam/mbodypart

**Objective:** Must-fix D-1022 risk 5 — whip/pole/grapple names use
real `yname` / `Amonnam` / `mbodypart`, not apply clones.
**C locus:** `objnam.c` `yname`; `shk.c` `shk_your`/`mon_owns`;
`do_name.c` `a_monnam`/`Amonnam`; `polyself.c` `mbodypart`;
`apply.c` `use_whip` wrap/yank/snatch/reveal/HAND.
**Change:** export C `yname` (cxname + shk_your; `set_y_monnam`
late-bind). `Amonnam` = highc(a_monnam ARTICLE_A). `mbodypart`
tables + mndx specials. Apply deletes clones. `shk_owns` deferred.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** green+strict PASS; apply/combat cohort **9**/9
(seed0361 Scr **366**/366). Private node **21**/21 (`An orc` ≠
`The orc`; dog HAND `paw`; minvent possessive). Path **unhit**.
**Next:** Must-fix `light_cocktail` `struct obj **` (D-1023 risk 4).
**Blocked:** none.

## 2026-08-15 22:01 — #1312 D-1044 special_obj_hits_leader urole.questarti

**Objective:** Must-fix review 02 item 3 — `special_obj_hits_leader`
uses C `is_quest_artifact` (`urole.questarti`), not `u.questarti`.
**C locus:** `questpgr.c` `is_quest_artifact` (~67–70);
`dothrow.c` `special_obj_hits_leader` (~1969–1972); caller
`thitmonst` skips APPLIED.
**Change:** local `is_quest_artifact` compares `oartifact` to
`game.urole.questarti` (`want!==0` for sparse JS urole). Unique /
fake / `leader_m_id` unchanged. Catch/`finish_quest` still deferred.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`.
**Blocked:** none.

## 2026-08-15 21:48 — review D-1042 / D-1043 against pinned C

**Objective:** review every JS-touching commit since
`reviews/loop-unattended/` (`19e907f5` D-1042, `d3fac215` D-1043)
against pinned C, not the journal.
**C locus:** `worn.c` `find_mac`; `hack.h` `ARM_BONUS`; `dothrow.c`
`should_mulch_missile`; `rnd.c` `rnl`.
**Change:** reviews 03 ACCEPT (`find_mac` minvent walk / guarding −2 /
`AC_MAX`; stub gone) and 04 ACCEPT (hero blessed save `!rnl(4)`;
monster `rn2(3)` unchanged). No new Must-fix. No `js/` edits.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1310**; next @**#1315**).
**Verified:** C read of `worn.c:717–735`, `hack.h:1526–1528`,
`dothrow.c:1976–2002`, `rnd.c:112–151`, `questpgr.c:67–70`; JS hunks
grepped FORCE/fs/seed.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:44 — archive checked LOOP-QUEUE items

**Objective:** live queue must not accumulate `- [x]` rows.
**C locus:** n/a (queue hygiene).
**Change:** `scripts/archive-loop-queue-done.mjs` moves checked lines
to `docs/archive/LOOP-QUEUE-DONE.md` in the same commit as the fix;
supervisor runs it if leftover `[x]` remain. Drained D-1040–D-1043.
**Score:** unchanged (cadence still **#1310**).
**Verified:** helper no-op on unchecked-only queue; `bash -n` loop script.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:42 — Addressed HASH in the next real commit

**Objective:** stop stamp-only SHAs (`da0fabe3`…`9c087297`) and hash
chicken-egg spinning.
**C locus:** n/a (git hygiene).
**Change:** stamp `**Addressed:** D-NNNN` in the fix commit; fill the
short hash in the **next** commit that already has work (port / review /
cadence). No amend, no hash prediction, no stamp-only follow-up.
**Score:** unchanged (cadence still **#1310**).
**Verified:** n/a.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti` (and
backfill any missing hash in that same SHA).
**Blocked:** none.

## 2026-08-15 21:35 — #1310 D-1043 should_mulch_missile hero rnl(4)

**Objective:** Must-fix review 02 item 2 — `should_mulch_missile`
hero blessed save `!rnl(4)` not `!rn2(4)`.
**C locus:** `dothrow.c` `should_mulch_missile` (~1976–2002);
callers `thitmonst` / `mthrowu.c` `ohitmon`.
**Change:** hero arm uses existing `rnl(4)`; monster path stays
`rn2(3)`. Rule #2: no fs.
**Score:** cadence **#1310** full `sessions` **44**/44 Scr
**11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.874).
Next @**#1315**.
**Verified:** green+strict PASS; throw/combat/zap cohort **4**/4
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick;
seed2200 zap). Private node **11**/11. Path **unhit** by public
traces.
**Next:** Must-fix `special_obj_hits_leader` `urole.questarti`.
**Blocked:** none.

## 2026-08-15 21:30 — #1309 D-1042 find_mac minvent ARM_BONUS

**Objective:** Must-fix review 02 item 1 — `find_mac` walk monster
`minvent` worn `ARM_BONUS` / amulet of guarding (thitmonst tmp).
**C locus:** `worn.c` `find_mac` (~717–735); `hack.h` `ARM_BONUS`.
**Change:** port the walk in `worn.js`; `mhitm.js` import+re-export
(local binding; re-export-only left `find_mac` undefined in mattackm).
Guarding −2 not `spe`/erosion; `AC_MAX` cap after the walk. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/combat/zap cohort **8**/8
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick; seed2200
zap). Private node **11**/11. Path **unhit** by public traces.
**Next:** Must-fix `should_mulch_missile` hero `!rnl(4)`.
**Blocked:** none.

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

## 2026-08-15 21:05 — #1307 D-1041 thitmonst weapon hit-vs-miss

**Objective:** Must-fix D-1022 risk 4 — pole `thitmonst` hit-vs-miss
envelope (combat RNG), not always-`tmiss`.
**C locus:** `dothrow.c` `thitmonst` tmp+dieroll WEAPON/weptool/GEM;
`uhitm.c` `hmon_hitmon_msg_hit` thrown/APPLIED + `first_weapon_hit`.
**Change:** C to-hit (Luck/DEX/`distmin`/`omon_adj` `!rn2(10)`);
kicked/ammo/thrown/applied bonuses; hit `hmon`+`exercise`+mulch+
`passive_obj`; miss `tmiss` + APPLIED `wakeup`. Thrown hit pline.
Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; throw/kick/combat cohort **10**/10
(seed0361 Scr **366**/366; seed1800 throw; seed0060 kick). Private
node **10**/10 (AC hit/miss; APPLIED wakeup; frozen `rn2(10)` before
dieroll; pie DEX; armor skip; hook weptool). Path **unhit** by public
traces.
**Next:** Must-fix whip/pole/grapple `yname`/`Amonnam`/`mbodypart`
(D-1022 risk 5).
**Blocked:** none.

## 2026-08-15 20:50 — #1306 D-1040 pole glyph_at targeting

**Objective:** Must-fix D-1022 risk 3 — `glyph_is_poleable_at` /
`find_poleable_mon` follow C `glyph_at`, not live `m_at`.
**C locus:** `apply.c` find_poleable_mon / get_valid_polearm_position /
use_pole; `display.c` glyph_at; `display.h` glyph_is_monster/statue/
invisible.
**Change:** classify shown layer (monster glyph / I / statue glyph);
skip tame/peaceful only when `glyph_is_monster` && `m_at`; statue/
boulder hit = glyph_at && sobj_at. `map_object` tags statue/boulder
memory. Rule #2: no fs.
**Score:** fortress unchanged (cadence still **#1305**; next @**#1310**).
**Verified:** green+strict PASS; apply/combat/display cohort **10**/10
(seed0361 Scr **366**/366; seed0399 Scr **532**/532). Private node
**12**/12 (hidden `m_at`; `I`; tame skip; peaceful `I`; statue not
autotarget). Path **unhit** by public traces.
**Next:** Must-fix pole `thitmonst` hit-vs-miss (D-1022 risk 4).
**Blocked:** none.

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

## 2026-08-15 19:50 — D-1038 shared getdir + hurtle_step

**Objective:** Keep’d D-1022 C-wrongs — real `getdir`, not `getdir_whip`;
`hurtle` via `hurtle_step` not `teleds`.
**C locus:** `cmd.c` `getdir`; `dothrow.c` `hurtle` / `hurtle_step`;
`apply.c` `use_whip` / `use_grapple`.
**Change:** `lock.js` getdir cmdq DIR/KEY, `.`/`s`, `<>`, movecmd
walk/run/rush, optional numpad, `^R` retry. No trailing confdir (whip
already confdirs). Apply deletes getdir_whip/self_ok/fig. `dothrow.js`
hurtle: tug / typed trap-anchor / nomul(-range) / wall·mon stop /
u_on_newpos. Throw path still `getdir_cmdassist`. Docs/reviews
`loop-2026-08-15/` rewritten in English.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `34+0.29/turn` (R² 0.854). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; 44/44.
**Next:** `dosit` `else if (trap)` before IS_THRONE (D-1033), then tut-1.
**Blocked:** none.

## 2026-08-15 19:15 — D-1037 save_timers RANGE_LEVEL + hatch dispatch

**Objective:** map-driven egg where/timer parity then wire HATCH_EGG
(CURRENT after D-1036 dropped dispatch).
**C locus:** `timeout.c` save_timers/restore_timers/timer_is_local/
obj_is_local/mon_is_local; `invent.c` merged obj_stop_timers;
`zap.c` get_obj_location.
**Change:** peel RANGE_LEVEL timers into level_info on goto_level
leave; restore on getlev; merged stops absorbed timers; get_obj_location
no invent-default; carried is where==INVENT; run_timers → hatch_egg.
Dump: off-level shop/minefill eggs DROP on_fobj=0. Rule #2: no fs.
**Score:** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%**
speed `33+0.28/turn` (R² 0.869). Cadence still **#1305**; next @**#1310**.
**Verified:** green+strict PASS; seed0014/4500 PASS **with** dispatch
(was 42/44 without peel).
**Next:** remaining tut-1 des / nhcore disable.
**Blocked:** none.
