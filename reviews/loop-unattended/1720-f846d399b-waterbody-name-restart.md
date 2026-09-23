# Review 1720 — f846d399b — waterbody_name C-order restart (D-2761)

- SHA: `f846d399b` (`pager.c` waterbody_name: whole-body restart, D-2761)
- Files: `js/hack.js` (+53/−41)
- D-log: D-2761; queue row: Open (whole-body restart), 0 corpus blocks
- Banned grep: 0 hits

## Intent vs deliverable

Subject promises a C-order restart with live `Is_qstart` and 14 wired
callers. Diff reorders the body into the C else-if chain with per-arm
cites and swaps the inlined qstart compare for the `Is_qstart` import.
Promise kept (callers were/are pre-wired; signature unchanged).

## Inventory

| JS symbol | Class | C counterpart |
|-----------|-------|---------------|
| `waterbody_name` (export, restarted) | C body | `pager.c:558–611` (csym range) |
| qstart test | local inline → import (re-point) | `Is_qstart` |

Required re-point output: `Is_qstart` is a single export
(js/quest.js:60, `on_level(lev, game.qstart_level)`); the inline it
replaces is deleted in this diff. Equivalence: old code required
non-null `uz`/`qstart_level` + field equality; `on_level` uses
`(a?.dnum|0)===(b?.dnum|0)` conjunction — equal in every reachable
state (a null side only matches a zero level, which the quest start
never is). `Role_if(X) ≡ gu.urole.mnum==X` (`you.h:247`) matches the
`game.urole?.mnum|0` test.

## C ↔ JS fidelity

Arm-for-arm exact vs `pager.c:561–611`: hallucinate computed first
(`:565`), isok → "drink" (`:567–568`), `ltyp = SURFACE_AT` (`:569`),
molten/ice-frozen/pool-of/moat (halluc-deep → medusa → juiblex →
samurai+qstart pond → moat)/waterwall (limitless-water-before-halluc)/
lavawall/unreachable "water" — order, strings, and nesting all match.
Static-buffer aliasing documented as fresh-strings (correct JS
reading of the `:558` use-or-copy contract). All callees live
(isok/SURFACE_AT/Hallucination/hliquid/Is_medusa/Is_juiblex/Is_qstart/
Is_waterlevel). No RNG. 14 real C call sites all have JS counterparts
(verified mapping incl. `pager.c:647` ≡ trap.js:2902 ice_descr rating
line); the one extra JS call (`readobjnam.js:498`, should be
`ice_descr` per `objnam.c:3683`) is explicitly fenced in the D-log as
its own follow-up row with the live target cited — a proper handoff,
not a miss.

## Hallucinations / overclaim

None. The D-log discloses the reorder as behavior-preserving and names
the caller-side follow-up rather than burying it.

## Density

~53 insertions for a 54-line C body: right-sized.

## Verification

Re-ran `hidden-proxy.mjs verify waterbody_name --base f846d399b~1
--reach-all` → 0 blocked, smoke 24/24 REACH-OK. Matches the bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
