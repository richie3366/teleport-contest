# Review 968 — 878f1d22 — wiz_intrinsic malady arms + tail (D-1998)

Metadata: SHA `878f1d22`, D-1998, Open-row port (`wizcmds.c`
wiz_intrinsic, row cited 7/553; 9 blocked at HEAD baseline). js/
touches 1 file (`js/wizcmds.js`, +116/−~30). `c-js-map/turns.md`
updated. No stamp owed (corpus-queued row).

## Intent vs deliverable

Subject promises: per-prop switch for SICK/STONED/STUNNED/VOMITING/
WARN_OF_MON/GLIB + float/rescham/pool tail, fixing the recorded
`rn2(2)` RNG theft (SICK skipped its vomit-type roll) and five wrong
`Timeout for …` messages. Diff actually adds: six new arms with
`:line` citations, CONFUSION rerouted to default (C `#if 0`),
post-arm tail, and import extensions (`Warn_of_mon`, `rescham`,
`KILLED_BY`/`SICK_*`, new `rn2`/`float_vs_flight`/`pooleffects`/
`mons`/`PM_GRID_BUG`; `make_*` via in-body dynamic `./potion.js`
import, `make_confused` dropped). Promise == diff.

## Inventory

- Changed JS function: `wiz_intrinsic` (arms + tail only; menu/HALLUC/
  DEAF/BLINDED/SLIMED untouched).
- New helpers: none (all callees imported live).
- Deleted/re-pointed: `make_confused` dropped from the dynamic
  potion import (C's case is compiled out — correct deletion, not a
  loss). No local clone → import re-points, so no `sym.mjs`
  delete audit is required; resolutions below are informational.

## C ↔ JS fidelity

C locus: `wiz_intrinsic` `wizcmds.c:948–1096` (`csym.mjs` range;
switch read at `:1020–1096`). Arm-by-arm:

- SICK (`:1035–1038`): `typ = !rn2(2) ? SICK_VOMITABLE :
  SICK_NONVOMITABLE; make_sick(newtimeout, wizintrinsic, TRUE, typ)`.
  JS identical incl. the `rn2(2)` draw position (the recorded RNG
  fix). `make_sick` JS signature `(xtime, cause, talk, type)`
  matches C `(timeout, msg, talk, type)` (`potion.js:909` vs
  `potion.c:137`); ASYNC, awaited. ✓
- STONED (`:1044–1047`): C formats `buf` from `fmt="You are%s %s."`
  (`:953`) with `!Stoned ? "" : " still"` BEFORE `make_stoned`.
  JS reads `stonedNow` before the call and renders the same two
  strings. ✓ Order preserved.
- STUNNED (`:1049–1051`): direct `make_stunned(newtimeout, TRUE)`. ✓
- VOMITING (`:1053–1057`): C formats buf, `make_vomiting(newtimeout,
  FALSE)` (silent), `pline1(buf)`. JS same: pre-read `vomitingNow`,
  silent call, then `pline("You are[ still] vomiting.")`. ✓
- WARN_OF_MON (`:1059–1066`): C sets only
  `warntype.speciesidx = PM_GRID_BUG; species = &mons[…]` when
  `!Warn_of_mon`, then `goto def_feedback` (incr + Timeout pline).
  JS sets exactly those two fields (default object created only if
  the slot is missing — defensive, no C contradiction), then the same
  incr+pline. ✓
- GLIB (`:1067–1072`): C `make_glib((int) newtimeout)` + FALLTHROUGH
  with NO incr (`if (p != GLIB)`). JS `make_glib(newtimeout|0)` sync
  (correct: `sym.mjs` → sync) + Timeout pline, no incr. ✓
- Default incl. CONFUSION: C's `make_confused` case is `#if 0`'d
  (`:1023–1028`); JS CONFUSION now hits default incr+pline. ✓
- Tail (`:1080–1087`): `if LEVITATION||FLYING float_vs_flight; else
  if PROT_FROM_SHAPE_CHANGERS rescham; if WWALKING||LEVITATION||
  FLYING && uinwater pooleffects(FALSE)` — JS replicates the exact
  `if/else-if/if` shape with correct await on the two ASYNC callees
  (`rescham`, `pooleffects`) and sync `float_vs_flight`. ✓
- Callee closure: `rn2` (rng.js leaf), `float_vs_flight`/`pooleffects`
  (`--can`: ALREADY static edges, hoisted/async-correct), `mons`
  (monsters.js), `PM_GRID_BUG` (leaf generated consts), `Warn_of_mon`
  (display.js sync), `rescham` (mon.js async), `make_*` (dynamic
  potion.js — no new static edge). All LIVE; no STUB, no CLONE, one
  correct deletion. Arm ships.

## Hallucinations / overclaim

None. The `js-throw` proxy label on Archeologist-92015 is explicitly
disclaimed (direct replay: `error:null, kind=screen` at step 42, topline
`--More--` timing, RNG tied through 41 — a later owner, quoted with
numbers). "Second verify run reproduces the same 9 movers" — my
independent re-run below reproduces the same 9 with the same owners.

## Density

One C function, one JS module, ~116-line switch envelope with related
tail. Right-sized per §2b.

## Verification

Re-measured myself: `hidden-proxy verify wiz_intrinsic --base
878f1d22~1` → `0 PASS, 9 moved past, 0 unchanged, 0 worse →
PROGRESS`, with the same 9 sessions → same later owners/steps as the
D-log (Knight-92203 trapmove@85, Monk-92123 trapmove@39,
Barbarian-92008 regen_hp@33, Caveman-92070 trapmove@38,
Priest-91130 cmd_safety_prevention@20, Priest-92096 same@64,
Rogue-91111 sickness_dialogue@65, Samurai-92239
rnd_otyp_by_namedesc@92, Archeologist-92015 @42). Claim holds exactly.
Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/coordinate/
`fastforward`. Rule #2 clean.

## Actionable C-wrongs

None. Named omits (count-prefix digits, `unavailcmd`/`ecname`
wording, `make_blinded` talk variants, KILLED_BY_AN polish) live in
the map section, not Must-fix.

Verdict: **ACCEPT**
