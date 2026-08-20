# Review 229 — f7676db6 — hack.c set_uinwater switch_terrain (D-1267)

## Metadata
- Full / short hash: `f7676db6d281ef1d2c4dada2fd8284ba3f44ba17` / `f7676db6`
- Parent: `5866ae70` (reviews **225–228** + cadence **#1605**). JS parent `42d50a53` (D-1266). This file audits **this SHA only**. Archive row **Addressed:** D-1267 `f7676db6` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 10:25:09 +0200
- D-id: **D-1267**
- Stats: 12 files, +136 / −45 — `js/hack.js` +25 / −4 (`set_uinwater`); `js/do.js` +9 / −3; `js/trap.js` +6 / −5; comments `js/pickup.js`.
- Claims to close: Open `hack.c` `set_uinwater` `switch_terrain` (named from D-1129 / review **221**). Not dissolve_bars. `reviews/loop-2026-08-15/` has no unpaid set_uinwater Must-fix.
- JS / map: `hack.js` `set_uinwater`; callers `do.js` `boulder_hits_pool` / `goto_level`; `trap.js` `drown`; `c-js-map/turns.md`. pooleffects leave / drown Amphibious wade / zap freeze named.
- Prior reviews this SHA claims to close: **221** named omit `set_uinwater` after `dissolve_bars`.

## Intent vs deliverable

Git subject promises: “Match C hack.c set_uinwater so changing u.uinwater runs switch_terrain, instead of leaving Lev/Fly FROMOUTSIDE and classify xSUBMERGED stale.”

C `set_uinwater` (`hack.c:3221–3227`): `if (in_out != (int) u.uinwater) { u.uinwater = in_out ? 1 : 0; switch_terrain(); }`. Same-value is a no-op. `switch_terrain` (`:3178–3217`) already live (D-1129 / D-1151). Callers this SHA: `do.c` `boulder_hits_pool` `:128`; `trap.c` `drown` `:5170` fail-crawl; `do.c` `goto_level` `:1621` leave + `:1716` after getlev. Other C callers (`pooleffects` `:3263`, drown Amphibious `:5122` / post-rescue `:5196`, `zap.c:5296`, `objnam.c:3878`, `cmd.c:1030`) named. detect/save bypass (write `u.uinwater` directly).

Old JS: `u.uinwater = 0` in `boulder_hits_pool`; `= 1` in `drown`; `goto_level` never cleared it.

The diff **does** the function plus those four live sites. It does **not** port pooleffects leave-water or drown wade. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_uinwater` | C `:3221–3227`, **new** | |
| `switch_terrain` | C `:3178`, **imported live** | D-1129 |
| `boulder_hits_pool` dry-land | C `do.c:128`, **wired** | |
| `drown` fail-crawl | C `trap.c:5170`, **wired** | after “But in vain.” |
| `goto_level` leave | C `do.c:1621`, **wired** | |
| `goto_level` after getlev | C `do.c:1716`, **wired** | |
| pooleffects leave | C `hack.c:3263`, **named omit** | |
| drown Amphibious wade / rescue | C `:5122` / `:5196`, **named omit** | |
| zap freeze / objnam wish / cmd | C other callers, **named omit** | |
| detect/save bypass | C writes field, **named keep** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG.** `switch_terrain` has none.

## C ↔ JS fidelity

Pinned C (`hack.c:3221–3227`):

```
void
set_uinwater(int in_out)
{
    if (in_out != (int) u.uinwater) {
        u.uinwater = in_out ? 1 : 0;
        switch_terrain();
    }
}
```

JS: `in_out !== (u.uinwater | 0)` then write 0/1 then await live `switch_terrain`. Extra `if (!u) return` is JS null-game, not a skipped change-gate. Same-value skip matches C. This is **not** “Match C dispatch, callee is a stub”: `switch_terrain` still sets/clears `BLevitation`/`BFlying` `FROMOUTSIDE` and may `float_up` / “start flying.”

`boulder_hits_pool`: C `fills_up && u.uinwater && distu==0` → `set_uinwater(0)` then `docrt` / vision / dry-land pline. JS the same order.

`drown`: JS body is still the first-entry + crawl/Pheew/`teleds` envelope. After “But in vain.” (or no crawl), C `:5170` `set_uinwater(1)` then “You drown.” then `done(DROWNING)` loop then maybe `:5196` `set_uinwater(0)`. JS now awaits the `:5170` setter then plines drown and **returns true**. The drowning `done` loop / post-rescue clear stay named — a fail-crawl now runs `switch_terrain` on the pool/waterwall cell (POOL is not `blocklev`; WATERWALL is). That is the claimed hunk, not a fake drown.

`goto_level`: C after `unplacebc` / `reset_utrap` / `fill_pit` / `set_ustuck` then `:1621`; after getlev/mklev `:1716` before `vision_reset`. JS awaits both setters; `reset_utrap` / `fill_pit` / `set_ustuck` / `u.uundetected` stay named. Same-value on an already-dry hero is a no-op (C same). Leave-while-wet now toggles terrain on the departing cell.

## Hallucinations / overclaim

Subject + D-1267 say changing `uinwater` runs `switch_terrain`. **The function + four C sites are the hunk.** Stamping **Addressed:** D-1267 is fair. Do **not** stamp “Match C pooleffects leave-water `set_uinwater(0)`” or “Match C Amphibious wade `:5122`” or “Match C drowning `done` / rescue `:5196`.” Do not stamp “Match C `spoteffects` dest-typ” (next SHA). `async` is the existing D-1129 await, not invented input.

## Density

One C function plus the three queued live callers (goto_level is two sites of one function). ~20 JS lines + rewires. Right size. Did not glue `spoteffects`.

## Branch-by-branch confirm

1. Dry `set_uinwater(0)`: inequality false, no `switch_terrain`. Match.
2. Wet → dry on POOL: write 0, not `blocklev`, clear leftover `FROMOUTSIDE`, maybe `float_up`. Match.
3. Dry → wet on WATERWALL: write 1, `blocklev`, You_cant Lev/Fly + set bits. Match.
4. Boulder fills hero pool: `set_uinwater(0)` then docrt / dry-land pline. Match.
5. Fail-crawl drown: setter then “You drown.” Match `:5170`; `done` loop named.
6. Successful crawl `teleds`: return before `:5170`. Match.
7. `goto_level` already dry: both calls no-op. Match.
8. `goto_level` leave wet: `:1621` runs on old cell. Match.
9. pooleffects walk-out / Amphibious wade: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `in_out ? 1 : 0` is C’s clamp, not a trace. Plain ESM.

## Verification

Journal: private canary **18**/18 (C body+callers; JS inequality+await; same-value skip; POOL xSUBMERGED; WATERWALL You_cant; leftover BLev/BFly clear; POOL+HLev not blocklev; terrainstatus Off skip classify; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session enters or leaves water via those setters (`goto_level` is a no-op when already dry). Cadence this audit: full `sessions` at HEAD `a4aa34d3` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `switch_terrain`. Missing pooleffects / wade callers are named omits, not a setter that writes `uinwater` and skips the call.

Named omits (map, not Must-fix):

1. pooleffects leave-water `set_uinwater(0)` (`hack.c:3263`)
2. drown Amphibious/Breathless/Swimming wade `:5122`; post-rescue `:5196`; `done(DROWNING)` loop
3. zap freeze; objnam wish; cmd leave-level; `spoteffects` dest-typ (next SHA)

Do not Must-fix “JS `goto_level` awaits the setter before named `reset_utrap`.” Do not pull dest-typ this SHA.

## Callers / RNG ledger

C: the four wired + named. JS those four. No RNG. Public fortress is not evidence a boulder drained a pool under the hero.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: changing `uinwater` at the four live C sites now awaits `switch_terrain`; pooleffects leave and drown wade stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1267 `f7676db6`.
