# Review 2236 — 9cdc961f3 — hmon_hitmon silvermsg gate

Metadata: SHA `9cdc961f36cb8c2bba6e2b5b23bfd29419ec4eae` (D-3275,
2026-10-02). `js/uhitm.js` only (+32/−25, mostly doc).
Single function `hmon_hitmon`, completing arm :1876–1877 (C
uhitm.c:1754–1935; all other arms shipped by prior D rows).

Intent vs deliverable: subject promises the ":1876–1877
weapon silvermsg gate". The diff plumbs silvermsg/silverobj
from hmdHit, replaces the rings-only gate with C's `if
(silvermsg)`, passes the full field set, and retires three
doc notes. Delivers what it promises.

Inventory:

- `hmon_hitmon` (`js/uhitm.js:1987`): +`silvermsg`/`silverobj`
  locals (C :1771–1772), +plumb from hmdHit, gate
  `barehand_silver_rings > 0` → `silvermsg` with
  `{…, silvermsg, silverobj, …}` passed to the live
  `hmon_hitmon_msg_silver`.
- Doc-only: melee :1127–1128, misc :1262–1264, msg_silver
  :1636–1638 notes retired/retargeted.
- No symbols deleted or re-pointed (locals added; callee
  pre-existing live — body re-read below). No import
  changes. Same file.

**C ↔ JS fidelity — `hmon_hitmon` :1876–1877 gate**:
C gate `if (hmd.silvermsg) hmon_hitmon_msg_silver(&hmd,
mon, obj)` ✓ — JS now identical. Setters verified at all
four C sites (:881 barehands silvermsg-only; :897 ranged,
:1036 melee, :1378 misc both flags) with matching JS
writers (:1594 barehands, :1792 ranged, :1214 melee,
:1482 misc) all targeting the same hmd object that
hmon_hitmon_do_hit receives as hmdHit (:2030; melee call
verified `hmon_hitmon_weapon_melee(mon, obj, hmd)`) ✓ —
the plumb reads live do_hit-set flags, complete chain.
Barehand unchanged: C :878–881 sets silvermsg ⟺ rings>0
(FALSE init, single setter) and JS :1591–1594 mirrors it
✓ — the old fabricated `{true, false}` and the new read
agree exactly on the barehand path. C's `obj` arg is
declared UNUSED (verified in signature) and the JS callee
reads only hmd fields — all passed (mdat, rings,
silverobj, saved_oname) ✓. Previously the weapon sear
line never printed; now melee/ranged/misc print C's line
✓. Sole C caller uhitm.c:828 (inside hmon) → pre-existing
JS wiring, untouched ✓.

Hallucinations / overclaim: none. "Whole C body live" is
compositional (this gate retires the last ledger omit;
prior arms ACCEPTed in 2214/2217/2223) and the pre-existing
local notes are honestly kept as notes, not claimed live.

Density: one completing arm making the function whole —
not an arm sold as a function. Cluster-of-1-by-exhaustion
documented (0 coverage rows, no other uhitm.c row,
callees live). `Ledger: hmon_hitmon ported` + Verify line.

Verification: D-log Verify shows PASS + vacuous note +
smoke REACH-OK + green/strict/cohort. Re-measured
(`hidden-proxy.mjs verify hmon_hitmon --base 9cdc961f3~1
--reach-all`): vacuous (0 blocked — missing-arm row cited
no N, note honest) + smoke 24/24 PASS → REACH-OK. Zero
regressed. Banned-pattern grep: clean. Rule #2 clean (2229).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
