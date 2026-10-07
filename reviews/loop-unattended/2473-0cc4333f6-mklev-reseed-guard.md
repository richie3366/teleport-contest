# Review 2473 — 0cc4333f6 — mklev reseed pairs through live guard (D-3591)

**Metadata.** SHA `0cc4333f6` (2026-10-07, D-3591). Type: **batch
recheck** (2 functions, self-labeled; not a cliff row). `js/`
insertions: 29 (`js/rng.js` +18, `js/mklev.js` +7/−6, `js/do.js` +4)
+ committed test.

## Intent vs deliverable

Promise: close the mklev measurement gap (C calls reseed_random
×4; JS had comments) by adding a `reseed_random(fn)` export with
the live `:293` guard and wiring all six C call sites (mklev ×4,
goto_level reload ×2); no movement expected — the deliverable is
the manifest function whole.

Diff actually adds: the export, the 6 calls in C order/slots,
import-name extensions on pre-existing edges (both files newly
name `rn2_on_display_rng` too — needed as the `fn` argument), doc
updates. Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | reseed_random | partial (guard live, entropy arm named) | [rng.js](/home/debian/dev/teleport-contest/js/rng.js:61) | rnd.c:288–295 |
| 2 | mklev reseed arms | ported (whole incl. 4 calls) | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:2937) | mklev.c:1577–1593 |
| 3 | goto_level reload reseed pair | ported | [do.js](/home/debian/dev/teleport-contest/js/do.js:2025) | do.c:1709–1710 |

Helpers: none. `rn2_on_display_rng` is a live rng.js export passed
as the `fn` value, matching C's function-pointer argument.

## C ↔ JS fidelity

**Guard and all six sites exact.** C `reseed_random`
(rnd.c:288–295 via `csym.mjs`) is `if (has_strong_rngseed)
init_random(fn)`; `--callers` returns exactly the 6 sites, all
wired here, no others (repo grep agrees) ✓. `has_strong_rngseed`
defaults FALSE (decl.c:84, read) with the sole setter at
unixmain.c:824 inside the DEV_RANDOM arm (grep-verified) ✓; no
`js/` writer exists (grep), so the guard reads permanently-false
in scored builds exactly like the recorder under NETHACK_SEED ✓.
mklev slots (:1579–1580 head, :1591–1592 tail) and the goto_level
slot (after the `tricked_fileremoved` gate, before `getlev`,
do.c:1704–1711, read) match C order ✓. The named omit
(`init_random` ← OS entropy) is by-design with no scored analogue
under Rule #2, named in the D-entry, the code comment, and the
ledger `partial` row — and unreachable (no setter) ✓. No RNG
consumed on either path.

## Hallucinations / overclaim

None. "No movement expected" is stated upfront, not dressed as
progress; behavior pins holding pre/post-fix is disclosed with
its mechanism (guard preserves the no-op).

## Density

Fidelity ACCEPT ×3 → SHA ACCEPT on the code. Process note (not a
C-wrong, not enqueueable): at this SHA's parent the cliffs block
was full-headed (`apply.c use_whip`, Tourist-94111@109 — quoted
from the parent queue), so a batch unit was off-head under the
playbook §2b "one cliff per iteration" rule. It ships live C (a
new export + 6 wired sites), not ledger text, so it is not the
no-op iteration the Method defines (empty `js/` diff) — but it
moved zero sessions while the head waited. Its twin D-3593 (batch
audit, no `js/`) is outside this review's JS-touching scope.

## Verification

- Added-code grep: clean (no FORCE/DIAG/RNG/seed/coordinate hits).
- Rule #2: clean this iteration (see 2471).
- Committed test `mklev-reseed.test.mjs`: 4/4 PASS now.
- Re-measure (mine): `verify mklev,reseed_random --base
  0cc4333f6~1 --reach-all` → vacuous ×2 (0 blocked at baseline,
  as the D-log says) + smoke 24/24 REACH-OK ×2. No REGRESSED
  session.
- Full 44/44 claimed in-ship, re-covered by this audit's gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
