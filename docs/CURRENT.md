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

Score last measured: **2026-10-16** — full `sessions` on `bf7208009`
(audit **2860–2867**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-16 13:26Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 51150000 ×160 @`5241a6149`: **146/160 (91.3 %)**, RNG 98.7 %, screens 97.6 % — options 1/2, symset 7/12 worst; intrinsic/tour 2/3, sweep 10/12; chain/shop/worldtour/zapfest 11/12; questtour/trek 12/12 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2860–2867): **561/1157** (**0 PASS→FAIL**, 6 healed+archived, 20 archived, `unrecorded` 0; RNG 95.7 %, screens 94.6 %); `tier` → **857 + 288 + 4646** (1 out, 0 back) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `388+1.81/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 3 (10,454; leader 11,264 at 43/44).
32/44 at judge 13:09Z 2026-10-15 (+533 pts, screens 88.1→92.8 %,
RNG 92.0→93.5 %): the D-3970..D-3977 window (domove bare returns,
des stackobj, drop_throw broken, portal scan, ghostly/malign, lev-fly
unions, TEXT col-0) moved the judge again — cliffs score where they
reach. **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–92.5 %
across 15 cohorts (Grow #5–17; previous 148/160 @51050000).
Fresh−held-out gap now 18.6 pts (91.3 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (Grow #17 `score --new` + `tier`, 2026-10-16, 888 rows):**
568 PASS (64.0 %); RNG 95.85 %, screens 94.5 %; 863 active + 296 reserve + 4792 archive.
Worst families `scen-questtour` 11/29, `scen-shop` 15/84, `scen-zapfest` 8/19,
`scen-descend` 7/8, `scen-symset` 15/219, `scen-town` 11/16,
`scen-worldtour` 69/154, `scen-sweep` 146/268, rest ≥ 96.9 % RNG.
Reviews 1225–2867 (index; no row 1618): 1467 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2860–2867: 8A/0D/0Q, 0 Must-fix).
Live debts: review index WITH-DEBT rows; 52
`scripts/*.test.mjs` fail on HEAD (stale after rewires; same set since D-3930).
Full rescore (audit only, §10.21): `record` + unfiltered `score` (active tier) + `archive` (+ quota), committed `full: true`; needs the C recorder.

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
< 6 rows): `fresh-cohort.mjs --seed <unused> --n 160 --fold` only (line in
Score; folds failing, scores new rows, tiers). No full rescore (§10.21).
While fresh − held-out > 20 pts,
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
Ledger @76ac4415b: 5329 pinned-C functions — ported 4552 · partial 117 · split 166 · by-design 387 · open 107 (586 declared by seed). Measured: ok 3921, partial 675, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4030 (index).**
<!-- recent:begin -->
**D-4030** potion.c peffect_oil :1260–1294, lit + non-fire-liker arm :1272 `You("burn your %s.", body — js/potion.js:152 only — added `FACE` to the existing `./const.js` import (body-part group).
**D-4029** dokick.c kick_monster :153–159 (`if (Levitation && !rn2(3) && verysmall(mon->data) && !is_ — js/dokick.js only — the wild-miss guard now calls the file-local `Levitation()` (C cite comment).
**D-4028** n/a game code (owner null, cEntry null, stepFns=[exercise] presence-only). Tooling: patch  — none — measurement (this commit).
**D-4027** mhitu.c passiveum :2526–2530 (AD_PHYS/AT_BOOM arm): `You("explode!"); rehumanize(); return — replaced the deferral with `await rehumanize()` in C order (pline → rehumanize → assess_dmg return) with a C-citing comment.
**D-4026** hack.c domove_core `:2766–2776` — js/cmd.js only — deleted the `!forcefight` guard so the condition matches C exactly (Blind/mon_visible/M_AP/sensemon/nomul/move=0 all already C-order); comment now cites hack.c:2766–2776 + the measurement.
**D-4025** `nhlua.c` nhl_gamestate store `:1772–1794` (setnotworn + freeinv per invent item, THEN sna — js/do.js only — enter loop now calls the live `freeinv` export (invent.js:9811: extract + freeinv_core + update_inventory) instead of the manual shift/where; added `freeinv` to the existing invent.js import (imports.mjs:
**D-4024** sp_lev.c lspo_region argc=2 `:5619–5632` (region(selection,"lit"): clone → rlit=checkoptio — js/mklev.js only — replaced the barLit closure + 10 calls with 10 light_region calls (same file, same order, same rects+offset; C cites per line). light_region is C-exact for rectangular selections: ±1 expand when lit (=
**D-4023** sp_lev.c create_monster `:1947–1953` (extinct-unique return after the `:1943` amask burn)  — js/mklev.js placeNamedAtAbs now carries create_monster `:1947–1953` in C order (after the amask burn): G_UNIQ && G_EXTINCT → return null; G_GONE → pm=null (random monster via makemon(null), same as the class path).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4030; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** D-4030 shipped the FACE Must-fix (51150073 s0→s1178); next per regen: look_here / use_pick_axe / lspo_replace_terrain / questtour-50250094.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
