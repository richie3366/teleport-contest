# Review 1154 — 60a971cb — dothrow.c hurtle_step monster-bump arm (D-2188)

Metadata: SHA `60a971cb`, js/ +24/−4 in `dothrow.js`
only (bump arm + 6 import lines). D-log D-2188. Subject
promises: `x_monnam` ARTICLE_A ("a little dog") — 1
session moved past (110→112, new owner `make_stunned`).

Intent vs deliverable: promise matches diff. Actually
adds: the full C `:855–905` monster-bump arm in C
order; no helper functions, no deletions. Import-only
growth on pre-existing edges (`--can`: mondata.js and
worn.js edges already exist; display/do_name/mon/trap/
const extensions are same-edge).

Inventory: +0/−0 functions. No clone→import re-point
(the old `mon_nam` call stays imported for other arms).

**C ↔ JS fidelity**: confirm against C
`dothrow.c:772–972`, arm `:855–905` read at HEAD —
branch-for-branch:

- `glyph_at(x,y)` read before unhide; `mundetected=0`
  (with the `#if 0` exceptions still excluded, cited
  in-code); `x_monnam(mon, ARTICLE_A, NULL,
  (has_mgivenname ? SUPPRESS_SADDLE : 0)|AUGMENT_IT,
  FALSE)` verbatim. ✓
- Find-by-bumping gate: C `!glyph_is_monster(glyph) &&
  !glyph_is_invisible(glyph)`. JS uses
  `glyph_is_invisible_id` — the correct analogue: JS
  `glyph_is_invisible(loc)` takes a location object
  (`display.js:1283`), while `_id` compares a raw
  glyph to `GLYPH_INVISIBLE` (`:789–791`), exactly
  what C's `glyph_is_invisible(int glyph)` does. ✓
- `wakeup(mon,FALSE)`; `!canspotmon → map_invisible`;
  `setmangry(mon,FALSE)` (awaited async, `mon.js:1122`);
  hero-unarmored `touch_petrifies(mon.data)` →
  `instapetrify("bumping into "+an(pmname(NEUTRAL)))`
  (C writes `svk.killer.name` then passes it — same
  string, JS signature takes it as arg); hero-form
  `touch_petrifies` + `!which_armor(mon,
  W_ARMU|W_ARM|W_ARMC)` → `minstapetrify(mon,TRUE)`;
  `wake_nearto(x,y,10)`; `return FALSE`. ✓
- Callee closure all LIVE: `sym.mjs` →
  glyph_at/glyph_is_monster/glyph_is_invisible_id/
  map_invisible sync; x_monnam sync; noit_mhim sync;
  which_armor = worn.js:398 export (sit/trap clones
  pre-exist, none added); has_mgivenname = const.js:3159
  sync; pmname/NEUTRAL live; touch_petrifies pre-import
  (`monsters.js:449`). No STUB in the arm. ✓
- `You("bump into %s.")` → `pline("You bump into …")`
  is the house You-form, no semantic delta. ✓

RNG: none in this arm either side (pure
message/aggro/petrify dispatch; petrify arms draw
nothing before `wake_nearto`).

Hallucinations / overclaim: none. Subject claims only
moved-past with the next owner named, and the D-log's
"spot replays byte-match at 110/111, residual
message-only at 112" is modest and checkable.

Density: +24 for one arm of one function on an Open
row — right-sized (§2b: one C locus family).

Verification: D-log cites `verify.mjs --fn hurtle_step`
→ PROGRESS (110→112) + green + cohort. Re-measured
independently: `hidden-proxy.mjs verify hurtle_step
--base 60a971cb~1` → baseline 1 blocked,
`0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Archeologist-92226 → make_stunned@112).
Exact match. `rulecheck` clean (re-ran). No
DIAG/FORCE/seed/coordinate gates in added lines.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
