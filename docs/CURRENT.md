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
notable non-PASS. Do not invent suite totals from one focused session.

Score last measured: **2026-09-09** — full `sessions` on the working tree
(audit **1146–1151**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`59+0.37/turn` (R² 0.78).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `60+0.36/turn` (R² 0.79) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06
after the **scenario cohort** landed): **262 / 540 PASS (48.5 %)** excl.
13 env-only rows; RNG 95.3 %; screens 88.3 %. The 275 new `scen-*`
sessions (wish/genesis/poly/intrinsic/death/kit/tour/normal, authored on
the C recorder by `scripts/scenario-gen.mjs`) pass **7 / 275**, RNG
76.6 %, screens 58.3 % — the same shape as the live held-out score
(**7 / 44**, RNG 22.8 %, screens 45.4 % on the public leaderboard,
2026-09-06). The old mutant families sit at 255/278 and are saturated:
they no longer pick work. Top owners: `welcome`→`calendar.c getlt` ×51,
`do_statusline2` ×11, `break_armor` ×9, `exercise` ×8, `enlightenment`
×7, `wiz_intrinsic` ×7, 4 `ReferenceError` throws ×8 (Must-fix).
Reviews 990–1073: 75 ACCEPT, 5 ACCEPT-WITH-DEBT (debts map-named), 4 QUALITY-RISK Must-fix all shipped/prepended (full record: reviews/ + DIVERGENCE-INDEX).
Reviews 1074–1082: 7 ACCEPT, 2 ACCEPT-WITH-DEBT (debts map-pointed), 0 Must-fix.
Reviews 1089–1132: 44 ACCEPT, 0 Must-fix.
Reviews 1133–1137: 3 ACCEPT, 2 ACCEPT-WITH-DEBT (debts review-pointed: 1136 Hallucination import source, 1137 save.js restore_waterlevel await), 0 Must-fix.
Reviews 1138–1145: 8 ACCEPT, 0 Must-fix.
Reviews 1146–1151: 6 ACCEPT, 0 Must-fix.
Refresh on audit iters with `node scripts/hidden-proxy.mjs score --jobs 8`
(≈200 s); when every family is ≥ 85 % PASS, grow it first:
`node scripts/scenario-gen.mjs --n 120 --seed <iter×100>`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none — fortress 44/44.
Fortress report `docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `eat.c` start_tin — blocks 1/553 corpus sessions (first at step 118): C «Using your 6 orcish daggers you try to open the tin.--More--» vs JS «Using your orcish daggers you try to open the tin.--More--». Probe: `node scripts/hidden-proxy.mjs verify start_tin` (scen-normal-Rogue-92115).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2187 (index).**
<!-- recent:begin -->
**D-2187** `eat.c:1769` `start_tin` (`pline("Using %s you try to open the tin.", yobjnam(uwep, (char  — `js/objnam.js aobjnam` prepends `` `${quan} ` `` when `((quan ?? 1)|0) !== 1` (missing quan reads as 1, same guard as `simpleonames`/`xname`; C always sets quan).
**D-2186** `objnam.c:5492–5509` `cloak_simple_name` (ROBE→"robe", MUMMY_WRAPPING→"wrapping", ALCHEMY_ — trap.js deletes the four stubs and imports the canonicals — `helm_simple_name`/`cloak_simple_name`/`suit_simple_name` from `./do_wear.js`, `gloves_simple_name` from `./objnam.js` (both edges already exist; `imports.mjs -
**D-2185** `mcastu.c:490–501` `mcast_disappear` (`canseemon` → `pline_mon(mtmp, "%s suddenly %s!", Mo — `mon_visible` now gates on same-file `hero_See_invisible()` (flats + sticky + `uprops[SEE_INVIS]`, C `youprop.h:152`); mcastu file-local `See_invisible()` extended with `uprops[SEE_INVIS]` intrinsic/extrinsic (`SEE_INVIS
**D-2184** `uhitm.c:1603–1634` `hmon_hitmon_splitmon` (called `:1868` after pet, before msg_hit); `mh — `js/uhitm.js` — new `hmon_hitmon_splitmon` block between pet and msg_hit with C's exact guards (black/brown pudding, post-damage `mhp>1`, `!mcan`, on-map, obj==uwep-or-twoweap-uswapwep, IRON/METAL (`objclass.h:24–25` loc
**D-2183** `eat.c doeat :2998–3024` — port the switch in C order (before reqtime/rotten): `oc_material === MAT_FLESH` → unvegan++ (+ `violated_vegetarian()` with the guilt pline on true, same call-site convention as `eatcorpse`, for non-EGG); otyp in the egg
**D-2182** `wield.c ready_weapon :168–273` — port in C order — `u.uarms && bimanual(wep)` gate with the `is_sword`/`BATTLE_AXE` noun returns 0 (C `ECMD_FAIL` takes no turn → 0 in this file's 0/1 scheme, matching `cmd.js 'w'` truthy-`move` mapping); full `will_weld`
**D-2181** `cmd.c` rhack ECMD tail `:3810–3826` (`(res & (ECMD_OK|ECMD_TIME)) == ECMD_OK` → `reset_cm — `^W` arm captures `wishRes` and mirrors the C tail verbatim (CANCEL|FAIL → `reset_cmd_vars(true)`; else not-TIME → `reset_cmd_vars(multi < 0)`; TIME → `move = 1` — same shape as `rhack_dispatch_bound`), and `wiz_wish` re
**D-2180** `options.c:7329–7341` (`fruitadd(pl_fruit)` then `obj_descr[SLIME_MOLD].oc_name = "fruit"` — `js/options.js init_fruit_chain` now sets the SLIME_MOLD name entry to `"fruit"` (idempotent, before the existing early-return — mirrors C init order fruitadd-then-rename; display is unaffected, it already uses ffruit fn
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2187; wrap `wildmiss` /
`msg_mon_movement` as `pline_mon`; rewrite `confer_oc_oprop`;
trailing `confdir` in shared `getdir`; hide `[2]` in the menu
painter; reopen D-1816 `mattacku` gameover abort; D-0480 glyph serialize
(D-0483); reset_glyphmap / notice_all_mons / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE; dump_fmtstr /
paniclog filesystem; extend §1.2 (D-0933); chase LB in-loop.
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |
| **dog_invent** | misattributed `"%s picks up %s."`; both hits are `mpickstuff`. Needs C `movement[]`. Do not pop |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
