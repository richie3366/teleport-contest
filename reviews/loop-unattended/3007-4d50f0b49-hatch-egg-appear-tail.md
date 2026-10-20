# Review 3007 — 4d50f0b49 — hatch_egg runs makemon's occupation tail

- SHA: `4d50f0b49` (cliff; board row dosearch, scen-symset-Rogue-50950071
  s219, 18 screens; writer timeout.c hatch_egg)
- D-entry: D-4167; Ledger: hatch_egg ported
- `js/` diff: timeout.js +7 −1

## Intent vs deliverable

Promise: makemon's tail runs `if (go.occupation) (void) dochugw(mtmp,
FALSE);` outside the MM_NOMSG guard (makemon.c:1502–1504). So a hostile
hatchling in view stops a counted search before hatch_egg's own message.
JS splits that tail into the async `makemon_appear_msg`, which a caller of
the sync makemon must await. hatch_egg never called it.

Diff: hatch_egg awaits `makemon_appear_msg(mon, mon.mx, mon.my,
NO_MINVENT | MM_NOMSG)` right after each successful makemon, before
tamedog. The promise matches the diff.

## Inventory

- hatch_egg — timeout.js:2443 (C timeout.c:1016–1189); one call added in
  the hatch loop (C `:1046–1064`).
- makemon_appear_msg — makemon.js:3900 (existing helper, 65 call sites),
  imported through the existing dynamic `import('./makemon.js')`.

## C ↔ JS fidelity

C loop body: `enexto` → `makemon(…, NO_MINVENT | MM_NOMSG)` (whose tail,
when not in_mklev, does newsym, the appear Norep only `if (!(mmflags &
MM_NOMSG))`, then `if (go.occupation) dochugw(mtmp, FALSE)`) → tamedog
gate → G_EXTINCT break → `mon2 = mon`. JS makemon_appear_msg: returns
under in_mklev; the MM_ASYNCGROUP deferred block is skipped (flag not
passed); it drains group appears queued for this primary (none for a
NO_MINVENT single hatchling, and hatchlings are not grouped from here);
the appear Norep is skipped under MM_NOMSG; then the occupation dochugw.
It sits between makemon and tamedog, which is C's order, since the tail
runs inside makemon.

So "You stop searching." (dochugw → stop_occupation) now precedes the
hatch message, as in the D-log's C backtrace (`stop_occupation ← dochugw
← makemon ← hatch_egg ← run_timers`). No RNG is added on the
no-occupation path: dochugw is gated on occupation, as in C.

## Hallucinations / overclaim

None. The Named line ("other sync-makemon callers that never await
makemon_appear_msg were not audited") is an honest reading list.

## Density

Seven lines for the measured writer. Right-sized.

## Verification

```text
verify dosearch,hatch_egg --base 4d50f0b49~1 --no-reach
  dosearch: 1 PASS (scen-symset-Rogue-50950071) → PROGRESS
  hatch_egg: 0 blocked (vacuous; the row's owner is dosearch)
```

This reproduces the claim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
