# Review 1555 — 4c7679b9 — `pickup.c` in_container whole-body port (D-2596)

- Commit: `4c7679b9` (2026-09-20) — "`pickup.c` in_container whole-body port (shop sellobj, icebox age, mbag explosion, snuff_lit) (D-2596)."
- Queue row: coverage gap (thin local: refusal guards, wield-slots, fatal_corpse, fit check, put pline).
- JS touched: `js/pickup.js` only (188 insertions, 47 deletions).

## Intent vs deliverable

Subject promises the whole `in_container` body. Diff actually delivers: restarted `in_container` in C order (floor_container/was_unpaid entry, null guard, kidding, topological, worn Norep, loadstone, amulet family, leash, uwep/uswapwep/uquiver, fatal_corpse, fit refuse, freeinv, snuff_lit, floor-shop sellobj, icebox age/timers, mbag explosion chain, put message + floor-gold sellobj + add_to_container + owt, bot + 1/-1), new same-file staticfns `Is_mbag` + `mbag_explodes` + `obj_here_bag`, 5 new static imports, `use_container` sellobj_first set/reset (`:2985`/`:3219` confirmed at `js/pickup.js:3982` / `:4145`), invented gold pre-decrement removed. Promise matches diff.

## Inventory

Restarted: `in_container`. New module-locals: `Is_mbag`, `mbag_explodes`, `obj_here_bag`. New static imports: `obj_is_burning` (light.js), `snuff_lit` (apply.js), `age_is_relative` (timeout.js), `livelog_printf` (pline.js), `uhis` (roles.js). No symbols deleted.

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/pickup.c:2557–2712` (csym; body `:2560–2711`). Callers `:3178`/`:3350`/`:3376` — same-file `use_container` family, untouched signatures. `mbag_explodes`: `:2487–2507` (csym).

Arm-by-arm confirm: entry `floor_container` read before freeinv ✓; null→impossible+0 ✓ (+ benign `!obj` guard); uball/uchain, topological, worn-Norep (refrigerate/stash + `something`), loadstone (`set_bknown`, `plur` via `quan!==1?'s':''`), amulet quartet (`The(xname)`), leash (`Tobjnam are`), uwep weld/setuwep + obsolete `if (uwep) return 0`, uswapwep/uquiver ✓; fatal_corpse→-1 ✓; fit refuse (ICE_BOX/Is_box/BOULDER/big-statue) with the obuf-free message ✓; freeinv + disclosed display-cache gold/botl maintenance (do.js precedent, no C counterpart — benign, documented in-body); burning→snuff_lit ✓; floor-shop was_unpaid/sellobj_first/sellobj_state/sellobj ✓; icebox age + ROT_CORPSE/REVIVE_MON stops + ice-troll mcan=0 + glob SHRINK_GLOB ✓ (`stop_timer(action, obj)` matches by identity — the `obj_to_any` equivalence holds at `js/mkobj.js:1139`); mbag chain — livelog, urgent_pline, unpaid addtobill, BoH-into-BoH, obfree, floor billing with no_charge save/restore, container explosion, useup/useupf/impossible, `losehp(d(6,6))`, container=null ✓; tail put-message + floor-gold sellobj + add_to_container + owt + bot + `container?1:-1` ✓.

`mbag_explodes` vs C: empty-wand/bag gate ✓; `rn2(1<<(depthin>7?7:depthin)) <= depthin` with identical short-circuit (rn2 burns only when Is_mbag||CANCELLATION) — RNG call-for-call ✓; cobj/nobj recursion ✓. `Is_mbag` ≡ `obj.h:339` ✓. `obj_here_bag` ≡ C `obj_here` scan (the `eat.js:2513` clone is NOT EXPORTED per `sym.mjs` — inlining the 5-line scan instead of adding clone #2 is correct, and it matches).

Callee closure: all LIVE or verified-equivalent. `panic("in_container: bag not found.")` → `impossible` — the no-live-panic-export claim holds (display.js vpline doc lists `panic` as a named omission). Five new static edges are all hoisted `export function` bindings read at call time only (`snuff_lit` async-fn, `age_is_relative` fn); green+cohort passing in-verify plus the re-run below confirm no TDZ break. Note: D-2593 kept `bagotricks` dynamic to avoid the apply cycle while this commit adds a static pickup→apply edge anyway — the static edge is proven safe by the gates, so no contradiction with live behavior; D-2593's dynamic import is just conservative.

## Hallucinations / overclaim

None. "Named: none" is accurate — every arm and callee is live or verified above.

## Density

Whole staticfn + helpers + caller flag wiring, one module, 188 insertions — right-sized.

## Verification

- Diff has no FORCE/DIAG/seed logic (only C-ordered `rn2` in mbag_explodes + `d(6,6)`).
- Re-ran here: `hidden-proxy.mjs verify in_container --base 4c7679b9~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated) + smoke 24/24 REACH-OK. Matches D-log.

## Cited evidence

C mbag chain (`pickup.c:2658–2683`, the restored core):

```c
} else if (Is_mbag(gc.current_container) && mbag_explodes(obj, 0)) {
    livelog_printf(LL_ACHIEVE, "just blew up %s bag of holding", uhis());
    /* explicitly mention what item is triggering the explosion */
    urgent_pline(
          "As you put %s inside, you are blasted by a magical explosion!",
                 doname(obj));
    /* did not actually insert obj yet */
    if (was_unpaid)
        addtobill(obj, FALSE, FALSE, TRUE);
    if (obj->otyp == BAG_OF_HOLDING) /* one bag of holding into another */
        do_boh_explosion(obj, (boolean) (obj->where == OBJ_FLOOR));
    obfree(obj, (struct obj *) 0);
    /* if carried, shop goods will be flagged 'unpaid' and obfree() will
       handle bill issues, but if on floor, we need to put them on bill
       before deleting them (non-shop items will be flagged 'no_charge')*/
    if (floor_container && costly_spot(gc.current_container->ox,
                                       gc.current_container->oy)) {
        struct obj save_no_charge;

        save_no_charge.no_charge = gc.current_container->no_charge;
        addtobill(gc.current_container, FALSE, FALSE, FALSE);
        /* addtobill() clears no charge; we need to set it back
           so that useupf() doesn't double bill */
        gc.current_container->no_charge = save_no_charge.no_charge;
    }
    do_boh_explosion(gc.current_container, floor_container);
```

C `mbag_explodes` (`pickup.c:2488–2505`, verified against `js/pickup.js:2981–2996`):

```c
if ((obj->otyp == WAN_CANCELLATION || obj->otyp == BAG_OF_TRICKS)
    && obj->spe <= 0)
    return FALSE;

/* odds: 1/1, 2/2, 3/4, 4/8, 5/16, 6/32, 7/64, 8/128, 9/128, 10/128,... */
if ((Is_mbag(obj) || obj->otyp == WAN_CANCELLATION)
    && (rn2(1 << (depthin > 7 ? 7 : depthin)) <= depthin))
    return TRUE;
else if (Has_contents(obj)) {
    struct obj *otmp;

    for (otmp = obj->cobj; otmp; otmp = otmp->nobj)
        if (mbag_explodes(otmp, depthin + 1))
            return TRUE;
}
return FALSE;
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| snuff_lit / age_is_relative / obj_is_burning / livelog_printf / uhis | LIVE | new static imports; all hoisted `export function`, call-time reads |
| Is_mbag | LIVE (new local) | ≡ `obj.h:339` (`BAG_OF_HOLDING \|\| BAG_OF_TRICKS`) |
| mbag_explodes | LIVE (new local) | arms exact above; `rn2` short-circuit identical |
| obj_here_bag | CLONE (verified) | `sym.mjs obj_here` → NOT EXPORTED, 1 local clone `js/eat.js:2513`; 5-line scan inlined, matches |
| stop_timer | LIVE | `sym.mjs` → `js/mkobj.js:1139 sync`, matches by identity (≡ `obj_to_any`) |
| panic→impossible | justified | no live panic export (display.js vpline doc lists `panic` as named omit) |

Tool outputs pasted (required):

```
$ node scripts/sym.mjs obj_here
obj_here         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/eat.js:2513
$ node scripts/imports.mjs --can pickup.js apply.js snuff_lit
ALREADY: pickup.js already statically imports apply.js. No new edge needed.
$ node scripts/hidden-proxy.mjs verify in_container --base 4c7679b9~1 --reach-all
verify in_container: baseline 4c7679b9~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke in_container: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

Note: the five static edges are new at this commit (parent `pickup.js` had none of them) — all proven safe by green+cohort+smoke. `use_container` flag wiring confirmed at `js/pickup.js:3982` (`:2985`) and `:4145` (`:3219`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
