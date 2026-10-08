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

Score last measured: **2026-10-08** — full `sessions` on `87a7713db`
(audit **2554–2561**, 2026-10-08T15:35:20.601Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`364+1.62/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-08 13:44Z, ours 13:18Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `364+1.57/turn` (R² 0.74) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-08 13:44Z (ours scored 13:18Z, pre-D-3679 — the judge lags this audit's 8 SHAs).
**Corpus — picker and proxy (2026-10-08 15:41Z; 953/953 entries, 0 unrecorded):**
**934 / 953** PASS (98.0 %), RNG 100.00 %, screens 99.9 %; `full: true`. Worst families: `scen-tutorial` 17/20, `random` 56/61, `explore` 116/124, `scen-impaired` 19/20, `scen-town` 19/20, `scen-tour` 28/29. Audits record this line next to held-out: the board must rise **with** it. +12 since the last audit (922→934: Rogue-94391 via D-3679; Ranger-94031 + Archeologist-94051 via D-3681; Archeologist-92023 via D-3682; scen-dig pit pair + Monk-91117 latent via D-3683; `!` pair via D-3685; Tourist-92134 via D-3686; newt+lichen pair via D-3687); 0 PASS→FAIL, 0 hangs. Remainder: 13 env:config-path + 5 unattributed + 1 mon_wield_item (RECORDER-ARTIFACT).
Reviews 1225–2561 (index; no row 1618): 1171 ACCEPT, 57 WITH-DEBT, 108 QUALITY-RISK (2554–2561: 7A/0D/1Q, 1 Must-fix queued).
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
Ledger @0560c51fd: 5329 pinned-C functions — ported 4538 · partial 117 · split 163 · by-design 396 · open 115 (615 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3689 (index).**
<!-- recent:begin -->
**D-3689** not mon_wield_item (faithful per D-2460/D-3660 — none (measure only).
**D-3688** `potion.c:1461–1476` strange_feeling; `:1465` `Hallucination` is the `youprop.h:120` macro — deleted the shadow — the text arm now calls the live display.js `Hallucination()` (already imported, used 6× in detect.js; D-1493 macro reader: HH flat || uprops[HALLUC].intrinsic, resist = flats + uprops[HALLUC_RES]).
**D-3687** `getpos.c` gather_locs_interesting `:487–503` (GLOC_VALID falls through to GLOC_INTERESTIN — `js/getpos.js` only — INTERESTING/VALID arms restarted glyph-based per C `:451–452` + `:487–503` (live glyph_at/glyph_is_cmap/glyph_to_cmap/is_cmap_* + glyph_is_nothing/glyph_is_unexplored and S_bars/S_ice/S_air/S_cloud 
**D-3686** `bones.c:356–385` can_make_bones — js/end.js only — the portal arm scans the live level.traps array first, then the ftrap node chain when set (quest.js:294–306 portal-find shape for the same C loop; wizard.js:814 / detect.js:2282 / pager.js:2933 same dual
**D-3685** `sys/unix/unixunix.c:343–365` (`dosh`) — js/cmd.js only — new live `dosh()` export (:1504–1528) carrying the whole unix body in C order: literal three-disjunct shellers gate over `game.sysopt?.shellers` (sys.js:49 default null; cfgfiles parses SHELLERS) + live 
**D-3684** contest patch 006-nomux-capture.patch (recorder `win/tty/termcap.c`): `nomux_capture_scree — 
**D-3683** cmd.c set_move_cmd `:1386–1400` — js/cmd.js only — the three arms now seed u.dz/dx/dy at the arm top in C order (`:1389–1391`: dz=0 planar + DIR_DX/DY), before the travel clears and the `:1396–1399` guard (which now reads the fresh dz, always-true for pl
**D-3682** display.c magic_map_background `:233–258` (`:241–246`: !cansee && !waslit ROOM → (dark_roo — js/display.js only — the DARKROOMSYM arm now renders the stored glyph: `dsym === S_STONE` (Rogue) → tg blank `{ch:' ',NO_COLOR}` (NOTHING-arm shape); non-Rogue S_darkroom keeps floor tg (correct: this arm implies the :18
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3689; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** Must-fix `strange_feeling` resist gate (review 2555) — ships alone next port iter; then mon_wield_item → audit re-record.
**This iter:** audit 2554–2561 (7A/0D/1Q) + full rescore 934/953; next port iter ships Must-fix strange_feeling resist gate alone.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
