# Review 44 — e6167027 — `can_reach_floor(check_pit)` teeter/shaft (D-1083)

## Metadata
- Full / short hash: `e6167027dc7ae385a58bcf5164564665bea24355` / `e6167027`
- Parent: `453e759c` (D-1082; review **43**). JS-touching since last `reviews/loop-unattended/` file: D-1081, D-1082, **this SHA**, D-1084. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 14:40:36 +0200
- D-id: **D-1083**
- Stats: 14 files, +133 / −74 — `js/engrave.js` +22 / −8 (the `check_pit` arm); `js/trap.js` / `js/sit.js` comments; stamps review **34**. Live JS is that arm plus existing `trap.js` helpers.
- Claims to close: Open queue `engrave.c` `can_reach_floor(check_pit)` teeter/shaft (named from D-1073). Review **34** named omit 1. Stamped **Addressed:** D-1083 `e6167027` on the archive row (filled by D-1084). `reviews/loop-2026-08-15/` has no open check_pit Must-fix.
- JS / map: `engrave.js` `can_reach_floor`; helpers already in `trap.js` (D-1073). `c-js-map` names D-1083; invent/pickup caller `trap && is_pit` and `cant_reach_floor` pit-bottom still named.
- Prior reviews this SHA claims to close: **34** item 1 (wire helpers; do not pull ceiling — already in). Review **43** Flying uprops is a **different** clone, not this arm.

## Intent vs deliverable

Git subject promises: “Match C can_reach_floor so a teetering hero on a seen pit or shaft cannot reach the floor.” Body: the `check_pit && t_at && (uteetering \|\| uescaped)` arm was a no-op; Flying/MZ_HUGE already skip it (D-1082).

The queue line was that helper arm only. Not invent lookhere / `pickup()` caller booleans. Not `cant_reach_floor` “bottom of the pit”. Not ceiling (already shipped).

The diff **does** that envelope: after Flying||MZ_HUGE, `if (check_pit) { t = t_at; if (t && (uteetering_at_seen_pit(t) || uescaped_shaft(t))) return false; }` then `return true`. Helpers imported from `trap.js` (C `trap.c:6648–6664`, review **34** ACCEPT).

It does **not** change `pickup.js:784` `can_reach_floor(true)` vs C `pickup.c:712` `can_reach_floor(t && is_pit(t->ttyp))`. Named. It does **not** change `invent.js:3041` `can_reach_floor(false)` vs C `invent.c:4214` `trap && is_pit`. Named. `pickup.js:1929` `able_to_loot` already passes `!!(t && is_pit)` — C `pickup.c:2048`. `dosit` still passes `false` — C `sit.c` `can_reach_floor(FALSE)`. Picnic skip stays D-1073.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `can_reach_floor` check_pit arm | C body, **retouched** | `engrave.c:209–211` |
| `uteetering_at_seen_pit` | C callee, **imported** | `trap.js:1152–1157`; review **34** |
| `uescaped_shaft` | C callee, **imported** | `trap.js:1163–1166`; review **34** |
| `t_at` | C callee, **imported** | `trap.js` |
| `Flying()` | pre-existing clone, **not this SHA** | review **43** Must-fix |
| invent/pickup caller args | C other sites, **named omit** | `invent.c:4214` / `pickup.c:712` |
| `cant_reach_floor` | C other function, **named omit** | `engrave.c:217–226` pit-bottom string |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in this arm.

## Constitution / playbook

Grep of the `js/engrave.js` / `js/trap.js` / `js/sit.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Contest Rule #2: no Node builtins. Helpers are not re-cloned in engrave (review **34** forbade a second clone).

## C ↔ JS fidelity

### The arm — C `&&` order, no RNG

C `engrave.c:209–213`:

```
    if (check_pit && (t = t_at(u.ux, u.uy)) != 0
        && (uteetering_at_seen_pit(t) || uescaped_shaft(t)))
        return FALSE;

    return TRUE;
```

JS `engrave.js:329–336`: `check_pit` then `t_at` then the same or. Assignment-in-condition vs two statements; short-circuit matches (`t` null → skip helpers). Match.

### Helpers (already C; this SHA only imports)

C `trap.c:6648–6664`: teeter = pit + `tseen` + `u_at` + **not** `utrap && TT_PIT`. Shaft = hole + `tseen` + `u_at`. JS `trap.js:1152–1166`: `is_pit` / `is_hole` from `const.js` (`rm.h`). In-pit `TT_PIT` still reaches (teeter false). Unseen trap still reaches (`tseen` false). `check_pit` false still reaches. Match. Review **34** already walked these call-for-call.

### Flying skip (this SHA relies on D-1082)

C Flying||MZ_HUGE returns TRUE **before** this arm. JS same order. Worn amulet of flying that fails engrave `Flying()` now **hits** this arm and can return FALSE vs C TRUE. That C-wrong is **review 43 item 1**, not a miss in the teeter predicates. Do not double-queue it.

### Caller booleans — named, now live

C `pickup.c:710–712` (main pickup): `t = t_at(...); if (!can_reach_floor(t && is_pit(t->ttyp)))`. `is_pit` is PIT/SPIKED_PIT, **not** hole. A seen **hole** (`uescaped_shaft`) therefore gets `check_pit==false` on that caller and C **still reaches**. JS `pickup.js:784` passes `true` always → D-1083 refuses a seen hole on pickup. C `invent.c:4214` Blind “But you can't reach it!” uses `trap && is_pit`; JS `invent.js:3041` passes `false` so that line never sees teeter.

The D-log named both. Review **34** item 3 said do not expand pickup callers that iter. This SHA followed that. Completing the callee makes the wrong pickup arg **observable**. That is a named omit of a **different C function’s argument**, not a diverging clone of this arm. Map / later Open, not Must-fix on this SHA (Must-fix is the Flying clone from **43**). Do not steal steal.c for a pickup-arg peel until Flying is fixed — a flying hero on a hole would take the Flying TRUE path in C and skip the arg entirely.

`able_to_loot` already matches C. `eat.js` / `lock.js` / `engrave.js` `doengrave` pass `true` like C `engrave.c:266`/`338`/`800`/`1003`. Those sites **should** refuse teeter/shaft. Match.

C `is_pit` / `is_hole` (`trap.h` / `rm.h`): PIT and SPIKED_PIT vs HOLE and TRAPDOOR. `uteetering` uses `is_pit`; `uescaped_shaft` uses `is_hole`. A caller that passes `t && is_pit` therefore **never** asks the helper about a hole. Wiring the helper without fixing `pickup.js:784` inverts that: JS pickup now asks about holes. Named omit of `pickup.c`’s argument, not a wrong `uescaped_shaft` body. Do not “fix” the helper to ignore holes — C `engrave`/`eat`/`lock` `TRUE` callers must still refuse shafts.

`cant_reach_floor(..., check_pit)` “bottom of the pit” when `check_pit && can_reach_floor(FALSE)` (`engrave.c:226`) still named. That second call uses FALSE so it does **not** recurse into teeter; it distinguishes “floor” vs “bottom of the pit” in the pline. Not this arm.

`hack.c:3852` `uteetering_at_seen_pit` on `traphere` (move/pickup adjacent) is a different caller of the **helper**, not of `can_reach_floor`. Pre-existing. Not this SHA.

## Hallucinations / overclaim

“Match C can_reach_floor so a teetering hero on a seen pit or shaft cannot reach the floor” is **true for the helper** and for C-faithful `TRUE` callers. It is **not** true that `pickup()` / Blind lookhere pass C’s `trap && is_pit`, or that `Flying()` is worn-amulet C (review **43**). This is **not** “Match C dispatch, callee is a stub.” `uteetering_at_seen_pit` / `uescaped_shaft` are C bodies at the C home.

Stamping **Addressed:** D-1083 `e6167027` is fair for the Open line. Hash is on the archive row (filled by `83a3ada5`). Review **34** item 1 already stamped.

## Density (§2b)

One Open cluster: C `engrave.c:209–211` plus the existing helpers. ~10 executable lines. §2b “too small” / sibling of D-1082; the Open line was this arm alone and forbade pulling ceiling. Honest split, wasteful. Not “finish pickup callers.”

## Verification

Journal: private canary 16/16 (teeter / in-pit / unseen / shaft / Flying / MZ_HUGE / swallow / Levitation); green+strict seed8000/0900; cohort **14**/14 + strict 1800/0004/0101/0103/0360/2200/4500. Path **public-unhit**. Cadence **#1380** **44**/44 after this SHA.

C read of `engrave.c:187–226`, `trap.c:6648–6664`, `pickup.c:709–716`/`2045–2048`, `invent.c:4198–4216`; JS `engrave.js:305–337`, `trap.js:1152–1166`, `pickup.js:784`/`1929`, `invent.js:3029–3041`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Case | C | JS after |
|------|---|---------|
| `check_pit` false | TRUE (fallthrough) | **TRUE** |
| teeter seen PIT, not Flying | FALSE | **FALSE** |
| in-pit `utraptype==TT_PIT` | teeter false → TRUE | **TRUE** |
| unseen pit | `tseen` false → TRUE | **TRUE** |
| seen HOLE (`uescaped_shaft`) | FALSE at helper | **FALSE** at helper |
| Flying \|\| MZ_HUGE | skip arm, TRUE | **skip if Flying() true** |
| pickup on seen hole | C caller `check_pit` false → TRUE | **JS caller `true` → FALSE** (named) |

Public 0101 engraves; 0004 feeds. Neither is a documented teeter+amulet canary. Admit **public-unhit** for the new arm.

## Actionable C-wrongs

None that Must-fix **this** SHA’s teeter arm. Review **43** item 1 (Flying uprops) remains the live Must-fix family; do not re-prepend it here.

Named omits / do-nots (map / Open, not Must-fix):

1. `pickup.c` `pickup` / `invent.c` lookhere still pass `true`/`false` vs C `t && is_pit`. Hole pickup now refuses in JS. Later Open; not steal.c.
2. `cant_reach_floor` pit-bottom pline; `display.js` `feel_can_reach_floor`.
3. Do not restore the no-op `check_pit` comment. Do not treat in-pit `TT_PIT` as teetering. Do not re-clone the helpers in engrave.js.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the `check_pit` arm now returns FALSE for C `uteetering_at_seen_pit` / `uescaped_shaft` after Flying||MZ_HUGE, using the `trap.js` helpers, while pickup/lookhere caller booleans stay named.
- Must-fix is review **43** Flying uprops, not a second teeter row.
