# Review 1784 — b60cf8e62 — domove_fight_empty (D-2825)

- SHA: `b60cf8e62` (coverage; `hack.c` `domove_fight_empty`)
- Files: `js/cmd.js` body and the `domove` call; `js/hack.js` `move_out_of_bounds`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".

**Addressed:** D-2826 `38097d48c`

## Intent vs deliverable

Subject promises one `domove_fight_empty` in C order, called after the attack when `!displaceu`, and `move_out_of_bounds` returning that boolean. The diff does that. The hallucinated-statue test calls `Hallucination` from `do_name.js`, not the `youprop.h` export.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `domove_fight_empty` | async `cmd.js:2361` | `hack.c:2228–2338` (`staticfn`) |
| `move_out_of_bounds` | `hack.js:2628` returns the call | `hack.c:2590` |
| `domove` bars / web / empty | `cmd.js:4678` after `bhitpos` and the attack | `hack.c:2802–2813` |
| `accessible` | imported `monmove.js:740` | `ACCESSIBLE(SURFACE_AT) && !closed_door` |
| `sobj_at` | imported `mkobj.js:2942` | boulder then statue |
| `dig_typ` / `use_pick_axe2` | imported `dig.js:1760` / async `:2560` | pick arm returns TRUE |
| `ansimpleoname` / `the` | imported `objnam.js` | boulder name; `the(explanation)` |
| `back_to_glyph` / `glyph_to_cmap` / `defsym_explanation` | imported | `defsyms[glyph_to_cmap].explanation` |
| `glyph_is_statue` / `glyph_is_monster` / `glyph_is_invisible_id` | imported `display.js` | `display.h` (`glyph_is_invisible` is `== GLYPH_INVISIBLE`) |
| `attacktype_fordmg(..., -1)` | imported `uhitm.js:650` | `AD_ANY` is `-1` (`monattk.h:41`); `attacktype` is that wildcard |
| `Hallucination` | **clone** `do_name.js:255` | `youprop.h:116–120` |

`sym.mjs`:

```
Hallucination    js/display.js:1091   sync
                 js/do_name.js:255   sync
             !! multiple exports — import the C-locus one
accessible       js/monmove.js:740   sync
sobj_at          js/mkobj.js:2942   sync
ansimpleoname    js/objnam.js:2881   sync
dig_typ          js/dig.js:1760   sync
use_pick_axe2    js/dig.js:2560   ASYNC — await required
defsym_explanation js/uhitm.js:3896   sync
glyph_to_obj_at  js/display.js:1582   sync
attacktype_fordmg js/uhitm.js:650   sync
```

`cmd.js` still imports `Hallucination` from `do_name.js` (line 94). `glyph_to_obj_at` left this function; the statue test is `glyph_is_statue`. `imports.mjs --can cmd.js dig.js use_pick_axe2`: already a static import.

## C ↔ JS fidelity

Off-edge stores `GLYPH_UNEXPLORED`, then rewrites the local coordinates to `(0, 1)` before the guard. The guard is `forcefight || (glyph_is_invisible && !m_at && !nopick)`. `solid` is `off_edge || !accessible || IS_FURNITURE`. Off-edge skips `accessible` (C `||` does too) and copies "an unknown obstacle".

On the map and not underwater (`youprop.h:279` `u.uinwater`): `sobj_at(BOULDER)`, then a statue glyph or `Hallucination && glyph_is_monster` replaces it with `sobj_at(STATUE)`. `forcefight && uwep && dig_typ &&` neither invisible nor monster glyph awaits `use_pick_axe2` and returns true before `unmap_object`. Otherwise unmap, `map_object(boulder, true)`, `newsym`. The refreshed `glyph_at` is unused; C `nhUse`s it and the solid arm overwrites it with `back_to_glyph`.

Names: `ansimpleoname`; underwater and not a pool is "an air bubble" when `Is_waterlevel` and `typ == AIR`, else "nothing"; a seen solid, `IS_STWALL`, `SDOOR`, or `SCORR` uses `the(defsym_explanation(glyph_to_cmap(back_to_glyph)))`; other solids stay "an unknown obstacle"; else "thin air". The adverb is empty unless boulder or solid, then "harmlessly " or "futilely " when exploding. `You` prefixes `You `. `nomul(0)` (which calls `end_running`), then explode: `wake_nearto(ux, uy, 49)`, `explum(null, attk)`, `mh = -1`, `rehumanize`.

`domove` now sets `bhitpos`, runs the attack, and only then, when `!displaceu`, tries bars, web, and this function. A true return spends the move. `unmap_invisible` runs only when all three return false. `move_out_of_bounds` returns the function's boolean (`hack.c:2590`).

`do_name.js:255–263` returns true when `u.Hallucination` is set, before any resistance test, and it never reads `uprops[HALLUC]`. C is `HHallucination && !Halluc_resistance` (`youprop.h:116–120`). `display.js:1091–1102` is that test (intrinsic or `uprops[HALLUC].intrinsic`, then resistance including `uprops[HALLUC_RES]`). A sticky-only hero, or a timed hallucination with resistance stored only on `uprops`, takes the statue-replacement arm here and does not in C.

## Hallucinations / overclaim

The subject says `Hallucination()` "still returns on sticky `u.Hallucination` before the resistance test (D-2817, the live export)." D-2817's live export is `display.js:1091`, which does not return on that sticky field. This SHA calls the `do_name.js` export. The null `youmonst.data`, missing `game.u`, discarded `glyph_at`, null cell, and `displaceu` middle-skip (stucksteed still runs) match the code and are named.

## Density

The whole function, both C call sites, and the pick / name / glyph callees. One live arm uses the wrong `Hallucination`.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify domove_fight_empty --base b60cf8e62~1 --reach-all`.

```
verify domove_fight_empty: baseline b60cf8e62~1 (scoreboard at 8a86cd50e) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke domove_fight_empty: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2825's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

1. `domove_fight_empty` (`hack.c:2258–2261`) must call the `youprop.h:120` `Hallucination` (`js/display.js:1091`). `js/cmd.js` imports `js/do_name.js:255`, which returns on sticky `u.Hallucination` before resistance and ignores `uprops[HALLUC]`.

Verdict: **QUALITY-RISK**
