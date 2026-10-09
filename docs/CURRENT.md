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

Score last measured: **2026-10-09** — full `sessions` on `6b1d1abec`
(audit **2582–2590**, 2026-10-09T04:49:43.768Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`383+1.70/turn` (R² 0.73).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-09 02:13Z, ours 01:46Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `383+1.70/turn` (R² 0.73) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-09 02:13Z (ours scored 01:46Z: post-D-3711).
**Corpus — picker and proxy (2026-10-09 04:55Z; 953/953 entries, 0 unrecorded):**
**939 / 953** PASS (98.5 %), RNG 11413722/11413722 (100.00 %), screens 200597/200725 (99.9 %); `full: true`. Worst families: `random` 56/61, `explore` 116/124, `scen` 674/675. Audits record this line next to held-out: the board must rise **with** it. +0 since the last audit (939→939: Deaf-macro/Underwater-idiom refills are message-gate/recalc-only, no corpus session reaches the deaf/submerged gates); 0 PASS→FAIL, 0 hangs. Remainder: 13 env:config-path + 1 unattributed (Samurai-92032 screen-96, D-3684 nomux_out artifact).
Reviews 1225–2590 (index; no row 1618): 1199 ACCEPT, 57 WITH-DEBT, 109 QUALITY-RISK (2582–2590: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @02f3adacc: 5329 pinned-C functions — ported 4542 · partial 113 · split 163 · by-design 396 · open 115 (614 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3722 (index).**
<!-- recent:begin -->
**D-3722** steed.c can_ride `:168–174`, disjunct `:172–173` (`(!Underwater || is_swimmer(mtmp->data)) — js/steed.js only — the disjunct reads `(u.uinwater | 0)` with C cites (`:169–174` + youprop.h:279); D-3400 idiom, same expression as the mount_steed gate :724, no new edge, no import.
**D-3721** dungeon.c surface `:1750–1788`, pool arm `:1765–1767`; Underwater ≡ youprop.h:279 `(u.uinw — js/zap.js only — the pool arm reads `((game.u?.uinwater | 0) && !Is_waterlevel(uz))` with C cites (`:1765–1767` + youprop.h:279); D-3400 idiom, same expression as js/zap.js:986 (D-3720), no new edge, no import. surface_z
**D-3720** zap.c melt_ice `:5040–5079`, gate `:5059–5060`; Underwater ≡ youprop.h:279 `(u.uinwater)`. — js/zap.js only — the gate reads `(game.u?.uinwater | 0)` with C cites (`:5059–5060` + youprop.h:279); D-3400 idiom, same expression as js/zap.js:6951, no new edge, no import.
**D-3719** mthrowu.c return_from_mtoss `:850–965`, recalc `:960`; predicate light.c obj_sheds_light ` — js/mthrowu.js only — the tail calls the live `obj_sheds_light` export (js/light.js:239 → obj_is_burning :208, C-exact) via the dothrow.js:2667–2668 dynamic-import idiom (same shape as this function's snuff_candle/ship_ob
**D-3718** mthrowu.c return_from_mtoss `:850–965`, gates `:909`/`:918`/`:952`; Deaf ≡ youprop.h:125 H — js/mthrowu.js only — `hero_Deaf` already imported :84 (D-3711 spitmm gate; no new edge); all three gates call it, and the Splash gate reads the live `(game.u?.uinwater | 0)` bit (D-3400 idiom), with C cites (`:909`/`:918
**D-3717** makemon.c makemon `:1147–1510`, S_EEL arm `:1322–1326` → mon.c hideunder `:4726–4802`, S_E — js/makemon.js only — the arm calls the live hideunder export (already imported :185; imports.mjs --can: ALREADY, no new edge), with C cites (`:1322–1326` + mon.c `:4746–4747` + youprop.h:279).
**D-3716** mon.c hideunder `:4726–4802`, S_EEL arm `:4746–4747`; Underwater ≡ youprop.h:279 `(u.uinwa — js/mon.js only — the disjunct reads `(!(u.uinwater | 0) || !couldsee(x, y))` with C cites (`:4746–4747` + youprop.h:279); D-3400 idiom, same expression as the monmove.js:1466 clone, no new edge, no import.
**D-3715** sounds.c dosounds `:202–339`, EOT gate `:208`; Underwater ≡ youprop.h:279 `(u.uinwater)`.  — js/sounds.js only — the gate reads `(u.uinwater | 0)` with C cites (`:208` + youprop.h:279); D-3400 idiom, same expression, no new edge, no import.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3722; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** Underwater-idiom leads, each needs own brief (D-3722 Next: steed.js:277, steed.js:996, invent.js:4719, display.js:2283, do.js:885, music.js:902, dothrow.js:937, read.js:1870); both generated blocks empty, batch no gap — audit owns re-record + rescore + growth.
**This iter:** audit 2582–2590 @6b1d1abec (9A/0D/0Q, 0 Must-fix: D-3712…D-3722 Deaf-macro/Underwater-idiom refills ACCEPT, every REACH re-measured incl. full 729/729 dosounds + 936/936 makemon reach) + full rescore 939/953 (+0, 0 PASS→FAIL); fortress 44/44; ledger 5/5 seeded-ported sampled clean (christen_monst, readentry, mhitm_ad_elec, undead_to_corpse, get_level all stand ported).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
