# Review 2156 — 2ab288d08 — readobjnam glob/zombify remainder

SHA `2ab288d08`, D-3196; 2026-10-01; +105/−34 JS in `js/readobjnam.js`.
Coverage remainder (closes D-3195's glob + zombify named omissions); no
prior review closure. Same iteration retires xname_flags STALE-SPLIT
(verified in review 2155).

## Metadata

- Subject: "`objnam.c` readobjnam glob/zombify remainder + postparse1 glob
  intercept (whole C-order arms)"
- Delivers: postparse1 glob intercept, finish globby branch, CORPSE
  zombify timer, 7 new imports + PM_BLACK_PUDDING const.

## Intent vs deliverable

Promise: the globby weight/cnt branch in C order (y_n override stays
named), the zombify hatch timer, and the FOOD_CLASS glob intercept with
canonical globbuf spelling. Diff delivers all three plus the import
closure. Promise kept, nothing extra.

## Inventory — readobjnam_postparse1 (glob intercept)

Arm added at the C `:4337–4368` position (at-SHA :1318). Callees: LIVE
`name_to_mon` (mondata.js), `rn1` (rng.js), `pmnames` (generated table,
re-exported); no helper added, none deleted or re-pointed. sym context:

```text
zombie_form      js/mon.js:937   sync
start_timer      js/mkobj.js:1495   sync
obj_to_any       js/hack.js:226   sync
rn1              js/rng.js:123   sync
pmnames          js/generated/monsters_data.js:55   sync   export const
```

Single exports, no clones. New edge `obj_to_any` from hack.js (hoisted
sync export; D-log `--can` SAFE; load-verified by the fortress).

## C ↔ JS fidelity — glob intercept

Confirmed against C `:4337–4368`: six-disjunct entry (exact glob/globs,
two suffixes, two strstri) with C-identical `d.p` short-circuit assignment
(first four pure tests, last two assigning — reorder among pure tests is
unobservable); `name_to_mon(tail, null)` with the `!d.p ? bp : tail-after-
" of "` split; NON_PM → `rn1(BLACK−GRAY, GRAY)`; cnt<2 + "globs" → cnt=2;
``glob of ${pmnames[mntmp][NEUTRAL]}`` (table shape verified:
`pmnames[200] = [null,null,"black naga"]`); bp retarget, mntmp=NON_PM,
FOOD_CLASS, actualn=bp, dn=null, return 1. Correctly issues NO cbuf call —
C writes the separate globbuf, leaving the caller buffer untouched.
RNG: the single rn1 fallback draw in C position. One comment nit (not a
C-wrong): the code comment says "name_to_monplus" where the call — like
C's — is plain `name_to_mon`; the call shape is what matters and it
matches.

## Inventory — readobjnam_finish (globby branch + zombify)

Two arms added in C position (at-SHA :2086, :2278). Callees: LIVE
`start_timer` (signature `(when, kind, action, arg)` verified),
`zombie_form` (contract verified below), `obj_to_any`, `rn1`, weight —
all single sync exports.

## C ↔ JS fidelity — globby branch + zombify

Globby (`:5042–5070`): quan=1, weight, gsize>1 scale
`(5+(gsize−2)*10)*owt`, cnt>1 → rn1(5,2) capped at 6−gsize, clamp, owt
multiply, cnt=0, `else if (cnt>0)` restructure — every line in C order.
The dropped `y_n("Override glob weight limit?")` disjunct is properly
named: normal and wizkit wishes are exact, wizard-interactive over-limit
clamps as on 'n'. No invented fallback.

Zombify (`:5222–5225`): `start_timer(rn1(5,10), TIMER_OBJECT, ZOMBIFY_MON,
obj_to_any(d.otmp))` under `d.zombify && zombie_form(...)`, using the
guardian-remapped `mntmp` exactly as C does. The D-log's "vacuous-true"
claim is corroborated, not hallucinated: C `mon.c:383–413` returns `int`
(mndx or NON_PM=−1, both nonzero; no zombie target is mndx 0), and JS
`zombie_form` (mon.js:937, read in full) mirrors the switch arm-for-arm.

Diff grep: no FORCE/DIAG/getRngLog/seed gate/fastforward (sole hit is the
commit message's own denial). Rule #2 clean (iteration-wide rulecheck).
Map lines turns.md:1199/:1252/:1351 retired to D-3196 (verified present).

## Hallucinations / overclaim

None. "Vacuous-true gate" verified against both bodies. The stale-reason
admission ("no obj_to_any" comment was stale since D-3105) is honest. The
19/19 globprobe is throwaway evidence, honestly caveated; my arm read
corroborates the interesting cases (inverted syntax, d.p set/null).

## Density

Two functions of one C file closure (objnam.c), ~105 insertions, no
Must-fix bundled. Per-function Ledger (readobjnam partial,
postparse1 ported — the 2155 s' micro-gap stays map debt, consistent)
and Verify lines present.

- Ledger: readobjnam partial — ACCEPT.
- Ledger: readobjnam_postparse1 ported — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify readobjnam/postparse1: 0 blocked at 2ab288d08~1 (vacuous — coverage row, 0 cited)
reach readobjnam: 46 baseline-PASS sessions reach it: 46 PASS, 0 regressed → REACH-OK
smoke postparse1: no RNG-tagged reach; 24 run: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (green 2/2, strict ×2, cohort 7/7). No REGRESSED
session; no vacuous-PASS overclaim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
