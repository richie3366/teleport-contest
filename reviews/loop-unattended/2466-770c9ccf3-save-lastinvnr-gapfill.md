# Review 2466 — 770c9ccf3 — save/restore drops lastinvnr (D-3584)

**Metadata.** SHA `770c9ccf3` (2026-10-07, D-3584). Type: **cliff**:
writer port for the cliffs head `nhlobj.c l_obj_register`. `js/`
insertions: 7 (`js/save.js` +7/−2) + committed test.

## Intent vs deliverable

Promise: C's `gl.lastinvnr` is «never saved&restored» (decl.h:536),
so post-restore assigninvlet scans from BSS 0 and fills the freed
`c` gap; JS preserved the counter (5) and dealt `g`. dosave0 omits
the key, restore forces 0. Probe Samurai-94217 →PASS.

Diff actually adds: the payload omission + the unconditional
`= 0`. Promise matches diff. No symbols deleted or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | dosave0 payload (lastinvnr omit) | partial | [save.js](/home/debian/dev/teleport-contest/js/save.js:728) | save.c:264–333 (savegamestate), decl.h:536 |
| 2 | try_restore_save (BSS-0 reset) | by-design (dorecover row) | [save.js](/home/debian/dev/teleport-contest/js/save.js:1045) | restore.c:521–736 (restgamestate) |

Helpers: none added. `assigninvlet` is the live single export
(`sym.mjs`: `js/u_init.js:877 sync`); the other `_lastinvnr`
writers are `reassign` (invent.js:9536/9559, C :4853–4884, gated
off here by invlet_constant) and the tutorial gamestate stash
(do.js:1153/1176, pre-existing, unrelated path). No
clone→import re-point, so no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

**The «never saved» design is exactly as cited.** decl.h:536
(read): `int lastinvnr; /* 0 ... 51 (never saved&restored) */` ✓.
Zero references to lastinvnr in save.c/restore.c/files.c, so
`csym savegamestate` (save.c:264–333) and `csym restgamestate`
(restore.c:521–736) omit it by absence ✓. u_init.c:1375 (read):
`gl.lastinvnr = 51` in new-game init; JS new-game u_init.js:2034
sets 51 ✓. assigninvlet invent.c:693–732 (read): scans from
`lastinvnr+1` with wraparound; JS u_init.js:877–913 (read) is the
same scan ✓. Arithmetic checks: invent $,a,b,d,e,f with `c`
freed — from 0: slot 1 taken, 2 free → `c` ✓; pre-fix from 5 →
`g` ✓. No RNG in the touched arms (letter assignment only).

**Restore-0 is safe.** Fresh C process = BSS 0, and JS restore
replaces the whole game object, so unconditional 0 is the
restgamestate analogue, not a default overwrite. No remaining
`payload._lastinvnr` readers (grep) — legacy keys ignored as
claimed ✓. The D-log's "start-insensitive" argument for prior
PASS restores is sound (C was always 0 there) and the audit
rescore re-checks it.

## Hallucinations / overclaim

None. The l_obj_register owner is correctly left by-design (Lua
registration, no scored analogue) — the deliverable was the
writer, per the parked-row discipline.

## Density

Cliff §10.18: cliffs-head writer, two arms of the save/restore
pair, own `Ledger:` touch (dosave0 + dorecover rows gain D-3584).
Per-function verdicts ACCEPT ×2 → SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message's own
  "No DIAG/FORCE/seed gates" — code clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `save-lastinvnr-gapfill.test.mjs`: 1/1 PASS now
  (pre-fix FAIL via stash claimed in-ship).
- Re-measure (mine): `verify l_obj_register --base 770c9ccf3~1
  --reach-all` → **1 PASS, 0 moved past, 0 unchanged, 0 worse** +
  smoke 24/24 REACH-OK — the D-log's line exactly.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
