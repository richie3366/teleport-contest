# Review 2750 — 5d931f606 — moverock Blind arm reads integer glyph

- SHA: `5d931f6060d9276ba065210b6dc4825273261c5d`
- Subject: D-3893 moverock_core Blind arm (Tourist-582711 s538+s569 → PASS)
- Type: cliff (≤10 functions: 1 helper changed), whole Method on the function
- D-entry: `## D-3893` (DIVERGENCE-LOG.md:117)

## Intent vs deliverable

Promise: `hack.c` moverock_core `:358–363` Blind arm read only
map_object's `.boulder` stamp, so a magic-mapped boulder re-felt after
^F; fix makes the helper also read the integer levl.glyph via live
`glyph_to_obj`, moving Tourist-582711 to PASS.

Diff actually adds: `js/hack.js` — one import name (`glyph_to_obj`),
`glyph_to_obj_is_boulder` gains the integer fallback
(`if (rg?.boulder) return true; return glyph_to_obj(rg?.glyph) === BOULDER;`)
plus a rewritten comment; new `scripts/moverock-blind-mapped-boulder.test.mjs`.
Docs + ledger + scoreboard as usual. No other `js/` hunks.

## Inventory

| JS function | C locus | Status |
|---|---|---|
| `glyph_to_obj_is_boulder` (js/hack.js:1267) | hack.c:358–363 predicate + display.h:902–913 | changed, predicate only |

C range for moverock_core per csym: `nethack-c/upstream/src/hack.c:347-638`.

## C ↔ JS fidelity

C (`hack.c:358`): `if (Blind && glyph_to_obj(glyph_at(sx, sy)) != BOULDER)`
→ feel + map_object + nomul + return −1. C `glyph_at` is the shown glyph
(`display.h`), `glyph_to_obj` the integer peel (`display.h:902–913`:
body→CORPSE, statue→STATUE, generic/normal peel).

JS (`js/hack.js:940`): `if (Blind_im() && !glyph_to_obj_is_boulder(sx, sy))`
→ pline feel + map_object + nomul + return −1 — same order, same four
effects. Helper now: invisible→false; `.boulder` stamp→true; else live
`glyph_to_obj(rg?.glyph) === BOULDER` (`js/display.js:1116`, sync export,
peel matches C arm order incl. piletop banks). The integer fallback is
exactly C's predicate; the kept boolean OR only fires where D-1281's
stamp exists and the integer is absent — branch-by-branch confirm, no gap.

Helper classification: `glyph_to_obj` is a C callee (LIVE import, body
ports C); `glyph_to_obj_is_boulder` remains a local clone of
glyph_at+glyph_to_obj, now verified against C here. `sym.mjs glyph_to_obj`
→ `js/display.js:1116 sync` (single definition, no clone count issue).

Grep: `FORCE`/`DIAG`/`getRngLog`/`fastforward` hits are all doc/commit
prose ("No DIAG/FORCE/seed gates", NOTES "never FORCE"); zero in `js/`
hunks. No seeds, coords, or `getRngLog` in control flow.

## Hallucinations / overclaim

None. D-log says the DIAG was reverted and grep-verified, the import edge
pre-existed (`--can: ALREADY`), and the sibling `apply.js:3640` boolean
read was deliberately untouched as a different C function — all checkable
and consistent. No "Match C" dispatch-over-stub pattern (callee is live).

## Density

Cliff phase: owner moverock_core was the cliffs row-2 with the head
(`nhl_gamestate`) parked UNPORTABLE — ships under the standing
operator-override precedent, real `js/` + movement. `Ledger:` entry
present (`moverock_core ported`). Whole-function claim holds: predicate-only
fix, no new arms, no deferred callee. Not a no-op iteration: `js/` diff
non-empty with a moving session.

## Verification

D-log Verify: `verify moverock_core: 1 PASS, 0 moved, 0 no-movement`,
reach smoke 24/24, green + strict + cohort + full 44/44.
Audit re-measure (`verify moverock_core --base 5d931f606~1 --reach-all`):
`scen-sweep-Tourist-582711: PASS`; `1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS`; smoke 24 PASS → REACH-OK. Claim confirmed verbatim.
No REGRESSED session. Focused test added and stash-round-tripped per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
