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

Score last measured: **2026-10-14** — full `sessions` on `ed99ac9db`
(audit **2790–2795**, 2026-10-14T05:12:40Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`386+1.88/turn` (R² 0.81).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-14 01:26Z)** | **32 / 44**, 9,920 / 11,265 pts, RNG **92.0 %**, rngSteps 95.8 %, screens **88.1 %** |
| **Fresh cohort (§10.20, scored on arrival)** | 50050000 ×159 @`9a0ca2a78`: **146/159 (91.8 %)**, RNG 93.3 %, screens 96.4 % — sweep 10/16 worst |
| **Corpus board (worked, regression fortress)** | **2476 / 2815** @`ed99ac9db` full, RNG 97.13 %, screens 94.70 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `350+1.60/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 5 (9,920; NoahBPeterson 11,264 at 43/44,
rohitgandikota 10,499 at 35/44, serteal 10,424 at 43/44, jon-bell 10,419
at 39/44, lockwo 8,715). 32/44 at judge 01:26Z 2026-10-14 (+1 session,
+1 pt since the 19:08Z read; +10 sessions since 13:24Z): the D-3929..D-3935 window
(quest-text completeness D-3930, wield ECMD hang fix, 3 cliff writers)
moved the judge for the first time since 2026-10-11 — the §10.20
completeness line scores where cliffs alone did not. **Three lines, read
together:** held-out (judge), fresh cohort (`fresh-cohort.mjs`, the local
generalization estimate), board (the fortress — it rises by
construction). Fresh history: 610000 marathon ×160 → 126/160 (79 %);
620000 mixed ×160 → 141/160 (88 %); 49950000 ×158 → 140/158 (88.6 %,
Grow #5); 50050000 ×159 → 146/159 (91.8 %, Grow #6). Fresh−held-out gap
now 19 pts (91.8 % vs 72.7 %), back inside the §10.20 20-pt band (was 21 —
the Grow #6 calibration trigger; new `symset` wave-3 family, 6/100 now).
**Corpus (2026-10-14 06:21Z, `ed99ac9db`, 2815/2815 entries, `full: true`):**
2476 PASS (+7 since the Grow #6 board: D-3941 net +3 after its 2 LADDER
regressions, D-3942 +1, D-3943 +2, +1 stale-row refresh on full rerun —
Archeologist-50059044; 0 PASS→FAIL); RNG 88122032/90725936
(97.13 %), screens 1548125/1634784 (94.70 %). Worst families
`scen-symset` 6/100, `scen-sweep` 359/460, `scen-worldtour` 316/389,
`scen-shop` 142/172, `scen-options` 33/38; rest ≥ 94 %.
`scen-sweep-Priest-582706` still FAIL@1166 (known recorder flake, D-3885 park
stands — unchanged since the Grow #6 re-record).
Reviews 1225–2795 (index; no row 1618): 1397 ACCEPT, 62 WITH-DEBT, 111 QUALITY-RISK (2790–2795: 5A/1D/0Q, 0 Must-fix queued).
Live debts: `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; 52
unit tests in `scripts/*.test.mjs` fail on HEAD (stale after rewires —
same set before and after D-3930).
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈35 min for 2815), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

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
Ledger @f3027aae9: 5329 pinned-C functions — ported 4554 · partial 111 · split 164 · by-design 388 · open 112 (597 declared by seed). Measured: ok 3919, partial 678, thin 240, missing 492. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3946 (index).**
<!-- recent:begin -->
**D-3946**  — 
**D-3945** `win/tty/wintty.c` tty_print_glyph `:3945–3953` utf8 arm + g_pututf8 `:3795–3803` (HUPSKIP — js/display.js show_glyph_cell: HUPSKIP early return (`:3867`, morc display-local per botl.js:801) + the `:3946` predicate/wincap/handling/u-gate with g_pututf8-as-assignment (JS strings carry the decoded char; dec off; `
**D-3944** upstream `win/tty/wintty.c` tty_print_glyph `:3945–3951` (utf8 arm: `wincap2 & WC2_U_UTF8S — none — measurement (this commit).
**D-3943** `display.c` map_glyphinfo `:2653–2655` (ttychar = showsyms[symidx]); `wintty.c` g_putch `: — in the loaded arm, a render yielding DEC y/z forces dec:false — mirrors the LADDER base arm.
**D-3942** `restore.c` getlev `:1145` restore_light_sources + `:1300` relink_light_sources(ghostly);  — js/bones.js only (behavior): getlev_bones installs `restore_light_sources(info.lights)` right after restore_timers (C `:1145` after `:1144`, timers precedent D-3864; ALREADY mkobj edge — name added to the existing import
**D-3941** `files.c` fopen_sym_file `:2610–2624` + read_sym_file `:2631–2674`; `symbols.c` proc_symse — `scripts/extract-symbols.py` embeds all 14 dat/symbols sets in `js/generated/symbols_text.js` (Rule #2); ported the loader family whole (fopen/read/proc/parse + all init/update/clear/sethandling/get_othersym, C order, ev
**D-3940** `win/tty/wintty.c` erase_menu_or_text `:965–984` (corner `:982–984` → docorner, which bots — dismiss via the live `dismiss_nhw_menu({ keep_status: true })` (js/invent.js; corner → erase/docorner no-bot per C `:982–984`/`:3716–3720`; fullscreen → docrt+flush with a fresh bot per C `:978–981`, no D-0467 blank).
**D-3939** `nethack-c/upstream/src/botl.c` do_statusline2 `:101–250` (painter; T arm `:155–159` forma — none in this commit (parked).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3946; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** the regen'd cliffs head (Must-fix empty; welcome remainder is the parked UTF8 artifact + live writers below it).
**This iter:** welcome bar — temp hook + re-record 20/20 → 18 moved, 0 PASS (later writers surface); 5 fountain-customcolor residuals parked (D-3946). New head: do_statusline2.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
