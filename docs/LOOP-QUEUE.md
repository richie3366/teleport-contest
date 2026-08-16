# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`.

## Must-fix (from reviews) — pop first

Written reviews are not theater. Each item is a Keep’d **C-wrong** (JS
contradicts C, not a named omit). After shipping: stamp the cited review
`**Addressed:** D-NNNN` (D-id only), mark the queue line `- [x]`, then
run `node scripts/archive-loop-queue-done.mjs` **in this same commit**.
Do **not** leave `- [x]` in this file. Do **not** put this commit’s hash
in the same SHA (chicken-egg), amend, or make a stamp-only follow-up
(`da0fabe3` / `cdbedcbb` / `3ac7a037` / `9c087297` were that waste).
The **next** real commit fills the short hash on the review (and on the
archive row) from `git log -1 --format=%h` of the fix.

Catch-up from `reviews/loop-2026-08-15/` (2026-08-15). Already done
off-queue: D-1022 `getdir`/`hurtle` (D-1038); D-1033 trap-before-throne
(D-1039); D-1036 hatch dispatch (D-1037).

Review iterations **prepend** new Keep’d C-wrongs here (not under Open).

## Open (map-driven, after Must-fix is empty)

- [ ] tut-1 stairs only.
- [ ] tut-1 large-box contents only.
- [ ] tut-1 food objects only.
- [ ] tut-1 `place_lregion` only.
- [ ] tut-1 `tut_key` / eckey only.
- [ ] tut-1 nhcore callback disable on enter/leave.
- [ ] `dosit` steed message: C `mon_nam(usteed)`, not `"your steed"`. Source: D-1033 risk 4 (named, not a Must-fix).

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
