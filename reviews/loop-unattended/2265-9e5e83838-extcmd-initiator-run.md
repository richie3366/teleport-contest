# Review 2265 — 9e5e83838 — cmd extcmd_initiator + run family + freeall

Metadata: SHA
`9e5e83838af684792e993cdff5fad3725bdfd8a5`
(D-3307, 2026-10-02).
`js/cmd.js` (+34) and
`js/getline.js` (+22/−6):
1 new export + 8 new
module-locals + 8 FUNCT_TXT
rows + prompt/pline rewire.
10 functions = the ceiling,
one C file.

Intent vs deliverable:
subject promises the head
export + sole-caller wiring,
the 8 do_run_* locals +
identity rows, and
cmdbind_freeall by-design.
The diff ships all three,
plus the `extcmd_initiator`
import into getline.js.
Delivers what it promises.

Inventory (per-function):

- `export function
  extcmd_initiator()`
  (js/cmd.js:971): `return
  game.Cmd?.extcmd_char ??
  0`.
- 8× `function do_run_<dir>()`
  (js/cmd.js:611–618):
  `set_move_cmd(DIR_*, 1);
  return ECMD_TIME`.
- 8× FUNCT_TXT rows
  (js/cmd.js:2051–2058):
  fn → 'run…' identity.
- get_ext_cmd rewire
  (js/getline.js:1583–1642):
  initiatorCode/initiator,
  prompt paint + both plines
  via visctrl.
- `cmdbind_freeall`: no
  symbol (by-design booking).
- No symbol deleted; no
  clone added (the 8 locals
  ARE the ports).

**C ↔ JS fidelity**
(per-function):

`extcmd_initiator` (C
cmd.c:456–460): `return
gc.Cmd.extcmd_char;` — one
field read. JS identical;
`?? 0` ≡ the
zero-initialized C field
pre-reset_commands ✓.
Field writer verified: JS
reset_commands sets
`cmd.extcmd_char =
cmd_from_func('#') & 0xff`
(:2392), so unrebound = 35
= '#' ✓. Sole C caller
getline.c:310 confirmed
(`extcmd_char[0] =
extcmd_initiator()`);
JS wires it at get_ext_cmd
:1584 (`& 0xff` ≡ C char
promotion) ✓. Prompt paint
`${initiator} ${buf}` ≡ C
`hooked_tty_getlin(extcmd_char,
…)`; plines use
`visctrl(initiatorCode)` ≡ C
:320–321 `visctrl(extcmd_char[0])`
✓. `visctrl` was already
imported (getline.js:25 —
no new edge, no
ReferenceError) ✓. No RNG ✓.

`do_run_*` ×8 (C cmd.c:1517–
1571): each `set_move_cmd(DIR_*,
1); return ECMD_TIME`. All
8 JS one-liners match
direction, multi=1 (run,
vs rush 3 / move 0), and
return ✓. Callee
`set_move_cmd` LIVE same
module (:577) ✓. No RNG ✓.
Dispatch (zero *call*
refs — all C uses are
function pointers, which is
why `--callers` prints 0):
extcmdlist ef_txt rows
:2042–2056 re-read — all 8
strings ('runwest' …)
verbatim in FUNCT_TXT, same
order ✓; move_funcs MV_RUN
column :2071–2078 ≡ the
pre-existing JS txt columns
(MOVE_FUNC_TXT/MOVE_RUN_ECNAMES)
✓; generated EXTCMDLIST
already carries the 8 data
rows (key 0, flags 1152) ✓;
getpos.c:184–187
cmd_from_func(do_run_*)
 ≡ pre-existing
vk('run…') at
js/getpos.js:1156 (verified
present) ✓. The new locals
mirror the do_move_* /
do_rush_west idiom exactly
(module-local + FUNCT_TXT
row) ✓. `sym.mjs` “LOCAL
CLONE” boilerplate on all 8
refers to the ports
themselves, verified here —
not drift ✓.

`cmdbind_freeall` (C
cmd.c:2179–2191): pure
free() walk over the
cmdbinds list incl. params.
Sole caller save.c:1134,
inside `freedynamicdata`
(:1077 — confirmed), which
is ledger by-design
(save-freeing, re-checked)
and NOT FOUND in `js/`.
JS binds live in a GC'd
Map — nothing to free.
By-design, no symbol ✓.

Hallucinations / overclaim:
none. The D-log caller
table is more complete
than `--callers` (it names
the pointer uses at
extcmdlist/move_funcs/
getpos that `--callers`
misses) — evidence of
direct C reading, not
tool-trusting. No “Match C”
over stubs: both ported
groups have live callees.

Density: 10 functions, one
C file, exactly the ceiling
✓. 49 insertions below ~80
— defended and accepted:
ten whole 1–2-line bodies
cannot be longer when
faithful, and the cluster
cannot grow past the
ceiling; the D-log names
the immediate next step
(7 do_rush_* siblings).
Ten `Ledger:` entries, one
Verify line covering all
ten ✓. No Must-fix bundled
✓.

Verification: D-log claims
hidden note ×10 + REACH-OK
×10 (smoke 24/24 each),
green 2/2, strict ×2,
cohort 7/7, full skipped
per gate + forced full
sessions 44/44. Re-measured
in one call: all ten print
“0 blocked” + vacuous note
+ “fixed smoke spread (24
run): 24 PASS, 0 regressed
→ REACH-OK” — all 30 lines
match ✓. Queue cited 0
blocks, so vacuous is
honest, stated ✓. Diff
grep: no FORCE/DIAG/
getRngLog/seed/fastforward/
coords ✓. Rule #2: ESM
imports only (getline→cmd
edge pre-existing) ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
