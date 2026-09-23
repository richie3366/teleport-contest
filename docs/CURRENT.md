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
**Next cluster:** `coloratt.c` add_menu_coloring — coverage MISSING (C 43 L `coloratt.c:617–660` / JS no symbol; hops —, callers 2, RNG 0, msg 0). Port the whole C body in C order — every arm, every callee live or named in the map, every C caller wired. Verify `node scripts/verify.mjs --fn add_menu_coloring` (reach regression must be 0). Measured `port-coverage.mjs --name add_menu_coloring` 2026-09-23 @ ed9d7b7ad.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2763 (index).**
<!-- recent:begin -->
**D-2763** `nethack-c/upstream/src/coloratt.c:616–660` (`add_menu_coloring`). Every `:line` cite veri — ported the whole body in C order into `js/options.js` (home of the coloratt family): BUFSZ−1 copy (`:623-624`), first-'=' split with Malformed→FALSE (`:626-629`, sink named per file precedent), mungspace-then-first-'&' s
**D-2762** `nethack-c/upstream/src/cmd.c:2407–2446` (`handler_rebind_keys`) + `:2290–2405` (`handler_ — ported all six bodies in C order: `handler_rebind_keys` redo PICK_ONE menu via live `select_menu_pick_one` (auto-letters ≡ tty_end_menu; `end_menu` prompts as header rows per the `handle_add_list_remove` precedent); item
**D-2761** `nethack-c/upstream/src/pager.c:561–611` (`waterbody_name`); 14 code call sites: `do.c:59` — restarted the body in C order with per-arm `:line` cites: `:565` hallucinate before the `:567-568` drink guard; `:569` `ltyp` via SURFACE_AT (D-1103); `:571-574` molten lava; `:574-579` ice/frozen; `:579-582` pool of; `:
**D-2760** `nethack-c/upstream/src/dog.c:995–1133` (`dogfood`); callers `dog.c:1197,1247` (tamedog),  — restarted the body in C order with per-arm `:line` cites: opoisoned + `resists_poison` head; quest-arti/obj_resists short-circuit; fx/fptr via LOW_PM/NUMMONS bounds (null = the NUMMONS entry, all predicates null-safe); r
**D-2759** `nethack-c/upstream/src/hack.c:3898–4058` (`lookaround`); sole caller `allmain.c:516` (mov — restarted the body in C order with per-arm `:line` cites: NODIAG head (`You("cannot move diagonally.")` + nomul, grid-bug `umonnum==PM_GRID_BUG` idiom); `Blind() || run==0` gate (live invent.js macro); per-cell NODIAG sk
**D-2758** `nethack-c/upstream/src/spell.c:714–783` (`getspell`); callee `spell_let_to_idx :114–126`; — restarted the body in C order with per-arm `:line` cites: no-spells `You("don't know any spells right now.")` guard; rejectcasting guard — C prints inside `rejectcasting`, the JS clone is a sync predicate so the same thr
**D-2757** `nethack-c/upstream/src/botl.c:3811–3887` (`status_hilite_menu_choose_updownboth`), `:4305 — the menus are the C bodies in that order.
**D-2756** `nethack-c/upstream/src/dungeon.c:1568–1601`. `!isok` (`cmd.c:4326`: `x>=1`) panics when ` — the function is the C body in that order.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2763; wrap `wildmiss` /
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
