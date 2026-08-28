# Review 552 — 92bbf63b — invent.c display_used_invlets (D-1591)

## Metadata
- Full / short hash: `92bbf63b8ba4b13cda8eb4ab749e4eda5e4092df` / `92bbf63b`
- Parent: `094af60d` (D-1590). This file audits **this SHA only** (seventh of nine `js/` commits since review **545**). Archive **Addressed:** D-1591 `92bbf63b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 20:33:41 +0200
- D-id: **D-1591**
- Stats: `js/invent.js` +140/−4. Band **150–350** (js/ insertions **140**).
- Claims to close: Open `display_used_invlets` after D-0127/D-1590. Not nobj-split. Not gold adjust. `reviews/loop-2026-08-15/` has no unpaid used-invlets Must-fix.
- JS / map: `invent.js` `build_used_invlets_items` / `display_used_invlets` / `doorganize_core`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **541** named `display_used_invlets`.

## Intent vs deliverable

Git subject promises: `#adjust` destination `?`/`*` shows a used-letters PICK_ONE menu instead of Never_mind.

Pinned C `invent.c` `display_used_invlets` `:3466–3519`. Caller `doorganize_core` `:5144–5150`. Window `wintty.c` `tty_end_menu` `:2648–2772` (reverse, blank + prompt, `lmax = min(52, rows-1)`). `tty_add_menu` selectable `"%c - "` + `str` (`:2602–2604`). `xprname` is that same `"%c - %s"` over `doname`. `--callers display_used_invlets`: proto `:31`; `doorganize_core` `:5146` only.

```3466:3518:nethack-c/upstream/src/invent.c
staticfn char
display_used_invlets(char avoidlet)
{
    ...
    if (gi.invent) {
        ...
        n = select_menu(win, PICK_ONE, &selected);
        if (n > 0) {
            ret = selected[0].item.a_char;
            free((genericptr_t) selected);
        } else
            ret = !n ? '\0' : '\033'; /* cancelled */
        destroy_nhwindow(win);
    }
    return ret;
}
```

```5144:5150:nethack-c/upstream/src/invent.c
        if (let == '?' || let == '*') {
            let = display_used_invlets(splitting ? obj->invlet : 0);
            if (!let)
                continue;
            if (let == '\033')
                goto noadjust;
        }
```

Old JS: `?`/`*` printed Never_mind and returned `ECMD_OK`.

The diff **does** live the NHW_MENU walk, sortpack headings, `obj_glyph` then `xprname`≡`doname` with letter prefix, PICK_ONE letter / ESC / empty-retry, and the `doorganize_core` `?`/`*` await. It **does not** pass `splitting ? obj.invlet : 0` (nobj-split named; live path always 0). It **does not** port MENU_SEARCH, count-prefix, MENU_PREV/FIRST/LAST, custom `flags.inv_order`, gold-adjust `$` dest, pack-full bump. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `display_used_invlets` | C `:3466–3519`, **LIVE this SHA** | 1 export; C is staticfn |
| `build_used_invlets_items` | C same loop, **LIVE** | export for canary |
| `doorganize_core` `?`/`*` | C `:5144–5150`, **LIVE this SHA** | was Never_mind stub |
| `obj_glyph` | C `obj_to_glyph` + `rn2_on_display_rng`, **LIVE** | Hallu burn |
| `doname` via `xprname` | C `:3501` + tty `:2602`, **LIVE** | `"%c - %s"` |
| `let_to_name` headings | C `:3492–3494`, **LIVE** | `FALSE, FALSE` showsym |
| `yn_function` dest | C `:5144`, **LIVE** | pre-existing |
| nobj `splitting` avoidlet | C `:5146`, **OMIT named** | always 0 |
| custom `flags.inv_order` | C `invlet` walk, **OMIT named** | `DEF_INV_ORDER` |
| VENOM off DEF_INV_ORDER | **OMIT named** | |
| `use_menu_glyphs` dash | **OMIT named** | |
| MENU_SEARCH / digits / PREV | **OMIT named** | |
| gold adjust / pack-full | **OMIT named** | |

`node scripts/csym.mjs display_used_invlets` → `:3466-3519`. `--callers`: `:31`, `:5146`. `doorganize_core` → `:5067-5286`. `doorganize` → `:4980-5004`. `tty_end_menu` → `:2648-2772`.

RNG: one `obj_glyph` per listed item (C `obj_to_glyph(..., rn2_on_display_rng)`). Menu keys no RNG. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
display_used_invlets js/invent.js:5207   ASYNC — await required
build_used_invlets_items js/invent.js:5161   sync
xprname          js/objnam.js:2444   sync
doname           js/objnam.js:2046   sync
obj_glyph        js/display.js:1226   sync
let_to_name      js/invent.js:561   sync
paint_corner_nhw_menu js/invent.js:825   ASYNC — await required
paint_overlay    NOT EXPORTED — 1 LOCAL js/invent.js:728
             => Do NOT write clone #2.
yn_function      js/getline.js:862   ASYNC — await required
doorganize_core  NOT EXPORTED — 1 LOCAL js/invent.js:5286
             => Do NOT write clone #2.
```

`--can invent.js objnam.js xprname`: ALREADY. Do **not** add `display_used_invlets` #2 in `cmd.js`. Do **not** add `paint_overlay` #2. Do **not** export a second `doorganize_core`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty invent. C `if (gi.invent)` else `ret=0`. JS `if (!inv.length) return ''`. **Match** (`''` is `!let` → retry yn). `#adjust` itself already refuses empty invent in `doorganize` `:4987–4992`.

sortpack true (default). C walks `flags.inv_order` (`invlet`), headers `let_to_name(*invlet, FALSE, FALSE)` once per class with items, skip `avoidlet`. JS walks `DEF_INV_ORDER` the same way. **Match default packorder.** Custom `packorder` named.

sortpack false. C includes every invent object whose class is skipped by the `|| otmp->oclass == *invlet` when `!sortpack`. JS walks `invent` once, no headers. **Match `:3489`.**

Skip avoidlet. C `ilet == avoidlet`. JS `avoidlet && avoidlet !== '\0' && ilet === avoidlet`. Live caller always passes `0`. **Match the non-split path.** Split would hide the source letter; named.

Glyph + name. C `obj_to_glyph` then `doname` as `add_menu` str with selector `ilet`. tty `:2602` `Sprintf("%c - ", ch)` + str. JS `obj_glyph` then `xprname(otmp)` → `` `${invlet} - ${doname}` ``. **Match `:3500–3502` + tty `:2602–2604`.** Glyph pixels named (`use_menu_glyphs`).

end_menu prompt. C `end_menu(win, "Inventory letters used:")`. tty prepends blank then prompt (`:2679–2690`), pages with `lmax = min(52, rows-1)` (`:2694–2695`), morestr `(end) ` or `(x of y)`. JS unshifts `''` then the prompt, `lmax = min(52, rows-1)`, same morestr, `paint_corner_nhw_menu` one page / `paint_overlay` multi. **Match paging geometry.**

PICK_ONE. n>0 → `a_char` letter. n==0 → `'\0'` retry yn. n<0 → ESC `noadjust` Never_mind. JS letter in `byLet` returns it; Space last page or Enter → `''`; ESC → `'\x1b'` + Never_mind. **Match `:3508–3516` + `:5146–5150`.** Invalid / other-page letter re-prompts (C `nhbell` named omit, same retry).

Callee closure (`?`/`*` dest). LIVE: `build_used_invlets_items`, `obj_glyph`, `xprname`/`doname`, `let_to_name`, `paint_corner_nhw_menu`/`paint_overlay`, `nhgetch`, `yn_function`. OMIT named: nobj avoidlet, custom inv_order, MENU_SEARCH, digits, PREV, `nhbell`. STUB: **none** on the live non-split arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

`doorganize_core` after the letter. Collect/move/swap still the parent `#adjust` dest. Gold `$` dest still named. Pack-full bump named. This SHA only replaces the Never_mind stub.

## Hallucinations / overclaim

Subject `#adjust` `?`/`*` used-letters PICK_ONE instead of Never_mind: **true** on the non-split dest prompt. D-log “nobj-split still passes avoidlet 0”: **true and named.** Do **not** stamp “Match C `display_used_invlets(splitting ? obj->invlet : 0)`.” Do **not** stamp “Match C custom packorder.” Do **not** stamp “Match C MENU_SEARCH / count-prefix / MENU_PREV.” Do **not** stamp “Match C gold-only dest `$`.” Do **not** stamp “Match C pack-full bump.” `xprname` here is **not** a clone of `doname`; it is tty’s `"%c - "` wrapper. Public suite has no `#adjust` `?`.

## Density

One `invent.c` static + the one caller site that stubbed it. +140 JS. Did not glue nobj-split / gold / pack-full. §2b OK.

## Branch-by-branch confirm

1. Empty invent: return 0/`''`. **Match.**
2. sortpack + mixed classes: headings then `"a - doname"`. **Match default order.**
3. `!sortpack`: invent order, no headings. **Match.**
4. Letter on a listed item: return that invlet; dest loop proceeds. **Match.**
5. Space/Enter with no pick: retry yn. **Match n==0.**
6. ESC: Never_mind, `ECMD_OK`. **Match n<0.**
7. Split `#adjust` hides source letter. **Named (always 0).**
8. MENU_SEARCH / packorder / gold / pack-full. **Named.**

## Callers / RNG ledger

C only `#adjust` dest `?`/`*` (`doorganize_core`). Extra `obj_glyph` Hallu on every listed stack is C. No seed gate. `doorganize` empty-invent You-aren’t-carrying is unchanged.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Keep `display_used_invlets` next to `doorganize_core` (C `invent.c`). Do not add `paint_overlay` #2. Do not add `doorganize_core` export #2. Do not invent a `select_menu` clone in `options.js` just for this PICK_ONE (existing corner/overlay is the tty stand-in already used by pickinv).

## Verification

D-log private canary **12**/12; green+strict seed8000/0900; cohort **7**/7 + strict (seed1500/1800/0012/0004/0007/2200/0383). **Public-unhit** (`#adjust` `?` is not a scored tourist key). Canary that never splits does not falsify avoidlet 0. Multi-page (`nitems > lmax`) unhit unless invent is huge.

## Actionable C-wrongs

None for Must-fix. Named: nobj `splitting` avoidlet (`:5146`); gold adjust `$`; pack-full bump; custom `flags.inv_order`; VENOM off `DEF_INV_ORDER`; `use_menu_glyphs`; MENU_SEARCH; count-prefix; MENU_PREV/FIRST/LAST; `nhbell` on bad key. Do not add `display_used_invlets` in `cmd.js`. Do not restore Never_mind on `?`.

Verdict: **ACCEPT-WITH-DEBT**
