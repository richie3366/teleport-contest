# Review 1243 — 3fcfefe2 — mb_trapped dig/lock twins → canonical export

- SHA: `3fcfefe2` — "`monmove.c` mb_trapped dig/lock twins → canonical
  export (D-2277)"
- D-log: D-2277. Queue row: `monmove.c` mb_trapped dig/lock twins (D-2273
  named omit). No corpus session reaches a dig/bolt trapped-door kill.
- Character: clone deletion + canonical import, no corpus divergence.

## Intent vs deliverable

Subject promises: delete both local clones, import the canonical
`mb_trapped` in dig.js + lock.js, keep call sites unchanged. Diff actually
does exactly that, plus trims the now-unused `pline_mon` from both display
imports and retires the doc Named notes. Promise matches diff exactly.

## Inventory

- Deleted JS: dig.js local `mb_trapped` (~23 lines, skipped `wake_nearto`,
  zeroed mx/my); lock.js local `mb_trapped` (~29 lines, kept `wake_nearto`,
  zeroed mx/my). Added: one import line + comment each; zero call-site
  changes (`await mb_trapped(mtmp, sawit || seeit)` both).
- Required `sym.mjs` output: `mb_trapped  js/monmove.js:1039  ASYNC —
  await required` — pasted, confirmed. Single canonical, zero remaining
  clones in dig.js/lock.js (grep shows only the import + call site + doc
  lines). Both call sites await the async canonical. ✓
- Required `--can` output: `ALREADY: dig.js already statically imports
  monmove.js` and `ALREADY: lock.js already statically imports monmove.js`
  — pasted, confirmed (the D-log's "SAFE" phrasing is overcautious in the
  safe direction; no new module edge exists on either side). Call-time use
  only, hoisted declaration, no TDZ read.

## C ↔ JS fidelity

C loci: callers `dig.c:1436` (`if (mb_trapped(...)) { newsym; return
TRUE; }`) and `lock.c:1216` (`(void) mb_trapped(...)` with the
does-its-own-`wake_nearto` comment); body `monmove.c:52-74` (review 1239).

- Both clones contradicted C on death (mx/my zeroing vs `mondied` drops +
  lifesave fallthrough + `mon_learns_traps`); dig's additionally skipped
  `wake_nearto`. Deleting them for the review-1239-verified canonical is a
  strict fidelity gain on every path. ✓
- dig call site (`dig.js:969-972`): `if (await ...) { if (mtmp.mx) newsym;
  return true; }` ≡ C's unconditional `newsym; return TRUE` in practice —
  verified `mondead` (`js/mhitm.js:3122-3201`) only *reads* mx/my (gas
  cloud, local copy) and never writes them, so the guard is true on any
  real level square. ✓
- lock call site (`lock.js:1344`): return ignored like C's `(void)`; the
  no-monster else arm (loudness 40, KABOOM/hear) is untouched and still
  carries C's `wake_nearto` comment — no double-wake (canonical wakes only
  when a monster is passed). ✓
- Import trims: `pline_mon` has zero remaining uses in either file (grep);
  every other helper the D-log claims is still used (`dist2`/`Unaware` in
  dig; `dist2_lock`/`You_hear`/`wake_nearto`/`Deaf`/`Unchanging`-family in
  lock) is import-listed for code outside the deleted clones. Syntax +
  green PASS corroborate. ✓ No RNG touched.

No C-wrong. Named envelope (message predicates, Soundeffects) is D-2273's,
correctly referenced rather than re-solved.

## Hallucinations / overclaim

None. No corpus PASS claimed; hidden note honestly vacuous.

## Density

Net −76/+53 lines for retiring two divergent clones against an already
reviewed canonical, one falsifier. Right-sized (Must-fix-class rows ship
alone per §2b; this closes one).

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify mb_trapped --base
  3fcfefe2~1` → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)". Matches the D-log; row cited 0 blocks so no older `--base`
  owed.
- Diff-hunk grep clean; `imports.mjs --rulecheck` clean (re-run review
  1239). D-log cites green 2/2 + strict ×2 + cohort 7/7 + hand full 44/44;
  the end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
