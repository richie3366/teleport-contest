# Review 2679 — 0b7322b84 — rottenfood spin-faint triple + foodword

Metadata: SHA `0b7322b84`, D-3815, cliff row-2 `eat.c` rottenfood
(@ba9e6fe06; owner itself). JS: `js/eat.js` (triple + foodword
pline + disp.botl, two import names). Test:
`scripts/rottenfood-spins.test.mjs`.

## Intent vs deliverable

Promise: the spin-faint what/where triple was hardcoded to the
sighted arm; now ported in C order (rnd(10) first, then
Blind/airborne/slap arms) via live pline_The, Blecch pline takes
live foodword(obj), disp.botl set in C position. Claimed: 95349 →
PASS. Diff actually does: triple + pline + botl flags + two
import names on ALREADY edges. Match.

## Inventory

- `rottenfood` (js/eat.js:2432) — changed: Blecch pline gains
  foodword, else-arm triple ported, botl flags. C `eat.c:1812–1851`
  (csym range; whole body verified below).
- Callees: `rnd` (rng.js, live), `Blind` (pre-existing use),
  `Is_airlevel`/`Is_waterlevel` (const.js:3259 live; new name on
  ALREADY edge), `surface` (sit.js, pre-existing import),
  `pline_The` (display.js:8750 ASYNC, awaited; ALREADY edge),
  `foodword` (eat.js:345 in-file, C staticfn mirror — verified),
  `Hear_again` (in-file). No deletes, no re-points, no new edges
  (`imports.mjs --can`: both ALREADY).

## C ↔ JS fidelity

C `eat.c:1812–1851` (full csym body) vs JS, branch by branch:
Blecch pline now `is_rottable ? Rotten : Awful` + `foodword(obj)`
— C-identical (foodword C `eat.c:2497–2506` staticfn: FOOD→food,
glass+dknown→makeknown, foodwords[material]; JS matches incl.
makeknown, plus unreachable defensive fallbacks). RNG order
C-exact: rn2(4) → rn2(4)&&!Blind → rn2(3) → `rnd(10)` drawn first
inside the arm, before the non-drawing predicates — JS identical.
Triple: `!Blind → goes/dark`; `Levitation || air || water → lose
control/yourself`; else `slap against the + usteed?saddle:
surface(ux,uy)` — JS identical, with Levitation as C's
`((H||E) && !B)` (youprop.h:240) over the split-storage shape.
Tail: HDeaf itimeout mirror + `disp.botl` AND `flags.botl`
(C :1843 is disp only; the flags mirror is the Hear_again-shape
housing both botl sites use — outcome-identical here) + nomul +
multi_reason + nomovemsg + afternmv + return 1 / return 0 —
complete. Pre-existing arms re-checked: `Your1(vision_clears)` =
"Your vision quickly clears." (decl.c:49) matches JS verbatim.
Gap: none. Branch-by-branch + draw-by-draw confirm.

## Hallucinations / overclaim

None. "Whole vs C :1813–1851" holds — every arm, every C call
(now wired through live callees), returns included. D-3293
foodword deferral genuinely lifted (the pline now calls it).

## Density

Cliff-phase: owner itself, row-2. Ledger: rottenfood arm +
"simplified" note retired. Verify bullet: 1 PASS + reach 52/52
REACH-OK + green + strict + cohort. Named: none. Not unreached:
probe PASSES.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify rottenfood --base 0b7322b84~1
--reach-all` → `1 PASS, 0 moved past, 0 unchanged, 0 worse →
PROGRESS` (95349 PASS) and `reach 52/52 → REACH-OK` — exactly
the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
