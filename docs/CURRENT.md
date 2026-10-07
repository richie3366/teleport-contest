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

Score last measured: **2026-10-07** — full `sessions` on `4a3125515`
(audit **2462–2470**, 2026-10-07T03:28:43.616Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`368+1.75/turn` (R² 0.75).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-07 01:35Z)** | **17 / 44**, 7,831 / 11,265 pts, RNG **40.6 %**, rngSteps 89.7 %, screens **69.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `368+1.75/turn` (R² 0.75) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (7,831 vs lockwo 7,768; their RNG 61.0 % vs our 40.6 %: our loss is early cliffs in long sessions). 16→**17**/44, pts 7,795→**7,831** (+36), RNG 40.6→**40.6 %**, screens 69.2→**69.5 %** at judge 2026-10-07 01:35Z (through D-3584) — third cliff-phase movement (D-3580…D-3593).
**Corpus — picker and proxy (2026-10-07 03:35Z; 953/953 entries, 0 unrecorded):**
**825 / 953** PASS (86.6 %), RNG 99.71 %, screens 97.7 %; `full: true`. Worst families: `scen-options` 3/20, `scen-tutorial` 9/20, `scen-quest` 10/20, `scen-impaired` 12/20, `scen-caster` 13/20, `scen-town` 14/20. Audits record this line next to held-out: the board must rise **with** it. +19 since the last audit (806→825: D-3580…D-3593 per-iteration +16, full-rescore +3: scen-container-Valkyrie-94066, scen-impaired-Tourist-94270, scen-pet-Wizard-94125); 0 PASS→FAIL, 0 hangs.
Reviews 1225–2470 (index; no row 1618): 1082 ACCEPT, 56 WITH-DEBT, 107 QUALITY-RISK (2462–2470: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @4a967d2f0: 5329 pinned-C functions — ported 4535 · partial 115 · split 162 · by-design 398 · open 119 (624 declared by seed). Measured: ok 3905, partial 677, thin 236, missing 511. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3593 (index).**
<!-- recent:begin -->
**D-3593** `rnd.c:289–295` `reseed_random` (`if (has_strong_rngseed) init_random(fn)`); `init_random` — none in js/ — audit only.
**D-3592** `include/optlist.h` NHOPTB(whatis_menu) `:874–876` (`&iflags.getloc_usemenu`) + NHOPTB(wha — the two `DOSET_BOOL_ADDR` keys repointed to `getloc_usemenu`/`getloc_moveskip` with optlist cites (twin defect, same C block, same table, same consumer file).
**D-3591** `mklev.c` mklev `:1577–1593` (reseed pairs `:1579–1580` / `:1591–1592`) + `rnd.c` reseed_r — `js/rng.js` gains `reseed_random(fn)` with the C `:293` guard live over `game.has_strong_rngseed` (unset reads undefined ≡ decl.c FALSE; `void fn` per scored-`void` precedent).
**D-3590** `botl.c` status_hilite_menu_choose_behavior `:3707–3808` (behavior menu with accelerators  — `js/botl.js` only. choose_behavior ported whole with C's accelerators as selectors (BL_CONDITION auto-picks with no menu); menu_add ported whole as a 4-label state loop in C order — threshold parse emulates C's in-place 
**D-3589** `windows.c` select_menu `:1855–1865` (gb.bot_disabled = TRUE around win_select_menu, saved — wrap the loop in set_bot_disabled(true)/restore (try/finally, C `:1859–1863` shape, sibling precedent) — paint, dismiss, and all returns run disabled exactly like C's wrapped select. js/options.js only; set_bot_disabled 
**D-3588** `win/tty/wintty.c` tty_status_update `:4503–4513` (Sprintf(status_vals, fmt, text) with fu — `js/botl.js`: new module-local `sprintf_percent_s` (single-`%s`-conversion subset: `-` flag, width, precision, surrounding literal preserved) wired at the `:4513` site; `tty_putstatusfield` lands a status space attr-free
**D-3587** `mklev.c:1577–1593` mklev (no recount between makelevel :1587 and level_finalize_topology  — `js/mklev.js` only, no new imports (same-module count_level_features). mklev re-ported whole in C order (:1582 init_mapseen → :1583 getbones gate → :1586 in_mklev → :1587 makelevel → :1589 finalize; reseed pairs cited as
**D-3586** `options.c` optfn_suppress_alert do_set `:4142–4148` (negated→bad_negation FALSE; op!=empt — `js/options.js` only, no new imports (get_feature_notice_ver, get_current_feature_ver, config_error_add already imported).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3593; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** batch @4a967d2f0 — rnd.c reseed_random audit (js/rng.js, 1 fn).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
