# Review 762 — 07fb471c — weapon.c dmgval bonus rnd() + greatest_erosion (D-1793)

## Metadata
- Full / short hash: `07fb471cc2686510f51b326e52b8e3db3c5fd66c` / `07fb471c`
- Parent: `9c160502` (D-1792). Map-driven Open. No prior QUALITY-RISK on this locus.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 00:11:14 +0200
- D-id: **D-1793**
- Stats: `js/weapon.js` +99/−22; `js/objects.js` +17/−1; `js/monsters.js` +13; four `is_axe` clones deleted. Total `js/` insertions **113** ≤250. Band **80–350**.
- Claims to close: Open `weapon.c` `dmgval` blessed/axe/silver/`artifact_light` + erosion. Not `hitval` `spec_abon`.
- JS / map: `weapon.js` `dmgval`; `objects.js` `is_axe`; `monsters.js` `is_wooden`/`hates_light`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1793 `07fb471c`.

## Intent vs deliverable

Git subject promises: Match C `weapon.c` `dmgval` so blessed/axe/silver/`artifact_light` bonus `rnd()` and `greatest_erosion` actually run, instead of stopping after the small-monster switch and shade zero.

`node scripts/csym.mjs dmgval` → `weapon.c:215–356`. `is_axe` `obj.h:217–219`. `greatest_erosion` `obj.h:126–128`. `is_wooden` / `hates_light` `mondata.h:68` / `:215`. `spec_dbon` `artifact.c:1090–1109`. `artifact_light` `artifact.c:2263–2275`. `--callers dmgval`: 26 code sites.

Parent: `oc_wsdam`/`oc_wldam` + small switch + spe + shade. The diff **does** port the large switch, thick-skin/leather, iron ball, bonus `rnd()` chain, `spec_dbon` half, erosion clamp; export `is_axe` (four clones deleted); add `is_wooden`/`hates_light`; import `is_weptool` from `wield.js`. Subject is delivered.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `dmgval` | LIVE repaired | rest of C body |
| `is_axe` | LIVE one export | clones in apply/dig/dothrow/monmove **deleted** |
| `is_weptool` | LIVE import | was unimported local; 9 clones remain elsewhere |
| `is_wooden` / `hates_light` | LIVE new | `ptr.mndx` vs C `&mons[PM_*]` |
| `spec_dbon` | LIVE import | **draws `rnd(damd)` when it applies** |
| `artifact_light` | LIVE | already `timeout.js` export (C `artifact.c`) |
| `greatest_erosion` | CLONE local | 4 files; do not write #5 |
| `hitval` extras | OMIT named | |

`node scripts/sym.mjs` (clone → import):

```
dmgval           js/weapon.js:210   sync
is_axe           js/objects.js:125   sync
is_weptool       js/wield.js:110   sync
             !! ALSO 9 LOCAL CLONES — do NOT add another in weapon.js
is_wooden        js/monsters.js:330   sync
hates_light      js/monsters.js:335   sync
spec_dbon        js/artifact.js:1880   sync
artifact_light   js/timeout.js:986   sync
shade_glare      js/artifact.js:467   sync
greatest_erosion NOT EXPORTED — 4 LOCALS including js/weapon.js:329
mon_hates_blessings / mon_hates_silver  js/monsters.js  sync
```

`--can weapon.js objects.js is_axe`: **ALREADY**. `--can apply.js/dig.js/dothrow.js/monmove.js objects.js is_axe`: **ALREADY**. `--can weapon.js artifact.js spec_dbon`: **ALREADY**. `--can weapon.js wield.js is_weptool`: **ALREADY**. `--can weapon.js timeout.js artifact_light`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Dice order — match C.** Cream pie: return 0, **zero** draws. `bigmonst`: `rnd(oc_wldam)` then otyp switch (`tmp++` / `rnd(4)` / `rnd(6)` / `d(2,4)` / `d(2,6)`). Else `rnd(oc_wsdam)` then the small switch (parent already had). `Is_weapon` (`WEAPON_CLASS \|\| is_weptool`) adds `spe`, clamp ≥0. **Match.** Parent `is_weptool` local was unimported; `WEAPON_CLASS` short-circuit hid it. Now the `wield.js` export.

**Zero gates then ball (`:304–320`).** `oc_material <= LEATHER && thick_skinned` → 0. Shade && `!shade_glare` → 0. Heavy ball `tmp>0` && `owt > oc_weight`: `rnd(4 * ((owt-wt)/WT_IRON_BALL_INCR))`, cap 25. `LEATHER=7` / `SILVER=14` match `objclass.h`. **Match.**

**Bonus `rnd()` (`:322–341`) — short-circuit order.** `Is_weapon \|\| GEM \|\| BALL \|\| CHAIN`: blessed+hates → `rnd(4)`; `is_axe && is_wooden` → `rnd(4)`; silver+hates → `rnd(20)`; `artifact_light && lamplit && hates_light` → `rnd(8)`. Then if `bonus>1 && oartifact && spec_dbon(otmp,mon,25)>=25`: `(bonus+1)/2`. **`spec_dbon` itself may `rnd(damd)`** when it applies (`artifact.c:1106–1107`) — C does that as a side effect of the ≥25 probe; JS imports the real function. **Match RNG including that draw.** `is_axe` export checks WEAPON/TOOL + `P_AXE` (monmove clone had skipped oclass).

**Erosion (`:344–353`).** `tmp>0`: subtract `greatest_erosion` (max oeroded/oeroded2), floor 1. **Match.**

**Callee closure.** LIVE: `bigmonst`, `is_weptool`, `thick_skinned`, `shade_glare`, `is_axe`, `is_wooden`, `mon_hates_*`, `artifact_light`, `hates_light`, `spec_dbon`. CLONE: `greatest_erosion` local. OMIT named: `hitval` extras. STUB: **none**.

## Hallucinations / overclaim

Subject “bonus rnd() and greatest_erosion actually run” is **true**. Do **not** stamp “Match C `hitval`.” Do **not** stamp “every `is_weptool` clone is gone.” Do **not** export a fifth `greatest_erosion`. `artifact_light` lives in `timeout.js` (pre-existing); body matches C Sunsword + worn gold DSM. Public combat sessions hit `dmgval`; bonuses vs hater/gremlin are rarer — probed.

## Density

§2b: one C function + the macros it calls + clone deletion of `is_axe`. +113. Did **not** glue `hitval`. Right size.

## Verification

D-log: cream pie; blessed vs vampire `rnd(4)`; silver vs were `rnd(20)`; axe vs wood golem; broadsword-vs-giant `tmp++`; erosion clamp; heavy ball; leather whip vs thick-skin. Green + cohort. save-oracle skip. Rule #2 clean. This audit: `csym` `:215–356` vs HEAD `js/weapon.js:210–326`.

## Actionable C-wrongs

None for Must-fix. Named: `hitval` blessed/spear/trident/pick/silver; `greatest_erosion` clones (dig/lock/u_init); 9 leftover `is_weptool` clones. Do **not** add `is_axe` clone #2. Do **not** skip `spec_dbon`’s probe `rnd`. Do **not** draw bonus `rnd` after shade has zeroed unless C’s gates still pass (`tmp` can be 0 and bonuses still add — C adds bonus after shade zero; JS the same).

Verdict: **ACCEPT-WITH-DEBT**
