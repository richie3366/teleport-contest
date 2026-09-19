# Review 1552 — d89bb259 — `pickup.c` tipcontainer_checks whole-body port (D-2593)

- Commit: `d89bb259` (2026-09-20) — "`pickup.c` tipcontainer_checks whole-body port (trapped/carried/target arms) (D-2593)."
- Queue row: coverage map-omission (no same-named JS symbol; partial inline in `tipcontainer`).
- JS touched: `js/pickup.js` only (126 insertions, 56 deletions).

## Intent vs deliverable

Subject promises the whole `tipcontainer_checks` body. Diff actually delivers: new module-local `async tipcontainer_checks(box, targetbox, allowempty)` with TIPCHECK enum consts, all six arms in C order, `tipcontainer` rewired to the two C-order calls (`:3724` FALSE, `:3726–3728` TRUE) plus entry location sync, `chest_trap` + `carried` imports, `otrapped chest_trap` dropped from named omits, one new named omit (`subfrombill :4029–4030`). Promise matches diff.

## Inventory

New: `tipcontainer_checks`, `TIPCHECK_OK/LOCKED/TRAPPED/CANNOT/EMPTY`. Changed: `tipcontainer` (checks extracted, rewired). Imports added: `chest_trap` (trap.js edge), `carried` (eat.js).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/pickup.c:3951–4055` (csym range; body `:3956–4054`). Callers: `:3724`, `:3726–3728`, self-recursion `:4002`.

Arm-by-arm confirm:

- BoT-target (`:3962–3966`): `seencount=0; bagotricks(targetbox, FALSE, &seencount); return CANNOT` → `{n:0}` ref-cell + awaited `bagotricks(box,false,…)` + `return TIPCHECK_CANNOT`. Exact (`bagotricks` live async `js/apply.js:5152`, dynamic import kept — no new static edge into the apply cycle).
- lknown (`:3972–3976`): `if (!lknown) { lknown=1; if (carried) update_inventory(); }` verbatim, with live `carried` import (`js/eat.js:2506` sync per `sym.mjs`; `imports.mjs --can pickup.js eat.js carried` → ALREADY, no new edge). Inline→import re-point verified, no new clone (3 pre-existing clones elsewhere untouched — correctly not duplicated).
- locked/trapped (`:3978–3992`): C `if/else-if` chain → sequential early returns, equivalent; `(void) chest_trap(box, HAND, FALSE)` → awaited live `chest_trap` (`js/trap.js:7638` async); `multi>=0 → nomul(-1)` + reason/nomovemsg verbatim; returns LOCKED/TRAPPED exact.
- bag/horn (`:3993–4032`): `maybeshopgoods` reads pre-update ox,oy ✓; recursion `tipcontainer_checks(targetbox, NULL, TRUE)` with `res` propagation ✓; location via file-local `get_obj_location_quantum` — verified CLONE of C `get_obj_location` (`zap.c:653–689`) with flags=0 here: INVENT→hero, FLOOR→ox,oy, MINVENT→mx,my-or-false, BURIED/CONTAINED→false all match (JS `null` ≡ C FALSE since the caller only writes on success; extra `!obj` guard is benign JS-only); `addtobill` ✓; `seen=totseen=0` before loop ✓; `bagotricks(box,TRUE,&seen)` with `seen = seencount.n` writeback + `if (!n) break`, horn `break` on false, `totseen += seen` after both (horn-stale re-add is C-faithful, noted in-body) ✓; spe-restore/`check_unpaid_usage`/cknown ✓.
- `subfrombill(box, shop_keeper(...))` (`:4029–4030`) absent — genuinely named in this commit. OMIT, legitimate.
- quantum (`:4034–4045`): `observe_quantum_cat(box,TRUE,TRUE)` ✓; `Shk_Your` carried rule inlined (`carried ? 'Your' : 'The'` — same semantics as the old inline, now via the import); `cknown=1` moved after the if/else per C (old code set it only in the empty branch — this port fixes that); `(empty_it || allowempty) ? OK : EMPTY` verbatim — old code fell through to spill on corpse, new code returns OK correctly.
- empty (`:4047–4051`) + final OK ✓. `allowempty` gate added where old code had none.
- Caller rewiring matches C `:3724/:3726–3728` order with `box.cknown = 1` following.

Callee closure: chest_trap/bagotricks/hornoplenty/addtobill/check_unpaid/observe_quantum_cat/Has_contents/SchroedingersBox — all LIVE; get_obj_location_quantum — verified CLONE; subfrombill — named OMIT. No STUB in a live arm.

## Hallucinations / overclaim

None. "IN-SCC verdict SAFE" for `carried` checks out (ALREADY edge). No dispatch-over-stub.

## Density

Whole staticfn + caller rewiring, one module, 126 insertions — right-sized breadth work.

## Verification

- Diff grep: no FORCE/DIAG/getRngLog/fastforward.
- Re-ran here: `hidden-proxy.mjs verify tipcontainer_checks --base d89bb259~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated in D-log as coverage row) + smoke 24/24 REACH-OK. Matches D-log. No regressions.

## Cited evidence

C trapped + bag/horn head (`pickup.c:3982–4006`, the restored arms):

```c
} else if (box->otrapped) {
    /* we're not reaching inside but we're still handling it... */
    (void) chest_trap(box, HAND, FALSE);
    /* even if the trap fails, you've used up this turn */
    if (gm.multi >= 0) { /* in case we didn't become paralyzed */
        nomul(-1);
        gm.multi_reason = "tipping a container";
        gn.nomovemsg = "";
    }
    return TIPCHECK_TRAPPED;

} else if (box->otyp == BAG_OF_TRICKS || box->otyp == HORN_OF_PLENTY) {
    int res = TIPCHECK_OK;
    boolean bag = (box->otyp == BAG_OF_TRICKS);
    int old_spe = box->spe, seen, totseen;
    boolean maybeshopgoods = (!carried(box)
                              && costly_spot(box->ox, box->oy));
    coordxy ox = u.ux, oy = u.uy;

    if (targetbox
        && ((res = tipcontainer_checks(targetbox, NULL, TRUE))
            != TIPCHECK_OK))
        return res;

    if (get_obj_location(box, &ox, &oy, 0))
        box->ox = ox, box->oy = oy;
```

C caller order (`pickup.c:3724–3728`, matched by the rewiring):

```c
if (tipcontainer_checks(box, targetbox, FALSE) != TIPCHECK_OK)
    return;
if (targetbox
    && tipcontainer_checks(targetbox, NULL, TRUE) != TIPCHECK_OK)
    return;
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| chest_trap | LIVE | `sym.mjs` → `js/trap.js:7638 ASYNC`, awaited; joins existing edge |
| carried | LIVE | `sym.mjs` → `js/eat.js:2506 sync`; `--can pickup.js eat.js` → ALREADY |
| bagotricks / hornoplenty | LIVE | dynamic apply import kept (no new static apply edge) |
| get_obj_location_quantum | CLONE (verified) | matches C `get_obj_location` (`zap.c:653–689`) flags=0 arm-for-arm; `null` ≡ FALSE |
| Shk_Your rule | inlined | `carried ? 'Your' : 'The'`, same semantics as old inline |
| subfrombill `:4029–4030` | OMIT (named) | present in C above the `return TIPCHECK_CANNOT` |

Tool outputs pasted (required):

```
$ node scripts/sym.mjs carried
carried          js/eat.js:2506   sync
$ node scripts/sym.mjs chest_trap
chest_trap       js/trap.js:7638   ASYNC — await required
$ node scripts/imports.mjs --can pickup.js eat.js carried
ALREADY: pickup.js already statically imports eat.js. No new edge needed.
$ node scripts/hidden-proxy.mjs verify tipcontainer_checks --base d89bb259~1 --reach-all
verify tipcontainer_checks: baseline d89bb259~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke tipcontainer_checks: no RNG-tagged reach; fixed smoke spread (24 run, 3.6s): 24 PASS, 0 regressed → REACH-OK
```

The do-loop writeback (`seen = seencount.n | 0`, `if (!n) break`, horn `break`, `totseen += seen` after both) was read at `js/pickup.js:4775–4784` — horn-stale re-add is C-faithful.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
