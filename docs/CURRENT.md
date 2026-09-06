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

Score last measured: **2026-09-06** — full `sessions` at **D-1917**
(audit **879–887**, `29b2c5c5`). Fortress held 44/44: seed0030
**D-1816**, seed4500 `#wizintrinsic` deafness `[2]` **D-1817**. Scr
**11,405**/11,405, RNG **792,838**/792,838. Speed `54+0.43/turn`
(R² 0.85).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** |
| Speed label | `54+0.43/turn` (R² 0.85) |
| Role-init throws | **0 / 44** |

**Hidden-score proxy** (`docs/HIDDEN-PROXY.md`, re-scored 2026-09-06 at
D-1908): **255 / 265 PASS (96.2 %)** excl. 13 env-only rows;
RNG 99.61 %; screens 99.7 %. Top owners: `dog_invent` ×2 (parked) +
`dopush` (parked)/`mdrop_obj` (parked)/`show_conduct` (parked) ×1
(+ unattributed `!` ×2, `-` ×1, motd, level-change;
`suit_simple_name` closed by D-1905 wrap fix, `hitmsg` by D-1894).
Reviews **835–842** (D-1865…D-1922): 7 ACCEPT,
1 ACCEPT-WITH-DEBT, 0 Must-fix. Reviews **843–845** (D-1873…D-1922):
3 ACCEPT, 0 Must-fix. Reviews **846–853** (D-1876…D-1922):
8 ACCEPT, 0 Must-fix. Reviews **854–862** (D-1884…D-1922):
8 ACCEPT, 1 QUALITY-RISK (Cav wallify Must-fix, queued). Reviews
**863–870** (D-1893…D-1922): 7 ACCEPT, 1 QUALITY-RISK
(`domindblast` gaze blocks Must-fix, queued). Reviews **871–878**
(D-1901…D-1922): 7 ACCEPT, 1 QUALITY-RISK (`Inhell_pager`
hellish-flag Must-fix, queued). Reviews **879–887**
(D-1909…D-1922): 8 ACCEPT, 1 QUALITY-RISK (lava Wwalking
Must-fix, queued). Refresh on audit iters with `node scripts/hidden-proxy.mjs score`.

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
Prior pops closed: `mkmaze.c` val-*/sam-* stale rows (loaders stand since D-1852/D-1858, D-1906 audit); `uhitm.c` mhitm AD arms shipped D-1907.
**Next cluster:** `trap.c` mintrap — monster-trapped dispatch body (TOP30 honourable mention, 107/54; archived rows are rloc_to callers, not the body).
**Open stays hidden-score ordered** (`PORT-GAP-TOP30.md`).
**DUMPLOG retired (D-1776)** — do not re-enqueue.
**Keep D-0845…D-1922 (index).** Recent **D-1820:** `makemaz` `soko2-2`
from `dat/soko2-2.lua` (Sokoban 2 second variant; 50% blank → 0%).
Named: ensure_way_out; humidity `get_location`; `is_ok_location_dry`.
<!-- recent:begin -->
**D-1922** `trap.c` `mintrap` `:3733–3840` — `js/trap.js` — C-order full body: `!rn2(40) || (is_pit && m_easy_escape_pit(mtmp))` (short-circuit kept; the file-local `m_easy_escape_pit` and `sobj_at` reused, no new clones); boulder arm with `!rn2(2)`, `pline_mon` pu
**D-1921** `mhitu.c` `hitmu` `:1144–1267` — `js/mhitu.js` — C-order midnight arm (`is_undead(mdat) || is_vampshifter(mtmp)` from live `js/monsters.js`, `midnight()` from live `js/calendar.js`); knockback defender `game.youmonst` (flags still by value per the `js/m
**D-1920** `makemon.c` `grow_up` `:2049–2178` — `js/mhitm.js` — full C-order port: `newtype = little_to_big(oldtype)` (canonical `js/mondata.js` export, same-SCC import already present); victim arm with golem `Math.trunc(mhpmax/10)*10+10-1` (C integer division) and `i
**D-1919** `mhitm.c` `mattackm` `:292–592` — `js/mhitm.js` — local `mswingsm` (C `:1282–1297` order; `game.flags?.verbose !== false` repo idiom + local `Blind_slee()` + `mon_visible`; `is_pole`/`is_art(,ART_SNICKERSNEE)`/`dist2`/`mswings_verb`/`mhis`/`xname`/`Monna
**D-1918** `trap.c` `lava_effects` `:6794–6987` — `liveWwalking()` closure (same slot+flats+`Is_waterlevel` idiom as the snapshot) read at the three post-boots points (`if (Wwalking)` burns-you gate, sink-arm `else if (!Wwalking…)`, countermeasure `if (!Wwalking)`); ent
**D-1917** `were.c` `new_were` `:100–140` (`:129` `mon_break_armor(mon, FALSE)` before `:130` `possib — C-order wiring in `js/were.js`: `const mba = mon_break_armor(mon, false)` (canonical `js/worn.js` export, D-1914) then `possibly_unwield`, chained sync-or-async exactly like newcham `after_armor` (`if (mba) return Promis
**D-1916** `uhitm.c` `hmonas` `:5424–5860` (multi pre-count `:5436–5450` incl. `odd_claw=TRUE`; `use_ — C-order weaponless envelope in `js/uhitm.js`: shared-`dhit` discipline (WEAP + weaponless assign the outer; BREA/SPIT/GAZE reset 0); seduce keeps no-wakeup + `damageum(...,0)`; `wakeup` before the verb switch; per-aatyp 
**D-1915** `steed.c` `dismount_steed` `:575–822` (save_utrap `:583`; POLY `:618`, ENGULFED `:623`, BO — C-order completion in `js/steed.js`: save_utrap before the switch; BYCHOICE nameless Hallu rain (`Hallucination()`); local `stealth_now()` youprop.h-Stealth mirror for the `:665` FALSE→TRUE noisy-now edge (monmove.js own
<!-- recent:end -->
**Do not:** FORCE/RNG; FORCE tiles to "prove" a level-gen cause (RNG counts
are location-blind — D-1849); snapshot/restore grid rows to keep a tty leftover
(D-1831 `_snapshotStatusGrid`); skip D-1229…D-1922; wrap `wildmiss` /
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
