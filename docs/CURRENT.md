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

Score last measured: **2026-10-03** — full `sessions` on `647728e87`
(audit **2320–2328**, 2026-10-03T12:47:17.682Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`337+1.63/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, scored 2026-10-03 07:16Z; fetched 2026-10-03)** | **15 / 44**, 7,044 / 11,265 pts, RNG **33.9 %**, rngSteps 87.5 %, screens **62.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `337+1.63/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5, 3rd agentic; best fork 43/44 (NoahBPeterson, transpiled). Held-out 15/44, +0 since last audit.
**Corpus fortress (2026-10-03 12:53Z; scored 953/953 entries, 0 unrecorded):**
**707 / 953** PASS (74.2 %), RNG 98.11 %, screens 93.4 %; 0 losses, 0 gains; `full: true`, `fullAt: 2026-10-03T12:53:03.850Z`.
Reviews 1225–2328 (index; no row 1618): 970 ACCEPT, 45 WITH-DEBT, 88 QUALITY-RISK (2320–2328: 9 accept/0 debt/0Q → 0 Must-fix; 2317 C-wrongs closed by D-3367/D-3368, 2318 by D-3366, 2319 by D-3365).
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
Ledger @e27333c36: 5329 pinned-C functions — ported 4070 · partial 465 · split 153 · by-design 394 · open 247 (840 declared by seed). Measured: ok 3784, partial 673, thin 238, missing 634. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3379 (index).**
<!-- recent:begin -->
**D-3379** - `poison_strdmg`: nethack-c/upstream/src/attrib.c:274–278 (losestr + losehp with the shar — restart as 4-arg canonical `await losestr(strloss, knam, k_format)` then `losehp(dmg, knam, k_format)` in C order; the losehp call is skipped once gameover is set (C losestr's frailty damage done(DIED)s = noreturn, so C 
**D-3378** - `use_cream_pie`: nethack-c/upstream/src/apply.c:3568–3603, tail :3599–3602 (`costly_alte — tail now `await costly_alteration(pie, COST_SPLAT)` in C order after setnotworn (C :3598 comment cited verbatim; import pre-existing js/apply.js:102; COST_SPLAT=12 joins the const edge :34, ALTERATION_VERBS[12]='splatter
**D-3377** - `glow_color`: nethack-c/upstream/src/artifact.c:2427–2433 (artilist[arti].acolor → clr2c — `return hcolor(clr2colorname(colornum))` in glow_color (hcolor already imported js/artifact.js:119 — no import change); doname_glow_color wraps the same canonical import (name added to the existing do_name edge js/objnam
**D-3376** - `m_throw`: nethack-c/upstream/src/mthrowu.c:619–620 (`!canseemon(mon)` → clear_dknown(si — m_throw: `if (!canseemon(mon)) clear_dknown(singleobj)` after owornmask=0 (C `:619–620`; mkobj import extended, edge ALREADY); misfire block now renders the verbose canseemon pline before the re-roll (C `:622–631`; in-fi
**D-3375** - `tricked_fileremoved`: nethack-c/upstream/src/save.c:336–347 — whole C body in C order at C-home js/save.js:530 — `export async function tricked_fileremoved(nhfp, whynot)`: pline1 renders as pline (js/apply.js:3152 precedent), killer write onto `game.killer` (end.js shape; object en
**D-3374** - `rest_adjust_levelflags`: nethack-c/upstream/src/restore.c:1314–1318 — live same-name exports with whole C bodies in C order — `rest_adjust_levelflags` js/restore.js:153 (callee relative_time_to_moves on `game.level && game.level.flags`, C `:1317`), `save_adjust_levelflags` js/save.js:466 (
**D-3373** - `highc`: nethack-c/upstream/src/hacklib.c:75–79 — extended the two ALREADY static edges (`highc` → js/dokeylist.js:43 hacklib import; `s_suffix` → js/eat.js:127 do_name import — zap/mhitm already imported `s_suffix`, no import change; `imports.mjs --can` ALREADY ×4 this
**D-3372** nethack-c/upstream/src/windows.c:1644–1761 (`choose_classes_menu`; sole C caller options.c — restart as `export async function choose_classes_menu(prompt, category, way, classList, classSelect)` — whole C body in C order at js/options.js:5543 (sole caller's file; menuitem_invert_test windows.c precedent also liv
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3379; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** `attrib.c` poison_strdmg killer path (queue head; restart 2-arg inline as 4-arg losestr+losehp; wire 4 C call sites eat.c:1932/:2798 fountain.c:307 spell.c:164; losestr/losehp/KILLED_BY* live; coverage block 0 rows, attrib.c holds nothing more Open).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
