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

Score last measured: **2026-10-11** — full `sessions` on `bc0bec095`
(audit **2675–2683**, 2026-10-11T08:17:45Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`351+1.57/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-11 07:20Z)** | **21 / 44**, 8,956 / 11,265 pts, RNG **51.6 %**, rngSteps 93.5 %, screens **79.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `351+1.57/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,956 vs lockwo 8,533; their RNG 84.3 % vs our 51.6 %: our loss is early cliffs in long sessions). 21/44 held, pts **8,956** (±0), RNG **51.6 %** (±0pp), rngSteps 93.5 %, screens **79.5 %** at judge 2026-10-11 07:20Z — flat through D-3811..D-3819's window while the corpus gained +10; the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-11 ~08:26Z, `bc0bec095`; 1113/1113 entries, 0 unrecorded):**
**1078 / 1113** PASS, RNG 20348305/20441637 (**99.54 %**), screens 342299/347076 (98.6 %); `full: true`. Marathons 139/160. Worst families: `scen-sweep` 40/50 (RNG 96.8 %), `scen-worldtour` 39/50 (98.9 %), `scen-chain` 40/40 (100 %), `scen-trek` 20/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; +10 FAIL→PASS vs last audit's 1068, exactly the 9 SHAs' claimed PASSes (D-3811 ×2, D-3812 ×1 + predicted 95411 bonus noted in D-3814 Status, D-3813, D-3814, D-3815, D-3817 ×2, D-3819; D-3816/D-3818 moved-only) — zero rescore drift. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2683 (index; no row 1618): 1289 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2675–2683: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @8c982316b: 5329 pinned-C functions — ported 4538 · partial 115 · split 165 · by-design 396 · open 115 (608 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3826 (index).**
<!-- recent:begin -->
**D-3826** `invent.c` display_minventory `:5340–5386` → `pickup.c` query_objlist `:1130–1139` (identi — analog builds `[hdr, "", ...]` and bakes C's prefixes into item text: first-item gold keeps `$` (query_objlist `:1133–1135`), else menu letters a..z/A.. in menu order with per-page reset at n%lmax==0 over every list slot
**D-3825** `questpgr.c` convert_arg `:311` `case 'x': str = Blind ? "sense" : "see";` with `Blind ≡ ( — D-3822 pattern — import the live `Blind()` export from invent.js (imports.mjs VERDICT: SAFE, hoisted function, cycle-safe) and read it in the `%x` arm; dead-flat line deleted.
**D-3824** none (no C change; owner o_init.c:85–109 whole; writer end.c:394–480 panic whole per D-382 — re-scored the 4 rows through the sanctioned scorer only (`verify.mjs --fn randomize_gem_colors,slimed_to_death,doname_base` rewrote the working rows live) — no hand-edit of the board, no full rescore (targeted repair: a 
**D-3823** `pray.c` dosacrifice `:1854–1896` — prep reads the live `mhitu.js` `Levitation()`/`Flying()` exports (added to pray.js's existing mhitu edge — `imports.mjs` ALREADY, no new edge); altaralign moved above the guards in C order (`a_align` is a pure level read
**D-3822** `youprop.h:163–165` Warning ≡ `u.uprops[WARNING].intrinsic || .extrinsic`; `:175–177` Sear — `js/display.js` mon_warning calls the live `hero_Warning` (now exported from `js/invent.js` — display.js already imports invent.js, no new edge; one clone fewer); `js/attrib.js` Searching reads `uprops[SEARCHING]` intrin
**D-3821** `hack.c:4283–4288` losehp fatal (`urgent_pline("You die..."); done(DIED);` — `js/hack.js:1954` losehp records `game._losehp_gameover = true` only when it flips gameover from false (the marker it invents); `js/end.js:2013–2016` finish_losehp_done drops that marker (gameover false) before «You die.
**D-3819** `hack.c:1037–1042` (tunnels && !needspick → still_chewing, "Eat the rock") + domove_core ` — new arm in domove after the IRONBARS chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && tunnels && !needspick → still_chewing; truthy → move=0/nomul/return; falsy (c
**D-3818** `cmd.c:890–949` domonability — `tail()` deleted; the Upolyd/normal arms are chain members after the steed arm in C order (`:943–947` cites); the chain ends in bare `return ECMD_OK` (`:948` cite).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3826; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** cliffs head display_minventory — PICK_NONE analog omits tty "X - " prefixes + prompt blank (offx 38 vs C 37); probe scen-sweep-Caveman-95327 step 1315.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
