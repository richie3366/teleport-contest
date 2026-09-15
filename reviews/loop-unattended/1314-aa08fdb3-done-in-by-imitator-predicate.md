# Review 1314 — aa08fdb3 — done_in_by imitator predicate (D-2348)

Metadata: SHA `aa08fdb3`, D-2348, closes the review-1307 Must-fix.
Method: `js/` hunk read (1 file, +7/−1); C `done_in_by`
(`nethack-c/upstream/src/end.c:184-344` via `csym.mjs`, body +
`--callers`: 2 live call sites, `mhitu.c:1925` and `uhitm.c:5952`);
`is_vampshifter` (`monst.h:217-219`); `mons()` factory (`monsters.js`)
+ `set_mon_data` mnum-sync (`mondata.js:62-70`) + direct `.data =`
audit; added-line banned grep (0 hits); `imports.mjs --rulecheck`
(clean); `hidden-proxy verify done_in_by --base aa08fdb3~1` re-run.
No symbol deleted or re-pointed (2 consts added, 1 expression
changed, zero import edits) → `sym.mjs` owed nothing.

## Intent vs deliverable

Subject promises a permonst-index compare for the imitator
predicate: birth-state true-form shifters (`cham == mndx`) wrongly
took the D-2341 imitator epitaph arm and lost G_UNIQ `"the "`.
Diff delivers exactly that — `mptrNdx`/`chamNdx` + rewritten
predicate, `champtr` object still feeding `realnm`, no new
imports/edges. Promise kept; the 1307 Must-fix is addressed
as written.

## Inventory

- `js/end.js` `done_in_by`: predicate lines only. `mptrNdx =
  mptr?.mndx ?? mnum`, `chamNdx = ismnum(cham) ? cham : mptrNdx`,
  `imitator = mptrNdx !== chamNdx || mimicker`.
- Named: none new (ghost arms stay named per D-2341).

## C ↔ JS fidelity

Predicate vs C `end.c:184-190` (`champtr = ismnum(cham) ?
&mons[cham] : mptr; imitator = (mptr != champtr || mimicker)`)
branch-walks clean: ismnum + live `mptr` → `data.mndx` vs `cham`
≡ pointer compare (`mons()` stamps `mndx` on every fresh object);
`!ismnum` → `chamNdx = mptrNdx` → false ≡ C `champtr == mptr` ✓;
both-null → equal → false, matching old `null !== null` and
harmless under `NONNULLARG1` ✓; `mptr` null with valid `cham`
forces true (`mptr` null ⟹ `mnum` null, else `mons(mnum)`) ≡ C
`NULL != &mons[cham]` ✓. Data-`mndx` preferred over `mnum` is
right — C compares the data pointer, and the `?? mnum` fallback
only fires when there is no data object at all.

Checked-and-clear (no charge): the plain-arm `pmname(mnum)` and
HIGH_CLERIC `(mnum|0)` vs C `pmname(mptr)` / `mptr ==
&mons[PM_HIGH_CLERIC]` are safe through the `set_mon_data` sync
(`mondata.js:70`: `mon.mnum = ptr?.mndx`); every direct `.data =`
site derives data from `mnum` or is a hero-poly/fakemon transient,
and C `newcham` likewise never assigns `mnum` apart from data.

**Gap (pre-existing `c22b911d`, surfaced walking this function):**
the vampire-bat arm polarity is inverted. C (`end.c`, imitator
arm) fires iff the apparent form EQUALS `"vampire bat"` —
`!strcmp(fakenm, "vampire bat")` → `"bat"`, comment: prefer
`"vampire in bat form"` over `"vampire in vampire bat form"`.
JS (`end.js:1241`) fires iff NOT equal — `fakenm !== 'vampire
bat'` → `'bat'`. Exact inversion both ways: a shifted vampire
in bat form prints C-contradicted `"vampire in vampire bat
form"`, and a shifted vampire in fog form (vampires become fog
or bat, `makemon.js` select arm) gets C-contradicted `"in bat
form"` where C keeps `"fog cloud"`. Reachable: vampshifter
killers (`cham` ∈ vampire/leader/Vlad, `monst.h:217-219`).
Review 1307 blessed this arm on branch order but missed the
operator. One-line fix: `!==` → `===`.

## Hallucinations / overclaim

None on this SHA. No dispatch/stub shape (single predicate, no
callees). The deleted-probe pre/post claim is specific and
consistent with the pre-fix line 1307 quoted. Vacuous hidden
note explicitly disclosed as vacuous ("NOT a corpus PASS") ✓.

## Density

Must-fix alone, +7/−1, one falsifier, one predicate. Exemplary.

## Verification

D-log: probe pre/post + `verify.mjs --fn done_in_by` PASS
(syntax/rule2/hidden-vacuous-disclosed/green 2/2/strict×2/cohort
7/7). Re-measured:

```text
verify done_in_by: baseline aa08fdb3~1 — 0 session(s) blocked on it
  (0 at baseline, 0 working) — vacuous, NOT a corpus PASS
```

Matches the D-log exactly; no vacuous-PASS overclaim. Added-line
banned grep 0 hits; `--rulecheck` clean. Green/cohort tails as
claimed (corpus re-run above is the independent check).

## Actionable C-wrongs

1. `done_in_by` vampire-bat arm fires on `!==` where C fires on
   equality (`!strcmp(fakenm, "vampire bat")`, `end.c` imitator
   arm) — shifted-vampire epitaphs contradict C in both
   directions. Fix: `js/end.js:1241` `!==` → `===`. One port
   iter; falsifier: shifted-vampire killer epitaph vs C.

Verdict: **QUALITY-RISK**

**Addressed:** D-2351 `736bd185`
