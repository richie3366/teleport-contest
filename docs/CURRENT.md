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
| **Fresh cohort (§10.20, scored on arrival)** | 51550000 ×160 @`6ede25602`: **149/160 (93.1 %)**, RNG 99.0 %, screens 99.1 % — hazard 0/1, sweep/worldtour 7/10 worst; caster 1/2; hallu/extcmd 8/9; shop 9/10 + rest 100 % |
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
across 18 cohorts (Grow #5–20; previous 149/160 @51450000).
Fresh−held-out gap now 15.9 pts (93.1 % vs 77.3 %), inside the §10.20 band —
no step-5 family this grow (judge 32→34).
**Corpus (Grow #20 `score --new` + `tier`, 2026-10-17, 877 rows):**
608 PASS (69.3 %); RNG 98.36 %, screens 97.6 %; 856 active + 233 reserve + 5461 archive.
Worst families `scen-hallu` 0/5, `scen-symset` 42/147, `scen-questtour` 9/13,
`scen-dig` 9/10, `scen-worldtour` 70/158, `scen-zapfest` 8/19,
`scen-sweep` 150/265, `scen-shop` 16/61, `scen-options` 19/58, `scen-extcmd` 6/36, rest ≥ 99.2 % RNG.
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
Ledger @e4c933c90: 5329 pinned-C functions — ported 4550 · partial 120 · split 166 · by-design 387 · open 106 (584 declared by seed). Measured: ok 3923, partial 674, thin 247, missing 485. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4062 (index).**
<!-- recent:begin -->
**D-4062** hack.c:4289–4291 losehp runs maybe_wail inline. The four damage sites, all losehp (C mdama — one `await finish_maybe_wail()` per losehp in exact C order + cites: attrib.js:415 (after the fatal block — no-op on survived-fatal since the flag is only set by losehp's non-fatal else arm — before setuhpmax); music.js:
**D-4061** fountain.c drinkfountain case 29 :367–379 (pline + whole-fmon `monflee(mtmp, 0, FALSE, FAL — js/fountain.js only — case 29 calls the live `monflee(mtmp, 0, false, false)` over fmon with a DEADMONSTER-exact guard (`(mhp|0) < 1`, monst.h:214); `monflee` added to the existing ./monmove.js import (:100; imports.mjs:
**D-4060** eat.c cprefx :851–857 (`if (!Slimed && !Unchanging && !slimeproof(...))` → You + make_slim — js/eat.js only — `Unchanging` added to the existing ./polyself.js import (:140; imports.mjs: ALREADY edge, TDZ-neutral); the :852 read now calls canonical `Unchanging(u)` (polyself.js:438 — flats + uprops[UNCHANGING] int
**D-4059** display.c newsym :916–1099; the !isok arm :929–935 (off-map :932 panics, column-0 :933 is  — js/display.js only — the :929–935 arm (live `isok`/COLNO/ROWNO/`panic` imports, zero new edges) plus an ordered microtask drain (`queueNewsymImpossible`) that awaits the real `impossible()` per hit, sequentially.
**D-4058** pickup.c do_loot_cont `:2150–2160` (bite `:2154`, `losehp(Maybe_Half_Phys(rnd(10)))` `:215 — js/pickup.js only (+13/−1) — `finish_maybe_wail` added to the existing ./hack.js import (imports.mjs: ALREADY edge, no new edge); one `await finish_maybe_wail()` after each of the 3 losehp sites in C order (do_loot_cont'
**D-4057** uhitm.c do_attack `:474` `boolean foo = (Punished || !rn2(7) || (is_longworm && wormno) || — js/uhitm.js only (+5/−3) — the disjunct now reads the live ball `game.u?.uball` (codebase-wide Punished convention: trap.js:7501, do.js:1803, ball.js:1107, pray.js:255 `Punished()`), short-circuit order preserved (uball 
**D-4056** pager.c do_screen_description `:1266–1271` (looked prefix = `encglyph(glyphinfo.glyph)`);  — both message-row writers now home + overwrite + cl_end with the C0 skip (D-3962 grid rule verbatim, `charCodeAt < 32 → continue`, column still advances, tail cleared from line end): js/display.js `_buildScreenOutput` `:7
**D-4055** music.c improvised_notes :740 (`if (!(Unchanging && svc.context.jingle[0] != '\0'))` — js/music.js only — `import { Unchanging } from './polyself.js'` (imports.mjs --can: IN-SCC, hoisted function, cycle-safe; music.js had no polyself edge); the read now calls `Unchanging(game.u || {})` (C-cited, D-4037-cla
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4062; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** audit 2897–2903: 7A/0D/0Q, 0 Must-fix. Next port pops the regen head.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
