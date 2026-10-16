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
| **Held-out (judge 2026-10-15 19:12Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (D-3978…D-4008 window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 50850000 ×160 @`7847e3f76`: **144/160 (90.0 %)**, RNG 97.7 %, screens 97.6 % — town 1/2, genesis 2/3, intrinsic 2/3, sweep/symset 9/12 worst; questtour/worldtour 10/12, shop/trek/zapfest 11/12, chain 12/12 |
| **Corpus board (worked, regression fortress)** | `score --new` 2026-10-16 (Grow #14): **563/897** (62.8 %); `tier` (§10.21) → **878 active + 283 reserve + 4311 archive** (144 PASS-on-arrival archived, reserve 277 → 283) |
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
across 12 cohorts (Grow #5–14; previous 143/160 @50750000).
Fresh−held-out gap now 17.3 pts (90.0 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (Grow #14 `score --new`, 2026-10-16, 897 rows):**
563 PASS (62.8 %); RNG 94.42 %, screens 93.4 %; 878 active + 283 reserve + 4311 archive.
Worst families `scen-questtour` 7/31, `scen-zapfest` 8/15, `scen-shop` 16/83,
`scen-worldtour` 66/157, `scen-descend` 7/8, `scen-symset` 20/213,
`scen-sweep` 137/279; next `scen-town` 11/15, rest ≥ 96.9 % RNG.
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
Ledger @39042e5a8: 5329 pinned-C functions — ported 4553 · partial 117 · split 165 · by-design 387 · open 107 (588 declared by seed). Measured: ok 3921, partial 675, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4008 (index).**
<!-- recent:begin -->
**D-4008** trap.c feeltrap `:3588–3594` ("like seetrap() but overrides vision"): `trap->tseen = 1; ma — js/trap.js feeltrap now calls the live map_trap(trap, 1) between tseen and newsym, in C order; map_trap added to the existing display.js import (imports.mjs: no new edge; display.js never imports trap.js, so no cycle).
**D-4007** youprop.h Blind macro (HBlinded||EBlinded)&&!BBlinded, read by dig.c zap_dig `:1693/:1701/ — js/dig.js only — Blind() takes the D-0716 house shape verbatim (uroleplay.blind birth gate + live H/E minus B; cf. shk.js/do_wear.js).
**D-4006** arrival docrt→see_monsters→newsym(!cansee)→display_monster(sightflags DETECTED; HDetect_mo — js/display.js only — lastCol + lastRow extend past spaces with (attr & 0x7), mirroring the firstCol rule (D-0129); space-run CUF extended to trailing inv/uline runs >4 (menu heading byte-proof); mid-row inv/uline runs st
**D-4005** dogmove.c dog_move leash kludge `:1322–1355` (runs when nix==omx: every candidate leash-sk — kludge spiral calls the live `dirtocoord(cc, j)` in both loops (added to the existing const.js import — no new edge; removed the now-unused xdir/ydir names) + rewritten comment citing dogmove.c:1335–1345, cmd.c:3858–3865
**D-4004** invent.c hold_another_object :1208–1306, artifact arm :1219–1244 (`:1224` "in case touchin — js/invent.js (+10/-1): capture `touched`, then `if (game.program_state?.gameover) return obj;` before the refuse/form-change arms (D-4001 idiom) — a fatal touch leaves the orb on the floor exactly as C does. js/jsmain.js
**D-4003** dungeon.c ledger_no :1376 `(xint16)(dlevel + dungeons[dnum].ledger_start)` on {-1,-1} read — js/teleport.js only — in migrate_to_level, when tolev===-1 (reachable only via to-nowhere dst: every other caller passes ledger_no of a valid level ≥ 1, and get_level's walk-break floors at ledger 1 since ledger_start+2-
**D-4002** `timeout.c` hatch_egg `:1017–1189`, carried-consumed arm `:1177–1178` (`else if (carried(e — js/timeout.js only — deleted the shadowing dynamic import (replaced with a 2-line NB comment citing the static invent.js:54 import); the :2591 call now resolves to the live export.
**D-4001** `mthrowu.c` breamm `:1093–1150` — js/mthrowu.js only — after the dobuzz try/finally, `if (game.program_state?.gameover) return M_ATTK_HIT;` before nomul(0) (C runs neither on the fatal path).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4008; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** digactualhole cliff → feeltrap writer (map_trap vision-override paint); verify digactualhole moves 4 probes.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
