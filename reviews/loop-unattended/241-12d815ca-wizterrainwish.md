# Review 241 — 12d815ca — objnam.c wizterrainwish switch_terrain (D-1279)

## Metadata
- Full / short hash: `12d815ca52fa9fde4f0e3257a9cb77143061ec64` / `12d815ca`
- Parent: `bc4e5a2f` (reviews **237–240**). This file audits **this SHA only**. Archive row **Addressed:** D-1279 `12d815ca` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 14:04:03 +0200
- D-id: **D-1279**
- Stats: 11 files, +372 / −50 — `js/readobjnam.js` +261; `js/zap.js` +7 / −1; comments `js/hack.js`.
- Claims to close: Open `objnam.c` wish `switch_terrain` (named from D-1129 / review **240**). Not doname EGG. `reviews/loop-2026-08-15/` has no unpaid wish Must-fix.
- JS / map: `readobjnam.js` `wizterrainwish` / `readobjnam_wish`; `zap.js` `makewish`; live `hack.js` `switch_terrain`; `c-js-map/turns.md`. Traps / door/wall / drawbridge under named.
- Prior reviews this SHA claims to close: **240** named omit objnam wish after `u_on_rndspot`.

## Intent vs deliverable

Git subject promises: “Match C objnam.c wizterrainwish so a wizard furniture/terrain wish runs switch_terrain after madeterrain, instead of leaving leftover Lev/Fly FROMOUTSIDE.”

C `wizterrainwish` (`objnam.c:3552–3916`): trap loop first (`:3563–3582`); then furniture/terrain else-if (`:3590–3870`); madeterrain postamble (`:3872–3910`) `feel_newsym` / leave-water `set_uinwater(0)` / lava-trap reset / `recalc_block_point` / fountain-sink recount / ice timers / horizontal overlay / **unconditional `switch_terrain()`**. Dispatch: `readobjnam` wiztrap (`:4975–4979`) `wizard && !wizkit_wishing && !d.oclass`. Caller `zap.c` `makewish` (`:6360`, `:6374–6377`) `&hands_obj` skips wishes conduct.

Old JS: object-only `readobjnam`; named omit listed objnam wish.

The diff **does** furniture/liquid/ice/altar/grave/tree/bars/cloud/floor then await live `switch_terrain`, plus `readobjnam_wish` + `makewish` await. It does **not** port the trap loop, door/wall/secret corridor, drawbridge-under mask, lava `pooleffects`, `water_damage_chain` / `fire_damage_chain`, melting-ice timeout, `ice_descr`, `set_wallprop_from_str`, or `looted`/`disturbed` preparse. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `wizterrainwish` | C `:3552–3916`, **new** | furniture envelope + postamble |
| `switch_terrain` | C `hack.c:3178`, **imported live** | D-1129 body; dynamic `import('./hack.js')` |
| `set_uinwater` | C, **imported live** | D-1267; leave-water when `uinwater && !is_pool` |
| `feel_newsym` / `recalc_block_point` / `docrt` | C, **imported live** | |
| `readobjnam_wish` | C wiztrap `:4975–4979`, **new** | sync `readobjnam` stays object-only |
| `makewish` | C `:6360/:6374`, **wired** | `HANDS_OBJ` return before wishes++ |
| `bstrcmpi_end` / `strncmpi_start` / `upstart` | C `BSTRCMPI`/`strncmpi`/`upstart`, **clones** | suffix/prefix |
| `t_at_local` / `deltrap_local` | C `t_at`/`deltrap`, **clones** | same splice as live `trap.js` `deltrap` |
| `CAN_OVERWRITE_TERRAIN` | C `rm.h:320`, **clone** | stairs/ladder; debug override named |
| trap loop / door / wall / SCORR | C `:3563–3845`, **named omit** | Open queue |
| drawbridge under | C `is_dbridge` arms, **named omit** | JS wraps pool/lava/ice/floor with `!is_dbridge` |
| `ice_descr` / melt timeout | C `:3678–3684`, **named omit** | ice arm uses `waterbody_name` |
| `looted`/`disturbed` prefix | C `:4067–4071`, **named omit** | `d.looted` stays 0 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./hack.js')` is relative ESM, not `fs`. Rule #2 clean. **Altar RNG** is the only new gameplay `rn2`: `!rn2(6) ? A_NONE : (rn2(A_LAWFUL+2)-1)` matches C `:3702` short-circuit.

## C ↔ JS fidelity

Pinned C postamble (`objnam.c:3907–3910`):

```
        /* might have changed terrain from something that blocked
           levitation and flying to something that doesn't … */
        switch_terrain();
```

JS: `if (madeterrain) { … await switch_terrain(); }`. Unconditional on madeterrain — not dest-typ gated. Callee is the **same live function** reviews **229–231**/**239–240** already walked (`blocklev` vs leftover BLev/BFly `FROMOUTSIDE`). This is **not** “Match C dispatch, callee is a stub.”

Fountain/throne/sink/altar/tree/bars/cloud: suffix match, typ write, pline, `madeterrain=true`, then postamble. Pool/moat/water/lava/ice: C always enters the arm then branches on `is_dbridge`; JS skips the whole arm on drawbridge (named). Non-dbridge pool: typ+flags0+`del_engr_at`+Hallu-resist `waterbody_name` — matches `:3621–3635`. Missing `water_damage_chain` is named, not a fake `switch_terrain`.

Floor: C `:3846–3869` ROOM if old ROOM/overwrite-furniture/ICE/`is_pool_or_lava`, else dbridge DB_FLOOR, else badterrain. JS `!is_dbridge &&` then the ROOM gate using live `is_pool`/`is_lava`. STONE floor is badterrain in both.

`makewish` `HANDS_OBJ` return before `uconduct.wishes++` matches C `:6374–6377`. Wizkit/mklev keep sync `readobjnam` (C skips terrain when `wizkit_wishing`).

## Hallucinations / overclaim

Subject + D-1279 say furniture/terrain wish runs `switch_terrain` after madeterrain. **The furniture envelope + postamble await are the hunk.** Stamping **Addressed:** D-1279 is fair. Do **not** stamp “Match C trap `maketrap` wish.” Do **not** stamp “Match C door/wall/secret corridor.” Do **not** stamp “Match C drawbridge under / `ice_descr` / `pooleffects`.” Do **not** stamp “Match C `looted` prefix.” Dynamic import is cycle-breaking, not a filesystem read.

## Density

One C function (`wizterrainwish`) minus later arms, plus the wiztrap dispatch wrapper. ~261 JS lines. §2b one-function envelope. Did not glue maketrap PIT morph.

## Branch-by-branch confirm

1. Wizard fountain on STONE: madeterrain; await `switch_terrain`; leftover BLev/BFly clear. Match `:3590–3597` + `:3910`.
2. `magic fountain` / `blessed fountain`: `blessedftn`. Match `:3595`.
3. Non-wizard / wizkit: skip `readobjnam_wish` terrain. Match `:4976`.
4. Throne/sink/altar/tree/bars/cloud: typ+pline+await. Match those arms.
5. Altar unaligned `rn2(6)` then `rn2(3)-1`. Match `:3702`.
6. Pool/moat/WATER non-dbridge: typ+`del_engr`. `water_damage_chain` named skip.
7. Lava non-dbridge: typ+pline. `pooleffects` / `fire_damage_chain` named skip.
8. Ice: typ+`icedpool`+`waterbody_name`. `ice_descr` “solid ice” named skip.
9. Floor on POOL: ROOM + `set_uinwater(0)` if was swimming. Match leave-water.
10. Floor on STONE: badterrain, no `switch_terrain`. Match `:3867–3868`.
11. Trap name / door / wall: fall off the else-if, return null. Named skip.
12. Public Tourist never wizard-wishes terrain. Public-unhit.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `await import('./hack.js')` is relative ESM. Plain ESM.

## Verification

Journal: private canary **25**/25 (C madeterrain `switch_terrain`; JS await; wizard fountain/throne on STONE clear leftover BLev/BFly; magic fountain; non-wizard/wizkit skip; pool/lava/ice/tree/bars/cloud/moat; floor STONE badterrain; floor POOL leave-water; sync `readobjnam` no mutate; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session wizard-wishes furniture with leftover Lev/Fly FROMOUTSIDE. Cadence this audit: full `sessions` at HEAD `7d61ee8b` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.844).

## Actionable C-wrongs

None for Must-fix. The madeterrain await is C `:3910`; the callee is live D-1129, not a no-op. Trap/door/wall/drawbridge are named later arms, not a furniture `switch_terrain` that returns without calling C’s last line.

Named omits (map, not Must-fix):

1. Trap loop `maketrap` (Open `objnam.c` wizterrainwish traps)
2. Door / wall / secret corridor (Open door/wall)
3. Drawbridge under; lava `pooleffects`; water/fire_damage_chain
4. `ice_descr` / melting timeout; `set_wallprop_from_str`; `looted`/`disturbed` preparse

Do not Must-fix “dynamic import instead of a static cycle.” Do not Must-fix “ice pline uses `waterbody_name`.” Do not pull traps this SHA.

## Callers / RNG ledger

C: `readobjnam` wiztrap ← `makewish`. JS: `readobjnam_wish` ← `makewish`. Altar `rn2` only new gameplay RNG. Public fortress is not evidence a wizard replaced STONE with a fountain.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: furniture/terrain wish now awaits live `switch_terrain` after madeterrain; traps / door/wall / drawbridge stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1279 `12d815ca`.
