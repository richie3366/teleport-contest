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

Score last measured: **2026-10-04** — full `sessions` on `54eac58c5`
(audit **2367–2372**, 2026-10-04T22:35:57.564Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`339+1.64/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-04 19:52Z; fetched 2026-10-04 22:46Z)** | **15 / 44**, 7,042 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `339+1.64/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo passes on pts with 17/44); best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 (judge 19:52Z post-D-3425; unchanged).
**Corpus fortress (2026-10-04 22:42Z; scored 953/953 entries, 0 unrecorded):**
**735 / 953** PASS (77.1 %), RNG 98.52 %, screens 94.0 %; 0 losses, 1 gain; `full: true`, `fullAt: 2026-10-04T22:42:16.843Z`.
Reviews 1225–2372 (index; no row 1618): 996 ACCEPT, 52 WITH-DEBT, 99 QUALITY-RISK (2367–2372: 5A/0D/1Q, 2 Must-fix queued).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued); 2333 doapply omit paste-error + 2336 nhclose/nh_compress/nh_uncompress omit paste-errors + 2343.1 showdamage stale MISSING note + 2344.2 savebones stale compress clause + 2345.1 free_ebones stale MISSING note (finish-iteration recording bug — one `ledger.mjs set` iter fixes all seven; sweep candidates spot_checks/cinv_ansimpleoname notes + dump_weights omit); 2347.1 repopulate PERMINV reassign (inherited D-1559 split gap, latent, unqueued); 2350.1 redraw_cmd comment bind-history (docs-only, unqueued); 2366.1 use_camera s_suffix corner + 2366.2 Yname2_oil/shk_your_apply clones (message-only/pre-existing, unqueued); 2372.1 thitu D-log inversion (docs-only, corrected in review) + 2372.2 whip pline_mon a11y (unobservable, unqueued).
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

**Port the game as completely as possible, one batch per iteration** —
the `node scripts/ledger.mjs batch --write` manifest: the whole remaining
gap of the top C file(s), 40–100 whole functions (2026-10-03, ten times
the 2026-09-28 cluster).
Every held-out session that reaches an unported function is
a cliff. Progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @5e7cd2e00: 5329 pinned-C functions — ported 4472 · partial 159 · split 162 · by-design 403 · open 133 (642 declared by seed). Measured: ok 3889, partial 673, thin 236, missing 531. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the batch manifest
(`docs/LEDGER.md`). Per manifest function the **entire C body** in C
order — every arm, callee live or named, C caller wired; already whole →
`audited`; unfinishable → `Left open:` + blocker (caps 15000 ins / 80
files, 4 h). `finish-iteration` fails closed unless `Ledger:` + `Left
open:` cover the manifest and every new JS body under a C name. Restart
beats patching arms. Gates: syntax · Rule #2 · green + strict · cohort ·
full 44 when shared · **REACH-OK** per function (`verify.mjs --fn a,b,…`;
over 10: one ~70 s corpus sweep). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier:** held-out (`leaderboard.mjs`) flat after ~30 breadth
iterations → human revisits the picker.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3434 (index).**
<!-- recent:begin -->
**D-3434** - `moveloop_core`: allmain.c:522–531 mv replay arm (`multi < COLNO && !--multi` → end_runn — mv=1 setter in both walk dispatch sites + mv replay path (COLNO-ride quirk exact; termination is bump-nomul at hack.c:2848 plus the finite map — no hang) + cmdq hoist (replay-only behavior change: rhack(key≠0) has one ca
**D-3433** - `moveloop_core`: allmain.c:514–531 multi>0 !mv arm (`--multi; rhack(cmd_key)`); removed  — moveloop dispatches multi>0 !run to lookaround + delay + clear-check + `--multi` + rhack(cmd_key) in C order (lookaround newly exported from cmd.js — imports.mjs ALREADY, hoisted async fn, no TDZ; run/occupation/ckmail a
**D-3432** - `moveloop_core`: allmain.c:543–547 post-rhack cliparound (CLIPPING compiled in, config.h — wired the live cliparound export at 3 sites (imports.mjs ALREADY ×2 — both files already import display.js, no new edge; hoisted async fn, no TDZ); display.js doc Wired/Named updated (muse.c:2637, restore.c:629 remain, n
**D-3431** - `test_move`: hack.c:991–1255; shipped the autoopen ECMD_OK + canned-kick fake (:1104–111 — per-function ports in C order (see C locus), all against live exports: cmdq_peek (newly exported from cmd.js) + ext_func_tab_from_func + dokick + CQ_CANNED/CMDQ_EXTCMD (test_move); middle re-indented into the !displaceu 
**D-3430** batch @adae017b4: 28 partials, 21 C files (8 ported/11 partial/9 audited) - see D-log.
**D-3429** - `dodrop`: do.c:29–43 (`if (result) reset_occupations()` `:39–40`; drop returns ECMD_TIME — wired the live exports at each site in C order (imports extended, no new module edges except hoisted cycle-safe fix_shop_damage/dokick/Punished/finish_meating×2 — imports.mjs SAFE/ALREADY each): dodrop reset_occupations 
**D-3428** - `launch_obj`: trap.c:3556 `} else if (IS_STWALL(typ) || IS_TREE(typ)) {` (wall-stop); tr — two deletions in js/trap.js `launch_obj`: dropped `|| IS_OBSTRUCTED(typ)` from the wall-stop (:2909) and the tail `stackobj(singleobj)` (:2927); doc envelope updated (`obstructed/tree/door` → STWALL/tree-only + never-sta
**D-3427** row homes only (no C re-read; bodies verified whole by review 2372): makemon.c `makemon` : — direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified still unshipped first (m_dowear `m_dowear(mtmp, true)` un-awaited at js/makemon.js:3761 under the sync-gen comment; starting-pet — js/dog.j
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3434; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** next batch (`ledger.mjs batch --write`).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
