# Review 2764 — 95bb5cc8d — display_minventory PICK_NONE sort+hero row

- SHA: `95bb5cc8d84d702562ba1e323ad4529604dac6d8`
- Subject: D-3911 display_minventory PICK_NONE sortloot rank + INCLUDE_HERO engulfed row (Ranger-585420 s308 → PASS)
- Type: cliff (≤10 functions), whole Method on the function
- D-entry: `## D-3911` (DIVERGENCE-LOG.md)

## Intent vs deliverable

Promise: the PICK_NONE analog listed chain order within each class and
omitted the INCLUDE_HERO row. Fix mirrors query_objlist in C order
(sortflags → live sortloot → ranked class scan → hero row); have_any
counts incl_hero; Ranger-585420 → PASS.

Diff actually adds: `js/invent.js` display_minventory (+~70/−25) + new
focused test `scripts/minventory-picknone-sort-hero.test.mjs`. Imports
extend existing edges only (const, mhitu) plus a dynamic pager import.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `display_minventory` PICK_NONE analog (js/invent.js:4524) | invent.c:5340–5386 + pickup.c:1025–1216 (csym/sed) | changed: sort+hero |

## C ↔ JS fidelity

C display_minventory (`:5340–5386`, csym): `have_any = have_inv ||
incl_hero` (`:5354`); PICK_NONE delegates to query_objlist with
INVORDER_SORT|INCLUDE_HERO (`:5364–5368`). C query_objlist: sortflags
(`:1075–1082`) → `sortloot(&olist, sortflags, BY_NEXTHERE?T:F, allow)`
(`:1080–1081`) → pack walk over `flags.inv_order` + venom iff
INCLUDE_VENOM (`:1094–1100`) → per-item allow re-check (`:1122`),
heading once, first-gold `$`, obj_to_glyph burn (`:1105–1139`) →
INCLUDE_HERO: heading iff `sorted && n > 1` with
`digests(u.ustuck->data)` Swallowed/Engulfed gate (`:1150–1153`),
CONTAINED_SYM fake row with `an(self_lookat(buf))` (`:1155–1163`).

JS mirrors every arm: sortflags expression identical (sortloot 'f'/'l'
+ USE_INVLET, sortpack, PETRIFY terms); `sortloot(mon.minvent,
sortflags, false, allowFn)` (BY_NEXTHERE correctly false — never set on
this path); `inv_order_classes()` = flags.inv_order walk with no venom
slot (INCLUDE_VENOM never set here); allow re-check, heading-once,
retained first-gold `$` and obj_glyph burn; `n = ranked.length + 1`
(sortloot pre-filters by allow, so this is C's n) with the `n > 1`
heading gate; `digests(game.u?.ustuck?.data)` text and CONTAINED_SYM
selector. FOOD rank verified: C default 2 vs CORPSE 5
(invent.c:240–256), JS identical — rations before corpse. The
FEEL_COCKATRICE early-return (`:1112–1118`) is correctly absent (flag
never set on this path).

Callers (csym `--callers`: invent.c:4156, zap.c:634): both JS sites
wired pre-existing, unchanged.

Helper classification: sortloot (same-file LIVE), digests (mhitu LIVE,
existing edge), self_lookat (pager LIVE via dynamic import — house
idiom, no new static edge), an/CONTAINED_SYM/FEEL_COCKATRICE (imported).
No clones, no stubs. Nothing deleted or re-pointed. Grep: the single
`DIAG|FORCE` hit is the commit message's own "No DIAG/FORCE" sentence —
zero hits in the hunks.

## Hallucinations / overclaim

Nit (doc-only, not a C-wrong): the comment/commit cite "query_objlist
`:822–832` shape" for sortflags — `:822–832` is a query_objlist *call
site* in the pickup menu, not the sortflags computation; the code
mirrors the true `:1075–1082` exactly (verified above). A correctable
cite in a comment, never a row. The mon_to_glyph Hallu-only omit is
genuinely shared with the live query_objlist (js/pickup.js:774 doc) —
correctly named, not Must-fix.

## Density

Cliff phase: look_here row-2, head UNPORTABLE-terminal; owner verified
symptom-only (NOTES fortress guard respected — look_here untouched),
writer shipped whole. `Ledger: display_minventory ported` present. Not
a no-op: 1 session PASS, full 44/44 run directly.

## Verification

D-log: focused test FAIL→PASS; `verify look_here: 1 PASS`, both smokes
24/24, green/strict/cohort.
Audit re-measure (`verify look_here,display_minventory --base
95bb5cc8d~1 --reach-all`): `scen-worldtour-Ranger-585420: PASS`;
`1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`; both smokes
24/24 → REACH-OK. Claim confirmed verbatim. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
