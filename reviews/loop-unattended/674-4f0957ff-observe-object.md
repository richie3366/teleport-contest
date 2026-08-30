# Review 674 — 4f0957ff — o_init.c observe_object FIRST_OBJECT skip (D-1713)

## Metadata
- Full / short hash: `4f0957ff70b978910f264aec6ad598ce89436bb4` / `4f0957ff`
- Parent: `00f70d3d` (D-1712). This file audits **this SHA only** (sixth of nine `js/` commits since review **668**). Archive **Addressed:** D-1713 `4f0957ff`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 06:20:27 +0200
- D-id: **D-1713**
- Stats: `js/invent.js` +12/−6. Total `js/` insertions **12** <250. Band **150–350**. C body is 11 lines — density floor does not apply.
- Claims to close: Open `observe_object` FIRST_OBJECT skip (generic/STRANGE_OBJECT keep `dknown` 0). Not `undiscover_object` (D-1691). Not `useupall`/`obfree`. `reviews/loop-2026-08-15/` has no unpaid observe Must-fix.
- JS / map: `invent.js` `observe_object`. `c-js-map/turns.md`.
- Prior: none written; D-1691 left `// FIRST_OBJECT / generic skip deferred`.

## Intent vs deliverable

Git subject promises: generic and STRANGE_OBJECT keep `dknown` 0, instead of always marking seen after D-1691.

`node scripts/csym.mjs observe_object` → `o_init.c:441–451`. `--callers`: 62 sites including `invent.c:171` / `:1039` / `:1217`. `discover_object` `:453–494` (also returns on `oindx < FIRST_OBJECT`). `Hallucination` `youprop.h:120` `HHallucination && !Halluc_resistance`. `FIRST_OBJECT` is generated 18 (ARROW); C enum starts real objects there.

```441:451:nethack-c/upstream/src/o_init.c
void
observe_object(struct obj *obj)
{
    int oindx = obj->otyp;

    /* skip for generic objects and for STRANGE_OBJECT */
    if (oindx >= FIRST_OBJECT && !Hallucination) {
        obj->dknown = 1;
        discover_object(oindx, FALSE, TRUE, FALSE);
    }
}
```

Parent: `if (!obj || game.u?.Hallucination) return` then always `dknown=1`; `discover_object(otyp, false, true)` (3 args). The diff **does** `oindx >= FIRST_OBJECT && !Hallucination()`; `discover_object(..., FALSE, TRUE, FALSE)`. It **does not** port `useupall`/`obfree`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `observe_object` | LIVE repaired | C `:441–451` |
| `Hallucination` | LIVE import | `display.js:370` youprop. `do_name.js` also exports — **IMPORT display**, do not add #3 |
| `discover_object` | LIVE | 4th arg now explicit FALSE (`credit_hero`) |
| `FIRST_OBJECT` | LIVE | already imported; 18 |
| `STRANGE_OBJECT` | OMIT as name | C test is `>= FIRST_OBJECT`, not a second constant. NOT FOUND — do not add |
| `useupall` / `obfree` | OMIT named | |

`node scripts/sym.mjs`:

```
observe_object   js/invent.js:2530   sync
discover_object  js/invent.js:3760   sync
Hallucination    js/display.js:370   sync
                 js/do_name.js:232   sync  — multiple exports; this SHA imported display.js
FIRST_OBJECT     js/generated/objects_data.js:10   sync
STRANGE_OBJECT   NOT FOUND
```

Re-points: added `Hallucination` to the existing `display.js` import. `--can js/invent.js js/display.js Hallucination`: **ALREADY**. No TDZ. Do **not** import `do_name.js` `Hallucination`. Do **not** add a 9th local clone. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

JS (`invent.js:2530–2538`): `if (!obj) return`; `oindx = obj.otyp`; `if (oindx >= FIRST_OBJECT && !Hallucination()) { dknown = 1; discover_object(oindx, false, true, false); }`. Extra null guard vs C `NONNULLARG1` is not a scored fork. The `if` **Match `:447`.**

**FIRST_OBJECT skip.** C comment: skip generic objects and STRANGE_OBJECT. The test is `oindx >= FIRST_OBJECT` only — not a second `STRANGE_OBJECT` constant (`sym.mjs` NOT FOUND; do not add). Generics and STRANGE sit below ARROW (18). Parent always set `dknown=1` after a sticky `u.Hallucination` return. Generic/STRANGE would have been marked seen; `discover_object` would still no-op on `oindx < FIRST_OBJECT` (`o_init.c:460–461`), but **dknown would be 1**. C leaves dknown 0. This SHA restores that. **Match `:447–450`.**

**Hallucination.** C `youprop.h:120` is `HHallucination && !Halluc_resistance`, not sticky `u.Hallucination`. `Hallucination()` (`display.js:370–382`) tests H/uprops HALLUC then Halluc_resistance (sticky / H / E / uprops). Parent `game.u?.Hallucination` skipped resistance — a Halluc_resistance hero would fail to observe. JS now the youprop helper (D-1493). **Match the macro.**

**`discover_object`.** C `(oindx, FALSE, TRUE, FALSE)` — not known, encountered yes, no wisdom (`credit_hero` would `exercise(A_WIS)` at `:486`). Parent omitted the 4th arg; JS default was already `false`. Explicit 4th `false` **Match `:449`.** Inner `oindx < FIRST_OBJECT` return remains (`js/invent.js:3766`). Double gate like C. No RNG in `observe_object`.

**Callee closure.** LIVE: `Hallucination`, `discover_object`, `FIRST_OBJECT`. CLONE: none. STUB: none. OMIT named: `useupall`/`obfree`. Combined-arm ships.

JS body:

```2530:2538:js/invent.js
export function observe_object(obj) {
    if (!obj) return;
    const oindx = obj.otyp;
    /* skip for generic objects and for STRANGE_OBJECT */
    if (oindx >= FIRST_OBJECT && !Hallucination()) {
        obj.dknown = 1;
        discover_object(oindx, false, true, false);
    }
}
```

C `discover_object` first gate (`o_init.c:460–461`): `if (oindx < FIRST_OBJECT) return;` — JS `:3766` the same. Observe sets dknown only when that bound and `!Hallucination()` both pass; discover then refuses generics again. Two gates, one purpose. `credit_hero` FALSE means no `exercise(A_WIS)` even if a later caller marks known.

`--callers observe_object` also hits `apply.c:2692`, `artifact.c:1575`/`1592`/`1622`/`1639`, `detect.c:253`/`935`/`1511`, `display.c:349`/`1599`, `do_wear.c:1204`/`1209`, `eat.c:1555`/`1589`/`1605`/`1653`/`2278`. This SHA did not restub those JS call sites; they inherit the FIRST_OBJECT skip. Do **not** treat leftover sticky `u.Hallucination` at a caller as a reason to revert this body’s youprop helper.

**Callers (`csym --callers` = 62).** This SHA did not re-port them. JS invent/addinv/hold_another_object already called `observe_object`; they inherit the skip. `fountain.c:645` is one C site; JS `fountain.js:421` still gates `!(Blind || u.Hallucination)` **in addition** — extra sticky skip, pre-existing caller debt, not this body’s C-wrong. `learn_unseen_invent` (`invent.js:2545`) already called this function and now skips generics too.

## Hallucinations / overclaim

Subject “generic and STRANGE_OBJECT keep dknown 0, instead of always marking seen”: **true** for `observe_object`. Do **not** stamp “Match C `useupall`/`obfree`.” Do **not** stamp “Match C `undiscover_object`.” Do **not** add `STRANGE_OBJECT` as a named export to “match the comment.” Do **not** import `do_name.js` `Hallucination`. Do **not** restore sticky `u.Hallucination` here. Journal “fortress held” is not a generic-otyp proof.

Not “dispatch ported, callee stubbed.” `discover_object` was already LIVE.

## Density

§2b: one 11-line C function. +12. Related Hallu youprop swap is the guarding `if`, not a second cluster. Did not glue `obfree`.

## Verification

D-log / journal: save-oracle skip (untagged); canary STRANGE/LAST_GENERIC skip, FIRST_OBJECT sees, Hallu skip, Halluc_resistance sees; green+strict; focused seed0383; cohort 7/7. Public pickup/addinv **is** hit. Generic/STRANGE `observe_object` **public-unhit**. Admit that. Canary is the bound check.

## Actionable C-wrongs

None for Must-fix. Named: `useupall` / `obfree`; Hallu `obj_to_glyph` query; steal/muse `unknow_object`; fountain/trap callers still sticky `u.Hallucination`. Do **not** add `Hallucination` #3. Do **not** add `STRANGE_OBJECT` #1. Do **not** pass `credit_hero` TRUE from `observe_object`. Do **not** restore always-`dknown=1`. Do **not** skip `discover_object`’s own FIRST_OBJECT return (C has both).

Verdict: **ACCEPT-WITH-DEBT**
