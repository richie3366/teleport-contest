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

Score last measured: **2026-09-27** — full `sessions` on the working tree
(audit **1928–1936**, commit `8d2439c0f`, measured 2026-09-27T15:40Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`260+1.59/turn` (R² 0.766).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-27)** | **12 / 44**, 6,442 / 11,265 pts, RNG **31.5 %**, rngSteps 85.3 %, screens **57.2 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `260+1.59/turn` (R² 0.766) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,442 / 11,265 pts, RNG 31.5 %,
rngSteps 85.3 %, screens 57.2 %; board 2026-09-27T13:26:37Z, last scored
2026-09-27T13:02:34Z).
**Corpus fortress:** `.cache/hidden/sessions` is still absent, so the
**614 / 940** figure was not re-measured. `hidden-proxy score --jobs 8`
on the 12 private sessions that are present (2026-09-27, `8d2439c0f`): 12/12 PASS, RNG 75,151/75,151,
screens 653/653, 0 blocking owners. No PASS→FAIL row.
Reviews 1225–1936 (index; no row 1618): 628 ACCEPT, 22 WITH-DEBT, 61 QUALITY-RISK (audit 1928–1936: 7 ACCEPT, 2 QUALITY-RISK).
Live debts: 1730 `wizcustom_glyphids` empty `wizcustom_callback` site (glyphmap-blocked, map-named); 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending — review-debt, unqueued (detail in the review files).
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

**PASS (44):** seed0002-healer-reflection-drummer, seed0004-feeding-pony,
seed0006-wizard-water-demon, seed0007-rogue-snake-swamp, seed0009-swimmer-mforce,
seed0012-monk-vault-escort, seed0013-friday13-save-then-fullmoon-restore,
seed0013-rogue-friday13-combat, seed0014-dequa-fountain-explore,
seed0015-valk-level2-pit-dog-wait, seed0016-healer-newmoon-eat-zap,
seed0017-samurai-altar-pray, seed0030-ten-diverse-deaths,
seed0060-orc-rogue-kick-search, seed0077-rogue-chargen,
seed0101-ranger-quiver-throw-travel-engrave, seed0102-ranger-name-cancel,
seed0103-knight-ride-pony, seed0104-knight-ride-combat,
seed0105-valk-chat-lamp-ration, seed0106-priest-extcmd-sweep,
seed0107-samurai-twoweapon-enhance, seed0108-wizard-extcmd-wishlist,
seed0116-wizard-wear-shop, seed0200-monk-north-search,
seed0360-wizard-world-tour, seed0361-archeologist-tour,
seed0367-priest-quest-tour, seed0373-barbarian-quest-tour,
seed0383-wizard-hallucinate, seed0398-wizard-wandpoly-pile,
seed0399-wizard-hallu-actions, seed0501-priest-cast-read-turn,
seed0700-samurai-explore-descend, seed0900-tourist-explore-actions,
seed1150-caveman-explore-move, seed1500-rogue-explore-move,
seed1800-tourist-eat-throw, seed2200-wizard-quaff-zap-read,
seed2600-wizard-custom-binds, seed4500-knight-coverage,
seed5002-wizard-coverage-pair, seed5006-tourist-stress-disaster,
seed8000-tourist-starter.

**Notable non-PASS:** none — 44/44 (seed0107 restored to 98/98 by D-2610).

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

## Primary objective — BREADTH PHASE (opened 2026-09-18, Constitution §10.17)

**Port the game as completely as possible, one whole C function per
iteration.** Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @9b244f090: 5329 pinned-C functions — ported 472 · partial 225 · split 1 · by-design 305 · open 4326 (942 declared by seed). Measured: ok 3261, partial 649, thin 238, missing 1181. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
The work picker is **measured coverage + the ledger**, not the corpus: pop
`LOOP-QUEUE.md` Must-fix, then the first row of the generated **Open —
coverage** block (`docs/LEDGER.md`; the pop-time `brief.mjs` re-check
decides stale in ≤ 3 calls → `ledger.mjs set <fn> ported --note "stale: …"`).
Deliverable = the **entire C body** in C order — every arm, every callee
live or named in the map, every C caller wired (brief callers table) —
**200–800 lines** of C-faithful JS (supervisor caps 1500 ins / 15 files).
Subsystem restart (delete the thin JS function, re-port from C) beats
patching arms. Also ship, in the same iteration, any Must-fix/Open row in
the **same C file**. Gates unchanged: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **REACH-OK** (corpus sessions that executed
the function still PASS — `verify.mjs --fn`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier for the phase:** held-out on `leaderboard.mjs` after ~30
breadth iterations; if it does not move while coverage does, the human
revisits the picker.
**Next cluster:** `earlyarg.c` argcheck — coverage MISSING (C 77 code L `earlyarg.c:450–560` / JS no symbol; hops —, callers 1, RNG 0, msg 0; dead callees: debug_fields, dump_version_info, early_version_info, dump_enums, dump_mongen, dump_weights, …) @25beec7af
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2986 (index).**
<!-- recent:begin -->
**D-2986** `nethack-c/upstream/src/earlyarg.c:450–560` `argcheck`. The table is `earlyopts` (`:36–52` — One exported `argcheck` keeps that C order and calls `options.js` `match_optname`, `dungeon.js` `dupstr`, `display.js` `raw_printf`, and `hacklib.js` `strncmpi` / `strstri`.
**D-2985** `nethack-c/upstream/src/insight.c:3187–3200` `align_str`. The switch is on `(int) alignmen — One exported `align_str` keeps that C order, including `"unaligned"` and `"unknown"`.
**D-2984** `nethack-c/upstream/src/botl.c:419–436` `botl_score`. `deepest_lev_reached(FALSE)` is cast — One exported `botl_score` keeps that C order.
**D-2983** `nethack-c/upstream/src/muse.c:2035–2081` `rnd_offensive_item`. Animals, `AT_EXPL`, mindle — One exported `rnd_offensive_item` keeps that C order and calls `worn.js` `which_armor` and `do_wear.js` `hard_helmet` (`imports.mjs --can` SAFE, hoisted).
**D-2982** `nethack-c/upstream/src/worn.c:355–471` `check_wornmask_slots`. `worn[]` is `worn.c:18–34` — One exported `check_wornmask_slots` keeps that C order.
**D-2981** `nethack-c/upstream/src/pline.c:455–469` `You_see`. `va_start`, then Unaware → `YouPrefix` — One exported `You_see` keeps that C order and calls `eat.js` `Unaware` and `invent.js` `Blind` (`imports.mjs --can` ALREADY).
**D-2980** `nethack-c/upstream/src/objnam.c:2091–2105` `singular`. If `otyp == CORPSE` and `func == x — A corpse passed with `xname` is named by `cxname` before the quantity is forced to 1 and restored.
**D-2979** `nethack-c/upstream/src/iactions.c:140–274` `itemactions_pushkeys`. `IA_QUAFF_OBJ` (`:207– — `IA_QUAFF_OBJ` queues `do_reqmenu`, then `dodrink`, then the invlet.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2986; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pet movement) and **dog_invent** (both hits are `mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` (frozen history).

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence:
Public score cadence above). One D-entry with its `- **Ledger:**` bullet;
`finish-iteration.mjs` writes the ledger, index, journal and this file's
generated blocks. No completed D-lists.
