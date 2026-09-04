# Review 790 — 42afdca4 — mkmaze.c makemaz soko2-2 load_special (D-1820)

## Metadata
- Full / short hash: `42afdca408124f50af5f9fbd5f1b3a52ab47fc2c` / `42afdca4`
- Parent: `d31ce23f` (finish-iteration staging) after D-1819. Map-driven Open. No prior QUALITY-RISK on this proto.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 20:07:51 +0200
- D-id: **D-1820**
- Stats: `js/mklev.js` +135/−15 (includes comment/proto list). `js/` insertions **135** ≤250. Band **80–350**.
- Claims to close: Open `makemaz` `soko2-2` from `dat/soko2-2.lua` (Sokoban 2 50% blank → 0%). Not bigrm-5/6/11.
- JS / map: `js/mklev.js` `load_soko2_2` + `load_special_proto`. `c-js-map/data.md`. Archive **Addressed:** D-1820 `42afdca4`.

## Intent vs deliverable

Git subject promises: `makemaz` had no `soko2-2` loader, so Sokoban 2 was a 50% blank-level coin flip (`rnd(2)` on `soko2` rndlevs).

`node scripts/csym.mjs makemaz` → `mkmaze.c:1126–1223` (`rnd((int) sp->rndlevs)` then `load_special`). `lspo_wallify` not used here; lua `solidify`/`premapped` are `load_special` epilogue `:6045–6053`. `create_object` / `create_trap` / `lspo_exclusion`.

Parent: `soko2-1` only. The diff **does** add `load_soko2_2` and `protofile === 'soko2-2'`. Boulder/trap/object counts match the lua (not the Bar-goal 15-vs-14 miss).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `load_soko2_2` | LIVE new | lua body as JS |
| `load_special_proto` | LIVE repaired | `soko2-2` arm |
| `soko_load_epilogue` | LIVE | wallify → flip → solidify → fixup → premap |
| `mksobj_at(BOULDER)` | LIVE | 16 coords match lua `:33–48` |
| `maketrap` + `mktrap_seen_victim` | LIVE | rolling + 11 holes |
| `lspo_exclusion` | LIVE | mongen 06,11–18,11 |
| `splev_create_object` %/=/`/` | LIVE | 4 food / 1 ring / 1 wand |
| lit region loop | CLONE of `light_region` | no grow; same as `load_soko2_1` |
| ensure_way_out | OMIT named | |
| humidity `get_location` | OMIT named | |
| `is_ok_location_dry` boulder reject | OMIT named | D-0547 |

`node scripts/sym.mjs`:

```
load_soko2_2     NOT EXPORTED — 1 LOCAL mklev.js:10224 (do NOT add #2)
soko_load_epilogue NOT EXPORTED — 1 LOCAL mklev.js:1836
lspo_exclusion   (existing)
splev_create_object NOT EXPORTED — 1 LOCAL
```

No new import. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**.

## C ↔ JS fidelity

**Dispatch.** `soko2` rndlevs → `soko2-1`/`soko2-2`. JS now loads both. **Match the missing variant.**

**Flags / map.** lua `mazelevel, noteleport, premapped, sokoban, solidify`. JS sets maze/noteleport/sokoban/`Sokoban`; premapped+solidify via `soko_load_epilogue` (`premap_detect` / `solidify_map`) like `soko2-1`. Map is 22×13; stairs (6,11) down / (15,6) up; locked doors (19,9) and (19,11) on `+`.

**Lit / nondig / nonpass.** lua `selection.area(00,00,21,12)` lit + both wall properties. JS lights that rectangle (no `light_region` grow — sibling soko2-1) and ORs `W_NONDIGGABLE|W_NONPASSWALL` on STWALL/TREE/bars. C argc-2 **lit** would grow one cell; full-map soko lighting makes that a one-cell halo of leftover solidfill. Named as the established soko clone, not a new Must-fix.

**Boulders.** lua 16 coords `:33–48`. JS list is the same 16. `mksobj_at(BOULDER, …, true, true)` as soko2-1. `is_ok_location_dry` reject stays named.

**Exclusion / traps / objects.** mongen `{06,11,18,11}`. Rolling (7,11) + holes 8..18,11 = 11. 4× class `%`, 1× `=`, 1× `/`. **Counts match.** Not the Bar-goal off-by-one.

**Epilogue.** `soko_load_epilogue` ≡ C `wallification` → `flip_level_rnd` → `solidify_map` → `fixup_special` → `premap_detect`. **Match.**

**Callee closure.** LIVE helpers. Lit loop is a verified sibling CLONE. Named OMITs only. No STUB in a shipped arm.

## Hallucinations / overclaim

Do **not** stamp ensure_way_out / humidity / dry-boulder reject. Do **not** claim lit grow. `rnd(2)` still picks the variant; this peel only supplies the missing loader.

## Density

§2b: one proto, sibling of `soko2-1`. +135. Did **not** glue bigrm-5. Right size.

## Verification

`verify.mjs --fn makemaz` → PASS syntax; PASS rule2; **PASS hidden (no corpus session blocked on makemaz)**; green + cohort + full 44/44. Public suite does not walk soko2-2; 44/44 does not prove boulder RNG. This audit: lua 72 lines vs HEAD `load_soko2_2` `:10224–10322` (16 boulders, 11 holes, 6 objects). `csym` `makemaz` `:1126–1223`; epilogue `sp_lev.c:6037–6053`. Rule #2 at end-of-iter.

## Actionable C-wrongs

None that must block the next port. Named (map): ensure_way_out; humidity; dry-boulder. Residual clone: lit region without grow (same as soko2-1).

Verdict: **ACCEPT-WITH-DEBT**
