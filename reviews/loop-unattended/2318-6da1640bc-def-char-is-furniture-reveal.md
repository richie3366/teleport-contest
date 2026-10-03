# Review 2318 — 6da1640bc — def_char_is_furniture + reveal id arms

Metadata: SHA `6da1640bc`, D-3363, C `drawing.c:119–142` +
`detect.c:2166–2288` (staticfn, sed-read). Stat: new
js/drawing.js (42) + js/generated/defsyms_data.js (115 via
new extractor) + detect.js clone→import + display.js 4
arms; 2 tests (6/6).

Intent vs deliverable: subject promises "def_char_is_
furniture whole port (generated defsyms + new js/drawing.js)
+ reveal_terrain_getglyph id arms (Tourist-94120 → PASS)".
Diff actually delivers that — plus a committed `__probe`
DIAG block the message calls "(reverted)". It is not
reverted: live at HEAD, nothing reads it (C-wrong 1).

Inventory (def_char_is_furniture): 1 new **C callee** at
js/drawing.js:20 + 1 clone deleted (detect.js:313
`'<>_{|\\'`→1/-1 approximation, same `>= 0` outcome at the
sole site, wrong indices). Table anchors re-verified by
executing the checked-in table: 105 entries, [25] =
S_upstair "staircase up", [37] = S_fountain "fountain", no
earlier 5-char "stair" prefix, single "fountain" ✓.
Extractor re-run: byte-identical output (md5-stable ✓).

Inventory (reveal_terrain_getglyph): 4 id-carrying arms in
the pre-existing kind taxonomy (trap `tg.glyph`, memory
`copy_glyph_id`, seenv `back_to_glyph`, unseen
GLYPH_UNEXPLORED) + the `__probe` DIAG (js/display.js:4369,
:4563–4567 at HEAD). All glyph helpers pre-exist; no
import change, no stub.

C ↔ JS fidelity (def_char_is_furniture): exact. Scan order,
`furniture` flip on 5-char "stair" prefix, first
`sym == (uchar) ch` wins, break past "fountain", else -1 —
all mirror C :119–142; no RNG. Input normalization is
character-identical to sibling def_char_to_objclass
(objects.js:109); the sole call site passes strings
(detect.js:2710 crystal-ball chain, `>= 0` test = C
detect.c:1342 ✓ sole C caller per csym). Confirm.

C ↔ JS fidelity (reveal arms): confirm. C starts
`glyph = glyph_at(x,y)` (:2209) = gbuf state =
GLYPH_UNEXPLORED for never-seen cells (display.c:2477–2483
returns gbuf; gbuf inits UNEXPLORED) — the 4 arms attach
exactly the int C's value would carry where JS previously
dropped it (→ NO_GLYPH → "unexplored area"). The strip
block's `!seenv → default_id` is untouched and C-consistent
(:2234 `!reg ? default_glyph`, region deferred). Trap-arm
guard matches the keep_traps restore. Callers: C :2381 →
detect.js:1372 → display.js:4508 → :4515 per-cell ✓ sole JS
caller; C :2323 dump_map correctly unwired (DUMPLOG
retired). GLOC law cited correctly for C (getpos.c:502
`glyph_is_unexplored`) — but see overclaim (b).

C-wrong 1 (DIAG + recorded coordinate in production): the
diff adds `((x|0)===42 && (y|0)===15)` capture + a
`globalThis.__probe_reveal` write — the exact failing cell
(42,15) from the D-log, hardcoded in scored `js/`, writing
a global nothing reads. Behavior-neutral (records only; no
control-flow/RNG/return effect — hence not REJECT), but
§6-forbidden DIAG left in `js/` and a recorded-coordinate
read in production. Must-fix removal.

Hallucinations / overclaim: (a) "(reverted)" is false —
the probe is added by this diff and live at HEAD. (b)
"also fixes GLOC_INTERESTING over-inclusion" is
unsubstantiated: JS `is_unexplored_loc` (getpos.js:735)
keys off `seenv` + `disp_ch`, neither touched by the arms
(ch/color unchanged; only ids travel) — no JS GLOC behavior
changes. C-side citation is right; the claimed JS effect is
not. (c) "`--can` ALREADY" for detect→drawing: drawing.js
is a NEW module, so the edge is NEW-in-commit (likely
checked after editing) — safe regardless (leaf: imports
only generated data; hoisted fn; no cycle/TDZ).

Density: 2-function cluster, each whole with D-log
C-locus/JS/Callers/Verify/Named + `Ledger:` (furniture
ported; reveal partial ✓) + combined `verify.mjs` (syntax
4, rule2, green/strict/cohort, full 44/44 shared-display ✓)
+ 2 pinned tests. Shape note: drawing.c + detect.c with no
caller/callee closure between the functions (sole C caller
of def_char is the detect.c:1342 crystal-ball arm, not the
:2381 reveal path) — coherent single-defect cluster, noted
without a row. Per function: furniture ACCEPT; reveal
QUALITY-RISK (C-wrong 1).

Verification: re-measured — `verify
def_char_is_furniture,reveal_terrain_getglyph --base
6da1640bc~1 --reach-all` → furniture "1 blocked at
baseline → scen-terrain-Tourist-94120: PASS, 0 worse →
PROGRESS" + "smoke 24/24 REACH-OK"; reveal "0 blocked" +
"smoke 24/24 REACH-OK". Matches every D-log number.
`--can`: detect→drawing ALREADY (post-commit; see (c)).
Rule #2 clean (extractor is scripts/, data is data). Diff
grep: the (42,15)/globalThis probe lines (C-wrong 1).
`sym.mjs` (required paste):

```text
def_char_is_furniture js/drawing.js:20   sync
reveal_terrain_getglyph js/display.js:4366   sync
```

Single definers; the detect.js:313 clone is gone.

Actionable C-wrongs:

1. Committed `__probe` DIAG + hardcoded (42,15) in
   reveal_terrain_getglyph — Must-fix row (delete the
   :4369 block and the :4563–4567 capture; no reader
   exists).

Verdict: **QUALITY-RISK**

**Addressed:** D-3366 `f1f60014e`
