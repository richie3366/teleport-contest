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

Score last measured: **2026-10-06** — full `sessions` on `c3000735f`
(audit **2439–2444**, 2026-10-06T12:37:54.728Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`331+1.62/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-06 07:20Z)** | **16 / 44**, 7,224 / 11,265 pts, RNG **34.8 %**, rngSteps 87.7 %, screens **64.1 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `331+1.62/turn` (R² 0.773) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 6, 4th agentic (lockwo 17/44, RNG 61.0 % vs our 34.8 % at equal rngSteps 87.7 %: our loss is a few early cliffs in long sessions). Flat at 16/44 from judge 2026-10-05 07:36Z through 2026-10-06 07:20Z (D-3508–D-3561) — §10.17 falsifier fired; cliff phase opened (§10.18).
**Corpus — picker and proxy (2026-10-06 12:43Z; 953/953 entries, 0 unrecorded):**
**751 / 953** PASS (78.8 %), RNG 99.14 %, screens 94.9 %; `full: true`. Worst families: `scen-options` 1/20, `scen-tutorial` 4/20, `scen-quest` 6/20, `scen-impaired` 7/20, `scen-town` 8/20. Audits record this line next to held-out: the board must rise **with** it. +10 since the last audit (741→751: D-3557 6 + D-3558 3 + full-rescore 1 scen-dig-94255); 0 PASS→FAIL.
Reviews 1225–2444 (index; no row 1618): 1057 ACCEPT, 56 WITH-DEBT, 106 QUALITY-RISK (2439–2444: 6A/0D/0Q, 0 Must-fix queued).
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
Ledger @a128195ee: 5329 pinned-C functions — ported 4517 · partial 114 · split 162 · by-design 403 · open 133 (630 declared by seed). Measured: ok 3888, partial 675, thin 235, missing 531. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3564 (index).**
<!-- recent:begin -->
**D-3564** `include/obj.h:139` `#define opoisoned otrapped` — dogfood poison head reads the C bit as the union both fields partition into (trap writers set otrapped on boxes/tins/boulders, poison writers set opoisoned on weapons/ammo; clears restore agreement, so the union equals C
**D-3563** `cmd.c` dotravel_target :5348–5377 (sets travel/run=8/multi, calls domove — removed the gate — step on any findtravelpath direction like C (detours included); kept the genuine-NOPATH quiet-rest else branch (C rests when no TEST_TRAV path — D-0702's case stays covered there).
**D-3562** `monmove.c` m_move :1764–1767 (`can_unlock = ((can_open && monhaskey(mtmp, TRUE)) || mtmp- — `|| is_rider(ptr)` appended in C short-circuit order + cite comment; removed the deferred comment.
**D-3561** `monflag.h:177–183` (MZ_MEDIUM 2 :179, MZ_HUMAN ≡ MZ_MEDIUM :180, MZ_LARGE 3 :181); `mon.c — `MZ_MEDIUM` added to the existing monsters.js import (no new edge) + `const MZ_HUMAN = MZ_MEDIUM;` with a monflag.h:180 cite (replacing the wrong literal).
**D-3560** TEMP sites (all reverted): mon.c mfndpos pre-`data->cnt` (:2380) MFND line; monmove.c post — 
**D-3559** `monmove.c:532–567` (`distfleeck`); callers dochug :791/:834/:915. The park (LOOP-QUEUE-PA — C body whole, in C order, as async (monflee plines): seescary mcansee/Invis-perceives gate :551–557 (live `Invis()`, in-file `perceives` — the identical predicate already used at monmove.js:1022), unconditional `onscary`
**D-3558** `quest.c onquest` :89-104 (Is_qstart→on_start; called from `goto_level` do.c:1891-1892) →  — `js/questpgr.js` only — six firsttime bodies verbatim from quest.lua (blank lines truly empty, double-space after periods per `cat -A`; conversions %H/%l/%ls/%x/%d/%n all previously shipped) + six QUEST_MSG_META firsttim
**D-3557** `getpos.c:451-452,461-464` — GLOC_OBJS arm now `glyph_at` + live `glyph_is_object` + `objnum_to_glyph` boulder/rock exclusion, mirroring the GLOC_MONS arm; +2 names on the existing display.js edge (imports.mjs ALREADY, no new edge).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3564; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** cliffs head @c3000735f — `monmove.c` distfleeck (5 sessions, 7.2 k RNG; parked SYMPTOM — deliverable is the writer the first divergence names or its [measure] row; probes 94094/94274/92055@141, all :538 call-pattern forks per D-3559/D-3561), then `dogmove.c` dog_goal (3 sessions, 6.4 k RNG; history D-2149).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked**. Parks re-enter through the cliffs block: when a parked owner heads it, the deliverable is its writer or `[measure]` row. Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes ledger/index/journal/blocks. No D-lists.
