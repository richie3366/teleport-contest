# Review 503 — e5188ba2 — themerms.lua Light source fill oil lamp (D-1542)

## Metadata
- Full / short hash: `e5188ba2d6ac3a2f57cbbdcb5af2ee0144e4d27f` / `e5188ba2`
- Parent: `21ccdfde` (D-1541). This file audits **this SHA only** (third of nine `js/` commits since review **500**). Archive **Addressed:** D-1542 `e5188ba2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 08:52:16 +0200
- D-id: **D-1542**
- Stats: 9 files, +115 / −32 — `js/mklev.js` +16 / −3. Band 150–350 (js/ insertions 16).
- Claims to close: Open `themerms.lua` Light source fill (named from D-1541 / review **494**). Not `create_object` `o->lit`. `reviews/loop-2026-08-15/` has no unpaid themerms Must-fix.
- JS / map: `mklev.js` `themeroom_fill_light_source` / `THEMEROOM_FILL_BODIES`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **494** named this fill as the only production `lit=true`.

## Intent vs deliverable

Git subject promises: an unlit themed room places a burning oil lamp via `l_create_object lit=true`, not a named omit that skipped the fill body.

Pinned C `dat/themerms.lua` `:204–209`; producer `sp_lev.c` `l_push_mkroom_table` `:3066` `lit←rlit`; `lspo_object` `:3640` lit default 0; callee `create_object` `:2425–2426` `begin_burn(otmp, FALSE)` (D-1533); `timeout.c` `begin_burn` `:1712` OIL_LAMP `:1735–1746`. Eligible `rm.lit == false`. Contents one table `des.object` with no coord → `SP_COORD_PACK_RANDOM`.

```204:209:nethack-c/upstream/dat/themerms.lua
   {
      name = "Light source",
      eligible = function(rm) return rm.lit == false; end,
      contents = function(rm)
         des.object({ id = "oil lamp", lit = true });
      end
   },
```

Old JS: `THEMEROOM_FILLS` already had `needs_unlit`; `THEMEROOM_FILL_BODIES` had no `'Light source'` key so `themeroom_fill` picked the name and no-op’d. `l_create_object` / `o.lit` already live.

The diff **does** dispatch `themeroom_fill_light_source` → `l_create_object({ id: OIL_LAMP, lit: true }, null, croom)`. It **does not** port Ice/Boulder/Spider/Trap/Garden/Buried treasure/Massacre/Statuary, garden/dig postprocess, or `bury_an_obj`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| Light source contents | C lua `:207–209`, **LIVE this SHA** | |
| eligible `rm.lit==false` | C `:206`, **LIVE** (pre-existing) | `needs_unlit` vs `croom.rlit` |
| `l_create_object` | C `lspo_object` table, **LIVE** | not `create_object_themed` |
| `create_object` `o->lit` | C `:2425`, **LIVE** | D-1533 |
| `begin_burn` | C `:1712`, **LIVE** | OIL_LAMP arm |
| `mksobj_at` | C, **LIVE** | place; lit is after |
| `create_object_themed` | **not used** | skips `o->lit` |
| other fill bodies | C lua, **OMIT named** | Ice/Boulder/… |

`node scripts/sym.mjs l_create_object create_object begin_burn themeroom_fill_light_source create_object_themed mksobj_at stackobj`:

```
l_create_object  js/mklev.js:11516   sync
create_object    NOT EXPORTED — 1 LOCAL js/mklev.js:11320
begin_burn       js/timeout.js:698   sync
themeroom_fill_light_source NOT EXPORTED — 1 LOCAL js/mklev.js:17772
create_object_themed NOT EXPORTED — 1 LOCAL js/mklev.js:17275
mksobj_at        js/mkobj.js:1601   sync
stackobj         js/mkobj.js:1807   sync
```

No clone deleted. Fill is a new local matching the lua contents function. `begin_burn` is not a stub (OIL_LAMP turns from age).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2: no lua filesystem; table is in `mklev.js`.

## C ↔ JS fidelity

Eligible. C `rm.lit` is `tmpr->rlit` (`:3066`). JS `needs_unlit && croom?.rlit` rejects lit rooms. Frequency omitted in lua → 1; JS `frequency: 1`. **Match `:204–206`.** Reservoir `rn2(total)` is pre-existing `themeroom_fill`.

Object. C `id = "oil lamp"` → `get_table_objtype`. JS `objectNames.indexOf('OIL_LAMP')`. **Match the otyp.** `lit: true` not tile.lit. **Match; not D-1519.** No coord → C `ox==-1` random pack; JS `l_create_object` sets `rx/ry=-1` then `create_object` `get_location_coord(DRY, croom, -1, -1)`. **Match random DRY in room.** No contents function; JS `contentsFn=null`. **Match.**

Light. `create_object` after `stackobj`: `if (o.lit) begin_burn(otmp, false)` inside `!SP_OBJ_CONTENT`. **Match `:2422–2426`.** `begin_burn` OIL_LAMP uses age thresholds 150/100/50/25. **Match `:1735–1746`.** `create_object_themed` / bare `mksobj_at` would skip this; they did not use them.

Callee closure. LIVE: eligible table, `l_create_object`, `create_object` lit, `stackobj`, `begin_burn`, `mksobj_at`. OMIT named: other fills, `bury_an_obj`. STUB: none. **The arm may ship.** Do **not** skip Light source via `mksobj_at` without `o->lit`.

## Hallucinations / overclaim

Subject unlit room + burning oil lamp via `l_create_object`: **true.** D-log “not a named omit that skipped the fill body”: **true.** Stamping **Addressed:** D-1542 is fair for **this lua contents**. Do **not** stamp “Match C Ice room fill.” Do **not** stamp “Match C `bury_an_obj`.” Do **not** restamp D-1533. This is **not** “dispatch ported, callee stubbed”: `begin_burn` is live.

## Density

+16 JS: lua body is six lines; dispatch + one call. §2b “unless C is that small” applies (same as **494**’s +13). Did not glue furnsyms.

## Branch-by-branch confirm

1. Unlit croom picks Light source: one OIL_LAMP, `lit true`, `begin_burn`. **Match.**
2. Lit croom: fill ineligible. **Match.**
3. `mksobj_at` alone: stays unlit (not this path). **Match the warning.**
4. Omitted lua `lit`: default 0, no burn (D-1533). **Unchanged.**
5. Ice/Boulder/…: still no body. **Named.**

## Callers / RNG ledger

C: `themeroom_fill` after themed region. JS the same. **New RNG** when this fill is picked: `get_location_coord` + `mksobj_at` (was a no-op). Public-unhit (cadence still 44/44). No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No `fs` of `dat/themerms.lua`. No FORCE.

## Verification

D-log canary **13**/13 (C/JS grep; unlit lamp burns; `mksobj_at` alone unlit; not D-1519 tile.lit; omitted lit skips; Rule #2); green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: Ice/Boulder/Spider/Trap/Garden/Buried treasure/Massacre/Statuary; garden/dig postprocess; `bury_an_obj`.

Verdict: **ACCEPT-WITH-DEBT**
