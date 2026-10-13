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

Score last measured: **2026-10-13** — full `sessions` on `51d3b17bc`
(audit **2773–2781**, 2026-10-13T12:52:30Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`352+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-13 07:43Z)** | **22 / 44**, 9,011 / 11,265 pts, RNG **51.7 %**, rngSteps 93.6 %, screens **80.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `352+1.57/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,011 vs lockwo 8,715; their RNG 88.2 % vs our 51.7 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,011** (±0), RNG **51.7 %** (±0), rngSteps 93.6 %, screens **80.0 %** (±0) at judge 2026-10-13 07:43Z — same judge timestamp as last audit, no fresh signal; through D-3920..D-3928's window the corpus went 1401/1449 → 1408/1449, RNG 99.16 % → 99.53 % (marathons 422/456 → 429/456); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-13 13:06Z, `51d3b17bc`; 1449/1449 entries, 0 unrecorded):**
**1408 / 1449** PASS, RNG 36245794/36417761 (**99.53 %**), screens 624017/630726 (98.9 %); `full: true`. Marathons 429/456. Worst families: `scen-sweep` 162/174 (RNG 98.3 %), `scen-worldtour` 121/134 (99.5 %), `scen-trek` 62/64 (99.5 %); rest 100 %. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2781 (index; no row 1618): 1384 ACCEPT, 61 WITH-DEBT, 111 QUALITY-RISK (2773–2781: 9A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows.
Full rescore (audit/grow): `hidden-proxy record` + unfiltered `score --jobs 8` (≈3 min), committed `full: true`; needs the C recorder (`bash nethack-c/build-recorder.sh`).

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
Ledger @4a24235a6: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (605 declared by seed). Measured: ok 3907, partial 681, thin 238, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3929 (index).**
<!-- recent:begin -->
**D-3929** load_special epilogue sp_lev.c:6464-6466 (link_doors_rooms→remove_boundary_syms(`:1016-103 — js/mklev.js only (+8: comment + `remove_boundary_syms()` call before wallification, C order). remove_boundary_syms itself unchanged (already faithful, just uncalled-for-strt).
**D-3928** `quest.c on_start` `:26–37` (first home visit `qt_pager("firsttime")` `:29`) ← `onquest` ` — js/questpgr.js only (data): Cav firsttime body verbatim from quest.lua (node byte-compare TEXT EQUAL true incl. blank line after «quest.» and double space after «seems…here.»; `%l`/`%H` conversions previously shipped) + 
**D-3927** `hack.c:4079–4101` crawl_destination + `teleport.c:86+` goodpos boulder arm (`sobj_at(BOUL — `js/hack.js` only — gate replaced with the C call `goodpos(x, y, game.youmonst, 0)` (no new import; hack↔teleport static pair is long-standing and runtime-only); orthogonal/NODIAG/Passes_walls/door-block/squeeze arms unc
**D-3926** `monmove.c` dochug Demonic Blackmail `:802–825` (mux-mismatch `:805–822` pre-existing; `}  — `js/monmove.js` only — else arm resolves the live `demon_talk` (dynamic `import('./minion.js')`, the sounds.js:1717 MS_BRIBE-site pattern; `imports.mjs --can monmove.js minion.js demon_talk`: SAFE, hoisted fn, same 101-m
**D-3925** `mhitu.c` passiveum AD_ACID `:2477–2480` (`if (!rn2(30)) erode_armor(mtmp, ERODE_CORRODE); — `js/mhitu.js` only — `acid_damage` added to the existing `./trap.js` import (line 111 edge, no new edge; mhitm edge ALREADY per `imports.mjs --can`); the AD_ACID arm now `await erode_armor(mtmp, ERODE_CORRODE)` / `await 
**D-3924** `uhitm.c` passive AD_MAGM `:5980–5991` (`if (Antimagic)` miss branch vs `mdamageu` hit bra — `js/uhitm.js` only — the passive `Antimagic` const now OR-reads `uprops[ANTIMAGIC]` intrinsic/extrinsic alongside the flats (Free_action `:3271` shape two lines above; mhitm.js:596 precedent; `ANTIMAGIC` added to the exi
**D-3923** `mhitu.c` getmattk lich arm (`:414–435`: `indx == 0 && AT_TUCH && AD_COLD && (udefend ? Co — `js/mhitm.js` only — `Cold_resistance()` now OR-reads `uprops[COLD_RES]` intrinsic/extrinsic alongside the flats (sit.js `:580` shape, precedented for this exact gap; `COLD_RES` already imported, no new edge; sole caller
**D-3922** quest gotit text: Bar + Pri bodies verbatim (byte-compare EQUAL ×6; %o/%d/%n/%H/%ca/%l live) + meta ×2 — 587116 s118→PASS, 587309 s807→PASS.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3929; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** pop the regen'd cliffs head.
**This iter:** row-2 m_move@775 Caveman-587113 SHIPPED (D-3929): load_cav_strt epilogue now calls remove_boundary_syms ('B'/CROSSWALL→ROOM); scen-sweep-Caveman-587113 s775→PASS.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
