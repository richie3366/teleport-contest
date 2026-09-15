# Review 1324 — cb0e739f — m_throw MT_FLIGHTCHECK bars/sink arms (D-2358)

Metadata: SHA `cb0e739f`, `js/mthrowu.js` only (+86/−~20 per stat; the js
hunk is pre-flight block + in-loop blocked tail). No new modules; IRONBARS /
IS_SINK extend the existing `./const.js` import, `otense` the existing
`./objnam.js` import. D-log: D-2358, debt-named row, 0 sessions blocked.

## Intent vs deliverable

Subject promises: monster-thrown missiles stop at IRONBARS via `hits_bars`
+ stop on IS_SINK + sink/misses plines, i.e. the `MT_FLIGHTCHECK` macro
(`:552–569`) at both call sites (`:639` pre-flight, `:799` in-loop).
Diff actually adds: pre-flight bars check with box back-write; `forcehit`
`rn2(5)` draw restored (was `void forcehit`); in-loop blocked tail with
`singleobj` guard + sink pline + misses pline + tethered arm. Matches the
promise; no scope creep (thrwmu always_toss/polearm stay named).

## Inventory

- `m_throw` pre-flight block (new): edge/wall/door, then conditional
  `hits_bars(box, x, y, nx0, ny0, 0, 0)`.
- `m_throw` in-loop blocked tail (rework): `forcehit` draw, `!range`
  short-circuit, wall/door/sink-current, conditional `hits_bars(...,
  forcehit, 0)`, sink-vs-misses plines, tethered branch.
- Callees `hits_bars` (`js/mthrowu.js:1529`, async, D-0990) and `hit_bars`
  (`:1457`) pre-exist; no new helpers, no clones, no stubs.

## C ↔ JS fidelity

Macro `MT_FLIGHTCHECK(pre,forcehit)` (`mthrowu.c:552–569`, via grep —
`csym` has no macro body): disjuncts edge → wall → closed-door →
`(IRONBARS && hits_bars(..., pre?0:forcehit, 0))` → `(!pre && IS_SINK
[current cell])`. JS pre-flight passes `0, 0` and evaluates no sink arm;
in-loop passes `forcehit, 0` plus `IS_SINK(curtyp)` on `(bx,by)` =
`gb.bhitpos`, only when `range` nonzero. Short-circuit preserved both
sites (`if (!preBlocked && t0 === IRONBARS)`, `if (!flightBlocked &&
ntyp === IRONBARS)`), so `hits_bars` RNG/destruction fires exactly where
C's `||` chain reaches it. Branch-by-branch confirm.

Draw order: C draws `forcehit = !rn2(5)` (`:798`) before the `!range`
test (`:799`); JS `const forcehit = !rn2(5)` precedes `if (!range)`.
The old `void forcehit` dropped a C draw every loop iteration — this
commit restores it. `while (range-- > 0)` is identical both sides, so the
`range` value in the sink/misses predicates matches post-decrement.

Blocked tail (`:800–823`): `if (singleobj)` guard — C has the identical
guard with the `/* hits_bars might have destroyed it */` comment
(`hits_bars` nulls `*obj_p` on break, `:1503` doc). Sink pline predicates
`range && cansee && IS_SINK`, `The(mshot_xname)` + `otense(...,
Hallu?"plop":"drop")` match; misses predicates `m_shot.n > 1`,
`!mesg_given || off-hero-cell`, `cansee || (marcher && canseemon)` match;
tethered `drop_throw` vs `return_flightpath = TRUE` nesting inside the
`singleobj` guard matches. Pre-flight destroy path guards `drop_throw`
on `singleobj` (JS `drop_throw` derefs `obj.otyp` at `:650`, so a NULL
would throw; C calls `drop_throw` unguarded) — disclosed in the D-log,
no RNG/screen delta. Confirm.

`hits_bars` body re-read (`js/mthrowu.js:1529–1599` vs C `:1499–1559`):
WEAPON oskill exclusions, ARMOR gloves, TOOL 8-item pass-through list,
ROCK statue-size, FOOD corpse-size/MEAT_STICK/MEATBALL, SPBOOK/WAND/BALL/
CHAIN always-hit, default pass — arm-for-arm. Confirm (pre-existing,
untouched here).

## Hallucinations / overclaim

None. D-log says "vacuous verify is NOT a corpus PASS" explicitly, names
the `drop_throw(null)` delta, and the probe claim is check-only with no
production effect. `sym.mjs hits_bars` → `js/mthrowu.js:1529 ASYNC —
await required`; both new call sites `await` it. Confirm.

## Density

~86 insertions, one C macro family in one JS module — right-sized per
§2b. No unrelated subsystems.

## Verification

- `imports.mjs --rulecheck` (this review): `Rule #2 clean` — confirm.
- Diff grep `FORCE|DIAG|getRngLog|fastforward|seed/coords`: no code hit
  (sole match is the commit message quoting "no DIAG/FORCE/seed gates").
- Re-measured: `hidden-proxy.mjs verify hits_bars --base cb0e739f~1` →
  `0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)` — vacuous, exactly as the D-log discloses; row cited 0
  blocks so no `--base` owed. Confirm.
- Green 2/2 + strict ×2 + cohort 7/7 per D-log `verify.mjs --fn
  hits_bars` → VERIFY: PASS (runner output quoted; not re-run here —
  tree has moved 14 SHAs on).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
