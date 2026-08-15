# Review 08 — 2ca2ccd7 — consume_obj_charge unpaid / check_unpaid (D-1047)

## Metadata
- Full / short hash: `2ca2ccd757e09a30fc69f4a86a1f1a33792408dc` / `2ca2ccd7`
- Parent: `3371ddf0` (D-1046)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 23:20:16 +0200
- D-id: **D-1047**
- Stats: 18 files, +289 / −138 — `js/shk.js` +108, `js/invent.js` +17, stub deletes in apply/detect/music/mkobj, pickup tip restore-spe
- Claims to close: D-1023 **risk 3** (local `consume_obj_charge` was `spe--` with `_maybe_unpaid` void). Stamped **Addressed:** D-1047 on that review (hash filled in **this** review commit).
- JS / map: `invent.js` / `shk.js` / callers; `c-js-map/debt.md` invent + apply rows; cadence still **#1315** (next @**#1320**)

## Intent vs deliverable

Git subject promises: “Match C consume_obj_charge unpaid check_unpaid so shop usage fees bill debit before spe--.”

D-1023 risk 3: apply/detect/music/mkobj each had a local `consume_obj_charge(obj, _maybe_unpaid) { obj.spe -= 1 }`. C `invent.c:1336–1346` calls `check_unpaid(obj)` when `maybe_unpaid`, then `spe -= 1`, then `update_inventory` if known. Shop use of an unpaid charged tool never debit’d or spoke a usage fee.

The diff **does** add one `invent.js` `consume_obj_charge`, port `shk.c` `cost_per_charge` / `check_unpaid_usage` / `check_unpaid`, delete the four local stubs, await the real function from camera / grease / tinning / bell / BoT / crystal ball / instruments / horn, and restore `spe` then `check_unpaid_usage(box, true)` on tip empty (C `pickup.c:4021–4028`).

It does **not** port SetVoice, `update_inventory` perm_invent redraw, trap.c squeaky-grease `consume_obj_charge`, pickup spill grease `consume_obj_charge`, or **direct** `check_unpaid` sites (lamp light, oil cocktail, catch_lit, dorub djinni `altusage TRUE`, zap/write/spell/engrave). The subject does not claim those. D-log names them.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `consume_obj_charge` | C function, new in `invent.js` | `invent.c:1336–1346`; dynamic `import('./shk.js')` to break invent↔shk cycle |
| `check_unpaid` | C function, new export | `shk.c:5738–5742` wrapper `altusage FALSE` |
| `check_unpaid_usage` | C function, new export | `shk.c:5688–5733` |
| `cost_per_charge` | C function, local | `shk.c:5626–5678` `staticfn`; not exported |
| `otyp_is_charged` | clone of `objects[].oc_charged` | generated table omits the bit; `objnam.js` name list |
| `shop_keeper` | imported C callee | string → `charCodeAt(0)` ≡ C `*u.ushops` |
| `inhishop` / `get_cost` | imported C callees | pre-existing |
| `cad` / `currency` / `muteshk` / `hero_deaf` | clones | pre-existing; `cad` neuter `poly_gender==2` still `"cad"`/`"minx"` |
| `exercise` | imported C callee | `A_WIS` when verbalize runs |
| `verbalize` | imported C callee | SetVoice deferred |
| apply/detect/music/mkobj locals | **deleted** | were `spe--` no-ops on unpaid |
| `tipcontainer` restore-spe | C sequence | `pickup.c:4024–4028`; `subfrombill` still named |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunks. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### `consume_obj_charge` — call-for-call

C `invent.c:1336–1346`:

```
void consume_obj_charge(struct obj *obj, boolean maybe_unpaid)
{
    if (maybe_unpaid)
        check_unpaid(obj);
    obj->spe -= 1;
    if (obj->known)
        update_inventory();
}
```

JS `invent.js:1223–1231`: `maybe_unpaid` → `await check_unpaid(obj)`; then `obj.spe = (obj.spe|0) - 1`; `update_inventory` commented as perm_invent omit. Order matches. **No RNG here.** C `maybe_unpaid` false means the caller bills (tip BoT/horn: `consume_obj_charge(bag, !tipping)` then a single `check_unpaid_usage(box, TRUE)` after the loop). JS `bagotricks` / `hornoplenty` pass `!tipping`. Match.

Dynamic import is wiring, not a fake callee: `check_unpaid` is the new `shk.js` export. `shk.js` already imports `invent.js` (`makeknown` / `observe_object`), so a static invent→shk import would cycle.

### `cost_per_charge` — branch order and integer division

C `shk.c:5626–5678` after `tmp = get_cost(otmp, shkp)`:

| Gate | C | JS | Match |
|------|---|----|-------|
| `!shkp \|\| !inhishop` | return 0 | same (+ `!otmp`) | yes |
| `MAGIC_LAMP` `!altusage` | `tmp = objects[OIL_LAMP].oc_cost` (no angry surcharge) | `objects()?.[OIL_LAMP]?.oc_cost \| 0` | yes; `oc_cost` is generated `r[13]`; oil lamp base 10 |
| `MAGIC_LAMP` altusage | `tmp += tmp/3L` (djinni) | `Math.trunc(tmp/3)` | yes |
| `MAGIC_MARKER` | `tmp /= 2L` | trunc/2 | yes |
| `BAG_OF_TRICKS \|\| HORN_OF_PLENTY` | `if (!altusage) tmp /= 5L` (emptying keeps full `get_cost`) | same | yes |
| `CRYSTAL_BALL \|\| OIL_LAMP \|\| BRASS_LANTERN \|\| MAGIC_FLUTE..DRUM_OF_EARTHQUAKE \|\| WAND_CLASS` | `if (spe > 1) tmp /= 4L` | same | yes |
| `SPBOOK_CLASS` | `tmp -= tmp/5L` | trunc | yes |
| `CAN_OF_GREASE \|\| TINNING_KIT \|\| EXPENSIVE_CAMERA` | `tmp /= 10L` | trunc/10 | yes |
| `POT_OIL` | `tmp /= 5L` | trunc/5 | yes |
| else | `get_cost` unchanged | same | yes (BELL_OF_OPENING, …) |

JS objectNames `MAGIC_FLUTE` 248 … `DRUM_OF_EARTHQUAKE` 258 is C `objects.h:983–1005` order: MAGIC_FLUTE, TOOLED_HORN, FROST_HORN, FIRE_HORN, **HORN_OF_PLENTY**, WOODEN_HARP, MAGIC_HARP, BELL, BUGLE, LEATHER_DRUM, DRUM. HORN_OF_PLENTY sits in that range but the **earlier** `if` takes it (C too). WOODEN_FLUTE 247 is **before** MAGIC_FLUTE, so it is not in the `/4` arm (C too). Last charge (`spe == 1`) bills full `get_cost` so exhaustive use costs more than buying. Match.

`objects` in `shk.js` is `export function objects()` — `objects()?.[OIL_LAMP]` is a call, not `objects[OIL_LAMP]`. Correct for this module.

### `check_unpaid_usage` — gates, RNG, debit

C `shk.c:5688–5733`:

1. Return if `!unpaid \|\| !*u.ushops \|\| (spe <= 0 && objects[otyp].oc_charged)`.
2. `shop_keeper(*u.ushops)`; return if `!shkp \|\| !inhishop`.
3. `tmp = cost_per_charge(...)`; return if 0.
4. Build `fmt` / `arg1` / `arg2`:
   - SPBOOK: `rn2(2)` library prefix; `" an additional"` if `ESHK->debit > 0`.
   - POT_OIL: Yendorian Fuel Tax; **no extra RNG**.
   - `altusage && (BAG_OF_TRICKS \|\| HORN_OF_PLENTY)`: **two** `if (!rn2(3))` on `arg1` (`"Whoa!  "` then maybe overwrite `"Watch it!  "`).
   - else: `!rn2(3)` → `"Hey!  "` on `arg1`; `!rn2(3)` → `"Ahem.  "` on `arg2`.
5. If `!Deaf && !muteshk`: SetVoice, `verbalize`, `exercise(A_WIS, TRUE)`.
6. **Always** `ESHK(shkp)->debit += tmp` (even when deaf/mute).

JS `shk.js:2269–2316`: same unpaid / `ushops.charCodeAt(0)` / empty-charged skip; `shop_keeper(ushops)` uses first char (`shk.js:197–199`); same `cost_per_charge`; same four message arms including the BoT overwrite; `hero_deaf()` / `muteshk`; `verbalize` then `exercise`; then `eshk.debit += tmp`.

**RNG call-for-call on the live arms:** SPBOOK one `rn2(2)`; BoT/horn altusage two `rn2(3)`; default usage-fee two `rn2(3)`; POT_OIL zero. C always consumes both `rn2(3)` even when the first already set `arg1`. JS two sequential `if`s, not `else if`. Match.

`Deaf` is `HDeaf \|\| EDeaf \|\| u.uroleplay.deaf` (`youprop.h:125`). JS `hero_deaf` also ORs flat `u.Deaf` (pre-existing shk clone). Extra skip of the **voice** only; debit still runs. Not a Must-fix peel.

C empty skip uses **only** `objects[otyp].oc_charged`. Generated `createObjectsArray` never sets `oc_charged` (chg bit not extracted). JS `charged = !!(oc?.oc_charged) \|\| otyp_is_charged(otyp)`. That clone lists C `chg=1` consume otyps: camera, marker, crystal ball, tinning kit, grease, BoT, magic flute/harp, frost/fire horn, horn of plenty, drum of earthquake, BELL_OF_OPENING, WAND_CLASS, WEAPON_CLASS, WEPTOOL (`BITS(..., chrg=1)`). It does **not** list MAGIC_LAMP / OIL_LAMP / BRASS_LANTERN / POT_OIL (C `chg=0`). Lighting an unpaid magic lamp with `spe==0` still bills the oil-lamp `oc_cost` in both. Empty charged wand skips in both.

`muteshk` is C `#define muteshk (helpless \|\| data->msound <= MS_ANIMAL)`. JS function matches (isshk default `MS_SELL`). `currency` is always zorkmid(s); C Hallu `ROLL_FROM` named in shk header. SPBOOK `cad(false)` uses pre-existing `cad`; `poly_gender==2` (neuter) still cannot return `"beast"`. Exotic unpaid-spellbook-while-jelly path; named on `cad`, not a new Must-fix.

### Call sites — stubs gone where claimed

| C locus | JS after this SHA |
|---------|-------------------|
| `apply.c:92` camera | `await consume_obj_charge(obj, true)` |
| `apply.c:1254` charged BofO | same |
| `apply.c:2221` tinning | same |
| `apply.c:2619,2631` grease | same (slip + success) |
| `makemon.c:2575` `bagotricks` | `await consume_obj_charge(bag, !tipping)` |
| `music.c:590,613,660,693` | earthquake / flute / fire|frost / harp |
| `detect.c:1255,1292,1332` crystal ball | three awaits |
| `mkobj.c:2866` `hornoplenty` | `await consume_obj_charge(horn, !tipping)` |
| `pickup.c:4024–4028` tip | restore `oldSpe`, `check_unpaid_usage(box, true)`, `spe=0`, `cknown=1` |
| `trap.c:5649` unsqueak grease | **not wired** (named) |
| `pickup.c:3662` spill grease | **not wired** (named) |

`use_lamp` / `light_cocktail` / `catch_lit` / dorub djinni still comment `check_unpaid deferred`. Those are C **direct** `check_unpaid` / `check_unpaid_usage(..., TRUE)`, not `consume_obj_charge`. D-1047 does not close D-1023’s lamp Glib Must-fix or oil “in addition” omit.

Tip: JS already `addtobill` when `maybeshopgoods && !no_charge` (C `pickup.c:4009–4010`). Still returns without C `subfrombill` (`4030–4031`). Was named before this SHA; D-log keeps it named. Not a new contradiction introduced as “Match C tipcontainer.”

## Hallucinations / overclaim

“Match C consume_obj_charge unpaid check_unpaid so shop usage fees bill debit before spe--” is **true for the invent function and its shk callees.** This is **not** “Match C dispatch, callee is a stub.” D-1023’s BoT/camera/horn dispatch called a `spe--` clone; this SHA replaces that clone with C `check_unpaid` → `cost_per_charge` debit + verbalize, then `spe--`.

It is **not** a claim that every C `check_unpaid` call site now runs, or that SetVoice / perm_invent / trap unsqueak / spill grease are C. Stamping D-1023 risk 3 **Addressed** is fair for `consume_obj_charge` unpaid. Risk 4 was D-1046. `use_lamp` Glib stays Must-fix.

Cadence still **#1315**; #1316 is not a score refresh. Journal admits public **unhit**. Private 9/9 (paid/no-ushops skip; unpaid wand debit; `maybe_unpaid` false; empty charged skip; MAGIC_LAMP oil `oc_cost`; BoT altusage; Usage-fee verbalize) is the right falsifier. It does not exercise SPBOOK `rn2(2)`, POT_OIL tax string, or deaf-but-debit.

## Density (§2b)

One billing family: `consume_obj_charge` + the three C functions it always calls + the tip restore-spe companion C documented next to it. ~120 lines of C-faithful JS plus stub deletes. Wiring existing consume sites is the same helper, not a second hypothesis. Not “finish shops.” Right size for the Must-fix. Direct lamp/oil `check_unpaid` left behind on purpose.

`zap.js` `wand.spe--` is C `check_unpaid` in `zap.c`, not `consume_obj_charge`. Out of this envelope.

## Verification

Journal: green+strict PASS; apply cohort **9**/9 (seed0361 Scr **366**/366). Private node **9**/9. Path **unhit**. Shared `consume_obj_charge` now also bills camera / grease / tinning / bell / instruments / crystal ball / horn when unpaid in a shop — green+cohort covers those public paths only insofar as they already ran; none of the public seeds is a shop usage-fee canary. Adequate: fortress plus private debit/verbalize checks. Full `sessions` correctly deferred to cadence **#1320**.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1023 risk 3 (`spe--` only) is actually closed.

Named omits (map, not queue): SetVoice; `update_inventory` when `obj.known`; generated `oc_charged` bit (clone `otyp_is_charged`); Hallu `currency`; `cad` neuter; tip `subfrombill`; trap unsqueak / pickup spill `consume_obj_charge`; direct `check_unpaid` in `use_lamp` / `light_cocktail` / `catch_lit` / dorub djinni / zap / write / spell / engrave. Remaining Must-fix is still Vlad `HConfusion` only (D-1033 risk 2), then `take_gold` / telekinesis / `u_wipe_engr` / Glib `HGlib|EGlib` / `cry_sound` / `get_obj_location` flags.

Do not restore local `spe--` `consume_obj_charge`. Do not pop tut-1 while Must-fix is open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8.5 / 10**
- One sentence: one invent `consume_obj_charge` calls real `check_unpaid` → `cost_per_charge` (oil-lamp `oc_cost`, BoT `/5` vs altusage full, last charge full `get_cost`) then `spe--`; debit always, verbalize+`rn2` only if `!Deaf && !muteshk`; lamp/oil direct `check_unpaid` stays named.
