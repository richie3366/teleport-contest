# Review 664 — 3d728adf — shk.c shk_names_obj makeknown (D-1703)

## Metadata
- Full / short hash: `3d728adfc371fe5e45c090896060cd4ee230feb7` / `3d728adf`
- Parent: `c7648ccf` (D-1702). Eleventh of fifteen `js/` commits since **653**. Archive **Addressed:** D-1703 `3d728adf`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 04:11:09 +0200
- D-id: **D-1703**
- Stats: `js/shk.js` +16/−13. Total `js/` insertions **16** <250. Band **150–350** (id >454 floor **200**).
- Claims to close: Open `shk_names_obj` makeknown after D-1702 `!oc?.oc_magic`. Not `observe_object` FIRST_OBJECT. Not dopay getpos. `reviews/loop-2026-08-15/` has no unpaid `shk_names_obj` Must-fix.
- JS / map: `shk.js` `shk_names_obj`. `c-js-map/turns.md`.
- Prior: **663** noted missing-row `oc_magic` as D-1703’s Open.

## Intent vs deliverable

Git subject promises: shop buy/sell identifies non-magic saleable gear with `highc`/`plur`, instead of treating a missing class row as `oc_magic`-false after D-1702.

`node scripts/csym.mjs shk_names_obj` → `shk.c:3412–3445`. `--callers`: `dopayobj` `:2290`, `buy_container` `:2404`, `sellobj` `:4068` / `:4182`. `observe_object` `o_init.c:441–451`. `makeknown` `hack.h:1530` → `discover_object(..., TRUE, TRUE, TRUE)`. `highc` `hacklib.c:75–79`. `plur` `hack.h:1520`.

```3417:3444:nethack-c/upstream/src/shk.c
    boolean was_unknown = !obj->dknown;
    observe_object(obj);
    if (!objects[obj->otyp].oc_magic && saleable(shkp, obj)
        && (obj->oclass == WEAPON_CLASS || obj->oclass == ARMOR_CLASS
            || obj->oclass == SCROLL_CLASS || obj->oclass == SPBOOK_CLASS
            || obj->otyp == MIRROR)) {
        was_unknown |= !objects[obj->otyp].oc_name_known;
        makeknown(obj->otyp);
    }
    obj_name = paydoname(obj);
    if (was_unknown) {
        Sprintf(fmtbuf, "%%s; you %s", fmt);
        obj_name[0] = highc(obj_name[0]);
        pline(fmtbuf, obj_name, (obj->quan > 1L) ? "them" : "it", amt,
              plur(amt), arg);
    } else {
        You(fmt, obj_name, amt, plur(amt), arg);
    }
```

Parent (D-1702): `!oc?.oc_magic` (missing row ⇒ makeknown); `toUpperCase`; `(amt|0)` plur. The diff **does** require live `objects()[otyp]` before `oc_magic`; `was_unknown || !oc.oc_name_known`; imported `highc`; `plur(amt)` in the fmt fill; `quan > 1` without `|0`. It **does not** port `observe_object` `oindx >= FIRST_OBJECT`. Named. It **does not** add a 4th `discover_object` arg on that skip path. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `shk_names_obj` | LIVE | same-file static; class/otyp gate **Match** |
| `observe_object` | LIVE callee | FIRST_OBJECT skip OMIT named |
| `makeknown` | LIVE | `hack.h` macro |
| `saleable` / `paydoname` | LIVE | imports |
| `highc` | LIVE import | was `toUpperCase` clone |
| `plur` | CLONE | same-file `hack.h` macro; 7 locals already — do **not** add #8 |

`node scripts/sym.mjs`:

```
shk_names_obj    NOT EXPORTED — 1 LOCAL js/shk.js:2128
highc            js/hacklib.js:94   sync  (+ dokeylist.js local — IMPORT, do not add #2)
observe_object   js/invent.js:2527   sync
makeknown        js/invent.js:3796   sync
saleable         js/shknam.js:344   sync
paydoname        js/objnam.js:2540   sync
plur             NOT EXPORTED — 7 LOCAL clones (shk.js:160 among them)
```

Deleted: `toUpperCase` first-letter. Re-pointed: `highc` import. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Makeknown gate.** C indexes `objects[obj->otyp]` (always a table row in C). JS `const oc = objects()?.[obj.otyp]; if (oc && !oc.oc_magic && saleable(...) && (WEAPON|ARMOR|SCROLL|SPBOOK or MIRROR))`. Missing JS row **skips** makeknown (C would have crashed or hit a real object). That is the C-faithful JS guard, not `!undefined`. `was_unknown |= !oc.oc_name_known` **Match**. Class list **Match** including `MIRROR`. No RNG.

**`highc`.** C `hacklib.c:75–79`: a–z → `c & ~040`, else unchanged; assigned to `obj_name[0]`. JS `highc` is first-character-only (`hacklib.js:94–99`); `highc(obj_name) + obj_name.slice(1)` **Match** `obj_name[0] = highc(obj_name[0])`. Parent `toUpperCase()` on the whole first char via `charAt(0)` was ASCII-similar but not `highc` (Unicode / already-capital). **Match the callee they imported.**

**`plur` / fmt.** C `plur(x)` is `((x)==1)?"":"s"` (`hack.h:1520`). Unknown: `"%s; you " + fmt` then args `(obj_name, it/them, amt, plur(amt), arg)`. Known: `You(fmt, obj_name, amt, plur(amt), arg)`. JS fill walks `%s`/`%ld` with slots `[nameOrThem, plur(amt), arg]` and `%ld` → `String(amt)`. For `"bought %s for %ld gold piece%s.%s"` that is name, amt, s, arg. Unknown wraps `Name; you ` + fill(it/them). **Match.** Local `plur` still `(n|0)===1`; shop `amt` is integer gold. Do **not** add `plur` #8.

**Callers.** `dopayobj` / `buy_container` / `sellobj` still call this one local. Combined-arm: LIVE callees. `observe_object` FIRST_OBJECT is a named omit **inside** that callee, not a stub of `shk_names_obj`.

**`quan > 1`.** C `obj->quan > 1L` (long). JS `obj.quan > 1` without `|0`. **Match** better than the parent.

**`saleable` / `makeknown` arity.** C `makeknown` is `discover_object(x, TRUE, TRUE, TRUE)`. JS `makeknown` **Match**. `observe_object` stays three-arg + Hallucination skip. Named FIRST_OBJECT. `saleable` LIVE `shknam.js`. No `rn2` here.

**`arg` empty.** C `arg` can be `""`. JS `arg ?? ''`. **Match.** `You` vs `pline('You '+fill)` — C `You` prepends `"You "`. JS `'You ${fill(obj_name)}'`. **Match.**

## Hallucinations / overclaim

Subject “identifies non-magic saleable gear with highc/plur”: **true.** “instead of treating a missing class row as oc_magic-false”: **true.** Do **not** stamp “Match C `observe_object` FIRST_OBJECT.” Do **not** stamp “Match C `discover_object` 4th arg on observe.” Do **not** re-port D-1702 `buy_container`. Do **not** add a second `shk_names_obj`. Do **not** replace `highc` with `ucase` (that walks the whole string).

## Density

§2b: one announce function + the C-wrong that made D-1702’s live arm identify missing rows. Thin but one cluster. +16.

## Verification

D-log: save-oracle skip; green+strict seed8000/0900; focused seed0116 127/127; cohort 9/9. Public shop buy **does** call this (seed0116). Missing-`objects[]` row is **public-unhit** (C never has a hole). Admit the canary is the gate, not a FAIL peel. seed0116 127/127 still PASS.
Imported `highc`, not `ucase`.

## Actionable C-wrongs

None for Must-fix. Named: `observe_object` FIRST_OBJECT / `STRANGE_OBJECT` skip (`o_init.c:447`); dopay multi-shk getpos (D-1704); `bill_box_content` (D-1705). Do **not** add `shk_names_obj` #2. Do **not** add `plur` #8. Do **not** restore `!oc?.oc_magic`. Do **not** use `toUpperCase` here. No `rn2` in this function.

Verdict: **ACCEPT-WITH-DEBT**
