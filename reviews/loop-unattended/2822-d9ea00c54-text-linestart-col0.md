# Review 2822 — d9ea00c54 — TEXT linestart loses col 0 under UTF8

- **SHA:** `d9ea00c54` (Thu 2026-10-15) — cliffs-head writer (D-3977).
- **D-entry:** D-3977. **Ledger:** `wintty.c` (`process_text_window`, partial, re-stamped).
- **Diff size:** `js/pager.js` −2/+23 (import name + gate + paint arm); +1 test.
- **Method:** cliff (one painter writer) — whole Method + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: the 17-session `getdir` cliff row
(C «mdassist: Invalid direction key!» vs JS «cmdassist» at row 0
col 0, every TEXT line losing col 0 in the C capture, footer
intact) is a capture-fidelity fork in `process_text_window`'s
linestart — under `SYMHANDLING(H_UTF8)` the first char routes
through `g_putch`, whose patch-006 nomux hook writes at the
pre-incremented curx, and the second char's hook overwrites it.
The fix paints TEXT lines from index 1 with col 0 cleared when
the C linestart would take the `g_putch` arm. 6 PASS + 11 moved.

The diff is exactly that plus the `H_UTF8` import name. Promise
and diff agree.

## Inventory

- `js/pager.js` `show_text_pages` (~:267-300): hoisted
  `utf8Handling` (`game.gs?.symset?.[(game.currentgraphics|0)]
  ?.handling === H_UTF8`); per line, `dropFirst =
  utf8Handling || high-bit first char`; 1-char lines paint
  `text[0]` at col 1 (guarded `1 < cols`), longer lines paint
  `text[1..]` at their indices. Footer untouched.
- `H_UTF8` joins the existing `const.js` import (no new edge).
- `scripts/text-window-utf8-col0.test.mjs` (new, 4 its).

No function added, deleted, renamed, or re-pointed; no clone.
The step-3 sym-run requirement is vacuous. `H_UTF8 = 5` at
`js/const.js:1308`. Diff grep: no `FORCE`, `DIAG`,
`getRngLog`, seed names, `fastforward`, or hardcoded
coordinates. Rule #2 iteration-wide: clean (cited in 2821).

## C ↔ JS fidelity

C `process_text_window`
(`nethack-c/upstream/win/tty/wintty.c:1770-1851` per `csym.mjs`).
Every cited line verified by direct read:

- `:1810` loop bound `*cp && ++ttyDisplay->curx < cols` — exact.
- `:1819` `if (linestart)`, `:1820–1822` `SYMHANDLING(H_UTF8)
  → g_putch`, `:1823–1825` high-bit `→ g_putch +
  end_glyphout`, else `putchar` — exact.
- `SYMHANDLING(ht)` ≡ `gs.symset[gc.currentgraphics].handling
  == ht` (`sym.h:176`); `H_UTF8 = 5` (`sym.h:49`); exactly 2
  symsets carry `Handling: UTF8` in `dat/symbols` — the JS
  predicate is verbatim C, and the glyphs.js:1005 idiom it
  mirrors was read at both ends.

Mechanism verified in `nethack-c/patches/006-nomux-capture.patch`,
not trusted from the D-log:

- g_putch hook: `nomux_putch(stripped)` at current curx, no
  adjustment (patch line 687). At linestart the `:1810`
  pre-increment already ran (0→1), so `text[0]` lands at col 1.
- putchar hooks (linestart-else AND the per-char arm, patch
  lines 639/646): `{ curx--; nomux_putch(*cp); restore }` —
  the second char's hook writes at col 1, overwriting
  `text[0]`; chars 3..n land at their own columns. Net capture:
  col 0 cleared, `text[1]` at col 1 — i.e. « mdassist» from
  «cmdassist». The JS `for (i = dropFirst ? 1 : 0)` loop
  reproduces this exactly.
- 1-char line: no second char, so `text[0]` stays at col 1;
  the hook only ran if `1 < cols` held. JS paints `text[0]`
  at col 1 under the same guard — the `:1810` bound, exact.
- Empty line: `dropFirst` false, loop paints nothing; C exits
  the `*cp` loop immediately. Same.
- `nomux_putch` ignores `ch < 32` (patch askname comment), so
  a C0 first char under UTF8 handling converges to the same
  net capture — consistent with retiring the TEXT leg of the
  D-3962 omission.

Condition check: `utf8Handling || (charCodeAt(0) & 0x80)`
mirrors C's `SYMHANDLING(H_UTF8) … else if ((*cp & 0x80))`
disjunction exactly (C's two arms differ only by
`end_glyphout`, which emits nothing to the capture).

Two doc-precision nits (not C-wrongs, no Must-fix):
(1) D-3977 Status tags the row `@4722dc249`, where getdir was
row 2 (distfleeck head); it became head at this SHA's parent
`75ebd635b` — verified in both committed snapshots, row text
identical. Stale tag, true substance.
(2) "TEXT path retired by the high-bit arm" is loose: the
C0-under-UTF8 leg is retired by the `utf8Handling` arm (via
the `ch < 32` ignore), the ≥0x80 leg by the high-bit arm. The
ledger `partial` + omit text is the accurate record.

Named omissions (in-map, not Must-fix): (1) menu-text/corner
paint under offx≠0 — real C lines, no session evidence, with
an explicit falsifier; (2) leading-multibyte first-cell
content — unmodeled, no evidence; (3) menu/topline C0 remainder
— correctly left open. The ledger row stays honestly
`partial`.

## Hallucinations / overclaim

None. The owner-vs-writer call is exemplary: `getdir` is proven
whole (D-2434, not re-ported) and the writer is the paint path.
No "Match C" is claimed for any dispatch — the change is one
paint arm. The "probe-verified 5/Enhanced2 mid-session" claim
for the handling read is corroborated by the outcome (all 17
sessions are Enhanced symset sessions and all move). The 4
`js-throw` labels are disclosed as the null-owner fallback with
a Tourist probe (`error:null/jsPanic:null`), not hidden.

## Density

Cliff phase: the owner is the `getdir` cliffs head at the
parent SHA — verified (`75ebd635b` snapshot: getdir head, 17
blocks, first-diff text identical to the D-log). One cliff, one
writer, code + ledger + verify in one handoff. Ledger
re-stamped `partial` with the omission in the row — nothing
sold whole that is not. No bundled file, no sweep, no
self-filed row. The 11 moved sessions are dispositioned to
later owners in Next (use_pick_axe already queued).

## Verification

Re-measured by this audit
(`hidden-proxy.mjs verify getdir,process_text_window --base
d9ea00c54~1 --reach-all`, one call, fast):

- `verify getdir: 6 PASS, 11 moved past, 0 unchanged, 0 worse
  → PROGRESS` — the exact six claimed PASS sessions
  (Barbarian-50455047, Healer-50059005/50255051,
  Knight-50455010, Rogue-50255016, Samurai-50455066) and all
  eleven movements reproduce with the identical owner+step
  pairs (wake_msg@212, inuse_classify@472/@304,
  dfeature_at@103, js-throw@698/@323/@436/@306,
  do_statusline2@380, use_pick_axe@27,
  optfn_videocolors@372). Every move is strictly later; zero
  regressions.
- `verify process_text_window`: 0 blocked (vacuous for the
  writer, as expected for a screen-owner row); smoke 24/24 +
  24/24 → REACH-OK.
- Focused test 4/4 at HEAD. D-log gates: syntax, rule2, green
  2/2, strict ×2, cohort 7/7, manual full 44/44. The audit's
  end-of-iteration rescore re-covers the fortress.

No seed/step/coordinate/RNG-index reads; no trace shaping. The
focused test pins the C capture shape (leading blank + dropped
first char), not a JS self-consistency property.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
