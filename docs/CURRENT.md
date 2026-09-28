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
(audit **1956–1962**, commit `c4bce1fa8`, measured 2026-09-28T04:09Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`260+1.84/turn` (R² 0.81).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-28)** | **12 / 44**, 6,442 / 11,265 pts, RNG **31.5 %**, rngSteps 85.3 %, screens **57.2 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `260+1.84/turn` (R² 0.81) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out still 12/44 (6,442 / 11,265 pts, RNG 31.5 %,
rngSteps 85.3 %, screens 57.2 %; board 2026-09-28T02:06:51Z, last scored
2026-09-28T01:40:04Z).
**Corpus fortress (full rescore 2026-09-28T04:15Z, 953/953, 0 unrecorded):**
**630 / 953** PASS (66.1 %; 67.0 % ex-13-env), RNG 96.02 %, screens
88.8 %, 109 owners. vs `6231a7084`: 627 → 630 (D-2999 ×2 + D-3000 ×1,
in their SHAs), 0 PASS→FAIL → no Must-fix. Board is `full: true`.
Reviews 1225–1962 (index; no row 1618): 652 ACCEPT, 24 WITH-DEBT, 61 QUALITY-RISK (audit 1956–1962: 6 ACCEPT, 1 WITH-DEBT).
Live debts: 1730 `wizcustom_glyphids` empty `wizcustom_callback` site (glyphmap-blocked, map-named); 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap — review-debt, unqueued (see reviews).
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
(2026-09-28; the one-function rule had shrunk iterations to ~50 lines).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @c704500d7: 5329 pinned-C functions — ported 539 · partial 233 · split 13 · by-design 307 · open 4237 (910 declared by seed). Measured: ok 3333, partial 659, thin 237, missing 1100. `node scripts/ledger.mjs summary`.
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
**Next cluster:** options.c doset_simple_menu (head, THIN 121L, 1 blocked corpus session) + longest_option_name (MISSING 18L, staticfn callee).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3009 (index).**
<!-- recent:begin -->
**D-3009** - `doset_simple_menu`: `nethack-c/upstream/src/options.c:8536–8702` (fmtstr `:8555–8560`,  — restart in C order.
**D-3008** - `bless`: `nethack-c/upstream/src/mkobj.c:1745–1764` (COIN early return `:1749–1750`, rad — `bless` (`js/mkobj.js:680`) restarted whole in C order — COIN guard, radius-before-flip, BUC flip (JS booleans per curse idiom), luck → bag weight → timed-FIGURINE `stop_timer(FIG_TRANSFORM, obj_to_any(otmp))` chain, lam
**D-3007** - `load_special`: `nethack-c/upstream/src/sp_lev.c:6454–6502` (coder create `:6459`, load_ — `load_special(name)` at `js/mklev.js:3012` — strips LEV_EXT and reuses `load_special_proto` entry/exit/dispatch (its `finally` is C's give_up free + NULL); the `:6464–6494` epilogue stays distributed per level (each load
**D-3006** - `lock_mouse_buttons`: `nethack-c/upstream/src/cmd.c:3326–3340` (function-static stash `: — port `lock_mouse_buttons(savebtns)` at `js/cmd.js:1023` in C order — module-local `_locked_mousebtn` stash (`:1022`, C `:3329` static), save arm stashes each entry then clears (`:1025–1029`, C `:3333–3337`), restore arm 
**D-3005** - `rest_engravings`: `nethack-c/upstream/src/engrave.c:1584–1619` (drop head `:1590`, lth= — five ports in `js/engrave.js:164–299` in C order.
**D-3004** - `free_luathemes`: `nethack-c/upstream/src/mklev.c:344–364` (group comment `:348–353`, sk — port `free_luathemes(theme_group)` (`js/mklev.js:28128`) in C order, plus the `hack.h` group consts (`:28117–28119`).
**D-3003** - `option_help`: `nethack-c/upstream/src/options.c:9462–9549` (intro + CONFIG_SLOT `:9470– — Split `option_help`; port `is_wc2_option` + `optfn_boolean` with BoolOpt wiring.
**D-3002** - `apply_customizations`: `nethack-c/upstream/src/glyphs.c:531–574` (flag mask `:538–540`, — `js/glyphs.js`: module-local `to_custom_symset_entry_callback` (`:636`, `{ v }` extraval box, `String.fromCodePoint(uval)` for the accepted utf8 bytes — the encoder rejects surrogates/>U+10FFFF so it cannot throw; ENHANC
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3009; wrap `wildmiss` /
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
