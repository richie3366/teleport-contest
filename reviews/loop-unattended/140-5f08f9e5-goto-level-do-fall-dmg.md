# Review 140 — 5f08f9e5 — do.c `goto_level` `do_fall_dmg` (D-1179)

## Metadata
- Full / short hash: `5f08f9e5c838aa4e348138f7ac1f0cd625198f7f` / `5f08f9e5`
- Parent: `4a700d08` (D-1178). This file audits **this SHA only**. Archive row **Addressed:** D-1179 `5f08f9e5` was filled by D-1180.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 21:18:29 +0200
- D-id: **D-1179**
- Stats: 10 files, +123 / −46 — `js/do.js` +36 / −8 (`dist`, falling flag, shaft `losehp`).
- Claims to close: Open queue `do.c` `goto_level` `do_fall_dmg` (named). Not fix_shop_damage. Reviews **127** / **137** named `:1988–1994` after shop catchup. `reviews/loop-2026-08-15/` has no open fall-dmg Must-fix.
- JS / map: `do.js` `goto_level`. Punished `ballfall`; W-tower `u_on_rndspot` bit 2 still named.
- Prior reviews this SHA claims to close: **127** named omit; D-1178 next-port.

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level do_fall_dmg so a trap-door or hole fall rolls d(max(dist,1),6) after shop repair, instead of skipping shaft losehp before pickup.”

Old JS `else if (!at_stairs)` only `u_on_rndspot`; no flag; no shaft `losehp`. C captures `dist = depth(newlevel) - depth(&u.uz)` **before** `assign_level` to `u.uz`; on the trap-door / level-tele / endgame arm, `falling` does `selftouch` then `do_fall_dmg = TRUE`; after `!new` `fix_shop_damage`, `d(max(dist,1), 6)` / `Maybe_Half_Phys` / `losehp("falling down a mine shaft")`; C `losehp` is noreturn on death so `pickup` never runs.

The diff **does** capture `dist` at the top with `up` / `newdungeon`; set the flag after `selftouch` on `falling` in the `!at_stairs` arm; roll after shop catchup; `maybe_half_phys`; `losehp` + `finish_maybe_wail`; fatal `finish_losehp_done` then `return`. It does **not** port Punished `ballfall`, W-tower rndspot bit 2, `kill_genocided`, `run_timers`, or `notice_mon_off`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dist` | C local, **new** | `do.c:1498`; before uz reassignment |
| `do_fall_dmg` flag | C local, **new** | `:1498`, set `:1809` |
| falling `selftouch` | C caller, **new on this arm** | `:1808`; stair-fall `selftouch` already existed |
| shaft `d` / `maybe_half_phys` / `losehp` | C callees, **imported** | `rng.js` `d`; `hack.js` Maybe_Half_Phys / `losehp` |
| `finish_maybe_wail` / `finish_losehp_done` | JS split of C `losehp` | same encoding as stair `rnd(3)` in this function |
| `u_on_rndspot(up ? 1 : 0)` | C call, **partial** | C ORs `was_in_W_tower ? 2 : 0` (`:1804`) — named omit |
| `ballfall` | C caller, **named omit** | `:1806–1807` `Punished && !welded(uball)` |
| portal / stairs arms | C, **untouched** | falling through a portal does **not** set the flag in C |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. `d(n,6)` is the C dice helper, not a trace index. Rule #2 clean.

**New RNG on this path:** `d(max(dist,1), 6)` only when `falling` on the rndspot arm. Stair encumbrance fall remains `rnd(3)` (pre-existing). Non-falling level change: **zero** extra dice.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No trace-index gates. Do not roll shaft dice on stair descent (C uses `rnd(3)` there, already ported). Do not set the flag on the portal arm. Do not run `pickup` after fatal `losehp`. Do not pull `ballfall` or W-tower bit 2 into a line that said “Not fix_shop_damage.”

## C ↔ JS fidelity

### `dist` vs `do.c:1488–1498`

C:

```
up = (depth(newlevel) < depth(&u.uz)),
…
int dist = depth(newlevel) - depth(&u.uz);
boolean do_fall_dmg = FALSE;
```

Both are computed **before** mysteryforce may rewrite `newlevel` and **before** `assign_level(&u.uz, newlevel)`. If mysteryforce changes the dest, `dist` is the **original** delta. JS `const dist = depth_of(newlevel) - depth_of(u.uz)` next to `up` matches that staleness. Do not recompute `dist` after uz assignment.

### Set flag vs `:1803–1810`

C:

```
} else { /* trap door or level_tele or In_endgame */
    u_on_rndspot((up ? 1 : 0) | (was_in_W_tower ? 2 : 0));
    if (falling) {
        if (Punished && !welded(uball))
            ballfall();
        selftouch("Falling, you");
        do_fall_dmg = TRUE;
    }
}
```

This `else` is after `if (portal && !In_endgame)` and `else if (at_stairs && !In_endgame)`. JS already had `if (portal && !In_endgame)` / `else if (at_stairs && !In_endgame)` / `else if (!at_stairs)`. The new `if (falling) { selftouch; do_fall_dmg = true; }` sits in that third arm.

Trap-door / hole: `at_stairs` false, `portal` false → both hit rndspot + flag. Match the Open item.

C W-tower bit 2 on `u_on_rndspot` is still missing (`up ? 1 : 0` only). Named in the hunk comment. Pre-existing placement omit; this SHA did not claim it.

C `ballfall` before `selftouch` still missing. Named. Order if both were present: ballfall then selftouch then flag. JS selftouch then flag. Without `ballfall`, selftouch-then-flag matches the remaining C statements.

Portal + `falling`: C stays in the portal arm and **does not** set `do_fall_dmg`. JS portal arm likewise does not set it. Match.

`In_endgame && at_stairs`: C’s `at_stairs && !In_endgame` fails, so C takes the else (rndspot). JS `else if (!at_stairs)` **skips** rndspot. That hole is **pre-existing**, not introduced by the flag. Not this Open line (trap-door/hole). Map/named on endgame placement; do not Must-fix it here.

Stair down encumbrance: C `losehp(Maybe_Half_Phys(rnd(3)), …)` + `selftouch` and does **not** set `do_fall_dmg`. JS stair arm unchanged. Shaft dice are not double-charged on stairs. Match.

### Roll vs `:1988–1996`

C:

```
if (do_fall_dmg) {
    int dmg = d(max(dist, 1), 6);
    dmg = Maybe_Half_Phys(dmg);
    losehp(dmg, "falling down a mine shaft", KILLED_BY);
}
(void) pickup(1);
```

JS: same slot after `!madeNew` `fix_shop_damage`. `d(Math.max(dist | 0, 1), 6)` — C `d` is n dice of x sides, logged as `d(n,x)=`; JS `rng.js` `d` matches (inner `RND`, one log). `maybe_half_phys` is `HHalf_physical_damage \|\| EHalf_physical_damage` then `((dmg+1)/2)` trunc — C `Maybe_Half_Phys` / `Half_physical_damage` is the same H\|\|E (`youprop.h:341`). Stale comment in `hack.js` (“identity”) is wrong about the **code**; the code matches C. Not a C-wrong of this peel.

`losehp(..., KILLED_BY)` killer string matches. JS then `await finish_maybe_wail()` (C `maybe_wail` inside `losehp`) and if `_losehp_needs_done` awaits `finish_losehp_done` and **returns** — C `done(DIED)` is noreturn, so `pickup` is skipped. Surviving falls fall through to `pickup(1)`. Match. Same split as the stair `rnd(3)` arm in this function.

`max(dist, 1)`: going down a hole, `dist` is positive. If `dist` were 0 or negative, both clamp to 1 die. Match.

| Case | C | JS after |
|------|---|---------|
| stairs down, unencumbered | no flag, no shaft `d()` | **same** |
| stairs down, Punished/encumber | `rnd(3)` + `selftouch`, no flag | **same** (pre-existing) |
| trap-door `falling`, survive | `selftouch`; after catchup `d(n,6)` then pickup | **same** |
| trap-door `falling`, fatal | `losehp` noreturn; no pickup | **same** (`finish_losehp_done` + return) |
| `falling` false on rndspot (levelport) | no flag | **same** |
| portal arrival | no flag | **same** |
| `dist` after mysteryforce rewrite | still original delta | **same** |
| Punished `ballfall` | before `selftouch` | **named skip** |
| W-tower bit 2 | OR into `u_on_rndspot` | **named skip** |

`d(n,6)` for a one-level hole is `d(1,6)` (`max(1,1)`). Two-level fall is `d(2,6)`. JS `d` loops `n` times with inner `RND(x)` and one log line, matching C’s PRNG log shape. Do not replace it with `n * rnd(6)` (wrong distribution and log).

Leave-level `impact_drop` on `falling` (`do.c:1612–1613`) is a different site (before save). Not this Open line. Still named if absent.

## Hallucinations / overclaim

D-log / CURRENT / subject say a trap-door or hole fall rolls `d(max(dist,1),6)` after shop repair instead of skipping shaft `losehp`. **That is the hunk:** flag at C `:1809` plus dice at `:1988–1994`. Stamping **Addressed:** D-1179 is fair for the Open **do_fall_dmg** line. Hash `5f08f9e5` is on the archive row (filled by D-1180). Do **not** stamp it as “Match C `ballfall`” or “Match C W-tower bit 2” or “Match C `kill_genocided`.” This is **not** “Match C dispatch, callee is a stub”: `d` / `maybe_half_phys` / `losehp` are live; there is no separate `do_fall_dmg` function in C either (it is a flag + inline dice).

Comment “trap door / level_tele / In_endgame → u_on_rndspot” overstates the JS guard (`!at_stairs` only). The **flag** is still on the trap-door path the Open item named.

## Density

One C flag plus the two sites that define it (set on falling rndspot; roll after catchup). ~25 JS lines of behavior. Right-size §2b. Dist capture belongs in the same peel (without it, post-uz depth is 0). Did not pull `ballfall`. Not QUALITY-RISK.

## Verification

Journal: green+strict seed8000/0900; cohort **10**/10 (green + 1500/1800/0015/0002/0014/2200/4500/0367). Path **public-unhit** unless a session falls through a hole/trap door. Non-falling `goto_level` (stairs in seed0700 / tours) exercises the flag-false path: no extra `d()`. Cadence **#1500** **44**/44 confirms no injected shaft dice on the public set.

C read of `do.c:1488–1498`, `:1722–1810`, `:1985–1996`, `hack.h:1236–1238`, `youprop.h:339–341`; JS SHA `goto_level` dist/flag/roll. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838.

## Actionable C-wrongs

None that Must-fix this next iter. The Open shaft roll matches `:1988–1994`. Flag set matches the trap-door arm. Callees are real.

Named omits / do-nots (map / Open, not Must-fix):

1. Punished `ballfall` (`do.c:1806–1807`).
2. W-tower `u_on_rndspot` bit 2 (`:1804`).
3. `kill_genocided_monsters` / `run_timers` / `notice_mon_off`.
4. Pre-existing `In_endgame && at_stairs` rndspot skip (not this flag).
5. Do not roll `d(n,6)` on stair `rnd(3)` falls. Do not pickup after fatal shaft `losehp`. Do not pull telemsg into this SHA — **Addressed:** D-1180 `665bbe09`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: trap-door/hole arrival now sets C’s `do_fall_dmg` after `selftouch` and rolls `d(max(dist,1),6)` `Maybe_Half_Phys` `losehp` after shop catchup before pickup, skipping pickup on death, while `ballfall` and W-tower bit 2 stay named.
- Must-fix stays empty for this SHA; next port in this window popped Open telemsg. **Addressed:** D-1179 `5f08f9e5`. Not fix_shop_damage, not `ballfall`.
