# Review 2953 — 2cb6f95b8 — newsym off-map guard: panic / column-0 impossible

- SHA: `2cb6f95b8` (cliff, live-queue owner `newsym`, 3 board rows, 6 at verify)
- D-entry: D-4113; Ledger: newsym ported
- `js/` diff: `js/display.js` +31/−2

## Intent vs deliverable

Promise: C newsym's `!isok` guard panics off the map and calls
impossible() for column 0. JS had a silent `if (!loc) return`, so a holder
monster parked at <0,0> for a Water-level bubble move never printed
«newsym: attempting screen update for <0,0>». Diff: newsym now has the
guard. The off-map arm panics. The column-0 arm leaves
`game._newsym_misuse` pending, because newsym is sync. see_monsters clears
that slot when it starts, delivers `await impossible(...)` straight after
the newsym that set it, in fmon order, and docrt_flags now awaits
see_monsters. Promise = diff.

## Inventory

- `newsym` — display.js:6589–6602; C display.c:916–1099 (guard :928–935).
- `see_monsters` — display.js:6957–6966; C display.c:1505–1516.
- `docrt_flags` — display.js:7269 (`await see_monsters()`); C display.c:1761.

## C ↔ JS fidelity

```c
if (_suppress_map_output()) return;            /* :926–927 */
if (!isok(x, y)) {
    errfunc = (x < 0 || y < 0 || x > COLNO - 1 || y > ROWNO - 1) ? panic
              : impossible; /* misuse of column 0 is less severe */
    (*errfunc)("newsym: attempting screen update for <%d,%d>", x, y);
    return;
}
```

The JS keeps C's order: the suppress check comes first, then `isok`.
`isok` is const.js:2326 (`x >= 1 && x <= COLNO-1 && y >= 0 &&
y <= ROWNO-1`, the same as C cmd.c). The panic predicate copies C's
expression. JS `panic` (end.js:1065) is sync and throws NhPanic, so
nothing after the call runs, as in C. The column-0 arm returns at once in
both runtimes. JS only puts off the message until the awaiting caller can
print it.

see_monsters' loop follows C: DEADMONSTER skip, MON_STILL_ARRIVING skip,
newsym, then (new) the pending impossible, then see_wsegs, then the
Warn_of_mon count. In C the impossible prints inside newsym, before
see_wsegs. JS delivers it between newsym and see_wsegs, which is the same
point. Neither function draws RNG.

## Hallucinations / overclaim

None. The D-log names the gap. A sync newsym caller other than
see_monsters records the column-0 misuse, and nothing prints it. The next
see_monsters clears that record, so it cannot leak there.
scen-symset-Rogue-50350015 s683 (reserve tier, vault guard parked by
parkguard) still shows C's impossible and an empty topline in JS. The
D-log says why: no see_monsters call is in the JS trace at s681–684.

## Density

One whole guard and the one awaiting caller that can print it. The
`docrt_flags` await fixes a missing `await` that could never have
delivered a message.

## Verification

```text
verify newsym (--base 2cb6f95b8~1): 6 blocked
  Valkyrie-50358010 / Wizard-49950024 / Wizard-95217 /
  Ranger-50556518 / Wizard-50650088: PASS
  scen-symset-Rogue-50350015: still newsym at step 683
verify newsym: 5 PASS, 0 moved past, 1 unchanged, 0 worse → PROGRESS
verify see_monsters / docrt_flags: 0 blocked (vacuous, no claim made)
```

Exact match with the D-log (5 PASS, 1 unchanged). `imports.mjs
--rulecheck` is clean. The diff has no FORCE, DIAG or seed reads.

## Actionable C-wrongs

None. The column-0 report from the other sync callers is named debt in
the D-log (one reserve-tier session). It is not a C contradiction in the
code that shipped.

Verdict: **ACCEPT-WITH-DEBT**
