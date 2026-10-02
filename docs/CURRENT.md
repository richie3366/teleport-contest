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

Score last measured: **2026-10-02** — full `sessions` on `571bbecf7`
(audit **2212–2220**, 2026-10-02T04:17:33.055Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`336+1.75/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-02 01:40Z; fetched 2026-10-02)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `336+1.75/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 (+0.1 RNG) since last audit.
**Corpus fortress (2026-10-02 04:39Z; scored 953/953 entries, 0 unrecorded):**
**702 / 953** PASS (73.7 %), RNG 97.92 %, screens 93.3 %; 0 losses, +11 rescore; `full: true`, `fullAt: 2026-10-02T04:39:36.432Z`.
Reviews 1225–2220 (index; no row 1618): 867 ACCEPT, 44 WITH-DEBT, 84 QUALITY-RISK (2212–2220: 9 accept/0 debt/0Q; 0 Must-fix families).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued).
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
Ledger @4fbb3512e: 5329 pinned-C functions — ported 1363 · partial 229 · split 112 · by-design 362 · open 3263 (847 declared by seed). Measured: ok 3706, partial 652, thin 235, missing 736. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3260 (index).**
<!-- recent:begin -->
**D-3260** - `savelife`: end.c:704–755 whole body — js/end.js — savelife restart in C order on live imports (minuhpmax, setuhpmax, make_sick, endmultishot; TIMEOUT/SICK_ALL consts; 3 new edges, all imports.mjs --can SAFE, call-time use); container_contents +update_invento
**D-3259** - `zap_over_floor`: nethack-c/upstream/src/zap.c:5192 dead `t = 0`, :5246 + :5278–5280 `So — js/zap.js only, all six imports extend pre-existing module edges (display/hack/trap/dungeon/seffects_data/const — no `imports.mjs --can` needed).
**D-3258** - `seffect_magic_mapping`: nethack-c/upstream/src/read.c:2102–2153 — C-exact `if (Is_rogue_level(u.uz)) unblock_point(x, y);` via live js/vision.js:482 on the pre-existing vision.js edge (extended import, no new module edge, no `imports.mjs --can` needed); per-door newsym dropped; fn doc 
**D-3257** - `show_map_spot`: nethack-c/upstream/src/detect.c:1371–1419 — `show_map_spot` restart in C order: live `unblock_point` in the SCORR arm; `glyph_at` id + disp-render snapshot before the background repaint (C's `show_glyph(x,y,oldglyph)` repaints glyphmap[oldglyph], exactly the cell'
**D-3256** - `passive_obj`: nethack-c/upstream/src/uhitm.c:6127–6195 — `passive_obj`: AD_RUST `erode_obj(weapon,null,ERODE_RUST,EF_GREASE)`; AD_ENCH `drain_item(weapon,TRUE) && carried && (known||ARMOR)` → `Yobjnam2 "seem less effective"` (C's in-arm break + FALLTHROUGH flattens — default o
**D-3255** - `reset_utrap`: nethack-c/upstream/src/trap.c:1044–1057 — restart the thin body as `export async function reset_utrap(msg)` in C order (was_Lev/was_Fly snapshot via same-file `hero_Levitation`/`hero_Flying` youprop.h-macro helpers per D-1070 → `set_utrap(0,0)` → `if (msg)` arms
**D-3254** - `seffect_magic_mapping`: `read.c:2102–2153` whole body — `js/display.js` only, no new module edge (same-file `glyph_is_unexplored` :885 + `glyph_is_cmap` :891; no `imports.mjs --can` needed): gate the `remember_shown_glyph` write on `memId === NO_GLYPH || glyph_is_unexplored(m
**D-3253** - `abuse_dog`: `dog.c:1362–1393` whole body — `js/uhitm.js` only, no new module edge (in-scope `get_dmg_bonus` local + `PM_SHADE`; no `imports.mjs --can` needed): floor → `dmg = (get_dmg_bonus && !mon_is_shade) ? 1 : 0` with C's :1815–1816 comment; doc :1703 → live.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3260; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** D-3260 `end.c` savelife + container_contents + endmultishot + unsortloot (4 fns).

## Parked (diagnose only — do not implement)

Full index: `LOOP-QUEUE.md` **Parked**. Never re-pop without C state: **D-0006** (seed1800 pets) and **dog_invent** (`mpickstuff`; needs C `movement[]`).

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence
above). One D-entry with its `- **Ledger:**` bullet; `finish-iteration.mjs`
writes the ledger, index, journal and generated blocks. No D-lists.
