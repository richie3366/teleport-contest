# Review 2569 — 4d421c07c — break_armor donning cancels (D-3699)

## Metadata

- SHA: `4d421c07cde3e1d2c53e4f55cbf98e41ec76dfae` (2026-10-09, D-3699)
- Scope: ≤10-function cliff-phase refill — whole Method on `break_armor`
- Diff: `js/polyself.js` +15/−7, new
  `scripts/break-armor-donning-cancel.test.mjs` (106 lines), ledger
  `break_armor` partial → ported (D-1991 omit retired)
- Context: supervisor-ordered map refill; queue empty at 939/953, batch no
  gap (CURRENT.md Next cluster named this refill)

## Intent vs deliverable

Subject promises: wire the D-1991 named omit — the donning/cancel_don
sites at every armor-removal arm — 6 cancels inserted first in their arms
in C order plus the `:1231` flimsy condition, each cited; `donning` /
`cancel_don` join the pre-existing do_wear.js edge; partial → ported. The
diff delivers exactly that: one import-line widening, 6 identical
`if (donning(x)) cancel_don();` inserts, one `&& !donning(hornhelm)`
condition, comment updates. No other `js/` touched. Promise matches
deliverable.

## Inventory

- `break_armor` (`js/polyself.js:1371–~1515`): 7 sites touched, no new JS
  function, no helper added.
- Callees (both LIVE, single definitions, no clones):
  `donning js/do_wear.js:4168 sync`, `cancel_don js/do_wear.js:4120 sync`.
- `imports.mjs --can js/polyself.js js/do_wear.js donning` →
  `ALREADY: polyself.js already statically imports do_wear.js. No new edge
  needed.` — subject's claim confirmed verbatim.
- Nothing deleted or re-pointed (pure import widening + call inserts), so no
  further re-point paste is owed.

## C ↔ JS fidelity

C locus (`csym.mjs break_armor`): `nethack-c/upstream/src/polyself.c:1156–1302`.
Every cited site verified against pinned lines:

- `:1164–1165` (breakarm uarm): cancel first, before lamplit/messages — JS
  inserts before `end_burn`. ✓
- `:1200–1201` (sliparm racial arm): cancel first — JS before pline. ✓
- `:1231` horn flimsy: C `if (is_flimsy(otmp) && !donning(otmp))` — JS
  `is_flimsy(hornhelm) && !donning(hornhelm)`, identical predicate. ✓
- `:1239–1240` (horn else): cancel first — JS before pline. ✓
- `:1250–1251` gloves, `:1265–1266` helm, `:1276–1277` boots: cancel first
  in each — JS before pline/whirly in all three. ✓
- Completeness: the only `donning`/`cancel_don` tokens in C `:1156–1302`
  are those 7 sites. Cloak (`:1176`, `:1210`), shirt (`:1194`, `:1220`),
  shield (`:1259–1263`), blindfold (`:1291`) arms carry no donning check in
  C — JS adds none there. "Shield correctly absent" confirmed.
- Callee fidelity: JS `donning` (`js/do_wear.js:4168–4180`) maps all 7
  worn slots to their `afternmv` occupation exactly as C
  `do_wear.c:1574–1597` (doffing-first, then uarm/uarmu/uarmc/uarmf/uarmh/
  uarmg/uarms → Armor/Shirt/Cloak/Boots/Helmet/Gloves/Shield_on). LIVE and
  faithful; `cancel_don` clears afternmv/multi/takeoff per C. Branch-by-
  branch confirm.
- RNG call-for-call: neither callee draws RNG; behavior changes only where
  C also cancels (mid-don polymorph previously left occupation armed).
- Whole-body check for the `ported` flip: JS carries breakarm{uarm, uarmc
  3-way, uarmu} / sliparm{racial uarm, uarmc, uarmu} / horns / nohands{
  gloves, shield, helm} / boots / blindfold — every C arm present in C
  order (`js/polyself.js:1375–1511`).

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence — C-fidelity residual" and
claims no movement; the `note hidden` line is quoted as the tool's own
output. No "Match C" dispatch-over-stub: both callees are live, verified
against their C bodies.

## Density

Legitimate refill, not a no-op: both Open blocks empty, batch no gap, and
CURRENT.md's Next cluster explicitly ordered the missing-arm refill. One
C function family (`js/polyself.js` only + its test), D-1991 named omit
fully retired, `Ledger: break_armor ported` entry present, focused
red→green. No bundling, no second file's work.

## Verification

- Focused test: `node --test scripts/break-armor-donning-cancel.test.mjs`
  → 3/3 pass (ran here; D-log claims 1/3 pre-fix with the two failure
  modes named).
- Re-measure (`verify break_armor --base 4d421c07c~1 --reach-all`):
  0 blocked at baseline (matches the D-log's "no corpus session blocked");
  `smoke break_armor: no RNG-tagged reach; fixed smoke spread (24 run):
  24 PASS, 0 regressed → REACH-OK`. Zero regressions.
- Hygiene: diff greps clean (no FORCE/DIAG/getRngLog/fastforward/seeds/
  coords); Rule #2 clean per the iteration `imports.mjs --rulecheck`
  (review 2568).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
