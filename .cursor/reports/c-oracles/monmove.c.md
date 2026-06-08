# C oracle: monmove.c

**JS modules:** `monmove.js`, `m_move_mon.js`, `mfndpos_mon.js`, `fmon_iter.js`, `monmove_search.js`  
**Phase:** P2  
**C path:** `nethack-c/upstream/src/monmove.c`  
**Last C read:** 2026-06-08 — `movemon()` (agent: read `movemon` + `dochug` entry before next peel)

## Call order (ground truth)

*Fill while porting — start from C `movemon()`:*

1. Hero turn consumes movement; `allmain.c` may call `movemon()` zero or more times before/after new-turn setup.
2. `movemon` walks monsters (order matters — see `fmon` / level list vs peel pass lists in JS).
3. Per monster: `dochug` → may include `distfleeck`, `m_move`, `mcalcmove` recalc (~915), pet `dog_move` (delegates to `dogmove.c`).
4. **Inline** `movemon` passes vs **deferred** tail are controlled by `allmain.c` / moveloop state — not by `urole.abbr === 'Wiz'` alone.

## Generalization targets (replace comma-`U` peels)

| C concept | JS debt today | Notes |
|-----------|---------------|--------|
| `movemon` monster loop order | `_wizD1Comma*` numbered peels, `passList`, `effStepNum` gates | Locator: `seed0006` — use to **test**, not to **encode** |
| Post-hero surplus `fmon` scan | `SurplusTailPending`, `AwaitSurplusFmon`, … | C: inner `monscanmove` after new-turn |
| Peel-only `movemon(1)` | Dozens of `PostNthMovemonPending` flags | Should be one loop semantics |
| `distfleeck` before/after `m_move` | Per-peel explicit `rn2(12)` debt | Port `m_move` + recalc from C |

## Peels to DELETE (replace with general code)

| JS flag / band | C equivalent | Locator window | Status |
|----------------|--------------|----------------|--------|
| `_wizD1CommaPostFirst` … `PostTwentyFourth*` | `movemon` + `allmain` post-hero interleave | `seed0006` 2888–3609 | **open** — moratorium on N+1 |
| `_touristD1LPostFourth*` etc. | tourist `L` moveloop tail | `seed0900` | partial generalization exists |
| Role `abbr === 'Wiz' && dlevel === 1` guards | level/branch checks only where C has them | — | **smell** — shrink |

## Locator sessions (exercise this file)

| Session | RNG window | What it stresses |
|---------|------------|------------------|
| `seed8000-tourist-starter` | 2900–3129 | Short tourist moveloop |
| `seed0102-ranger-name-cancel` | 0–4485 | Twin `#search`, pet passes |
| `seed0077-rogue-chargen` | 3180–3242 | Rogue `#search`, apport |
| `seed0006-wizard-water-demon` | 2888+ | **Deep** comma-`U` — locator only |

## Open gaps vs C

- Full `dochug` dispatch not faithful — peels patch single arms.
- `fmon` iteration order vs C `monmove` passes not unified.
- `effectiveMovemonStepNum` / peel step numbers are harness — not in C.

## Wrong hypotheses (do not retry)

- **Numbered peel N+1** fixes general `movemon` — it only buys ~20–30 RNG indices.
- **`seed0006` only canary** — regressions on `seed0077` / `seed0102` already observed.
- **Rogue `mnum === 8` for rogue peel** — Rogue is **7**, Ranger **8** (`roles.js`).
