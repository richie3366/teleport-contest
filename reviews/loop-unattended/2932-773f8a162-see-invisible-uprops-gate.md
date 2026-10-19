# Review 2932 — 773f8a162 — See_invisible enlightenment gates read uprops

- SHA: `773f8a162` (cliff, writer behind `one_characteristic`)
- D-entry: D-4091; Ledger: insight.c (`attributes_enlightenment`, D-4091)
- `js/` diff: `js/invent.js` +10 −3

## Intent vs deliverable

Promise: both JS copies of the See_invisible line (final disclosure in
`enlightenment`, and ^X `doattributes`) gated on the
`u.HSee_invisible`/`u.ESee_invisible` flats. A worn ring sets only
`uprops[SEE_INVIS].extrinsic`, so «You saw invisible …» was dropped (3
sessions). Diff: both gates also OR the uprops intrinsic/extrinsic.
Promise = diff.

## Inventory

- `enlightenment` See_invisible arm — invent.js:7028–7049; C insight.c:1571-1580.
- `doattributes` copy — invent.js:8123–8142 (same C lines, final=0).

## C ↔ JS fidelity

```c
if (See_invisible) {               /* youprop.h:152 H || E over uprops[SEE_INVIS] */
    if (!Blind) enl_msg(You_, "see", "saw", " invisible", from_what(SEE_INVIS));
    else if (!PermaBlind) enl_msg(You_, "will see", "would have seen", " invisible when not blind", "");
    else enl_msg(You_, "would see", "would have seen", " invisible if not blind", "");
}
```

Both JS copies keep all three sub-arms. `!PermaBlind` is `!(HBlinded &
FROMOUTSIDE)`, and the tense pairs match (^X is final=0). The order is
after BLND_RES and before `Blind_telepat`, as in C. The new gate is the
macro over both JS stores. No RNG.

The commit says a scan of the enlightenment range for other flat-only
`(u.H… | 0) || (u.E… | 0)` gates found only these two. I did not
re-scan the whole 2,000-line range, so I'm taking that claim as stated.

Debt (pre-existing, acknowledged in the subject): `doattributes`
carries a second copy of the attribute lines next to `enlightenment`.
Every gate fix has to land twice, as here.

## Hallucinations / overclaim

None.

## Density

One gate, two copies. One Ledger bullet.

## Verification

```text
verify one_characteristic (--base 773f8a162~1): 6 blocked → 5 PASS, 1 unchanged (HEAD code)
  this commit's board flips: sweep-Wizard-51150073, trek-Wizard-49950063, worldtour-Wizard-578301
```

This is an exact match with the D-log's 3. The other two PASS rows are
D-4092's sokoban rows. No FORCE/DIAG/seed strings.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
