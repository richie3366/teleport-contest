# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-04 — D-1833 iactions.c itemactions Engrave vs Write, stack simpleonames, apply catalogue

**C locus:** `iactions.c` `itemactions` `:429–445` (E: Engrave vs Write + `surface`); `:309–400` apply otyp chain; `item_naming_classification` `:45–82` via `objnam.c` `simpleonames` `:2427–2442`; `item_reading_classification` `:91–124` cookie/shirt/apron/hawaiian before scroll.
**JS:** `js/iactions.js` `itemactions` / `item_naming_classification` / `item_reading_classification` / local `simpleonames`.
**Change:** E uses C `is_blade` (P_DAGGER..P_SABER) / wand / `oc_tough`. Local `simpleonames` `makeplural`s when `quan != 1`. Apply if-else matches C otyp order (candles `carrying(CANDELABRUM)`).
**Verify:** `node scripts/verify.mjs --fn itemactions` → PASS syntax (1 js file); PASS rule2; PASS hidden verify itemactions: 12 PASS, 2 moved past (2 re-attributed at the same step to `do_statusline1`: `ind-Tourist-662206027-62b71e69` step 19 food-rations leftover WIN_STATUS row 22; `ind-Wizard-971871364-8f1ba690` step 2 bell leftover WIN_STATUS row 22), 0 unchanged, 0 worse → PROGRESS; PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; skip full (no shared file). VERIFY: PASS
**Named:** W already-wearing `armor_simple_name` / `armcat_to_wornmask`; dungeon.c `surface` terrain nouns (ROOM → "floor", matching the four existing stubs); `cantwield` skip of `'w'`; objnam.js export `simpleonames` still omits `makeplural` (iactions/pickup local clones). Traditional itemize yn. doengrave non-hands stylus body.
**Next:** Open `invent.c` `getobj` (7 corpus blocks). Not `do_statusline1` leftover WIN_STATUS (D-1831/D-1832).

## 2026-09-04 — D-1832 wintty.c process_menu_window no redraw on unhandled key (D-1831 snapshot regression)

**C locus:** `wintty.c` `process_menu_window` `:1329–1768` (default: `tty_nhbell(); break;` — `page_start` stays); `iactions.c` `itemactions` `select_menu` PICK_ONE; `display.c` `docrt_flags` `:1765–1770` sets `disp.botlx` and does **not** call `bot()`; `pager.c` `dohelp` / `whatis_menu_choice`.
**JS:** `js/iactions.js` `itemactions`; `js/pager.js` `whatis_menu_choice` / `dohelp`; `js/invent.js` `dismiss_nhw_menu`; `js/display.js` `_buildScreenOutput`.
**Change:** Unhandled keys `tty_nhbell` only (no `docrt`/`cls`). Valid pick/cancel uses `dismiss_nhw_menu` (corner docorner). Fullscreen dismiss sets `_statusSuppressed` so the itemed leftover stays blank until `bot()`.
**Verify:** `node scripts/verify.mjs --fn process_menu_window --base ab55b818` → PASS syntax (4 js files); PASS rule2; PASS hidden verify process_menu_window: 19 PASS, 2 moved past (2 re-attributed at the same step to `do_statusline1`: `explore-seed0116` ×2), 0 unchanged, 0 worse → PROGRESS; PASS green 2/2; PASS strict seed8000/seed0900; PASS cohort 7/7; PASS full 44/44 (auto: shared file changed). VERIFY: PASS
**Named:** `process_menu_window` paging `docorner` repair (`previous_page_lines`); PICK_ANY invert-all; itemactions apply catalogue; Traditional itemize yn. Not leftover WIN_STATUS on unhandled keys, MENU_SEARCH overlay wrap, per-window extra-page `cl_end`, or D-0467 fullscreen-invent blank.
**Next:** Open `iactions.c` `itemactions` (Engrave vs Write, cookie vs cookies). Not getobj.

## 2026-09-05 — human postmortem #2238–#2240 (D-1831 continuation)

**Found:** #2238 died on a provider quota error one call after a complete
verify (174 calls, 19 min); #2240 spent ~150 calls re-deriving it, then
four serial regression rounds — 359 calls, 17.2 M tokens, 43 min. Its
last edit (`_snapshotStatusGrid`) regressed 12 of the 21 corpus sessions;
verify's baseline had been consumed, so "PASS hidden" was vacuous.
Re-scored at HEAD: 164/265 (was claimed 176).
**Changed:** `hidden-proxy verify --base` (committed baseline, PASS→fail
= WORSE), `verify.mjs` FAIL triage + `note` for vacuous corpus checks,
`loop-resume-brief.mjs` embedded in the continue overlay, quota halt
without reset, continue prompt rewritten (verify by call ≤5).
**Next:** Must-fix `process_menu_window` regression. Not `itemactions` yet.

## 2026-09-04 — D-1831 wintty.c process_menu_window leftover WIN_STATUS + MENU_SEARCH overlay wrap

**C locus:** `wintty.c` `process_menu_window` `:1329–1768` (`:1501–1505`
**JS:** `js/display.js` `set_bot_disabled` / `_paintToplineOnlyOverOverlay` /
**Change:** `set_bot_disabled` around `select_menu_*` / `getlin` / pickinv /
**Verify:** `node scripts/verify.mjs --fn process_menu_window` → PASS syntax
**Named:** `process_menu_window` paging `docorner` repair
**Next:** Open `iactions.c` `itemactions`. Not getobj.

## 2026-09-04 — D-1830 mkmaze.c makemaz Rog-strt/loca/goal/fila/filb load_special (Rogue quest 5/5)

**C locus:** `dat/Rog-strt.lua` / `Rog-loca.lua` / `Rog-goal.lua` /
**JS:** `js/mklev.js` `load_rog_strt` / `load_rog_loca` / `load_rog_fila` /
**Change:** `load_rog_strt` from the lua body: solidfill STONE +
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `wintty.c` `process_menu_window`. Not fakewiz.

## 2026-09-04 — D-1829 mkmaze.c makemaz Kni-strt/loca/fila/filb load_special (Knight quest 5/5)

**C locus:** `dat/Kni-strt.lua` / `Kni-loca.lua` / `Kni-fila.lua` /
**JS:** `js/mklev.js` `load_kni_strt` / `load_kni_loca` / `load_kni_fila` /
**Change:** `load_kni_strt` from the lua body: solidfill ROOM + mines fg=bg="."
**Verify:** `node scripts/verify.mjs --fn makemaz` → PASS syntax
**Named:** humidity-aware `get_location`; `spo_end_moninvent`
**Next:** Open `mkmaze.c` `makemaz` `Rog-strt`/`-loca`/`-goal`/`-fila`/`-filb`.
