# Review 2021 — fb9c2049c — options.c initoptions_init

Metadata: SHA `fb9c2049c`, D-3061, js/options.js (+~104/−~10) +
js/cmd.js + js/earlyarg.js (comment refreshes) +
scripts/initoptions-init.test.mjs (+~100, committed). Single 188-line
C function + wiring of its `:7088` call site.

## Intent vs deliverable

Subject promises "builtin-defaults port". Diff actually adds exported
`initoptions_init()` in C order, wires the `:7088` call in
`initoptions()`, refreshes four stale "unported" cites, adds three
import edges + two consts, and ships a 5-case harness. Matches
promise. Ledger honestly `partial` (platform/seed omits).

## Inventory

- `initoptions_init` (new export js/options.js:6830, sync) — C
  options.c:7118–7305.
- Re-point: `initoptions()` `:7087–7088` gate now calls it.
- Comment-only: cmd.js ×2, earlyarg.js, allopt_array_init docstring.
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

Walked the full 188-line body against C in order. Stores: opt_phase
×2 ✓, cmdline-windowtype arm (`nmcpy` same-file (src,len)→string ✓,
config_error pair ✓, `disclose_strcmpi === 0` ✓, free→null ✓),
glyphid cache ✓, `reset_commands(true)` ✓, allopt initval loop ✓,
every flags/iflags store `:7170–7194` (end_own/top/around, paranoia
triple, versinfo 4/1 via VI_BRANCH/VI_NUMBER ✓, pile_limit 5 via new
const ✓, runmode, msg_history 20, prevmsg_window 's' with CURSES arm
compiled out ✓, menu_headings, getpos_coords, initrole/race/gend/
align chain ✓), init_ov_* pair ✓, warnsyms loop via the established
`.ch.charCodeAt(0)` seed convention (matches assign_warnings :3180)
✓, inv_order from DEF_INV_ORDER (15 classes in C :118–121 order,
minus NUL ✓), pickup/sortloot ✓, end_disclose `'n'.repeat(6)` =
C's 6× loop ✓, menu_style/wc_*/menuinvertmode ✓, SLIME_MOLD partial
init + pl_fruit 'slime mold' (D-1511 literal, documented) ✓, SYSCF
pass (config_error pair, SYSCF_OPT, read_config_file gate,
nh_terminate(EXIT_FAILURE)) ✓. Zero RNG both sides (init_random ×2
named: JS seeds once in jsmain start(); moot — the function is
startup-unwired). Sole C caller :7088 (other csym hits are comments)
✓ wired. Callees: allopt_array_init, config_error_init/done,
nmcpy, disclose_strcmpi, glyphid_cache_status/fill_glyphid_cache
(js/glyphs.js:755 sync), reset_commands, init_ov_primary/rogue_symbols
(js/display.js:3974/3978 sync), read_config_file, nh_terminate — all
LIVE; SYSCF_FILE/BUILTIN_OPT/SYSCF_OPT/RUN_LEAP/PARANOID_* all
defined ✓.

Named omits (each verified against C): sf_init `:7129` (NHFILE
fn-ptrs, no JS layer) ✓; choose_windows `:7136` (seed by-design) ✓;
init_symbols/switch_symbols/init_rogue_symbols (seed by-design) ✓;
TERM AT `:7223–7230` + vt `:7235–7242` (POSIX TERM/termcap guards;
use_color keeps its initval = C non-AT path) ✓; MSDOS/WIN32/MAC
(compiled out on unix — confirmed `#if` in the csym body) ✓;
assure_syscf_file `:7289` (VFS read handles absence) ✓. All
legitimate platform/no-analogue omits, each with a C cite.

Debt note (not a C-wrong, not queued): the commit refreshed four
stale "unported" cites but missed a fifth — js/options.js:3181
(assign_warnings docstring) still says "that init body itself is
unported". One-line comment fix for the next touch of that file.

sym.mjs: `fill_glyphid_cache js/glyphs.js:755 sync`,
`init_ov_primary_symbols js/display.js:3974 sync`,
`init_ov_rogue_symbols js/display.js:3978 sync`,
`DEF_INV_ORDER js/invent.js:2540 export const`. Nothing deleted or
re-pointed.

## Hallucinations / overclaim

None. "Live but startup-unwired" is accurate (initoptions itself has
no live JS caller yet — the function is wired to its C caller, which
awaits startup wiring). The D-log does not claim scored-run effects.

## Density

One whole 90-code-line C function, ~104 `js/` insertions + harness.
Single-function cluster justified (sole-caller leaf off an unwired
root). Own Ledger entry + Verify line. Right-sized.

## Verification

Re-measured (`--base fb9c2049c~1 --reach-all`): 0 blocked + 24/24
smoke REACH-OK — matches the D-log, honestly vacuous. Re-ran the
harness: `node --test scripts/initoptions-init.test.mjs` → 5 pass /
0 fail. D-log also claims full 44/44 (shared file) — the audit's own
`sessions` run below re-verifies the fortress. Banned-pattern grep:
clean outside CURRENT boilerplate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
