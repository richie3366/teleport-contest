# Review 1296 — 4d1f4fce — trap.c launch_obj closed-door crash-through (D-2330)

Metadata: SHA `4d1f4fce`, D-2330, Open queue row (cited 0 blocks). Method: `git show` full `js/` hunk (`js/trap.js` +16/−11); C `launch_obj trap.c:3259–3575` (crash arm `:3533–3541`, lookahead `:3544–3561`) + C `closed_door monmove.c:2181–2185` (reads, not csym-range cites — one-line body); `sym.mjs` on `closed_door` (pre-existing clone, not re-pointed — pasted below); added-lines banned-pattern grep (0 hits); `hidden-proxy verify launch_obj --base 4d1f4fce~1` re-run.

## Intent vs deliverable

Subject promises the boulder closed-door crash-through in C order, replacing a C-less forward-cell silent-break. Diff adds the current-cell arm before the `dist>0` lookahead and deletes the lookahead door block. Promise kept.

## Inventory

- Added arm (`js/trap.js:2605–2620`): `otyp===BOULDER && closed_door(x,y)` → cansee-gated `set_msg_xy` + pline → `doormask=D_BROKEN` → `if (dist) recalc_block_point`.
- Deleted: forward-cell `(x+dx,y+dy)` IS_DOOR block (silent `D_BROKEN`, any otyp, one step early).
- Docstring omit retires to STWALL/TREE `Thump!` only.

Sym note (no re-point; the used predicate stays the pre-existing file-local):

```text
closed_door      js/hack.js:113   sync
             !! ALSO 10 LOCAL CLONE(S) in 10 files — IMPORT the export; do NOT add another
```

No clone added or moved — the arm uses `trap.js:707`, whose body (`IS_DOOR` + `doormask & (D_CLOSED|D_LOCKED)`) is verbatim ≡ C `monmove.c:2183–2184` (CLONE-verified here). Zero new imports (hunk carries no import lines; all six names pre-imported).

## C ↔ JS fidelity

New arm vs `:3533–3541`: predicate ✓, cansee gate + `set_msg_xy` + message order ✓ (`pline_The("boulder crashes through a door.")` → "The boulder crashes through a door." ✓), unconditional `D_BROKEN` (null-guard superset, unreachable-null in the roll loop) ✓, `if (dist)` nonzero test ✓, position before the lookahead ✓. Deletion verified faithful: the C lookahead (`:3544–3561`) handles IRONBARS then STWALL/TREE only — no door arm exists, so the old block was invention twice over (wrong cell: forward vs current; wrong gate: any otyp vs boulder-only; silent vs message). Callee closure: all six names live (cansee/set_msg_xy/recalc_block_point/pline reviewed under D-2315 precedent; BOULDER/D_BROKEN consts).

## Hallucinations / overclaim

None. "No behavioral hand probe exists… said plainly, not a PASS claim" — honest; the D-log does not dress the audit as a test.

Side-by-side for the record — C (`:3533–3541`) vs the added JS:

```c
if (otyp == BOULDER && closed_door(x, y)) {
    if (cansee(x, y)) {
        set_msg_xy(x, y);
        pline_The("boulder crashes through a door.");
    }
    levl[x][y].doormask = D_BROKEN;
    if (dist)
        recalc_block_point(x, y);
}
```

```js
if (otyp === BOULDER && closed_door(x, y)) {
    if (cansee(x, y)) {
        set_msg_xy(x, y);
        await pline('The boulder crashes through a door.');
    }
    const doorloc = game.level?.at?.(x, y);
    if (doorloc) doorloc.doormask = D_BROKEN;
    if (dist) recalc_block_point(x, y);
}
```

Every token pairs: `==`→`===` (both numbers), `pline_The`→The-phrase pline, unconditional mask write (null-guard unreachable in the roll loop), nonzero `dist` test. And the deleted block's invention is proven by the C lookahead (`:3544–3561`): IRONBARS-stop, then STWALL/TREE `Thump!` + `wake_nearto` + break — no door arm of any kind, so a boulder entering a closed door in C always reaches the crash arm at the top of the next roll iteration, while the old JS broke the door silently one cell early (and broke doors for non-boulder otyps C leaves alone).

## Density

+16/−11 for one arm swap. Correct (single residual, alone).

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + import smoke + honest vacuous-hidden note. Re-measured:

```text
verify launch_obj: baseline 4d1f4fce~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
