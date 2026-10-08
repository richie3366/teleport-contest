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

Score last measured: **2026-10-08** — full `sessions` on `c687c6082`
(audit **2531–2538**, 2026-10-08T04:44:44.998Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`365+1.67/turn` (R² 0.73).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-08 01:29Z)** | **18 / 44**, 8,497 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `365+1.67/turn` (R² 0.73) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,497 vs lockwo 7,776; their RNG 61.0 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts 8,489→**8,497** (+8), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-08 01:29Z (through ~D-3647) — sixth cliff-phase movement (D-3643…D-3662).
**Corpus — picker and proxy (2026-10-08 04:58Z; 953/953 entries, 0 unrecorded):**
**904 / 953** PASS (94.9 %), RNG 99.81 %, screens 99.0 %; `full: true`. Worst families: `scen-options` 14/20, `scen-tutorial` 15/20, `scen-tour` 25/29, `scen-descend` 18/20, `scen-dig` 18/20, `scen-impaired` 18/20, `scen-quest` 18/20, `scen-town` 18/20. Audits record this line next to held-out: the board must rise **with** it. +5 since the last audit (899→904, all per-iteration — Tourist-94171 via D-3652→D-3653, Wizard-94291 via D-3654→D-3655, Healer-94396 via D-3656, Ranger-94320 via D-3657, Tourist-92100 via D-3658 — + 0 on the full rescore, which reproduced the working board exactly on the second run; the first run hit 1 transient worker flake on Priest-92056, clean PASS on direct replay and on re-run); 0 PASS→FAIL, 0 hangs.
Reviews 1225–2538 (index; no row 1618): 1149 ACCEPT, 57 WITH-DEBT, 107 QUALITY-RISK (2531–2538: 8A/0D/0Q, 0 Must-fix queued).
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
Ledger @c5bab1e56: 5329 pinned-C functions — ported 4539 · partial 115 · split 162 · by-design 396 · open 117 (615 declared by seed). Measured: ok 3910, partial 679, thin 234, missing 506. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3662 (index).**
<!-- recent:begin -->
**D-3662** `restore.c` dorecover `:794–795` (`program_state.restoring = REST_GSTATE` at entry, "suppr — `js/save.js` — (1) `game.program_state.restoring = REST_GSTATE` right after payload validation, before any hydration (C `:795` order; stays through the single JSON pass until the existing `:944`-mirror clear); (2) `game.
**D-3661** restore.c dorecover :795/:944 + restgamestate :684 + display.c docrt_flags / vision loop / — TEMP-C log-only paint/state/flush history in the ignored recorder tree: display.c newsym/show_glyph/flush_screen gated on (22,15), restore.c dorecover pre/post-docrt fmon walk + senses + viz + lev dumps, allmain.c preamb
**D-3660** upstream `weapon.c:801–934` (mon_wield_item whole — none — no writer can be named from `show` + `brief` (null jsOwner/entries; the only other owner paints botl, not the map), and the owner's `[measure]` row shipped as D-3570: TEMP-C paint history floor@4995 → [tether n=49
**D-3659** `sp_lev.c` create_monster `:2125` (`mtmp->female = m->female`, RNG-free) + lspo_monster `: — `if (mtmp) mtmp.female = 0;` + C-order cite comment in all three clones (C order: `:2125` before `:2126` peaceful).
**D-3658** `mkmaze.c:1557` (`vision_recalc(2)` at movebubbles entry) + `vision.c:512–850` (vision_rec — `js/mklev.js:movebubbles` runs C's (2)-loop via the existing D-0852/D-0583 helper `vision_off_newsym_gbuf({ useLiveViz: true })` immediately *before* `vision_recalc(2)` — same newsym set, paints (memory, viz emptied) and
**D-3657** `steal.c` `mdrop_obj` `:808–849` (`:840–843` `if (!flooreffects(obj, omx, omy, "fall"))` g — deleted the 23-line clone (D-1849 discipline: import the export, never a second body); `export` on `mon.js` `mdrop_obj` (doc notes the live callers); `dogmove.js` adds `mdrop_obj` to its existing static `mon.js` import (
**D-3656** `mfind0` `nethack-c/upstream/src/detect.c:1965–2013` — wired all three `set_msg_xy(x, y)` in C order + `await flush_topl_more()` after the danger-sense pline (house display_nhwindow(WIN_MESSAGE, FALSE) idiom: vault.js gd_move_cleanup, end.js done1 — NEED_MORE → more(), no-op
**D-3655** `handler_menustyle` `nethack-c/upstream/src/options.c:5544–5583` — verbatim D-3403/D-3654 sibling pattern: prompt row spreads `...menu_prompt_style()` (same-file relay, no new import) + `{ text: '', selectable: false }` blank item, with the tty_end_menu C-cite comment.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3662; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** 94001@238.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
