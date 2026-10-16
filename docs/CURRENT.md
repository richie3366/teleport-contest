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

Score last measured: **2026-10-16** — full `sessions` on `6607c2f82`
(audit **2853–2859**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-16 07:21Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 51050000 ×160 @`1c7d7bc15`: **148/160 (92.5 %)**, RNG 98.8 %, screens 97.9 % — caster/town 1/2 worst; symset 8/12, sweep/worldtour 10/12, shop/zapfest 11/12; chain/questtour/trek 12/12 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2853–2859): **557/1165** (**0 PASS→FAIL**, +1 healed, 11 archived, `unrecorded` 0; RNG 95.2 %, screens 94.4 %); `tier` → **864 + 288 + 4478** (0 out, 1 promoted) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `397+1.77/turn` (R² 0.79) |
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
across 14 cohorts (Grow #5–16; previous 140/159 @50950000).
Fresh−held-out gap now 19.8 pts (92.5 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (Grow #16 `score --new` + `tier`, 2026-10-16, 896 rows):**
571 PASS (63.7 %); RNG 95.33 %, screens 94.4 %; 878 active + 287 reserve + 4626 archive.
Worst families `scen-questtour` 11/33, `scen-shop` 15/83, `scen-zapfest` 9/19,
`scen-descend` 7/8, `scen-symset` 15/214, `scen-town` 11/16,
`scen-worldtour` 72/160, `scen-sweep` 146/274, rest ≥ 96.9 % RNG.
Reviews 1225–2859 (index; no row 1618): 1459 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2853–2859: 6A/1D/0Q, 1 Must-fix queued).
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
Ledger @d4c675cc7: 5329 pinned-C functions — ported 4552 · partial 117 · split 166 · by-design 387 · open 107 (586 declared by seed). Measured: ok 3920, partial 676, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4021 (index).**
<!-- recent:begin -->
**D-4021** muse.c use_defensive MUSE_SCR_CREATE_MONSTER `:998–1036` (mreadmsg `:1015` → enexto/makemo — js/muse.js — MM_ASYNCGROUP (const.js existing import) OR'd into the makemon + makemon_appear_msg flags of MUSE_WAN_CREATE_MONSTER and MUSE_SCR_CREATE_MONSTER (member appears awaited inline per member via m_initgrp_async,
**D-4020** read.c:2256–2259 `case SCR_IDENTIFY: case SPE_IDENTIFY: seffect_identify(&sobj)` (shared a — js/read.js only — (1) `SPE_IDENTIFY` const (:197, objectNames pattern); (2) `case SPE_IDENTIFY:` on the SCR_IDENTIFY arm (C :2256–2259 shape + cite); (3) final return `is_scroll ? null : sobj` (C keeps *sobjp for non-scr
**D-4019** dat/hellfill.lua rnd_hell_prefab :300-317 (repeat/until pick + repeatable re-roll, nloops> — js/mklev.js only — (1) `hellfill_rnd_halign/valign` (:85-93), `HELLFILL_PREFABS` (10 entries in lua order, map strings byte-exact — /tmp scratch compare vs lua source: 11/11 incl. both prefab-9 variants; P1 is 16 rows, l
**D-4018** `hack.h:1162-1175` — js/const.js only — `MM_ASYNCGROUP = 0x02000000` (next free bit in the shared word) + corrected comment citing C + D-4018.
**D-4017** do_name.c x_monnam `:886–904` priest/minion arm, esp `:889–899`: save EHalluc_resistance,  — js/do_name.js only — the x_monnam priest arm now also saves/clears/restores the `u.Hallucination` sticky alongside EHalluc_resistance when !do_hallu (C's shape; the sticky shadows the same macro; priestname is sync so re
**D-4016** unixmain.c:150 initoptions() → options.c:7114 initoptions_finish → :7327 rcfile() → cfgfil — none — measurement (this commit). /tmp/cfgprobe-probe.mjs (kept out of tree): pinned recorder binary unmodified, /tmp install copy, fresh mkdtemp home with the probe rc — raw stdout to the first KIND=input marker is 178 
**D-4015** dat/themerms.lua is_eligible :890-902 (`local diff = nh.level_difficulty()`), read by the  — both sites now use the live `level_difficulty()` (already imported in mklev.js :15 — no new edge).
**D-4014** makemon.c m_initgrp :79-145 (cnt=rnd(n)/div loop, peace_minded skip, enexto_gpflags+makemo — opt-in deferred tail (D-4011's reverted shape, probe-scoped via a flag so its hallu/caller regressions cannot fire): (1) `MM_ASYNCGROUP = 0x00200000` (const.js; JS-only, next free bit); (2) makemon tail early-returns for
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4021; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** live head `xname_flags` (4× mid-group split: monster scroll/wand create-monster grouped summons paint all members before the member-Norep --More-- splits; D-4014 MM_ASYNCGROUP follow-up wiring unit for the two muse arms).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
