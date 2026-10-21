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

Score last measured: **2026-10-21** — full `sessions` on `f0e447897`
(audit **3028–3037**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-21 07:23Z)** | **35 / 44**, 10,849 / 11,265 pts, RNG **99.5 %**, rngSteps 99.0 %, screens **96.3 %** (+0 vs 01:38Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51650000 ×160 @`8f2d00eae` (Grow #20): **156/160 (97.5 %)**, RNG 99.83 %, screens 99.75 % — sweep 8/10 worst (distfleeck RNG s616, trapeffect_sqky_board s609); hallu 8/9 (findit s666); symset 8/9 (env-only); rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-21 (audit 3028–3037 @`f0e447897`): committed board **677/720** (667 at the last audit + 10 window flips claimed by D-4188..D-4197) → rescore **677/691** (677/688 excl. 3 env-only; RNG 99.99 %, screens 100.0 %), `record`: all sessions present, **0 PASS→FAIL** → archive 6 PASS → **671/714** (`entries` 714, `unrecorded` 0); `tier` → 0 promoted back, reserve 29 → 29; worst symset 33/35, options 25/28, sweep 182/184, worldtour 86/87, chain 24/25, shop 20/21, questtour 10/11 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `95+0.51/turn` (R² 0.84) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 2 (10,547; leader 11,264 at 43/44).
32/44 at judge 01:35Z 2026-10-17 (+93 pts, screens 92.8→93.6 %,
RNG 93.5→96.9 %): the D-4042..D-4047 window moved the judge again
— cliffs score where they reach. **Three lines, read together:**
held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–97.5 %
across 18 cohorts (Grow #5–20; previous 149/160 @51450000).
Fresh−held-out gap now 18.0 pts (97.5 % vs 79.5 % = 35/44), inside the §10.20
band — no calibration family; Grow #20 added the `questwalk` coverage family instead (level audit F4).
**Corpus after Grow #20 (2026-10-20):** board 668/701 PASS (95.3 %, RNG 99.83 %, screens 99.8 %); 684 active + 29 reserve + 5863 archive.
**Corpus (Grow #19 `score --new` + `tier`, 2026-10-17, 916 rows):**
648 PASS (70.7 %); RNG 98.31 %, screens 97.4 %; 904 active + 239 reserve + 5247 archive.
Worst families `scen-hallu` 0/4, `scen-symset` 72/190, `scen-extcmd` 9/40,
`scen-questtour` 11/15, `scen-sweep` 148/267, `scen-worldtour` 71/156,
`scen-zapfest` 8/20, `scen-shop` 22/66, rest ≥ 96.9 % RNG.
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
Ledger @9a0385eed: 5334 pinned-C functions — ported 4550 · partial 126 · split 167 · by-design 386 · open 105 (572 declared by seed). Measured: ok 3931, partial 674, thin 248, missing 481. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4202 (index).**
<!-- recent:begin -->
**D-4202** do.c flooreffects `:162–359` (`save_bhitpos = gb.bhitpos; gb.bhitpos.x = x, gb.bhitpos.y = — write the fields: x/y on set and on restore, creating the object only when it is missing (C's zeroed static).
**D-4201** pickup.c tipcontainer_gettarget `:3871–3948` (end_menu `:3925`), query_objlist headings `: — prompts spread `menu_prompt_style()`, headings spread `menu_heading_style()` (the D-4186 helpers). tipcontainer_gettarget is restarted in C order: the floor row (selector `-`, preselected), a blank, then the containers.
**D-4200** wintty.c set_item_state `:1175–1194`, called from toggle_menu_curr `:1126/:1132/:1140/:114 — `_retoggled` now means "set_item_state repainted this entry since the last page paint".
**D-4199** dungeon.c print_mapseen `:3538–3554` (`add_menu_heading(win, buf)`), print_dungeon `:2330– — both heading sites spread the live `menu_heading_style()` (options.js, the D-4186 port of add_menu_heading, gameover → none/no-colour inside).
**D-4198** wield.c ready_weapon `:168–273`, tail `:270–271` `if ((had_wep != (uwep != 0)) && condtest — restarted in C's single-exit shape.
**D-4197** wintty.c tty_exit_nhwindows (upstream `:810`) → tty_suspend_nhwindows `:808–813` (settty,  — `if (!str) tty_raw_print('');` at the head, in C order.
**D-4196** end.c really_done `:1579–1589`, nh_terminate `:1674`; topten.c topten_print / topten_print — - really_done (`:1409`): `!toptenwin` → `tty_exit_nhwindows(null)` + clear before topten, in C order.
**D-4195** mkmaze.c place_lregion `:356–410` (failure `:409`); pline.c impossible `:584–634`; dungeon — `return impossible(...)`.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4202; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix is empty (audit 3028–3037 queued none) — the **Open — cliffs** head. Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible/u.Upolyd, flat-only Flying/Levitation/Disint clones, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
