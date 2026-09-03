# Review 744 — b4d526e9 — detect.c findone flash / foundone / mimic tail (D-1775)

## Metadata
- Full / short hash: `b4d526e954fb5fc086957fb03bc6929ddec979d8` / `b4d526e9`
- Parent: `1f5d551a` (D-1774). **Re-audit** of review **734** (ACCEPT-WITH-DEBT). Independent pinned-C walk. Later SHA `da520eda` / D-1785 replaced this SHA’s detect.js `do_clear_area` clone with `vision.js` `override_vision`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 17:21:39 +0200
- D-id: **D-1775**
- Stats: `js/detect.js` +137/−18; `js/display.js` +45/−8. Total `js/` insertions **182** ≤250. Band **150–350**.
- Claims to close: Open `findone` tail after D-1773. Not `FOUND_FLASH_COUNT==0` `tmp_at` (compiled out of C). Review **732** named findone.
- JS / map: `detect.js` `findone`/`foundone`; `display.js` `flash_glyph_at`. `c-js-map/turns.md`.
- Archive **Addressed:** D-1775 `b4d526e9`.

## Intent vs deliverable

Git subject promises: Match C `detect.c` `findone` so found doors/corridors/traps flash with a `foundone` viz pulse and the mimic/hider/invisible tail runs, instead of stopping at `detect_obj_traps`.

`node scripts/csym.mjs findone` → `detect.c:1637–1726`. `foundone` `:1607–1634`. `flash_glyph_at` `display.c:1304–1321`. `detect_obj_traps` `:904–953` — when `ft` non-null, **`flash_glyph_at` + `foundone` + `num_traps++`** (`:936–946`). `FOUND_FLASH_COUNT` is 6 (`#if == 0` `tmp_at` compiled out). `do_clear_area` at **this** SHA was still the detect.js hero-only clone; D-1785 later put `override_vision` on the one `vision.js` export.

Parent: `findone` stopped at `detect_obj_traps` / SDOOR without flash. The diff **does** port SDOOR/SCORR/trap/dummytrap flash+`foundone`, mimic `seemimic`, hider `mundetected=0`, invisible `map_invisible`/`unmap_invisible`. It **does not** flash trapped **chests** in `detect_obj_traps` when `ft` is set (counts still). Named in the helper comment. It **does not** compile in `FOUND_FLASH_COUNT==0` `tmp_at` (correct — C omits it).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `findone` | LIVE repaired | C `staticfn`; local |
| `foundone` | LIVE new | viz pulse |
| `flash_glyph_at` | LIVE new | display.js; `rpt*2`; no `newsym` |
| `detect_obj_traps` ft flash | OMIT named | `tknown`/`sense_trap`/`num_traps++` only |
| `do_clear_area` at this SHA | CLONE incomplete | detect.js couldsee-only; **later D-1785 LIVE** |
| `FOUND_FLASH_COUNT==0` `tmp_at` | OMIT correct | compiled out of C |
| `seemimic` / hider / I-tail | LIVE | |

`node scripts/sym.mjs`:

```
findone          NOT EXPORTED — 1 LOCAL js/detect.js:562
foundone         NOT EXPORTED — 1 LOCAL js/detect.js:538
flash_glyph_at   js/display.js   ASYNC
detect_obj_traps NOT EXPORTED — local js/detect.js:2231
do_clear_area    js/vision.js:734   ASYNC   (HEAD; at this SHA also detect.js clone)
```

FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**. No RNG in `findone` itself.

## C ↔ JS fidelity

**SDOOR / SCORR / floor trap / dummytrap (`:1637–1726`).** Capture `t_at`/`m_at` before SDOOR mutate; SDOOR `recalc_block_point` vs SCORR `unblock_point`; flash then `tseen`; dummytrap for trapped door. JS the same. **Match those arms.** Subject “doors/corridors/traps flash” is true for **floor traps and trapped doors**.

**Mimic / hider / invisible tail.** `seemimic`; hider/eel `mundetected=0` + `newsym`; memory I vs `unmap_invisible`. **Match.**

**`foundone` (`:1607–1634`).** seenv SVALL + viz pulse. JS the same. **Match.**

**`flash_glyph_at` (`:1304–1321`).** `rpt*2` flashes; no `newsym`. JS async stand-in. **Match the live `#if FOUND_FLASH_COUNT != 0` arm.** The `==0` `tmp_at` path is compiled out of scored C.

**`detect_obj_traps` when `ft` non-null (`:936–946`).** C: `flash_glyph_at` then later `foundone` + `num_traps++`. HEAD `js/detect.js:2256–2258` still only `ft.num_traps++` (plus `tknown`/`sense_trap` when `show_them`). Comment names the skip. Trapped **chests** under `#search`/`findit` therefore do not flash. That is a named omit **inside** a callee `findone` always reaches. Review **734** said “Match the calls” for this site — that sentence is **false**. Not Must-fix: the SHA named it; floor traps already flash in `findone` itself.

**`do_clear_area` at this SHA.** detect.js clone: hero-only, `couldsee` only, **no** `override_vision`. C `findit` → `detecting(findone)` is true, so water/air should visit every `BOLT_LIM` cell. **This SHA shipped that hole.** D-1785 later deleted the clone and added the gate. Do **not** re-enqueue `override_vision`.

**Callee closure of the arms this SHA claimed (SDOOR/SCORR/floor trap/mimic/hider/I).** LIVE: `flash_glyph_at`, `foundone`, `seemimic`, `newsym`. OMIT named: ft-chest flash; `tmp_at`. STUB in those claimed arms: **none**. No RNG in `findone` itself.

## Hallucinations / overclaim

Subject “found doors/corridors/traps flash” is true for SDOOR/SCORR/floor `t_at`/dummytrap door, **false** for trapped chests via `detect_obj_traps(ft)`. Review **734** overclaimed “Match the calls” on that site. D-log “tail is live — do not re-port flash/foundone/mimic/hider/invis” is true for **those** tails, not for ft-chest flash. Do **not** stamp “Match C `override_vision`” on this SHA — that is D-1785. Do **not** stamp “Match C `FOUND_FLASH_COUNT==0` `tmp_at`.” Do **not** re-port D-1785.

## Density

§2b: one C callback + `foundone`/`flash_glyph_at`. +182. Did **not** glue `tmp_at`. Did **not** invent a FAIL peel. The detect.js `do_clear_area` clone was pre-existing; this SHA did not fix it.

## Verification

D-log: green+strict; fortress. Direct probes of flash/foundone. Water/air `override_vision` **not** this SHA (later D-1785 probe). Ft-chest flash **unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix on **HEAD**: `override_vision` is D-1785; ft-chest flash remains a **named** omit (`detect.c:936–946` `flash_glyph_at`/`foundone` when `ft` non-null). Named: that ft flash; `tmp_at`. Do **not** restore the detect.js `do_clear_area` clone. Do **not** skip SDOOR `recalc_block_point`.
Do **not** flash then forget `foundone` on floor traps.
SDOOR uses `recalc_block_point`; SCORR uses `unblock_point` —
swapping those two is a live C-wrong; this SHA does not.
Dummytrap door flash is LIVE; ft-chest flash is the named omit.

**Pinned-C walk this overlay.**
`csym.mjs findone` → `detect.c:1637–1726`.
`foundone` `:1607–1634` (seenv SVALL + viz).
`flash_glyph_at` `display.c:1304–1321` (`rpt*2`, no `newsym`).
`FOUND_FLASH_COUNT==0` `tmp_at` is compiled out of scored C.
HEAD `detect_obj_traps` at `js/detect.js:2256–2258` still only
`ft.num_traps++` when `ft` is set — C `:936–946` flashes then
`foundone`.
Named inside a callee `findone` always reaches; not a silent stub
of the SDOOR/SCORR/floor-trap dispatch.
At **this** SHA `do_clear_area` was still the detect.js couldsee-only
clone; D-1785 later added `override_vision` — do not re-enqueue.
No RNG in `findone` itself.

Verdict: **ACCEPT-WITH-DEBT**
