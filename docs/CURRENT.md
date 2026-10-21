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

Score last measured: **2026-10-20** — full `sessions` on `878852b8f`
(audit **3011–3019**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-20 19:11Z)** | **35 / 44**, 10,849 / 11,265 pts, RNG **99.5 %**, rngSteps 99.0 %, screens **96.3 %** (+0 vs 13:17Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51650000 ×160 @`8f2d00eae` (Grow #20): **156/160 (97.5 %)**, RNG 99.83 %, screens 99.75 % — sweep 8/10 worst (distfleeck RNG s616, trapeffect_sqky_board s609); hallu 8/9 (findit s666); symset 8/9 (env-only); rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-20 (audit 3011–3019 @`878852b8f`): committed board **683/734** (671 at the last audit + 12 window flips claimed by D-4171..D-4179; D-4171 moved 18 symset rows 0 → 11,819 screens, still `env:config-path`) → rescore **682/708** (682/701 excl. 7 env-only; RNG 99.99 %, screens 99.98 %), `record`: all sessions present, **0 PASS→FAIL** → archive 15 PASS → **668/719** (`entries` 719, `unrecorded` 0); `tier` → 2 promoted back, reserve 26 → 28; worst options 25/30, symset 33/37, sweep 181/185, worldtour 87/89, shop 20/21, chain 24/25, extcmd 11/12, questtour 10/11, town 12/13 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `122+0.77/turn` (R² 0.88; measured alongside the full rescore, so CPU-loaded) |
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
Ledger @7f4e4a57a: 5329 pinned-C functions — ported 4548 · partial 124 · split 167 · by-design 386 · open 104 (575 declared by seed). Measured: ok 3925, partial 673, thin 249, missing 482. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4187 (index).**
<!-- recent:begin -->
**D-4187** iactions.c itemactions `:278–714` (engrave arm `:437–446`); dungeon.c surface `:1750–1788` — import the live `surface` from sit.js and use `surface(u.ux, u.uy)` in the engrave row.
**D-4186** windows.c add_menu_heading `:1816–1828`, adjust_menu_promptstyle `:1769–1777`; wintty.c tt — delete the local helper.
**D-4185** priest.c pri_move `:177–216` (Invis arm `:205–206`), intemple `:410–538` (`:438`); youprop — `Invis()` and `Hallucination()` (live youprop exports) at those two sites.
**D-4184** sp_lev.c create_monster `:1925–2187` (tail `:2125–2129`); lspo_monster female default `:33 — placeMon writes `mtmp.female = female` always (0 for class specs, as C `:3355–3356`), and wraps the peaceful override with `set_malign(mtmp)` (C `:2128–2129`).
**D-4183** sp_lev.c lspo_engraving `:3881–3936` (tail `:3930–3934`; guardobjects default `:3910`, now — each of the four sites keeps the returned `ep` and applies lspo_engraving's tail: `guardobjects = 0`, `nowipeout = 0` (degrade default TRUE).
**D-4182** sp_lev.c load_special `:6454–6502` (head `:6464–6471`), link_doors_rooms `:1121–1142`, rem — - `load_special_head(check_inaccessibles)` in C order next to load_special_proto.
**D-4181** rm.h `:213–215`; mthrowu.c hit_bars `:1425`; hack.c moverock `:562`; detect.c skip_premap_ — the readers OR both fields and the hole-fill arm clears both, as in D-0865.
**D-4180** sp_lev.c load_special `:6454–6502` (head `:6464–6471`), remove_boundary_syms `:1015–1038`, — after hellfill_populatemaze, run link_doors_rooms, remove_boundary_syms and map_cleanup in C order. hellfill never sets "inaccessibles", so ensure_way_out stays skipped, as in C.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4187; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix is empty (audit 3011–3019 queued none) — the **Open — cliffs** head. Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible/u.Upolyd, flat-only Flying/Levitation/Disint clones, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
