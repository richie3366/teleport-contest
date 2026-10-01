# Review 2147 — 2c5d70e9a — migration sort and input

SHA `2c5d70e9a`, D-3187; 2026-10-01; +155/-202 JS. No review closure.

## Intent vs deliverable

“Preserve unsigned migration sorting and reread the list after input”
restarts comparator, list display and wizard migration command; imports
strkitten/assign_level and corrects the obsolete nonblocking-pager claim.

## Inventory — migrsort_cmp

Changed private comparator; no C callees, clone or no-op.

## C ↔ JS fidelity — migrsort_cmp

wizcmds.c:1484–1501 preserves dungeon int difference, then level int
difference, then unsigned m_id less/greater result. >>>0 fixes signed
ordering. csym finds only prototype; actual qsort callback :1583–1585 is
marray.sort(migrsort_cmp), not an omitted caller.

## Inventory — list_migrating_mons

Changed private async body; pline/strkitten/yn_function/minimal_monnam/
strsubst/show_text_pages LIVE. plur/name/track macros expanded, alloc/free
represented by identity array/GC. NHW_TEXT lifecycle uses pager adapter.

## C ↔ JS fidelity — list_migrating_mons

wizcmds.c:1504–1610: count here→next→other, empty report, count message,
prompt c/n/o and hidden unavailable choices, choice counts, all header
switch arms, second live walk, sorting, coordinate removal, name,
destination/exact-XY suffix, text display, None/quit match. Second walk
rereads migration and current-level objects after input. Sole executable
caller :1892 awaits. wintty.c:1854–1950 NHW_TEXT falls into text/menu
processing regardless of FALSE; blocking pager is justified.

## Inventory — wiz_migrate_mons

Changed async export; stronghold/bottom predicates, assign_level/get_level/
depth/list/getlin/pline/rndmonst/makemon/ledger_no/migrate_to_level LIVE.
atoi is signed-32 decimal adapter. No stubbed destination or creation arm.

## C ↔ JS fidelity — wiz_migrate_mons

wizcmds.c:1872–1930 stronghold→next→bottom selection, list before debug
prompt, ESC/empty return, signed count selection/clamp, debug flag clear,
random generation or current fmon-head migration, per-pass decrement and
flag restore match. RNG remains solely in ordered rndmonst/makemon calls.
DEBUG_MIGRATING_MONS is live; command registration cmd.c:1764–1771 wired.

## Hallucinations / overclaim

No stubbed dispatch, no fictitious tty nonblocking debt. Required
re-pointed inline-copy→import sym output:

```text
assign_level js/do.js:1338 sync
!! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
js/dig.js:1635 js/dungeon.js:1377 js/potion.js:1792
strkitten js/hacklib.js:252 sync
show_text_pages js/pager.js:241 ASYNC — await required
```

Full historical Rule #2 clean. Added <0,0> text and makemon(0,0) are C
semantics; diff has no FORCE/DIAG/getRngLog/seed/fastforward gate. No
cycle-forced clone claimed.

## Density

Three whole same-file bodies, caller closure; no Must-fix bundled.
Per-function Ledger/Verify present:

- Ledger: migrsort_cmp ported — ACCEPT.
- Ledger: list_migrating_mons ported — ACCEPT.
- Ledger: wiz_migrate_mons ported — ACCEPT.

## Verification

Historical `verify migrsort_cmp,list_migrating_mons,wiz_migrate_mons
--base 2c5d70e9a~1 --reach-all`:

| Function | verify summary | reach summary |
|---|---|---|
| migrsort_cmp | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| list_migrating_mons | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |
| wiz_migrate_mons | 0 blocked, vacuous | smoke 24 PASS/0 regressed, REACH-OK |

Re-ran comparator extracted-C vectors and JS branch checks on this SHA:
225 comparator vectors, 48 category choices, input-state replacement and
18 migration-command cases pass. Only comparator vectors directly measure
C. D-log green/strict, relevant command cohort 7/7, full 44/44 pass.

## Actionable C-wrongs

None found.

Verdict: **ACCEPT**
