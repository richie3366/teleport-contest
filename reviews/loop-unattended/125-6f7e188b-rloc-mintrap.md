# Review 125 — 6f7e188b — teleport.c `rloc_to` trapped `mintrap` (D-1164)

## Metadata
- Full / short hash: `6f7e188b78996dae614bda9a2ddca3d19c2a5bc1` / `6f7e188b`
- Parent: `d24ff150` (D-1163). This file audits **this SHA only**. The fix stamped **Addressed:** D-1164 without the short hash; this review commit fills `6f7e188b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 15:49:59 +0200
- D-id: **D-1164**
- Stats: 10 files, +127 / −46 — `js/teleport.js` +34 / −5 (`rloc_maybe_mintrap`; call after bill; `NO_TRAP_FLAGS` import).
- Claims to close: Open queue `teleport.c` `rloc_to` trapped `mintrap` (named). Not occupation. Review **121** named trapped `mintrap`. `reviews/loop-2026-08-15/` has no open rloc-mintrap Must-fix.
- JS / map: `teleport.js` `rloc_to` / `rloc_to_flag`; `trap.js` `mintrap` (pre-existing). `c-js-map/turns.md` `teleport.c`. occupation `dochugw`, `m_easy_escape_pit` / boulder / metallivorous already-trapped arms still named.
- Prior reviews this SHA claims to close: **121** named trapped `mintrap`; D-1163 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a trapped monster that relocates runs mintrap (clearing mtrapped off-trap), instead of staying marked trapped with no dest check.”

Old JS after angry+bill left `mtrapped` stuck even when dest had no trap. C `rloc_to_core` (`teleport.c:1765–1767`) after occupation: `if (mtmp->mtrapped && !mtmp->wormno) mintrap(mtmp, NO_TRAP_FLAGS)`. `mintrap` (`trap.c:3737–3740`): no trap → `mtrapped = 0` (“perhaps teleported?”). Dest trap + still `mtrapped` → already-trapped arm (`:3741–3789`), **not** a fresh step-on (`trapeffect_selector` / `rn2(4)` skip). Worms skip. Untrapped monsters landing on a trap do **not** fire here (`postmov` does).

The diff **does** that call after bill (silent `rloc_to`; after appear+angry+bill in `rloc_to_flag`). Occupation `dochugw` (`:1761–1763`) stays named — C runs it **between** bill and mintrap; skipping it does not reorder angry/bill vs mintrap. Dynamic import `trap.js` (cycle).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_maybe_mintrap` | C inline, **wrapper** | `teleport.c:1765–1767` |
| `mintrap` | C callee, **imported** | `trap.c:3733+`; not a no-op |
| `NO_TRAP_FLAGS` | C macro, **imported** | `hack.h:1305` `0x00`; `const.js` `0x00` |
| already-trapped `rn2(40)` | C arm, **pre-existing** | `trap.c:3751`; JS has this |
| `m_easy_escape_pit` | C callee, **named omit** | `trap.c:3726–3729`; JS comment deferred |
| boulder-in-pit / metallivorous | C arms, **named omit** | `trap.c:3752–3788` |
| occupation `dochugw` | C caller, **named omit** | `teleport.c:1761–1763` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean.

**New RNG on this path:** dest **with** a trap and `mtrapped` still set: already-trapped `!rn2(40)` (not fresh `rn2(4)`). Dest **bare**: no RNG, just clear. Path **public-unhit** on a trapped monster rloc off a pit.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. Dest cell is `mtmp.mx/my` after place, not a traced coordinate gate.

## Constitution / playbook

Grep of this SHA’s `js/` hunks: no trace-index gates. Do not call `mintrap` when `!mtrapped` (that would be a fresh step-on). Do not mintrap worms. Do not treat dest trap as `FORCETRAP`. Do not pull occupation `dochugw` into this peel.

## C ↔ JS fidelity

### Call vs `teleport.c:1765–1767`

C: `mtrapped && !wormno` → `mintrap(NO_TRAP_FLAGS)`. After appear, angry, bill, occupation.

JS: same predicate; `NO_TRAP_FLAGS` is `0x00`. Silent `rloc_to` after bill. `rloc_to_flag` after appear+angry+bill (`if (snap)`). Occupation skipped (named) but mintrap still **after** bill. Same-cell `snap` null → no mintrap. Match C early return.

### `mintrap` no-trap / already-trapped vs `trap.c:3737–3789`

C (`trap.c:3737–3751`):

```
if (!trap) {
    mtmp->mtrapped = 0;      /* perhaps teleported? */
} else if (mtmp->mtrapped) {
    /* seetrap pit/bear/hole/web */
    if (!rn2(40) || (is_pit(trap->ttyp) && m_easy_escape_pit(mtmp))) {
```

C no trap: `mtrapped = 0`; default `Trap_Effect_Finished`. JS `:4060–4063` same, explicit return. **This is the peel.**

C already `mtrapped`: maybe `seetrap` for pit/bear/hole/web; then `if (!rn2(40) || (is_pit && m_easy_escape_pit))` climb/boulder/metallivorous. `m_easy_escape_pit` is pit fiend or `msize >= MZ_HUGE` (`trap.c:3726–3729`). JS: same `seetrap` types; **only** `!rn2(40)` (comment: `m_easy_escape_pit` deferred). Pit fiend / `MZ_HUGE` on a dest pit always escape in C (`OR` with `rn2(40)`); JS 1/40. Boulder-in-pit `rn2(2)` + `fill_pit` and metallivorous bear/spike chew are named.

A monster trapped in a pit that rlocs onto a **dart** stays `mtrapped` and takes the already-trapped arm on the dart (no dart `trapeffect`). C same.

That named omit **predates** this SHA (`postmov` already-trapped). The Open item is the **rloc wire**: dest-bare clear, and dest-trap is already-trapped not `trapeffect`. Both hold:

- dest bare → clear, no RNG. Match.
- dest trap, `mtrapped` still 1 → already-trapped arm; does **not** take `already_seen && rn2(4)` / `trapeffect_selector`. Canary dest-dart/pit `rn2(40)` not `rn2(4)`. Match the claim.

Do not Must-fix `m_easy_escape_pit` onto this wire (review **121** youprop rule).

### Not a stub of the claimed dest-bare clear

`mintrap` is the real function used by `postmov`. Wiring rloc is the missing **caller**. `NO_TRAP_FLAGS` matches C `0x00`. Untrapped rloc onto a trap still does not call `mintrap` here — C same (`mtrapped` false).

## Hallucinations / overclaim

D-log / CURRENT / subject say a trapped monster that relocates runs `mintrap`, clearing `mtrapped` off-trap, instead of staying marked trapped with no dest check. **That is the hunk:** `mtrapped && !wormno` → imported `mintrap(NO_TRAP_FLAGS)`. Stamping **Addressed:** D-1164 is fair for the Open **mintrap** line. Fill hash `6f7e188b` in this commit. Do **not** stamp it as “Match C occupation `dochugw`” or “Match C `m_easy_escape_pit`.” This is **not** “Match C dispatch, callee is a stub”: no-trap clear and already-trapped `rn2(40)` are live; easy-escape/boulder/chew are named internals.

`defer_shk_angry` now also defers bill+mintrap. The flag name is JS-only; `rloc_to_flag` order is still appear → angry → bill → mintrap, matching C minus occupation.

## Density

One C call after bill. ~20 JS lines. Thin vs §2b; queue said “Not occupation.” Four sibling `rloc_to_core` tails (region / angry / bill / mintrap) were four iters because the queue forbids combining — process, not a C-wrong. Not QUALITY-RISK for thinness.

## Verification

Journal: private canary **35**/35 (dest-bare clear; free dest pit/dart no step-on; worm skip ± dest trap; same-cell; null; migrating; flag NOMSG/MSG; dest-dart/pit `rn2(40)` not `rn2(4)`; leave-origin-pit; undef; second rloc); green+strict seed8000/0900; cohort **41**/41 + strict 0101/0012/0360/4500/2200/0014/0004/0367/0373/0002. Path **public-unhit** on trapped rloc off a pit.

C read of `teleport.c:1760–1767`, `trap.c:3726–3789`, `hack.h:1305`; JS SHA wrapper + existing `mintrap` already-trapped arm. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1480**) **44**/44.

| Case | C | JS after |
|------|---|---------|
| `!mtrapped` | no call here | **same** |
| worm | skip | **same** |
| dest no trap | clear `mtrapped` | **same** |
| dest trap | already-trapped, not trapeffect | **same** |
| escape gate | `!rn2(40) \|\| easy_pit` | `!rn2(40)` **named** |
| occupation | before mintrap | **named skip** |
| same-cell | no call | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open dest call matches `teleport.c:1765–1767`. `mintrap` no-trap / already-trapped `rn2(40)` is the real C function.

Named omits / do-nots (map / Open, not Must-fix):

1. occupation `dochugw` (`teleport.c:1761–1763`). Open next is hurtle, not this.
2. `m_easy_escape_pit` / boulder-in-pit / metallivorous (`trap.c:3751–3788`) — pre-existing `mintrap` named.
3. Do not mintrap `!mtrapped`. Do not mintrap worms. Do not `FORCETRAP`. Do not restore sticky `mtrapped` after dest-bare rloc.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now runs the real `mintrap(NO_TRAP_FLAGS)` when `mtrapped && !wormno`, so dest-bare clears the flag and dest-trap is already-trapped `rn2(40)` instead of a fresh step-on.
- Must-fix stays empty for this SHA; next port pops Open `dothrow.c` `hurtle_step` `in_out_region`. This review fills archive hash `6f7e188b`. Not occupation.
