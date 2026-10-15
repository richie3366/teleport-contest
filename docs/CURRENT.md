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

Score last measured: **2026-10-15** — full `sessions` on `7d4cd240b`
(audit **2808–2815**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-14 19:15Z)** | **32 / 44**, 9,921 / 11,265 pts, RNG **92.0 %**, rngSteps 95.8 %, screens **88.1 %** |
| **Fresh cohort (§10.20, scored on arrival)** | 50450000 ×160 @`65fe937c4`: **139/160 (86.9 %)**, RNG 98.9 %, screens 97.5 % — symset 4/12 worst |
| **Corpus board (worked, regression fortress)** | **3960 / 4555** @`65fe937c4` full (Grow #10; +470 rows, +388 PASS, 0 PASS→FAIL), RNG 97.45 %, screens 96.57 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `386+1.79/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 5 (9,921; leader 11,264 at 43/44).
32/44 at judge 19:15Z 2026-10-14 (unchanged since 13:45Z): the D-3929..D-3935
window (quest-text D-3930, wield ECMD fix, 3 cliff writers) moved the
judge for the first time since 2026-10-11 — the §10.20 completeness
line scores where cliffs alone did not. **Three lines, read
together:** held-out (judge), fresh cohort (`fresh-cohort.mjs`, the local
generalization estimate), board (the fortress — it rises by
construction). Fresh history: 79–91.8 % across 8 cohorts (Grow #5–10, latest 139/160).
Fresh−held-out gap now 14.2 pts (86.9 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` now 200/398).
**Corpus (2026-10-15 05:03Z, `65fe937c4`, 4555/4555 entries, `full: true`):**
3960 PASS (+388 since 3572: 425 in-range + 45 accidental default-seed, 1 flake heal; 0 PASS→FAIL);
RNG 137356273/140953685 (97.45 %), screens 2631827/2725255
(96.57 %). Worst families `scen-symset` 200/398,
`scen-options` 105/137, `scen-sweep` 529/672, `scen-shop` 280/342,
`scen-worldtour` 436/522, `scen-questtour` 137/160,
`scen-chain` 321/336, `scen-trek` 258/266, `scen-zapfest` 132/136; rest ≥ 96 %.
`scen-sweep-Priest-582706` still FAIL@1166 (known recorder flake, D-3885 park
stands — unchanged since the Grow #6 re-record).
Reviews 1225–2815 (index; no row 1618): 1416 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2808–2815: 8A/0D/0Q, 0 Must-fix queued).
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
Ledger @4722dc249: 5329 pinned-C functions — ported 4554 · partial 112 · split 164 · by-design 388 · open 111 (596 declared by seed). Measured: ok 3919, partial 677, thin 242, missing 491. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3976 (index).**
<!-- recent:begin -->
**D-3976** `hack.c` u_simple_floortyp `:1833–1848` (`:1835` u_in_air ≡ Levitation||Flying||!grounded, — u_simple_floortyp u_in_air now `u.Levitation || Levitation_st() || u.Flying || Flying_st() || !grounded(...)` (in-file unions, C order, D-3810 shape). pooleffects: all three gates read the same unions via the live export
**D-3975** `monmove.c` m_move `:1970` (`!rn2(++chcnt)`, appr==0 peaceful loop); `mon.c` mfndpos diago — none — measurement iteration, no `js/` changed.
**D-3974** `restore.c` getlev ghostly `is_unicorn(mtmp->data)` (`mondata.h:149`: mlet S_UNICORN && li — js/bones.js — import the live C-exact `is_unicorn` (js/monsters.js:503; `imports.mjs --can`: already-imports-monsters edge) and call it in the ghostly gate (D-1849-class clone deleted). js/mklev.js — `set_malign(mtmp)` a
**D-3973** `dog.c` mon_arrive MIGR_PORTAL `:553–557` (`for (t = gf.ftrap; t; t = t->ntrap) if (t->tty — js/dog.js only — `arrive_find_magic_portal` scans live `game.level.traps` first (C newest-first order, `maketrap` unshift ⟺ `ttmp->ntrap = gf.ftrap`), then the gf-shaped `game.ftrap` fallback (array, else ntrap chain) fo
**D-3972** `mthrowu.c` drop_throw `:161–196` — js/mthrowu.js only — `broken = await flooreffects(...)` (C :180 verbatim); m_at hoisted above flooreffects (C :179); explicit `down_gate(x, y) !== MIGR_NOWHERE` gate around ship_object (C :176–177; the live export gates 
**D-3971** sp_lev.c `create_object` :2422–2423 (`if (!(containment & SP_OBJ_CONTENT)) stackobj(otmp); — added the missing `:2422-2423` `stackobj` (post-attrs, C order; null-safe via live export) at all 15 floor des-place sites.
**D-3970** `hack.c` domove `:2796–2797` (attackmon-done bare `return`) and `:2802–2808` (ironbars/web — js/cmd.js only — removed both JS-only `end_running` calls and the redundant `move = 1` (move stays the allmain preset 1; nothing on these paths clears it), leaving C-exact bare returns with cites.
**D-3969** `shk.c` menu_pick_pay_items `:1668–1739` (build + end_menu `:1723` + select_menu PICK_ANY  — restarted the clone as a thin C-order adapter (same name/signature) building the raw list (amt width `:1684–1691`, used-up heading `:1696–1700`, per-item unpaid heading `:1704–1708` + paydoname quan swap `:1710–1713` + "
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3976; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** distfleeck row at 4 (D-3976 healed moat-avoid + 2 pool-fall); left: s110 [measure], ghoul s802, dog-combat pair.
**This iter:** audit 2808–2815 (8A/0D/0Q) + rescore 3565/4085.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
