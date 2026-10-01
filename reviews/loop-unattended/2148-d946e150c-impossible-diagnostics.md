# Review 2148 — d946e150c — impossible diagnostics and printf formatting

Date: 2026-10-01. Author: unattended review iteration.
Pinned C: nethack-c/upstream; historical JS checkout: d946e150c.
Scope: D-3188; 154 scored insertions, one pline.c coverage unit.
Parent: d946e150c~1. No production changes in this review.

## Intent vs deliverable

Subject promises “restore impossible diagnostics, fatal guards and printf
formatting”. The diff changes impossible and its existing shared
vpline_expand helper, adds the fuzzer constant import, and replaces the
urgent_pline call with C's explicit flag/pline/clear sequence.
No dispatcher or new gameplay function is introduced.

## Inventory — impossible

C pline.c:583–634; JS display.js:8578–8630.
Recursion and fuzzer guards, prefix truncation, urgent diagnostic,
sanitary return, save hint, developer/local support messages and latch
cleanup are represented. csym body and all 633 reference rows were read;
these include comments, headers and tool references, not 633 live callers.
D-3188 maps each reference separately, including unawaited/missing sites.
The C :606 sanity guard surrounds the early return, :612 the save hint,
and :617 the nullable support arm. No RNG in this body.

## C ↔ JS fidelity — impossible

The recursion guard throws before altering the latch. Otherwise the
latch is set before formatting; the fuzzer fatal guard precedes display.
C :595–597 vsnprintf plus pbuf[255]=0 becomes expansion plus prefix slice,
not vpline's tail-preserving truncation. Percent signs in argument strings
are not reinterpreted. URGENT_MESSAGE covers exactly the first awaited
pline; the flag is cleared before testing sanity. Sanity clears the latch
and returns. Normal feedback preserves save-hint order, devteam address,
non-NULL support including an empty string, and final latch clearing.

Callee closure: pline is LIVE, using live vpline/putmesg/putstr.
vsnprintf is a CLONE in vpline_expand, examined below; Strcpy/Strcat use
JS strings, and va_list has no independent state beyond argument order.
panic is an explicit OMIT of end.c:398–470 shutdown/save/core lifecycle,
with fatal Error control flow retained. paniclog :598 and the complete
CRASHREPORT arm :621–631 are named OMITs, not silent dispatch stubs.

## Inventory — vpline_expand

Changed shared formatter, JS display.js:8056–8169; it implements the
formatting section of C vpline, whole body pline.c:152–291, especially
:192–212, and impossible's vsnprintf at :595.
No second C function is sold as newly completed. Existing vpline
wrappers and its 19 csym references retain their bindings.
Integer narrowing, flags, alternate bases, star widths/precision,
strings, characters and literal percent are changed here.

## C ↔ JS fidelity — vpline_expand

The no-percent and exact-%s shortcuts preserve the C branch order.
Star width and precision consume arguments before the converted value;
negative width selects left alignment and negative precision is absent.
Signed/unsigned hh/h/int/64-bit values narrow before radix conversion.
Sign and hexadecimal prefixes precede zero padding; '-' and explicit
integer precision suppress field-zero padding. Octal '#' retains a
leading zero even for precision-zero/value-zero. String precision occurs
before field padding. No RNG, seed, step or log reads occur.
Floating/pointer/%n conversions and non-ASCII byte semantics are named
library OMITs, so this is not a claim of complete libc fidelity.
The existing vpline extreme-overflow panic omission remains documented.

Required symbol resolution for replaced urgent_pline and its targets:

```text
urgent_pline     js/display.js:8551   ASYNC — await required
pline            js/display.js:8238   ASYNC — await required
vpline_expand    js/display.js:8056   sync
```

These are real existing exports; no cycle-forced clone claim is made.

## Hallucinations / overclaim

D-3188 says fixed with named omissions and records impossible as partial,
including the formatter in its ledger mapping. Its hidden note expressly
is not a corpus PASS. The diagnostic caller/await map prevents claiming
complete wiring. “pline callee already complete” must be read with the
existing mapped raw-output/extreme-overflow omissions, not as full libc
or fatal lifecycle parity. There is no live-arm/STUB dispatch overclaim.

## Density

Ledger: impossible partial; one whole C body with explicit omissions,
plus its necessary shared formatter. Verdict: ACCEPT-WITH-DEBT.
Ledger: vpline was retired as stale; the changed formatting subsection is
an auxiliary closure, not an additional whole-function breadth claim.
Verdict: ACCEPT-WITH-DEBT for its already named boundaries.
No bundled Must-fix; within one file/callee closure and ten-function cap.

## Verification

Historical command: hidden-proxy verify impossible,vpline
--base d946e150c~1 --reach-all --jobs 8.
Log: /tmp/review-2148-verify.log; both summaries per function:

- impossible: 0 blocked; vacuous, NOT a corpus PASS.
  Smoke: no RNG-tagged reach, 24 PASS / 0 regressed → REACH-OK.
- vpline: 0 blocked; vacuous, NOT a corpus PASS.
  Smoke: no RNG-tagged reach, 24 PASS / 0 regressed → REACH-OK.

D-log Verify includes the vacuous note, REACH-OK, green 2/2, both strict
sessions, cohort 7/7 and full public 44/44. Independently reran the actual
historical JS bodies against the extracted-C/libc fixtures: 72 whole
impossible guard/message cases and 498 format vectors PASS. The sinks
measure control flow/messages, not real tty or panic lifecycle.
imports --rulecheck scans all scored JS: clean. Diff scan found no
FORCE/DIAG/log/seed/fastforward or trace-coordinate production branches.

## Actionable C-wrongs

None established outside the cited named omissions; no new Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
