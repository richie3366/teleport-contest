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

Score last measured: **2026-10-03** — full `sessions` on `caaacb9fc`
(audit **2276–2284**, 2026-10-03T00:29:21.150Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`338+1.61/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-02 19:10Z; fetched 2026-10-02)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `338+1.61/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit.
**Corpus fortress (2026-10-03 00:35Z; scored 953/953 entries, 0 unrecorded):**
**705 / 953** PASS (74.0 %), RNG 98.09 %, screens 93.4 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-03T00:35:01.726Z`.
Reviews 1225–2284 (index; no row 1618): 929 ACCEPT, 45 WITH-DEBT, 85 QUALITY-RISK (2276–2284: 9 accept/0 debt/0Q; 2266 erinys family closed by D-3311, verified in 2269).
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
Ledger @08e30b12c: 5329 pinned-C functions — ported 1521 · partial 232 · split 119 · by-design 394 · open 3063 (841 declared by seed). Measured: ok 3747, partial 667, thin 236, missing 679. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3333 (index).**
<!-- recent:begin -->
**D-3333** - `Amonnam`: nethack-c/upstream/src/do_name.c:1159–1165 — extended the ALREADY static do_name edge (js/teleport.js:66; `imports.mjs --can` ALREADY) with `Amonnam`; deleted the clone; removed the now-unused `x_monnam` (do_name edge) and `ARTICLE_A` (const edge :31) imports (clon
**D-3332** - `money_cnt`: nethack-c/upstream/src/hack.c:4514–4522 — new static sit→shk edge (`import { money_cnt } from './shk.js'`, js/sit.js:137; `imports.mjs --can` SAFE — hoisted fn, in-SCC shape, verify judges TDZ); deleted the clone + its stale comment; one C-cite comment per site 
**D-3331** - `on_level`: nethack-c/upstream/src/dungeon.c:1439–1443 — extended the ALREADY static dungeon edges (js/teleport.js:62, js/shk.js:128, js/muse.js:95) with `on_level`; added new static edges (js/priest.js:39, js/getpos.js:64, js/vault.js:41 — `imports.mjs --can` SAFE all three, 
**D-3330** - `m_at`: nethack-c/upstream/include/rm.h:510–511 — m_at uhitm: extended the ALREADY static mon.js edge (js/uhitm.js:93) with `m_at`; deleted the clone; one C-cite comment per site (:3611 C :699 cleave sweep; :3687 C :799 second swing; :4212 C :5459 bhitpos range; :4259 C
**D-3329** - `Is_branchlev`: nethack-c/upstream/src/dungeon.c:1464–1473 — ported `Is_branchlev` to js/dungeon.js:2884 (C-order slot after Is_special; C `:1469` end1-before-end2 short-circuit; svb.branches = game.branches; null for C 0).
**D-3328** - `m_at`: nethack-c/upstream/include/rm.h:510–511 — m_at: extended the ALREADY static mon.js edge (js/shknam.js:50, `imports.mjs --can` ALREADY) with `m_at`; deleted the clone; one C-cite comment per site (:618 notes C shknam.c:470 `!MON_AT` + no-JS-MON_AT + null-iff-unoc
**D-3327** - `badspot`: nethack-c/upstream/src/do.c:1399–1406 — three by-design resolutions (no `js/`, D-3312/D-3314 precedent) + dist2 rewire: all 12 mon.js-edge importers moved to their existing hacklib.js edge, mon.js imports `dist2` from hacklib.js (:69), the duplicate export del
**D-3326** - `get_nhcolor_from_256_index`: nethack-c/upstream/src/coloratt.c:1024–1031 whole body: NO — `export function get_nhcolor_from_256_index(idx)` in js/options.js (:6152, C-order slot between closest_color and colortable_to_int32) with C-line cites; IndexOk as `0 <= i < color_256_definitions.length` (closest_color 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3333; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** `Amonnam` teleport.js clone removal alone — sole live site :1140 rewired to live js/do_name.js:1234, clone :101 + now-unused x_monnam/ARTICLE_A imports deleted. No same-C-file (do_name.c) Open rows; C callee a_monnam already live; density exception applies.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
