# Rotated from AGENT-LOOP-JOURNAL.md @#1213

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

