# Review 2986 — 93fae80aa — on_msg's towel says `body_part(HEAD)`

- SHA: `93fae80aa` (cliff; owner on_msg, 1 row moved s1083 → s1202)
- D-entry: D-4146; Ledger: on_msg ported
- `js/` diff: js/do_wear.js +2/−3 (HEAD import + one line)

## Intent vs deliverable

Promise: do_wear.c on_msg names the towel spot with `body_part(HEAD)`
(`:95`). JS hard-coded «around your head», marked "poly deferred". A
worm-polymorphed hero reads «around your anterior segment» in C, and the
longer line pushed a `--More--` JS never showed. Diff:
`` how = ` around your ${body_part(HEAD)}` ``, plus HEAD in the const.js
import. The promise matches the diff.

## Inventory

- `on_msg` — do_wear.js:286–…; C do_wear.c:75–99 (towel arm :94–95).
- Callee `body_part` — js/polyself.js:539 (live import, already used by
  other do_wear.js sites); C polyself.c body_part :2143 → mbodypart →
  worm_parts for S_WORM (:2032–2036).

## C ↔ JS fidelity

C on_msg:

```c
if (otmp->otyp == TOWEL)
    Sprintf(how, " around your %s", body_part(HEAD));
You("are now wearing %s%s.",
    obj_is_pname(otmp) ? the(xname(otmp)) : an(xname(otmp)), how);
```

JS now builds the same string: `how` from body_part(HEAD), then `named` =
`obj_is_pname ? the : an` of xname, then pline «You are now wearing
%s%s.». The flag check above it (`flags.verbose`) is unchanged. The fix
removes the last hard-coded body-part noun in on_msg. The "poly
deferred" note was the only deferral in the function.

## Hallucinations / overclaim

None. The D-log Next bullet already named the new s1202 divergence
(currency() rn2 after «Your awareness re-normalizes.»). D-4147 (review
2987) shipped it.

## Density

A one-line fix on the owner's own arm. It moved the row 119 steps, and
the next SHA closed it.

## Verification

```text
verify on_msg (--base 93fae80aa~1): scen-sweep-Barbarian-50456006 PASS → PROGRESS
```

The D-log recorded "1 moved (s1083 → s1202)". My re-run on HEAD's code
shows PASS because D-4147 has since closed s1202. That is consistent,
not a contradiction.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
