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

Score last measured: **2026-10-06** — full `sessions` on `26c8df1c6`
(audit **2445–2452**, 2026-10-06T17:40:17.427Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`337+1.64/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-06 13:02Z)** | **16 / 44**, 7,321 / 11,265 pts, RNG **39.6 %**, rngSteps 88.1 %, screens **65.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `337+1.64/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo 17/44, RNG 61.0 % vs our 39.6 %: our loss is a few early cliffs in long sessions). 16/44 but RNG 34.8→**39.6 %** (+97 pts) at judge 2026-10-06 13:02Z — first judge movement since the cliff phase opened (D-3557/D-3558/D-3559/D-3561 landing; pre-D-3562 code).
**Corpus — picker and proxy (2026-10-06 17:46Z; 953/953 entries, 0 unrecorded):**
**794 / 953** PASS (83.3 %), RNG 99.50 %, screens 96.6 %; `full: true`. Worst families: `scen-options` 1/20, `scen-tutorial` 4/20, `scen-impaired` 8/20, `scen-quest` 9/20, `scen-town` 11/20, `scen-caster` 13/20. Audits record this line next to held-out: the board must rise **with** it. +43 since the last audit (751→794: D-3562…D-3575 per-iteration +35, full-rescore +8); 0 PASS→FAIL, 1 scoring→hang (scen-ride-Knight-94415 since D-3567 — Must-fix, review 2450).
Reviews 1225–2452 (index; no row 1618): 1064 ACCEPT, 56 WITH-DEBT, 107 QUALITY-RISK (2445–2452: 7A/0D/1Q, 1 Must-fix queued).
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
Ledger @0745728bf: 5329 pinned-C functions — ported 4517 · partial 114 · split 162 · by-design 403 · open 133 (629 declared by seed). Measured: ok 3889, partial 675, thin 235, missing 530. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3575 (index).**
<!-- recent:begin -->
**D-3575** `win/tty/wintty.c` tty_end_menu `:2742–2750` (npages>1 → empty placeholder, else dupstr("( — the fullscreen branch now computes the morestr per the C rule (pageCount>1 → "(p of M)", else "(end) " with trailing space) with cursor [morestr.length+1, endRow] — the same shape as the three guarded sibling sites; also
**D-3574** `cmd.c` rhack `:3809–3825` (post-command: `:3812–3813` CANCEL|FAIL → `reset_cmd_vars(TRUE) — wired the `:3812–3816` rule into every rhack result site, in C order (reset before the pre-existing move lines, `^W`-precedent shape): ECMD-bit arms (`^A`, `,`, `p`, `>`, `<`, `d`, `D`, `T`, `A`, `_`, `q`, `Z`, `E`, `^T`
**D-3573** `getpos.c:1052–1061` (matching[] build: `c == defsyms[sidx].sym || c == gs.showsyms[sidx]` — `js/getpos.js` only, deletion (+13/−35): the DEC block is gone from `build_feature_matching` (matching[] is now exactly C :1052-1061) and the 5 dec-gated tags are gone from `feature_match_tags`; dead `use_dec_syms` + unu
**D-3572** `monmove.c` `mb_trapped :59`, `postmov :1571/:1588/:1613` (`else if (!Deaf)` guarding the  — all four gates → `!hero_Deaf()` (live in-module export ≡ C macro; its extra `|| u.Deaf` disjunct is dead code — zero writers).
**D-3571** `nethack-c/upstream/src/hack.c` domove_core `:2841–2846` — C-order `move = 0; nomul(0);` (nomul owns the `end_running(true)` teardown, multi/mv included) in all six arms: testdiag-into-doorway, testdiag-out-of-doorway, rock/bars `blocksMove` bump (the hang arm), squeeze `cant_sq
**D-3570** TEMP sites (all reverted, md5-verified): recorder `weapon.c:895` tether arm (state dump),  — 
**D-3569** `nethack-c/upstream/src/getpos.c:451-470` — `js/getpos.js` only — GLOC_DOOR arm restarted per C `:466-470`: `glyph_at` + live `glyph_is_cmap`/`glyph_to_cmap` (joins the existing `./display.js` import) + local `is_cmap_door` (exact C range, pre-existing) + new loca
**D-3568** `display.c` back_to_glyph — `js/display.js` only — (1) terrain_glyph STONE+SCORR share C's arm (arboreal→TREE cell, else blank); (2) DBWALL → cmap_idx_to_tty(horizontal?S_HCDBRIDGE:S_VCDBRIDGE); (3) DRAWBRIDGE_UP → DB_UNDER switch → cmap_idx_to_tty
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3575; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** no Must-fix rows (hang shipped D-3571) — regenerated cliffs head (`do_statusline2`: options page-count ×10, Satiated ×2, gold ×3, Pw ×1).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Parks re-enter through the cliffs block: when a parked owner heads it, the deliverable is its writer or `[measure]` row. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
