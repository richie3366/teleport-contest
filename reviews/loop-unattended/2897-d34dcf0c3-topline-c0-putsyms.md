# Review 2897 — d34dcf0c3 — topline putsyms/cl_end C0 drop

- SHA: `d34dcf0c3` (cliff, writer port: topline paint order)
- D-entry: D-4056; Ledger: topl.c (`redotoplin`, D-4056 appended)
- `js/` diff: `js/display.js` +22/−15 (one file-local helper, two
  painters re-pointed); new `scripts/topline-c0-capture-drop.test.mjs`

## Intent vs deliverable

Promise (subject + D-log): a decoded C0 symbol in the topline
(RogueEpyx hero `\x01` in a farlook line) leaves the prior captured
cell, because C writes with putsyms and then cl_end instead of blanking
the row first; 5 symset sessions to FULL PASS. The diff adds exactly
that: `topline_putsyms_cl_end(display, row, line, cols)` and replaces
the clear-then-write loops in `_buildScreenOutput` (row 0) and
`_paintToplineOnly` (rows 0–1). Promise = diff.

## Inventory

- `topline_putsyms_cl_end` — display.js:8149 (new, file-local).
  C: topl.c putsyms :346–351 → topl_putsym :304–344, then
  redotoplin's cl_end :137 (redotoplin :121–141).
- `_buildScreenOutput` row-0 paint — display.js:7957 (re-pointed).
- `_paintToplineOnly` rows 0/1 — display.js:8169 (re-pointed).
- Capture rule: patch 006 `nomux_putch` (`ch < 32` → return,
  006-nomux-capture.patch:214–225).

## C ↔ JS fidelity

C (csym, topl.c:121–141 + :346–351):

```c
    home();
    ...
    putsyms(str);          /* while (*str) topl_putsym(*str++); */
    cl_end();
    ttyDisplay->toplin = TOPLINE_NEED_MORE;
```

`topl_putsym` default arm: `ttyDisplay->curx++` then
`putchar(c)`; with the recorder, `putchar` lands in `nomux_putch`,
which returns early on `ch < 32` without writing the cell. So the
cursor advances and the old cell survives. That is what the JS does:
skip `setCell` when `charCodeAt(c) < 32`, with the position implied by
the index, then blank from `n` to `cols`. For a message without C0
bytes, write-then-clear-rest and clear-then-write paint the same row,
so the change is behavior-neutral everywhere else (the full 44/44 run
confirms this).

Edges not covered, none reached:
- C `char` is signed, so a byte ≥ 0x80 also fails `ch < 32` in
  `nomux_putch`. JS only drops code points < 32. The `mixed && (*str &
  0x80)` kludge (:128–132) is the only C path that puts a high byte on
  the topline, and no corpus topline carries one.
- The `curx == CO-1` wrap arm of topl_putsym is handled upstream by
  the JS message split, not by this helper (unchanged).

Doc nit: the new JSDoc was inserted *between* the existing
`/** Paint message rows only… */` line (display.js:8139) and
`_paintToplineOnly`, so that one-liner now sits on the wrong function.
The cited ranges (`:302–342`, `:348–353`) are 2 lines off csym's
`:304–344` / `:346–351`. Prose only.

## Hallucinations / overclaim

None. The D-log says plainly that `lookat` showed NO MOVEMENT at first
only because Healer-50555044 was uncached, and it re-ran after
`record`. That is honest. The named "other putsyms paths" (addtopl,
more, removetopl, getline echo) are true omissions: no corpus session
decodes a glyph byte into them.

## Density

A cliff writer at the topline paint choke. One helper, two callers,
and every row-0/1 painter now goes through it. One `Ledger:` entry.
No unreached work.

## Verification

Re-measure (`--base d34dcf0c3~1 --no-reach`):

```text
verify x_monnam: 4 blocked → Rogue-50059048 PASS, Ranger-50155013 PASS,
  Knight-50455511 still s182, Caveman-50850017 still s172
  → 2 PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS
verify wishymatch: Valkyrie-50059008 PASS → 1 PASS → PROGRESS
verify lookat: Healer-50555044 PASS, 4 unchanged → PROGRESS
```

The D-log's "3 PASS" counted Healer-50255063, which is a reserve-tier
row (`recipes-reserve/`) and is not blocked in the committed active
board. The 2-PASS count here is consistent, not a contradiction.
The unchanged rows are other shapes (corpse name, fog cloud, travel
text, snake stream), as the D-log says. There were no FORCE/DIAG/seed
strings, and the window rulecheck is clean.

## Actionable C-wrongs

None. (Doc placement nit only.)

Verdict: **ACCEPT**
