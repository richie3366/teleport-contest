# Review 3052 — c085e5ef5 — doset's boolean map writes safe_dog and wc_eight_bit_input

- SHA: `c085e5ef5` (cliffs head: owner peffect_acid, a message-owner
  guess; row scen-options-Tourist-52451031 step 45)
- D-entry: D-4212; Ledger: doset partial (options.c `8758-8975`),
  g_putch partial (wintty.c `3740-3790`, js=display.js:symset_render_char)
- `js/` diff: options.js +2 −2, display.js +2 −1

## Intent vs deliverable

Promise: optlist.h stores the safe_pet boolean in flags.safe_dog
(`:633–634`), which is_safemon reads. JS doset's boolean address map
wrote `O`-menu toggles to a phantom flags.safe_pet. So with safe_pet
turned off in-game, travelling onto the adjacent tame dog still treated
it as safe and printed «Pardon me, little dog.» where C's domove_core run
check stops silently. The same map put eight_bit_tty in a phantom
iflags.eight_bit_tty instead of C's wc_eight_bit_input (flag.h:505). The
map and display.js's reader now use C's homes.

Diff: in DOSET_BOOL_ADDR, `safe_pet → flags.safe_dog` and
`eight_bit_tty → iflags.wc_eight_bit_input`. In symset_render_char, the
`game.iflags?.eight_bit_tty` read becomes `game.iflags?.wc_eight_bit_input`.
The promise matches the diff.

Owner/writer: peffect_acid was the message-owner guess. The D-log names
the real path by a temporary log: findtravelpath's BFS found-arm, then
domove_core `:2764–2777` gated by `!is_safemon(mtmp)`, which reads
flags.safe_dog, and the stale value came from step 11's `O` toggle. The
commit fixes the writer (the toggle's address), so this is a valid
cliff.

## Inventory

- DOSET_BOOL_ADDR rows — js/options.js:10759 (eight_bit_tty), :10794
  (safe_pet). C optlist.h `:300–301`, `:633–634`.
- symset_render_char — js/display.js:4039–4050 (C wintty.c g_putch
  `:3740–3790`, test at `:3750–3757`).
- Re-pointed fields (not symbols): `flags.safe_pet` → `flags.safe_dog`,
  `iflags.eight_bit_tty` → `iflags.wc_eight_bit_input`. No function
  deleted. sym.mjs on the touched functions and the consumer:

```text
is_safemon       js/uhitm.js:450   sync
symset_render_char js/display.js:4039   sync
```

Remaining phantom readers or writers after the commit:
`grep -anE "safe_pet|eight_bit_tty" js/*.js` finds only option-name
strings, the wc_name table row (options.js:1198), comments, and the two
corrected map rows. There is no `flags.safe_pet` or
`iflags.eight_bit_tty` field access left. Readers of the C homes:
`flags.safe_dog`: uhitm.js:453 is_safemon, polyself.js:2760.
`wc_eight_bit_input`: bones.js:110, cmd.js:1082, display.js:4044.

## C ↔ JS fidelity

```c
NHOPTB(safe_pet, Advanced, 0, opt_out, set_in_game, On, Yes, No, No, NoAlias, &flags.safe_dog, ...)   /* optlist.h:633–634 */
NHOPTB(eight_bit_tty, Advanced, 0, opt_in, set_in_game, Off, Yes, No, No, NoAlias, &iflags.wc_eight_bit_input, ...) /* :300–301 */
#define eight_bit_tty wc_eight_bit_input                                                                   /* flag.h:505 */
#define _is_safemon(mon) (flags.safe_dog && (mon)->mpeaceful && canspotmon(mon) && !Confusion && !Hallucination && !Stunned) /* display.h:159–161 */
```

- In C, the `O` toggle and the rc parse both write through
  `allopt[].addr`, so there is one home per option. JS has two tables:
  the allopt rows (options.js:12433, :12629) already had C's addresses,
  and DOSET_BOOL_ADDR did not. After the fix both agree. A scripted
  cross-check over options.js (DOSET_BOOL_ADDR vs every BoolOpt allopt
  `addr`) finds 0 mismatches in 95 map rows. The 2 rows with
  `addr: null` in allopt (debug_hunger, debug_overwrite_stairs) carry
  C's address in DOSET_BOOL_ADDR and are named in the allopt comments.
  The D-log's "94 boolean options / other 92" is off by one against the
  95-row map. That is a counting nit and does not change the fix.
- g_putch `:3750–3757`: `SYMHANDLING(H_UTF8)` → putchar, else
  `SYMHANDLING(H_IBM) || (iflags.eight_bit_tty && (!SYMHANDLING(H_DEC)
  || (in_ch & 0x7f) < 0x60))`. The JS predicate keeps the same shape with
  the corrected field. The output half (graph_on/off, xputc) is the
  terminal model's, and that is honestly recorded in the g_putch
  `partial` omit.
- Behaviour: safe_pet defaults On (`initval: true`), and is_safemon
  treats an absent `safe_dog` as true, so games that never toggle it are
  unchanged. Only an `O` toggle now reaches gameplay, as in C.
- RNG: none.

Seen outside the diff (lead, not this SHA): is_safemon's other three
predicates read the `game.u.Confusion / Hallucination / Stunned` mirrors
(uhitm.js:456). These are written ad hoc (timeout.js:357/1118/1128/1141,
read.js:367/373, do_name.js:1016/1021), not the youprop macros, and
sym.mjs reports 6 local Confusion and 6 local Stunned clones with no
export. This is the known mirror-debt family (reviews 2951/2964). No
corpus row is blocked on it.

## Hallucinations / overclaim

None material. "Each option now has a single home for rc, `O` and
gameplay" holds for these two options (cross-check above). The row count
in "Named omissions" is the off-by-one nit above.

## Density

Two address rows and one reader, closing the DOSET_BOOL_ADDR/allopt
mismatch family. The D-log measured the whole table, not only the
failing row. Right-sized.

## Verification

```text
node scripts/hidden-proxy.mjs verify peffect_acid,doset --base c085e5ef5~1 --no-reach
  scen-options-Tourist-52451031: PASS
verify peffect_acid: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify doset: no corpus session is blocked on it at c085e5ef5~1 (vacuous; owner is peffect_acid)
Rule #2: imports.mjs --rulecheck clean (HEAD, review 3047)
```

The diff contains no FORCE/DIAG/getRngLog/seed/fastforward reads or
coordinates. The D-log shows the frozen runner PASS (RNG 2896/2896,
Screen 131/131), reach peffect_acid 9/9, doset REACH-OK, full 44/44, and
`sweep moveloop_core` 675 with 0 regressed.

## Actionable C-wrongs

None in this SHA. (is_safemon's Confusion/Hallucination/Stunned mirror
reads are pre-existing debt outside the diff, recorded above as a lead.)

Verdict: **ACCEPT**
