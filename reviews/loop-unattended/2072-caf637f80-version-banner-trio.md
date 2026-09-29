# Review 2072 — caf637f80 — version.c banner/dump/critical trio

- SHA: `caf637f80` (D-3112)
- Subject: "`version.c` copyright_banner_line + dump_version_info + get_critical_size_count (3× MISSING→whole; queue head stale)"
- js/ insertions: js/files.js (+37), js/earlyarg.js (+34/−3)
- Prior index: 2071; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: port all three MISSING version.c functions whole —
banner/dump/critical — into files.js (banner + critical, beside
the save-validation family) and earlyarg.js (dump, beside
early_version_info + the `:dump` arm wiring); stale out the
queue head + 2 same-file siblings, comp_times by-design.

Diff actually adds: the three exports, the version.js import
extension, the `:dump` arm wiring, one omit retirement. Matches
the promise; no extra scope.

## Inventory

Per function (cluster of 3, one C file):

- `copyright_banner_line` (js/files.js, export) — C
  version.c:470–490 (csym range). Live: all four arms + `""`
  default. Named: restore.c callers unported (export ready).
- `dump_version_info` (js/earlyarg.js, export) — C :493–510.
  Live: hname default, last-33 slice, init, the full Snprintf
  field layout, release. Adapted: `raw_print` → `raw_printf`
  (no JS channel — verified NOT FOUND).
- `get_critical_size_count` (js/files.js, export) — C :668–672.
  Live: `SIZE(critical_sizes)` ≡ CRITICAL_SIZES.length
  (same-file table :903, pre-existing). Named: sole caller
  compiled out.

Helpers: all LIVE — COPYRIGHT_BANNER_A/B/D pins (const.js:877–879,
byte-equal to patchlevel.h:39–44, verified), runtime banner_c,
runtime_info_init/release (version.js leaf edge, extended not
added), eos (hacklib, pre-existing). No clones, no stubs, no
deletions or re-points.

## C ↔ JS fidelity

`copyright_banner_line`: all three `#ifdef`s live in the contest
build (patchlevel.h:39–44 verified); line 3 reads runtime
banner_c with `""` pre-populate fallback (C static dummies
deliberately not copied — documented). Exact.

`dump_version_info`: hname default exact; last-33 slice exact
(`eos(hname)-33`, nhStr identity per lint.h:16 verified);
`%-12.33s` ≡ slice(0,33)+padEnd(12) exact; each `%08lx` ≡
`>>>0` lowercase hex padStart(8) exact (JS nomakedefs words are
`>>>0` 32-bit at date.js:173–176, so no LP64 truncation issue);
features `& ~ignored` exact; init/release order exact. Emission
routes through raw_printf → vraw_printf (whose inner raw_print
is the tree's pre-existing named channel omit) — the computed
buf is exact; the channel gap is named, not silent.

`get_critical_size_count`: one line, exact. Sole caller inside
`#ifdef SELF_RECOVER` (files.c:2858–3085, commented out at
unixconf.h:126 — both verified); util/recover.c is not game code.

Callers: earlyarg.c:512 wired (returns 2 like C) ✓; restore.c
sites named-unported ✓; wintty.c:571 split site at askname.js:52–60
confirmed pre-existing with pinned line-3 (not rewired, reason
stated). Stale set resolves at cited lines; comp_times has 0 C
references (verified).

Nits (not C-wrongs): the commit message quotes `game.gh?.hname
?? 'nethack'` but the diff uses a ternary — `""` would diverge
from C's pointer check; unreachable (nothing sets gh.hname).
The `:dump` comment says the line is "compared against
save/bones files" — the values are (by compare_versions), not
this printed line.

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. The "no new cross-module edges" claim holds (both edges
extended, none added); the files.js-not-version.js placement
rationale (D-1881 import-free version.js) is real.

## Density

3-function one-file cluster, per-function Ledger + Verify lines,
≤10, no Must-fix bundled. ~71 js/ insertions with a 4-stale
disposition chain. Per-function verdicts: all ACCEPT. SHA
verdict: ACCEPT.

## Verification

Re-measured (`--base caf637f80~1 --reach-all`, all 3 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×3. Matches the D-log's
verbatim tail. No REGRESSED session. Green 2/2, strict ×2,
cohort 7/7 per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
