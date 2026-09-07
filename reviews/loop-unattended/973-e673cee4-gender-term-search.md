# Review 973 — e673cee4 — create_particular_parse gender-term search (D-2003)

Metadata: SHA `e673cee4`, D-2003, follow-up correction to D-2001
(review 971) in the same C function. js/ touches 1 file
(`js/read.js`, +12/−12, all inside `create_particular_parse`).
`c-js-map/turns.md` touched. No stamp owed (row cites no review).

## Intent vs deliverable

Subject promises: bare `strstri` gender-term search with no leading
pad, plus length-preserving blanking. Diff actually adds: exactly
that — `asciiLow` loses its leading-space pad, both `indexOf` calls
lose their leading space, and both blanking splices go from
`1 space / shorten-by-6` to `7 / 5 spaces in place`. Promise == diff.
The probe case is `shemale elf-lord` → C `fem=0` (MALE), old JS
`fem=-1`.

## Inventory

- Changed JS function: `create_particular_parse` gender block only
  (quan/gear/state/disposition/`*` arms untouched).
- New helpers: none. No deleted symbols, no import re-points — no
  `sym.mjs` delete audit required.
- No STUB added; no new OMIT (rest of parse/creation stays deferred
  per D-2001, pre-existing map rows).

## C ↔ JS fidelity

C locus: `read.c:3184–3194` (read verbatim via `csym.mjs`; range
cited by the tool):

```c
/* check "female" before "male" to avoid false hit mid-word */
if ((tmpp = strstri(bufp, "female ")) != 0) {
    d->fem = 1;
    (void) memset(tmpp, ' ', sizeof "female " - 1);
}
if ((tmpp = strstri(bufp, "male ")) != 0) {
    d->fem = 0;
    (void) memset(tmpp, ' ', sizeof "male " - 1);
}
bufp = mungspaces(bufp); /* after potential memset(' ') */
```

Branch-by-branch confirm:

- Bare search, no leading boundary: C passes `"female "` /
  `"male "` (trailing space only) to `strstri`. JS now searches
  `'female '` / `'male '` on the unpadded lower. ✓ The old padded
  `' female '` was a genuine C-wrong (missed mid-word hits like
  `shemale `), correctly deleted.
- Female-first order: identical on both sides, and load-bearing —
  `"female "` contains `"male "` at offset 2, so the female `memset`
  must land before the male search. JS preserves the order and
  re-searches the blanked string, so `female elf-lord` stays
  FEMALE on both sides. ✓ (Walked, not assumed: blanking destroys
  the inner `male ` hit exactly as C's `memset` does.)
- Widths: `sizeof "female " - 1` = 7, `sizeof "male " - 1` = 5.
  JS splices 7 / 5 spaces, length-preserving like `memset`; the old
  code replaced 7 chars with 1 space (a 6-char deletion C never
  does). ✓
- Case folding: ASCII-only lower matches `strstri`'s byte-based
  `lowc` mapping (A–Z only) — carried over from D-2001, unchanged
  here. ✓
- Trailing-word no-hit (`dwarf female`, no trailing space): no hit
  on both sides, unchanged. ✓ `malebranche`: no trailing-space hit
  on both sides. ✓ No RNG in this block on either side. ✓
- Callee closure: `mungspaces` unchanged, live. No new edges.

## Hallucinations / overclaim

None. The D-log explicitly marks the hidden-verify note vacuous
and does NOT claim a corpus PASS — the honest handling, and review
971 already established no corpus session is affected.

## Density

24 changed lines for an 8-line C locus (two `if`s + two
`memset`s). Below the ~40-insertion guideline, but C is that small
— there is literally nothing more in this arm. Correctly not glued
to D-2004 (different C function, `create_particular_creation`).

## Verification

Re-measured myself: `hidden-proxy verify create_particular_parse
--base e673cee4~1` → `0 session(s) blocked on it (0 at baseline, 0
in the working scoreboard)` — "a vacuous verify is NOT a corpus
PASS", matching the D-log's own disclaimer exactly. D-log's cited
gates (syntax, rule2, green 2/2 + strict ×2, cohort 7/7) are the
applicable gates for a zero-block owner; the 18/18 differential
probe covers the queue probe plus all four D-2001 cases. Grep of
the js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/
`fastforward`. Rule #2 clean (`imports.mjs --rulecheck` re-ran this
iteration: `Rule #2 clean`).

## Actionable C-wrongs

None in this delta. The correction is exact against `read.c:3184–3194`.

Verdict: **ACCEPT**
