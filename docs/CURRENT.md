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

Score last measured: **2026-10-06** — full `sessions` on `cfe322f35`
(audit **2430–2433**, 2026-10-06T07:11:26.088Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`333+1.65/turn` (R² 0.777).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-06 01:31Z)** | **16 / 44**, 7,224 / 11,265 pts, RNG **34.8 %**, rngSteps 87.7 %, screens **64.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `333+1.65/turn` (R² 0.777) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo passes on pts with 17/44); best fork 43/44 (NoahBPeterson, transpiled). Held-out 16/44, flat at judge 01:31Z across the int/bool/string-opt + game-mark campaigns D-3508–D-3542 (des-lua paths, held-out-unreached).
**Corpus fortress (2026-10-06 07:17Z; scored 953/953 entries, 0 unrecorded):**
**741 / 953** PASS (77.8 %), RNG 98.53 %, screens 94.2 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-06T07:17:07.707Z`.
Reviews 1225–2433 (index; no row 1618): 1046 ACCEPT, 56 WITH-DEBT, 106 QUALITY-RISK (2430–2433: 4A/0D/0Q, 0 Must-fix queued).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending, 1951 nhdupstr len+1 u32-wrap message (unreachable in JS), 1962 11-fn overage + sign micro-gap + 1963–1971 three debts — review-debt, unqueued (see reviews); 2166 SHOPTYPE="" corner (wizard+empty-env only; fix in review); 2040 complex_dump trailing-space (sink voided); 2088 ia→ium mixed-case (unobservable); 2106 msgtype ssep (unobservable, unqueued); 2155 no-of s' possessive (map debt, unqueued); 2181 FURNITURE scan 88/105 (latent, unqueued); 2222 m_in_air clones (trap.js complete; unqueued); 2235 teleport mon_aligntyp clone; 2242 mhis_leash hallu-rn2 (helper-doc-named, unqueued); 2333 doapply + 2336 nhclose/nh_compress/nh_uncompress omit paste-errors + stale MISSING notes (2343.1 showdamage + 2345.1 free_ebones) + 2344.2 savebones stale compress clause (finish recording bug — one `ledger.mjs set` iter fixes all seven; sweep spot_checks/cinv_ansimpleoname + dump_weights); 2347.1 repopulate PERMINV reassign (inherited D-1559 split gap, latent, unqueued); 2350.1 redraw_cmd comment bind-history (docs-only, unqueued); 2366.1 use_camera s_suffix corner + 2366.2 Yname2_oil/shk_your_apply clones (message-only/pre-existing, unqueued); 2372.1 thitu D-log inversion (docs-only) + 2372.2 whip pline_mon a11y (unobservable, unqueued); 2374 botlx/glyph/nodiag + 2375 oname-pline (unqueued); 2393.1 debugpline compiled-out slogan (wrong rationale, runtime-dead, unqueued) + 2393.2 doup at_ladder stway-or (consistent-model null, unqueued); 2417 region rtype cite :5606→:5604 + inverted swapped observation + 2420 door x/y cites stale-by-one (docs-only, unqueued); 2432 :19415 + 2433 :19421/:21706 cite drifts (docs-only, unqueued).
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
Ledger @4571738bb: 5329 pinned-C functions — ported 4516 · partial 115 · split 162 · by-design 403 · open 133 (635 declared by seed). Measured: ok 3887, partial 675, thin 236, missing 531. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3544 (index).**
<!-- recent:begin -->
**D-3544** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (minend-1.lua:43–49 = 7 des.door locked 07,16 + 22,08 + 26,08 + 40,14 + 50,03 + 51,16 + 66,02; minend-2.lua:39 = gated des.door locked 52,05 inside the percent(50) block :34–40 after the d
**D-3543** row home only (no C re-read; body brief-read this iter): read.c `seffect_destroy_armor` :1 — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
**D-3542** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (astral.lua:93–101 = 9 des.door closed 11,09 + closed 17,09 + locked 23,12 + locked 37,08 + closed 37,11 + closed 37,17 + locked 51,12 + locked 57,09 + closed 63,09; sanctum.lua:45–48 = 4 
**D-3541** row home only (no C re-read; body brief-read this iter): pickup.c `use_container` :2972–32 — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
**D-3540** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (Bar-strt.lua:63–70 = 8 des.door locked 12,05 + locked 12,09 + closed 21,07 + open 07,13 + open 18,13 + open 23,13 + open 25,10 + open 28,05; Wiz-strt.lua:55–62 = 8 des.door closed 31,09 +
**D-3539** row home only (no C re-read; body brief-read this iter): do.c `goto_level` :1479–1998 (:16 — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
**D-3538** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (medusa-1.lua:51–54 = 4 des.door closed 46,07 + locked 38,08 + locked 38,11 + closed 30,12; medusa-2.lua:48 = 1 des.door locked 71,07; medusa-3.lua:72–75 = 4 des.door locked 08,08 + locked
**D-3537** row home only (no C re-read; body brief-read this iter): files.c `make_converted_name` :20 — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3544; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** Open head impossible audit + minend-1/2/juiblex des.door :4661 game-mark step (D-3542 Next; Must-fix deferred per operator override).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
