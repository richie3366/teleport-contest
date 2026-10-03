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

Score last measured: **2026-10-03** — full `sessions` on `18773ed32`
(audit **2303–2311**, 2026-10-03T05:08:33.195Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`322+1.66/turn` (R² 0.80).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-03 01:21Z; fetched 2026-10-03)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `322+1.66/turn` (R² 0.80) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit.
**Corpus fortress (2026-10-03 05:14Z; scored 953/953 entries, 0 unrecorded):**
**706 / 953** PASS (74.1 %), RNG 98.11 %, screens 93.4 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-03T05:14:14.727Z`.
Reviews 1225–2311 (index; no row 1618): 956 ACCEPT, 45 WITH-DEBT, 85 QUALITY-RISK (2303–2311: 9 accept/0 debt/0Q; 2266 erinys family closed by D-3311, verified in 2269).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued).
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
Ledger @c9aee826b: 5329 pinned-C functions — ported 1539 · partial 233 · split 119 · by-design 394 · open 3044 (841 declared by seed). Measured: ok 3747, partial 667, thin 236, missing 679. `node scripts/ledger.mjs summary`.
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
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3360 (index).**
<!-- recent:begin -->
**D-3360** - `highc`: nethack-c/upstream/src/hacklib.c:75–79 — extended the six ALREADY static edges (`highc` → js/botl.js:92 hacklib import; `upstart` → js/potion.js:177 hacklib import; `s_suffix` → js/potion.js:181, js/mthrowu.js:50 alongside the `s_suffix_ucatch` alias, js/minion
**D-3359** - `attacktype`: nethack-c/upstream/src/mondata.c:54–57 — extended the two ALREADY static →mondata edges (`attacktype` added to the mondata.js imports js/mhitu.js:86, js/uhitm.js:114; `imports.mjs --can` ALREADY ×2 — no new edge, no new test surface); deleted both clones (live-
**D-3358** - `upstart`: nethack-c/upstream/src/hacklib.c:113–119 — extended the six ALREADY static →hacklib edges (`upstart` added to the hacklib.js imports js/trap.js:146, js/pickup.js:121, js/apply.js:146, js/do_name.js:88, js/monmove.js:119, js/readobjnam.js:9; `imports.mjs --can` AL
**D-3357** - `dmgtype`: nethack-c/upstream/src/mondata.c:712–715 — extended the 7 ALREADY static edges (`dmgtype` added to the monsters.js imports js/mhitm.js:120, js/mhitu.js:70, js/monmove.js:15, js/zap.js:263; `attacktype` + `dmgtype_fromattack` added to the mondata.js import js/mhit
**D-3356** - `upstart`: nethack-c/upstream/src/hacklib.c:113–119 — extended the two ALREADY static →hacklib edges (`upstart` added to the hacklib.js imports js/mthrowu.js:11, js/read.js:142; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones (live-
**D-3355** - `attacktype`: nethack-c/upstream/src/mondata.c:54–57 — extended the 6 ALREADY static edges (`attacktype` added to the mondata.js imports js/makemon.js:100, js/muse.js:53, js/polyself.js:40, js/trap.js:148; `dmgtype` added to the monsters.js imports js/engrave.js:83, js/eat.j
**D-3354** - `On_stairs`: nethack-c/upstream/src/stairs.c:148–151 — extended the two ALREADY static →hack edges (`On_stairs` added to the hack.js imports js/dogmove.js:63, js/apply.js:83; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones; dropped t
**D-3353** - `invocation_pos`: nethack-c/upstream/src/hack.c:982–986 — extended the two ALREADY static →hack edges (`invocation_pos` added to the hack.js imports js/mklev.js:166, js/apply.js:83; `imports.mjs --can` ALREADY both — no new edge, no new test surface); deleted both clones; dropp
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3360; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** `highc` + `upstart` + `s_suffix` (C hacklib.c:75–79, :113–119, :344–359): 8-row hacklib.c clone-removal cluster — rewire botl.js highc (3 sites), potion.js upstart_pot/s_suffix_pot (1+3 sites), mthrowu/minion/explode/shk/questpgr.js s_suffix (2+1+3+8+1 sites) to the live exports js/hacklib.js:455/:498 + js/do_name.js:418, delete 7 clones (6 edges ALREADY, questpgr→do_name NEW imports.mjs SAFE).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
