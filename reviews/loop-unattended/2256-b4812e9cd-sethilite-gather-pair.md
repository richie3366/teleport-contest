# Review 2256 — b4812e9cd — sethilite gather pair + sethilite restart

Metadata: SHA
`b4812e9cdf6367502dc21f81ac9e59251cb5c287`
(D-3295, 2026-10-02). `js/getpos.js`
(+~30/−15: gather fn + sethilite
restart) and `js/mklev.js` (+13:
selection_force_newsyms). Two
functions new whole.

Intent vs deliverable: subject
promises getpos_getvalids_selection +
selection_force_newsyms ported and
getpos_sethilite restarted to the C
gather-old∪new flow. The diff ships
exactly that plus the
force_getvalid_newsyms clone deletion
and import rewiring. Delivers what it
promises.

Inventory:

- Module-local `function
  getpos_getvalids_selection(sel,
  validf)` (getpos.js:103): guard +
  sel.wid/sel.hei scans +
  selection_setpoint. C staticfn →
  module-local ✓.
- `export function
  selection_force_newsyms(sel)`
  (mklev.js:30179): sel-scoped rect,
  selection_getpoint +
  newsym_force. C extern → export ✓.
- `getpos_sethilite` restarted to C
  :44–63 order (::185–203): old
  capture + selection_new → default
  reset → gather OLD → install →
  gather NEW → frame store → single
  force-newsym → selection_free.
- Deleted: local
  `force_getvalid_newsyms` (COLNO×
  ROWNO direct-newsym clone, no C
  counterpart). Import delta:
  getpos.js drops newsym_force, adds
  selection_new/setpoint/
  force_newsyms/free from ./mklev.js;
  mklev.js adds newsym_force to the
  existing display.js import.

**C ↔ JS fidelity**:

`getpos_getvalids_selection` (C
getpos.c:101–115 per csym): `!sel
|| !validf` → `!sel || typeof
validf !== 'function'` (JS
null-vs-undefined idiom ✓); x from
1 to sel.wid, y from 0 to sel.hei;
`(*validf)(x, y)` →
selection_setpoint(x, y, sel, 1).
Branch-for-branch ✓, no RNG ✓.
Callers C :53 (old) + :56 (new) →
js/getpos.js:185 + :189, pre/post
install like C ✓.

`selection_force_newsyms` (C
selvar.c:801–810 per csym): same
rect, `selection_getpoint` guard →
newsym_force, no NULL guard per C
NONNULLARG1 (extern.h:2878) ✓.
Sole C caller getpos.c:62 →
js/getpos.js:201 inside the
:60–61 changed-guard ✓.

`getpos_sethilite` (C getpos.c:40–
64): all 12 steps in order —
old_getvalid, old frame color
(?? NO_COLOR for missing store),
selection_new, bgcolors default,
change-gated hilite reset, OLD
gather, hilitefunc/getvalid
install (non-function → null),
NEW gather, HI_ZAP/NO_COLOR frame
store, changed-guard force-newsym,
selection_free(sel, TRUE). The
gp_getvalidf-vs-old comparison
uses the normalized value; C
callers pass pointers or NULL so
the idiom is exact ✓.

Callee closure: selection_new
(mklev.js:30133 sync),
selection_setpoint (:30157),
selection_getpoint (:30145),
selection_free (:30210),
newsym_force (display.js:5259) —
all LIVE exports, zero clones,
zero stubs ✓.

`sym.mjs` (required: deleted
clone + re-pointed imports):

```text
force_getvalid_newsyms NOT FOUND
in js/** (no export, no local
function/const).
selection_force_newsyms
js/mklev.js:30179 sync
selection_new js/mklev.js:30133
sync
selection_free js/mklev.js:30210
sync
selection_setpoint
js/mklev.js:30157 sync
```

`imports.mjs --can getpos.js
mklev.js selection_force_newsyms`:
ALREADY — no new edge (mklev.js
newsym_force joins the existing
display.js import) ✓.

Hallucinations / overclaim: none.
"Emulated with a local clone" is
accurate (the old loop skipped
the selvar entirely); no "Match
C" claim rests on a stub —
every callee is imported live.

Density: 2 whole C functions of
one caller/callee closure +
the restart that wires them,
≤10 fns ✓. js delta is small
(~45 lines) but the closure is
complete — every callee live,
every C caller wired — so there
was no third function to take.
Each fn has its own `Ledger:`
entry and Verify sub-bullet ✓.

Verification: D-log Verify
pastes the `verify.mjs --fn
a,b` tail verbatim (both
vacuous-hidden notes disclosed
as "not a corpus PASS" +
smoke REACH-OK + green/strict/
cohort/full 44/44). Re-measured
(`hidden-proxy verify a,b
--base b4812e9cd~1
--reach-all`): `0 blocked` both
+ `smoke 24 PASS, 0 regressed →
REACH-OK` both. Exact match;
zero REGRESSED. Queue rows cited
no blocks, so the vacuous note
is honest, not evasive. Grep:
no FORCE/DIAG/seed/step gates
(newsym_force is lowercase C
name, not a gate). Rule #2
clean (iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
