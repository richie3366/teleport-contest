# Review 2074 — 6e3bbfbe7 — regex_error_desc + txt2key cluster

- SHA: `6e3bbfbe7` (D-3114)
- Subject: "`options.c` test_regex_pattern completion via regex_error_desc + txt2key restart + 4 caller wirings (coverage cluster)"
- js/ insertions: js/options.js (+189/−~90 region), js/sounds.js (+15/−8), scripts/txt2key.test.mjs (+121, unscored)
- Prior index: 2073; queue Must-fix at review time: 1 (2070 resists-clone row)

## Intent vs deliverable

Promise: new `regex_error_desc` port wired at all five C call
sites (test_regex_pattern live value, msgtype_add + coloratt +
APE full C-order fail arms, sounds computes with sink named),
txt2key restarted whole, three cite-drift fixes.

Diff actually adds: exactly that, plus the 14-vector test file.
Matches the promise; no extra scope.

## Inventory

Per function (cluster of 7 touched, one C file + 2 same-closure
callers):

- `regex_error_desc` (new export) — C sys/share/posixregex.c:76–89
  (read at the cited range; csym indexes src/ only). Live: all
  three arms verbatim; errbuf collapses to the return; regerror
  ≡ captured SyntaxError text with the empty-message fallback.
- `test_regex_pattern` — C :7869–7901. Live value replaces the
  D-3111 `null` placeholder; order (describe→free→sink) exact.
- `msgtype_add` — C :7730–7754. Full fail arm in C order; every
  cite re-counted exact (`:7733/:7736/:7737/:7740/:7742/:7745/
  :7747/:7748/:7750–7753`). Genuine fix: pattern/next now set
  only on success like C.
- `add_menu_coloring_parsed` — C coloratt.c:584–613. Fail arm
  exact; the `:595→:590` cite fix verified (true line 590).
- `add_autopickup_exception` — C :9299–9346. Fail arm exact;
  all re-based cites re-counted exact; hardcoded 'invalid
  regular expression' replaced by the live desc — genuine fix.
- `add_sound_mapping` (sounds.js) — C sounds.c:1596–1605. Value
  computed live; `:1604` raw_print sink named; frees GC ✓.
- `txt2key` (restart) — C :6969–7067. Whole body in C order:
  trimspaces (space/tab-only, verified identical to C
  hacklib.c:163–176), case-sensitive specials (old toLowerCase
  was wrong — genuine fix), backslash+escapes, M/pending,
  ^/C-pending, `?` rubout pair, 3-digit wrap. Cites exact.

Helpers: regex_init/compile/free extended with `errdesc`
(C `:70` code-store analogue); trimspaces/highc LIVE
(hacklib.js); escapes file-local VERIFIED line-exact against C
:6895–6966 (all six arms incl. hex pair-index math and dcount
limits); M(c)/C(c) macros verified (global.h:480/487, NHSTDC
absent on unix — only WIN32/VMS). No new clones, no stubs;
the sounds.js edge extends a --can-SAFE import.

## C ↔ JS fidelity

The five-site completeness claim verified: csym lists exactly
coloratt.c:598, options.c:7742/:7893/:9333, sounds.c:1599
(+ the nhregex.h decl) — all five wired, none missed. txt2key
walked arm-for-arm against C :6969–7067 including the dead M-
and C- single-char arms (kept, faithful), the FIXME fall-through
(unimplemented in C too), and the no-txt[3]-check digit return
("1234"→123, jsdoc-noted). M_single-quote and digit-wrap edges
exact. No RNG anywhere; all sync.

Callers (spot-verified in-tree): txt2key :5462/:7645 ✓,
msgtype_add :6522/:7859 ✓, APE :6361 + cfgfiles.c:614 ✓,
coloratt :567/:659/:6441 ✓; sounds caller cfgfiles.c:1233
inside `#ifdef USER_SOUNDS` (:1220–1236, verified off) ✓.

Nit (bookkeeping, not a C-wrong): `add_sound_mapping` is
labeled `ported` while naming an in-body Rule-#2-terminal sink;
the D-3108/D-3113 convention for that shape is `partial` with a
`blocked:` omit. Zero queue impact either way (the sink can
never be built), but the label is inconsistent.

Diff grep: clean. Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

None. "All five C call sites" is exactly true; the cite fixes
are all verified corrections, not churn.

## Density

7-function closure (head + callee/call-site closure across
options.c/coloratt.c/sounds.c — one subsystem, not two), ≤10,
no Must-fix bundled, per-function Ledger + Verify lines. ~200
js/ insertions + a 14-vector test. Per-function verdicts: all
ACCEPT. SHA verdict: ACCEPT.

## Verification

Re-measured (`--base 6e3bbfbe7~1 --reach-all`, all 6 in one
call): 6/6 smoke 24/24 → REACH-OK, 0 blocked each (vacuous
notes as in the D-log). No REGRESSED session. Green 2/2, strict
×2, cohort 7/7, full 44/44 auto + `txt2key.test.mjs` 14 pass
per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
