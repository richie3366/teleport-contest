# Review 710 — d17e4f35 — display.c feel_location is_worm_tail / Blind dopush (D-1749)

## Metadata
- Full / short hash: `d17e4f3573dde19f34704d30bd9cab5c60683866` / `d17e4f35`
- Parent: `03ff631e` (audit #2160 / reviews **701–709**). JS parent `1f6d5487` (D-1748). This file audits **this SHA only** (first of nine `js/` commits since review **709**). Archive **Addressed:** D-1749 `d17e4f35`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 01:21:53 +0200
- D-id: **D-1749**
- Stats: `js/display.js` +63/−34; `js/hack.js` +21/−9. Total `js/` insertions **84** <250. Band **150–350** (id >454 ⇒ 200-floor).
- Claims to close: Open `feel_location` `is_worm_tail` after D-1748 / reviews **706** / **708** / **709**. Not Blind levitate-arm `do_room_glyph`. Not integer `GLYPH_*_OFF`. `reviews/loop-2026-08-15/` has no unpaid feel_location Must-fix.
- JS / map: `display.js` `feel_location`; `hack.js` `dopush` / `cannot_push_msg` / `moverock_core`. `c-js-map/turns.md`.
- Prior: **709** named this overlay; **706** named the helper as a different function from `newsym` `is_worm_tail`.

## Intent vs deliverable

Git subject promises: sensed worm tails on adjacent felt cells use `is_worm_tail` (and Blind `dopush` feels dest+source) instead of skipping `suppress_map_output` and always `newsym`-ing the vacated boulder cell after D-1748.

`node scripts/csym.mjs feel_location` → `display.c:745–909`. `--callers feel_location`: 24 sites; the ones this SHA touches are `hack.c:211–212` (`dopush`), `:258` (`cannot_push_msg`), `:460` (monster-behind). Overlay `:901–908`. Macro `is_worm_tail` `display.c:500` (uses enclosing `x,y`). `_suppress_map_output` `:703–708`. `engr_can_be_felt` `engrave.c:296–315` (callers `:860`; `engrave.c:1734`). `is_ice` `dbridge.c:85–97`. `is_pool_or_lava` `dbridge.c:76–83`. `u_at` `you.h:562`. `Punished` `youprop.h:77` ≡ `uball != 0`. `Blind` `youprop.h:103`. `cannot_push_msg` `hack.c:246–259`. `movobj` `hack.c:824–833`. `--callers dopush`: proto `:12`; `:573`; `:631` (staticfn — csym has no body; cite `:205–215` from the `:211` caller). Remaining Blind feels this SHA **names** and does **not** ship: Levitation `:420–421`; verysmall `:427–428`; Sokoban diagonal `:443–444`; `test_move` / `lock.c`. nopick `:390` is unconditional `feel_location` (already D-1262).

```901:908:nethack-c/upstream/src/display.c
    /* draw monster on top if we can sense it */
    if (!u_at(x, y) && (mon = m_at(x, y)) != 0 && sensemon(mon))
        display_monster(x, y, mon,
                        (tp_sensemon(mon) || MATCH_WARN_OF_MON(mon))
                            ? PHYSICALLY_SEEN
                            : DETECTED,
                        is_worm_tail(mon));
```

```205:215:nethack-c/upstream/src/hack.c
    otmp->next_boulder = 0;
    movobj(otmp, rx, ry); /* does newsym(rx,ry) */
    if (Blind) {
        feel_location(rx, ry);
        feel_location(sx, sy);
    } else {
        newsym(sx, sy);
    }
```

```85:97:nethack-c/upstream/src/dbridge.c
boolean
is_ice(coordxy x, coordxy y)
{
    schar ltyp;
    if (!isok(x, y))
        return FALSE;
    ltyp = levl[x][y].typ;
    if (ltyp == ICE || (ltyp == DRAWBRIDGE_UP
                        && (levl[x][y].drawbridgemask & DB_UNDER) == DB_ICE))
        return TRUE;
    return FALSE;
}
```

```296:315:nethack-c/upstream/src/engrave.c
boolean
engr_can_be_felt(struct engr *ep)
{
    boolean canfeel = FALSE;
    switch (ep->engr_type) {
        case ENGRAVE:
        case HEADSTONE:
        case BURN:
            canfeel = TRUE;
            break;
        case DUST:
        case MARK:
        case ENGR_BLOOD:
        default:
            canfeel = FALSE;
            break;
    }
    return canfeel;
}
```

Blind `feel_location` sites in `moverock` / `dopush` (this SHA vs named):

| C site | Guard | This SHA |
|---|---|---|
| `dopush` `:210–215` | `Blind` dest then source | LIVE |
| `cannot_push_msg` `:257–258` | `Blind` after vain pline | LIVE |
| nopick `:390` | **unconditional** (not Blind) | already D-1262 |
| Levitation `:420–421` | `Blind` | OMIT named |
| verysmall `:427–428` | `Blind` | OMIT named |
| Sokoban diagonal `:443–444` | `Blind` | OMIT named |
| monster-behind `:459–460` | `Blind` before `canspotmon` | LIVE |
| `test_move` `:1013`/`:1077`/`:1145` | (other) | OMIT named |
| `lock.c` `:583`/`:1001` | (other) | OMIT named |

Parent: overlay **already** passed `is_worm_tail(mon, x, y)` into `display_monster` (D-log admits this). Missing: `_suppress_map_output`; `engr_can_be_felt` extracted; Underwater used typ macros not `is_pool_or_lava`/`is_ice`; ROOM darken matched `~`/`.` by character (ice/worm false positive); `dopush` always `newsym(sx,sy)`. The diff **does** add the mklev/save/restore gate, extract `engr_can_be_felt`, Underwater `is_pool_or_lava_disp`/`is_ice_disp`, cmap identity for S_room/S_litcorr, `u_at` overlay, Blind `dopush` dest+source / `cannot_push_msg` / monster-behind. It **does not** fill levitate-arm `do_room_glyph` / litcorr / remembered-boulder. Named. It **does not** Blind-feel Levitation/verysmall/Sokoban/`test_move`/`lock.c`. Named. It **does not** import live `zap.js` `is_ice` (DRAWBRIDGE_UP `DB_ICE`); it adds `is_ice_disp` typ==ICE only.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `feel_location` `:745–909` | LIVE repaired | overlay was already LIVE; gate/engr/Underwater/cmap/u_at new |
| `display_monster` `:901–908` | LIVE callee | D-1748 three-way; this SHA passes `is_worm_tail` |
| `is_worm_tail` `:500` | LIVE same-file | display pos ≠ `mx,my`; one local |
| `suppress_map_output` | LIVE | `:703–708` without `done_hup` (named hangup) |
| `engr_can_be_felt` | CLONE (cycle) | `engrave.c:296–315`; engrave.js does **not** export |
| `is_ice_disp` | CLONE diverges | typ==ICE only; live `zap.js` `is_ice` has DRAWBRIDGE_UP `DB_ICE` |
| `is_pool_or_lava_disp` | CLONE pre-existing | DRAWBRIDGE_UP named on that helper |
| `remembered_matches_cmap` | LIVE helper | tty `{ch,color,dec}` vs `cmap_to_glyph` |
| `feel_can_reach_floor` | CLONE partial | usteed `P_RIDING` named |
| `u_at` | LIVE import | `const.js`; display already imported |
| `dopush` `:210–215` | LIVE repaired | Blind feel dest+source else `newsym` source |
| `cannot_push_msg` `:257–258` | LIVE repaired | Blind feel after vain-push pline |
| `moverock_core` `:459–460` | LIVE repaired | Blind feel before `canspotmon` |
| `movobj` | LIVE same-file | C `newsym` source **and** dest; JS same (no `maybe_unhide_at`) |
| `Blind_im` | CLONE same-file | `youprop.h:103` + PermaBlind |
| levitate-arm `do_room_glyph` | OMIT named | collapsed to `map_background` |
| Levitation/verysmall/Sokoban Blind feel | OMIT named | |
| `test_move` / `lock.c` Blind feel | OMIT named | |
| integer `GLYPH_*_OFF` / `map_monst` | OMIT named | not this function |

`node scripts/sym.mjs`:

```
feel_location    js/display.js:3585   sync
is_worm_tail     NOT EXPORTED — 1 LOCAL  js/display.js:316  => Do NOT write clone #2
engr_can_be_felt NOT EXPORTED — 1 LOCAL  js/display.js:3543  => Do NOT write clone #2
is_ice_disp      NOT EXPORTED — 1 LOCAL  js/display.js:638
remembered_matches_cmap NOT EXPORTED — 1 LOCAL  js/display.js:646
suppress_map_output js/display.js:3569   sync
u_at             js/const.js:3132   sync  (+ teleport.js / zap.js clones — do NOT add #3)
Blind_im         NOT EXPORTED — 1 LOCAL  js/hack.js:2230
movobj           NOT EXPORTED — 1 LOCAL  js/hack.js:317
dopush           NOT EXPORTED — 1 LOCAL  js/hack.js:334
cannot_push_msg  NOT EXPORTED — 1 LOCAL  js/hack.js:147
is_ice           js/zap.js:861   sync  (+ 5 LOCAL clones: dig/dokick/engrave/sit/timeout)
                 => Do NOT write clone #6. This SHA wrote is_ice_disp anyway.
is_pool_or_lava  NOT EXPORTED — 3 LOCAL  js/dig.js, eat.js, trap.js  => Do NOT write #4
display_monster  NOT EXPORTED — 1 LOCAL  js/display.js:1206
map_location     js/display.js:3700   sync
feel_can_reach_floor NOT EXPORTED — 1 LOCAL  js/display.js:3554
```

No clone→import re-point in this SHA (it **added** `is_ice_disp` / `engr_can_be_felt` / `remembered_matches_cmap`). `node scripts/imports.mjs --can display.js zap.js is_ice`: **SAFE** — `is_ice` is a hoisted function; cycle is the existing 87-module SCC, not a TDZ. `--can display.js engrave.js engr_can_be_felt`: engrave.js does **not** export (clone justified). `--can hack.js display.js feel_location`: ALREADY imported. FORCE/DIAG/`getRngLog`/`fastforward`/seed names/hardcoded coords: **none** in the `js/` diff. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Suppress (`:754–758`).** C `_suppress_map_output()` then `!isok`. JS `suppress_map_output()` then `!isok` then missing-cell return (JS map). Hangup `done_hup` named on the helper. **Match the gate this SHA added.**

**I-memory (`:764–765`).** C `glyph_is_invisible(lev->glyph) && m_at`. JS `glyph_is_invisible(loc) && mon_at_display`. Unchanged. **Match.**

**Underwater (`:769–772`).** C `Underwater && !Is_waterlevel && !is_pool_or_lava && !is_ice`. JS the same shape with `is_pool_or_lava_disp` / `is_ice_disp`. C `is_ice` (`dbridge.c:85–97`) is `typ==ICE` **or** `DRAWBRIDGE_UP && DB_ICE`. JS `is_ice_disp` is typ==ICE only (comment claims `hack.h`; C is `dbridge.c`). Live `zap.js:861` `is_ice` already has the drawbridge arm. `--can` said import it. Underwater on `DRAWBRIDGE_UP` ice: C feels; JS returns. Clone diverges. **Not Match C `is_ice`.** `is_pool_or_lava_disp` already omitted DRAWBRIDGE water/lava (pre-existing named on that helper).

**set_seenv (`:773–775`).** C always, even when levitating. JS `set_seenv(loc, ux, uy, x, y)` before the reach test. Unchanged. **Match.**

**Reachable vs levitate (`:777`).** C `!can_reach_floor(FALSE)`. JS `feel_can_reach_floor`: swallow → false; Levitation off air/water → false; Flying → true; else true. Named omit: usteed `P_RIDING < P_BASIC`; ustuck hugs; ceiling hider (those live in `engrave.js` `can_reach_floor`, not inlined here — display↔engrave cycle). Levitate arm C `:793–857` order: `IS_OBSTRUCTED` or closed/locked door → `map_background`; else boulder `sobj_at` → `map_object`; else open door → `map_background`; else `IS_ROOM||IS_POOL` `do_room_glyph` (remembered boulder glyph / I / cmap `S_stone`…`S_darkroom` range, then darkroom vs waslit room vs stone); else hallway `map_background` + litcorr→corr / room→darkroom. JS: obstructed/closed-door `map_background`; else top object if BOULDER `map_object`; else `map_background`. Open doors, pools, remembered-boulder wipe, and hallway litcorr are **not** the C sequence. **Named omit. Not a silent stub in the reachable overlay arm.**

**`is_ice` vs `is_ice_disp` (call-for-call).** C `:770` calls `is_ice(x,y)` (`dbridge.c:85–97`): `!isok` → false; `typ==ICE` → true; `typ==DRAWBRIDGE_UP && (drawbridgemask & DB_UNDER)==DB_ICE` → true. JS `is_ice_disp` is one `typ===ICE` compare (no `isok`, no drawbridge). Live `zap.js` `is_ice` already matches C including `DRAWBRIDGE_UP`. Comment on the new helper says `hack.h` — that file is not the C home. `--can display.js zap.js is_ice` **SAFE** (hoisted). Writing clone #6 is the miss; dropping `DB_ICE` is the C-wrong.

**Reachable engr (`:860–861`).** C `engr_at && engr_can_be_felt` → `erevealed=1`. JS extracted clone: ENGRAVE/HEADSTONE/BURN only; DUST/MARK/ENGR_BLOOD/default false. **Match the switch.** Parent inlined the same three types; this SHA did not change the predicate, only the helper.

**`_map_location` + Punished (`:863–890`).** JS `map_location(x,y,true)` then `if (u.uball)` walk uchain/uball first-on-pile. C `if (Punished)` ≡ `uball != 0`. **Match that gate.** Unchanged this SHA.

**ROOM/CORR darken (`:894–900`).** C: ROOM + glyph==`cmap_to_glyph(S_room)` + `(!waslit || (dark_room && use_color))` → `dark_room ? S_darkroom : S_stone`. CORR + S_litcorr + !waslit → S_corr. JS: cmap identity via `remembered_matches_cmap` (fixes parent `~`/`.` false positive on ice/worm memory — that **is** the overlay-adjacent bug). Then ROOM keeps `mem.ch` + `NO_COLOR` (tty S_darkroom ≈ S_room letter). CORR paints `cmap_idx_to_glyph(S_CORR)`. When `dark_room` is false and !waslit, C paints **S_stone**; JS still keeps room letter + `NO_COLOR`. Contest default `dark_room` On makes the S_darkroom tty path match. The S_stone ternary is not ported and **not** in the D-1749 map named list. Tty-identity debt, not a stub callee.

**Overlay (`:901–908`).** C `!u_at && m_at && sensemon` then `display_monster(..., PHYSICALLY_SEEN iff tp_sensemon||MATCH_WARN else DETECTED, is_worm_tail(mon))`. Macro: `(mon) && (x!=mx || y!=my)`. JS `!u_at` then `mon_at_display` then `sensemon` then the same sightflags then `is_worm_tail(mon, x, y)`. Parent already passed the tail flag; this SHA only swapped the `ux,uy` compare for imported `u_at`. Detect_monsters still paints tails here (`newsym` `:1050` skips them — different function, D-1745). **Match call-for-call.** No RNG in this overlay.

**`dopush` (`:210–215`).** C `movobj` (which `newsym`s **source then dest** — comment only names dest) then Blind `feel_location(rx,ry)` then `(sx,sy)` else `newsym(sx,sy)`. JS `movobj` same two `newsym`s (no C `maybe_unhide_at` — pre-existing) then `Blind_im()` the two feels else `newsym(sx,sy)`. **Match branch order.** Sighted path still double-`newsym`s source, like C.

**`cannot_push_msg` (`:246–259`).** C: `the(xname)` then usteed `YMonnam` vain-push else `You("try to move %s, but in vain.")` then `if (Blind) feel_location(sx,sy)`. JS: ``the ${xname}``; usteed `"Your steed tries…"` (not `YMonnam` — named in moverock); else matching vain-push; then `Blind_im()` feel. **Match the feel.** Steed nam is pre-existing wording debt, not this SHA’s overlay.

**`movobj` (`:824–833`) under `dopush`.** C: `remove_object`; `maybe_unhide_at(old)`; `newsym(old)`; `place_object(new)`; `newsym(new)`. JS: `obj_extract_self`; `newsym(old)`; boulder `recalc_block_point`; `place_object`; `newsym(new)`; boulder block again. No `maybe_unhide_at`. Pre-existing; this SHA’s Blind feels then overwrite dest+source memory, so the missing unhide is not the overlay bug. Sighted `dopush` still `newsym(sx,sy)` after `movobj` already newsym’d source — **Match C’s double source newsym.**

**Monster-behind (`:459–460`).** C Blind feel **before** `canspotmon` / `You_hear`. JS the same. **Match.** Levitation `:420–421` and verysmall `:427–428` still skip the feel. Named.

**Callee closure (overlay + Blind dopush envelope).** LIVE: `display_monster`, `is_worm_tail`, `sensemon`, `tp_sensemon`, `MATCH_WARN_OF_MON`, `u_at`, `suppress_map_output`, `map_location`, `feel_location` (hack already imported). CLONE verified: `engr_can_be_felt` (engrave.js has no export). CLONE diverges: `is_ice_disp`. OMIT named: levitate-arm; usteed reach; Levitation/verysmall/Sokoban/`test_move`/`lock` Blind feel. STUB in this overlay arm: **none**. Not “dispatch ported, callee stubbed.” `display_monster` is D-1748 LIVE. DRAWBRIDGE `is_ice` is a **callee clone**, not a named map omit of this row.

**`isok` / missing cell.** C `!isok` then `&levl[x][y]` (always a `rm`). JS `!isok` then `game.level?.at` null-return. Extra JS map guard; does not skip C work on an in-bounds cell. **Match for in-bounds.**

**`glyph_is_invisible`.** C tests `lev->glyph`. JS tests the loc’s remembered I flag (tty port). Same early-return when a monster is still there. Unchanged this SHA. **Match the I-keep.**

**`show_glyph` vs `show_glyph_cell`.** C darken writes `lev->glyph` then `show_glyph`. JS writes `remembered_glyph` then `show_glyph_cell` with the same ch/color/dec. Tty identity, not a skipped C call. **Match the paint.**

**`map_location` vs `_map_location`.** C `_map_location(x,y,1)` in the reachable arm. JS `map_location(x,y,true)` (D-1528 region overlay named on that helper, not this SHA). **Match the show=1 call.**

The overlay then paints the monster on top of that memory; C does the same after the darken.

## Hallucinations / overclaim

Subject “sensed worm tails use `is_worm_tail`”: the overlay **already** did that in the parent; this SHA does **not** newly wire the flag. Subject “Blind `dopush` feels dest+source instead of always `newsym` vacated”: **true**. Subject “instead of skipping `suppress_map_output`”: **true** (the gate is new). D-log “JS already passed `is_worm_tail`”: honest; the subject overclaims novelty of the overlay. Do **not** stamp “Match C `dbridge.c` `is_ice` DRAWBRIDGE_UP `DB_ICE`.” Do **not** stamp “Match C levitate-arm `do_room_glyph`.” Do **not** stamp “Match C Levitation/verysmall Blind feel.” Do **not** stamp “Match C integer `GLYPH_*_OFF`.” Journal “fortress held” is not a public worm-tail Blind-push screen. Public overlay **thin**; canary was node 21/21. Admit public-unhit.

## Density

§2b: `feel_location` overlay family + the Blind `hack.c` callers that make adjacent felt cells happen. +84. Related suppress/engr/Underwater/cmap in the same function (one locus family; two modules that already import each other). Did **not** glue `map_monst` / levitate-arm / Sting(-1). Did **not** reopen D-1748 glyph ids. Below the “too big” line. Not a one-bullet peel. Consecutive Open rows were not glued: pet/detected glyphs stayed D-1748.

## Verification

D-log: save-oracle skip (untagged `display.c:feel_location`); node 21/21 (mklev/save/restore skip; Underwater ice vs stone; ENGRAVE vs DUST; Detect tail `~`+inverse; Detect head not `~`; tame tail pet inverse; `u_at` no overlay; I+mon keep I); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (seed0004 pony + seed0383 hallu). Rule #2 clean. Detect-tail inverse / Blind dopush worm overlay **public-unhit**. Admit that. Node canary does **not** include DRAWBRIDGE_UP ice. Focused session does **not** substitute for a Blind boulder-push against a long worm; that path is the overlay’s reason to exist and remains unhit in `sessions/`.

## Actionable C-wrongs

1. **`feel_location` Underwater `is_ice_disp` drops DRAWBRIDGE_UP `DB_ICE`.** C `dbridge.c:85–97` is ICE **or** drawbridge-under ice. JS added local `is_ice_disp` (typ==ICE) despite `zap.js` exporting full `is_ice` and `imports.mjs --can display.js zap.js is_ice` returning **SAFE**. Delete `is_ice_disp`; import `is_ice`. Do **not** write clone #6 of `is_ice` (five locals already). Do **not** treat the JS comment as a map omit — D-1749 named list is levitate-arm / usteed / remaining Blind feels only. Queueable in one port: one import + delete the helper + keep Underwater `!is_pool_or_lava && !is_ice`.

Named (map, not Must-fix): levitate-arm `do_room_glyph`/litcorr/remembered-boulder; usteed `can_reach_floor`; Levitation/verysmall/Sokoban/`test_move`/`lock.c` Blind feel; hangup `done_hup`; integer `GLYPH_*_OFF`; `map_monst`. Reachable ROOM darken `dark_room? S_darkroom : S_stone` still tty-keeps letter (default On). Do **not** add `is_worm_tail` #2. Do **not** `what_mon` on this overlay (that is `display_monster`). Do **not** Blind-feel nopick twice (C `:390` is already unconditional). Do **not** re-port D-1748. Do **not** treat `is_ice_disp` as cycle-forced: `--can display.js zap.js is_ice` is SAFE.

Verdict: **ACCEPT-WITH-DEBT**
