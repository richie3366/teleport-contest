# Review 2963 — 9dac5358b — that_is_a_mimic words from glyph_at (D-4123 code under D-4122's subject)

- SHA: `9dac5358b` (cliff, near-pass owner `that_is_a_mimic`, 2 rows). The
  D-4123 D-log, journal and ledger landed in docs-only `705415122`.
- D-entry: D-4123; Ledger: that_is_a_mimic ported
- `js/` diff: `js/uhitm.js` +44/−73

## Intent vs deliverable

The subject is D-4122's (goto_level oinit), but the `js/` diff is D-4123's
`that_is_a_mimic` restart. The other files in this commit are D-4122 hash
backfills and the board. 705415122's D-log entry says so ("a
finish-iteration run started in the same batch as a failed
DIVERGENCE-LOG edit … no amend or force-push"). That handling is correct
under the no-amend rule, but `git log -- js/uhitm.js` now shows the wrong
subject on this change.

D-4123's promise: the wording comes from the glyph the map shows
(`glyph_at`, :6219), not from the mimic's appearance. display_monster
draws a mimic posing as an unseen spellbook or gem from a zeroed fake
object (oclass 0), so C says "strange object". Diff: the body is
rebuilt on `glyph_at` branches (cmap / object / monster). Three clones
are deleted: `Blind_telepat_that` (→ display.js `hero_Blind_telepat`),
`is_plural_that` (→ objnam.js `is_plural`) and `Blind_that` at this site
(→ invent.js `Blind`). The fake object is now `dealloc_obj`'d.
Promise = diff.

## Inventory

- `that_is_a_mimic` — uhitm.js:4552–4630; C uhitm.c:6200–6276.
- Live callees now imported: `glyph_is_object`, `glyph_to_obj`,
  `glyph_is_monster`, `glyph_to_mon` (display.js), `is_plural`
  (objnam.js), `dealloc_obj` (mkobj.js), `object_from_map` (pager.js:1832
  via the bound hook).
- Kept local: `See_invisible_that` (uhitm.js:4504), `that_map_type`.

## C ↔ JS fidelity

The arms follow C one for one. **Blind:** `!Blind_telepat` → generic.
M_AP_MONSTER → `a_monnam`. Otherwise `what` stays null (no pline). That
is C :6212–6216, using the live `Blind` and `hero_Blind_telepat`
(`HTelepat || ETelepat` = youprop.h:156). **Sighted:** `glyph =
glyph_at(x, y)`. The cmap arm takes the FURNITURE or (OBJECT && sym ==
S_trapped_chest) condition and `defsyms[sym].explanation`. The object arm
calls `object_from_map(glyph, …)`, then simpleonames or "strange object",
then Those/That with `is_plural`, then `otense(otmp,"are")`, then the
fakeobj OBJ_FREE + dealloc_obj. The monster arm uses `glyph_to_mon` and
`pmname(mndx, Mgender(mtmp))` (C :6247–6249; the old code read
`mappearance` and `mtmp.female`). The `what` chain is C's: minvis &&
!See_invisible → generic; M_AP_MONSTER → `x_monnam(ARTICLE_A, NULL,
EXACT_NAME, TRUE)`; S_MIMIC asleep or frozen → "sleeping"; else
`a_monnam`. The omit_wait 7-byte skip matches C, and `seemimic` runs on
reveal. No RNG.

One clone is left: `See_invisible_that` reads `u.See_invisible || HSee ||
ESee`. C's macro (youprop.h:152) is `HSee_invisible || ESee_invisible`.
`u.See_invisible` is a sticky mirror: potion.js:435/440 set it true and
nothing clears it, so once a see-invisible potion has worn off, JS still
names an invisible mimicking monster (C: "a monster"). That needs a minvis
mimic, the cloned-Wiz case in C's own comment, so no session reaches it.
`See_invisible` has no export: `sym.mjs` lists 7 local clones and none
canonical.

## Hallucinations / overclaim

None about the code. The commit subject is wrong, as described above.

## Density

A whole-body restart in C order, net −29 lines, with two clones replaced
by live imports.

## Verification

```text
verify that_is_a_mimic (--base 9dac5358b~1): 2 blocked
  scen-shop-Healer-50057028: PASS
  scen-shop-Valkyrie-49959654: PASS
verify that_is_a_mimic: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
```

Exact match with the D-log in 705415122.

## Actionable C-wrongs

1. (debt, unreached) uhitm.js:4504 `See_invisible_that` reads the sticky
   `u.See_invisible` mirror. C See_invisible is `HSee_invisible ||
   ESee_invisible` only. No canonical export exists to import. Fold it
   into the first cliff that reaches a See_invisible reader, together with
   the potion.js:431 `HSee` read of the same mirror (that one feeds
   potion.c's permchance `rn2`).

Verdict: **ACCEPT-WITH-DEBT**
