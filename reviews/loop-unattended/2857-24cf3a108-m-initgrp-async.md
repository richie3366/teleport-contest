# Review 2857 — 24cf3a108 — m_initgrp mid-group inline-appear behind MM_ASYNCGROUP

## Metadata

- SHA: `24cf3a1086474f1a08f0a9096b2563b7c43b8a06` (D-4014)
- Cliff writer: `peffect_paralysis` head @a95d0eb7e (1 block),
  writer m_initgrp mid-group appear
- js/ diff: `js/const.js` +6 (flag), `js/allmain.js` +9/-2
  (wiring), `js/makemon.js` +78/-1 (async twin + early return
  + deferred tail)
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: opt-in deferred tail — flagged primaries stash
`{anymon, allowMinvent}` at the sync early-return and run group
gates + group (member appears awaited INLINE), invent, deliver,
newsym in `makemon_appear_msg`, so a member Norep --More--
splits placements across steps like C. Valkyrie 146→539.

Diff actually: the flag, twin, stash/return, deferred head,
maybe_generate wiring. Promise == diff.

## Inventory

- `m_initgrp_async` (`js/makemon.js:3320`, C
  `nethack-c/upstream/src/makemon.c:78-145` via `csym.mjs`):
  same loop, inline member appear.
- `makemon` early return (`js/makemon.js:3793`): flagged
  primaries stash + return.
- `makemon_appear_msg` deferred head (`js/makemon.js:3905`):
  group → invent → deliver → newsym, C order.
- `maybe_generate_rnd_mon` (`js/allmain.js:399`): passes the
  flag on both calls.

## C ↔ JS fidelity

- Twin vs C `:78-145` (read in full): `rnd(n)`, ulevel div,
  min-1, `peace_minded` skip, `enexto_gpflags` with the
  primary's mmflags, member `makemon(..., mmflags|MM_NOGRP)`,
  mpeaceful/mavenge/malign — all mirrored; the inline
  `makemon_appear_msg` await replaces the `_grpAppearPending`
  push, matching C's synchronous `:1476-1504` member tails.
  Sync twin is otherwise identical — verified side by side.
- Deferred head vs C `:1430-1479` + sync tail: gates
  (`G_SGROUP&&rn2(2)`→n=3, `G_LGROUP`→`rn2(3)`?n=10:n=3 —
  matches the `m_initsgrp`/`m_initlgrp` wrappers),
  invent+saddle (`!rn2(100)` gate), minvent discard, migrating
  deliver, newsym — same order, same draws. mstrategy needs no
  replication (applied earlier at `:3566-3569`, before the
  return); `anymon` (`:3355`) and `allow_minvent_local`
  (`:3673`) are also computed above the stash. Members strip
  the flag (`memflags`), have no `_asyncTail`, and re-enter
  only the drain — no recursion. Unflagged callers skip the
  early return — sync tail byte-identical.
- **C-wrong — flag-bit collision (Actionable #1):**
  `MM_ASYNCGROUP = 0x00200000` (`js/const.js:2440`) is NOT "the
  next free bit": it equals `GP_ALLOW_XY` (`:2444`). C
  `hack.h:1170` carries the explicit warning *"if more MM_
  flag masks are added, skip or renumber the GP_ one(s)"*.
  `m_initgrp_async` passes the primary's mmflags (bit set) to
  `enexto_gpflags`, so flagged member placement runs with
  `allow_xx_yy=TRUE` (`js/teleport.js:584`): when both candy
  sweeps fail, JS places the member at the origin square
  (`:620`) where C returns FALSE (member skipped). Latent —
  fires only under crowded placement; probe RNG identical,
  REACH clean — but reachable in normal play (every
  maybe_generate grouped spawn) and one line to fix
  (`0x02000000` is the next free bit in the shared word).

`sym.mjs`: `m_initgrp_async` single local (`js/makemon.js:3320`,
async twin by design); `MM_ASYNCGROUP` single export. Nothing
deleted or re-pointed. (Adjacent, pre-existing, not this SHA:
`MM_ASYNC = 0x00100000` also collides with `MM_MINVIS` — but
MM_ASYNC has zero users left in `js/`, so it is dormant.)

## Hallucinations / overclaim

Two, one minor: (1) "next free bit" is false (see above). (2)
The verify line's `js-throw at step 539` label vs `show`
jsPanic=null — reported verbatim with the discrepancy flagged,
and D-4015 confirms 539 was the themerooms RNG cliff, not a
throw. Honest handling, not a hallucination.

## Density

Cliff commit: owner was the generated head (verified
`d22d2e891:LOOP-QUEUE.md` row 1 = peffect_paralysis); writer
ported whole with named follow-up wirings; `Ledger:` entries
for all three functions. No FORCE/DIAG/seed reads; Rule #2
clean (see 2853).

## Verification

Re-measured on HEAD code, `--base 24cf3a108~1 --no-reach`:

- `verify peffect_paralysis: 0 PASS, 1 moved past, 0 unchanged,
  0 worse` — Valkyrie 146 → doaltarobj@984 (146→539 here,
  →984 via D-4015). Claim holds, no regression.

## Actionable C-wrongs

1. MM_ASYNCGROUP//GP_ALLOW_XY collision (js/const.js:2440 vs
   :2444; C hack.h:1162-1175; reader js/teleport.js:584/620;
   trigger js/makemon.js:3337) — renumber to `0x02000000` or
   mask at the enexto call + crowded-placement probe. Must-fix.

Verdict: **ACCEPT-WITH-DEBT**

**Addressed:** D-4018
