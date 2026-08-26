# Review 505 — c9f09e97 — uhitm.c that_is_a_mimic object_from_map / defsyms (D-1544)

## Metadata
- Full / short hash: `c9f09e976246d7f1a6a37353c20dc4d01c46acc0` / `c9f09e97`
- Parent: `caae0b20` (D-1543). This file audits **this SHA only** (fifth of nine `js/` commits since review **500**). Archive **Addressed:** D-1544 `c9f09e97`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 09:23:44 +0200
- D-id: **D-1544**
- Stats: 10 files, +269 / −94 — `js/uhitm.js` +144 / −40, `js/objnam.js` +9. Band 150–350 (js/ insertions 153).
- Claims to close: Open `pager.c`/`uhitm.c` `that_is_a_mimic` (named from D-1543 / **485**). Not `object_from_map` spe itself. `reviews/loop-2026-08-15/` has no unpaid mimic-name Must-fix.
- JS / map: `uhitm.js` `that_is_a_mimic`; `objnam.js` `otense`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **485** named getpos fakeobj still; this SHA consumes `object_from_map` from combat reveal.

## Intent vs deliverable

Git subject promises: disguised mimics name via `object_from_map`, defsyms PCHAR desc, and `MIM_OMIT_WAIT`, not local `mksobj`.

Pinned C `uhitm.c` `that_is_a_mimic` `:6201–6276`. Callers `stumble_onto_mimic` `:6282` (`MIM_REVEAL`); `zap.c` `bhitm` (`MIM_REVEAL|MIM_OMIT_WAIT`). Callees `pager.c` `object_from_map` `:284–377` (D-1524); `objnam.c` `simpleonames` `:2428` / `otense` `:2531`; `obj.h` `is_plural` `:421–426`; `drawing.c` `defsyms[].explanation` (`PCHAR_DRAWING` `{ch, desc, clr}` — **desc**, not PCHAR2 tilenm). `M_AP_TYPE` masks `M_AP_TYPMASK`.

```6221:6272:nethack-c/upstream/src/uhitm.c
        if (glyph_is_cmap(glyph)) {
            ...
                Snprintf(fmtbuf, ..., "That %s actually is %%s!",
                         defsyms[sym].explanation);
        } else if (glyph_is_object(glyph)) {
            fakeobj = object_from_map(glyph, x, y, &otmp);
            ...
        }
        ...
        int i = (omit_wait && !strncmp(fmtbuf, "Wait!  ", 7)) ? 7 : 0;
        pline(&fmtbuf[i], what);
```

Old JS: local `mksobj` + `objectNameStrs`; furniture generic Wait; no omit_wait strip; local stub `a_monnam`.

The diff **does** dynamic-import live `object_from_map`, furniture PCHAR desc table, gold Those/are, `MIM_OMIT_WAIT` slice 7, mask `M_AP_TYPMASK`, import `a_monnam`/`x_monnam`/`otense`. It **does not** pass integer `glyph_at`, trapped-chest cmap on `M_AP_OBJECT`, Eyes `is_plural`, `dealloc_obj`, `namefloorobj`/`mhidden_description`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `that_is_a_mimic` | C `:6201`, **LIVE this SHA** | |
| `object_from_map` | C `pager.c`, **LIVE** | dynamic import; otyp not glyph |
| `a_monnam` | C `do_name.c`, **LIVE this SHA** | local stub **deleted** |
| `x_monnam` / `pmname` | C, **LIVE** | sleeping + monster-glyph |
| `simpleonames` | C `:2428`, **LIVE** | arm adds `makeplural` (JS helper is singular) |
| `otense` | C `:2531`, **LIVE this SHA** | export; not clone #7 |
| `is_plural_that` | C `obj.h:421`, **CLONE** | quan only; Eyes named |
| `defsym_explanation` | C `defsyms[].explanation`, **CLONE** | PCHAR desc 0..37 + chest 73 |
| `seemimic` | C `mon.c`, **LIVE** | import |
| `dealloc_obj` | C `:6241`, **OMIT named** | `where=OBJ_FREE`; GC |
| trapped-chest object cmap | C `:6224–6225`, **OMIT named** | |
| getpos fakeobj / `namefloorobj` / `mhidden_description` | C pager/do_name, **OMIT named** | |

`node scripts/sym.mjs that_is_a_mimic object_from_map a_monnam otense simpleonames seemimic mksobj x_monnam pmname is_plural dealloc_obj`:

```
that_is_a_mimic  js/uhitm.js:2439   ASYNC — await required
object_from_map  js/pager.js:606   sync
a_monnam         js/do_name.js:583   sync
             !! ALSO 4 LOCAL CLONE(S) — fountain/hack/music/trap (not this SHA)
otense           js/objnam.js:1645   sync
             !! ALSO 6 LOCAL CLONE(S) — this SHA imports the export
simpleonames     js/objnam.js:1893   sync
seemimic         js/mon.js:874   sync
mksobj           js/mkobj.js:1535   sync
x_monnam         js/do_name.js:464   sync
pmname           js/do_name.js:363   sync
is_plural        NOT EXPORTED — 3 LOCAL (do/dokick/iactions)
dealloc_obj      NOT EXPORTED — 1 LOCAL mklev.js
```

**Re-point:** uhitm dropped `mksobj` import; local `a_monnam` stub → `do_name.js` export. `otense` is a new export (callers still have 6 clones elsewhere — do not add #7). `is_plural_that` is a 4th `is_plural` clone under another name (Eyes omitted).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No gameplay RNG** in this function (C none).

## C ↔ JS fidelity

Blind. `!telepat` → generic default fmt; telepat+`M_AP_MONSTER` → `a_monnam`; else `what` stays null (no pline). **Match `:6212–6216`.** Local Blind/See_invisible clones use H/E/B bits + uroleplay.blind.

Sighted furniture. C `glyph_is_cmap` then furniture **or** object+`S_trapped_chest`. JS: `M_AP_FURNITURE` only; `defsym_explanation(mappearance)` uses **desc** (`staircase up`, `wall`, `opulent throne`, `closed door`) matching `PCHAR_DRAWING` (`PCHAR2` → `PCHAR(..., desc)`). Index 25/26/33–36 match D-1543 furnsyms. **Match furniture. Object trapped-chest named.**

Sighted object. C `glyph_is_object` → `object_from_map(glyph,x,y)`. JS `M_AP_OBJECT` → `object_from_map(mappearance,x,y)` (pager already takes otyp, not packed glyph). Fake gold `quan=2`; slime `spe`. **Match the callee.** Name: C `simpleonames` already `makeplural` if `quan!=1`. JS helper is singular, so this arm `makeplural(simpleonames)` — **verified CLONE of C’s plural step, not a second meaning.** Those/That + `otense(...,'are')` **Match `:6236–6238`.** Fake: `where=OBJ_FREE`; skip `dealloc_obj`. **Named.**

Sighted monster-glyph. `pmname(mndx, gender)` → `Wait!  That %s is really %s!`. JS `LOW_PM<=mndx<NUMMONS`. **Match `:6243–6250`.**

what. minvis && !See_invisible → generic; else `M_AP_MONSTER` `x_monnam(..., EXACT_NAME, TRUE)`; else sleeping mimic furniture/object `x_monnam(..., "sleeping", 0, FALSE)`; else `a_monnam`. **Match `:6255–6266`.** Masking `M_AP_F_DKNOWN` so sleeping still runs: **Match `M_AP_TYPE`.**

omit_wait. `strncmp("Wait!  ", 7)` → slice 7. Furniture/object fmts have no Wait (no-op). **Match `:6269–6272`.** `reveal_it` → `seemimic`. **Match `:6274–6275`.**

Callee closure. LIVE: object_from_map, a_monnam, x_monnam, pmname, simpleonames, otense, seemimic, makeplural. CLONE: defsyms desc, is_plural quan, Blind bits. OMIT named: glyph_at, trapped-chest object, Eyes, dealloc_obj, namefloorobj, mhidden_description. STUB: none. **The arm may ship.** Do **not** import uhitm→pager statically. Do **not** glue namefloorobj / mhidden_description.

## Hallucinations / overclaim

Subject object_from_map + PCHAR desc + MIM_OMIT_WAIT: **true.** D-log “not local mksobj”: **true** (import dropped). Stamping **Addressed:** D-1544 is fair for **the reveal text**. Do **not** stamp “Match C `glyph_at`.” Do **not** stamp “Match C Eyes `is_plural`.” Do **not** stamp “Match C `namefloorobj`.” This is **not** “dispatch ported, callee stubbed”: `object_from_map` is live D-1524.

## Density

+153 JS: one C function + the naming callees that arm always reaches. Did not glue `detect_wsegs`. §2b OK.

## Branch-by-branch confirm

1. Blind no telepat: “Wait!  That's a monster!” (omit_wait strips Wait). **Match.**
2. Furniture altar: “That altar actually is …”. **Match desc.**
3. Gold fake quan=2: “Those gold pieces are …”. **Match.**
4. Sleeping object mimic: `x_monnam` sleeping. **Match.**
5. Zap OMIT_WAIT on Wait fmt: slice 7. **Match.**
6. Trapped-chest object cmap / Eyes / dealloc: skipped. **Named.**

## Callers / RNG ledger

C/JS: stumble `MIM_REVEAL`; zap locking/opening `REVEAL|OMIT_WAIT`. No RNG. Public-unhit. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. Dynamic pager import. No FORCE.

## Verification

D-log canary **18**/18; green+strict; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: getpos fakeobj; `namefloorobj`; `mhidden_description`; trapped-chest object cmap; Eyes `is_plural`; `dealloc_obj`; ice/pool/trap cmap except chest.

Verdict: **ACCEPT-WITH-DEBT**
