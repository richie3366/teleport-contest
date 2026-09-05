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

Score last measured: **2026-09-05** — full `sessions` at **D-1864**
(audit **827–834**, `8ab2608f`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `48+0.38/turn`
(R² 0.85).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `48+0.38/turn` (R² 0.85) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-05 at
D-1864): **236 / 265 PASS (89.1 %)** excl. 13 env-only rows;
RNG 99.58 %; screens 99.5 %. Top owners: `mkswamp`/
`maybe_generate_rnd_mon`/`climb_pit`/`m_move`/`mhitm_mgc_atk_negated`/
`dopush`/`zoo_mon_sound`/`minimal_xname` (+ parked `dog_invent`, `!`).
Reviews **827–834** (D-1857…D-1867): 5 ACCEPT, 2 ACCEPT-WITH-DEBT,
1 QUALITY-RISK, 1 Must-fix. Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383,
seed0014-dequa-fountain-explore, seed0030-ten-diverse-deaths,
seed4500-knight-coverage.

**Notable non-PASS:** none. Fortress report
`docs/2026-09-04-fortress-regression-42-44.md` (both Must-fix shipped).

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

**Suite 44/44** at **D-1851**. `dofire` 2 corpus PASS: empty-quiver `You()` NEED_MORE
before fire getobj (D-0484 skip reverted).
**Next cluster:** Open `allmain.c` maybe_generate_rnd_mon — 1 corpus block; C `rn2(70)` vs JS `rn2(50)`.
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1867 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1867** `allmain.c` `maybe_generate_rnd_mon` `:162–168` (`!rn2(udemigod ? 25 : (depth(&u.uz) > dep — `js/dungeon.js` `save_dungeon_topology()` / `restore_dungeon_topology()` over `LEVEL_MAP` + quest/sokoban/mines/tower/tutorial dnums (mirrors `struct dgn_topology`); `dosave0` writes `payload.topology_levels`; `try_resto
**D-1866** `options.c` `initoptions_init` `:7279` (`iflags.menuinvertmode = 1` — default `menuinvertmode: 1` in `g.iflags` init (rc `...opts.iflags` spread still overrides) + parse `OPTIONS=menuinvertmode:N` colon-compound per `optfn_menuinvertmode` do_set (atoi, keep prior unless 0–2).
**D-1865** `weapon.c` `dmgval` `:215` (`struct permonst *ptr = mon->data` — `dmgval(otmp, game.youmonst)` + C-citation comment (`dmgval(otmp, mdef)`, `weapon.c:215`).
**D-1864** `uhitm.c` `mhitm_ad_phys` mhitu arm `:4038–4126` (AT_WEAP+otmp: corpse `do_stone_u`/done ` — port the mhitu AT_WEAP arm in C order (corpse `do_stone_u` via the file-local clone with the `u.Stoned || u.HStoned` guard; GOP arm; `artifact_hit` dmgBox pattern from `mhitm.js:1187` with `game.youmonst` defender + `gam
**D-1863** `vision.c` `vision_recalc` `:609–622` (`u.utrap && u.utraptype == TT_PIT` → only the immed — port the TT_PIT 3×3 arm in C order (row `continue`/`break`, direct `next_rmin/rmax` assign, xray/nv/lights/update flow untouched) + add the post-`rhack`/`deferred_goto` `vision_full_recalc` consume in `moveloop_core` (mi
**D-1862** `artifact.c` `spec_applies` `:1008–1060` SPFX_ATTK switch (via `weapon.c` `hitval` `:184`  — port the six ATTK resists arms in C order — hero side `Fire/Cold/Shock/Drain_resistance()` (newly exported from `js/zap.js`) + Poison/Stone H/E/sticky flats; monster side `resists_fire/cold/elec/poison` (newly exported f
**D-1861** `dat/themerms.lua` Garden fill contents (`numpoints/6` wood-nymph loop, `percent(30)` foun — port `themeroom_fill_garden` (nymph count `(numpoints/6)|0`, `splev_room_monster(croom,'wood nymph')` + `msleeping=1`, `percent(30)` fountain, queue `{handler:'make_garden_walls'}` with a fresh `selection_from_mkroom`); 
**D-1860** `mkroom.c` `fill_zoo` `:276–452` (COCKNEST `:402–412` `if (!rn2(3)) mk_tt_object(STATUE)`  — port `antholemon()` (ubirthday%3 + difficulty, `G_GONE` retry, null if all gone, no RNG) + `PM_SOLDIER_ANT`/`PM_FIRE_ANT`/`PM_GIANT_ANT` consts; add the ANTHOLE pm arm; add the COCKNEST statue arm and ANTHOLE food arm in
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1867; wrap `wildmiss` /
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
