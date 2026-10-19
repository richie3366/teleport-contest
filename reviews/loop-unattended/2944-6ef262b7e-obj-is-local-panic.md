# Review 2944 — 6ef262b7e — obj_is_local panics on OBJ_FREE; two missing obfree writers

- SHA: `6ef262b7e` (cliff; owner-null rows, 8 `^V` tutorial sessions + 1
  nhl_gamestate near-pass)
- D-entry: D-4103; Ledger: obj_is_local ported; set_mimic_sym ported;
  nhl_gamestate partial
- `js/` diff: `js/mkobj.js` +5/−6, `js/makemon.js` +5/−4, `js/do.js` +6/−16

## Intent vs deliverable

Promise: C `obj_is_local` panics on any `where` it does not list, but JS
returned false. So a lit lamp freed during the tutorial gamestate restore
reached `savelev` with no panic, and JS printed «You materialize on a
different level!» where C shows «Oops...». Porting the panic exposed two
writers that skipped `obfree`: `set_mimic_sym`'s throwaway appearance
object, and the `useupall_gamestate` clone in `tutorial_leave_gamestate`.
Diff: exactly those three changes. Promise = diff.

## Inventory

- `obj_is_local` — mkobj.js:1093; C timeout.c :2559–2577. LIVE (now whole).
- `set_mimic_sym` mkobj arm — makemon.js:4161–4165; C makemon.c :2505–2508.
  Callee `obfree` → shk.js:4139, sync, imported. LIVE.
- `tutorial_leave_gamestate` — do.js:1153; C nhlua.c nhl_gamestate
  :1741–1743. Callee `useupall` → invent.js:5160, sync, imported. LIVE.
- Deleted clone `useupall_gamestate` (do.js).

```text
useupall_gamestate NOT FOUND in js/** (no export, no local function/const).
useupall         js/invent.js:5160   sync
obfree           js/shk.js:4139   sync
```

## C ↔ JS fidelity

```c
switch (obj->where) {
case OBJ_INVENT: case OBJ_MIGRATING: return FALSE;
case OBJ_FLOOR:  case OBJ_BURIED:    return TRUE;
case OBJ_CONTAINED: return obj_is_local(obj->ocontainer);
case OBJ_MINVENT:   return mon_is_local(obj->ocarry);
}
panic("obj_is_local");                         /* timeout.c :2574 */
```

The JS switch has the same five arms in the same order. Its null guard
is gone (C's argument is NONNULLARG1), and the default `return false` is
now `panic('obj_is_local')`. JS `panic` (end.js:1065) throws `NhPanic`
synchronously, so a sync caller stops at that point, as in C.
`set_mimic_sym` reads `otmp.otyp` before `obfree(otmp, null)`, the same
order as C :2506–2508. Dropping `?? STRANGE_OBJECT` is right because C
`mkobj` never returns NULL. C `useupall` (invent.c :1311–1317) is
setnotworn → freeinv → obfree. The old clone did the first two by hand
and never reached obfree/dealloc_obj, so the item's timers and light
source outlived it. The `while (gi.invent) useupall(gi.invent)` loop
shape is kept. The artifact `revoke_invoked_property` envelope after
each call is an existing named async split. No RNG is drawn on any
changed path: obfree on a fresh mkobj object only frees.

## Hallucinations / overclaim

None. «9 sessions» = the 8 owner-null `^V` rows + Barbarian-50556042
(nhl_gamestate). The commit says other mkobj-and-discard sites were not
audited, and the D-log names that.

## Density

One cliff: a whole C function (obj_is_local) plus the two writers its
panic exposed, each at its C site. That is the right size.

## Verification

```text
verify nhl_gamestate (--base 6ef262b7e~1): 1 blocked
  scen-sweep-Barbarian-50556042: PASS → 1 PASS, 0 worse → PROGRESS
verify obj_is_local / set_mimic_sym: 0 blocked (owner-null rows)
board: hallu-Priest-51255006 (parent s401 false), sweep-Wizard-50750057
  (s1099), worldtour-Healer-587100 (s727), -Wizard-50056055,
  -Wizard-50255529, -Archeologist-95209, -Wizard-49950064,
  -Wizard-50358009 → all passed=true on HEAD's board
```

Owner-null rows cannot be attributed by `verify <fn>`. The parent board
shows them false and the HEAD board true, and this audit's full rescore
re-checks them on HEAD code. Full public 44/44 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
