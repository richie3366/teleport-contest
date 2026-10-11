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
Ledger @6e7e9bf7a: 5329 pinned-C functions — ported 4539 · partial 115 · split 164 · by-design 396 · open 115 (609 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3819 (index).**
<!-- recent:begin -->
**D-3819** `hack.c:1037–1042` (tunnels && !needspick → still_chewing, "Eat the rock") + domove_core ` — new arm in domove after the IRONBARS chew, in C order: obstructed && !bars && !uinwater (:1017 gate preserved — its message stays deferred) && tunnels && !needspick → still_chewing; truthy → move=0/nomul/return; falsy (c
**D-3818** `cmd.c:890–949` domonability — `tail()` deleted; the Upolyd/normal arms are chain members after the steed arm in C order (`:943–947` cites); the chain ends in bare `return ECMD_OK` (`:948` cite).
**D-3817** `dungeon.c:3304–3340` show_overview whole re-read (`:3318` NHW_MENU, `:3327` end_menu, `:3 — `js/dungeon.js` show_overview now `await select_menu_pick_none(entries)` (live `js/invent.js:3265` export — C-exact lmax/npages/morestr/fullscreen/dismiss/keys, cursor `[morestr.length+1, page.length]` = C's [9,23]); D-1
**D-3816** `win/tty/wintty.c:1921–1922` tty_display_nhwindow NHW_MENU/TEXT arm (`if (toplin == TOPLIN — `js/invent.js` only, no new imports (flush_topl_more + hates_silver already file-scoped): `await flush_topl_more()` after menu geometry, before paint (C :1921–1922 cite + sibling-precedent note); Hate_silver arm inserted
**D-3815** `eat.c:1813–1851` rottenfood whole — triple ported in C order — `rnd(10)` first, then Blind() (live invent.js) / Levitation-in-:576-split-storage-shape || Is_airlevel || Is_waterlevel (const.js, `u.uz` shape) / else `u.usteed ? 'saddle' : surface(ux, uy)` (
**D-3814** `mondata.c:653–659` sticks (`dmgtype AD_STCK || (dmgtype AD_WRAP && !attacktype AT_ENGL) | — D-1849 pattern — import the export: `sticks` added to monmove.js's existing engrave.js edge (line 17; imports.mjs ALREADY, no new edge — the monmove↔engrave cycle pre-exists via hero_Deaf/wipe_engr_at), wrong twin delete
**D-3813** save.c savemon :871–875 (ebones blob: buflen + Sfo_ebones) + restore.c :362–366 (Sfi_ebone — one arm in serMon's replacer — `if (key === 'ebones') return val;` + C cites (fixed data schema, never a live struct; children are scalars + oldalign {type,record}).
**D-3812** `display.h:841–843` glyph_is_piletop_generic_obj (`> OFF && < OFF+FIRST_OBJECT-1`, FIRST_O — `js/display.js` only — piletop-generic is now C-exact (`> OFF && < OFF+FIRST_OBJECT-1`); normal_object gains C's third disjunct (`|| glyph_is_normal_piletop_obj`), keeping the whole-OBJ-bank range (documented superset of
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3819; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**This iter:** audit 2675–2683 done (9A/0D/0Q): queue regenerates from the committed board.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
