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
(audit **1946–1955**, commit `b2a5f3fb7`, measured 2026-09-27T21:19Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`270+1.70/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-27)** | **12 / 44**, 6,442 / 11,265 pts, RNG **31.5 %**, rngSteps 85.3 %, screens **57.2 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `270+1.70/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,442 / 11,265 pts, RNG 31.5 %,
rngSteps 85.3 %, screens 57.2 %; board 2026-09-27T19:26:02Z, last scored
2026-09-27T19:00:18Z).
**Corpus fortress (full rescore 2026-09-28, 953/953 entries, 0 unrecorded):**
**627 / 953** PASS (65.8 %; 627/940 = 66.7 % excluding 13 env-only
config-path rows), RNG 96.00 %, screens 88.8 %, 111 blocking owners. vs
the last full board (2026-09-25, `309d58ccc`): 614 → 627, 16 FAIL→PASS,
3 PASS→FAIL → Must-fix (`use_saddle` ×2, `mcalcmove` ×1). Recorder rebuilt
on Linux with macOS parity (clang, sysconf, `PORT_ID`, apple, DEV_RANDOM,
ncompress) + `record-session.mjs` final-frame fix: 43/44 public sessions
re-record identical (seed2200 = env config path).
Reviews 1225–1955 (index; no row 1618): 646 ACCEPT, 23 WITH-DEBT, 61 QUALITY-RISK (audit 1946–1955: 9 ACCEPT, 1 WITH-DEBT).
Live debts: 1730 `wizcustom_glyphids` empty `wizcustom_callback` site (glyphmap-blocked, map-named); 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS) — review-debt, unqueued (detail in the review files).
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

**Port the game as completely as possible, one cluster per iteration** —
up to 10 whole C functions of one C file or caller/callee closure
(2026-09-28; the one-function rule had shrunk iterations to ~50 lines).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @63aec4509: 5329 pinned-C functions — ported 512 · partial 230 · split 11 · by-design 307 · open 4269 (910 declared by seed). Measured: ok 3307, partial 657, thin 237, missing 1128. `node scripts/ledger.mjs summary`.
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
**Next cluster:** next Open — coverage row (breadth queue).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3001 (index).**
<!-- recent:begin -->
**D-3001** - `free_proto_dungeon`: `nethack-c/upstream/src/dungeon.c:1184–1201` (staticfn; branch nam — file-local `free_proto_dungeon(pd)` in C order (`js/dungeon.js:1539`, C staticfn; each C free() ⇔ null release, free_region precedent — including the `:1194–1195` chainlvl guard and the `svn.n_dgns` third-loop bound ⇔ `g
**D-3000** - `mon_explodes`: `nethack-c/upstream/src/explode.c:1049–1054` (kill via `mondead`), `:104 — `mon_explodes` now `await mondead(mon)` inside the live-monster gate (`js/explode.js:822`; new explode→mhitm edge, `imports.mjs --can` SAFE — hoisted fn, closes an explode↔mhitm cycle with no top-level TDZ read); unknown
**D-2999** `nethack-c/upstream/include/youprop.h:136–138` (`HWounded_legs` ≡ `uprops[WOUNDED_LEGS].in — `js/timeout.js` WOUNDED_LEGS arm now OR-reads flat‖slot and dual-writes `next` (slot masked, BLINDED-style — non-TIMEOUT bits preserved), following the DEAF/FUMBLING/FAST dedicated-arm idiom; `js/trap.js` `heal_legs` als
**D-2998** `nethack-c/upstream/src/region.c:393–405` `clear_regions` (free loop `:398–399`, n_regions — new exported `free_region` (`js/region.js:652`, C extern linkage) in C order with per-arm `:line` cites — each live C `free()` renders as a null release, `:274` free(reg) is a no-op by construction (both callers drop the
**D-2997** `nethack-c/upstream/src/sp_lev.c:3142–3164` `find_montype` (staticfn; C callers `get_table — File-local `find_montype(s, mgender)` in C order at `js/mklev.js:28899` (C staticfn, like same-file `get_room_loc`): NEUTRAL seed `:3148`, name_to_monplus with NULL remainder `:3150`, LOW_PM/NUMMONS range `:3151`, fixed-
**D-2996** `nethack-c/upstream/src/zap.c:692–709` `get_mon_location` (sole C caller `light.c` do_ligh — Exported `get_mon_location` at `js/timeout.js:1670`, wired at `js/light.js:516`.
**D-2995** `nethack-c/upstream/src/muse.c:419–436` `m_next2m` (staticfn; sole C caller find_defensive — File-local `m_next2m` in C order at `js/muse.js:268` (mirrors same-file `m_next2u`, C staticfn): `DEADMONSTER || mon_offmap` short-circuit as `(mhp|0)<1 || mon_offmap` `:426–427` (file idiom), 3×3 loop over `mx±1/my±1` w
**D-2994** `nethack-c/upstream/src/engrave.c:502–541` `u_can_engrave` (staticfn; sole C caller doengr — Full C-order async body at `js/engrave.js:989`.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3001; wrap `wildmiss` /
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
