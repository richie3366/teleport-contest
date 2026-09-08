# Review 1104 — 1602fc13 — set_uasmon TELEPORT/TELEPORT_CONTROL FROMFORM (D-2138)

Metadata: SHA `1602fc13`, `js/polyself.js` only (+11/−1 in `js/`).
Queue row fired: Open `allmain.c moveloop_core` (1 session,
scen-poly-Archeologist-92226 step 88). No prior review claimed
closed.

## Intent vs deliverable

Subject promises: the two FROMFORM PROPSETs so a tengu-poly hero
confers teleport and the moveloop `rn2(85)` gate (`allmain.c:308`)
fires. Diff actually adds: `can_teleport`/`control_teleport` to
the existing `monsters.js` import, `TELEPORT`/`TELEPORT_CONTROL`
to the existing `const.js` import, two `propset_fromform` lines,
and retires the two names from the header omission list. Promise
matches diff; nothing extra.

## Inventory

Zero new functions; two changed import blocks; two new call lines
in `set_uasmon`; one comment-line edit. Callees:
`can_teleport`/`control_teleport` LIVE (`monsters.js:959/964`,
`M1_TPORT`/`M1_TPORT_CNTRL` per `mondata.h` — bodies read and
confirmed); `propset_fromform` pre-existing local
(`polyself.js:498`) mirroring the PROPSET macro. `imports.mjs
--can` confirms no new edge (`polyself.js` already imports
`monsters.js`) — no TDZ risk.

## C ↔ JS fidelity

Audited against `polyself.c:37–127` (via `csym`). C `:94–95` is
exactly:

```c
PROPSET(TELEPORT, can_teleport(mdat));
PROPSET(TELEPORT_CONTROL, control_teleport(mdat));
```

JS ports both predicates with the right H-fields
(`HTeleportation`/`HTeleport_control`). `propset_fromform`
mirrors the macro's bit-preserving `|= FROMFORM` / `&= ~FROMFORM`
on both `uprops[].intrinsic` and the H-field (body read at
`polyself.js:498–513`), so the revert path (human mdat → OFF →
clear) follows with no extra code — the D-log's revert claim
holds by construction of the macro, not by a new branch. One nit,
not a C-wrong: the message says "in C position", but JS inserts
the pair right after DRAIN_RES while C has eight still-omitted
PROPSETs (ANTIMAGIC…INVIS) between. Harmless — each PROPSET
touches an independent `uprops` index, so relative order is
unobservable. Remaining PROPSETs stay named in the map: correct
arm split, no stub in a live arm.

## Hallucinations / overclaim

None. No dispatch-with-stubbed-callee; both predicates are live
and C-faithful. The "C position" phrasing overstates placement
but the semantics are order-independent, so this is wording, not
an overclaim about behavior.

## Density

Eleven insertions for one PROPSET pair — minimal and complete.
Right-sized per §2b.

## Verification

D-log bullet shows `verify.mjs --fn moveloop_core` → PROGRESS +
green 2/2 + strict ×2 + cohort 7/7 + hand full 44/44.
Re-measured myself: `hidden-proxy verify moveloop_core --base
1602fc13~1` → `0 PASS, 1 moved past, 0 unchanged, 0 worse →
PROGRESS` (Archeologist-92226 moveloop_core@88 → passive@107,
later step and later owner). Claim true; no vacuous check. Diff
fully inspected (11 lines): no FORCE/DIAG/RNG-log/seed/coordinate
gates. Rule #2 covered by the iteration-wide `--rulecheck` (clean).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
