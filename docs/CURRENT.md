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

Score last measured: **2026-09-03** — full `sessions` at **D-1790**
(`monverbself`; fortress held through **D-1792**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `41+0.33/turn` (R² 0.855). Fortress held. Re-audit **738–754**
is **paid off**: **D-1786** closed 747 (`u.uball` ballfall callers),
**D-1787** closed 748 (lookat `glyph_to_trap`), **D-1788** closed 750
(`SPE_DETECT_FOOD` → `seffects`), **D-1789** closed 752 (keepdogs
walks a snapshot). Must-fix is **empty**; pop the first Open.
No public session is Punished-while-falling,
farlooking a trapped chest/door, level-porting by name, food/object
detect, `#cast` food-detect, or leaving a level with a stuck leashed
pet — probes, not the suite.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `41+0.33/turn` (R² 0.855) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383, seed0030, seed4500,
seed0014-dequa-fountain-explore.

**Notable non-PASS:** none (local public fortress).

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

**Suite 44/44** held at D-1792. **D-1792** shipped the first Open
(`timeout.c` `nh_timeout` property dialogues + `attrib.c` `stone_luck`
+ `eat.c` `Popeye`; JS skipped the countdown plines and luck timeout).
Must-fix is **empty** — pop the first **Open**
row. Save-oracle required for tagged restore/other-floor Open
(`save-oracle.mjs probe --omit`).
**Open is now hidden-score ordered** — `docs/PORT-GAP-TOP30.md` ranks
the 30 C functions a session we cannot see is most likely to hit
(reach from the turn loop x call breadth x RNG/message loudness x
coverage gap; `node scripts/port-coverage.mjs`). Queue Open = rows
1–12 of that file, in order.
**Next cluster:** `weapon.c` `dmgval` blessed/axe/silver/`artifact_light`
bonus `rnd()` + `greatest_erosion` (RNG). Not `spec_abon`.
**`end.c` DUMPLOG is retired, do not re-enqueue** (D-1776):
`nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so every `end.c`
`#ifdef DUMPLOG` block is compiled out of the scored build, and the
surviving `DUMPLOG_CORE` `saved_plines[]` ring is write-only (only
reader is `report.c` crash path).
**Do not skip D-1531…D-1792 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1792.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1792 (index). Recent: **D-1792**
`timeout.c` `nh_timeout` `:588` dialogues + `attrib.c` `stone_luck`
`:421` + `eat.c` `Popeye` `:3915` — luck still runs when invulnerable;
stoned/slime/vomiting/choke/sickness/levitation/phaze before uprops `--`.
Named: `region_dialogue` / `sleep_dialogue`; STONED/SLIMED `done_timeout`
/ `slimed_to_death`; surface() Underwater bottom. **D-1791**
`eat.c` `newuhs` `:3362` — messages / faint / starve / ATEMP /
`end_running`; `unfaint` afternmv; `gethungry` async. Named: sit.js
lay-egg `morehungry` still not awaited; `polyself.c` / `cant_finish_meal`
callers; `findtravelpath` `end_running(FALSE)`. **D-1790**
`mon_nam_too`/`monverbself` one home; makeplural as C writes it
(hallu steed “Them”/“Theys”). **D-1789** `keepdogs` snapshot walk,
no `stay` rebuild. **D-1788** `#cast` DETECT_FOOD `seffects`.
**D-1787** lookat `glyph_to_trap(glyph_at)`. **D-1786** ballfall
`u.uball`. D-1785…D-1755 (index).
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1792 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1792 (index). No generic `dknown` on
`otyp < FIRST_OBJECT`. No dump_fmtstr / paniclog filesystem. DUMPLOG retired (D-1776).
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `PORT-GAP-TOP30.md` ·
`DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
