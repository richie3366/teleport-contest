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

Score last measured: **2026-10-09** — full `sessions` on `e33e69ca6`
(audit **2606–2614**, 2026-10-09T18:25:50.776Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`352+1.58/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-09 13:44Z, ours 13:17Z)** | **19 / 44**, 8,579 / 11,265 pts, RNG **42.1 %**, rngSteps 92.6 %, screens **76.2 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `352+1.58/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,579 vs lockwo 7,866; their RNG 61.7 % vs our 42.1 %: our loss is early cliffs in long sessions). 19/44 held, pts **8,579** (+81), RNG **42.1 %**, rngSteps 92.6 %, screens **76.2 %** at judge 2026-10-09 13:44Z (ours scored 13:17Z: predates the D-3738+ ships — their held-out effect is unscored).
**Corpus — picker and proxy (2026-10-09 ~18:35Z, `e33e69ca6`; 1113/1113 entries, 0 unrecorded):**
**1004 / 1113** PASS, RNG 19396327/20441637 (**94.89 %**), screens 322015/347076 (92.8 %); `full: true`. Marathons (§10.19): 65/160 PASS. Worst families (`hidden-proxy families`): `scen-worldtour` 10/50 (RNG 83.5 %), `scen-sweep` 14/50 (76.0 %), `scen-chain` 25/40 (97.4 %), `scen-trek` 16/20 (95.4 %); every older family 100 % RNG. 0 PASS→FAIL on this rescore; 3 cascade FAIL→PASS (95318, 95232, 95239). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2614 (index; no row 1618): 1222 ACCEPT, 58 WITH-DEBT, 109 QUALITY-RISK (2606–2614: 9A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows.
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈140 s for 1113), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

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

## Primary objective — CLIFF PHASE WITH MARATHONS (architect, 2026-10-09, Constitution §10.18 + §10.19)

**Why:** board 899 → 939/953 at 100 % RNG while held-out sat at 18/44,
RNG 41.7 % (rngSteps 92.4 %) ~80 iterations: held-out loses RNG to early
cliffs in long sessions; no `scen-*` session ran past 344 steps (§10.19).

**Move the corpus cliffs, one per iteration, ranked by RNG lost** — the
generated **Open — cliffs** block (committed board → `hidden-proxy.mjs
queue --write`), now led by marathons. Per cliff: `hidden-proxy show
<probe>` → owner vs **writer** → `brief.mjs` → the C function whole, every
caller wired → `verify.mjs --fn` with **movement** **and** REACH-OK. NO
MOVEMENT twice → measure C at the divergent step (`geom-probe <id> --step
N`, temp C dump). Must-fix is strict; ledger text is never a row.
**Growth:** no Must-fix and < 6 cliff rows → the slot runs as a supervisor
**grow** iteration (≥ 80 sessions, half marathon). Both blocks empty in a
port slot → journal and stop. Audits: review + full rescore +
`leaderboard.mjs` + `hidden-proxy families`.
**Falsifier:** ~20 cliff iterations with the long families' RNG % rising
and held-out RNG % flat → revisit the generator, not the port.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @7b87dee07: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (611 declared by seed). Measured: ok 3909, partial 681, thin 235, missing 504. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head; a coverage row rides along only as a same-C-file companion, and a
short cliffs block means growth (§10.19), never a ledger batch or a
self-filed row. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3755 (index).**
<!-- recent:begin -->
**D-3755** `monmove.c:2197–2266` set_apparxy (gotu `:2240`) + `:533–567` distfleeck; `youprop.h:202–2 — none (no `js/`).
**D-3754** `bones.c:259–303` drop_upon_death (floor arm `:296–299` place_object only) + give_to_nearb — `js/end.js` only — removed both extra `stackobj(otmp)` calls (C-cited comments); `drop_upon_death` gains `export` (C linkage is extern: the shk.c caller).
**D-3753** `invent.c` menu_identify `:2660–2695` (query_objlist call `:2670–2672` with SIGNAL_NOMENU| — invent.js — restarted menu_identify (`:3580`) onto the live `query_objlist` (already imported, :354): buf first/next, qflags exactly C's, `n>id_limit` clamp, identify each pick, `await tty_wait_synch()` (already imported
**D-3752** `allmain.c:210–216` (mon_moving TRUE around the movemon loop — `js/mthrowu.js` only — the wrapper saves and restores mon_moving (C's nested pattern); inside movemon it is now transparent (exactly C: TRUE throughout).
**D-3751** `makemon.c:1193–1199` — `js/makemon.js` only — the gate now calls the live `m_at()` export (already imported from mon.js; `mon.js:1725`: grid incl. worm segs via place_worm_seg, then fmon scan skipping steed/dead/offmap; same precedent as `clon
**D-3750** pline.c vpline `:277–278` (`if (u.ux) flush_screen(...)`); topl.c tty_yn_function `:420,42 — js/getline.js only (+1 export line): new `prompt_paint_flush()` helper (`if (game.u?.ux) flush_screen(1) else paint_topline_only()`); all four prompt paints call it. js/display.js: `export { _paintToplineOnly as paint_to
**D-3749** `monmove.c` m_move covetous block `:1778–1800` (goal read `:1781–1783`; intruder gate `:17 — inserted the block in C order after mtame, before shk/gd/priest: `is_covetous(ptr)` → tx,ty from `mtmp.mgoal` (unset defaults (0,0) — C's zeroed struct; isok rejects it, matching C's measured goal=(0,0) gate negatives) →
**D-3748** `monmove.c` m_move covetous block `:1778–1800` (`tx,ty = mgoal; intruder = m_at(tx,ty); if — none — measurement only.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3755; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** next_ident still heads (3 blocks, first @864).
**This iter:** cliffs-head next_ident writer — 95420@864 bones-remap 42-vs-41 (C draws one more ghostly next_ident than JS).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
