# Review 769 — b9a72263 — hack.c test_move/domove_core water/avoid/F-bars (D-1800)

## Metadata
- Full / short hash: `b9a722638fc4d7dd5def0bee3558eb283cef0414` / `b9a72263`
- Parent: `638c92dd` (D-1799 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 02:43:53 +0200
- D-id: **D-1800**
- Stats: `js/hack.js` +265/−12; `js/cmd.js` +34/−3; `js/invent.js` +1/−1. Total `js/` insertions **300** >250 → ceiling **450**. Band **80–450**.
- Claims to close: Open `hack.c` `test_move`/`domove_core` water_friction, avoid-trap-or-liquid, F-fight bars/web, remaining mention_walls. Not lookaround.
- JS / map: `hack.js` helpers; `cmd.js` `domove` call order; invent `weapon_descr` export. `c-js-map/turns.md`. Archive **Addressed:** D-1800 `b9a72263`.

## Intent vs deliverable

Git subject promises: Match C `hack.c` `test_move`/`domove_core` so `water_friction`, avoid-trap-or-liquid, F-fight bars/web, and remaining `mention_walls` actually run, instead of treating force-fight into bars as empty and walking a rush onto a seen trap.

`node scripts/csym.mjs water_friction` → `mkmaze.c:1688–1720`. `water_turbulence` `hack.c:2364–2393` (caller `:2751`). `avoid_moving_on_trap` `:2443–2460`. `avoid_moving_on_liquid` `:2462–2490`. `avoid_running_into_trap_or_liquid` `:2493–2509` (caller `:2757`). `move_out_of_bounds` `:2585–2612`. `domove_fight_ironbars` `:1995–2017`. `domove_fight_web` `:2020–2094`. testdiag `test_move` `:1146` / `:1211`.

Parent jumped from `impaired_movement` to `m_at`/`fight_empty`. The diff **does** insert C’s order (turbulence → OOB → avoid-run → F bars → F web → empty) and the doorway/OOB texts. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `water_friction` | LIVE local | C `mkmaze.c`; only caller is turbulence |
| `water_turbulence` | LIVE new | caller recomputes `ux+dx` after friction ≡ C `*x=` |
| `avoid_moving_on_trap` / `_liquid` / `avoid_running_into_trap_or_liquid` | LIVE | Known_wwalking/lwalking **OMIT named** |
| `move_out_of_bounds` | LIVE | `domove_fight_empty` via dynamic `import('./cmd.js')` (cycle, not TDZ) |
| `domove_fight_ironbars` / `_web` | LIVE | |
| `weapon_descr` | LIVE export | invent.js |
| `uwep_skill_type` | CLONE inlined | do **not** add apply.js clone #2 |
| `u_wield_art` | CLONE as `is_art(uwep,…)` | C `obj.h:441`; export exists — do **not** add clone #6 |
| `Swimming` | CLONE inlined | `youprop.h:266–268` H\|\|E\|\|steed |
| lookaround / air_turbulence / slippery_ice / escape_from_sticky / autodig / `worm_cross` / `exercise_steed` / Blind `feel_location` | OMIT named | |

`node scripts/sym.mjs`:

```
water_turbulence js/hack.js:1870   ASYNC
water_friction   NOT EXPORTED — 1 LOCAL (hack.js:1831) — do NOT write #2
avoid_running_into_trap_or_liquid js/hack.js:1942   ASYNC
move_out_of_bounds js/hack.js:1960   ASYNC
domove_fight_ironbars js/hack.js:1987   ASYNC
domove_fight_web js/hack.js:2017   ASYNC
weapon_descr     js/invent.js:4276   sync
hit_bars         js/mthrowu.js:1169   ASYNC
breaktest        js/dothrow.js:1245   sync
uwep_skill_type  NOT EXPORTED — 1 LOCAL (apply.js:3344) — do NOT write #2
u_wield_art      js/artifact.js:550   sync  + 4 clones — do NOT add another
acurrstr         js/attrib.js:141   sync
is_art / attacks js/artifact.js  sync
```

`--can cmd.js hack.js water_turbulence` and hack.js → invent/mthrowu/dothrow/artifact/wield/weapon/attrib: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean** (dynamic `import()` is ESM, not `fs`).

## C ↔ JS fidelity

**Callee closure.** Turbulence: `water_friction` LIVE; `nomul`/`near_capacity` LIVE. Avoid-run: `t_at`/`trapname`/`an` LIVE; liquid Known_* **OMIT**. OOB: `directionname`/`xytodir` LIVE; F-empty LIVE. Bars: `breaktest`/`splitobj`/`setuwep`/`freeinv`/`hit_bars({obj})` LIVE. Web: `rn2` first (C draws even on Sting), `is_art`/`attacks(AD_FIRE)`/`weapon_descr`/`is_blade`/`acurrstr`/`use_skill`/`deltrap` LIVE. testdiag pline LIVE; Blind `feel_location` **OMIT**. No STUB in a shipped live arm.

**`water_friction` (`:1688–1720`).** `Swimming && rn2(4)` early return; then `dx && !rn2(dy?6:3)` cancel-x pick `rn2(3)-1` pool-or-stay; else `dy && !rn2(dx?5:3)`. **Match RNG short-circuit.**

**`avoid_running` (`:2493–2509`).** `run==0` false. Trap always; liquid only if Blind. `nomul(0)`; `move=0` only when `run>=2`; **return `would_stop`** so run==1 still takes the step. **Match.** Known_wwalking omitted → Blind water-walker may stop at a pool C would enter (named).

**`domove_fight_web` (`:2020–2094`).** `wskill_minus_2 = max(P_SKILL, UNSKILLED)-2`; `rn2(uwep?20:(45-5*wskill))` **before** Sting/fire. Non-blade You_cant; `roll > acurrstr()-2 + (uwep ? spe+wskill : 0)` ineffectual; else cut/punch, `use_skill`, `deltrap`. **Match.**

**testdiag (`:1146`/`:1211`).** Into: `Underwater≡uinwater || mention_walls`. Out: `mention_walls` only. JS prints from `cmd.js` DO_MOVE path (C’s `mode==DO_MOVE` gate). **Match the texts.**

**Call order (`:2748–2811`).** C: impaired → turbulence (rewrites x,y from dx/dy) → OOB → avoid-run → … → F bars → F web → empty. JS: same relative order; F-fight only when `forcefight && !mtmp` (C also only reaches bars after no-monster / `!displaceu`). **Match the ported slice.**

## Hallucinations / overclaim

Subject is **true**. Do **not** stamp “Match C lookaround / air_turbulence / Known_wwalking / `feel_location`.” Do **not** add `uwep_skill_type` clone #2 or `u_wield_art` clone #6. Do **not** glue autodig/`worm_cross`. `weapon_descr` ammo/sling specials remain named on that helper.

## Density

§2b: one `domove_core` envelope + the staticfns it calls. +300. Did **not** glue lookaround. Right size.

## Verification

D-log: green + movement cohort. save-oracle skip. Public-unhit for underwater `rn2(4)`/`rn2(3)` and F-web `rn2(20)`. This audit: `csym` ranges vs HEAD `js/hack.js:1831–2070` / `js/cmd.js:2958–2988`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: lookaround; air_turbulence; slippery_ice_fumbling; escape_from_sticky_mon; Known_wwalking/lwalking; autodig/`worm_cross`; `exercise_steed`; Blind `feel_location`; D-0354 bump glyph.

Verdict: **ACCEPT-WITH-DEBT**
