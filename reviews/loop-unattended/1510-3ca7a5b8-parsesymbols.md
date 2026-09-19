# Review 1510 — 3ca7a5b8 — symbols.c parsesymbols producer [campaign 5/7] (D-2551)

## Metadata

- SHA: `3ca7a5b8`
- D-id: D-2551. Next index: 1510.
- Files: `js/options.js` (+346: `escapes`, `sym_val`,
  `match_sym`, `savedsym_add/free`, `parsesymbolsSeg`/
  `parsesymbols`, RC caller arms, `mungspaces` clone deleted
  for the live import), `js/glyphs.js` (+12−: six `[1]`→`[2]`
  reader moves), `js/hacklib.js` (+9: exported `lowc`),
  `js/generated/glyphsyms_data.js` (regenerated 196 triples),
  `scripts/extract-glyphsyms.py`, `scripts/parsesymbols.test.mjs`
  (+117, new).
- C loci: `symbols.c:772–849` (`parsesymbols`, 78 L),
  `symbols.c:851–901` (`match_sym`, 51 L),
  `options.c:9384–9426` (`sym_val`, 43 L),
  `options.c:6895–6966` (`escapes`, staticfn, 72 L),
  `symbols.c:738–754` (`savedsym_add`), `hacklib.c:83`
  (`lowc`). All ranges from `csym.mjs`, cited as those ranges.

## Intent vs deliverable

Subject promises: the comma-recursion + S_/G_ producer in C
order with cfgfiles + options callers wired and the
customization path named. Diff delivers that plus the LOADSYMS
triple regen it depends on. Promise matches deliverable with
one disclosed live-path hazard (see Debt 1). No RNG in C;
none added.

## Inventory

- New: `escapes` (file-local, mirrors staticfn), `sym_val`,
  `match_sym`, `savedsym_add` (file-local), `savedsym_free`,
  `parsesymbolsSeg` (file-local), `parsesymbols` (all
  exported except the two file-locals), `lowc` (exported,
  `js/hacklib.js`, mirrors `hacklib.c:83` — ASCII A-Z `|040`
  verified against C here).
- Deleted local clone: options.js `mungspaces` → live
  `getline.js:1295` import (`sym.mjs mungspaces`: export is
  sync; 7 other clones in other files are pre-existing and
  untouched). Required `sym.mjs` output pasted in this
  review's audit trail (ran this iteration — export sync,
  clone list confirmed). The clone's only other options.js
  user now uses the import; file passes syntax + tests.
- No other deleted/re-pointed symbols.

## C ↔ JS fidelity

Branch-by-branch confirm unless noted:

- `escapes` vs C `:6895–6966`: `\M` gate (needs a following
  char), simple-char, `^` control (`& 0x1f`), decimal/octal
  (first digit + `++dcount < 3`), hex via `hexdd`-pair
  truncation (`(dp-hexdd)/2`, `++dcount < 2` — JS
  `Math.trunc(indexOf/2)` with identical break order), the
  C-style table (`\\ n t b r`, default = the char — verified
  case-for-case against C `:6940–6956`), `meta → |= 0x80`,
  `(char)` truncation → `& 0xff`. All exact. HEXDD literal
  matches `decl.c:74` pairing (`00…99aA…Ff`).
- `sym_val` vs C `:9384–9426`: empty/single-char +
  `isspace` set (`' \t\n\v\f\r'` ≡ C locale set) ✓; 3-char
  quote, 4-char backslash (`'"\` membership) ✓; strrchr→
  `lastIndexOf` + `escapes` fallback ✓; QBUFSZ slice (const
  from const.js = 128) ✓; return `charCodeAt(0)`/0 ≡
  `(int)*buf` ✓.
- `match_sym` vs C `:851–901`: G_/g_ reject ✓; `:`/`=`
  cut with the `q < p` preference and one-space backup ✓;
  the `len >= strlen && strncmpi(buf,name,len)` pair →
  `len === name.length` + ASCII-fold whole-name compare —
  **proved equivalent here**, not assumed: when `len >
  strlen(name)`, C's `strncmpi` meets the name's NUL against
  a real buf char and mismatches, so C matches ⟺ lengths
  equal + prefix equal. Alternates table (10 rows,
  byte-checked against C `:856–865`) + exact canonical
  `strcmp` → `===` ✓.
- `parsesymbolsSeg` vs C `:772–849`: scan from `start+1`,
  `!postch` break, quote/backslash skips, first-comma/colon
  recording, comma cut + tail-first recursion, colon-then-`=`
  strval search from the segment start, NUL cuts via the
  shared char array (substr-free, preserving the outer
  frame's spans — the comment states the reason), dual
  `mungspaces`, `match_sym`, G_ gate (uppercase only, like
  C), `range && != SYM_CONTROL`, `H_UTF8 || u+` dispatch,
  `sym_val` → `update_ov_rogue/primary_symset` (both LIVE:
  `js/display.js:3794/3803` per `sym.mjs`), `savedsym_add`,
  TRUE/FALSE returns — all in C order.
- `savedsym_add` vs C `:738–754`: find→replace val, else
  prepend — exact (C mutates in place; JS passes mungspaced
  copies, which equal C's post-`mungspaces` buffers).
- `lowc(strval[0])` reads verified against `hacklib.c:83`.
- Callers: C `cfgfiles.c:1193/1204` → JS top-level
  `ROGUESYMBOLS=`/`SYMBOLS=` arms; C `options.c:663` → JS
  OPTIONS `S_` fallback (case-sensitive `startsWith` ≡
  `strstr == opts`) plus the valueless-`S_` arm with the
  purity argument stated. All three wired; no call from a
  site C never calls from.
- LOADSYMS regen: 196 entries; `[2,96 S_expl_tl]`
  (PCHAR value), `[3,108 S_armor]` (OBJCLASS +105),
  `[5,190 S_nothing]` (OTH SYM_OFF_X) all consistent with
  the extractor's stated offsets; only 3 files reference
  LOADSYMS and all read the triple correctly (glyphs.js six
  moves in this SHA, options.js new code) — no stale
  `[1]`-as-name reader remains.

## Hallucinations / overclaim

None — the D-log discloses the bare-identifier arms
explicitly ("call bare …, named omits, never stubbed") and
does not claim the customization path works. The `len ===
name.length` equivalence, stated without proof in the
subject, is proved in this review (above).

## Density

One producer family + its lookup table regen, ~460 js/test
insertions across 3 modules plus generated data. At the
§2b ceiling band for a data+logic family; the regen is
machine output, not hand padding.

## Verification

- D-log: `verify.mjs --fn parsesymbols` → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify parsesymbols --base
  3ca7a5b8~1 --reach-all` → 0 blocked both trees (vacuous,
  honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed gates
  or hardcoded coordinates.

## Actionable C-wrongs

1. (Debt, map-named — NOT Must-fix) G_/H_UTF8/`u+` arms call
   bare `match_glyph` / `glyphrep_to_custom_map_entries`
   (`sym.mjs`: both NOT FOUND in `js/`), and unlike D-2544's
   bare callees these sit behind **live user-input callers**:
   a top-level `SYMBOLS=G_…` RC line reaches `match_glyph`
   (ReferenceError where C returns FALSE → `config_error_add`
   → continue), and an `S_x:u+…` value reaches
   `glyphrep_to_custom_map_entries`. No corpus session feeds
   these arms (0 blocked, suite green), and the callees are
   named in the map with C citations
   (`glyphs.c:458`/`glyphs.c:112`) — so per the rubric named
   omits stay in the map. But the next port iter that touches
   RC symbol input must treat any G_/u+ line as a throw
   hazard until the customization-write subsystem ports; do
   NOT "fix" with silent stubs (review-1503 direction
   stands), and do NOT close the map lines without porting
   the subsystem.

Verdict: **ACCEPT-WITH-DEBT**
