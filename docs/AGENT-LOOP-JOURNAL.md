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

## 2026-07-21 22:25 — #1208 D-0940 costly_tin + use_tin_opener

- Objective: map-driven — retire tin shop bill + apply tin-opener debt.
- C locus: `eat.c` `costly_tin`/`use_tin_opener`; `mkobj.c`
  `bill_dummy_object`/`costly_alteration`; `shk.c` subfrombill/alter_cost;
  `apply.c` TIN_OPENER.
- Change: port shop alteration helpers; wire `costly_tin` COST_OPEN/
  DSTROY; `use_tin_opener` + apply case (D-0940).
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: `still_chewing` shop/`watch_dig`; cpostfx specials; or other
  `debt.md` row. Cadence full `sessions` @#1210.

## 2026-07-21 22:20 — #1207 D-0939 cprefx + cannibal/stone/slime

- Objective: map-driven — retire full `cprefx` debt cluster.
- C locus: `eat.c` `cprefx`/`maybe_cannibal`/`fix_petrification`;
  `mondata.h` petrify/slime macros; `mondata.c` `same_race`;
  `were.c` `were_beastie`; `potion.c` `make_stoned`/`make_slimed`;
  `end.c` `delayed_killer`.
- Change: port helpers + `cprefx`; wire `start_eating` (D-0939).
- Verification: green+strict PASS; eat/role cohort 12/12.
- Next: `costly_tin`+`use_tin_opener` / still_chewing shop/`watch_dig`;
  or other `debt.md` row. Cadence full `sessions` @#1210.

## 2026-07-21 22:10 — #1206 D-0938 b_trapped + make_stunned

- Objective: map-driven — retire tin/door/chew/kick `b_trapped` debt.
- C locus: `trap.c` `b_trapped`; `potion.c` `make_stunned`; callers in
  `eat.c`/`hack.c`/`lock.c`/`dokick.c`.
- Change: port `b_trapped` + `make_stunned`; wire consume_tin,
  still_chewing SDOOR/door, picklock/doopen, kick_door (D-0938).
- Verification: green+strict PASS; eat/kick cohort 12/12.
- Next: `cprefx` / `costly_tin`+`use_tin_opener` / still_chewing shop
  polish; or other `debt.md` row. Cadence full `sessions` @#1210.

## 2026-07-21 22:00 — #1205 score + D-0937 still_chewing

- Objective: cadence full `sessions` @#1205; map-driven metallivore
  beartrap/bars/`still_chewing` cluster.
- C locus: `eat.c` `floorfood`/`doeat` hands_obj; `hack.c`
  `still_chewing`; `monmove.c` `dissolve_bars`.
- Change: floorfood beartrap+IRONBARS; doeat hands_obj; still_chewing
  + dissolve_bars (D-0937). Score **44**/44 Scr **11405** RNG **100%**
  speed `32+0.27/turn`.
- Verification: green+strict; eat cohort; full `sessions` post-fix.
- Next: `cprefx` / `costly_tin`+`use_tin_opener` / still_chewing shop
  polish; or other `debt.md` row.

## 2026-07-21 21:55 — #1204 D-0936 is_edible + doeat_nonfood

- Objective: map-driven — retire `debt.md` eat.js metallivore non-food.
- C locus: `eat.c` `is_edible`/`doeat_nonfood`/`eatspecial`/`foodword`/
  floorfood gold; `objclass.h` metallic/organic; `invent.c` `g_at`.
- Change: poly diet `is_edible`; non-food meal path; floor gold yn;
  export `g_at`/`is_metallic`/`is_organic` (D-0936).
- Verification: green+strict PASS; eat cohort 8/8.
- Next: beartrap/bars/`still_chewing` or `cprefx`/`costly_tin`; hold
  fortress. Cadence full `sessions` @#1205.

## 2026-07-21 21:48 — #1203 D-0935 TIN start_tin/consume_tin

- Objective: map-driven — retire `debt.md` eat.js TIN + multi-turn rations.
- C locus: `eat.c` `start_tin`/`opentin`/`consume_tin`/`tin_variety`;
  `attrib.c` `gainstr`; `potion.c` `make_vomiting`/`make_glib`.
- Change: wire `doeat` TIN → open/occupation/consume; enable
  reqtime>1 rations via existing `eatfood`; helpers (D-0935).
- Verification: green+strict PASS; eat cohort 15/15 (1800/0016/0105).
- Next: next `debt.md`/`absent.md` cluster; hold fortress.

## 2026-07-21 21:32 — map-driven post-PASS mode

- Objective: human — document post-44/44 strategy (fortress + clusters).
- C locus: n/a (docs: CURRENT/NOTES/playbook/runbook/constitution/strategy
  + loop prompt / AGENT-PORT-LOOP; review fixed runbook target-order bug).
- Change: primary = hold suite + retire map debt/absent in semantic
  clusters (§2a–2b); denser iters OK; no FAIL/LB peels; Phase 2 posture.
- Verification: n/a (docs only); hot-doc budget OK.
- Next: pick next `debt.md`/`absent.md` cluster; empty hold-only → stop.

## 2026-07-21 21:16 — LB out of agent scope

- Objective: human — stop loop peels / polls for public leaderboard.
- C locus: n/a (docs policy).
- Change: CURRENT primary = hold local **44**/44; NOTES drop LB/cron
  active; do not chase `data.json` / hub CDN drift in-loop.
- Verification: n/a.
- Next: green + suite cadence; optional c-js-map / D-0006 with C proof.

## 2026-07-21 19:31 — #1202 LB poll pre-cron

- Objective: leaderboard gap — primary await cron D-0930…D-0934.
- C locus: n/a (no JS change); poll only.
- Change: docs — `data.json` still lastScored **16:41Z** **31**/44
  pts **11351**; HEAD==origin with D-0934; next cron ~**18:41Z**.
- Verification: green+strict PASS (seed8000/0900).
- Next: poll after ~18:41Z; if <44 name residual FAIL; else
  held-out (no speculative peel while awaiting).

## 2026-07-21 19:30 — #1201 LB poll + gap cohort reconfirm

- Objective: leaderboard gap — primary await cron D-0930…D-0934.
- C locus: n/a (no JS change); verify only.
- Change: docs — LB still **31**/44 @16:41Z; gap **13**/13 local
  PASS; NOTES/CURRENT next = cron lift (~18:41Z).
- Verification: green+strict PASS; all 13 LB-fail sessions PASS
  (0002/0004/0007/0012/0014/0030/0360/0361/0373/0383/0399/2200/4500).
- Next: poll `data.json` after cron; if <44 name residual; else
  held-out (keep 4/44 lead; no speculative peel).

## 2026-07-21 19:26 — #1200 public score 44/44

- Objective: cadence full `sessions` (@#1200 % 5 == 0); confirm D-0934.
- C locus: n/a (score refresh); keep D-0934 `get_configfile` default.
- Change: docs only — CURRENT Score **44**/44 Scr **11405**/11405
  RNG **792838**/792838 speed `31+0.27/turn`; NOTES/journal/D-0934.
- Verification: green+strict PASS; full suite **44**/44.
- Next: await LB cron D-0930…D-0934; no local non-PASS.

## 2026-07-21 19:24 — D-0934 recorder get_configfile (§1.2)

- Objective: human carve-out — seed2200 path otherwise impossible.
- C locus: `cfgfiles.c` `get_configfile`; CONSTITUTION §1.2 / §5.4.
- Change: §1.2 exception + cursor rule; `options.js` default =
  contest-recorder absolute path (D-0934).
- Verification: seed2200 Scr **230**/230; green+strict PASS.
- Next: LB cron D-0930…D-0934; suite confirm @**#1200**.

## 2026-07-21 19:16 — #1199 NHW_TEXT paint cols−1

- Objective: seed2200 @158 path cells without hardcoding `$HOME`.
- C locus: `wintty.c` `process_text_window` `++curx < cols` after
  `tty_curs(1,n)` (curx 0-based 0) → ≤cols−1 glyphs.
- Change: `pager.js` `show_text_pages` + fullscreen `show_nhw_menu_text`
  paint bound `cols-1` (D-0933). Falsified judge RC elision; keep
  synthetic `get_configfile`; re-park recording path string.
- Verification: green+strict PASS; NHW_TEXT cohort 12/12; seed2200
  still **229**/230; temp recording path + D-0933 → **230**/230
  (reverted).
- Next: LB gap await cron D-0930…D-0933; cadence @**#1200**.

## 2026-07-21 19:05 — unpark seed2200 @158

- Objective: human unpark — sole local miss was being skipped.
- C locus: `cfgfiles.c` `get_configfile`; `options.c` `option_help`.
- Change: docs only — CURRENT primary = seed2200 Scr 230;
  NOTES hypothesis + no-hardcode constraint; D-0006 stays parked.
- Verification: n/a (policy); seed2200 still 229/230 until peel.
- Next: `node frozen/ps_test_runner.mjs sessions/seed2200-wizard-quaff-zap-read.session.json`
  — close path-cell miss without baking recording `$HOME`.

