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

Score last measured: **2026-10-10** — full `sessions` on `8009035ee`
(audit **2631–2638**, 2026-10-10T08:19:42.028Z).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`348+1.56/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| **Held-out (judge 2026-10-10 07:46Z, ours 07:19Z)** | **19 / 44**, 8,856 / 11,265 pts, RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** |
| Sessions passing (public) | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `348+1.56/turn` (R² 0.78) |
| Role-init throws | **0 / 44** |

**Held-out is the objective** (`node scripts/leaderboard.mjs`; refresh on
every audit). Rank 5 by pts (8,856 vs lockwo 7,866; their RNG 61.7 % vs our 46.4 %: our loss is early cliffs in long sessions). 19/44 held, pts **8,856** (+0), RNG **46.4 %**, rngSteps 93.2 %, screens **78.6 %** at judge 2026-10-10 07:46Z (ours 07:19Z: through D-3774).
**Corpus — picker and proxy (2026-10-10 ~08:28Z, `8009035ee`; 1113/1113 entries, 0 unrecorded):**
**1028 / 1113** PASS, RNG 20148225/20441637 (**98.56 %**), screens 334727/347076 (96.4 %); `full: true`. Marathons: 89/160. Worst families: `scen-sweep` 19/50 (RNG 90.6 %), `scen-worldtour` 17/50 (96.0 %), `scen-chain` 34/40 (100 %), `scen-trek` 19/20 (100 %); rest 100 % RNG. 0 PASS→FAIL; 4 FAIL→PASS (D-3765 95408, D-3769 95506, D-3770 95348, D-3774 95332). Audits record this line and the families table next to held-out: the board must rise **with** it.
Reviews 1225–2638 (index; no row 1618): 1244 ACCEPT, 60 WITH-DEBT, 109 QUALITY-RISK (2631–2638: 6A/2D/0Q, 0 Must-fix queued).
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
Ledger @a72a653d4: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (609 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3781 (index).**
<!-- recent:begin -->
**D-3781** `polyself.c:488–496` polyself shudder arm (`:491` shudder pline, `:492` losehp(rnd(30)), ` — drain in C order between losehp and the done-gate: `await finish_maybe_wail()` (`js/polyself.js:2039`; showdamage→rehumanize→wail, each flag-gated/idempotent — C's synchronous losehp tail), added to the existing hack.js 
**D-3780** `explode.c` explode `:275–284` (grabbed/grabbing), `:628–631` (mh vs uhp), `:641–644` (reh — all 4 sites now call the canonical `Upolyd()` (`js/const.js:3216`, C you.h:554), added to the existing const.js import (`imports.mjs --can`: ALREADY, no new edge); C cite at the damage branch.
**D-3779** `pickup.c:2971–3226` use_container (menu loop `:3074`) + `wintty.c` erase_menu_or_text / t — dismiss via the shared `await dismiss_nhw_menu()` (corner → erase_menu_or_text/docorner, no burns; the docrt arm stays for offx==0, like C).
**D-3778** `makemon.c:1502–1504` in-body tail (`if (go.occupation) dochugw(mtmp, FALSE)` — `js/minion.js` only — extend the existing makemon.js import (`imports.mjs --can`: ALREADY, no new edge) with `makemon_appear_msg`; await it with final placement + matching MM flags immediately after each makemon in C ord
**D-3777** mthrowu.c thitu `:74–155` (hit else-arm `:139–152`: silver `:140–145`, acid burn `:146–149 — gate is now `if (game._losehp_needs_done)` — THIS losehp's death (set atomically with gameover in losehp js/hack.js:1950–1951), the house flag-idiom (potion/monmove/trap/dokick drain sites); a stale gameover from an unre
**D-3776** muse.c mbhitm `:1625–1631` (losehp → done returns on survive → learnit=TRUE → stop_occupat — conditional return (thitu/D-3426 shape): `if (gameover) { await finish_losehp_done(); if (gameover) return 0; }`, then fall through to learnit/stop/nomul/makeknown.
**D-3775** attrib.c:317–408 poisoned (resist early-out :337–343) + youprop.h:46–48 (`Poison_resistanc — all 8 hero Poison_resistance predicates now read flats || uprops intrinsic/extrinsic (the mon.js:296 / region.js:1224 / invent hero_Fire house shape), each C-cited youprop.h:46–48: attrib.js poisoned gate (the cliff); po
**D-3774** `cmd.c:5348–5377` dotravel_target (unconditional `domove()` at :5375) + `hack.c:2724–2737` — dotravel_target tail restructured to C order (same shape as the proven continue_run, D-3583): recompute travel→guess with UNSURE messages, apply `found:` (dx=dy=0 + nomul(0), which ends running like C :4171) on NOPATH — 
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3781; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** exercise row (1 left: 95346 Upolyd — D-3776 Next).
**This iter:** row-2 exercise/95346@474 (row-1 randomize still exhausted — parked D-3767 + measured D-3768, writer CLOSED, step-0 voids rngM=0 verified live; writer = polyself shudder losehp→rehumanize drain order).

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
