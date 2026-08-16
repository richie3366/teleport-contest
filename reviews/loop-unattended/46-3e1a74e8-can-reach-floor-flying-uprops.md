# Review 46 — 3e1a74e8 — `can_reach_floor` Flying via `uprops[FLYING]` (D-1085)

## Metadata
- Full / short hash: `3e1a74e885d3ef943c3d60c2ddfd54a7cae289d7` / `3e1a74e8`
- Parent: `dfe4f198` (review **42–45**). JS-touching since last `reviews/loop-unattended/` file: **this SHA**, D-1086, D-1087, D-1088. This file audits **this SHA only**. Non-`js/` since that review: `08ba0363` / `542990d8` loop-observer (out of scored `js/`).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 15:20:03 +0200
- D-id: **D-1085**
- Stats: 11 files, +120 / −50 — `js/engrave.js` +20 / −11 (`Flying()` only). Live JS is that helper, not a new file.
- Claims to close: Must-fix from review **43** QUALITY-RISK — `engrave.js` `Flying()` must read `uprops[FLYING]`, not H/E flats that `confer_oc_oprop` never writes. Stamped **Addressed:** D-1085 `3e1a74e8` on the archive row (filled by D-1086). `reviews/loop-2026-08-15/` has no open Flying Must-fix.
- JS / map: `engrave.js` `Flying` / `can_reach_floor`. `c-js-map/turns.md` names D-1085. Other modules’ `Flying()` clones still named.
- Prior reviews this SHA claims to close: **43** item 1. Review **44** said do not double-queue Flying on the teeter arm.

## Intent vs deliverable

Git subject promises: “Match C youprop.h Flying so a worn amulet of flying skips the pit gate in can_reach_floor.”

The Must-fix was that one helper. Not `confer_oc_oprop` rewrite. Not steal.c. Not every other `Flying()` clone.

The diff **does** that envelope: OR H/E flats **and** `uprops[FLYING]` intrinsic/extrinsic, keep steed `is_flyer`, keep `!BFlying` / `prop.blocked`. It does **not** copy eat.js’s sticky `if (u.Flying) return true` (that would skip blocked). Comment says confer writes worn `AMULET_OF_FLYING` to uprops and never mirrors `EFlying`.

It does **not** retouch `sit.js` `Flying()` (`land` vs `sit down`). Named, and the Must-fix forbade pulling other clones.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Flying()` | **clone** of `youprop.h:253–255` | now ORs uprops; was H/E-only |
| `FLYING` | C enum, **imported** | `const.js` 49 = `prop.h:71` |
| `is_flyer` | C macro, **imported** | steed arm |
| `can_reach_floor` Flying\|\|MZ_HUGE | C body, **untouched this SHA** | still calls `Flying()` |
| `confer_oc_oprop` | C callee, **untouched** | still no `EFlying` mirror |
| eat.js `Flying()` | sibling clone, **untouched** | already ORs uprops; sticky early-return |
| sit.js `Flying()` | sibling clone, **untouched** | H/E/sticky only; `sit.c:502` land |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in this helper.

## Constitution / playbook

Grep of the `js/engrave.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `FLYING=49` is `prop.h`, not a seed amulet otyp. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Macro — `youprop.h` Flying, then the pit skip

C `youprop.h:247–255`:

```
#define HFlying u.uprops[FLYING].intrinsic
#define EFlying u.uprops[FLYING].extrinsic
#define BFlying u.uprops[FLYING].blocked
#define Flying                                                      \
    ((HFlying || EFlying || (u.usteed && is_flyer(u.usteed->data))) \
     && !BFlying)
```

C `engrave.c:206–207`: `if (Flying || gy.youmonst.data->msize >= MZ_HUGE) return TRUE;` — before `check_pit`.

JS `engrave.js:245–254`:

```
    const prop = u.uprops?.[FLYING];
    const blocked = (u.BFlying | 0) || (prop?.blocked | 0);
    const steedFlyer = !!(u.usteed && is_flyer(u.usteed.data));
    return !!(((u.HFlying | 0) || (u.EFlying | 0)
        || (prop?.intrinsic | 0) || (prop?.extrinsic | 0)
        || steedFlyer)
        && !blocked);
```

In C, H/E/B **are** the uprops fields. In JS they can diverge: `confer_oc_oprop` (`do_wear.js:261–288`) writes every `oc_oprop` to `uprops[p].extrinsic` and mirrors flats only for BLINDED / FAST / TELEPAT / STEALTH / **LEVITATION**. **FLYING is not mirrored.** Grep: no `u.EFlying =` in `js/`. Worn `AMULET_OF_FLYING` (`objects.h` `oc_oprop FLYING`) therefore sets `uprops[49].extrinsic` only.

OR-ing flats **and** the uprops pair is the JS expansion of the C macro. Steed is inside the same `&& !blocked` as C (eat.js returns steed true after a blocked check; equivalent). Sticky `u.Flying` is not a C field and is **not** an early true — review **43** forbade skipping `!blocked` for a leftover sticky bit. Match.

`can_reach_floor` order is unchanged: swallow / hugs / Levitation / unskilled steed / ceiling_hider FALSE / **Flying\|\|MZ_HUGE TRUE** / check_pit FALSE. Amulet of flying now takes the TRUE arm and **skips** teeter/shaft. That is the Must-fix falsifier.

C `engrave.c:187–214` (abbreviated): `uswallow` FALSE; `ustuck && !sticks && AT_HUGS` FALSE; `Levitation && !air/water` FALSE; unskilled `P_RIDING` FALSE; undetected `ceiling_hider` FALSE; **then** Flying\|\|MZ_HUGE TRUE; **then** check_pit. JS `engrave.js:313–344` same order. Unskilled rider still returns before Flying (C `engrave.c:199–201`). Ceiling hider still before Flying so an undetected lurker does not get a Flying TRUE skip. Match. `dosit` still passes `FALSE`, so the pit skip is live for `TRUE` callers (`u_wipe_engr`, eat `floorfood`, lock, `doengrave`), not for `#sit` picnic (D-1073). That is C.

### eat.js sibling — copied the OR, not the sticky true

eat.js `Flying()` (`eat.js:806–815`) ORs uprops but `if (u.Flying) return true` **before** `!blocked`. Review **43** said copy the OR and keep `!blocked`. This SHA did not copy the sticky early-return. Correct. Do not “fix” eat.js this next iter (Must-fix from **48** is sit Antimagic).

### What confer actually writes

`setworn` → `confer_oc_oprop(obj, mask, true)` ORs `mask` into `uprops[oc_oprop].extrinsic`. Amulet slot is `W_AMUL`. Poly flyer still writes `HFlying` via `propset_fromform(FLYING, 'HFlying', …)` (`polyself.js:469`). Both sources now satisfy `Flying()`. Match for the claimed helper.

### RNG

None in `Flying()` or the Flying\|\|MZ_HUGE arm.

## Hallucinations / overclaim

“Match C youprop.h Flying so a worn amulet of flying skips the pit gate” is **true for `engrave.js` `Flying()` and for `can_reach_floor(true)`.** It is **not** true that every `Flying()` in `js/` now reads uprops (`sit.js:508–511` still H/E/sticky for `sit.c:502` land). The Must-fix said do not rewrite those this iter.

This is **not** “Match C dispatch, callee is a stub.” `is_flyer` is real. The clone now reads the field confer actually writes.

Stamping **Addressed:** D-1085 `3e1a74e8` is fair for review **43** item 1. Hash is on the archive row (filled by `89a97acc`).

Private canary (journal): confer amulet skips pit with `EFlying` unset; `BFlying` / `prop.blocked` still block. That is the canary review **43** said D-1082 lacked.

## Density (§2b)

One Must-fix helper. ~12 executable lines. Small, but it is the whole Keep’d C-wrong from **43**. Not “finish youprop.h.” Not steal.c (queue forbade). Right size for a written-review pop.

## Verification

Journal: private canary 20/20 (confer amulet; direct uprops; HFlying; unskilled rider still false; BFlying; MZ_HUGE; shaft; swallow/ceiling still before Flying); green+strict seed8000/0900; cohort **14**/14 + strict 1800/0004/0101/0103/0360/2200/4500. Path **public-unhit**. Cadence **#1385** (this review) **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%).

C read of `youprop.h:247–255`, `prop.h:71`, `engrave.c:206–211`, `do_wear.c:1056–1058` / JS `confer_oc_oprop` 261–288; JS `engrave.js:245–254`/`333–336`, `eat.js:806–815`, `sit.js:508–511`. Hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Path | C Flying / reach | JS after D-1085 |
|------|------------------|-----------------|
| confer amulet, `EFlying` unset, teeter | TRUE / skip pit | **TRUE** |
| poly `HFlying` | TRUE | **TRUE** |
| unskilled flying steed | FALSE (before Flying) | **FALSE** |
| `BFlying` / `prop.blocked` | false Flying | **false** |
| MZ_HUGE, not Flying | TRUE | **TRUE** |

## Actionable C-wrongs

None that Must-fix this next iter. Review **43** item 1 is actually closed.

Named omits / do-nots (map / Open, not Must-fix):

1. `sit.js` `Flying()` for `sit.c:502` `"land"` vs `"sit down"` still H/E/sticky. Do not pull it into `is_pool`.
2. `display.js` `feel_can_reach_floor` still sticky (uses FALSE so check_pit N/A).
3. invent/pickup caller `trap && is_pit` args still named (review **44**).
4. `float_vs_flight` `BFlying` when wearing the amulet under Levitation — C `do_wear.c` after setworn.

Do not restore H/E-only `engrave.js` `Flying()`. Do not rewrite `confer_oc_oprop` to save a youprop clone (D-1060 / D-1085). Do not skip `!blocked`. Do not import `monmove.js` `sticks`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8.5 / 10**
- One sentence: `engrave.js` `Flying()` now ORs `uprops[FLYING]` so a confer-worn amulet of flying skips `check_pit`, matching `youprop.h` without the eat.js sticky-true that would ignore `BFlying`.
- Must-fix stays empty for this SHA; the live Must-fix from this review bundle is D-1087’s sit `Antimagic` clone, not another Flying peel.
