# Review 789 — fc103c7f — mkmaze.c makemaz Bar-goal load_special (D-1819)

## Metadata
- Full / short hash: `fc103c7ff4ba18612507b388c7e07a80b177818c` / `fc103c7f`
- Parent: `2c339c26` (D-1818). Map-driven Open. No prior QUALITY-RISK on this proto.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 19:50:41 +0200
- D-id: **D-1819**
- Stats: `js/mklev.js` +136/−4. `js/` insertions **136** ≤250. Band **80–350**.
- Claims to close: Open `makemaz` `Bar-goal` from `dat/Bar-goal.lua` (Bar 4/5 → 5/5). Not soko2-2.
- JS / map: `js/mklev.js` `load_bar_goal` + `load_special_proto`. `c-js-map/data.md`. Archive **Addressed:** D-1819 `fc103c7f`.

**Addressed:** D-1824 `f2b2b513`

## Intent vs deliverable

Git subject promises: `makemaz` had no `Bar-goal` loader; C loads `dat/Bar-goal.lua` via `sp_lev.c` `load_special`.

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223`. `get_table_align` `sp_lev.c:3114–3128` key **`"align"`**. `noncoalignment` `:1851–1860` `rn2(2)`. `sp_amask_to_amask` `:1907–1922`. `lspo_wallify` `:5964–5989`. `create_altar` `:2445–2486`. `sel_set_door` `:4646–4662`.

Parent: Bar-strt/loca/fila/filb only. The diff **does** add `load_bar_goal` and the proto string. Subject’s *dispatch* is delivered. **Random `des.object()` is 15 in JS vs 14 in the lua.**

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_bar_goal` | LIVE new | lua body as JS |
| `load_special_proto` | LIVE repaired | `Bar-goal` arm |
| `light_region` unlit | LIVE | no grow |
| `barGoalDoor` | CLONE of `sel_set_door` | same thin door helper as D-1818 |
| `mkstairs` / `create_object` / `splev_create_*` | LIVE | |
| `sp_amask_to_amask(AM_SPLEV_NONCO)` | LIVE | `noncoalignment` `rn2(2)` |
| `wallify_map` | LIVE | `lspo_wallify` no-arg bounds |
| 15× `splev_create_object(null)` | **C-wrong count** | lua has **14** empty `des.object()` |
| humidity `get_location` | OMIT named | |
| `spo_end_moninvent` / `G_UNIQ` extinct / fakewiz | OMIT named | |

`node scripts/sym.mjs`:

```
load_bar_goal    NOT EXPORTED — 1 LOCAL mklev.js (do NOT add #2)
wallify_map      NOT EXPORTED — 1 LOCAL mklev.js:11588
sp_amask_to_amask NOT EXPORTED — 1 LOCAL mklev.js:12394
splev_create_monster js/mklev.js:12415   sync
create_object    NOT EXPORTED — 1 LOCAL
```

No new import. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**.

## C ↔ JS fidelity

**Dispatch / map / unlit.** `protofile === 'Bar-goal'`. solidfill + mazelevel + the 20-line map. Whole-map unlit `light_region(..., false)` — C argc-2 unlit does not grow. **Match.**

**Doors / stairs / nondiggable.** lua `des.door("locked",22,09)` / `(26,09)` on map `S` — JS keeps SDOOR + `D_LOCKED`. `mkstairs` (36,5) up. Nondiggable STWALL/TREE/bars over (0,0)–(75,19). Door clone still skips `set_door_orientation` (same as D-1818).

**Altar.** lua **`align="noncoaligned"`** (the real key, unlike Wiz-goal `aligned=`). C → `AM_SPLEV_NONCO` → `noncoalignment(ualignbase[A_ORIGINAL])` → `rn2(2)` (`:1856–1859`). `type="altar"` shrine=0, no `priestini`. JS `sp_amask_to_amask(AM_SPLEV_NONCO)`. **Match that binding.**

**Heart.** `create_object` luckstone + bless + spe 0 + name. **Match.**

**The C-wrong: empty objects.** lua `:44–57` is **fourteen** `des.object()`. D-log / subject / JS loop all say **fifteen** (Wiz-goal’s count). That is one extra `splev_create_object` → extra `mkobj_at` RNG vs C. Traps 6 match `:59–64`. Monsters: Thoth Amon at (63,4) `peaceful=0`; 16 ogre; 2 class O; 8 rock troll; 1 class T — counts match `:66–93`.

**`des.wallify()` then epilogue.** `lspo_wallify` no-arg: `xstart-1 .. xstart+xsize+1` (`:5984–5987`). JS `wallify_map` those bounds, then link / cleanup / `wallification` / `flip_level_rnd(3,false)` / `fixup_special`. **Match the tail.**

**Callee closure.** Heart / monsters / wallify / altar NONCO are LIVE. The empty-object arm is LIVE but **wrong arity**. Named OMITs stay named. No STUB.

## Hallucinations / overclaim

“15 `des.object`” is copied from Wiz-goal, not from `Bar-goal.lua`. Do **not** stamp “Match C 15 random objects.” Do **not** stamp humidity / `G_UNIQ` / `m_dowear`. Do **not** treat lua `align=` here like Wiz-goal’s ignored `aligned=`.

## Density

§2b: one proto. +136. Did **not** glue soko2-2. Right size. The miss is a **count**, not thinness.

## Verification

`verify.mjs --fn makemaz` → PASS syntax; PASS rule2; **PASS hidden (no corpus session blocked on makemaz)**; green + cohort + full 44/44. Public fortress does not walk Bar-goal, so 44/44 does **not** falsify the extra `mkobj`. This audit: lua `:44–57` (14) vs HEAD `for (let i = 0; i < 15; i++) splev_create_object`. `csym` `noncoalignment` `:1851–1860`, `lspo_wallify` `:5964–5989`. Rule #2 at end-of-iter.

## Actionable C-wrongs

1. **Match C `dat/Bar-goal.lua` `:44–57` — fourteen `des.object()` after the Heart**, instead of `load_bar_goal`’s `for (i = 0; i < 15)` extra `splev_create_object` / `mkobj_at` RNG. One port: the loop bound. Do **not** change the Heart, traps, or monster counts. Do **not** hide it as humidity.

Verdict: **QUALITY-RISK**
