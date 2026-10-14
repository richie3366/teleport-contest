# Review 2796 — f3027aae9 — wintty utf8 arm + startup stamp + unstamp markers

- **SHA:** `f3027aae9` (Wed 2026-10-14) — cliffs-head `welcome` writer (D-3945).
- **D-entry:** D-3945. **Ledger:** `g_pututf8` unknown→ported, `doset_simple` D-tagged.
- **Diff size:** `js/display.js` +27, `js/jsmain.js` +11, `js/options.js` +14, +2 tests.
- **Method:** cliff (≤10 fns) — whole Method on the three arms + movement re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: 20 Enhanced welcome@0 sessions need the wintty
utf8 paint arm, the rc stamp at startup, and the simple-menu unstamp
markers; JS will paint C's terminal bytes while the board stays gated
on the D-3944 recorder gap.

The diff adds exactly those three arms plus a raw-terminal-oracle e2e
test. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `show_glyph_cell` HUPSKIP return + `:3946` utf8 arm (display.js:5095–5120) | wintty.c `tty_print_glyph` :3854–3977, `g_pututf8` :3792–3803 | whole vs the cited arms |
| 2 | `NethackGame.start` stamp block (jsmain.js:196–205) | options.c `initoptions_finish` :7376–7382 | whole vs the cited block |
| 3 | `simple_bool_toggle` reset markers (options.js:9829–9842) | options.c `optfn_boolean` do_set :5411–5416 via `doset_simple_menu` :8660–8663 | whole vs the cited arms |
| 4 | symset-loader +2 tests (stamp unit, 50059006 e2e) | — | RED pre-fix per D-log, 16/16 post |

No helper, no symbol deleted or re-pointed. New import edges:
`display.js` gains `WC2_U_UTF8STR` (same-module const),
`jsmain.js` gains `apply_customizations`/`free_glyphid_cache`/
`glyphid_cache_status` from `./glyphs.js` (both LIVE exports —
`sym.mjs` shows `apply_customizations` js/glyphs.js:986 sync,
`show_glyph_cell` js/display.js:5026 async).

## C ↔ JS fidelity

**Arm 1 (utf8 paint).** C `tty_print_glyph` :3854–3977: `HUPSKIP()` at
:3867 (early, before clipping/extract/emission), then the
ENHANCED_SYMBOLS arm `!glyphdone && (wincap2 & WC2_U_UTF8STR) &&
SYMHANDLING(H_UTF8) && gm.u && gm.u->utf8str` → `g_pututf8(...)`,
else `g_putch(ch)`. JS: `done_hup` return after the (side-effect-free)
`map_glyphinfo` resolve, then the three-gate conjunction —
`install_tty_wincap2() & WC2_U_UTF8STR`,
`symset[utf8set].handling === H_UTF8` (utf8set clamps to
PRIMARYSET/ROGUESET; `SYMHANDLING` at sym.h:176 is exactly
`symset[currentgraphics].handling`, and currentgraphics only takes
those two values), `utf8u?.utf8str != null` mirroring C's pointer
check — with g_pututf8-as-assignment (JS strings already carry the
decoded char) and dec off (no graph_on in the utf8 path). C
`g_pututf8` :3792–3803 is HUPSKIP + putchar loop — fully represented.
The MSDOS-tiles `:3939–3944` exclusion is real (`#if ... MSDOS` in
pinned C). ✓

**Arm 2 (startup stamp).** C :7376–7381: cache-status check → free →
`apply_customizations(gc.currentgraphics, do_custom_symbols |
do_custom_colors)`; :7382 `opt_initial = FALSE`. JS places the same
three statements immediately before its existing `:7382` inline,
with `2|1` = `do_custom_symbols | do_custom_colors` (sym.h:132–135:
colors=1, symbols=2) and `apply_customizations(set, mask)` matching
C's `(which_set, docustomize)` signature order (js/glyphs.js:986).
`--can` on the new jsmain→glyphs edge is silent-OK per D-log; the
runtime-only call cannot TDZ. ✓

**Arm 3 (unstamp markers).** C `doset_simple_menu` BoolOpt arm
:8660–8663 builds `"!name"`/`"name"` and routes through
`parseoptions` → `optfn_boolean` do_set, whose
:5411–5416 sets `go.opt_reset_customcolors/symbols`; `doset_simple`
:8727 runs `reset_needed_visuals` (ported, D-3069). JS
`simple_bool_toggle` (the PICK_ONE immediate-apply path that bypasses
do_set) sets the same two markers for the same two names. ✓

**Ledger.** `g_pututf8` unknown→ported pointing at the arm is honest
(the whole 12-line body is represented); `doset_simple` was already
ported (D-3908), D-3945 appended — a touch, not an overclaim. ✓

**Observation (no row — unreachable):** C `HUPSKIP()` also sets
`morc = ESC` (wintty.c:79–86); the JS return skips it. `_morc` is only
consulted in More-prompt loops and hangup exits the run; no session
reaches it. The botl.js:801 cite has drifted a few lines (pattern
still present) — cite drift, not a C-wrong.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
`imports.mjs --rulecheck` clean across scored `js/`.

## Hallucinations / overclaim

None. "Post-fix JS paints C's terminal bytes" is pinned by the e2e
raw-terminal oracle (RED pre-fix); "board still diverges on blank
payload" was true at ship and the D-3944 gap measurement stands.
The full-menu `hilite_pet` ATR_INVERSE find in Next is disclosed as
pre-existing and out of scope, not claimed fixed.

## Density

Cliff discipline holds: the commit popped the welcome head (20
blocks), shipped the writer whole (paint arm + stamp + markers +
callers table), and named the remainder. The NO MOVEMENT at ship was
**not** sold as a named omission — the Verify block FAIL-flags
`verify welcome: 0/0/20`, cites the measured recorder gap (0 hi-bytes
vs C's 56 UTF-8 seqs, D-3944), refuses blank-replication as trace
tailoring, and states the falsifier (re-record). That falsifier fired:
D-3946/D-3951 moved 18+11 of these sessions on content the D-3945 arm
paints. My re-measure below closes the loop.

## Verification

Re-measured myself (`verify welcome --base f3027aae9~1 --reach-all`,
baseline = the 20 welcome@0 sessions at the parent):

```
verify welcome: 2 PASS, 16 moved past, 3 unchanged, 0 worse → PROGRESS
smoke welcome: no RNG-tagged reach; 24 PASS, 0 regressed → REACH-OK
```

2 PASS (Priest-50059050, Tourist-50059018), 16 to strictly later
steps/owners, 0 worse. The 3 unchanged are the documented
fountain-customcolor park (Samurai-50058508@0, Samurai-50059033@0,
Wizard-50155011@0 — cell-proven fg-only, D-3946/D-3951). No REGRESSED
session. The D-log's NO MOVEMENT claim was true at ship (stock
recordings); the port content is proven by the post-re-record
movement, exactly as its falsifier predicted.

## Actionable C-wrongs

None. The three arms are branch-faithful to the cited C, the ledger
touches are honest, and the deferred movement has since arrived with
zero regressions.

Verdict: **ACCEPT**
