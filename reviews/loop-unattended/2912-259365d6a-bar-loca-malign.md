# Review 2912 — 259365d6a — Bar-loca placeMon set_malign + class female=0

- SHA: `259365d6a` (cliffs-head peace_minded writer:
  des-monster override arm)
- D-entry: D-4074; Ledger: sp_lev.c
  (`create_monster` family)
- `js/` diff: `js/mklev.js` +6/−3 (set_malign in
  the override arm + `else female = 0` + doc line);
  focused test extended

## Intent vs deliverable

Promise: placeMon's peaceful-override arm now
re-runs `set_malign` per C :2128–2129, and class
specs force `female = 0` per C :3355–3356; the des
ogre no longer carries a peaceful-born malign −9
into its hostile override; Barbarian-51750091
PASS. The diff is exactly those two arms plus the
doc edit. Promise = diff.

## Inventory

- `placeMon` inside `load_bar_loca`
  (mklev.js:13961–13974): override arm braced +
  `set_malign(mtmp)`; `else mtmp.female = 0`. C:
  sp_lev.c create_monster :1924–2187, arms at
  :2125–2129; gender default :3299, resolution
  :3350–3356.
- `set_malign` already imported (mklev.js:120) —
  zero new edge. Doc omission line removed.

No deleted symbols, no re-pointed clones — step-3
paste not triggered. Callee LIVE
(makemon.c :2320–2366, draw-free pure recompute —
no keystream shift possible).

## C ↔ JS fidelity

Confirmed against pinned C:

- C :2126–2129 `if (m->peaceful > BOOL_RANDOM) {
  mtmp->mpeaceful = ...; set_malign(mtmp); }` —
  JS now identical, same comment shape as the six
  D-3974 sites (:6690/:6890/:6909/:9172/:15751/
  :20536, all `// C sp_lev.c:2128-2129`).
- Gender: Bar-loca.lua has no `female` key (grep
  0 hits; ogres `peaceful=0` :80–88), so
  tmpmons.female defaults BOOL_RANDOM (:3299),
  resolves via find_montype mgend for id specs
  (:3350–3354), and hits the safety net
  `BOOL_RANDOM → 0` for class specs (:3355–3356).
  JS: `if (spec.id) mtmp.female = female`
  (find_montype_gender, pre-existing) `else = 0`
  — exact. Both branches assign unconditionally
  post-makemon like C :2125.
- Mechanism complete: peaceful-born ogre
  (malign −9) + override without re-run →
  adjalign(−9) at the kill, record 10→1 vs C's
  10. No RNG drawn by either new statement, so
  the fix is value-only — consistent with the
  RNG-matched-until-divergence probe.

## Hallucinations / overclaim

None. create_monster vacuity (0 blocked) stated
as writer-note. Omissions (humidity get_location,
mk_roamer path) named with their standing loci.

## Density

Cliffs-head writer (peace_minded), single blocked
session → PASS. One `Ledger:` entry. Full 44/44
in-commit (mklev.js shared). No unreached work.

## Verification

Re-measure (`--base 259365d6a~1 --no-reach`):

```text
verify peace_minded: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Barbarian-51750091: PASS
verify create_monster: no corpus session is blocked (vacuous, disclosed)
```

Exact match. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
