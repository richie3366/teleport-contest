# Review 1297 — e39f3bf8 — apply.c use_royal_jelly clones retire (D-2331)

Metadata: SHA `e39f3bf8`, D-2331, Open queue row (cited 0 blocks). Method: `git show` full `js/` hunk (`js/apply.js` +38/−136: three clones deleted, helper swaps, import joins); C `use_royal_jelly apply.c:3615–3683` + C `unsplitobj mkobj.c:554–622` head + C `is_plural obj.h:421–426` (via `csym.mjs`); JS bodies read: `freeinv invent.js:7384`, `unsplitobj mkobj.js:451`, `otense/is_plural objnam.js:2217–2231`, `obfree shk.js:3445`, `getobj invent.js:8056`, both JS callers (`dorub :5206`, `doapply :2604`); `sym.mjs` on all seven canonicals (required: clone→import re-points — pasted below); added-lines banned-pattern grep (0 hits); `hidden-proxy verify use_royal_jelly --base e39f3bf8~1` re-run.

## Intent vs deliverable

Subject promises the D-1021 body re-homed onto canonicals (three `_jelly` clones + `otense_stone` + hand-rolled obfree deleted) with the map-named `update_inventory()` restored on the split-cancel path. Diff delivers exactly that, plus two import-list joins. Promise kept.

## Inventory

- Deleted: `getobj_jelly` (~75 lines), `freeinv_jelly`, `unsplitobj_jelly` (zero remnants grepped); hand-rolled `quan=0/where=OBJ_FREE` ×3 → `obfree(lump,null)`; `otense_stone` → canonical `otense` on both quiver plines (`otense_stone` retained, still used by `use_stone` via `Tobjnam_stone :2944/:2950`).
- Added: split-cancel `update_inventory()` (the named omit); static `otense` (objnam.js) + `addinv_nomerge` (u_init.js) joins; C-order comments.

Required sym paste (deleted clones → canonicals):

```text
freeinv          js/invent.js:7384   sync
unsplitobj       js/mkobj.js:451   sync
otense           js/objnam.js:2228   sync
obfree           js/shk.js:3445   sync
addinv_nomerge   js/u_init.js:1092   ASYNC — await required
update_inventory js/invent.js:4085   sync
getobj           js/invent.js:8056   ASYNC — await required
```

All asyncs awaited; all syncs bare. (`freeinv` still lists 3 clones elsewhere — none added here.)

## C ↔ JS fidelity

Body vs `:3616–3683`: split→freeinv→getobj(prompt/`jelly_ok`/GETOBJ_PROMPT) ✓; cancel: OBJ_FREE lump → canonical `unsplitobj` returns null exactly like C's `OBJ_FREE → return 0` (`:571–583`, quirk preserved: the split lump stays lost on both sides) + explicit `update_inventory()` ≡ C ✓, else `addinv_nomerge` ✓, `ECMD_CANCEL` ✓; smear/EGG-goto ✓; killer→queen, cursed `timed||corpsenm-changed` quiver/kill_egg, timeout + blessed-spe arms byte-unchanged from D-1021 ✓; all three useup arms `setnotworn + obfree` (not `useup()`, C comment honored) ✓. `otense` swap is behavior-preserving on every reachable input (eobj is always EGG-otyp; `otense_stone`'s quan test ≡ canonical `is_plural`, and JS `is_plural` ≡ C `obj.h:421–426` verbatim incl. the Eyes edge) and strictly more C-faithful. `*optr = 0` unobservable — verified both callers return/map the ECMD code without touching obj ✓. One display-only note (not actionable): canonical `freeinv` runs `freeinv_core` + `update_inventory()` where the clone spliced silently — redraw timing only, no pline/RNG, and the house convention every other caller already lives with. Callee closure: every helper LIVE; no stubs, no new clones, no new omits (`hatch_egg` stays its row).

## Hallucinations / overclaim

None. Deletion-via-script disclosed with method; "unreached by sessions" disclosed with the D-1021 basis; no-test-harness disclosed.

## Density

+38/−136 net-negative for one function family. Good.

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + import smoke + honest vacuous-hidden note. Re-measured:

```text
verify use_royal_jelly: baseline e39f3bf8~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
