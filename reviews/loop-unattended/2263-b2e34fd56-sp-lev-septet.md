# Review 2263 — b2e34fd56 — sp_lev Lua-adjacent septet

Metadata: SHA
`b2e34fd560e4d9817a07b34e7d5407a89e9624b9`
(D-3304, 2026-10-02).
`js/mklev.js` only (+10):
one module-local function.
4 by-design + 2 stale-complete
+ 1 port, all one C file.

Intent vs deliverable:
subject promises “l_register_des
head + 3 by-design +
2 stale-complete +
sel_set_wallify port” (the
4th by-design is the head
itself). The diff adds only
`sel_set_wallify`; the rest is
D-log + ledger bookings.
Delivers what it promises.

Inventory (per-function):

- `l_register_des`: no symbol
  (by-design booking).
- `sp_code_jmpaddr`: no symbol
  (by-design booking).
- `get_trapname_bytype`: no
  symbol (by-design booking).
- `cvt_to_relcoord`: no symbol
  (by-design booking).
- `lspo_non_diggable`:
  pre-existing export
  js/mklev.js:5173
  (stale-complete booking).
- `lspo_non_passwall`:
  pre-existing export
  js/mklev.js:5182
  (stale-complete booking).
- `function sel_set_wallify(x,
  y)` js/mklev.js:5192
  (new, module-local):
  `wallify_map(x, y, x, y)`.
- No import touched
  (same-file callee), no
  symbol deleted.

**C ↔ JS fidelity**
(per-function):

`l_register_des` (C
sp_lev.c:6434–6441):
lua_newtable + luaL_setfuncs
+ lua_setglobal — pure Lua
runtime calls, zero game
logic. Sole caller
nhlua.c:2347 (Lua-state init).
No `lua_State` exists in
scored ESM; `nhlua_init` and
`l_register` both NOT FOUND
in `js/`; des entries are
called directly as JS
exports. By-design with the
registration named in the
map is the only faithful
resolution ✓. No RNG in C ✓.

`sp_code_jmpaddr` (C
sp_lev.c:3020–3025): body
sits inside `#if 0` (:3020),
absent from the target C
build; only ref is the fwd
decl :74. By-design, no
symbol ✓.

`get_trapname_bytype` (C
sp_lev.c:4366–4376):
`trap_types[]` linear walk +
NULL fallthrough (11 lines,
branch order trivially
portable — but correctly
not ported: sole caller
nhlua.c:440 `nhl_gettrap`,
the Lua `nh.gettrap` API,
by-design). `trap_types`
NOT FOUND in `js/`; the
live `trapname`
(js/trap.js:1746) is trap.c's
different function/table, so
no stale-complete confusion
✓. By-design with whole-body
named omit ✓.

`cvt_to_relcoord` (C
sp_lev.c:4792–4802): subtract
coder-room lx/ly else
xstart/ystart. Sole caller
nhlsel.c:939
`l_selection_iterate`,
ledger by-design D-1966
(re-checked: still
by-design). JS selections
stay absolute per the
reviews 791/810/936 idiom;
no scored caller could call
a relative converter.
By-design ✓.

`lspo_non_diggable` (C
sp_lev.c:5936–5941):
`set_wallprop_in_selection(L,
W_NONDIGGABLE); return 0`.
JS :5173 calls the live
callee with the same flag;
C `return 0` is the
Lua-stack count, which
collapses in the
sel-explicit idiom (the
callee's sel==null arm is
the argc==0 whole-map
branch). Stale-complete:
whole body live ✓. C refs
are the fwd decl :148 only
(Lua des-dispatch); JS
invokes the export directly
✓. Callee LIVE
(js/mklev.js:5154) ✓.

`lspo_non_passwall` (C
sp_lev.c:5945–5950): mirror
of the above with
W_NONPASSWALL; JS :5182
likewise complete ✓.

`sel_set_wallify` (C
sp_lev.c:5954–5958,
staticfn): `wallify_map(x, y,
x, y)`; `arg UNUSED`. Dead
in C (refs: fwd decl :89 +
def only — confirmed).
JS :5192 is the whole body
module-local (C staticfn
idiom, D-3293 precedent),
same module as callee, no
new import; UNUSED arg
dropped per the
sel-callback idiom (cf.
sel_set_wall_property
:5135) ✓. Callee LIVE
(js/mklev.js:20528; D-log
cited :20518 — line drift
from later commits, not an
error) ✓. `sym.mjs` labels
it “LOCAL CLONE” — it is
the C-matched port itself,
verified here, not drift;
the boilerplate only bars a
second copy ✓. No RNG ✓.

Hallucinations / overclaim:
none. No “Match C” claim
over a stub: the one new
body's callee is live, and
the four by-designs each
name the body + the C
citation + the reason no
scored analogue exists.
The “dead in C” claim for
sel_set_wallify re-verified
against `--callers` output
✓.

Density: 7 functions, one C
file, ≤10 ✓. 9 insertions,
below ~80 — defense audited
and holds: all 5 previously
absent sp_lev rows + both
PARTIAL unknowns shipped
here, and every remaining
unknown (55) is measured-ok
(re-checked: zero non-ok
unknown rows). Seven
`Ledger:` entries (4
by-design + 3 ported —
ledger rows re-read, all
correct), one Verify line
covering all seven ✓. No
Must-fix bundled ✓.

Verification: D-log claims
hidden note ×7 + REACH-OK
×7 (smoke 24/24 each), green
2/2, strict ×2, cohort 7/7,
full 44/44. Re-measured in
one call (`verify
<all seven> --base
b2e34fd56~1 --reach-all`):
every function prints “0
session(s) blocked” + the
vacuous-note line + “fixed
smoke spread (24 run): 24
PASS, 0 regressed →
REACH-OK”. All 14 summary
lines match; queue cited 0
blocks, so vacuous is the
honest outcome, stated ✓.
Diff grep: no FORCE/DIAG/
getRngLog/seed/fastforward/
coords ✓. Rule #2: no
import added ✓.

**Actionable C-wrongs**:
none.

Verdict: **ACCEPT**
