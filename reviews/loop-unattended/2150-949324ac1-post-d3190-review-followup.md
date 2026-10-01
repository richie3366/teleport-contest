# Review 2150 — 949324ac1 — post-D-3190 review follow-up

Date: 2026-10-01. Follow-up to reviews 2136 (D-3176) and 2146 (D-3186):
three live regressions those reviews did not Keep, found by re-reading
the JS bodies against pinned C at tree 949324ac1 (post-D-3190 + TDZ fix).
No JS or upstream C edits here. Verdict rationale below; Must-fix rows
prepended to docs/LOOP-QUEUE.md in the same commit.

**Addressed:** D-3191

Items 1, 3–4 closed; item 2 (mpickstuff verbose gate) remains queued.

## 1. prinv verbose gate flipped to truthy (D-3186, C-wrong)

C invent.c prinv gates the "(N in total)" suffix on `flags.verbose`,
decl-initialized TRUE. D-3186 (c1c0d92f4) rewrote the gate at
js/invent.js:7692 as `game.flags?.verbose ? totalbuf : ''`; the prior
code used `game.flags?.verbose !== false`. The port's own convention
treats an uninitialized bag as ON — js/invent.js:7641,9188,9205 and
js/options.js:2331,2797,3021 all use `!== false`, and
js/options.js:10137 documents the bag can be "still undefined (JS never
ran allopt_array_init)". With flags uninitialized, JS now suppresses a
suffix C prints. Fix: restore `!== false`.

## 2. mpickstuff verbose gate flipped to truthy (D-3176, C-wrong)

Same defect class in D-3176 (ae5beffe4): js/monmove.js:535 now reads
`if (game.flags.verbose)` (also dropping `?.`), where the prior code
was `if (game.flags?.verbose !== false)`. C mon.c mpickstuff tests
`flags.verbose`, default TRUE. Uninitialized flags now suppress the
"%s picks up %s." message. Fix: restore `!== false` (keep `?.`).

## 3. dispinv_with_action post-menu scan dropped its null guard (hardening)

D-3186 (c1c0d92f4) replaced the `.find((o) => o && o.invlet === c)` scan
with a loop at js/iactions.js:958 testing `otmp.invlet === c` with no
guard. A null hole in game.invent now throws TypeError where the old
code skipped it. No evidence invent carries holes in production, so
this ships as same-iteration hardening with item 1, not its own C-wrong.

## 4. doprtool successor lookup restarts at 0 on removal (hardening)

D-3186 (c1c0d92f4) js/invent.js:7861: `otmp = inv[inv.indexOf(otmp) + 1]`.
If `otmp` ever leaves the array, indexOf returns -1 and iteration
restarts at the head (infinite loop). reassign only reorders, so this
is unreachable today; same-iteration hardening with item 1: guard the
-1 case. The per-node indexOf is also O(n^2); acceptable, not a defect.

## Verdict

**QUALITY-RISK**: two live C-wrongs (items 1–2) plus two hardening notes
(items 3–4). Must-fix rows prepended in the same commit; the next port
pops those first.
