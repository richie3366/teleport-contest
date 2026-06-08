# C oracle: monmove / movemon

**JS modules:** `monmove.js`, `m_move_mon.js`, `mfndpos_mon.js`, `fmon_iter.js`, `monmove_search.js`  
**Phase:** P2  
**C paths:**
- **`nethack-c/upstream/src/mon.c`** — `movemon()`, `movemon_singlemon()` (iter_mons_safe)
- **`nethack-c/upstream/src/monmove.c`** — `dochug`, `m_move`, `distfleeck`
- **`nethack-c/upstream/src/dogmove.c`** — pet `dog_move` inside `dochugw`

**Last C read:** 2026-06-08 — `mon.c` `movemon_singlemon` + post-seventh comma-`U` locator

## Call order (ground truth)

1. Hero turn consumes movement; `allmain.c` may call `movemon()` zero or more times before/after new-turn setup.
2. `movemon()` → `iter_mons_safe(movemon_singlemon)` — fmon newest-first in JS via `fmonListForMovemonLikeC`.
3. `movemon_singlemon`: skip if `movement < NORMAL_SPEED`; spend `NORMAL_SPEED`; gates (`minliquid`, hider, conflict); `dochugw(mtmp, TRUE)`.
4. Pets delegate to `dog_move` from `dochug`; surplus mklev uses `m_move` + ~915 `distfleeck` recalc.
5. **Inline** `movemon` passes vs **deferred** tail are controlled by `allmain.c` / moveloop state — not by `urole.abbr === 'Wiz'` alone.

### Post-seventh comma-`U` pass (`seed0006` ~3107–3136)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet `dog_move` gate `rn2(5)`, `rn2(4)` | `movemonSinglemonLikeC` → pet branch |
| 2 | Pet invent / goal / mfndpos tail ~3109–3131 | `dogMoveCommaPostSeventhNewturnPetTailLikeC` (until general `dogMoveLikeC`) |
| 3 | Surplus mklev `m_move` `rn2(12)` + `distfleeck` `rn2(5)` + away `rn2(12)`×3 | `mMoveCommaUFmonTailDochugLikeC` (not inline peel `rn2`) |

**Batch 1 (2026-06-08):** delete inline PostSeventh peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-eighth comma-`U` pass (`seed0006` ~3140–3171)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet `dog_move` gate `rn2(5)`, `rn2(4)` | `movemonSinglemonLikeC` → pet branch |
| 2 | Pet invent / goal / mfndpos tail ~3142–3165 | `dogMoveCommaPostEighthNewturnPetTailLikeC` (until general `dogMoveLikeC`) |
| 3 | Surplus mklev `rnd(20)` + sameCell `rn2(3)` + `rn2(5)` + away `rn2(12)`×3 | `movemonSinglemonLikeC` surplus branch (not inline peel) |

**Batch 2 (2026-06-08):** delete inline PostEighth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-ninth comma-`U` pass (`seed0006` ~3175–3219)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet `dog_move` gate `rn2(5)`, `rn2(4)` | `movemonSinglemonLikeC` → pet branch |
| 2 | Pet invent / `obj_resists` tail ~3177–3191 | `dogMoveCommaPostNinthNewturnPetTailLikeC` (until general `dogMoveLikeC`) |
| 3 | Surplus mklev `rnd(20)` + floor chain + `rnz(10)` + away `rn2(12)`×3 | `movemonSinglemonLikeC` surplus branch (not inline peel) |

**Batch 3 (2026-06-08):** delete inline PostNinth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-tenth comma-`U` pass (`seed0006` ~3224–3242)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet **`set_apparxy`** only (no **`dog_move`** gate this pass) | `movemonSinglemonLikeC` → pet branch |
| 2 | Surplus mklev **`dochug`** explicit ~3224–3242 | `movemonSinglemonLikeC` surplus branch (not inline peel `rn2`) |

**Batch 4 (2026-06-08):** delete inline PostTenth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-eleventh comma-`U` pass (`seed0006` ~3246–3259)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet **`set_apparxy`** only (no **`dog_move`** gate this pass) | `movemonSinglemonLikeC` → pet branch |
| 2 | Surplus mklev **`dochug`** explicit ~3246–3259 | `movemonSinglemonLikeC` surplus branch (not inline peel `rn2`) |

**Batch 5 (2026-06-08):** delete inline PostEleventh peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-twelfth comma-`U` pass (`seed0006` ~3263–3291)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet **`set_apparxy`** only (no **`dog_move`** gate this pass) | `movemonSinglemonLikeC` → pet branch |
| 2 | Surplus mklev **`dochug`** explicit ~3263–3291 | `movemonSinglemonLikeC` surplus branch (not inline peel `rn2`) |

**Batch 6 (2026-06-08):** delete inline PostTwelfth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-thirteenth comma-`U` pass (`seed0006` ~3296–3306)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet **`set_apparxy`** only (no **`dog_move`** gate this pass) | `movemonSinglemonLikeC` → pet branch |
| 2 | Surplus mklev **`dochug`** explicit ~3296–3306 | `movemonSinglemonLikeC` surplus branch (not inline peel `rn2`) |

**Batch 7 (2026-06-08):** delete inline PostThirteenth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

### Post-fourteenth comma-`U` pass (`seed0006` ~3310–3336)

| Step | C / session | JS target |
|------|-------------|-----------|
| 1 | Pet **`set_apparxy`** only (no **`dog_move`** gate this pass) | `movemonSinglemonLikeC` → pet branch |
| 2 | Surplus mklev **`dochug`** explicit ~3310–3336 | `movemonSinglemonLikeC` surplus branch (not inline peel `rn2`) |

**Batch 8 (2026-06-08):** delete inline PostFourteenth peel block + `mons=[]` guard; route through `movemonSinglemonLikeC`.

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
| `_wizD1CommaPostSeventh*` inline peel + `mons=[]` | `movemon_singlemon` + `dog_move` + surplus `dochug` | `seed0006` 3107–3136 | **deleted** batch 1 |
| `_wizD1CommaPostEighth*` inline peel + `mons=[]` | `movemon_singlemon` + `dog_move` + surplus `dochug` | `seed0006` 3140–3171 | **deleted** batch 2 |
| `_wizD1CommaPostNinth*` inline peel + `mons=[]` | `movemon_singlemon` + `dog_move` + surplus `dochug` | `seed0006` 3175–3219 | **deleted** batch 3 |
| `_wizD1CommaPostTenth*` inline peel + `mons=[]` | `movemon_singlemon` + surplus `dochug` | `seed0006` 3224–3242 | **deleted** batch 4 |
| `_wizD1CommaPostEleventh*` inline peel + `mons=[]` | `movemon_singlemon` + surplus `dochug` | `seed0006` 3246–3259 | **deleted** batch 5 |
| `_wizD1CommaPostTwelfth*` inline peel + `mons=[]` | `movemon_singlemon` + surplus `dochug` | `seed0006` 3263–3291 | **deleted** batch 6 |
| `_wizD1CommaPostThirteenth*` inline peel + `mons=[]` | `movemon_singlemon` + surplus `dochug` | `seed0006` 3296–3306 | **deleted** batch 7 |
| `_wizD1CommaPostFourteenth*` inline peel + `mons=[]` | `movemon_singlemon` + surplus `dochug` | `seed0006` 3310–3336 | **deleted** batch 8 |
| `_wizD1CommaPostFirst` … `PostTwentyFourth*` (rest) | `movemon` + `allmain` post-hero interleave | `seed0006` 2888–3609 | **open** — moratorium on N+1 |
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
- PostFifteenth+ comma-`U` still use inline peel blocks.

## Wrong hypotheses (do not retry)

- **Numbered peel N+1** fixes general `movemon` — it only buys ~20–30 RNG indices.
- **`seed0006` only canary** — regressions on `seed0077` / `seed0102` already observed.
- **Rogue `mnum === 8` for rogue peel** — Rogue is **7**, Ranger **8** (`roles.js`).
