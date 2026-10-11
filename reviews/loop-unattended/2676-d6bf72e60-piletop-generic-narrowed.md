# Review 2676 — d6bf72e60 — piletop-generic narrowed, normal_object third disjunct

Metadata: SHA `d6bf72e60`, D-3812, cliff row-2 `objnam.c`
readobjnam_postparse1 writer (@c7b85e2f6). JS: `js/display.js`
(+23/−? three predicates + comment). Test:
`scripts/glyph-piletop-generic.test.mjs` (7 its).

## Intent vs deliverable

Promise: `glyph_is_piletop_generic_obj` covered the whole piletop
bank, so map_object's observe gate disco'd every nearby piletop;
now C-exact class-slots-only, and `glyph_is_normal_object` gains C's
third disjunct. Claimed: 95401 → PASS. Diff actually does: two
predicate fixes + `glyph_to_obj` comment refresh (order/peel
unchanged), no new imports. Match.

## Inventory

- `glyph_is_piletop_generic_obj` (js/display.js:1064) — changed:
  whole-bank → `> OFF && < OFF+FIRST_OBJECT-1`. C
  `display.h:841–843` (verified below).
- `glyph_is_normal_object` (js/display.js:1048) — changed: gains `||
  glyph_is_normal_piletop_obj`. C `display.h:851–856` (verified).
- `glyph_to_obj` (display.js:1115) — comment only.
- `glyph_is_normal_piletop_obj` (display.js:1143) — pre-existing,
  C-exact, untouched. No new helpers, no deletes, no re-points
  (`sym.mjs`: all three are plain sync exports in display.js).

## C ↔ JS fidelity

C `display.h:841–843` (verified by direct read):
`glyph_is_piletop_generic_obj` ≡ `g > PILETOP_OFF && g <
PILETOP_OFF + FIRST_OBJECT - 1` — JS now identical, symbol for
symbol. Old JS (`>= OFF && < OFF+NUM_OBJECTS`) covered ~390 extra
otyp slots — the disco bug, correctly deleted. C `:847–856`
(verified): `glyph_is_normal_piletop_obj` ≡ `== OFF || (> OFF+FIRST
-1 && < OFF+NUM_OBJECTS)` — pre-existing JS matches exactly; C
`glyph_is_normal_object` is its three disjuncts — JS now has all
three. Documented superset (JS keeps OBJ OFF+1..OFF+16 inside
normal, where C arms 1+2 exclude them): outcome-neutral at all
three call sites, verified — `glyph_is_object` (display.js:1103)
ORs generic arms anyway; `glyph_to_obj` (:1121) peels OBJ_OFF for
those slots exactly as C's generic-first order does (C :902–913:
generic → peel own OFF; JS pile arms first, same peels — traced
all four glyph classes, identical); pager.js:1344 showsym arm
wants every object glyph. Test it #7 pins the superset. No RNG;
none added. Gap: none. Disjunct-by-disjunct confirm.

## Hallucinations / overclaim

None. Diagnosis is measured: /tmp bisect (kept out of repo) traced
the smock into game.disco at seg5 move 397 (shared-RNG mondead
drop, piletop over the saddle), env-gated trace (removed) named
map_object←newsym←xkilled, C's menu is the C-side measurement.
"Callers audited" holds — the three call sites are enumerated and
neutral.

## Density

Cliff-phase: writer correct (map_object observe gate, not the
objnam owner). Ledger: display entry. Verify bullet: 1 PASS +
REACH-OK + green + strict + cohort + auto full 44/44 (shared file).
Named: the superset is pinned, not deferred. Not unreached: probe
PASSES.

## Verification

js-hunk grep: 0 hits (clean). Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify readobjnam_postparse1 --base
d6bf72e60~1 --reach-all` → `1 PASS, 0 moved past, 0 unchanged, 0
worse → PROGRESS` (95401 PASS) and `smoke 24/24 → REACH-OK` —
exactly the D-log claim, zero regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
