# Review 2824 — 170f0240a — Gloves_on drops house find_ac, gains LEATHER/default/known arms

- SHA: `170f0240a` (D-3979)
- Files: `js/do_wear.js` only (+~18/−8), focused test
  `scripts/gloves-on-no-early-findac.test.mjs`
- Method: cliff writer (1 function: `Gloves_on`); whole Method on it.
- Cites: C `do_wear.c:575–603` read directly; `csym.mjs adj_abon` →
  `do_wear.c:3318–3336`.

## Intent vs deliverable

Promise: `Gloves_on` ran a house `find_ac` C never calls, painting the
new AC a turn early; Ranger-50050043 s1125 (AC:6 vs C's AC:7) → PASS.
Diff actually does: deletes the `find_ac()` call, adds the
`LEATHER_GLOVES` no-op, the `default: impossible(...)` arm, and the
`known=1 + update_inventory()` tail; doc re-cited to `:576–603`.
Promise and diff agree.

## Inventory

- `Gloves_on` — `js/do_wear.js:1609` (file-local async; C
  `do_wear.c:575–603`). Status: now whole; was missing 3 arms + an
  extra call.

## C ↔ JS fidelity

Arm-by-arm vs C `:576–603`, all confirmed:

- `:578–579` oldprop: JS `extr & ~WORN_GLOVES` from
  `uprops[oc_oprop].extrinsic` ✓.
- `:581–583` LEATHER_GLOVES no-op break: added verbatim ✓.
- `:584–587` FUMBLING (untouched): `!oldprop && !(hCur & ~TIMEOUT)` +
  `incr_itimeout(prop, rnd(20))` — `rnd(20)` drawn only inside the
  gate, matching C's call-evaluated `rnd(20)` ✓.
- `:588–591` POWER (untouched): `makeknown` + `botl=TRUE` ✓.
- `:592–594` DEXTERITY (untouched): JS inlines the gloves half of
  `adj_abon` (`do_wear.c:3318–3336`: `if(delta){makeknown;
  ABON(A_DEX)+=delta;} botl=TRUE` under the uarmg/DEXTERITY guard the
  else-if chain already establishes) ✓ exact, Helmet_on-split
  precedent stands.
- `:595–596` default: JS `impossible('Unknown type of %s (%d)',
  'gloves', otyp)` vs C `unknown_type` (`do_wear.c:9`, identical
  literal) + `c_gloves="gloves"` (`do_wear.c:12`) ✓ exact.
- `:598–601` known tail: `known=1; update_inventory()` ✓ (comment says
  `:597–600`, off by one — trivial cite drift, behavior right).
- No `find_ac` anywhere in C `:576–603` ✓ — deletion is the fix; stale
  AC until the allmain once-per-input recompute (D-0810 rule).

RNG: no draws added/removed on this path (FUMBLING `rnd(20)` unchanged
and conditional). Helper classification: `LEATHER_GLOVES`/`impossible`/
`update_inventory` already in-file (LIVE); nothing deleted or
re-pointed → `sym.mjs` re-point check N/A. Diff grep: no
`FORCE`/`DIAG`/`getRngLog`/seed/`fastforward`/coordinates. Rule #2
clean (this-iteration `--rulecheck`).

## Hallucinations / overclaim

One wording imprecision: "deleted the house `find_ac()`" — what was
deleted is the *call* in `Gloves_on`. `find_ac` itself is a live import
(`do_wear.js:16` from `u_init.js`), still called by 4 sibling sites
(`:3236,3394,3904,3988`), correctly named as untouched separate C
functions. The Named section states this plainly, so no behavior
overclaim — just loose phrasing.

## Density

Cliff writer for the `do_statusline2` head, one C function whole,
`Ledger:` updated, no second file, focused test on the exact corpus row.
The sibling `*_on` find_ac calls staying is the D-3948 sibling rule
(separate C functions, no session names them) — correctly not bundled.

## Verification

Ship-time: `verify do_statusline2: 1 PASS (Ranger full 1144), 12
unchanged`; `verify Gloves_on: note (0 blocked)`; reach/smoke green;
green/strict/cohort green; full public 44/44 forced (AC-timing is
game-wide) ✓ appropriate.
Re-measure (`verify do_statusline2,Gloves_on --base 170f0240a~1 --jobs 4`
on HEAD): `do_statusline2: 3 PASS, 1 moved past, 11 unchanged, 0 worse →
PROGRESS` — claimed Ranger PASS present; +2 PASS (Valkyrie/Wizard) and
+1 moved (Tourist 944→distfleeck@1734) are later SHAs' fixes visible on
HEAD code, i.e. the expected superset. `Gloves_on: 0 blocked` (vacuous
note restated, not sold as PASS) with `reach 1/1 → REACH-OK`; smoke
24/24 REACH-OK. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
