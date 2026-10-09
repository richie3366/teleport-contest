# Current (hot pack)

**Single source of truth for each loop iteration.** Cap: `check-hot-docs.mjs`.
Do not paste completed D-chains here — those live in `DIVERGENCE-INDEX.md`
and `archive/PROGRESS-HISTORY.md`.

**HARD (Contest Rule #2):** scored `js/` = plain ESM for Node **and** Chrome —
no `fs`/`path`/`url`/`node:*`, no runtime filesystem. Persist only via
`storage.js` VFS; dat texts live in `js/generated/` (D-0477 / Constitution §1.5).

## Public score cadence

**Every 10 global loop iterations** (`iteration-count % 10 == 0`) is an
**audit**: write the C-fidelity review **and** run:

```bash
node frozen/ps_test_runner.mjs sessions
```

Update Score: pass count, screen/RNG aggregates, speed, PASS list,
notable non-PASS; the **Held-out** row from `node scripts/leaderboard.mjs`;
the corpus fortress from `hidden-proxy.mjs score` (PASS→FAIL = Must-fix
row naming the SHA). Do not invent suite totals from one focused session.

Score last measured: **2026-10-09** — full `sessions` on `1f526fb1e`
(audit **2568–2572**, 2026-10-09T00:51:22.812Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`356+1.56/turn` (R² 0.75).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-08 19:38Z, ours 19:11Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `356+1.56/turn` (R² 0.75) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-08 19:38Z (ours scored 19:11Z: post-D-3693, pre-D-3695).
**Corpus — picker and proxy (2026-10-09 00:56Z; 953/953 entries, 0 unrecorded):**
**939 / 953** PASS (98.5 %), RNG 11413722/11413722 (100.00 %), screens 200597/200725 (99.9 %); `full: true`. Worst families: `random` 56/61, `explore` 116/124, `scen` 674/675. Audits record this line next to held-out: the board must rise **with** it. +1 since the last audit (938→939: D-3698 moveloop consume gate → Priest-94382 FULL PASS, park refuted); 0 PASS→FAIL, 0 hangs. Remainder: 13 env:config-path + 1 unattributed (Samurai-92032 screen-96, D-3684 nomux_out artifact).
Reviews 1225–2572 (index; no row 1618): 1181 ACCEPT, 57 WITH-DEBT, 109 QUALITY-RISK (2568–2572: 5A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only (none a C-wrong) — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; the 2026-10-06 list is archived in `docs/archive/PROGRESS-HISTORY.md`.
Audit iters (mandatory, 2026-09-28): full scoreboard update —
`hidden-proxy.mjs record --jobs 8` then unfiltered `hidden-proxy.mjs score
--jobs 8` (≈270 s), committed with `full: true` — + `leaderboard.mjs`.
`record` needs the C recorder (`bash nethack-c/build-recorder.sh`; Linux:
clang, bison, flex, ncompress); `.cache` recordings take ≈45 s to rebuild.

**PASS (44):** seed0002-healer-reflection-drummer, seed0004-feeding-pony,
seed0006-wizard-water-demon, seed0007-rogue-snake-swamp, seed0009-swimmer-mforce,
seed0012-monk-vault-escort, seed0013-friday13-save-then-fullmoon-restore,
seed0013-rogue-friday13-combat, seed0014-dequa-fountain-explore,
seed0015-valk-level2-pit-dog-wait, seed0016-healer-newmoon-eat-zap,
seed0017-samurai-altar-pray, seed0030-ten-diverse-deaths,
seed0060-orc-rogue-kick-search, seed0077-rogue-chargen,
seed0101-ranger-quiver-throw-travel-engrave, seed0102-ranger-name-cancel,
seed0103-knight-ride-pony, seed0104-knight-ride-combat,
seed0105-valk-chat-lamp-ration, seed0106-priest-extcmd-sweep,
seed0107-samurai-twoweapon-enhance, seed0108-wizard-extcmd-wishlist,
seed0116-wizard-wear-shop, seed0200-monk-north-search,
seed0360-wizard-world-tour, seed0361-archeologist-tour,
seed0367-priest-quest-tour, seed0373-barbarian-quest-tour,
seed0383-wizard-hallucinate, seed0398-wizard-wandpoly-pile,
seed0399-wizard-hallu-actions, seed0501-priest-cast-read-turn,
seed0700-samurai-explore-descend, seed0900-tourist-explore-actions,
seed1150-caveman-explore-move, seed1500-rogue-explore-move,
seed1800-tourist-eat-throw, seed2200-wizard-quaff-zap-read,
seed2600-wizard-custom-binds, seed4500-knight-coverage,
seed5002-wizard-coverage-pair, seed5006-tourist-stress-disaster,
seed8000-tourist-starter.

**Notable non-PASS:** none — 44/44.

## Green gate

```bash
node frozen/ps_test_runner.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
node scripts/strict-output-check.mjs \
  sessions/seed8000-tourist-starter.session.json \
  sessions/seed0900-tourist-explore-actions.session.json
```

Both must remain full RNG + screen PASS with exact lengths.

## Primary objective — CLIFF PHASE (human, 2026-10-06, Constitution §10.18; supersedes the §10.17 picker)

**Why:** `ledger.mjs batch` → 1 function, ledger counts frozen since
2026-10-04, held-out flat ~50 iterations spent on ledger-text "repairs",
re-audits and unreached campaign steps — while the corpus failed 212/953
in the held-out genre, every top owner tagged "do not re-enqueue"
(§10.18 has the numbers).

**Move the corpus cliffs, one per iteration, ranked by RNG lost** — the
generated **Open — cliffs** block in `LOOP-QUEUE.md` (committed board →
`hidden-proxy.mjs queue --write`). Per cliff: `hidden-proxy show <probe>`
→ owner vs **writer** → `brief.mjs` → the C function whole, every caller
wired → `verify.mjs --fn` with **movement** on the probe sessions (PASS or
strictly later step) **and** REACH-OK. NO MOVEMENT twice → measure C
(`geom-probe`, temp C dump) this iteration; it names the writer or parks
the owner (`[measure]` rows are live). Must-fix is strict (throw / hang /
PASS→FAIL / review C-wrong); ledger text is never a row. Audits: full
rescore, `leaderboard.mjs`, **corpus growth** (`scenario-gen.mjs`) when
the worst family is ≥ 85 % or the block holds < 6 owners.
**Falsifier (human):** ~20 cliff iterations with the board rising and
held-out flat → the corpus stopped predicting the judge again.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @c04ecdfe0: 5329 pinned-C functions — ported 4542 · partial 113 · split 163 · by-design 396 · open 115 (615 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head, else (block empty) the coverage head / `ledger.mjs batch` when it
still names ≥ 5 functions. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3705 (index).**
<!-- recent:begin -->
**D-3705** dokick.c kick_nondoor `:974–1253`, sink pudding arm `:1206–1223` — js/dokick.js only — the gate calls hero_Deaf() (already imported :68, D-3704; no new edge) in C short-circuit order with C cites (`:1213` + youprop.h:125). hero_Deaf's extra `|| u.Deaf` disjunct is D-3572's dead code (ze
**D-3704** dokick.c kick_door `:910–970`, fail arm `:958–969` — js/dokick.js only — `hero_Deaf` joins the pre-existing monmove.js import (imports.mjs --can: ALREADY, no new edge); the gate calls it in C short-circuit order with C cites (`:966` + youprop.h:125).
**D-3703** monmove.c mon_yells `:106–129` — js/monmove.js only — deleted the clone, the arm calls the live export with its C cite (`:124`).
**D-3702** monmove.c mb_trapped `:59–61` (`else if (!Deaf)` + `You_hear("a %s explosion.", far ? "dis — js/monmove.js only — `You_hear` joins the pre-existing hack.js import (imports.mjs --can: ALREADY, no new edge); the four emits call it in C order with C cites (`'a %s explosion.'` + near/far arg at mb_trapped, matching 
**D-3701** insight.c one_characteristic `:846–936` (formatting `:895–936` ported by D-2109); hide `:8 — js/invent.js only — exported one_characteristic_hide_innate(attrindx, mode) in C order (Upolyd → Fixed_abil/stuck-ring short-circuit → 7-way switch with cites → MAGIC clearing unless poly'd); both builders take mode and 
**D-3700** windows.c getlin `:1868–1902` — js/getline.js only — preamble in C order (gotCmdq/cmdqBuf, pop-until-null/non-KEY/newline with the yn_function tolerant KEY test, `await pline('%s %s', query, cmdqBuf)` + return) ahead of the prompt loop, and the envelop
**D-3699** polyself.c break_armor `:1157–1302` — js/polyself.js only — donning/cancel_don added to the pre-existing do_wear.js edge (imports.mjs --can: ALREADY, no new edge); the 6 `if (donning(x)) cancel_don();` cancels inserted first in their arms in C order plus the
**D-3698** allmain.c moveloop_core `:453–471`: `if (!context.mv || Blind) { ...see arms...; if (visio — js/allmain.js only — nested the consume inside `if (!g.context.mv || Blind)` in C order (after the see arms), dropped the post-clear.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3705; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** missing-arm successor (this iter shipped D-3704 kick_door): dokick.c kick_nondoor gushing Deaf-macro gate (omit-2 family; C :1213 vs js/dokick.js:758; EDeaf+Unaware corner) — js/dokick.js only, 1 predicate.
**This iter:** audit 2568–2572 @1f526fb1e (5A/0D/0Q, 0 Must-fix: D-3698 FULL PASS re-measured + 924/924 reach, D-3699…D-3705 refills ACCEPT with full-reach REACH-OK) + full rescore 939/953 (+1, 0 PASS→FAIL); fortress 44/44; ledger 5/5 seeded-ported sampled clean (dochug stands ported w/ map-named demon_talk; Deferred cuss line refreshed).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
