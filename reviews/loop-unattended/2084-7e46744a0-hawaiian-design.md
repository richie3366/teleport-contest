# Review 2084 — 7e46744a0 — hawaiian_design + shirt-block wiring

- SHA: `7e46744a0` (D-3124)
- Subject: "`read.c` hawaiian_design whole-body + doread shirt-block caller wiring (coverage)"
- js/ insertions: ~84 (js/objnam.js + js/read.js)
- Prior index: 2083; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port MISSING `hawaiian_design` whole beside its motif
sibling + wire the read.c:376–413 shirt block into doread (its
sole C caller :394).

Diff actually adds: the 11-entry bgs table, the export, the
39-line shirt block, 4 import names on existing edges, 3 `_on`
consts, and 3 doc-retirement lines. Matches the promise.

## Inventory

- `hawaiian_design` (js/objnam.js:619, export) — C read.c:223–251
  (csym range). Live: whole body.
- `doread` (js/read.js:2188, async export) — caller wiring only:
  the :375–415 shirt block in C order.

Helpers: none added. Callees all live single-site exports:
makeplural/an (objnam), hawaiian_motif (sibling, pre-existing),
tshirt_text/apron_text/shk_your (objnam), suit_simple_name
(do_wear), You_cant (display) — names added to existing edges
only, no new module edge. T_SHIRT/ALCHEMY_SMOCK/HAWAIIAN_SHIRT
via the file's `_on` helper (established pattern). Nothing
deleted or re-pointed.

## C ↔ JS fidelity

`hawaiian_design`: bgs table order identical (7 solids +
4 adjectives); `bg = o_id ^ (unsigned)~ubirthday` with exact
`>>> 0` unsigned casts — deliberately different from motif's
`o_id ^ ubirthday` per the C comment (verified both hashes);
`"%s on %s background"` over makeplural(motif)/an(bg) verbatim.
The buf-aliasing analysis is sound: C evaluates
makeplural→own-static and an→own-static before the outer
Sprintf overwrites buf, so plain JS strings match. No RNG
either side.

Shirt block: C :375–415 read in full. Gate, Blind arm (:380–383,
You_cant + Braille string :332 verbatim, return 0), obscured
arm (:384–391 — T/H-only + uarm + scroll==uarmu, unpaid
ternary, shk_your+suit_simple_name, return 0), HAWAIIAN arm
(:392–396 — verbose ternary, no literate bump, return 1),
literate post-increment (:397–400 — test-then-bump with the
T-shirt/apron message), slogan + endpunct (:402–413 — verbose
"It reads:", `.!?` check). All exact, in C order, in the right
slot (after cookie :365, before the later arms). `verbose !==
false` is the file's 5× idiom, not a new invention.

Callers: sole C caller :394 → the new block ✓. The retired doc
lines (T_SHIRT/ALCHEMY_SMOCK/HAWAIIAN_SHIRT ×2 + "shirt /
…" ×2) are all lifted; remaining doread deferrals (credit/
marker/coin/orb/candy) genuinely remain.

The doread extra probe (3 blocked sessions on blind-scroll/
silently arms) is disclosed as pre-existing phase-2 residual
on untouched arms — correctly not queued (phase 2 closed).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "No RNG" accurate; the 3-block note is honest about
scope.

## Density

Single function + caller wiring at ~84 insertions — at the
~80 floor, and same-file growth was correctly declined (read.c
remainder = phase-2 corpus residuals). 3 same-iteration stale
dispositions (munstone, get_table_coords_or_region split per
review 1672, assign_candy_wrapper) follow the chaining
pattern. Verdict: ACCEPT.

## Verification

Re-measured (`--base 7e46744a0~1 --reach-all`): 0 blocked at
baseline and working tree, vacuous note, smoke 24/24 → REACH-OK.
Matches the D-log; no REGRESSED session. Shared gates per D-log:
syntax 2 files, rule2, green 2/2, strict ×2, cohort 7/7 (full
skipped — no shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
