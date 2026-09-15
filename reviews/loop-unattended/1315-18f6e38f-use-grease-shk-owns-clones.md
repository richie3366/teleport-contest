# Review 1315 — 18f6e38f — use_grease envelope: shk_owns prefix + clone retirements (D-2349)

Metadata: SHA `18f6e38f`, D-2349, review-617 named debts. Method:
full `js/` hunks read (3 files); C `shk_owns` (`shk.c:5884-5897`)
+ `shk_your` (`shk.c:5861-5874`) + `Tobjnam` (`objnam.c:2289-2299`)
+ `otense` (`objnam.c:2530-2546`) + `is_plural` (`obj.h:421-426`)
via `csym.mjs`; `sym.mjs` on all three re-point targets (pasted
below); canonical bodies read (`objnam.js:1626/2228/2217`,
`do_wear.js:2946`, `body_part_latebound :2305`, `s_suffix`
`shk.js:225`); added-line banned grep (0 hits); `imports.mjs
--rulecheck` (clean, re-run this iter); `hidden-proxy verify
use_grease --base 18f6e38f~1` re-run; orphan grep for the four
deleted clone names (0 refs).

## Intent vs deliverable

Subject promises two things: (a) the `shk_owns` shop prefix
(`"Foobar's "`) in `shk_your` for unpaid carried / costly floor
goods, late-bound to dodge the objnam→shk eval TDZ; (b) retiring
four `apply.js` suffix clones to canonical exports across 14
call sites. Diff delivers both: new exported `shk_owns_prefix`
+ `set_shk_owns_prefix` registration + `shk_your` hook, and all
14 sites re-pointed with the four defs deleted (count checks
out across flip_coin/use_grease/use_bell/use_candelabrum/use_lamp).
Promise kept.

## Inventory

- `shk.js`: `shk_owns_prefix` (new export) + one registration
  call. Imports join existing edges only (`set_shk_owns_prefix`
  via the live objnam import; `get_obj_location` via the live
  timeout import) — zero new module pairs.
- `objnam.js`: `_shk_owns_prefix` slot + setter + 3-line hook in
  `shk_your`. No static edge into shk.js.
- `apply.js`: 14 identifier swaps; 4 local defs deleted; 3
  leftover doc comments now point at the canonicals.
- Named: `Yname2_oil`/`s_suffix_apply`/`plur_quan`/`otense_stone`
  (own rows), timeout `Shk_Your` subset, shk pricing
  `get_obj_location` subset — all cited, none touched.

## C ↔ JS fidelity

`shk_owns_prefix` is arm-for-arm vs C `shk_owns`: `!loc` → null
≡ `get_obj_location` false → NULL; `unpaid || (FLOOR &&
!no_charge && costly_spot)` identical predicate and order;
`shkp ? s_suffix(shkname)+' ' : 'the '` ≡ C `s_suffix(shkname)`
/ `the_your[0]` plus `shk_your`'s single appended space (JS
returns the space inline and exits early — same string).
Helpers all LIVE or pre-existing: `costly_spot` (live),
`inside_shop`/`shop_keeper` (live exports), `shkname` (shknam
import), `s_suffix` (pre-existing local ≡ C incl. it/you arms).
`shk_your` order chk_pm → shk_owns → mon_owns → the_your ≡ C
`!shk_owns && !mon_owns` short-circuit; every arm carries the
trailing space ✓.

Re-point targets (required `sym.mjs` output):

```text
Tobjnam          js/objnam.js:1626   sync  (+7 pre-existing clones elsewhere)
otense           js/objnam.js:2228   sync
fingers_or_gloves js/do_wear.js:2946 sync (+2 remaining clones: eat/fountain)
```

All LIVE sync exports — no STUB in any live arm. Equivalence:
canonical `Tobjnam`/`otense` route through `is_plural`, which is
≡ the C macro (`quan != 1 || discovered-Eyes`, `obj.h:421-426`
vs `objnam.js:2217`) — so the Eyes-only delta vs the deleted
`quan`-gated clones is *toward* C ("adds the Eyes arm for
free" checks out; bells/lamps/coins can never be lenses, and
any `use_grease`-target change would still move toward C).
`fingers_or_gloves` differs from its clone only by
`body_part_latebound` vs static `body_part`: identical once
wired (same underlying fn via `set_body_part`), unwired
fallback `'finger'` is module-eval-time only — unreachable on
any scored path. Callee closure holds: every arm LIVE or named.

Nit (doc only, not queued): the `shk_your` jsdoc still reads
"Named omit: shk_owns …" though the body now ships it and
`turns.md:2017` retired the omit — one stale comment line for a
future touch-up.

## Hallucinations / overclaim

None. The mid-iteration TDZ crash (cohort 0/7) is disclosed
with cause (`_body_part` via polyself top-level) and the
late-bind fix follows the established `_y_monnam` idiom —
"dispatch ported, callee stubbed" does not occur anywhere
here. Probe arms (plain invent → null, unpaid shopless →
`'the '`, floor → null) match C; the costly-floor-with-keeper
arm is probe-uncovered but code-identical to C.

## Density

Three files, one naming envelope plus its review-617 clone
debts on the same grease/bell/lamp arms; all edges pre-existed.
Right-sized, not glued subsystems.

## Verification

D-log: TDZ crash → fix → re-ran once → PASS
(syntax/rule2/hidden-vacuous-disclosed/green 2/2/strict×2/cohort
7/7). Re-measured:

```text
verify use_grease: baseline 18f6e38f~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches the D-log exactly; vacuous honestly labeled, no `--base`
owed (row cited 0 blocks). Added-line banned grep 0 hits;
`--rulecheck` clean. No New-module-edge claim verified from
diff context (all three `from` modules already imported).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
