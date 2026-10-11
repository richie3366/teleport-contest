# Review 2668 — 4fb06f715 — getobj writer: clone lets sort by invletter_value

Metadata: SHA `4fb06f715`, D-3804, cliff row-2 `invent.c` getobj writer
(@69d583849; row-1 void-barred, falsifier live-checked). JS: 6 files
(+27/−16: invent/wield/potion/pickup/apply/artifact). Test:
`scripts/getobj-clone-lets-order.test.mjs`.

## Intent vs deliverable

Promise: 5 screen blocks at invent.c:1919, C listing lowercase lets
before uppercase and JS the reverse; export `invletter_value` and sort
all seven clone lets builders by it. Movement claimed: 4 PASS, 95327
1230→1315. Diff actually does: `export` on invletter_value (body
untouched), 7 comparators switched to `invletter_value(a) -
invletter_value(b)` with `:473` cites, import lines extended. Match.

## Inventory

- `invletter_value` (js/invent.js:1316) — newly exported, body
  untouched. C `invent.c:390–399`.
- 7 clone lets builders changed (comparator only): wield_suggest_lets,
  ready_suggest_lets (wield.js), dippable_lets_raw, getobj_dip_ok sug-
  gest (potion.js), stash_raw_lets (pickup.js), getobj_rub_on_stone
  suggest (apply.js), getobj_charge suggest (artifact.js).
- No new helpers, no deleted symbols, no new edges (5 existing invent.js
  import lines extended; comparator-only change cannot cycle).

## C ↔ JS fidelity

C: `invletter_value` (invent.c:390–399) ranks `$`→1, a-z→2–27,
A-Z→28–53, `#`→54, catchall 55. JS body is C-exact (disjoint arms; the
added empty-string guard returns the catchall — unreachable for real
invlets). `sortloot_cmp` (invent.c:471–477): under SORTLOOT_INVLET
returns `invletter_value(obj1->invlet) - invletter_value(obj2->invlet)`
— the exact comparator now in all 7 clones. `getobj` (invent.c:1838–
1900) collects SUGGEST lets in that order; each clone builds the same
`bp`/lets set (verified per-hunk: SUGGEST-only filters untouched).
No RNG in any touched body; comparator is a pure rank — no draw-order
effect, consistent with the row's RNG-lost-0 measurement. Canonical
getobj already used live sortloot (not re-ported — correct).
Completeness: no `charCodeAt`-comparator or bare `lets.sort()` remains
in `js/` — all seven sites converted, no straggler. `sym.mjs
invletter_value` → `js/invent.js:1316 sync`. Gap: none.

## Hallucinations / overclaim

None. D-3386 read once and correctly scoped (its cmdq/pickinv arms
untouched by this change); compactify exonerated by measurement
(compacted runs identical modulo order), not assumed. No dispatch-vs-
callee mismatch: the ordering is the writer, and it is what shipped.

## Density

Cliff-phase: writer correct — canonical getobj verified whole (live
sortloot at invent.js:10194), divergence isolated to the clones'
comparators. Whole-function: invletter_value whole vs C :390–399;
clones are local builders, not C functions, so the two Ledger entries
(`getobj ported; invletter_value ported`) cover the C surface. Caller
table maps all 7 clone verbs to C sites. Named omits: none new;
standing clone gaps (reassign/in_doagain/force_invmenu) stay named per
D-3386. Verify bullet: movement + REACH-OK + green + strict + cohort +
manual 44/44. Not unreached: 5 sessions, all moved.

## Verification

js-diff grep: clean. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify getobj --base 4fb06f715~1 --reach-all` →
`4 PASS, 2 moved past (1 still getobj at a later step), 0 unchanged, 0
worse → PROGRESS` (95327 → display_minventory@1315 was 1230; 95313/
95333/95314/95228 PASS; plus 95214 still getobj 178→342, strictly
later) and `smoke 24/24 → REACH-OK`. Superset of the D-log claim, zero
regressed. Confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
