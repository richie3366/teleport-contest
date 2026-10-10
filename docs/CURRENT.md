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

Score last measured: **2026-10-10** — full `sessions` on `1841f1954`
(audit **2639–2647**, 2026-10-10T13:08:34.958Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`349+1.57/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-10 07:46Z, ours 07:19Z)** | **19 / 44**, 8,856 / 11,265 pts, RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `349+1.57/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,856 vs lockwo 7,866; their RNG 61.7 % vs our 46.4 %: our loss is early cliffs in long sessions). 19/44 held, pts **8,856** (+0), RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** at judge 2026-10-10 07:46Z (ours 07:19Z: through D-3774).
**Corpus — picker and proxy (2026-10-10 ~13:17Z, `1841f1954`; 1113/1113 entries, 0 unrecorded):**
**1035 / 1113** PASS, RNG 20220019/20441637 (**98.92 %**), screens 336907/347076 (97.1 %); `full: true`. Marathons 96/160. Worst families: `scen-sweep` 22/50 (RNG 93.3 %), `scen-worldtour` 21/50 (96.7 %), `scen-chain` 34/40 (100 %), `scen-trek` 19/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; 7 FAIL→PASS (D-3776 95328, D-3777 95225, D-3782 ×3, rescore-only 95300/95222). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2647 (index; no row 1618): 1253 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2639–2647: 9A/0D/0Q, 0 Must-fix queued).
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
Ledger @222a0e1bf: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (609 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3784 (index).**
<!-- recent:begin -->
**D-3784** pickup.c query_objlist :1130–1140 (`tmpglyph = obj_to_glyph(curr, rn2_on_display_rng)` per — obj_glyph(curr) burn per allowed item in both arms (sorted + unsorted, before items.push, C-cited; glyph discarded), obj_glyph added to the existing display.js import (imports.mjs --can: ALREADY, no new edge).
**D-3783** dog.c:1362–1393 abuse_dog (halve-vs-decrement gate :1366–1370) + youprop.h:212–214 (`HAggr — all 3 flat-only Aggravate readers now read the union (D-3775 Poison house shape), each C-cited: dog.js abuse_dog gate (the cliff); monmove.js local Aggravate_monster (disturb, monmove.c:349); hacklib.js level_difficulty 
**D-3782** `attrib.c:221–270` losestr (`:244` losehp may block at the wizard "Die?" prompt inside don — conditional return — after finish_losehp_done(), `if (game.program_state?.gameover) return;` else fall through to the C tail (C-cited comment; entry gate `needs_done||gameover` unchanged — post-true-death still stops).
**D-3781** `polyself.c:488–496` polyself shudder arm (`:491` shudder pline, `:492` losehp(rnd(30)), ` — drain in C order between losehp and the done-gate: `await finish_maybe_wail()` (`js/polyself.js:2039`; showdamage→rehumanize→wail, each flag-gated/idempotent — C's synchronous losehp tail), added to the existing hack.js 
**D-3780** `explode.c` explode `:275–284` (grabbed/grabbing), `:628–631` (mh vs uhp), `:641–644` (reh — all 4 sites now call the canonical `Upolyd()` (`js/const.js:3216`, C you.h:554), added to the existing const.js import (`imports.mjs --can`: ALREADY, no new edge); C cite at the damage branch.
**D-3779** `pickup.c:2971–3226` use_container (menu loop `:3074`) + `wintty.c` erase_menu_or_text / t — dismiss via the shared `await dismiss_nhw_menu()` (corner → erase_menu_or_text/docorner, no burns; the docrt arm stays for offx==0, like C).
**D-3778** `makemon.c:1502–1504` in-body tail (`if (go.occupation) dochugw(mtmp, FALSE)` — `js/minion.js` only — extend the existing makemon.js import (`imports.mjs --can`: ALREADY, no new edge) with `makemon_appear_msg`; await it with final placement + matching MM flags immediately after each makemon in C ord
**D-3777** mthrowu.c thitu `:74–155` (hit else-arm `:139–152`: silver `:140–145`, acid burn `:146–149 — gate is now `if (game._losehp_needs_done)` — THIS losehp's death (set atomically with gameover in losehp js/hack.js:1950–1951), the house flag-idiom (potion/monmove/trap/dokick drain sites); a stale gameover from an unre
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3784; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** 95205 flooreffects/1.
**This iter:** D-3784 burn, 95343→682.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
