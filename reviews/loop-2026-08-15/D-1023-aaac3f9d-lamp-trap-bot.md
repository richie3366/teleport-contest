# Review — `aaac3f9d` — D-1023 lamp / cocktail / trap / BoT

## Metadata
- Full / short hash: `aaac3f9dea463fdfaf34ed9f23b253893c1eac9a` / `aaac3f9d`
- Parent: `7f9526207431d5661fce6967e3e8aa7aa74fbee8`
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 14:57:29 +0200
- D-id: **D-1023**
- Stats: 9 files, **+499 / −39** — `js/apply.js` **+428**
- JS / map / cadence: `js/apply.js`, `js/do.js` (`reset_trapset` on `goto_level`); debt; no cadence

## Intent vs deliverable
Promise: “Match C `use_lamp`, `light_cocktail`, `use_trap`, and `bagotricks` doapply dispatch”.

Deliverable: **four** C functions with no caller/callee link (lamp, oil flask, trap occupation, bag of tricks) + helpers (`Shk_Your`, `fingers_or_gloves`, `set_trap` occupation). This is the CURRENT “oil / trap / BoT” cluster swallowed in one gulp — exactly the dump predicted after D-1022.

## Disposition (catch-up 2026-08-15)

| Risk | Status |
|------|--------|
| 3 `consume_obj_charge` = `spe--` only | **Addressed:** D-1047 `2ca2ccd7` |
| 4 `light_cocktail` without C `**optr` | **Addressed:** D-1046 `3371ddf0` |
| `use_lamp` Glib `(u.Glib\|0)&TIMEOUT` vs C `HGlib\|EGlib` | **Must-fix** |
| `makemon(NULL)` / `dotrap` / `begin_burn` still-partial | named omit — not Must-fix |

## Inventory
| File | Role |
|------|------|
| `js/apply.js` | `use_lamp` / `light_cocktail` / `use_trap` / `set_trap` / `bagotricks` + `doapply` wiring |
| `js/do.js` | `reset_trapset()` before `keepdogs` on `goto_level` (C `reset_trapset` on leave) |
| map / D-log | Keep D-1023; next flip book/coin |

## C ↔ JS fidelity

### `doapply` — dispatch: faithful; TIME too generous
C `apply.c:4344` `OIL_LAMP`/`MAGIC_LAMP`/`BRASS_LANTERN` → `use_lamp` (void); `POT_OIL` → `light_cocktail(&obj)`; `4388` `LAND_MINE`/`BEARTRAP` → `use_trap` then **if** `occupation == set_trap` then `obj = NULL` (no `arti_speak`); `4279` `BAG_OF_TRICKS` → `bagotricks(obj, FALSE, NULL)`. `res` starts at `ECMD_TIME`.

JS: same cases, systematic `return true`. No `obj = null` if occupation. JS `doapply` has no `arti_speak` on the way out anyway — inert gap until that arm exists.

### `use_lamp` — C graph copied
C `apply.c:1628–1700`. JS `apply.js:5219`.

Order: `lamplit` → `end_burn` snuff; Underwater diving/candle mix; `age==0` / magic `spe==0` lantern vs “no oil”; `cursed && !rn2(2)` then `!rn2(3)` spill `make_glib((Glib&TIMEOUT)+d(2,10))` else flicker/nothing; **else** light `begin_burn`.

JS `return`s after the cursed-fail branch: equivalent to C `if/else` (fail does not `begin_burn`). RNG `rn2(2)` then maybe `rn2(3)` then `d(2,10)`: same order.

**Gaps:** `check_unpaid` / candle bill SetVoice named. `Shk_Your_apply` / local `yname` `your ${xname}` (already wrong for shops). JS `Glib`: `(game.u?.Glib\|0) & TIMEOUT` — if `Glib` is not C `HGlib\|EGlib`, the glib timeout is wrong. `begin_burn` (`timeout.js`) is an earlier port still-named-omit `update_inventory`.

### `light_cocktail` — almost; `**optr` ignored
C `apply.c:1703` takes `struct obj **` and writes `*optr = obj` after split/hold/snuff-merge.

JS `light_cocktail(obj0)`: swallow `no_elbow_room`; snuff + `freeinv`/`addinv` if `!owornmask`; Underwater oxygen; `splitobj(1)`; light + dim; unpaid `bill_dummy` (no SetVoice “in addition”); `makeknown`; `begin_burn` **after** bill (match); split → extract + `nomerge` + `hold_another_object`.

JS `doapply` does not use `obj` after the await → C `*optr` has no effect here. A future caller (rub / tip) that expects the updated pointer will break.

### `use_trap` / `set_trap` — occupation wired; shop helpers thin
C `apply.c:2821–2951`. `what` guards in the **same order** (nohands, Stunned, swallow digest/engulf, Underwater, Lev, pool, lava, stairs/ladder, furniture/obstructed/door/trap, air/cloud). DEX/STR `time_needed`, Blind ×2, riding `rnl(10)>3` cursed/Fumble vs `>5`, landmine `force_bungle` vs beartrap `dropx`. Occupation `set_trap`.

JS: `set_occupation(set_trap, …)` import `engrave.js` — occupation tick is the D-0951 contract (`await occupation()`). `goto_level` calls `reset_trapset` (C leave).

**Gaps:** C `You_cant` vs JS `You can't` (apostrophe, visual match). `use_unpaid_trapobj` = `bill_dummy` only (SetVoice omitted). C `On_stairs` vs JS `stairway_at` as guard — OK if the stairs table is complete. `maketrap` / `dotrap` / `feeltrap` are **partial** trap.js ports: an armed trap is not C `dotrap`.

C `doapply` after `use_trap`: even “You can't set” **takes a turn** (`res` stays TIME). JS `return true`: match.

### `bagotricks` — RNG faithful; charge / seencount thin
C `makemon.c:2554`. `spe<1` empty vs `nothing_happens` + `cknown` if dknown+name_known; else `consume_obj_charge(bag, !tipping)`; `!rn2(23)` → `creatcnt += rnd(7)`; `makemon(NULL, ux, uy, NO_MM_FLAGS)`; seecount canspot/sensemon; makeknown if seen.

JS: same RNG, same loop. Local `consume_obj_charge` = `spe--` **without** unpaid (`_maybe_unpaid` void). C `seencount` is `int*`; JS expects `{n:}` — `doapply` passes `null` (match). A C tip increments `*seencount`; a JS tip that passed an integer would break. C `impossible("bad bag")` vs JS `return 0`.

`makemon(null, …)` depends on the JS random-monster generator — a BoT is not the C bestiary.

## Constitution / playbook
Grep of the diff: no FORCE/DIAG/fs/fastforward/seed-gate. Rule #2 OK. `await` occupation/`nhgetch` via riding `yn_function`. `reset_trapset` on `goto_level` is not an off-contract await.

## Density (§2b)
**Too big.** Four C families (apply light ×2, trap occupation, makemon BoT). Playbook: one family. Replay of D-1022 / D-0951.

## Documentation
D-log names unpaid / SetVoice / consume_obj_charge. Undersells `begin_burn` / `maketrap` / `makemon(NULL)` as real surface. CURRENT then broke the cluster (flip, then candle, …) — the dump did not teach density.

## Verification
Green + apply cohort. Public **unhit**. Private journal node (not re-read here): empty / begin — does not falsify multi-turn `set_trap`, glib spill, BoT `rn2(23)`.

## Risks / debt
1. Density: four C functions Keep’d without a body review until now.
2. `makemon(NULL)` / `dotrap` / `begin_burn`: “Match C” is the **dispatch**, not the effect.
3. `consume_obj_charge` without shop. **Addressed:** D-1047 `2ca2ccd7`
4. `light_cocktail` without `**optr`. **Addressed:** D-1046 `3371ddf0`
5. Trap occupation: first apply occupation path besides pickaxe — private canary (floor beartrap, 2–5 turns).

## Verdict
- Verdict: **QUALITY-RISK**
- Score: **4.5 / 10**
- One sentence: the **skeleton** (guard order, lamp/trap/BoT RNG, `set_trap` occupation, TIME even on trap failure) is a C copy; stuffing four of them into one SHA, plus still-partial callees, is the same overclaim as D-1022.

**Addressed:** D-1047 `2ca2ccd7`
**Addressed:** D-1046 `3371ddf0`
