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

Score last measured: **2026-10-19** — full `sessions` on `12a20993c`
(audit **2924–2933**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-19 07:18Z)** | **34 / 44**, 10,741 / 11,265 pts, RNG **99.3 %**, rngSteps 98.7 %, screens **95.3 %** (unchanged since audit 2897–2905; no newer judge run at audit 2924–2933; rank 2) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-19 (audit 2924–2933 @`12a20993c`): **749/985** pre-archive (669 at the last audit, +80 in D-4083..D-4092 incl. 39 stale reserve rows re-scored) → **700/936** (**0 PASS→FAIL**, 49 archived, `entries` 936, `unrecorded` 0; active tier 688/859, RNG 99.47 %, screens 98.7 %); `tier` → **859 + 65 + 5466** (1 out, 57 back, 54 of them now PASS); worst questtour 8/11, symset 60/105, dig 9/10, zapfest 11/17, shop 22/30, options 25/53, sweep 179/247, worldtour 90/126 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `87+0.36/turn` (R² 0.81) |
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
Reviews 1225–2933 (index; no row 1618): 1526 ACCEPT, 71 WITH-DEBT, 111 QUALITY-RISK (2924–2933: 9A/1D/0Q, 0 Must-fix).
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
Ledger @584fdf37d: 5329 pinned-C functions — ported 4558 · partial 113 · split 166 · by-design 387 · open 105 (582 declared by seed). Measured: ok 3924, partial 672, thin 249, missing 484. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4094 (index).**
<!-- recent:begin -->
**D-4094** detect.c reveal_terrain_getglyph `:2208` `glyph = glyph_at(x, y)`, and with keep_traps the — an else-arm sets glyph_shows_cloud when the cell is seen, a region covers it, the hero isn't Blind, and no monster/I is shown there (kind not 'mon'/'invisible'), which is C's _map_location tail.
**D-4093** artifact.c invoke_fling_poison → dothrow.c throwit → thitmonst `:2256–2259` → hmon → uhitm — the early block calls `cxname(obj)` first, C's do_hit snapshot order, before the msleeping/can_blnd work.
**D-4092** do.c flooreffects `:231–234` `losehp(Maybe_Half_Phys(rnd(15)), "squished under a boulder", — right after the squish losehp, flooreffects drains finish_maybe_wail + finish_losehp_done (the read.js/do.js drain idiom) and returns on gameover.
**D-4091** insight.c attributes_enlightenment `:1571–1580` `if (See_invisible) { if (!Blind) enl_msg( — both gates also read `u.uprops[SEE_INVIS].intrinsic || .extrinsic`.
**D-4090** insight.c status_enlightenment `:1190–1193` `if (Hunger) { if (magic || cause_known(HUNGER — the gate also reads `u.uprops[HUNGER].intrinsic || .extrinsic` (eat.js Hunger shape; that helper isn't exported).
**D-4089** attrib.c is_innate `:880–900` → innately(&u.uprops[propidx].intrinsic) `:864–877` (FROMEXP — innately(propidx, field) ORs the flat H-field (when mapped) with `u.uprops[propidx].intrinsic`, and consults the role/race tables only when a field exists. is_innate no longer bails on unmapped props.
**D-4088** insight.c status_enlightenment `:1059–1071` — `!(u.EBlinded | 0)`, the same field the arm's own Blind/Blindfolded_only tests already read.
**D-4087** read.c seffect_confuse_monster `:1405` and uhitm.c nohandglow `:6324` `altfeedback = (Blin — read.js computes `altfeedback = Blind() || hero_Invisible()` once (invent.js Blind already imported, display.js hero_Invisible added). uhitm.js deletes Invisible_you and calls display.js hero_Invisible at all three sites
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4094; wrap `wildmiss` /
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
