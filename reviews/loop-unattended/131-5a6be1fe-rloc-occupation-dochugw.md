# Review 131 — 5a6be1fe — teleport.c `rloc_to` occupation `dochugw` (D-1170)

## Metadata
- Full / short hash: `5a6be1fe39bb221d43f3ecdec5bbf9a044eb9cc7` / `5a6be1fe`
- Parent: `0f1ce7c6` (D-1169). This file audits **this SHA only**. Archive row **Addressed:** D-1170 `5a6be1fe` was filled by D-1171.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 18:45:28 +0200
- D-id: **D-1170**
- Stats: 11 files, +133 / −40 — `js/teleport.js` +28 / −5 (`rloc_maybe_occupation` + two calls); `js/monmove.js` comment only.
- Claims to close: Open queue `teleport.c` `rloc_to` occupation `dochugw` (named). Not mintrap. Review **125** named `teleport.c:1761–1763`. `reviews/loop-2026-08-15/` has no open rloc-occupation Must-fix.
- JS / map: `teleport.js` `rloc_to` / `rloc_to_flag`; callee `monmove.js` `dochugw` (pre-existing). `c-js-map/turns.md` `teleport.c`. `onscary` in `dochugw` / makemon occupation still named.
- Prior reviews this SHA claims to close: **125** named omit; D-1169 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc_to_core so a busy hero stops occupation when a monster relocates nearby, instead of skipping dochugw(FALSE) between shop bill and mintrap.”

Old JS after angry+bill jumped to trapped `mintrap` (D-1164). C `rloc_to_core` (`teleport.c:1761–1763`) between those arms: `if (go.occupation) (void) dochugw(mtmp, FALSE)`. A newly teleported nearby hostile can interrupt search/dig. Skipping it left the hero busy while C would have stopped.

The diff **does** insert `rloc_maybe_occupation` after bill and before mintrap on both silent `rloc_to` and `rloc_to_flag` (after appear). `chug` is `false`: no `dochug`. It does **not** port `onscary` inside `dochugw` (still stubbed false) or makemon’s occupation caller. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc_maybe_occupation` | C inline, **wrapper** | `teleport.c:1761–1763` |
| `dochugw` | C callee, **imported** | `monmove.c:204–238`; dynamic import (cycle: `monmove.js` already imports `rloc`) |
| `stop_occupation` | C callee, **imported** | `hack.js` via `dochugw`; real pline + clear |
| `noattacks` | C callee, **imported** | `hack.js:309–318`; skips `AT_BOOM` like C |
| `mdistu` | C callee, **local** | `monmove.js:560–564` squared dist; `(BOLT_LIM+1)^2` = 81 |
| `onscary` in `dochugw` | C callee, **named omit** | stubbed false (Elbereth / sanctuary) |
| makemon occupation | C caller, **named omit** | not `rloc_to_core` |
| vanish-msg | C body, **named omit** | still deferred in `rloc_pre_move_msg` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dest is live `mtmp.mx/my` after place, not a traced cell. Rule #2 clean.

**New RNG on this path:** none in the wrapper. `dochugw(FALSE)` does not call `dochug` (no move RNG). `canspotmon` / `couldsee` are predicates. Path **public-unhit** on busy-hero + rloc interrupt.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not call `dochugw(true)` from rloc (that would extra-move the monster). Do not mintrap before occupation. Do not stop occupation when `!go.occupation`. Do not pull `rloc_pos_ok` room lock into this peel.

## C ↔ JS fidelity

### Call vs `teleport.c:1761–1763`

C, after minvent shop bill, before trapped `mintrap`:

```
if (go.occupation)
    (void) dochugw(mtmp, FALSE);
```

JS helper (`teleport.js:686–691`): `typeof game.occupation === 'function'` then dynamic `dochugw(mtmp, false)`. C `go.occupation` is a function pointer; JS stores the occupation fn (`engrave.js` `timed_occupation` / `fn`, `dig.js` `dig`, counted search). `typeof === 'function'` is the live equivalent of non-NULL. Idle is `null`. Match.

Silent `rloc_to` (`:797–801`): angry, bill, occupation, mintrap when `!defer_shk_angry`. `rloc_to_flag` (`:1068–1071`): same four after appear, `if (snap)`. Same-cell early return yields `null` snap / `null` from `rloc_to` — skips occupation like C `:1658–1659`. Match.

C `rloc_to_core` is one function (vanish → place → appear → angry → bill → occupation → mintrap). JS `defer_shk_angry` is a pre-existing split so `rloc_to_flag` can print appear before angry. Adding occupation to **both** sites keeps C order. Do not treat the JS-only flag as a C-wrong.

### Callee vs `monmove.c:204–238`

C `dochugw(mtmp, FALSE)`:

1. Snapshot `x,y = mx,my` (already dest; no `dochug`).
2. `already_saw_mon = (chug && go.occupation) ? canspotmon : 0` → **0** when `chug` is false. Teleport dest is treated as newly spotted.
3. `rd = chug ? dochug : 0` → **0**.
4. Stop if occupation, `!rd`, hostile-or-Hallu, `mdistu <= 81`, `!already_saw_mon || …`, `canspotmon && couldsee(dest)`, `mcanmove && !onscary(u.ux,u.uy,mtmp)`.

JS `dochugw` (`monmove.js:1879–1898`): same snapshot; `already_saw_mon = (chug && game.occupation) ? canspotmon : false`; `rd = chug ? await dochug : 0`; same conjunction minus `onscary` (comment: deferred → not scary). `BOLT_LIM` is 8 (`hack.h:49`). `noattacks` imported from `hack.js` (AT_BOOM-only keeps, like C). Hallu uses `game.u?.Hallucination` (sticky field) vs C `youprop.h` `HHallucination && !Halluc_resistance` — **pre-existing** in this callee, not this SHA’s hunk. `stop_occupation` is the real `hack.js` helper (pline `You stop ${occtxt}` + clear + `nomul(0)`).

**Not** “Match C dispatch, callee is a stub”: `dochugw` is the real stop-if-threat function. `chug FALSE` is the documented “just created or teleported” arm (`monmove.c:207–209`).

`onscary` stubbed false means JS **will** stop on Elbereth/sanctuary where C would keep occupation. Named in the `dochugw` comment and D-log “Not this iter.” Map, not Must-fix. Do not claim Elbereth now matches.

When `chug` is TRUE (ordinary `dochugw` from `movemon`), C snapshots origin `x,y` **before** `dochug` may move `mtmp`, then uses origin for `already_saw_mon` / old `distu(x,y)` and dest for `mdistu` / `couldsee(mx,my)`. This SHA passes FALSE, so origin==dest and `already_saw_mon` is 0: the “could see it before and it was far” disjunct is unused. The teleported cell is always “newly spotted” if occupation is live. Match C `:213` (`chug && occupation`). Do not pass TRUE from rloc — that would `dochug` an extra move C does not take.

`mdistu` / `distu` are squared Chebyshev-not, Euclidean-not: `(dx*dx + dy*dy)`. `BOLT_LIM+1` is 9; threshold 81. Dist 9 orthogonal is 81 (stop); knight-like 9,1 is 82 (keep). Canary 81 vs 82. JS `dist2` / local `mdistu` match. `couldsee` is the vision import (`vision.js`), not `cansee`. `canspotmon` is `monmove.js:872` (Invisible / Detection / telepathy subset). No extra RNG in those predicates.

`stop_occupation` (`hack.js:441–455`) matches C `allmain.c` interrupt: pline `You stop ${occtxt}.` when text is set, clear occupation, `botl`, `nomul(0)`, canned-cmdq clear. `maybe_finished_meal` / `reset_eat` still named at that helper — pre-existing, not this rloc wire. Searching (`dosearch`) and digging (`dig`) store a function + `occtxt`; those are the live busy paths the Open item named.

### Worm vs mintrap

Occupation runs for worms; mintrap still skips `wormno` (D-1164). C same (`:1762` ungated; `:1766` `!wormno`). Canary covered worm occupation-stops and skips mintrap.

## Hallucinations / overclaim

D-log / CURRENT / subject say a busy hero stops occupation when a monster relocates nearby, instead of skipping `dochugw(FALSE)` between bill and mintrap. **That is the hunk:** one imported call at C’s slot. Stamping **Addressed:** D-1170 is fair for the Open **occupation** line. Hash `5a6be1fe` is on the archive row (filled by D-1171). Do **not** stamp it as “Match C `onscary`” or “Match C makemon occupation” or “Match C vanish-msg.” This is **not** “Match C dispatch, callee is a stub.”

## Density

One C call after bill plus the existing callee. ~20 JS lines. Thin vs §2b; queue said “Not mintrap.” Sibling `rloc_to_core` tails stay one-per-iter because the queue forbids combining. Not QUALITY-RISK for thinness.

## Verification

Journal: private canary **38**/38 (C/JS order occupation then mintrap; helper `dochugw(false)`; no fs/FORCE; hostile dest in range stops; idle/peaceful/too-far/`!mcanmove`/unseen/minvis keep; Hallu stops peaceful; `mdistu` 81 vs 82; same-cell skip; adjacent-to-adjacent still stops; AT_BOOM-only keep; thenable; defer until `rloc_to_flag`; dest-bare mintrap still after; worm occupation-stops and skips mintrap); green+strict seed8000/0900; cohort **41**/41 + strict. Path **public-unhit** on busy-hero + rloc interrupt.

C read of `teleport.c:1645–1768` (`:1761–1763`), `monmove.c:204–238`; JS SHA helper + both wrappers + existing `dochugw`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1490**) **44**/44 — ordinary rloc without occupation still matches.

| Case | C | JS after |
|------|---|---------|
| idle (`occupation` NULL) | skip | **same** |
| hostile, dist≤81, canspot dest | `stop_occupation` | **same** |
| peaceful, !Hallu | keep | **same** |
| too far (82) / `!mcanmove` / unseen | keep | **same** |
| `chug` FALSE | no `dochug`; `already_saw=0` | **same** |
| same-cell rloc | skip core | **same** |
| Elbereth `onscary` | keep | **named stub → stop** |
| `rloc_to_flag` | after appear+angry+bill | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open slot matches `teleport.c:1761–1763`. Callee is real `dochugw`.

Named omits / do-nots (map / Open, not Must-fix):

1. `onscary` inside `dochugw` (`monmove.c:234`). Map.
2. makemon occupation `dochugw`. Map.
3. vanish-msg / ustuck-together. Open later.
4. Do not `dochugw(true)` from rloc. Do not mintrap before occupation. Do not pull `rloc_pos_ok` room lock into this SHA — **Addressed:** D-1171 `822498d3`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc_to` now calls real `dochugw(mtmp, FALSE)` after shop bill and before mintrap when the hero is busy, matching C `:1761–1763`, while `onscary` in that callee stays named.
- Must-fix stays empty for this SHA; next port in this window popped Open shk/priest room lock. **Addressed:** D-1170 `5a6be1fe`. Not mintrap, not `onscary`.
