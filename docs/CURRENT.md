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

Score last measured: **2026-10-12** — full `sessions` on `f7cc0401e`
(audit **2719–2726**, 2026-10-12T04:47:41Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`363+1.84/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-12 01:53Z)** | **22 / 44**, 9,012 / 11,265 pts, RNG **51.7 %**, rngSteps 93.6 %, screens **80.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `363+1.84/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,012 vs lockwo 8,549; their RNG 84.3 % vs our 51.7 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,012** (+12), RNG **51.7 %** (+0.1pp), rngSteps 93.6 %, screens **80.0 %** (+0.1pp) at judge 2026-10-12 01:53Z — fresh judge signal (was 2026-10-11 19:39Z); through D-3858..D-3866's window the corpus gained +9 net (1158→1167; marathons 219→228/244); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-12 ~05:00Z, `f7cc0401e`; 1197/1197 entries, 0 unrecorded):**
**1167 / 1197** PASS, RNG 24811794/24895890 (**99.66 %**), screens 422770/426873 (99.0 %); `full: true`. Marathons 228/244. Worst families: `scen-sweep` 73/81 (RNG 97.4 %), `scen-worldtour` 74/81 (100.0 %), `scen-chain` 50/51 (100.0 %), `scen-tour` 28/29, `scen-trek` 31/31; rest 100 % RNG. 1 PASS→FAIL (scen-chain-Archeologist-95418 → Must-fix). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2726 (index; no row 1618): 1330 ACCEPT, 61 WITH-DEBT, 110 QUALITY-RISK (2719–2726: 8A/0D/0Q, 1 Must-fix queued — rescore regression, not a review C-wrong).
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
Ledger @e0e05880b: 5329 pinned-C functions — ported 4538 · partial 115 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3866 (index).**
<!-- recent:begin -->
**D-3866** `polyself.c` newman `:414` (`u.uhunger = rn1(500, 500)`) + `:436` (`newuhs(FALSE)`) — js/polyself.js only — one `await newuhs(false)` at the C `:436` position (after the uhp<=0/dead-arm check, before newform), with C cite.
**D-3865** `getpos.c:1144–1148` (nxtc: every arm pass ends with curs(WIN_MAP,cx,cy)+flush) runs BEFOR — js/getpos.js only — one `curs_win_map(cx, cy)` before `await auto_describe(cx, cy)` in the loop-top autodescribe branch, with the C cite (`:1144–1148` precedes `:865–866`).
**D-3864** `restore.c` getlev `:1111` elapsed + `:1144` restore_timers(RANGE_LEVEL, elapsed) → `timeo — js/bones.js only (behavior): getlev_bones installs `restore_timers(info.timers, true, moves−omoves)` after rest_track (C `:1144` position in the JSON flow; ALREADY mkobj edge, no new module).
**D-3863** `mhitu.c` gulpmu `:1376` vision_recalc(2) → `vision.c` main update loop `:741–836` (not_in — js/mhitu.js only — Hallu gate removed at the engulf site (D-3807 departure precedent: C vision.c:820-836 has no Hallu gate); the extracted loop now runs unconditionally before vision_recalc(2).
**D-3862** `display.c` unmap_object `:409–437` — both arms now write `cmap_idx_to_glyph(S_stone)` (id GLYPH_CMAP_STONE_OFF, renders blank — reglyph write-shape precedent); the tweak detection is `memory_is_cmap(mem, S_room)` (C-exact; the old render check also over-fir
**D-3861** `display.c` newsym `:916–1099` (cansee `:1032` glyph_is_invisible→map_invisible; !cansee ` — no `js/` change.
**D-3860** `detect.c` dosearch0 `:2016–2093` (find arms `:2048` SDOOR, `:2058` SCORR, `:2080` trap →  — `js/detect.js` only — 3× `nomul_clear()` → `nomul(0)` with C-line cites; deleted the clone (its `_repeat_search=false` kept nothing: the flag has no `= true` in js/**, dead per allmain.js:1557).
**D-3859** `potion.c:2214–2227` dip_ok (`:2223–2224` inaccessible_equipment → GETOBJ_EXCLUDE_INACCESS — js/potion.js only — `dippable_lets_raw(inacc)`/`dippable_lets(inacc)` skip `inacc(o, false)` (C `:2223–2224`); `dip_hands_ok(obj, inacc)` threads it (C `:2236`); `getobj_dip` dynamic-imports the live `equipment_is_inacce
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3866; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** audit 2719–2726 (D-3858..D-3866 window): 8 ACCEPT, 0 review C-wrongs; full rescore 1167/1197 (+9 net: +10 moved, 1 PASS→FAIL regression → Must-fix); held-out 22/44 (fresh judge: +12 pts, RNG 51.7 %).
**Next:** Must-fix PASS→FAIL scen-chain-Archeologist-95418 (relink_timers: no object 13 @ step 650; prime suspect D-3864) — ships alone.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
