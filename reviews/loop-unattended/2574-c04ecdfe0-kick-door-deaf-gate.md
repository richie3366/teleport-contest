# Review 2574 — c04ecdfe0 — kick_door fail-arm Deaf-macro gate (D-3704)

## Metadata

- SHA: `c04ecdfe07d28482a977db601269074e598838b3` (2026-10-09, D-3704)
- Scope: ≤10-function refill — whole Method on `kick_door` (1 predicate)
- Diff: `js/dokick.js` +6/−3 (import-name add, gate swap, doc line),
  new `scripts/kick-door-deaf-gate.test.mjs` (107 lines), ledger
  `kick_door` D-tag, scoreboard header re-stamp only
- Context: omit-2 family, D-3703 Next lead; queue empty, batch no gap

## Intent vs deliverable

Subject promises: C's fail arm prints Thwack/Whammm under the Deaf
macro; JS read raw `game.u?.Deaf` (zero writers, stuck false), so a
macro-deaf hero burned `rn2(3)` and could hear "Whammm!!" where C
short-circuits to "Thwack!!". Fix: import the canonical `hero_Deaf`
and call it in C short-circuit order. The diff delivers exactly that —
one import name, one predicate, cites — nothing else in `js/`. Promise
matches deliverable.

## Inventory

- `kick_door` (`js/dokick.js`, fail arm now ~:502): 1 predicate
  changed. No new JS function.
- Callee: `hero_Deaf js/monmove.js:1197 sync` — canonical export;
  `sym.mjs` also reports 3 pre-existing local clones (dbridge.js:363,
  invent.js:5580, mhitu.js:1121) in other files — this commit correctly
  imports the export instead of adding a fourth. Nothing deleted or
  re-pointed, so no re-point audit applies.
- `imports.mjs --can js/dokick.js js/monmove.js hero_Deaf` → `ALREADY:
  dokick.js already statically imports monmove.js. No new edge
  needed.` — subject's claim confirmed verbatim.

## C ↔ JS fidelity

C locus (`csym.mjs`: body `dokick.c:909–970`; sole caller `:1466`):

```c
/* :958–969 else arm */ if (Blind) feel_location(x, y);
exercise(A_STR, TRUE);
/* :962–964 comment: a deaf hero shouldn't hear WHAMMM */
pline("%s!!", (Deaf || !rn2(3)) ? "Thwack" : "Whammm");
if (in_town(x, y)) (void) get_iter_mons_xy(watchman_door_damage, x, y);
```

JS (post-fix): `Blind()` → `feel_location`, `exercise(A_STR, true)`,
then `(hero_Deaf() || !rn2(3)) ? 'Thwack' : 'Whammm'` + `!!`, then the
`in_town` watchman sweep. Arm order, both strings, and the `!!`
suffix exact. RNG call-for-call: C draws `rn2(3)` iff `!Deaf`, and
JS's `||` short-circuits identically — a macro-deaf hero now skips
the draw and always sees Thwack, exactly C. `hero_Deaf` reads
HDeaf||EDeaf||uroleplay.deaf per `youprop.h:125` (verified in review
2573) plus D-3572's dead `u.Deaf` disjunct, disclosed in the subject —
a superset gate that can only differ where `u.Deaf` is set, which has
zero writers. Branch-by-branch confirm on the changed arm; the rest
of the body (open/levitate/bust/shatter/crash, D-2320) untouched.

## Hallucinations / overclaim

None. The D-log opens "no corpus divergence" and claims no movement;
the full-44 skip is argued (gate sits after the bust roll, reaching
set unchanged; deaf-at-gate fails under old code by construction) and
the argument is sound — the predicate only narrows one arm's gate.

## Density

Legitimate refill under the D-3699 precedent: one C predicate,
`js/dokick.js` only + its test, ledger `ported` kept `ported` with a
D-3704 tag (no status inflation), successor row (`kick_nondoor` :758
gate) queued with evidence. Not a no-op, no bundling.

## Verification

- Focused test: `node --test scripts/kick-door-deaf-gate.test.mjs` →
  5/5 pass (re-ran here).
- Re-measure (`verify kick_door --base c04ecdfe0~1 --reach-all`): `0
  session(s) blocked on it` at baseline — matches the D-log's "note
  hidden" honestly — and `reach kick_door: 40 baseline-PASS
  session(s) reach it (40 run, 75.4s): 40 PASS, 0 regressed →
  REACH-OK`. Zero regressions, both summary lines cited.
- Scoreboard hunk is a header-only re-stamp, zero row changes.
- Diff greps clean; Rule #2 clean per the iteration
  `imports.mjs --rulecheck` (review 2573).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
