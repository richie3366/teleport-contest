# Review 2488 — 86d1e780b — restmonchn mw re-alias (D-3607)

- SHA: `86d1e780bda4bb6f2ef8d9d22f7928b0851bd1f6`
- Subject: cliffs-head mattacku writer: restmonchn mw re-alias (both probes → PASS) (D-3607)
- Type: cliff (1 C function family: savemon/restmonchn mw arms), js +18/−1 in `js/lev_json.js` + new test
- Prior reviews closed: none (fresh cliff row; mattacku park tag fired)

## Intent vs deliverable

Promise: serMon persists the mw non-null flag (save.c:834 analogue);
deserMon relinks mw to the W_WEP minvent member (restore.c:432–444);
Rogue-94008 + Tourist-94062 → PASS. Diff actually adds: `W_WEP` import,
`out.mw` flag write in `serMon`, 11-line relink block in `deserMon`, plus
`scripts/mon-mw-save-restore.test.mjs` (4 tests). No other js/ hunks. Promise
matches deliverable.

## Inventory

- `serMon` flag write (`js/lev_json.js:195`) — changed. C: save.c `savemon`
  (`csym`: save.c range, `Sfo_monst` at :834 writes the raw struct incl mw).
- `deserMon` relink block (`js/lev_json.js:210-218`) — changed. C:
  restore.c `restmonchn` `nethack-c/upstream/src/restore.c:432-444`.
- No new functions, no helpers, no deleted symbols (`sym.mjs` re-point check
  N/A — only an import-name addition to an existing const.js import).

## C ↔ JS fidelity

C `restmonchn` (restore.c:375–465 per `csym`; relink at :432–444, verified
by direct read):

```c
if (mtmp->mw) {
    struct obj *obj;
    for (obj = mtmp->minvent; obj; obj = obj->nobj)
        if (obj->owornmask & W_WEP)
            break;
    if (obj)
        mtmp->mw = obj;
    else {
        MON_NOWEP(mtmp);
        impossible("bad monster weapon restore");
    }
}
```

JS (`js/lev_json.js:210-218`):

```js
mtmp.mw = null;
if (raw.mw) {
    for (let o = mtmp.minvent; o; o = o.nobj) {
        if (((o.owornmask | 0) & W_WEP) !== 0) { mtmp.mw = o; break; }
    }
}
```

Branch-by-branch: saved-mw null → C leaves mw null; JS sets null and skips.
Non-null + W_WEP member → both relink to the first match. Non-null + no
match → C `MON_NOWEP` (= `mw = 0` only, monst.h:211) + impossible; JS null,
diagnostic named in D-3607. Empty minvent → scan no-ops both sides. Save side:
C persists the raw pointer whose only load-bearing bit is null/non-null;
JS persists `mtmp.mw ? 1 : 0` — faithful analogue for a JSON format. Order
note: JS relinks before `mtmp.data` assignment while C relinks after; the
fields are independent, immaterial. Callers: C restore.c:672 (migrating)
+ :1146 (fmon) both funnel through deserMon/deserMonList per the D-log table;
position after minvent+ocarry matches C. No RNG in either arm — nothing to
walk call-for-call.

Cheat grep on the diff: no FORCE/DIAG/getRngLog/seed/fastforward/coords in
js/ (hits are prose "no DIAG/FORCE" denials in docs). Rule #2:
`imports.mjs --rulecheck` → clean on current tree.

## Hallucinations / overclaim

None. The "Callers" table names real C sites (:672/:1146 confirmed via
`csym --callers`) and real JS funnels. "Backward compatible" holds:
`raw.mw` undefined skips the scan, mw null as before. "No new edge" holds:
`W_WEP` joins an existing const.js import. The stale `mswings_verb → PASS`
note in the Verify bullet is a bonus observation, not a deliverable claim.

## Density

Cliff phase: owner mattacku carried a fired PRESENCE-ONLY tag (true owner +
cEntry + mattacku-arm topline at the step); the writer restmonchn is the
correct port, one function family, moved both probe sessions. Not an arm-only
sale (the mw arms are the whole save/restore writer delta), not a re-port of
the parked symptom, no other C file's work. Ledger entries present
(restmonchn partial; savemon split). Verdict line: restmonchn — ACCEPT.

## Verification

Re-measured myself (current tree, baseline parent):
`hidden-proxy.mjs verify mattacku --base 86d1e780b~1 --reach-all` →
baseline 2 blocked; Rogue-94008 PASS, Tourist-94062 PASS;
`2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`;
`reach mattacku: 418/418 PASS, 0 regressed → REACH-OK`.
Matches the D-log claim exactly (my reach ran the full 418, not the 80
spread). No REGRESSED rows. New test file read: 4 tests pin flag persist,
relink, empty, and stale-flag shapes.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
