# Review 829 — b22e00db — hack.c moverock_core Sokoban diagonal won't-roll (D-1859)

Metadata: SHA `b22e00db`, D-1859, `js/hack.js` (+13/−2: arm + import + doc),
`js/sit.js` (+2/−1: export `surface`). No Must-fix open.

## Intent vs deliverable

Subject promises the Sokoban diagonal arm in C order plus promoting sit.js
`surface` to the shared export instead of a 5th clone. Diff delivers exactly
that; no scope creep.

## Inventory

Changed: `moverock_core` (new arm), `surface` (export only, body untouched).
No deleted/re-pointed symbols — no `sym.mjs` migration output required
(`surface` stays one export; dig/dokick/engrave clones pre-date this commit).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/hack.c:441–448` (read; `Sokoban` ≡
`svl.level.flags.sokoban_rules` per `rm.h:538`). Branch-by-branch confirm:
arm sits inside the clear-dest branch after `ttmp`/`mtmp` fetch and before
`revive_nasty`, matching C statement order. `Blind → feel_location(sx,sy)`,
awaited `pline("%s won't roll diagonally on this %s.", The(xname), surface)`,
`return cannot_push(otmp,sx,sy)` — all four elements in C order, no RNG
involved. `Sokoban_here()` (`game.Sokoban || sokoban_rules`) is the file's
established convention (already used at `hack.js:241,292`; mirrored after
getlev), not new drift.

Clone audit — `surface`: sit.js body covers air/cloud/fountain/altar/headstone/
wall/doorway/floor/ground, exactly as the subject lists. Against C
`dungeon.c:1750–1781` it drops the swallow maw/husk, waterlevel "air bubble",
pool/water, ice, lava, drawbridge "bridge", stairs, SDOOR-in-wall, and
earthlevel floor→ground legs. For the shipped arm the gap is latent (a Sokoban
boulder spot is floor/room → 'floor' in both), and `The(xname)`/`feel_location`/
`cannot_push` are LIVE. But the new sit.js docstring now calls this partial
clone "the shared home" for C's one `surface` — a future importer gets 6
missing legs silently. Debt, not a live-arm wrong (see item 1). No STUB in a
live arm. No FORCE/DIAG/seed/RNG-log/coordinate hits; `hack→sit` import is a
runtime-only call of a hoisted function declaration (no top-level TDZ read;
same SCC).

## Hallucinations / overclaim

"Fullest clone" listing is honest about coverage; "shared home" slightly
overstates parity (item 1). No dispatch-vs-callee mismatch.

## Density

~15 JS lines for one arm + dedup export. Right-sized.

## Verification

D-log: syntax, rule2, hidden 2 PASS, green, strict ×2, cohort 7/7, full 44/44.
Re-ran `hidden-proxy.mjs verify moverock_core --base b22e00db~1` myself:
`2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
(explore-seed0360…db38e7fa, explore-seed0116…f96960a6 both PASS). Claim true.

## Actionable C-wrongs

1. Shared `surface` (sit.js) silently drops 6 C legs (pool/ice/lava/bridge/
   stairs/air-bubble/swallow). Either port the missing legs or annotate the
   export with the exact uncovered inputs so the next importer does not inherit
   a wrong "shared home". Map debt, not Must-fix (live arm C-correct).

Verdict: **ACCEPT-WITH-DEBT**
