# Review 1251 — 1d169d4a — sobj_at residual 10 clones rewired to canonical import

Metadata: SHA `1d169d4a`, D-2285, queue row `invent.c sobj_at residual
clones` (D-2281 follow-up). js/: 9 files, +22/−99 (pure clone retirement,
no new logic).

Intent vs deliverable: subject promises all 10 residual defs deleted and
rewired to the D-2281 canonical import. Diff actually delivers that — 3
exact-name clones (`dbridge.js:121`, `music.js:498`, `steed.js:161`) + 7
renamed variants (`sobj_at_nexthere`, `sobj_at_otyp` ×2 apply/mon,
`sobj_at_hurtle`, `sobj_at_look`, `sobj_at_monmove`, `sobj_at_shk`) all
deleted; call sites re-pointed; no behavior added.

Inventory: no new functions. Deleted symbols re-point to canonical
`sobj_at`. `objects_at` dropped from 4 import lists (music/steed/dothrow/
pager).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/invent.c:1465–1475` (`csym sobj_at`, 11
lines): walk `svl.level.objects[x][y]` nexthere chain, `otyp ==` int
compare, return first match. The canonical (`js/mkobj.js:2201`, reviewed in
1247/D-2281) already ports this; this commit only re-points callers, so the
audit is clone-vs-canonical equivalence:

- 9 of 10 clones: same nexthere walk, compare `(o.otyp|0) === otyp` (one
  side `|0` dropped). Canonical is `(otmp.otyp|0) === (otyp|0)` — identical
  for int otyps, and every rewired call site passes int constants
  (BOULDER/STATUE/CORPSE/SCR_SCARE_MONSTER/LUMP_OF_ROYAL_JELLY) or `|0`'d
  glyphotyp. No behavior change; the three mis-cited "mkobj.c" comments
  (true locus is invent.c) are deleted with the clones.
- 1 clone (`mon.js` `sobj_at_otyp`) carried an extra `if (otyp < 0) return
  null` guard with no C basis. Dead for all its call sites (BOULDER/CORPSE,
  both positive); its deletion removes a non-C gate. Correct.
- Kept-local `mon.js:156 bad_rock` / `:918` boulder loops are
  boulder-specific predicates, not the generic otyp walk — correctly out of
  scope, named in the D-log.

Callee closure (required re-point audit): `sym.mjs sobj_at` →
`sobj_at  js/mkobj.js:2201  sync` (live export, sync, call-time use — no new
module edge since all 9 files already import mkobj.js). Deleted-name probe:
`sym.mjs sobj_at_nexthere` → `NOT FOUND in js/** (no export, no local
function/const)`. Zero-clone claim verified by grep: no exact-name
`function sobj_at` outside mkobj.js and none of the 7 renamed names remain.
Import-hygiene claim verified: `objects_at` has zero hits in music/steed/
dothrow and only 2 comment hits in pager (`:1605`, `:1702`). No STUB, no
OMIT, no RNG (draw-free walk).

Hallucinations / overclaim: none. "Zero clones remain" and "no new module
edge" both check out mechanically.

Density: deletions-only across 9 files in one mechanical family — §2b
acceptable as a D-2281 follow-up (not glued unrelated work).

Verification: D-log Verify bullet honest (vacuous note, explicitly NOT a
corpus PASS; full 44/44 run since shared-adjacent files changed).
Re-measured: `hidden-proxy verify sobj_at --base 1d169d4a~1` → "0
session(s) blocked on it (0 at baseline, 0 in the working scoreboard)".
`imports.mjs --rulecheck` → Rule #2 clean. Diff grep: no
FORCE/DIAG/seed/coordinate/RNG-index reads.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
