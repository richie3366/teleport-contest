# Review 1607 — c2b834cd — topten.c readentry whole-body port (D-2648)

**Metadata:** SHA `c2b834cd`, `topten.c` `readentry`, D-2648. JS:
`js/topten.js` (+102/−29: exported `readentry` restart,
`readentry_line` demoted to delegate, `read_record_entries` calls the
new export). No prior review claimed closed.

## Intent vs deliverable

Subject promises: 13-field fscanf arm, SCANBUFSZ remainder cut,
pre-3.3 fmt32 arm with str2role→filecode fixup + Mal/Fem + "?"
defaults, fmt33 six-field arm, Y2K gated on points>0. Diff delivers
all five. Promise matches deliverable.

## Inventory

- `readentry(line)` (topten.js:423, sync, exported) — restart of the
  `readentry_line` body in C order.
- `SCANBUFSZ` const (from topten.c:59 formula).
- `readentry_line` → one-line delegate; `read_record_entries` calls
  `readentry` (points==0 terminator preserved).
- `roles` joined the existing `./roles.js` import (ALREADY, no new
  edge). No deleted symbol, no clone→import re-point.

## C ↔ JS fidelity

C locus `topten.c:220–298` read here in full (quoted above). No RNG
either side. Arm-by-arm confirm:

- `:238–245` 13-field fscanf ≡ JS 13-group regex (3 dotted version
  + 10 signed); mismatch → points=0 ✓.
- `:246–257` fgets remainder: C keeps `SCANBUFSZ−2` chars + `\n` when
  no newline fits ≡ JS `slice(0, SCANBUFSZ−2) + "\n"` under the same
  length gate ✓ exact (VFS pre-split ⇒ JS's appended `\n` ≡ C's
  fgets newline).
- `:259–276` fmt32: two-char role/gender + `[^,],[^\n]` regex ≡ C
  `"%c%c %[^,],%[^\n]"` ✓; one-char truncation ✓; fail → points=0
  with the str2role/filecode + `?`/Mal/Fem/`?` fixup applied
  UNCONDITIONALLY after (matches C `:267–276` sitting outside the
  sscanf if) ✓. `str2role` live (roles.js:890 sync) ✓.
- `:277–287` fmt33 six-field arm, fail → points=0 + return ✓;
  copynchars widths per field ✓.
- `:293–297` Y2K fixup gated on `points > 0` ✓ (JS newly gates it;
  the old body ran it unconditionally — a latent fix in the right
  direction).
- OMITs named with C cites: `discardexcess` (FILE-streaming; every
  fail arm still zeroes points), UPDATE_RECORD_IN_PLACE fpos
  (VMS-only), NO_SCAN_BRACK/`nsb_unmung_line` (ifdef off in this
  build — and unmunging would corrupt modern text), alloc≡GC ✓.
  `copynchars` file-local clone justified (no `\n` post-split ⇒
  slice ≡ C's newline stop) — verified CLONE rationale.

Two degenerate-case narrowings, both garbage-in only, not filed:
multi-space after uid (C's trailing fmt space eats all; JS eats one)
and `+`-signed numerics (C scanf accepts; JS doesn't). Real record
lines have single spaces and unsigned versions. The empty-remainder
change (`(.+)` → ` ?(.*)`) errs toward points=0 where C would bleed
into the next line — saner, unobservable on real files.

## Hallucinations / overclaim

None. Callee closure is complete (newttentry/copynchars file-local,
str2role/roles live); no stub in any live arm.

## Density

Breadth phase: 102 insertions restarting a 79 L C function — one
function, right-sized.

## Verification

D-log Verify bullet claims PASS + smoke REACH-OK + probe 6/6.
Re-measured here: `hidden-proxy.mjs verify readentry --base
c2b834cd~1 --reach-all` → 0 blocked both sides (vacuous note quoted
verbatim, correctly labeled) + smoke 24/24 REACH-OK, no REGRESSED.
Claim true. Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates/
fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
