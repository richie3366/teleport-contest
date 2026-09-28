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
(audit **2016–2023**, `c055153c2`, 2026-09-28T21:06Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`259+1.62/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-28)** | **12 / 44**, 6,880 / 11,265 pts, RNG **33.6 %**, rngSteps 87.4 %, screens **61.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `259+1.62/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, up on points (table row;
board 2026-09-28T19:33:07Z, scored 19:06:12Z).
**Corpus fortress (rescore 21:12Z, 953/953, 0 unrecorded):**
**631 / 953** PASS (66.2 %), RNG 96.04 %, screens 88.9 %; 0 flips vs 2008–2015 board; `full: true`.
Reviews 1225–2023 (index; no row 1618): 710 ACCEPT, 27 WITH-DEBT, 61 QUALITY-RISK (2016–2023: 8 ACCEPT).
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
Ledger @774d64d58: 5329 pinned-C functions — ported 704 · partial 234 · split 24 · by-design 311 · open 4056 (907 declared by seed). Measured: ok 3428, partial 656, thin 236, missing 1009. `node scripts/ledger.mjs summary`.
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
**Falsifier:** held-out (`leaderboard.mjs`) flat after ~30 breadth
iterations → human revisits the picker.
**Next cluster:** D-3069 shipped; pop the regenerated head.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3069 (index).**
<!-- recent:begin -->
**D-3069** - `reset_needed_visuals`: nethack-c/upstream/src/options.c:8979–9014 — - `reset_needed_visuals`: restarted whole in C order — full 4-flag gate, palette clear, customcolors/customsymbols/redraw arms with reglyph_darkroom, promptstyle guard, botl, all five clears
**D-3068** - `print_queue`: nethack-c/upstream/src/timeout.c:2014–2037 (live arm `:2024–2028` under u — print_queue prints the live `name(ptr)` arm via the shared TIMEOUT_FUNC_NAMES (newly exported from mkobj.js — no clone #2); new exported `cleanup_burn` in timeout.js (C order, end_burn `void impossible` precedent for the
**D-3067** `unmakemon`: nethack-c/upstream/src/makemon.c:1514–1539 (countbirth :1519, mndx :1520, bor — new exported `async unmakemon(mon, mmflags)` in js/makemon.js in C order with per-arm `:line` cites — countbirth from MM_NOCOUNTBIRTH (:1519), mndx via live `monsndx` (:1520), mvitals entry ensured like `propagate` (C sv
**D-3066** - shk.c breadth cluster — onbill/restshk/cad/pacify_shk/rouse_shk/use_unpaid_trapobj ported; 9 same-file rows stale (see D-log).
**D-3065** - `free_all_glyphmap_u`: nethack-c/upstream/src/utf8map.c:59–80 (whole body in C order — new exported `free_all_glyphmap_u()` in js/glyphs.js in C order with per-arm `:line` cites (nulls utf8str then u per cell — C `free` ≡ null, GC collects; absent array ≡ all-NULL BSS, no ensure); new exported `reset_custo
**D-3064** - `armor_simple_name`: nethack-c/upstream/src/objnam.c:5435–5468 (whole body in C order — new exported `shirt_simple_name()` in js/do_wear.js with the sibling `*_simple_name` family (C home is objnam.c); the ARM_SHIRT arms (armor_simple_name `:5460`, armor_doff_simple_name for do_wear.c:1959), destroy-armor d
**D-3063** - `free_nomakedefs`: nethack-c/upstream/src/date.c:134–173 (whole body in C order — new exported `free_nomakedefs()` in js/date.js in C order with per-arm `:line` cites (nulls the 4 strdup'd `game.nomakedefs` fields — GC owns the memory, no clone; numerics untouched per C); wired the mdlib.c:871 site vi
**D-3062** - `spot_checks`: nethack-c/upstream/src/hack.c:4525–4547 (whole body in C order — new sync exports in `js/hack.js` in C order with per-arm `:line` cites (`spot_checks`; `cmp_weights` file-local from the `:4486` staticfn; `dump_weights_lines` builder + `dump_weights` emitter per the D-3060 split); wire
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3069; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` (frozen history).

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
