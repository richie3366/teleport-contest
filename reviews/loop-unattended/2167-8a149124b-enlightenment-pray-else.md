# Review 2167 — 8a149124b — enlightenment() pray else-arm (finding 1)

SHA `8a149124b`, D-3207; 2026-10-01; `js/invent.js` only (+13/−1).
Single-arm Must-fix closing review 2165 finding 1.

## Metadata

- Subject: "`insight.c` enlightenment() pray else-arm (review 2165
  finding 1) (D-3207)".
- Promises: mirror the overlay pray else-arm into the final
  `enlightenment()` builder under C's `!final` gate; ported as written,
  dead on this builder, zero behavior change.

## Intent vs deliverable

Kept exactly. Diff adds `else { if (!final) { … } }` to the ugangr
block in `enlightenment()` with `can_pray(false)` → "[not ]safely
pray", wizard `ublesscnt` suffix, and the same
`enlght_line_txt(You_, 'can ', …)` rendering as the overlay. No other
JS touched; no new module edge (dynamic import on an ALREADY edge).

## Inventory — attributes_enlightenment (pray arm)

Changed in place: `js/invent.js:7208–7232` (comment cites `:1931–1955`
now). New callee: `can_pray` via inline dynamic import:

```text
can_pray         js/pray.js:917   ASYNC — await required (awaited ✓)
```

LIVE, no clone, no STUB. Edge check: `invent.js already statically
imports pray.js` (ALREADY — no new edge). Deleted/re-pointed: none —
no symbol output beyond the above required.

## C ↔ JS fidelity — pray arm

C `insight.c:1931–1955` (lines read directly): `if (u.ugangr)` anger
arm / `else` with the C comment on death changing can_pray(),
`if (!final)` suppression, `#else` Sprintf `"%ssafely pray"` with
`can_pray(FALSE) ? "" : "not "`, wizard `(ublesscnt)` suffix,
`you_can(buf, "")`. JS mirrors all of it: C nesting `else { if
(!final) }` ✓; `can_pray(false)` ✓ (C FALSE≡0); identical ternary
text ✓; `u.ublesscnt | 0` under the same `wiz` gate as the overlay
✓; `enlght_line(You_, 'can ', attr, '')` ≡ `you_can` under !final
(C picks the present-tense "can" middle when final=0, so the fixed
verb is exact) ✓; `#if 0` wording stays unported ✓ (compiled out).
No RNG in C; none added. The expression at `:7226` is
character-identical to the overlay arm at `:8330`.

Dead-code honesty verified: `enlightenment()` early-returns through
`doattributes(mode)` when `!final` (`js/invent.js:6336–6341`, read in
post-image), so the new `if (!final)` arm is unreachable on this
builder — exactly as the D-log states ("ported as written … zero
behavior change"). The live potion/zap path (`potion.js:1998`,
`zap.js:2787`) renders the line via the overlay builder, unchanged.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "Dead on this builder today", the ALREADY edge, and the
vacuous-verify note are all stated plainly and all check out. The
D-log does not claim a corpus PASS.

## Density

Must-fix ships alone per §2b — the ~80-floor guideline does not
apply. One arm, whole, with its own Ledger entry and Verify lines.

- Ledger: attributes_enlightenment split — ACCEPT (arm completed).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify attributes_enlightenment: baseline 8a149124b~1 (scoreboard at b76d68a29) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke attributes_enlightenment: no RNG-tagged reach; fixed smoke spread (24 run, 12.7s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (vacuous note + REACH-OK, green 2/2, strict ×2,
cohort 7/7). No REGRESSED session. Vacuity correctly labeled, not
presented as a corpus PASS.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
