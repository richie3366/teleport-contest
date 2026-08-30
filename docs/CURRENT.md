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

Score last measured: **2026-08-29** — full `sessions` at **D-1692**
(`ac1199da`, cadence **#2100**). **44**/44,
Scr **11,405**/11,405, RNG **792,838**/792,838 = **100%**.
Speed `39+0.32/turn` (R² 0.866). seed0367 FULL still PASS.
Prior FAIL seed4500 at **D-1574** `1ba35e31` is PASS again.
Prior audit **#2090** was 44/44 at `d2bcd227` (R² 0.862).

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **44 / 44** |
| Screens matched | **11,405 / 11,405** |
| Positional RNG calls matched | **792,838 / 792,838** (100%) |
| Speed label | `39+0.32/turn` (R² 0.866) |
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

**Suite 44/44** fortress after D-1703. Save-oracle required for tagged
restore/other-floor Open (`save-oracle.mjs probe --omit`). Map still
picks work; do not shop the fork dashboard. Private B0 (not in
`sessions/manifest.json`): trap-same-floor **17/17**; ledger **26/26**;
wait-save catchup **30/30**; catchup-after-restore **26/30 red**;
trap-ledger **38/38**; shop template **35/35** (no unpaid).
**Next cluster:** `shk.c` dopay multi-shk getpos (named). Not shk_names_obj.
**Do not skip D-1531…D-1703 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1703.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1703 (index). Recent: **D-1703**
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
`savetrapchn` JSON `level.traps`. D-1693 knox/drawbridge.
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1703 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1703 (index) — shk_names_obj makeknown,
buy_container,
wizmgender glyph-reset,
mO `perminv_mode` wc skip,
dorecover envelope,
RANGE_GLOBAL relink,
other-ledger JSON, `serLevel` current blob, `goto_level` stash lights,
`savetrapchn` traps, knox/drawbridge, `chwepon` restrict_name.
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
