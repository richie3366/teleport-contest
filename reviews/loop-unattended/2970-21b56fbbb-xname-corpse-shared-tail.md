# Review 2970 — 21b56fbbb — xname_flags: a corpse takes the shared tail

- SHA: `21b56fbbb` (near-pass cliff; board owner `demon_talk`, writer =
  objnam.c xname via shk.c addtobill `:3576–3584`)
- D-entry: D-4130; Ledger: xname_flags split js=objnam.js:xname_flags+objnam.js:pretty_base
- `js/` diff: `js/objnam.js` +7/−6

## Intent vs deliverable

Promise: C xname gives a corpse the plain FOOD_CLASS `actualn` («corpse»,
:775–789), then runs the shared tail: pluralize, gameover suffix, and
`" named " ONAME`. JS returned «corpse» early, before the tail, so a
named corpse lost « named …» in addtobill's quoted price line. Diff: the
early return is removed, and the corpse base is built at the
`pretty_base` call site («[partly eaten ]corpse» under
`partly_eaten_hack`), then falls into the tail. Promise = diff.

## Inventory

- `xname_flags` — objnam.js:1095–1120; C objnam.c xname :575–1029
  (pname goto :674–676; FOOD_CLASS :740–792; tail after the switch).
- Callee `pretty_base` — not changed. Its corpse arm still serves doname,
  as the comment says.

## C ↔ JS fidelity

```c
if (iflags.partly_eaten_hack && obj->oeaten)
    Concat(buf, 0, "partly eaten ");                      /* :775–781 */
if (obj->globby) { ... break; }
Concat(buf, 0, actualn);                                   /* :789 */
```

For CORPSE, C's actualn is the object name «corpse». The monster type
belongs to corpse_xname, not xname. The new JS base is exactly
`[partly eaten ]corpse`. The globby and tin arms cannot apply to a
CORPSE otyp. The early return used to sit *before* the `obj_is_pname`
check. The new code reaches that check first, as C does (a pname'd
corpse is impossible in practice, but the order is now C's). Then the
shared tail runs: pluralize unless `singular`, the gameover suffix, and
`named ONAME` (C after the switch). The removed early return pluralized
by itself, so pluralization is not lost. No RNG.

## Hallucinations / overclaim

None. The D-log also credits scen-sweep-Barbarian-49956047 to D-4128
(already passing on a rescore). It says the board was stale for that row,
which is the stale-board case in the project notes. The row is not
claimed for this diff.

## Density

One arm of one function: the right size.

## Verification

```text
verify demon_talk (--base 21b56fbbb~1): 1 blocked
  scen-shop-Caveman-51050085: PASS → PROGRESS
verify can_twoweapon / xname_flags: 0 blocked at this base (vacuous)
```

The owner's row passes on HEAD, which matches the D-log's direct score (298/298).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
