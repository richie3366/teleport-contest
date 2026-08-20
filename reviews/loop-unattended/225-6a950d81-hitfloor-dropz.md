# Review 225 — 6a950d81 — dothrow.c hitfloor dropz(TRUE) (D-1263)

## Metadata
- Full / short hash: `6a950d81c7edc8c17d38d2c652455b39faf5877b` / `6a950d81`
- Parent: `d977bd91` (reviews **220–224** + cadence **#1600**). JS parent `72757d4c` (D-1262). This file audits **this SHA only**. Archive row **Addressed:** D-1263 `6a950d81` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 08:38:45 +0200
- D-id: **D-1263**
- Stats: 13 files, +185 / −74 — `js/dothrow.js` +67 / −1; `js/do.js` +16 / −10; `js/mkobj.js` +34 / −21 (deleted `hitfloor_horn`); comments `js/hack.js` / `js/dokick.js`.
- Claims to close: Open `do.c` hitfloor `dropz(TRUE)` (named from D-1249 / review **211**). Not container_impact. `reviews/loop-2026-08-15/` has no unpaid hitfloor Must-fix.
- JS / map: `dothrow.js` `hitfloor`; `do.js` `drop` `!can_reach_floor`; `mkobj.js` `hornoplenty` tip; `c-js-map/turns.md`. invent `hold_another_object` / pickup highdrop / toss_up still named.
- Prior reviews this SHA claims to close: **211** named omit hitfloor `dropz(TRUE)` (JS was still `dropy`).

## Intent vs deliverable

Git subject promises: “Match C dothrow.c hitfloor so objects that hit the hero's feet run dropz(TRUE) after breaks and ship, instead of a gentle dropy stub that skips shatter.”

C `hitfloor` (`dothrow.c:606–647`): `IS_SOFT` / `uinwater` / `uswallow` → `dropy` return; altar `doaltarobj` then **continues**; else if `verbosely` WAN_STRIKING `"strike"` else `"hit"` + `surface()` + tseen TRAPDOOR/HOLE/PIT overlay; `hero_breaks(..., BRK_FROM_INV)` return; `ship_object(..., FALSE)` return; `dropz(obj, TRUE)`. Callers this SHA: `do.c:758–772` `drop` `!can_reach_floor` (`freeinv` then `hitfloor(TRUE)`; no `how_lost`; `finesse_ahriman` named); `mkobj.c:2920–2921` horn tip. Other C callers (`invent.c:1303` FALSE, `pickup.c:3810`, toss_up / throwit `dz`, ball, artifact) named.

Old JS: `mkobj.js` `hitfloor_horn` always `dropy` after a thin altar/soft message; `do.js` levitation arm `how_lost=LOST_DROPPED` then `dropx`.

The diff **does** live `hitfloor` in `dothrow.js` and those two callers, and deletes the horn stub. It does **not** wire invent / pickup / toss_up / throwit `dz`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hitfloor` | C `:606–647`, **new** | |
| `drop` `!can_reach_floor` | C `do.c:758–772`, **wired** | no `how_lost` |
| `hornoplenty` tip | C `mkobj.c:2920`, **wired** | deleted `hitfloor_horn` |
| `dropy` / `dropz` | C `do.c`, **imported live** | D-1249 impact on TRUE |
| `doaltarobj` | C `do.c:363–390`, **imported live** | messages only; continues |
| `hero_breaks` | C `dothrow.c`, **imported live** | `breaktest` / `breakobj` |
| `ship_object` | C `dokick.c`, **imported live** | D-0984 partial body |
| `t_at` | C `trap.c`, **imported live** | tseen overlay |
| `hitfloor_surface` | C `dungeon.c` `surface`, **local clone** | ice/fountain/altar/floor/ground |
| `finesse_ahriman` / `float_down` | C `:762–771`, **named omit** | |
| invent / pickup / toss_up / throwit dz | C other callers, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** in `hitfloor` itself; `hero_breaks` / `dropz(TRUE)` reuse existing break/impact RNG.

## C ↔ JS fidelity

Pinned C (`dothrow.c:610–646`):

```
    if (IS_SOFT(levl[u.ux][u.uy].typ) || u.uinwater || u.uswallow) {
        dropy(obj);
        return;
    }
    if (IS_ALTAR(levl[u.ux][u.uy].typ)) {
        doaltarobj(obj);
    } else if (verbosely) {
        ... WAN_STRIKING strike / hit + surface + tseen overlay ...
    }
    if (hero_breaks(obj, u.ux, u.uy, BRK_FROM_INV))
        return;
    if (ship_object(obj, u.ux, u.uy, FALSE))
        return;
    dropz(obj, TRUE);
```

JS matches that order. Soft/water/swallow never reach the verbose pline. Altar `doaltarobj` is C’s message-only body (not a place); then `hero_breaks` / `ship_object` / `dropz(TRUE)` still run. WAN_STRIKING uses `otyp` not a seed name. Trap overlay is `t_at` + `tseen` + the same four `ttyp`s; default keeps `surface`.

`dropz(TRUE)` is live D-1249 (`place_object` then `container_impact_dmg` then `impact_disturbs_zombies`). This is **not** “Match C dispatch, callee is a stub”: glass/eggs in a container can shatter. `hero_breaks` is `breaktest`/`breakmsg`/`breakobj`, not `return 0`. `ship_object` is the D-0984 function (partial shop/hole body is pre-existing, not a no-op `false`).

Caller `drop`: C `freeinv` then `hitfloor(TRUE)` then `return` — **no** `how_lost = LOST_DROPPED` on this arm. JS `freeinv_drop` (invent splice + `freeinv_core`) then `hitfloor(true)` then `ECMD_TIME`. Old `dropx`+`how_lost` is gone. `finesse_ahriman` / `float_down` still named: Heart of Ahriman levhack is not this SHA.

Horn tip: C `!can_reach_floor` → `hitfloor(TRUE)`; else altar `doaltarobj` or drop-to-surface pline then `dropy`. JS the same split; floor-reach path unchanged.

`hitfloor_surface` is a truncated `surface()`: C also names air/pool/lava/bridge/grave/stairs/wall/door (and uses `is_ice` / `SURFACE_AT`). `hitfloor` returns on `IS_SOFT`/`uinwater`/`uswallow` before wording, so air/pool/swallow never hit the clone. Lava/stairs/grave/bridge/door/wall still say `"ground"` instead of C’s word. Wording clone, not a `dropy` that skips shatter.

## Hallucinations / overclaim

Subject + D-1263 say feet-hits run `dropz(TRUE)` after breaks and ship instead of gentle `dropy`. **Live `hitfloor` + two C callers are the hunk.** Stamping **Addressed:** D-1263 is fair. Do **not** stamp “Match C `hold_another_object` / highdrop / toss_up” or “Match C `surface()` for lava/stairs.” Do not stamp “Match C Ahriman `float_down`.” `hitfloor_surface` is documented as a wording helper, not C’s full `surface()`.

## Density

One C function plus the two queued callers. ~60 JS lines in `dothrow.js` + small `drop` / horn rewires. Right size. Did not glue `gulpum`.

## Branch-by-branch confirm

1. Levitation `drop` on ROOM: verbose You drop, `freeinv`, `"hit the floor"`, `hero_breaks`, `ship_object`, `dropz(TRUE)`. Match (no `how_lost`).
2. Soft / pool / swallow: `dropy`, return. Match.
3. Altar: `doaltarobj` flash/land, then breaks/ship/`dropz(TRUE)`. Match.
4. WAN_STRIKING verbosely: `"strike"` not `"hit"`. Match.
5. tseen PIT/HOLE/TRAPDOOR: overlay wording. Match.
6. `verbosely` false (API): skip the hit/strike pline; still breaks/ship/dropz. Match. (This SHA’s callers pass TRUE.)
7. Potion `hero_breaks` true: no `dropz`. Match.
8. `ship_object` eats: no `dropz`. Match.
9. Horn tip `!can_reach_floor`: same `hitfloor(TRUE)`, not `hitfloor_horn` `dropy`. Match.
10. invent / pickup / toss_up / throwit `dz`: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `u.ux,u.uy` is C’s feet, not a recorded session coordinate. Plain ESM. Dynamic `do.js`↔`dothrow.js` import is cycle-breaking, not Node `fs`.

## Verification

Journal: private canary **16**/16 (C order; JS `dropz` TRUE; `dropy` keep; IS_SOFT; WAN_STRIKING; tseen trap door; altar place; `hero_breaks` potion; drop levitation no `how_lost`; verbosely false); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless levitation drop or unreachable-floor horn tip. Cadence this audit: full `sessions` at HEAD `42d50a53` **44**/44.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `hero_breaks` / `ship_object` / `dropz(TRUE)`. Truncated `surface()` is wording after `IS_SOFT`, not a gentle `dropy`.

Named omits (map, not Must-fix):

1. invent `hold_another_object` `hitfloor(FALSE)`; pickup highdrop; toss_up; throwit `dz`; ball litter; artifact
2. `finesse_ahriman` / `float_down`
3. `surface()` lava/stairs/grave/bridge/wall/door + `is_ice` vs `typ===ICE`

Do not Must-fix “JS `freeinv_drop` is not the full `freeinv` symbol.” Do not pull `gulpum`.

## Callers / RNG ledger

C: drop / horn this SHA; others named. JS those two. RNG inside `hero_breaks` / `dropz(TRUE)` (pre-existing). Public fortress is not evidence a levitating hero shattered a chest.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `drop` and horn tip now run live `hitfloor` → `dropz(TRUE)` after breaks and ship; invent/pickup/toss_up stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1263 `6a950d81`.
