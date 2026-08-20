# Review 278 — 75c08164 — dothrow.c throwit ACURRSTR urange (D-1316)

## Metadata
- Full / short hash: `75c08164b817bdf12ccddc1038bcb9bb09cf2248` / `75c08164`
- Parent: `44a786aa` (D-1315). This file audits **this SHA only**. Archive **Addressed:** D-1316 `75c08164` already has the short hash (filled by D-1317).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 23:17:13 +0200
- D-id: **D-1316**
- Stats: 10 files, +203 / −65 — `js/dothrow.js` +139 / −~35.
- Claims to close: Open `dothrow.c` throwit ACURRSTR urange (named). Not tether. `reviews/loop-2026-08-15/` has no unpaid urange Must-fix.
- JS / map: `dothrow.js` `throwit_calc_range` / `throwit`; `c-js-map/turns.md`. `isqrt(arw->range)` / zap bhit TETHER named.
- Prior reviews this SHA claims to close: **273** named ACURRSTR after tether; **276** said do not pull urange instead of the **275** caller (caller shipped D-1315 first).

## Intent vs deliverable

Git subject promises: “Match C dothrow.c throwit so missile flight range comes from ACURRSTR and object weight, instead of a stub five tiles.”

C `throwit` (`dothrow.c:1613–1672`) in the non-boomhit horizontal arm: `urange = (crossbowing ? 18 : (int) ACURRSTR) / 2`; ball `owt/100` else `owt/40`; attached `uball` ustuck 1 / else cap 5; `range < 1` → 1; ammo+launcher → `BOLT_LIM` if crossbow else `range++`; ammo without launcher and not `GEM_CLASS` → `range /= 2` plus hand-throw pline (`an(skill_name(weapon_type))`, `weapon_descr`, `body_part(HAND)`); air/lev shuffle leftover `urange`; boulder 20 / Mjollnir `(range+1)/2` / tethered `min(range, isqrt(arw->range))` / uball `TT_INFLOOR` 1; `Underwater` → 1. After `bhit` (`:1680–1682`): air/lev `hurtle(-dx,-dy, urange, TRUE)`. `ACURRSTR` is `acurrstr()` (`attrib.h:25`). `Levitation` is `(H\|\|E)&&!B` (`youprop.h:240`). `Underwater` is `u.uinwater` (`:279`).

Old JS: `let range = 5` plus a half-range hand-throw pline that hardcoded bow/crossbow/dart names.

The diff **does** `throwit_calc_range` from strength/weight/ammo/air-lev/boulder/Mjollnir/uball/underwater, post-fly recoil `hurtle`, and the hand-throw pline. It **names** `min(range, isqrt(arw->range))` (zap bhit TETHER Open). `autoreturn_weapon` now stores `AKLYS_LIM²` but throwit does not `min()` it.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `throwit_calc_range` | C `:1613–1672`, **wired** | extracted helper; same order |
| `acurrstr` | C `attrib.c`, **imported live** | `ACURRSTR` macro |
| `BOLT_LIM` / `AKLYS_LIM` | C 8 / 4, **imported live** | `const.js` |
| `ammo_and_launcher` / `weapon_type` / `is_ammo` / `is_art` | C callees, **imported live** | |
| `hurtle` | C `dothrow.c`, **imported live** | leftover `urange` after bhit |
| `body_part(HAND)` | C `polyself.c`, **imported live** | `polyself.js` |
| `throwit_skill_name` | C `weapon.c` `skill_name`/`P_NAME`, **clone** | ammo map only; else `"weapon"` |
| `throwit_weapon_descr` | C `weapon.c` `weapon_descr`, **clone** | bow/crossbow ammo arrow/bolt; else skill clone |
| `Levitation_boom` | C `youprop.h` Levitation, **pre-existing clone** | boomhit D-1301; `(u.Levitation\|\|H\|\|E)&&!B` |
| tether `isqrt` | C `:1664–1667`, **named omit** | else-if skipped; uball-infloor still reachable |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new positional RNG** in the formula (pure arithmetic). Hand-throw pline is message-only.

## C ↔ JS fidelity

Pinned C (`dothrow.c:1613–1672` + hurtle `:1680–1682`):

```
        urange = (crossbowing ? 18 : (int) ACURRSTR) / 2;
        if (obj->otyp == HEAVY_IRON_BALL)
            range = urange - (int) (obj->owt / 100);
        else
            range = urange - (int) (obj->owt / 40);
        if (obj == uball) {
            if (u.ustuck) range = 1;
            else if (range >= 5) range = 5;
        }
        if (range < 1) range = 1;
        if (is_ammo(obj)) { … BOLT_LIM / range++ / range/=2 + pline … }
        if (Is_airlevel(&u.uz) || Levitation) {
            urange -= range; if (urange < 1) urange = 1;
            range -= urange; if (range < 1) range = 1;
        }
        if (obj->otyp == BOULDER) range = 20;
        else if (is_art(obj, ART_MJOLLNIR)) range = (range + 1) / 2;
        else if (tethered_weapon) range = min(range, isqrt(arw->range));
        else if (obj == uball && u.utrap && u.utraptype == TT_INFLOOR)
            range = 1;
        if (Underwater) range = 1;
```

JS `Math.trunc` matches C `int` division for these non-negative values. Crossbowing is `ammo_and_launcher(obj, uwep) && weapon_type(uwep)==P_CROSSBOW` — same as `:1614–1616`. Gem ammo without a launcher skips the half and the pline (`oclass != GEM_CLASS`). Air/lev mutates **`urange` leftover** then `hurtle` uses that leftover, only in the bhit arm (boomhit still hurtles 1 **before** `boomhit`, C `:1602–1603`). Swallow / `u.dz` never compute urange. Match.

The **tethered else-if is omitted**. Aklys is not boulder/Mjollnir/uball, so JS leaves range uncapped by `isqrt(AKLYS_LIM²)=4`. D-log names that; do not treat the new `arw.range` field as a live cap. The following uball-infloor arm still runs for a ball (C would have taken tethered first only for aklys).

`throwit_skill_name` / `throwit_weapon_descr` are **clones**, not `invent.js` `skill_name` (cycle). For the hand-throw envelope (`is_ammo && !launcher && !GEM`): dart/bow/crossbow/shuriken map to `objectNameStrs` / `"arrow"` / `"bolt"`, which is C `P_NAME` + `weapon_descr` for those skills. Unmapped skill → `"weapon"` would diverge from C `P_NAME`; that path is not ammo. `body_part(HAND)` is the real `polyself.js` callee (index 6 matches `hack.h` bodypart_types).

`Levitation_boom` extra-ORs sticky `u.Levitation`. Same clone boomhit already uses. Not a new Must-fix.

This is **not** “Match C `zap.c` bhit range type.” The fly loop still stands in; the **integer** passed as `range` is now the C formula (minus isqrt).

## Hallucinations / overclaim

Subject + D-1316 say flight range comes from ACURRSTR and weight instead of stub 5. **The formula plus post-bhit hurtle are the hunk.** Stamping **Addressed:** D-1316 is fair. Do **not** stamp “Match C `isqrt(arw->range)`.” Do **not** stamp “Match C `weapon.c` `skill_name` for every P_*.” Do **not** stamp “Match C `THROWN_TETHERED_WEAPON` bhit.” Do **not** treat cohort PASS as a giant boulder toss to 20.

## Density

One C range envelope plus the hurtle that consumes leftover `urange`, plus the pline that C emits in that same `if (is_ammo)`. ~90 executable JS lines. isqrt correctly not faked with a constant 4. Right size (§2b). Slightly dense with two name clones, but they exist only for that pline.

## Branch-by-branch confirm

1. Unencumbered dart, launcher: `urange=acurrstr()/2`, `owt/40`, then `range++`. Match `:1636–1640`.
2. Crossbow bolt: urange `18/2`, then `range = BOLT_LIM` (8). Match `:1637–1638`.
3. Dart by hand: half range + pline `an(skill)` / `weapon_descr` / `body_part(HAND)`. Match `:1641–1646`.
4. Gem without sling: no half, no pline. Match GEM skip.
5. `HEAVY_IRON_BALL`: `/100` not `/40`. Match `:1622–1623`.
6. Attached `uball`, `ustuck`: range 1. Match `:1627–1628`.
7. Air/lev: leftover urange hurtle **after** the fly loop. Match `:1650–1657` + `:1680–1682`.
8. Boulder 20 / Mjollnir half / underwater 1. Match `:1660–1672`.
9. Wielded aklys: **no** `isqrt` cap. Named omit of `:1664–1667`.
10. Boomhit / swallow: this helper not used. Match.
11. **Public-unhit** unless a session’s throw range would have differed from stub 5 (seed1800 throws exist; journal focused it).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Did not hardcode range 5 for a public seed. Plain ESM.

## Verification

Journal: private canary **24**/24; green+strict seed8000/0900; focused seed1800; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. Cadence this audit: full `sessions` at HEAD `ccdc8670` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Strength/weight/ammo/air-lev/boulder/Mjollnir/uball/underwater and leftover `hurtle` match C `:1613–1682`. `acurrstr` / `hurtle` / `body_part` are not stubs. `isqrt` is a named omit, not a wrong `min(range,4)`.

Named omits / clone debt (map, not Must-fix):

1. `min(range, isqrt(arw->range))` for wielded aklys
2. `zap.c` bhit `THROWN_TETHERED_WEAPON` (fly still stands in)
3. `throwit_skill_name` / `throwit_weapon_descr` are ammo-only clones of `weapon.c`

Do not Must-fix “export `throwit_calc_range`.” Do not Must-fix `Levitation_boom` sticky OR (pre-existing boomhit clone). Next Open after this SHA was candelabrum `(n of 7)` (now D-1317).

## Callers / RNG ledger

C: every horizontal non-boomhit `throwit`. JS: same. No new `rn2`. Public fortress is not evidence urange left the stub-5 envelope on every seed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: throw range is now ACURRSTR/weight/ammo/air-lev, not stub 5; aklys `isqrt` and zap bhit stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1316 `75c08164` already filled by the next port commit.
