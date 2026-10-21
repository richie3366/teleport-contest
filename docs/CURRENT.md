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
| **Fresh cohort (§10.20, scored on arrival)** | 52850000 ×160 (Grow #23): **159/160 (99.4 %)**, RNG 100.0 %, screens 100.0 % |
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
across 18 cohorts (Grow #5–23; prev 158/159).
Fresh−held-out gap now 19.9 pts (99.4 % vs 79.5 % = 35/44), inside the §10.20
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

## Primary objective — RE-READ PASS (human, 2026-10-21, branch `experimental`, Constitution §10.22)

**Why:** every board session passes and fresh cohorts fail 31× less per
screen than the judge, so sampling stopped finding what held-out loses
(63 port commits → 0 pts, then 15 display fixes → +230). The code admits
its gaps: 309 `named omit` comments, 163 inside functions marked `ported`.

**Slot:** Must-fix, else the cliffs head (port prompt), else the
deferral-flag unit **Next** names, else `node scripts/ledger.mjs batch
--reread --write`: one C-file slice (~1,000 C lines, C order), every
function read whole against C, divergences fixed C-literally; finish
stamps each declared one `audited D-NNNN`. Prompt:
`scripts/agent-port-loop.reread.prompt.md`; design, evidence, pilot:
`docs/REREAD-PASS.md`. **D-ids here start at D-6001.** No grow trigger
(fresh cohort on request); audits unchanged.
**Progress:** `node scripts/ledger.mjs reread` (start: 524/4949 functions
audited; 309 omits; flag sites via `ledger.mjs defer`).
**Pilot / falsifier:** the first 8 slices; < 8 confirmed divergences, or
held-out flat ~30 iterations → shrink to the omit/flag lists or close.
**Completeness audit (§10.20) stands:** quest.lua done; `dat/symbols`
(14 symsets, DEC hand-coded); level loaders audited 2026-10-20;
`c-literal-coverage.py` 116/4099 literals absent; start regime fine.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @4a4da3074: 5334 pinned-C functions — ported 4549 · partial 127 · split 169 · by-design 385 · open 104 (571 declared by seed). Measured: ok 3932, partial 675, thin 248, missing 479. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Gates: syntax · Rule #2 · green + strict · full 44 when shared ·
**REACH-OK** (`verify.mjs --fn`, changed functions). `finish-iteration`
fails closed on an undeclared manifest function or a new JS body under
an undeclared C name.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-4214 (index).**
<!-- recent:begin -->
**D-4214** mhitu.c doseduce `:1985–2305`, refused-payment arm `:2264–2266` (`noit_Monnam(mon), noit_m — the line calls the live mondata.js noit_mhim (one more name on mhitu.js's existing mondata.js import).
**D-4213** detect.c detect_obj_traps `:906–953` (trapglyph `:923`, flash `:937–939`, sense_trap `:940 — restarted in C order. trapglyph = trap_to_glyph(TRAPPED_CHEST) when ft is set, then `await flash_glyph_at` and foundone at C's positions.
**D-4212** optlist.h `:633–634` NHOPTB(safe_pet … &flags.safe_dog), `:300–301` NHOPTB(eight_bit_tty … — DOSET_BOOL_ADDR maps safe_pet → flags.safe_dog and eight_bit_tty → iflags.wc_eight_bit_input, as in C's allopt addr. symset_render_char reads iflags.wc_eight_bit_input (C g_putch's eight_bit_tty macro).
**D-4211** options.c doset_add_menu `:9018–9065` (get_val `:9038`, "unknown" unless OK and non-empty  — the three rows go through doset_compopt_get_val with their live optfns (optfn_pile_limit, optfn_crash_urlmax, optfn_glyph). glyph still prints «(to be done)», now from C's get_val. crash_urlmax now follows an rc `crash_u
**D-4210** zap.c zapyourself `:2705–3013`: striking `:2716/:2718/:2726`, lightning `:2737/:2739/:2741 — each arm calls the live display.js shieldeff(u.ux, u.uy) and mondata.js monstseesu / monstunseesu (both already imported) at C's positions: shieldeff before the message, monstseesu after it and before ugolemeffects, and 
**D-4209** insight.c enlightenment `:451–460` (en_via_menu → end_menu + select_menu(PICK_NONE)); wint — the fullscreen branch is restarted as C's page loop: the current page is repainted only when it changes; keys go through map_menu_cmd; ESC/CR/LF finish; space/`>` advance (space finishes on the last page); `<`/`^`/`|` go
**D-4208** hack.c moverock_core `:386–411` (`oldglyph = glyph_at(sx, sy)` before feel_location; `if ( — both sites read `glyph_at(sx, sy)`, the gbuf glyph int, as C does. glyph_at_fp had no other caller and is deleted.
**D-4207** mondata.c can_blnd `:305–398`, raven gate `:327–328` (`magr->data == &mons[PM_RAVEN] && md — compare the mons[] index: `monsndx(magr.data) === PM_RAVEN && monsndx(mdef.data) === PM_RAVEN` (module PM_RAVEN constant beside the file's other PM_ constants; monsndx imported from mondata.js, an existing edge).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4214; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** re-read pilot — `ledger.mjs batch --reread --write` (trap.c :88–1822 first). Flag units start after the pilot review. Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible/u.Upolyd, flat-only clones, `'yn'` literals): fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
