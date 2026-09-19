# Review 1553 — 86483571 — `apply.c` use_stethoscope whole-body port (D-2594)

- Commit: `86483571` (2026-09-20) — "`apply.c` use_stethoscope whole-body port (gates/steed/swallow/dz/heartbeat/reveal/its_dead) (D-2594)."
- Queue row: coverage gap (thin local covered only getdir + self-ustatusline + faked m_at arm).
- JS touched: `js/apply.js` (368-line hunk), `js/mkobj.js` (+30 export), `js/trap.js` + `js/do_wear.js` (1 line each — export keywords).

## Intent vs deliverable

Subject promises the whole `use_stethoscope` + `its_dead` bodies. Diff actually delivers: restarted `use_stethoscope` in C order (interference initializer, 3 gates, getdir, hero_seq, tentative bhitpos/notonhead, steed+dz / swallow+dir / swallow+interference / dz / cursed-heartbeat arms, confdir + self ustatusline, isok typing-noise, full m_at arm with M_AP switch, unmap_invisible, SDOOR/SCORR reveal, its_dead tail), new module-local `its_dead`, `init_dummyobj` exported from C-home `mkobj.js`, `obj_pmname`/`is_gloves` exported (clone deleted), one named omit (M_AP_FURNITURE defsyms). Promise matches diff.

## Inventory

Restarted: `use_stethoscope`. New module-local: `its_dead`. New exports: `init_dummyobj` (mkobj.js), `obj_pmname` (trap.js), `is_gloves` (do_wear.js). Deleted: `simple_typename_steth` clone (`sym.mjs` → NOT FOUND — confirmed gone).

## C ↔ JS fidelity

C locus: `apply.c:314–470` (csym; body `:322–469`), sole caller `apply.c:4328` (doapply STETHOSCOPE). `its_dead`: `apply.c:198–311` (csym via grep; body `:198–310`).

Branch-by-branch confirm (`use_stethoscope`):

- Entry `interference = uswallow && is_whirly && !rn2(Healer?10:3)` — JS keeps C short-circuit order, so the `rn2` burns in exactly the same states. RNG call-for-call ✓.
- nohands / `Deaf` / freehand gates in order; `Deaf_hero()` file convention (the in-verify `Deaf()` ReferenceError fix is disclosed — good).
- getdir → ECMD_CANCEL; hero_seq/stethoscope_seq free-use logic (JS `game.hero_seq` fallback init is JS-only global adaptation, benign).
- Tentative bhitpos + notonhead; steed+dz / swallow+dir / swallow+interference / dz / cursed-`rn2(2)` arms in C order, all messages and `res` returns exact. dz arm: Underwater splash / `cant_reach_floor` / `its_dead(&res)` / stronghold hellfire / `pline_The(surface)` — order exact; `resp` cell writeback is equivalent to C `&res` (its_dead writes `*resp` only in the hallu arm — verified below).
- confdir(FALSE), self ustatusline on no-direction; isok → typing noise → ECMD_OK (not res — matches C).
- m_at arm: `x_monnam(ARTICLE_A, SUPPRESS_IT|SUPPRESS_INVISIBLE)` flags ✓; bhitpos reset + notonhead ✓; mundetected ✓; M_AP_OBJECT with live `init_dummyobj` + SLIME_MOLD/mcorpsenm + simpleonames/simple_typename + boots/gloves/LENSES plural ✓; M_AP_MONSTER `pmname` (Hallu ignored per C) ✓; M_AP_FURNITURE → `'thing'` — genuinely named (no JS defsyms table anywhere; keeps C default). OMIT, legitimate.
- seemimic + verbose `There` + mstatusline + map_invisible; unmap_invisible; SDOOR (with Soundeffect) / SCORR (without — matches C) + cvt/recalc/unblock/feel calls; its_dead tail with C `You` (not `You_hear`) ✓.

`its_dead` vs C `:198–310`: levitation corpse-null + tiny-statue skip ✓; uppermost-pile rule ✓; hallu Jim arm with `*resp = ECMD_TIME` ✓; corpse arm (`glyph_at` vs `obj_to_glyph`, Blind map_object, Healer reviver scan, You-determine) ✓ — the one RNG-sensitive call, `obj_to_glyph(corpse, rn2)`, is a macro (`display.h:963`) that draws game-RNG only under Hallucination or for statues; both are unreachable in the corpse arm (hallu returns earlier), so JS `obj_glyph` draws nothing extra — no RNG divergence. The omitted `mtmp->data = &mons[mtmp->mnum]` line is redundant in JS: `get_mtraits` (`js/mkobj.js:3636`) already sets `data = mons(mnum)`, which is exactly what `pronoun_gender` (`js/mondata.js:906`) reads. Not a C-wrong.
`init_dummyobj` vs C `mkobj.c:3347–3372`: zeroobj wipe, otyp/oclass, amulet-known (C keeps zeroed `known`=0; JS `? 0` — identical outcome), quan, corpsenm=NON_PM, LEASH/BOULDER overloads, SLIME_MOLD spe — all arms exact. `is_gloves` matches the `obj.h:288` macro via `armcat` (same as C `oc_armcat`); `is_boots` was already the live `objects.js:212` export.

Callee closure: every callee LIVE (imports verified: mondata ALREADY edge; PM_HEALER from data-leaf generated file) or verified-equivalent; deleted clone confirmed gone. No stubs.

## Hallucinations / overclaim

None. The ReferenceError caught in-verify is disclosed, not hidden.

## Density

Whole function + staticfn + 3 export moves, 303 insertions across 4 files — right-sized breadth work.

## Verification

- `imports.mjs --rulecheck`: clean. Diff has no FORCE/DIAG/seed logic (RNG use is two C-ordered `rn2` calls).
- Re-ran here: `hidden-proxy.mjs verify use_stethoscope --base 86483571~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated in D-log as coverage row) + smoke 24/24 REACH-OK. Matches D-log. Caller `js/apply.js:2514` (doapply STETHOSCOPE, `res > 0`) wired.

## Cited evidence

C M_AP switch (`apply.c:406–433`, the mimic arm — verified against `js/apply.js:567–593`):

```c
switch (M_AP_TYPE(mtmp)) {
case M_AP_OBJECT:
    /* FIXME?
     *  we should probably be using object_from_map() here
     */
    odummy = init_dummyobj(&dummyobj, mtmp->mappearance, 1L);
    /* simple_typename() yields "fruit" for any named fruit;
       we want the same thing '//' or ';' shows: "slime mold"
       or "grape" or "slice of pizza" */
    if (odummy->otyp == SLIME_MOLD && has_mcorpsenm(mtmp)) {
        odummy->spe = MCORPSENM(mtmp);
        what = simpleonames(odummy);
    } else {
        what = simple_typename(odummy->otyp);
    }
    use_plural = (is_boots(odummy) || is_gloves(odummy)
                  || odummy->otyp == LENSES);
    break;
case M_AP_MONSTER: /* ignore Hallucination here */
    what = pmname(&mons[mtmp->mappearance], Mgender(mtmp));
    break;
case M_AP_FURNITURE:
    what = defsyms[mtmp->mappearance].explanation;
    break;
}
```

C `init_dummyobj` (`mkobj.c:3347–3372`, verified against the new export):

```c
*obj = cg.zeroobj;
obj->otyp = otyp;
obj->oclass = objects[otyp].oc_class;
/* suppress known except for amulets (needed for fakes & real AoY) */
obj->known = (obj->oclass == AMULET_CLASS)
                 ? obj->known   /* zeroobj → 0; JS `? 0` identical */
                 : !objects[otyp].oc_uses_known;
obj->quan = oquan ? oquan : 1L;
obj->corpsenm = NON_PM; /* suppress statue and figurine details */
if (obj->otyp == LEASH)
    obj->leashmon = 0; /* overloads corpsenm, avoid NON_PM */
if (obj->otyp == BOULDER)
    obj->next_boulder = 0; /* overloads corpsenm, avoid NON_PM */
if (obj->otyp == SLIME_MOLD)
    obj->spe = svc.context.current_fruit;
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| init_dummyobj | LIVE (new export) | `sym.mjs` → `js/mkobj.js:3663 sync`; arms exact above |
| obj_pmname | LIVE (new export) | `sym.mjs` → `js/trap.js:3360 sync` |
| is_gloves | LIVE (new export) | `sym.mjs` → `js/do_wear.js:232 sync`; matches `obj.h:288` macro via `armcat` |
| is_boots | LIVE | pre-existing `js/objects.js:212` export |
| simple_typename_steth | DELETED | `sym.mjs` → NOT FOUND (clone gone) |
| mondata exts | LIVE | `--can apply.js mondata.js` → ALREADY |
| PM_HEALER | LIVE | data-leaf `generated/monsters_data.js` |

Tool outputs pasted (required):

```
$ node scripts/sym.mjs init_dummyobj
init_dummyobj    js/mkobj.js:3663   sync
$ node scripts/sym.mjs simple_typename_steth
simple_typename_steth NOT FOUND in js/** (no export, no local function/const).
$ node scripts/hidden-proxy.mjs verify use_stethoscope --base 86483571~1 --reach-all
verify use_stethoscope: baseline 86483571~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke use_stethoscope: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

RNG note: `obj_to_glyph(corpse, rn2)` is a macro (`display.h:963`) drawing game-RNG only under Hallucination or for statues — both unreachable in the corpse arm (hallu returns earlier) — so JS `obj_glyph` draws nothing extra. Caller `js/apply.js:2514` (doapply STETHOSCOPE, `res > 0`) wired.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
