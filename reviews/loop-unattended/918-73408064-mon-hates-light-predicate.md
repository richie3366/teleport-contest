# Review 918 — 73408064 — mondata.c mon_hates_light light-hatred predicate singleton (D-1948)

## Metadata

- SHA: `73408064` (D-1948). JS: `js/monsters.js` +9 (new sync export `mon_hates_light`).
- Subject promises: one-line wrapper beside sibling `mon_hates_silver` (D-1254), `?.` foreign-caller guard, probe, caller wiring named.
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. 9 added lines total (JSDoc + export). No imports, no RNG, no gates.

## Inventory

| Symbol | Class |
|---|---|
| `mon_hates_light(mon)` | new export; ports C `mondata.c:546–550` |
| `hates_light` | LIVE pre-existing (same file; `mndx === PM_GREMLIN`) |

## C ↔ JS fidelity

Complete confirm: C `return (boolean) hates_light(mon->data)` → JS `return hates_light(mon?.data)`. The wrapped `hates_light` is already ported and boolean-typed, so the C `(boolean)` cast is preserved by construction. `?.` only widens foreign-caller inputs (C is NONNULLARG1 per `extern.h:1878`); on C-reachable inputs behavior is identical. Sole C caller `uhitm.c:1039` verified via `--callers` (1 code reference + extern decl); the `lightobj` call-site arm is named omitted in-commit with a grep-verified no-symbol claim.
- Wrapped callee re-read (not assumed): JS `hates_light(ptr)` is `(ptr?.mndx | 0) === PM_GREMLIN` — a pure equality returning a real boolean, so no truthiness gap vs C's `(boolean)` cast. C `hates_light` is likewise gremlin-only (no PM handling that `mndx` indexing could miss); the D-log's PM_GREMLIN mndx-40 probe (true on gremlin, false on orc, false on null) corroborates both layers.
- Placement (directly after `hates_light`, beside `mon_hates_silver` D-1254) keeps the mondata.c wrapper family together — same convention as the sibling predicate port, no new pattern introduced.
- Dead-code check: the function is live-but-unwired (caller arm named omitted). No other JS caller was added or needed in this commit — `grep`-level single-use confirmed by the D-log's no-symbol claim for `js/uhitm.js` (`artifact_light`/`lamplit`/`lightobj` all absent there).

## Hallucinations / overclaim

None. No corpus claim beyond the disclosed vacuous note.

## Cited ranges (tool-pinned)

- C body in full (`mondata.c:546–550`, via `csym.mjs`):
  `mon_hates_light(struct monst *mon)`
  `{ return (boolean) hates_light(mon->data); }`
  plus `extern.h:1878` (NONNULLARG1) and the sole caller
  `uhitm.c:1039` (`artifact_light(obj) && obj->lamplit && …`).
- JS: `hates_light` monsters.js (~334–337),
  `mon_hates_light` directly after, beside `mon_hates_silver`.
- D-log probe matrix (deleted): gremlin data → true/true;
  orc data → false/false; null → false (guard arm only).
- Diff size (+9/−0) is the whole C function plus the JSDoc
  citation — nothing else in `js/` was touched, so the
  blast radius is provably one predicate.

## Density

Minimal but C-complete: the entire C function is 5 lines, so 9 JS lines (with citation comment) satisfy §2b density by the "unless C is that small" clause.

## Verification

- `hidden-proxy verify mon_hates_light --base 73408064~1`: 0 blocked at baseline and now — matches D-log.
- No new edges; nothing to `--can`. Callee closure: single LIVE callee.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
