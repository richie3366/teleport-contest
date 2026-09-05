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

Score last measured: **2026-09-05** — full `sessions` at **D-1840**
(audit **794–810**, `bf310d98`). Fortress held: seed0030 **D-1816**,
seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `43+0.33/turn`
(R² 0.853).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `43+0.33/turn` (R² 0.853) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-05 at
D-1840 `bf310d98`): **209 / 265 PASS (78.9 %)** excl. 13 env-only rows;
RNG 99.27 %; screens 98.6 %. Top owners: `lookat` 4 · `do_statusline1` 4 ·
`level_tele` 3 · `mineralize`/`summonmu`/`getpos`/`inuse_classify`/`dofire` 2.
D-1831’s `process_menu_window` 12 cleared by D-1832 (review 801 QUALITY-RISK,
not live Must-fix). Refresh on audit iters with
`node scripts/hidden-proxy.mjs score`.

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

**Suite 44/44** at **D-1841**. Open `mkmaze.c` `makemaz` `fakewiz1`/`fakewiz2` from `dat/fakewiz{1,2}.lua` shipped (Wizard-of-Yendor fake-tower path).
**Next cluster:** Open `botl.c` `do_statusline1` — 4 corpus blocks; leftover WIN_STATUS under item-action menu (same step as D-1833 re-attr).
Save-oracle for tagged restore Open (`save-oracle.mjs probe --omit`).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1841 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1841** `mkmaze.c` `makemaz` `:1126–1223` (`load_special(protofile)`); `sp_lev.c` `load_special` ` — port both lua bodies: mazegrid + center map + `l_levregion`/`l_teleport_region` while map origin is set, `splev_mazewalk(8,5,east)`, fakewiz1 irregular OROOM + portal→wizard3, shared monsters/traps, fakewiz2 amulet, `hel
**D-1840** `selvar.c` `selection_filter_percent` `:223–245` (`rn2(100) < percent` per set cell, x-out — port Ice (`des.terrain` ICE + `percent(25)` melt-ice timers), Boulder / Spider / Trap (`percentage(30)` then y-outer iterate).
**D-1839** `role.c` `roles[]` `:30–573` (`homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti`); `que — copy C `roles[]` `homebase`/`intermed`/`ldrnum`/`guardnum`/`questarti` for the remaining nine roles; Arc `PM_STUDENT` and Bar `PM_CHIEFTAIN` `guardnum`.
**D-1838** `hack.c` `pickup_checks` `:3788–3872` (uswallow tongue/`loot_mon`; pool/lava dive; `!OBJ_A — port the C body: furniture-specific nothing-msgs (stairs affixed), pool/lava reach, swallow tongue/`-2`, pit-aware `can_reach_floor`.
**D-1837** `pickup.c` `doloot` `:2166–2174` (`gl.loot_reset_justpicked`); `doloot_core` `:2178–2346`  — `doopen_indir` returns `doloot()` on self/down unless a closed door is here.
**D-1836** `sp_lev.c` `build_room` `:2807–2833` (`(!r->chance || rn2(100) < r->chance) ? r->rtype : O — nested `des.room` via `splev_des_room`/`splev_build_room` (chance then `create_subroom`) for those five rooms.
**D-1835** `invent.c` `look_here` `:4162–4177` (`!skip_objects` seen `t_at` / `visible_region_at` → ` — `look_here` plines the seen trap / visible region before the object list.
**D-1834** `invent.c` `getobj` `:1751–2089` (`:1912–1914` empty `!forceprompt`; `:2058–2062` missing  — `dowear`/`doputon`/`dothrow`/`dodrink`/`doremring` call live `getobj`.
<!-- recent:end -->
**Do not:** FORCE/RNG; snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1841; wrap `wildmiss` /
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

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `HIDDEN-PROXY.md` · `PORT-GAP-HELDOUT.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
