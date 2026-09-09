# Review 1192 — 59983ef9 — extralev roguecorr guards + LVLINIT_ROGUE dispatch (D-2226)

Metadata: SHA `59983ef9`, `js/extralev.js` +33/−6, `js/mklev.js` +13/−5.
Queue row: Open `extralev.c` LVLINIT_ROGUE/ROGUEOPTS, 0 corpus blocks (named-omission row).

## Intent vs deliverable

Subject promises: roguecorr `impossible` wall checks + `sp_lev.c` LVLINIT_ROGUE
dispatch. Diff actually adds: 9 `impossible()` guards in `roguecorr` /
`makeroguerooms` (4 IS_WALL door checks, 2 off-grid arms, bad-direction else,
2 never-connected ends), `else if` chain fix, LVLINIT_NONE/LVLINIT_ROGUE arms
+ leading-default `impossible` in `splev_initlev`. Matches the promise; no
scope creep (ROGUEOPTS env parse stays named-deferred, correctly — Rule #2).

## Inventory

- `js/extralev.js roguecorr`: 9 guards (no new function).
- `js/extralev.js makeroguerooms`: 2 never-connected guards (no new function).
- `js/mklev.js splev_initlev`: NONE/ROGUE arms + default `impossible` (no new function).
- Imports: `IS_WALL` (`js/const.js:2287`, live const), `impossible`
  (`js/display.js:7531`, async), LVLINIT_NONE/ROGUE (`js/const.js:1978/1983`).

## C ↔ JS fidelity

`roguecorr`, `nethack-c/upstream/src/extralev.c:44–135`: all four IS_WALL
checks sit inside the `else` (real-room) branches after the `1+26*x`/`7*y`
offsets and before `dodoor` — JS verified in-tree at each site
(`:62` down / `:84` up / `:104` right-arm keeping C's verbatim `"down: no
wall"` label / `:126` left). `cy>=2`/`cx>=2` going-nowhere arms now brace
`impossible` before `return` (`:68`, `:110`); trailing `else impossible(
"corridor in direction %d?")` closes the chain (`:134`), replacing the old
silent two-`if` fallthrough. `makeroguerooms` tail (pinned, post-`miniwalk`
corridor loop) prints the LEFT/UP never-connected `impossible`s verbatim —
JS matches. `splev_initlev`, `sp_lev.c:2981–3018`: JS now mirrors C arm order
exactly (leading `default → impossible`, NONE break, ROGUE →
`makeroguerooms()` between MAZE and MINES). Branch-by-branch confirm; no RNG
in any added line. Pre-existing gap noted, not this row: C MINES arm sets
`linit->icedpools = icedpools`, untouched by both sides.

Helper class: `impossible` is a C callee (LIVE import, async). Called
fire-and-forget from sync `roguecorr`; body runs synchronously through the
`in_impossible` guard flag before its first `await`, so the guard semantics
hold — same shape as the `mklev.js:1525` precedent. `imports.mjs --can
extralev.js display.js impossible` reports ALREADY (edge pre-existed), so the
D-log's "new static edge" wording is imprecise but the safety conclusion is
stronger than claimed. No clones, no stubs, no omits inside the arms.

## Hallucinations / overclaim

None. D-log explicitly labels hidden as vacuous (NOT a corpus PASS) and the
row cited 0 blocks, so no `--base` re-run is owed.

## Density

52 insertions on a 0-block named-omission row is below the §2b band, but the
C locus is genuinely that small (nine one-line guards + two small dispatch
arms) — the "C is that small" exception applies. One falsifier, one C
family, two already-coupled modules. OK.

## Verification

D-log: `verify --fn makeroguerooms` → syntax/rule2/green 2/2/strict/cohort
7/7/full 44/44 PASS, hidden vacuous-as-labeled. Guards are draw-free and
unreachable on valid levels (callers pass only DOWN/RIGHT), so zero fortress
movement is the expected C-faithful result. No FORCE/DIAG/seed/coordinate
reads in the diff (grepped clean).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
