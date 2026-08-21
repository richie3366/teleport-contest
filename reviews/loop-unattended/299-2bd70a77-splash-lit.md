# Review 299 — 2bd70a77 — apply.c splash_lit (D-1337)

## Metadata
- Full / short hash: `2bd70a7746469255b1578e7d4e2c4be23b291754` / `2bd70a77`
- Parent: `a7ac5e52` (D-1336). This file audits **this SHA only**. Archive **Addressed:** D-1337 lacked the short hash; this review commit fills `2bd70a77`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 04:57:59 +0200
- D-id: **D-1337**
- Stats: 11 files, +166 / −41 — `js/apply.js` +74 / −2; `js/trap.js` +28 / −16.
- Claims to close: Open `apply.c` `splash_lit` (named from D-1242 / review **287**). Not `snuff_candle`. `reviews/loop-2026-08-15/` has no unpaid splash_lit Must-fix.
- JS / map: `apply.js` `splash_lit`; callers `trap.js` rust-trap walks + `water_damage`; `c-js-map/data.md` + `turns.md`. gulpmu invent / gulpum / `litroom` artifact_light / pickup `obj_is_burning` still named.
- Prior reviews this SHA claims to close: **287** named `splash_lit` after dokick `snuff_candle`; **295** said do not stamp splash_lit on throwit land.

## Intent vs deliverable

Git subject promises: “Match C apply.c splash_lit so a rust-trap splash on a brass lantern stays lit with crackle/flicker and other lit lamps snuff through end_burn, instead of only clearing lamplit.”

C `splash_lit` (`apply.c:1518–1572`):

```
    if (obj->lamplit && obj->otyp == BRASS_LANTERN) {
        … OBJ_INVENT: useeit=!Blind, uhearit=!Deaf,
          dunk = is_pool(u.ux,u.uy) && ((!Levitation&&!Flying&&!Wwalking) || waterlevel);
          snuff = FALSE;
        … OBJ_MINVENT && humanoid(ocarry): get_obj_location + cansee / distu<25,
          dunk = is_pool(mx,my) && ((!flyer&&!floater) || waterlevel);
          snuff = FALSE; set_msg_xy if useeit;
        if (useeit || uhearit) pline("%s %s%s%s.", Yname2(obj), crackles/flickers);
        if (!dunk && !snuff) return FALSE;
    }
    result = snuff_lit(obj);
    if (dunk) obj->age -= (age>200) ? 100 : (age/2);
    return result;
```

Callers `trap.c` `water_damage` `:4722` (`if (splash_lit(obj)) return ER_DAMAGED` **before** ostr/luck) and rust-trap invent walk `:1632–1636` / minvent walk `:1697–1701`. Floor lantern (not invent, not humanoid minvent) keeps `snuff=TRUE` and goes through `snuff_lit`. No `rn2` in `splash_lit` itself.

Old JS: `trap.js` `splash_lit` was `obj.lamplit=0; return true` — no `end_burn`, brass lantern snuffed on rust trap.

The diff **does** port `splash_lit` next to `snuff_lit` in `apply.js` and replace the trap.js stub with a dynamic import (apply.js already static-imports trap.js). It does **not** pull gulpmu invent snuff, gulpum, `litroom` artifact_light, or pickup `obj_is_burning`. Named. water_damage invent plines / pot_acid boom / waterproof makeknown / SPE_NOVEL still named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `splash_lit` | C `:1518–1572`, **wired** | new export in `apply.js` |
| trap.js wrapper | C callers, **re-export** | `await import('./apply.js')` — not the old `lamplit=0` stub |
| `snuff_lit` | C `:1497`, **imported live** | D-1242; `end_burn` inside |
| `Yname2_snuff` | C `objnam.c:2378` `Yname2`, **clone** | capitalize live `yname` |
| `Blind()` | C `youprop.h:103`, **clone** | `(H\|\|E)&&!B`; extra `uroleplay.blind` (D-0716) |
| Deaf | C `youprop.h:125`, **clone** | `H\|\|E\|\|uroleplay.deaf` — C has no `BDeaf` |
| Levitation / Flying / Wwalking | C `youprop.h:240/:253/:260`, **clone** | Flying includes steed + `!BFlying`; Wwalking `!waterlevel` |
| `get_obj_location` | C zap.c, **imported live** | `timeout.js:510` |
| `set_msg_xy` | C `pline.c`, **imported live** | minvent cansee |
| `humanoid` / `is_flyer` / `is_floater` / `is_pool` | C, **imported live** | |
| `distu_apply` | C `distu`, **clone** | `dist2(u, dest)` |
| gulpmu invent / gulpum / litroom / pickup | C `snuff_lit` callers, **named omit** | not this function |
| rust `update_inventory` / mlifesaver | C rust-trap, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** in `splash_lit`. rust-trap `rn2(5)` aim switch is pre-existing. `water_damage` still `return ER_DAMAGED` when splash returns true (C `:4722–4723`) — brass stay-lit returns **false**, so ostr/luck/erode still run. Match.

## C ↔ JS fidelity

Brass + `OBJ_INVENT`: rust-trap on dry floor → `dunk=false`, `snuff=false`, crackle/flicker, **return false**, still lit, no `end_burn`. Brass + invent + hero in pool without lev/fly/wwalk (or waterlevel): `dunk=true`, does **not** early-return, `snuff_lit` then `age -= age>200?100:age/2` (`(age/2)|0` for positive ages ≡ C long `/`). Brass + `OBJ_MINVENT` + `humanoid(ocarry)` (nymph steal): stay-lit unless the carrier is in a pool. Non-humanoid minvent (jackal) keeps initial `snuff=true` → `snuff_lit`. Floor / `OBJ_FREE` lantern: same. Other lit oil/magic/POT_OIL/candle: skip the lantern block, `snuff_lit` → `end_burn`. Match `:1526–1571`.

`Yname2_snuff` is `highc(yname(obj))` with live `objnam.js` `yname` (shk_your / cxname). Not a glyph stand-in. Levitation clone is `(H\|\|E)&&!B` (C does **not** include steed). Flying clone includes steed + `!BFlying`. Wwalking is `(H\|\|E)&&!waterlevel` (C has no `BWwalking`). Deaf clone matches C (`H\|\|E\|\|uroleplay.deaf`). `get_obj_location(obj,0)` for minvent uses `ocarry.mx/my` when `mx` is truthy — C fills coords the same way; off-map `mx==0` yields null and skips `cansee` (useeit false).

`water_damage` now `await splash_lit`. rust-trap invent/minvent walks `await` the same wrapper. Call sites match `:1632–1636` / `:1697–1701` / `:4722`. Hallucination check for “Match C dispatch, callee is a stub” is clean: `snuff_lit` / `end_burn` are live (D-1242). The old trap.js stub is gone.

This is **not** “Match C `snuff_candle` on rust trap.” Candles still go through `snuff_lit` → `snuff_candle`. The subject’s brass stay-lit + other lamps `end_burn` claim is the live body.

## Hallucinations / overclaim

Subject + D-1337 say a rust-trap splash on a brass lantern stays lit with crackle/flicker and other lit lamps snuff through `end_burn` instead of only clearing `lamplit`. **The apply.js body plus trap.js import are the hunk.** Stamping **Addressed:** D-1337 is fair. Do **not** stamp “Match C gulpmu invent / gulpum / `litroom` / pickup `obj_is_burning`.” Do **not** stamp “Match C water_damage invent plines / pot_acid boom.” Do **not** treat fortress PASS as a rust-trap lantern crackle.

## Density

One C function plus its already-queued trap callers. ~70 lines in `apply.js` + await/import in `trap.js`. Playbook §2b. Did not glue gazemm. Acceptable size.

## Branch-by-branch confirm

1. Invent brass lantern, rust trap, not in pool: crackle/flicker, stay lit, return false. Match `:1526–1561`.
2. Invent brass, dunk (pool, not lev/fly/wwalk): snuff then age drain (1500→1400, 80→40). Match `:1564–1570`.
3. Invent oil / MAGIC_LAMP / POT_OIL / tallow: `snuff_lit` / `end_burn`. Match (lantern `if` skipped).
4. Floor brass: `snuff=true` → `snuff_lit`. Match.
5. Goblin/nymph (humanoid) minvent brass: stay-lit. Match `:1539–1550`.
6. Jackal minvent brass: snuff. Match (`humanoid` false).
7. `water_damage`: stay-lit → not `ER_DAMAGED` (erode may still run); snuff → `ER_DAMAGED`. Match `:4722–4723`.
8. Blind+Deaf invent brass: no pline, still stay-lit. Match (`useeit\|\|uhearit` false; still `!dunk&&!snuff`).
9. gulpmu / gulpum / litroom / pickup. Still omitted. Named.
10. **Public-unhit** unless a rust trap or `water_damage` hits a lit lamp.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` from trap.js is an ESM cycle break, not filesystem. Plain ESM. trap.js `FORCETRAP` bits in other functions are pre-existing trap flags, not this hunk.

## Verification

Journal: private canary **30**/30; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on rust-trap lanterns. Cadence this audit: full `sessions` at HEAD `2bd70a77` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence `end_burn` ran or a lantern stayed lit.

## Actionable C-wrongs

None for Must-fix. Brass stay-lit / dunk age / `snuff_lit` for other lamps match C `:1518–1572` on live callees. trap.js is no longer `lamplit=0`.

Named omits (map, not Must-fix):

1. gulpmu invent `snuff_lit`
2. gulpum
3. `litroom` `artifact_light`
4. pickup `obj_is_burning`
5. water_damage invent plines / pot_acid boom / waterproof makeknown / SPE_NOVEL
6. rust `update_inventory` / mlifesaver

Do not Must-fix “snuff brass lanterns on rust trap” (C does not). Do not Must-fix “call `snuff_candle` instead of `snuff_lit` from splash” (C calls `snuff_lit`).

## Callers / RNG ledger

C: rust-trap walks + `water_damage` `:4722` → `splash_lit`. JS: same sites. No RNG inside the helper. Public fortress is not evidence a lantern crackled.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: rust-trap brass lanterns stay lit; other lit lamps snuff through `end_burn`; gulpmu / litroom / pickup stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1337 `2bd70a77`.
