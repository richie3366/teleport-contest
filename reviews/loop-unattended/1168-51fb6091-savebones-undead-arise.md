# Review 1168 — 51fb6091 — savebones undead-arise arm (D-2202)

Metadata: SHA `51fb6091`, `js/end.js` +70/−(doc-only rest).
D-log: D-2202. Queue: `mkobj.c` next_ident, 5 blocked → 4 PASS.

## Intent vs deliverable

Subject promises: port the `ismnum(u.ugrave_arise)` arm
(`bones.c:457–478`) with `makemon` before `drop_upon_death`.
Diff actually adds: arise arm in `savebones`, local
`give_u_to_m_resistances` clone, `add_to_minv` fix in
`drop_upon_death`'s mtmp branch, mummy-wrapping + `m_dowear` +
hero-stat tail. Promise kept.

## Inventory

Changed JS: `savebones`, `drop_upon_death` (`js/end.js`); new local
`give_u_to_m_resistances`. Callee census (sym): `makemon`
js/makemon.js:2697 sync ✓ (called sync, C order preserved),
`christen_monst` js/do_name.js:415 ✓, `newsym`
js/display.js:4849 ✓, `add_to_minv` js/mkobj.js:231 ✓,
`m_carrying` js/mon.js:378 ✓, `mongets` js/makemon.js:1795 ✓,
`m_dowear` js/worn.js:916 ✓, `ismnum` js/const.js:3198 ✓ — all
LIVE, none deleted or re-pointed. Import edges: `imports.mjs --can
end.js worn.js` → ALREADY, `end.js mon.js` → ALREADY (re-run
myself); all call-time use of hoisted declarations, no TDZ read.
`give_u_to_m_resistances` is a CLONE (no `mondata.js` export
exists — grep shows the sole definition at `js/end.js:1304`), and I
match it to C below.

## C ↔ JS fidelity

Arise arm vs `bones.c:457–478` (read) in order: `ismnum(arise)`
gate (stricter and more C-faithful than the old
`!= null && !== NON_PM && >= 0`) ✓; `in_mklev` save/set/restore
around `makemon(mons(arise), ux, uy, NO_MINVENT)` ✓;
`!mtmp → drop_upon_death(0,0) + arise=NON_PM + return` ✓;
`give_u_to_m_resistances` ✓; `mtmp = christen_monst(plname)` ✓;
`newsym` ✓; `drop_upon_death(mtmp,0)` ✓; mummy
`m_carrying(MUMMY_WRAPPING) else mongets` ✓; `m_dowear(mtmp,TRUE)`
✓. RNG order right: makemon's next_ident/newmonhp draws precede
the drop loop's `rn2(5)` curse draws, as C ✓.

Clone audit vs `mondata.c:1585–1598` (csym): loop
FIRE_RES..STONE_RES, `(intrinsic & INTRINSIC)` gate,
`1 << (intr-1)` — verified against `prop.h:25–27`
`res_to_mr(r) = 1 << ((r)-1)` ✓. RNG-free like C ✓.

Tail vs `bones.c:505–511` (read): `m_lev = ulevel||1`,
`mhp=mhpmax=uhpmax`, `female`, `msleeping=1` ✓; ebones stays
named ✓.

`drop_upon_death` mtmp branch vs `bones.c:290` (read):
`if (mtmp) add_to_minv(mtmp, otmp)` — the old
`place_object+stackobj` was a genuine C-wrong, now fixed ✓.
Remaining arms (`obj_no_longer_held`, lamp `end_burn`) stay
map-named ✓.

## Hallucinations / overclaim

None. 4-of-5 with the residual (92187) explicitly narrowed to its
own row with a prescribed falsifier, not claimed.

## Density

One arm family in one module, retiring a 5-session row. §2b
right-sized.

## Verification

D-log Verify: syntax, rule2, hidden 4 PASS + 1 unchanged, green,
strict, cohort 7/7, full skipped per runner (single-file death
path). Re-measured myself:
`verify next_ident --base 51fb6091~1` →
`5 blocked at baseline → 4 PASS (92120, 92068, 92224, 92048),
1 unchanged (92187@48), 0 worse → PROGRESS` — matches the claim;
the residual's identical toplines + rng-first shape are as
described. No D-1831 shape. Rule #2 re-run clean. No
FORCE/DIAG/seed/coordinate in the hunks.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
