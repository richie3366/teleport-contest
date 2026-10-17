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

Score last measured: **2026-10-17** — full `sessions` on `cb680e202`
(audit **2909–2915**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-17 13:14Z)** | **34 / 44**, 10,202 / 11,265 pts, RNG **97.1 %**, rngSteps 95.9 %, screens **90.6 %** (rank 5; thru D-4069 window) |
| **Fresh cohort (§10.20, scored on arrival)** | 51750000 ×160 @`a959c88b6`: **150/160 (93.8 %)**, RNG 98.6 %, screens 98.1 % — options 1/2 worst; extcmd 6/9; normal 4/5; shop 8/10; hallu 8/9; symset 8/9; sweep 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-17 (audit 2909–2915): **628/1094** pre-archive (**0 PASS→FAIL**, 1 new PASS 50556502, 21 archived, `unrecorded` 0; RNG 99.14 %, screens 98.4 %); `tier` → **843 + 218 + 5808** (0 out, 0 back); worst hallu 1/7, symset 33/123, questtour 9/13, dig 9/10, worldtour 70/150, zapfest 8/19, sweep 161/263, shop 16/65, options 19/58, extcmd 6/40 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `403+1.83/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 5 (10,202; leader 11,264 at 43/44).
34/44 at judge 13:14Z 2026-10-17 (RNG 97.1 %, screens 90.6 %):
count held vs the 07:10Z read (34/44 at 10,741 pts); points read
lower on the latest board (10,202; cause unattributed — judge
rescored between reads).
**Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–93.8 %
across 20 cohorts (Grow #5–22; previous 149/159 @51650000).
Fresh−held-out gap now 16.5 pts (93.8 % vs 77.3 %), inside the §10.20 band —
no step-5 family this grow (judge 34/44).
**Corpus (Grow #22 `score --new` + `tier`, 2026-10-17, 884 rows):**
622 PASS (70.4 %); RNG 98.92 %, screens 98.1 %; 864 active + 218 reserve + 5787 archive.
Worst families `scen-symset` 45/135, `scen-questtour` 9/13,
`scen-dig` 9/10, `scen-hallu` 1/7, `scen-zapfest` 8/19,
`scen-worldtour` 73/154, `scen-sweep` 160/266, `scen-shop` 16/65,
`scen-options` 19/58, `scen-extcmd` 6/41, rest ≥ 99.2 % RNG.
Reviews 1225–2915 (index; no row 1618): 1515 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2909–2915: 7A/0D/0Q, 0 Must-fix).
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
Ledger @72455a58c: 5329 pinned-C functions — ported 4550 · partial 120 · split 166 · by-design 387 · open 106 (582 declared by seed). Measured: ok 3923, partial 674, thin 247, missing 485. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4081 (index).**
<!-- recent:begin -->
**D-4081** engrave.c can_reach_floor :200–201 (`u.usteed && P_SKILL(P_RIDING) < P_BASIC` → FALSE — wired both C arms in C order (D-3919 pattern): steed rank read mirrors the canonical engrave.js shape (weapon_skills[P_RIDING], object-or-flat); ceiling via mon.js ceiling_hider + game.youmonst?.data house shape. imports
**D-4080** mthrowu.c breamm :1093–1150 — js/mthrowu.js breamm writes `game._buzzer` (2-line rename + C cite; try/finally kept).
**D-4079** sp_lev.c create_monster `:1947–1953` (id valid → g_mvflags read; G_UNIQ+G_EXTINCT return;  — placeNamed now carries `:1947–1953` in C order (after the amask burn): G_UNIQ && G_EXTINCT → return; G_GONE → pm=null (random via makemon(null)).
**D-4078** display.c flush_screen `:2208–2267` (esp `:2241–2257` dirty-span print over gg.gbuf, which — in that arm, when `!game._stale_map_flush && game._leave_gbuf_level`, `paint_gbuf_level_to_terminal(game._leave_gbuf_level)` (same-module, no new import; sync paint, draws no RNG; Get-bones-yn precedent bones.js:848).
**D-4077** hack.c nomul `:4161–4173` — deleted the spurious `game.nomovemsg = null`; added the C-arm's `game.multireasonbuf = ''`; doc rewritten with whole-body C-order cites (`:4163–4172`).
**D-4076** do.c doaltarobj :363–390 (`:380–382` There(an(hcolor(blessed ? NH_AMBER : NH_BLACK))…)); d — D-3640 shape — deleted the clone, added `hcolor` to the existing `./do_name.js` import (imports.mjs: edge ALREADY, no new edge).
**D-4075** detect.c do_vicinity_map 2nd loop :1566–1574 (`newglyph = glyph_at(zx,zy); if (glyph_is_mo — js/detect.js only — 2nd-loop predicate now C-order/short-circuit over the displayed glyph id: `if (!glyph_is_monster(newglyph.glyph) || glyph_to_mon(newglyph.glyph) === PM_LONG_WORM_TAIL) continue;` using the live C-exac
**D-4074** `sp_lev.c` create_monster `:2125–2129` (`mtmp->female = m->female; if (m->peaceful > BOOL_ — js/mklev.js only — `set_malign(mtmp)` inside the override arm (same shape/comment as the six D-3974 sites) + `else mtmp.female = 0` for class specs (C :2125/:3355–3356; id specs already keep the find_montype gender, draw
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4081; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** rank-21 moverock_core Blind-feel (Caveman-50055085 s1165 + Priest kin): toplines match «That feels like a boulder.», map cell C `·` vs JS `)` — writer TBD (19 dupe-rc + 95340 stood-park re-verified, D-4016/D-4028 stand).
**Iter:** rank-29 bg_enlightenment writer init_mapseen (r1–21 park-held re-verified; r22–27 PASS-stale flips in; r28 dupe-rc) — C re-inits tut-2 after leaving_tutorial discard, JS deduped → missing 2nd tut-2 line (S2/S5 PASS); S1/S3/S4 separate writers. / D-4074 shipped the head (Bar-loca des-malign re-run; 51750091 PASS).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
