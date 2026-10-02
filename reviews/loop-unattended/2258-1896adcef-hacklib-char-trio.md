# Review 2258 — 1896adcef — hacklib char trio + 3 rewires

Metadata: SHA
`1896adcef0e037d6af02bdf43c77223883faf1d2`
(D-3297, 2026-10-02).
`js/hacklib.js` (+38/−2: 3 exports
+ upwords rewire), `js/read.js`
(isDigit → digit), `js/topten.js`
(drifted clone → import). Three
functions new whole.

Intent vs deliverable: subject
promises digit + letter +
onlyspace canonical exports with
3 rewires and zero new edges.
The diff ships exactly that.
Delivers what it promises.

Inventory (per-function):

- `export function digit(c)`
  (hacklib.js:236): char-or-code
  → '0'..'9'.
- `export function letter(c)`
  (:247): '@'..'Z' or 'a'..'z'.
- `export function onlyspace(s)`
  (:258): space/tab-only walk,
  empty TRUE, NUL ends walk.
- Rewires: upwords inline →
  letter(ch); read.js isDigit def
  + 2 uses → digit; topten.js
  `!trim()` clone deleted →
  import (call site :99
  unchanged).

**C ↔ JS fidelity**:

`digit` (C hacklib.c:61–65):
`'0' <= c && c <= '9'` ✓. The
char-or-code idiom (highc/lowc)
is exact: fromCharCode of a
negative or small code lands
outside '0'..'9' just like C's
signed-char compare, and all of
'0'..'9' sit below 128 ✓.

`letter` (C hacklib.c:68–72):
`('@'..'Z') || ('a'..'z')`,
disjunction order kept ✓. C's
cast binds the first clause but
`||` of booleans makes the value
identical ✓. '@' in, '[' out ✓.

`onlyspace` (C hacklib.c:418–
425): `for (; *s; s++)` with the
space/tab gate and TRUE
fallthrough ✓. JS NUL-break
mirrors C's `*s` terminator
(real JS strings can embed
\0); `?? ''` is the file idiom
for C NONNULL ✓. Empty → true
✓. The deleted `!trim()` clone
also stripped \n\r\f\v, which
C counts non-space — the import
is a strict C-faithful fix, and
the drift is named at the site
(topten.js:65) ✓.

Callers: onlyspace's sole C
caller topten.c:325 → WIRED
js/topten.js:99 (`onlyspace
(tt.name) ? '_' : tt.name`,
mirrors C) ✓. letter's upwords
C :131 → WIRED hacklib.js:334
✓. digit's read.c :3155/:3157
→ WIRED read.js:2950,2953 ✓.
The D-log tables every other C
call site (25 digit + 9 letter)
as keeps-C-exact-inline with JS
cites — spot-verified three:
options.js illegal_menu_cmd_key
(:1586 digit + :1587 letter
inlines, C-cited), topten.js
score_wanted (:1072 digit
inline), botl.js is_digit_ch
(:1706). All real, all exact.

`sym.mjs` (required: deleted
clone + re-pointed sites):
digit hacklib.js:236 sync;
letter :247; onlyspace :258 —
single canonical exports, zero
remaining locals (isDigit and
the topten clone both gone)
✓. `imports.mjs --can
topten.js hacklib.js onlyspace`:
ALREADY, no new edge ✓ (same
for the read.js widening —
existing import line).

Hallucinations / overclaim:
none. "25 + 9 real call sites"
matches csym's caller lists;
unwired sites are listed, not
hidden; the density shortfall
is defended in the open (see
Density).

Density: 3 whole C functions,
one C file, ≤10 ✓. 49 js
insertions — below the ~80 bar,
but the D-log Next carries the
same-file audit (every other
ledger-Open brief/read-verified
live or unportable-standalone),
which is the rule's stated
escape. Own `Ledger:` entries
(all three ported) + own Verify
sub-bullets ✓.

Verification: D-log Verify
pastes the 3-fn tail verbatim
(3× vacuous-hidden disclosed +
3× smoke REACH-OK +
green/strict/cohort; full
skipped by verify's own
shared-file heuristic).
Re-measured (`hidden-proxy
verify a,b,c --base
1896adcef~1 --reach-all`): `0
blocked` ×3 + `smoke 24 PASS,
0 regressed → REACH-OK` ×3.
Exact match; zero REGRESSED.
Queue rows cited no blocks, so
vacuous is honest. Banned grep:
clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
