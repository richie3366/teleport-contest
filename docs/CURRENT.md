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
(audit **1192–1197**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `47+0.28/turn` (R² 0.79) |
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
Reviews 990–1082: 82 ACCEPT, 7 DEBT (map-named/pointed), 4 QUALITY-RISK all shipped/prepended (record: reviews/ + DIVERGENCE-INDEX).
Reviews 1089–1175: 84 ACCEPT, 0 Must-fix except 2 DEBT (1136 Hallucination import, 1137 save.js restore_waterlevel await) + 1 QUALITY-RISK prepended (1152 gloves literal).
Reviews 1176–1191: 16 ACCEPT, 0 Must-fix.
Reviews 1192–1197: 4 ACCEPT, 2 DEBT (1193 worn vision_recalc, 1197 disintegested lifecycle + genocide fire-and-forget), 0 Must-fix.
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

## Primary objective

**Suite 44/44** is the regression fortress. **The objective is the
scenario corpus** (`hidden-proxy status`): 262/540 PASS, scen-* 7/275.
Pop `LOOP-QUEUE.md` Must-fix (drained) then Open in order;
every row is a recorded C-vs-JS first
divergence with its probe. Do **not** pop map-omission singletons
(`LOOP-QUEUE.md` Deferred) while any corpus family is below 90 % PASS.
**Next cluster:** `mon.c` newcham wizard arms — dragon-armor ordinary arm / `mon_polycontrol` / RECORD `tt_doppel` entries still named (data.md:439). No corpus block — port the named family. Probe: `node scripts/brief.mjs tt_doppel`.
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2235 (index).**
<!-- recent:begin -->
**D-2235** `mon.c:5198–5207` (`case NON_PM`: `which_armor(mon, W_ARM)` + `Is_dragon_scales` → `Dragon — `select_newcham_form` gains the `cham === NON_PM` arm in C position (before the wizard gate/random tail): `which_armor(mon, W_ARM)` (already imported from `worn.js`; W_ARM joins the pre-existing `const.js` edge — no new 
**D-2234** `shknam.c:495–500` (`nlp == shklight && In_mines(&u.uz) && Is_special(&u.uz)->flags.town`  — `nameshk` gains the C early arm in C position (before the `nseed` computation, which C also skips): `nlpIn === shklight` (reference check — `shkinit` passes `shp.shknms`, and the lighting-store `shtypes` entry holds the 
**D-2233** `mcastu.c:174–179` (`mtmp->mcan || mtmp->mspec_used || !ml || m_seenres(mtmp, cvt_adtyp_to — `js/mcastu.js` — `castmu` condition gains `|| m_seenres(mtmp, cvt_adtyp_to_mseenres(adtyp))` in C order (draw-free disjuncts; AD_SPEL/CLRC map to `M_SEEN_NOTHING` so the new arm is a proven no-op on the spell-selection p
**D-2232** `trap.c:4618–4654` `acid_damage(obj)` (Null return; victim = hero when carried else OBJ_MI — `js/trap.js` — new `export async function grease_protect` (C branch order; Your→`pline('Your …')` house idiom, Monnam/s_suffix/Yobjnam2/vtense arms; sync `update_inventory()` per the water_damage greased-arm precedent; b
**D-2231** `mon.c` `lifesaved_monster` `:2838–2884`, `vamprises` `:2888–2987`, `logdeadmon` `:2995–30 — `js/mhitm.js` — new `set_mon_min_mhpmax` (m_lev+1 floor then caller minimum), async `lifesaved_monster` (cansee-gated plines, `mlifesaver`/`m_useup_mm`/`attacktype_mm` locals, `makeknown`, `check_gear_next_turn`, `wary_d
**D-2230** `eat.c:3877–3889` `maybe_finished_meal(stopping)` — `js/eat.js` — new `export async function maybe_finished_meal(stopping)` after `cant_finish_meal`, C branch/short-circuit order (occupation → usedtime>=reqtime → stopping-clear → eatfood → TRUE/FALSE); must live here — th
**D-2229** `timeout.c` nh_timeout ACID_RES + STONE_RES expiry arms — `js/eat.js` — new `export function eating_dangerous_corpse(res)` after `givit`, C branch/short-circuit order (occupation → piece → CORPSE → LOW_PM → carried/obj_here → res-specific `acidic(mons)/flesh_petrifies(mons)`); 
**D-2228** `dig.c:1596–1604` zap_dig u.dz arm — `js/dig.js` + `js/zap.js` only, control-flow, no new imports/edges (mksobj_at/xname/stackobj/newsym already imported at both sites): after `finish_losehp_done()`, return only if `game.program_state?.gameover` (true death
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2235; wrap `wildmiss` /
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
