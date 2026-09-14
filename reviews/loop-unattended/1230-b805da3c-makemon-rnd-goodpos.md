# Review 1230 — b805da3c — makemon_rnd_goodpos CHECKSCARY clear (D-2264)

Metadata: SHA `b805da3c` (D-2264). Pops the Open row
`makemon.c` makemon_rnd_goodpos (trace reach in 2 diverged-step
traces, 0 owned blocks). js/ +5/−3, all in `js/makemon.js`.

## Intent vs deliverable

Subject promises: clear `GP_CHECKSCARY` in `gpflags` itself so
the bl==1 exhaustive pass and the stairway retry skip the scary
check like C. Diff actually delivers exactly that (one
statement moved from a per-pass copy to the parameter, one call
site re-pointed to the parameter). Promise matches diff.

## Inventory

Changed: two lines + three comment lines. No new functions, no
new imports, no deleted symbols. Callee closure untouched
(`goodpos`, `cansee`, `rn1`/`rn2` pre-existing and live).

## C ↔ JS fidelity

C `makemon.c:1075–1137` fetched whole this audit. The drift
and the fix, against `:1100–1104` + the stairway block:

```c
for ( ; bl < 2; bl++) {
    if (!bl)
        gpflags &= ~GP_CHECKSCARY; /* perhaps should be a 3rd pass */
```

C mutates the by-value parameter, so the clear persists into
the bl==1 scan **and** the stairway `goodpos(nx, ny, mon,
gpflags)` (which runs inside the `bl == 0` iteration, after the
clear). JS was: `let gp = gpflags` fresh per pass, cleared copy
for the bl==0 scan only, original flags to the stairway retry —
matching C on exactly one of three fallback calls. JS now:
`if (!bl) gpflags &= ~GP_CHECKSCARY` on the parameter, all
three calls take `gpflags`. Number parameters are by-value in
JS exactly as `mmflags_nht` is in C, so the caller is
unaffected on both sides (the commit message states this; it
is correct). RNG call-for-call: the clear is draw-free; no
draw added, removed, or reordered — the fix only changes which
cells `goodpos` rejects. The `((dx+xofs)%(COLNO-1))+1` wrap and
`bl`/stairway structure around the hunk are byte-for-byte C
order. C.

## Hallucinations / overclaim

None. Commit message and D-log both say the row cited trace
reach rather than owned blocks, and the Verify bullet labels
the check vacuous rather than a PASS.

## Density

+5/−3 is far below the §2b ~40 floor, but this is a genuine
three-line drift inside the exact function the queue row named
(the clone predates it, D-0034) — padding it or holding the row
open would be worse. The D-log's density note says exactly
this. Accepted as stated.

## Verification

Re-measured myself: `hidden-proxy verify makemon_rnd_goodpos
--base b805da3c~1` → 0 blocked at baseline and working
scoreboard (vacuous, as labeled — the row cited presence, and
unlike the parked presence-only rows, an actual C-vs-JS drift
stood behind it); `verify.mjs --fn makemon_rnd_goodpos` at
HEAD → syntax/rule2 PASS, green 2/2, strict ×2, cohort 7/7,
VERIFY: PASS. Diff grep: no FORCE/DIAG/seed/coordinate/
`fastforward`.

## Actionable C-wrongs

None. `goodpos_onscary` approximation stays with its named
owners (D-1101/D-1102).

Verdict: **ACCEPT**
