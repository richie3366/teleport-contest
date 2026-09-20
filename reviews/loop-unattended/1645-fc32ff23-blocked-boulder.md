# Review 1645 — fc32ff23 — `pray.c` blocked_boulder whole-body port (D-2686)

Metadata: commit `fc32ff23`, D-2686, js/pray.js only (+3 import names,
body restarted). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body `blocked_boulder` (count-2 pool/lava sink
arm + live sobj_at/is_pool/is_lava). Diff actually adds: `switch
(count)` 0/1/2/default replacing the collapsed `>= 2 → blocked`, live
`sobj_at` replacing the hand loop, +3 imports, stale header-omit word
retired. Matches the promise; no extras.

## Inventory

Changed JS: `blocked_boulder` (js/pray.js:397, module-local — C
`staticfn`, correct shape).

## C ↔ JS fidelity

C locus: `pray.c:2676–2719` (csym; D-log `:2677–2719`). Caller
`:176` stuck_in_wall → js/pray.js:454 (same file, unchanged).

Branch-by-branch confirm: count loop; nx/ny two-out; case 0 → FALSE;
case 1 → break; case 2 → `is_pool||is_lava` breaks through else
falls to default TRUE (exactly C's break-then-FALLTHROUGH shape);
default → TRUE; Sokoban diagonal; isok; IS_OBSTRUCTED; sobj_at;
FALSE. Confirm throughout.

Callee audit (the risky join): C `is_pool_or_lava` "does its own
isok() check" — JS `is_pool` (js/hack.js:1717) and `is_lava`
(:1734) both `isok`-guard first (read in-session), so the OOB path
returns false and falls to the `!isok → TRUE` arm below, exactly like
C. `sobj_at` (js/mkobj.js:2758, canonical export) walks the same
nexthere chain the retired hand loop walked — boolean-equivalent.
`sym.mjs` pasted in-session: all three single live exports, no new
clones. Sokoban triple-flag (`sokoban_rules||sokoban||game.Sokoban`)
is pre-existing (not widened here) with the do.js idiom cited.

No RNG. Diff grep: no FORCE/DIAG/seed/coordinate. Rule #2 clean
(iteration-wide). `--can` ALREADY on both edges (import-name-only
change).

## Hallucinations / overclaim

None. The stale header omit ("pool sink nuance") is retired because
the nuance shipped, not silently.

## Density

Breadth-phase whole-function port (C 44 L), ~40 JS insertions in one
module — right-sized.

## Verification

D-log Verify (tail beyond the shown hunk — green/strict/cohort per
pattern). Re-ran `hidden-proxy.mjs verify blocked_boulder --base
fc32ff23~1 --reach-all`: "0 blocked (0 at baseline…)" — queue cited
0, vacuous note properly stated — plus "24 PASS, 0 regressed →
REACH-OK". No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
