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

Score last measured: **2026-10-16** — full `sessions` on `28130c7ea`
(audit **2837–2843**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-15 19:12Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (D-3978…D-4003 window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 50750000 ×160 @`4ebab628e`: **143/160 (89.4 %)**, RNG 99.2 %, screens 96.8 % — impaired 1/2, symset 7/12, sweep 8/12 worst; questtour/shop/zapfest 10/12, worldtour 11/12, chain/trek 12/12 |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2837–2843): **583/904** active (64.5 %), RNG 94.06 %, screens 93.4 %, **0 PASS→FAIL**; `archive` → **862 active + 277 reserve** (30 PASS recipes out, 5 promoted PASS pending next archive) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `392+1.81/turn` (R² 0.80) |
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
across 11 cohorts (Grow #5–13; previous 143/160 @50650000).
Fresh−held-out gap now 16.7 pts (89.4 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (full rescore, audit 2837–2843, 2026-10-16, 904 active):**
583 PASS (64.5 %); RNG 94.06 %, screens 93.4 %; 0 PASS→FAIL; 862 active + 277 reserve + 4167 archive.
Worst families `scen-questtour` 7/29, `scen-zapfest` 8/14, `scen-shop` 16/82,
`scen-worldtour` 65/155, `scen-symset` 20/210,
`scen-sweep` 135/276; next `scen-town` 11/14, rest ≥ 96.9 % RNG.
Reviews 1225–2843 (index; no row 1618): 1444 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2837–2843: 7A/0D/0Q, 0 Must-fix queued).
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
Ledger @6f501afe8: 5329 pinned-C functions — ported 4553 · partial 117 · split 165 · by-design 387 · open 107 (588 declared by seed). Measured: ok 3920, partial 675, thin 248, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4003 (index).**
<!-- recent:begin -->
**D-4003** dungeon.c ledger_no :1376 `(xint16)(dlevel + dungeons[dnum].ledger_start)` on {-1,-1} read — js/teleport.js only — in migrate_to_level, when tolev===-1 (reachable only via to-nowhere dst: every other caller passes ledger_no of a valid level ≥ 1, and get_level's walk-break floors at ledger 1 since ledger_start+2-
**D-4002** `timeout.c` hatch_egg `:1017–1189`, carried-consumed arm `:1177–1178` (`else if (carried(e — js/timeout.js only — deleted the shadowing dynamic import (replaced with a 2-line NB comment citing the static invent.js:54 import); the :2591 call now resolves to the live export.
**D-4001** `mthrowu.c` breamm `:1093–1150` — js/mthrowu.js only — after the dobuzz try/finally, `if (game.program_state?.gameover) return M_ATTK_HIT;` before nomul(0) (C runs neither on the fatal path).
**D-4000** `fountain.c` drinksink :611–621 (case 2; losehp→done(DIED) noreturn); `do_wear.c` Amulet_o — (1) drain idiom in the else arm (needs_done → finish_losehp_done + gameover return; else finish_maybe_wail), monstunseesu after on survival (C order; the wail is non-fatal only per D-3998). (2) MAGICAL_BREATHING mirror a
**D-3999** `wizard.c` resurrect `:770–778` — the gate now reads the C-exact union `!!((u.HDeaf|0) || (u.EDeaf|0) || u.uroleplay?.deaf || u.Deaf)` (cuss shape, same file — no new edge); the doc omit drops the retired "Deaf-aware acoustics polish" clause (SetVoice st
**D-3998** `eat.c` eatcorpse `:1923–1943` — after `finish_losehp_done()`, return 1 only when `gameover` is still set (real death via really_done); survived → fall through like C (no maybe_wail — C hack.c:4290 else-if; JS losehp sets no wail flag in the fatal path 
**D-3997** `cmd.c` do_run `:1605–1618` ('5'→run=3 + DOMOVE_RUSH, PREFIXCMD) + rhack bad_command `:383 — js/cmd.js only. (1) Deleted the house `end_running` from `rhack_unknown_command` — C `:3833–3841` verbatim (retires D-3953 omission 1's run-stop clause; its falsifier fired). (2) The run/rush gate reads call-local `prefi
**D-3996** `mhitu.c` gulpmu `:1289–1587` (AD_PHYS squash arm, physical tail + `Maybe_Half_Phys` `:154 — none (measurement).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4003; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** cliffs head = `monmove.c` distfleeck ×3 (SYMPTOM, owner whole) — ghoul writer: wish-portal dst {-1,-1} is OOB in C ledger_no (JS-only panic); retire the migrant as never-arriving in migrate_to_level, verify Archeologist-50456037 PASS (couatl/zapfest keep own writers).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
