# Review 1436 — 1ba77343 — nobj-chain walk fix (D-2477)

Metadata: SHA `1ba77343`, `js/trap.js` only (31 ins / ~10 del).
D-log: D-2477. Claims to close review 1429's Must-fix (dead
nobj-walk over array-model `game.invent`).

## Intent vs deliverable

Promise: swap the two dead `.nobj` walks over `game.invent` to the
`(game.invent || [])` array idiom with identical predicates and
short-circuit shape. Diff delivers exactly the two sites review 1429
named (`trapeffect_anti_magic` hero carried-scan,
`immune_to_trap` RUST hero walk), no new imports, no other changes.

## Inventory

- `trapeffect_anti_magic`: `otmp = null; for (const _am of
  game.invent || []) { … otmp = _am; break; }`, same triple
  predicate (`oartifact` + `!is_quest_artifact` +
  `defends_when_carried(AD_MAGM)`), `if (otmp) dmgval2 += rnd(4)`
  kept.
- `immune_to_trap` RUST_TRAP: hero/monster arms split — hero walks
  the array with the same `is_rustprone` + `owornmask` predicate and
  quiver/swapwep skip; monster keeps the `minvent` nobj walk; shared
  `TRAP_CLEARLY_IMMUNE` tail preserved.
- No deleted/re-pointed symbols (`sym.mjs` not applicable; no
  import lines touched).

## C ↔ JS fidelity

Both sites verified against pinned C:

- Anti-magic: C `trap.c:2366–2370` is `for (otmp = gi.invent; …)
  if (oartifact && !quest && defends_when_carried(AD_MAGM)) break;
  if (otmp) dmgval2 += rnd(4)` — JS replicates the break shape with
  `let otmp; otmp = null` (`js/trap.js:5179`) so no-match → null →
  no draw, match → `rnd(4)`. Predicate, order, and the conditional
  RNG draw now identical to C.
- RUST: C `trap.c:2884–2892` is one loop over `is_you ? gi.invent :
  mon->minvent` with the quiver/swapwep skip gated on `is_you` and
  `return TRAP_NOT_IMMUNE` on first hit. The JS split is
  semantically identical: the monster arm drops a skip C never
  applies to monsters; first-hit return and the fall-through tail
  match. Short-circuit, RNG order (no draws here), integer
  semantics unchanged.

## Hallucinations / overclaim

None. The "dead code" diagnosis (loop body runs once against the
array itself) is correct for both sites, and the fix restores the
firing arm rather than deleting the claim.

## Density

Right-sized: one C-wrong family, two co-fix sites, one module.

## Verification

- `hidden-proxy verify trapeffect_anti_magic --base 1ba77343~1
  --reach-all` (re-run): 0 blocked both sides (vacuous, as stated);
  smoke 24/24 → REACH-OK. `verify immune_to_trap` likewise.
  Matches the D-log.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords.
- Note: the restored `rnd(4)` is a *new* draw vs pre-fix JS — that
  is the fix (C draws it conditionally). No corpus session is
  blocked on either function, and the D-log's `verify.mjs` PASS ×2
  (green/strict/cohort) covers the fortress.

## Actionable C-wrongs

None. Review 1429's Must-fix is fixed.

Verdict: **ACCEPT**
