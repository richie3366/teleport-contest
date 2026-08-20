# Review 233 — 3925f2b3 — mon.c meatmetal (D-1271)

## Metadata
- Full / short hash: `3925f2b3fd8f486a392bfde4c320f18ab18d5ece` / `3925f2b3`
- Parent: `c00f5419` (reviews **229–232** + cadence **#1610**). JS parent `a4aa34d3` (D-1270). This file audits **this SHA only**. Archive row **Addressed:** D-1271 `3925f2b3` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 11:36:37 +0200
- D-id: **D-1271**
- Stats: 11 files, +300 / −139 — `js/mon.js` +93 / −1; `js/monmove.js` +16 / −3.
- Claims to close: Open `monmove.c` `meatmetal` (named from D-1247 / reviews **209** / **220** / **232**). Not switch_terrain. `reviews/loop-2026-08-15/` has no unpaid meatmetal Must-fix.
- JS / map: `mon.js` `meatmetal`; `monmove.js` `postmov` OBJ_AT; live `m_consume_obj` / `obj_resists` / `touch_artifact` / `is_metallic`; `c-js-map/turns.md`. meatobj / meatcorpse named.
- Prior reviews this SHA claims to close: **209** / **220** / **232** named omit `meatmetal` after bars eat / ALLOW_BARS / hero `test_move`.

## Intent vs deliverable

Git subject promises: “Match C mon.c meatmetal so a metallivorous non-pet that postmovs onto metal eats it (meating, consume, leftover rock), instead of leaving the object for mpickstuff.”

C `meatmetal` (`mon.c:1462–1528`): tame return 0; walk `level.objects[mx][my]` top-first; skip rust+!rustprone / AMULET_OF_STRANGULATION / RIN_SLOW_DIGESTION / poisoned `!resists_poison`; then `is_metallic && !obj_resists(5,95) && touch_artifact`; rust+oerodeproof spit+stun (object stays, loop continues); else cansee `pline_mon` else verbose `You_hear` crunch; `meating = owt/2+1`; `m_consume_obj`; `DEADMONSTER` → 2; leftover ROCK `rnd(25)<3`; `newsym`; return 1. Caller `monmove.c` `postmov` `:1663–1667` inside `mmoved==MOVED||DONE` + `OBJ_AT && mcanmove`, before cube `meatobj` / `meatcorpse` / `mpickstuff`. Return 2 → `MMOVE_DIED`.

Old JS: `// metallivorous / cube / corpse_eater meat* deferred` then `mpickstuff`.

The diff **does** live `meatmetal` and the postmov call before `mpickstuff`, returning DIED on 2. It does **not** port `meatobj` / `meatcorpse` or expand `m_consume_obj` meatbox/poly/uball/`mon_givit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `meatmetal` | C `:1463–1528`, **new** | |
| postmov OBJ_AT call | C `:1663–1667`, **wired** | after early MOVED\|\|DONE return |
| `m_consume_obj` | C `:1392`, **imported live partial** | heal `oc_weight` + `delobj`; meatbox/poly named |
| `obj_resists` | C `dog.c`, **imported live** | `rn2(100)` 5/95 |
| `touch_artifact` | C `artifact.c`, **imported live** | |
| `is_metallic` / `is_rustprone` | C `objclass.h`, **imported live** | mkobj `MITHRIL=17` |
| `mksobj_at(ROCK)` | C `:1522`, **imported live** | |
| `pline_mon` / `canseemon` / `cansee` / `distant_name` | C, **imported live** | |
| `You_hear_meat` | C `pline.c` `You_hear`, **local clone** | Unaware/Underwater named |
| rust mndx | C `data == &mons[PM_RUST_MONSTER]`, **condition clone** | `mons()` allocates |
| `meatobj` / `meatcorpse` | C `:1533` / `:1656`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `obj_resists` `rn2(100)`; eat path `rnd(25)` leftover; `touch_artifact` may roll. Spit path has no extra RNG.

## C ↔ JS fidelity

Pinned C skip + eat (`mon.c:1474–1524`):

```
    for (otmp = svl.level.objects[mtmp->mx][mtmp->my]; otmp;
         otmp = otmp->nexthere) {
        if ((mtmp->data == &mons[PM_RUST_MONSTER] && !is_rustprone(otmp))
            || (otmp->otyp == AMULET_OF_STRANGULATION
                || otmp->otyp == RIN_SLOW_DIGESTION)
            || (otmp->opoisoned && !resists_poison(mtmp)))
            continue;
        if (is_metallic(otmp) && !obj_resists(otmp, 5, 95)
            && touch_artifact(otmp, mtmp)) {
            if (mtmp->data == &mons[PM_RUST_MONSTER] && otmp->oerodeproof) {
                ... spit, oerodeproof=0, mstun ...
            } else {
                ... eat, meating, m_consume_obj, ROCK, return 1/2 ...
            }
        }
    }
```

JS walks `objects_at` `nexthere` (same top-first pile). Rust identity is `mndx` because `mons()` allocates (D-0928 #1130). Skip arms match. Spit does **not** return; the loop continues to the next object — C same. Eat uses `cansee(mx,my)` not the opening `canseemon` vis (C `:1504` vs `:1467`). Match.

`m_consume_obj` is not a no-op: non-pet `healmon(oc_weight)` then `delobj`. C also meatbox / poly / grow / stone / `mon_givit`. Named. `DEADMONSTER` is `mhp<1`; JS that test is idle until grow/stone is live (C comment already says return-2 cannot happen at present). Leftover `rnd(25)<3` after consume. Match the claimed eat.

Caller: JS `postmov` returns immediately unless `mmoved` is MOVED or DONE (`:1270`), then the OBJ_AT block runs for both (C `:1660–1667`). Ate (1) still falls through to `mpickstuff`. Died (2) returns `MMOVE_DIED`. Cube `meatobj` still named.

`You_hear_meat` is a local clone (every `js/*.js` already has one). Deaf / HDeaf / EDeaf / uroleplay.deaf / `flags.acoustics===false`. C also Unaware / Underwater. Named. Soundeffect empty without SND_LIB — same as D-1222.

This is **not** “Match C dispatch, callee is a stub”: the metallic object is consumed via live `delobj`; `obj_resists(5,95)` is the live `dogmove.js` function.

## Hallucinations / overclaim

Subject + D-1271 say a metallivorous non-pet that `postmov`s onto metal eats it. **The function + caller + leftover ROCK are the hunk.** Stamping **Addressed:** D-1271 is fair. Do **not** stamp “Match C `meatobj` / `meatcorpse`” or “Match C `m_consume_obj` meatbox/poly/`mon_givit`.” Do not stamp “Match C rust-monster class in `touch_artifact`.” D-log is missing the `## D-1271` heading (docs miss, not JS).

## Density

One C function plus the one `postmov` call site C uses. ~90 JS lines. Right size. Did not glue `meatobj`.

## Branch-by-branch confirm

1. Tame metallivore: return 0, `mpickstuff` may still run. Match.
2. Jackal / cube on metal: `metallivorous` false, skip `meatmetal`. Match.
3. Mole / xorn, iron dagger: eat, `meating`, `delobj`, maybe ROCK. Match.
4. Rust + gold/silver: `!is_rustprone` continue. Match.
5. Rust + rustproof iron: spit, stun, object stays, loop may eat the next. Match.
6. Amulet of strangulation / slow-digestion ring / poisoned `!resists_poison`: skip. Match.
7. `obj_resists` true: skip that object. Match.
8. `meatmetal==2`: `MMOVE_DIED`, no `mpickstuff`. Match (idle until consume kills).
9. `meatmetal==1`: still `mpickstuff` on leftover pile. Match.
10. `meatobj` / `meatcorpse`: still named. Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. ROCK leftover uses monster `mx,my`, not a recorded cell. Plain ESM.

## Verification

Journal: private canary **25**/25 (C body+caller; tame / empty / club; rust skip silver+gold; rustproof spit; mole/xorn eat; amulet/ring/poison skip; `obj_resists`; leftover ROCK; postmov DONE mole; jackal/cube skip; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a metallivore `postmov`s onto metal. Cadence this audit: full `sessions` at HEAD `b166de10` **44**/44 Scr **11,405**/11,405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `is_metallic` / `obj_resists` / `m_consume_obj` (`delobj`). `You_hear` Unaware/Underwater is a named clone skip, not a spit-vs-eat order miss.

Named omits (map, not Must-fix):

1. `mon.c` `meatobj` (gelatinous cube floor engulf)
2. `mon.c` `meatcorpse` (corpse_eater)
3. `m_consume_obj` meatbox / poly / uball / `mon_givit` / grow_up

Do not Must-fix rust `mndx` vs `data == &mons[]`. Do not Must-fix the local `You_hear` clone. Do not pull `display_self` this SHA.

## Callers / RNG ledger

C: only `postmov` OBJ_AT. JS that. RNG: `obj_resists` always on a metallic candidate; `rnd(25)` only after a real eat; spit has none. Public fortress is not evidence a rock mole ate a dagger.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: non-pet metallivores now eat the top metallic floor object through live consume+leftover ROCK; cube `meatobj` / corpse_eater stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1271 `3925f2b3`.
