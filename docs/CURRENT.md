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

Score last measured: **2026-10-07** — full `sessions` on `a1ff9df9c`
(audit **2506–2513**, 2026-10-07T19:15:06.545Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`344+1.55/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-07 13:10Z)** | **18 / 44**, 8,076 / 11,265 pts, RNG **41.0 %**, rngSteps 91.5 %, screens **71.7 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `344+1.55/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,076 vs lockwo 7,776; their RNG 61.0 % vs our 41.0 %: our loss is early cliffs in long sessions). 17→**18**/44, pts 7,831→**8,076** (+245), RNG 40.6→**41.0 %**, screens 69.5→**71.7 %** at judge 2026-10-07 07:22Z (through ~D-3599) — fourth cliff-phase movement (D-3598…D-3633); re-scored 13:10Z (through ~D-3621) with identical numbers.
**Corpus — picker and proxy (2026-10-07 19:20Z; 953/953 entries, 0 unrecorded):**
**887 / 953** PASS (93.1 %), RNG 99.81 %, screens 98.9 %; `full: true`. Worst families: `scen-options` 9/20, `scen-impaired` 14/20, `scen-tutorial` 15/20, `scen-dig` 16/20, `scen-tour` 24/29, `scen-quest` 17/20 (`scen-caster` 20/20). Audits record this line next to held-out: the board must rise **with** it. +13 since the last audit (874→887: 12 per-iteration D-3625…D-3633 — 3 via D-3625, 2 via D-3627, 1 via D-3628, 2 via D-3629, 1 via D-3630, 1 via D-3631, 2 via D-3632, 0 via D-3633 — + 1 ownerless-drift scen-hazard-Monk-94153 on the full rescore); 0 PASS→FAIL, 0 hangs.
Reviews 1225–2513 (index; no row 1618): 1124 ACCEPT, 57 WITH-DEBT, 107 QUALITY-RISK (2506–2513: 8A/0D/0Q, 0 Must-fix queued).
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
Ledger @9f919260b: 5329 pinned-C functions — ported 4537 · partial 115 · split 162 · by-design 398 · open 117 (618 declared by seed). Measured: ok 3907, partial 677, thin 236, missing 509. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3633 (index).**
<!-- recent:begin -->
**D-3633** `cfgfiles.c:1543–1589` config_erradd (ready arm `:1577` num_errors++, `:1578–1580` origlin — ready arm splits by window state like the !ready arm (D-3630 precedent): pre-window → configMsg unchanged (C raw_print); windowed → `(async () => { if (showOrig) await pline('\n%s', origline); await pline('%s %s%s%s', ta
**D-3632** lspo_region arms: castle lit-grow + wiz L47 flood — hand-loader inlinings now mirror C. 2 PASS, REACH-OK.
**D-3631** `nethack-c/upstream/src/botl.c:1409–1411` (cond_menu `add_menu_heading` call) + `nethack-c — renamed `ape_heading_attr` → exported `menu_heading_attr` (`js/options.js:7051`, cites corrected to `:1815–1828`/`:1819–1820`/`:1822–1824`; logic untouched — gameover → ATR_NONE, else C-domain `game.iflags.menu_headings.
**D-3630** `cfgfiles.c:1543–1589` config_erradd (!ready arm `:1557–1563`: pline `:1559–1561` + wait_s — config_erradd !ready arm splits by window state: pre-window → configMsg (C raw_print); windowed → return the display promise `(async () => { await pline('%s', msg); await tty_wait_synch(); })()` — C `:1559–1562` in order
**D-3629** `trap.c:5201–5244` drain_en (`disp.botl = TRUE` after uen/uenmax) + `display.c:2236–2239`  — drain_en: `if (game.flags) game.flags.botl = true;` mirror in both arms (paranoia + else), house pattern.
**D-3628** `invent.c:4199–4207` Blind else arm: `const char *surf = surface(u.ux, u.uy)` + `You("try  — `const surf = surface(u?.ux, u?.uy)` with the C `:4201` cite; doc omit retired.
**D-3627** `win/tty/wintty.c` erase_menu_or_text `:965–984` (corner `:981–982` → docorner; fullscreen — new `erase_menu_or_text(offx, offy, maxrow, clear)` export in `js/display.js` — all 4 arms in C order (tty_curs+cl_eos / term_clear_screen as grid ops with C cites; docrt/flush_screen/docorner are live same-module calls)
**D-3626** TEMP sites (all reverted, md5-verified): recorder display.c disclose_cdump helper + gated  — 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3633; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs-head `sounds.c` dosounds — scen-dig-Archeologist-94215@61 (history D-2217, read once; the arm this divergence names is still open).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
