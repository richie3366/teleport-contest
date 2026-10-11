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

Score last measured: **2026-10-11** — full `sessions` on `d412d1500`
(audit **2684–2694**, 2026-10-11T13:41:21Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`348+1.59/turn` (R² 0.77).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-11 13:14Z)** | **21 / 44**, 8,956 / 11,265 pts, RNG **51.6 %**, rngSteps 93.5 %, screens **79.5 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `348+1.59/turn` (R² 0.77) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,956 vs lockwo 8,533; their RNG 84.3 % vs our 51.6 %: our loss is early cliffs in long sessions). 21/44 held, pts **8,956** (±0), RNG **51.6 %** (±0pp), rngSteps 93.5 %, screens **79.5 %** at judge 2026-10-11 13:14Z — flat through D-3820..D-3831's window while the corpus gained +11 (marathons 139→150/160); the falsifier watch (§10.19) stays open.
**Corpus — picker and proxy (2026-10-11 ~14:11Z, `2afad430c`; 1197/1197 entries, 0 unrecorded):**
**1142 / 1197** PASS, RNG 24028122/24895890 (**96.51 %**), screens 407456/426873 (95.5 %); `full: true`. Marathons 203/244. Worst families: `scen-sweep` 62/81 (RNG 89.2 %), `scen-worldtour` 63/81 (91.4 %), `scen-chain` 47/51 (97.3 %), `scen-trek` 31/31 (100 %), `scen-tour` 28/29; rest 100 % RNG. 0 PASS→FAIL; +84 Grow #1 (44 marathon + 20 sweep + 20 worldtour, seeds 578100–578319): cohort 53/84, RNG 82.0 % (sweep 16/31, worldtour 19/31, chain 7/11, trek 11/11); cliffs block 4→12 owners headed by randomize_gem_colors (4 sess, RNG 309k). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2694 (index; no row 1618): 1300 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2684–2694: 11A/0D/0Q, 0 Must-fix queued).
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
Ledger @d87af6ccb: 5329 pinned-C functions — ported 4537 · partial 116 · split 165 · by-design 396 · open 115 (607 declared by seed). Measured: ok 3906, partial 681, thin 239, missing 503. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3833 (index).**
<!-- recent:begin -->
**D-3833** `fountain.c` drinkfountain case 21 (Poisonous) `:301–304` — add `KILLED_BY_AN` to the existing const.js import (fountain.js:75; `imports.mjs --can` ALREADY — no new edge).
**D-3832** `mhitu.c` hitmu `:1191–1193` (mhitm_adtyping then unconditional knockback) + `end.c` done  — one gate between adtyping and knockback (js/mhitu.js:3215–3219): `if (game.program_state?.gameover) return mhm.hitflags;` with the C cite — the established D-3732/D-3746 idiom, mirroring the `mhm.done` return on the next
**D-3831** `end.c` disclose `:636–639` (display_inventory then container_contents) + container_conten — js/pager.js only: scope `set_bot_disabled(true)` (already imported — no new edge) around the line-649 grid-sync flush, try/finally restoring.
**D-3830** `pline.c` vpline `:153–291` (`:243–249` in_pline gate, raw_print path); `attrib.c` exercis — vpline completion-tail chaining (js/display.js only): every entry links `_vpline_tail` synchronously at entry; a contended entry (in_pline set) awaits the previous tail unless `msg_stack_nested()` reports true nesting (a
**D-3829** `trap.c:577–579` maketrap (`ttmp->ntrap = gf.ftrap; gf.ftrap = ttmp;` — `push` → `unshift` with the C cite; one-word stale-order comment repairs in js/detect.js:2284, js/dogmove.js:750, js/pager.js:2923 (+ scripts/doggoal-portal.test.mjs:10).
**D-3828** `include/display.h:184–186` (H/E/Infravision ≡ H||E); `polyself.c` set_uasmon `:84–85` (PR — one `if (Upolyd(game.u)) return false;` before the race fallback (Upolyd already imported in display.js — no new edge), with the C cites.
**D-3827** `feel_location` nethack-c/upstream/src/display.c:746–909, gate `:777` (`if (!can_reach_flo — D-3822/D-3825 pattern — import the live `Levitation`/`Flying` exports from mhitu.js (`imports.mjs --can display.js mhitu.js Levitation` VERDICT: SAFE, hoisted functions, cycle-safe; one clone fewer) and read them in the 
**D-3826** `invent.c` display_minventory `:5340–5386` → `pickup.c` query_objlist `:1130–1139` (identi — analog builds `[hdr, "", ...]` and bakes C's prefixes into item text: first-item gold keeps `$` (query_objlist `:1133–1135`), else menu letters a..z/A.. in menu order with per-page reset at n%lmax==0 over every list slot
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3833; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** cliffs-head randomize_gem_colors → writer `fountain.c` drinkfountain (578205/578136 throw-voids: fate-21 Poison_res arm reads unimported KILLED_BY_AN; C hack.h:602; Knight-578306 AIR writer stays for next pop).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
