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

Score last measured: **2026-09-23** — full `sessions` on the working tree
(audit **1700–1708**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`69+0.43/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-23)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `69+0.43/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; judge stamp 2026-09-23T07:13Z):
no movement — the corpus still does not predict the judge.
**Corpus fortress** (audit 1700–1708, plus this session re-scored
2026-09-23): **501 / 540 PASS (92.8 %)** excl. 13 env-only; RNG 99.37 %,
screens 99.4 %. `scen-genesis-Archeologist-91135` restored (186/186 screens,
RNG 6017/6017) by D-2750 — the step-178 stale chickatrice glyph.
Reviews 1225–1708: 429 ACCEPT, 20 WITH-DEBT, 1 DEBT, 29 QUALITY-RISK (1688 useup addressed D-2741 `d44374fc8`; Must-fix 1701 monstone glyph + mdamagem head, 1706 attack_checks `u.uinwater`, 1707 steal `Blind`, 1708 knockback regression).
Live debts: 1241 SCR_MAIL, 1268 light carrier-mx, 1412 displaceu middle-skip, 1433 buzzer-field (all map-named); 1446 piletop-hole glyph, 1448 safe_typename guard, 1462 `m_useup` clone, 1510 parsesymbols G_/u+ bare arms (map-named customization subsystem), 1560 update_mon_extrinsics sync-float tail (extract_from_minvent inverts dismount→newsym), 1563 can_blnd cream/toss subset clones now replaceable, 1576 carry_count empty-invent zero-lift predicate (message-only, `(game.invent?.length \|\| umoney)`), 1682 dokick `!oldmem` restore-skip map line pending — review-debt, unqueued (detail in the review files).
Audit iters: `hidden-proxy.mjs score --jobs 8` (≈200 s) + `leaderboard.mjs`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage, seed0107-samurai-twoweapon-enhance.

**Notable non-PASS:** none — 44/44 (seed0107 restored to 98/98 by D-2610).

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

**Port the game as completely as possible, one whole C function per
iteration.** 2,345 of 4,868 pinned-C functions are MISSING or THIN in
`js/` (`node scripts/port-coverage.mjs`); every held-out session that
reaches one is a cliff. The work picker is **measured coverage**, not the
corpus: pop `LOOP-QUEUE.md` Must-fix, then the first **Open — coverage**
row (emitted by `port-coverage.mjs --rows`, gap measured on the JS tree at
enqueue; the pop-time `brief.mjs` re-check decides stale in ≤ 3 calls).
Deliverable = the **entire C body** in C order — every arm, every callee
live or named in the map, every C caller wired (brief callers table) —
**200–800 lines** of C-faithful JS (supervisor caps 1500 ins / 15 files).
Subsystem restart (delete the thin JS function, re-port from C) beats
patching arms. Also ship, in the same iteration, any Must-fix/Open row in
the **same C file**. Gates unchanged: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **REACH-OK** (corpus sessions that executed
the function still PASS — `verify.mjs --fn`). Phase 2 (corpus debugging:
`[measure]` rows, parks, writers, `hidden-proxy queue`) is closed until a
human reopens it here; the corpus is only re-scored on audits.
**Falsifier for the phase:** held-out on `leaderboard.mjs` after ~30
breadth iterations; if it does not move while coverage does, the human
revisits the picker.
**Next cluster:** `mon.c` monstone invisible-unmap — C `mon.c:3358` `glyph_is_invisible(levl[x][y].glyph)` (`display.h:773`) absent as that predicate from `js/mhitm.js` `monstone` (`glyph_is_invisible(loc)` also matches `disp_glyph` and `remembered_glyph.invisible`). Use `memory_glyph_is_invisible(loc)` or `glyph_is_invisible_id` on the memory glyph. Verify `node scripts/verify.mjs --fn monstone`. Source: reviews/loop-unattended/1701-09e6ef90d-monstone-whole-body.md. Then `mdamagem` touch-petrify head (same review).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2752 (index).**
<!-- recent:begin -->
**D-2752** `nethack-c/upstream/src/uhitm.c:289` `Blind || (is_pool(mtmp->mx, mtmp->my) && !Underwater — the arm tests `!(u.uinwater | 0)`.
**D-2751** `nethack-c/upstream/src/steal.c:384` `else if (Blind)` — the arm calls exported `Blind()` from `js/invent.js` (the macro, plus `uroleplay.blind`).
**D-2750** `nethack-c/upstream/src/dothrow.c:1004–1007` (`remove_monster` then `newsym` of the old ce — `mon_at_display` skips `MON_OFFMAP`, the same predicate `m_at` uses.
**D-2749** `nethack-c/upstream/src/dothrow.c:992–1068` (`:997–998` isok; `:1000` will_hurtle && m_in_ — restarted the body in C order with per-arm `:line` cites; same-file caller `mhurtle` doc updated (petrify/steed-vision omit retired, NODIAG/minliquid omits stand).
**D-2748** `nethack-c/upstream/src/steal.c:343–614` (`:348–355` entry snapshot + monnear gate; `:357– — restarted the body in C order with per-arm `:line` cites: nothing_to_steal closure (C goto re-entry from inv gate + empty pick); cant_take closure (how[] + ROLL_FROM + armor_simple_name/yname + `!rn2(inv_cnt/5+2)` stay-o
**D-2747** `nethack-c/upstream/src/uhitm.c:189–327` (`:194` STRAT_WAITMASK clear; `:196–197` engulfin — restarted the body in C order with per-arm `:line` cites: glyph from live `glyph_at(game.bhitpos)` (all 4 JS call paths set bhitpos: do_attack/polearm/whip/kick); Wait! via `%s` + live `something` const with the warning-
**D-2746** `nethack-c/upstream/src/do_wear.c:261–323` (`:265` oldprop; `:267` takeoff.mask clear; `:2 — restarted the body in C order with per-arm `:line` cites: SPEED `makeknown` + `You_feel slow down{ a bit}` on `Fast()` (attrib.js live, dragon-armor slow-down precedent); WATER_WALKING pool/lava via live hack.js imports 
**D-2745** `nethack-c/upstream/src/objnam.c:345–409` (`:360–378` r/neardist from xray_range; `:373–38 — added the wipe in C order — `save_oid` captured, `obj.o_id = 0` under `game.program_state?.gameover` (the live gameover flag, cf.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2752; wrap `wildmiss` /
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

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-TOP30.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`.

## Handoff rule

Update **this file** on score/gate/objective changes (audit cadence:
Public score cadence above). Journal; divergence + index; one C-JS-MAP
section. No completed D-lists.
