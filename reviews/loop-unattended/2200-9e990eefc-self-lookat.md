# Review 2200 — 9e990eefc — self_lookat steed arm + live invis predicate

Metadata: SHA `9e990eefc`, D-3239, js/pager.js + js/display.js
(export only), single-function fix. Parent baseline `25100632c`.

## Intent vs deliverable

Subject promises: steed `, mounted on %s` arm + live invis
predicate, both ride sessions moving past. The diff delivers exactly
that: one arm, one predicate rewire, one export. No drift.

## Inventory

- `self_lookat` (js/pager.js:383): steed arm inserted before mhidden
  via live `y_monnam`; invis predicate `u.Invis && (u.senseself ||
  !u.Blind)` → live `Invis() && (senseself() || !Blind_look())`.
- `senseself` (js/display.js): local → exported (body untouched).

## C ↔ JS fidelity

`self_lookat` — C pager.c:107–133, walked in order. Race adj under
`!Upolyd` ✓ (pre-existing). Invis `:118`: C `(Invis &&
(senseself() || !Blind))` — JS `Invis()` is the live youprop.h:198
macro (`(H||E) && !B`, timeout.js:1623 sync; the correct import —
sym lists 4 stale local clones elsewhere); `senseself()` ≡ C
display.h:175 (`Unblind_telepat || Detect_monsters`, and
Unblind_telepat ≡ ETelepat per youprop.h:157 — the JS body's extra
`u.Unblind_telepat` disjunct reads a never-written flat, so it is
dead and JS ≡ C exactly); `!Blind_look()` renders the Blind macro
(`(H||E) && !B`) plus a `uroleplay.blind` conduct disjunct — a
steady-state no-op (conduct-intact implies macro-Blind outside a
transient), pre-existing helper, strictly livelier than the stale
`u.Blind` flat it replaces. Steed `:120–121`: placement before
mhidden ✓, `, mounted on %s` + live sync `y_monnam` (do_name.js:1332
sync — un-awaited call in a sync fn is correct) ✓. mhidden `:122–126`
(PREFIX|ARTICLE|REGION), Punished `:127–129`, utrap `:130–131` all
present in C order. Punished-else `"nothing?"`: dead in C too
(Punished ≡ `uball != 0`, youprop.h:77) — JS `if (u.uball)` is the
same predicate; omission is behavior-identical, named. No RNG in C,
none in JS. Verdict: whole body exact.

Callers: C pager.c:670 → js/pager.js:2023, C :1999 → :2217 (both
verified live; line drift from D-log cites is later-commit shift).
C pickup.c:1162 engulfer fake-hero menu arm: genuinely absent in JS
— no `fake_hero` identifier repo-wide in the menu path (the 9
pickup.js `engulfer` hits are FOLLOW/nobj traversal comments), and
`query_objlist` names "INCLUDE_HERO fake-you" omitted. Named with a
real reason (needs swallowed-menu machinery + C :1176–1190 fixup).
Verdict: 2/3 wired + 1 honestly named.

Helpers: `y_monnam`/`Invis`/`senseself` all LIVE imports; no clones
added; none removed (the stale `u.*` flats were reads, not
functions). One wording nit: the D-log calls pager→timeout a "new
edge" but `--can` reports the edge pre-existed — safe either way
(hoisted sync fn, runtime call, suites green).

## Hallucinations / overclaim

None. Both movement claims reproduce exactly (below). No PASS
claimed where movement happened.

## Density

One whole C function + one export: right-sized for a residual fix
with measured movement. Own C-locus, Callers, Verify,
Named-omissions bullets and own `Ledger:` entry.

## Verification

- Banned-pattern grep on the diff hunks: clean.
- Re-measured: `hidden-proxy.mjs verify self_lookat --base
  9e990eefc~1 --reach-all` → "0 PASS, 2 moved past, 0 unchanged, 0
  worse → PROGRESS" (Knight-94415 109→mcalcmove@118;
  Samurai-94419 115→dog_move@126); smoke 24/24 REACH-OK. Exact
  match with the D-log; no REGRESSED.
- No seed/step/coordinate reads.

## Actionable C-wrongs

None. (Observations, unqueued: the "new edge" wording; the
`Blind_look` conduct disjunct; the dead `u.Unblind_telepat`
disjunct in `senseself` — all steady-state-equivalent, none
session-visible.)

Verdict: **ACCEPT**
