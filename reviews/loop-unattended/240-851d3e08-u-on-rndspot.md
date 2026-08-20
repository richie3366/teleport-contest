# Review 240 — 851d3e08 — dungeon.c u_on_rndspot switch_terrain (D-1278)

## Metadata
- Full / short hash: `851d3e08fbc89535db28bfafb1df2283357040a7` / `851d3e08`
- Parent: `20c69ccf` (D-1277). This file audits **this SHA only**. Archive row **Addressed:** D-1278 lacked the short hash; this review commit fills `851d3e08`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 13:27:58 +0200
- D-id: **D-1278**
- Stats: 11 files, +119 / −54 — `js/mklev.js` +13 / −3; `js/do.js` +7 / −3; comments `js/hack.js`.
- Claims to close: Open `dungeon.c` `u_on_rndspot` `switch_terrain` (named from D-1129 / reviews **230**/**231**/**239**). Not dothrow hurtle. `reviews/loop-2026-08-15/` has no unpaid rndspot Must-fix.
- JS / map: `mklev.js` `u_on_rndspot`; `do.js` `goto_level`; live `hack.js` `switch_terrain`; `c-js-map/turns.md`. On_W_tower_level / sstairs / cmd wiz / objnam wish named.
- Prior reviews this SHA claims to close: **239** named omit `u_on_rndspot` after hurtle; **230**/**231** same family from D-1129.

## Intent vs deliverable

Git subject promises: “Match C dungeon.c u_on_rndspot so arriving via place_lregion runs switch_terrain, instead of leaving leftover Lev/Fly FROMOUTSIDE.”

C `u_on_rndspot` (`dungeon.c:1605–1637`): `upflag&1` / `&2`; `was_in_W_tower && On_W_tower_level` uses dndest **exclusion** (`nlx…`); else updest `LR_UPTELE` / dndest `LR_DOWNTELE`; then **unconditional** `switch_terrain()` (`:1636–1637`, comment “might have just left solid rock”). Not dest-typ gated (unlike hurtle / teleds). Callers: `do.c` `goto_level` missing portal `:1736/:1740` both `u_on_rndspot(0)`; trap-door `:1804` `(up?1:0)|(was_in_W_tower?2:0)`; `stairs.c` `u_on_sstairs` `:120`; `cmd.c` wiz `:1045`.

Old JS: `place_lregion` only; named omit listed `switch_terrain after place`. `goto_level` called it without await.

The diff **does** await live `switch_terrain` after place (dynamic `import('./hack.js')` to keep `mklev.js`/`hack.js` acyclic) and awaits both `goto_level` sites. It does **not** add `On_W_tower_level`, W-tower bit 2 at `goto_level` (D-1179), `u_on_sstairs` fallback, or cmd wiz. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `u_on_rndspot` after place | C `:1636–1637`, **wired** | unconditional; function now `async` |
| `switch_terrain` | C `hack.c:3178`, **imported live** | dynamic import; D-1129 body |
| `place_lregion` | C `:1614–1634`, **pre-existing** | still `was_in_W_tower && dndest.nlx` without `On_W_tower_level` |
| `goto_level` portal-missing | C `:1730–1740`, **awaited** | JS one `if (!ttrap)` covers both C branches (`rndspot(0)`) |
| `goto_level` trap-door | C `:1803–1804`, **awaited** | still `up?1:0` without bit 2 (D-1179) |
| `On_W_tower_level` gate | C `:1614`, **named omit** | |
| `u_on_sstairs` → rndspot | C `stairs.c:120`, **named omit** | JS `u_on_upstairs` comment only |
| cmd wiz `u_on_rndspot` | C `cmd.c:1045`, **named omit** | |
| objnam wish `switch_terrain` | C, **named omit** | next Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./hack.js')` is ESM (Node + Chrome), not `fs` / `node:*`. Rule #2 clean. **No new RNG** in the await (`place_lregion` `rn1` is pre-existing, before the call).

## C ↔ JS fidelity

Pinned C (`dungeon.c:1634–1637`):

```
        place_lregion(svd.dndest.lx, ... LR_DOWNTELE, (d_level *) 0);

    /* might have just left solid rock and unblocked levitation */
    switch_terrain();
```

JS: the three place arms (W-tower exclusion if bit2+`nlx`; else updest; else dndest) then `await switch_terrain()`. Unconditional — ROOM/AIR/CORR arrival still runs the body so leftover BLev/BFly `FROMOUTSIDE` from a previous solid-rock cell clears. That is the difference from D-1277’s dest-typ skip. Callee is the **same live function** reviews **229–231**/**239** already walked (`blocklev` vs leftover bits). This is **not** “Match C dispatch, callee is a stub.”

`goto_level` portal-missing: C qexpelled vs `impossible` both call `u_on_rndspot(0)`. JS one await. Same callee/args. Trap-door/tele/endgame: C ORs bit 2 when `was_in_W_tower`; JS still omits bit 2 so the exclusion arm stays dead unless a caller passes `&2`. Named D-1179, not a false `switch_terrain` — when rndspot *does* run, the new await still matches `:1636`. Stairs `u_on_sstairs` never calls JS `u_on_rndspot`; that caller stays named.

`place_lregion` failing all retries: C still `switch_terrain()` after the loops. JS same (await after `place_lregion` returns).

## Hallucinations / overclaim

Subject + D-1278 say arriving via `place_lregion` runs `switch_terrain` instead of leaving leftover Lev/Fly. **The unconditional await after place + `goto_level` awaits are the hunk.** Stamping **Addressed:** D-1278 is fair. Do **not** stamp “Match C `On_W_tower_level` exclusion.” Do **not** stamp “Match C `goto_level` W-tower bit 2.” Do **not** stamp “Match C `u_on_sstairs` / cmd wiz.” Do **not** stamp “Match C objnam wish `switch_terrain`.” Dynamic import is cycle-breaking, not a filesystem read.

## Density

One C call at the end of `u_on_rndspot` plus the two live `goto_level` sites. ~13 JS lines. Same one-caller envelope as D-1277. Did not glue wish.

## Branch-by-branch confirm

1. After place, always await `switch_terrain`. Match `:1636`.
2. ROOM/AIR/CORR landing, leftover BLev: clear + maybe `float_up`. Match body.
3. Quiet arrival, no leftover: body no-ops the `else if (BLevitation)` bits. Match.
4. `upflag&1`: updest `LR_UPTELE` then switch_terrain. Match.
5. `upflag&2` with `nlx`: exclusion place then switch_terrain (gate still not `On_W_tower_level`). Named miss on the `if`, not on the await.
6. Portal missing: `await u_on_rndspot(0)`. Match both C `:1736/:1740`.
7. Trap-door: await without bit 2. Named D-1179; await still runs.
8. `u_on_sstairs` / cmd wiz: not wired. Match the skip.
9. Hurtle dest-typ gate unchanged (D-1277). Match “not this function.”
10. Public stair-with-stairway: may never call rndspot. Public-unhit.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `await import('./hack.js')` is relative ESM. Plain ESM.

## Verification

Journal: private canary **14**/14 (C unconditional after place; JS await after place; ROOM/AIR/maze CORR unblock leftover BLev/BFly; upflag bit 1 updest; HLev then float_up; W-tower bit 2 + nlx exclusion; quiet no leftover; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session arrives via rndspot with leftover Lev/Fly FROMOUTSIDE. Cadence this audit: full `sessions` at HEAD `851d3e08` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.849).

## Actionable C-wrongs

None for Must-fix. Unconditional `switch_terrain` after place is the C line; the callee is live; `goto_level` now awaits the Promise so the body runs before later `goto_level` work. Bit-2 / `On_W_tower_level` / sstairs / cmd are named caller/gate omits, not a rndspot that returns without calling C’s last line.

Named omits (map, not Must-fix):

1. `On_W_tower_level(&u.uz)` around the exclusion `place_lregion`
2. `goto_level` `was_in_W_tower` bit 2 (D-1179)
3. `stairs.c` `u_on_sstairs` fallback `u_on_rndspot(upflag)`
4. `cmd.c` wiz-level `u_on_rndspot`
5. objnam wish `switch_terrain`; `u_on_newpos` `MAX_TYPE`

Do not Must-fix “dynamic import instead of a static cycle.” Do not Must-fix “JS merged the two portal-missing C branches.” Do not pull wish this SHA.

## Callers / RNG ledger

C: `goto_level` / `u_on_sstairs` / cmd wiz. JS: `goto_level` both live sites. Place `rn1` unchanged, before the await. Public fortress is not evidence a trap-door landing unblocked leftover levitation.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `u_on_rndspot` now awaits live `switch_terrain` after `place_lregion`; W-tower bit 2 / sstairs / cmd / wish stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1278 `851d3e08`.
