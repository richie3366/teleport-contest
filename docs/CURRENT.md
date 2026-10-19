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

Score last measured: **2026-10-19** — full `sessions` on `ca5f00130`
(audit **2943**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-19 13:17Z)** | **34 / 44**, 10,742 / 11,265 pts, RNG **99.3 %**, rngSteps 98.7 %, screens **95.4 %** (+1 pt vs 07:18Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-19 (audit 2943 @`ca5f00130`): **658/864** pre-archive (653 at the last audit, +5 = D-4102's 5 claimed flips) → **649/855** (**0 PASS→FAIL**, 9 archived, `entries` 855, `unrecorded` 0; active tier scored 655/801, RNG 99.42 %, screens 98.6 %); `tier` → **785 + 58 + 5547** (0 out, 5 back, 3 now PASS); worst symset 33/76, questtour 8/11, dig 9/10, zapfest 9/15, shop 20/28, options 24/48, sweep 174/228, worldtour 86/117 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `88+0.36/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,547; leader 11,264 at 43/44).
32/44 at judge 01:35Z 2026-10-17 (+93 pts, screens 92.8→93.6 %,
RNG 93.5→96.9 %): the D-4042..D-4047 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–93.7 %
across 17 cohorts (Grow #5–19; previous 149/159 @51250000).
Fresh−held-out gap now 20.4 pts (93.1 % vs 72.7 %), outside the §10.20 band —
but Grow #18 already calibrated, so no step-5 family this grow.
**Corpus (Grow #19 `score --new` + `tier`, 2026-10-17, 916 rows):**
648 PASS (70.7 %); RNG 98.31 %, screens 97.4 %; 904 active + 239 reserve + 5247 archive.
Worst families `scen-hallu` 0/4, `scen-symset` 72/190, `scen-extcmd` 9/40,
`scen-questtour` 11/15, `scen-sweep` 148/267, `scen-worldtour` 71/156,
`scen-zapfest` 8/20, `scen-shop` 22/66, rest ≥ 96.9 % RNG.
Reviews 1225–2943 (index; no row 1618): 1535 ACCEPT, 72 WITH-DEBT, 111 QUALITY-RISK (2943: 0A/1D/0Q, 0 Must-fix).
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
Ledger @e384672c1: 5329 pinned-C functions — ported 4558 · partial 113 · split 166 · by-design 387 · open 105 (580 declared by seed). Measured: ok 3924, partial 672, thin 249, missing 484. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4102 (index).**
<!-- recent:begin -->
**D-4102** optlist.h:336–337 `NHOPTB(force_invmenu, …, &iflags.force_invmenu, …)`; invent.c getobj `: — options.js: force_invmenu, herecmd_menu, sounds → iflags in both tables; extmenu, toptenwin → iflags in allopt. invent.js: both prompt-row sites push the blank first and then the prompt on top, with add_menu_heading_attr
**D-4101** sounds.c domonnoise MS_BONES `:970–975` `nomul(-2); gm.multi_reason = "scared by rattling" — both writers now assign `null` (C NULL), with a C cite.
**D-4100** potion.c potionhit `:1633–1641`: the hero arm prints `pline_The("%s crashes on your %s and — hero arm uses `body_part(HEAD)` (already imported from polyself.js); the evaporate line is the single C `Tobjnam_pot(obj, 'evaporate')` call (the file's local Tobjnam: The(xname) + otense).
**D-4099** detect.c reveal_terrain `:2372` captures `swallowed = u.uswallow`; reveal_terrain_getglyph — the hero_memory arm attaches GLYPH_UNEXPLORED when there is no remembered glyph (mklev.c:852), and still uses the remembered int, or the stone default for an id-less memory, otherwise.
**D-4098** getpos.c getpos `:865–866` auto_describe → `:650` do_screen_description, where `:1268–1271 — split the arm: statues keep the monster letter, and bodies return `live_showsyms(objects[CORPSE].oc_class + SYM_OFF_O)` as C's glyphmap does.
**D-4097** dokick.c kick_monster `:162–175`: when the target is mundetected or mimicking a non-monste — `a_monnam(mon)`, added to the existing do_name.js import (imports.mjs: edge already present).
**D-4096** sp_lev.c lspo_object `:3556–3755`: `des.object()` is the empty-table arm (nhlua.c lcheck_p — both stand-ins now go through l_create_object exactly as C's lua does: null class → `l_create_object({})` (the empty-table arm), a class constant → `l_create_object(def_oc_syms[oclass].sym)` (the letter arm), and the roo
**D-4095** eat.c lesshungry `:3314–3315` sets `gn.nomovemsg = "You're finally finished."`; the attack — nomul restarted to C's body: the nomovemsg clear is gone, and `multireasonbuf = ''` is added (C `:4170`). unmul gets the same `multireasonbuf` reset (C `:4198`).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4102; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** D-4055: cliffs row-11 do_improvisation (rows 1–10 park-hold D-4016/D-4028, re-verify live); harp --More-- arm + callers.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
