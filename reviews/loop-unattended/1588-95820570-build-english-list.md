# Review 1588 — 95820570 — end.c build_english_list whole-body port (D-2629)

**Metadata:** SHA `95820570`, `end.c` `build_english_list`, D-2629.
JS: `js/end.js` only (+87/−1).
Coverage row (MISSING → live). No prior review claimed closed.

## Intent vs deliverable

Subject promises: whole-body port of `build_english_list` plus its
file-local C helpers `wordcount`/`bel_copy1`, with the SYSCF WIZARDS
path having no JS counterpart. Diff delivers all three symbols plus
the `impossible` import join. Promise matches deliverable.

## Inventory

- `wordcount()` — new file-local (matches C staticfn).
- `bel_copy1()` — new file-local (matches C staticfn).
- `isEndSpace()` — new file-local (C-locale blank set).
- `build_english_list()` — new async export (async only for the
  case-0 `impossible` await).
- `impossible` joined to the existing display.js import.
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `end.c:1822–1859` (38 L, via `csym.mjs build_english_list`).
Full C body read here. Arm-by-arm confirm:

- Sizing `:1827–1832` (`strlen` + wordcount + `alloc(len+1)` +
  `*out = '\0'`) has no representable effect on growing JS strings —
  correctly map-named, only the word count observed.
- Case 0 `:1835`: `impossible("no words in list")` + break, returns
  empty — exact (JS awaits the live async export).
- Case 1 `:1838–1840`: single `bel_copy1` — exact.
- 2-word `:1842–1845`: `bel + " " + "or " + bel` → "first or
  second" — exact.
- N-word `:1845–1853`: do/while with `--words > 1`, `", "` joins,
  trailing `"or "` + last word — exact, loop-trip count verified
  against C (3 words → 2 comma joins).
- `isEndSpace` covers exactly the six C-locale blanks (space, \t,
  \n, \v, \f, \r) — correct for `isspace((uchar))`, no unicode
  folding.
- `bel_copy1` cursor object stands in for `char **inp`; leaving the
  cursor past the word (not past trailing blanks) is observationally
  equivalent since the next call skips leading blanks first.

Caller wiring: C `cfgfiles.c:806` (SYSCF WIZARDS parse) has no JS
SYSCF layer — correctly named, nothing to wire. C
`sys/unix/unixmain.c:659` is platform main — correctly named, never
ported. `sym.mjs wordcount` / `bel_copy1` report "NOT EXPORTED, 1
local clone in js/end.js" — expected shape for C statics living
file-local here too, not clone drift; the tool's do-not-duplicate
warning is satisfied (exactly one copy each).

Callee closure: only `impossible` (display.js:8055, async — await
required, correctly awaited). "Named: alloc" accurate.

## Hallucinations / overclaim

None. D-log reports the vacuous hidden verify plainly and names
both callers plus the formatted-list consumers as waiting on the
SYSCF omission rather than claiming them wired. (Minor cite drift:
JS comments say `:1823–1859`/`:1793–1806`, csym prints
`:1822–1859` — header-line convention only, body exact.)

## Density

38-line C function + two small statics, one module, +87/−1.
Right-sized. Throwaway probe `/tmp/bel-probe.mjs` (9/9 arms,
not committed) is honest probe discipline.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/seed names/
  hardcoded coordinates in control flow.
- Re-measured: `hidden-proxy.mjs verify build_english_list --base
  95820570~1 --reach-all` → `0 session(s) blocked` (vacuous-note
  path, honestly labeled) + `fixed smoke spread (24 run): 24 PASS,
  0 regressed → REACH-OK`. Both summary lines cited; no REGRESSED
  session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
