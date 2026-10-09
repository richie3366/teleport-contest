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

Score last measured: **2026-10-09** — full `sessions` on `47fdd9a35`
(audit **2573–2581**, 2026-10-09T02:55:30.369Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`374+1.67/turn` (R² 0.75).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-09 02:13Z, ours 01:46Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `374+1.67/turn` (R² 0.75) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-09 02:13Z (ours scored 01:46Z: post-D-3711).
**Corpus — picker and proxy (2026-10-09 03:01Z; 953/953 entries, 0 unrecorded):**
**939 / 953** PASS (98.5 %), RNG 11413722/11413722 (100.00 %), screens 200597/200725 (99.9 %); `full: true`. Worst families: `random` 56/61, `explore` 116/124, `scen` 674/675. Audits record this line next to held-out: the board must rise **with** it. +0 since the last audit (939→939: omit-2 Deaf-macro refills are message-gate-only, no corpus session reaches deaf-at-gate); 0 PASS→FAIL, 0 hangs. Remainder: 13 env:config-path + 1 unattributed (Samurai-92032 screen-96, D-3684 nomux_out artifact).
Reviews 1225–2581 (index; no row 1618): 1190 ACCEPT, 57 WITH-DEBT, 109 QUALITY-RISK (2573–2581: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @da6733166: 5329 pinned-C functions — ported 4542 · partial 113 · split 163 · by-design 396 · open 115 (614 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3713 (index).**
<!-- recent:begin -->
**D-3713** mthrowu.c hit_bars `:1417–1495`, barsound arm `:1447–1470`, gate `:1447`; Deaf ≡ youprop.h — js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); the gate calls it and drops the acoustics disjunct, with C cites (`:1447` + youprop.h:125). hero_Deaf's extra `|| u.Deaf` disjunct 
**D-3712** mthrowu.c breamm `:1093–1150`, mcan arm `:1099–1108`, gate `:1100`; Deaf ≡ youprop.h:125 H — js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); the gate calls it and drops the acoustics disjunct, with C cites (`:1100` + youprop.h:125). hero_Deaf's extra `|| u.Deaf` disjunct 
**D-3711** mthrowu.c spitmm `:1016–1077`, mcan arm `:1021–1032`, gate `:1022`; Deaf ≡ youprop.h:125 H — js/mthrowu.js only — `hero_Deaf` imported from monmove.js (imports.mjs --can: SAFE, hoisted function, cycle-safe; new mthrowu→monmove edge); the gate calls it and drops the acoustics disjunct, with C cites (`:1022` + you
**D-3710** dig.c mdig_tunnel `:1414–1497`, wall arm `:1467–1471`. C caller monmove.c:1645. — js/dig.js only — `You_hear` joins the pre-existing hack.js import (imports.mjs --can: ALREADY, no new edge); the arm drops the raw gate and awaits `You_hear('crashing rock.')` with C cites (`:1468–1471`).
**D-3709** uhitm.c mhitm_ad_dgst `:4492–4567`, gate `:4530` `if (flags.verbose && !Deaf)`; Deaf ≡ you — js/mhitm.js only — `hero_Deaf` already imported :151 (D-3707 noises gate; no new edge); the gate calls it with C cites (`:4530` + youprop.h:125). hero_Deaf's extra `|| u.Deaf` disjunct is D-3572's dead code (zero writers
**D-3708** uhitm.c mhitm_ad_curs `:3014–3096`, mhitm-arm gate `:3088` `if (!Deaf)`; Deaf ≡ youprop.h: — js/mhitm.js only — `hero_Deaf` already imported :151 (D-3707 noises gate; no new edge); the gate calls it with C cites (`:3088` + youprop.h:125). hero_Deaf's extra `|| u.Deaf` disjunct is D-3572's dead code (zero writers
**D-3707** mhitm.c noises `:27–38`, gate `:31` `if (!Deaf && (farq != gf.far_noise || svm.moves - gn. — js/mhitm.js only — `hero_Deaf` joins the pre-existing monmove.js import (imports.mjs --can: ALREADY, no new edge); the gate calls it in C short-circuit order with C cites (`:31` + youprop.h:125). hero_Deaf's extra `|| u.
**D-3706** engrave.c doengrave_sfx_item_WAN `:583–738` — js/engrave.js only — `hero_Deaf` imported from monmove.js (imports.mjs --can: SAFE, hoisted function, cycle-safe; new engrave→monmove edge) and the const calls it with C cites (`:693` + `:730` + youprop.h:125). hero_Deaf
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3713; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** missing-arm close_drawbridge crush gate (omit-2 family; D-3713 Next lead; both generated blocks empty, batch no gap).
**This iter:** audit 2573–2581 @47fdd9a35 (9A/0D/0Q, 0 Must-fix: D-3703…D-3713 omit-2 refills ACCEPT, every focused suite + REACH re-measured incl. full 112/112 mdig_tunnel reach) + full rescore 939/953 (+0, 0 PASS→FAIL); fortress 44/44; ledger 5/5 seeded-ported sampled clean (readobjnam_init, singplur_compound, region_dialogue, stop_donning, redist_attr all stand ported).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
