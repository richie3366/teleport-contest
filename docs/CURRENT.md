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

Score last measured: **2026-10-15** — full `sessions` on `e9d602604`
(audit **2823–2828**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-15 13:09Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (D-3978…D-3987 window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 50550000 ×160 @`170f0240a`: **139/160 (86.9 %)**, RNG 97.8 %, screens 94.4 % — symset 6/12 worst; options/town 1/2, shop/sweep/kit/poly 75 %, wish 4/5, worldtour 10/12, chain/questtour 11/12 |
| **Corpus board (worked, regression fortress)** | full 2026-10-15: **577/1223** (0 PASS→FAIL); `archive` → **1,187** (541 PASS); `tier` (§10.21) → **885 active + 302 reserve** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `388+1.79/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 3 (10,454; leader 11,264 at 43/44).
32/44 at judge 13:09Z 2026-10-15 (+533 pts, screens 88.1→92.8 %,
RNG 92.0→93.5 %): the D-3970..D-3977 window (domove bare returns,
des stackobj, drop_throw broken, portal scan, ghostly/malign, lev-fly
unions, TEXT col-0) moved the judge again — cliffs score where they
reach. **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–91.8 %
across 9 cohorts (Grow #5–11, 139/160 twice running).
Fresh−held-out gap now 14.2 pts (86.9 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (2026-10-15 16:40Z, `e9d602604`, 1223, `full: true`; `archive` → 1187):**
577 pre-archive (0 PASS→FAIL; +1 Wizard-50055081); 541/1187 post;
RNG 91.20 %, screens 88.1 %; `unrecorded` 0. Worst families `scen-questtour` 9/29,
`scen-shop` 16/86, `scen-worldtour` 66/156, `scen-sweep` 134/279,
`scen-zapfest` 8/12, `scen-symset` 15/240; next `scen-trek` 11/19, rest ≥ 97.2 % RNG.
`scen-sweep-Priest-582706` archived out (D-3885 park stands).
Reviews 1225–2828 (index; no row 1618): 1429 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2823–2828: 6A/0D/0Q, 0 Must-fix queued).
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
Ledger @6b42d7236: 5329 pinned-C functions — ported 4555 · partial 113 · split 164 · by-design 387 · open 110 (591 declared by seed). Measured: ok 3920, partial 677, thin 243, missing 489. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3987 (index).**
<!-- recent:begin -->
**D-3987** nethack-c/upstream/src/symbols.c:908–1098 — `export async function do_symset(rogueflag)` porting the whole C body: null-name read_sym_file list pick, both filter loops (rogue?primary:rogue, H_MAC skip, UTF8 in), `%-<biggest+2>s %s` rows, the handler_whatis_coord m
**D-3986** `decl.c:720` (`'a', /* sell_response */` in the gs initializer — js/shk.js only — init `'a'` per decl.c:720 + corrected cite comment.
**D-3985** `trap.c` maketrap HOLE/TRAPDOOR/PIT/SPIKED_PIT `:513–561` (the `:560–561` `lev->flags = 0` — js/trap.js only — the `clear_flags` arm now clears every live union mirror (flags/doormask/altarmask/wall_info/drawbridgemask/looted/icedpool) with the C cite; DRAWBRIDGE_UP keeps its mask via the existing clear_flags=FA
**D-3984** `explode.c:25–115` explosionmask (AD_MAGM hero arm `:43–46` reads the `Antimagic` macro) + — js/explode.js only — the six remaining hero predicates (Fire/Cold/Shock/Antimagic/Disint/Acid) read the union flats||uprops[SLOT].intrinsic||extrinsic (Poison shape, D-3978/D-3982 idiom); slot consts added to the existin
**D-3983** `pickup.c:1977–2020` (encumber_msg; `:2016` disp.botl=TRUE after the crossing pline resolv — js/invent.js + js/display.js only — encumber_msg records `game._pending_botl = true` synchronously with the oldcap commit on crossings (before any await); putmesg converts it to real botl once the message is displayed (a
**D-3982** `botl.c:177` (`if (Strangled)` in do_statusline2) + `botl.c:1201` (condtests bl_strngl in  — js/display.js + js/botl.js only — both Strngl predicates narrowed to the C-exact read: flat u.Strangled (JS mirror of the same C field) OR uprops[STRANGLED].intrinsic (dig.js/potion.js/spell.js/do.js idiom; bl_slippery p
**D-3981** `read.c` drop_boulder_on_player `:2294–2338` — js/read.js only — drain the deferred wail/done finishers between flooreffects and the boulder-hit losehp (same explode_losehp idiom as the existing post-drain; dynamic imports of already-imported modules, no new edges); 
**D-3980** `trap.c` float_down `:4024–4179`, the `:4032–4033` mask clear (`HLevitation &= ~hmask; ELe — js/trap.js only — float_down now applies the hmask/emask clear to the uprops slot (intrinsic + extrinsic) alongside the flats (C single-storage semantics; potion.js/eat.js/propset_fromform dual-write idiom, D-3978); uswa
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3987; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** do_symset head → symbols.c:908–1099 browser whole (29 sessions, C «Select symbol set:» vs JS «Options»).
**This iter:** audit 2823–2828 — 6A, 44/44, 577/1223 full, 0 Must-fix.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
