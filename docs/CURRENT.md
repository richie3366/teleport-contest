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
Ledger @1311dbb62: 5329 pinned-C functions — ported 4540 · partial 114 · split 164 · by-design 396 · open 115 (611 declared by seed). Measured: ok 3908, partial 681, thin 236, missing 504. `node scripts/ledger.mjs summary`.
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
**Keep D-0845…D-3764 (index).**
<!-- recent:begin -->
**D-3764** `uhitm.c:616` known_hitum `if (weapon && (weapon->oclass == WEAPON_CLASS || is_weptool(wea — gate is now `weapon.oclass === WEAPON_CLASS || is_weptool(weapon)` — the live `js/wield.js:116` export, already imported at `js/uhitm.js:53` (no new edge; same call shape as the :1048/:1053/:1881/:2121 gates).
**D-3763** `youprop.h:202–204` Displaced ≡ HDisplaced || EDisplaced (stored u.uprops bits — deleted the invented live-cloak arm in all 3 clones (stored HDisplaced/intrinsic/extrinsic checks kept); doc cites youprop.h + the gamestate desync with the measured values; removed 2 now-unused CLOAK_OF_DISPLACEMENT con
**D-3762** `quest.c on_start` `:24–36` (first home visit `qt_pager("firsttime")`, revisit `qt_pager(" — `js/questpgr.js` only — three bodies verbatim from quest.lua (`cat -A`-verified: double space after «hill.»/«%H.» in Val text and synopsis; conversions %H/%x/%n all previously shipped) + one QUEST_MSG_META firsttime {out
**D-3761** `do.c` goto_level `:1615` check_special_room(TRUE) … `:1623–1624` keepdogs … `:1625` recal — reordered the departure block to C order — check_special_room(true) → unplacebc → reset_utrap → fill_pit → set_ustuck → set_uinwater → uundetected → keepdogs → recalc_mapseen → vision_recalc(2); no other relative-order c
**D-3760** `teleport.c` teleds `:490–491` ux0/uy0 snap then `:525` u_on_newpos → `dungeon.c` u_on_new — teleds_simple awaits the live u_on_newpos export (`./mklev.js`; imports.mjs SAFE, hoisted fn, cycle-safe); keeps the ux0/uy0 snap (C `:490–491`), newsym pair, vision_recalc, botl; dismount_steed awaits the now-async help
**D-3759** `mhitm.c:1121–1207` mon_poly tail (`:1203–1204` `if (mdef->data != oldform && magr != &gy. — `js/mhitm.js` mon_poly — capture `oldMndx` at entry (`oldform?.mndx ?? mdef?.mnum ??
**D-3758** `sp_lev.c:2356–2389` create_object Medusa arm (`:2374` reject `mongone(was)`, `:2387` acce — `js/mklev.js` — both reached copies call `await mongone(was)` at both disposals in C order with C cites (reject + `was = null`; accept after invent transfer + owt); `load_medusa_1/2/3/4` async, all 5 helper call sites aw
**D-3757** `makemon.c:1353–1368` (Vlad mitem; `cham = NON_PM`; `if (!Protection_from_shape_changers & — `js/makemon.js` — guard is now `!Protection_from_shape_changers() && mcham !== NON_PM` (C order, C-cited); imports the live display.js helper (module already imported — no new edge, imports.mjs ALREADY).
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-3764; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007/2200/0383 + strict.
**Next:** fprefx 95408@611 (cliffs head).
**This iter:** audit 2622–2630.

## Parked (diagnose only — do not implement)

Index: `LOOP-QUEUE.md` **Parked** (writer or `[measure]` row when one heads the cliffs block). Never re-pop D-0006 / `dog_invent` without C state.

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `LEDGER.md` · `HIDDEN-PROXY.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md`

## Handoff rule

Update on score/gate/objective changes. One D-entry + `- **Ledger:**` bullet; finish writes the rest.
