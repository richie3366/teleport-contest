# Review 2860 — 8595ef25e — MM_ASYNCGROUP renumbered off GP_ALLOW_XY

## Metadata

- SHA: `8595ef25eef2986f7841f59dd3b4e7d1aadefe31` (D-4018)
- Must-fix from review 2857 Actionable #1 (D-4014 flag-bit
  collision); ships alone
- js/ diff: `js/const.js` +6/-1 (value + comment); new
  `scripts/mm-asyncgroup-allow-xy.test.mjs` (64 lines, 3 tests)
- Method: full (≤10-function Must-fix)

## Intent vs deliverable

Promise: `MM_ASYNCGROUP` moves `0x00200000` → `0x02000000`
because the old value equalled `GP_ALLOW_XY`, so
`m_initgrp_async`'s `enexto_gpflags(..., mmflags)` passthrough
ran flagged member placement with `allow_xx_yy=TRUE` (origin
square taken where C returns FALSE). Renumber, not a mask, per
C's straight passthrough.

Diff actually: the constant + a C-citing comment + the test.
Promise == diff.

## Inventory

- `MM_ASYNCGROUP` (`js/const.js:2444`): value change only. No
  function added, changed, deleted, or re-pointed.

## C ↔ JS fidelity

- C word (`nethack-c/upstream/include/hack.h:1155-1177`, read):
  MM_ bits through `MM_MINVIS 0x00100000`, then the *"skip or
  renumber the GP_ one(s)"* warning, `GP_ALLOW_XY 0x00200000`
  … `GP_AVOID_MONPOS 0x01000000`, *"25 bits used"*. So
  `0x02000000` is exactly the next free bit — the "next free
  bit" claim that was false in D-4014 is true here.
- Passthrough (`makemon.c:131`, read): `enexto_gpflags(&mm,
  mm.x, mm.y, mtmp->data, mmflags)` — straight through, so no
  mask is the C-faithful choice. C `enexto_core`
  (`teleport.c:219-276`, NEW_ENEXTO arm): origin fallback
  gated on `GP_ALLOW_XY` (`:229`), `return FALSE` at `:276` —
  cites check out.
- No new collision: JS `goodpos` (`js/teleport.js:422-426`)
  reads exactly C's five bits (GP_ALLOW_U/AVOID_MONPOS,
  MM_IGNOREWATER/IGNORELAVA, GP_CHECKSCARY); `enexto_core`
  (`:584`) reads only GP_ALLOW_XY. The other JS `0x02000000`
  values (ALLOW_ROCK, SPFX_XRAY, FROMRACE, …) live in words
  never passed to enexto/goodpos — ALLOW_ROCK is
  mfndpos-word only. The test asserts flag∩GP-word empty and
  replays the exact `makemon.js:3330` call shape on a crowded
  map (FALSE) plus a GP_ALLOW_XY control (origin taken).

`sym.mjs MM_ASYNCGROUP`: single export (`js/const.js:2444`).
Nothing deleted or re-pointed.

## Hallucinations / overclaim

None. The D-log states the fix is latent with no blocked
sessions and says so in the Verify bullet rather than claiming
movement.

## Density

Must-fix row shipped alone; review 2857 stamped `**Addressed:**
D-4018` (hash filled by the next commit). `Ledger:` m_initgrp
split + D-4018, note kept. No FORCE/DIAG/seed reads; Rule #2
clean (`imports.mjs --rulecheck` over scored `js/`, this
iteration). New test 3/3 PASS (`node --test`, re-run here).

## Verification

Re-measured `--base 8595ef25e~1 --no-reach`: `verify m_initgrp:
0 session(s) blocked on it` — matches the D-log's "latent fix —
expected" line. D-log REACH (80/80 spread sample) is the
documented evidence; no regression signal.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
