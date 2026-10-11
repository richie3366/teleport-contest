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

Score last measured: **2026-10-11** — full `sessions` on `3b2e6a541`
(audit **2657–2665**, 2026-10-11T00:12:30Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`348+1.58/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-10 19:09Z, board 19:36Z)** | **19 / 44**, 8,856 / 11,265 pts, RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `348+1.58/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,856 vs lockwo 8,533; their RNG 84.3 % vs our 46.4 %: our loss is early cliffs in long sessions). 19/44 held, pts **8,856** (+0), RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** at judge 2026-10-10 19:09Z (board 19:36Z — before this window's SHAs, so no movement attributable yet).
**Corpus — picker and proxy (2026-10-11 ~00:10Z, `3b2e6a541`; 1113/1113 entries, 0 unrecorded):**
**1050 / 1113** PASS, RNG 20346915/20441637 (**99.54 %**), screens 341508/347076 (98.4 %); `full: true`. Marathons 111/160. Worst families: `scen-sweep` 27/50 (RNG 96.8 %), `scen-worldtour` 30/50 (98.9 %), `scen-chain` 34/40 (100 %), `scen-trek` 20/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; +3 FAIL→PASS vs committed (rescore-only cross-effects: 95330 revive_corpse@120, 95302 do_statusline2@1550, 95216 fumaroles@934; +11 vs last audit's 1039: D-3793 ×2, D-3794, D-3795, D-3796, D-3797, D-3801 ×2 + rescore 3). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2665 (index; no row 1618): 1271 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2657–2665: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @c7eb613c8: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (609 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3804 (index).**
<!-- recent:begin -->
**D-3804** `invent.c:1838–1900` getobj collects SUGGEST lets in sortloot(SORTLOOT_INVLET) order; sort — invletter_value exported from js/invent.js (body untouched); all seven clone lets builders sort by it with a sortloot_cmp `:473` cite — five ALREADY invent.js edges extended (wield/potion/pickup/apply/artifact, imports.m
**D-3803** `potion.c:369–438` make_hallucinated (`:395` set_itimeout(&HHallucination, xtime); `:425–4 — the else arm now mirrors `itimeout(xtime)` into uprops[HALLUC].intrinsic TIMEOUT bits beside the flat (D-3802 make_confused shape + cite), on both onset and clear; HALLUC added to potion.js's existing const.js import (AL
**D-3802** `youprop.h:83` HConfusion ≡ uprops[CONFUSION].intrinsic (single storage); `timeout.c:730`  — both CONFUSION writers now keep the slot ≡ the flat in the house shapes: nh_timeout arm mirrors `next` + the set-to-1 into uprops TIMEOUT bits (BLINDED-arm shape); make_confused ensures the slot and mirrors itimeout(xtim
**D-3801** `zap.c:3555–3568` hit() (`verbosely = mtmp==youmonst || (verbose && (cansee(bhitpos) || ca — D-1849 pattern — import the export: `hit` added to the existing static `mthrowu.js` edge (zap.js:284, imports.mjs ALREADY, no new edge), 6 call sites rewired (`hit_zap`×4, `hit_msg`×2 → `hit`), both clones deleted (tombs
**D-3800** `muse.c:998–1034` (MUSE_SCR_CREATE_MONSTER: enexto + `makemon(pm, cc, NO_MM_FLAGS)`) + `ma — one line in the sibling shape — `if (mon) await makemon_appear_msg(mon, cc.x, cc.y, NO_MM_FLAGS);` + C cite; `makemon_appear_msg` already imported (muse.js:59, no new edge).
**D-3799** `display.c:2305` (back_to_glyph SDOOR: `if (ptr->arboreal_sdoor)` → S_tree, no seenv gate) — `case SDOOR:` in terrain_glyph now checks `loc.arboreal_sdoor` first and returns the TREE arm's tty verbatim (DEC `g`/ASCII `#`, CLR_GREEN, no seenv gate — C returns S_tree unconditionally), else `wall_glyph(loc)` as bef
**D-3798** `muse.c:1618–1626` (mbhitm WAN_STRIKING hits-you: `rnd(20)` gate `:1618`, `pline_The("wand — `await finish_maybe_wail()` (`:825`) after the done-check, before `learnit` (C order: the wail inside losehp precedes learnit/stop_occupation/nomul/makeknown), C-cited in the zhitu oil shape (zap.js:2319–2326, D-3795); `
**D-3797** `mhitm.c:1088–1094` (monkilled → `if (!DEADMONSTER(mdef)) return mhm.hitflags` + AGR_DIED  — the C :1091–1094 gate in the exact sibling shape (`if ((mdef.mhp | 0) > 0) return hitflags;` + AGR_DIED arm) in both ungated tails.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3804; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** row-1 void still parked (falsifier unfired live: 0 PASS / 0 moved / 2 unchanged voids); row-2 getobj writer = clone lets order: wield/dip/stash/stone/charge/ready builders sort ASCII (Gb) where C sortloot INVLET uses invletter_value (bG).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
