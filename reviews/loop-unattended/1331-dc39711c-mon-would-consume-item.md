# Review 1331 — dc39711c — mon_would_consume_item body (D-2365)

Metadata: SHA `dc39711c`, `js/monmove.js` (+21, body + docstring retire)
+ `js/mon.js` (−2, docstring retire only). No new modules; `dogfood`
joins the existing `dogmove.js` import, `EDOG`/`has_edog`/`ACCFOOD`/
`MANFOOD` the existing `const.js` import. D-log: D-2365, map-named row,
0 blocked. Full 44/44 auto-run (shared file changed) quoted.

## Intent vs deliverable

Subject promises the `return false` stub → C body: corpse-eater corpse
detour + hungry-pet food detour in the `m_search_items` loot goal. Diff
adds exactly the body plus three docstring retirements. Matches.

## Inventory

- `mon_would_consume_item(mtmp, otmp)` — stub-to-body (one function,
  file-local). No new helpers, no clones, no stubs.

## C ↔ JS fidelity

Vs C `monmove.c:1035–1050` (body re-read above): corpse arm
`CORPSE && !touch_petrifies(&mons[corpsenm]) && corpse_eater(data)` ✓;
pet arm `mtame && has_edog` (guardian-angel exclusion preserved) +
`dogfood < MANFOOD` + (`< ACCFOOD || hungrytime <= moves`) ✓ with the
repo dual-edog idiom (`EDOG(mtmp)?.hungrytime || mtmp.edog?.hungrytime
|| 0`, cf. `dog.js:614`) and `game.moves || 1` (cf. `dog.js:615`) —
defensive only, identical values on C-reachable paths. Conjunct-order
exact. Confirm.

RNG placement: `dogfood` (`dogmove.js:125` sync, own C-order
`obj_resists` `rn2(100)`) is called un-awaited inside the sync function
✓, and the sole JS call site (`monmove.js:520–522`) preserves C's
`((take && carry>0) || consume)` `||` short-circuit (`:1425`), so the
`dogfood` draw fires only when the take-arm already failed — exactly as
in C. Verified in-file, not taken on trust. Confirm.

`mons(undefined) → null → touch_petrifies false` guard: C-reachable
CORPSE objects always carry corpsenm; dead-input safety, no delta.

Callee closure: `touch_petrifies`/`corpse_eater` in-file via
`monsters.js`, `dogfood` live sync import, `EDOG`/`has_edog` const
imports — all LIVE; the monmove↔dogmove cycle pre-exists and all reads
are runtime-inside-body (no TDZ). No stub in a live arm.

## Hallucinations / overclaim

None. `can_touch_safely` arms + onscary/lminion stays named; the
"full 44/44" claim is a runner quote for a shared-file change.

## Density

~21 lines, one stub body — minimal and exactly the C locus. Acceptable.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify mon_would_consume_item --base dc39711c~1` → `0
  blocked (0 at baseline, 0 working)` — vacuous as disclosed; row cited
  0 blocks. Confirm.
- Green/strict/cohort (+full 44/44) per D-log `verify.mjs --fn
  mon_would_consume_item` → VERIFY: PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
