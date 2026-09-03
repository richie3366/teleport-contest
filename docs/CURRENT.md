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

Score last measured: **2026-09-03** — full `sessions` at **D-1781**
(`food_detect`). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `63+0.49/turn` (R² 0.855). Fortress held. Audit **728–737**:
all ten SHAs **ACCEPT-WITH-DEBT**; Must-fix empty. No public session
is Punished+Blind (D-1777), Punished-while-falling (D-1778),
farlooking a trapped chest/door (D-1779), level-porting by name
(D-1780), or reading food detection (D-1781) — those arms are verified
by direct probes, not the suite.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `63+0.49/turn` (R² 0.855) |
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

**Suite 44/44** held at D-1775. Map-driven fortress: named
omissions, not invented FAIL peels.
Save-oracle required for tagged restore/other-floor Open
(`save-oracle.mjs probe --omit`; `detect.c:findone` was untagged).
**Next cluster:** `detect.c` object_detect clear_stale_map caller
(named). Not food_detect.
**`end.c` DUMPLOG is retired, do not re-enqueue** (D-1776):
`nethack-c/macosx-minimal` passes no `-DDUMPLOG`, so every `end.c`
`#ifdef DUMPLOG` block is compiled out of the scored build, and the
surviving `DUMPLOG_CORE` `saved_plines[]` ring is write-only (only
reader is `report.c` crash path).
**Do not skip D-1531…D-1781 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1781.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1781 (index). Recent: **D-1781**
`detect.c` `food_detect` `:478` + `read.c` `seffect_food_detection`
— SCR_FOOD_DETECTION / SPE_DETECT_FOOD were the "not implemented"
default. Confused **or cursed** searches POTION_CLASS; nothing-found
returns `!stale`; blessed sets `u.uedibility` (consumers unported).
**D-1780**
`dungeon.c` `lev_by_name` `:2096` + `find_branch` `pd == NULL`
`:322` — level-tport by name; gehennom·hell→valley alias exists so
the bare branch name does not land on the castle; gates are
`dlev_in_current_branch` and wizard-or-VISITED (both ledger ends).
**D-1779**
`pager.c` `trap_description` `:164` over `detect.c`
`trapped_chest_at` `:135` / `trapped_door_at` `:178` — both draw
`rn2(20)` under Hallucination, so chest-before-door is RNG order.
**D-1778**
`ball.c` `ballfall` `:42` — `gets_hit` `rn2(5)` is drawn **before**
`ballrelease` and short-circuits (no draw) when the ball is on the
hero's spot or is `uwep`; callers `do.c:1805` + `trap.c:1955`.
`do_wear.c` `hard_helmet` `:567` is one export (`js/do_wear.js`,
with `is_helmet`); six clones deleted. **D-1777**
`ball.c` Blind `move_bc` `:436` felt/glyph arms + `unplacebc_core`
`:146` restore + `Is_waterlevel` swallow. `u.bglyph`/`u.cglyph` are
remembered **cells** now (`levl_glyph_at` / `set_levl_glyph`), not int
ids. `movobj` exported from `js/hack.js`. **D-1776**
`mondata.c` `pronoun_gender` `:1188` + `you.h:317–331`
`mhe`/`mhim`/`mhis`/`noit_*` — one home in `js/mondata.js`, eight
clones deleted. Hallu `rn2(4)` is drawn **first**; `PRONOUN_NO_IT`
overrides only `canspotmon`. shk `getcad`/partial-pay wired.
**D-1775**
`detect.c` `findone` `:1637` flash+`foundone` on SDOOR
(`recalc_block_point`) / SCORR (`unblock_point`) / trap / dummytrap,
then `seemimic` / hider `mundetected=0` / `map_invisible` /
`unmap_invisible`; `foundone` `:1607` seenv SVALL + viz pulse;
`display.c` `flash_glyph_at` `:1304`; async `do_clear_area`.
**D-1774** `display.c` `newsym` `:1032` I-arm `lev->glyph` (not gbuf);
`unmap_invisible`; `hack.c` fight_empty `glyph_at`; `do_attack`
atk_done; mondead. Named: `ridden_mon_to_glyph` usteed,
FOUND_FLASH_COUNT==0 `tmp_at` path. **D-1773** `gold_detect`.
**D-1772** `peacefuls_respond` Halt. **D-1771** invent `useupf`.
**D-1770** zap `delete_contents`. **D-1769** Punished `set_bc`.
**D-1768** Unaware talk=FALSE. **D-1767** `show_glyph` gbuf stamp.
D-1766…D-1755 (index).
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1781 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1781 (index). No generic `dknown` on
`otyp < FIRST_OBJECT`. No dump_fmtstr / paniclog filesystem. DUMPLOG retired (D-1776).
**Cohort after shared change:** green + seed1500/1800/0012/0004/0007
+ seed2200 + seed0383 + strict lengths.

## Parked (diagnose only — do not implement)

| ID | Why parked |
|----|------------|
| **D-0006** | seed1800 pet movement — needs C state/candidate capture |

## Pointers

`NOTES.md` · `LOOP-QUEUE.md` · `DIVERGENCE-INDEX.md` · `C-JS-MAP.md` ·
journal tail · `archive/PROGRESS-HISTORY.md`.

## Handoff rule

Update **this file** when score, green gate, or primary objective changes.
On every 10th global iteration, write the C-fidelity review **and**
refresh Score from a full `sessions` run.
Journal; divergence + index; one C-JS-MAP section. No completed D-lists.
