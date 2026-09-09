# Review 1177 — 27d71d60 — passive_obj AD_FIRE burn (D-2211)

Metadata: SHA `27d71d60`, `js/uhitm.js` only (+8/−2), D-2211.
Queue row `use_misc` (scen-wish-Archeologist-92004 step 145,
same session D-2210 just moved).

Intent vs deliverable: subject promises the deferred AD_FIRE
burn arm (`erode_obj` ERODE_BURN, «Your bullwhip smoulders!»).
Diff actually wires exactly that one arm via dynamic
`./trap.js` import. Promise == diff.

Inventory: no new functions; one arm awakened inside
`passive_obj`. Deferred arms (AD_ACID/RUST/ENCH) stay named
in-map (`turns.md:3433`).

**C ↔ JS fidelity**: exact confirm vs `uhitm.c:6126–6195`
(arm ≈ `:6156–6162`). Gate order `!rn2(6) && !mon->mcan
&& mon->data != &mons[PM_STEAM_VORTEX]` preserved
verbatim, incl. the steam-vortex carve-out; call
`erode_obj(obj, NULL, ERODE_BURN, EF_NONE)` ≡
`erode_obj(weapon, null, ERODE_BURN, EF_NONE)` — `weapon`
is the null-resolved local matching C's preamble
(`:6135–6143` uwep/uswapwep/uarmg, ported identically
above the switch), so this is C's resolved `obj`, not a
substitution. RNG call-for-call (single `rn2(6)` first).
Callee closure: `erode_obj` LIVE async (`trap.js:3847`,
`sym.mjs` "ASYNC — await required") and awaited; dynamic
import matches the file's AD_CORR convention (same-function
closure, no new static edge). Two observations, neither
queued: sibling AD_CORR passes raw `obj` where AD_FIRE
passes `weapon` (equivalent in practice — C notes callers
never pass Null anymore — but the file should pick one);
C's `if (carried(obj)) update_inventory()` tail is still
unported (`update_inventory` occurs nowhere in
`js/uhitm.js`), a pre-existing display-flag gap shared
with the already-ACCEPTED AD_CORR arm, not introduced
here.

Hallucinations / overclaim: none — and credit where due:
the D-log explicitly names the queue owner `use_misc
(muse.c:2552)` a "literal tie-break" and the printer
`passive→passive_obj→erode_obj`, refusing a false body
claim. Banned grep clean.

Density: 8 js insertions for a 7-line C arm — below the
~40 guideline but C is exactly that small; corpus row +
map + verify in one handoff. Right-sized.

Verification: D-log Verify bullet shows 1 session PASS.
Re-measured: `hidden-proxy.mjs verify use_misc
--base 27d71d60~1` → "1 PASS, 0 moved past, 0 unchanged,
0 worse → PROGRESS" (Archeologist-92004 fully PASS). Not
vacuous, nothing worse.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
