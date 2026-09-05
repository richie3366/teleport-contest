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

Score last measured: **2026-09-05** — full `sessions` at **D-1883**
(audit **846–853**, `c9e049a8`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `45+0.36/turn`
(R² 0.86).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `45+0.36/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-05 at
D-1883): **251 / 265 PASS (94.7 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`itemactions`/`mdrop_obj` (parked)/
`readobjnam_postparse1`/`do_statusline1`/`hitmsg`/`show_conduct`
(parked) ×1 (+ unattributed `!` ×2, `-` ×1, motd, level-change).
Reviews **835–842** (D-1865…D-1884): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1884):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1884):
8 ACCEPT, 0 Must-fix. Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
**Next cluster:** Open `iactions.c` itemactions — 1 corpus block screen-first at step 853 («Do what with the cloak of magic resistance?» vs same-plus; explore-seed0360-wizard-world-tour-5dfef5c4; new symptom, distinct from archived D-1833 Engrave/Write).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1884 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1884** `iactions.c` `itemactions` W arm `:631–647` (`armcat_to_wornmask(objects[otyp].oc_armcat)` — exported `armcat_to_wornmask` from `js/worn.js` (C `worn.c` home, same 7-arm switch over the module-local `ARM_*`); added file-local `cloak_simple_name` / `boots_simple_name` / `shield_simple_name` plus exported `armor_s
**D-1883** `uhitm.c` `erode_armor` `:126–185` (`rn2(5)` slot loop; case 1 body-armor always breaks) + — exported `erode_armor` from `js/mhitm.js` (same body, C cite `:126–185`; `passivemm` caller updated); ported the `which_armor` youmonst slot table in `js/worn.js` (`u.uarm`/`uarmc`/`uarmh`/`uarms`/`uarmg`/`uarmf`/`uarmu`
**D-1882** `objnam.c` `xname_flags` ROCK_CLASS STATUE `:802–814` — ported the C Snprintf envelope in `pretty_base` with C citations — `obj_pmname_corpse` for the pm name, `type_is_pname_objnam ? "" : the_unique_pm ? "the " : just_an(pmname)` for the inner article, `Role_if(PM_ARCHEOLOGI
**D-1881** `mdlib.c` `version_id_string` `:316–344` (`%s NetHack%s Version %s%s - last %s %s.` over P — `js/version.js` ports `mdlib_version_string`, `version_id_string`, `version_string`, `getversionstring` (pure, no imports; existing VERSION exports kept for `const.js`); `js/pager.js` adds `doversion` (menu_requested → `
**D-1880** `getpos.c` `getpos_help` `:167–307`, tail `:244–299` — ported the tail in C order with C citations — live `getpos_getvalid`/`getpos_hilitefunc` arms (module state installed via `getpos_sethilite`), `skip_non_mons` as a `skipNonMons` boolean with the tail running under `!terr
**D-1879** `win/tty/wintty.c` `erase_menu_or_text` `:966–985` — the three dismiss sites now `await dismiss_nhw_menu({ keep_status: true })` — corner takes the `docorner` path (status kept, C-cited comment), fullscreen stays byte-identical to before (`docrt()` + flush, no `clear_commi
**D-1878** `exper.c` `pluslvl` `:340–368` — ported the three C livelog arms in C order with C comments: `pluslvl` snapshots `count_achievements()`, records the rank achievement, logs `%sgained experience level %d` with the pre-update `ulevelpeak` `re` prefix only 
**D-1877** `win/tty/wintty.c` `process_menu_window` default arm — split the arm — ESC still dismisses (returns `'q'` → `ECMD_OK`, same outcome as C cancel); `q` now `tty_nhbell()` + `continue`, with C citation.
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1884; wrap `wildmiss` /
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
