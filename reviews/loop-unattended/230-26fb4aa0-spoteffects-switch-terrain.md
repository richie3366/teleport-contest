# Review 230 — 26fb4aa0 — hack.c spoteffects dest-typ switch_terrain (D-1268)

## Metadata
- Full / short hash: `26fb4aa0b8f52bb94cb46a7bdd12b99b359b5212` / `26fb4aa0`
- Parent: `f7676db6` (D-1267). This file audits **this SHA only**. Archive row **Addressed:** D-1268 `26fb4aa0` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 10:39:40 +0200
- D-id: **D-1268**
- Stats: 10 files, +126 / −51 — `js/pickup.js` +21 / −8 (`spoteffects` gate); comments `js/hack.js`.
- Claims to close: Open `hack.c` `spoteffects` `switch_terrain` (named from D-1129 / reviews **221**/**229**). Not dissolve_bars. `reviews/loop-2026-08-15/` has no unpaid spoteffects Must-fix.
- JS / map: `pickup.js` `spoteffects`; live `hack.js` `switch_terrain`; `c-js-map/turns.md`. `digactualhole` / dothrow hurtle / `u_on_rndspot` / objnam wish named.
- Prior reviews this SHA claims to close: **221** named omit `spoteffects` after `dissolve_bars`.

## Intent vs deliverable

Git subject promises: “Match C hack.c spoteffects so dest-typ or MAX_TYPE runs switch_terrain before pooleffects, instead of leaving Lev/Fly FROMOUTSIDE stale after a terrain change.”

C `spoteffects` (`hack.c:3342–3349`): after capturing `spotterrain = levl[u.ux][u.uy].typ`, `if (spotterrain != levl[u.ux0][u.uy0].typ || iflags.terrain_typ == MAX_TYPE) switch_terrain();` then `pooleffects(TRUE)`. Comment: level change sets `<ux0,uy0>` to `<ux,uy>` so dest==origin, **and** sets `iflags.terrain_typ = MAX_TYPE` (`dungeon.c` `u_on_newpos` `:1588–1593`; `end_running` `:4141–4143` only when `flags.terrainstatus`). Body live D-1129.

Old JS: `spoteffects` started at `pooleffects(true)`.

The diff **does** the dest-typ / MAX_TYPE **reader** before `pooleffects`. It does **not** write `MAX_TYPE` in `u_on_newpos` / `end_running`. Those writers were already named on `classify_terrain`. The MAX_TYPE arm is therefore dead in production unless a canary pokes the flag.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spoteffects` dest-typ gate | C `:3345–3347`, **wired** | |
| `switch_terrain` | C `:3178`, **imported live** | |
| `pooleffects(TRUE)` after | C `:3349`, **pre-existing** | leave-water still named |
| `MAX_TYPE` (37) | C `rm.h:94`, **imported** | `const.js` |
| `u_on_newpos` `MAX_TYPE` write | C `dungeon.c:1593`, **named omit** | JS `mklev.js` still ux/uy only |
| `end_running` `MAX_TYPE` | C `hack.c:4142`, **named omit** | classify only |
| recursion / Warning ice / hidden mon | C `:3324–3336` / later, **named omit** | |
| `digactualhole` | **named omit** this SHA | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.**

## C ↔ JS fidelity

Pinned C (`hack.c:3342–3349`):

```
    /* moving onto different terrain might cause Lev or Fly to toggle;
      level change sets <ux0,uy0> to <ux,uy>, so this spotterrain
      check always fails then, but it also sets iflags.terrain_typ */
    if (spotterrain != levl[u.ux0][u.uy0].typ
        || iflags.terrain_typ == MAX_TYPE)
        switch_terrain();

    if (pooleffects(TRUE))
        goto spotdone;
```

JS: `dest.typ !== orig.typ` via `level.at(ux,uy)` vs `at(ux0,uy0)`, or `iflags.terrain_typ === MAX_TYPE` (`| 0` so undefined≡0, not 37). Then await live `switch_terrain`, then `pooleffects(true)`. `cmd.js` `domove` still snapshots `ux0/uy0` before the step, so a ROOM→STONE walk sees dest≠origin. Match the dest-typ arm.

Callee is live: walking onto `IS_OBSTRUCTED` / closed door / waterwall / lavawall sets `FROMOUTSIDE`; walking off clears it. This is **not** “Match C dest-typ, callee is a stub.”

MAX_TYPE arm: C `u_on_newpos` when `!on_level(&u.uz,&u.uz0)` assigns `ux0=ux` **and** `iflags.terrain_typ = MAX_TYPE` so the first post-arrival `spoteffects` still runs `switch_terrain`. JS `u_on_newpos` is `ux=x; uy=y` only. Grep of scored `js/` shows **no** `terrain_typ = MAX_TYPE` (only `classify_terrain` storing a real typ). The `|| MAX_TYPE` check is compiled C that JS copied and never triggers. D-log “MAX_TYPE same-typ still runs” is a canary that poked the flag, not a production writer. Named omit of the writers, not a clone that sets a fake typ.

`inspoteffects` recursion, `in_lava_effects` defer, Warning ice, hidden-monster surprise stay named. `pooleffects` still uses sticky `u.Levitation`/`u.Flying` on enter (pre-existing; leave `set_uinwater` named D-1267). Do not treat that as this SHA inventing a drown.

## Hallucinations / overclaim

Subject + D-1268 say dest-typ **or MAX_TYPE** runs `switch_terrain` before `pooleffects`. **Dest-typ + live callee are the hunk.** Stamping **Addressed:** D-1268 is fair for walking onto different `lev.typ`. Do **not** stamp “Match C `u_on_newpos` / `end_running` `MAX_TYPE` write” or “Match C level-change `switch_terrain` when dest==origin.” Do not stamp “Match C `digactualhole`” (next SHA). `MAX_TYPE===37` is C’s enum, not a trace index.

## Density

One C gate in the function C ties to `pooleffects`. ~15 JS lines. Right size. Did not glue `digactualhole`.

## Branch-by-branch confirm

1. ROOM→ROOM same typ: skip. Match.
2. ROOM→STONE: `blocklev`, You_cant Lev/Fly if floating. Match.
3. STONE→ROOM with leftover `FROMOUTSIDE`: clear bits, maybe `float_up`. Match dest-typ.
4. Closed door dest: `blocklev`. Match.
5. CORR→ROOM: not `blocklev`, quiet unless leftover bits. Match.
6. `pooleffects` still after the gate. Match order.
7. MAX_TYPE with dest==origin: C runs; JS only if something writes 37 — **production never does**. Named writer skip.
8. Recursion / ice Warning / hidden mon: still named. Match the skip.
9. `digactualhole` / hurtle / `u_on_rndspot` / wish: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `ux0,uy0` are C’s previous cell, not recorded session coordinates. Plain ESM.

## Verification

Journal: private canary **13**/13 (C dest-typ/MAX_TYPE before pooleffects; JS await order; same-typ skip; ROOM→STONE You_cant; leftover BLev/BFly clear; closed door; MAX_TYPE same-typ still runs **in the canary**; CORR→ROOM quiet; named omits; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session walks onto `blocklev` while Lev/Fly (`terrainstatus` default Off keeps classify quiet). Cadence this audit: full `sessions` at HEAD `a4aa34d3` **44**/44 Scr **11,405**/11,405 RNG **100%**. Admit the MAX_TYPE canary is not a public level-change.

## Actionable C-wrongs

None for Must-fix. Dest-typ dispatch through live `switch_terrain`. Dead MAX_TYPE **reader** without the C writers is the named `u_on_newpos` / `end_running` omit, not a gate that calls a no-op.

Named omits (map, not Must-fix):

1. `dungeon.c` `u_on_newpos` `iflags.terrain_typ = MAX_TYPE` when `!on_level(uz,uz0)`; `end_running` MAX_TYPE+`classify_terrain`
2. `inspoteffects` / `in_lava_effects`; Warning ice; hidden monster
3. `digactualhole` PIT/HOLE (next SHA); dothrow hurtle; `u_on_rndspot`; objnam wish

Do not Must-fix “JS compares `level.at` not `spotterrain` local.” Do not Must-fix pooleffects sticky `u.Levitation` on this SHA.

## Callers / RNG ledger

C: `domove` after occupy, `float_up` while `uinwater`, others. JS `pickup.js` `spoteffects` same sites. No RNG in the gate. Public fortress is not evidence a levitating hero stepped onto stone.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: dest-typ now awaits live `switch_terrain` before `pooleffects`; MAX_TYPE still needs the `u_on_newpos` writer.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1268 `26fb4aa0`.
