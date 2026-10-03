# Review 2292 — 6552e164f — ledger_no + dunlev clone removals

- SHA: `6552e164f` (D-3336)
- Files: `js/dig.js`, `js/dokick.js`
- Insertions: ~5 js/ across 2 files; 2-symbol rewire pair

## Intent vs deliverable

Subject promises: "`dungeon.c` ledger_no + dunlev clone removals
(dig.js/dokick.js → live exports)". The diff delivers exactly that:
2 clones deleted, 2 ALREADY edges extended, one C-cite comment per
site. No DIAG/FORCE/seed; Rule #2 clean (iteration-wide rulecheck).

## Inventory

- `ledger_no`: deleted dig.js clone (sole site: dig.c:823
  migrate_to_level) → live dungeon.js:1097.
- `dunlev`: deleted dokick.js clone (sole site: dokick.c:1054
  fall-through gate) → live dungeon.js:1089.

## C ↔ JS fidelity

C `ledger_no` (dungeon.c:1374–1379): `dlevel +
dungeons[dnum].ledger_start`. Live JS: `(ledger_start|0) +
(dlevel|0)` — C-exact; the deleted dig clone was the identical
shape. Behavior-identical rewire.

C `dunlev` (dungeon.c:1324–1328): `lev->dlevel` (NONNULL in C).
Live JS and the deleted dokick clone are the identical
`lev?.dlevel ?? 1` — the `?? 1` is shared JS nullish convenience
outside C's domain (C never passes NULL; real dlevels are ≥ 1),
and the sole site passes mid-game-set `u.uz`. Behavior-identical
rewire. Required `sym.mjs` output:

```
ledger_no        js/dungeon.js:1097   sync
             !! ALSO 6 LOCAL CLONE(S) in 6 files — IMPORT the export; do NOT add another
               js/do.js:1367  js/mon.js:1766  js/muse.js:2201  js/potion.js:1733  js/shknam.js:268  js/teleport.js:2839
dunlev           js/dungeon.js:1089   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/fountain.js:982  js/trap.js:636
```

Remaining clones are out of cluster (do.js/mon.js ledger_no have
live queue rows; the rest are future refill rows, not this SHA's
debt).

## Hallucinations / overclaim

None. "Behavior-identical" is exact (both clones were same-shape).
"Whole C body live" holds for both (5–6 line bodies).

## Density

Two-symbol pair; ~5 insertions below the bar, defended (head's C
file holds no further Open rows). `Ledger:` entries for both;
per-function Verify lines present. No RNG in either body. Gates
per D-log: syntax · rule2 · hidden-note ×2 · reach ×2 · green ·
strict · cohort · skip full (two leaf files — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify ledger_no,dunlev --base
6552e164f~1 --reach-all`): both 0 blocked (rows cited 0 — honestly
vacuous, D-log says so) + smoke 24/24 PASS, 0 regressed →
REACH-OK ×2. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
