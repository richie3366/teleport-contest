# Review 1554 — 2cfe062a — `pickup.c` lift_object whole-body port (D-2595)

- Commit: `2cfe062a` (2026-09-20) — "`pickup.c` lift_object whole-body port (loadstone override, gold hint, removing verb, container caller) (D-2595)."
- Queue row: coverage gap (thin local: Sokoban refuse, carry_count, slot refuse w/o gold hint, hardcoded `lifting`, unguarded scare-spe clear).
- JS touched: `js/pickup.js` only (~90 insertions). Imports added: `carrying` (hack.js), `throws_rocks` (monsters.js), `GOLD_PIECE` const.

## Intent vs deliverable

Subject promises the whole `lift_object` body + container caller. Diff actually delivers: restarted `lift_object(obj, container, cntRef, telekinesis)` in C order (override arm, carry_count, cnt<1 fall-through, slot refuse + gold hint, encumbrance rise with lifting/removing verb, gated scare-spe clear), both C callers wired (`pickup_object :1869` NULL, `out_container :2748` container + split), omits re-named to container-delta_cwt / merge_choice / out_container family. Promise matches diff.

## Inventory

Restarted: `lift_object` (new `container` param). Rewired: `pickup_object` call, `out_container` call + split. No symbols deleted (no `sym.mjs` deletion audit needed; new imports verified below).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/pickup.c:1704–1795` (csym; body `:1713–1794`). Callers: `:1869` (NULL), `:2748` (current_container).

Arm-by-arm confirm:

- Sokoban refuse (`:1714–1718`): unchanged ✓.
- Override (`:1719–1737`): `LOADSTONE || (BOULDER && throws_rocks)` gate ✓; `inv_cnt < INVLET_BASIC || !carrying(otyp) || merge_choice` → return 1 ✓ — `carrying` is the live sync export (`js/hack.js:3038`, `sym.mjs` confirms; returns obj/null so `!` ≡ C NULL test; import-the-export, no 4th clone); `throws_rocks` live sync (`js/monsters.js:580`) ✓; else-branch `You are carrying too much stuff to pick up another/more %s` — text exact (see nit below on You-vs-pline).
- carry_count (`:1739–1740`): same-shape call as before; `cnt<1 → result=-1` now falls through to the scare arm instead of early-returning — matches C `:1741–1742`. Container weight deltas stay a named omit (C `carry_count` takes `container` + wt out-params; JS helper is floor-shaped; disclosed in doc + map). OMIT, legitimate.
- Slot refuse (`:1743–1756`): `nxtobj(obj, GOLD_PIECE, where==OBJ_FLOOR)` gold-hint suffix verbatim ✓; `result=-1` ✓.
- Encumbrance (`:1757–1786`): prev/burden/next computation ✓; telekinesis → 0 ✓; qbuf prefix ladder + `!container ? 'lifting' : 'removing'` ✓ (container is object-or-null, so `!` is correct); savequan ✓; `yn_function(qbuf,'ynq','q')` ≡ `ynq` (pre-existing convention) with q→-1 / n→0 / y→1 ✓; `clear_nhwindow_message()` ≡ `clear_nhwindow(WIN_MESSAGE)` ✓.
- Scare-spe (`:1791–1792`): now `result<=0 && !container` — the `!container` guard is new and matches C (old code cleared unconditionally). ✓
- `out_container`: `lift_object(obj, container, lifted, false)`, `res<=0 → return res`, `quan != count && otyp != LOADSTONE → splitobj` — matches C `:2747–2754` exactly. Artifact-touch/fatal-corpse above stay (pre-existing) named omits ✓.

Callee closure: all LIVE (carrying/throws_rocks verified imports; carry_count/merge_choice_invent/yn_function pre-existing). No clones, no stubs. No RNG in body (carry_count untouched weight math) — D-log "draws no RNG" holds.

Nit (not a C-wrong): the new override-refuse message uses `pline('You are carrying…')` while the file convention is `You('are carrying…')` (`js/pickup.js:32` import, used at :3019/:3158). Rendered text is identical; style only — not queued.

## Hallucinations / overclaim

None. "Container caller" claim is real (`out_container` wired, both call sites in file confirm).

## Density

Whole staticfn + both caller wirings, one module — right-sized.

## Verification

- Banned-pattern grep on diff: 0 hits. `imports.mjs --rulecheck` (run this review): clean.
- Re-ran here: `hidden-proxy.mjs verify lift_object --base 2cfe062a~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated) + smoke 24/24 REACH-OK. Matches D-log (including the `--reach-all` re-run claim).

## Cited evidence

C override + slot arms (`pickup.c:1719–1756`, the restored behavior):

```c
if (obj->otyp == LOADSTONE
    || (obj->otyp == BOULDER && throws_rocks(gy.youmonst.data))) {
    if (inv_cnt(FALSE) < invlet_basic || !carrying(obj->otyp)
        || merge_choice(gi.invent, obj))
        return 1; /* lift regardless of current situation */
    /* if we reach here, we're out of slots and already have at least
       one of these, so treat this one more like a normal item ... */
    You("are carrying too much stuff to pick up %s %s.",
        (obj->quan == 1L) ? "another" : "more", xname(obj));
    return -1;
}
```

C out_container split (`pickup.c:2747–2754`, the wired caller):

```c
count = obj->quan;
if ((res = lift_object(obj, gc.current_container, &count, FALSE)) <= 0)
    return res;

if (obj->quan != count && obj->otyp != LOADSTONE)
    obj = splitobj(obj, count);
```

Callee closure for this SHA:

| Callee | Status | Evidence |
|--------|--------|----------|
| carrying | LIVE | `sym.mjs` → `js/hack.js:3038 sync`, `(otyp)` + invent scan; `!` ≡ C NULL test |
| throws_rocks | LIVE | `sym.mjs` → `js/monsters.js:580 sync` |
| merge_choice_invent | LIVE | pre-existing helper (≡ `merge_choice(gi.invent, obj)`) |
| carry_count | LIVE (floor-shaped) | container `delta_cwt` stays named omit (C takes `container` + wt out-params) |
| yn_function 'ynq' | LIVE | pre-existing ≡ `ynq(qbuf)`; q→-1 / n→0 / y→1 |

Tool outputs pasted (required):

```
$ node scripts/sym.mjs carrying
carrying         js/hack.js:3038   sync
$ node scripts/sym.mjs throws_rocks
throws_rocks     js/monsters.js:580   sync
$ node scripts/hidden-proxy.mjs verify lift_object --base 2cfe062a~1 --reach-all
verify lift_object: baseline 2cfe062a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke lift_object: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

Call sites in file: `js/pickup.js:1376` (`pickup_object`, NULL) and `:2379` (`out_container`, container) — both C callers wired. Banned-pattern grep on diff: 0.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
