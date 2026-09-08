# Review 1068 — c8d25c72 — ensure_way_out rescan order (review 1065 Must-fix)

Metadata: SHA `c8d25c72`, D-2101, closes review 1065 Actionable 1 (Must-fix row, already stamped **Addressed:** D-2101 per the D-log). JS: `js/mklev.js` +5/−4. Next NN 1068.

## Intent vs deliverable

Subject promises the 1065 Must-fix: inner `break` → both-loops exit per C `goto outhere`. Diff actually adds: `outer:` label on the x-loop + `break outer` in the match arm + corrected doc comment:

```js
do {
    ret = true;
    outer: for (let x = 1; x < COLNO; x++)
        for (let y = 0; y < ROWNO; y++) {
            ...
                ret = false;
                break outer;
            }
        }
} while (!ret);
```

Nothing else. Promise matches deliverable exactly.

## Inventory

Changed JS: `ensure_way_out` loop exit (mklev.js:~25190). No new/changed functions, no imports/exports touched, nothing deleted (`sym.mjs` run not required — no symbol deleted or re-pointed; the label is intra-function, so no edge and no TDZ by construction).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/sp_lev.c:5217–5255` (driver; match arm + label at :5241–5251), read verbatim:

```c
do {
    ret = TRUE;
    for (x = 1; x < COLNO; x++)
        for (y = 0; y < ROWNO; y++)
            if (ACCESSIBLE(levl[x][y].typ)
                && !selection_getpoint(x, y, ov)) {
                if (generate_way_out_method(x, y, ov))
                    selection_floodfill(ov, x, y, TRUE);
                ret = FALSE;
                goto outhere;
            }
outhere:
    ;
} while (!ret);
```

The `outhere:` label sits after the closing braces of **both** `for` loops, inside the `do { } while (!ret)` — so one join exits the x-scan entirely and the do-while rescans from `x = 1`. Branch order: seed floodfills (stairs, then hole/undestroyable traps) → do-while scan → first ACCESSIBLE-outside-selection cell joined → full rescan. No RNG in the driver itself (dice live downstream in the `selection_rndcoord` drain).

JS now: `outer: for x … for y … { if (match) { …; ret = false; break outer; } }` inside the existing do-while. Exact C shape: both-loops exit + rescan-from-x=1. The old comment's claim ("leaves the y scan; the x scan continues") was the D-2095 falsehood this fix also corrects to cite `sp_lev.c:5241-5251` (exits both loops). Callee closure unchanged (`generate_way_out_method`, `selection_floodfill_accessible` pre-existing live). No clones/stubs/omits in the arm.

This closes review 1065's Actionable 1 as specified: the Must-fix row is archived (`LOOP-QUEUE-DONE.md` +3 in this SHA's stat) and the prior "verbatim / inner-break = goto" claim is affirmatively retracted in the subject ("the D-2095 claim is false").

## Hallucinations / overclaim

None — and the commit retracts the prior overclaim rather than repeating it. The latent-divergence framing (R3a→R5→R3b vs R3a→R3b→R5, latent on observed minetn-6 layout, 671 drain draws still match) is precise about what changed observably: nothing on the recorded path.

## Density

+5/−4 for a one-line semantic fix + comment. Must-fix alone, no glued Open item. §2b-compliant.

## Verification

D-log Verify bullet is exemplary: states `note hidden (no corpus session blocked on selection_rndcoord at HEAD — vacuous, NOT a corpus PASS)` instead of inventing a corpus PASS, cites the 1065-era `65152c55~1` measurement for the original session move (Ranger-92033 → rloc@same-step with full positional draw match), and reports green 2/2 + strict ×2 + cohort 7/7 + full 44/44 (shared file → full auto). No `--base` re-run is owed by the method (row cited 0 blocks; nothing to re-run — and re-running `verify selection_rndcoord --base` would be vacuous by the same token). Diff grep: no FORCE/DIAG/getRngLog/seed/coordinate reads. Rule #2 globally clean (review 1067).

## Actionable C-wrongs

None. Review 1065's Must-fix is satisfied; the non-queued geometry-invariance note (map_cleanup / count_level_features / link_doors_rooms) stays as noted per the D-log, not queued.

Verdict: **ACCEPT**
