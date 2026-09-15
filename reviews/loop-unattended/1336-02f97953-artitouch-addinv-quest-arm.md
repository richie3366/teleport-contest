# Review 1336 — 02f97953 — artitouch + addinv_core1 quest arm (D-2370)

Metadata: SHA `02f97953`, 2 js files (`js/quest.js` +21, `js/u_init.js`
+21/−sync). No new modules. D-log: D-2370, map-named row, 0 blocked.
Hand probe (`/tmp/artitouch-probe.mjs`, kept): module graph loads with
the new edge (no TDZ), set-flag no-op path, `is_quest_artifact` gating
(7→true, 3→false, zero-role→false), `addinv` still async — 5/5.

## Intent vs deliverable

Subject promises the latent C-wrong in otherwise-live `addinv_core1`:
the `oartifact` arm never set `u.uhave.questart` / observed / paged /
exercised for the quest artifact (no `artitouch` symbol existed).
Diff adds exported async `artitouch` (C home quest.c) and the C
`:984–990` sub-arm before `set_artifact_intrinsic`, making
`addinv_core1`/`addinv` async-awaited. Matches the promise.

## Inventory

- `artitouch(obj)` — new exported async `js/quest.js` (C `quest.c`
  non-static; export correct). No clones, no stubs.

## C ↔ JS fidelity

`artitouch` vs C `quest.c:125–136` (body re-read above): once-only
`!touched_artifact` gate on `game.quest_status` (= Qstat home) →
`observe_object` (blind-pickup comment carried) → flag set BEFORE the
pager → `qt_pager('gotit')` → WIS exercise. Order exact. Confirm.

`addinv_core1` sub-arm vs C `invent.c:984–990` (body re-read):
`is_quest_artifact` gate → `uhave.questart = 1` → `artitouch(obj)` →
falls into `set_artifact_intrinsic(obj, true, W_ART)` — position inside
the `oartifact` arm exact. The already-have `impossible()` arm stays
named (async-pline convention, same as the four sibling uhave arms) —
disclosed. Confirm.

Async safety: at this SHA the sole `addinv_core1` caller is `addinv`
(same file, already async), now awaiting; `quest.js` imports nothing
from `u_init.js` (no cycle); `--can u_init.js → quest.js artitouch`
→ ALREADY, no new edge. `sym.mjs is_quest_artifact` → `quest.js:275
sync` (the 4 local clones flagged are pre-existing drift in
detect/dogmove/dothrow/mon, untouched here). `observe_object` joins
the existing `./invent.js` import; `qt_pager`/`exercise`/`A_WIS` ride
pre-existing edges. No stub in a live arm. Confirm.

## Hallucinations / overclaim

None. The fresh-touch display path (observe→pager→WIS) rides green/
cohort rather than a unit probe — disclosed with reason (needs the
display/menu harness).

## Density

~42 lines across 2 files, one C arm + its callee — right-sized.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify artitouch --base 02f97953~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn artitouch` → VERIFY:
  PASS (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
