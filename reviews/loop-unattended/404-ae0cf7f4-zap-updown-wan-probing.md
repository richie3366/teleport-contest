# Review 404 — ae0cf7f4 — zap.c zap_updown WAN_PROBING (D-1444)

## Metadata
- Full / short hash: `ae0cf7f4a021d4df17bca9cb0304a89487b2aa1b` / `ae0cf7f4`
- Parent: `4a0aa5cc` (D-1443). This file audits **this SHA only** (fourth of nine `js/` commits since review **400**). Archive **Addressed:** D-1444 `ae0cf7f4` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 04:40:05 +0200
- D-id: **D-1444**
- Stats: 12 files, +410 / −50 — `js/zap.js` +216 / −22; `js/invent.js` +118 / −2; `js/dungeon.js` +9. Docs-only besides those.
- Claims to close: Open `zap.c` `zap_updown` WAN_PROBING (named from D-1443 / review **403** / **395**). Not steed. `reviews/loop-2026-08-15/` has no unpaid updown-probe Must-fix.
- JS / map: `zap.js` `zap_updown` / `zap_map`; `invent.js` `display_binventory`; `dungeon.js` `update_mapseen_for`. `c-js-map/turns.md` + `debt.md`. `bhito` WAN_PROBING still named at this SHA (next Open).
- Prior reviews this SHA claims to close: **403** named zap_updown; **395** queue `zap_updown` / `bhito`.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown WAN_PROBING so an up/down probing wand probes the ceiling or floor/buried pile instead of skipping zap_updown.”

C `weffects` `:3445–3446` `else if (u.dz) disclose = zap_updown(obj)` after a mounted-steed miss. `zap_updown` `:3236–3262`:

```
    case WAN_PROBING:
        ptmp = 0;
        if (u.dz < 0) {
            You("probe towards the %s.", ceiling(x, y));
        } else {
            rememberedltyp = update_mapseen_for(x, y);
            ptmp += bhitpile(obj, bhito, x, y, u.dz);
            ltyp = SURFACE_AT(x, y);
            zap_map(x, y, obj);
            surf = (ICE || IS_FURNITURE) ? "it" : the(surface(x, y));
            You("probe beneath %s.", surf);
            ptmp += display_binventory(x, y, TRUE);
        }
        if (!ptmp) Your("probe reveals nothing.");
        return TRUE;
```

Callees: `dungeon.c` `ceiling` `:1714–1747`, `surface` `:1750–1787`, `update_mapseen_for` `:2943–2947`; `zap_map` probing `:3720–3796`; `invent.c` `display_binventory` `:5488–5546`; `bhito` `:2222–2274` **not this SHA**.

Old JS: `weffects` `u.dz` empty (comment “zap_updown deferred”).

The diff **does** wire `disclose = await zap_updown(obj)`, add the WAN_PROBING arm (always `return true`), port probing-only `zap_map`, port `display_binventory`, and add `update_mapseen_for`. It **does** call `bhitpile(obj, bhito, …)` in C order. It **does not** add `bhito` WAN_PROBING (still default `res=1` generic / no observe). Named. It **does not** port other zap_updown otyps (OPENING / STRIKING / LOCK / stone-to-flesh / default pile). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `weffects` `u.dz` | C `:3445–3446`, **wired this SHA** | |
| `zap_updown` WAN_PROBING | C `:3236–3262`, **wired** | always TRUE |
| `ceiling_updown` | C `ceiling` `:1714–1747`, **clone matching keep-path** | `*in_rooms` via JS string |
| `surface_zap` | C `surface` `:1750–1787`, **clone minus swallow/On_stairs** | stairs are IS_FURNITURE → `"it"` here |
| `update_mapseen_for` | C `:2943–2947`, **C callee** | `recalc_mapseen` then lastseentyp |
| `bhitpile` | C, **imported live** | walks nexthere |
| `bhito` WAN_PROBING | C `:2222–2274`, **named omit / stub at this SHA** | floor objects do not observe |
| `zap_map` probing | C `:3720–3796`, **partial C callee** | show_map_spot / SDOOR / SCORR / trap tseen |
| `display_binventory` | C `:5488–5546`, **C callee** | pool overlay + buried |
| `query_objlist_pick_none_binv` | C `query_objlist` PICK_NONE, **clone** | INVORDER_SORT vs nexthere |
| `pair_of_inv` | C `pair_of`, **clone** | lenses / gloves / boots |
| other zap_updown otyps | C `:3263+`, **named omit** | default false |
| `force_decor` / Rogue draft / VS `the` | C `zap_map`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** hallu trap `!rn2(4)` in `zap_map`; `show_map_spot` confusion path not used (`false`). Public fortress does not zap probing up/down unmounted.

## C ↔ JS fidelity

Up: `You probe towards the ${ceiling}.` then `ptmp` stays 0 → always `Your probe reveals nothing.` then `return true` so weffects discloses. `ceiling_updown` matches `:1722–1744` order (vault / temple / shop / water / sky / fire / quest / Underwater / room-wall-door-SDOOR / rock cavern). JS `in_rooms` returns a room-char string; C `*in_rooms` is the same emptiness test. Match.

Down order matches `:3242–3258`: `update_mapseen_for` → `bhitpile` → `SURFACE_AT` → `zap_map` → ice/furniture `"it"` (+ ptmp++ if lastseentyp changed) else `the(surface)` → `probe beneath` → `display_binventory(..., true)`. Always disclose. Match **control flow**.

**Hallucination / stub callee:** `bhitpile` is live, but **`bhito` WAN_PROBING does not exist at this SHA.** C `:2222` `res=!dknown` + `observe_object` + container peek. JS `bhito` default still treats probing like a generic hit (no observe, no tin/egg, no cinventory). Floor objects on the hero cell are **not** probed. The D-log names this. The subject’s “floor/buried pile” is **true for buried** (`display_binventory` observe+menu) and **false for floor objects until D-1445**. That is a dispatch-to-stub on **`bhito`**, not on `zap_updown` itself. Do **not** stamp “Match C `bhito`.”

`zap_map` probing `:3720–3796`: `show_map_spot(x,y,FALSE)` is the live `detect.js` export (D-0814). lastseentyp or glyph change → `learn_it`. JS compares `disp_ch|disp_kind|disp_color` because there is no integer `glyph_at` — clone, keep-path terrain change still learns. SDOOR: `cvt_sdoor_to_door` + `recalc_block_point` + cansee pline (Rogue `draft_message` named). SCORR: typ=CORR + pline; C `unblock_point`, JS `recalc_block_point` (same as `show_map_spot`’s SCORR comment). Ice/furniture down: C `force_decor(TRUE)`; JS sets `learn_it` only — **named**, still discloses. Trap: `tseen=1`; `!already || hallu` then `You find an/the …`; hallu `!rn2(4)`; non-hallu Invocation VS `the` named (`use_the=false`). `maybe_explode_trap` skipped; for WAN_PROBING C’s function would no-op anyway. **Callee is not a no-op stub** for terrain/trap.

`display_binventory`: pool/lava `!Underwater` overlay (single `There is/are … under the water` vs multi `query_objlist` BY_NEXTHERE); buried walk `nobj` + `observe_object` if `as_if_seen`; INVORDER_SORT menu. `is_plural` keep-path is `quan!=1`; `pair_of` then forces “under them” for lenses/gloves/boots. Match `:5501–5545` minus PICK_ONE/`go.only` (pre-filter ox/oy). **Not a stub.**

`update_mapseen_for`: `recalc_mapseen()` then `lastseentyp[x][y]`. C callee. Match.

Hallucination check: “Match C zap_updown WAN_PROBING” while **ceiling / zap_map probing / display_binventory are live** is not a lie about **this** function. “Match C floor-object `observe_object` via `bhito`” **would** be a lie at this SHA. Say that: the **callee `bhito` is still a stub**.

## Hallucinations / overclaim

Subject says up/down probing probes the ceiling or floor/buried pile instead of skipping zap_updown. **True:** weffects `u.dz` now calls `zap_updown`; up ceiling+nothing+disclose; down beneath + `zap_map` + buried menu; ice/furniture `"it"`; always `return true`. **False until named** for floor pile `bhito` observe/peek, `force_decor` ice text, Rogue SDOOR draft, VS `the`, other updown otyps, lateral `zap_map`. Stamping **Addressed:** D-1444 for `:3236–3262` + weffects `u.dz` is fair. Do **not** stamp “Match C `bhito`.” Do **not** treat fortress PASS as an up/down probe.

## Density

One otyp plus the two callees C actually calls (`zap_map` probing subset, `display_binventory`) and `update_mapseen_for`. ~340 lines of JS across three files already linked by `weffects`. Playbook §2b high end of “tight caller/callee cluster,” not “finish zap.c.” Did not glue OPENING/STRIKING. Acceptable.

## Branch-by-branch confirm

1. Up, ordinary ceiling: towards-ceiling + reveals-nothing + disclose. Match `:3238–3262`.
2. Down, empty floor, no buried: beneath `the(floor/ground)` + reveals-nothing. Match if `ptmp==0`.
3. Down ice/furniture: surf `"it"`; lastseentyp change counts as a find. Match `:3250–3253`. `force_decor` text named.
4. Down buried: observe + INVORDER menu; `ptmp` skips nothing. Match `:3258` / `:5527–5545`.
5. Down pool overlay: single vs multi under-water. Match `:5501–5524`.
6. SDOOR / SCORR / unseen trap `tseen`. Match `:3738–3795` keep-path.
7. Hallu trap: `!rn2(4)` for `the`. Match hallu arm; VS `the` named.
8. Floor objects via `bhito`: **not observed**. Named. Next SHA.
9. WAN_LOCKING updown: default false. Named.
10. Mounted down still D-1443 (prefix true skips zap_updown). Unchanged.
11. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. Glyph string compare is a JS stand-in for `glyph_at`, not a recorded overlay. `query_objlist_pick_none_binv` reuses existing corner-menu paint.

## Verification

Journal: private canary **21**/21 (C/JS grep; Rule #2; up ceiling+nothing+learn+XP; down floor/ice/furniture; buried observe; steed still D-1443; locking default; SDOOR; trap tseen; pool overlay); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs. Fortress PASS is not an up/down probe. Canary did not need a live `bhito` probing arm.

## Actionable C-wrongs

None for Must-fix on **this** SHA’s `zap_updown` body. Floor-object observe is the named `bhito` omit (already the next Open; later SHA D-1445 in this window).

Named omits (map / Open, not Must-fix):

1. `bhito` WAN_PROBING (`:2222–2274`) — later SHA in this window
2. other `zap_updown` otyps (OPENING / STRIKING / LOCK / …)
3. `zap_map` `force_decor` / engraving / drawbridge / `maybe_explode_trap` / lateral `bhit`
4. Rogue SDOOR `draft_message`; Invocation VS `the`
5. `surface` swallow / `On_stairs` (unused on this keep-path)

Do not Must-fix “up should skip reveals-nothing” (C always prints it when `ptmp==0`). Do not Must-fix “stairs should say surface stairs” (IS_FURNITURE → `"it"`). Do not Must-fix “SCORR must call `unblock_point` by name.” Do not Must-fix “`zap_updown` is a stub.”

## Callers / RNG ledger

C callers: `weffects` IMMEDIATE `u.dz`. New RNG: hallu `rn2(4)` only. Public fortress does not take this path.

Verdict: **ACCEPT-WITH-DEBT**
