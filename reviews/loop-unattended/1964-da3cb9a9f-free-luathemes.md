# Review 1964 — da3cb9a9f — mklev.c free_luathemes (D-3004)

Metadata: SHA `da3cb9a9f`, D-3004, single-function `mklev.c`
port + caller wiring. Stat: `js/mklev.js` +33 (group consts
+ port), `js/do.js` +9/−1 (import + else-arm wiring,
Named omit deleted). No prior review file on disk.

## Intent vs deliverable

Subject promises: "port `free_luathemes(theme_group)` in C
order, plus the `hack.h` group consts ... `do.c:1646`
caller wired." Diff actually adds exactly that and deletes
the `// Named omit` it replaces. Promise and diff match.

## Inventory

- `free_luathemes` (NEW, exported sync, `js/mklev.js:28288`):
  whole C body (group filter + slot release).
- `all_themes`/`most_themes`/`tut_themes` (NEW, exported
  consts, `:28277–28279`): hack.h enum values.
- `js/do.js:1699`: else-arm call
  `free_luathemes(leaving_tutorial ? tut_themes :
  most_themes)`; import extended on the existing mklev edge
  (no new edge). No clone deleted, so no `sym.mjs`
  deletion output is required (`free_luathemes
  js/mklev.js:28288 sync` spot-checked).

## C ↔ JS fidelity

`free_luathemes`, `csym` `mklev.c:344–364` (21 lines, read
whole): group comment `:348–353` → filter predicates
`:356–358` reproduced exactly (`tut_themes && i !==
tut_dnum`, `most_themes && i === astral_dnum`) ✓; slot
release `:359–362` (`nhl_done` then `= NULL`) → `delete
loaded[i]` with the by-design `nhl_done` cite ✓
(`delete` ≡ NULL for every truthiness read; the lua state
itself is compiled in per nhlua by-design). Early return
when the table was never built is outcome-identical to
C's all-NULL no-op loop ✓. Enum values verified against
`hack.h:427–431`: 1/2/3 exact ✓. No RNG, no stub, no
silent omit in the body.

Callers (`--callers`: exactly 2 refs): `do.c:1646` →
`js/do.js:1699` in the matching `else` of the
`!cant_go_back` branch (verified against `do.c:1640–1647`
in-session; same ternary) ✓. `save.c:1067` (inside
`free_dungeons()`) → NOT wired; named in the D-entry
Callers + Named omissions bullets — but see Overclaim.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 re-verified clean this iteration (1963).

## Hallucinations / overclaim

One false statement in the D-entry, in the Named omission
for the save.c caller: it claims `free_dungeons()` "body
is `#ifdef FREE_ALL_MEMORY`-guarded (memory-debug builds
only; absent from production/recorded C)". The guard
exists (`save.c:1062`) but it is NOT debug-only:
`config.h:630–632` carries an unconditional
`#define FREE_ALL_MEMORY` ("neither experimental nor
inadequately tested"). So `free_luathemes(all_themes)` at
`save.c:1067` IS live production C, and the stated reason
for not wiring it is wrong. The remaining half of the
sentence is true and carries the actual weight: JS has no
`free_dungeons` at all (pre-existing named omit,
`js/topten.js:1209`), so there is no live JS exit path to
wire the call into — the caller function itself is
unported, which is the coherent rationale. Outcome impact
is nil (end-of-game teardown; no scored session continues
past exit; REACH-OK below), but the review corrects the
record: the omit stands on "caller unported", not on the
build gate.

## Density

Single-function cluster, +42 lines — below the ~80-line
density floor, but this is the "sole Open row of its
file/closure" case the playbook allows (D-entry Next says
exactly that; no same-file Open rows to grow with).
Whole function, caller wired-or-named → OK.

## Verification

D-log: `verify.mjs --fn free_luathemes` → syntax · rule2 ·
note hidden · REACH-OK (smoke 24/24) · green 2/2 · strict
×2 · cohort 7/7 · full 44/44 · VERIFY: PASS. Re-measured
here (`--base da3cb9a9f~1 --reach-all`): 0 blocked at
baseline and in the working scoreboard +
`fixed smoke spread (24 run): 24 PASS, 0 regressed →
REACH-OK` (captured in-session). Honest vacuous note for
a coverage row. Zero REGRESSED. No seed/step/coordinate/
RNG-index reads.

## Actionable C-wrongs

None queued. The body is exact and both callers are
accounted for; the one defect found is D-log prose (wrong
build-gate rationale), which is not a JS-vs-C wrong and
takes no port iteration to fix. Debt recorded (review-debt,
unqueued):

1. D-3004 Named omission rationale for the `save.c:1067`
   caller misstates the build gate (FREE_ALL_MEMORY is
   unconditionally defined, `config.h:632`). Correct
   rationale: caller `free_dungeons()` itself is an
   unported named omit (`js/topten.js:1209`). Correct the
   line when that area is next touched; do not wire
   `all_themes` into a nonexistent exit path.

Verdict: **ACCEPT-WITH-DEBT**
