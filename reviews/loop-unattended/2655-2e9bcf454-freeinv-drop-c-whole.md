# Review 2655 — 2e9bcf454 — freeinv_drop C-whole (D-3791)

Metadata. SHA `2e9bcf454` (2026-10-10), D-3791, parent
`fd2c769ce` (HEAD). js diff: `js/do.js` +6/−3 —
freeinv_drop loses C-absent `owornmask = 0`,
gains `pickup_prev = 0` + `update_inventory()`;
focused test. Works cliffs row-2 drop_uswapwep
(95200).

## Intent vs deliverable

Promise: 95200@608 — JS carried a spurious
`--More--` after the axe-drop topline because a
second JS-only message (the «Setworn:
mask=0x400» impossible at 612 + «Program in
disorder!» at 613) followed: zeroing owornmask
while the axe was still slotted tripped the
setworn consistency check. C's freeinv never
touches owornmask.

Diff delivers exactly the C body lines.
Promise and diff match.

## Inventory

Changed JS (1 writer):

- freeinv_drop — `js/do.js:2660–2671`. C:
  `invent.c:1403–1409` (whole body read:
  extract `:1405`, pickup_prev `:1406`,
  freeinv_core `:1407`, update_inventory
  `:1408` — no owornmask line).
- update_inventory — `js/invent.js:4966` sync,
  live, already imported (`do.js:132` — no new
  edge). Callers: 3 drop sites in do.js
  (`:2799/:3047/:3136`).

## C ↔ JS fidelity

**Body C-whole in C order.** splice (extract)
→ pickup_prev=0 → freeinv_core → gold/botl
(idempotent flag + the JS-side `_goldCount`
counter) → update_inventory(). The deleted
zeroing has no C counterpart in `:1403–1409`
or in freeinv_core — C's drop path clears
slot+bit in setworn, so the zero-while-slotted
was the impossible's cause on both readings.
The gold block + `where` comment pre-date the
fix and stand (no session names them). No
symbol deleted or re-pointed, so no sym.mjs
paste is owed.

## Hallucinations / overclaim

None. Diff grep: zero hits. The More-cause is
probe-measured (axe+More held 609–611, Setworn
at 612, disorder at 613; C searched at 609) —
a message-count cause, correctly not treated
as a paint gap.

## Density

Cliff-phase §2b: one row-2 writer made whole,
no bundling. 95200 → PASS. do.js shared —
full 44/44 ran.

## Verification

D-log Verify: drop_uswapwep 1 PASS; REACH-OK
both fns; gates + cohort + full PASS.

Re-measured by this audit (`verify drop_uswapwep
--base 2e9bcf454~1 --reach-all`):

```text
verify drop_uswapwep: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-worldtour-Barbarian-95200: PASS
smoke drop_uswapwep: 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log exactly. 0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
