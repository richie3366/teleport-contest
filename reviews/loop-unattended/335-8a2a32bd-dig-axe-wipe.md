# Review 335 — 8a2a32bd — dig.c use_pick_axe2 u_wipe_engr(3) (D-1375)

## Metadata
- Full / short hash: `8a2a32bdbae9db93b8e2e48456e61eda1b0f8bfb` / `8a2a32bd`
- Parent: `3c140a23` (reviews **331–334** + cadence **#1745**). This file audits **this SHA only** (first of four `js/` commits since review **334**). Archive **Addressed:** D-1375 `8a2a32bd` already has the short hash (filled by D-1376).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 16:08:00 +0200
- D-id: **D-1375**
- Stats: 9 files, +115 / −35 — `js/dig.js` +17 / −5 (import + trap-gated axe-scratch wipe).
- Claims to close: Open `dig.c` `u_wipe_engr` caller (named from D-1360 / review **334**). Not dothrow. `reviews/loop-2026-08-15/` has no unpaid axe-wipe Must-fix.
- JS / map: `dig.js` `use_pick_axe2`; callee `engrave.js` `u_wipe_engr` (D-1051). `c-js-map/turns.md`. uteetering / uescaped_shaft `dotrap` still named.
- Prior reviews this SHA claims to close: **334** named this Open as the leftover wipe sibling after throw_obj.

## Intent vs deliverable

Git subject promises: “Match C dig.c use_pick_axe2 so chopping downward actually wipes the hero-cell engraving via u_wipe_engr(3), instead of leaving dust intact after the scratch.”

C `dig.c` `use_pick_axe2` `:1313–1335` after air/water / `can_reach_floor(FALSE)` / pool-or-lava:

```
    } else if ((trap = t_at(u.ux, u.uy)) != 0
               && (uteetering_at_seen_pit(trap) || uescaped_shaft(trap))) {
        dotrap(trap, FORCEBUNGLE);
        ...
    } else if (!ispick
               && (!trap || (trap->ttyp != LANDMINE
                             && trap->ttyp != BEAR_TRAP))) {
        pline("%s merely scratches the %s.", Yobjnam2(obj, (char *) 0),
              surface(u.ux, u.uy));
        u_wipe_engr(3);
    } else {
        /* start digging downward */
```

Callee `engrave.c` `:264–268`. Constant 3: **no wrapper RNG**. ENGRAVE uses `rn2(1+50/(3+1))` i.e. `rn2(13)`.

Old JS: `else if (!ispick) { scratch pline; }` with **no** trap gate and **no** wipe, then pick-only downward dig. An axe on a LANDMINE/BEAR_TRAP therefore scratched instead of digging.

The diff **does** gate `!ispick && (!trap || ttyp not LANDMINE/BEAR_TRAP)` then scratch + live `u_wipe_engr(3)`. It does **not** port the teetering/`uescaped_shaft` `dotrap` arm. Named. Because that arm is still missing, JS assigns `trap = t_at(...)` inside the axe condition rather than in the omitted teetering `else if`. For every keep-path cell that is not a teetering pit/shaft, that is the same `trap` C would have from `:1322`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `use_pick_axe2` wipe | C `:1335`, **wired** | after scratch pline; cnt=3 |
| `u_wipe_engr` | C `:264–268`, **imported live** | D-1051 |
| LANDMINE/BEAR_TRAP gate | C `:1328–1332`, **wired** | axe then starts downward dig; no wipe |
| pick (`ispick`) down | C `:1336+`, **pre-existing live** | else branch; no wipe |
| air/water / `can_reach_floor` / pool | C `:1313–1321`, **pre-existing live** | before this arm |
| uteetering / uescaped_shaft | C `:1322–1327`, **named omit** | C `dotrap` FORCEBUNGLE; JS may scratch+wipe |
| Underwater / swallowed polish | C earlier, **named omit** | not this arm |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCETRAP` elsewhere in this file is a pre-existing C flag, not this hunk. Rule #2 clean. **New gameplay RNG:** none on the wrapper. Callee may add ENGRAVE `rn2(13)`. DUST / empty / HEADSTONE / Levitation: zero extra dice.

## C ↔ JS fidelity

JS after this SHA, once air/water/reach/pool have been skipped: if `!ispick` and the cell is not LANDMINE/BEAR_TRAP, scratch then `u_wipe_engr(3)`; else start downward occupation. That is C’s keep-path `:1328–1335` vs `:1336`. cnt=3 vs throw cnt=2 is the C distinction (same as melee D-1373). Callee: `can_reach_floor(TRUE)` then `wipe_engr_at(ux,uy,cnt,FALSE)` — live since D-1051.

LANDMINE/BEAR_TRAP: C falls through to downward dig (**no** wipe). Old JS scratched. New JS takes the `else` and starts digging. Match `:1328–1336`.

Pick downward: `ispick` is true so the axe `else if` is false; else-branch dig. No wipe. Match.

Teetering pit/shaft: C `dotrap` **before** the axe test, so it never scratches and never wipes. JS still lacks that arm, so a PIT (not landmine/bear) now **scratches and wipes**. That is the pre-existing missing gate newly also wiping, same shape review **333** refused to Must-fix for `noattacks`/`check_capacity`. The cluster is the teetering `dotrap`, not “delete the wipe.” Named.

Hallucination check: “Match C `use_pick_axe2` wipe” while **`u_wipe_engr` is live** is not a dispatch-stub lie. Do **not** stamp “Match C uteetering `dotrap`.” Do **not** stamp “Match C `Yobjnam2`” (pre-existing `Your ${xname}` scratch text).

## Hallucinations / overclaim

Subject says chopping downward wipes the hero-cell engraving instead of leaving dust after the scratch. **True on the keep-path** for an axe that is not on LANDMINE/BEAR_TRAP when the floor is reachable. **False until named for teetering/shaft** (C `dotrap`s; JS may wipe). Stamping **Addressed:** D-1375 for `:1335` is fair. Do **not** treat fortress PASS as an axe Elbereth smudge.

## Density

One gated call in a function this module already owned, plus an already-live callee. ~17 lines of JS. Playbook §2b thin — fourth sibling wipe Open in a row (D-1372…D-1375). Each was the queued first Open; they did not glue muse camera (next SHA). Process waste vs packing the C wipe callers, but not a C-wrong of this SHA. Did not glue Underwater.

## Branch-by-branch confirm

1. Air/waterlevel: thin-air pline; no wipe. Match `:1313–1315`.
2. `!can_reach_floor(FALSE)`: cant-reach; no wipe. Match `:1316–1317`.
3. Pool/lava: cannot stay under; no wipe. Match `:1318–1321`.
4. Axe, no trap / other trap (not landmine/bear): scratch + cnt=3 wipe. Match `:1328–1335` minus teetering.
5. Axe on LANDMINE/BEAR_TRAP: downward dig; **no** wipe. Match.
6. Pick down: downward dig; **no** wipe. Match.
7. DUST reachable: erode 3 chars. Match.
8. ENGRAVE: `rn2(13)` only. Match `50/(3+1)`.
9. Levitation / no engraving / HEADSTONE: no extra RNG. Match.
10. Teetering pit/shaft: still not `dotrap`. Named. JS may now wipe.
11. apply(2) / dokick(2) / allmain `rnd(3)` / uhitm(3) / throw(2) unchanged. Match.
12. **Public-unhit** unless a session chops down with an axe on a wipeable engraving.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Literal `3` is C’s constant. Plain ESM. Sync callee is C `void`.

## Verification

Journal: private canary **22**/22 (C/JS grep; live DUST smudge via callee and `use_pick_axe2` axe-down; self-hit / pick-down / LANDMINE / BEAR_TRAP do not wipe; no-engraving / HEADSTONE / BURN / Levitation only exercise RNG; ENGRAVE `rn2(13)`; cnt=3 vs throw cnt=2; apply/dokick/allmain/uhitm/dothrow kept; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on axe wipe. This audit cadence: full `sessions` at HEAD `12953730` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not a dust wipe.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The keep-path call matches `:1335`; the callee is live; the LANDMINE/BEAR_TRAP skip matches. Missing **earlier** teetering `dotrap` is a named omit of another cluster.

Named omits (map / not Must-fix):

1. `uteetering_at_seen_pit` / `uescaped_shaft` `dotrap(FORCEBUNGLE)` (`:1322–1327`)
2. Underwater / swallowed attack polish
3. `Yobjnam2` scratch wording (pre-existing)

Do not Must-fix “wipe before the scratch pline” (C does not). Do not Must-fix “cnt=2 like throw/kick” (C axe-scratch is 3). Do not Must-fix “wipe when pick-down” (C does not). Do not Must-fix “wipe on landmine” (C digs).

## Callers / RNG ledger

C: no wrapper RNG; ENGRAVE `rn2(13)` only. JS same on the keep-path. Public fortress never axes down from a wipeable cell.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: an axe chop down now calls live `u_wipe_engr(3)` after the scratch unless the cell is a landmine/bear trap; teetering `dotrap` stays named.
- Must-fix stays empty for this SHA.
