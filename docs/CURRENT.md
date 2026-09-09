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

Score last measured: **2026-09-10** — full `sessions` on the working tree
(audit **1206–1213**).
Fortress **44/44** (no throws).
Scr **11,405**/11,405, RNG **792,838**/792,838, speed
`47+0.29/turn` (R² 0.79).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `47+0.29/turn` (R² 0.79) |
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
Reviews 1198–1205: 7 ACCEPT, 1 DEBT (1202 u_collide_m limbo target — C reassigns mtmp to the remaining occupant, JS limbos the original; near-dead path, one-line fix), 0 Must-fix.
Reviews 1206–1213: 8 ACCEPT, 0 Must-fix.
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
**Next cluster:** `mon.c` xkilled — popped 2026-09-10, parked STALE with no js/ (duplicate of archived D-1796 row; all three named gates live C-cited in `js/uhitm.js`/`js/mon.js`; sole corpus session has owner null + identical toplines except More; `verify xkilled` vacuous) — next iter pops `LOOP-QUEUE.md` Open head (`attrib.c` exercise).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-2247 (index).**
<!-- recent:begin -->
**D-2247** `uhitm.c:2742–2786` (`mhitm_ad_acid`: mhitu arm = `hitmsg`, then `!mcan && !rn2(3)` → `Aci — `js/mhitu.js` — new `mhitm_ad_acid_u` / `mhitm_ad_dren_u` / `mhitm_ad_conf_u` in C branch/short-circuit order (acid `| 0` int idiom on the resistance/mspec fields; dren negated-before-hitmsg like the sibling `_u` arms; c
**D-2246** `allmain.c:194–201` (`if (svc.context.bypasses) clear_bypasses();` then sanity `:197–198`, — `js/worn.js` — module-local `clear_bypass` (C staticfn: same-file caller only; Array-or-nobj walk + `Has_contents`/`cobj` recursion) + new `export function clear_bypasses()` in C order (fobj/invent/migrating_objs/`level.
**D-2245** `mon.c:5078–5154` (`wiz_force_cham_form`: `Change %s @ %s into what?` prompt from `noit_mo — `js/makemon.js` — new `export function mkclass_poly(mletClass)` after `mk_gen_ok` in C order (same-file `mk_gen_ok`, `rn2(9)`/`rnd`, Inhell via the dungeon-hellish-flag idiom per D-0747, S_LICH string gate per the `mkcla
**D-2244** `mkobj.c:1703–1736` (`maybe_adjust_light`: `new_range = arti_light_radius(obj)`, `delta =  — `js/mkobj.js` — new `export async function maybe_adjust_light(obj, old_range)` in C branch/short-circuit order (`| 0` int idiom on the delta; `await obj_adjust_light_radius`; `get_obj_location(obj, 0)` null-gate = C FALS
**D-2243** `steed.c:851–873` (`poly_steed`: `if (!can_saddle(steed) || !can_ride(steed)) dismount_ste — `js/steed.js` — new `export async function poly_steed(steed, oldshape)` in C branch/short-circuit order (`!can_saddle || !can_ride` → `await dismount_steed(DISMOUNT_FELL)`; else `x_monnam(steed, ARTICLE_YOUR, null, SUPPR
**D-2242** `detect.c:780–785` (`object_detect`: `You("detect the %s of %s.", ct ? "presence" : "absen — `js/detect.js` — deleted the `flush_topl_more()` call between the detect pline and the `!ct`/`browse_map` branch and replaced it with the C cite (`detect.c:780` → `getpos.c:843–846`, two-space join, same-class-as-D-2081 
**D-2241** `invent.c:2636–2647` (`fully_identify_obj`: `makeknown`, oartifact `discover_artifact`, `o — `js/invent.js` — `fully_identify_obj` gains the C tail arm in C position (after `set_cknown_lknown`, last in the body): `(otmp.otyp | 0) === EGG && (otmp.corpsenm | 0) !== NON_PM` (same `| 0` idiom as the neighboring `ST
**D-2240** `hack.c:3233–3309` (`pooleffects`: leave-water `:3236–3265` — `js/pickup.js` — full C-order port: Wwalking/Swimming/Amphibious/Breathless computed once from the same-file `pickup_checks` uprops+H/E-flat idiom (+ `is_swimmer(usteed.data)` steed disjunct per C `:266`); leave-water bl
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-2247; wrap `wildmiss` /
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
