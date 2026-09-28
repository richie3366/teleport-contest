# Review 1963 — bff5e68ae — options.c breadth cluster (D-3003)

Metadata: SHA `bff5e68ae`, D-3003, three-function `options.c`
cluster (option_help split + is_wc2_option + optfn_boolean with
BoolOpt table wiring). Stat: `js/options.js` +214 (imports,
`is_wc2_option`, `OPT_BOOL_VALOK`, `optfn_boolean`, wiring
loop). No prior review file on disk.

## Intent vs deliverable

Subject promises: "Split `option_help`; port `is_wc2_option` +
`optfn_boolean` with BoolOpt wiring. Verified `option_help`
complete for the baked non-wizard tty view ..., so no rewrite
of a corpus-verified screen path." Diff actually adds exactly
that: one file-local helper, one exported async handler, one
table wiring loop, two imports. Promise and diff match; the
`option_help` function itself gets no new JS (split claim —
checked below).

## Inventory

- `is_wc2_option` (NEW, file-local, `js/options.js:1069`):
  wc2_options[] name scan (C staticfn).
- `optfn_boolean` (NEW, exported async, `js/options.js:7782`):
  boolean option handler, C order (do_init / do_set head +
  female/perminv pre-switch + nosexchange + SET +
  after-change + opt_initial gate + in-game switch +
  toggled pline; get_val/get_cnf_val).
- `OPT_BOOL_VALOK` (NEW, `Set(['menucolors'])`): C optlist.h
  `v` (valok) field.
- Wiring loop (after the allopt literal): every BoolOpt row
  with `optfn: null` → `optfn_boolean` (113 rows per D-log).
- Imports: `vision_recalc` (vision.js), `STONE` (const.js).
- `option_help`: NO new JS — split onto pre-existing
  `option_help_lines` (`js/options.js:747`) +
  `next_opt_lines` (`:691`) + generated extractor lists,
  consumed at `js/pager.js:3298`.

## C ↔ JS fidelity (per function)

`is_wc2_option`, `csym` `options.c:9952–9963`: C
`while (wc2_options[k].wc_name)` + strcmp → JS
`for k < length` + `===`. Equivalent (JS array has no
sentinel row). C staticfn → file-local ✓ (mirrors
`is_wc_option`; `sym.mjs` reports exactly one local clone,
no second copy). Callers (`--callers`: 8 refs — `:8524`,
`:8590`, `:8848/:8872/:8889`, `:9486/:9503`): ZERO JS call
sites. All named in the D-entry (longest_option_name has no
counterpart; doset_simple_menu ships in D-3009 with its own
row; doset filter arms pending runtime wincap2 parity;
option_help :9486/:9503 covered by the same parity note).
A callee-closure check on a zero-callsite port: the function
itself is whole and exact; the unwired callers are named,
not silent. OK.

`optfn_boolean`, `csym` `options.c:5191–5449` (259 lines,
read whole in two windows): do_init ✓; addr silent
retreat ✓; setwhere config/wiznofuz gates ✓;
`string_for_opt` + negated-with-param + `ln` + word parse
✓ (equivalence verified: `optfn_boolean_word`
`'true'.startsWith(low)` with `ln<=4` ≡ C
`!strncmpi(op,"true",ln)` prefix match; `digit+atoi==1`
≡ `/^\d/+parseInt===1` including the "1abc"/"01" tails);
fuzzer gate via names instead of optidx (equivalent —
`silent`/`perm_invent` are unique names) ✓; female
male/female `max(ln,3)` arms ✓; perm_invent
`can_set_perm_invent` ✓; nosexchange ✓; generic SET via
`game[row.addr.obj][row.addr.key]` (row-addr idiom) ✓;
pauper→nudist copy (C `u.uroleplay`, JS live `flags.*`
fields — matches the row addrs) ✓; ascii_map/tiled_map
mirror flags ✓; hilite_pet TTY/CURSES gate with redraw
outside the windowport check ✓; idlecheckpoint arm —
`config.h:693` confirms `/* #define IDLECHECKPOINT */`
commented out, so `#ifndef` compiles ✓; opt_initial gate
✓; terrainstatus fallthrough + wc2_supported guard ✓;
showscore group with `via_windowport()` ✓; fixinv group
✓; lit_corridor/dark_room vision_recalc(2) + full-recalc
+ color redraw ✓; glyph-reset group via OPT_GLYPH_RESET —
set holds exactly the 7 C cases (wizmgender, showrace,
use_inverse, hilite_pile, perm_invent, ascii_map,
tiled_map) ✓, and ascii_map/tiled_map still reach it
because the mirror-flag chain and the in-game chain are
separate `if`s (C runs both switches too) ✓; hitpointbar
(QT arm build-gated, documented) ✓; color (TOS arm
build-gated) ✓; customcolors/customsymbols/menucolors/
guicolor/mention_decor(STONE live import)/rest_on_space/
accessiblemsg ✓; toggled pline + get_val arms ✓. No
RNG calls in C, none in JS. No stub in any arm.

`option_help` split, `csym` `options.c:9461–9549`: intro
+ CONFIG_SLOT + boolean loop (addr/wiz/wc filters
`:9476–9492`) + compound loop + other-settings + epilog.
The split reuses extractor-baked lists; the D-entry names
the two divergences as own-row work (wizard-view arms need
generated wizonly lists; runtime wincap2 default lacks 9
extractor WC2_SUPPORTED bits so the wc/wc2 filter arms are
deliberately not applied). Disclosed split, not a silent
partial. OK for breadth phase.

`sym.mjs` (no symbol deleted or re-pointed from a clone —
wiring loop only fills nulls, so no clone→import output is
required; spot checks): `optfn_boolean js/options.js:7872
ASYNC`, `vision_recalc js/vision.js:1024 sync` (hoisted,
call-time use — no TDZ read; `imports.mjs --can` SAFE per
D-log, and the edge is ESM-static).

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits
(empty output). Rule #2: `imports.mjs --rulecheck` →
"Rule #2 clean" on the working tree.

## Hallucinations / overclaim

None. "Full C order" holds against the 259-line body read
above. The commit does NOT claim the sync-dispatch
limitation away — it is named in the D-entry and in the
wiring-loop comment. No dispatch-over-stub: the one new
dispatch target is a whole port.

## Density

One-C-file cluster (options.c + its optlist.h table),
3 functions, +214 lines — inside the §2b envelope
(≤10 functions, 200–800 lines). Per-function verdicts:
is_wc2_option whole, callers named → OK; optfn_boolean
whole, every arm live or build-gated → OK with one debt
(below); option_help split with own-row follow-ups → OK.
SHA verdict is the worst of them: debt, not risk.

## Verification

D-log: `verify.mjs --fn option_help,is_wc2_option,
optfn_boolean` → syntax · rule2 · 3× note hidden (nothing
blocked) + REACH-OK (smoke 24 each) · green 2/2 · strict
×2 · cohort 7/7 · full 44/44 · VERIFY: PASS. Re-measured
here in one call (`--base bff5e68ae~1 --reach-all`): all
three report 0 blocked at baseline and in the working
scoreboard with `fixed smoke spread (24 run): 24 PASS,
0 regressed → REACH-OK` (captured in-session). Coverage
rows, so the vacuous notes are honest. Zero REGRESSED. No
seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None queued. Debt recorded (review-debt, unqueued):

1. Sync-dispatch return gap (D-entry-named, code-commented):
   `optfn_boolean` is async (two C pline arms) but both
   dispatch sites (`:9420` do_init — return ignored, no
   effect; `:9598` parseoptions — `optresult` is a Promise,
   never `=== OPTN_OK`, so `opt_set_in_config[matchidx]`
   stays unmarked for config-set booleans, read at `:10143`
   by the options dump) consume it synchronously. Same as
   the null-optfn baseline for the mark, strictly closer to
   C for the flag writes; fix is making the dispatch await
   or splitting a sync core — a later iteration's work,
   not this SHA's wrong.

Verdict: **ACCEPT-WITH-DEBT**
