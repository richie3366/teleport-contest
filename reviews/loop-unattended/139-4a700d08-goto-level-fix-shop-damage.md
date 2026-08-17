# Review 139 — 4a700d08 — do.c `goto_level` `fix_shop_damage` (D-1178)

## Metadata
- Full / short hash: `4a700d08056bb64366c9a9c66137f7253c6262d7` / `4a700d08`
- Parent: `36e0ce72` (D-1177). This file audits **this SHA only**. Archive row **Addressed:** D-1178 `4a700d08` was filled by D-1179.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 21:09:18 +0200
- D-id: **D-1178**
- Stats: 11 files, +452 / −57 — `js/shk.js` +346 / −8 (`fix_shop_damage` + `repair_damage` + litter / gates); `js/do.js` +16 / −8 (`!madeNew` await).
- Claims to close: Open queue `do.c` `goto_level` `fix_shop_damage` (named). Not obj_delivery. Reviews **127** / **137** named `:1985–1986` catchup after landing `in_out_region`. `reviews/loop-2026-08-15/` has no open shop-repair Must-fix.
- JS / map: `shk.js` `fix_shop_damage` / `repair_damage`; caller `do.js` `goto_level`. `c-js-map/turns.md` `shk.c` / `do.c`. `shk_fixes_damage` in `shk_move`; allmain restore / bones callers still named.
- Prior reviews this SHA claims to close: **127** named omit; D-1177 next-port.

## Intent vs deliverable

Git subject promises: “Match C do.c goto_level fix_shop_damage so a revisited shop catches up wall/door/trap repairs before pickup, instead of leaving damagelist gaps until the shopkeeper next moves.”

Old JS restored a visited level then ran `in_out_region` and `pickup(1)` with no catchup. C `if (!new) fix_shop_damage()` after `in_out_region`, before `do_fall_dmg` / `pickup`, so bones/revisit maps include off-level repairs.

The diff **does** port `fix_shop_damage` (empty list return; `next_shkp(..., FALSE)`; skip `shk_impaired`; walk with saved `nextdamg`; `repair_damage(..., TRUE)` then discard if truthy) and the catchup `repair_damage` body (delay/occupancy/trap/owner gates; landmine/beartrap `mksobj`+`mpickobj`; pit fill; else vanish; terrain restore; litter `rn2(9)`; `block_point` analog; **catchup returns 1 before post-block messages**). Wires `if (!madeNew)` at C’s slot. It does **not** call `shk_fixes_damage` from `shk_move` (live whisper + `catchup=FALSE`), nor allmain `:88` / bones `:731`. Named. Did not pull `do_fall_dmg`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goto_level` `!madeNew` | C caller, **new** | `do.c:1985–1986`; dynamic import (do↔timeout cycle) |
| `fix_shop_damage` | C callee, **new** | `shk.c:4849–4874` |
| `repair_damage` | C callee, **new** | `shk.c:4731–4845`; `catchup=true` from this caller |
| `repairable_damage` | C callee, **new** | `:4452–4487` |
| `shk_impaired` | C callee, **new** | `:4441–4448` |
| `discard_damage_struct` | C callee, **new** | unlink only (C also memset/free) |
| `litter_getpos` / `litter_scatter` / `litter_newsyms` | C callees, **new** | scatter `rn2(9)`; catchup still scatters, skips `litter_newsyms` via early return |
| `next_shkp` | C callee, **pre-existing** | array index encoding of `fmon`/`nmon` |
| `Passes_walls` | **clone** | local; C `youprop.h` `H\|\|E`; JS also `u.Passes_walls` (repo encoding) |
| `closed_door_shk` | **clone** | ≡ `hack.c` `closed_door` (`D_CLOSED\|D_LOCKED`) |
| `shop_owns_cell` | **clone** | `strchr(in_rooms(..., SHOPBASE), shoproom)` via `includes` + `fromCharCode` |
| `inhishop` / `helpless` / `inside_shop` | C callee / local | pre-existing |
| `mksobj` / `mpickobj` / `place_object` / `objects_at` | C callee, **imported** | trap convert + litter |
| `m_at` / `t_at` / `deltrap` / `trapname` / `picking_at` / `del_engr_at` | C callee, **dynamic import** | cycle break |
| `recalc_block_point` | JS encoding of `block_point` | full `vision_reset` (pre-existing port pattern) |
| `shk_fixes_damage` | C sibling, **named omit** | `shk_move` still skips |
| allmain / bones callers | C callers, **named omit** | Open not this line |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Repair coords come from `dam.place`. Rule #2 clean.

**New RNG on this path:** catchup with a repairable gap that has floor objects: `rn2(9)` in `litter_scatter` (C same). Landmine/beartrap convert: `mksobj(TRUE,FALSE)` (C same). Acoustics `!rn2(10)` is **after** `if (catchup) return 1` — **not** consumed on `goto_level`. Empty `damagelist`: **zero** extra RNG.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

No trace-index gates. Do not run catchup on `madeNew` (C `!new`). Do not emit wall/door plines on catchup. Do not `delobj` boulders in the gap (`obj_resists` `rn2`). Do not call `shk_fixes_damage` from this peel. Do not pull `do_fall_dmg`.

## C ↔ JS fidelity

### Caller vs `do.c:1980–1996`

C: `in_out_region` then `if (!new) fix_shop_damage()` then `do_fall_dmg` then `pickup(1)`. JS: same with `!madeNew` (`new` from mklev vs getlev). `do_fall_dmg` still named at this SHA (D-1179 next). Match the Open slot.

### `fix_shop_damage` vs `shk.c:4849–4874`

C: no damagelist → return; `for (shkp = next_shkp(fmon, FALSE); shkp; shkp = next_shkp(shkp->nmon, FALSE))`; skip `shk_impaired`; `for (damg = damagelist; damg; damg = nextdamg)` with `nextdamg = damg->next` **before** repair; `if (repair_damage(shkp, damg, TRUE)) discard`.

JS: `next_shkp(0, false)` then `nextIdx`; same skip; same saved next; `await repair_damage(..., true, deps)`. `next_shkp` still `rile_shk`s an angry shk (C does that inside `next_shkp` even on this walk). Match.

C:

```
if (!svl.level.damagelist) return;
for (shkp = next_shkp(fmon, FALSE); shkp;
     shkp = next_shkp(shkp->nmon, FALSE)) {
    if (shk_impaired(shkp)) continue;
    for (damg = damagelist; damg; damg = nextdamg) {
        nextdamg = damg->next;
        if (repair_damage(shkp, damg, TRUE))
            discard_damage_struct(damg);
    }
}
```

`madeNew` is JS’s `new` from first-time `mklev` vs getlev restore. Do not invert it.

### `repairable_damage` vs `:4452–4487`

Order: impaired → `REPAIR_DELAY` (5) vs `moves - dam.when` → if `!IS_ROOM(dam.typ)`: hero-at-cell and `!Passes_walls`, or shk on the cell, or `m_at` without `passes_walls(data)` → false → trap occupant (hero or `mtrapped`) → `strchr(in_rooms(SHOPBASE), shoproom)`.

JS same order. `Passes_walls` clone is `u.Passes_walls \|\| H \|\| E`. C macro is **only** `HPasses_walls \|\| EPasses_walls` (`youprop.h:286`). Extra sticky `u.Passes_walls` is the repo’s poly encoding (same clone in `do.js` / `dokick.js`), not a new invented predicate. Occupancy on catchup with the hero standing in a shop wall is **public-unhit**. Not a Must-fix of the Open catchup line. Do not rewrite other youprop clones to “save” this one (NOTES / D-1085).

`closed_door_shk` matches `hack.js` `closed_door` / C `D_CLOSED|D_LOCKED`. Used only for `stop_picking` **after** the catchup return would already have fired if we only restored traps… actually `stop_picking` is **before** `if (catchup) return 1`, so catchup still computes it, then returns without `stop_occupation`. C same: sets `stop_picking`, restores terrain, litter, `block_point`, then catchup return **skips** `if (stop_picking) stop_occupation()`. Match.

### `repair_damage` catchup vs `:4731–4845`

Trap present: LANDMINE/BEAR_TRAP → `mksobj` + optional messages if `!catchup` + `mpickobj`; HOLE/PIT/SPIKED_PIT fill message if `!catchup`; default vanish message if `!catchup`; then `deltrap` / `del_engr_at` / `newsym` if seeit; `disposition = 3` only if `!catchup`.

If `IS_ROOM(saved typ)` or typ already matches (door mask `> D_BROKEN`): return disposition (trap-only repair). Else restore `typ` / door `D_CLOSED` or `flags`; litter if `litter_getpos`; `del_engr_at`; seeit `newsym`; `block_point`; **`if (catchup) return 1`**.

JS: `recalc_block_point` then `if (catchup) return 1`. Post-block wall/door plines, claustrophobia, acoustics `rn2(10)`, `stop_occupation`, `litter_newsyms` are **not** run on `goto_level`. Match C. Those arms exist for the live `shk_fixes_damage` caller (`catchup=FALSE`) which this SHA **does not wire**. Not a hallucination of “live shop repair now whispers.”

Boulder/rock in the gap: C `obj_extract_self` + `obfree` (no `delobj` / `obj_resists`). JS extract + `quan=0` / `OBJ_FREE` continue. Same RNG (no `rn2(100)`). Encoding matches D-1021’s obfree stand-in, not a `delobj` C-wrong. Object leaves the floor chain so the `while (objects_at)` terminates. Match gameplay.

`litter_scatter` unpaid / `no_charge` / `remove_object`+`place_object` vs JS `obj_extract_self`+`place_object`: floor objects, same. Punished ball/chain in the gap: verbalize + `unplacebc`/`placebc` if `!Deaf && !muteshk`. Catchup **does** run this (it is before `block_point`). C same. Public-unhit.

`hero_deaf` is `u.Deaf \|\| HDeaf \|\| EDeaf \|\| uroleplay.deaf`. C `Deaf` is `HDeaf \|\| EDeaf \|\| u.uroleplay.deaf` (`youprop.h:125`). Extra sticky `u.Deaf` is the same encoding as elsewhere in `shk.js`. Catchup skips the acoustics arm anyway.

| Case | C | JS after |
|------|---|---------|
| no `damagelist` | return | **same** |
| `madeNew` | no call | **same** (`!madeNew`) |
| impaired shk | skip that shk, keep list | **same** |
| delay `< REPAIR_DELAY` | `repair_damage` 0, keep | **same** |
| trap-only, catchup | convert/fill, no pline, discard | **same** |
| wall gap, catchup, no litter | restore typ, `block_point`, return 1, no “closes up!” | **same** |
| wall gap + objects | `rn2(9)` scatter then silent return | **same** |
| live `shk_move` whisper | `shk_fixes_damage` `catchup=FALSE` | **named skip** |
| bones / allmain restore | extra callers | **named skip** |

`REPAIR_DELAY` is 5 (`const.js` / C). `D_BROKEN` is 0x01; door already `doormask > D_BROKEN` skips terrain restore (C `:4787–4791`). JS `curDoor > D_BROKEN` match.

### `block_point` encoding

C incremental `block_point` after restoring a wall. JS `recalc_block_point` → `vision_reset` (used throughout the port). After `docrt` already ran in `goto_level`, a catchup that actually restores terrain would reset vision again. Empty damagelist: no call. Cadence **#1500** 44/44: public sessions did not grow extra positional RNG here.

## Hallucinations / overclaim

D-log / CURRENT / subject say a revisited shop catches up wall/door/trap repairs before pickup. **That is the hunk:** C `:1985–1986` plus the catchup callee. Stamping **Addressed:** D-1178 is fair for the Open **fix_shop_damage** line. Hash `4a700d08` is on the archive row (filled by D-1179). Do **not** stamp it as “Match C `shk_fixes_damage`” or “Match C bones/allmain catchup” or “Match C `do_fall_dmg`.” This is **not** “Match C dispatch, callee is a stub”: `repair_damage(..., TRUE)` is the real `:4731–4845` body; catchup’s early return is C’s line 4818, not a no-op.

Shipping the `catchup=FALSE` message tail inside the same function is the C function, not a second subsystem. `shk_move` still does not call it.

## Density

One C caller plus the static helper cluster `fix_shop_damage` cannot run without (`repair_damage` / gates / litter / discard). ~300 JS lines in `shk.js` — at the §2b ceiling, not “finish shk.c.” Live `shk_fixes_damage` and bones/allmain were correctly left named. Did not pull shaft `losehp`. Not QUALITY-RISK: one family, one Open line.

## Verification

Journal: green+strict seed8000/0900; cohort **10**/10 (green + 1500/1800/0015/0002/0014/2200/4500/0367). Path **public-unhit** unless a session revisits a shop with `damagelist` older than `REPAIR_DELAY`. Empty-list no-op is what the fortress exercised. Cohort is thinner than CURRENT’s shared list; admit it. Cadence **#1500** is the relevant full-suite check for shared `goto_level`.

C read of `do.c:1980–1996`, `shk.c:4441–4487`, `:4508–4526`, `:4591–4845`, `:4849–4874`, `shk_move:4892–4893`; JS SHA `fix_shop_damage` / `repair_damage` / `!madeNew`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` **44**/44 — empty damagelist did not inject `rn2(9)` / `mksobj`.

## Actionable C-wrongs

None that Must-fix this next iter. The Open `!new` call matches. Catchup skip of post-`block_point` messages matches. Callee is real.

Named omits / do-nots (map / Open, not Must-fix):

1. `shk_fixes_damage` from `shk_move` (`shk.c:4892–4893`) — live whisper + `catchup=FALSE`.
2. allmain restore `fix_shop_damage` (`allmain.c:88`).
3. bones `fix_shop_damage` (`bones.c:731`).
4. `obfree` vs `quan=0` encoding (map / D-1021 pattern).
5. Do not catchup on `madeNew`. Do not `delobj` gap boulders. Do not emit wall-close plines off-level. Do not pull `do_fall_dmg` into this SHA — **Addressed:** D-1179 `5f08f9e5`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `goto_level` now catchup-repairs a revisited shop’s `damagelist` after `in_out_region` with C’s delay/occupancy/trap/owner gates and silent post-`block_point` return, while live `shk_move` repair stays named.
- Must-fix stays empty for this SHA; next port in this window popped Open `do_fall_dmg`. **Addressed:** D-1178 `4a700d08`. Not obj_delivery, not `shk_fixes_damage`.
