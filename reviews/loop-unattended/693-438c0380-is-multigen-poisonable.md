# Review 693 — 438c0380 — obj.h is_multigen / is_poisonable (D-1732)

## Metadata
- Full / short hash: `438c0380b961ada2b9aef70984698e11a7d82508` / `438c0380`
- Parent: `fbce2b1c` (D-1731). This file audits **this SHA only** (seventh of nine `js/` commits since review **686**). Archive **Addressed:** D-1732 `438c0380`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 11:15:13 +0200
- D-id: **D-1732**
- Stats: `js/objects.js` +22; mkobj/artifact/objnam/potion/zap/mhitm/readobjnam. Total `js/` insertions **72** <250. Band **150–350**.
- Claims to close: Open `is_multigen` / `is_poisonable` after D-1712 / review **673** (`oc_merge`; skill window named). Not `oc_merge`. `reviews/loop-2026-08-15/` has no unpaid poison-window Must-fix.
- JS / map: `objects.js` macros; `artifact.js` `permapoisoned`. `c-js-map/data.md`.
- Prior: **673** named missile name-list.

## Intent vs deliverable

Git subject promises: missile stacks and poison use the `oc_skill` window plus Grimtooth, instead of a name-list alias.

`node scripts/csym.mjs` cannot dump `#define`; `obj.h:260–268`. `permapoisoned` `artifact.c:2836–2840`. `mksobj_init` `:877` / `:886` / `:1173–1174`. `readobjnam` `:4034–4035` / `:5298–5305` / `:5368–5369`. `potion_dip` `:2615–2636`. `poly_obj` `:1801–1802`. Skills `skills.h` `P_BOW=20` `P_SHURIKEN=24` (JS `const.js` same).

```260:268:nethack-c/upstream/include/obj.h
#define is_multigen(otmp)                           \
    (otmp->oclass == WEAPON_CLASS                   \
     && objects[otmp->otyp].oc_skill >= -P_SHURIKEN \
     && objects[otmp->otyp].oc_skill <= -P_BOW)
#define is_poisonable(otmp)                          \
    ((otmp->oclass == WEAPON_CLASS                   \
      && objects[otmp->otyp].oc_skill >= -P_SHURIKEN \
      && objects[otmp->otyp].oc_skill <= -P_BOW)     \
     || permapoisoned(otmp))
```

Parent: name-list ARROW/DART/…; `is_poisonable`≡that list; objnam/potion clones without Grimtooth; no mksobj end force; no wish `"poisoned "`. The diff **does** export skill-window macros, `permapoisoned` (Grimtooth), `mksobj_init` end force, retire clones, wish parse/apply + FOOD `age=1` + post-`oname` force. It **does not** port mthrowu/uhitm poison combat. Named. `objects.js` inlines `ART_GRIMTOOTH` instead of importing `permapoisoned` (`--can objects.js artifact.js` would be SAFE/hoisted; they still avoided the edge).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `is_multigen` | LIVE new (C-home `objects.js`) | `-P_SHURIKEN`..`-P_BOW` |
| `is_poisonable` | LIVE + CLONE Grimtooth bit | C `\|\| permapoisoned`; JS `oartifact===ART_GRIMTOOTH` |
| `permapoisoned` | LIVE new | `artifact.js`; mhitm/potion clones retired |
| `mksobj_init` quan / 1% poison / end force | LIVE | `rn1(6,6)` / `!rn2(100)` / `opoisoned=1` |
| wish `"poisoned "` | LIVE | `:4034`, `:5298`, `:5368` |
| `is_poisonable_obj` / `_dip` / `permapoisoned_dip` | deleted | |
| mthrowu / uhitm poison | OMIT named | |

`node scripts/sym.mjs`:

```
is_multigen      js/objects.js:139   sync
is_poisonable    js/objects.js:150   sync
permapoisoned    js/artifact.js:1739   sync
is_poisonable_obj / is_poisonable_dip / permapoisoned_dip  NOT FOUND
```

`--can objects.js artifact.js permapoisoned`: NEW-CYCLE, function hoisted, **VERDICT SAFE** (they did **not** take the edge). mkobj already imported both. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Window (`:260–263`).** C `WEAPON_CLASS && oc_skill >= -P_SHURIKEN && <= -P_BOW`. JS same (`P_SHURIKEN=24`, `P_BOW=20` in `const.js`). Arrows are `-P_BOW`; darts/shuriken `-P_SHURIKEN`. **Match.** Not the D-0012 name list. `is_missile` (`<= -P_BOW` broader) is a different macro — not this peel.

```139:153:js/objects.js
export function is_multigen(otmp) {
    if (!otmp || otmp.oclass !== WEAPON_CLASS) return false;
    const sk = game.objects?.[otmp.otyp]?.oc_skill | 0;
    return sk >= -P_SHURIKEN && sk <= -P_BOW;
}
export function is_poisonable(otmp) {
    return is_multigen(otmp)
        || !!(otmp && (otmp.oartifact | 0) === ART_GRIMTOOTH);
}
```

**`is_poisonable` (`:264–268`).** Same window **or** `permapoisoned`. JS `is_multigen \|\| oartifact===ART_GRIMTOOTH`. C `permapoisoned` is only Grimtooth:

```2836:2840:nethack-c/upstream/src/artifact.c
boolean
permapoisoned(struct obj *obj)
{
    return (obj && is_art(obj, ART_GRIMTOOTH));
}
```

JS `artifact.js:1739` `is_art(obj, ART_GRIMTOOTH)`. **Match the predicate.** Inlining the art id in `objects.js` is a verified CLONE of that body, not a stub.

**`mksobj_init`.** C `:877` `quan = is_multigen ? rn1(6,6) : 1`; then `!rn2(11)` spe/bless, `else if !rn2(10)` curse, else `blessorcurse(otmp,10)`; `:886` `is_poisonable && !rn2(100)` → opoisoned; `:889` `artif && !rn2(20+10*nartifact_exist())`; `:1173` after `mkobj_erosions` `permapoisoned` force. JS `mkobj.js:1418` / `:1419–1427` / `:1428` / `:1430` / `:1673–1675` same order. **Match RNG call-for-call** on the weapon arm. End force has no RNG. Parent skipped `:1173`; a Grimtooth from `mk_artifact` could ship unpoisoned.

**Wish.** C `:4034` `"poisoned "` before trapped; `:5299–5304` `is_poisonable` → `opoisoned = (Luck >= 0)` else FOOD `age=1`; `:5368` after `oname` `permapoisoned` force. JS `readobjnam.js:968–971` / `:1015` (`Luck() >= 0`). **Match.** No extra `rn2` on the poison apply. Luck 0 is true in both (`>= 0`).

**Dip / poly / xname.** C `:2615–2636` sickness coats `is_poisonable`; healing strips `!permapoisoned`. zap `:1801–1802` keeps poison iff result `is_poisonable`. objnam `:686–687` `"poisoned "` prefix. JS now imports the live macros (Grimtooth included). **Match those callers.** Parent dip clones omitted Grimtooth so healing could strip it — retired (`sym` NOT FOUND).

**Callee closure.** LIVE: `is_multigen`, `permapoisoned`, `is_art`/`ART_GRIMTOOTH`, `rn1`/`rn2`/`rne`, `Luck()`. CLONE: Grimtooth test inside `objects.js` `is_poisonable`. OMIT named: mthrowu/uhitm/nhlobj. STUB: **none**. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “oc_skill window plus Grimtooth”: **true**. Do **not** stamp “Match C mthrowu poison.” Do **not** stamp “Match C uhitm `hmon_hitmon_poison`.” Do **not** stamp “Match C `is_missile`.” Do **not** stamp “Match C `oc_merge`” (D-1712). Journal “fortress held” is not a Grimtooth-wish screen proof. Public sessions **do not** wish Grimtooth; canary was node window+wish+quan. Admit public-unhit.

## Density

§2b: one C macro pair + the callers that used the name-list/clones. +72. Did not glue mthrowu combat. Did **not** reopen D-1712 `oc_merge`.

## Verification

D-log: save-oracle skip (untagged `objects.h:is_multigen`); node skill-window + Grimtooth + wish dart/food/Grimtooth/dagger + mksobj quan; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Wish-poison **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (macros and wired callers match C). Named: mthrowu `thitmon`/`thitu` poison; uhitm `hmon_hitmon_poison`; nhlobj lua. Do **not** add `is_multigen` #2. Do **not** restore the name-list. Do **not** add `permapoisoned` #2 in mhitm/potion. Do **not** import `artifact.js` into `objects.js` without `--can`. Do **not** re-port D-1712.

Verdict: **ACCEPT-WITH-DEBT**
