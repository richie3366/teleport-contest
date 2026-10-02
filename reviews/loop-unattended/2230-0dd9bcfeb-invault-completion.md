# Review 2230 — 0dd9bcfeb — invault whole-body completion

Metadata: SHA `0dd9bcfeb1b6da836d3fd12b6a8268ea15f0c79e` (D-3269,
2026-10-02). `js/vault.js` + `js/mondata.js` + `js/region.js` +
`js/mklev.js` (+72/−40). Single function `invault` (C
vault.c:316–629).

Intent vs deliverable: subject promises "invault whole-body
completion (queued unmul + 10 drifted arms; money_cnt
first-stack; mongone; wall breech)". The diff delivers all of
it: stop_occupation+unmul, is_silent guard, mimic_obj_name,
Croesus dialogue, Deaf glare, noit_mhis ×2, mongone ×4,
money_cnt import, spot_stop_timers, unblock_point,
xy_set_wall_state, u_at, SetVoice order. Delivers what it
promises.

Inventory:

- `invault` (`js/vault.js:671`): 11 arm-level changes (see
  fidelity). Imports extended on pre-existing edges (hack,
  objnam, mkobj, const, mon, shk, mondata) + one new
  vault→mklev edge (xy_set_wall_state; no mklev→vault edge
  exists, so no cycle; call-time use of a hoisted export).
- `is_silent` (`js/mondata.js:57`): new canonical export
  `(msound|0)===MS_SILENT`; region.js:312 local deleted,
  mondata import extended — zero new edges.
- `xy_set_wall_state` (`js/mklev.js:34231`): `export` added
  to the pre-existing local (only `sym.mjs` hit — no twin).
- Local `money_cnt` SUM clone deleted; live shk.js first-stack
  export imported (all 4 file call sites now C-exact).
- `mongone_guard` subset clone RETAINED at vault.js:128 for
  gd_move :249 (correct: only the 4 fresh-guard invault sites
  move to live mongone).
- `sym.mjs`: mongone mon.js:3642 ASYNC awaited ×4 ✓;
  stop_occupation hack.js:1700 ASYNC awaited ✓; unmul
  hack.js:1786 ASYNC awaited ✓; noit_mhis mondata.js:1216
  sync ✓; mimic_obj_name objnam.js:4030 sync ✓.

**C ↔ JS fidelity — `invault`** (every changed arm vs C):

- u_at(x,y) (C :381) ✓; trailing `else return` present ✓.
- uswallow arm (C :456–466): SetVoice+verbalize under
  !Deaf, pline_The presence line, mongone ✓.
- M_AP_OBJECT arm (C :467–479): combined `!== GOLD_PIECE
  && !Deaf()` ≡ C's nested ifs ✓; `mimic_obj_name` JS
  ≡ C objnam.c:5605–5615 exactly (no F_DKNOWN arm exists in
  C — the D-log sentence is harmless noise).
- :480 guard `Strangled || is_silent(data) || multi<0` ✓;
  huff/verbalize branches C-exact ✓.
- :494–498 `stop_occupation(); if (multi>0)
  {nomul(0); unmul(NULL);}` ✓ in C order (nomul sync,
  unmul awaited). The inherited nomul/nomovemsg drift is
  honestly disclosed as out-of-cluster, not fixed ✓.
- Croesus-alive (C :515–524): Deaf waves-goodbye under
  !Blind / SetVoice + double-spaced apology ✓; Croesus-dead
  arm (pre-existing) re-checked: SetVoice + strings +
  MON_WEP/weapon_check C-exact ✓.
- "I don't know you" + SetVoice ✓; `money_cnt` first-stack
  claim CONFIRMED — C hack.c:4513–4522 returns the first
  COIN_CLASS quan (D-log's "returns, not sums" is right);
  shk.js:4767 matches for array and nobj chains ✓.
- Deaf glare (C :561): `glares at you${invent?.length ? 'r
  stuff' : ''}.` ≡ C's `gi.invent ? "r stuff" : ""` ✓.
- noit_mhis ×2 (C :575–576): exact you.h:330–331 macro
  mirror incl. PRONOUN_HALLU ✓.
- mongone ×4: C mongone's `isgd && !grddead` early return
  does NOT trigger here — verified: fresh guard has
  fcbeg=fcend=0 so clear_fcorr (vault.c:45–116) skips the
  loop and returns TRUE → grddead TRUE → isgd=0 → full
  detach; C findgd requires isgd, so C and JS agree the
  guard is gone. JS mongone's isgd gap is its own named
  omit (mon.js doc) and unreachable from these sites ✓.
  mhp=0/unstuck-guard/mdrop/discard all no-op-correct ✓.
- Wall breech (C :605–625): corner ladder pre-existing;
  `xy_set_wall_state` after wall_info=0 ✓,
  `spot_stop_timers(x,y,MELT_ICE_AWAY)` ✓ (timeout.c:2415
  signature matches), `unblock_point` ✓ (was already
  imported).
- `xy_set_wall_state` clone: switch arms C-exact vs
  display.c:3274–3326; default-`return` ≡ wmode=−1 guard;
  callee set_wall_mode ≡ C set_wall (more_than_one 3-arg
  ≡ the non-WA_VERBOSE macro) ✓. Placement nit: C home is
  display.c, JS keeps it in mklev.js — behavior-identical,
  no twin; not a C-wrong.
- SetVoice before all 10 verbalize sites in C order ✓
  (9 touched + Croesus-dead pre-existing); no-op both
  sides ✓. Caller allmain.c:357→allmain.js:1237 ✓ (only
  C caller). Stub-marker scan of the whole JS body: clean.

Hallucinations / overclaim: none material. Two message-level
nits, neither a C-wrong: "--can CHECK" for the mklev edge
(post-commit `--can` reads ALREADY — the edge is this
commit's only vault→mklev import, acyclic, safe); the
F_DKNOWN sentence defends against a C arm that does not
exist.

Density: single whole function, one C file, +72/−40 with
the below-80 exception documented (no same-file/closure
Open rows). `Ledger: invault ported` + Verify line present.

Verification: D-log Verify shows vacuous note + smoke
REACH-OK + green/strict/cohort + full 44/44 (shared file).
Re-measured (`hidden-proxy.mjs verify invault --base
0dd9bcfeb~1 --reach-all`): vacuous (0 blocked — the queue
row cited a missing arm, no blocks, so the note is honest)
+ smoke 24/24 PASS → REACH-OK. Zero regressed.
Banned-pattern grep: clean. Rule #2 clean (2229, same tree).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
