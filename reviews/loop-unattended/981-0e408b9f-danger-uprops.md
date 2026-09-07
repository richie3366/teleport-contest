# Review 981 — 0e408b9f — danger_uprops uprops-intrinsic arm (D-2011)

Metadata: SHA `0e408b9f`, D-2011, Open-row port (safety-gate
toplines missing after `#wizintrinsic`; 6 sessions). js/ touches
1 file (`js/do.js`, +20/−…: `danger_uprops` dual-store check).
No stamp owed.

## Intent vs deliverable

Subject promises: `danger_uprops` checks flat `|0` OR
`u.uprops[PROP].intrinsic` for STONED/SLIMED/STRANGLED/SICK, no
H/E extrinsic. Diff actually adds: exactly that plus four const
imports on the existing const.js edge. Promise == diff. The
root-cause chain (menu `d` = 4th `propertynames[]` = STRANGLED →
`incr_prop_timeout` writes uprops-only → flats-only check misses)
is fully measured, not inferred.

## Inventory

- Changed JS function: `danger_uprops` only
  (`cmd_safety_prevention` untouched).
- New helpers: none. No deleted symbols — no `sym.mjs` delete
  audit required.
- No STUB; stale `Named omissions: full danger_uprops bodies`
  dropped (now live), `visctrl/cmd_from_func` defer kept
  (pre-existing D-0228).

## C ↔ JS fidelity

C locus: `do.c:2318–2322` (`Stoned || Slimed || Strangled ||
Sick`), with `youprop.h:108–113` defining all four as
`u.uprops[PROP].intrinsic` — intrinsic only, no extrinsic. The
D-log's "no H/E extrinsic" is verified against the headers, not
assumed. ✓ Prop indices verified: JS `SICK = 17, STONED = 18,
STRANGLED = 19, SLIMED = 22` ≡ C `prop.h:32–43`. ✓

Two-store mechanism verified end to end:

- `incr_prop_timeout` (wizcmds.js:136–148) mirrors to flats via
  `PROP_FLAT` — but `PROP_FLAT` (`:112–127`) maps only H-style
  timeout props and has NO STONED/SLIMED/STRANGLED/SICK entries.
  So the wiz path writes uprops-intrinsic only, which the old
  flats-only check could never see. The comment in the new
  `danger_uprops` states exactly this. ✓
- Natural paths write the flats (`u.Slimed`/`u.Stoned`/`u.Sick`
  in potion.js:871–936, `u.Stoned = 5` mhitu.js:1938,
  `u.Strangled = 0` pray.js:627), so the flat disjuncts must
  stay — the OR covers both JS representations of the single C
  value, following the established dual-read convention
  (`prop_old_timeout` wizcmds.js:130–134 checks flat-then-uprops;
  display.js status conds read flat-OR-intrinsic). ✓
- No RNG, no message change (the gate's caller is untouched).

## Hallucinations / overclaim

None. The "1 unchanged" session (92191, still
cmd_safety_prevention@30) is disclosed with its line, and it is
the multi-search-lifecycle residual whose follow-up row HEAD
rightly keeps live — not swept under PROGRESS.

## Density

20 lines for a one-predicate C cause that closes three full
sessions. Right-sized.

## Verification

Re-measured myself: `hidden-proxy verify cmd_safety_prevention
--base 0e408b9f~1` → `3 PASS, 3 moved past, 1 unchanged, 0 worse
→ PROGRESS` (92222/92178/91130 PASS; 92159 → step 59;
92121 → dosearch@40; 92096 → dodrink@118; 92191 unchanged@30),
identical to the D-log. Plus cited green 2/2 + strict ×2,
cohort 7/7, full 44/44 (shared file changed). Grep of the js
hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward`.
Rule #2 clean (re-ran this iteration).

## Actionable C-wrongs

None in this delta.

Verdict: **ACCEPT**
