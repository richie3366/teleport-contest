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

Score last measured: **2026-10-07** — full `sessions` on `d0040be10`
(audit **2497–2505**, 2026-10-07T15:54:44.013Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`349+1.66/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-07 07:22Z)** | **18 / 44**, 8,076 / 11,265 pts, RNG **41.0 %**, rngSteps 91.5 %, screens **71.7 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `334+1.63/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,076 vs lockwo 7,768; their RNG 61.0 % vs our 41.0 %: our loss is early cliffs in long sessions). 17→**18**/44, pts 7,831→**8,076** (+245), RNG 40.6→**41.0 %**, screens 69.5→**71.7 %** at judge 2026-10-07 07:22Z (through ~D-3599) — fourth cliff-phase movement (D-3598…D-3627).
**Corpus — picker and proxy (2026-10-07 16:00Z; 953/953 entries, 0 unrecorded):**
**874 / 953** PASS (91.7 %), RNG 99.81 %, screens 98.7 %; `full: true`. Worst families: `scen-options` 5/20, `scen-impaired` 14/20, `scen-quest` 15/20, `scen-tutorial` 15/20, `scen-dig` 16/20, `scen-tour` 23/29 (`scen-caster` 20/20). Audits record this line next to held-out: the board must rise **with** it. +27 since the last audit (847→874: 25 per-iteration D-3616…D-3627 — Wizard-91112 via D-3616, Valkyrie-94212 via D-3617, 5 tut-lit via D-3618, 5 dovspell via D-3619, 5 disclose via D-3620, 4 pickinv via D-3621, 3 PICK_NONE via D-3622, 0 via D-3623, Caveman-94091 via D-3624 — + 2 ownerless-drift Tourist-94250/Tourist-94102 on the full rescore); 0 PASS→FAIL, 0 hangs.
Reviews 1225–2505 (index; no row 1618): 1116 ACCEPT, 57 WITH-DEBT, 107 QUALITY-RISK (2497–2505: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @8245e6151: 5329 pinned-C functions — ported 4536 · partial 116 · split 162 · by-design 398 · open 117 (620 declared by seed). Measured: ok 3907, partial 677, thin 236, missing 509. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3627 (index).**
<!-- recent:begin -->
**D-3627** `win/tty/wintty.c` erase_menu_or_text `:965–984` (corner `:981–982` → docorner; fullscreen — new `erase_menu_or_text(offx, offy, maxrow, clear)` export in `js/display.js` — all 4 arms in C order (tty_curs+cl_eos / term_clear_screen as grid ops with C cites; docrt/flush_screen/docorner are live same-module calls)
**D-3626** TEMP sites (all reverted, md5-verified): recorder display.c disclose_cdump helper + gated  — 
**D-3625** `dog.c:906` relmon → `mon.c:2561–2594` (mon_leaving_level `:2569` runs before the fmon unl — in the sync mirror the C `:2571–2584` fmon unlink now runs before the `if (onmap)` block (seemimic/fill_pit-core/newsym), with a JS-ORDER comment citing C `mon.c` + `rm.h:510` vs the `mon.js`/`display.js` fallback lines;
**D-3624** `options.c` handler_number_pad `:5893–5950` (`:5915` end_menu with the prompt) + `win/tty/ — `js/options.js` handler_number_pad raw header only — prompt gains `attr: ATR_INVERSE` (C `:5915`) + `{ text: '', selectable: false }` blank item (C wintty.c), verbatim the sibling comment + shape.
**D-3623** `src/options.c` optfn_boolean do_set `:5192–5449` (fuzzer gate `:5239–5244`, opt_perm_inve — `optfn_boolean_do_set` restarted in C order (same name/signature + async + bool return: true = C fell through to the toggle gate, false = early return): addr retreat `:5204`, fuzzer gate, perm_invent can_set gate (same-f
**D-3622** - `win/tty/wintty.c` `tty_display_nhwindow` NHW_MENU case `:1902–1947` (H2344 `:1907–1911` — `select_menu_pick_none` branches like the sibling PICK_ONE loop: npages>1 → unchanged fullscreen paint_overlay (+ explicit {offx:0} geom); single-page → `await paint_corner_nhw_menu(page, morestr)` (:3252: geometry, MESS
**D-3621** `invent.c` display_pickinv `:3181–3184` (sortflags = (sortloot=='f') ? LOOT : INVLET, |= P — `js/invent.js` display_pickinv_reply else-branch only — C's sortflags computation (in-file sortpack_on helper), sortloot(inv, sortflags, false, null), nextclass loop over inv_order_classes() (+VENOM strkitten, dodiscover
**D-3620** `end.c:1246–1247` (`really_done`: `display_nhwindow(WIN_MESSAGE, FALSE)`) → `wintty.c:1873 — `js/display.js`: new `mark_topline_empty()` (C `:1873–1884` else-arm: EMPTY + msg-cur zero, no visual change) wired in `really_done` after `flush_topl_more()` (NEED_MORE arm already ends EMPTY via `more()`, so unconditio
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3627; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs head `teleport.c` mlevel_tele_trap (3 sessions scen-options-Valkyrie-94311, scen-quest-Archeologist-94276, scen-trap-Knight-94121; history D-2288 — read once; the arm this divergence names).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
