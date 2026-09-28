# Review 2006 — d81780b83 — Hello Valkyrie mail-daemon Hallo arm

Metadata: SHA `d81780b83`, D-3046, js/roles.js (+7/−3) + new
scripts/hello.test.mjs (55 lines, committed test).

## Intent vs deliverable

Subject promises "Hello Valkyrie mail-daemon Hallo arm". Diff actually
does: expands the Valkyrie arm with the mtmp-gated `Hallo` return +
per-arm cites, plus a 4-case node:test pinning the whole body. Matches.

## Inventory

- `Hello` (arm fix, same export) — C role.c:2119–2140.

## C ↔ JS fidelity

C Valkyrie arm (`:2132–2136`): `Hallo` iff `MAIL_STRUCTURES` is compiled
in AND `mtmp && mtmp->data == &mons[PM_MAIL_DAEMON]`, else `Velkommen`.
`#define MAIL_STRUCTURES` verified live at global.h:430 (unconditional),
so the arm is real C — the `#ifdef` is always taken in this tree. JS
`mtmp && mtmp.data?.name === 'PM_MAIL_DAEMON'` mirrors the Samurai arm's
pointer-identity check two cases above in the same function (pre-existing
JS convention: `.data` is the mons() entry carrying `.name`; pointer
equality ⇔ name equality given unique entry names). Branch order is C
order; `Hello` draws no RNG. 0 C callees, no new imports/edges. Callers:
unchanged (same export, same signature) — "every C caller wired" holds
vacuously since wiring predates this arm fix.

The committed test pins all five Role_switch arms plus both mtmp-gated
sub-arms (Samurai shk + Valkyrie mail-daemon) with null/non-daemon
negatives — the Hallo subtest failed pre-fix, passes post-fix. Durable
collateral kept with the project, as required for behavior changes.

## Hallucinations / overclaim

None.

## Density

One-arm fix (~10 lines) + a focused test — below the ~80-insertion
density floor, but this is the tail of a coverage row (the function's
only remaining gap) with a committed regression test, not a padded
handoff. Acceptable.

## Verification

D-log cites verify.mjs → PASS + REACH-OK (no RNG reach) +
green/strict/cohort (full skipped, single non-shared file — legitimate)
plus the 4/4 focused test. Re-measured: `hidden-proxy.mjs verify Hello
--base d81780b83~1 --reach-all` → 0 blocked (vacuous, expected — D-log
says so), smoke 24/24 PASS → REACH-OK, no regressions. Diff grep: no
FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
