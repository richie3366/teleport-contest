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

Score last measured: **2026-10-17** — full `sessions` on `80a8469b3`
(audit **2897–2903**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-17 07:10Z)** | **34 / 44**, 10,741 / 11,265 pts, RNG **99.3 %**, rngSteps 98.7 %, screens **95.3 %** (+194; thru D-4055) |
| **Fresh cohort (§10.20, scored on arrival)** | 51650000 ×160 @`bc65b2e1a`: **149/159 (93.7 %)**, RNG 99.9 %, screens 99.0 % — sweep 7/10 worst; extcmd 7/9; shop 8/10; symset 8/9; hallu 7/8; worldtour 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-17 (audit 2897–2903): **622/1101** (**0 PASS→FAIL**, 7 new PASS, 19 archived, `unrecorded` 0; RNG 98.2 %, screens 95.3 %); `tier` → **837 + 226 + 5480** (0 out, 7 back); worst hallu 0/5, symset 32/135, questtour 9/13, dig 9/10, worldtour 71/154, zapfest 8/19, sweep 156/265, shop 16/61, options 19/58, extcmd 6/36 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `397+1.83/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,741; leader 11,264 at 43/44).
34/44 at judge 07:10Z 2026-10-17 (+194 pts, screens 93.6→95.3 %,
RNG 96.9→99.3 %): the D-4048..D-4055 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–93.7 %
across 19 cohorts (Grow #5–21; previous 149/160 @51550000).
Fresh−held-out gap now 16.4 pts (93.7 % vs 77.3 %), inside the §10.20 band —
no step-5 family this grow (judge 32→34).
**Corpus (Grow #21 `score --new` + `tier`, 2026-10-17, 867 rows):**
605 PASS (69.8 %); RNG 98.88 %, screens 97.9 %; 851 active + 229 reserve + 5629 archive.
Worst families `scen-hallu` 0/6, `scen-symset` 33/136, `scen-questtour` 9/13,
`scen-dig` 9/10, `scen-worldtour` 71/155, `scen-zapfest` 8/19,
`scen-sweep` 157/268, `scen-shop` 16/63, `scen-options` 19/58, `scen-extcmd` 6/38, rest ≥ 99.2 % RNG.
Reviews 1225–2903 (index; no row 1618): 1503 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2897–2903: 7A/0D/0Q, 0 Must-fix).
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
Ledger @e3ee99443: 5329 pinned-C functions — ported 4550 · partial 120 · split 166 · by-design 387 · open 106 (584 declared by seed). Measured: ok 3923, partial 674, thin 247, missing 485. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4069 (index).**
<!-- recent:begin -->
**D-4069** read.c seffect_confuse_monster :1399–1451, :1404 `altfeedback = (Blind || Invisible)`; you — js/read.js — one hoisted `const altfeedback = Blind || (Invis() && !See_invisible())` (C :1404 order, D-1999-cited) replacing all three dead-flat reads; `Invis` + `See_invisible` added to the existing `./timeout.js` impo
**D-4068** zap.c wish_history_menu :6275–6309 (DEBUG-on menu; :6298 end_menu(win, "Wish what?")); win — js/zap.js only — the prompt item now spreads `...menu_prompt_style()` (live relayed-slot read, C-cited; correct under rc menu_headings overrides too); `menu_prompt_style` added to the existing `./options.js` import (impo
**D-4067** options.c doset_simple_menu :8654–8656 (bool → parseoptions("!name",FALSE,FALSE) → optfn_b — js/options.js — bool arm now `await optfn_boolean_do_set(opt.name, simple_bool_value(opt), false)` (the shared fullscreen-doset mirror; all 22 simple bool addrs verified identical to DOSET_BOOL_ADDR); deleted the dead st
**D-4066** dig.c digactualhole :640–829 — js/dig.js only — removed all 5 extra newsyms (4 early arms → bare `return`s, tail → C-cite comment); pure removal, no new imports, signature kept so callers stay wired.
**D-4065** sp_lev.c lspo_monster table arm :3341–3358 (draw-free id/female/class reads) + :3382–3386  — none ([measure] — no js/).
**D-4064** detect.c do_vicinity_map 1st loop (show_map_spot + map_monst/map_invisible arms) / 2nd loo — none ([measure] — no js/).
**D-4063** nhlsel.c:407-427 l_selection_rndcoord (empty selection: no draw, returns {x:-1,y:-1} table — js/mklev.js only — both siege loops: on null pick, C-order random fallback inline (same-module live calls, no new imports/edges): `pm_to_humidity` → `get_location_random(loc|NO_LOC_WARN)` → DRY retry on (-1,-1) → `splev_
**D-4062** hack.c:4289–4291 losehp runs maybe_wail inline. The four damage sites, all losehp (C mdama — one `await finish_maybe_wail()` per losehp in exact C order + cites: attrib.js:415 (after the fatal block — no-op on survived-fatal since the flag is only set by losehp's non-fatal else arm — before setuhpmax); music.js:
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4069; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** D-4069 shipped doread writer seffect_confuse_monster altfeedback (dead u.Invisible flat → canonical Invis&&!See_invisible: Caveman PASS, Rogue 1060→nohandglow@1115; 4 light/mapping Shape-A stay as separate cause; ranks 22–25 stale PASSes recorded).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
