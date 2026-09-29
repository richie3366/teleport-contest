# Review 2029 — 3bee10e1d — options.c visuals/windowcolors closure (6 fns)

Metadata: SHA `3bee10e1d`, D-3069, js/options.js (+252/−80, restart) +
js/glyphs.js (+31). Cluster: `reset_needed_visuals`,
`wc_set_window_colors`, `optfn_windowcolors` (options.c),
`wc_color_name` (coloratt.c), `reset_customcolors`,
`clear_all_glyphmap_colors` (glyphs.c).

## Intent vs deliverable

Promise: restart reset_needed_visuals whole; port the windowcolors
optfn + parser + tables; port wc_color_name and the customcolors
teardown pair. Diff delivers all six with per-arm `:line` cites, the
optlist idx-211 wiring, and BSS-ensure table helpers. Kept.

## Inventory (per function)

- `reset_needed_visuals` (js/options.js:8673, local async): RESTARTED
  whole in C order.
- `wc_set_window_colors` (js/options.js:8522, local sync): new
  index-based port of the NUL-walk parser.
- `optfn_windowcolors` (js/options.js:8601, exported): new, wired
  into the optlist row (was optfn:null).
- `wc_color_name` (js/options.js:4832, exported): new (C home
  coloratt.c; JS sits by check_enhanced_colors).
- `reset_customcolors` / `clear_all_glyphmap_colors` (js/glyphs.js):
  new exports mirroring D-3065.
- Helpers: module-local WC_COUNT/WCNAMES/WCSHORTNAMES/DEFBRIEF +
  wcolors ensure fns (C data, not clones); no deleted symbols.

## C ↔ JS fidelity (per function)

`reset_needed_visuals` — C options.c:8979–9014 vs JS: glyph gate +
named reset_glyphmap ✓; 4-flag gate ✓; palette arm clears the flag
with change_palette named — ifdef claim VERIFIED (windconf.h:29
commented out; only Amiga amiconf.h:165 defines it; allmain.c:712
inside the same ifdef; macconf.h hit is outdated/) ✓;
customcolors/customsymbols/redraw arms with live reglyph_darkroom
(display.js:7146, pre-existing import) ✓; promptstyle gate +
by-design named ✓; botl ✓; all five clears in C order ✓. Callers:
3 JS sites (:8962/:8987/:10065) for the 3 C sites
(:8727/:8973/:9294). Confirm.

`wc_set_window_colors` — C :10022–10113 vs JS, accept/reject by
accept/reject: mungspaces copy ✓; all 5 early `return 0` points
present ✓; wn/tfg/tbg scans with identical NUL-vs-delimiter
behavior (incl. the conditional tbg terminator) ✓; strcmpi match
over verified WCNAMES/WCSHORTNAMES/WC_COUNT=4/DEFBRIEF='def' (C
:4885–4890, flag.h:210–213, :126 all read) ✓; strstri space-guard ✓;
check_enhanced_colors + wc_color_name canonical store (free≡GC) ✓;
dup/unknown config_error_add strings verbatim ✓; flag set +
return 1 ✓. Sole caller :4913 wired. Confirm.

`optfn_windowcolors` — C :4893–4940: do_init zeroing ✓; do_set via
string_for_opt/EMPTY_OPTSTR with the verbatim "Could not set"
error ✓ (opts-string/opts.buf split = file's optfn convention);
get_val Sprintf `"%s%s %s/%s"` reproduced exactly incl. the
long-vs-short name rule and def fallbacks ✓; allopt wiring via
optlist idx-211 row (C NHOPTC macro generates the row; 0 direct
`csym --callers` hits is expected for table dispatch). Confirm.

`wc_color_name` — C coloratt.c:763–797: 'no-color' default ✓; >=0
gate ✓; NH_BASIC_COLOR mask + differing-implies-basic ✓ (assert
noted dropped); r/g/b shifts ✓; `#%02x` via padStart ✓; named-row
override loop from 16 with break ✓; static-buffer ≡ fresh string
(callers dupstr) ✓. COLORTABLE verified 155 rows with name/r/g/b
(row0 black, row16 maroon). Both callers (:10089/:10095) wired.
Confirm.

`reset_customcolors` / `clear_all_glyphmap_colors` — C
glyphs.c:1178–1183 + :1166–1176: two-line restamp ✓; guarded
customcolor zero + unconditional color256idx zero over MAX_GLYPH ✓
(absent/short table ≡ already-clear, D-3065 precedent). Callers:
:1181 wired, :8994 wired, symbols.c:348 named. Confirm.

## Hallucinations / overclaim

None. The CHANGE_COLOR "not compiled" claim — the kind of thing
often asserted loosely — is verified above against three loci.

## Density

6 whole functions: head (reset_needed_visuals) + same-C-file rows
(optfn/wc_set) + Open callees (reset_customcolors ← head,
clear ← reset_customcolors, wc_color_name ← wc_set) — exactly the
§2b growth rule (multi-file only via the callee closure). ≤10, no
Must-fix bundled. Per-function: all six ACCEPT. `Ledger:` 6 rows
(jsonl in-stat). Observation (not a C-wrong): module-local
WC_COUNT shadows an unused `WC_COUNT=0` in js/const.js —
documented in-code; const.js cleanup is future debt.

## Verification

Re-measured `hidden-proxy verify
reset_needed_visuals,optfn_windowcolors,wc_set_window_colors,wc_color_name,reset_customcolors,clear_all_glyphmap_colors
--base 3bee10e1d~1 --reach-all`: all six 0-blocked (correctly
labelled vacuous) + smoke 24 PASS, 0 regressed → REACH-OK each.
Ban-grep clean; rulecheck clean (see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
