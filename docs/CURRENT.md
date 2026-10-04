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

Score last measured: **2026-10-04** — full `sessions` on `b3cc7b581`
(audit **2363–2366**, 2026-10-04T17:01:33.925Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`341+1.61/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-04 14:49Z; fetched 2026-10-04 17:09Z)** | **15 / 44**, 7,042 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `341+1.61/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo passes on pts with 17/44); best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit (judge scored 14:49Z, after D-3415 but before D-3416; count/pts unchanged).
**Corpus fortress (2026-10-04 17:07Z; scored 953/953 entries, 0 unrecorded):**
**733 / 953** PASS (76.9 %), RNG 98.39 %, screens 94.0 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-04T17:07:18.245Z`.
Reviews 1225–2366 (index; no row 1618): 991 ACCEPT, 52 WITH-DEBT, 98 QUALITY-RISK (2363–2366: 2A/0D/2Q, Must-fix shipped).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued); 2333 doapply omit paste-error + 2336 nhclose/nh_compress/nh_uncompress omit paste-errors + 2343.1 showdamage stale MISSING note + 2344.2 savebones stale compress clause + 2345.1 free_ebones stale MISSING note (finish-iteration recording bug — one `ledger.mjs set` iter fixes all seven; sweep candidates spot_checks/cinv_ansimpleoname notes + dump_weights omit); 2347.1 repopulate PERMINV reassign (inherited D-1559 split gap, latent, unqueued); 2350.1 redraw_cmd comment bind-history (docs-only, unqueued); 2366.1 use_camera s_suffix corner + 2366.2 Yname2_oil/shk_your_apply clones (message-only/pre-existing, unqueued).
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
Ledger @0d801c73f: 5329 pinned-C functions — ported 4442 · partial 190 · split 161 · by-design 403 · open 133 (657 declared by seed). Measured: ok 3889, partial 673, thin 236, missing 531. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3426 (index).**
<!-- recent:begin -->
**D-3426** - `find_misc`: muse.c:2095–2245 (nomore `:2151`) — C-exact `continue` nomores (first guarded arm wins; bag rn2(5) no longer burnt on skipped objs); canspotmon INVIS; urgent_pline wraps; surface() yank; body_part(HAND); dump_weights() call; helm alignment arm with uchange
**D-3425** - `mon_arrive`: dog.c:437 `mtmp->data == &mons[PM_LONG_WORM]` → get_wormno/initworm (:437– — one-line mndx flip per dead site — `(x?.mndx ?? -1) ===/!== PM_X` (house `?? -1` idiom, already pervasive in trap.js; null-safe: null data behaves exactly as the old null-vs-object compare) with a C-line cite; trimmed th
**D-3424** include/display.h:117–120 `_canseemon` = (wormno ? worm_known : (cansee || see_with_infrar — deleted all 6 locals (pointer comments left); dig/mthrowu/muse/trap added `canseemon` to the existing display.js import (no new module edge — all 5 files already import from display.js; exports are hoisted, calls are run
**D-3423** row homes only (no C re-read; bodies verified whole by review 2363): makemon.c `makemon` : — direct `ledger.mjs set` ×3 (NOT via finish-iteration), each sub-omit re-verified still unshipped first (m_dowear `m_dowear(mtmp, true)` un-awaited at js/makemon.js:3761 under the sync-gen comment; starting-pet — js/dog.j
**D-3422** - `mbhit`: muse.c:1734–1812 — - `mbhit`: shipped both arms (map_invisible + destroy_drawbridge).
**D-3421** row homes only (C re-read for arm-equivalence proofs only): apply.c `use_camera` :79–109 ≡ — direct `ledger.mjs set` ×11 (NOT via finish-iteration).
**D-3420** - `find_offensive`: muse.c:1431–1437 (sanctuary + AD_HEAL naked-hero early returns; rest o — ported every named arm in C order with live-export imports (no new generated tables): `in_your_sanctuary` (new priest.js edge — hoisted fn, IN-SCC cycle-safe per `imports.mjs --can`), `dmgtype` + local `AD_HEAL = 27` (mo
**D-3419** row homes only (no C re-read; bodies verified whole by review 2358): hack.c `domove_swap_w — `ledger.mjs set` ×2 to the D-3404 Named omissions text, each sub-omit re-verified still unshipped first (swap :2147 — mtrapped cleared js/hack.js:1401–1405, NULL-implication comment-only :1431–1432, zero `assert(` in js/
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3426; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** D-3426 shipped batch @0d801c73f (95 fns); picker refills from ledger.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
