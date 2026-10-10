# Review 2649 — 6816eb0b4 — map_redisplay C-absent flush delete (D-3785)

Metadata. SHA `6816eb0b4` (2026-10-10), D-3785, parent
`9b729191f` (HEAD). js diff: `js/detect.js` +4/−1 —
deletes `await flush_screen(1)` from map_redisplay
+ doc-comment fix. Works cliffs row-2
do_statusline2 (95343, 95226).

## Intent vs deliverable

Promise: 95343@682 — Hallu missing on JS HP rows
682–684 (back at 685) because the retained
flush committed status inside wiz_map's conf/hallu
zero-window and consumed botlx; C has no flush in
map_redisplay, so status paints after wiz_map
restores the flags.

Diff delivers exactly the one-line delete + the
why-comment. Promise and diff match.

## Inventory

Changed JS (1 writer):

- map_redisplay — `js/detect.js:1374–1382`. C:
  `detect.c:93–102` (whole body read: reconstrain
  `:96`, docrt `:97`, underwater `:98–99`,
  buried `:100–101` — no flush).
- Cited window: `wizcmds.c:193–195` (HConfusion /
  HHallucination restored after do_mapping —
  read, present).

## C ↔ JS fidelity

**Delete C-exact.** C `:93–102` ends at
under_ground with no flush call; JS now ends at
`under_ground(2)` in the same arm order
(`:96/:97/:99/:101` cites in place). The
mechanism is C-shaped: docrt sets disp.botlx,
which the post-command flush paints after
wiz_map's restore — the deleted line consumed it
early. C callers (monster_detect `:859`, trap
paths) equally get no flush in C, so no caller
regresses by the delete. No symbol deleted or
re-pointed (one awaited call removed, export
kept), so no sym.mjs paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The C-Hallu
continuity claim (513→1086, teleport-menu gap
explained, 10-turn timeout math) is measured,
and the sibling prediction (95226 PASS) was
stated pre-fix and confirmed, not back-fitted.
Unchanged sessions named as different writers.

## Density

Cliff-phase §2b: one row-2 writer, one C-absent
line, no bundling. 95343 682 → 910 (+228),
95226 → PASS, 95221 388 → 621 (+233). Full 44/44
ran (ubiquitous path).

## Verification

D-log Verify: do_statusline2 1 PASS, 2 moved, 4
unchanged; REACH-OK both fns; gates + cohort +
full PASS.

Re-measured by this audit (`verify do_statusline2
--base 6816eb0b4~1 --reach-all`):

```text
verify do_statusline2: 1 PASS, 3 moved past, 3 unchanged, 0 worse → PROGRESS
  95343 → look_here@910 (was 682); 95226 PASS; 95221 → one_characteristic@621
reach/smoke do_statusline2: 24 PASS, 0 regressed → REACH-OK
```

95346 moved further under later SHAs (474→778);
all else matches the D-log. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
