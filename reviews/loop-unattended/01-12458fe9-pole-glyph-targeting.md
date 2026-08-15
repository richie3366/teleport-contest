# Review 01 — 12458fe9 — pole targeting via glyph_at (D-1040)

## Metadata
- Full / short hash: `12458fe91a324d160751b06b7d811b8867b43960` / `12458fe9`
- Parent: `f4129bf3` (reviews-bind; first JS after `reviews/loop-unattended/00-INDEX.md`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 20:51:28 +0200
- D-id: **D-1040**
- Stats: 12 files, +307 / −146 — `js/apply.js` +131, `js/display.js` +5
- Claims to close: `reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md` **risk 3** (live `m_at` / `sobj_at` as poleable). Stamped **Addressed** in the same commit.
- JS / map: `js/apply.js`, `js/display.js` (`remembered_glyph.statue` / `.boulder`); debt/absent; cadence still #1305

## Intent vs deliverable

Git subject promises: “Match C pole targeting to glyph_at so hidden monsters are not autotargets.”

The diff **does** change the D-1022 predicate. Before: `glyph_is_poleable_at` was `m_at || remembered I || sobj_at(STATUE)`. After: a local classifier that treats the **shown layer** as monster glyph / `I` / statue glyph, and `find_poleable_mon` skips tame/peaceful only when that layer is a **monster** glyph.

It does **not** add C `glyph_at` (`display.c:2478` returns `gg.gbuf[y][x].glyphinfo.glyph`). JS still has no integer glyph IDs. The commit reconstructs what `newsym` would paint. That is a **clone of display classification**, named in the D-log as integer-glyph debt — not a silent claim that gbuf exists.

## Inventory

| Symbol | Kind | C locus |
|--------|------|---------|
| `Detect_monsters_apply` | clone of `youprop.h` `Detect_monsters` (`HDetect_monsters \|\| EDetect_monsters`) | property, not a function |
| `pole_mimic_unsensed_object` | clone of `display.c` `display_monster` mimic appearance | `display.c:503+` |
| `covers_objects_pole` | clone of `display.h:218` `covers_objects` | uses imported `is_pool` / `is_lava` (C callees in `hack.js`) |
| `shown_floor_obj_pole` | clone of shown `vobj_at` / `objects_at` | `objects_at` is a C callee |
| `glyph_is_monster_at` | clone of `glyph_is_monster(glyph_at)` | **not** gbuf |
| `glyph_is_invisible_glyph_at` | clone: remembered `I` after monster layer | `display.js` `glyph_is_invisible` (remembered, not gbuf) |
| `glyph_is_statue_glyph_at` | clone of `glyph_is_statue(glyph_at)` | live otyp if `cansee`, else `remembered_glyph.statue` |
| `glyph_to_obj_boulder_at` | clone of `glyph_to_obj(glyph_at)==BOULDER` | same split |
| `glyph_is_poleable_at` | clone of `apply.c:3279` macro | monster \|\| I \|\| statue |
| `find_poleable_mon` | C function, retouched | `apply.c:3284–3318` |
| `get_valid_polearm_position` | C function, unchanged structure | `apply.c:3321–3331` |
| `map_object` / mimic `newsym` tags | C callee site, extra flags | `display.c` `map_object` |

Imported for this commit (`mon_visible`, `tp_sensemon`, `see_with_infrared`): **C callees** already in `display.js`. `display_polearm_positions` remains a **no-op** (named `tmp_at` S_goodpos; not this Must-fix).

## C ↔ JS fidelity

### `find_poleable_mon` — branch order matches C

C `apply.c:3284–3318`:

```
impaired = Confusion || Stunned || Hallucination
for x,y in isqrt(max) box:
  if !get_valid_polearm_position continue
  glyph = glyph_at(x,y)
  if !impaired && glyph_is_monster(glyph) && m_at && (mtame || (mpeaceful && flags.confirm))
    continue
  if glyph_is_poleable(glyph) && (!glyph_is_statue(glyph) || impaired):
    unique candidate or FALSE
```

JS `apply.js:4013–4046` uses the same loops, the same unique-`mpos.x` collision, the same statue-only-when-impaired rule, and `game.flags?.confirm ?? true` (C `flags.confirm` defaults true). **No RNG in this function on either side.**

The D-1022 C-wrong is actually gone: a live tame `m_at` that is **not** a monster glyph (hidden, or `I`) is no longer skipped-as-pet / auto-target. A peaceful monster showing as `I` is poleable. That is C `apply.c:3301–3305` (`glyph_is_monster` guard on the skip).

### `get_valid_polearm_position` / `use_pole` statue and boulder arms

C `apply.c:3327–3330`: `cansee || (couldsee && glyph_is_poleable(glyph_at))`. JS: same with the clone.

C `use_pole` `apply.c:3522–3545`: statue hit is `glyph_is_statue(glyph) && sobj_at(STATUE)`; boulder thump is `glyph_to_obj(glyph)==BOULDER && sobj_at(BOULDER)`. JS now requires **both** the clone glyph **and** `sobj_at_nexthere`. Live statue under a monster glyph is no longer a statue target. That matches C.

### `could_pole_mon` / `use_pole` autohit — still C order

C `could_pole_mon` (`apply.c:3391–3412`): `!uwep || !is_pole` → `calc_pole_range` → `find_poleable_mon` else last `hitmon` if `sensemon` and in `[min,max]`. JS `apply.js:4064–4078` matches; `mhp>0` stands in for `!DEADMONSTER`. No RNG.

C `use_pole` after getpos (`apply.c:3471–3487`): too far / too close / `!cansee && !glyph_is_poleable` / `!couldsee`. Then `m_at` → `attack_checks` / `overexertion` / Snickersnee / `thitmonst`. This commit only retouches the **statue and boulder** `else if`s. Autohit still uses `find_poleable_mon`’s unique glyph, not live `m_at`. That is the D-1022 risk-3 close.

### `glyph_is_monster_at` vs C `newsym` / `glyph_at`

C `glyph_at` (`display.c:2478–2482`):

```
if (x,y out of range) return cmap_to_glyph(S_room);
return gg.gbuf[y][x].glyphinfo.glyph;
```

`use_pole` never recomputes visibility. JS `glyph_is_monster_at` (`apply.js:3912–3926`) walks live `m_at` + `cansee`:

- `cansee`: `mon_visible || tp_sensemon`, else `Detect_monsters`, else false. Mimic object/furniture when unsensed is **not** a monster glyph (`display.c` `display_monster` appearance). Hidden live `m_at` is not poleable. That is the Must-fix.
- `!cansee`: `tp_sensemon`, or `mon_visible && see_with_infrared`, else `Detect_monsters`.

C `display.c:1013–1030` (cansee) and `1046–1054` (`!cansee`) also paint `Detect_monsters` as a detected **monster** glyph (`glyph_is_detected_monster` ⊂ `glyph_is_monster` in `display.h:770–772`). JS **newsym** still names Detect_monsters as omitted; the **pole clone includes it**. Versus C `glyph_at`, the clone is closer than JS `newsym`. Versus the tty layer JS actually painted, Detect_monsters can mark a cell poleable that the screen did not show. Display debt, not a return to autotargeting hidden monsters without detection.

C `see_it` includes `MATCH_WARN_OF_MON` and excludes worm tails on the Detect arm (`display.c:1013–1016`, `1047–1050`). JS clone does **not**. D-log already names `MATCH_WARN_OF_MON / worm tails`. Named omits, not a revival of D-1022 risk 3.

C `glyph_is_monster` is an integer-range test on the glyph (`display.h:770–772`: normal / pet / ridden / detected). JS has no those ranges; it asks “would this cell show a monster now?” If gbuf is stale and `newsym` has not run, C uses stale paint and JS uses live world. During `use_pole` after a normal turn, `newsym` has usually run. Named integer-glyph omit.

### Impaired properties

C `apply.c:3292`: `impaired = (Confusion || Stunned || Hallucination)`. Macros: `Confusion` is `HConfusion`, `Stunned` is `HStun`, `Hallucination` is `HHallucination && !Halluc_resistance` (`youprop.h:84–85`, `120`). JS `apply.js:4014–4015` ORs `u.Confusion || u.HConfusion` and `u.Stunned || u.HStun` and `u.Hallucination` with **no** hallu-resistance test. Extra H* bits are redundant if the combined flags already exist; missing `Halluc_resistance` can mark a resistant hero impaired (statues become poleable). Pre-existing property model, not a new Must-fix.

### Statue / boulder memory tags

`map_object` now sets `remembered_glyph.statue` / `.boulder` on the **non-hallucination** path. The hallu-statue memory path (`display.js:746–769`) still writes a random object glyph **without** `statue: true`. That matches C `map_object` (hallu statue memory is `random_obj_to_glyph`, not a statue glyph). `!cansee` then correctly refuses statue poleable. `cansee` still uses live `otyp === STATUE`, matching a displayed statue glyph.

`covers_objects_pole` uses `hack.js` `is_pool` (POOL/MOAT/WATER; drawbridge deferred in that callee) + `is_lava` (LAVAPOOL\|LAVAWALL). C `covers_objects` is `is_pool() && !Underwater \|\| LAVAPOOL \|\| LAVAWALL`. Same `is_pool` function, not the wider `IS_POOL` macro. Drawbridge-under remains the existing `is_pool` named omit.

### What this commit does **not** fix (still D-1022, not regressions)

`yname` / `Amonnam` / `mbodypart` clones, `pickup_object` telekinesis, `u_wipe_engr` / `tmp_at` no-ops. Those stay Must-fix **below** this review. `thitmonst` hit-vs-miss is D-1041 (next SHA).

C `apply.c:3279–3280`:

```
#define glyph_is_poleable(G) \
    (glyph_is_monster(G) || glyph_is_invisible(G) || glyph_is_statue(G))
```

JS `glyph_is_poleable_at` is the same three-way OR of the clones. Layering: monster wins over `I` over statue (`glyph_is_statue_glyph_at` returns false if monster or I). That matches how a single gbuf glyph cannot be two types at once.

`could_pole_mon` last-`hitmon` fallback (`apply.c:3404–3407`) still uses live `sensemon` + range, **not** `glyph_is_poleable`. C does the same: unique-glyph miss, then remembered hitmon if you can sense it. Not a live-`m_at` autotarget of hidden monsters in the box scan.

`display_polearm_positions` is still a no-op. C `apply.c:3334–3352` paints `tmp_at(DISP_BEAM, S_goodpos)` on valid cells. getpos hilite remains D-1022 risk 7 / named omit. This commit did not pretend to wire it.

## Hallucinations / overclaim

The subject says “Match C pole targeting to `glyph_at`”. The **predicate** (monster glyph vs live `m_at`; skip pets only on monster glyphs; statue/boulder need glyph **and** object) matches C `apply.c`. The **storage** is not `gg.gbuf`. D-log is honest about integer glyph IDs. This is **not** “Match C dispatch, callee is a stub”: `find_poleable_mon` / `use_pole` call the new classifier, not a no-op.

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunks. Rule #2 clean. `FORCEBUNGLE` elsewhere in `apply.js` is a trap flag, not this diff.

## Constitution / playbook

Grep of `git show 12458fe9 -- js/`: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward`, public seed names, or hardcoded coordinates in control flow. Rule #2 OK. Frozen contracts untouched. The only `await` in the touched pole path is existing `pline` / `getpos` / `thitmonst` — still one gameplay input boundary (`nhgetch` inside getpos).

D-1022 risk 3 asked for C `glyph_at` targeting, not a second copy of `newsym`. Shipping a classifier next to `use_pole` is acceptable while JS has no integer glyphs, **if** the predicates match. They do for hidden `m_at`, pet skip, `I`, and statue/boulder-and-object. MATCH_WARN / worm tails stay named.

## Density (§2b)

One family: `glyph_is_poleable` / `find_poleable_mon` / `use_pole` statue and boulder guards, plus the minimum `map_object` tags so `!cansee` memory can be a statue/boulder. ~130 lines of JS. Right size. Clone-heavy because JS has no glyph integers — that is the named omit, not a second subsystem.

## Verification

Journal: green+strict PASS; apply/combat/display cohort **10**/10 (seed0361 Scr 366/366, seed0399 Scr 532/532); private node **12**/12 (hidden `m_at` not poleable; `I` is; tame skip; peaceful `I` not skipped; statue glyph not autotarget). Public traces **unhit**. Cadence still #1305. Fortress not used as proof of the body — admitted.

## Actionable C-wrongs

None that belong on Must-fix. D-1022 risk 3 (live `m_at` as poleable) is actually closed.

Named omits (map, not queue): integer `glyph_at` / gbuf; `MATCH_WARN_OF_MON`; Detect_monsters worm-tail exclusion; `tmp_at` S_goodpos; furniture-mimic cmap; `Halluc_resistance` on `impaired` (already named in D-1040 except hallu-resist, which is property-model debt). Do not pop tut-1 or yname as a substitute for a later review that finds a real targeting C-wrong.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7.5 / 10**
- One sentence: the skip/target predicates now follow C `glyph_is_monster(glyph_at)` / `glyph_is_poleable`, so hidden live monsters are no longer autotargets; JS still reconstructs the layer instead of reading gbuf, and MATCH_WARN / worm tails stay named omits.
