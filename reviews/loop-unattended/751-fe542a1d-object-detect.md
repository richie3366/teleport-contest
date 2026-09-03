# Review 751 — fe542a1d — detect.c object_detect (D-1782)

## Metadata
- Full / short hash: `fe542a1d71f0cbf3ca38f78bf862f30c627a0297` / `fe542a1d`
- Parent: `28f02a82` (D-1781). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 19:54:39 +0200
- D-id: **D-1782**
- Stats: `js/detect.js` +183/−34. Total `js/` insertions **183** ≤250. Band **150–350**.
- Claims to close: Open `object_detect` `clear_stale_map` caller. Not `observe_recursively` (already recurses). Review **732** named this omit.
- JS / map: `detect.js` `object_detect` rewrite. Callers already live (`potion.js`, crystal ball).
- Archive **Addressed:** D-1782 `fe542a1d`.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `object_detect` so a stale map is redrawn, containers and buried objects and monster packs are searched, and a monster’s gold draws its `rnd(10)`, instead of a floor-only `oclass` compare.

`node scripts/csym.mjs object_detect` → `detect.c:602–789`. `--callers`: `detect.c:1345`/`:1350`; `potion.c:957`. `--callers clear_stale_map`: gold `:343`, food `:488`, **object `:686`**. `findgold` count `:680` and map `:764`. `observe_recursively` `:248–258`.

```686:695:nethack-c/upstream/src/detect.c
    if (!clear_stale_map(!class ? ALL_CLASSES : class, 0) && !ct) {
        if (!ctu) {
            if (detector)
                strange_feeling(detector, "You feel a lack of something.");
            return 1;
        }
        You("sense %s nearby.", stuff);
        return 0;
    }
```

Parent: floor piles only, raw `oclass === class`, never `clear_stale_map`. The diff **does** rewrite the helper with C’s count order and override-order mapping, including `rnd(10)` on the gold stand-in. It **does not** port `display_nhwindow(WIN_MAP, TRUE)` (flush stand-in, named).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `object_detect` | LIVE rewritten | `:602–789` |
| `clear_stale_map` | LIVE callee | now **called** |
| `o_in` | LIVE | container recurse |
| `findgold` | LIVE import | steal.js; **no** container walk |
| `observe_recursively` | LIVE local | **does** recurse `cobj` — D-log “stops at top” is false |
| `rnd` | LIVE | map-arm gold only |
| `display_nhwindow(WIN_MAP)` | OMIT named | `flush_screen(1)` |
| `gs.showsyms[SYM_BOULDER]` | dormant | table still null |

`node scripts/sym.mjs`:

```
object_detect    js/detect.js:1973   ASYNC
o_in             js/detect.js:1456   sync
clear_stale_map  NOT EXPORTED — local => do NOT write clone #2
observe_recursively NOT EXPORTED — local js/detect.js:249
findgold         js/steal.js:52   sync
             !! ALSO 2 LOCAL CLONES — do NOT add #3
rnd              js/rng.js:74   sync
def_oc_syms      js/objects.js:83   sync
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. `--can detect.js steal.js findgold`: **ALREADY**.

## C ↔ JS fidelity

**`!clear_stale_map && !ct` (`:686`).** `clear_stale_map` **always runs** (first operand of `&&`). If stale unmapped, fall through to `cls()` even when `ct === 0`. If clean and `!ct`: `ctu` splits return 1 vs 0. JS the same expression. **Match the gate.** No draw on the empty-clean-map path.

**`ctu` split (`:687–694`).** `!ctu` → `strange_feeling` return **1**. `ctu` → “sense nearby” return **0**. **Match.**

**`o_in` containers.** Nested contents; skip Schroedinger. **Match.**

**Buried / minvent / cursed mimic.** Buried nobj; minvent never `ctu++`; cursed-mimic **or** `findgold` → extra `ct++` and **break `fmon`**. Mimic `else if` gold — cursed matching mimic **skips** `rnd(10)`. JS the same. **Match.**

**Map-arm gold (`:764–774`).** `quan = rnd(10)` then `map_object`. After `cls()`. **Match call-for-call.** Not probe-covered (admitted).

**Boulder dual-class.** Written against `game.gs?.showsyms?.[SYM_BOULDER]`. `showsyms` is still null. Arm dormant. Not a live-arm stub.

**`observe_recursively` (`:248–258`).** C: `observe_object` then recurse contents. HEAD `js/detect.js:249–257` already recurses `cobj`/`nobj`. SHA adds buried + minvent `do_dknown` callers. D-log “stops at a container’s top level” is a **false named omit**. This re-audit removed that Open row so refill cannot re-queue it.

**Callee closure.** LIVE: `o_in`, `clear_stale_map`, `findgold`, `observe_recursively`, `rnd`, `map_object`. OMIT named: `display_nhwindow`. STUB: **none**.

## Hallucinations / overclaim

“Match C `object_detect`” for the gate, `o_in`, buried, minvent, mimic, and `rnd(10)` **code** is true. “`observe_recursively` still stops at the top level” is **false**. “boulder dual-class” is written but dormant. Do **not** stamp “Match C `display_nhwindow`.” Do **not** stamp “`rnd(10)` probe-covered.” Parent “returned 1 for underfoot” is **false** (parent mapped whenever `ctu > 0`).

## Density

§2b: one C function, the named omit from D-1773. +183. Did **not** glue the `spell.c` food miss.

## Verification

D-log: green+strict; 44/44; probes empty-clean → 1 / 0 draws; underfoot → 0; ring-in-sack → 0. Post-`cls()` mapping, mimic, `rnd(10)`, `browse_map`: **not** probe-covered. Public-unhit. Admit that.

## Actionable C-wrongs

None for Must-fix. Named: `display_nhwindow` vs `flush_screen`; full `showsyms` so boulder dual-class can fire. **Do not** enqueue `observe_recursively`. Do **not** `ctu++` on minvent. Do **not** `rnd(10)` in the counting `findgold` test. Do **not** write `findgold` clone #3.

**Pinned-C walk this overlay.**
`csym.mjs object_detect` → `detect.c:602–789`.
Gate `:686` `!clear_stale_map(...) && !ct` always runs the unmap.
HEAD `js/detect.js:249–257` `observe_recursively` already walks
`cobj`/`nobj` — D-log “stops at top” is false; Open row removed
this overlay.
Map-arm gold `:764` `quan = rnd(10)` after `cls()`.
Counting `findgold` is a predicate.
minvent never `ctu++`.
Boulder `showsyms[SYM_BOULDER]` still null so dual-class is dormant.

Verdict: **ACCEPT-WITH-DEBT**
