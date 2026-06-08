# Harness / peel debt ledger

**Strategy:** [`.cursor/reports/c-to-js-port-strategy.md`](c-to-js-port-strategy.md) §5–6.  
**Update:** every batch that adds or removes `_*LikeC` / `_*Pending*` / explicit harness `rn2` in moveloop files.

## Baseline (2026-06-08)

| File | `*LikeC` / peel refs (approx) | Notes |
|------|-------------------------------|--------|
| `js/monmove.js` | ~110+ | ~5056 lines; comma-`U` PostFirst…PostTwentyFourth |
| `js/moveloop_turn_advance.js` | ~100 | inline new-turn / PostNth arms |
| `js/dogmove_mon.js` | ~56 | pet comma / search peels |
| `js/moveloop_aux.js` | ~31 | condition-shaped `rn2` tails |

**Moratorium:** **no new** `_wizD1CommaPostTwentyFifth*` (or higher ordinal) / numbered `PostTwenty*` peels. Enforced by [`tools/port-batch-gate.sh`](../../tools/port-batch-gate.sh).

## Net debt rule

| Batch outcome | Ledger |
|---------------|--------|
| Added peel flags | +N; must update oracle “Peels to DELETE” |
| Removed peel band | −N; note C replacement in changelog |
| General C port, no new flags | **target state** — note checklist row |

**Milestone goal:** net **−5** peel bands before resuming `seed0006` deep locator work.

## Deletion queue (priority)

1. `_wizD1CommaPostSeventh` … `PostTwelfth` — merge into `movemon` pass semantics (oracle `monmove.c.md`)
2. `_touristD1*` duplicate distant/near peels — merge with `fmon_iter` order
3. Explicit `rn2(12)×3` “debt” comments — replace with real `mfndpos` / `m_move` paths

## How to count (for handoff)

```bash
rg -c 'LikeC' js/monmove.js js/moveloop_turn_advance.js js/dogmove_mon.js js/moveloop_aux.js
```

Record totals in changelog row when moveloop harness changes.
