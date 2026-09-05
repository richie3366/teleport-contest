# Review 862 — 60215712 — zap.c makewish livelog + tty_putstr compress/wrap (D-1892)

Metadata: SHA `60215712`, D-1892. Files: `js/zap.js` (+44/−5),
`js/pager.js` (+69/−5). Next index 862.

Intent vs deliverable: subject promises the `makewish` wish-livelog
arms plus `tty_putstr` compress/wrap for the `do_statusline1` gamelog
screen (corpus session random-seed0360 step 821: wish rows missing
from the JS gamelog). The diff delivers both, nothing else: livelog
block in `makewish`, new exports `compress_str` +
`wrap_text_window_line` with `show_text_pages` wrap-expansion.

Inventory: `makewish` livelog block (zap.js). All added import names
join EXISTING edges — verified:
`imports.mjs --can js/zap.js js/pline.js livelog_printf` → ALREADY
(no new edge; my first `--can` call used wrong path forms and
returned "unknown file(s)", re-ran with `js/`-prefixed paths).
`uhis` joins the existing `roles.js` edge, `artifact_origin` the
`artifact.js` edge, LL_*/ONAME_* the `const.js` edge. `sym.mjs`:
`livelog_printf` pline.js:23 sync, `uhis` roles.js:712 sync,
`artifact_origin` artifact.js:886 sync, `compress_str` pager.js:179
sync, `wrap_text_window_line` pager.js:207 sync. Nothing deleted or
re-pointed. Rule #2: `imports.mjs --rulecheck` → clean across `js/`
(run this iteration, as the method requires).

**C ↔ JS fidelity** (branch-by-branch confirm):

- makewish ≡ C `zap.c:6313–6422`: `oldwisharti` snapshot before
  `readobjnam` ✓; nothing →
  `livelog_printf(LL_WISH,"declined to make a wish")` ✓; hands →
  history add, no livelog ✓ (history still deferred, header-kept);
  history-then-`artifact_origin(ONAME_WISH|ONAME_KNOW_ARTI)` on
  `oartifact` (bookkeeping, no event) ✓; `maybe_LL_arti` comparison
  ✓; `"buf", got "doname"` format ✓ — JS `buf` ≡ C `bufcpy`
  because JS strings are immutable: `readobjnam(buf)` cannot mangle
  the caller's string, so `buf` IS the pristine pre-parse copy.
  Post-increment `wishes` with the exact trio: first-wish
  CONDUCT|WISH (+maybe arti) `made %s first wish - %s`, first-artifact
  `made %s first artifact wish - %s`, plain `LL_WISH` (+maybe arti)
  `wished for %s` ✓ — all three format strings and flag sets exact.
  `livelog_printf` itself (pline.js:23) formats `%s/%d/%ld` and calls
  `gamelog_add` — matches the cited C ref.
- `compress_str` ≡ C `wintty.c:2195–2223`: gate (`strlen >= CO` or
  contains `\n`), leading-space discard (`was_space=TRUE`), run
  collapse, `\n`→space, BUFSZ-255 cap, trailing-strip-or-cap rule —
  all exact, including the cap edge (C `outstr == outend` → back up
  one; JS `capped` flag → `slice(0,-1)`; identical outcomes).
- Wrap ≡ `tty_putstr` NHW_TEXT (read the arm): `strlen+1 > CO` gate
  (≡ `length >= co`) ✓; scan back from `str[CO-1]` for space/`\n`,
  stop at 0 ✓; fragment keeps the break space (`data[++i] = 0` past
  the 1-byte attr prefix ≡ `slice(0,i+1)`) ✓; remainder recurses from
  the break space through compress (leading space dropped both
  sides) ✓; no-break stores whole, paint truncates ✓; compress runs
  at putstr entry for all non-MESSAGE windows (verified at the top of
  the C function), so per-line compress+wrap matches C ✓; fragments
  become separate data lines before 23-line paging in both ✓; wrap at
  full `cols`, paint at `cols-1` (D-0933) ✓; per-fragment attr kept
  (C attr byte per data line) ✓.
- Named omits (wish history/menu/assist/retry, `uhis()` Upolyd arm
  with identical-unpoly'd justification for this session, menu putstr
  parity, file livelog) all genuinely out of this screen's path; the
  map sections were updated in-commit.

Hallucinations / overclaim: none. The D-log's row-diff proof per fix
(livelog → event present; compress → col 74; wrap → closed) is
corroborated by the session's exact row-22 line end-to-end.

Density: two files, one screen, one C locus family (wish log → text
pager) — coherent, though two subsystems share the commit they are
one screen's causal chain.

Verification: D-log `verify.mjs --fn do_statusline1` → VERIFY: PASS
(hidden PROGRESS with a later owner; green 2/2 + strict; cohort 7/7;
full 44/44). Re-measured myself:
`hidden-proxy.mjs verify do_statusline1 --base 60215712~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(random-seed0360: moved → suit_simple_name step 838, was 821 — a
later owner, zero regressions; the D-1831 failure mode
-off). No banned patterns in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
