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

Score last measured: **2026-10-13** — full `sessions` on `51d3b17bc`
(audit **2773–2781**, 2026-10-13T12:52:30Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`352+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-13 13:24Z)** | **22 / 44**, 9,012 / 11,265 pts, RNG **51.8 %**, rngSteps 93.7 %, screens **80.0 %** |
| **Fresh cohort (§10.20, scored on arrival)** | 49950000 ×158 @`45bdd980f`: **140/158 (88.6 %)**, RNG 94.9 %, screens 95.5 % — worldtour 18/24 worst |
| **Corpus board (worked, regression fortress)** | **2116 / 2296** @`d6efb0a28` full, RNG 97.81 %, screens 97.5 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `352+1.57/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 5 (9,012; rohitgandikota 10,499 at 35/44,
jon-bell 10,340 at 38/44, lockwo 8,715). Flat at 22/44, RNG 51.7–51.8 %
from 2026-10-11 to 13:24Z 2026-10-13 through ~45 cliff iterations while
the board rose 1326 → 1408: the §10.19 falsifier fired (Constitution
§10.20). **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 610000 marathon ×160
→ 126/160 (79 %); 620000 mixed ×160 → 141/160 (88 %); 49950000 ×158 →
140/158 (88.6 %, Grow #5). Gap to held-out (50 %): the generator's
calibration error.
**Corpus (2026-10-13, `d6efb0a28`, 2296/2296 entries, `full: true`):**
2116 PASS; worst families `scen-shop` 73/100, `scen-sweep` 273/332,
`scen-worldtour` 253/301, `scen-options` 31/36, `scen-zapfest` 18/20;
rest ≥ 91 %. 1 PASS→FAIL: `scen-sweep-Priest-582706` (known recorder
flake, D-3885 park stands — re-record completed to s1238 this run,
diverging at s1166 on a map row).
Reviews 1225–2781 (index; no row 1618): 1384 ACCEPT, 61 WITH-DEBT, 111 QUALITY-RISK (2773–2781: 9A/0D/0Q, 0 Must-fix queued).
Live debts: `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; 52
unit tests in `scripts/*.test.mjs` fail on HEAD (stale after rewires —
same set before and after D-3930).
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈25 min for 2296), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

**PASS (44):** every session in `sessions/`.

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

## Primary objective — CALIBRATED PROXY, COMPLETE DATA (human, 2026-10-13, Constitution §10.20 on top of §10.18–19)

**Why:** held-out flat at 22/44 through ~45 cliff iterations while the
board rose 82 sessions; fresh cohorts pass 79–88 % on arrival against the
judge's 50 %; `quest.lua` role text was 176/368 complete (D-3930 closed it).

**Port slot:** Must-fix, else the **Open — cliffs** head — now ranked by
**screens lost summed over sessions** (the judge's unit; frequency ×
impact), unattributed sessions included one per row (deliverable: measure
at the printed step, name the writer, port it). Owner vs writer, whole C
function, every caller, `verify.mjs --fn` **movement + REACH-OK**: as
before. One cause healing several rows ships them together. A fix that
adds "the entry for role/variant X" ships the whole table instead.
**Grow slot:** every iteration with n % 10 == 5 (and any port slot with
< 6 rows): `fresh-cohort.mjs --seed <unused> --n 160 --fold` first (its
line goes in Score), then ≥ 240 more sessions weighted to the worst fresh
families, record, full rescore, commit. While fresh − held-out > 20 pts,
every second grow adds/reshapes a family (`HIDDEN-PROXY.md` §5c).
**Audit:** review + full rescore + held-out + fresh + board side by side.
**Completeness audit (§10.20; work these as cliffs surface them, whole):**
1. `dat/quest.lua` role tables — **done** (D-3930, generated).
2. `dat/symbols` — 14 symsets; JS hand-codes DECgraphics (+ partial
   IBM/curses). Extract or prove; a non-DEC `symset:` held-out rc breaks
   every map screen.
3. Level loaders — 126/126 scripts present; prove each whole (every
   `des.*`, every random branch) — a per-script `des.*` count diff tool
   is the cheap first step.
4. Message literals — `python3 scripts/c-literal-coverage.py`: 116 of
   4099 C message literals absent from `js/` (most env/error paths;
   gameplay: `dig.c` hole/bury ×10, `uhitm.c` ×6, `engrave.c`, `steal.c`).
5. Start regime — measured fine 2026-10-13 (68/68 probe: legacy on,
   tutorial prompt, default symset, interactive chargen; don't re-check).
**Falsifier:** ~30 iterations with fresh PASS rising and held-out flat →
revisit the generator families, not the port.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @c639bbbcb: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (605 declared by seed). Measured: ok 3907, partial 681, thin 238, missing 503. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head; a coverage row rides along only as a same-C-file companion;
growth is a supervisor slot (§10.19–20), never a ledger batch or a
self-filed row. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3932 (index).**
<!-- recent:begin -->
**D-3932** `uhitm.c` mhitm_ad_drin mhitu arm `:3244` mdamageu → `:3249` eat_brains → `:3263` adjattri — js/mhitu.js only — `if (game.program_state?.gameover) return;` after mdamageu (C-cited comment; lifesave returns with gameover false and falls through per C; covers the Upolyd rehumanize-fatal path too).
**D-3931** `dat/hellfill.lua` hells[6] :405–407 (`if (percent(25)) then des.terrain(selection.match(" — js/mklev.js only — the arm now calls `lspo_terrain(selection_match_mapfrag('w'), 'W')` (same-module live export + hoisted sibling, no new edge) with a C cite comment.
**D-3930** questpgr.c com_pager_core `:468–621` reads `questtext[filecode][msgid]` from `dat/quest.lu — new extractor `scripts/extract-quest-text.py` (shares the parser of extract-quest-nemesis.py) → `js/generated/quest_text.js` `QUEST_ROLE_MSGS[msgid][Role]` (string array or `{text, synopsis?, output?}` as written).
**D-3929** load_special epilogue sp_lev.c:6464-6466 (link_doors_rooms→remove_boundary_syms(`:1016-103 — js/mklev.js only (+8: comment + `remove_boundary_syms()` call before wallification, C order). remove_boundary_syms itself unchanged (already faithful, just uncalled-for-strt).
**D-3928** `quest.c on_start` `:26–37` (first home visit `qt_pager("firsttime")` `:29`) ← `onquest` ` — js/questpgr.js only (data): Cav firsttime body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. blank line after «quest.» and double space after «seems…here.»; `%l`/`%H` conversions previously shipped) + 
**D-3927** `hack.c:4079–4101` crawl_destination + `teleport.c:86+` goodpos boulder arm (`sobj_at(BOUL — `js/hack.js` only — gate replaced with the C call `goodpos(x, y, game.youmonst, 0)` (no new import; hack↔teleport static pair is long-standing and runtime-only); orthogonal/NODIAG/Passes_walls/door-block/squeeze arms unc
**D-3926** `monmove.c` dochug Demonic Blackmail `:802–825` (mux-mismatch `:805–822` pre-existing; `}  — `js/monmove.js` only — else arm resolves the live `demon_talk` (dynamic `import('./minion.js')`, the sounds.js:1717 MS_BRIBE-site pattern; `imports.mjs --can monmove.js minion.js demon_talk`: SAFE, hoisted fn, same 101-m
**D-3925** `mhitu.c` passiveum AD_ACID `:2477–2480` (`if (!rn2(30)) erode_armor(mtmp, ERODE_CORRODE); — `js/mhitu.js` only — `acid_damage` added to the existing `./trap.js` import (line 111 edge, no new edge; mhitm edge ALREADY per `imports.mjs --can`); the AD_ACID arm now `await erode_armor(mtmp, ERODE_CORRODE)` / `await 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3932; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** pop the regen'd cliffs head.
**This iter:** cliffs-head randomize_gem_colors writer mhitm_ad_drin (mhitu arm): JS mdamageu kills but falls through to eat_brains+tail (+5 draws); C mdamageu→done_in_by→done is NORETURN — gate after mdamageu; probe scen-chain-Monk-610158 seg5.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
