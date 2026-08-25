# Review 460 — 089a9829 — potion.c potion_dip poly_obj / obj_unpolyable (D-1499)

## Metadata
- Full / short hash: `089a9829c0301234ce3ed70f7ca9926cf10550f4` / `089a9829`
- Parent: `51ea77da` (D-1498). This file audits **this SHA only** (sixth of ten `js/` commits since review **454**). Archive **Addressed:** D-1499 `089a9829`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 22:03:06 +0200
- D-id: **D-1499**
- Stats: 14 files, +229 / −78 — `js/zap.js` +76 / −32; `js/potion.js` +40 / −8; `js/mkobj.js` +22; `js/roles.js` +5; `js/apply.js` −5 (uhis re-point).
- Claims to close: Open `potion.c` `potion_dip` `poly_obj` / `obj_unpolyable` (named from D-1498). Not worn `set_wear`. `reviews/loop-2026-08-15/` has no unpaid poly_obj Must-fix.
- JS / map: `potion.js` `potion_dip`; `zap.js` `poly_obj` / `obj_unpolyable`; `mkobj.js` `replace_object` invent. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **447** / **459** named `poly_obj` after oil.

## Intent vs deliverable

Git subject promises: dipping a polymorph potion (or dipping into one) runs `obj_unpolyable` then `poly_obj` instead of always printing Nothing happens.

Pinned C `potion.c` `potion_dip` `:2468–2502` after H2O. `obj_unpolyable(obj->otyp==POT_POLYMORPH ? potion : obj)` — the **non-poly** bottle. Fail: `nothing_happens`, `in_use=FALSE`, no poof. Else `polypiles++` (first → `livelog_printf` + `uhis()`), `poly_obj(obj, STRANGE_OBJECT)`, then gone → `makeknown`; otyp change → `makeknown`+`useup`+`prinv`; same otyp → `nothing_seems_to_happen`+`poof`. Callee `zap.c` `obj_unpolyable` `:1678–1683` (`unpolyable` / `uball` / `uskin` / `obj_resists(5,95)`); `poly_obj` `:1702–1988`. Invent `replace_object` `:648–651` then `freeinv_core`+`addinv_core1/2`+worn `set_wear`.

Old JS: always `nothing_happens` + `in_use=FALSE`.

The diff **does** wire that caller, export the two zap helpers, copy erosion/poison/crocodile-boots/MAGIC_LAMP→OIL/marker/`fixup_oil`/degraded horn into `poly_obj`, and invent `replace_object` + `freeinv_core`. It **does not** port `addinv_core1/2` (`sym`: **NOT FOUND**), worn `set_wear`, egg/leash, sokoban boulder, shop bill, GEM `rnd(4)`, `spestudied` `rn2`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `potion_dip` poly arm | C `:2468–2502`, **LIVE this SHA** | |
| `obj_unpolyable` | C `:1678–1683`, **LIVE export** | body was already there |
| `unpolyable` | C `obj.h`, **CLONE** zap.js | WAN/SPE/POT poly + unchanging |
| `obj_resists` | C, **LIVE** `dogmove.js:103` | **RNG 5,95** |
| `poly_obj` | C `:1702–1988`, **LIVE export** | partial; worn/gem/egg named |
| `replace_object` invent | C `:648–651`, **LIVE this SHA** | array splice ≈ extract_nobj |
| `freeinv_core` | C, **LIVE** | |
| `prinv` | C, **LIVE** async | awaited |
| `uhis` | C `you.h`, **LIVE** `roles.js` | apply.js clone **deleted** |
| `livelog_printf` | C, **LIVE** chronicle | file livelog named |
| `mkobj` | C, **LIVE** | STRANGE_OBJECT class poly |
| `set_wear` | C, **OMIT named** | async; `poly_obj` is sync |
| `addinv_core1` | C `:1912`, **OMIT** | **NOT FOUND** in `js/` |
| GEM `rnd(4)` / egg `rn2` | C `:1884` / `:1771`, **OMIT named** | skipped RNG |

`node scripts/sym.mjs poly_obj obj_unpolyable obj_resists replace_object prinv freeinv_core uhis livelog_printf mkobj set_wear addinv_core1`:

```
poly_obj         js/zap.js:4904   sync
obj_unpolyable   js/zap.js:4706   sync
obj_resists      js/dogmove.js:103   sync
replace_object   js/mkobj.js:2135   sync
prinv            js/invent.js:3087   ASYNC — await required
             !! ALSO 1 LOCAL CLONE js/do_wear.js:151
freeinv_core     js/invent.js:3586   sync
uhis             js/roles.js:641   sync
livelog_printf   js/pline.js:23   sync
mkobj            js/mkobj.js:1619   sync
set_wear         js/do_wear.js:870   ASYNC — await required
addinv_core1     NOT FOUND in js/**
```

`uhis`: local apply.js clone **re-pointed** to the export (delete-only there). Do not write clone #2. No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean.

**New gameplay RNG:** `obj_resists(5,95)` on every poly dip; `mkobj` class lottery; wand `rn2(7)` recharged (pre-existing in this function). GEM `rnd(4)` and spellbook `rn2(spestudied)` still **not** consumed. Public fortress does not `#dip` poly.

## C ↔ JS fidelity

Caller. C `:2468–2502` vs JS: same `obj_unpolyable` ternary; same three post-`poly_obj` arms; unpolyable still `in_use=FALSE` and **no** `useup`. **Match.** `polypiles++` postfix: first 0 → livelog then 1. JS `if (!polypiles) { =1; livelog } else ++`. **Match `:2476–2478`.** `prinv(null, obj, 0)` awaited. **Match `:2493`.** `!obj` after amulet-of-change `set_wear` is **dead** until worn ships. Named.

`obj_unpolyable`. C `unpolyable \|\| uball \|\| uskin \|\| obj_resists(5,95)`. JS `game.u.uball` / `uskin`. **Match `:1680–1682`** if those pointers are the C globals. `unpolyable` clone: WAN/SPE/POT_POLYMORPH + AMULET_OF_UNCHANGING. **Match obj.h.**

`poly_obj` STRANGE_OBJECT. C `:1712–1726` `mkobj(oclass)` up to 3 times to keep `oc_magic`; degraded unicorn horn `magic_obj=0`. JS same this SHA. **Match.** Quantity / no_charge / invlet / charged_objs spe / BUC: already there.

Erosion / trap / poison / crocodile → `LOW_BOOTS` / MAGIC_LAMP→OIL age 1500 / MAGIC_MARKER `recharged=1` / `fixup_oil`: C `:1789–1850` subset. JS copies those. **Match the ported slice.** Poison uses the same skill window as D-1497 (`-P_SHURIKEN`..`-P_BOW` or Grimtooth), not a mkobj name list. **Match `is_poisonable`.**

Invent swap. C `replace_object` then `freeinv_core`+`addinv_core1/2`. JS `replace_object` array replace + `freeinv_core` only. Otmp is already in `game.invent[]`. Missing cores: weight/encumber/uwep bits. Named. Floor path already used `replace_object` (wand poly). **Not a stub.**

Worn. C `:1921–1950` `remove_worn_item` + `setworn`/`set_wear`. JS skips. Dipping a worn item can leave `owornmask` on a `OBJ_FREE` object. Named, not silent success.

RNG omits inside a **live** `poly_obj`: C GEM always evaluates `rnd(4)` (`:1884`); JS `break` with a comment. Spellbook over-study `rn2` skipped. Hero-laid egg `random_monster(rn2)` skipped. Those are **named C-wrongs of the callee**, not “poly_obj is a no-op.” Unworn non-gem weapon dip does not hit them.

Callee closure (poly arm). LIVE: `obj_unpolyable`, `obj_resists`, `poly_obj` (partial), `mkobj`, `replace_object`, `freeinv_core`, `prinv`, `poof`, `uhis`, `livelog_printf`. OMIT named: `set_wear`, `addinv_core*`, gem/egg/spestudied. STUB: none. **Arm may ship for unworn non-gem invent.** Worn should have stayed named if they claimed full `poly_obj` — they did **not**; D-log lists worn.

## Hallucinations / overclaim

Subject `obj_unpolyable` then `poly_obj` instead of Nothing happens: **true** for the caller. D-log “callees invent `replace_object` + erosion polish”: **true**. Stamping **Addressed:** D-1499 for `:2468–2502` + that slice is fair. Do **not** stamp “Match C worn `set_wear`.” Do **not** stamp “Match C gem mineral `rnd(4)`.” Do **not** treat fortress PASS as a `#dip` of a poly potion. `!obj` after Change amulet is **not** exercised.

This is **not** “dispatch to a stub.” It **is** “dispatch to a partial with named RNG skips.”

## Density

One C dip arm plus the callee fields that invent poly actually needs. +144 JS. Worn/gem left named. Playbook §2b. apply.js `uhis` re-point is the same cluster. Acceptable.

## Branch-by-branch confirm

1. Sword + poly potion, `obj_resists` false, otyp changes: `makeknown`, `useup`, `prinv`. **Match `:2490–2494`.**
2. Same, otyp unchanged (magic-match mkobj): `nothing_seems_to_happen`, `poof`. **Match `:2495–2498`.**
3. `obj_unpolyable` (unchanging / ball / resist luck): `nothing_happens`, potion kept. **Match `:2470–2471` + `:2501`.**
4. Dip poly potion into a dart: unpolyable tests the **dart** (`obj` is dart). **Match ternary.**
5. Dip a poly potion (obj) into water: unpolyable tests **water**. **Match.**
6. First polypile: livelog `uhis()`. **Match `:2476–2478`.**
7. Degraded unicorn horn: `oc_magic` 0. **Match `:1716–1717`.**
8. Worn armor dip: C `set_wear`; JS no remap. **Named omit.**
9. Gem stack dip: C `rnd(4)` always; JS no roll. **Named RNG skip.**
10. **Public-unhit.** D-log has **no** private canary count (unlike D-1497/D-1498).

## Callers / RNG ledger

C `dodip`/`dip_into` → `potion_dip` → `poly_obj`. Also wand/pile `poly_obj` (pre-existing floor). New dip path adds `obj_resists(5,95)` + `mkobj` lottery. Public sessions do not dip poly.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. `STRANGE_OBJECT` is the C id, not a seed. apply.js deleting `uhis` is clone hygiene, not a glyph stand-in.

## Verification

D-log: green+strict seed8000/0900; cohort **7**/7 + strict. **No** private canary of resist 5/95, crocodile boots, invent `replace_object`, or same-otyp `poof`. **Public-unhit.** Cohort is shared-startup, not this recipe. Admit it.

## Actionable C-wrongs

None that belong on Must-fix. The cited `nothing_happens` stub is gone; remaining gaps are **named** on `poly_obj` (map / Open already: worn `set_wear`; lichen/acid still on `potion_dip`). Do not Must-fix “`poly_obj` should have waited for `addinv_core1`.” Do not Must-fix “export is a lie because GEM skips `rnd`” — that is a named omit inside a live function, same pattern as oil’s brass lantern. Next Open was `dip_into` then H2O, not a silent stub.

Verdict: **ACCEPT-WITH-DEBT**
