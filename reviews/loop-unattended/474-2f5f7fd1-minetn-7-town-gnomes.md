# Review 474 — 2f5f7fd1 — dat/minetn-7.lua town-floor three gnomes (D-1513)

## Metadata
- Full / short hash: `2f5f7fd145ea13bd0a48d9386cf9418577e9082b` / `2f5f7fd1`
- Parent: `9fadd946` (audit #1900). This file audits **this SHA only** (first of nine `js/` commits since review **473**). Archive **Addressed:** D-1513 `2f5f7fd1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 01:47:58 +0200
- D-id: **D-1513**
- Stats: 10 files, +104 / −38 — `js/mklev.js` +4 / −4. Band 150–350 (js/ insertions 4).
- Claims to close: Must-fix from review **465** QUALITY-RISK (extra `splev_room_monster(town, 'gnome')`). Not `ensure_way_out`. Not a Lua VM. `reviews/loop-2026-08-15/` has no unpaid Bazaar gnome Must-fix.
- JS / map: `mklev.js` `load_minetn_7`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **465** Actionable #1 (town gnome ×4 vs lua ×3).

## Intent vs deliverable

Git subject promises: Bazaar Town floor spawns three `gnome` then gnome lord instead of an extra `induced_align(80)`+`makemon`.

Pinned C is `dat/minetn-7.lua` `:155–165` (inside the outer `des.room` `contents`, after the temple). Order: four `des.monster({ id = "watchman", peaceful = 1 })`, one watch captain peaceful, **three** `des.monster("gnome")`, `des.monster("gnome lord")`, two `des.monster("monkey")`. Each named `des.monster` without `align` is `AM_SPLEV_RANDOM` → `sp_lev.c` `create_monster` `:1943` → `sp_amask_to_amask` `:1916–1917` `induced_align(80)` then `makemon` (not `mk_roamer`, because `sp_amask == AM_SPLEV_RANDOM`). Nested percent-75 gnome+monkey rooms and the stair-room two gnomes are separate lua lines; they were not the **465** C-wrong.

Old JS (D-1504): same watch/captain then **four** `splev_room_monster(town, 'gnome')`.

The diff **does** delete that fourth town gnome and retitle the comment to lua `:155–165`. It **does not** touch nested nests, stair rooms, shops, sink, or `ensure_way_out`. Named leftovers from D-1504 stay named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `load_minetn_7` town-floor list | C lua `:155–165`, **CLONE this SHA** | fourth gnome deleted; now matches lua |
| `splev_room_monster` | C `create_monster` `:1925`, **LIVE** (pre-existing) | not redefined here |
| `induced_align` | C `dungeon.c` / `sp_amask_to_amask` `:1917`, **LIVE** | burned inside helper; discarded amask |
| `makemon` | C `makemon.c`, **LIVE** | AM_SPLEV_RANDOM arm |
| `splev_create_monster` | C `create_monster` no-croom, **LIVE** | unused by this list |
| `ensure_way_out` | C inaccessibles, **OMIT named** | **NOT FOUND**; lua has no that flag |
| `link_doors_rooms` extras / `map_cleanup` / `count_level_features` | C load_special, **OMIT named** | D-1504 leftovers |

`node scripts/sym.mjs load_minetn_7 splev_room_monster induced_align splev_create_monster`:

```
load_minetn_7    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:8576
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
splev_room_monster NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11720
             => Do NOT write clone #2.
induced_align    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:17186
             => Do NOT write clone #2.
splev_create_monster NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11169
             => Do NOT write clone #2.
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** minus one `induced_align(80)` then `makemon` between the third town gnome and gnome lord. Public traces stay whatever `makemaz` variant they already rolled.

## C ↔ JS fidelity

Pinned lua town-floor list:

```155:165:nethack-c/upstream/dat/minetn-7.lua
              des.monster({ id = "watchman", peaceful = 1 })
              des.monster({ id = "watchman", peaceful = 1 })
              des.monster({ id = "watchman", peaceful = 1 })
              des.monster({ id = "watchman", peaceful = 1 })
              des.monster({ id = "watch captain", peaceful = 1 })
              des.monster("gnome")
              des.monster("gnome")
              des.monster("gnome")
              des.monster("gnome lord")
              des.monster("monkey")
              des.monster("monkey")
```

HEAD `js/mklev.js` `:8708–8719`: four watchmen + captain (`peaceful=1` → `1 > BOOL_RANDOM` so `mpeaceful=1`) then three `'gnome'` then `'gnome lord'` then two `'monkey'`. **Match lua count and order.** Nested `percent(75)` gnome+3 monkeys and stair-room two gnomes unchanged (lua has those too). **Match.**

Callee `splev_room_monster` (`:11720–11759`): `find_montype_gender` for named id; always `induced_align(80)`; humidity `get_location_coord` then DRY fallback; `splev_resolve_occupied`; `inside_room` reject; `makemon`; female overwrite; peaceful only when `peaceful > BOOL_RANDOM`. For `des.monster("gnome")` C also burns `induced_align(80)` via `sp_amask_to_amask(AM_SPLEV_RANDOM)` then takes the `else makemon` arm (`:1983–1988`). JS discards the amask the same way. **Match that arm.** This SHA does not re-port the helper.

Callee closure (town-floor arm). LIVE: `splev_room_monster` → `induced_align` + `makemon`. CLONE: `load_minetn_7` lua list, now matched at `:155–165`. OMIT named: `ensure_way_out` / door-link extras / `map_cleanup`. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject three gnome then gnome lord, not an extra `induced_align`+`makemon`: **true** at HEAD. D-log nested canary (lua×3, JS×3, not four, watch×4, stair 2+1): **true for counts**; it does **not** prove a public session rolled variant 7. Stamping **Addressed:** D-1513 for **lua `:155–165` town-floor count** is fair. Do **not** stamp “Match C Lua VM.” Do **not** stamp “Match C `ensure_way_out`.” Do **not** treat fortress PASS as Bazaar Town (public-unhit unless `rnd` hits variant 7). Review **465** QUALITY-RISK Actionable #1 is actually closed; leftover named omits stay map/Open, not a new C-wrong in this SHA.

## Density

Must-fix one item, alone. +4 JS. Playbook §2b “below ~40 insertions on a **non-Must-fix** port is a failed density handoff” does not apply. Did not glue SPFX_WARN. Acceptable.

## Branch-by-branch confirm

1. Town watch ×4 peaceful + captain. **Match lua `:155–159`.** Unchanged this SHA.
2. Town `des.monster("gnome")` ×3. **Match `:160–162`.** Fourth call deleted.
3. Gnome lord then two monkeys. **Match `:163–165`.**
4. Each of those named ids still burns `induced_align(80)` then `makemon`. **Match `create_monster` AM_SPLEV_RANDOM.**
5. Nested percent-75 gnome+monkeys and stair-room two gnomes. **Unchanged; still match lua.**
6. `ensure_way_out` absent. **Named omit** (lua also omits inaccessibles).
7. **Public-unhit** unless a session rolls mines-town variant 7.

## Callers / RNG ledger

C: `makemaz` → `load_special("minetn-7")` → lua `contents`. JS `load_special_proto` → `load_minetn_7`. Deleting the extra gnome removes one `induced_align` (`rn2(100)` then maybe dungeon align / `rn2(3)`) plus `makemon` dice before gnome lord. No new `rn2` added.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Coordinates untouched (lua source already in D-1504).

## Verification

D-log: private canary **16**/16 (lua×3, JS×3, not four, counts match, watch×4, stair 2+1, nested gnome+monkeys, `induced_align(80)`, Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless `makemaz` rolls variant 7. Cohort is shared-startup, not a mines-town screen. Honest.

## Actionable C-wrongs

None in this SHA. Review **465** extra town gnome is gone. Remaining named (map / Open, already queued elsewhere): `ensure_way_out` when some other proto sets inaccessibles; `link_doors_rooms` extras; `map_cleanup`; `count_level_features`. Do not Must-fix “should have run a Lua VM.” Do not Must-fix nested-room gnome counts (lua has those extra gnomes).

Verdict: **ACCEPT**
