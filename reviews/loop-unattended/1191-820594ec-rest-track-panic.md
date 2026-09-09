# Review 1191 — 820594ec — rest_track impossible-counts panic (D-2225)

Metadata: SHA `820594ec`, `js/track.js` only,
D-2225. Queue row `track.c` SFCTOOL (named
data.md:898, 0 blocked) — remainder of the track
family.

Intent vs deliverable: subject promises the SFCTOOL
finding plus the rest_track panic. Diff delivers
both: header comment recording the ifndef scope, and
the clamp-and-silent-reset replaced by raw assign +
loud throw. Nothing else.

Inventory: no new function, no new edge, no deleted
body, no clone. One behavior change inside
`rest_track`; one comment-only hunk.

**C ↔ JS fidelity**: checked against pinned C.
SFCTOOL scope verified directly in `track.c`: the
`#ifndef SFCTOOL` wraps only settrack/gettrack
(file lines ~21–59; initrack above, hastrack/
save_track/rest_track below) — the header comment's
claim is exact, and the single-ESM-build conclusion
(no tool binary, nothing to port) follows ✓.
rest_track (`:92–105`, csym range): C assigns raw
counts via Sfi_int, panics on `utcnt/utpnt > UTSZ`,
never clamps. Old JS clamped (`Math.min`) and
silently reset — a genuine C-wrong, now removed. New
JS assigns raw then `throw new Error('rest_track:
impossible pt counts')` ≡ panic per the house idiom
✓. Invariant argument holds: `settrack` caps utcnt
at UTSZ and wraps utpnt, so own-produced snaps never
trip the guard — fires only on corrupt input,
exactly like C. Callers (`save.js:784`,
`bones.js:469`) call it unguarded, so the throw
propagates ≡ abort; no catch-and-continue anywhere
on the path.

Hallucinations / overclaim: none. D-log claims no
corpus PASS.

Density: §2b right-size — one guard, one module
(small-C exception to the 40-line floor).

Verification: re-measured —
`verify rest_track --base 820594ec~1` → 0 blocked at
baseline and working scoreboard + vacuous warning.
Row cited 0 blocks; honest. Rule #2 clean; no banned
patterns. Green/strict/cohort claimed; HEAD
re-confirmation with the cadence run.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
