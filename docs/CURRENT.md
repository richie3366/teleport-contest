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

Score last measured: **2026-10-08** — full `sessions` on `69e4c57a7`
(audit **2567**, 2026-10-08T22:06:17.238Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`357+1.59/turn` (R² 0.74).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-08 19:38Z, ours 19:11Z)** | **18 / 44**, 8,498 / 11,265 pts, RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `357+1.59/turn` (R² 0.74) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,498 vs lockwo 7,852; their RNG 61.7 % vs our 41.7 %: our loss is early cliffs in long sessions). 18/44 held, pts **8,498** (unchanged), RNG **41.7 %**, rngSteps 92.4 %, screens **75.4 %** at judge 2026-10-08 19:38Z (ours scored 19:11Z: post-D-3693, pre-D-3695).
**Corpus — picker and proxy (2026-10-08 22:12Z; 953/953 entries, 0 unrecorded):**
**938 / 953** PASS (98.4 %), RNG 100.00 %, screens 99.9 %; `full: true`. Worst families: `random` 56/61, `explore` 116/124, `scen-town` 19/20, `scen-tour` 28/29. Audits record this line next to held-out: the board must rise **with** it. +0 since the last audit (938→938 stable: D-3697 fetch guards move no recorded session); 0 PASS→FAIL, 0 hangs. Remainder: 13 env:config-path + 1 unattributed + 1 mon_wield_item (RECORDER-ARTIFACT).
Reviews 1225–2567 (index; no row 1618): 1176 ACCEPT, 57 WITH-DEBT, 109 QUALITY-RISK (2567: 1A/0D/0Q, 0 Must-fix queued).
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
Ledger @77cc1b10c: 5329 pinned-C functions — ported 4539 · partial 116 · split 163 · by-design 396 · open 115 (615 declared by seed). Measured: ok 3910, partial 680, thin 235, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3698 (index).**
<!-- recent:begin -->
**D-3698** allmain.c moveloop_core `:453–471`: `if (!context.mv || Blind) { ...see arms...; if (visio — js/allmain.js only — nested the consume inside `if (!g.context.mv || Blind)` in C order (after the see arms), dropped the post-clear.
**D-3697** dogmove.c:427–434 fetch gate: `:429–431` `obj->otyp != SCR_MAIL` under MAIL_STRUCTURES (un — js/dogmove.js only — the two guards in C order after the nofetch check (mail first `:429–431`, then prizes `:432–434`), each with its C cite; is_mines_prize/is_soko_prize added to the pre-existing mkobj.js edge (imports.
**D-3696** the G's writer, clocked: `vision.c` vision_recalc's own newsym sweep at n=5079 — 
**D-3695** dogmove.c:466–471 inside staticfn dog_invent (`:400–478`): `if (attacktype(mtmp->data, AT_ — wired the tail in C order (short-circuit guard, NEED_HTH set before the call, awaited `(void)` call since JS mon_wield_item is async like all 9 sibling sites, unconditional gear check after the if).
**D-3694** TEMP sites, all reverted md5-verified (vision.c ab077a48, display.c b75fdeb7, termcap.c 23 — 
**D-3693** `cmd.c` rhack `:3689–3694` (veto path `:3691–3693` reset_cmd_vars(TRUE), res = ECMD_OK) +  — js/cmd.js only — the S arm's veto branch does `reset_cmd_vars(true)` before the shared tail (house shape `:2813–2816`); the TRUE reset zeroes multi so the tail is reset(FALSE) = C's double-reset convergence.
**D-3692** not mon_wield_item (faithful per D-2460/D-3660 — none (measure-confirm).
**D-3691** display.h random_obj_to_glyph `:933–936` (hallu otyp roll == CORPSE → second burn random_m — js/display.js only — the arm now renders ch = oc_display_sym(objects[CORPSE].oc_class) (FOOD `%`, ROGUESET-aware like the sibling arms), keeping mcolors[mnum] + mnum + GLYPH_BODY_OFF (C `:933–936` + `:3005` order; non-pi
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3698; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next cluster:** D-3698 refuted the parked head (moveloop_core :470 gate nesting; Priest-94382 → FULL PASS, corpus 939/953); pop the regenerated cliffs head.
**This iter:** audit 2567 @69e4c57a7 (1A/0D/0Q: D-3697 ACCEPT, whole-body ported flip + 312/312 full-reach REACH-OK, honest NO MOVEMENT on parked probe) + full rescore 938/953 stable, 0 PASS→FAIL; fortress 44/44; ledger 5/5 seeded-ported sampled clean.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
