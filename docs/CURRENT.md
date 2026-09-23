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
(audit **1714–1722**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`69+0.42/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge, 2026-09-23)** | **12 / 44**, 5,976 / 11,265 pts, RNG **26.7 %**, rngSteps 81.8 %, screens **53.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `69+0.42/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 4/22, 2nd agentic; best agentic fork 35/44, RNG 98.5 %,
screens 93.2 %. Held-out 12/44, +0 vs last audit (5,976 / 11,265 pts, RNG
26.7 %, rngSteps 81.8 %, screens 53.0 %; judge stamp 2026-09-23T13:08Z):
no movement — the corpus still does not predict the judge.
**Corpus fortress** (audit 1714–1722 re-score 2026-09-23, 0 PASS→FAIL
vs HEAD): **501 / 540 PASS (92.8 %)** excl. 13 env-only; RNG 99.37 %,
screens 99.4 %. `scen-genesis-Archeologist-91135` still PASS after D-2750.
Reviews 1225–1722: 443 ACCEPT, 20 WITH-DEBT, 1 DEBT, 29 QUALITY-RISK (this audit 1714–1722 ACCEPT, 0 new Must-fix).
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
**Next cluster:** `insight.c` list_vanquished — coverage PARTIAL (C 165 L `insight.c:2784–2949` / JS 91 L in js/insight.js; hops 4, callers 4, RNG 0, msg 15). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn list_vanquished` (reach regression must be 0). Measured `port-coverage.mjs --name list_vanquished` 2026-09-23 @ 22b0e07c3.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2769 (index).**
<!-- recent:begin -->
**D-2769** `nethack-c/upstream/src/insight.c:2784–2949` (`list_vanquished`). Arms: `:2796–2811` force — restarted the whole body in C order with per-arm `:line` cites: `(void) await set_vanq_order(true)` at `:2805`, cancel-return `if ((await set_vanq_order(true)) < 0) return` at `:2854–2855`; live class_header (`VANQ_MCLS_
**D-2768** `nethack-c/upstream/src/pickup.c:2350–2426` (`reverse_loot`, staticfn); sole C caller `pic — ported the whole body in C order into `js/pickup.js` (1:1 C home, module-local like C staticfn and the `doloot_core` precedent): `!rn2(3)` + inv_cnt(true) walk of the invlet-sorted invent array (C nobj order — both sides
**D-2767** `nethack-c/upstream/src/uhitm.c:4425–4489` (`mhitm_ad_legs`); uhitm arm `:4432–4444` (dead — `js/uhitm.js` only for behavior — new `const AD_LEGS = 17` (monattk.h:59) + new `damageum_adtyping` AD_LEGS arm calling live same-file `damageum_ad_phys(mdef, mattk, mhm)` (the `:3988–4024` port; sync, no await, like the
**D-2766** `nethack-c/upstream/src/wizcmds.c:885–939` (`wiz_smell`); caller `cmd.c:1994–1995` extcmdl — ported the whole body in C order into `js/wizcmds.js` (1:1 C home): hero-start cursor (`:893–894`); olfaction gate with ECMD_OK (`:895–898`); once-only cursor message (`:900`); do/while pick loop (`:901–937`) as `for (;;
**D-2765** `nethack-c/upstream/src/options.c` — ported all bodies in C order into `js/options.js` (1:1 C home): `optfn_msg_window` empty-optstr negated→'s'/else-'f' (`:2477–2478`), negated-with-value bad_negation+err (`:2480–2482`), lowc-first-char s/c/f/r switch (`:2
**D-2764** `nethack-c/upstream/src/cfgfiles.c:551–582` (`handle_config_section`); callees `is_config_section :522–549`, `free_config_sections :506–517` — ported all three bodies in C order into `js/cfgfiles.js`: `!== null` pointer test (empty `"[]"` takes the section arm), current freed before the CHOOSE check, `Section "[%s]" without CHOOSE` sink, `*sect`-gated dupstr vs free, strcmp-`!==` filter; gameconfig fields on `game`
**D-2763** `nethack-c/upstream/src/coloratt.c:616–660` (`add_menu_coloring`). Every `:line` cite veri — ported the whole body in C order into `js/options.js` (home of the coloratt family): BUFSZ−1 copy (`:623-624`), first-'=' split with Malformed→FALSE (`:626-629`, sink named per file precedent), mungspace-then-first-'&' s
**D-2762** `nethack-c/upstream/src/cmd.c:2407–2446` (`handler_rebind_keys`) + `:2290–2405` (`handler_ — ported all six bodies in C order: `handler_rebind_keys` redo PICK_ONE menu via live `select_menu_pick_one` (auto-letters ≡ tty_end_menu; `end_menu` prompts as header rows per the `handle_add_list_remove` precedent); item
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2769; wrap `wildmiss` /
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
