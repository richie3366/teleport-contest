# Review 652 — 93fcd877 — o_init.c undiscover_object / gem_learned (D-1691)

## Metadata
- Full / short hash: `93fcd8775b2789544e4df0f6e63d8759bdf08350` / `93fcd877`
- Parent: `0458e7cc` (D-1690). This file audits **this SHA only** (eighth of nine `js/` commits since review **644**). Archive **Addressed:** D-1691 `93fcd877`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 23:27:40 +0200
- D-id: **D-1691**
- Stats: `js/o_init.js` +41/−3; `js/shk.js` +76/−8; `js/invent.js` +45/−5; `js/do_name.js` +4/−4. Total `js/` insertions **166** <250. Band **150–350**.
- Claims to close: Open undiscover/gem_learned after D-1672 empty Call skipped both. Not `observe_object` FIRST_OBJECT skip. Not wield `restrict_name` (D-1692). `reviews/loop-2026-08-15/` has no unpaid disco Must-fix.
- JS / map: `o_init.js` `undiscover_object`; `shk.js` `gem_learned`/`find_oid`/`bp_to_obj`; `invent.js` `o_on` + `discover_object` moveloop; `docall`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **633** named undiscover after sink-fluid.

## Intent vs deliverable

Git subject promises: emptying a Call name purges `disco[]` and identifying a gem reprices unpaid bills, instead of skipping both after D-1672.

`node scripts/csym.mjs undiscover_object` → `o_init.c:497–523`. `--callers`: `do_name.c:669`. `gem_learned` `shk.c:3196–3231` (`--callers` `o_init.c:489` and `:521`). `find_oid` `:2776–2804` (`--callers` include `:3222`, `bp_to_obj` `:2767`). `o_on` `invent.c:1586–1599` (`--callers` `find_oid` `:2784–2799`, `bp_to_obj` `:2765`). `bp_to_obj` `:2758–2769` (`--callers` cheapest/pay/doinvbill). `discover_object` `:453–494` FIRST_OBJECT `:460`; moveloop GEM `:487–490`. `docall` `:635–676` empty `:667–669`. `next_shkp` `:214–231`. `observe_object` `:441–451` (named skip). `FIRST_OBJECT` `objects.h:108` = 18 in `objects_data.js`.

```497:522:nethack-c/upstream/src/o_init.c
void
undiscover_object(int oindx)
{
    if (!objects[oindx].oc_name_known && !objects[oindx].oc_encountered) {
        ...
        if (objects[oindx].oc_class == GEM_CLASS)
            gem_learned(oindx); /* ok, it's actually been unlearned */
    }
}
```

```667:669:nethack-c/upstream/src/do_name.c
    if (!*buf) {
        if (had_name) /* possibly remove from disco[]; old *uname_p is gone */
            undiscover_object(obj->otyp);
```

Parent: `docall` `void hadName`; `discover_object` no `gem_learned`; `bp_to_obj` invent-only. The diff **does** disco shift + `impossible` miss, `gem_learned` via `next_shkp`/`find_oid`/`get_cost`, `o_on` array+nobj+cobj, `bp_to_obj` `useup`→`billobjs`, `discover_object` `oindx < FIRST_OBJECT` + in_moveloop GEM reprice + `update_inventory`, `docall` `if (hadName) undiscover_object`. It **does not** add `observe_object` `oindx >= FIRST_OBJECT`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `undiscover_object` | LIVE | o_init.js export |
| `gem_learned` | LIVE | shk.js |
| `find_oid` | LIVE | was invent-only clone; now C lists |
| `o_on` | LIVE | extra Array walk for JS invent |
| `bp_to_obj` | CLONE | C static; useup/`find_oid` |
| `next_shkp` | CLONE | index vs `nmon`; `rile_shk` when ANGRY |
| `get_cost` | LIVE | named glass-gem table |
| `docall` empty | LIVE | |
| `observe_object` FIRST_OBJECT | OMIT | named this commit |

`node scripts/sym.mjs`:

```
undiscover_object js/o_init.js:325   sync
gem_learned      js/shk.js:3810   sync
find_oid         js/shk.js:3773   sync
o_on             js/invent.js:287   sync
bp_to_obj        NOT EXPORTED — local js/shk.js:3836
next_shkp        NOT EXPORTED — local js/shk.js:3483
get_cost         NOT EXPORTED — local js/shk.js:2758
```

`--can` o_init→shk `gem_learned`, invent→shk `gem_learned`, shk→invent `o_on`: ALREADY static. No new TDZ. FORCE/DIAG/getRngLog/fastforward: none. Rule #2 clean.

## C ↔ JS fidelity

`undiscover_object`: no-op if `oc_name_known || oc_encountered`. Loop `dindx = bases[acls]` while `disco[dindx]!=0 && objects[dindx].oc_class==acls` — disco is otyp-indexed like C. Shift then `disco[dindx-1]=0`; else `impossible`. Then GEM `gem_learned`. No RNG.

`discover_object`: C `:460` `oindx < FIRST_OBJECT` return (JS had `< 0`). Newly known + `in_moveloop && !gameover` → GEM `gem_learned` then `update_inventory` even for non-gems (C `:487–490`). `disco` length `NUM_OBJECTS`.

`gem_learned`: `next_shkp(fmon, TRUE)` then `next_shkp(shkp->nmon, TRUE)`. JS `{shkp, nextIdx}` from `game.fmon` array (same helper as other shop walks). `while (--ct>=0)` `find_oid(bp.bo_id)`; missing oid skipped (`C continue`). `oindx != STRANGE_OBJECT ? otyp==oindx : oclass==GEM`. `bp.price = get_cost(obj, shkp)`. `get_cost` is the existing C-shaped clone (glass-gem pseudo-ID still named). `next_shkp` still riles angry shops (`:224–228`) before `get_cost` surcharge — C.

`find_oid`: invent/`fobj`/buried/`migrating_objs` then `fmon`/`migrating_mons`/`mydogs` minvent. Invent array vs C `gi.invent` nobj — `o_on` array branch. `o_on` `Has_contents`→`cobj` then `nobj` (`const.js` `cobj != null`). `bp_to_obj` `useup` → `game.billobjs` else `find_oid` (`:2764–2767`).

`docall` `:667–669` after `mungspaces`; empty + `had_name` only. Non-empty still `discover_object(..., false, true, true)`.

**`discover_object` disco slot.** C `:473–478` walks `bases[acls]` until the otyp or an open slot, then `disco[dindx]=oindx`. JS already did that loop (pre-this-SHA); this SHA only adds FIRST_OBJECT, `NUM_OBJECTS` disco length, and the moveloop GEM/`update_inventory` tail. `observe_object` `:447` still skips only Hallucination in JS (`invent.js:2528`) — generic otyp still `dknown=1`. Named.

**`find_oid` other callers.** C also `light.c` `:548/:619/:650` and `timeout.c:2764`. This SHA does not retarget those; they already imported `find_oid` or will once they call the export. `gem_learned` `STRANGE_OBJECT` all-gems sentinel has no extra C caller beyond the two `o_init` sites.

## Hallucinations / overclaim

Not “dispatch stubbed.” `gem_learned` callees are LIVE/CLONE. Overclaim would be `observe_object` FIRST_OBJECT (still deferred in invent.js). `addupbill` stub is not on this path.

## Density

§2b: one Call/ID reprice cluster (`undiscover` + `gem_learned` + oid walk + `docall` + moveloop `discover_object`). Related.

## Verification

Journal: private canary (disco shift, o_on/find_oid, gem reprice, discover_object moveloop); green+strict seed8000/0900; cohort **9**/9 + strict. Public unhit for Call-empty / gem ID (fortress). Cadence later at HEAD. Rule #2 clean.
`--can invent.js invent.js find_oid` is ALREADY static.

## Actionable C-wrongs

None for Must-fix. Named (map): `observe_object` `oindx >= FIRST_OBJECT` (`o_init.c:447`); `get_cost` glass-gem table. Do **not** skip `update_inventory` on non-gem discover in moveloop. Do **not** walk only `game.invent` in `bp_to_obj`.

Verdict: **ACCEPT-WITH-DEBT**
