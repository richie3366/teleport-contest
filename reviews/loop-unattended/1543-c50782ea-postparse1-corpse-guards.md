# Review 1543 — c50782ea — objnam.c postparse1 corpse-scan guards (D-2584)

## Metadata

- SHA: `c50782ea`
- D-id: D-2584. Next index: 1543.
- Files:
  - `js/readobjnam.js` (+15/−1: six `str_start_is` guards).
  - `scripts/master-key-wish.test.mjs` (new, 51 lines: 3 unit tests).
  - Also re-stamps reviews 1533/1536 (`**Addressed:**` hashes — docs,
    not re-audited here).
- C locus: `nethack-c/upstream/src/objnam.c:4399–4404` ("Find corpse
  type w/o of" six-guard `if`), via `node scripts/csym.mjs
  readobjnam_postparse1` (range `:4239–4663`) plus direct read of
  `:4390–4412`.
- Closes Must-fix: review 1536 item 1 (D-2577 Master-Key wish
  regression, scen-wish-Priest-92163 + scen-wish-Rogue-92221).

## Intent vs deliverable

Subject promises six caseblind guards around the no-"of" scan in C
`:4399–4404` order, no matcher/caller/RNG change. Diff delivers
exactly that plus a pinning unit test. Promise matches deliverable.

## Inventory

- Changed: the corpse-scan gate in `readobjnam` (`js/readobjnam.js:1224`
  region) — `!noMonScan && d.mntmp < LOW_PM && d.bp.length > 2`.
- No new/changed JS function, no deleted symbols — a pure gate
  addition, so no `sym.mjs` delete/re-point output is owed.
- Callee: `str_start_is` — `node scripts/sym.mjs` →
  `str_start_is js/hacklib.js:125 sync`. LIVE single export; read here
  (`:125–143`): caseblind ASCII `lowc`, and a short `str` returns
  `j >= c.length` = false, i.e. short-bp falls through into the scan —
  exactly C `strncmpi` NUL-vs-char semantics. The D-log's equivalence
  claim checks out independently.
- No RNG in the C arms (`strncmpi` × 6) and none added.

## C ↔ JS fidelity

C `:4399–4404` is one `if` with six `strncmpi &&` terms; JS is one
`const noMonScan = a || b || ...` with six `str_start_is` terms,
negated at the gate — De Morgan-exact. Prefixes and order verified
term by term against the C read: "samurai sword"/13, "wizard
lock"/11, "death wand"/10, "master key"/10, "ninja-to"/8,
"magenta"/7 — all six present, same order, same lengths (lengths are
inside `str_start_is`'s prefix argument). Comments carry the C reason
per arm ("not the samurai monster", "not the Master rank", etc.).

Mechanism (matches review 1536's diagnosis): without the "master key"
guard, the D-2577 matcher eats the Monk rank title "Master", bp
truncates to "Key of Thievery", and the wish dies in postparse3 —
C never truncates because the guard skips the scan. The fix is at the
exact C gate, not in the matcher (correctly left untouched).

## Hallucinations / overclaim

None. The D-log names the `s' ` possessive arm as staying deferred
with the structural reason (needs `d.bp > d.origbp` position info).
The unit test pins the artifact-grant path (`oartifact` set,
SKELETON_KEY otyp, cursed flag) rather than just non-null.

## Density

15 `js/` insertions for a Must-fix gate repair — small is correct
here. Plus a 51-line committed test, which is the durable evidence.

## Verification

- D-log claims both wish sessions PASS full + corpus 495/540→497/540
  with the `2x next_ident mkobj.c:521` owner gone, and
  `verify readobjnam_postparse1` → PASS.
- Re-ran here (required):
  - `hidden-proxy verify readobjnam_postparse1 --base c50782ea~1
    --reach-all` → 0 blocked both sides (expected — the recorded
    owner is `next_ident`, not postparse1) + smoke 24/24 REACH-OK.
  - `hidden-proxy verify next_ident --base c50782ea~1 --reach-all`
    (the recorded owner — fresh replay, not cached scoreboard) →
    `2 session(s) blocked on it (2 at baseline, 0 in the working
    scoreboard)` / `scen-wish-Priest-92163: PASS` /
    `scen-wish-Rogue-92221: PASS` / `2 PASS, 0 worse → PROGRESS` /
    `reach: 495 baseline-PASS sessions reach it (495 run): 495 PASS,
    0 regressed → REACH-OK`.
  - `score --ids <both>` (cached): 497/540 with no `next_ident`
    owner in the blocking list — consistent, not sole evidence.
  - `node --test scripts/master-key-wish.test.mjs` → 3 pass, 0 fail.
- Claim confirmed with stronger evidence than cited: full-reach
  re-run, zero regressions.
- Diff grep: no FORCE/DIAG/`getRngLog`/seed/coordinate/`fastforward`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
