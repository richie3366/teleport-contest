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

Score last measured: **2026-10-16** — full `sessions` on `6aed804b1`
(audit **2868–2874**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-16 13:26Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 51150000 ×160 @`5241a6149`: **146/160 (91.3 %)**, RNG 98.7 %, screens 97.6 % — options 1/2, symset 7/12 worst; intrinsic/tour 2/3, sweep 10/12; chain/shop/worldtour/zapfest 11/12; questtour/trek 12/12 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2868–2874): **592/1144** (**0 PASS→FAIL**, 18 healed+archived, 27 archived, `unrecorded` 0; RNG 96.2 %, screens 92.4 %); `tier` → **850 + 282 + 4819** (5 out, 19 back) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `400+1.79/turn` (R² 0.80) |
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
Worst families `scen-zapfest` 8/19, `scen-shop` 18/79, `scen-symset` 29/206,
`scen-questtour` 16/25, `scen-sweep` 145/266, `scen-worldtour` 68/153,
rest ≥ 96.9 % RNG.
Reviews 1225–2874 (index; no row 1618): 1474 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2868–2874: 7A/0D/0Q, 0 Must-fix).
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
Ledger @47ef59f73: 5329 pinned-C functions — ported 4552 · partial 117 · split 166 · by-design 387 · open 107 (586 declared by seed). Measured: ok 3921, partial 675, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4037 (index).**
<!-- recent:begin -->
**D-4037** `include/youprop.h:372` (`#define Unchanging (HUnchanging || EUnchanging)`); `pray.c` in_t — js/pray.js only — added `Unchanging` to the existing `./polyself.js` import (imports.mjs: edge already present, no new edge); :581 const and :792 fix-arm read now call `Unchanging(u)` (C-cited, D-4036-class dual-store mi
**D-4036** hack.c:1100–1102 autoopen gate (`flags.autoopen && !context.run && !Confusion && !Stunned  — js/cmd.js + js/hack.js only — all four predicates read both flats (D-3772 canonical shape: `(u.HStun | 0) || u.Stunned`, `(u.HConfusion | 0) || u.Confusion`), C-cited (youprop.h:80–84, hack.c:1100–1102/:1113–1114).
**D-4035** teleport.c teleds `:527` (single `newsym(u.ux0, u.uy0)` — deleted the extra newsym (+ C-cite comment).
**D-4034** potion.c make_vomiting `:243–255` (`old = Vomiting; Unaware→talk=FALSE; set_itimeout(&Vomi — js/potion.js only — make_vomiting now mirrors TIMEOUT bits to uprops[VOMITING].intrinsic (slot created when absent), D-2396 sibling shape verbatim + C cites (youprop.h:111, potion.c:250); VOMITING added to the existing c
**D-4033** dat/hellfill.lua hells[4] :363–369 (`cwid == 1`, iron-bars walls, `percent(80)` → `des.rep — js/mklev.js only — the gate arm now calls the live whole same-module `lspo_replace_terrain({ mapfragment: '.\nF\n.', toterrain: '.', chance })` with the chance burned before the call (lua table-constructor order).
**D-4032** dig.c use_pick_axe :1092–1156 — the loop now runs in C order through the live exports — `cmd_from_dir(dir, MV_WALK)` per index 0..9, uswallow/movecmd-planar-filter/up-down arms with C short-circuit, NUL-truncate before display (Sprintf %s semantic for 
**D-4031** (1–2) wintty.c tty_print_glyph `:3930–3936` (inverse reads MG_OBJPILE/MG_FEMALE off the pa — (1–2) new display.js glyph_bank_attr(gid) (C tty_print_glyph :3930–36 + reset_glyphmap :2788–2835: pile ⟺ exact piletop banks — normal/generic/body/statue — plus female-statue wizmgender; DETECT/BW named); newsym memory 
**D-4030** potion.c peffect_oil :1260–1294, lit + non-fire-liker arm :1272 `You("burn your %s.", body — js/potion.js:152 only — added `FACE` to the existing `./const.js` import (body-part group).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4037; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** D-4037 (this): 8×dupe-rc s0 + 95340 re-verified kin first-hand (D-4016/D-4028 hold) → first live row dopray/Ranger-50055084 s355: writer = in_trouble HIT-gate Unchanging read misses E+uprops (poly + worn unchanging amulet), C's «much better» never printed; focused test red→green, verify dopray movement + REACH.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
