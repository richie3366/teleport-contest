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

Score last measured: **2026-10-19** — full `sessions` on `05281fb52`
(audit **2944–2952**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-19 13:17Z)** | **34 / 44**, 10,742 / 11,265 pts, RNG **99.3 %**, rngSteps 98.7 %, screens **95.4 %** (+1 pt vs 07:18Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-19 (audit 2944–2952 @`05281fb52`): **675/855** before (649 at the last audit + 26 window flips claimed by D-4103..D-4112) → rescore +2, **0 PASS→FAIL** (vs the pre-rescore and the audit-2943 board) → archive 20 PASS → **660/835** (`entries` 835, `unrecorded` 0; active tier scored 673/797, RNG 99.49 %, screens 98.7 %); `tier` → **772 + 51 + 5567** (0 out, 7 back, 7 now PASS); worst symset 32/74, questtour 8/11, zapfest 8/14, shop 21/28, options 23/47, worldtour 91/115, sweep 178/217 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `87+0.35/turn` (R² 0.81) |
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
Reviews 1225–2952 (index; no row 1618): 1543 ACCEPT, 73 WITH-DEBT, 111 QUALITY-RISK (2944–2952: 8A/1D/0Q, 0 Must-fix; 2951 debt = fountain.js Invisible clone + u.Hallucination mirror, unreached, ledger partial).
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
Ledger @40626768e: 5329 pinned-C functions — ported 4556 · partial 114 · split 167 · by-design 387 · open 105 (580 declared by seed). Measured: ok 3924, partial 673, thin 248, missing 484. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4119 (index).**
<!-- recent:begin -->
**D-4119** makemon.c makemon_rnd_goodpos `:1076–1137` (fallback `:1093–1129`, `int bl = (gi.in_mklev  — use the live `Blind()` export, which makemon.js already imports from invent.js (C's macro: HBlinded/EBlinded/BBlinded, plus the roleplay arm).
**D-4118** pager.c lookat `:657–700` (save_uswallow gate `:665–668`; monster arm `:707–711` → look_at — compare against `.glyph`. what_mon still draws on the display RNG, as in C.
**D-4117** wintty.c tty_print_glyph `:3891–3913` (extracolor arm), `:4022–4029` (end-of-paint reset); — (1) show_glyph_cell ports the arm: under use_color with WC2_EXTRACOLORS and a stamped customcolor, a basic one replaces the colour (COLORVAL) and an RGB one sets `loc.disp_extracolor`. gbuf keeps C's colour, and the thre
**D-4116** zap.c revive `:883–1140`: non-CORPSE impossible `:896–899`; norevive / S_EEL-not-in-pool t — the twitch arm is C's expression: `upstart(corpse_xname(corpse, null, CXN_PFX_THE))` (objnam.js corpse_xname, hacklib.js upstart).
**D-4115** cmd.c extcmdlist `:1687–1688` (call), `:1818–1819` (redraw), `:1820–1821` (remove), `:1831 — EXT_CMDS gains the five runners with C's flags (none AUTOCOMPLETE, none wizard-only): call → docallcmd, redraw → doredraw, remove → doremring, retravel → dotravel_target, whatdoes → dowhatdoes. cmd.js exports dotravel_ta
**D-4114** sp_lev.c create_monster `:1925–2187` (female `:2125`); lspo_monster `:3214–3400` (`tmpmons — every tower des.monster now goes through `splev_create_monster`, the whole create_monster port: amask, mkclass/named id, location with humidity, occupancy, makemon, christen, the `:2125` female clobber, and the waiting S
**D-4113** display.c newsym `:928–935`; see_monsters `:1487–1528` (newsym(mon->mx, mon->my) `:1510`); — newsym ports the guard: off the map (x<0, y<0, x>COLNO−1, y>ROWNO−1) → `panic`; column 0 → records `game._newsym_misuse` (newsym is sync). see_monsters awaits `impossible('newsym: attempting screen update for <%d,%d>')` 
**D-4112** uhitm.c hmonas `:5433–5434` (`/* not used here but umpteen mhitm_ad_xxxx() need this */ gv — mhitm.js exports `set_mm_vis`. hmonas sets it at C `:5434` and resets it at C `:5856` (the gameover early return skips the reset, as C's done_in_by does not return). mdisplacem writes `_mm_vis = vis` at C `:222`.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4119; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** cliffs block is still all recorder/tooling parks (D-4016/D-4028/D-4104), so port slots take the first non-parked owner from the live `hidden-proxy queue`. D-4106..D-4113 shipped makemon, test_move, passivemm, furniture_detect, look_here, x_monnam, mhitm_mgc_atk_negated and newsym. Next: docallcmd, mswings_verb, revive.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
