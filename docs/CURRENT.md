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

Score last measured: **2026-10-03** — full `sessions` on `09c225bf5`
(audit **2338–2345**, 2026-10-03T17:11:31.069Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`336+1.66/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-03 14:34Z; fetched 2026-10-03 17:12Z)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `336+1.66/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo passes on pts with 13/44); best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit (judge scored 14:34Z, before the 8 audited SHAs).
**Corpus fortress (2026-10-03 17:17Z; scored 953/953 entries, 0 unrecorded):**
**707 / 953** PASS (74.2 %), RNG 98.11 %, screens 93.4 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-03T17:17:15.219Z`.
Reviews 1225–2345 (index; no row 1618): 980 ACCEPT, 49 WITH-DEBT, 91 QUALITY-RISK (2338–2345: 4 accept/2 debt/2Q → 2 Must-fix: 2344.1 recover by-design + 2339.1 postmov guard; 2337.1 closed by D-3383).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued); 2333 doapply omit paste-error + 2336 nhclose/nh_compress/nh_uncompress omit paste-errors + 2343.1 showdamage stale MISSING note + 2344.2 savebones stale compress clause + 2345.1 free_ebones stale MISSING note (finish-iteration recording bug — one `ledger.mjs set` iter fixes all seven; sweep candidates spot_checks/cinv_ansimpleoname notes + dump_weights omit).
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
Ledger @4ea047f25: 5329 pinned-C functions — ported 4102 · partial 457 · split 153 · by-design 395 · open 222 (840 declared by seed). Measured: ok 3799, partial 679, thin 240, missing 611. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3393 (index).**
<!-- recent:begin -->
**D-3393** - `fn_cmap_to_glyph`: `display.c:3796–3800` — (a) new `export function fn_cmap_to_glyph` beside `cmap_to_glyph`, whole C body; (b) `newsym` gains `if (suppress_map_output()) return;` first (in-file :5101, same as `feel_location`), then after the uswallow block the U
**D-3392** - `after_shk_move` call site: nethack-c/upstream/src/monmove.c:1700–1702 inside `:1660 if  — (a) none — falsified with git evidence (a redundant call-site guard drafted mid-iteration was reverted; it would be constant-true). (b) `repopulate_perminvent` export with the `:3094` dispatch against live splits (cached
**D-3391** - `recover_savefile`: nethack-c/upstream/src/files.c:2864–3082 under `#ifdef SELF_RECOVER` — deleted the dead JS — `recover_savefile` doc+body, `sfo_int` doc+body, `sfvalue_int` doc+body (git retains the text); ledger → by-design.
**D-3390** - `free_ebones`: nethack-c/upstream/src/bones.c:832–839 (`if (mtmp->mextra && EBONES(mtmp) — whole C body in C order at C-home js/bones.js:553 — `if (mtmp.mextra && EBONES(mtmp)) mtmp.mextra.ebones = 0`.
**D-3389** - `compress_bonesfile`: nethack-c/upstream/src/files.c:1005–1010 (`nh_sfconvert` + `nh_com — whole C bodies in C order at C-home js/files.js.
**D-3388** - `losehp`: nethack-c/upstream/src/hack.c:4269 (`showdamage(n)` Upolyd) + :4275–4276 (`reh — `losehp` stays sync (async would cascade to 124 sites): both C sites capture `{dmg, post-decrement hp}` into `_losehp_showdamage` (option-gated like the C guard); the Upolyd `mh<1` arm sets `_losehp_needs_rehumanize` wit
**D-3387** - `rewind_nhfile`: nethack-c/upstream/src/files.c:533–545 (structlevel lseek vs fieldlevel — whole C bodies in C order at C-home js/files.js, mirroring the live levelfile/savefile VFS-analogue pairs: `{ s }` holders for `char **`/`char errbuf[]`, `game.lock` store-back, fqname kept (buffnums 0/1) for the prefix/
**D-3386** - `getobj` (cmdq): nethack-c/upstream/src/invent.c:1790–1794 (CMDQ_KEY HANDS_SYM → obj_ok( — both arms ported into getobj_dip as mirrors of the live sibling.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3393; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** `display.c` fn_cmap_to_glyph (head) + newsym flux/Underwater guards (same-file missing-arm row; `verify --fn fn_cmap_to_glyph,newsym`).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
