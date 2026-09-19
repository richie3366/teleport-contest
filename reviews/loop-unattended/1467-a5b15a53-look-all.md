# Review 1467 — a5b15a53 — `pager.c` look_all whole body (D-2508)

Metadata: SHA `a5b15a53`, `js/pager.js` +113/−~55. C `pager.c:1978–2074` (`look_all`, 97 lines, staticfn). D-log: D-2508.

## Intent vs deliverable

Promise: restart driven by `glyph_at` class branches — canspotself-gated hero arm, invis/warning arms, glyph-derived object arm, compass header split, BUFSZ guard, no display-RNG re-roll. Diff delivers all of it with `:line` cites. Promise = deliverable.

## Inventory

- Restarted: `look_all` (pager.js, module-local like C staticfn).
- One import word added to a live edge (`upstart` — `--can` ALREADY, no new edge). Nothing deleted or re-pointed.

## C ↔ JS fidelity

Branch order ≡ C: region `:1989` ✓; `glyph_at` per cell `:1993` ✓; `glyph_is_monster` → `u_at && canspotself` → `self_lookat` else `m_at` → `look_at_monster` buf-half ✓ (`mon_at` is the pre-existing uhitm `m_at` wrap); invis arm with verbatim `'remembered, unseen, creature'` ✓ (`glyph_is_invisible_id ≡ glyph==GLYPH_INVISIBLE` per `display.h:773` — exact); warning arm via `glyph_to_warning` + `def_warnsyms[].desc` ✓; object arm via `glyph_to_obj` into the pre-existing C-cited `look_at_object`/`object_from_map` port (`:380–399`, own D-row — the otyp-only boundary is that port's, and `glyph_to_obj` is its C-exact input) ✓.

Header ≡ `:2026–2042` (`upstart`, `coord_desc(u)`, compass `!canspotself ? 'your position' : 'you'`, `"    "` separator, non-nearby `All … on the map:` verbatim) ✓; prefix ≡ `:2043–2063` (widths + kitten via live `look_coord_prefix`, shown char + 2 spaces) ✓; BUFSZ guard ≡ `:2061` (`BUFSZ-1-head.length` slice) ✓; tail `display` vs `No … shown ….` pline ≡ `:2067–2073` ✓. Shown char from cell `disp_ch` (D-1767 convention) is what C `encglyph(glyph_at)` renders, with no RNG re-roll — the old `mon_glyph`/`obj_glyph` Hallucination re-roll is gone ✓. C has zero RNG here; JS adds none ✓.

Callee closure: all LIVE or pre-existing reviewed locals (`look_at_monster_buf` NULL-monbuf half, `look_coord_prefix`, `show_text_pages`). Named omits (`coord_desc` compass-full text, `self_lookat` steed arm, `look_at_object` TREE suffix) are pre-existing, map-named, outside this body.

## Hallucinations / overclaim

None.

## Density

Whole 97-line function, one module, 113 insertions. Breadth-phase right size.

## Verification

Re-ran `hidden-proxy.mjs verify look_all --base a5b15a53~1 --reach-all`: 0 blocked both trees (row cited 0 blocks); smoke 24/24 PASS → REACH-OK. Matches the D-log. Diff grep clean (0 hits). Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

C loci read in full: `pager.c:1978–2074` (look_all) + `:380–399`
(look_at_object head). Branch map re-verified: `glyph_is_invisible ≡ glyph
== GLYPH_INVISIBLE` (`display.h:773`) — JS `glyph_is_invisible_id` exact;
`glyph_is_object` (obj/piletop/statue/body banks) and `glyph_to_obj`
(CORPSE/STATUE peel, piletop/normal banks) both C-cited in display.js with
line refs; `look_at_object(buf,x,y,glyph)` opens with
`object_from_map(glyph,x,y,&otmp)` — so the JS adaptation
`look_at_object(x,y,glyphotyp)` calling `object_from_map(glyphotyp,x,y)`
takes the C-exact input, and passing `glyph_to_obj(glyph)` is the C-order
derivation (that inner port is its own D-row; the boundary is clean).

Header/prefix bytes: nearby `"%s currently shown near %s:"` +
`upstart(which)` ✓; non-nearby `"All %s currently shown on the map:"`
(lowercase which, no upstart) ✓ — JS `All ${which}…` exact; separator
`"    "` (Qt 4-spaces hack, comment preserved) ✓; per-line `"%8s  "` MAP /
`"%12s  "` compass / `"%s  "` screen widths via live `look_coord_prefix`
+ kitten, then `encglyph` char + two spaces ✓; guard
`lookbuf[BUFSZ-1-strlen(outbuf)] = 0` ≡ `slice(0, BUFSZ-1-head.length)` ✓;
tail `display_nhwindow` vs `"No %s are currently shown %s."` ✓. Nesting
`u_at && canspotself → self` else `m_at → monster-buf` matches C's
if/else-if (count increments inside arms, print gated on `*lookbuf`) ✓.

New `upstart` word on the live hacklib edge (`--can` ALREADY, no new edge).
`mon_at` is the pre-existing uhitm `m_at` wrap; `look_at_monster_buf`
NULL-monbuf half and `show_text_pages` NHW_TEXT idiom are pre-existing
reviewed locals. Named deferrals (compass-full coord text, steed arm, TREE
suffix) untouched and map-owned.

Re-run output: `verify look_all: baseline a5b15a53~1 — 0 blocked (0 at
baseline, 0 working)` + `smoke look_all: no RNG-tagged reach (RNG 0);
fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK`. Diff grep
for FORCE/DIAG/getRngLog/fastforward/seed: 0 hits.

Verdict: **ACCEPT**
