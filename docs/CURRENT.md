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

Score last measured: **2026-10-16** — full `sessions` on `5ce1212e7`
(audit **2875–2882**). Fortress **44/44** (no throws; aggregates in the table).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-16 19:19Z)** | **32 / 44**, 10,454 / 11,265 pts, RNG **93.5 %**, rngSteps 98.2 %, screens **92.8 %** (unchanged; window unjudged) |
| **Fresh cohort (§10.20, scored on arrival)** | 51250000 ×160 @`b608a104e`: **149/159 (93.7 %)**, RNG 99.7 %, screens 98.1 % — impaired 1/2, symset 8/12 worst; sweep/worldtour 10/12; zapfest 11/12; chain/shop/questtour/trek 12/12 + rest 100 % |
| **Corpus board (worked, regression fortress)** | full rescore 2026-10-16 (audit 2875–2882): **654/1225** (**0 PASS→FAIL**, 4 new PASS, 30 archived, `unrecorded` 0; RNG 96.9 %, screens 93.6 %); `tier` → **842 + 294 + 5017** (1 out, 78 back) |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `394+1.80/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`, ranked by
pts = matched screens). Rank 3 (10,454; leader 11,264 at 43/44).
32/44 at judge 13:09Z 2026-10-15 (+533 pts, screens 88.1→92.8 %,
RNG 92.0→93.5 %): the D-3970..D-3977 window (domove bare returns,
des stackobj, drop_throw broken, portal scan, ghostly/malign, lev-fly
unions, TEXT col-0) moved the judge again — cliffs score where they
reach. **Three lines, read together:** held-out (judge), fresh cohort
(`fresh-cohort.mjs`, the local generalization estimate), board (the
fortress — it rises by construction). Fresh history: 79–93.7 %
across 16 cohorts (Grow #5–18; previous 146/160 @51150000).
Fresh−held-out gap now 21.0 pts (93.7 % vs 72.7 %), outside the §10.20 band —
calibration fired: `hallu` 18/20 not-held-out-like, `extcmd` 0/20 added
(20 probe + 80, 99 failing folded; §5c).
**Corpus (Grow #18 `score --new` + `tier`, 2026-10-16, 884 rows):**
605 PASS (68.4 %); RNG 97.50 %, screens 96.3 %; 872 active + 371 reserve + 4987 archive.
Worst families `scen-zapfest` 8/20, `scen-symset` 29/210, `scen-shop` 25/79,
`scen-questtour` 18/25, `scen-worldtour` 68/155, `scen-sweep` 149/268,
`scen-extcmd` 0/99 (new), rest ≥ 96.9 % RNG.
Reviews 1225–2882 (index; no row 1618): 1482 ACCEPT, 64 WITH-DEBT, 111 QUALITY-RISK (2875–2882: 8A/0D/0Q, 0 Must-fix).
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
Ledger @a9fdda84f: 5329 pinned-C functions — ported 4552 · partial 117 · split 166 · by-design 387 · open 107 (586 declared by seed). Measured: ok 3920, partial 676, thin 247, missing 486. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-4045 (index).**
<!-- recent:begin -->
**D-4045** windows.c add_menu `:1795–1812` (`:1803–1807` get_menu_coloring replace when use_menu_colo — js/invent.js — get_menu_coloring + cattr_to_cell onto the existing options.js edge (imports.mjs ALREADY); new pickinv_menu_coloring(text) (:3726: C attr_n rule + bare-str match + cell attr) applied at inuse fake (:3866)/
**D-4044** bones.c:259–303 drop_upon_death (:275 obj_extract_self→freeinv→freeinv_core); invent.c:135 — two envelope call sites in C order, dropx/zap pattern verbatim (`if (otmp.oartifact) await revoke_invoked_property(otmp)`): end.js right after extract, before the obj_no_longer_held gate (C bones.c:275 before :279); do.j
**D-4043** dig.c adj_pit_checks `:1776` (`ltyp = room->typ, room->flags = 0`) + rm.h `:213-215` (`#de — js/dig.js only — adj_pit_checks clears `lev.wall_info = 0` alongside `lev.flags = 0` (C :1776 + rm.h:215 cites; house dual-write precedent zap_dig :1497-1498 doormask+flags).
**D-4042** cmd.c reset_commands :3432–3436 (dirchars = sdir/ndir/ndir_phone_layout "47896321><"/"4123 — js/getpos.js only — numPad predicate (lock.js:189 house shape); wdx/wdy select DIR_DX vs new NUMPAD_DX(_PHONE) (ndir strings verbatim, lock.js NUMPAD_DIR sibling data); highc/C() arms gated on !numPad (C :3464); quitchar
**D-4041** zap.c revive :883–1120 (makemon :985/:1008 with NO_MINVENT|MM_NOWAIT|MM_NOMSG[+gender][+MM — js/zap.js only — import makemon_appear_msg (existing makemon.js edge, imports.mjs ALREADY) + await it right after each creation (montraits :3145, cant_revive :3423, normal :3450–3453) with C cites, before revive's post-m
**D-4040** zap.c bhitm :160–573 — js/zap.js only — `let ret = 0` (`:162`); `case WAN_NOTHING: wake = false` (C-order, after SPE_DRAIN_LIFE); `ret = 1` in the SPE_KNOCK arm (`:403`); default → `await impossible(...)` (bhito :6061 sibling shape); `return r
**D-4039** nethack-c/upstream/src/cmd.c:1738–1739 extcmdlist «history» (IFBURIED|AUTOCOMPLETE|GENERAL — js/getline.js only — added the `history` EXT_CMDS row (version sibling shape: dynamic `./pager.js` import, edge already present; wiz:false, autocomplete:true per C flags) with C cite.
**D-4038** `wizcmds.c:49–66` wiz_identify sets `iflags.override_ID` (cmd char, nonzero) around displa — js/objnam.js only — doname_base stages `obj.known/dknown/bknown = 1` + `game.objects[otyp].oc_name_known = 1` before the base-name if/else and restores in `finally` (xname_flags sibling shape verbatim + C cites).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-4045; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** D-4045 shipped (pickinv menucolor + slippery: 33 PASS, 5 moved, 44/44). Head still D-4016/D-4028 parks; next: regen head.

## Parked (diagnose only)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
