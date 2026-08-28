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

Score last measured: **2026-08-28** — full `sessions` at **D-1566**
HEAD `72735008` (**audit #1960**; next **#1970**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `38+0.31/turn` (R² 0.847). Fortress held: seed0367 FULL.
Prior audit **#1950** was 44/44 at `0f5e4df5`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `38+0.31/turn` (R² 0.847) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed4500, seed2200, seed0383.

**Notable non-PASS:** none.

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

**Suite 44/44** fortress after audit **#1960**. **Next cluster:**
Open `vision.c` `vision_recalc` xray IN_SIGHT (named). Not howmonseen.
**Do not skip D-1531…D-1570 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1570.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1570 (index). Recent: **D-1570**
`worm.c` cutworm / place_wsegs (known_hitum slice_or_chop +
thitmonst chopper; not worm_known / redraw_worm).
Prior: **D-1569** pickinv hands/xtra (`getobj_hands_txt`).
**D-1568** eat/read/zap/tin NOFLAGS.
Older D-1531…D-1568 live in the
index — do not re-paste.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
skip D-1229…D-1570 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / `restore_artifacts`.
No trailing `confdir` in shared `getdir`. throw keeps
`getdir_cmdassist`. Latebound `body_part` (no wield/pickup →
polyself). No fourth town gnome. No makemon→hack/`artifact`/
`minion` (use `hellish`). Do not delete emin. `#altdip` stays
INTERNALCMD. No dog→mklev `somexy`. Do not zero `cspfx` on
W_ART. Do not stub `make_happy_shk` pacify-only. No
bones→options fruitadd. No ghostfruit `current_fruit`. Do not
skip `o->lit` Light source. Do not stub furnsyms 0..5
(D-1543). `namefloorobj` D-1555; mhidden D-1554. No static
uhitm→pager. Do not skip `detect_wsegs` show_glyph or compare
`data === mons()`. Do not skip `worm_known` (D-1548) or trap
`monkilled` (D-1550). cutworm is D-1570. Do not glue
`redraw_worm` / `vision_recalc` xray IN_SIGHT. `howmonseen` is D-1562. Do not
skip `tamedog` `wake_nearto` or glue FULL_MOON S_DOG / ustuck.
Remembered otyp does not beat a displayed mon glyph (D-1547).
Do not skip canned CMDQ_INT (D-1551), Eyes `is_plural`
(D-1552), splev amask (D-1553), DELPHI (D-1556), `block_point`
(D-1557; not `recalc`), SEARCH/REGEN/XRAY (D-1558), pickinv
`&ctmp` (D-1559), `finish_splitting` (D-1560), stash ALLOWCNT
(D-1561), `do_repeat` CQ_REPEAT (D-1563), Protection/`made_fruit`/Plan-B
(D-1564). `place_monster` 2D is D-1565. `rndmonst_adj` rogue/elem
is D-1566. `'r'` reversed is D-1567. Eat/read/zap/tin
NOFLAGS is D-1568. Pickinv hands/xtra is D-1569. Do not glue
`redraw_worm` / force_invmenu redo / mime_action / gacc.
Do not rewrite `confer_oc_oprop`.
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
