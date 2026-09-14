# Review 1225 — e277f895 — mhitu PM identity Must-fix (D-2259)

Metadata: SHA `e277f895` (D-2259). Closes the review-1217
Must-fix (`reviews/loop-unattended/1217-…`, `**Addressed:**
D-2259` stamped there this commit). js/ +24/−? (`js/mhitu.js`
only, five one-line gate edits + two comment touch-ups). No new
functions, no new imports, no dispatch changes.

## Intent vs deliverable

Subject promises: replace the five always-false `=== mons[PM_*]`
identity gates with `(data?.mndx | 0) === PM_*`, restoring the
C pointer-compare semantics. Diff actually delivers exactly that:
one line each in `mhitm_ad_fire_u` (PAPER/STRAW), `mhitm_ad_rust_u`
(IRON), `mhitm_ad_curs_u` (GREMLIN), `mhitm_ad_dcay_u`
(WOOD/LEATHER), `mhitm_ad_slim_u` (GREEN_SLIME), plus comment
updates naming the factory trap and the D-2259 id. No more, no
less. Promise matches diff.

## Inventory

Changed (no new symbols): the five gates listed above. Deleted:
nothing. Re-pointed (local clone → import): none — this commit
touches no import edges, so the `sym.mjs` re-point check is N/A.
`--can` check is N/A for the same reason (no new edge added).

## C ↔ JS fidelity

Review 1217 proved the C-wrong from the C side; this commit is
the mechanical fix, so the audit here is that each edited gate
now expresses the cited C predicate:

- CURS gremlin vs `uhitm.c:3038–3041` (`if (!night() && pa ==
  &mons[PM_GREMLIN]) return`): JS is now `if (!night() &&
  (mtmp.data?.mndx | 0) === PM_GREMLIN) return;` — `night()`
  first, `rn2(10)` after, C order kept; the conjunct that was
  dead-always-false is now live. Daytime gremlin returns before
  the draw, as C does.
- DCAY rots vs `mondata.h:225–226` (`completelyrots(ptr) :=
  ptr == &mons[PM_WOOD_GOLEM] || ptr == &mons[PM_LEATHER_GOLEM]`,
  confirmed this audit via `node scripts/csym.mjs
  completelyrots`): JS now compares `pd?.mndx` against both
  indices. Same disjunction, same arms after it (`You rot!` +
  `rehumanize`).
- RUST vs `mondata.h:227` (`completelyrusts(ptr) := ptr ==
  &mons[PM_IRON_GOLEM]`), FIRE vs `mondata.h:223`
  (`completelyburns` paper/straw), SLIM vs `uhitm.c:3530–3574`
  (`pd == &mons[PM_GREEN_SLIME]`): all three now `mndx`
  compares with unchanged surrounding arms.

Equivalence of the idiom: `mons` is `export function
mons(mndx)` (fresh-object factory; `mons[n]` is `undefined` —
probed in review 1217), so identity-compare can never fire. The
replacement follows the house precedent `hates_light`
(`monsters.js:339–341`, `(ptr?.mndx | 0) === PM_*`) and
`is_wooden`, cited in the D-log. PM constants in `js/mhitu.js`
are file-local `monsterNames.indexOf('PM_*')` derivations
(`js/mhitu.js:133–166`), so both sides of each `===` are plain
indices — no factory object leaks in. Null-safety: `(undefined |
0)` is `0`, and no `PM_*` index is `0`, so a missing `data`
falls through exactly as a non-match (C would dereference, but
`youmonst.data` / `mtmp.data` are never null on these paths in
practice; the guard only makes the direction safe).

Branch-by-branch confirm: no branch order changed anywhere in
the five functions — each hunk is the single predicate line
(plus comment). RNG call-for-call: no draw added, removed, or
reordered; the only behavioral delta is that the daytime-gremlin
early return now fires (skipping the `rn2(10)` C also skips)
and the four golem/slime arms now fire for the matching hero
forms (all draw-free `pline` + `rehumanize` tails).

## Hallucinations / overclaim

None. D-log does not claim a corpus PASS: it says explicitly
"a vacuous verify is NOT a corpus PASS" and notes the queue row
cited a review, not N corpus blocks, so no `--base` re-run is
owed. The `Named:` line keeps the uhitm/mhitm CURS/DCAY/SLIM/DETH
remainders as Open rows and states Must-fix stays alone —
accurate (queue shows those Open rows; no gluing in this
commit).

## Density

+24 lines for a Must-fix single item, alone. In-band: Must-fix
stays one item, not glued to Open (§2b), and the ~40-insertion
floor applies to non-Must-fix ports. No padding, no sibling arms
smuggled in.

## Verification

D-log Verify bullet pasted: syntax PASS, rule2 PASS, vacuous
hidden note, green 2/2, strict ×2, cohort 7/7, full-suite skip
with reason (mhitu.js not in the auto-full list). Re-measured
the corpus claim myself:

```text
verify mhitm_ad_curs: baseline e277f895~1 — 0 session(s)
blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches the D-log exactly — no PASS claimed, none owed. Diff
grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`
tokens (five predicate lines + comments). `node
scripts/imports.mjs --rulecheck` re-run this audit, repo-wide:
Rule #2 clean.

## Actionable C-wrongs

None. The review-1217 family is closed; the surrounding arms
were confirmed C-faithful in review 1217 and untouched here.

Verdict: **ACCEPT**
