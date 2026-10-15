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

Score last measured: **2026-10-15** — full `sessions` on `c22183fa1`
(audit **2829–2836**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-15 19:12Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (D-3978…D-3999 window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 50750000 ×160 @`4ebab628e`: **143/160 (89.4 %)**, RNG 99.2 %, screens 96.8 % — impaired 1/2, symset 7/12, sweep 8/12 worst; questtour/shop/zapfest 10/12, worldtour 11/12, chain/trek 12/12 |
| **Corpus board (worked, regression fortress)** | `score --new` 2026-10-15 (Grow #13): **574/920** (62.4 %); `tier` (§10.21) → **892 active + 283 reserve + 4137 archive** (143 PASS-on-arrival archived, reserve 286 → 283) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `385+1.83/turn` (R² 0.81) |
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
across 11 cohorts (Grow #5–13; previous 143/160 @50650000).
Fresh−held-out gap now 16.7 pts (89.4 % vs 72.7 %), inside the §10.20 band —
no calibration family (Grow #6 `symset` 15/240).
**Corpus (Grow #13 `score --new`, 2026-10-15, 920 rows):**
574 PASS (62.4 %); RNG 93.45 %, screens 92.3 %; 892 active + 283 reserve + 4137 archive.
Worst families `scen-questtour` 7/29, `scen-zapfest` 8/14, `scen-shop` 19/85,
`scen-worldtour` 68/160, `scen-descend` 8/9, `scen-symset` 27/222,
`scen-sweep` 134/279; next `scen-town` 11/14, rest ≥ 96.9 % RNG.
Reviews 1225–2836 (index; no row 1618): 1437 ACCEPT, 63 WITH-DEBT, 111 QUALITY-RISK (2829–2836: 8A/0D/0Q, 0 Must-fix queued).
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
Ledger @89f000879: 5329 pinned-C functions — ported 4555 · partial 115 · split 165 · by-design 387 · open 107 (589 declared by seed). Measured: ok 3920, partial 675, thin 248, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3999 (index).**
<!-- recent:begin -->
**D-3999** `wizard.c` resurrect `:770–778` — the gate now reads the C-exact union `!!((u.HDeaf|0) || (u.EDeaf|0) || u.uroleplay?.deaf || u.Deaf)` (cuss shape, same file — no new edge); the doc omit drops the retired "Deaf-aware acoustics polish" clause (SetVoice st
**D-3998** `eat.c` eatcorpse `:1923–1943` — after `finish_losehp_done()`, return 1 only when `gameover` is still set (real death via really_done); survived → fall through like C (no maybe_wail — C hack.c:4290 else-if; JS losehp sets no wail flag in the fatal path 
**D-3997** `cmd.c` do_run `:1605–1618` ('5'→run=3 + DOMOVE_RUSH, PREFIXCMD) + rhack bad_command `:383 — js/cmd.js only. (1) Deleted the house `end_running` from `rhack_unknown_command` — C `:3833–3841` verbatim (retires D-3953 omission 1's run-stop clause; its falsifier fired). (2) The run/rush gate reads call-local `prefi
**D-3996** `mhitu.c` gulpmu `:1289–1587` (AD_PHYS squash arm, physical tail + `Maybe_Half_Phys` `:154 — none (measurement).
**D-3995** `include/youprop.h:103` (`Blind ≡ (HBlinded||EBlinded)&&!BBlinded`, live props, no mirror) — `js/do_wear.js` only. (1) Blind() takes the D-0716 house shape verbatim (cf. shk.js Blind): uroleplay.blind birth-blind gate + live `((HBlinded||EBlinded)&&!BBlinded)` flats; sticky terms deleted. (2) Blindf_off re-syncs
**D-3994** rndcurse cliff ×11: pray.js Antimagic() → D-1089 shape (flats OR uprops H/E; drops the extra black-glow line under worn MR) + sit.js rndcurse You() not You_feel (no dream prefix when Unaware) — 9 PASS + 2 moved.
**D-3993** `wintty.c` tty_preference_update `:594–608` (statuslines arm: new_status_window `:491–507` — js/options.js — ported tty_preference_update whole (live arms; TTY_PERM_INVENT `:609–630` compiled out per config.h:612; genl `:461–469` empty); async only for newclipping's redraw reach; awaited at the doset_simple_menu
**D-3992** `nethack-c/upstream/src/hack.c:2780-2781` (`u.ux0 = u.ux; u.uy0 = u.uy;` in domove_core, a — `js/cmd.js` — deleted the domove-top write (dx/dy stay: C sets those in movecmd before domove); write `u.ux0/u.uy0` just before bhitpos at the C-:2780 position (`js/cmd.js:6800-6801`), covering the swallow arm by fall-th
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3999; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** moveloop_core head = resurrect Deaf-gate writer (JS `!u.Deaf` vs C `HDeaf||EDeaf||uroleplay.deaf`; HDeaf=39 hero hears the taunt, queues it over the amulet wish) — porting the C-exact gate now.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
