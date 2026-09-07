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
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-09-07** — full `sessions` at **D-2019**
(audit **982–989**, `2ae51922`+review). Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`75+0.47/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `75+0.47/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 982–989: 7 ACCEPT, 1 QUALITY-RISK (983 pager found-count → Must-fix, first in queue).
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none — fortress 44/44.
Fortress report `docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (4 `ReferenceError` imports kill 8
sessions) then Open in order; every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster (Must-fix first):** first Open `- [ ] attrib.c exercise — blocks 5/553 corpus sessions (first at step 60): C draws rn2(2)=1 in exercise, JS rn2(300)=129 from dosounds(sounds.js:344). Probe: node scripts/hidden-proxy.mjs verify exercise` (scen-death-Monk-92000, scen-death-Tourist-92095, scen-death-Wizard-92120).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2022 (index).**
<!-- recent:begin -->
**D-2022** (1) `makemon.c:1369–1384` mitem block — (1) makemon.js: `if (no_of_wizards === 1 && Is_earthlevel(game.u?.uz)) mitem = otyp('SPE_DIG')` (C `:1372–1373` gate verbatim; `imports.mjs --can makemon.js const.js Is_earthlevel`: already statically imported, no new ed
**D-2021** `objnam.c` `readobjnam` zero-draw exact paths that resolve `d.typ` before the random `srch — `js/readobjnam.js` — `real `/`fake ` preparse arms + `d.real`/`d.fake` fields (C `:4125–4133`); Amulet real/fake block before `makesingular` (C `:4284–4309`, incl. the `:5002–5006` typfnd non-wizard→fake fold for this ar
**D-2020** `pager.c:1346–1353` — `js/pager.js` — self branch now returns `found: orYou ? 2 : 1`; comment cites the `append_str` return and `:1941`.
**D-2019** `cmd.c:5067–5080` `get_count` echo — `js/display.js` — new exported `async custompline(flags, msg)` (`pline.c:299–309` verbatim shape: consume_msg_loc, empty return, `gp.pline_flags` set/try/finally-reset, vpline core); `pline_after_consume(msg, suppressHis
**D-2018** `pickup.c:3693–3760` `tipcontainer()` calls `tipcontainer_gettarget(box, &cancelled)` `:37 — `js/pickup.js` — new same-file `async tipcontainer_gettarget(box)` in exact C order (floor dummy + blank + invent scan with BoT/dknown/oc_name_known skip, one `await u_handsy()`, locked-known exclusion with 4-space inden
**D-2017** `makemon.c:1012–1054` `newmonhp()` — `js/makemon.js` — `else if (is_rider(ptr))` inserted between golem and `mlevel>49` in exact C position (`basehp = 10; d(basehp, 8)`), and `if (is_home_elemental(ptr)) mon.mhpmax = (mon.mhp *= 3)` appended in the else arm
**D-2016** `do.c:1298–1344` `doup()` — `js/do.js` — ledger arm now C-verbatim: `game.iflags?.debug_fuzzer` early `ECMD_OK`, else `await y_n('Beware, there will be no return!
**D-2015** `end.c:664–680` conduct arm — `js/end.js` — `count_achievements` added to the pre-existing `./insight.js` import (`imports.mjs --can`: already statically imported, no new edge, no TDZ); conduct arm now does one `should_query_disclose_option('c')`, bu
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2022; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
