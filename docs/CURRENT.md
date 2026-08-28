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

Score last measured: **2026-08-28** — full `sessions` at **D-1593**
(audit overlay `4b34b340`). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `38+0.30/turn` (R² 0.86). seed0367 FULL still PASS.
Prior FAIL seed4500 at **D-1574** `1ba35e31` is PASS again.
Prior audit **#1980** was 44/44 at `05c69d9b`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `38+0.30/turn` (R² 0.86) |
| Role-init throws | **0 / 44** |

**PASS (44):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0030, seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed0014, seed2600, seed2200, seed0383, seed4500.

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

**Suite 44/44** after D-1599 (seed4500 still PASS). **Next cluster:**
Open `invent.c` perm_invent InvInUse (named). Not SORTLOOT_PETRIFY.
Not inuse_only (D-1589). Not has_mcorpsenm (D-1598).
**Do not skip D-1531…D-1599 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1599.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1599 (index). Recent: **D-1599**
`invent.c` SORTLOOT_PETRIFY filter override (`touch_petrifies`
CORPSE past filterfunc) + `will_feel_cockatrice` /
`feel_cockatrice` + `look_here` skip/single/multi feel + pickup
`query_objlist` FEEL abort to `look_here(0)`. Prior: **D-1598**
`has_mcorpsenm` / `newmcorpsenm` / `freemcorpsenm` (`mextra &&
MCORPSENM != NON_PM`; `seemimic` free; zap long-worm skip+flag;
`copy_mextra`; display `PM_TENGU`; pager clone retired). Prior:
**D-1597**
`light.c` `show_transient_light` / `transient_light_cleanup`
(camera range 0 + thrown lamplit `mtemplit`; zap `bhit` + apply
`do_blinding_ray` + minion S_ANGEL). Prior: **D-1596**
`mplayer.c` `create_mplayers` (`rn1` class + `goodpos` tryct +
`mk_mplayer`; Astral `goto_level` `rn1(4,3), TRUE`). Prior: **D-1595**
`dog.c` `tamedog` `initedog` `has_edog` vs `!mtame` (`newedog` +
`initedog(TRUE)` else `initedog(FALSE)`; MM_EDOG). Prior: **D-1594**
`mon.c` `normal_shape` await `newcham(..., NC_SHOW_MSG)` (PfSC
`rescham`/`restore_cham`/zap cancel shapeshift pline before
`cham=NON_PM`/clay-golem). Prior: **D-1593**
`dog.c` `tamedog` ustuck expels/unstuck (swallow `expels` else
`!(Upolyd && sticks)` `unstuck`). Prior: **D-1592**
`pickup.c` `in_or_out_menu` more_containers `n` (`#loot` Next
default + multi PICK_ANY). Prior: **D-1591**
`invent.c` `display_used_invlets` (#adjust `?`/`*` used-letters
PICK_ONE). Prior: **D-1590**
`invent.c` wizid unid_cnt>0 PICK_ANY (`_`/^I identify_pack).
Prior: **D-1589**
`invent.c` sortloot SORTLOOT_INUSE / display_pickinv inuse_only.
Prior: **D-1588**
`invent.c` getobj putmsghistory + `topl.c` `tty_putmsghistory`.
**D-1587**
`display.c` `mimic_light_blocking` See_invisible `block_point`/`unblock_point`
(not `recalc`). **D-1586**
`mon.c` `newcham` NC_SHOW_MSG `pline_mon`/`usmellmon`/`noname_monnam`.
**D-1585** `dog.c` `tamedog` FULL_MOON S_DOG `rn2(6)` + catch
`Tobjnam`/big_corpse. **D-1584** `mplayer.c` `mk_mplayer`.
**D-1583** `vision.c` `nv_range` circle.
**D-1582** PREFIXCMD / `cmdq_shift`.
**D-1581** `pickup.c` traditional_loot + `invent.c` askchain.
**D-1580** `invent.c` gacc / `'0'` ball class. **D-1579**
`invent.c` mime_action. **D-1578** force_invmenu `*`/`?` redo.
**D-1577** `redraw_worm`. **D-1576** region per-cell
`block_point`/`unblock_point` (seed4500). **D-1575**
`mk_gen_ok` MAIL + `ndemon` mkclass. **D-1574**
`unblock_point`. **D-1573** `newcham` cancel. Older
D-1531…D-1599 live in the index — do not re-paste.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1599 (index). No `reset_glyphmap` /
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
`monkilled` (D-1550). cutworm is D-1570. xray IN_SIGHT is D-1571.
Hatch timeout is D-1572. `newcham` cancel is D-1573.
`unblock_point` is D-1574. `ndemon` mkclass is D-1575.
Region per-cell block is D-1576. `redraw_worm` is D-1577.
force_invmenu redo is D-1578. mime_action is D-1579.
gacc / `'0'` ball is D-1580. traditional_loot is D-1581.
PREFIXCMD / `cmdq_shift` is D-1582. `nv_range` circle is D-1583.
`mk_mplayer` is D-1584. FULL_MOON S_DOG is D-1585.
`newcham` NC_SHOW_MSG is D-1586.
`mimic_light_blocking` is D-1587.
putmsghistory is D-1588.
sortloot inuse_only is D-1589.
wizid unid_cnt>0 PICK_ANY is D-1590.
`display_used_invlets` is D-1591.
more_containers `n` is D-1592.
ustuck expels/unstuck is D-1593.
`normal_shape` await NC_SHOW_MSG is D-1594.
`initedog` has_edog vs `!mtame` is D-1595.
`create_mplayers` is D-1596. `howmonseen` is D-1562. Do not
skip `tamedog` `wake_nearto`. show_transient_light is D-1597.
has_mcorpsenm is D-1598.
SORTLOOT_PETRIFY is D-1599.
Remembered otyp does not beat a displayed mon glyph (D-1547).
Do not skip canned CMDQ_INT (D-1551), Eyes `is_plural`
(D-1552), splev amask (D-1553), DELPHI (D-1556), `block_point`
(D-1557; not `recalc`), SEARCH/REGEN/XRAY (D-1558), pickinv
`&ctmp` (D-1559), `finish_splitting` (D-1560), stash ALLOWCNT
(D-1561), `do_repeat` CQ_REPEAT (D-1563), Protection/`made_fruit`/Plan-B
(D-1564). `place_monster` 2D is D-1565. `rndmonst_adj` rogue/elem
is D-1566. `'r'` reversed is D-1567. Eat/read/zap/tin
NOFLAGS is D-1568. Pickinv hands/xtra is D-1569.
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
