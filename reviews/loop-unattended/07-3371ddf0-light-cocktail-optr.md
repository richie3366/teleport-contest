# Review 07 — 3371ddf0 — light_cocktail struct obj ** (D-1046)

## Metadata
- Full / short hash: `3371ddf00db89f8396f77dd09637b9859686ddfd` / `3371ddf0`
- Parent: `abda6e80` (reviews 05/06; no new Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 22:42:04 +0200
- D-id: **D-1046**
- Stats: 12 files, +137 / −87 — `js/apply.js` +22 / −3 (signature + two `*optr` writes + `doapply` box)
- Claims to close: D-1023 **risk 4** (`light_cocktail` took obj by value). Stamped **Addressed:** D-1046 `3371ddf0` on that review (hash already filled in the fix commit).
- JS / map: `apply.js` only; `c-js-map/absent.md` / `debt.md` apply row; cadence **#1315** **44**/44

## Intent vs deliverable

Git subject promises: “Match C light_cocktail struct obj ** so snuff-merge and split update the caller pointer.”

D-1023 risk 4: JS `light_cocktail(obj0)` copied the flask. C `apply.c:1703` is `light_cocktail(struct obj **optr)`. After an unworn snuff, C writes `*optr = addinv(obj)` (merged survivor). After lighting a stack, C writes `*optr = obj` (split-off child, possibly after `hold_another_object` returns NULL). `doapply` calls `light_cocktail(&obj)` (`apply.c:4349–4351`) so later `arti_speak(obj)` (`apply.c:4421–4423`) would see the child/merged pointer, not the pre-split stack.

The diff **does** change the JS parameter to `{ obj }`, write `optr.obj` at those two C sites, leave swallow / underwater / worn-snuff alone, and make `doapply` `let obj` plus `const optr = { obj }; … obj = optr.obj`.

It does **not** port `check_unpaid` + SetVoice “in addition to the cost of the potion”, `arti_speak` after `doapply`, or `use_candle` / `use_bell` / `use_crystal_ball` / `use_figurine` / `use_unicorn_horn` `struct obj **`. The subject does not claim those. D-log names them.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `light_cocktail` | C function, retouched | `apply.c:1702–1765`; now takes `{ obj }` like `struct obj **` |
| `doapply` `POT_OIL` | C caller, retouched | `apply.c:4349–4351` `light_cocktail(&obj)` |
| `addinv` | imported C callee | `u_init.js`; snuff-merge survivor (age-weighted `merged`) |
| `freeinv_apply` | clone of `invent.c` `freeinv` | pre-existing splice + `OBJ_FREE`; not this SHA |
| `splitobj` | imported C callee | `mkobj.js:308`; child not spliced into `invent[]` (D-0924) |
| `hold_another_object` | imported C callee | invent; may return null |
| `end_burn` / `begin_burn` | imported, still-partial | named omit since D-1023 |
| `shk_your_apply` | leftover oil clone | “You light %spotion”; not `shk_your` |
| `bill_dummy_object` | imported C callee | full-use bill; `check_unpaid` still skipped |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. Pre-existing `FORCEBUNGLE` / `J_DIAG` in apply are trap/trajectory flags, not this SHA. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### C writes — two sites, three early returns

C `apply.c:1702–1765` (body + guarding `if`):

```
struct obj *obj = *optr;
if (u.uswallow) { You(no_elbow_room); return; }
if (obj->lamplit) {
    You("snuff the lit potion.");
    end_burn(obj, TRUE);
    if (!obj->owornmask) {
        freeinv(obj);
        *optr = addinv(obj);
    }
    return;
} else if (Underwater) {
    There("is not enough oxygen to sustain a fire.");
    return;
}
split1off = (obj->quan > 1L);
if (split1off) obj = splitobj(obj, 1L);
You("light %spotion.%s", shk_your(buf, obj), Blind ? "" : "  It gives off a dim light.");
if (obj->unpaid && costly_spot(u.ux, u.uy)) {
    check_unpaid(obj);
    SetVoice(shkp, 0, 80, 0);
    verbalize("That's in addition to the cost of the potion, of course.");
    bill_dummy_object(obj);
}
makeknown(obj->otyp);
begin_burn(obj, FALSE);
if (split1off) {
    obj_extract_self(obj);
    obj->nomerge = 1;
    obj = hold_another_object(obj, "You drop %s!", doname(obj), (const char *) 0);
    if (obj) obj->nomerge = 0;
}
*optr = obj;
```

JS `apply.js:5188–5236` (this SHA):

- Swallow: pline, **return, no `optr.obj` write**. Match.
- Lamplit: `end_burn`; if `!owornmask` then `freeinv_apply` then **`optr.obj = await addinv(obj)`**; return. Match C `*optr = addinv`. Worn snuff (uwep / uswapwep / uquiver) leaves `*optr`. Match. C comment: merging a wielded flask into a quivered stack panics; JS keeps the same `owornmask` gate.
- Underwater: separate `if` after the lamplit `return`, not C’s `else if`. Same because lamplit returns. **No RNG** on these arms.
- `split1off = (obj.quan \|\| 1) > 1` then `const child = splitobj(obj, 1); if (child) obj = child`. C always assigns `obj = splitobj`. JS `splitobj` returns null when `quan <= num` (`mkobj.js:310`). For `quan > 1` and `num == 1`, `quan > num`, so the child is assigned. Not a live miss.
- Light pline / `bill_dummy` / `makeknown` / `begin_burn` / split extract+nomerge+hold: pre-existing D-1023 body. This SHA adds **`optr.obj = obj`** after that, including when `hold_another_object` returns null. Match C `*optr = obj`.

**No `rn2` / `rnd` / `rn1` / `d` in `light_cocktail`.** Shop `check_unpaid` inside this function is still omitted (see below); that path has no RNG in C either (`check_unpaid` RNG lives in `check_unpaid_usage`, which this function does not call in JS).

C `You("light %spotion.%s", shk_your(buf, obj), …)` uses real `shk_your` (`shk.c:5862`). JS still interpolates leftover `shk_your_apply` (your/the only). That clone predates this SHA; D-1045 left it in the oil envelope on purpose. Not a `**optr` miss.

C unpaid arm: `check_unpaid(obj)` (POT_OIL `cost_per_charge` `/5` + Fuel Tax verbalize) **then** SetVoice **then** “That’s in addition to the cost of the potion, of course.” **then** `bill_dummy_object`. JS `if (obj.unpaid && costly_spot) await bill_dummy_object(obj)` only. D-1047’s shared `check_unpaid` does not reach this arm: C `light_cocktail` calls `check_unpaid` **directly**, not via `consume_obj_charge` (oil lighting is not a `spe--`). Named omit stays named.

`makeknown` then `begin_burn(..., FALSE)` after billing: both still do that order. `begin_burn` remains the earlier timeout port (D-1023 named omit).

### Caller — `doapply` `&obj`

C `apply.c:4349–4351`: `case POT_OIL: light_cocktail(&obj); break;` then falls through to `if (obj && obj->oartifact) res |= arti_speak(obj)` (`4421–4423`). `res` started as `ECMD_TIME` (`doapply` does not assign `res` on this arm, so a cancelled cocktail still costs a turn — there is no cancel; swallow/snuff/underwater still TIME).

JS `apply.js:2836–2841`: `{ obj }` box, `await light_cocktail(optr)`, `obj = optr.obj`, **`return true`**. TIME even on swallow/snuff matches C. The assignment is currently unused: JS still has no `arti_speak`. That is the C reason `*optr` exists. Wiring the box without the later callee is not “Match C dispatch, callee is a stub” — `light_cocktail` itself is the callee, and it now mutates the pointer. `arti_speak` stays a named omit.

C swallow uses `You(no_elbow_room)` (`"You don't have enough elbow-room to maneuver."`). JS hardcodes that string. Same text; not a new helper.

C also passes `**` into `use_bell`, `use_candle`, `use_crystal_ball`, `use_figurine`, `use_unicorn_horn`. JS those still take obj by value. D-log deferred them. Not this Must-fix.

### Snuff-merge survivor

C `addinv` → `merged()` averages `age` by quantity, returns the surviving stack, `obfree`s the incoming pointer. JS `u_init.js` `addinv` walks `game.invent` with `mergable`, averages age the same way (`(oa*oq+na*nq)/(oq+nq)`), returns `otmp`. `*optr` / `optr.obj` is that survivor. Private tests named that.

`freeinv_apply` (`apply.js:4350–4356`) is still a splice clone: drop from `game.invent[]`, `where = OBJ_FREE`. C `freeinv` also `setnotworn`, `update_inventory`, and clears `uwep`/`uswapwep`/`uquiver` when those slots hold `obj`. The C snuff-merge path is gated `!owornmask`, so those slots are not this flask. Display omit named since D-1023. Not introduced by the `**` retouch.

C `splitobj` inserts the child on the invent `nobj` chain; `obj_extract_self` then pulls it before `hold_another_object`. JS `splitobj` **does not** splice the child into `game.invent[]` (D-0924 duplicate-invlet). `light_cocktail` still `obj_extract_self` + `nomerge` + `hold_another_object` on that child, then `optr.obj = obj`. The pointer identity is the C child (or null if hold drops it). The invent-list shape around the split remains the older apply/split debt, not a new `**` lie.

`doapply` `getobj` is now `let obj` with a comment that C mutates via `&obj`. Only the POT_OIL arm uses the box. Wand / book / coin / lamp still pass `obj` by value, matching C (`use_lamp(obj)` is not `**`).

C `light_cocktail` is `staticfn` — the only caller in pinned C is `doapply` `POT_OIL`. JS `export async function` is for the private pointer tests, not a second production caller. Grep of `js/` finds no other `light_cocktail(` site.

## Hallucinations / overclaim

“Match C light_cocktail struct obj ** so snuff-merge and split update the caller pointer” is **true for the two C writes and the `doapply` box.** This is **not** “Match C dispatch, callee is a stub.” D-1023’s overclaim was the opposite: dispatch said `light_cocktail` while the function ignored `**`. This SHA closes that.

It is **not** a claim that shop `check_unpaid` / SetVoice “in addition” now run. JS still `bill_dummy_object` only when `unpaid && costly_spot`. C bills partial-use (`check_unpaid` → Yendorian Fuel Tax via `cost_per_charge` `POT_OIL` `/5`) **then** the extra verbalize **then** `bill_dummy`. That gap is the same named omit as D-1023; D-1047’s shared `check_unpaid` does not call into `light_cocktail` (C uses a direct `check_unpaid(obj)` here, not `consume_obj_charge`). Stamping D-1023 risk 4 **Addressed** is fair for `**optr` only. Risk 3 is D-1047. `use_lamp` Glib remains Must-fix.

Cadence **#1315** 44/44 does not prove a lit oil flask. Journal admits public **unhit**. Private 13/13 (swallow/uw/worn leave `*optr`; snuff-merge survivor; split child) is the right falsifier.

## Density (§2b)

One signature family: the C `struct obj **` contract on an already-ported function. ~20 lines of JS. Playbook “too small” is a one-`if` map peel; this was the **queued Must-fix** (one C parameter + the two writes). Not “finish apply.” Oil `shk_your_apply` and shop `check_unpaid` left behind on purpose (other envelope / named omit).

## Verification

Journal: cadence **#1315** full `sessions` **44**/44 Scr **11405**/11405 RNG **100%** speed `33+0.27/turn` (R² 0.868); green+strict PASS; apply/combat cohort **9**/9 (seed0361 Scr 366/366; seed0105/0009/0012/0060/0102/1500/1800/2200). Private node **13**/13. Path **unhit**. Adequate: fortress plus private pointer checks. `arti_speak` still cannot observe the updated `obj` in JS.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1023 risk 4 (`**optr`) is actually closed.

Named omits (map, not queue): `light_cocktail` shop `check_unpaid` + SetVoice “in addition to the cost of the potion”; `doapply` `arti_speak` after the switch; `use_candle` / `use_bell` / `use_crystal_ball` / `use_figurine` / `use_unicorn_horn` still by-value (C `**` too); `shk_your_apply` vs `shk_your`; `freeinv_apply` vs full `freeinv`; `begin_burn` still-partial. Remaining Must-fix below this review is still `use_lamp` Glib `HGlib|EGlib`, then Vlad `HConfusion`, `take_gold` `remove_worn_item`, telekinesis, `u_wipe_engr`/`tmp_at`, `cry_sound` `msound`, `get_obj_location` flags.

Do not restore `light_cocktail(obj0)` by-value. Do not pop tut-1 as a substitute while Must-fix is open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: snuff-merge writes `*optr = addinv` and the light path writes `*optr` after split/hold; swallow / underwater / worn-snuff leave the caller pointer; shop `check_unpaid` inside this function stays a named omit.
