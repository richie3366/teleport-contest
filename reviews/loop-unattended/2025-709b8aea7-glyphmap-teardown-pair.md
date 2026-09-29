# Review 2025 — 709b8aea7 — free_all_glyphmap_u + reset_customsymbols

Metadata: SHA `709b8aea7`, D-3065, js/glyphs.js + js/options.js (~60 js
insertions). Cluster: `free_all_glyphmap_u` + `reset_customsymbols`
(same C file, caller/callee pair) + sole-caller arm wiring. Docs-only
follow-up `35b79b1f1` (same D, no js/) reclassified the ledger row
partial→ported; reviewed as context, not as a SHA.

## Intent vs deliverable

Promise: port the utf8map.c teardown pair and wire the
`reset_needed_visuals` options.c:8996 arm. Diff adds both exports in C
order, the options.js arm with extended combined-`docrt` gate and the
:9012 flag clear, the glyphs.js import, and a map section. Kept.

## Inventory

- `free_all_glyphmap_u` (NEW, js/glyphs.js:1003, sync): MAX_GLYPH loop
  nulling utf8str then u; gbuf sweep as commented named omit.
- `reset_customsymbols` (NEW, js/glyphs.js:1024, sync): free + live
  `apply_customizations(currentgraphics, DO_CUSTOM_SYMBOLS)`.
- options.js `reset_needed_visuals`: new customsymbols arm + gate
  extension + flag clear. No clones, no stubs, no deleted symbols.

## C ↔ JS fidelity

`free_all_glyphmap_u`: C utf8map.c:58–80 (csym range). JS ports :64–73
exactly (loop, `u` guard, utf8str-then-record nulling, C `free` ≡ null).
Absent/short `game.glyphmap` skips the loop ≡ all-NULL BSS — sound for
the lazy JS table. The :74–79 gbuf sweep is omitted with an in-code
comment + map section: verified no JS analogue exists (no
`game.gbuf`/indexed gbuf store anywhere in js/ — only comment
references), so there are no dangling `.u` copies to clear. Callers per
`csym --callers`: utf8map.c:214 (wired here) and symbols.c:345
`clear_symsetentry` (unported, named in the map hunk in this commit).
No RNG. Confirm.

`reset_customsymbols`: C utf8map.c:210–217 (csym range): free +
`apply_customizations(gc.currentgraphics, do_custom_symbols)` under
ENHANCED_SYMBOLS (live — apply_customizations is a live export).
JS matches with `DO_CUSTOM_SYMBOLS = 2` (js/glyphs.js:628, = C
do_custom_symbols). Sole C caller options.c:8996 wired here. Confirm.

options.js arm vs C options.c:8979–9014 (direct read):
customsymbols arm before the redraw block (:8994–8995) ✓;
`check_gold_symbol` gated on needRedraw only (:8996–8999, reglyph still
named) ✓; `docrt()` under the combined gate (:9001) with the gate
extended by exactly the newly-live flag (palette/customcolors flags
still named) ✓; `opt_reset_customsymbols = false` (:9012) ✓. Order
matches C. The still-missing promptstyle arm and customcolors/palette
clears are pre-existing named gaps, superseded by the D-3069 whole
restart — not this SHA's debt. Confirm.

## Hallucinations / overclaim

None. The at-SHA D-log said "partial" for the gbuf sweep; the
docs-only fixup reclassified to ported/"no JS analogue" — both
accurately describe the same code, and the no-analogue claim is
verified above. No dispatch-with-stubbed-callee: both callees of
reset_customsymbols are LIVE.

## Density

2 whole functions, one C file, callee closure + sole-caller wiring —
§2b-shaped. Per-function: free_all_glyphmap_u ACCEPT,
reset_customsymbols ACCEPT. `Ledger:` entries present (jsonl in-stat;
fixup finalizes ported/ported).

## Verification

D-log Verify claims vacuous hidden + smoke 24/24 REACH-OK both +
green/strict/cohort/full. Re-measured:
`hidden-proxy verify free_all_glyphmap_u,reset_customsymbols --base
709b8aea7~1 --reach-all` → 0 blocked both (correctly labelled vacuous;
queue cited no blocks) + fixed smoke 24 PASS, 0 regressed → REACH-OK
both. Diff grep for bans: clean. `imports.mjs --rulecheck`: clean
(whole-tree run, see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
