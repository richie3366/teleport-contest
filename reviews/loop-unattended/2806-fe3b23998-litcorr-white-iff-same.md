# Review 2806 — fe3b23998 — Litcorr white-iff-same-sym, gray base otherwise

- **SHA:** `fe3b23998` (Wed 2026-10-14) — cliffs-head writer (D-3957).
- **D-entry:** D-3957. **Ledger:** `show_glyph` split re-tagged.
- **Diff size:** `js/display.js` 58 lines (6 hunks); no test file.
- **Method:** cliff (1 fn family) — whole Method per hunk + movement
  re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 4 sessions diverge on map cells with identical
`«staircase down»` toplines (stale travel-getpos autodescribe — the
owner is the region heuristic); the Arch/Rogue cells are litcorr
painted white `#`/15 where C paints gray `#`/8 under symsets whose
corr/litcorr bytes differ — gate the white on live byte equality
(Arch PASS, Rogue narrowed 2→1 cell). The Caveman/Healer gold/hero
cells are a different writer, C-measured but explicitly not patched
("no second patch ... rather than ship a guess").

The diff is exactly the white gate + gray base + the two gray-`#`
memory-fallback widenings. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `litcorr_showsyms_white()` helper | display.c:2938–2940 | exact |
| 2 | `cmap_idx_to_tty` S_LITCORR: white iff same, else use_color-gated gray | :2938–2940 + `cmap_color` macro :2684 | exact |
| 3 | `terrain_glyph` CORR arm: same gate | back_to_glyph + :2938–2940 | exact |
| 4 | `reveal_terrain_cmap_hack`: gray-`#` joins white-`#` | house memory fallback | benign, see below |
| 5 | `newsym` isLitcorr: gray-`#` joins white-`#` (typ CORR guard) | house memory fallback | exact |
| 6 | comment-only engrcorr cross-ref | :2934 | cite |

No helper deleted, no import change, no symbol re-pointed.

## C ↔ JS fidelity

**Core gate (verbatim).** C `:2934–2945` re-read: `if
(has_rogue_color) ... else if (cmap == S_litcorr && sym ==
gs.showsyms[S_corr + SYM_OFF_P]) color = CLR_WHITE; else if (cmap ==
S_engrcorr ...) MG_BW_ENGR`. JS matches: first arm + engrcorr twin
Named (pre-existing), litcorr helper compares
`live_showsyms(23) === live_showsyms(22)` with S_CORR=22 /
S_LITCORR=23 on both sides (C defsym.h PCHAR2(22)/PCHAR(23),
js/display.js:3384–3385) ✓. Base: `cmap_color` macro
(`use_color ? defsyms[n].color : NO_COLOR`) with both corr rows
CLR_GRAY (defsym.h:116–117) ✓; `use_color ≡ wc_color` is the
established house mapping (flag.h:507, every paint gate) ✓; white
overwrite ungated ✓ ("overwrites even on mono").

**Attr mechanism (the crux, confirmed).** C records `#`/8 =
NO_COLOR (color.h: CLR_GRAY 7, NO_COLOR 8, WHITE 15). JS
`tty_map_color` (display.js:2575) maps CLR_GRAY → NO_COLOR, so the
new gray base records 8 exactly like C ✓. Arch s49 now 0
differing cells per D-log; session PASS on the board ✓.

**Gray-`#` widenings (scrutinized).** The comments claim gray-`#`
is unambiguous — slightly overstated: `S_cloud` also paints
`{ch:'#', color:CLR_GRAY}` (display.js:2014; poison cloud is
BRIGHT_GREEN, excluded). newsym is safe via the `typ === CORR`
guard (cloud typ is CLOUD) ✓. `reveal_terrain_cmap_hack` has no
typ guard, so a cloud memory is now rewritten gray→NO_COLOR —
but: (a) paint-equivalent (`tty_map_color` maps both to 8); (b)
the glyph int is preserved, so glyph compares are unaffected;
(c) no consumer distinguishes the two (`grep color ===
CLR_GRAY` hits only `tty_map_color` itself). Benign — and the
final full rescore is the backstop.

**No committed test** — verification rests on ad-hoc focused
replays (0/1→0/0, 2→1 cells). Not a C-wrong; noted.

Diff grep: no banned patterns. Rule #2 clean iteration-wide
(review 2803).

## Hallucinations / overclaim

None. The "Rogue narrowed 2→1" claim I corroborated independently:
the current first-diff row is the R2 text diff (`1` vs ` ` at row
9 col 19) — the R1 attr-only cell no longer diverges, exactly as
claimed. The deferred gold/hero writer is measured, not guessed.

## Density

Cliff discipline holds: one writer, probe row moves (Arch PASS,
Rogue strictly narrowed in-cell), Ledger re-tagged, the 3
no-movement sessions each carry a measured writer pointer for the
next pop — legitimate deferral after measurement, not
NO-MOVEMENT-as-omission. One cliff, no bundling.

## Verification

Re-measured myself (`verify do_screen_description --base
fe3b23998~1 --reach-all`):

```
verify do_screen_description: 1 PASS, 0 moved past, 5 unchanged, 0 worse → PROGRESS
smoke do_screen_description: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (1 + 0 + 3 + 0) modulo the 2 Grow-#8 sessions
that did not exist at ship time. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
