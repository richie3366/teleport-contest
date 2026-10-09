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

Score last measured: **2026-10-09** — full `sessions` on `98020c173`
(audit **2600–2605**, 2026-10-09T13:03:01.360Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`352+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-09 07:49Z, ours 07:22Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `352+1.57/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,866; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-09 07:49Z (ours scored 07:22Z: predates the D-3731+ ships — their held-out effect is unscored).
**Corpus — picker and proxy (2026-10-09 ~13:11Z, `98020c173`; 1113/1113 entries, 0 unrecorded):**
**999 / 1113** PASS, RNG 18963843/20441637 (**92.77 %**), screens 316717/347076 (91.3 %); `full: true`. Marathons (§10.19): 60/160 PASS. Worst families (`hidden-proxy families`): `scen-worldtour` 7/50 (RNG 72.1 %), `scen-sweep` 13/50 (73.0 %), `scen-chain` 24/40 (95.7 %), `scen-trek` 16/20 (93.9 %); every older family 100 % RNG. 0 PASS→FAIL on this rescore. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2605 (index; no row 1618): 1213 ACCEPT, 58 WITH-DEBT, 109 QUALITY-RISK (2600–2605: 5A/1D/0Q, 0 Must-fix queued).
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
Ledger @ed16286e1: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (612 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3739 (index).**
<!-- recent:begin -->
**D-3739** `sp_lev.c` create_object `:2422–2423` (`if (!(o->containment & SP_OBJ_CONTENT)) stackobj(o — js/mklev.js only — capture `mkobj_at`'s return and `stackobj(otmp)` it (C-cited; containment is always 0 on this path so the gate passes; `stackobj` already imported at mklev.js:114).
**D-3738** `quest.c on_goal` first-visit arm `:66–68` (`qt_pager("goal_first")` + `made_goal=1`; call — `js/questpgr.js` only — three goal_first bodies verbatim from quest.lua (`cat -A`-verified: blank lines truly empty, double-space after periods in both synopses; conversions %nC/%nh/%o all previously shipped) + two QUEST
**D-3737** `wintty.c` process_menu_window `:1407–1413` and `:1622–1648` (page keys clear the menu tex — page, stay and unknown keys re-prompt without dismissing; the migrant is `MON_OFFMAP` only for its leaving `newsym`, then the flag is restored (a lasting flag strands it on arrival, D-3279); `wiz_map` saves and clears th
**D-3736** `wintty.c` process_menu_window nav `(>):1622–1635` — none — parked.
**D-3735** `wizard.c:761–779` (resurrect tail prints only voice+verbalize — `js/wizard.js` only — deleted the inline block, kept the gated call; cite comment + doc envelope updated (envelope now names both paths).
**D-3734** `nethack-c/upstream/src/artifact.c:953` (`dmg = d((Antimagic ? 2 : 4), ...)`); `include/yo — `js/artifact.js` only — deleted the drifted local clone, added `import { Antimagic as Antimagic_hero } from './mcastu.js'` with the youprop.h cite (`imports.mjs --can artifact.js mcastu.js Antimagic`: SAFE — hoisted func
**D-3733** `trap.c:498` maketrap `dst={-1,-1}` default ("force error if used before set"); `mklev.c:2 — none — no js/ in this commit (docs-only entry).
**D-3732** `allmain.c:273–274` (`nh_timeout(); run_regions();` before the regen_hp/dosounds/gethungry — js/allmain.js: `if (g.program_state?.gameover) return;` after `nh_timeout()` and after `run_regions()` (C-cited comments; lifesave-safe: gameover stays false so C's fall-through still runs; gas-cloud losehp is run_region
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3739; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs head `monmove.c` m_move (SYMPTOM-parked; 3 woodland-elf multi-move divergence @95224 s144: C warn 2 vs JS 0) → temp-C + JS-hook measurement at :1963 names the writer (appr/goal/cnt/mtrack/mfp per call), or the owner's [measure] row.
**This iter:** level_tele writer = quest `goal_first` texts (Cav/Ran output=text + Wiz pline) behind the arrival More — 95234/95231/95228 measured; 95238/95214/95218 identical-topline map writers stay out.
**This iter:** audit 2600–2605 @98020c173 — reviewed D-3730/D-3731/D-3732/D-3734/D-3735/D-3737 (5A/1D/0Q, 0 Must-fix) + full rescore 999/1113, 0 PASS→FAIL.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
