# Review 3031 — 80231a01a — zap_over_floor computes yourzap once

- SHA: `80231a01a` (cliff; board row findit,
  scen-hallu-Valkyrie-51650028 s666, «The blast reveals a secret door.»
  vs JS «Your blast …»)
- D-entry: D-4191; Ledger: zap_over_floor ported
- `js/` diff: zap.js +4 −1

## Intent vs deliverable

Promise: zap.c zap_over_floor sets `yourzap = (type >= 0 &&
!exploding_wand_typ)` once (`:5378`). The POT_OIL/SCR_FIRE arm clears
`exploding_wand_typ` and leaves yourzap FALSE (`:5387–5394`), so the
text reads "the blast". JS recomputed yourzap after the clear.

Diff: the recompute line is deleted and a C-citing comment is added.
The promise matches the diff. The owner findit only matched the topline
literal; the writer is zap_over_floor's SDOOR arm, as the D-log says.

## Inventory

- zap_over_floor — zap.js:1180–1500 (C zap.c:5140–5497; yourzap/zapverb
  `:5376–5395`). No helper is added or deleted.

## C ↔ JS fidelity

C `:5376–5395`:

```c
yourzap = (type >= 0 && !exploding_wand_typ);
zapverb = "blast";
if (!exploding_wand_typ) {
    int ztype = zaptype(type);
    if (ztype < ZT_SPELL(0)) zapverb = "bolt";
    else if (ztype < ZT_BREATH(0)) zapverb = "spell";
} else if (exploding_wand_typ == POT_OIL
           || exploding_wand_typ == SCR_FIRE) {
    exploding_wand_typ = 0; /* not actually an exploding wand */
}
```

JS zap.js:1275–1288 is now line for line the same. yourzap has exactly
two readers in C, `:5406` (SDOOR «%s %s reveals a secret door.») and
`:5459` («door absorbs %s %s!»). JS reads it at the same two places
(zap.js:1297, :1355). Both now get FALSE for an oil/scroll-of-fire
explosion. The cleared `exploding_wand_typ` still reaches the later
`exploding_wand_typ`-gated arms as 0, as in C.

## Hallucinations / overclaim

None. The D-log also states that zap_over_floor became pinned only after
the c-index comment-brace tooling fix (5cb5a0511). That fix is in this
window, touches no `js/`, and is not reviewed as a port.

## Density

One deleted statement on the cliffs-head writer. Right-sized.

## Verification

```text
verify findit,zap_over_floor --base 80231a01a~1 --no-reach
  findit:         1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
                  (scen-hallu-Valkyrie-51650028: PASS)
  zap_over_floor: 0 blocked (vacuous)
```

This reproduces the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
