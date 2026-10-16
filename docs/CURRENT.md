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

Score last measured: **2026-10-16** — full `sessions` on `d9747bd2c`
(audit **2844–2852**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-16 01:37Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (D-3978…D-4015 window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 50950000 ×159 @`a95d0eb7e`: **140/159 (88.1 %)**, RNG 98.8 %, screens 97.4 % — impaired/options 1/2 worst; questtour/symset/worldtour/zapfest 9/12, chain/sweep 10/12, shop 11/12; trek 12/12 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2844–2852): **572/1173** (**0 PASS→FAIL**, +2 healed); Grow #15 `score --new`: **562/901** (62.4 %); `tier` (§10.21) → **877 active + 289 reserve + 4465 archive** (12 out, 2 promoted) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `399+1.87/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 3 (10,454; leader 11,264 at 43/44).
32/44 at judge 13:09Z 2026-10-15 (+533 pts, screens 88.1→92.8 %,
RNG 92.0→93.5 %): the D-3970..D-3977 window (domove bare returns,
des stackobj, drop_throw broken, portal scan, ghostly/malign, lev-fly
unions, TEXT col-0) moved the judge again — cliffs score where they
reach. **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–91.8 %
across 13 cohorts (Grow #5–15; previous 144/160 @50850000).
Fresh−held-out gap now 15.4 pts (88.1 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (Grow #15 `score --new` + `tier`, 2026-10-16, 901 rows):**
562 PASS (62.4 %); RNG 94.86 %, screens 93.6 %; 877 active + 289 reserve + 4465 archive.
Worst families `scen-questtour` 7/34, `scen-zapfest` 8/18, `scen-shop` 16/84,
`scen-descend` 7/8, `scen-worldtour` 68/159, `scen-symset` 17/212,
`scen-sweep` 143/278; next `scen-town` 11/15, rest ≥ 96.9 % RNG.
Reviews 1225–2852 (index; no row 1618): 1453 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2844–2852: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @24cf3a108: 5329 pinned-C functions — ported 4552 · partial 117 · split 166 · by-design 387 · open 107 (587 declared by seed). Measured: ok 3921, partial 675, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4015 (index).**
<!-- recent:begin -->
**D-4015** dat/themerms.lua is_eligible :890-902 (`local diff = nh.level_difficulty()`), read by the  — both sites now use the live `level_difficulty()` (already imported in mklev.js :15 — no new edge).
**D-4014** makemon.c m_initgrp :79-145 (cnt=rnd(n)/div loop, peace_minded skip, enexto_gpflags+makemo — opt-in deferred tail (D-4011's reverted shape, probe-scoped via a flag so its hallu/caller regressions cannot fire): (1) `MM_ASYNCGROUP = 0x00200000` (const.js; JS-only, next free bit); (2) makemon tail early-returns for
**D-4013** makemon.c maybe_generate (allmain.c:166 rn2(70)=0 at t25/t28) → makemon → m_initlgrp (m_in — none (measurement iteration; no port attempted — no single arm identified with decisive evidence; a blind enexto/goodpos patch would risk NO MOVEMENT against the HP paradox).
**D-4012** uhitm.c mhitm_ad_elec `:2704–2723` (mhitu arm), `:2711` `if (Shock_resistance)`; youprop.h — js/mhitu.js only — the arm's Shock_resistance union now ORs `u.uprops[SHOCK_RES].intrinsic/extrinsic` (SHOCK_RES already imported at :25; in-file :1842 shape + D-1089 comment).
**D-4011** (a) attrib.c adjabil :1006–1074 (kni_abil HFast@7 «quick»/«slow» :45); exper.c losexp :229 — (a) js/attrib.js only — ADJABIL_UPROPS flat→index map (all 12 table props) + merged prev/gates + dual-write store() in gain and lose arms (guarded on u.uprops existing for the chargen path; all names already imported — n
**D-4010** dothrow.c throwit `:1710–1728` (returning-missile catch after bhit; fires for a swallowed  — js/dothrow.js only — the `:1719` site now calls plain merging addinv_before (dynamic u_init.js import, the module's existing edge — no new import), with a C-citing comment; addinv_before_throw's doc now states return_thr
**D-4009** nhlua.c nhl_gamestate restore `:1744–1753` re-adds the stash via addinv_nomerge and re-wea — js/do.js only — the restore re-wears via the live setworn (do_wear.js full slot loop covers W_WEP/SWAPWEP/QUIVER + armor; already imported, no new edge); setworn_restore deleted; dispatcher is now C's if/else-if/else wit
**D-4008** trap.c feeltrap `:3588–3594` ("like seetrap() but overrides vision"): `trap->tseen = 1; ma — js/trap.js feeltrap now calls the live map_trap(trap, 1) between tseen and newsym, in C order; map_trap added to the existing display.js import (imports.mjs: no new edge; display.js never imports trap.js, so no cycle).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4015; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** unattributed themerooms difficulty — Valkyrie-50156016 s539 + Ranger-95308 s432 (both rn2(1037) Twin draw): is_eligible depth→level_difficulty (mindiff-4 gate).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
