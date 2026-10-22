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

Score last measured: **2026-10-21** — full `sessions` on `1b2b2c8e3`
(audit **3038–3046**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-21 13:09Z)** | **35 / 44**, 11,079 / 11,265 pts, RNG **99.5 %**, rngSteps 99.2 %, screens **98.3 %** (+230 pts vs 07:23Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 53450000 ×160 (Grow #26): **160/160 (100.0 %)**, RNG 100.0 %, screens 100.0 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-21 (audit 3038–3046 @`1b2b2c8e3`): committed board **680/714** (671 at the last audit + 9 window flips claimed by D-4198..D-4206) → rescore **680/685** (680/682 excl. 3 env-only; RNG 99.99 %, screens 100.0 %), `record`: all sessions present, **0 PASS→FAIL** → archive 9 PASS → **671/705** (`entries` 705, `unrecorded` 0); `tier` → 0 promoted back, reserve 29 → 29; worst shop 20/21 (set_apparxy RNG s936), worldtour 85/86 (one_characteristic s503), every other family 100 % |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `90+0.50/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,547; leader 11,264 at 43/44).
32/44 at judge 01:35Z 2026-10-17 (+93 pts, screens 92.8→93.6 %,
RNG 93.5→96.9 %): the D-4042..D-4047 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–99.4 %
across 21 cohorts (Grow #5–26; prev 157/160).
Fresh−held-out gap now 20.5 pts (100.0 % vs 79.5 % = 35/44), over the §10.20
band — Grow #26 added the `vault` calibration family (probe 8/20, 35/80 authored; HIDDEN-PROXY §5c).
**Corpus after Grow #26 (2026-10-22):** board 716/773 PASS (92.6 %, RNG 94.61 %, screens 96.6 %); 719 active + 42 reserve + 6874 archive.
Reviews 1225–3010 (index; no row 1618): 1587 ACCEPT, 85 WITH-DEBT, 113 QUALITY-RISK (3001–3010: 7A/3D/0Q, 0 Must-fix; debt, all unreached → ledger partial: cond_menu/autopickup-exception headings drop menu_headings colour (menu_heading_attr), o_init.js rename_disco/doclassdisco hard-code ATR_INVERSE, use_crystal_ball non-fatal path never drains `_losehp_needs_rehumanize`).
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
Ledger @6bd490731: 5334 pinned-C functions — ported 4552 · partial 125 · split 169 · by-design 384 · open 104 (570 declared by seed). Measured: ok 3931, partial 676, thin 249, missing 478. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4229 (index).**
<!-- recent:begin -->
**D-4229** vault.c invault `:380–620` (makemon `:500`, isgd/mpeaceful `:502–503`, entry pline `:534`, — `await makemon_appear_msg(guard, guard.mx, guard.my, MM_EGD | MM_NOMSG)` right after the makemon null check, before isgd/mpeaceful, which is where C's makemon tail runs.
**D-4228** insight.c doattributes `:2009–2019`, enlightenment `:385–462` (select_menu arm `:451–460`) — `set_bot_disabled(true)` … `finally set_bot_disabled(prev)` spans the NEED_MORE flush, the pages, the wait and the dismissal (docrt or erase_menu_or_text).
**D-4227** teleport.c teleds `:448–626` (newsym origin `:536`, see_monsters `:537`, vision_recalc `:5 — `await see_monsters();`.
**D-4226** vault.c parkguard `:155–172`, findgd `:204–232`; steed.c place_monster `:898–932`; rm.h m_ — parkguard tests worm.js level_mon_at(0, 0), the JS reading of C's `level.monsters[x][y]` that steed.js place_monster already uses.
**D-4225** monmove.c m_move `:1720–2075` (omx init `:1731`, shk/gd/pri `:1806–1826` with -1 → MMOVE_N — `let omx/omy`, re-read after the not_special uswallow check, as in C. should_see, gettrack, nix/niy, remove_monster and mon_track_add all now see the post-relocation origin.
**D-4224** vault.c invault `:380–620`, getlin loop `:499–505`; tty getlin ESC → "\033" (getline.c hoo — the line is removed; the loop is C's: mungspaces, then `!buf && --trycount > 0`.
**D-4223** dothrow.c hero_breaks `:2417–2436` (in_view `:2424`), breaks `:2444–2455`, breakmsg `:2612 — the Blind clone is deleted and dothrow.js imports the live invent.js Blind (an existing import edge). throw_obj gates on HConfusion / HStun and the live attrib.js Fumbling(). throw_impaired drops the phantoms.
**D-4222** polyself.c poly_gender `:2149–2157`; apply.c beautiful `:997–1013`; do_name.c do_mgivennam — the four clones are deleted, and each file imports the live polyself.js poly_gender (all four already import polyself.js). beautiful itself was already C-shaped.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4229; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix is empty (audit 3038–3046 queued none) — the **Open — cliffs** head. Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible/u.Upolyd, flat-only Flying/Levitation/Disint clones, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
