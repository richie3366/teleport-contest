# Review 603 — a95b0aa6 — invent.c doperminv / tty WIN_INVEN assesstty (D-1642)

## Metadata
- Full / short hash: `a95b0aa613d1928ae93b112be37899c895eefe2b` / `a95b0aa6`
- Parent: `429ab7b7` (D-1641). This file audits **this SHA only** (fourth of nine `js/` commits since review **599**). Archive **Addressed:** D-1642 `a95b0aa6`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 10:12:03 +0200
- D-id: **D-1642**
- Stats: `js/invent.js` +575/−22, `js/getline.js` +11, `js/cmd.js` +7/−1. Band **200–450** (js/ insertions **593** >250; id >454).
- Claims to close: Open tty WIN_INVEN / `#perminv` after D-1641. Not `consume_obj_charge`. Not `tty_wait_synch` (later D-1646). `reviews/loop-2026-08-15/` has no unpaid doperminv Must-fix.
- JS / map: `invent.js` `doperminv` / `assesstty` / `ttyinv_*`; `cmd.js` `|`; `getline.js` `#perminv`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named after D-1600/D-1603 stub maxslot 32.

## Intent vs deliverable

Git subject promises: `#perminv`/`|` plines and tty WIN_INVEN `assesstty` (need 52x79) plus InvSparse slot grid, instead of stub maxslot 32 after D-1600/D-1603.

Pinned C `invent.c` `doperminv` `:2813–2857` (`node scripts/csym.mjs doperminv`). Table caller `cmd.c:1797–1798` `"perminv"` key `'|'` `IFBURIED|GENERALCMD|NOFUZZERCMD` (csym `--callers` is empty — function-pointer table). `wintty.c` `assesstty` `:3557–3599`; `tty_ctrl_nhwindow` `:2849–2911`; `ttyinv_create_window` `:2915–2999`; `ttyinv_render` `:3263–3371`; `tty_update_inventory` `:3605–3614` UNUSED → `sync_perminvent`. `wintty.h` `tty_perminv_minrow=28` / `mincol=79`. `StatusRows` `:229`.

```2813:2857:nethack-c/upstream/src/invent.c
    if ((windowprocs.wincap & WC_PERM_INVENT) == 0) {
        pline("Persistent inventory display is not supported by '%s'.",
              windowprocs.name);
    } else if (!iflags.perm_invent) {
        pline("Persistent inventory ('perm_invent' option) is not presently enabled.");
    } else if (!gi.invent) {
        pline("Persistent inventory display is empty.");
    } else {
        (*windowprocs.win_update_inventory)(1);
    }
    return ECMD_OK;
```

Old JS: `#perminv` unknown; `|` Unknown; `ctrl_nhwindow_perm` always maxslot 16/32 so 24x80 could fake enable. The diff **does** `doperminv` four arms, `|` + EXT_CMDS (no AUTOCOMPLETE), `assesstty` 28×79 extra (52×79 with map+status), too_small plines, WIN_INVEN cell grid, InvSparse letters, `setCell` when rows allow, request_settings maxslot from `maxrow`. It **does not** port `tty_wait_synch` after those plines, `cmap_D0walls_to_glyph` / `tty_print_glyph` box, `optfn_perminv_mode`, `set_option_mod_status`, toggle-off `docrt`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doperminv` | C `:2813–2857`, **LIVE this SHA** | else → JS `update_inventory` (TTY sync) |
| `assesstty` | C `:3557–3599`, **CLONE** | C `static`; SMALL_INUSE 1+8+1 as compiled |
| `ctrl_nhwindow_perm` | C `tty_ctrl_nhwindow` `:2849–2911`, **CLONE** | RESIZABLE → too_small |
| `ttyinv_create_window` | C `:2915–2999`, **CLONE** | wait_synch **OMIT named** |
| `ttyinv_render` | C `:3263–3371`, **CLONE** | InvSparse; glyph box named |
| `ttyinv_add_menu` / `populate_slot` / `selector_to_slot` / `slot_to_invlet` | C `:3048–3203/:3375+`, **CLONE** | |
| `tty_invent_box_glyph_init` | C `:3478–3552`, **CLONE** | ASCII `+|-` not cmap |
| `tty_refresh_inventory` | C `:3428–3476`, **CLONE** | `setCell` analogue of putchar |
| `tty_start_menu_perminv` / `ttyinv_end_menu` | C start_menu / `:3236–3260`, **CLONE** | |
| `StatusRows` / `ttyDisplay_size` / `tty_windowprocs` | C macros/fields, **CLONE** | |
| `perminv_money_quan` | C `money_cnt` `:4513–4522`, **CLONE inline** | do **not** add money_cnt #7 |
| `sync_perminvent` | C `:5564–5658`, **LIVE** (D-1600) | now real maxslot |
| `update_inventory` | C invent.c, **LIVE** | doperminv else |
| cmd `|` / `#perminv` | C cmd.c `:1797`, **LIVE this SHA** | |
| `tty_wait_synch` | C `:2963`, **OMIT named** | D-1646 later |
| `cmap_D0walls_to_glyph` | C box glyphs, **OMIT named** | |
| `optfn_perminv_mode` | C, **OMIT named** | |

`node scripts/csym.mjs doperminv` → `invent.c:2813-2857`. `assesstty` → `wintty.c:3557-3599` (`--callers` `:2877` / `:2953`). `tty_ctrl_nhwindow` → `:2849-2911`. `ttyinv_create_window` → `:2915-2999`. `ttyinv_render` → `:3263-3371`. `tty_update_inventory` → `:3605-3614`. `sync_perminvent` → `invent.c:5564-5658`. `selector_to_slot` → `:3119-3179`. `slot_to_invlet` → `:3181-3203`. `ttyinv_add_menu` → `:3048-3116`. `ttyinv_end_menu` → `:3236-3260`. `tty_invent_box_glyph_init` → `:3478-3552`. `tty_refresh_inventory` → `:3428-3476`. `StatusRows` → `:229`. `money_cnt` → `hack.c:4513-4522`. `--callers doperminv`: none (extcmdlist pointer `cmd.c:1798`).

RNG: none in doperminv/assesstty. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
doperminv        js/invent.js:5002   ASYNC — await required
assesstty        NOT EXPORTED — 1 LOCAL js/invent.js:332
ctrl_nhwindow_perm NOT EXPORTED — 1 LOCAL js/invent.js:364
ttyinv_create_window NOT EXPORTED — 1 LOCAL js/invent.js:464
ttyinv_render    NOT EXPORTED — 1 LOCAL js/invent.js:721
ttyinv_add_menu  NOT EXPORTED — 1 LOCAL js/invent.js:631
sync_perminvent  js/invent.js:3188   sync
update_inventory js/invent.js:3267   sync
money_cnt        NOT EXPORTED — 6 LOCAL CLONE(S) ... do NOT add #7
```

`--can cmd.js invent.js doperminv`: ALREADY. `--can getline.js invent.js doperminv`: IN-SCC, **SAFE** (hoisted `doperminv`; dynamic import). Do **not** stamp “cycle-forced clone.” Do **not** write `assesstty` #2 or `money_cnt` #7.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`doperminv`. Four arms: no `WC_PERM_INVENT` → not supported by `'tty'`; `!perm_invent` → option not enabled; empty invent → display is empty; else update. Strings **Match C** (JS empty uses `invent.length`). Else C `win_update_inventory(1)` → `tty_update_inventory` UNUSED → `sync_perminvent`. JS `update_inventory()` (invent.c wrapper: skip `!in_moveloop` / `suppress_map_output`, then TTY sync). During `#perminv`/`|` in the move loop that is the same sync. C’s `#if 0` leading `update_inventory` stays off. Extra invent.c guards outside moveloop are analogue, not a stub in the typed-command arm.

`tty_update_inventory` C `:3605–3614` is UNUSED arg then `sync_perminvent`. invent.c `update_inventory` still skips `!in_moveloop`. Typed `|` during play hits both. `ROWNO` is 21; 1+21+2+28=52. Contest 24×80 never creates the grid (maxslot 0). That is the stub-32 fix, not a leftover fake enable.

`emptyttycell` C `{refresh:0,text:0,glyph:0,ttychar:0,color:NO_COLOR+1}`. JS same. `win_inven` local WinDesc analogue. `ttyinvmode` defaults `InvOptOn` (C `InvNormal` — same 0-bit “on” mode unless InvInUse/InvSparse/InvShowGold). Do not treat default Off `iflags.perm_invent` as a window-port miss.

`assesstty`. `tty_perminv_minrow` 28 + InvShowGold; `offy=1+ROWNO+StatusRows()`; `rows=ttyDisplay.rows-offy`; `cols`; inuse minrow **1+8+1** because C `#define SMALL_INUSE_WINDOW` then `#ifdef` (true) `#undef` — compiled arm is 10, not 1+15+1. `maxrow=min(rows, perminv_minrow)`; ok iff `!(rows<minrow \|\| cols<79)`. Too-early `!ttyDisplay` → zeros, same return. **Match `:3557–3599`.** 24×80: rows=24−24=0 < 28 → fail. 52×79: rows=28, cols=79 → ok. **Match the comment in `ttyinv_create` `:2938–2942`.**

request_settings. C zero_tocore; too_early if !ok && 0×0; else needrows=`minrow+1+ROWNO+StatusRows()` (52 or 53), needcols 79, have rows/cols; !ok → **RESIZABLE too_small** else prohibited; ok → `maxslot=(maxrow-2)*(inuse?1:2)`. JS always too_small (RESIZABLE analogue; session viewer can grow). Old stub maxslot 32 is gone: 24×80 leaves maxslot 0 so `sync_perminvent` returns before `pickinv_build_perm`. **Match `:2867–2900`.** Do not stamp “Match C `#ifndef RESIZABLE` prohibited.”

Create. Fail: destroy, `perm_invent=false`, two plines with need vs have, return WIN_ERR. C then `tty_wait_synch` and maybe `set_option_mod_status`. JS `void pline` (no await) and **omits wait_synch**. Named (D-1646). Success: borders, `cells[maxrow][maxcol]=emptyttycell`, `active=1`, box init. **Match geometry.** Box chars are ASCII `+|-` not `cmap_D0walls_to_glyph` + `tty_print_glyph`. Named.

`tty_perminv_minrow`/`mincol` are 28/79 (`wintty.h:13`). `tty_slots` 54. `MAX_STATUS_ROWS` 3. `StatusRows`: `wc2_statuslines<=2` → 2 else 3. **Match `:229`.** `offx` is always 0 (C D-0078 / D-1185 — do not hardcode 72).

`selector_to_slot` / `slot_to_invlet` / `ttyinv_add_menu` skip a/an/the then `"%c - %s"` with color from byte 4. Inuse overflow `> 2*rows_per_side` ignore. **Match C bodies** (`csym` `:3119–3179` / `:3181–3203` / `:3048–3116`). `ttyinv_end_menu` re-syncs when inuse shrinks from two panels to one. **Match `:3236–3260` plus the C comment that twosides already ran in add_menu.**

Render InvSparse. `sparse && filled_count` → `slot_to_invlet`; slot0 empty → `[no items are in use]` / `[only gold]` / `[empty]` via inline `money_cnt` (not clone #7); else `""`. rows_per_side 26/27/maxrow-2; !show_gold `slot_limit-=2`. **Match `:3274–3309`.** Refresh uses `setCell` for the 80×24 overlay when the window exists — analogue of putchar, not a no-op. Glyph-reset timestamp / `tty_print_glyph` for borders **OMIT named**.

Wiring. cmd.c `'|'` → `doperminv`; EXT_CMDS `perminv` `autocomplete:false`. **Match flags (no AUTOCOMPLETE, no M-prefix).** rhack `ch==='|'` plus tlist `'perminv'`.

Callee closure (`|` / `#perminv` / too_small / paint). LIVE: `doperminv` plines, `sync_perminvent` / `update_inventory`, `prepare_perminvent`, `pickinv_build_perm` (D-1600), `setCell`. CLONE: `assesstty`, `ctrl_nhwindow_perm`, `ttyinv_*` grid, ASCII box, `perminv_money_quan`. OMIT named: wait_synch, cmap glyphs, `optfn_perminv_mode`, `set_option_mod_status`, toggle `docrt`. STUB: **none in the live too_small / create / InvSparse arms** — maxslot 32 is deleted. Combined-arm ships. Dispatch is not “ported, callee stubbed.”

`selector_to_slot` C `:3119–3179`. Skip leading `"a "` / `"an "` / `"the "` then parse `"%c - %s"` (letter, space, dash, space). Inuse overflow `> 2*rows_per_side` ignores the add. JS the same skip + `"%c - %s"` split. **Match the C body** (csym range). `slot_to_invlet` `:3181–3203` maps slot index to `invlet` for InvSparse paint; gold slot is `GOLD_SYM` when InvShowGold. Do not invent a third invlet mapper.

`ttyinv_add_menu` C `:3048–3116`. Color from the menu-string byte after the selector (C `iflags.menu_headings` analogue is named if missing). `ttyinv_end_menu` `:3236–3260` re-syncs when inuse shrinks from two panels to one — C comment that twosides already ran in add_menu. JS `ttyinv_end_menu` follows that comment, not a second twosides pass.

`ttyinv_render` C `:3263–3371`. InvSparse + `filled_count`: slot0 empty → `[no items are in use]` / `[only gold]` / `[empty]` via inline `money_cnt` (JS `perminv_money_quan`, **not** `money_cnt` clone #7). Else `slot_to_invlet` letters. `rows_per_side` 26/27/`maxrow-2`; `!show_gold` `slot_limit-=2`. Refresh `tty_refresh_inventory` `:3428–3476` is putchar of `cells[][]`. JS `setCell` when `maxslot>0`. Contest 24×80 never creates the window (`maxslot` 0) — that is the stub-32 **fix**, not a leftover fake enable. Glyph-reset timestamp / `tty_print_glyph` for D0 walls **OMIT named**. ASCII `+|-` box vs `cmap_D0walls_to_glyph` **OMIT named**.

`offx` is always 0 (C D-0078 / D-1185 — do not hardcode 72). `tty_perminv_minrow`/`mincol` 28/79 (`wintty.h`). `ROWNO` 21; `1+ROWNO+StatusRows()+28` = 52 when status is 2. InvShowGold can add a row (53). `StatusRows` C `:229`: `wc2_statuslines<=2` → 2 else 3. **Match.**

cmd.c `'|'` `IFBURIED|GENERALCMD|NOFUZZERCMD`, EXT_CMDS `"perminv"` `autocomplete:false`. JS rhack `ch==='|'` plus tlist `'perminv'` without AUTOCOMPLETE / without M-prefix. **Match flags.** getline `#perminv` runs `doperminv` (EXT_CMDS). Do not stamp “Match C AUTOCOMPLETE on `|`.”

`emptyttycell` `{refresh:0,text:0,glyph:0,ttychar:0,color:NO_COLOR+1}`. `win_inven` local WinDesc analogue. `ttyinvmode` defaults `InvOptOn` (C `InvNormal` — same 0-bit “on” unless InvInUse/InvSparse/InvShowGold). Default `iflags.perm_invent` Off is the option, not a window-port miss.

C `doperminv` else `(*windowprocs.win_update_inventory)(1)` → UNUSED `tty_update_inventory` → `sync_perminvent`. JS `update_inventory()` still skips `!in_moveloop` / `suppress_map_output`. Typed `|` during play is in the move loop so both fire. Extra invent.c guards outside moveloop are analogue, not a stub in the typed-command arm. C’s `#if 0` leading `update_inventory` stays off.

This SHA’s too_small path `void pline` without `tty_wait_synch` is the named omit review **603** must not treat as shipped; D-1646 later adds the call. Do not stamp “Match C wait_synch” for **this** hash.

## Hallucinations / overclaim

Subject `#perminv`/`|` plines, 52×79 `assesstty`, InvSparse, vs stub 32: **true.** D-log canary 28/28 + green + cohort: **claimed; this review does not re-run that canary.** Do **not** stamp “Match C `tty_wait_synch` after too_small.” Do **not** stamp “Match C `cmap_D0walls_to_glyph` / `tty_print_glyph`.” Do **not** stamp “Match C `optfn_perminv_mode`.” Do **not** stamp “Match C `#ifndef RESIZABLE` prohibited.” Do **not** stamp “Match C doperminv calls `win_update_inventory(1)` with no invent.c `in_moveloop` guard” — JS uses `update_inventory()`. Public `|` with perm_invent Off is the option-off pline; 24×80 too_small is **public-unhit** unless a session enables perm_invent (default Off).

## Density

+593: C doperminv 45 + assesstty 43 + ctrl 63 + create 85 + render 109 + add/slot/populate/box/refresh. §2b one WIN_INVEN family, not half of `invent.c`. Did not glue `optfn_perminv_mode` or wait_synch. Large but one cluster. Above a one-`if` peel.

## Verification

Wired: four `doperminv` strings; 24×80 too_small maxslot 0; 52×79 create; InvSparse letters; `|` / `#perminv`. Unwired C: wait_synch; cmap glyphs; option-mod; glyph-reset. Conf: no `rn2`. No seed gate.

D-log canary **28**/28 (strings + 24×80 too_small + 53×80 create/paint); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for On+large tty. Fortress proves Off pline if `|` is typed; default never opens WIN_INVEN.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `tty_wait_synch` after too_small (D-1646 later — do not re-port here as if this SHA shipped it); `cmap_D0walls_to_glyph` / `tty_print_glyph`; `optfn_perminv_mode` / `handler_perminv_mode`; `set_option_mod_status`; toggle-off `docrt`; glyph-reset timestamp. Do not add `assesstty` #2. Do not add `money_cnt` #7 (`perminv_money_quan` stays local). Do not restore maxslot 32. Do not enable perm_invent on 24×80. Do not re-port InvInUse prepare (D-1600).

Verdict: **ACCEPT-WITH-DEBT**
