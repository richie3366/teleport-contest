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

Score last measured: **2026-10-12** — full `sessions` on `dba0c82b0`
(audit **2727–2734**, 2026-10-12T10:11:30Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`349+1.56/turn` (R² 0.76).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-12 08:13Z)** | **22 / 44**, 9,012 / 11,265 pts, RNG **51.7 %**, rngSteps 93.6 %, screens **80.0 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `349+1.56/turn` (R² 0.76) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (9,012 vs lockwo 8,549; their RNG 84.3 % vs our 51.7 %: our loss is early cliffs in long sessions). 22/44 held (±0), pts **9,012** (±0), RNG **51.7 %** (±0), rngSteps 93.6 %, screens **80.0 %** (±0) at judge 2026-10-12 08:13Z — fresh judge signal (was 2026-10-12 01:53Z), flat; through D-3867..D-3874's window the corpus went 1168/1197 → 1240/1281 (Grow #2 +84 entries; marathons 228/244 → 282/308); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-12 10:22Z, `dba0c82b0`; 1281/1281 entries, 0 unrecorded):**
**1240 / 1281** PASS, RNG 28036485/28221771 (**99.34 %**), screens 485365/491202 (98.8 %); `full: true`. Marathons 282/308. Worst families: `scen-sweep` 96/112 (RNG 96.2 %), `scen-trek` 41/42 (99.2 %), `scen-chain` 61/62, `scen-worldtour` 84/92, `scen-options` 20/21, `scen-tour` 28/29; rest 100 % RNG. 0 PASS→FAIL. Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2734 (index; no row 1618): 1337 ACCEPT, 61 WITH-DEBT, 111 QUALITY-RISK (2727–2734: 7A/0D/1Q, 1 Must-fix queued — review C-wrong: mfndpos inline Invis clone).
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
Ledger @d158b5a9b: 5329 pinned-C functions — ported 4538 · partial 115 · split 165 · by-design 396 · open 115 (606 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3878 (index).**
<!-- recent:begin -->
**D-3878** `sp_lev.c` `:2125` + lspo `:3299/:3349–3357` (`dat/bigrm-3.lua`). — `js/mklev.js` only — capture the makemon result and apply the `:2125` clobber (`if (mtmp) mtmp.female = 0`) with the `:3299/:3349–3357` pipeline cites (D-0873 sibling shape, cf.
**D-3877** `sp_lev.c` create_monster `:1943` (`amask = sp_amask_to_amask(m->sp_amask)`) BEFORE `:1949 — `js/mklev.js` only — reorder to C order: find_montype_gender (lspo parse, stays first) → `sp_amask_to_amask` (:1943) → extinct/G_GONE checks (:1949–1953, guarded by `if (pm)` so class-letter and random paths are byte-ide
**D-3876** `nethack-c/upstream/src/trap.c` water_damage `:4771` (`else if (!force && (Luck + 5) > rn2 — `js/trap.js` only — `const luck = ((game.u?.uluck | 0) + (game.u?.moreluck | 0))` with a you.h:464 cite (trap.js:6711 idiom; the chest-trap `Luck_chest` twin stays untouched); the gate reads `(luck + 5)`.
**D-3875** `mon.c` mfndpos `monseeu` (`:2261–2262`, `mon->mcansee && (!Invis || perceives(mdat))`) +  — js/mon.js only — `import { Invis } from './timeout.js'` (new edge, hoisted-function runtime-only, same-SCC cite convention as the mhitu/uhitm/light imports; `--can` SAFE re-verified this iteration) + deleted the 5-line i
**D-3874** `mon.c` mfndpos `monseeu` (`:2261–2262`, `mon->mcansee && (!Invis || perceives(mdat))`) +  — js/mon.js only — :3127 replaced by live `(H||E)&&!B` from game.u flats + uprops[INVIS] (mirrors timeout.js Invis() verbatim incl. the BInvis blocked-read; mon.js cannot import it — timeout.js imports mon.js — so INVIS co
**D-3873** `shk.c` shk_move `:4960` (`if (Invis || u.usteed)`) + `youprop.h:195–198` (`HInvis`/`EInvi — js/shk.js only — :4631 `u.Invis` → `Invis()` (already-imported timeout.js export, no new edge) + C-cite comment (macro locus, flat-staleness cause, :913 convention pointer).
**D-3872** `quest.c` on_goal first-visit `qt_pager("goal_first")` ← onquest ← `goto_level` do.c:1891– — `js/questpgr.js` only (data): two bodies byte-verbatim from quest.lua (node byte-compare true, 260/184 chars incl. double spaces; %n/%l/%o/%x conversions previously shipped, exercised by Arc/Bar/Kni) + 2 QUEST_MSG_META g
**D-3871** win/tty/getline.c hooked_tty_getlin `:60–67` issues every prompt via custompline(OVERRIDE_ — js/getline.js only — one `vpline_flush_vision();` before the initial `await paint();` in getlin and get_ext_cmd (C order: recalc-consume, then flush/putmesg), with C cites; echo repaints stay addtopl with no vpline, matc
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3878; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** m_move@713 (582719).
**This iter:** cliff bigrm-3 :2125 clobber (D-3878).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
