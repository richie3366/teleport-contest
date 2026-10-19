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

Score last measured: **2026-10-19** — full `sessions` on `705415122`
(audit **2953–2963**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-19 13:17Z)** | **34 / 44**, 10,742 / 11,265 pts, RNG **99.3 %**, rngSteps 98.7 %, screens **95.4 %** (+1 pt vs 07:18Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-19 (audit 2953–2963 @`705415122`): **682/835** before (660 at the last audit + 22 window flips claimed by D-4113..D-4123) → rescore **690/835** (active 688/784 scored, 688/781 excl. 3 env-only; RNG 99.51 %, screens 98.8 %), **0 PASS→FAIL** vs the committed board → archive 34 PASS → **656/801** (`entries` 801, `unrecorded` 0); `tier` → 738 active + 47 reserve (4 promoted back, 2 now PASS); worst symset 33/69, questtour 8/11, shop 21/24, zapfest 8/11, chain 23/27, options 24/47, worldtour 88/102, sweep 177/213 |
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
Reviews 1225–2963 (index; no row 1618): 1549 ACCEPT, 76 WITH-DEBT, 113 QUALITY-RISK (2953–2963: 6A/3D/2Q, 2 Must-fix: 2956 revive enexto order + useup_invent clone, 2960 timeout.js Blind() clone; debts 2953 newsym column-0 sync callers, 2954 hand loaders skip `:2125`, 2963 See_invisible_that mirror).
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
Ledger @b37c5a9d5: 5329 pinned-C functions — ported 4555 · partial 115 · split 167 · by-design 387 · open 105 (579 declared by seed). Measured: ok 3924, partial 673, thin 248, missing 484. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4126 (index).**
<!-- recent:begin -->
**D-4126** write.c dowrite `:74–385`: Glib arm `:90–94`; novel arm `Hallucination` `:205–213`; dry-ou — Glib arm now `Glib()` (potion.js, youprop.h `:112`) + `Tobjnam(pen, 'slip')` + `fingers_or_gloves(false)`.
**D-4125** zap.c revive `:883–1140`: `MON_AT → enexto` `:961–964`, twitch `:966–972`, `mtmp = christe — moved the `m_at → enexto` block before the twitch arm, in C order.
**D-4124** youprop.h:103 `#define Blind ((HBlinded || EBlinded) && !BBlinded)` (plus u.uroleplay.blin — deleted the clone and imported the live `Blind` from invent.js:372 (C's macro, already used for D-4119 / D-4123). slip_or_trip now calls `Blind()` and display.js `Hallucination()`.
**D-4123** uhitm.c that_is_a_mimic `:6201–6276`: `glyph = glyph_at(x, y)` → glyph_is_cmap (furniture  — restarted the body in C order on `glyph_at(x, y)`: the cmap arm uses `glyph_to_cmap(glyph)` with C's furniture / trapped-chest condition.
**D-4122** do.c goto_level `:1702–1714` (`getlev(...)`; `oinit()` `:1713`); o_init.c oinit `:367–372` — oinit now lives in o_init.js (its C home, exported) and mklev.js imports it (local copy removed, unused setgemprobs import dropped). goto_level calls `oinit()` right after `close_nhfile`, C `:1712–1713`.
**D-4121** objnam.c doname_base `:1223–1751` (`bp = xname(obj)` `:1247`), xname `:575–1029` (find_art — after the inlined observe step, `if (obj.oartifact && obj.dknown && _find_artifact) _find_artifact(obj)`: the real dknown (not override_ID), same hook and position as xname_flags.
**D-4120** timeout.c nh_timeout `:588–948`: mtimedone `:641–648`, ucreamed `:649–650`, spell protecti — move the block, unchanged, to C's position between the ucreamed tick and the ugallop tick.
**D-4119** makemon.c makemon_rnd_goodpos `:1076–1137` (fallback `:1093–1129`, `int bl = (gi.in_mklev  — use the live `Blind()` export, which makemon.js already imports from invent.js (C's macro: HBlinded/EBlinded/BBlinded, plus the roleplay arm).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4126; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix (review 2960): timeout.js:1728 file-local `Blind()` → invent.js `Blind` at its 5 C `Blind` sites; then Must-fix (review 2956): revive enexto before the twitch arm + live `useup` + default panic. After that the cliffs head (still recorder/tooling parks D-4016/D-4028/D-4104 → first non-parked live `hidden-proxy queue` owner).

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
