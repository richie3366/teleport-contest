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

Score last measured: **2026-10-06** — full `sessions` on `2cf0411c1`
(audit **2434–2438**, 2026-10-06T08:52:33.213Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`330+1.65/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-06 07:20Z)** | **16 / 44**, 7,224 / 11,265 pts, RNG **34.8 %**, rngSteps 87.7 %, screens **64.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `333+1.65/turn` (R² 0.777) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo 17/44, RNG 61.0 % vs our 34.8 % at equal rngSteps 87.7 %: our loss is a few early cliffs in long sessions). Flat at 16/44 from judge 2026-10-05 07:36Z through 2026-10-06 07:20Z (D-3508–D-3556) — §10.17 falsifier fired; cliff phase opened (§10.18).
**Corpus — picker and proxy (2026-10-06 08:58Z; 953/953 entries, 0 unrecorded):**
**741 / 953** PASS (77.8 %), RNG 98.53 %, screens 94.2 %; `full: true`. Worst families: `scen-options` 1/20, `scen-town` 2/20, `scen-quest` 3/20, `scen-tutorial` 4/20, `scen-impaired` 7/20. Audits record this line next to held-out: the board must rise **with** it.
Reviews 1225–2438 (index; no row 1618): 1051 ACCEPT, 56 WITH-DEBT, 106 QUALITY-RISK (2434–2438: 5A/0D/0Q, 0 Must-fix queued).
Live debts: unqueued review debt only (none a C-wrong) — `reviews/loop-unattended/00-INDEX.md` WITH-DEBT rows; the 2026-10-06 list is archived in `docs/archive/PROGRESS-HISTORY.md`.
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

## Primary objective — CLIFF PHASE (human, 2026-10-06, Constitution §10.18; supersedes the §10.17 picker)

**Why:** `ledger.mjs batch` → 1 function, ledger counts frozen since
2026-10-04, held-out flat ~50 iterations spent on ledger-text "repairs",
re-audits and unreached campaign steps — while the corpus failed 212/953
in the held-out genre, every top owner tagged "do not re-enqueue"
(§10.18 has the numbers).

**Move the corpus cliffs, one per iteration, ranked by RNG lost** — the
generated **Open — cliffs** block in `LOOP-QUEUE.md` (committed board →
`hidden-proxy.mjs queue --write`). Per cliff: `hidden-proxy show <probe>`
→ owner vs **writer** → `brief.mjs` → the C function whole, every caller
wired → `verify.mjs --fn` with **movement** on the probe sessions (PASS or
strictly later step) **and** REACH-OK. NO MOVEMENT twice → measure C
(`geom-probe`, temp C dump) this iteration; it names the writer or parks
the owner (`[measure]` rows are live). Must-fix is strict (throw / hang /
PASS→FAIL / review C-wrong); ledger text is never a row. Audits: full
rescore, `leaderboard.mjs`, **corpus growth** (`scenario-gen.mjs`) when
the worst family is ≥ 85 % or the block holds < 6 owners.
**Falsifier (human):** ~20 cliff iterations with the board rising and
held-out flat → the corpus stopped predicting the judge again.
Ledger progress (generated by `finish-iteration.mjs`):
<!-- ledger:begin -->
Ledger @b39cb750e: 5329 pinned-C functions — ported 4516 · partial 115 · split 162 · by-design 403 · open 133 (631 declared by seed). Measured: ok 3887, partial 675, thin 236, missing 531. `node scripts/ledger.mjs summary`.
<!-- ledger:end -->
Picker: `LOOP-QUEUE.md` Must-fix (ships alone), else the **Open — cliffs**
head, else (block empty) the coverage head / `ledger.mjs batch` when it
still names ≥ 5 functions. Per ported function the **entire C body** in C
order — every arm, every callee live or named, C caller wired; already
whole → `ledger.mjs set … "stale: …"` and back to the writer question.
Restart beats patching arms. Gates: syntax · Rule #2 · green + strict ·
cohort · full 44 when shared · **movement + REACH-OK** (`verify.mjs --fn`).
`finish-iteration` fails closed on a new JS body under an undeclared C
name and regenerates both Open blocks.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-3556 (index).**
<!-- recent:begin -->
**D-3556** - `reveal_terrain`: detect.c:2356–2414 (full :2360 gate setup; disoriented gate :2362–2363 — gate message via live `You('are too disoriented for this.')` (C `:2363`; `You` added to the existing display.js import — imports.mjs ALREADY, no new edge); `if (unconstrain_map()) await docrt();` after the swallowed capt
**D-3555** row home only (no C re-read; body brief-read this iter): teleport.c `rloc_to_core` :1644–1 — retire-stale via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
**D-3554** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (Hea-strt.lua:50–61 = 12 des.door locked 24,10 + closed 26,08 + closed 27,12 + locked 28,13 + closed 35,07 + locked 35,10 + locked 39,10 + closed 39,13 + locked 46,07 + closed 47,08 + clos
**D-3553** row home only (no C re-read; body brief-read this iter): getpos.c `getpos` :771–1167 (entr — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
**D-3552** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (Arc-strt.lua:60–71 = 12 des.door closed 22,07 + closed 38,07 + locked 47,08 + locked 23,10 + locked 39,10 + locked 57,10 + locked 47,12 + closed 22,13 + closed 38,13 + locked 24,14 + clos
**D-3551** row home only (no C re-read; body brief-read this iter): role.c `role_menu_extra` :1816–19 — restore-compact via direct `ledger.mjs set` ×2 (NOT via finish-iteration; second set corrects the note's hand-count 220→221, D-3545 precedent).
**D-3550** - `impossible`: pline.c:584–634 (audit only; recursion panic :591–592, vsnprintf chop :595 — per-site des evidence this iter (Pri-strt.lua:53–70 = 18 des.door locked 18,09 + locked 18,10 + closed 34,09 + closed 34,10 + closed 40,05 + closed 46,05 + closed 52,05 + locked 38,07 + closed 42,07 + closed 46,07 + clos
**D-3549** row home only (no C re-read; body brief-read this iter): objnam.c `readobjnam` :4910–5400  — restore-compact via direct `ledger.mjs set` ×1 (NOT via finish-iteration).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3556; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs head @b39cb750e — `mkobj.c` next_ident (14 sessions, 50 k RNG; history D-2228 — JS stays in the `^G`/wish name parse where C creates the monster; `hidden-proxy show scen-town-Healer-94122`), then `teleport.c` level_tele (13 sessions; the second arrival message C prints behind «You materialize on a different level!--More--»).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Parks re-enter through the cliffs block: when a parked owner heads it, the deliverable is its writer or `[measure]` row. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
