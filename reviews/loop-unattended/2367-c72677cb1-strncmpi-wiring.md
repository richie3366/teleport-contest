# Review 2367 — c72677cb1 — strncmpi call-site wiring + sfbase stubs (D-3418)

- SHA: `c72677cb1` — "Open head batch: strncmpi call-site wiring (35 sites) + sfbase stubs; 3 audits, topl_putsym left open (D-3418)."
- D-entry: D-3418. Diff: 20 js files (+~110/−~90); ledger hacklib/pline/sfbase; journal + index + queue + scoreboard header.
- Scope: 8 functions (strncmpi wiring, 3 stubs, 3 audits, 1 left open) — whole Method per function.

## Intent vs deliverable

Promise: wire every listed bypass site to the live `strncmpi` export
(whole since D-2967); `match_sym` in the faithful C shape; two
delegating clones; `symNameCiEq`/`tribute_lowc` removed; 3 sfbase
no-op exports; `impossible`/`strstri`/`unicodeval_to_utf8str` audited;
`topl_putsym` left open on the missing tty char-cursor layer.

Diff actually adds: 35 direct `strncmpi(...)` call expressions (counted
from `^+` lines: 38 code hits minus 3 wrapper bodies) + 3 delegating
wrappers (`tribute_ncmpi`, `optStrncasecmp`, `thitu_ci_prefix`) +
2 deletions + 3 stubs. Every site in the D-log JS/Callers lists is
present; no site outside the lists. Promise == deliverable.

Required `sym.mjs` on deleted/re-pointed symbols:

```text
symNameCiEq      NOT FOUND in js/** (no export, no local function/const).
tribute_lowc     NOT FOUND in js/** (no export, no local function/const).
tribute_ncmpi    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s): js/files.js:223
optStrncasecmp   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s): js/options.js:12157
thitu_ci_prefix  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s): js/mthrowu.js:547
strncmpi         js/hacklib.js:615   sync
```

Both deletions verified gone (only a comment mentions `tribute_lowc`);
each wrapper is the single remaining local and delegates to the one
live export.

## Inventory

```text
strncmpi               | partial | js/hacklib.js:615 (+35 wired sites) | C hacklib.c:716-734 (csym)
norm_ptrs_u_roleplay   | ported  | js/sfbase.js:556                    | C sfbase.c:1087-1089
norm_ptrs_version_info | ported  | js/sfbase.js:564                    | C sfbase.c:1092-1094
norm_ptrs_you          | ported  | js/sfbase.js:588                    | C sfbase.c:1107-1109
impossible             | audited | js/display.js:8881                  | C pline.c:583-634 (csym)
strstri                | audited | js/hacklib.js:644                   | C hacklib.c:739-779
unicodeval_to_utf8str  | ported  | js/hacklib.js:868                   | C hacklib.c:881-919 (csym)
topl_putsym            | Left open (tty char-cursor layer)             | C topl.c:305-344
```

8/8 Ledger entries present; Left open one with a blocker (verified
true below).

## C ↔ JS fidelity

Live `strncmpi` body (untouched by this SHA, the wiring depends on
it) walked whole vs C hacklib.c:716-734: `while (n--)` incl. the
n=-1 strcmpi walk-until-NUL, `!*s2 → (*s1 != 0)` (0-or-1, never -1),
`!*s1 → -1`, signed-char `lowc` fold (JS `lowc_signed` maps
128-255 to negative, matching gcc `char`), ASCII-only fold like C
lowc (hacklib.c:83-86). Branch order exact.

Wired-site semantics (each old idiom vs the new call; C site read):
- `match_sym` (options.js) ≡ C symbols.c:884-888 exactly:
  `len >= strlen && !strncmpi(buf, name, len)` with the FULL buf and
  the cut `len`. Verified the len>name case: buf's real char at the
  cut vs name's NUL returns nonzero — a miss, exactly like C (the
  old `len === name.length` form was outcome-identical).
- cmd.c:2548 `!strncmpi(findstr, ef_txt, fslen)` → getline.js:1389
  same arg order, `String(findstr).length` ≡ strlen; short-e.txt
  misses both sides. coloratt.c:402 `!strncmpi(prompt,"Choose",6)` →
  options.js:6707 exact (old `str_start_is` is the same prefix test,
  hacklib.js:197). shk.c:788 nonzero test → shk.js:696 exact,
  PL_NSIZ already imported.
- botl.c:545, version.c:116 (`strlen(name)` n), do.c:2035,
  trap.c:243, hack.c:4192 (`length >= 18` guard subsumed by the
  NUL-vs-char miss), role.c:759/762/770 + race/gend (len=str.length;
  filecode strcmpi arms correctly kept inline), worn.c:944/946,
  symbols.c:885/891, options.c:935-941 (delegate covers real C
  strncmpi arms), files.c tribute tags (delegate; n<0 strcmpi walks
  until NUL like C), mthrowu helper (typeof guard kept, short
  misses via NUL). toLowerCase→ASCII-fold is strictly more faithful
  (C lowc is ASCII-only). Non-string inputs: `strncmpi` coerces via
  `String()` where old code would throw (trap `ostr`) — no caller
  passes non-strings; behavior-preserving on all real inputs.
- `optStrncasecmp` old body compared single chars as strings; new
  signed order differs only for non-ASCII, and all 16 sites observe
  zero/nonzero only — equality relation preserved.
- files.js→hacklib edge: `--can` now ALREADY (the new line is the
  only hacklib import); hoisted export, runtime-only calls, no TDZ.

Audits (no diff — bodies verified whole):
- `strstri` WHOLE vs C hacklib.c:739-779: empty-sub → str, Int8Array
  nibble tables (wrap like C `char`; `& 0x1F` identical for Latin-1),
  k<0/nibble rejects, `i <= k` lowc window with the `&str[i]` tail
  return; past-end reads exit via NaN≠ (≡ C NUL mismatch); embedded
  NUL truncates both sides. The row's apply.c:1412 ESC-strip arm is
  live at apply.js:4810-4812 (`strstri` tail + slice ≡ C
  `Strcpy(q, " to ")`, apply.c:1411-1413). `audited` correct.
- `unicodeval_to_utf8str` WHOLE vs C hacklib.c:881-919: bufsz<5 → 0,
  leading NUL, 5 range arms in order, unsigned surrogate test
  (`(((uval>>>0)-0xd800)>>>0) < 0x800` ≡ `uval - 0xd800u < 0x800`),
  toward-zero division (all division arms have uval ≥ 0x80),
  trailing NUL + return 1. C body is pure arithmetic — no callees,
  the row's glyphs.c/utf8map.c claim stale. `ported` flip justified.
- `impossible` byte-identical (diffed `git show SHA:js/display.js`
  vs HEAD) to the 2363-verified body; Rule #2 omits (:598 paniclog,
  :621-631 CRASHREPORT) match the declared omit. `audited` correct.
- 3 sfbase stubs: C bodies are 3-line `{ }` empties (verified
  sfbase.c:1085-1110); JS no-op exports in C order. No callers
  (SFCTOOL-only declarations).
- `topl_putsym` Left open blocker TRUE at SHA: `tty_curs` ledger
  `unknown`, `cl_end`/`backsp` have no ledger rows at all, no JS
  topline char-paint path (menu `cw` struct + local wrap counters
  are not the tty BASE_WINDOW cursor layer). D-3420 later split it.

## Hallucinations / overclaim

None. "35 C sites + 2 delegated clones" counts exactly (38 added
call lines − 3 wrapper bodies = 35 direct; tribute + optStrncasecmp
are the 2 delegates, thitu counted as its C site). "0 remaining
uses" true for both deletions. No "Match C" dispatch rides a stub —
every new call target is the verified live export.

## Density

Eight-function iter, no manifest (coverage rows, operator override).
Per-function verdicts: strncmpi ACCEPT; 3 stubs ACCEPT; impossible
ACCEPT; strstri ACCEPT; unicodeval_to_utf8str ACCEPT; topl_putsym
ACCEPT (blocker true). Per-function Ledger entries + Verify line
present. SHA verdict = best possible: all-whole.

## Verification

- Re-measured all 8 fns in one call (`--base c72677cb1~1
  --reach-all`): every fn "0 session(s) blocked" (vacuous, as
  D-logged — rows cited none) + smoke 24/24 PASS → REACH-OK ×8.
  0 regressed, 0 worse. Claims hold.
- `imports.mjs --rulecheck`: "Rule #2 clean" (whole scored tree).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  gates. Scoreboard hunk is header-only.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
