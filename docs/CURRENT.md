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

Score last measured: **2026-10-11** — full `sessions` on `38c910247`
(audit **2666–2674**, 2026-10-11T05:09:07Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`374+1.67/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-11 01:49Z, board 02:16Z)** | **21 / 44**, 8,956 / 11,265 pts, RNG **51.6 %**, rngSteps 93.5 %, screens **79.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `348+1.58/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,956 vs lockwo 8,533; their RNG 84.3 % vs our 51.6 %: our loss is early cliffs in long sessions). 21/44 held, pts **8,956** (+100), RNG **51.6 %** (+5.2pp), rngSteps 93.5 %, screens **79.5 %** at judge 2026-10-11 01:49Z (board 02:16Z — includes ~D-3802..D-3806, so the window's early cliff fixes visibly move held-out RNG).
**Corpus — picker and proxy (2026-10-11 ~05:19Z, `38c910247`; 1113/1113 entries, 0 unrecorded):**
**1068 / 1113** PASS, RNG 20348305/20441637 (**99.54 %**), screens 342276/347076 (98.6 %); `full: true`. Marathons 129/160. Worst families: `scen-sweep` 35/50 (RNG 96.8 %), `scen-worldtour` 37/50 (98.9 %), `scen-chain` 37/40 (100 %), `scen-trek` 20/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; +18 FAIL→PASS vs last audit's 1050, exactly the 9 SHAs' claimed PASSes (D-3802 ×3, D-3804 ×4, D-3805 ×2, D-3806 ×2, D-3807 ×2, D-3808 ×2, D-3809, D-3810 ×2; D-3803 moved-only) — zero rescore drift. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2674 (index; no row 1618): 1280 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2666–2674: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @c7b85e2f6: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (609 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3812 (index).**
<!-- recent:begin -->
**D-3812** `display.h:841–843` glyph_is_piletop_generic_obj (`> OFF && < OFF+FIRST_OBJECT-1`, FIRST_O — `js/display.js` only — piletop-generic is now C-exact (`> OFF && < OFF+FIRST_OBJECT-1`); normal_object gains C's third disjunct (`|| glyph_is_normal_piletop_obj`), keeping the whole-OBJ-bank range (documented superset of
**D-3811** `insight.c:1523–1524` (`if (Antimagic) you_are("magic-protected", …)`) + `youprop.h:55–57` — the inline is now the in-file `hero_Antimagic(u)` mirror (flats+uprops, no worn arm — the D-3790 shape, same file, no new import; insight.c:1523-1524 + youprop.h:55-57 cite); dead CLOAK_MR/onames/await-import lines remov
**D-3810** `hack.c:1817–1829` u_locomotion (`:1826` Levitation ? Float/float : `:1827` Flying ? Fly/f — both arms now read the flat OR the file-local slot union (`u.Levitation || Levitation_st()`, `u.Flying || Flying_st()` — flats OR uprops H/E, either blocked source; the hack.js:994 / D-3809 shape, same module, no new imp
**D-3809** `youprop.h:253–256` Flying macro ((HFlying||EFlying||(u.usteed && is_flyer)) && !BFlying,  — Flying() now the D-1085 union (flats OR slot H/E, either blocked source; steed kept; u.Flying early-true kept), the _statusLine2 arm shape with a youprop.h cite; FLYING added to mhitu.js's existing const.js import (impor
**D-3808** `hack.c:1056–1070` (mention_walls prose: `back_to_glyph` → `glyph_to_cmap` → `S_stone` → " — the inline now computes prose via the live `back_to_glyph` + `glyph_to_cmap` + `S_stone`/`an(defsym_explanation)`/`impossible` arms — the exact test_move `:1056–1070` shape (same as js/hack.js:512–523).
**D-3807** `do.c:1631` goto_level departure vision_recalc(2) (vision.c:820-836 not_in_sight arm; viz_ — do.js: Hallu gate removed (C vision.c:820-836 has none; the #992 narrowing stands for non-departure shutdowns only) + reglyph_darkroom() imported and called at the do.c:1715 site (after the getlev/mklev join, before set_
**D-3806** `hack.c:1395–1398` findtravelpath — moved the visibility gate above the destination test in C order (combined gate, then dest-return, then else-if enqueue); the couldseeOnly D-0702 shape is preserved, only relocated.
**D-3805** `attrib.c:904–1001` from_what — the three arms ported in C order with C cites: birth arm first (uroleplay.blind/deaf); Blindfolded_only arm after what_gives (youprop.h:97 macro inlined — invent.js:6228 precedent — + `ysimple_name(u.ublindf)`); goop arm
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3812; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** D-3811 shipped (one_characteristic Antimagic writer, 2 PASS: 95208+95221; row-1 void barred D-3767/D-3768). Next: row-2 readobjnam_postparse1 writer (95401 Wands/apron row-13; D-2137 read once).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
