# Review 3015 — 59c140e4c — clear_fcorr finds mongone's zero-HP guard

- SHA: `59c140e4c` (cliff; board row disclose, scen-sweep-Tourist-610081
  s1740, 6 screens + six extra rn2(100) after C's last draw)
- D-entry: D-4175; Ledger: clear_fcorr ported
- `js/` diff: vault.js +9 −8

## Intent vs deliverable

Promise: clear_fcorr tests each fake-corridor square with `m_at`
(`:80`), which is `level.monsters[x][y]` with no DEADMONSTER check. At
game end, paygd → mongone zeroes the guard's mhp and calls grddead
while he still stands in his corridor. So C finds him, returns FALSE,
and grddead's relobj drops his armor before parkguard. JS scanned fmon
for a live monster and missed him.

Diff: `monThere = m_at(fcx, fcy) || (grd at (fcx,fcy) && !MON_OFFMAP ?
grd : null)`. MON_OFFMAP is added to the const import. The promise
matches the diff.

## Inventory

- clear_fcorr — vault.js:183 (C vault.c:45–116): occupant test only.
- m_at — mon.js (existing import; JS skips `mhp <= 0`, unlike rm.h
  `:516`).

## C ↔ JS fidelity

- **Death path.** mongone (mon.c:3265–3283) sets `mdef->mhp = 0`, then
  `if (mdef->isgd && !grddead(mdef)) return;`. Only after that do
  mdrop_special_objs and discard_minvent run.
- **grddead** (vault.c:174–189) calls `clear_fcorr(grd, TRUE)`. If that
  is FALSE, it calls `relobj(grd, 0, FALSE)`, sets `mhp = 0`, calls
  parkguard, then clear_fcorr again.
- **clear_fcorr** (`:62–87`). forceshow becomes TRUE because
  `DEADMONSTER(grd)`. The `u_at && !DEADMONSTER` exit is skipped. Then
  `(mtmp = m_at(fcx, fcy)) != 0` → `mtmp->isgd` → return FALSE.
- **JS behaviour.** The guard is on the first fakecorr square and still
  placed on the grid, so JS now returns false at the same test. grddead
  drops his inventory there (the `[` on the doorway). mongone's
  mdrop_special_objs then has nothing left to roll, which removes the
  six rn2(100).
- **Second pass.** After parkguard (mx/my → off-map, MON_OFFMAP set),
  the grd disjunct is false, so the corridor clears, as in C.
- **Non-guard occupants.** `m_at` still covers live occupants (the
  yelp/rloc arm). A dead non-guard monster on a fakecorr square in this
  window is not modelled. JS m_at's `mhp <= 0` skip is the root
  divergence, and the D-log names it.

## Hallucinations / overclaim

None. "Models the one C window where a zero-mhp monster (mongone's
guard) is still on the grid" is the honest scope.

## Density

Nine lines for a measured RNG + glyph cliff. Right-sized.

## Verification

```text
verify disclose,clear_fcorr,grddead --base 59c140e4c~1 --no-reach
  disclose:    1 PASS (scen-sweep-Tourist-610081) → PROGRESS
  clear_fcorr / grddead: 0 blocked (vacuous)
```

This reproduces the claim.

## Actionable C-wrongs

None queued. Debt: JS m_at/level_mon_at skip `mhp <= 0` where rm.h
m_at does not (same family as review 2996's mon_at_display). The grd
test patches the one window a session reaches. This is ledger debt with
no corpus row, not a Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
