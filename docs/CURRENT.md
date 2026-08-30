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

Score last measured: **2026-08-30** — full `sessions` at **D-1716**
(`0c720b98`, cadence **#2120**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `40+0.32/turn` (R² 0.853). seed0367 FULL still PASS.
Prior FAIL seed4500 at **D-1574** `1ba35e31` is PASS again.
Prior audit **#2110** was 44/44 at `7b26f699` (R² 0.861).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `40+0.32/turn` (R² 0.853) |
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

**Suite 44/44** fortress after D-1722. Save-oracle required for tagged
restore/other-floor Open (`save-oracle.mjs probe --omit`). Map still
picks work; do not shop the fork dashboard. Private B0 (not in
`sessions/manifest.json`): trap-same-floor **17/17**; ledger **26/26**;
wait-save catchup **30/30**; catchup-after-restore **26/30 red**;
trap-ledger **38/38**; shop template **35/35** (no unpaid).
**Next cluster:** Open `sp_lev.c` lspo_object non-merge quan repeat
(named). Not oc_merge.
**Do not skip D-1531…D-1722 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1722.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1722 (index). Recent: **D-1722**
`goto_level` `cant_go_back` FREEING vs WRITING|FREEING (`delete_levelfile`
JSON stash drop; `remdun_mapseen` notreachable; `discard_migrations`).
Named: `free_luathemes`; full migrating `obfree`. **D-1721**
`cmd.c` `getdir` yn_function NULL/`'\0'`/FALSE then
`clear_nhwindow(WIN_MESSAGE)` (`js/lock.js` + `getdir_cmdassist` /
`getdir_zap` / `dig_getdir`; no trailing confdir). Named: CQ_REPEAT;
mouse getpos; help_dir in shared; dxdy_moveok; `yn_function_menu`.
**D-1720**
`invent.c` `currency` Hallu `ROLL_FROM(currencies[])` (`youprop`
`Hallucination`; `amount!=1L` `makeplural`; `xprname` + wallet +
dokick/dig/lock/trap clones). Named: `end.c` `artifact_score`;
doprgold `hidden_gold`; `costly_gold`. **D-1719**
`artifact.c` `arti_cost` + `artilist.cost` extract + `getprice`
(`/4` when shk_buying). **D-1718**
`shk.c` `get_cost` glass-gem pseudo-ID (`ubirthday` color table;
`FIRST_GLASS_GEM`; bill-price FIXME). **D-1717**
`shk.c` `remote_burglary` + `rob_shop` + `call_kops`/`makekops` +
`addupbill`/`clear_unpaid` (`pick_obj` unpaid-from-outside; choose_stairs
/ u_left_shop leave named). **D-1716**
`shk.c` `dopay` mute/Deaf thank-you nod + `paid` `update_inventory`
(SetVoice still named). **D-1715**
`pay_billed_items` Traditional itemize ynq + `dopayobj` y_n Pay?
(`upstart(doname)` not Doname2 clone). **D-1714**
`shk.c` FullyUsedUp/PartlyUsedUp (dummy `add_to_billobjs` + itemize
split + ONBILL extract). **D-1713**
`o_init.c` `observe_object` FIRST_OBJECT skip (not sticky
`u.Hallucination`). **D-1712**
`objects.h` oc_merge BITS mrg (not class heuristic). **D-1711**
`update_lastseentyp` DRAWBRIDGE_UP / furniture-mimic. **D-1710**
`yyyymmddhhmmss` cemetery `when[]`. **D-1709**
`update_mlstmv` `iter_mons` skip DEADMONSTER/`mon_offmap`.
**D-1708**
`save_light_sources` LS_MONSTER `mx > 0` (not timeout.c
`mon_is_local`). **D-1707**
`recalc_mapseen` Blind bigroom / oracle / valley / sanctum.
**D-1706**
`yn_function` addcmdq pop/record. **D-1705**
`bill_box_content` + addtobill `contained_cost`. **D-1704**
`dopay` multi-shk getpos pay-whom. **D-1703**
`shk_names_obj` makeknown + `highc`/`plur`. **D-1702**
`buy_container` + KnownContainer coalesce + paydoname rewrite.
**D-1701**
`optfn_boolean` wizmgender glyph-reset + `reset_needed_visuals`
subset. **D-1700**
`doset` CompOpt `perminv_mode` + `wc_supported` skip. **D-1699**
dorecover getlev place/`restore_cham`/`run_timers` + restlevelfile
omoves restamp. **D-1698**
`savegamestate` RANGE_GLOBAL relink. **D-1697**
`payload.levels` other ledgers. **D-1696**
`payload.current` `serLevel`. **D-1695**
`goto_level` stash lights/billobjs/`update_mlstmv`. **D-1694**
`savetrapchn` JSON `level.traps`.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1722 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1722 (index) — cant_go_back FREEING
JSON analogue (`delete_levelfile` stash drop / remdun notreachable /
discard_migrations; not binary NHFILE; `free_luathemes` named),
getdir yn_function
(NULL/`'\0'`/FALSE + clear; not `yn_function_menu`; no trailing
confdir), Hallu `currency`
`ROLL_FROM(currencies[])` (`xprname`/wallet/dokick clones; shk_names_obj
fmt stays C `zorkmid%s`), `arti_cost` /
`artilist.cost` (getprice `/4`; get_cost still `*4` shop inflate),
glass-gem `get_cost`
pseudo-ID (`ubirthday` / `FIRST_GLASS_GEM`), `remote_burglary` unpaid
steal (`rob_shop`/`call_kops`/`makekops`; `pick_obj` after addinv;
choose_stairs / u_left_shop leave named), mute/Deaf thank-you nod
(hero_deaf/`muteshk` else pline; hearing verbalize), Traditional
itemize ynq + dopayobj y_n Pay? (not Doname2 clone #4),
FullyUsedUp/PartlyUsedUp
dummy billobjs / itemize split,
`observe_object`
FIRST_OBJECT skip / youprop Hallucination,
lastseentyp
DRAWBRIDGE_UP/`cmap_to_type`, cemetery `when[]`
`yyyymmddhhmmss`, `update_mlstmv` skip,
LS_MONSTER `mx > 0`,
Blind bigroom/oracle/valley/sanctum,
yn addcmdq,
bill_box_content,
dopay multi-shk getpos,
shk_names_obj makeknown,
buy_container,
wizmgender glyph-reset,
mO `perminv_mode` wc skip,
dorecover envelope,
RANGE_GLOBAL relink,
other-ledger JSON, `serLevel` current blob, `goto_level` stash lights,
`savetrapchn` traps, knox/drawbridge,
`oc_merge` BITS (not SPELL/WAND class heuristic).
No generic `dknown` on `otyp < FIRST_OBJECT`.
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
