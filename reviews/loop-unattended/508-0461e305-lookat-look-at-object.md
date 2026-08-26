# Review 508 — 0461e305 — pager.c lookat getpos look_at_object fakeobj (D-1547)

## Metadata
- Full / short hash: `0461e3056875578d657b31ad8642f9d8ebfb0f24` / `0461e305`
- Parent: `da06ac60` (D-1546). This file audits **this SHA only** (eighth of nine `js/` commits since review **500**). Archive **Addressed:** D-1547 `0461e305`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 10:32:02 +0200
- D-id: **D-1547**
- Stats: `js/display.js` +81 / −3, `js/getpos.js` +29 / −15, `js/pager.js` +13 / −4, `js/detect.js` +2. Band 150–350 (js/ insertions **104**).
- Claims to close: Open getpos fakeobj (named from D-1544 / review **505** / **485**). Not `namefloorobj`. `reviews/loop-2026-08-15/` has no unpaid lookat-object Must-fix.
- JS / map: `display.js` `glyph_to_obj_at` / `map_object`; `getpos.js` `auto_describe_text`; `pager.js` `brief_at` / `look_at_object`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **505** named getpos still `look_shown_at`; **485** named fakeobj callers.

## Intent vs deliverable

Git subject promises: getpos auto_describe uses `look_at_object` fakeobj (`object_from_map`), not live piles only.

Pinned C `pager.c` `lookat` `:716–717` (`glyph_is_object` → `look_at_object`); `look_at_object` `:380–399`; `object_from_map` `:284–377` (D-1524). Caller `getpos.c` `auto_describe` `:640–661` via `do_screen_description`. Producer `display.c` `map_object` `:333–366` (`obj_to_glyph` → `levl.glyph`); `display_monster` `M_AP_OBJECT` `:564–575` fake obj → `map_object`. `glyph_at` is **gbuf** (visible mon wins over memory).

```716:717:nethack-c/upstream/src/pager.c
    } else if (glyph_is_object(glyph)) {
        look_at_object(buf, x, y, glyph); /* fill in buf[] */
```

```388:396:nethack-c/upstream/src/pager.c
    if (otmp) {
        Strcpy(buf, (otmp->otyp != STRANGE_OBJECT)
                     ? distant_name(otmp, otmp->dknown ? doname_with_price
                                                       : doname_vague_quan)
                     : obj_descr[STRANGE_OBJECT].oc_name);
        if (fakeobj) {
            otmp->where = OBJ_FREE;
            dealloc_obj(otmp), otmp = NULL;
```

Old JS: getpos `look_shown_at` + `distant_name`/`doname` (live pile only); no stored otyp; unsensed `M_AP_OBJECT` described as monster first.

The diff **does** stamp `otyp` on `map_object` / detect boulder premap / mimic memory; add `glyph_to_obj_at` (gbuf analogue); wire getpos + `brief_at` to live `look_at_object`. It **does not** port `namefloorobj`, `mhidden_description`, `doname_with_price` / `doname_vague_quan`, buried/tree/stone suffixes, Hallu `random_obj_to_glyph` otyp, cmap trapped-chest, glyph_is_body/statue corpsenm, `dealloc_obj`, look_all remembered-gone. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `glyph_to_obj_at` | C `glyph_is_object`+`glyph_to_obj` of `glyph_at`, **LIVE this SHA** | otyp or −1 |
| `remembered_glyph_otyp` | helper | memory `otyp` |
| `map_object` otyp stamp | C `:354–362`, **LIVE this SHA** | skip Hallu sticky |
| `look_at_object` | C `:380`, **LIVE** | D-1524; callers this SHA |
| `object_from_map` | C `:284`, **LIVE** | D-1524 |
| `auto_describe_text` object arm | C lookat `:716`, **LIVE this SHA** | |
| `brief_at` object arm | C lookat, **LIVE this SHA** | |
| `look_shown_at` object path | **deleted** from getpos | |
| `namefloorobj` / `mhidden_description` | C, **OMIT named** | |
| `dealloc_obj` | C `:395`, **OMIT named** | `where=OBJ_FREE`; GC |
| Hallu `random_obj_to_glyph` | C `:358–359`, **OMIT named** | |

`node scripts/sym.mjs glyph_to_obj_at look_at_object object_from_map look_shown_at distant_name map_object auto_describe dealloc_obj`:

```
glyph_to_obj_at  js/display.js:716   sync
look_at_object   js/pager.js:685   sync
object_from_map  js/pager.js:606   sync
look_shown_at    js/display.js:672   sync
distant_name     js/objnam.js:792   sync
map_object       js/display.js:1137   sync
auto_describe    NOT FOUND (JS name auto_describe_text)
dealloc_obj      NOT EXPORTED — 1 LOCAL js/mklev.js:1181
             => Do NOT write clone #2
```

**Re-point:** getpos dropped `distant_name`/`doname` for this arm; imports `look_at_object` from `pager.js`. pager already imported getpos — ESM **live binding** (not a static cycle crash). Do **not** add `dealloc_obj` clone #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new core RNG** (`obj_to_glyph` Hallu display rng still named).

## C ↔ JS fidelity

Gbuf vs occupancy (object). `glyph_to_obj_at`: displayed mon that is **not** unsensed `M_AP_OBJECT` returns **−1** (C `glyph_is_monster`). Unsensed `M_AP_OBJECT` returns `mappearance` (C object glyph). `disp_kind==='object'` uses live pile otyp if `!covers_objects`, else memory. Out of sight: memory otyp only when `disp_ch === rg.ch` and kind is not monster/trap/invisible. **Match the object/mon split C lookat uses on a single glyph id.** Displayed monster cannot lose to remembered otyp (CURRENT Keep).

`M_AP_TYPMASK`. New sites mask `m_ap_type` (`const.js` `M_AP_TYPE` still returns the raw field — not this SHA’s new helper). **Match C `M_AP_TYPE` at the sites this SHA changed.**

`look_at_object`. Live `object_from_map` (sobj / buried / mimic / mksobj fake / fruit spe / observe next2u). doname stand-in for with_price/vague_quan. fakeobj sets `OBJ_FREE`, **no** `dealloc_obj`. Suffixes (buried/tree/wall/pool) not appended. **Named.** Fakeobj for remembered-gone and mimic-as-object **does** run. **Match `:382–396` except dealloc + doname variants + suffixes.**

`map_object` memory. Non-Hallu stamps `otyp`. Hallu uses sticky `game.u.Hallucination` (not `Hallucination()` timeout) and omits otyp. C `:358–362` still stores a glyph id (`random_obj_to_glyph` for Hallu statue). **Named Hallu otyp.** Detect boulder premap stamps `otyp`+`boulder`. Mimic `newsym` memory stamps `mappearance`. **Match non-Hallu producer.**

getpos / brief_at order. Compute `objTyp`; if `mtmp && objTyp < 0` → monster; if `objTyp >= 0` → `look_at_object`. C is `glyph_is_monster` then `glyph_is_object`. When the cell **is** an object glyph, occupancy no longer wins. When the cell is floor/cmap and `m_at` exists (hidden / out of FOV, no memory object), JS still `look_at_monster` from occupancy. That occupancy leak is **pre-existing**; this SHA’s comment “gbuf, not occupancy” is true of the **object** arm, overclaim for the **monster** arm. Name it; do not Must-fix (not the shipped object dispatch).

Callee closure (object arm). LIVE: `glyph_to_obj_at`, `look_at_object`, `object_from_map`, `map_object` stamp, `distant_name`/`doname`. OMIT named: namefloorobj, mhidden_description, dealloc_obj, Hallu random_obj, trapped-chest cmap, body/statue corpsenm, suffixes. STUB: none in the object arm. **The arm may ship.**

## Hallucinations / overclaim

Subject look_at_object fakeobj not live piles only: **true** for getpos + brief_at object glyphs. Stamping **Addressed:** D-1547 is fair for **505’s** named getpos omit. Do **not** stamp “Match C `namefloorobj`.” Do **not** stamp “Match C `dealloc_obj`.” Do **not** stamp “Match C Hallu `random_obj_to_glyph`.” The “gbuf, not occupancy” comment overclaims the monster arm (still `m_at`); the object arm is gbuf. This is **not** “dispatch ported, callee stubbed” — `look_at_object` is LIVE.

## Density

+104 JS: otyp producer + `glyph_to_obj_at` + two lookat callers. Did not glue `namefloorobj` / `mhidden_description` / `worm_known`. §2b OK.

## Branch-by-branch confirm

1. Live pile shown: `look_at_object` on that otyp (not fake if sobj matches). **Match.**
2. Remembered-gone (otyp stored, no pile): fakeobj via `object_from_map`. **Match.**
3. Unsensed `M_AP_OBJECT`: mappearance → fakeobj, not `look_at_monster`. **Match.**
4. Displayed (non-mimic) mon over memory otyp: −1, monster text. **Match.**
5. Hallu memory otyp: omitted. **Named.**
6. Adjacent observe / dknown: `object_from_map` already. **Match.**

## Callers / RNG ledger

C: getpos autodescribe, `/` whatis `brief_at`, `namefloorobj` (still omitted). Public-unhit until a session farlooks a remembered-gone object or unsensed mimic. No seed gate. No new core `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. getpos→pager is a live circular import, not filesystem.

## Verification

D-log canary **26**/26 (grep; live not fake; remembered-gone fake spe; mimic name not “mimicking something”; F_DKNOWN mask; Hallu omits otyp; visible mon over memory; no pile leak; no extra core RNG; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `namefloorobj`; `mhidden_description`; `dealloc_obj`; doname_with_price / vague_quan; buried-embedded suffixes; Hallu `random_obj_to_glyph` otyp; cmap trapped-chest; glyph_is_body/statue corpsenm; look_all remembered-gone; getpos monster arm still occupancy when glyph is not object.

Verdict: **ACCEPT-WITH-DEBT**
