# Review 929 — 57b55f0e — dogmove.c mnum_leashable leashable-predicate singleton (D-1959)

Metadata: SHA `57b55f0e`, D-1959, `js/dogmove.js` (one function +
import extension + one `indexOf` const). Reviewer re-ran C locus,
callers, HIGH_PM def, sym on the new symbol and all five re-pointed
imports, banned grep, and `hidden-proxy verify --base`.

Intent vs deliverable: subject promises the PM-index leashable
check. Diff actually adds exported `mnum_leashable(mnum)` after
`finish_meating`, extends the existing `./monsters.js` import, and
adds `PM_LONG_WORM` via the file's `indexOf` pattern. Promise kept.

Inventory: one new JS function (`mnum_leashable`,
`js/dogmove.js:1057`, sync, per `sym.mjs`). Five re-pointed
symbols, all verified LIVE exports via `sym.mjs`: `unsolid`
(`monsters.js:485`), `nolimbs` (`:354`), `has_head` (`:359`),
`LOW_PM` (`const.js:3116`), `NUMMONS` (`generated/
monsters_data.js:3`). No clones added, no deleted symbols.

C ↔ JS fidelity — against `dogmove.c:1461–1469` (via `csym.mjs`),
conjunct-by-conjunct confirm:

- `mnum >= LOW_PM && mnum <= HIGH_PM` → `m >= LOW_PM && m <=
  NUMMONS - 1`; HIGH_PM ≡ NUMMONS-1 verified at
  `permonst.h:22`. `m = mnum | 0` int idiom. Same.
- `mnum != PM_LONG_WORM` → `m !== PM_LONG_WORM`. Same.
- `!unsolid(&mons[mnum]) && (!nolimbs(…) || has_head(…))` →
  identical call shape on `mons(m)`. `&&`/`||` short-circuit order
  preserved, so `mons()` is never read out of range — matching
  C's range-guard-before-index. `? TRUE : FALSE` → `? true :
  false` (C ternary shape kept). Same.
- Cross-checked the sibling `leashable` (`apply.c:760–766`): same
  three-predicate shape on `mtmp->data`, confirming the ported
  variant adds only the PM-index + range guard, as C does.

No RNG either side. Sole live C caller `dogmove.c:1527`
(`quickmimic` leash-slack arm, via `--callers`) has no JS
counterpart and is named in file header + map in this commit
("port it with the arm together") — own-row material, correctly
not stubbed.

Hallucinations / overclaim: none. One observation, not this SHA's
debt: `sym.mjs has_head` notes a pre-existing local clone at
`js/shk.js:3856` — this diff correctly IMPORTs the export rather
than cloning (per the anti-pattern rule), so nothing to queue
here; the shk clone predates D-1959.

Density: §2b right size — one predicate, one module, same-edge
import extension. OK.

Verification: D-log Verify shows preflight PASS, `verify.mjs --fn
mnum_leashable` → PASS syntax/rule2/green/strict/cohort,
explicitly vacuous hidden note with no corpus-PASS claim, plus a
7-case probe (leashable/unleashable/out-of-range vs direct
permonst semantics, PROBE PASS). Reviewer re-measured:
`hidden-proxy verify mnum_leashable --base 57b55f0e~1` → "0
session(s) blocked (0 at baseline, 0 in working scoreboard)".
Honest. Diff-body banned grep clean; Rule #2 clean (same-edge
import extension only).

Actionable C-wrongs: none.

Verdict: **ACCEPT**
