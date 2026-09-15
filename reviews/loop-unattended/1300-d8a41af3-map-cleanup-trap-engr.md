# Review 1300 — d8a41af3 — sp_lev.c map_cleanup deltrap/del_engr arms (D-2334)

Metadata: SHA `d8a41af3`, D-2334, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/mklev.js` +14/−5); C `map_cleanup sp_lev.c:326-356` full body + callers (via `csym.mjs` + `--callers`); `sym.mjs` on `deltrap`/`engr_at`/`del_engr`/`undestroyable_trap`; `imports.mjs --can` (ALREADY ×2 per message — edges pre-exist in the import blocks) + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify map_cleanup --base d8a41af3~1` re-run.

## Intent vs deliverable

Subject promises the two missing `map_cleanup` liquid-cell arms (destroyable-trap delete, engraving delete) in C order after the boulder loop. Diff delivers both, no more. Promise kept exactly.

## Inventory

- Trap arm: `t_at` + `!undestroyable_trap` short-circuit + `deltrap`, C `:347-349` order.
- Engr arm: `engr_at` + `del_engr`, C `:352-353`.
- Import joins: `deltrap` (trap.js), `engr_at`/`del_engr` (engrave.js). Boulder arm untouched.

## C ↔ JS fidelity

Arm-for-arm confirm against `:326-356`: COLNO×ROWNO scan, IS_LAVA||IS_POOL gate, boulder while-loop (pre-existing), trap `if ((ttmp = t_at) != 0 && !undestroyable_trap) deltrap` — JS preserves the short-circuit (`ttmp && !undestroyable_trap(ttmp.ttyp)`) so `deltrap` never runs on portal/vibrating-square ✓; engr `if ((etmp = engr_at) != 0) del_engr` ✓. Callee closure: `deltrap` (`trap.js:1302` sync), `engr_at` (`engrave.js:128` sync), `del_engr` (`engrave.js:156` sync), `undestroyable_trap` (`trap.js:694` sync, body read: MAGIC_PORTAL||VIBRATING_SQUARE ≡ `trap.h:116`) — all LIVE. `map_cleanup` stays sync ✓.

Named omit is a proper OMIT: the shared-`deltrap` Sokoban PIT/HOLE `maybe_finish_sokoban` sub-arm names the C locus (`trap.c`), the live neighbor (`sokoban_guilt`, `trap.js:1516`), and the trigger (corpus reaching it) — in the map-adjacent docstring, not Must-fix. Verified `maybe_finish_sokoban` has no JS body (comment mention only). Pre-existing D-0774 boulder shape (`obj_extract_self` + manual unlink vs `obfree`) untouched and disclosed — not this commit's scope.

Cited C body (`sp_lev.c:326-356`, via `csym.mjs map_cleanup`):

```c
for (x = 0; x < COLNO; x++)
    for (y = 0; y < ROWNO; y++) {
        schar typ = levl[x][y].typ;
        if (IS_LAVA(typ) || IS_POOL(typ)) {
            /* in case any boulders are on liquid, delete them */
            while ((otmp = sobj_at(BOULDER, x, y)) != 0) {
                obj_extract_self(otmp);
                obfree(otmp, (struct obj *) 0);
            }
            /* traps on liquid? */
            if (((ttmp = t_at(x, y)) != 0)
                && !undestroyable_trap(ttmp->ttyp))
                deltrap(ttmp);
            /* engravings? */
            if ((etmp = engr_at(x, y)) != 0)
              del_engr(etmp);
        }
    }
```

JS hunk (`mklev.js:17732-17737`) lands the two new arms after the boulder loop inside the same liquid branch, in C order, preserving the `&&` short-circuit so `deltrap` never runs on portal/vibrating-square. `undestroyable_trap` body re-read (`trap.js:694`: `MAGIC_PORTAL || VIBRATING_SQUARE` ≡ `trap.h:116`) ✓. C callers are `:6029` + `:6471` (both `load_special`-family finishers); JS wiring at those finishers is pre-existing D-0774, untouched — this commit only fills the arms.

`sym.mjs` liveness (all sync, so `map_cleanup` stays sync): `deltrap trap.js:1302`, `engr_at engrave.js:128`, `del_engr engrave.js:156`, `undestroyable_trap trap.js:694`. No deleted or re-pointed symbols in this SHA (the import lines only gain names), so no required paste beyond this table. The `engr_at`/`undestroyable_trap` "ALSO LOCAL CLONE" warnings point at display/teleport/dig/zap files — pre-existing, out of scope, and this commit correctly imports the canonical exports rather than adding clones.

## Hallucinations / overclaim

None. `--can` ALREADY ×2 consistent with the import blocks (both target modules were already imported by mklev.js). Full-44/44 auto-run disclosed with cause (shared file).

## Density

+14/−5, one 31-line C body, one falsifier. Small but C-complete for the named arms.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44, final verify after last `js/` edit). Re-measured:

```text
verify map_cleanup: baseline d8a41af3~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
