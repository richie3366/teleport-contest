# Review 1458 — 62a8e932 — `mon.c` m_consume_obj whole-body port (D-2499)

Metadata: SHA `62a8e932`, `js/mon.js` +154/−93, `js/eat.js`/`monmove.js`/
`js/muse.js` 2-line exports each. C `mon.c:1392–1453` (`m_consume_obj`)
+ `:1352–1381` (`meatbox`) + `:1384–1386` (`mstoning` macro). D-log: D-2499.

## Intent vs deliverable

Promise: replace the thin body (non-pet heal + delobj + deadmimic
quickmimic) with all consume arms in C order, plus new `meatbox`.
Diff delivers: heal-by-weight, meatbox, ball/chain unpunish, pre-munch
snapshot, poly/slime newcham, wraith grow, petrify, nurse heal,
carrot/blindness cure, pet quickmimic, pyrolisk-egg explode, corpse
mon_givit. Promise = deliverable.

## Inventory

- New: `export async function meatbox`; `m_consume_obj` restarted.
- Exports (no bodies changed): `ofood`/`polyfood` (eat.js),
  `removed_from_icebox` (muse.js). Comment-only: monmove.js
  `gelcube_digests` note updated to "arms live".
- `sym.mjs` (required): no deleted/re-pointed symbols. Callee spot
  checks — `newcham` makemon.js:1962 sync (called sync ✓, matches C
  `(void)`); ASYNC + awaited in-diff: `grow_up` mhitm.js:3339,
  `mon_to_stone` mhitm.js:2707, `monstone` mhitm.js:2789, `quickmimic`
  dogmove.js:1471, `mon_givit` mon.js:2735, `mcureblindness`
  muse.js:1767, `explode` explode.js:417; sync: `resists_ston`,
  `poly_when_stoned`, `flesh_petrifies` (monsters.js), `ofood`
  (eat.js:401), `unpunish` (read.js:1840).

## C ↔ JS fidelity

`m_consume_obj` ≡ `:1392–1453`: non-pet weight-heal (`oc_weight`) ✓;
`Has_contents → meatbox` before ball/chain ✓; uball → `unpunish` +
`delobj`, uchain → `unpunish` (frees) ✓; snapshot before `delobj`
munch (otyp/vis/corpsenm/deadmimic/slimer/poly/grow/heal/eyes/mstone —
delobj-after-use ordering preserved) ✓; `poly || slimer → newcham(ptr,
vis ? NC_SHOW_MSG : NO_NC_FLAGS)` ✓; pet grow cap `m_lev < mlevel+15`
✓; `poly_when_stoned → mon_to_stone` else `!resists_ston → pline_mon +
monstone` ✓; nurse full-heal ✓; `(eyes || heal) && !mcansee →
mcureblindness(mtmp, canseemon)` ✓; pet-deadmimic `quickmimic` ✓;
`EGG + PYROLISK → explode(mx, my, -11, d(3,6), 0, EXPL_FIERY)` —
single `d(3,6)`, call-for-call ✓; `corpsenm != NON_PM → mon_givit` ✓.
Macro expansions verified against C: `mlevelgain` ≡ `ofood &&
corpsenm==PM_WRAITH` (`obj.h:325`) with raw corpsenm not the CORPSE-gated
local ✓; `mhealup` ≡ `ofood && corpsenm==PM_NURSE` (`obj.h:326`) ✓;
`mstoning` ≡ `ofood && ismnum && flesh_petrifies` (`mon.c:1384–1386`) ✓.
`meatbox` ≡ `:1352–1381`: cube-engulf test by `data == &mons[CUBE]`
(index-compare equivalent) ✓, `Has_contents || isok` guard ✓, spill
`pline` with `s_suffix(The(distant_name(xname)))` + `surface` ✓,
head-first `while (cobj)` unwrap with ICE_BOX `removed_from_icebox`,
cube → `mpickobj` else `flooreffects → place_object` ✓.

Callee closure: every arm's callees LIVE, async ones awaited. Named:
none in the ported body. No STUB, no clone.

## Hallucinations / overclaim

None. "Named: none" holds — every arm, including the egg-explode RNG
arm, is live.

## Density

Two C functions (65 + 30 lines) + macro, one module, +154/−93. The
eat/muse changes are 2-line export flips for existing bodies, not scope
creep. Right-sized.

## Verification

Re-ran here (`--base 62a8e932~1 --reach-all`):

```text
verify m_consume_obj: baseline 62a8e932~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke m_consume_obj: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coords.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
