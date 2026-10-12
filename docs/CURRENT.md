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

Score last measured: **2026-10-12** — full `sessions` on `eebbf9bbf`
(audit **2742–2749**, 2026-10-12T20:00:39Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`349+1.60/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-12 19:12Z)** | **22 / 44**, 9,011 / 11,265 pts, RNG **51.7 %**, rngSteps 93.6 %, screens **80.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `349+1.60/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,011 vs lockwo 8,549; their RNG 84.3 % vs our 51.7 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,011** (±0), RNG **51.7 %** (±0), rngSteps 93.6 %, screens **80.0 %** (±0) at judge 2026-10-12 19:12Z — fresh judge signal (was 2026-10-12 13:38Z), rates flat; through D-3885..D-3892's window the corpus went 1242/1281 → 1251/1281 (marathons 284/308 → 292/308); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-12 22:38Z, `2bb11f6b7`; 1365/1365 entries, 0 unrecorded):**
**1326 / 1365** PASS, RNG 31531614/31778520 (**99.22 %**), screens 548702/556749 (98.6 %); `full: true`. Marathons 348/372. Worst families: `scen-sweep` 127/143 (RNG 96.7 %), `scen-chain` 72/73 (99.3 %), `scen-trek` 52/53 (99.4 %), `scen-worldtour` 97/103 (100.0 % RNG); `scen-options` 21/22, `scen-tour` 28/29; rest 100 %. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2749 (index; no row 1618): 1352 ACCEPT, 61 WITH-DEBT, 111 QUALITY-RISK (2742–2749: 8A/0D/0Q, 0 Must-fix queued).
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
Ledger @85f437996: 5329 pinned-C functions — ported 4538 · partial 115 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3901 (index).**
<!-- recent:begin -->
**D-3901** `zap.c` zappable `:2514–2522` (`spe<0 ‖ (spe==0 && rn2(WAND_WREST_CHANCE))` → 0; spe==0 →  — `js/zap.js` only for the body — zappable is now async and awaits `You('wrest one last charge from the worn-out wand.')` in the spe==0 arm (C order: message before spe--); `You` already imported (no new edge).
**D-3900** `dig.c` zap_dig u.dz arm `:1583–1612` (ceiling rock: loosen `:1592`, falls `:1594`, losehp — `js/dig.js` only — `await finish_maybe_wail()` after the fatal-drain block, before mksobj_at (C order: the wail prints inside losehp, before the rock lands), with the `:4289–4291` cite; `finish_maybe_wail` joins the exis
**D-3899** `hmon_hitmon_misc_obj` CREAM_PIE/BLINDING_VENOM arm `uhitm.c:1265–1317`, `:1273 if (Blind) — both sites: deleted the shadowing const, `if (Blind())` with C-cite comments (uhitm.c:1273 + youprop.h:103 + do.js:3797 snapshot note).
**D-3898** `nethack-c/upstream/include/monst.h:273` resists_cold = Resists_Elem(mon, COLD_RES). `mond — zap.js export now `return Resists_Elem(mon, COLD_RES)` (COLD_RES import + doc; D-2802 poison pattern). mhitm/explode locals deleted, both now import the export (same-edge name adds — mhitm.js:144, explode.js:51 — no new 
**D-3897** `eat.c` eat_brains hero-defender arm `:688–723`: the Lifesaved `:704` and unconditional `: — js/eat.js only — `if (game.program_state?.gameover) return M_ATTK_MISS;` immediately after each of the three done(DIED) calls (C-cited comments; lifesave/wizard-safe: survive returns with gameover false — js/end.js:2321–
**D-3896** `dat/symbols` graphical symsets `G_vwall_knox..G_trwall_knox: /yellow` ×11 (DECgraphics :7 — Knox arm `else if (Is_knox(uz) && use_decgraphics()) color = CLR_YELLOW;` in C bank order (mines → hell → knox → soko → main); DEC gate mirrors C (ASCII carries no G_ entries → gray, D-0729).
**D-3895** `steed.c` place_monster `:911–920` (steed arm: `mon == u.usteed && !in_steed_dismounting`  — none (no `js/` — park; the trigger needs C-heap address reuse — see Measure).
**D-3894** `do.c` save_currentstate `:1375–1395` (`#ifdef INSURANCE`, config.h:435; checkpoint option — `js/do.js` only — the checkpoint arm now applies the save.c:493–494 mark (same `0 <= lev <= maxledgerno()` guard; creates the slot when absent) after unskip_engravings_for_save().
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3901; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** regen cliffs (zappable row leaves via D-3901; 585441 now distfleeck@566; head UNPORTABLE).
**This iter:** row-2 `zap.c` zappable (head nhl_gamestate UNPORTABLE-terminal D-3895, override precedent continues; Barb-585441 s352: C «wrest one last charge»+More vs JS «In what direction?» — JS dropped the spe==0 You() arm).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
