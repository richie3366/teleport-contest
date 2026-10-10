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

Score last measured: **2026-10-10** — full `sessions` on `8e94854e9`
(audit **2622–2630**, 2026-10-10T03:49:33.147Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`361+1.74/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-10 02:11Z, ours 01:44Z)** | **19 / 44**, 8,856 / 11,265 pts, RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `361+1.74/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,856 vs lockwo 7,866; their RNG 61.7 % vs our 46.4 %: our loss is early cliffs in long sessions). 19/44 held, pts **8,856** (+272), RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** at judge 2026-10-10 02:11Z (ours 01:44Z: through D-3762).
**Corpus — picker and proxy (2026-10-10 ~03:59Z, `8e94854e9`; 1113/1113 entries, 0 unrecorded):**
**1024 / 1113** PASS, RNG 20010249/20441637 (**97.89 %**), screens 331312/347076 (95.5 %); `full: true`. Marathons: 85/160. Worst families: `scen-sweep` 17/50 (RNG 86.6 %), `scen-worldtour` 17/50 (95.1 %), `scen-chain` 33/40 (99.1 %), `scen-trek` 18/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; 9 FAIL→PASS (D-3756 ×3, D-3759 ×2, D-3761/D-3762 ×2, collateral ×2). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2630 (index; no row 1618): 1238 ACCEPT, 58 WITH-DEBT, 109 QUALITY-RISK (2622–2630: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @1eee984bc: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (610 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3773 (index).**
<!-- recent:begin -->
**D-3773** `vision.h:50–53` m_canseeu (live #else arm; the #if 0 buried arm is dead) + `youprop.h:198 — m_canseeu now reads the live `Invis()` youprop export (`js/timeout.js:1735`, `(H||E)&&!B` over flats+uprops) — `if (Invis() && !perceives) return false`, then the existing uinwater + couldsee arms; doc cites the live C a
**D-3772** hack.c:2417–2421 u_maybe_impaired (`Stunned || (Confusion && !rn2(5))`; Stunned ≡ HStun ≡  — js/hack.js only: (1) Stunned arm → `if ((u.HStun | 0) || u.Stunned) return true;` (canonical shape; Confusion arm untouched — already dual-flat, no evidence of slot desync). (2) impaired_movement reject → live `bad_rock(
**D-3771** monmove.c:956–957 `case MMOVE_DIED: return 1;` (+ :745–750 flee-teleport unconditional `re — (1) `if (status === MMOVE_DIED) return 1;` immediately after the recalc, C-cited (skips idle isgd/Hallu + PHASE FOUR + quest_talk/cuss exactly like C). (2) flee-teleport `return 0` moved out of the rloc-success gate (C :
**D-3770** potion.c:2072 `if (!Blind && !Unaware)` (+ :2077 clears arm); youprop.h:399 `Unaware ≡ mul — potion.js both gates now call the live eat.js `Unaware()` export (already imported :186, used :900/:1157 — no new edge) with C cites; deleted `Unaware_pot`. dig.js/were.js clone bodies replaced with the C-exact macro (ga
**D-3769** (1) detect.c:998 (`You_feel("very greedy"/"entrapped")`) → :1000 `browse_map` with NO flus — (1) deleted the flush + C-cite comment; dropped flush_topl_more from the local dynamic import (still used at :410/:1456/:2051 — no module-edge change). (2) after the memory fallback, classify the id exactly like the swal
**D-3768** `o_init.c:85–109` (attributed owner — none — no js/.
**D-3767** `o_init.c:85–109` randomize_gem_colors (two `rn2(2)` gates + `rn2(4)` fluorite switch, all — none — no js/ (docs-only entry).
**D-3766** `objnam.c:3455–3529` rnd_otyp_by_namedesc (`:3493` OBJ_NAME, `:3507` OBJ_DESCR) + `include — both lookups now via `objs[i]?.oc_name_idx ?? i` / `objs[i]?.oc_descr_idx ?? i` with an objclass.h cite; no new import.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3773; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** getpos writers shipped D-3769 (95506 PASS; 95311 topline fixed + RNG-full, residual hallu-fake paint → [measure] row pops if getpos still heads); else the regenerated cliffs head.
**This iter:** m_move cliff (row-2; row-1 randomize_gem_colors still exhausted — parked D-3767 + measured D-3768 + writer CLOSED — skipped per D-3768 Next + D-3769…D-3773 precedent): writer m_canseeu (vision.h) — wrong-case Invis flats on 95347@492 (invisible stalker-form hero).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
