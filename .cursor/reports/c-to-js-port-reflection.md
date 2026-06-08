# Port self-reflection (overwrite each pass)

**Last run:** 2026-06-08  
**Trigger:** operator asked for reflection cadence; peel batches 1–10 completed; interleave rule activated.

## Signals (last ~10 batches)

| Signal | Reading |
|--------|---------|
| Changelog | Batches 1–10 = same pattern (PostSeventh…PostSixteenth peel **deletes**) — good C template, **bad lane monotony** |
| Harness debt | Net **−10** peel bands; `LikeC` refs **moved** to `m_move_mon.js` — monmove.js not much smaller in spirit |
| Checklist | **49 partial, 0 done** — no row closed; peel work does not advance P1 |
| Score | ~**2/44** — peel deletes preserved canaries; no broad gain expected |
| Strategy drift | Loop kept doing peels past §9 interleave (3-batch rule); **fixed** in handoff 2026-06-08 |

## What worked

- Peel-**delete** template (`movemonSinglemonLikeC` + oracle) is repeatable and canary-safe.
- Operator model + handoff shelves survive context loss.
- `diag_c_rng_callers` gives C file:line without custom binaries.

## What drifted

- **10 peel commits in a row** without P1 mkobj — violated §9 rhythm; next batch must be **P1**.
- Surplus `rn2` tails in `m_move_mon.js` still grow — deletion without full `dochug` is half-measure (acceptable short-term).
- Reflection was chat-only until now — no shelf file.

## Decisions (next ~3 batches)

1. **P1 mkobj / ini_inv** — one checklist row; locator `seed0900` ~302+.
2. **P2 dog_goal** or **PostSeventeenth peel delete** — only after (1).
3. **Milestone score** + dashboard refresh after batch (1) or every **5** batches.

## Drop / defer

- ~~Another peel-only batch before P1~~ — forbidden until interleave done.
- ~~Full `js/` restart~~ — still wrong; localized debt only.
- Deep `seed0006` 3610+ locator — still forbidden until harness net −5 **and** P1 slice landed.

## Oracle hygiene

- Confirm `c-oracles/monmove.c.md` anchor stays **`mon.c`** `movemon` / `movemon_singlemon` (not `monmove.c` loop body only).
- Start **`c-oracles/mkobj.c.md`** rows for whatever P1 batch touches.

---

**Next reflection due:** after **5** more commits **or** pivot trigger (§5) **or** milestone score — whichever comes first. Template: strategy §10.
