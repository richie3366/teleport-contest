# Review 480 — d5799f73 — mklev.c mktrap_victim gnome candle begin_burn (D-1519)

## Metadata
- Full / short hash: `d5799f7360f678967fda096bf128d01378b2a96f` / `d5799f73`
- Parent: `527815fb` (D-1518). This file audits **this SHA only** (seventh of nine `js/` commits since review **473**). Archive **Addressed:** D-1519 `d5799f73`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 02:47:28 +0200
- D-id: **D-1519**
- Stats: 9 files, +86 / −31 — `js/mklev.js` +5 / −1. Band 150–350 (js/ insertions 5).
- Claims to close: Open `mklev.c` `mktrap_victim` gnome candle `begin_burn` (named from D-1518). Not `m_initinv` (D-1506). `reviews/loop-2026-08-15/` has no unpaid victim-candle Must-fix.
- JS / map: `mklev.js` `mktrap_victim`; callee `timeout.js` `begin_burn`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **467** named this floor path as distinct from minvent D-1506.

## Intent vs deliverable

Git subject promises: a gnome trap-victim candle on an unlit tile begins burning after `place_object`.

Pinned C `mklev.c` `mktrap_victim` `:1908–1920`: `rn2(15)` cases 6–9 `PM_GNOME`; `if (!rn2(10))` then `mksobj(rn2(4) ? TALLOW_CANDLE : WAX_CANDLE, TRUE, FALSE)`, quan 1, `weight`, `curse`, `place_object(otmp, x, y)`, **`if (!levl[x][y].lit) begin_burn(otmp, FALSE)`**. Callee `timeout.c` `begin_burn` `:1712–1797` (D-0978): age-0 early out; tallow/wax `candle_light_range` then timer + `LS_OBJECT`. Caller `mktrap` victim gate `:2135–2151` (`in_mklev` + `rnd(4)`). This is **floor** light after `place_object`, not D-1506 `!mpickobj` minvent.

Old JS: same gnome/`!rn2(10)` candle through `place_object`, then a comment “begin_burn deferred when tile unlit.”

The diff **does** import live `begin_burn` and gate on `!lit` after `place_object`. It **does not** port `sp_lev.c` `create_object` `o->lit`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mktrap_victim` gnome candle | C `:1911–1920`, **LIVE this SHA** | `!lit` after place |
| `begin_burn` | C `timeout.c:1712`, **LIVE** | `timeout.js:684`; not a stub |
| `place_object` | C mkobj, **LIVE** | |
| `mksobj` / `weight` / `curse` | C, **LIVE** | already in this arm |
| `m_initinv` S_GNOME candle | C makemon.c, **already LIVE** | D-1506 |
| `create_object` `o->lit` | C `sp_lev.c`, **OMIT named** | |

`node scripts/sym.mjs mktrap_victim begin_burn place_object`:

```
mktrap_victim    NOT EXPORTED — 1 LOCAL js/mklev.js:19484
begin_burn       js/timeout.js:684   sync
place_object     js/mkobj.js:1655   sync
```

`timeout.js` does not import `mklev.js`. No cycle. `begin_burn` is the real export, not a local clone.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none (`begin_burn` is silent; C comment). The gnome/`!rn2(10)`/`rn2(4)` candle dice were already in this arm. **Public-unhit** unless a gnome victim candle lands on an unlit trap tile.

## C ↔ JS fidelity

Pinned C:

```1911:1920:nethack-c/upstream/src/mklev.c
        if (!rn2(10)) {
            otmp = mksobj(rn2(4) ? TALLOW_CANDLE : WAX_CANDLE, TRUE, FALSE);
            otmp->quan = 1;
            otmp->owt = weight(otmp);
            curse(otmp);
            place_object(otmp, x, y);
            if (!levl[x][y].lit)
                begin_burn(otmp, FALSE);
        }
```

HEAD JS `:19529–19539`: same dice, quan/weight/curse/`place_object`, then `if (!game.level.at(x, y)?.lit) begin_burn(otmp, false)`. **Match gate and `FALSE`.** `?.` on a missing cell would treat unlit as true; trap `tx,ty` is in-bounds like C’s assert. **Match live traps.** Lit tile skips `begin_burn`. **Match.**

`begin_burn` LIVE: tallow/wax age buckets + `candle_light_range` + `start_timer` + `new_light_source` `LS_OBJECT`. Floor object has `get_obj_location`. D-log canary unlit lights + timer + LS_OBJECT; lit skip; wax unlit. **Match D-0978 / D-1506 callee.** Age-0 candles return without lighting (C `:1718–1719`); `mksobj` candles get age. **Match.**

Callee closure. LIVE: `begin_burn`, `place_object`, `mksobj`. OMIT named: `create_object` `o->lit`. STUB: none. **Arm may ship.** Not “dispatch ported, callee stubbed.” Review **467** was the minvent twin; this is the floor twin.

## Hallucinations / overclaim

Subject unlit gnome-victim candle begins burning after `place_object`: **true**. Do **not** stamp “Match C `m_initinv` gnome candle” (D-1506). Do **not** stamp “Match C `create_object` `o->lit`.” Do **not** treat fortress PASS as a victim-candle light (public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

+5 JS. Playbook §2b “unless C is that small”: C is two lines after an already-ported arm. Did not glue fruitadd. Acceptable. Sibling of D-1506 shipped earlier (different callers).

## Branch-by-branch confirm

1. Gnome victim, `!rn2(10)`, unlit: `begin_burn(otmp, false)`. **Match `:1918–1919`.**
2. Same, lit: skip. **Match.**
3. Tallow vs wax `rn2(4)` unchanged. **Match `:1913`.**
4. Non-gnome victim cases unchanged. **Match.**
5. D-1506 minvent path unchanged. **Not this SHA.**
6. **Public-unhit** unless `mktrap` victim + gnome + candle + unlit.

## Callers / RNG ledger

C: `mktrap` → `mktrap_victim`. No new `rn2`. `begin_burn` has none.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **10**/10 (C/JS arm; unlit lights + timer + LS_OBJECT; lit skip; wax unlit; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a gnome victim candle lands on an unlit trap tile. Cohort is shared-startup. Honest.

## Actionable C-wrongs

None. Remaining **named** (map / Open): `sp_lev.c` `create_object` `o->lit` `begin_burn`; `mkgrave_room` bury. Do not Must-fix D-1506 (already live). Do not Must-fix “optional `?.lit`” without an out-of-bounds trap falsifier.

Verdict: **ACCEPT-WITH-DEBT**
