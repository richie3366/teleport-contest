# Review 2005 — fa84aeeac — furniture_detect whole + map_redisplay restore

Metadata: SHA `fa84aeeac`, D-3045, js/detect.js only (+96/−48).

## Intent vs deliverable

Subject promises "furniture_detect whole restart + map_redisplay C-order
restore". Diff actually does: restarted `furniture_detect` (file-local
staticfn), completed `map_redisplay`, import extensions (all riding the
existing display.js/const.js static edges), header comment updates. No
new cross-module edges. Matches promise.

## Inventory

- `furniture_detect` (restarted, file-local) — C detect.c:1090–1134.
- `map_redisplay` (completed, file-local) — C detect.c:93–102.

## C ↔ JS fidelity

`furniture_detect` vs C `:1090–1134` (csym): `unconstrain_map()` :1097
✓; `glyph_at`/`glyph_to_cmap` reads :1101–1102 ✓ (replacing the
`remembered_glyph` snapshot — the old code measured the wrong thing);
`IS_FURNITURE(levl typ)` arm :1103–1105 ✓; `is_cmap_furniture` arm :1106
as the sym.h:104 macro expansion `sym >= S_upstair && sym <= S_fountain`
— verified verbatim against sym.h:104, exact ✓; `m_at` +
M_AP_FURNITURE + `seemimic` :1108–1110 ✓ (seemimic is sync js/mon.js:1186,
called sync — correct); `!mon || !canspotmon → map_invisible` :1111–1112
✓; `glyph_at` re-read `revealed` :1114–1115 ✓; `There`/`Your` :1118–1123
✓ (async display.js exports, awaited); `!revealed → display_nhwindow`
:1125–1126 named omit (no JS export — plausible, display_nhwindow is a
windowport call with no scored analogue) with fall-through to
`map_redisplay` :1132 ✓; `browse_map(TER_DETECT|TER_MAP|TER_TRP|TER_OBJ|
TER_MON, "location")` :1129–1130 ✓; `return 0` :1133 ✓. No RNG in C;
none added.

`map_redisplay` vs C `:93–102` (read directly): `reconstrain_map()` :96
✓; `docrt()` :97 ✓; `Underwater → under_water(2)` :98–99 ✓ (async,
awaited); `uburied → under_ground(2)` :100–101 ✓. `flush_screen(1)`
retained — pre-existing screen-model flush, documented, not new.

Callee closure: `unconstrain_map`/`reconstrain_map` are CLONEs
(file-local js/detect.js:1043/1057 — correct mapping: C staticfns in
detect.c:68–91) and I matched the unconstrain body against C :68–81
here (save/clear uinwater/uburied/uswallow + boolean return — exact).
Everything else LIVE: glyph_at, glyph_to_cmap (display.js:742),
m_at, seemimic, canspotmon, map_invisible, There, Your, under_water,
under_ground, docrt, magic_map_background, browse_map. (m_at clones in
dig/shknam/teleport/uhitm are pre-existing elsewhere, untouched.) No
stubs, one legitimate named omit. The removed redundant dynamic
`import('./display.js')` for docrt/flush_screen changes no behavior
(static imports pre-existed).

## Hallucinations / overclaim

None. The commit message's "`imports.mjs --can` confirms" and the
getpos.js:283 equivalent-local note are consistent with what sym shows.

## Density

2 functions, one C file, callee closure — within §2b. Ledger entries
for both. OK.

## Verification

D-log cites verify.mjs → PASS + REACH-OK ×2 + green/strict/cohort (full
skipped, single non-shared file — legitimate). Re-measured:
`hidden-proxy.mjs verify furniture_detect,map_redisplay --base
fa84aeeac~1 --reach-all` → 0 blocked (vacuous, expected — D-log says
so), smoke 24/24 PASS each → REACH-OK, no regressions. Diff grep: no
FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
