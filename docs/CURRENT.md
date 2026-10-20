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

Score last measured: **2026-10-19** — full `sessions` on `318b3a5e7`
(audit **2964–2972**). Fortress **44/44** (aggregates below).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-19 19:15Z)** | **35 / 44**, 10,849 / 11,265 pts, RNG **99.5 %**, rngSteps 99.0 %, screens **96.3 %** (+107 pts vs 13:17Z; rank 2, leader 11,264 at 43/44) |
| **Fresh cohort (§10.20, scored on arrival)** | 51450000 ×160 @`75e2e77e0`: **149/160 (93.1 %)**, RNG 99.4 %, screens 99.5 % — options 1/2, extcmd 6/9 worst; sweep 7/10; hallu 7/9; worldtour/zapfest 9/10 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-19 (audit 2964–2972 @`318b3a5e7`): **666/801** before (656 at the last audit + 10 window flips claimed by D-4126..D-4132) → rescore **667/801** (active 667/754 scored, 667/751 excl. 3 env-only; RNG 99.49 %, screens 98.8 %), **0 PASS→FAIL** vs the committed board → archive 12 PASS → **655/789** (`entries` 789, `unrecorded` 0); `tier` → 730 active + 47 reserve (0 out, 0 back); worst symset 33/68, questtour 8/11, shop 20/22, zapfest 8/11, chain 23/27, worldtour 86/99, options 25/47, sweep 178/207 |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `87+0.36/turn` (R² 0.80) |
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
Reviews 1225–2972 (index; no row 1618): 1557 ACCEPT, 77 WITH-DEBT, 113 QUALITY-RISK (2964–2972: 8A/1D/0Q, 0 Must-fix; both 2953–2963 Must-fix rows closed by D-4124/D-4125; 2964 debt = slip_or_trip u.Hallucination mirror ×3 + Stone_resistance flats, unreached, ledger partial).
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
Ledger @f2d10652c: 5329 pinned-C functions — ported 4554 · partial 116 · split 167 · by-design 387 · open 105 (578 declared by seed). Measured: ok 3924, partial 674, thin 247, missing 484. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4134 (index).**
<!-- recent:begin -->
**D-4134** options.c doset_simple_menu `:8536–8705`, CompOpt/OthrOpt arm `:8603–8620` (`allopt[i].opt — one k-swap at the row, in C order: `k = { ...opt, name: 'roguesymset' }` on the Rogue level, used for the text, the get_val and the pick. simple_opt_get_val now has a plain symset arm and a roguesymset arm (the swap move
**D-4133** bones.c drop_upon_death `:258–303`, `if (rn2(5)) curse(otmp);` `:290–291`; mkobj.c curse ` — `if (rn2(5)) await curse(otmp);`, in C order, before the mtmp / cont / give_to_nearby_mon / place_object arms.
**D-4132** spell.c study_book `:468–641`: `y_n("Refresh your memory anyway?")` `:571`, `y_n(qbuf)` (W — both sites call getline.js `y_n(query)`.
**D-4131** mon.c vamprises `:2890–2987`: action `Snprintf` `:2913–2920` (`Unaware ? "you dream that " — `const unaware = Unaware()`, the live eat.js macro (`(game.multi | 0) < 0 && (unconscious() || is_fainted())`) that mhitm.js already imported for its hiding-monster arm.
**D-4130** objnam.c xname_flags `:581–1029`: `obj_is_pname` → nameit `:674–676`; FOOD_CLASS `:745–789 — deleted the early return.
**D-4129** apply.c dorub `:1785–1843`, MAGIC_LAMP `rn2(2)` arm `:1832–1833` `You("%s smoke.", !Blind  — imported invent.js `Blind` and deleted the file-local copy; all three inline mirrors now call `Blind()`. dorub uses `You(...)`.
**D-4128** wield.c weldmsg `:1061–1074` (`Yobjnam2(obj, "are")`); can_twoweapon `:761–804`: empty-han — deleted the three clones.
**D-4127** youprop.h `:221–223` `HJumping u.uprops[JUMPING].intrinsic`, `EJumping … .extrinsic`, `Jum — new file-local `HJumping()` / `EJumping()` read `u.uprops[JUMPING]` (plus the flat field: the Knight's innate FROMOUTSIDE is still written to flat `u.HJumping` by u_init.js:1653).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4134; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** Must-fix empty. The cliffs block is still all recorder/tooling parks (D-4016/D-4028/D-4104), so port slots take a near-pass row from the board (the D-4126 scan: RNG fully matched, 1 screen lost; read `cMsgOwners` and the step command for the writer). Mirror-family hits (u.Blind/u.Hallucination/u.Unaware/u.See_invisible, `'yn'` literals) fix every site in that C file.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
