# Review 296 — 487daa2f — mthrowu.c return_from_mtoss snuff_candle (D-1334)

## Metadata
- Full / short hash: `487daa2fdc9c63933b7492e17bb7441d280450ef` / `487daa2f`
- Parent: `1eef5d0c` (review D-1330–D-1333). This file audits **this SHA only**. Archive **Addressed:** D-1334 `487daa2f` already has the short hash (filled by D-1335).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 03:59:28 +0200
- D-id: **D-1334**
- Stats: 12 files, +328 / −65 — `js/mthrowu.js` +269 / −~40; `js/apply.js` / `js/dokick.js` / `js/dothrow.js` comments.
- Claims to close: Open `mthrowu.c` `snuff_candle` (C `:942` notcaught land; named from D-1333 / review **295**). Not throwit land. `reviews/loop-2026-08-15/` has no unpaid mthrowu-snuff Must-fix.
- JS / map: `mthrowu.js` `return_from_mtoss` + `m_throw` tether wire; callee `apply.js` `snuff_candle` (pre-existing D-1242 / D-1313 / D-1325 / D-1333); `c-js-map/turns.md`. `thrwmu` always_toss / polearm / `killer_xname` still named.
- Prior reviews this SHA claims to close: **295** named mthrowu `:942` after throwit land; **287** named the same site after dokick extract-snuff.

## Intent vs deliverable

Git subject promises: “Match C mthrowu.c return_from_mtoss so a notcaught monster throw-and-return actually snuffs a lit candle before land, instead of skipping snuff_candle at :942.”

C `return_from_mtoss` (`mthrowu.c:849–965`) is the whole land helper. Snuff is one call on the notcaught path:

```
        if (notcaught) {
            (void) snuff_candle(otmp);
            if (!ship_object(otmp, x, y, FALSE)) {
                if (flooreffects(otmp, x, y, "drop")) {
                    if (cansee(x, y)) newsym(x, y);
                    return;
                }
                place_object(otmp, x, y);
                stackobj(otmp);
            }
```

Callee `apply.c` `snuff_candle` (`:1472–1491`): `Is_candle || otyp==CANDELABRUM_OF_INVOCATION` and `lamplit` → location pline → `end_burn(otmp, TRUE)`. Lamps / POT_OIL are `snuff_lit`, **not** this function. Caller `m_throw` `:829–830` when `arw && return_flightpath` (wielded AKLYS; `tethered_weapon` computed **before** unwield at `:584–587`). Order is snuff **before** ship/flooreffects — not throwit land (D-1333: flooreffects then snuff).

Old JS: `m_throw` always `drop_throw`; no `return_from_mtoss`. `drop_throw` itself does not snuff (C matches).

The diff **does** port `return_from_mtoss` and wire tethered AKLYS so `:942` can run. It does **not** switch to `snuff_lit`. It does **not** port `thrwmu` always_toss / polearm, `shade_miss`, iron bars, gem catch, or egg/pie/venom `thitu` arms. Named. Comment-only hunks in apply/dokick/dothrow.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `return_from_mtoss` | C `:849–965`, **wired** | new export |
| `snuff_candle` at `:942` | C `apply.c:1472–1491`, **imported live** | candles / candelabrum only |
| `m_throw` tether | C `:584–587` / `:695` / `:787–793` / `:814–819` / `:829–830`, **wired** | `return_flightpath` vs `drop_throw` |
| `autoreturn_weapon` | C `weapon.c:519–529`, **clone** | AKLYS only; boomerang row commented out in C |
| `Tobjnam` / `otense_mtoss` | C `objnam.c:2290–2298` / `:2531`, **clone** | `the`+cap + `vtense(null,verb)` |
| `mhis_mtoss` | C `you.h` `mhis` → `pronoun_gender(..., PRONOUN_HALLU)`, **clone** | Hallu `rn2(4)` + female/his; neuter / `!canspotmon` named |
| `add_to_minv` | C, **imported live** | merge polish named |
| `artifact_hit` / `monkilled` | C, **imported live** | hits_thrower |
| `ship_object` / `flooreffects` | C, **imported live** | notcaught land |
| `tmp_at(DISP_TETHER)` / `BACKTRACK` | C display, **imported live** | `display.js` already walked BACKTRACK (D-1311) |
| `thrwmu` always_toss / polearm | C, **named omit** | |
| `ucatchgem` / `shade_miss` / bars | C `m_throw`, **named omit** | pre-existing |
| `obj_sheds_light` | C `:959`, **stand-in** | JS `otmp.lamplit` |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on this path:** `rn2(100)` made_it_back, `rn2(100)` catch-into-minvent, `rn2(2)` then `rnd(3)` hit-thrower, Hallu `mhis` `rn2(4)`. C same calls in that order. Catch-into-minvent skips snuff (C `:890–898` vs `:941`).

## C ↔ JS fidelity

Notcaught land call order is snuff → `ship_object` → `flooreffects("drop")` → place+stack. That is C `:941–951`, not D-1333’s flooreffects-then-snuff. Catch-into-minvent never reaches `:942`. Failed `made_it_back` (`rn2(100)==0`) still sets `notcaught` and snuffs if `otmp`. Callee is the live `snuff_candle` already used by throwit_mon_hit / dokick / throwit land: candles/candelabrum only; oil/magic/brass lanterns stay lit.

`m_throw` now computes `arw` / `tethered_weapon` **before** `setmnotwielded` (`obj === MON_WEP(mon)`). Hero hit: skip catch if tethered (`:695`), potionhit still `break`s without setting `return_flightpath` (C too), non-potion `hitu` sets `return_flightpath` instead of `drop_throw`. End of path: same. After the loop, `arw && return_flightpath` → `return_from_mtoss`, else `DISP_END`. That is `:827–833`.

`autoreturn_weapon` matches C `arwep[]` (AKLYS, `AKLYS_LIM*AKLYS_LIM`, tethered 1; boomerang commented out). `Tobjnam` clone is `The(xname)+otense`; `vtense(null,'fly')` → `flies`, `'return'` → `returns`. Hit-thrower uses C’s `body_part(ARM)` (hero arm name, not `mbodypart`) and `mbodypart(magr, FOOT)` on the land-at-feet arm. `WT_SPLASH_THRESHOLD` is 9 (`weight > 9`). Splash/Plop after ship/floor matches `:952–957` minus `Soundeffect`.

`mhis_mtoss` is a **thinner clone** than `sit.js` / `fountain.js` `pronoun_gender`: Hallu `rn2(4)`, else female→her else his. C `mhis` also yields `its` for `!canspotmon` / `is_neuter` / non-humanoid. The visible land pline is gated on `canseemon`, and an AKLYS thrower is humanoid, so the live snuff path’s pronoun matches C. That clone gap is a named residual, not a stub snuff.

Pre-existing: gem `ucatchgem`, EGG/CREAM_PIE/BLINDING_VENOM `thitu` switch, elf-bow `hitv`, `obj_to_glyph(..., rn2_on_display_rng)`. Catch still `return`s with `DISP_END` instead of C `break` then post-loop `tmp_at` + `gt.thrownobj=0`. This SHA adds `game._thrownobj = null` at the **normal** end (`:843`); the catch early-return still skips it. Do not Must-fix that as this SHA’s `:942` snuff. `drop_throw` for non-tethered is unchanged.

This is **not** “Match C `snuff_lit` on monster throw land.” The subject’s candle/candelabrum claim is the live callee. Hallucination check for “Match C dispatch, callee is a stub” is clean: `snuff_candle` / `add_to_minv` / `artifact_hit` / `monkilled` / `ship_object` / `flooreffects` / `rloc` display `tmp_at` are live.

## Hallucinations / overclaim

Subject + D-1334 say a notcaught throw-and-return snuffs a lit candle before land instead of skipping `:942`. **The notcaught block plus the tether wire that can reach it are the hunk.** Stamping **Addressed:** D-1334 is fair. The subject does **not** claim “one call on an already-live `m_throw` return path” — JS had no return path; porting the helper was required. Do **not** stamp “Match C `thrwmu` always_toss / polearm.” Do **not** stamp “Match C `snuff_lit` / `splash_lit`.” Do **not** stamp “Match C `pronoun_gender` / `obj_sheds_light`.” Do **not** treat fortress PASS as a monster-aklys candle extinguish pline.

## Density

One C function (`return_from_mtoss`) plus the caller/callee cluster that makes `:942` reachable (`m_throw` tether + live `snuff_candle`). `mthrowu.js` +269 is the high end of playbook §2b (50–300), not “finish mthrowu.” Did not glue `killer_xname` or `splash_lit`. Queued Open row. Acceptable size.

## Branch-by-branch confirm

1. Wielded AKLYS miss-land, lit candle/candelabrum, notcaught: snuff (`end_burn`), ship, `flooreffects("drop")`, place. Match `:941–951`.
2. Unlit candle: `snuff_candle` returns false; still lands. Match.
3. Oil / magic / brass lantern: callee returns false; stays lit. Match (`snuff_candle` not `snuff_lit`).
4. Catch-into-minvent (`!impaired && rn2(100)`): `add_to_minv`, no snuff. Match `:881–898`.
5. `made_it_back==0`: snap, `notcaught`, snuff if `otmp`. Match `:926–931` + `:941`.
6. Hits thrower (`rn2(2)` then `rnd(3)`): damage / `artifact_hit` / `monkilled`; then snuff+land. Match `:902–940` + `:941`.
7. Non-tethered dart: still `drop_throw`. Match.
8. Tethered potionhit: `break` without `return_flightpath`. Match `:698–701`.
9. `thrwmu` always_toss / polearm / gem catch. Still omitted. Named.
10. **Public-unhit** unless a session has a monster miss-return a lit candle/aklys.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dynamic `import('./apply.js')` is an ESM cycle, not filesystem. Plain ESM. `game._mtoss_do_not_annoy` is the C `static long do_not_annoy` (FIXME in C to `struct g`); not a seed gate.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on monster throw-and-return candles. Cadence this audit: full `sessions` at HEAD `2bd70a77` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence `end_burn` ran on a returned candle.

## Actionable C-wrongs

None for Must-fix. Notcaught snuff-before-ship matches C `:942` on a live callee; tether wire matches `:584–830`.

Named omits (map, not Must-fix):

1. `mhis` / `pronoun_gender` (neuter / `!canspotmon` / non-humanoid → `its`)
2. `obj_sheds_light` (`light.c:763` = `obj_is_burning`, not bare `lamplit`)
3. `thrwmu` always_toss / polearm
4. `ucatchgem` / `shade_miss` / iron bars / sink; egg/pie/venom `thitu`
5. Catch `break` vs early `return` (pre-existing; skips post-loop `thrownobj` clear)
6. `Soundeffect(se_splash)`
7. `killer_xname` (this SHA’s follow-up Open, shipped as D-1335)

Do not Must-fix “use `snuff_lit` on monster throw land” (C does not). Do not Must-fix throwit land (already D-1333).

## Callers / RNG ledger

C: `m_throw` → `return_from_mtoss` → `snuff_candle` at `:942` when `notcaught`. JS: same site. Public fortress is not evidence `end_burn` ran on a returned candle.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: notcaught return land now snuffs candles/candelabrum before ship/drop; `thrwmu` always_toss and thin `mhis` stay named.
- Must-fix stays empty for this SHA.
