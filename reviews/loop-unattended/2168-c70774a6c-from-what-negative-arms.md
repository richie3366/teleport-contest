# Review 2168 — c70774a6c — from_what negative INVIS + CLAIRVOYANT

SHA `c70774a6c`, D-3208; 2026-10-01; `js/attrib.js` (+18/−6) +
new `scripts/from_what.test.mjs` (5 tests). Single-function
Must-fix closing review 2165 finding 2.

## Metadata

- Subject: "`attrib.c` from_what negative INVIS + CLAIRVOYANT arms
  (review 2165 finding 2) (D-3208)".
- Promises: the two `if` arms in C switch order after the BLINDED
  arm; blocked masks from the JS dual store; C-exact slot bits and
  `ysimple_name(uarmc/uarmh)` suffixes; no new module edges.

## Intent vs deliverable

Kept. Diff adds the INVIS and CLAIRVOYANT negative arms to
`from_what`, rewords the JSDoc (the two arms leave Named omissions),
extends the existing const.js import (INVIS/CLAIRVOYANT/W_ARMC/
W_ARMH), and ships a 5-case headless test. The BLINDED arm is
byte-identical apart from a comment move. No other JS touched.

## Inventory — from_what (negative arms)

Changed in place: `js/attrib.js:1229–1254`. Callees: `ysimple_name`
(pre-existing live import, `js/objnam.js:3039` sync ✓ — the
pickup.js:221 local clone is untouched and out of scope),
`bare_artifactname`/`is_art` (pre-existing). No new imports beyond
consts on the existing static edge; no dynamic import added.

```text
ysimple_name     js/objnam.js:3039   sync (already imported at attrib.js:63 ✓)
```

All LIVE, no clones, no STUBs. Deleted/re-pointed: none.

## C ↔ JS fidelity — from_what negative arms

C `attrib.c:980–996` (csym range `904–1001`, lines read directly):
`switch (-propidx)` with `break` after each case — BLINDED
(`BBlinded && is_art(ublindf, EYES)` → bare_artifactname), INVIS
(`uprops[INVIS].blocked & W_ARMC` → ysimple_name(uarmc)), CLAIRVOYANT
(`wizard && blocked & W_ARMH` → ysimple_name(uarmh)). JS ports the
three as an `if` chain in C order — equivalent since C never falls
through ✓; predicates bit-exact (same slot bits, same `&&`
structure) ✓; `" because of %s"` template = C `because_of` ✓; the
inner `wizard &&` on CLAIRVOYANT ported as written though vacuous
under the outer wizard gate ✓ (D-log says so). No RNG in C; none
added.

Dual-store justification verified, not trusted: `apply_w_blocks`
(`js/do_wear.js:622–637`, read) writes both the flat `BInvis`/
`BClairvoyant` mirrors and `uprops[].blocked`; every live reader
(`cloak_Invis` at do_wear.js:868–873, invent.js:6687/6755) ORs the
two stores. `(B | uprops.blocked) & W_ARMx` ≡ C's single mask test
when both stores agree, which the writer guarantees. The two
healed callers were read in post-image: invent.js:6691–6700
strsubsts `from_what(-CLAIRVOYANT)` into "if not for", invent.js:6762
passes `from_what(-INVIS)` to the "visible" line — both now render
suffixed in wizard mode as C does.

Test pins the wiring against live `ysimple_name` (not hardcoded
strings): blocked-bit set → suffix names uarmc/uarmh; bit clear →
silent; non-wizard → silent. Ran: 5/5 pass.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Vacuous under the outer wizard gate, ported as written" and
the vacuous-verify framing are explicit. No corpus PASS claimed.

## Density

Must-fix ships alone per §2b. One function, whole negative switch,
with its own Ledger entry and Verify lines.

- Ledger: from_what ported — ACCEPT (arms completed; birth
  blind/deaf + Blindfolded_only/cream stay map-named, pre-existing
  positive-propidx scope outside this Must-fix).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify from_what: baseline c70774a6c~1 (scoreboard at 7eb25b655) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke from_what: no RNG-tagged reach; fixed smoke spread (24 run, 14.7s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green/strict/cohort).
No REGRESSED session. The new unit test (5/5) covers what smoke
cannot (wizard-gated suffix text).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
