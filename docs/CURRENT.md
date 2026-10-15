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
| **Fresh cohort (§10.20, scored on arrival)** | 50350000 ×160 @`f27bfc747`: **138/160 (86.3 %)**, RNG 96.0 %, screens 95.6 % — options 0/2 worst |
| **Corpus board (worked, regression fortress)** | **3565 / 4085** @`7d4cd240b` full (audit 2808–2815; +5 since Grow #9, 0 PASS→FAIL), RNG 97.51 %, screens 96.56 % |
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
construction). Fresh history: 79–91.8 % across 7 cohorts (Grow #5–9, latest 138/160).
Fresh−held-out gap now 13.6 pts (86.3 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` now 160/316).
**Corpus (2026-10-15 01:14Z, `7d4cd240b`, 4085/4085 entries, `full: true`):**
3565 PASS (+5 since 3560: D-3966×2 + D-3967 + 2 spillover heals; 0 PASS→FAIL);
RNG 124026059/127194030 (97.51 %), screens 2361420/2445646
(96.56 %). Worst families `scen-symset` 160/316,
`scen-options` 89/115, `scen-sweep` 484/620, `scen-shop` 241/290,
`scen-worldtour` 413/495, `scen-questtour` 124/148,
`scen-descend` 45/46, `scen-chain` 287/299; rest ≥ 96 %.
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
Ledger @002f9547d: 5329 pinned-C functions — ported 4553 · partial 113 · split 164 · by-design 388 · open 111 (597 declared by seed). Measured: ok 3919, partial 677, thin 242, missing 491. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3971 (index).**
<!-- recent:begin -->
**D-3971** sp_lev.c `create_object` :2422–2423 (`if (!(containment & SP_OBJ_CONTENT)) stackobj(otmp); — added the missing `:2422-2423` `stackobj` (post-attrs, C order; null-safe via live export) at all 15 floor des-place sites.
**D-3970** `hack.c` domove `:2796–2797` (attackmon-done bare `return`) and `:2802–2808` (ironbars/web — js/cmd.js only — removed both JS-only `end_running` calls and the redundant `move = 1` (move stays the allmain preset 1; nothing on these paths clears it), leaving C-exact bare returns with cites.
**D-3969** `shk.c` menu_pick_pay_items `:1668–1739` (build + end_menu `:1723` + select_menu PICK_ANY  — restarted the clone as a thin C-order adapter (same name/signature) building the raw list (amt width `:1684–1691`, used-up heading `:1696–1700`, per-item unpaid heading `:1704–1708` + paydoname quan swap `:1710–1713` + "
**D-3968** pickup.c query_objlist `:1024–1216` (build + end_menu + select_menu); floor callers `:757– — restarted the clone as a thin qflags adapter (same name/signature) delegating to the ported query_objlist (js/pickup.js:782) → select_menu_pick_any/one (the ported tty pager, js/options.js:10226).
**D-3967** `sys/unix/unixmain.c` main `:66` early_init (decl zeroing) then `:100` gh.hname = argv[0]; — `game.gh = { hname: 'nethack' }` in reset_instance_globals (C value: basename of the recorder argv[0] in every recording; C-order note: C assigns after early_init, nothing reads gh.hname between, so folding it into the d
**D-3966** `nethack-c/upstream/src/invent.c` getobj `:2049` (`disp.botl = TRUE`, "May have changed th — C-ordered `:2049` in both dip clones across 5 pick sites: gold gate (null-safe), then `if (game.flags) game.flags.botl = true`, then verify, then EXCLUDE/silly.
**D-3965** `include/youprop.h:383` Free_action ≡ uprops[FREE_ACTION].extrinsic; `worn.c` setworn `:11 — FREE_ACTION arm in `confer_oc_oprop` mirroring `u.EFree_action` set/clear (same shape as the FAST arm; doc Named list updated).
**D-3964** `win/tty/wintty.c` erase_menu_or_text `:966–985` (corner `:982–984`) → docorner `:3650–371 — corner arm now calls the shared ported `erase_menu_or_text(offx, 0, maxrow, false)` (`js/display.js:8649`, D-3626) → `docorner` cl_end + `row_refresh` reprint (C0/utf8 drops keep the blank, as in C); `_tty_menu_geom` cle
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3971; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** m_move cliff-head writer — sp_lev.c create_object des-place family missing stackobj (Tourist+Caveman minend-2 splits); Healer splits to rebuildObjectsAt next.
**This iter:** audit 2808–2815 (8A/0D/0Q) + rescore 3565/4085.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
