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
(audit **1999–2007**, `0ce2fb847`, 2026-09-28T14:59Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`266+1.62/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-28)** | **12 / 44**, 6,880 / 11,265 pts, RNG **33.6 %**, rngSteps 87.4 %, screens **61.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `266+1.62/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, up on points (table row;
board 2026-09-28T13:21:33Z, scored 13:01:30Z).
**Corpus fortress (rescore 2026-09-28T15:06:59Z, 953/953, 0 unrecorded):**
**631 / 953** PASS (66.2 %), RNG 96.04 %, screens 88.9 %; 0 flips vs the audit 1990–1998 board. Board `full: true`.
Reviews 1225–2007 (index; no row 1618): 694 ACCEPT, 27 WITH-DEBT, 61 QUALITY-RISK (audit 1999–2007: 9 ACCEPT).
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
Ledger @e96a1ef43: 5329 pinned-C functions — ported 641 · partial 233 · split 22 · by-design 311 · open 4122 (907 declared by seed). Measured: ok 3392, partial 657, thin 236, missing 1044. `node scripts/ledger.mjs summary`.
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
**Next cluster:** `toss_wsegs` (worm.c head, PARTIAL).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3051 (index).**
<!-- recent:begin -->
**D-3051** - `pay`: nethack-c/upstream/src/shk.c:1297–1313 (whole body in C order — restarted `check_credit` whole in C order with per-arm `:line` cites — async only because `pline_The` can reach --More-- (Constitution §2), `credit === 0` keeps the `;` fallthrough shape, both message arms use the live `
**D-3050** - `align_gtitle`: nethack-c/upstream/src/pray.c:2628–2649 (whole body in C order — restarted the export whole in C order with per-arm `:line` cites — explicit `switch` with `A_NEUTRAL` and `default: gnam = 0` arms, `result` variable, single return.
**D-3049** - `relmon`: nethack-c/upstream/src/mon.c:2561–2594 (whole body in C order — restarted the export whole in C order with per-arm `:line` cites — `!mon` defensive guard kept (C declares NONNULLARG1; every call site passes live mtmp), `!(game.fmon||[]).length → impossible('relmon: no fmon available.
**D-3048** - `find_branch_room`: nethack-c/upstream/src/mklev.c:1660–1673 (staticfn; whole body in C  — restarted the export whole in C order with per-arm `:line` cites — `let croom = null` (:1662), `(game.level?.nroom | 0) === 0 → mazexy(mp)` (:1664–1665, same `| 0` nroom idiom as the rest of mklev.js), else `generate_sta
**D-3047** - `handler_menu_headings`: nethack-c/upstream/src/options.c:5779–5792 (staticfn; whole bod — new exports in js/options.js in C order with per-arm `:line` cites.
**D-3046** - `Hello`: nethack-c/upstream/src/role.c:2120–2140 — expanded the Valkyrie arm in C order with per-arm `:line` cites: `mtmp && mtmp.data?.name === 'PM_MAIL_DAEMON'` → `'Hallo'`, else `'Velkommen'` — mirrors the Samurai arm's permonst identity check in the same function (mo
**D-3045** - `furniture_detect`: nethack-c/upstream/src/detect.c:1091–1134 (staticfn; whole body in C — restarted `furniture_detect` whole with per-arm `:line` cites — `unconstrain_map()` :1097, `glyph_at`/`glyph_to_cmap` reads :1101–1102, `IS_FURNITURE(levl typ)` :1103–1105, `is_cmap_furniture` arm as the sym.h:104 macro 
**D-3044** - `cannot_push_msg`: nethack-c/upstream/src/hack.c:247–259 — deleted both twins, added `cloak_simple_name` to the existing `./do_wear.js` imports (both edges already existed — no new cycle); wired the five do_wear arms with per-arm `:line` cites (shirt arm keeps C `(uarm && !uarmc
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3051; wrap `wildmiss` /
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
