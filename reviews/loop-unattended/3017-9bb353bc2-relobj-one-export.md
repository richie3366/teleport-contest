# Review 3017 — 9bb353bc2 — m_detach drops through C's relobj (Sunsword stops shining)

- SHA: `9bb353bc2` (cliff; board row setmnotwielded,
  scen-zapfest-Rogue-50850092 s773, 6 screens)
- D-entry: D-4177; Ledger: relobj ported js=steal.js:relobj
- `js/` diff: steal.js +33 −4, mhitm.js +8 −18, dogmove.js +4 −11,
  mkobj.js −32, steed.js / trap.js / uhitm.js ±1 each

## Intent vs deliverable

Promise: mon.c m_detach drops a dead monster's inventory through
steal.c relobj (`:2779`). relobj's mdrop_obj → extract_from_minvent ends
with mwepgone for a wielded item, so a lit Sunsword runs end_burn and
prints «… stops shining.» JS used relobj_on_death, a partial mkobj.js
clone that unlinked items by hand.

Diff: `relobj(mtmp, show, is_pet)` is ported whole into steal.js.
m_detach, grddead and dog_invent call it. relobj_on_death, the
dogmove-local relobj and grddead's inline isgd-gold block are deleted.
droppables is exported. The promise matches the diff.

## Inventory

- relobj — steal.js:912 (C steal.c:874–898): new export, replaces three
  copies.
- m_detach — mhitm.js:3885 (C mon.c:2777–2780): `await relobj(mtmp, 1,
  false)`.
- grddead — mhitm.js:3739 (C vault.c:174–189): `await relobj(grd, 0,
  false)`.
- dog_invent — dogmove.js:996 (C dogmove.c:420): `relobj(mtmp, minvis ?
  1 : 0, true)`.
- droppables — dogmove.js:839: export only.
- mdrop_obj — mon.js:1824 (C steal.c:813–846): existing callee, now on
  the death path.

## C ↔ JS fidelity

C relobj, step by step:

1. `omx/omy` are snapped first.
2. If `isgd` and the guard holds gold: when canspotmon, pline «%s gold
   vanishes / seems to vanish» (canseemon picks the verb), then
   obj_extract_self and obfree.
3. `while ((otmp = is_pet ? droppables(mtmp) : mtmp->minvent))
   mdrop_obj(mtmp, otmp, is_pet && flags.verbose)`.
4. `if (show && cansee(omx, omy)) newsym(omx, omy)`.

JS follows this statement for statement, with the same snapshot point.

mdrop_obj (`csym`, steal.c:813–846) runs distant_name before the
extract, then `extract_from_minvent(mon, obj, FALSE, TRUE)`, the
dead-steed saddle no_charge test, the verbose pline, flooreffects
"fall" else place+stack, and update_mon_extrinsics only when
`!DEADMONSTER`. The JS header and body cite that order. The new
behaviour comes from extract_from_minvent's mwepgone → setmnotwielded
→ end_burn + pline (worn.c:1414–1416, weapon.c:1813–1828), which the
clone skipped.

m_detach used to guard the newsym with `mx > 0`. C has no such guard:
it relies on `cansee`, which is false off-map. JS now does the same.

`sym.mjs` on the deleted and re-pointed names:

```text
relobj           js/steal.js:912   ASYNC — await required
relobj_on_death  NOT FOUND in js/** (no export, no local function/const).
droppables       js/dogmove.js:839   sync
mdrop_obj        js/mon.js:1824   ASYNC — await required
```

All three relobj call sites await it (`grep -anw relobj`). They map
1:1 to C's three callers (`csym --callers relobj`: dogmove.c:420,
mon.c:2779, vault.c:181).

## Hallucinations / overclaim

None.

## Density

Three clones collapsed into one C function, with its three C callers
wired in the same commit. This is the right shape for a writer fix.

## Verification

```text
verify setmnotwielded,relobj,m_detach,grddead --base 9bb353bc2~1 --no-reach
  setmnotwielded: 1 PASS (scen-zapfest-Rogue-50850092) → PROGRESS
  relobj / m_detach / grddead: 0 blocked (vacuous)
```

This reproduces the claim. Every monster death now runs
extract_from_minvent, and the audit's full rescore shows 0 PASS→FAIL.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
