# Review 2257 — b23f261b5 — cmd.c trio: levltyp table+name, rushwest, reverse

Metadata: SHA
`b23f261b57f7dd0a8a11d3838871961fdf9606e1`
(D-3296, 2026-10-02). `js/cmd.js`
only (+58). Three functions new
whole, one C file.

Intent vs deliverable: subject
promises levltyp_to_name + table,
do_rush_west, cmdq_reverse. The
diff ships all three plus the
FUNCT_TXT row and the MAX_TYPE
import widening. Delivers what it
promises.

Inventory (per-function):

- `export const levltyp` (:613):
  39 strings, C :1073–1085 order.
- `export function
  levltyp_to_name(typ)` (:634):
  range guard → table hit, else
  null.
- `function do_rush_west()`
  (:605, module-local):
  set_move_cmd(DIR_W, 3) +
  ECMD_TIME + FUNCT_TXT row
  (:2024).
- `export function
  cmdq_reverse(head)` (:420):
  iterative prev/curr/next
  reversal.
- No symbol deleted or
  re-pointed; MAX_TYPE joins the
  existing const.js import (no
  new edge).

**C ↔ JS fidelity**:

`levltyp_to_name` (C cmd.c:1088–
1094 per csym): guard `typ >= 0
&& typ < MAX_TYPE` short-circuit
kept, hit returns levltyp[typ],
else NULL → null ✓. Table
verified entry-by-entry against
C cmd.c:1072–1086: 37 rm.h-order
names + [37]
'unreachable/undiggable' +
[38] '' pad, comments kept ✓.
MAX_TYPE 37 = rm.h:94 =
const.js:83 ✓. No RNG ✓.
Callers: mon.c:226 confirmed
inside `#if 0` (:223–235, dead)
and nhlua.c:551 inside the lua
map-dump bridge — both unwired
and named ✓.

`do_rush_west` (C cmd.c:1460–
1465): one-liner identical to C
✓. Zero direct C callers
(csym); table sites confirmed:
ext_func_tab "rushwest" :2026
with the :2025 m-prefix comment
✓ and move_funcs MV_RUSH column
:2071 ✓. JS wiring: generated
EXTCMDLIST txt row (pre-existing)
+ FUNCT_TXT fn→txt row (:2024)
+ MOVE_FUNC_TXT rush column
(['movewest','runwest',
'rushwest'] :1846, bound :2350)
✓. Module-local matches the
do_move_* sibling idiom (all
module-local one-liners); C has
no cross-file caller so no
export is owed. `sym.mjs`
prints its generic "LOCAL
CLONE" tag — verified it means
"local, no export exists", not
a clone of a shipped export.

`cmdq_reverse` (C cmd.c:372–
384): `next` capture → relink →
advance → return prev, exact ✓.
Sole C caller cmdq_copy :401;
JS cmdq_copy (:407) slices
order-preserving arrays and its
doc comment states the reversal
is designed out — unwired and
named ✓.

`sym.mjs`: levltyp_to_name
js/cmd.js:634 sync; do_rush_west
local js/cmd.js:605 (no export
to import); cmdq_reverse
js/cmd.js:420 sync. No clones,
no stubs ✓.

Hallucinations / overclaim:
none. Every unwired caller is
named with its C reason
(#if-0, lua-by-design,
designed-out); nothing is sold
as wired that is not.

Density: 3 whole C functions,
one C file, ≤10 fns ✓. Own
`Ledger:` entries (all three
ported) and own Verify
sub-bullets ✓. Small js delta
but the D-log states cmd.c
holds no more Open rows.

Verification: D-log Verify
pastes the 3-fn tail verbatim
(all three vacuous-hidden notes
disclosed + 3× smoke REACH-OK +
green/strict/cohort). Full tail
not re-checked here, but the
re-measure (`hidden-proxy
verify a,b,c --base
b23f261b5~1 --reach-all`): `0
blocked` ×3 + `smoke 24 PASS,
0 regressed → REACH-OK` ×3.
Exact match; zero REGRESSED.
Queue rows cited no blocks, so
vacuous is honest. Banned grep:
clean. Rule #2 clean
(iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
