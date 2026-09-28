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

Score last measured: **2026-09-28** — full `sessions` on the working tree
(audit **1981–1989**, `da6d0e8ae`, 2026-09-28T11:55Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`269+1.62/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-28)** | **12 / 44**, 6,452 / 11,265 pts, RNG **33.2 %**, rngSteps 87.0 %, screens **57.3 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `265+1.63/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,452 / 11,265 pts, RNG 33.2 %,
rngSteps 87.0 %, screens 57.3 %; board 2026-09-28T07:54:39Z, last scored
2026-09-28T07:27:53Z).
**Corpus fortress (rescore 2026-09-28T12:01Z, 953/953, 0 unrecorded):**
**631 / 953** PASS (66.2 %), RNG 96.04 %, screens 88.9 %; 0 flips (+Barbarian-70011). Board `full: true`.
Reviews 1225–1989 (index; no row 1618): 676 ACCEPT, 27 WITH-DEBT, 61 QUALITY-RISK (audit 1981–1989: 9 ACCEPT).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews).
Audit iters (mandatory, 2026-09-28): full scoreboard update —
`hidden-proxy.mjs record --jobs 8` then unfiltered `hidden-proxy.mjs score
--jobs 8` (≈270 s), committed with `full: true` — + `leaderboard.mjs`.
`record` needs the C recorder (`bash nethack-c/build-recorder.sh`; Linux:
clang, bison, flex, ncompress); `.cache` recordings take ≈45 s to rebuild.

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

## Primary objective — BREADTH PHASE (opened 2026-09-18, Constitution §10.17)

**Port the game as completely as possible, one cluster per iteration** —
up to 10 whole C functions of one C file or caller/callee closure
(2026-09-28).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @34c47b267: 5329 pinned-C functions — ported 607 · partial 233 · split 22 · by-design 310 · open 4157 (907 declared by seed). Measured: ok 3369, partial 664, thin 239, missing 1057. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
The work picker is **measured coverage + the ledger**, not the corpus: pop
`LOOP-QUEUE.md` Must-fix, then the first row of the generated **Open —
coverage** block (`docs/LEDGER.md`; the pop-time `brief.mjs` re-check
decides stale in ≤ 3 calls → `ledger.mjs set <fn> ported --note "stale: …"`).
Deliverable = for each function of the cluster, the **entire C body** in
C order — every arm, every callee live or named in the map, every C caller
wired (brief callers table) — **200–800 lines** of C-faithful JS for the
cluster (supervisor caps 1500 ins / 15 files). Grow the cluster from the
head row: its Open callees, then Open rows of the **same C file**. A
Must-fix ships alone. Subsystem restart (delete the thin JS function,
re-port from C) beats patching arms. Gates unchanged: syntax · Rule #2 ·
green + strict · cohort · full 44 when shared · **REACH-OK** per function
(corpus sessions that executed it still PASS — `verify.mjs --fn a,b,c`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier for the phase:** held-out on `leaderboard.mjs` after ~30
breadth iterations; if it does not move while coverage does, the human
revisits the picker.
**Next cluster:** coverage head.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3034 (index).**
<!-- recent:begin -->
**D-3034** - `fix_wall_spines`: `mkmaze.c:229–287` whole + panic arm; `iswall`/`iswall_or_stone` C-named; `okay`+`check_ransacked` split.
**D-3033** - `fhito_loc`: `nethack-c/upstream/src/muse.c:1706–1726` whole in C order — - `fhito_loc`: new staticfn (`js/muse.js:894`) in C order with per-arm `:line` cites; async since live `bhito` is async; `|0` on ox/oy/tx/ty (C `coordxy` short); `hitanything += (await fhito(otmp, obj)) | 0` (C int sum);
**D-3032** - `l_push_mkroom_table`: `nethack-c/upstream/src/sp_lev.c:3057–3070` whole in C order — - `l_push_mkroom_table`: new export (`js/mklev.js:23014`) returning the C-exact table object (plain object = the Lua push; region sub-object = nhl_add_table_entry_region `:326–335`; `!!rlit` = the (boolean) cast, so -1 r
**D-3031** - `get_saved_pline`: `nethack-c/upstream/src/report.c:571–592` whole in C order — - `get_saved_pline`: new export (`js/display.js:2559`) in C order with per-arm `:line` cites over the live ring — `|0` lineno, newest-slot start, 50-step walk, modular step-back, null fallthrough.
**D-3030** - `bare_artifactname`: `nethack-c/upstream/src/objnam.c:2502–2515` whole in C order — - `bare_artifactname`: restarted the export whole in C order against live callees — `artiname(obj.oartifact | 0)` (same file, C-exact incl.
**D-3029** - `wizcustom_callback`: `nethack-c/upstream/src/wizcmds.c:1986–2027` whole in C order — new `export function wizcustom_callback` (`js/wizcmds.js:1609`) in C order with per-arm `:line` cites: glyphmap via `ensure_glyphmap()` (exported from js/glyphs.js this commit — the live `glyphmap[MAX_GLYPH]` mirror; `re
**D-3028** - `dokeylist`: `nethack-c/upstream/src/cmd.c:2867–3013` whole in C order — `js/dokeylist.js` — restarted `dokeylist_lines` in C order with per-arm `:line` cites: new file-local `live_spkey` (live `game.Cmd.spkeys[nhkf]` with `(uchar)` cast, SPKEYS_DEFAULT fallback while no rebind path writes th
**D-3027** - `del_engr`: `nethack-c/upstream/src/engrave.c:1644–1663` whole in C order — `js/engrave.js` — restarted `del_engr` in C order with per-arm `:line` cites: `!ep` JS guard kept (C NONNULLARG1; JS passes engr_at() misses straight in), head-first match, ept walk with break, `!ept` → `void impossible(
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3034; wrap `wildmiss` /
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
