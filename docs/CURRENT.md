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

Score last measured: **2026-10-22** — full `sessions` on `be3c60cd0`
(audit **3047–3070**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-22 07:15Z)** | **35 / 44**, 11,079 / 11,265 pts, RNG **99.5 %**, rngSteps 99.2 %, screens **98.3 %** (unchanged since 2026-10-21 13:09Z; rank 2, leader 11,264 at 43/44; the D-4219..D-4230 window is not scored yet) |
| **Fresh cohort (§10.20, scored on arrival)** | 53650000 ×160 (Grow #27): **160/160 (100.0 %)**, RNG 100.0 %, screens 100.0 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-22 (audit 3047–3070 @`be3c60cd0`): committed board **774/774** → rescore **774/774** (RNG 100.00 %, screens 100.0 %, 0 env-only), `record`: all sessions present, **0 PASS→FAIL** → archive 93 PASS → **681 entries** (669 active fortress: test 390 / family 183 / cover 96; `unrecorded` 0); `tier` → reserve 0; every family 100 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `92+0.50/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,547; leader 11,264 at 43/44).
32/44 at judge 01:35Z 2026-10-17 (+93 pts, screens 92.8→93.6 %,
RNG 93.5→96.9 %): the D-4042..D-4047 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–99.4 %
across 22 cohorts (Grow #5–27; prev 160/160).
Fresh−held-out gap now 20.5 pts (100.0 % vs 79.5 % = 35/44), over the §10.20
band — Grow #26 added the `vault` calibration family (probe 8/20, 35/80 authored; HIDDEN-PROXY §5c); Grow #27 probed `tutorwalk` 20/20, `chargen` 20/20 and a real-mount `ride` reshape 19/20 (all ≥ 85 %: not held-out shapes; §5c).
**Corpus after audit 3047–3070 (2026-10-22):** board 774/774 PASS (RNG 100.00 %, screens 100.0 %); 669 active + 0 reserve + 7186 archive.
Reviews 1225–3070 (index; no row 1618). Audit 3047–3070: 16 ACCEPT / 6 WITH-DEBT / 2 QUALITY-RISK, 3 Must-fix (m_move wormno gate; P_BOW / ESCAPED / ASCENDED missing imports; process_menu_window count+ESC). Earlier totals to 3010: 1587 ACCEPT, 85 WITH-DEBT, 113 QUALITY-RISK (3001–3010: 7A/3D/0Q, 0 Must-fix; debt, all unreached → ledger partial: cond_menu/autopickup-exception headings drop menu_headings colour (menu_heading_attr), o_init.js rename_disco/doclassdisco hard-code ATR_INVERSE, use_crystal_ball non-fatal path never drains `_losehp_needs_rehumanize`).
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
3. Level loaders — audited 2026-10-20 (`reviews/level-audit/2026-10-20-special-levels.md`):
   126/126 ported, maps byte-exact, 108 RNG-exact in corpus. F1–F4 done
   (D-4180..D-4182; F4 = Grow #20 `questwalk`: every level now built in corpus).
   Re-prove: `level-audit-static.py` + `level-audit.mjs`.
4. Message literals — `python3 scripts/c-literal-coverage.py`: 116 of
   4099 C message literals absent from `js/` (most env/error paths;
   gameplay: `dig.c` hole/bury ×10, `uhitm.c` ×6, `engrave.c`, `steal.c`).
5. Start regime — measured fine 2026-10-13 (68/68 probe: legacy on,
   tutorial prompt, default symset, interactive chargen; don't re-check).
**Falsifier:** ~30 iterations with fresh PASS rising and held-out flat →
revisit the generator families, not the port.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @f557e8a67: 5334 pinned-C functions — ported 4552 · partial 125 · split 169 · by-design 384 · open 104 (570 declared by seed). Measured: ok 3931, partial 676, thin 249, missing 478. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4231 (index).**
<!-- recent:begin -->
**D-4231** monmove.c m_move `:1714–2075`, gate `:1769–1770`, special arms `:1771–1848`, not_special ` — the special arms sit inside `if (!mtmp.wormno) { … }`, C's goto as a block.
**D-4230** steed.c dismount_steed `:567–760` (thrown/knocked/fell arm `:602–617`, losehp `:612`, set_ — return only `if (game.program_state?.gameover)` after finish_losehp_done, the do.js idiom (do.js `:853–857`).
**D-4229** vault.c invault `:380–620` (makemon `:500`, isgd/mpeaceful `:502–503`, entry pline `:534`, — `await makemon_appear_msg(guard, guard.mx, guard.my, MM_EGD | MM_NOMSG)` right after the makemon null check, before isgd/mpeaceful, which is where C's makemon tail runs.
**D-4228** insight.c doattributes `:2009–2019`, enlightenment `:385–462` (select_menu arm `:451–460`) — `set_bot_disabled(true)` … `finally set_bot_disabled(prev)` spans the NEED_MORE flush, the pages, the wait and the dismissal (docrt or erase_menu_or_text).
**D-4227** teleport.c teleds `:448–626` (newsym origin `:536`, see_monsters `:537`, vision_recalc `:5 — `await see_monsters();`.
**D-4226** vault.c parkguard `:155–172`, findgd `:204–232`; steed.c place_monster `:898–932`; rm.h m_ — parkguard tests worm.js level_mon_at(0, 0), the JS reading of C's `level.monsters[x][y]` that steed.js place_monster already uses.
**D-4225** monmove.c m_move `:1720–2075` (omx init `:1731`, shk/gd/pri `:1806–1826` with -1 → MMOVE_N — `let omx/omy`, re-read after the not_special uswallow check, as in C. should_see, gettrack, nix/niy, remove_monster and mon_track_add all now see the post-relocation origin.
**D-4224** vault.c invault `:380–620`, getlin loop `:499–505`; tty getlin ESC → "\033" (getline.c hoo — the line is removed; the loop is C's: mungspaces, then `!buf && --trycount > 0`.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4231; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix holds 3 rows from audit 3047–3070. Pop the first (m_move's `wormno → not_special` gate, review 3065), then the missing imports (3061), then process_menu_window counting (3049). The cliffs block is empty (774/774). Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible/u.Upolyd, flat-only Flying/Levitation/Disint clones, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
