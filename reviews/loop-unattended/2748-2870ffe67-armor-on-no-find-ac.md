# Review 2748 — 2870ffe67 — Armor_on deletes house find_ac

Metadata: SHA `2870ffe67`, D-3891, `js/do_wear.js` only (+ focused test),
1 function. Cliff-phase writer fix.

Intent vs deliverable: subject promises deleting the house `find_ac()`
call C never makes, so mid-turn donning paints stale uac until the
turn-end refresh, moving Priest-582714 s1376 to PASS. Diff actually
adds: the one-line deletion + rewritten doc comment with per-arm C
cites. Promise = diff.

Inventory: `Armor_on` (js/do_wear.js:1259) — changed, deletion only.

C ↔ JS fidelity: C `nethack-c/upstream/src/do_wear.c:886-906` (via
`csym.mjs`): `!uarm → return 0`; `!known → known=1 + update_inventory`;
`dragon_armor_handling(uarm,TRUE,TRUE)`; gold-DSM
`artifact_light && !lamplit → begin_burn + !Blind pline`; `return 0`.
No `find_ac` anywhere in the body — the deletion is exactly C. JS keeps
every arm in order with matching predicates (known, arti_light/lamplit,
Blind gate). The refresh-side claim checks out: JS has the allmain
once-per-player-input `find_ac()` (js/allmain.js:1456–1457, citing the
C rule) and the Cloak_on stale-uac precedent (js/do_wear.js:709–710),
so removing the eager recompute cannot strand AC — it only defers it to
the C refresh point. The full C body (do_wear.c:886–906) for the
record — 21 lines, five statements, zero AC recomputation:

```c
staticfn int
Armor_on(void)
{
    if (!uarm)
        return 0;
    if (!uarm->known) {
        uarm->known = 1;
        update_inventory();
    }
    dragon_armor_handling(uarm, TRUE, TRUE);
    if (artifact_light(uarm) && !uarm->lamplit) {
        begin_burn(uarm, FALSE);
        if (!Blind)
            pline("%s %s to shine %s!", Yname2(uarm),
                  otense(uarm, "begin"), arti_light_description(uarm));
    }
    return 0;
}
```

The remaining house call (Helmet_on js/do_wear.js:1314) is honestly
named as an untouched sibling in a separate C function — the D-3890
sibling rule applied consistently. No RNG in the body.

Hallucinations / overclaim: none. The 2-screen divergence with
convergence at 1378 is consistent with a stale-paint defect, and the
D-log is explicit that corpus verify ran on `do_statusline2` while
`verify Armor_on` was 0-blocked ("NOT a corpus PASS").

Density: one cliff writer, whole-function claim (`:887–906`) now true,
one probe session, movement claimed. Ledger touch present.
Session-reaching.

Verification: re-measured myself. `verify do_statusline2 --base
2870ffe67~1 --reach-all`: 1 blocked at baseline,
`scen-sweep-Priest-582714: PASS`, `1 PASS, 0 moved past, 0 unchanged, 0
worse → PROGRESS`, smoke 24/24 REACH-OK. D-3891 movement claim
reproduces; no REGRESSED row. No symbol delete/re-point in the import
graph (`find_ac` import kept for the ring/amulet arms), so no `sym.mjs`
output required. Rule #2 clean (checked this iteration). No FORCE/DIAG/
seed/coordinate reads in the diff.

Actionable C-wrongs: none.

Verdict: **ACCEPT**
