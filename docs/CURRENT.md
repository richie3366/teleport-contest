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

Score last measured: **2026-10-15** — full `sessions` on `746adfbb3`
(audit **2816–2822**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-15 07:22Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** |
| **Fresh cohort (§10.20, scored on arrival)** | 50450000 ×160 @`65fe937c4`: **139/160 (86.9 %)**, RNG 98.9 %, screens 97.5 % — symset 4/12 worst |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-15 of active 1,177: **611 PASS** (0 PASS→FAIL, 0 heals); `archive` → active **1,108** (566 failing + 530 fortress + 12 private) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `394+1.75/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 3 (10,454; leader 11,264 at 43/44).
32/44 at judge 07:22Z 2026-10-15 (+533 pts, screens 88.1→92.8 %,
RNG 92.0→93.5 %): the D-3970..D-3977 window (domove bare returns,
des stackobj, drop_throw broken, portal scan, ghostly/malign, lev-fly
unions, TEXT col-0) moved the judge again — cliffs score where they
reach. **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–91.8 %
across 8 cohorts (Grow #5–10, latest 139/160).
Fresh−held-out gap now 14.2 pts (86.9 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` now 200/398).
**Corpus (2026-10-15 13:10Z, `746adfbb3`, 1177/1177 entries, `full: true`):**
611 PASS (0 PASS→FAIL, 0 heals — no `js/` since `d9ea00c54`);
RNG 35609609/38934181 (91.46 %), screens 728472/817465
(89.11 %); then `archive` → active 1,108 (566 failing + 530 fortress
+ 12 private). Worst families `scen-questtour` 8/25,
`scen-shop` 16/78, `scen-worldtour` 69/154, `scen-sweep` 129/266,
`scen-symset` 14/199; next `scen-zapfest` 10/14, rest ≥ 96 % RNG.
`scen-sweep-Priest-582706` still FAIL@1166 (known recorder flake, D-3885 park
stands — unchanged since the Grow #6 re-record).
Reviews 1225–2822 (index; no row 1618): 1423 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2816–2822: 7A/0D/0Q, 0 Must-fix queued).
Live debts: review index WITH-DEBT rows; 52
`scripts/*.test.mjs` fail on HEAD (stale after rewires; same set since D-3930).
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs <cores-4>` (≈10–35 min), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

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
Ledger @75ebd635b: 5329 pinned-C functions — ported 4554 · partial 113 · split 164 · by-design 388 · open 110 (596 declared by seed). Measured: ok 3919, partial 677, thin 243, missing 490. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3977 (index).**
<!-- recent:begin -->
**D-3977** `wintty.c` process_text_window `:1819–1829` linestart — js/pager.js only — hoist `utf8Handling` (live `game.gs.symset[currentgraphics].handling === H_UTF8`, glyphs.js:1005 idiom, probe-verified 5/Enhanced2 mid-session; H_UTF8 joins the existing const.js edge); per line, when 
**D-3976** `hack.c` u_simple_floortyp `:1833–1848` (`:1835` u_in_air ≡ Levitation||Flying||!grounded, — u_simple_floortyp u_in_air now `u.Levitation || Levitation_st() || u.Flying || Flying_st() || !grounded(...)` (in-file unions, C order, D-3810 shape). pooleffects: all three gates read the same unions via the live export
**D-3975** `monmove.c` m_move `:1970` (`!rn2(++chcnt)`, appr==0 peaceful loop); `mon.c` mfndpos diago — none — measurement iteration, no `js/` changed.
**D-3974** `restore.c` getlev ghostly `is_unicorn(mtmp->data)` (`mondata.h:149`: mlet S_UNICORN && li — js/bones.js — import the live C-exact `is_unicorn` (js/monsters.js:503; `imports.mjs --can`: already-imports-monsters edge) and call it in the ghostly gate (D-1849-class clone deleted). js/mklev.js — `set_malign(mtmp)` a
**D-3973** `dog.c` mon_arrive MIGR_PORTAL `:553–557` (`for (t = gf.ftrap; t; t = t->ntrap) if (t->tty — js/dog.js only — `arrive_find_magic_portal` scans live `game.level.traps` first (C newest-first order, `maketrap` unshift ⟺ `ttmp->ntrap = gf.ftrap`), then the gf-shaped `game.ftrap` fallback (array, else ntrap chain) fo
**D-3972** `mthrowu.c` drop_throw `:161–196` — js/mthrowu.js only — `broken = await flooreffects(...)` (C :180 verbatim); m_at hoisted above flooreffects (C :179); explicit `down_gate(x, y) !== MIGR_NOWHERE` gate around ship_object (C :176–177; the live export gates 
**D-3971** sp_lev.c `create_object` :2422–2423 (`if (!(containment & SP_OBJ_CONTENT)) stackobj(otmp); — added the missing `:2422-2423` `stackobj` (post-attrs, C order; null-safe via live export) at all 15 floor des-place sites.
**D-3970** `hack.c` domove `:2796–2797` (attackmon-done bare `return`) and `:2802–2808` (ironbars/web — js/cmd.js only — removed both JS-only `end_running` calls and the redundant `move = 1` (move stays the allmain preset 1; nothing on these paths clears it), leaving C-exact bare returns with cites.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3977; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix empty → `do_statusline2` cliffs head (14 blocks, first s250; writer-per-session as before).
**This iter:** audit 2816–2822 (7 ACCEPT, 0 Must-fix) + full rescore 611/1177 (0 PASS→FAIL); held-out 32/44 rank 3.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
