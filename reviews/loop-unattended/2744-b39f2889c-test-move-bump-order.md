# Review 2744 — b39f2889c — test_move wall-bump before doorway-OUT

Metadata: SHA `b39f2889c`, D-3887, `js/cmd.js` only (+ focused test),
1 function (`domove` inline of `test_move`). Cliff-phase writer fix.

Intent vs deliverable: subject promises a verbatim move of the
`blocksMove` bump block to directly after the autodig arm, before the
testdiag block, moving Arch-582618 s286 to PASS. Diff actually adds:
+20/−16 lines, the identical block (incl. the D-1800 nomul note)
relocated plus a 4-line order-cite comment. No predicate, signature, or
import change. Promise = diff.

Inventory: `domove` (js/cmd.js:6809) — changed, block order only.

C ↔ JS fidelity: C `nethack-c/upstream/src/hack.c:989-1255` (via
`csym.mjs`) opens `test_move` with "Check for physical obstacles.
First, the place we are going": `if (IS_OBSTRUCTED || IRONBARS) {…
return FALSE; } else if (IS_DOOR(…)) {…}`, with the doorway OUT check
later (`:1229–1235` per the D-log). The obstructed arm strictly precedes
the door branch and every diagonal/doorway check — confirmed in the C
body above. JS previously ran the doorway testdiag before the bump, so
a doorway hero bumping a wall read the OUT message; now the bump runs
first, matching C's branch order. Same-state evidence (canonical grid
decode, hero on open DOOR, SW target HWALL) makes this a control-flow
fix, not state tailoring. The C skeleton (hack.c:1013,1074,1229):

```c
if (IS_OBSTRUCTED(tmpr->typ) || tmpr->typ == IRONBARS) {
    …mention_walls / autodig / return FALSE…
} else if (IS_DOOR(tmpr->typ)) {
    …closed-door arms…
```

with the doorway OUT check further down (`:1229–1235`) — the obstructed
arm strictly dominates all of them. The moved JS block is byte-identical
apart from the comment, so no new predicate risk; behavior changes only
when `blocksMove(target)` is true, where C also bumps first. Pre-existing
order gaps in the same inline (OUT-before-squeeze, missing
`!Passes_walls` gates) are named in the subject as untouched — correct
scoping, no session names them.

Hallucinations / overclaim: none. The `wizterrainwish` owner is
explained (fuzzy-match source of "A wall."), and `verify domove`
0-blocked is labeled "NOT a corpus PASS". `wizterrainwish` itself
correctly untouched.

Density: one cliff writer, whole-function order fix, one probe session,
movement claimed. Same-C-file, single-function commit. Ledger touch
present. Session-reaching.

Verification: re-measured myself. `verify wizterrainwish --base
b39f2889c~1 --reach-all`: 1 blocked at baseline,
`scen-chain-Archeologist-582618: PASS`, `1 PASS, 0 moved past, 0
unchanged, 0 worse → PROGRESS`, reach 13/13 REACH-OK. D-3887 movement
claim reproduces; no REGRESSED row. No symbol delete/re-point (comment
+ move only), so no `sym.mjs` output required. Rule #2 clean (checked
this iteration). No FORCE/DIAG/seed/coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
