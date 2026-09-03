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

Score last measured: **2026-09-03** — full `sessions` at **D-1767**
(display gbuf stamp). **43**/44,
Scr **11,320**/11,405, RNG **777,491**/792,838 = **98.1%**.
Speed `41+0.31/turn` (R² 0.863). seed0367 FULL still PASS.
Recovered D-1765 FAILs seed0006/0030/4500; seed0014 still FAIL
(same prefix as D-1765). Prior audit **#2180** was 40/44 at
`bb71f9ff`.

## Score

| Metric | Value |
|--------|------:|
| Sessions passing | **43 / 44** |
| Screens matched | **11,320 / 11,405** |
| Positional RNG calls matched | **777,491 / 792,838** (98.1%) |
| Speed label | `41+0.31/turn` (R² 0.863) |
| Role-init throws | **0 / 44** |

**PASS (43):** seed8000, seed0900, seed1500, seed1800, seed0060,
seed0102, seed0700, seed1150, seed0017, seed0077, seed0106, seed0501,
seed0105, seed0016, seed0015, seed0200, seed0101, seed0103, seed0104,
seed0013-rogue, seed0013-friday13-restore, seed0107,
seed0012, seed0004, seed0002, seed0006, seed0007, seed0009, seed0398,
seed0373, seed5006, seed0116, seed0361, seed0367, seed0108, seed5002,
seed0360, seed0399, seed2600, seed2200, seed0383, seed0030, seed4500.

**Notable non-PASS:** seed0014-dequa-fountain-explore RNG 43831/59178
Screen 629/714 (same prefix as D-1765 after gbuf stamp).

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

**Suite 43/44** after D-1767 `show_glyph` gbuf stamp (recovered
seed0006/0030/4500). seed0014 still FAIL — do not invent a peel;
map still picks work. Save-oracle required for tagged
restore/other-floor Open (`save-oracle.mjs probe --omit`).
**Next cluster:** Open `mon.c` peacefuls_respond / MS_ARREST Halt (named). Not beg.
**Do not skip D-1531…D-1771 (index).** Keep mention_map addr.
Do not wrap `wildmiss` or `msg_mon_movement` as `pline_mon`.
Do not rewrite `confer_oc_oprop`. Do not add trailing
`confdir` inside shared `getdir`.
**Do not re-break D-0660…D-1771.** Do not FORCE
CLOSE/movement/umov / shk satdoor/`onlineu` (D-0376).
**Do not re-apply D-0480 glyph `tty_map_color` in serialize (D-0483).**
**Keep:** D-0845…D-1771 (index). Recent: **D-1771**
`invent.c` `useupf` + eat.c `carried()?useup:useupf`
(`invent.c` `:4762–4783` / `:1320–1333`; eat.c `done_eating`
`:567–570`; live `js/invent.js` export; eat.js hybrid retired;
named: shop bill, zap.js useupf clone, detect/potion/read/spell
useup clones). **D-1770** zap `delete_contents` import.
**D-1769** Punished `set_bc`. **D-1768** Unaware talk=FALSE.
**D-1767** `show_glyph` gbuf stamp (seed0014 still FAIL).
D-1766…D-1755 (index).
**Do not / rejects:** FORCE/RNG; HEAVY_IRON_BALL `owt!=0`;
judge-elides-RC (D-0933); extend §1.2; LB peels; skip painting
spaces; wrap `wildmiss` / `msg_mon_movement` as `pline_mon`;
Do not skip D-1229…D-1771 (index). No `reset_glyphmap` /
`notice_all_mons` / `makemap_remove_mons` / savelev-freeing /
lua `lspo_reset_level` / RANGE_LEVEL / binary NHFILE.
No trailing `confdir` in shared `getdir`. Latebound `body_part`.
No fourth town gnome. No makemon→hack/`artifact`/`minion`.
Do not delete emin. `#altdip` stays INTERNALCMD. No
bones→options fruitadd. Do not rewrite `confer_oc_oprop`.
Do not re-port D-1660…D-1771 (index). No generic `dknown` on
`otyp < FIRST_OBJECT`. No dump_fmtstr / paniclog filesystem.
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
