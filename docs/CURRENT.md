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
**Corpus — picker and proxy (2026-10-12 20:12Z, `eebbf9bbf`; 1281/1281 entries, 0 unrecorded):**
**1251 / 1281** PASS, RNG 28102499/28221771 (**99.58 %**), screens 486677/491202 (99.1 %); `full: true`. Marathons 292/308. Worst families: `scen-sweep` 104/112 (RNG 97.7 %), `scen-trek` 41/42 (99.2 %), `scen-worldtour` 85/92 (100.0 % RNG); `scen-chain` 62/62, `scen-options` 21/21 now complete; rest 100 %. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
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
Ledger @2870ffe67: 5329 pinned-C functions — ported 4538 · partial 115 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3892 (index).**
<!-- recent:begin -->
**D-3892** `detect.c` reveal_terrain_getglyph `:2249` (`else if (lastseentyp == typ) back_to_glyph :  — `js/display.js` only — deleted `|| !last` with the `:2249` + no-lastset-in-premap cite.
**D-3891** `do_wear.c` Armor_on `:887–906` (known/update_inventory/dragon_armor_handling/arti_light — `js/do_wear.js` only — deleted the house `find_ac()` call; doc comment now cites `:887–906` + the D-0810 rule (uac refreshes at the allmain once-per-input find_ac; same stale-uac shape as the Cloak_on note at do_wear.js:
**D-3890** `mcastu.c` cursetxt `:63–85` (`:69–72`: `(Invis && !perceives && mux≠) ‖ mimic-STRANGE ‖ u — `js/mcastu.js` only — `:69` predicate now reads `hero_Invis()` (live `timeout.js` Invis, D-1999 reader, same one set_apparxy/m_move use; `imports.mjs --can`: ALREADY, name added to the existing static edge — no new edge,
**D-3889** `do_wear.c` disintegrate_arm suit arm `:3226–3229` (`urgent_pline("Your %s %s to dust and  — `js/do_wear.js` only — suit-arm message now interpolates `surface(u.ux, u.uy)` with the `:3226–3229` cite; `import { surface } from './sit.js'` (new edge; `imports.mjs --can`: IN-SCC, hoisted function — cycle-safe, runti
**D-3888** `options.c` doset `:8914–8959` — one `for (const it of selected)` loop in menu order (`select_menu_pick_any` returns `items.filter`, already menu order) dispatching per pick — help → bool → handler-comp → getlin-comp (with the C `:8947–8948` ESC gate on
**D-3887** `hack.c` test_move `:991–1255`, DO_MOVE call from domove_core `:2843`. Order: target obstr — `js/cmd.js` only — moved the `if (blocksMove(newx, newy))` bump block verbatim (incl. the D-1800/scen-ride-Knight-94415 nomul note) to directly after the autodig arm, before the testdiag block, with a `:1049–1072`-before
**D-3886** `muse.c` mquaffmsg `:293–302` (unseen arm `:298–301`: `else if (!Deaf)` → `Soundeffect(se_ — `js/muse.js` only — unseen arm now `else if (!hero_Deaf()) { Soundeffect(se_mon_chugging_potion, 25); await You_hear('a chugging sound.'); }` in C order with `:298/:299/:300` cites.
**D-3885** `potion.c` make_glib `:461–468` (`disp.botl |= (!Glib ^ !!xtime)` — `js/potion.js` only — `was !== now` → `was === now` with the `:464` cite.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3892; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** getpos row-2 (head UNPORTABLE): Samurai-582701 s1814.
**This iter:** getpos row-2 (head UNPORTABLE): Samurai-582701 s1814 terrain-reveal row-8 paint writer.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
