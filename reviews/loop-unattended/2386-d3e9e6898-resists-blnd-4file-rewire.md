# Review 2386 — d3e9e6898 — D-3447 4-file resists_blnd subset deletion

Metadata: SHA `d3e9e6898`, D-3447, Open head ×4. js/ +7/−54 (5 files)
+ `scripts/resists-blnd-rewire.test.mjs` (new, 65 lines).

## Intent vs deliverable

Subject promises: mhitu/muse `resists_blnd_you` subsets + detect/trap
`resists_blnd` clones (Blind/Unaware-only gates) deleted; all 6 users
switched to live whole `resists_blnd(game.youmonst)`; detect/trap
`|| {_youmonst:true}` fallbacks dropped. The diff delivers exactly
that — four stubs, six switched call sites, one new mondata import in
detect.js, doc updates. No scope drift.

## Inventory

| Site | C locus | Switch |
|---|---|---|
| mhitu.js gazemu AD_BLND + explmu not_affected | mhitu.c:1794, :1624 | → live export |
| muse.js find_offensive + use_offensive CAMERA | muse.c:1568, :1947 | → live export |
| detect.js use_crystal_ball case 3 | detect.c:1230 | → live export, fallback dropped |
| trap.js domagictrap flash | trap.c:4328 | → live export, fallback dropped |

## C ↔ JS fidelity

All six C sites pass `&gy.youmonst` (verified by direct read:
mhitu.c:1624 `not_affected = resists_blnd(&gy.youmonst)`, :1794 gaze
`canseemon && !resists_blnd && mdistu`, muse.c:1568
`(!Blind && !resists_blnd) \|\| hates_light`, :1947 use arm,
detect.c:1230 case 3, trap.c:4328 flash). The live export
(js/mondata.js:454, audited whole in review 2385 against C
mondata.c:247–272) is the whole C function, so each switch is exact by
construction; surrounding predicates are untouched (muse `!Blind()`
outer gate, gaze `canseemon` + BOLT_LIM, throne/magic-trap message
order all preserved).

Delta audit (old → live): mhitu's subset added EXPL/GAZE but lacked
Sunsword + Blnd_resist; muse's lacked EXPL/GAZE + Sunsword; detect's
ignored its arg; trap's mon arm was partial. All deltas are C-ward.
The old mhitu/muse locals used a drifted `Unaware` (`usleep ||
u.Unaware` field read); the live export uses eat.js `Unaware()`,
which matches C youprop.h:399 (`multi < 0 && (unconscious() ||
is_fainted())`) exactly — the switch also fixes that drift.

Dropped fallbacks: `resists_blnd(game.youmonst || {_youmonst:true})` →
`resists_blnd(game.youmonst)`. If `game.youmonst` were undefined, the
arg is `undefined === undefined` → isYou arm → hero gates, i.e. the
old clones' behavior; and the downstream path is throw-free
(`dmgtype_fromattack` uses `ptr?.mattk`, `resists_blnd_by_arti` hero
arm never derefs `mon`, monster arm uses `mon?.minvent`). Matches C
exactly, no latent throw. Bare-arg form is correct.

sym.mjs (required paste — current tree, D-3449 already removed zap's):

```text
resists_blnd_you NOT FOUND in js/** (no export, no local function/const).
```

At this SHA zap.js:4607 kept its subset as a disclosed queued refill
row (shipped by D-3449); no other local `resists_blnd(`/`
resists_blnd_you(` definitions remain. `imports.mjs --can detect.js
mondata.js resists_blnd` → ALREADY. No new edge, no TDZ risk. Diff
grep: no FORCE/DIAG/RNG/seed/coordinate reads. The rewire test
(`node --test`) passes 3/3 on the current tree.

## Hallucinations / overclaim

None. "Audited whole D-3445" for the live export was independently
re-verified in review 2385. The zap.js carve-out is honestly disclosed
as a queued row, not claimed shipped.

## Density

≤10-function SHA, whole Method per row (4 switches, 6 sites, each C
call site read). One Ledger line (`resists_blnd audited`, unchanged
status) + Verify line shared across the four rows (single C function
— acceptable: one Verify bullet for one C function). No Left-open. No
Must-fix bundled (override disclosed, head still queued).

## Verification

Re-measured (`--base d3e9e6898~1 --reach-all`): vacuous (0 blocked at
baseline — disclosed: "rows cited none") + smoke REACH-OK 24/24, 0
regressed. Claim true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
