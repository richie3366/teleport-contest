# Review 1365 — 0c7b4556 — mthrowu.c u_catch_thrown_obj catch arm (D-2399)

- SHA: `0c7b4556`, D-2399 (spoteffects park writer). JS file:
  `js/mthrowu.js` only (+9/−6; import line +1). Scoreboard touched
  (verify resale, not `js/`).
- Prior reviews closed: none (park-writer row, 1 block).

## Intent vs deliverable

Subject promises the catch arm: `nohands` on the live form,
`simpleonames` pre-addinv, canonical `hold_another_object`, and C
`break` (not return) into the loop tail. Diff delivers all four, and
the corpus session moves past the park owner. Promise kept — with
one callee exception below.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `u_catch_thrown_obj` (mthrowu.js:602) | static → async, file-local | LIVE — C is `staticfn` in `mthrowu.c`; home-module local is correct (`sym.mjs` "NOT EXPORTED + 1 local" is the tool's generic flag, not drift) |
| `hold_another_object` (invent.js:7246) | C callee, pre-existing import (:31) | LIVE, awaited |
| `simpleonames` (objnam.js:2544) | added to live static edge | LIVE (`--can` → ALREADY, no new edge) |
| `freehand` (mthrowu.js:292) | local clone in the shipped guard | DIVERGENT — C-wrong 1 |
| caller `m_throw` site | `return` → `break`, awaited | LIVE |

Nothing deleted; no clone → import swaps in the diff.

## C ↔ JS fidelity

C loci: `u_catch_thrown_obj` (`mthrowu.c:532–550`, csym range),
caller (`:695`), loop tail (`:824–843`, read in pinned source).

- Gate order exact: `!Blind && !Confusion && !Stunned && !Fumbling &&
  oclass!=VENOM && !nohands(youmonst.data) && freehand() &&
  calc_capacity <= SLT_ENCUMBER && !rn2(catch_chance)` — `rn2` still
  last, short-circuit order kept. The `mons(PM_HUMAN)` → live-form
  fix matches C `gy.youmonst.data`. ✓
- Body exact: `buf`/`drop_arg` both `simpleonames(otmp)` pre-`addinv`
  (C `:544–547`); JS computes the pure formatter once — no RNG in
  `simpleonames` (name tables only), so single-evaluation is
  equivalent and pre-`hold_another_object` ordering holds. ✓
- Caller exact: C `:695` is `break`, and the tail (`tmp_at(bhitpos)`,
  `DISP_END`, `mesg_given = 0`, `blindinc`, `thrownobj = 0`,
  `:827–843`) is what the old JS `if (sym) tmp_at(DISP_END,0);
  return` skipped. The fix deletes invented paint AND the wrong
  control flow together. ✓
- C-wrong 1: the guard's `freehand()` is C `engrave.c:472–477`
  (`!uwep || !welded || (!bimanual && (!uarms || !cursed))` — the
  ONLY `freehand` in pinned C, `extern.h:1018`; `grep` over
  `src/*.c` confirms no second definition, so the clone's "C
  invent.c freehand" docstring names a home that does not exist).
  The mthrowu.js:292 re-def (`oc_big`/`uswapwep`, no welded check)
  diverges observably: welded weapon → C FALSE vs clone TRUE;
  big weapon + swap set → C TRUE vs clone FALSE. The arm shipped
  with an unverified clone in its gate chain, and
  `imports.mjs --can mthrowu.js engrave.js freehand` → **SAFE**
  (hoisted fn, same shape as existing edges) — not cycle-forced,
  fix path open. "Churns gate outcomes" (D-log) is true but C-ward.

## Hallucinations / overclaim

None on the shipped arm — the D-log discloses the clone with its
reason rather than claiming "Match C" for the guard, and the
PROGRESS claim re-measures exactly (below). The disclosure does not
cure the C-wrong (divergent clone ≠ named omit), hence the verdict.

## Density

One C arm + caller, code + map + measured verify. Right-sized.

## Verification

- Added-line grep `FORCE|DIAG|getRngLog|fastforward|hardcod` → 0.
- Re-measured: `hidden-proxy verify spoteffects --base 0c7b4556~1`
  → `1 blocked at baseline, 0 working; scen-tour-Samurai-92161
  moved → distfleeck at step 37 (was 35); 0 PASS, 1 moved past, 0
  worse → PROGRESS`. Reproduces the D-log line-for-line on this
  iter's run. Genuine movement, not a vacuous check.
- D-log's green 2/2 + strict ×2 + cohort 7/7 accepted.

## Actionable C-wrongs

1. `u_catch_thrown_obj` guard calls the divergent `freehand` clone
   instead of C `engrave.c:472–477`. Fix (one iter): import the
   canonical `freehand` (`--can` → SAFE), retire the mthrowu.js:292
   re-def (or re-point its single call site), keep 44/44 + cohort,
   re-verify the Samurai session moves same-or-better. No corpus
   session currently blocks on the welded/big corner, so the fix
   ships on the C citation + gates.

Verdict: **QUALITY-RISK**
