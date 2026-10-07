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

Score last measured: **2026-10-06** — full `sessions` on `950a830e7`
(audit **2453–2461**, 2026-10-06T22:53:55.786Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`333+1.68/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-06 19:02Z)** | **16 / 44**, 7,795 / 11,265 pts, RNG **40.6 %**, rngSteps 89.7 %, screens **69.2 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `337+1.64/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (7,795 vs lockwo 7,768; their RNG 61.0 % vs our 40.6 %: our loss is early cliffs in long sessions). 16/44 but pts 7,321→**7,795** (+474), RNG 39.6→**40.6 %**, screens 65.0→**69.2 %** at judge 2026-10-06 19:02Z — second cliff-phase movement (D-3571…D-3582).
**Corpus — picker and proxy (2026-10-06 22:59Z; 953/953 entries, 0 unrecorded):**
**806 / 953** PASS (84.6 %), RNG 99.62 %, screens 97.1 %; `full: true`. Worst families: `scen-options` 1/20, `scen-tutorial` 5/20, `scen-quest` 9/20, `scen-impaired` 11/20, `scen-town` 12/20, `scen-caster` 13/20. Audits record this line next to held-out: the board must rise **with** it. +12 since the last audit (794→806: D-3571…D-3582 per-iteration +9, full-rescore +3: scen-descend-Caveman-94327, scen-engulf-Monk-94052, scen-special-Ranger-94377); 0 PASS→FAIL, 0 hangs (94415 hang fixed by D-3571, review 2453).
Reviews 1225–2461 (index; no row 1618): 1073 ACCEPT, 56 WITH-DEBT, 107 QUALITY-RISK (2453–2461: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @92e0fb53b: 5329 pinned-C functions — ported 4533 · partial 114 · split 162 · by-design 401 · open 119 (626 declared by seed). Measured: ok 3900, partial 679, thin 236, missing 514. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3582 (index).**
<!-- recent:begin -->
**D-3582** `teleport.c` rloc_to_core `:1684` `place_monster(mtmp, x, y)` → `steed.c` place_monster `: — one line + cite: `mtmp.mstate = MON_FLOOR;` (C :931 via :1684), replacing the D-3577 partial clear.
**D-3581** `mkmaze.c` setup_waterlevel (`glyph = cmap_to_glyph(S_water)`, `:1834–1835`) + movebubbles — `js/mklev.js` only — both stores resolve through the live DEC-aware twin (`terrain_glyph`, already imported from display.js; same edge, no TDZ risk): setup hoists `terrain_glyph({ typ: WATER })` once (C sets one glyph fo
**D-3580** `options.c:8758` doset (writer) — `js/options.js` only: the 10th wizard bool row plus a live playmode value.
**D-3579** `display.c` swallowed() `:1332–1386`. First arm `:1337–1339` cls(); bot() — display.js swallowed: first arm calls live same-module clear_glyph_buffer() (C `:1338`→`:2200`; the physical clear rides along — every cell blanked+dirty so the next flush repaints blanks; async cls() stays the docrt arm
**D-3578** Kni-strt string-region grow (lua :37/:40 → `sp_lev.c` :5618–5637) — `js/mklev.js` load_kni_strt: the three string-form regions route through live in-module `light_region`.
**D-3577** `teleport.c` collect_coords `:700` (symptom owner, faithful); writer `teleport.c` rloc_to_ — one line in `rloc_to` at the mx/my set: `mtmp.mstate &= ~MON_OFFMAP` with the `:1684` cite — placement ⟹ on-grid ⟹ visible, restoring the flag⟺grid invariant globally.
**D-3576** `botl.c:130` do_statusline2 (symptom owner, faithful — `js/botl.js` — live `tty_status_update` delivery called from `status_update`, with the whole static family in C order (field init/update/make-fit/check/render/putfield/cl_end/curs/attr+color render state); colors/attrs s
**D-3575** `win/tty/wintty.c` tty_end_menu `:2742–2750` (npages>1 → empty placeholder, else dupstr("( — the fullscreen branch now computes the morestr per the C rule (pageCount>1 → "(p of M)", else "(end) " with trailing space) with cursor [morestr.length+1, endRow] — the same shape as the three guarded sibling sites; also
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3582; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** no Must-fix rows — cliffs head `do_statusline2` (options pagination «(1 of 8)» vs «(1 of 7)», 11 blocks).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Parks re-enter through the cliffs block: when a parked owner heads it, the deliverable is its writer or `[measure]` row. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
