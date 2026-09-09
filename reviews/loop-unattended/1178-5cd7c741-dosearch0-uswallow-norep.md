# Review 1178 — 5cd7c741 — dosearch0 uswallow Norep + find arms (D-2212)

Metadata: SHA `5cd7c741`, `js/detect.js` only (+11/−2),
D-2212. Queue row `dosearch0` (scen-wish-Knight-92130 step
179, 0 blocked RNG).

Intent vs deliverable: subject promises three fixes —
uswallow `pline`→`Norep`, `set_msg_xy` on SDOOR/SCORR
finds, SCORR `recalc`→`unblock_point`. Diff actually does
exactly those three, no more. Promise == diff.

Inventory: no new functions; two arms corrected, one call
swapped. Named omits stay in-map (`nomul(0)` subset,
mfind0 flush, Hallucination/cls trap-wait).

**C ↔ JS fidelity**: all three confirmed vs
`detect.c:2015–2093`. (1) uswallow: C `:2022–2024` is
`Norep("What are you looking for?  The exit?")` —
JS now awaits live async `Norep` (`display.js:7377`);
C's arm falls through to the shared `return 1`, so JS's
`return 1` is equivalent, and the counted-`20s`
repeat-suppression mechanism (MSGTYP_NOREP vs prevmsg)
explains the lost `--More--` exactly; the `!aflag` gate
is preserved, so autosearch (aflag=1) stays silent as in
C. (2) SDOOR: JS order cvt→recalc→exercise→nomul→feel→
set_msg_xy→pline is C `:2044–2051` verbatim — SDOOR
correctly keeps `recalc_block_point`, only SCORR changes,
so the fix is surgical, not a blanket swap. (3) SCORR:
JS now CORR→`unblock_point`→exercise→nomul→feel_newsym→
set_msg_xy→pline, C `:2053–2061` verbatim; the old
"recalc under an unblock comment" was a genuine C-wrong
(comment right, code wrong), now fixed. Return shape:
C's uswallow arm falls through to the shared tail
`return 1`; JS's early `return 1` is equivalent, and the
non-swallow path is untouched. RNG walk: `rnl(7-fund)`
draw positions identical in both arms; `Norep`,
`set_msg_xy`, `unblock_point` are all draw-free, so the
3473/3473 positional match the D-log cites is preserved
by construction. Callee closure: all three names already
imported in `detect.js` (`:58–59`, `:68`), no new edge,
no clones, no stubs.

Hallucinations / overclaim: none. Banned grep clean.

Density: 11 js insertions for a three-line C delta —
below the ~40 guideline but C is exactly that small;
corpus row + map + verify in one handoff. Right-sized.

Verification: D-log Verify bullet shows hidden PROGRESS
(Knight-92130 → PASS) + green + cohort. Re-measured:
`hidden-proxy.mjs verify dosearch0 --base 5cd7c741~1` →
"1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS"
(Knight-92130 fully PASS). Not vacuous, nothing worse.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
