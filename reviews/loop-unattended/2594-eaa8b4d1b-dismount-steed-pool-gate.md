# Review 2594 — eaa8b4d1b — dismount_steed pool-drop pline gate

SHA: `eaa8b4d1b` (D-3724). Underwater-idiom family residual, 1 gate,
`js/steed.js` only (+9/−4 incl. doc). Ledger: dismount_steed
ported (D-1915/D-1627 stand).

## Intent vs deliverable

Promise: C stays silent when a grounded steed drops into a pool
while the hero is submerged (steed.c:726); JS read dead-false
sticky `u.Underwater` → gate reads live `(u.uinwater | 0)`,
plus a doc-comment omit refresh (KNOCKED caller now wired).
Diff actually adds: the one-gate rewire + C-cite comment + the
omit-line edit. Promise matches diff.

## Inventory

- `dismount_steed` (js/steed.js:865, async) ↔ C
  nethack-c/upstream/src/steed.c:575–822 (csym range), gate
  :726.

## C ↔ JS fidelity

C `:724–729` `if (grounded(mdat)) { if (is_pool(u.ux, u.uy))
{ if (!Underwater) pline("%s falls into the %s!", ...` confirmed
verbatim. JS now nests `if (!(u.uinwater | 0))` inside the same
grounded → is_pool envelope with the same Monnam/surface pline
— envelope, predicate, and message match C. Underwater ≡
u.uinwater verified 2591. `sym.mjs dismount_steed` →
`js/steed.js:865 ASYNC` — canonical export, no clone, no STUB,
nothing deleted or re-pointed. Doc-claim check: the omit edit
says the KNOCKED u.dx/u.dy caller is wired at
js/mhitm.js:2963–2966 — confirmed (sets game.u.dx/dy, then
`await dismount_steed(DISMOUNT_KNOCKED)`), so dropping it from
the omit line is accurate, not a silent retire.

## Hallucinations / overclaim

None.

## Density

One whole gate + doc refresh + focused test + ledger + verify
on an empty queue. Right-sized; successor lead (D-3725
display_binventory) named.

## Verification

Re-measured: `verify dismount_steed --base eaa8b4d1b~1
--reach-all` → 0 blocked (vacuous, as stated) + `reach
dismount_steed: 1 baseline-PASS session(s) reach it (1 run,
1.6s): 1 PASS, 0 regressed → REACH-OK`. Matches the D-log.
Rule #2 clean. Diff grep FORCE/DIAG/RNG/coords: no hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
