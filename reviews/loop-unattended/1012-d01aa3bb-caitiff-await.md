# Review 1012 — d01aa3bb — kickdmg tenth check_caitiff await (D-2042)

Metadata: SHA `d01aa3bb`, D-2042, Must-fix from review 1006
(C-wrong 3). js/ touches 1 file: `dokick.js` (1 line).
No stamp owed (Must-fix row archived in-commit).

## Intent vs deliverable

Subject promises: await the floating `check_caitiff` call
in `kickdmg`. Diff adds exactly `await` + a C citation
comment. Promise ≡ diff. One count correction below
(documentation only, not fidelity).

## Inventory

- Changed JS: `kickdmg`, `js/dokick.js:861`.
- `sym.mjs`: `check_caitiff js/uhitm.js:412 ASYNC —
  await required`. Enclosing `kickdmg` is `async`, so no
  signature or edge change; import pre-exists
  (`dokick.js:42`). No symbol deleted or re-pointed.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/uhitm.c:330-347` (18
lines, via `csym.mjs`): `void check_caitiff`, Knight
`caitiff!` / Samurai giri rebuke via `You()` + `adjalign`.
C callers (`--callers`): `apply.c:3508/:3837/:3847`,
`dokick.c:68`, `uhitm.c:383` — five sites. JS has exactly
the five counterparts (`apply.js:3900/:4063/:4073`,
`dokick.js:861`, `uhitm.js:449`), and after this commit
all five are awaited. The un-awaited float at the
tame-abuse/kick-damage boundary (`dokick.c:68` runs
synchronously before that output) is closed.

Count note: both review 1006 ("ten exist") and this
subject ("tenth", "all ten") say ten. The tree has five
C sites and five JS sites — I count no others (grep over
all of `js/`). The fix is complete against C ground
truth; "ten" is a documentation slip, not a missing
await. Not queueable.

## Hallucinations / overclaim

Only the "ten" count above — harmless, corrected here.
The Knight-coverage probe (`seed4500` RNG 108275/108275,
Screen 1814/1814) is a real measurement on the affected
path.

## Density

One-word Must-fix. Indivisible; §2b allows Must-fix alone.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates
  (rule2 PASS in verify tail; full `--rulecheck` once
  for the iteration — see review 1017).
- Re-measured `hidden-proxy verify kickdmg --base
  d01aa3bb~1`: `0 session(s) blocked on it (0 at
  baseline, 0 in the working scoreboard)` — D-log
  vacuous-verify honesty confirmed.
- Green 2/2 + strict ×2, cohort 7/7 per pasted tail.

## Actionable C-wrongs

None. All three review-1006 Must-fix rows are now
shipped (D-2040/2041/2042); the "ten" slip needs no
port iter.

Verdict: **ACCEPT**
