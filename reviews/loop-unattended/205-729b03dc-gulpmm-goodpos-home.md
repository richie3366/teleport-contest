# Review 205 — 729b03dc — mhitm.c gulpmm `!goodpos` return-home (D-1243)

## Metadata
- Full / short hash: `729b03dcdf566b66c589b5a540208f81f11f61ce` / `729b03dc`
- Parent: `509b1355` (D-1242). This file audits **this SHA only**. Archive row **Addressed:** D-1243 `729b03dc` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 01:02:00 +0200
- D-id: **D-1243**
- Stats: 11 files, +130 / −53 — `js/mhitm.js` +37 / −13; `js/teleport.js` +13 / −3.
- Claims to close: Open `mhitm.c` gulpmm `!goodpos` return-home (named from D-1231 / D-1242 / review **193**). Not snuff_lit. `reviews/loop-2026-08-15/` has no unpaid goodpos-gulp Must-fix.
- JS / map: `mhitm.js` `gulpmm` DEF_DIED; `teleport.js` `m_at`; `c-js-map/data.md` / `turns.md`. AD_DGST eat still named at this SHA (D-1244 later).
- Prior reviews this SHA claims to close: **193** named omit `!goodpos` (teleport.js `m_at` still seeing dead fmon).

## Intent vs deliverable

Git subject promises: “Match C mhitm.c gulpmm !goodpos so an engulf that kills the defender on an inhospitable cell returns the swallower home, instead of leaving it on the dest.”

C `gulpmm` DEF_DIED (`mhitm.c:932–947`): if `!goodpos(dx,dy,magr,MM_IGNOREWATER)` and `m_at(dx,dy)==magr`, `remove_monster` + `newsym`, then `dx=ax, dy=ay` (start-of-attack magr cell). Then if `m_at(dx,dy)!=magr`, `place_monster` magr. Then `minliquid` / `mintrap` may `status |= M_ATTK_AGR_DIED`. Occupancy: `goodpos` `m_at` is the **grid**; dead mons are off the map after `relmon`/`mon_leaving_level`. Magr occupying its own dest is allowed (`mtmp2==mtmp && !wormno`).

Old JS: named-omit comment; always `place_monster` magr on dest; `return status|AGR_DIED` on liquid/trap (equivalent outcome, not the `|=` fallthrough). `teleport.js` `m_at` could return a dead fmon still at mx,my, so a naive `goodpos` would treat a hospitable dest as occupied by the corpse.

The diff **does** the C redirect + `status |=` + `teleport.js` `m_at` skip dead/`MON_OFFMAP` (same idea as `mon.js` D-1231). It does **not** pull AD_DGST eat. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gulpmm` DEF_DIED `!goodpos` | C `:932–947`, **wired** | `MM_IGNOREWATER` |
| `goodpos` | C `teleport.c:86–548`, **imported live** | D-1091 pool/lava; occupancy `mtmp2!=mtmp\|\|wormno` |
| `m_at` (teleport.js) | C grid `level.monsters[][]`, **clone aligned** | skip dead/OFFMAP like `mon.js` |
| `m_at` (mon.js) | C grid stand-in, **already live** | gulpmm’s `m_at(dx,dy)===magr` uses this import |
| `minliquid` / `mintrap` | C after place, **imported live** | |
| `remove_monster` / `place_monster` | C `rm.h` / steed, **already live clones** | `MON_OFFMAP` stand-in |
| AD_DGST eat | C `:1096–1116`, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCETRAP` in teleport.js is a pre-existing C flag. Rule #2 clean.

New RNG: `goodpos` eel `rn2(13)` is **skipped** because `MM_IGNOREWATER` is set (`!ignorewater` is false). Water dest is allowed; lava/stone still fail later arms. No extra eel roll on this path.

## C ↔ JS fidelity

Pinned C (`mhitm.c:932–947`):

```
        if (!goodpos(dx, dy, magr, MM_IGNOREWATER)) {
            if (m_at(dx, dy) == magr) {
                remove_monster(dx, dy);
                newsym(dx, dy);
            }
            dx = ax, dy = ay;
        }
        if (m_at(dx, dy) != magr) {
            place_monster(magr, dx, dy);
            newsym(dx, dy);
        }
        if (minliquid(magr)
            || (t_at(dx, dy)
                && mintrap(magr, NO_TRAP_FLAGS) == Trap_Killed_Mon))
            status |= M_ATTK_AGR_DIED;
```

JS copies that, including `status |=` instead of early return. After D-1231 swap, magr is off the JS grid (`MON_OFFMAP`) and the dead defender is skipped by both `m_at`s, so `goodpos` occupancy is empty-or-self like C’s empty grid + magr-on-dest. ROOM dest: `goodpos` true, stay. STONE dest without `may_passwall`: `!goodpos`, home to `ax,ay`. Match.

`gulpmm` uses `mon.js` `m_at` for the `== magr` tests; `goodpos` uses teleport.js’s local `m_at`. This SHA makes the teleport clone skip dead/OFFMAP so occupancy does not see the corpse. Steed skip exists only in `mon.js` (pre-existing); C grid has no mounted steed. Not introduced here.

## Hallucinations / overclaim

Subject + D-1243 say inhospitable gulp dest sends magr home. **Redirect + live `goodpos` + dead-skip `m_at` are the hunk.** Stamping **Addressed:** D-1243 is fair. This is **not** “Match C dispatch, callee is a stub”: `goodpos` is the live D-1091 function. Do **not** stamp “Match C AD_DGST eat” or “Match C `m_at` worm-seg identity with C `level.monsters`.”

## Density

One C arm plus the occupancy clone that arm’s `goodpos` actually calls. ~40 JS lines. Right size. Did not glue digest.

## Branch-by-branch confirm

1. Hospitable ROOM dest: stay; `place_monster` only if `m_at != magr`. Match.
2. STONE dest, magr not wallwalk: home to `ax,ay`. Match.
3. Pool dest: `MM_IGNOREWATER` allows; then `minliquid` may kill. Match.
4. Lava dest, magr not lava-ok: `!goodpos` (ignorelava off), home. Match.
5. Both died: skip this arm. Unchanged C.
6. Bars `engulf_target` still rejects before gulpmm. Unchanged.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **26**/26 (C redirect; JS `goodpos`; dead-first occupancy; ROOM stay; STONE home; bars `engulf_target`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless AT_ENGL gulps a wall-walk victim on stone/lava. Cadence this audit: full `sessions` **44**/44.

## Actionable C-wrongs

None for Must-fix. Redirect through live `goodpos`. Dead-skip is the JS stand-in for C’s empty grid, not a stub that always returns home.

Named omits (map, not Must-fix):

1. AD_DGST eat (later SHA)
2. gulpmu invent snuff / gulpum / `litroom` / pickup
3. teleport.js `m_at` still fmon-fallback (pre-existing vs C grid-only)

Do not Must-fix “call `goodpos` without `MM_IGNOREWATER`.” Do not skip `status |= AGR_DIED` after `minliquid`.

## Callers / RNG ledger

C: `gulpmm` DEF_DIED only. JS same. Public fortress is not evidence a wall-walk gulp fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a killing engulf on an inhospitable cell now returns magr home through live `goodpos(MM_IGNOREWATER)`; digest eat stayed named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1243 `729b03dc`.
